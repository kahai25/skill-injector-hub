# The four questions — worked example

Feature: "Add a public share link so users can share a note by URL without logging in."

Built in 15 minutes by the agent. Looks done. Runs the gate.

## 1. Security

- Server function: `getSharedNote({ shareId })` — no `requireSupabaseAuth`, intentional (public endpoint).
- RLS: `notes` table policy allows `SELECT` where `share_id IS NOT NULL AND share_id = $1`.
- **IDOR check**: `shareId` is a random 22-char nanoid, not the sequential note ID. Sequential ID would let someone enumerate `/share/1`, `/share/2`, ….
- **Rate limit**: added — 60 req/min per IP on the public route.
- **Data exposure**: query returns `title`, `body`, `updated_at` only — NOT `user_id`, NOT `owner_email`. Verified with a shell curl against staging.

✅ Ship.

## 2. Efficiency

- One indexed query: `share_id` column has a unique index added in the migration.
- No N+1 — single row lookup.
- Payload capped: `body` truncated to first 100 KB, "view full" note explaining why.
- SSR loader runs once per request, cached by TanStack Query on the client for 60s.

✅ Ship.

## 3. Regressions

- Touches: `src/routes/share.$shareId.tsx` (new), `notes` table (new nullable column `share_id`), `getNote` server fn (unchanged).
- Migration is additive — new nullable column, no backfill needed.
- Shared component `<NoteBody>` reused — no signature change.
- Existing `/notes/:id` route unaffected; existing bookmarks still work.
- New public route means new sitemap entry — added.

✅ Ship.

## 4. Tests

- Unit: `generateShareId()` returns 22 chars, URL-safe alphabet. ✓
- Integration: `getSharedNote` returns 404 for unknown ID, returns note for valid ID, does NOT leak `user_id` in response. ✓
- Manual smoke script `/tmp/smoke-share.md`: create note, enable sharing, open URL in incognito, verify no login prompt, verify title/body correct, verify no PII in DevTools network tab.

✅ Ship.

## Contrast — the same feature without the gate

- No IDOR check: `shareId` defaults to `note.id`. Attacker iterates `/share/1..100000` and scrapes every "public" note.
- No rate limit: same attacker does it in 30 seconds.
- No test on the response shape: next refactor exposes `user_id` in the payload; nobody notices for 3 months.
- No migration audit: someone adds `NOT NULL DEFAULT ''` to `share_id` on a 5M-row table and blocks writes for 40 seconds.

Same 15 minutes of AI work. Different outcome. The gate is the difference.

## When "I don't know" is the honest answer

That's fine — it's the signal to *slow down for one turn*, not to block forever. Options:

- Ask the user which behavior they want.
- Read the code being called to find out.
- Write the test whose result would answer the question.

The gate fails only when "I don't know" is followed by shipping anyway.
