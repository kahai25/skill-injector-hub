CREATE TABLE public.skill_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  repo_owner text NOT NULL,
  repo_name text NOT NULL,
  stars integer NOT NULL DEFAULT 0,
  pushed_at timestamptz,
  license text,
  cached_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT skill_cache_owner_name_key UNIQUE (repo_owner, repo_name)
);

GRANT SELECT ON public.skill_cache TO anon;
GRANT SELECT ON public.skill_cache TO authenticated;
GRANT ALL ON public.skill_cache TO service_role;

ALTER TABLE public.skill_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "skill_cache_public_read" ON public.skill_cache FOR SELECT TO anon, authenticated USING (true);