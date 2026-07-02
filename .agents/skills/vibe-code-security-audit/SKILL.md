---
name: vibe-code-security-audit
description: Audit a vibe-coded app for the most common security flaws — auth tokens in localStorage, client-side admin/role checks, missing rate limits on login/signup/AI endpoints, secrets exposed in the frontend, missing Supabase RLS + GRANTs, weak or unchecked passwords, no 2FA/email verification, and sessions that survive logout. Trigger on requests like "run the security audit", "check my app for security issues", "is my vibe-coded app safe", "audit my login", "check for exposed secrets", or after a user ships auth/login features. Runs a repo scan and walks copy-pasteable fixes one issue at a time.
---

# Vibe-Code Security Audit

This skill is the "did I ship something dumb?" pass for a vibe-coded Lovable app. It scans the repo for the top ~10 issues that break real apps once users show up, groups findings by severity, and offers a copy-pasteable fix for each one from `references/`.

## When to trigger

- The user asks to audit, harden, or "security check" the app.
- The user just added login, signup, password reset, admin pages, RLS, or an AI endpoint.
- The user asks about a specific symptom this skill covers (e.g. "is localStorage safe for tokens", "how do I rate limit login").

## Workflow

1. **Scan.** Run the bundled scanner:
   ```bash
   bash .workspace/skills/vibe-code-security-audit/scripts/audit.sh
   ```
   It uses `rg` only, so it's safe in any project. Output is grouped as `CRITICAL / HIGH / MEDIUM / INFO`, with `path:line` and a pointer to the matching fix file.

2. **Summarize.** Report findings back to the user in the chat, grouped by severity. Do not fix anything yet.

3. **Fix, one at a time.** For each finding the user approves, open the matching file in `references/` and apply the fix. Follow the user's stated preference for **small, incremental, page-by-page updates** — never batch-fix everything in one shot. Ask before running any DB migration.

4. **Re-run the scanner** after each fix to confirm the finding is gone.

5. **Update security memory.** After the pass, call `security--update_memory` with a short note about what was fixed and what is intentionally left (e.g. public read tables).

## What it checks

| # | Issue | Reference |
| --- | --- | --- |
| 1 | Auth tokens in `localStorage` / `sessionStorage` (XSS bait) | `references/01-session-storage.md` |
| 2 | Client-side admin/role checks (`role === 'admin'` in UI code) | `references/02-server-side-roles.md` |
| 3 | Missing 2FA / email verification | `references/03-2fa-email-verify.md` |
| 4 | No rate limiting on login, signup, password-reset, or `/api/ai/*` | `references/04-rate-limiting.md` |
| 5 | No password strength rules / no leaked-password check | `references/05-password-policy.md` |
| 6 | Secrets exposed via `VITE_*` or committed `.env*` | `references/06-secrets-hygiene.md` |
| 7 | `public.*` tables created without RLS + `GRANT`s | `references/07-rls-policies.md` |
| 8 | Logout that doesn't clear query cache / revoke session | `references/08-logout-invalidation.md` |
| 9 | Heavy work (email, PDF, AI) done inline instead of async server-side | `references/09-async-and-load.md` |
| 10 | Auth route/component with no route guard (public + `_authenticated` mixed up) | Inline in the report; usually pairs with #2 or #8 |

## Non-goals

- Not a substitute for `security--run_security_scan` (Supabase-side RLS/policy scanner). Run both.
- Does not modify code without explicit approval.
- Does not touch Shopify, Stripe, or any external store.
