import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

const TITLE = "Submit a skill — Skill Injector Hub";
const DESCRIPTION =
  "Submit a public GitHub repo containing a SKILL.md and it joins the Skill Injector Hub catalog after human review. Free, no login.";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://skill-injector-hub.lovable.app/submit" },
      { property: "og:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://skill-injector-hub.lovable.app/submit" }],
  }),
  component: SubmitPage,
});

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; skillName: string };

function SubmitPage() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const mountedAt = useRef(Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState({ kind: "sending" });

    try {
      const res = await fetch("/api/public/submit-skill", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          repoUrl: String(form.get("repoUrl") ?? ""),
          subdir: String(form.get("subdir") ?? ""),
          notes: String(form.get("notes") ?? ""),
          website: String(form.get("website") ?? ""),
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string; skillName?: string };
      if (!res.ok || !body.ok) {
        setState({ kind: "error", message: body.error ?? "Submission failed. Try again." });
        return;
      }
      setState({ kind: "done", skillName: body.skillName ?? "your skill" });
    } catch {
      setState({ kind: "error", message: "Network error. Try again." });
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl text-primary crt-glow">
        <span className="text-muted-foreground">$</span> submit a skill
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Point the Hub at a public GitHub repo that contains a <code>SKILL.md</code>. The server
        checks the repo is public, that SKILL.md exists at the path you give, and that its
        frontmatter declares <code>name</code> and <code>description</code>. Nothing is published
        automatically — approved skills appear in the catalog after human review.
      </p>

      <form onSubmit={onSubmit} className="panel mt-8 space-y-5 p-5">
        <div>
          <label htmlFor="repoUrl" className="block text-xs text-primary">
            repo url *
          </label>
          <input
            id="repoUrl"
            name="repoUrl"
            required
            maxLength={300}
            placeholder="https://github.com/owner/repo"
            className="mt-2 w-full border border-border-strong bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="subdir" className="block text-xs text-primary">
            subdir (optional)
          </label>
          <input
            id="subdir"
            name="subdir"
            maxLength={200}
            placeholder=".agents/skills/my-skill"
            className="mt-2 w-full border border-border-strong bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
          <p className="mt-1 text-[10px] text-muted-foreground">
            Repo-relative folder holding SKILL.md. Leave blank for the repo root.
          </p>
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs text-primary">
            notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={1000}
            placeholder="What does it do, and who should use it?"
            className="mt-2 w-full border border-border-strong bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>

        {/* honeypot: real people never see or fill this */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={state.kind === "sending"}
            className="border border-border-strong bg-secondary px-4 py-2 text-xs text-primary transition-colors hover:bg-muted disabled:opacity-40"
          >
            {state.kind === "sending" ? "validating…" : "submit for review"}
          </button>
          <span className="text-[10px] text-muted-foreground">
            3 submissions per hour. No account, no tracking.
          </span>
        </div>

        {state.kind === "error" ? (
          <p role="alert" className="border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            {state.message}
          </p>
        ) : null}
        {state.kind === "done" ? (
          <p role="status" className="border border-primary/40 bg-primary/10 p-3 text-xs text-primary">
            queued — "{state.skillName}" passed validation and is pending human review.
          </p>
        ) : null}
      </form>

      <section className="mt-10">
        <h2 className="text-sm text-primary">
          <span className="text-muted-foreground">#</span> what we store
        </h2>
        <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
          <li>&gt; the repo URL, subdir, your notes, and the skill name/description from SKILL.md</li>
          <li>&gt; a salted hash of your IP, used only for submission rate limiting</li>
          <li>&gt; no accounts, no cookies, no analytics profile</li>
        </ul>
      </section>
    </div>
  );
}
