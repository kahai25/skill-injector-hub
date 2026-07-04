# Plan — {App Name}

**Rule:** Work exactly ONE step at a time. Do not start step N+1 until step N is committed and verified. Re-read `docs/1-prd.md` and `docs/3-ai-rules.md` before each step.

## Legend
- [ ] not started
- [~] in progress
- [x] done + verified

## Steps

- [ ] **1. Scaffolding**
  - Confirm TanStack Start template is intact (`src/routes/__root.tsx`, `src/routes/index.tsx`, `src/router.tsx`).
  - Enable Lovable Cloud.
  - Set app-specific `<head>` metadata in `__root.tsx`.

- [ ] **2. Data model**
  - Write the migration for the tables in `docs/2-architecture.md`.
  - Include GRANTs + RLS + policies.
  - Verify with `security--run_security_scan`.

- [ ] **3. Auth**
  - Add login / signup / logout using Supabase Auth.
  - Add `_authenticated` route gate.
  - Verify signed-out users are redirected.

- [ ] **4. Core feature — {job #1 from PRD}**
  - Server function.
  - UI.
  - Verify happy path.

- [ ] **5. Core feature — {job #2 from PRD}**

- [ ] **6. Core feature — {job #3 from PRD}**

- [ ] **7. Polish**
  - Run `vibe-code-security-audit`.
  - Run `vibe-code-performance-audit`.
  - Run `launch-polish-checklist`.

- [ ] **8. Ship**
  - Publish preview.
  - Verify metadata / OG image / favicon.
  - Publish production.

## Parked (v2)
- {ideas we deliberately deferred — from PRD "IS NOT" section}
