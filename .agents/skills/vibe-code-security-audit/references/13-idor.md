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
