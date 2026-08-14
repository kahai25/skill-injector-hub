import type { Skill } from "@/lib/catalog/types";
import { CategoryBadge } from "./CategoryBadge";
import { PlatformBadge } from "./PlatformBadge";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="panel group flex h-full flex-col p-4 transition-colors hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm text-primary transition-[text-shadow] group-hover:crt-glow">
          {skill.name}
        </h3>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {skill.files.length} files
        </span>
      </div>

      <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
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

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
        <span>{skill.triggers.length} trigger phrases</span>
        <span>@{skill.author.handle}</span>
      </div>
    </article>
  );
}
