# 06 · Secrets in the frontend

**Risk:** anything prefixed `VITE_` is baked into the client bundle and visible to any visitor. Any `service_role`, `sk_live_…`, or private key in the bundle = full compromise.

## Rules

| Value | Where it goes |
| --- | --- |
| Supabase URL, **publishable** key | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — fine in frontend |
| Supabase **service role** key | Server only. Read via `process.env.SUPABASE_SERVICE_ROLE_KEY` inside `.server.ts` files or edge-function handlers |
| Stripe secret (`sk_live_…` / `sk_test_…`) | Server only, via `secrets--add_secret` |
| Any third-party API key / webhook secret | Server only, via `secrets--add_secret` |

## Fix

1. **Remove the leak.** Delete the offending `VITE_*_SECRET` / `sk_live_…` from any tracked file.
2. **Rotate the credential** at the source (Supabase dashboard, Stripe dashboard, etc.) — assume it's already compromised.
3. **Re-add via secrets tool:**
   ```
   secrets--add_secret name=STRIPE_SECRET_KEY
   ```
   The user pastes the value into a secure form; the sandbox exposes it as `process.env.STRIPE_SECRET_KEY` on the server only.
4. **Read on the server:** inside a `.handler()` body or edge function, not at module scope.
5. **`.gitignore`** any local `.env` files. Committed `.env.example` with placeholders is fine.

There is no committed `.env` file in Lovable — secrets live in the platform, not in the repo.

## How attackers actually find your leaked keys

Takes about 15 seconds per site. This is not theoretical — every vibe-coded launch on Product Hunt or Reddit gets this treatment within hours:

1. Open the site in Chrome.
2. DevTools → **Network** tab → refresh.
3. `Ctrl+F` in the network panel and search for:

| Search | Catches |
| --- | --- |
| `sk-ant-` | Anthropic API key |
| `sk-proj-` / `sk-` | OpenAI API key |
| `sk_live_` / `sk_test_` | Stripe secret key |
| `AIza` | Google / Firebase / Gemini API key |
| `AKIA` | AWS access key |
| `xoxb-` / `xoxp-` | Slack bot / user token |
| `ghp_` / `github_pat_` | GitHub personal access token |
| `service_role` / `sb_secret_` | Supabase service-role key |
| `re_` | Resend API key |

Anything that matches in a bundled JS file, a JSON payload, or an HTML source view is publicly harvestable. Vite inlines every `VITE_*` env var into the built bundle — that's how `VITE_ANTHROPIC_API_KEY` ends up in `dist/assets/index-xxxx.js`.

## Pre-publish grep

Run this before every deploy. It scans both source and the built bundle:

```bash
rg -n --pcre2 \
  'sk-(ant|proj)-[A-Za-z0-9_-]{20,}|sk_live_[A-Za-z0-9]+|sk_test_[A-Za-z0-9]+|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{80,}|xoxb-[A-Za-z0-9-]{20,}|service_role|sb_secret_[A-Za-z0-9]+|re_[A-Za-z0-9_]{20,}' \
  dist src public 2>/dev/null
```

Any hit = rotate the key **now**, then remove the reference, then rebuild. Rotation before removal — the leaked value is already in someone's grep history and any cached copy of your bundle on the CDN.

## If it's already deployed

- Rotate the credential immediately.
- Check the provider's usage logs for anomalous calls (Anthropic, OpenAI, and Stripe all expose per-key request logs).
- If Stripe: also check for created charges/refunds you didn't initiate.
- If AWS: rotate + review CloudTrail + check IAM for any new users/roles the leaked key might have created.

