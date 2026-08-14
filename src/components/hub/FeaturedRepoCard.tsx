import { Star } from "lucide-react";

import { formatPushedAt, useRepoStats } from "@/lib/repo-stats";
import type { FeaturedRepo } from "@/lib/catalog/types";
import { CategoryBadge } from "./CategoryBadge";

export function FeaturedRepoCard({ repo }: { repo: FeaturedRepo }) {
  const pending = repo.owner === "PENDING";
  const stats = useRepoStats(repo.name);

  return (
    <article className="panel flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm text-primary">{repo.name}</h3>
        {pending ? (
          <span className="shrink-0 border border-border px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
            repo pending
          </span>
        ) : (
          <a
            href={`https://github.com/${repo.owner}/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-border-strong px-1.5 py-0.5 text-[10px] text-primary hover:bg-accent"
          >
            <span className="inline-flex items-center gap-1">
              <Star className="size-3" aria-hidden="true" />
              {stats.stars} star on github
            </span>
          </a>
        )}
      </div>

      <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{repo.purpose}</p>

      <div className="mt-4 flex flex-wrap gap-1">
        {repo.categories.map((c) => (
          <CategoryBadge key={c} category={c} />
        ))}
      </div>

      <p className="mt-4 border-t border-border pt-3 text-[10px] text-muted-foreground">
        {pending ? "github.com/…/" + repo.name : `github.com/${repo.owner}/${repo.name}`}
        {!pending && stats.pushedAt ? ` · pushed ${formatPushedAt(stats.pushedAt)}` : ""}
      </p>
    </article>
  );
}
