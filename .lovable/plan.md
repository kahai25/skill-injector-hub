## What the 3 new videos cover

| Video | Topic | Skill target |
| --- | --- | --- |
| Costco security guy (df96…) | **IDOR** (guessable URL IDs return other users' data) + stale-session-after-logout | extend `vibe-code-security-audit` |
| "Claude forgot 5 perf things" (fca2…) | JSON not gzipped, one-row-at-a-time inserts, single dependency bottleneck, no optimistic UI, no SSR/static HTML caching | **new** `vibe-code-performance-audit` |
| "48hr iOS in 4 docs" (d65d…) | Four-document spec framework — PRD, architecture doc, AI rules doc, step-by-step plan (one step at a time) | **new** `four-doc-spec-framework` |

Logout invalidation is already covered in `vibe-code-security-audit/references/08-logout-invalidation.md`, so no duplicate work there.

## Deliverable 1 — extend `vibe-code-security-audit`

Add one new reference and one scanner check:

- `references/13-idor.md` — Insecure Direct Object Reference. Detect endpoints / server functions that read `params.id` (or `data.id`) and query the target row **without** filtering by `auth.uid()` / verifying ownership. Fix patterns:
  - Supabase: RLS policy `USING (user_id = auth.uid())`, plus never trust client-sent `user_id` — always overwrite with `auth.uid()` on write.
  - Server fn: after `requireSupabaseAuth`, use the request-scoped `supabase` client (RLS applies) — do **not** reach for `supabaseAdmin` to fetch user data.
  - Prefer opaque IDs (`uuid`) over sequential integers in URLs.
- `scripts/audit.sh` additions:
  - `rg` for `supabaseAdmin\.from\(` inside `*.functions.ts` / route handlers (RLS bypass on user data path).
  - `rg` for `.eq\('id',\s*(params|data)\.id\)` **without** a sibling `.eq('user_id'` or `auth.uid()` reference in the same handler.
  - `rg` for sequential `bigserial` / `serial` primary keys on user-owned tables in migrations (recommend `uuid default gen_random_uuid()`).

Then re-apply the skill via `skills--apply_draft .agents/skills/vibe-code-security-audit`.

## Deliverable 2 — new skill `vibe-code-performance-audit`

Draft path: `.agents/skills/vibe-code-performance-audit/`

```
.agents/skills/vibe-code-performance-audit/
├── SKILL.md
├── scripts/perf-audit.sh
└── references/
    ├── 1-compression.md        # gzip/br on server responses; Vite/TanStack Start compress plugin
    ├── 2-batch-inserts.md      # single .insert([...]) vs loops of insert(); upsert batching
    ├── 3-latency-breakdown.md  # how to trace round-trip: Network panel, server-timing headers,
    │                           # identifying the single blocking dependency (auth check, N+1 query, external API)
    ├── 4-optimistic-ui.md      # TanStack Query onMutate + setQueryData rollback pattern
    └── 5-ssr-static-caching.md # TanStack Start prerender for marketing routes, CDN Cache-Control,
                                # stale-while-revalidate for logged-out pages
```

**Trigger phrases**: "audit performance", "my app feels slow", "why is loading slow", "make it faster before launch".

**Scanner (`perf-audit.sh`)** — `rg`-only, no installs:
- Loops that call `supabase.from(...).insert(` inside `for` / `.forEach` / `.map` — flag batch-insert opportunity.
- Mutations without `onMutate` in the codebase (grep `useMutation\(` bodies missing `onMutate:`) — flag missing optimistic UI.
- No compression config in `vite.config.ts` / no `Cache-Control` header set anywhere in `src/routes/api/`.
- No `prerender` / `ssg` config on marketing-style routes (index, pricing, about) — flag as opportunity.
- `await` chains in a single handler with 3+ sequential `await supabase...` calls that don't reference each other's results — candidate for `Promise.all`.

## Deliverable 3 — new skill `four-doc-spec-framework`

Draft path: `.agents/skills/four-doc-spec-framework/`

```
.agents/skills/four-doc-spec-framework/
├── SKILL.md
├── assets/
│   ├── 1-prd.template.md              # What the app IS and IS NOT (scope + non-goals)
│   ├── 2-architecture.template.md     # Folder layout, data model, module boundaries
│   ├── 3-ai-rules.template.md         # Stack non-negotiables (e.g. "TanStack Start only",
│   │                                  # "secrets via secrets tool", "no localStorage tokens")
│   └── 4-plan.template.md             # Numbered steps; rule: work ONE step at a time,
│                                      # do not start step N+1 until N is verified
└── references/
    ├── how-to-run.md                  # Order of operations, when to fill each doc,
    │                                  # how to feed them to Lovable ("read /docs/prd.md and
    │                                  # /docs/ai-rules.md before making changes")
    └── examples/                      # 1 filled example set (todo app) so users see the format
```

**Trigger phrases**: "help me plan a new app", "spec out this app", "PRD", "before I start building", "scope creep".

**Workflow encoded in SKILL.md**:
1. Ask the user for a one-paragraph app idea.
2. Generate filled versions of the four docs under `docs/` in their project, using the templates in `assets/`.
3. Explicitly write the non-goals section in the PRD (this is the scope-creep guard).
4. Recommend committing the four docs before writing any feature code, and referencing them in future prompts.

No `apply_draft` call for this one until you approve — same pattern as before.

## What I will NOT change

- No app source files (only `.agents/skills/` additions).
- `routeTree.gen.ts` regenerates automatically; ignore.
- No new dependencies.

## Order of operations after approval

1. Write files for all three deliverables in parallel.
2. Call `skills--apply_draft` on `vibe-code-security-audit` (updated), `vibe-code-performance-audit`, and `four-doc-spec-framework`.
3. Confirm the three skills are live and list their trigger phrases.
