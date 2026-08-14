import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type RepoStats = {
  stars: number;
  pushedAt: string | null;
  license: string | null;
};

/**
 * Static fallbacks used until the hourly cache refresh lands, or whenever the
 * cache read fails. Rendering never waits on the live values.
 */
export const SEED_REPO_STATS: Record<string, RepoStats> = {
  "skill-injector-hub": { stars: 0, pushedAt: null, license: "MIT" },
  "vibe-security": { stars: 0, pushedAt: null, license: "MIT" },
  "vibe-compliance": { stars: 0, pushedAt: null, license: "MIT" },
  "lovable-hardening": { stars: 0, pushedAt: null, license: "MIT" },
};

export function seedStats(repoName: string): RepoStats {
  return SEED_REPO_STATS[repoName] ?? { stars: 0, pushedAt: null, license: null };
}

async function fetchRepoStats(): Promise<Record<string, RepoStats>> {
  const { data, error } = await supabase
    .from("skill_cache")
    .select("repo_name, stars, pushed_at, license");
  if (error) throw new Error(error.message);

  const map: Record<string, RepoStats> = {};
  for (const row of data ?? []) {
    map[row.repo_name] = {
      stars: row.stars ?? 0,
      pushedAt: row.pushed_at ?? null,
      license: row.license ?? null,
    };
  }
  return map;
}

/** Live star counts / push dates, with seed values as fallback. Never blocks render. */
export function useRepoStats(repoName: string): RepoStats {
  const { data } = useQuery({
    queryKey: ["skill-cache"],
    queryFn: fetchRepoStats,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const seed = seedStats(repoName);
  const live = data?.[repoName];
  if (!live) return seed;
  return {
    stars: live.stars,
    pushedAt: live.pushedAt ?? seed.pushedAt,
    license: live.license ?? seed.license,
  };
}

export function formatPushedAt(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 10);
}
