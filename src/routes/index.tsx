import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { TerminalHero } from "@/components/hub/TerminalHero";
import { SkillCard } from "@/components/hub/SkillCard";
import { FeaturedRepoCard } from "@/components/hub/FeaturedRepoCard";
import { ShowMoreButton } from "@/components/hub/ShowMoreButton";
import { FEATURED_REPOS, SKILLS } from "@/lib/catalog/skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skill Injector Hub — inject AI agent skills into any project" },
      {
        name: "description",
        content:
          "A free, open catalog of AI agent skills. Copy one inject prompt, paste it into Lovable, Claude Code or Cursor, and the skill installs itself.",
      },
      {
        property: "og:title",
        content: "Skill Injector Hub — inject AI agent skills into any project",
      },
      {
        property: "og:description",
        content:
          "Copy one inject prompt, paste it into your agent, and the skill installs itself. Free, no login, credit to the authors.",
      },
      { property: "og:url", content: "https://skill-injector-hub.lovable.app/" },
      { property: "og:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://skill-injector-hub.lovable.app/" }],
  }),
  component: Index,
});

const STEPS = [
  {
    n: "01",
    title: "pick a skill",
    body: "Browse the catalog. Every entry shows what it does, which agents it works with, and the exact files it ships.",
  },
  {
    n: "02",
    title: "copy the inject prompt",
    body: "One generated prompt containing the raw GitHub URLs and target paths. Nothing runs on your machine.",
  },
  {
    n: "03",
    title: "paste it into your agent",
    body: "Your agent fetches the files verbatim into .agents/skills/<name>/ and stops. Zip download as fallback.",
  },
];

function Index() {
  const [expanded, setExpanded] = useState(false);
  const preview = expanded ? SKILLS : SKILLS.slice(0, 6);

  return (
    <>
      <TerminalHero skillCount={SKILLS.length} />

      <section id="how-it-works" className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
            how it works
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="panel p-4">
                <p className="text-primary crt-glow">{step.n}</p>
                <h3 className="mt-2 text-sm text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
              featured repos
            </h2>
            <p className="text-[11px] text-muted-foreground">
              maintained skill packs · stars go to the author
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FEATURED_REPOS.map((repo) => (
              <FeaturedRepoCard key={repo.slug} repo={repo} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
              in the catalog
            </h2>
            <Link to="/skills" className="text-xs text-primary hover:crt-glow">
              view all {SKILLS.length} →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {preview.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
