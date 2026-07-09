# 15 — AI usage caps enforced server-side

## The story

A vibe-coded app wrapped an expensive AI endpoint and added "50 requests per day per user" as a client-side counter in `localStorage`. Attacker cleared localStorage. Attacker also found the counter was mirrored to a `profiles.ai_credits_remaining` column with no RLS policy — any authenticated user could reset their own credits, or everyone else's, via the Supabase JS client from the browser. In theory: **$10,000 bill in one night.**

## The rule

**Cost caps are a server-side check on a server-owned counter. The client never enforces them, never resets them, and never even knows the counter's row ID.**

## The wrong shape

```ts
// ✗ client counter — trivially bypassed
const used = Number(localStorage.getItem('ai_used') ?? 0);
if (used >= 50) return alert('Daily limit');
localStorage.setItem('ai_used', String(used + 1));
await callAi(prompt);
```

```sql
-- ✗ counter on profiles with no RLS
alter table profiles add column ai_credits_remaining int default 50;
-- (no policy — default deny in theory, but many projects have a permissive
--  "authenticated can update own profile" policy that includes this column)
```

## The right shape

Separate table, RLS is `SELECT`-only for the owner, all writes via a `SECURITY DEFINER` function called by the server:

```sql
create table public.ai_usage (
  user_id uuid primary key references auth.users(id) on delete cascade,
  day date not null default (now() at time zone 'utc')::date,
  count int not null default 0,
  updated_at timestamptz not null default now()
);

grant select on public.ai_usage to authenticated;
grant all on public.ai_usage to service_role;

alter table public.ai_usage enable row level security;

create policy "read own usage" on public.ai_usage
  for select to authenticated
  using (user_id = auth.uid());
-- NO insert/update/delete policy for authenticated. Only the definer fn writes.

create or replace function public.consume_ai_credit(_daily_cap int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (now() at time zone 'utc')::date;
  current_count int;
begin
  insert into public.ai_usage (user_id, day, count)
  values (auth.uid(), today, 0)
  on conflict (user_id) do update
    set day = case when public.ai_usage.day <> excluded.day then excluded.day else public.ai_usage.day end,
        count = case when public.ai_usage.day <> excluded.day then 0 else public.ai_usage.count end
  returning count into current_count;

  if current_count >= _daily_cap then
    return false;
  end if;

  update public.ai_usage
    set count = count + 1, updated_at = now()
    where user_id = auth.uid();
  return true;
end $$;

revoke all on function public.consume_ai_credit(int) from public;
grant execute on function public.consume_ai_credit(int) to authenticated;
```

Then the server function calls it before every AI call:

```ts
// src/lib/ai.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const runAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ prompt: z.string().min(1).max(4000) }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: allowed, error } = await context.supabase.rpc("consume_ai_credit", {
      _daily_cap: 50,
    });
    if (error) throw new Error("usage check failed");
    if (!allowed) throw new Response("Daily limit reached", { status: 429 });

    // …only now call the model
    return await callModel(data.prompt);
  });
```

## Additional hardening

- **Also cap per IP.** A single user creating 500 fresh accounts still costs you money. Add a per-IP throttle in front of the endpoint (see `16-abuse-mitigation.md`).
- **Also cap total daily spend.** A workspace-wide budget in a settings table, checked by the same fn. Circuit-break the whole endpoint if the org burns through the day's budget.
- **Alert on burn rate.** If today's `sum(count)` is 5× yesterday's at the same hour, page someone.
- **Log the model + token count**, not the prompt content. Store cost per call so you can attribute overages.

## The test

Write one integration test that clears the caller's `ai_usage` row via the browser Supabase client and expects a 403 or a Row-Level-Security error. If it succeeds, you have the BetterHelp / $10k bug.
