# 04 · Rate limiting on sensitive endpoints

**Risk:** unrated login/signup/reset endpoints = free brute force. Unrated AI endpoints = free credit drain.

## Fix — DB-backed limiter (zero infra)

Works on both TanStack server functions and Supabase Edge Functions. Keeps state in Postgres so it survives restarts and is shared across regions.

### Migration

```sql
create table public.rate_limits (
  key         text        not null,
  window_start timestamptz not null,
  count       int         not null default 0,
  primary key (key, window_start)
);
grant select, insert, update on public.rate_limits to authenticated, anon;
grant all on public.rate_limits to service_role;

create or replace function public.check_rate_limit(
  _key text, _max int, _window_seconds int
) returns boolean language plpgsql security definer set search_path = public as $$
declare
  bucket timestamptz := date_trunc('second', now())
    - (extract(epoch from now())::int % _window_seconds) * interval '1 second';
  current int;
begin
  insert into public.rate_limits(key, window_start, count)
  values (_key, bucket, 1)
  on conflict (key, window_start) do update set count = public.rate_limits.count + 1
  returning count into current;
  return current <= _max;
end $$;
```

### Server function usage

```ts
export const login = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const ip = getRequestHeader('x-forwarded-for') ?? 'unknown'
    const key = `login:${ip}:${data.email.toLowerCase()}`
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const { data: ok } = await supabaseAdmin.rpc('check_rate_limit', {
      _key: key, _max: 5, _window_seconds: 60,
    })
    if (!ok) throw new Error('Too many attempts, try again in a minute')
    // ...real login
  })
```

**Recommended limits:**

| Endpoint | Max | Window |
| --- | --- | --- |
| login (per IP+email) | 5 | 60s |
| signup (per IP) | 5 | 300s |
| password reset (per IP+email) | 3 | 300s |
| `/api/ai/*` (per user) | 20 | 60s |
