---
name: pre-ship-verification
description: The four-question gate to run before shipping any AI-generated feature. Ask (1) is this built the most secure way? (2) is this built the most efficient way? (3) what regressions could this introduce? (4) what tests do we need before this ships? Fires automatically on "is this ready to ship", "review this before I merge", "did we break anything", "should I deploy", or as the final step after a four-doc-spec-framework ticket. Prevents the AI-speed trap where features work locally, look done, and then break in production because nobody asked what could go wrong.
---

# Pre-Ship Verification

AI writes working code fast. The trap: "it works, so it's done." The hard part of software was never writing the code — it was knowing what breaks, what scales, and what confuses the next person who touches it. Run this gate before every merge.

## When to trigger

- "Is this ready to ship?" / "should I deploy?" / "before I merge…"
- Final step of any ticket completed under `four-doc-spec-framework`.
- User says "I built X in 20 minutes" — the faster it went, the more this matters.
- After any change to auth, payments, RLS, AI endpoints, or user-facing data.

## The four questions

Ask these in order. Answer each in writing (or in the chat) before merging. If any answer is "I don't know", the feature is not ready.

### 1. Security

- Is every server function that mutates data behind `requireSupabaseAuth`?
- Every new `public.*` table has RLS enabled + `GRANT`s?
- No secrets in `VITE_*` env vars or committed `.env*`?
- Any user-supplied ID (`params.id`, `body.userId`) checked for ownership? (IDOR)
- Any AI / email / SMS endpoint rate-limited per user AND per IP?

Pair with `vibe-code-security-audit` for a scan.

### 2. Efficiency

- Any N+1 query? (loop over parent rows, then fetch children per row)
- Every query filtered by an indexed column?
- Any unbounded `SELECT *` on a growing table?
- Loader payload size sane (<100 KB for a typical page)?
- Any client-side loop that should be server-side aggregation?

### 3. Regressions

- What existing routes / server functions does this touch?
- What tests cover those paths today? (If none, add one before merging.)
- Did any shared component change signature? Where else is it used?
- Any DB migration — is it additive (safe) or destructive (backfill + downtime)?
- Did the copy or URL of a public page change? (SEO / bookmarks / share links)

### 4. Tests

Before merging, at least one of these must exist for the new code:

- Unit test on the pure logic (formula, validator, transformer).
- Integration test on the server function (happy path + one auth failure).
- A manual smoke-test script the user can rerun (`/tmp/smoke-X.md`).

If the feature has no testable surface at all, document *how* you verified it manually and what would prove it broken.

## How to use this in the loop

At the end of every implementation turn, before saying "done", the agent explicitly writes:

```
Pre-ship verification:
1. Security — <answer>
2. Efficiency — <answer>
3. Regressions — <answer>
4. Tests — <answer>
```

Any "I don't know" blocks the merge until it's a real answer. This is how you keep AI velocity without shipping AI-speed bugs.

See `references/1-the-four-questions.md` for the long form and a real worked example.
