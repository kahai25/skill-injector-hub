## The 10 videos, grouped

| Video | Topic | Action |
| --- | --- | --- |
| 2e02 | SEO checklist: Search Console, Bing, sitemap, OG, IndexNow | Already covered by `launch-polish-checklist` Stage 5 — reinforcement, no change |
| 36d8 + 8823 (dupes) | AI cost limits bypassed via misconfigured Supabase RLS | Extend `vibe-code-security-audit`: new `references/15-ai-usage-caps.md` (server-enforced per-user quotas + RLS on the quota table) |
| 4f0b + 5fc9 | ADA lawsuits scan vibe-coded sites; settle for $10–50k | **NEW** `ada-accessibility-audit` skill |
| 5866 | "Stop being an ignorant dick" — motivational rant | **Skip** |
| 5e0e | Hard-to-hack stacks: Cloudflare, Firebase, Supabase, Clerk | Add one-liner to `vibe-code-security-audit` SKILL.md ("stacks worth defaulting to") — no new file |
| 6b60 | 4 questions to ask Claude before shipping: secure / efficient / regressions / tests | **NEW** `pre-ship-verification` skill (tiny — SKILL.md + one reference) |
| 8eef | Spot vibe-coded sites: Lovable badge visible, scroll anim overkill, no legal footer, broken buy buttons | Extend `launch-polish-checklist` Stage 5: hide dev badge, functional test every CTA, footer legal links present |
| a9d7 | Under attack: fake signups spamming GDPR email endpoint → needs IP ban | Extend `vibe-code-security-audit`: new `references/16-abuse-mitigation.md` (IP throttling, captcha on public forms, disposable-email block, per-IP signup cap) |

## Deliverable 1 — NEW `ada-accessibility-audit`

```
.agents/skills/ada-accessibility-audit/
├── SKILL.md
├── scripts/ada-scan.sh              # rg-based static WCAG scan
└── references/
    ├── 1-why-lawsuits.md            # ADA Title III demand letters, $10–50k settlements
    ├── 2-wcag-quick-wins.md         # alt text, labels, contrast, focus, keyboard, aria
    ├── 3-semantic-html.md           # headings order, landmarks, lists, buttons vs divs
    └── 4-widget-vs-real-fix.md      # overlays (accessiBe/UserWay) are lawsuit magnets — do the real fix
```

Scanner checks: `<img>` without `alt`, `<button>` / `<a>` empty text, `<div onClick>`, missing `<label htmlFor>`, `role=` without keyboard handler, single `<h1>`, no `lang` on `<html>`, no skip-link, missing `<main>` / `<nav>` landmarks, positive `tabindex`, autoplay video without controls, color-only state signals (best-effort — flags `text-red-500` on error text with no icon/text sibling).

Triggers: "ADA", "accessibility", "WCAG", "screen reader", "am I going to get sued", pre-launch pair with `launch-polish-checklist`.

## Deliverable 2 — NEW `pre-ship-verification`

Small skill. One SKILL.md + one reference. The four-question gate before merging any AI-generated feature:

1. **Security** — auth, RLS, input validation, secrets, IDOR
2. **Efficiency** — N+1 queries, missing indexes, unbounded loops, payload size
3. **Regressions** — what existing paths does this touch? which tests cover them?
4. **Tests** — what needs to exist before this ships? (unit / integration / manual)

Triggers automatically when the user says "is this ready to ship", "review this", "before I merge", "check this feature". Also useful as the last step of `four-doc-spec-framework` step execution.

## Deliverable 3 — extend `vibe-code-security-audit`

- `references/15-ai-usage-caps.md` — per-user token/cost caps stored in a Supabase table with RLS `using (auth.uid() = user_id)` and enforced **server-side** in the edge function before the AI call. Never trust client-side counters.
- `references/16-abuse-mitigation.md` — public-form abuse pattern: per-IP signup rate limit (Upstash / KV), disposable-email blocklist, captcha on password reset & signup, IP ban table + middleware, alert on burst.
- SKILL.md table gets rows #14 (AI cost caps) and #15 (public-form abuse / IP ban).
- One-liner in SKILL.md preamble: "Default to stacks that harden the boring parts for you — Supabase RLS, Clerk auth, Cloudflare in front, Firebase rules — instead of hand-rolling."

## Deliverable 4 — extend `launch-polish-checklist` Stage 5

Add to `references/5-launch-day-checklist.md`:
- **Dev badge off**: hide the Lovable badge before publishing (Publish settings → badge visibility).
- **CTA smoke test**: click every "Buy" / "Sign up" / "Book" button on the live URL from a fresh browser — no dead links, no console errors, no 404s.
- **Footer legal links**: Privacy, Terms, Contact, Support email — visible on every page footer (not just `/`).
- **Animation restraint**: no more than ~2 scroll-triggered animations per section; respects `prefers-reduced-motion`.

`launch-check.sh` additions: grep for `data-lovable-badge`, check every route file references the footer component, `rg` for `prefers-reduced-motion` presence when Framer Motion / GSAP are imported.

## What I will NOT change

- Skip the "ignorant dick" motivational clip.
- No app source files. Only `.agents/skills/` additions.
- No DB / Shopify / Stripe changes.

## Order of operations

1. Write all new/edited files in parallel.
2. Apply the four skills:
   - `ada-accessibility-audit` (new)
   - `pre-ship-verification` (new)
   - `vibe-code-security-audit` (updated)
   - `launch-polish-checklist` (updated)
3. Report trigger phrases for each.
