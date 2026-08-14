import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type InstallKind = "copy" | "zip";

/**
 * Fire-and-forget counter. Never throws: a failed counter must never block the
 * copy or download the user actually asked for.
 */
export function recordInstall(skillSlug: string, kind: InstallKind): void {
  void (async () => {
    try {
      await supabase.from("install_events").insert({ skill_slug: skillSlug, kind });
    } catch {
      // intentionally ignored
    }
  })();
}

export function useInstallCount(skillSlug: string) {
  const query = useQuery({
    queryKey: ["install-count", skillSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skill_install_counts")
        .select("installs")
        .eq("skill_slug", skillSlug)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return Number(data?.installs ?? 0);
    },
    staleTime: 60_000,
    retry: false,
  });

  return query.data ?? 0;
}
