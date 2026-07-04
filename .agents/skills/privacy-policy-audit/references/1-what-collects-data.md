# What actually collects data

Anything that fires a network request with user-linked identifiers is a collection channel and must appear in the policy. Common blind spots:

- **Third-party fonts** (Google Fonts loaded from `fonts.googleapis.com`) — leaks IP + referrer to Google. Self-host or disclose.
- **Embedded media** — YouTube `<iframe>`, Vimeo, Loom, Twitter/X embeds set cookies as soon as the page loads. Use `youtube-nocookie.com` or click-to-load.
- **CDN-hosted scripts** — anything from a third-party CDN can log requests.
- **Server logs** — access logs contain IP + user-agent. Disclose retention.
- **AI features** — prompts, uploaded files, and generated outputs flow to the model provider; some (OpenAI ChatGPT default) train on data unless you opt out. Name the providers.
- **Error monitoring** — Sentry, Bugsnag, LogRocket capture stack traces, breadcrumbs, and sometimes DOM snapshots (LogRocket especially). Disclose.
- **Session replay** — Hotjar, Clarity, FullStory, LogRocket record actual user sessions. High-risk: must be disclosed, must mask PII fields.
- **A/B testing** — Optimizely, Statsig, GrowthBook set cookies for bucketing.

**Rule:** if the network tab shows a request to a domain you don't own, that domain gets its own line in the sub-processor table.
