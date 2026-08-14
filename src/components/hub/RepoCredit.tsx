import { Github, Star } from "lucide-react";

import { isPromptPending } from "@/lib/inject-prompt";
import { formatPushedAt, useRepoStats } from "@/lib/repo-stats";
import type { Skill } from "@/lib/catalog/types";

export function RepoCredit({ skill }: { skill: Skill }) {
  const pending = isPromptPending(skill);
  const stats = useRepoStats(skill.repo.name);

  return (
    <aside className="panel p-4">
      <p className="text-xs text-muted-foreground">source &amp; credit</p>

      <div className="mt-3 flex items-center gap-3">
        {pending ? (
          <div
            className="size-10 shrink-0 border border-border bg-secondary"
            aria-hidden="true"
          />
        ) : (
          <img
            src={skill.author.avatarUrl}
            alt={`GitHub avatar of ${skill.author.handle}`}
            width={40}
            height={40}
            loading="lazy"
            className="size-10 shrink-0 border border-border"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm text-primary">@{skill.author.handle}</p>
          <p className="truncate text-[10px] text-muted-foreground">
            {skill.repo.name}/{skill.repo.subdir}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-[11px]">
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">license</dt>
          <dd>{stats.license ?? skill.repo.license}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">branch</dt>
          <dd>{skill.repo.branch}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">stars</dt>
          <dd className="text-primary">{stats.stars}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted-foreground">last push</dt>
          <dd>{formatPushedAt(stats.pushedAt)}</dd>
        </div>
      </dl>

      {pending ? (
        <p className="mt-4 border border-warning/40 bg-warning/10 p-2 text-[10px] text-warning">
          repo pending — link goes live once published
        </p>
      ) : (
        <a
          href={skill.repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-border-strong bg-secondary px-3 py-2 text-xs text-primary transition-colors hover:bg-muted"
        >
          <Star className="size-3.5" aria-hidden="true" />
          Star on GitHub
        </a>
      )}

      <a
        href={pending ? "https://github.com" : skill.repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary"
      >
        <Github className="size-3" aria-hidden="true" />
        view repository
      </a>
    </aside>
  );
}
