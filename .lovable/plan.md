## The 5 pending videos (2 from last message + 3 new)

| Video | Topic | Skill target |
| --- | --- | --- |
| BetterHelp / FTC $7.8M (6962…) | Privacy policy must match what the site actually collects (pixels, chat, CRM, AI) | **new** `privacy-policy-audit` |
| Sam.AIBuilds "Fable 5" (00a7…) | Multi-agent loop: brainstorm → Linear tickets → agent references → Opus deploys | fold into `four-doc-spec-framework` (recommended) |
| Launch-day checklist (d3dd…) | Privacy policy, support URL, App Store keywords + screenshots, OG tags, Google Search Console, IndexNow, Bing Webmasters, launch post / email / social | **extend** `launch-polish-checklist` |
| Startup vocab (e87f…) | TAM/SAM/SOM, beachhead, moats, red/blue ocean, category creation, vertical/horizontal SaaS | **new** `startup-strategy-primer` (reference-style) |
| "Bible / atheist to Christ" (afc19…) | Religious content — unrelated to app building | **skip** |

## Deliverable 1 — `privacy-policy-audit` (new)

```
.agents/skills/privacy-policy-audit/
├── SKILL.md
├── scripts/privacy-scan.sh          # rg-based tracker/integration detector
├── assets/privacy-policy.template.md
└── references/
    ├── 1-what-collects-data.md      # inventory: pixels, analytics, chat, CRM,
    │                                # forms, email, AI, auth, payments, storage
    ├── 2-policy-must-match.md       # FTC unfair/deceptive rule; BetterHelp case study
    ├── 3-cookie-consent.md          # EU/UK banner + consent gating for non-essential
    └── 4-data-processor-list.md     # sub-processor list + where data flows
```

Scanner detects Meta/Google/TikTok/LinkedIn Pixels, Hotjar/Clarity/PostHog/Mixpanel/Segment, Intercom/Crisp/Drift, HubSpot/Salesforce, Mailchimp/Klaviyo/Resend, Typeform/Tally, Calendly/Cal.com, OpenAI/Anthropic/AI Gateway, Stripe/Paddle, Supabase Storage/Cloudinary, and cookie-consent libs. Output: "you collect via X" + "policy must cover Y" + "cookie banner present/missing".

Triggers: "privacy policy", "GDPR", "cookie consent", "am I compliant", "check my tracking".

## Deliverable 2 — extend `four-doc-spec-framework`

Add `references/multi-agent-tickets.md` — treat each item in `docs/4-plan.md` as a ticket with:
- **Context** (link the PRD / architecture doc rows it touches)
- **Dependencies / blockers**
- **Acceptance criteria**
- **One agent per ticket, one ticket per turn**

Tool-agnostic — mentions Linear as one option but doesn't require it. This is the transferable idea from the Fable 5 video without pitching a specific stack.

## Deliverable 3 — extend `launch-polish-checklist`

Existing skill already covers plan/review/design/copy. Add:

- `references/5-launch-day-checklist.md`:
  - **Legal**: privacy policy, terms of service, cookie banner, support email + support URL
  - **Metadata**: title, description, OG image, twitter:card, favicon, apple-touch-icon, manifest
  - **SEO**: sitemap.xml, robots.txt, canonical URLs, Google Search Console verified + sitemap submitted, Bing Webmasters submitted, **IndexNow** ping wired up
  - **App Store** (if iOS/Android): screenshots at required sizes, keywords, subtitle, promotional text, app privacy nutrition label matches actual data collection
  - **Marketing pre-launch**: launch tweet drafted, Product Hunt scheduled, email list warmed, waitlist notified, Discord/Slack ping ready
- `scripts/launch-check.sh` additions: check for `sitemap.xml`, `robots.txt`, `<meta property="og:*">`, `<link rel="canonical">`, `apple-touch-icon`, and manifest.json.

## Deliverable 4 — `startup-strategy-primer` (new, reference-only)

Small skill, no scanner. Just definitions + when-to-care-about-each, so the agent can answer "should I be worried about switching costs" or "what's my TAM" without hallucinating.

```
.agents/skills/startup-strategy-primer/
├── SKILL.md
└── references/
    ├── 1-market-sizing.md    # TAM / SAM / SOM with a worked example
    ├── 2-beachhead.md        # narrow beachhead → adjacent expansion (Amazon books → everything)
    ├── 3-moats.md            # network effects, switching costs, brand, data, scale
    ├── 4-competition.md      # Red vs Blue ocean; category creation
    ├── 5-saas-shapes.md      # vertical SaaS, horizontal SaaS, platform, marketplace, aggregator
    └── 6-timing.md           # market timing — too early = dead, too late = crowded
```

Triggers: "TAM", "SAM", "beachhead", "moat", "should I pick vertical or horizontal", "am I too early", "startup strategy".

## What I will NOT change

- Skip the Bible video — off-topic.
- No app source files. Only `.agents/skills/` additions.
- No DB / Shopify / Stripe changes.

## Order of operations

1. Write all files in parallel.
2. Apply the four updated/new skills:
   - `privacy-policy-audit` (new)
   - `four-doc-spec-framework` (updated)
   - `launch-polish-checklist` (updated)
   - `startup-strategy-primer` (new)
3. Report trigger phrases for each.
