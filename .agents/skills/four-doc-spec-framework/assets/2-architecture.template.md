# Architecture — {App Name}

## Stack
- Frontend: {TanStack Start / React 19 / Tailwind v4 / shadcn}
- Backend: {Lovable Cloud = Supabase Postgres + Auth + Storage}
- Server logic: {TanStack server functions; public webhooks under `src/routes/api/public/*`}
- Third-party: {Stripe / Resend / OpenAI / …}

## Folder layout
```
src/
  routes/           # file-based routing
    index.tsx
    _authenticated/ # gated subtree
    api/public/     # webhooks & cron
  components/
    ui/             # shadcn primitives — do not edit
    {feature}/      # feature-scoped components
  lib/
    {feature}.functions.ts   # createServerFn — client-safe imports
    {feature}.server.ts      # server-only helpers
  hooks/
  integrations/supabase/
```

## Data model
| Table | Columns | RLS |
| --- | --- | --- |
| profiles | id (uuid pk = auth.users.id), display_name, avatar_url | owner-read/write |
| {…} | {…} | {…} |

Roles live in a separate `user_roles` table with `has_role()` — never on `profiles`.

## Module boundaries
- Feature X owns tables: {…}
- Feature X does NOT touch: {…}
- Cross-feature communication: {via server function / via query invalidation / never}

## Deployment
- Preview: `project--{id}-dev.lovable.app`
- Production: `project--{id}.lovable.app`
