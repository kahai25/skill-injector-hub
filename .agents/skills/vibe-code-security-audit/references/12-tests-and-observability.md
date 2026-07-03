# 12 — Tests & observability (pre-launch minimum)

Not a vulnerability per se, but shipping without either of these turns every future bug into a mystery. Both should exist before the app has real users.

## A. Minimum test suite

You don't need 90% coverage. You need tests for the paths that, if they break silently, cost you money or users.

### What to cover first

1. **Auth happy paths** — signup, login, logout, password reset. One test each.
2. **Auth failure paths** — wrong password, expired token, unverified email.
3. **Authorization** — a non-admin cannot hit admin routes / mutations.
4. **Payment webhook** — Stripe/Paddle signature verify + idempotent handling.
5. **Any RLS policy that isn't `true`** — user A cannot read/write user B's rows.
6. **The one flow the business runs on** — checkout, publish, send message, whatever.

### Stack

- **Unit / integration:** Vitest (already installed in most Lovable projects).
  ```bash
  bunx vitest run
  ```
- **E2E:** Playwright, headless Chromium. Drive against `http://localhost:8080`.
- **RLS:** integration tests that hit Supabase with a real user JWT (not service_role) and assert the row is/isn't returned.

### Minimum CI gate

Run `bunx vitest run` on every PR. If it doesn't pass, don't merge. That single rule prevents 80% of regressions.

## B. Observability

Three layers, cheapest first:

### 1. Structured server logs (free)

Every server function / webhook logs one line per invocation:
```ts
log.info("checkout.completed", { userId, orderId, amountCents, durationMs });
```
Use the redactor from `references/10-pii-in-logs.md`. Grep-able logs beat no logs.

### 2. Error reporting (Sentry, free tier)

Wire Sentry in both browser and server. Set `tracesSampleRate: 0.1`, `beforeSend` to redact PII. Now unhandled exceptions in production show up with stack traces instead of a user email.

```ts
// src/lib/sentry.ts (browser)
import * as Sentry from "@sentry/react";
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  tracesSampleRate: 0.1,
  beforeSend: (event) => redactEvent(event),
});
```

### 3. Product analytics (PostHog, free tier)

Track 5–10 events tops: `signup_completed`, `checkout_started`, `checkout_completed`, `error_shown`. Hash emails; never send raw PII as `distinct_id`.

### Health check endpoint

```ts
// src/routes/api/public/health.ts
export const Route = createFileRoute("/api/public/health")({
  server: { handlers: { GET: () => new Response("ok") } },
});
```
Ping it from an uptime monitor (UptimeRobot, BetterStack — both free). If the app 500s, you find out before the user emails you.

## Definition of "ready to launch"

- `bunx vitest run` passes and covers items 1–6 above.
- Sentry catches an intentionally-thrown error in prod (verify once).
- One dashboard shows: request count, error rate, checkout count today.
- Health check is green in the uptime monitor.

If any of those four are missing, the app isn't ready for paying users — no matter how good the UI looks.
