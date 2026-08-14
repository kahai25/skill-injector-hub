import { createFileRoute } from "@tanstack/react-router";

/**
 * Public submission endpoint for community skills.
 *
 * Security posture:
 * - validates before persisting (repo public + SKILL.md + frontmatter)
 * - durable per-IP + global throttle in Postgres, fails CLOSED on storage errors
 * - unattributable callers share one bucket
 * - IPs are stored only as salted hashes
 * - error bodies are generic: no upstream status, no SQL, no stack
 */

const MAX = { url: 300, subdir: 200, notes: 1000, name: 200, description: 600 };
const PER_IP_HOURLY = 3;
const GLOBAL_HOURLY = 30;
const MIN_FILL_MS = 3000;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function bad(message: string) {
  return json({ ok: false, error: message }, 400);
}

async function hashIp(ip: string): Promise<string> {
  const salt = `skill-injector-hub:${process.env["SUPABASE_PROJECT_ID"] ?? "local"}`;
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    request.headers.get("cf-connecting-ip") ??
    (forwarded ? forwarded.split(",")[0]?.trim() : null) ??
    request.headers.get("x-real-ip");
  return ip && ip.length > 0 && ip.length <= 64 ? ip : null;
}

function parseRepoUrl(raw: string): { owner: string; name: string; url: string } | null {
  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  if (parsed.hostname !== "github.com" && parsed.hostname !== "www.github.com") return null;
  const parts = parsed.pathname.split("/").filter(Boolean);
  const owner = parts[0];
  const name = parts[1]?.replace(/\.git$/, "");
  const ok = /^[A-Za-z0-9-]{1,39}$/;
  const okRepo = /^[A-Za-z0-9._-]{1,100}$/;
  if (!owner || !name || !ok.test(owner) || !okRepo.test(name)) return null;
  return { owner, name, url: `https://github.com/${owner}/${name}` };
}

function normalizeSubdir(raw: string): string | null {
  const value = raw.trim().replace(/^\/+|\/+$/g, "");
  if (value === "") return "";
  if (value.includes("..") || !/^[A-Za-z0-9._\-/]+$/.test(value)) return null;
  return value;
}

function parseFrontmatter(md: string): { name?: string; description?: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md);
  if (!match) return {};
  const out: Record<string, string> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const kv = /^([A-Za-z_-]+):\s*(.*)$/.exec(line);
    if (kv) out[kv[1]!.toLowerCase()] = kv[2]!.trim().replace(/^["']|["']$/g, "");
  }
  return { name: out["name"], description: out["description"] };
}

export const Route = createFileRoute("/api/public/submit-skill")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: Record<string, unknown>;
        try {
          payload = (await request.json()) as Record<string, unknown>;
        } catch {
          return bad("Malformed request.");
        }

        // --- honeypot + minimum fill time (no external captcha) ---
        if (typeof payload["website"] === "string" && payload["website"].trim() !== "") {
          return json({ ok: true, queued: true }, 200); // silent drop
        }
        const elapsed = Number(payload["elapsedMs"]);
        if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
          return bad("Submission looked automated. Please try again.");
        }

        const repoUrlRaw = typeof payload["repoUrl"] === "string" ? payload["repoUrl"] : "";
        const subdirRaw = typeof payload["subdir"] === "string" ? payload["subdir"] : "";
        const notesRaw = typeof payload["notes"] === "string" ? payload["notes"] : "";
        if (repoUrlRaw.length > MAX.url || subdirRaw.length > MAX.subdir || notesRaw.length > MAX.notes) {
          return bad("One or more fields are too long.");
        }

        const repo = parseRepoUrl(repoUrlRaw);
        if (!repo) return bad("Enter a public https://github.com/owner/repo URL.");
        const subdir = normalizeSubdir(subdirRaw);
        if (subdir === null) return bad("Subdir must be a simple repo-relative path.");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // --- durable throttle, fail closed ---
        const ip = clientIp(request);
        const bucketKey = ip ? `ip:${await hashIp(ip)}` : "ip:unattributed";
        const windowStart = new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000).toISOString();

        for (const [key, limit] of [
          [bucketKey, PER_IP_HOURLY],
          ["global", GLOBAL_HOURLY],
        ] as const) {
          const { data, error } = await supabaseAdmin
            .from("submission_rate_limits")
            .select("id, count")
            .eq("bucket_key", key)
            .eq("window_start", windowStart)
            .maybeSingle();
          if (error) return json({ ok: false, error: "Temporarily unavailable." }, 503);

          if (!data) {
            const { error: insertError } = await supabaseAdmin
              .from("submission_rate_limits")
              .insert({ bucket_key: key, window_start: windowStart, count: 1 });
            if (insertError) return json({ ok: false, error: "Temporarily unavailable." }, 503);
            continue;
          }
          if (data.count >= limit) {
            return json({ ok: false, error: "Too many submissions. Try again later." }, 429);
          }
          const { error: bumpError } = await supabaseAdmin
            .from("submission_rate_limits")
            .update({ count: data.count + 1 })
            .eq("id", data.id);
          if (bumpError) return json({ ok: false, error: "Temporarily unavailable." }, 503);
        }

        // --- validate the repo itself ---
        let repoMeta: { private?: boolean; default_branch?: string };
        try {
          const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
            headers: { accept: "application/vnd.github+json", "user-agent": "skill-injector-hub" },
          });
          if (!res.ok) return bad("That repo isn't reachable publicly on GitHub.");
          repoMeta = (await res.json()) as typeof repoMeta;
        } catch {
          return json({ ok: false, error: "Temporarily unavailable." }, 503);
        }
        if (repoMeta.private) return bad("That repo isn't public.");

        const branch = repoMeta.default_branch ?? "main";
        const path = [subdir, "SKILL.md"].filter(Boolean).join("/");
        let markdown = "";
        try {
          const res = await fetch(
            `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${branch}/${path}`,
            { headers: { "user-agent": "skill-injector-hub" } },
          );
          if (!res.ok) return bad(`No SKILL.md found at ${path} on ${branch}.`);
          markdown = (await res.text()).slice(0, 200_000);
        } catch {
          return json({ ok: false, error: "Temporarily unavailable." }, 503);
        }

        const fm = parseFrontmatter(markdown);
        if (!fm.name || !fm.description) {
          return bad("SKILL.md frontmatter must define both name and description.");
        }

        const { error: saveError } = await supabaseAdmin.from("submissions").insert({
          repo_url: repo.url,
          repo_owner: repo.owner,
          repo_name: repo.name,
          subdir,
          notes: notesRaw.trim() || null,
          skill_name: fm.name.slice(0, MAX.name),
          skill_description: fm.description.slice(0, MAX.description),
          status: "pending",
          ip_hash: ip ? await hashIp(ip) : null,
        });
        if (saveError) {
          console.error("[submit-skill] persist failed", saveError.message);
          return json({ ok: false, error: "Temporarily unavailable." }, 503);
        }

        return json(
          { ok: true, queued: true, skillName: fm.name.slice(0, MAX.name), branch, path },
          200,
        );
      },
    },
  },
});
