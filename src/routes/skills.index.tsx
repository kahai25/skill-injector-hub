import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { FilterBar } from "@/components/hub/FilterBar";
import { ShowMoreButton } from "@/components/hub/ShowMoreButton";
import { SkillCard } from "@/components/hub/SkillCard";
import { SKILLS } from "@/lib/catalog/skills";
import type { Category, Platform } from "@/lib/catalog/types";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Skill catalog — Skill Injector Hub" },
      {
        name: "description",
        content:
          "Browse every AI-agent skill in the hub by category and platform: security, compliance, performance, design, planning, accessibility and growth.",
      },
      { property: "og:title", content: "Skill catalog — Skill Injector Hub" },
      {
        property: "og:description",
        content: "Search and filter open AI-agent skills you can inject into any project.",
      },
      { property: "og:url", content: "https://skill-injector-hub.lovable.app/skills" },
      { property: "og:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://skill-injector-hub.lovable.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://skill-injector-hub.lovable.app/skills" }],
  }),
  component: SkillsCatalog,
});

function SkillsCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [expanded, setExpanded] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((skill) => {
      if (category !== "all" && !skill.categories.includes(category)) return false;
      if (platform !== "all" && !skill.platforms.includes(platform)) return false;
      if (!q) return true;
      const haystack = [skill.name, skill.purpose, ...skill.triggers, ...skill.categories]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, platform]);

  const cleared = query === "" && category === "all" && platform === "all";
  const paginate = cleared && results.length > 12;
  const visible = paginate && !expanded ? results.slice(0, 12) : results;
  const total = results.length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <p className="text-xs text-muted-foreground">catalog</p>
        <h1 className="mt-2 text-2xl text-primary crt-glow">
          <span className="text-muted-foreground">$</span> ls .agents/skills/
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {SKILLS.length} skills indexed. Filter, then open a skill to copy its inject prompt.
        </p>
      </header>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        platform={platform}
        onPlatformChange={setPlatform}
        resultCount={results.length}
      />

      {results.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {results.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="panel mt-8 p-8 text-center">
          <p className="text-sm text-primary">no matches</p>
          <p className="mt-2 text-xs text-muted-foreground">
            nothing in the index matches those filters.
          </p>
          {!cleared && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setPlatform("all");
              }}
              className="mt-4 border border-border-strong px-3 py-1.5 text-xs text-primary hover:bg-accent"
            >
              clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
