# 10 — PII in logs

**Risk:** `console.log` / `console.error` on user objects, request bodies, or Stripe/webhook payloads leaks names, emails, addresses, tokens, and card data into browser DevTools, Cloudflare/Worker logs, and Sentry breadcrumbs. In many jurisdictions this alone is a reportable data-handling failure (GDPR Art. 32, CCPA, PCI-DSS 3.4). If credit-card PAN, CVV, or full magnetic-stripe data lands in a log line, you are out of PCI scope entirely.

## What PII is (short version)

- **Direct identifiers:** name, email, phone, address, government ID, IP.
- **Auth material:** password, token, session id, OTP, secret.
- **Payment data:** PAN (full card number), CVV, expiry, bank account.
- **Sensitive combos:** user id + geolocation, user id + purchase history.

If you log a whole `user`, `session`, `request.body`, `event.data.object` (Stripe), or `payload` — assume it contains PII.

## Fix pattern

### 1. Never log the full object

```ts
// ❌ leaks everything
console.log("signup", user);

// ✅ log only what you need to debug, by field
console.log("signup", { userId: user.id, plan: user.plan });
```

### 2. Add a redactor for structured logs

```ts
// src/lib/log.ts
const REDACT_KEYS = new Set([
  "password", "token", "access_token", "refresh_token", "secret",
  "authorization", "cookie", "email", "phone", "address",
  "card", "cardNumber", "pan", "cvc", "cvv", "ssn",
]);

function redact(value: unknown, depth = 0): unknown {
  if (depth > 4 || value == null) return value;
  if (Array.isArray(value)) return value.map((v) => redact(v, depth + 1));
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = REDACT_KEYS.has(k.toLowerCase()) ? "[REDACTED]" : redact(v, depth + 1);
    }
    return out;
  }
  return value;
}

export const log = {
  info: (msg: string, meta?: unknown) => console.log(msg, meta ? redact(meta) : ""),
  error: (msg: string, meta?: unknown) => console.error(msg, meta ? redact(meta) : ""),
};
```

Then swap `console.log` for `log.info` in server functions and webhooks.

### 3. Strip PII before sending to third-party sinks

- Sentry: set `beforeSend` and `beforeBreadcrumb` to run the same redactor.
- PostHog / Mixpanel: never send raw email as `distinct_id` — hash it.
- Any external logger: redact **before** the network call, not after.

### 4. Rotate anything already exposed

If you find real secrets or tokens in historical logs, treat them as compromised: rotate the key/token, invalidate sessions, and delete the log line if the sink supports it.

## Never-log list (hard rule)

- Full card number (PAN), CVV, PIN, magnetic-stripe data.
- Passwords in any form (plain, hashed, or "just the first few chars").
- OAuth tokens, JWTs, Supabase session JSON, cookies.
- Full request/response body of `/auth/*`, `/checkout/*`, or webhook endpoints.
