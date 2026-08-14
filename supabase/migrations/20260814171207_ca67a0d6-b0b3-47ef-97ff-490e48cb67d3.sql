CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_url text NOT NULL,
  repo_owner text NOT NULL,
  repo_name text NOT NULL,
  subdir text NOT NULL DEFAULT '',
  notes text,
  skill_name text,
  skill_description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX submissions_status_idx ON public.submissions (status, created_at DESC);

GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: all access goes through the validating server endpoint (service role).

CREATE TABLE public.submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_key text NOT NULL,
  window_start timestamptz NOT NULL,
  count integer NOT NULL DEFAULT 0,
  UNIQUE (bucket_key, window_start)
);
GRANT ALL ON public.submission_rate_limits TO service_role;
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.install_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_slug text NOT NULL CHECK (char_length(skill_slug) BETWEEN 1 AND 80),
  kind text NOT NULL CHECK (kind IN ('copy','zip')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX install_events_slug_idx ON public.install_events (skill_slug);

GRANT INSERT ON public.install_events TO anon, authenticated;
GRANT SELECT ON public.install_events TO anon, authenticated;
GRANT ALL ON public.install_events TO service_role;
ALTER TABLE public.install_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record an install event"
  ON public.install_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Install events are publicly countable"
  ON public.install_events FOR SELECT TO anon, authenticated USING (true);

CREATE VIEW public.skill_install_counts WITH (security_invoker = on) AS
  SELECT skill_slug, count(*)::bigint AS installs
  FROM public.install_events
  GROUP BY skill_slug;

GRANT SELECT ON public.skill_install_counts TO anon, authenticated;
GRANT SELECT ON public.skill_install_counts TO service_role;