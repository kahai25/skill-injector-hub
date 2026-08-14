import { createFileRoute, Link } from "@tanstack/react-router";

import { SKILLS } from "@/lib/catalog/skills";

const TITLE = "About — Skill Injector Hub";
const DESCRIPTION =
  "A free, open catalog of AI-agent skills for the Lovable community. Attribution-first, no login, no tracking, stars flow to the original authors.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs text-muted-foreground">about</p>
      <h1 className="mt-2 text-2xl text-primary crt-glow">
        <span className="text-muted-foreground">$</span> cat MISSION.md
      </h1>

      <section className="mt-10">
        <h2 className="text-sm text-primary">Mission</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Good agent skills are buried in scattered repos and screenshots. The Skill Injector Hub
          is a free, open index of them: {SKILLS.length} skills today, each with a generated prompt
          you paste into your own agent so it installs the files itself. No account, no paywall,
          no build step — copy, paste, done.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm text-primary">The attribution rule</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-primary">&gt;</span> The Hub never rehosts a skill's content
            without crediting its source. Every detail page links the origin repo and author.
          </li>
          <li>
            <span className="text-primary">&gt;</span> Inject prompts fetch from the author's own
            GitHub raw URLs, so the author stays the single source of truth.
          </li>
          <li>
            <span className="text-primary">&gt;</span> Stars, forks and licenses point at the
            author — not at us. If you use a skill, star its repo.
          </li>
          <li>
            <span className="text-primary">&gt;</span> Licenses are shown as declared upstream.
            Respect them; the Hub grants you nothing extra.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm text-primary">How to submit a skill</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The in-app submission form and moderation queue land in a later release. For now: open a
          GitHub issue on the hub repo with your skill's repo URL, the folder holding{" "}
          <code className="border border-border bg-secondary px-1">SKILL.md</code>, and one line on
          what it does. Requirements: a public repo, a real license file, and a SKILL.md with a
          name, description and clear trigger phrases.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm text-primary">Data we collect: none</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          No accounts, no cookies, no analytics, no third-party pixels, no tracking of what you
          copy. Browsing and injecting are fully anonymous. If an anonymous install counter is
          added later, it will be a single aggregate number with no identifiers, and this page will
          say so before it ships.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/skills"
          className="border border-border-strong bg-secondary px-3 py-2 text-xs text-primary hover:bg-muted"
        >
          browse the catalog
        </Link>
        <Link to="/" className="border border-border px-3 py-2 text-xs text-muted-foreground hover:text-primary">
          home
        </Link>
      </div>
    </div>
  );
}
