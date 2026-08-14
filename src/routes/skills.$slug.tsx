import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { CategoryBadge } from "@/components/hub/CategoryBadge";
import { FileTree } from "@/components/hub/FileTree";
import { InjectPanel } from "@/components/hub/InjectPanel";
import { Markdown } from "@/components/hub/Markdown";
import { PlatformBadge } from "@/components/hub/PlatformBadge";
import { RepoCredit } from "@/components/hub/RepoCredit";
import { getSkillDoc } from "@/lib/catalog/content";
import { getSkill } from "@/lib/catalog/skills";

const TABS = ["readme", "files", "triggers", "inject"] as const;
type Tab = (typeof TABS)[number];

export const Route = createFileRoute("/skills/$slug")({
  loader: ({ params }) => {
    const skill = getSkill(params.slug);
    if (!skill) throw notFound();
    return { skill, doc: getSkillDoc(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Skill not found — Skill Injector Hub" }, { name: "robots", content: "noindex" }] };
    }
    const { skill } = loaderData;
    const title = `${skill.name} — Skill Injector Hub`;
    const description = skill.purpose.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: `/skills/${skill.slug}` }],
    };
  },
  notFoundComponent: SkillNotFound,
  component: SkillDetail,
});

function SkillNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-xl text-primary crt-glow">404 — no such skill</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That slug isn't in the catalog. It may have been renamed.
      </p>
      <Link to="/skills" className="mt-6 inline-block border border-border-strong px-3 py-2 text-xs text-primary">
        back to catalog
      </Link>
    </div>
  );
}

function SkillDetail() {
  const { skill, doc } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("readme");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="text-[11px] text-muted-foreground">
        <Link to="/skills" className="hover:text-primary">
          catalog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{skill.slug}</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-2xl text-primary crt-glow">{skill.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {skill.purpose}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
          {skill.categories.map((c) => (
            <CategoryBadge key={c} category={c} />
          ))}
          {skill.platforms.map((p) => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <div role="tablist" aria-label="Skill details" className="flex flex-wrap gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`tab-${t}`}
                aria-selected={tab === t}
                aria-controls={`panel-${t}`}
                onClick={() => setTab(t)}
                className={`-mb-px border border-b-0 px-3 py-2 text-xs transition-colors ${
                  tab === t
                    ? "border-border-strong bg-card text-primary crt-glow"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="pt-6">
            {tab === "readme" ? (
              doc ? (
                <Markdown source={doc} />
              ) : (
                <p className="text-xs text-muted-foreground">
                  SKILL.md isn't bundled for this skill yet — read it in the source repo.
                </p>
              )
            ) : null}

            {tab === "files" ? <FileTree slug={skill.slug} files={skill.files} /> : null}

            {tab === "triggers" ? (
              <div>
                <p className="text-xs text-muted-foreground">
                  Say any of these and the agent should load this skill:
                </p>
                <ul className="mt-4 space-y-2">
                  {skill.triggers.map((trigger) => (
                    <li key={trigger} className="panel p-3 text-xs">
                      <span className="text-muted-foreground">&gt; </span>
                      {trigger}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tab === "inject" ? <InjectPanel skill={skill} /> : null}
          </div>
        </div>

        <div className="space-y-4">
          <RepoCredit skill={skill} />
          <button
            type="button"
            onClick={() => setTab("inject")}
            className="w-full border border-border-strong bg-secondary px-3 py-3 text-xs text-primary transition-colors hover:bg-muted"
          >
            Copy Inject Prompt →
          </button>
        </div>
      </div>
    </div>
  );
}
