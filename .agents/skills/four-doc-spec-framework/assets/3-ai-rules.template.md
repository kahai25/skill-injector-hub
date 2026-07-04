# AI Rules — {App Name}

Non-negotiables. Any prompt to the AI agent must respect these.

## Stack
- TanStack Start only. No React Router DOM, no Next.js, no `src/pages/`.
- Tailwind v4 via `src/styles.css`. No `tailwind.config.js`.
- shadcn/ui primitives only for base UI. Do not fork `src/components/ui/*`.

## Auth
- Supabase Auth via Lovable Cloud. No localStorage tokens in app code.
- Roles in `user_roles` table + `has_role()` SECURITY DEFINER function. Never on profiles.
- Protected server functions use `.middleware([requireSupabaseAuth])`.

## Data
- Every `CREATE TABLE public.*` migration includes: GRANT block, ENABLE ROW LEVEL SECURITY, and CREATE POLICY — in that order.
- UUID primary keys (`gen_random_uuid()`), never `bigserial`, for anything referenced in a URL.
- On insert, always overwrite `user_id` with `auth.uid()` server-side — never trust client-sent `user_id`.

## Secrets
- Secrets stored via the platform's secrets tool. Never `VITE_*_SECRET`, never hardcoded, never committed `.env`.

## Style
- Semantic tokens from `src/styles.css`. Never hardcode `text-white`, `bg-black`, or `bg-[#hex]` in components.
- One display font + one body font. Max two total.

## Workflow
- Work exactly one step from `docs/4-plan.md` per turn.
- Small, incremental changes. Ship page-by-page.
- Ask before running any database migration.
- Verify each change (build, screenshot, or targeted test) before claiming done.

## Additions
{Add project-specific rules here as they come up.}
