# 13 — Insecure Direct Object Reference (IDOR)

## The bug

An endpoint reads `params.id` (or `data.id`) from the request and returns the row **without verifying the row belongs to the caller**. Any authenticated user can iterate IDs and read/modify other users' data.

Symptoms:
- URL like `/orders/1042` works even after logging into a different account.
- Sequential integer IDs (`1, 2, 3…`) in URLs.
- Server function uses `supabaseAdmin` (service role) to fetch user-owned rows.
- Client sends `user_id` in the payload and the server trusts it.

## Fixes

### 1. Never bypass RLS on the user data path

```ts
// BAD — service role bypasses RLS
export const getOrder = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string() }).parse)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    return supabaseAdmin.from('orders').select('*').eq('id', data.id).single()
  })

// GOOD — use the request-scoped client + require auth; RLS applies as the caller.
export const getOrder = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string() }).parse)
  .handler(async ({ data, context }) => {
    return context.supabase.from('orders').select('*').eq('id', data.id).single()
  })
```

### 2. RLS policy scopes to `auth.uid()`

```sql
create policy "owners read own orders"
on public.orders for select
to authenticated
using (user_id = auth.uid());

create policy "owners update own orders"
on public.orders for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
```

The `with check` clause blocks users from rewriting `user_id` to another user's UUID.

### 3. Never trust client-sent `user_id`

On insert, always overwrite with `auth.uid()`:

```ts
await context.supabase.from('orders').insert({
  ...data,
  user_id: context.userId,  // NOT data.user_id
})
```

### 4. Prefer opaque IDs in URLs

Use `uuid default gen_random_uuid()` instead of `bigserial` for anything a user references. Guessable IDs make IDOR trivial to exploit at scale.

```sql
-- BAD
id bigserial primary key,
-- GOOD
id uuid primary key default gen_random_uuid(),
```

### 5. Test it

Log in as user A, grab an order URL. Log out. Log in as user B. Paste the same URL. You should see 404 / not-found, not the row.

## The `/admin` test (BOLA at the route level)

IDOR's cousin: forgetting that TanStack's `_authenticated/` layout gates **only auth**, not role. Any signed-in user can visit `/admin`, `/dashboard/admin`, `/settings/admin`, `/users` and — if the route file doesn't check role — see the admin UI *and hit the admin server functions*.

The manual test (do this against your own deployed app in a fresh browser as a normal user):

- `/admin`
- `/admin/users`
- `/dashboard/admin`
- `/settings/admin`
- `/_authenticated/admin`
- `/users` (list-all)
- `/api/admin/*` (curl any that appear in the network tab)

Any 200 that renders admin data (not just an empty shell that fetches nothing) = broken.

### The fix — two gates, not one

Admin routes need a **second** gate in `beforeLoad` that checks role server-side:

```ts
// src/routes/_authenticated/admin.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { checkAdmin } from '@/lib/roles.functions'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: async () => {
    const isAdmin = await checkAdmin()          // server fn, calls has_role(auth.uid(), 'admin')
    if (!isAdmin) throw redirect({ to: '/' })
  },
  component: AdminShell,
})
```

`checkAdmin` is a `requireSupabaseAuth`-gated server fn that calls the `has_role` SECURITY DEFINER function (see the user-roles pattern in project rules). Roles must live in a separate `user_roles` table — never on `profiles`, never on JWT claims the client can decode and lie about.

### And every admin server function needs the same check

The route gate hides the UI. The server functions the UI calls also need it, or a determined attacker just calls them directly:

```ts
export const listAllUsers = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: allowed } = await context.supabase.rpc('has_role', {
      _user_id: context.userId, _role: 'admin',
    })
    if (!allowed) throw new Response('Forbidden', { status: 403 })
    // …now safe to query
  })
```

### What never works

- `if (user.role === 'admin')` in the component — the client controls `user`.
- `if (user.email === 'me@…')` hardcoded — the check is server-side or it's not a check.
- Hiding the admin link in the nav — the URL still works.
- RLS on the admin tables alone — RLS protects data, but the client can still tell the admin page it's admin, render the UI, and cause confusing failures instead of a clean 403.
