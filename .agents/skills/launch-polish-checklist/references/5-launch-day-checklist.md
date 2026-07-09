# Stage 5 — Launch-day checklist

Run this the day before launch, not the day of. Every item is a binary — done or not done. If you skip an item, write down why in `docs/launch-notes.md`.

## Legal

- [ ] Privacy policy live at `/privacy` — run `privacy-policy-audit` first.
- [ ] Terms of service live at `/terms`.
- [ ] Cookie consent banner if any non-essential tracker is loaded (EU/UK/CA).
- [ ] Support email published (`support@` or equivalent) — real inbox someone monitors.
- [ ] Support URL published — `/help`, `/support`, or a Notion/Intercom page. Required for App Store.
- [ ] Refund policy if you take payments.

## Head metadata (every route, not just home)

- [ ] Unique `<title>` per route, <60 chars, keyword front-loaded.
- [ ] Unique `<meta name="description">` per route, <160 chars.
- [ ] `og:title`, `og:description`, `og:type` on every route.
- [ ] `og:image` — leaf routes only, absolute HTTPS URL, 1200×630, real image (not a Lovable placeholder).
- [ ] `twitter:card = summary_large_image`, `twitter:image` matching og.
- [ ] `favicon.ico` + `apple-touch-icon.png` (180×180).
- [ ] `manifest.json` if the app is installable.
- [ ] `<link rel="canonical">` on every route.

## SEO

- [ ] `robots.txt` published and permissive on production, blocked on preview URLs.
- [ ] `sitemap.xml` generated, listed in `robots.txt`.
- [ ] **Google Search Console** — property verified, sitemap submitted, coverage report reviewed for errors.
- [ ] **Bing Webmasters** — verified, sitemap submitted. Millions of users, and it powers DuckDuckGo, ChatGPT search, and Ecosia — don't skip.
- [ ] **IndexNow** — a single POST to `api.indexnow.org/indexnow` with your changed URLs makes Bing, Yandex, and Naver re-crawl within minutes. One-line integration.
- [ ] Structured data (JSON-LD) for the appropriate schema.org type (`Organization`, `SoftwareApplication`, `Product`, `Article`).
- [ ] `hreflang` if multilingual.

## App Store (iOS/Android)

- [ ] Screenshots at every required size (6.7", 6.5", 5.5" for iOS; phone + tablet for Play).
- [ ] First three screenshots tell the whole story — most users only see those.
- [ ] App name (<30 chars) and subtitle (<30 chars) are keyword-rich.
- [ ] Description opens with a benefit, not a company name.
- [ ] Keywords field is comma-separated singulars, no spaces, no repeats of title words.
- [ ] Promotional text (170 chars) — updatable without review; use for launches/sales.
- [ ] App Privacy nutrition label matches what the code actually collects — run `privacy-policy-audit`.
- [ ] Age rating questionnaire answered honestly.

## Marketing pre-launch

- [ ] Launch tweet/thread drafted and scheduled.
- [ ] Product Hunt listing prepared (assets, tagline, first comment).
- [ ] LinkedIn / Threads / Bluesky version drafted.
- [ ] Email to waitlist / existing users drafted.
- [ ] Discord / Slack community pings written.
- [ ] Founder-story blog post live on the site (turns into the "read more" link everywhere).
- [ ] One friendly reviewer already primed to leave the first App Store review at launch.

## Day-of

- [ ] Uptime monitor (UptimeRobot, BetterStack, self-hosted) pointed at prod.
- [ ] Error monitoring (Sentry) live with releases tagged.
- [ ] Someone on call for the first 24 hours.
- [ ] Rollback plan documented — one command or one click.

## "Doesn't look vibe-coded" polish

Plaintiffs, reviewers, and Hacker News all use the same tells. Fix them before publishing.

- [ ] **Lovable badge hidden** — Publish settings → badge visibility → off. Or the site instantly reads as "AI slop demo".
- [ ] **Every CTA smoke-tested from a fresh browser** — click every "Buy", "Sign up", "Book", "Get started" on the live URL. No dead links, no console errors, no 404s, no forms that submit to nowhere.
- [ ] **Legal footer on every page** — Privacy, Terms, Contact, support email visible in the footer of every route (not just `/`). Missing footer legal links is the #1 "vibe-coded" tell after the badge.
- [ ] **Animation restraint** — max ~2 scroll-triggered animations per section. If you use Framer Motion / GSAP, wire `useReducedMotion()` and respect `prefers-reduced-motion`. Endless parallax reads as generic AI landing page.
- [ ] **Real content, no lorem ipsum, no placeholder images** — search the repo for `lorem`, `placeholder`, `PlaceholderIndex`, `REPLACE this`, `unsplash.com/random`.
- [ ] **ADA scan passes** — run `ada-accessibility-audit`. ADA-troll lawyers scan Product Hunt launches automatically.
