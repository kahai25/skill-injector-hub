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
