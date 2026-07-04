---
name: privacy-policy-audit
description: Audit an app's privacy policy against what it actually collects — pixels, analytics, chat widgets, CRMs, email, AI providers, auth, payments, storage — and flag missing cookie consent. Trigger on "privacy policy", "GDPR", "cookie consent", "am I compliant", "check my tracking", or before launch.
---

# Privacy Policy Audit

The FTC fined BetterHelp $7.8M because their policy said "we don't share data with third parties" while their site fired the Meta pixel, GA, and CRM webhooks on every intake form. Rule: **the policy must match what the code actually does.**

## When to trigger

- "Write me a privacy policy" — refuse until we scan first.
- "Am I GDPR-compliant?" / "Do I need a cookie banner?"
- Right before launch (pair with `launch-polish-checklist`).
- User just added analytics, a chat widget, a CRM, or an AI feature.

## Workflow

1. **Scan.** `bash .workspace/skills/privacy-policy-audit/scripts/privacy-scan.sh` — `rg`-only, safe anywhere. Groups findings by category: pixels, analytics, chat, CRM, email, forms, AI, auth, payments, storage, consent.

2. **Diff.** Read the existing `PRIVACY.md` / `privacy-policy.tsx` / equivalent, and compare to the scan output. Every collection channel the scanner found MUST appear in the policy.

3. **Generate.** If the policy is missing or incomplete, use `assets/privacy-policy.template.md` — fill only the sections the scanner detected. Do not paste boilerplate for things the app doesn't do.

4. **Cookie consent gate.** If the scanner found any non-essential tracker (Meta Pixel, GA, TikTok, Hotjar, Clarity, etc.) and no consent library, flag it. Recommend `orestbida/cookieconsent` (vanilla, MIT, no framework lock-in) and gate the trackers behind consent.

5. **Sub-processor list.** Use `references/4-data-processor-list.md` — every third party in the scan needs to appear in the "who we share data with" section with purpose + jurisdiction.

## What the scanner detects

| Category | Detected |
| --- | --- |
| Ad pixels | Meta/FB Pixel, Google Ads, TikTok Pixel, LinkedIn Insight, Reddit, Pinterest |
| Analytics | GA4, GTM, Plausible, PostHog, Mixpanel, Amplitude, Segment, Hotjar, Clarity, FullStory |
| Chat / support | Intercom, Crisp, Drift, Tidio, HelpScout, Zendesk |
| CRM | HubSpot, Salesforce, Pipedrive, Attio |
| Email / marketing | Mailchimp, Klaviyo, Resend, SendGrid, Postmark, Loops, ConvertKit |
| Forms / scheduling | Typeform, Tally, Formspree, Calendly, Cal.com |
| AI providers | OpenAI, Anthropic, Lovable AI Gateway, Perplexity, Replicate, ElevenLabs |
| Auth | Supabase, Clerk, Auth0, Firebase, NextAuth |
| Payments | Stripe, Paddle, LemonSqueezy (⚠ PCI scope note) |
| File storage | Supabase Storage, Cloudinary, S3, R2, UploadThing |
| Cookie consent | cookieconsent, iubenda, cookiebot, osano, onetrust, klaro |

## References

- `references/1-what-collects-data.md` — the inventory model.
- `references/2-policy-must-match.md` — FTC rule + BetterHelp case study.
- `references/3-cookie-consent.md` — when a banner is required and how to gate trackers.
- `references/4-data-processor-list.md` — sub-processor table format.

## Non-goals

- Not legal advice — always recommend a lawyer for a public launch.
- Doesn't cover HIPAA, PCI Level 1, or SOC 2 — those are separate audits.
- Doesn't scan network traffic — static code scan only. A tracker loaded via a `<script src>` in `index.html` or GTM container ID will be caught; one injected at runtime from a variable won't be.
