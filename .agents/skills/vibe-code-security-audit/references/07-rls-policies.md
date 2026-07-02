# 07 · RLS + GRANTs on public tables

**Risk:** a `public.*` table without RLS lets any authenticated user read/write **all rows**. A table with RLS but no `GRANT` returns a permission error at runtime — users complain, you disable RLS to "fix it", now it's public. Both failure modes are common.

## The mandatory 4-step block

Every migration that creates a `public.*` table MUST run these four things in this order, in the same migration:

```sql
-- 1. Create
create table public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now()
);

-- 2. Grant (Data API needs this — RLS alone is not enough)
grant select, insert, update, delete on public.notes to authenticated;
grant all on public.notes to service_role;
-- grant select on public.notes to anon;   -- ONLY if a policy allows anon reads

-- 3. Enable RLS
alter table public.notes enable row level security;

-- 4. Policies
create policy "own notes: select"
  on public.notes for select to authenticated
  using (auth.uid() = user_id);

create policy "own notes: write"
  on public.notes for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Drop the `anon` grant when every policy scopes to `auth.uid()`. Widen `anon` only for fully public tables (a landing-page feed, public product catalog).

## Common mistakes the scanner flags

- `create table public.X` with no `enable row level security` — **CRITICAL**
- `create table public.X` with RLS but no `grant` — **HIGH** (silently broken at runtime)
- Policies using `USING (true)` on a private table — check manually

Also run `security--run_security_scan` for the Supabase-side view.
