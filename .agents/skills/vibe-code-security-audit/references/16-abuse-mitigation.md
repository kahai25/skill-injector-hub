# 16 — Public-form abuse & IP ban

## The story

A vibe-coded app shipped a "request my data" GDPR form on a public page. Attacker scripted 10,000 fake signups, each triggering a `resend.emails.send()` call. The rate limit on the resend send existed (good), so no runaway bill — but the form kept accepting submissions, the DB filled with junk rows, and the founder spent a night manually cleaning up. Missing piece: **an IP ban**.

## The layers (defense in depth)

You want all of these on any endpoint an unauthenticated attacker can hit — signup, login, password reset, magic link, contact form, GDPR request, waitlist:

1. **Captcha** on submission (Turnstile, hCaptcha).
2. **Per-IP rate limit** — e.g. 5 requests / hour / IP for password reset.
3. **Per-email rate limit** — separate bucket, prevents captcha-solved attacks from targeting one victim.
4. **Disposable-email blocklist** on signup.
5. **IP ban table** — repeated abusers are moved from "rate limited" to "blocked entirely".
6. **Alert on burst** — Slack/Discord ping when the per-hour rate spikes.

## Captcha

Cloudflare Turnstile is free, invisible in the happy path, and works with any framework:

```tsx
<form onSubmit={onSubmit}>
  {/* fields */}
  <div className="cf-turnstile" data-sitekey="0x4AAA..." />
  <Button type="submit">Send</Button>
</form>
```

Verify server-side before doing any work:

```ts
const token = form.get("cf-turnstile-response");
const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET!, response: String(token) }),
});
const { success } = await res.json();
if (!success) throw new Response("Captcha failed", { status: 400 });
```

## Per-IP rate limit

Use Upstash Redis, Cloudflare KV, or a Postgres table. Cheapest: a Postgres table with a unique constraint on `(bucket, ip, window_start)`:

```sql
create table public.rate_limit (
  bucket text not null,          -- e.g. 'signup', 'reset-password'
  ip inet not null,
  window_start timestamptz not null,
  count int not null default 1,
  primary key (bucket, ip, window_start)
);
grant all on public.rate_limit to service_role;
-- no grants to authenticated / anon — service role only
```

```ts
// src/lib/rate-limit.server.ts
export async function checkIpRate(bucket: string, ip: string, limit: number, windowSec: number) {
  const windowStart = new Date(Math.floor(Date.now() / (windowSec * 1000)) * windowSec * 1000);
  const { data, error } = await supabaseAdmin.rpc("bump_rate_limit", {
    _bucket: bucket, _ip: ip, _window_start: windowStart.toISOString(),
  });
  if (error) throw error;
  return (data as number) <= limit;
}
```

Where `bump_rate_limit` is a `SECURITY DEFINER` fn that upserts and returns the new count.

Get the caller IP from the request headers in the handler:

```ts
const ip =
  request.headers.get("cf-connecting-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
  "0.0.0.0";
```

## Disposable-email blocklist

Small in-repo list is fine for MVP — `mailinator.com`, `10minutemail.com`, `tempmail.dev`, plus the top 200 from a public list. Reject on signup with a clear message.

For a production app, use a service (Kickbox, ZeroBounce) or the `disposable-email-domains` npm package (updated list, ~4k domains).

## IP ban table

Once an IP crosses a hard threshold (100 signups in an hour, 20 failed logins in 5 minutes), move it to a ban table:

```sql
create table public.ip_ban (
  ip inet primary key,
  reason text not null,
  banned_at timestamptz not null default now(),
  expires_at timestamptz             -- null = permanent
);
grant all on public.ip_ban to service_role;
```

Check it in a middleware at the top of every public server function:

```ts
const { data: banned } = await supabaseAdmin
  .from("ip_ban").select("ip").eq("ip", ip)
  .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
  .maybeSingle();
if (banned) throw new Response("Forbidden", { status: 403 });
```

## Alert on burst

One Postgres statement wired to a cron:

```sql
select count(*) from auth.users where created_at > now() - interval '10 minutes';
```

If > 50 (or > 10× the last-week baseline for that hour), send a Slack webhook. This is how you catch the attack while it's happening, not the morning after.

## What NOT to do

- **Do not** rely only on client-side captcha — the server must verify the token.
- **Do not** ban entire ASNs / country ranges on first offense — you'll block real users on shared mobile IPs.
- **Do not** email the attacker to tell them they're banned — you'll just fuel bounce-rate abuse of your sender reputation.
- **Do not** log the raw request bodies of a flood — you'll fill logs and pay egress. Sample instead.

## The test

Script 200 signups in 60 seconds from a single IP. The 6th through 200th should all return 429, and after the 100th the IP should appear in `ip_ban`. If either of those doesn't happen, the mitigation isn't wired.
