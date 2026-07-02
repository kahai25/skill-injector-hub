# 02 · Client-side admin / role checks

**Risk:** anything on the client is editable in DevTools. If your admin gate is `user.role === 'admin'` in React, an attacker just sets it in the console (or edits the JWT claim client-side) and every "admin" API you exposed becomes public.

## Detect

- `role === 'admin'` in `src/**` (non-server files)
- `user.user_metadata.role` / `user.app_metadata.role` used to gate UI *and* the same API isn't re-checking server-side
- `isAdmin` computed from a client-side `profile.role` column

## Fix

Two pieces, both required:

### 1. Roles in a separate table + `has_role()` security-definer

```sql
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role    app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all    on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;
```

Never store roles on `profiles` or `users` — that's a self-service privilege escalation.

### 2. Enforce server-side on every admin action

```ts
// src/lib/admin.functions.ts
export const promoteUser = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { targetId: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: ok } = await context.supabase
      .rpc('has_role', { _user_id: context.userId, _role: 'admin' })
    if (!ok) throw new Error('Forbidden')
    // ...privileged work
  })
```

Client-side `isAdmin` is fine for **hiding UI**, never for **enforcing access**. Every RLS policy and every privileged server function must re-check.
