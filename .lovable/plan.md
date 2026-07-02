## Goal

Turn the videos into portable **Lovable skills** — directories the agent auto-loads when relevant. Once applied, typing something like *"run the security audit"* or *"check my vibe-coded app for security issues"* in any project will trigger the skill: it scans the codebase, reports findings, and offers copy-pasteable fixes.

Skills are activated with `skills--apply_draft`, so once built here they can be exported/reused across projects.

## Coverage from the videos

Three videos are on-topic (security). The fourth is a UI-design video and is proposed as a separate optional skill (see "Open question" below).

| Source | Issues to detect & fix |
| --- | --- |
| Hayden Schmitty | 1) Session token in `localStorage` (XSS) 2) Client-side admin/role checks 3) No 2FA / email verification 4) No rate limiting on login & password reset 5) No password strength / leaked-password check |
| Swerik Codes | 6) Secrets/API keys in frontend (`VITE_*` misuse, `.env` in client) 7) Missing RLS on Supabase tables 8) No rate limits on AI / signup endpoints 9) Heavy work not moved to async / edge functions |
| Patrick w/ ProspectFlo | 10) Session survives logout (stale token / URL replay grants access) |

## Deliverable 1 — Skill: `vibe-code-security-audit`

Draft path: `.agents/skills/vibe-code-security-audit/`

```text
.agents/skills/vibe-code-security-audit/
├── SKILL.md                    # trigger description + workflow
├── scripts/
│   └── audit.sh                # ripgrep-based scanner, prints findings by severity
└── references/
    ├── 01-session-storage.md   # localStorage token → httpOnly cookie / Supabase session
    ├── 02-server-side-roles.md # user_roles table + has_role() SECURITY DEFINER
    ├── 03-2fa-email-verify.md  # Supabase email confirm + TOTP MFA snippets
    ├── 04-rate-limiting.md     # server-fn / edge-fn rate limit patterns
    ├── 05-password-policy.md   # min length, HIBP leaked-password check
    ├── 06-secrets-hygiene.md   # VITE_ audit, move to server env, secrets tool
    ├── 07-rls-policies.md      # enable RLS + GRANT block per public schema rule
    ├── 08-logout-invalidation.md # supabase.auth.signOut, token revoke, route guards
    └── 09-async-and-load.md    # move email/AI/PDF work to server functions
```

### SKILL.md trigger

```yaml
---
name: vibe-code-security-audit
description: Audit a vibe-coded Lovable app for the top security flaws — localStorage tokens, client-side admin checks, missing rate limits, exposed frontend secrets, missing RLS, weak passwords, no 2FA, stale sessions after logout — and apply copy-pasteable fixes.
---
```

### `scripts/audit.sh` — what it detects (grep-level, fast)

- `localStorage.setItem(...token...)` / `sessionStorage` for auth tokens
- Client files reading `role === 'admin'` without a server round-trip
- `VITE_` env vars whose names look like secrets (`*_SECRET`, `*_SERVICE_ROLE`, `*_PRIVATE`)
- `.env*` files tracked in repo
- Supabase migrations creating `public.*` tables without a matching `ENABLE ROW LEVEL SECURITY` / `CREATE POLICY`
- Auth-related server routes (`login`, `signup`, `reset`, `/api/ai/*`) missing a rate-limit helper import
- `signOut` / logout handlers that don't clear query cache or navigate through a route guard
- Password validation with no min length / no leaked-password check
- Supabase `auth` config with `email_confirm` disabled or no MFA factor

Output is grouped by severity (Critical / High / Medium) with the file:line and a pointer to the matching `references/NN-*.md` fix.

### Workflow encoded in SKILL.md

1. Run `bash .workspace/skills/vibe-code-security-audit/scripts/audit.sh` (after apply, the skill lives under `.workspace/skills/`).
2. Summarize findings to the user grouped by severity.
3. For each finding, offer to apply the fix from the matching reference (per the user's memory: page-by-page, explicit approval before Shopify/store changes — here, before any DB migration).
4. Re-run the audit to confirm resolution.

## Deliverable 2 (optional) — Skill: `ui-style-picker`

Draft path: `.agents/skills/ui-style-picker/`

Captures the Yogesh Creatives video: a menu of UI style directions (Neomorphism, Glassmorphism, Skeuomorphism, Flat, Material, Brutalism, etc.) with token snippets ready to drop into `src/styles.css`. Triggered by phrases like *"give me a UI style"* / *"apply neomorphism"*. Only built if you want it — see question below.

## How you'll use it in another project

1. In the target project, open Settings → Skills, upload the `vibe-code-security-audit` folder (or copy it into `.workspace/skills/`).
2. Ask: *"run the security audit"* — skill auto-triggers, runs the scanner, walks fixes.

## Open question

Do you want me to also build the `ui-style-picker` skill from the fourth video, or skip it and keep this security-only?

## Technical details

- Skills live in `.agents/skills/<name>/` during drafting and are activated with `skills--apply_draft`, which moves them to `.workspace/skills/<name>/` where they become retrievable across sessions in this project. To reuse across projects, copy the folder into that project's `.workspace/skills/` (or re-run apply there).
- The audit script uses `rg` only (already available in the Lovable sandbox) — no install step, safe to run in any project.
- All fixes in `references/*.md` follow Lovable's rules already in system context: `user_roles` table + `has_role()` for role checks, `GRANT` statements after every `CREATE TABLE public.*`, secrets stored via `secrets--add_secret` not `VITE_*`, server-side rate limiting via TanStack `createServerFn` or Supabase Edge Functions.
- No code changes to *this* project's app source — only new files under `.agents/skills/`.
