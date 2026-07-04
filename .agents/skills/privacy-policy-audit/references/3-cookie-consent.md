# Cookie consent — when and how

## When you need a banner

You need explicit **opt-in** consent (banner + reject-all button that's as easy as accept-all) if you serve EU, UK, Brazil (LGPD), or California (CPRA "sharing") users and load any of:

- Ad pixels (Meta, Google Ads, TikTok, LinkedIn, Reddit, Pinterest)
- Analytics that use cookies or fingerprinting (GA4, Mixpanel, Amplitude, Hotjar, Clarity, FullStory, PostHog with autocapture)
- Session replay
- Third-party embeds that set cookies (YouTube standard, Twitter, Facebook)
- A/B testing tools that persist bucketing

You do **not** need consent for:

- Session cookies, CSRF tokens, cart cookies, login state
- Server-side, aggregated, IP-anonymized analytics (Plausible, self-hosted PostHog in cookieless mode)

## Implementation

Use `vanilla-cookieconsent` (orestbida/cookieconsent, MIT). Framework-agnostic, no external calls.

```
bun add vanilla-cookieconsent
```

Gate every non-essential tracker behind the consent state. In practice: **do not load the script tag at all** until consent is granted for that category — a pixel that fires once before rejection has already leaked the pageview.

## Anti-patterns to reject

- Pre-ticked boxes — illegal under GDPR.
- Cookie walls (can't use site without accepting) — illegal in EU.
- Reject button hidden two clicks deep — CNIL and ICO have fined for this.
- "By using this site you agree" — not consent.
- Loading GA4 with `anonymize_ip` and claiming that's enough — GA4 still requires consent in the EU (Google's own guidance, Consent Mode v2).

## Consent Mode v2 (Google)

If you use Google Ads or GA4 in the EU/UK/EEA, you must send Consent Mode v2 signals (`ad_user_data`, `ad_personalization`). The consent library must be wired to update these on accept/reject. Otherwise Google won't measure conversions, and worse — you're processing without consent.
