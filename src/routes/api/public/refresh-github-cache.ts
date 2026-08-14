import { createFileRoute } from "@tanstack/react-router";

import { OWNER_GITHUB } from "@/lib/catalog/skills";

/** The four repos backing the catalog. 4 unauthenticated calls/hour, limit is 60/h. */
const REPOS = [
  "skill-injector-hub",
  "vibe-security",
  "vibe-compliance",
  "lovable-hardening",
] as const;

type GithubRepo = {
  stargazers_count?: number;
  pushed_at?: string | null;
  license?: { spdx_id?: string | null; name?: string | null } | null;
};

async function refresh() {
  // Imported inside the handler: this client bypasses RLS and must never
  // reach the browser bundle.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const results: Array<{ repo: string; ok: boolean; stars?: number; error?: string }> = [];

  for (const name of REPOS) {
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER_GITHUB}/${name}`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "skill-injector-hub" },
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`GitHub request failed [${res.status}] for ${name}: ${body}`);
        results.push({ repo: name, ok: false, error: `github ${res.status}` });
        continue;
      }
      const data = (await res.json()) as GithubRepo;
      const row = {
        repo_owner: OWNER_GITHUB,
        repo_name: name,
        stars: data.stargazers_count ?? 0,
        pushed_at: data.pushed_at ?? null,
        license: data.license?.spdx_id ?? data.license?.name ?? null,
        cached_at: new Date().toISOString(),
      };
      const { error } = await supabaseAdmin
        .from("skill_cache")
        .upsert(row, { onConflict: "repo_owner,repo_name" });
      if (error) {
        console.error(`skill_cache upsert failed for ${name}: ${error.message}`);
        results.push({ repo: name, ok: false, error: error.message });
        continue;
      }
      results.push({ repo: name, ok: true, stars: row.stars });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`refresh failed for ${name}: ${message}`);
      results.push({ repo: name, ok: false, error: message });
    }
  }

  const failed = results.filter((r) => !r.ok).length;
  return new Response(JSON.stringify({ refreshed: results.length - failed, failed, results }), {
    status: failed === results.length ? 502 : 200,
    headers: { "content-type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/refresh-github-cache")({
  server: {
    handlers: {
      POST: refresh,
      GET: refresh,
    },
  },
});
