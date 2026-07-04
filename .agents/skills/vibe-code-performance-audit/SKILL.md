---
name: vibe-code-performance-audit
description: Audit a vibe-coded app for the 5 performance issues AI codegen almost always ships — uncompressed JSON responses, one-row-at-a-time database inserts inside loops, a single blocking dependency in the request round-trip (auth check, N+1 query, or external API), UI that waits on the backend before updating instead of using optimistic updates, and marketing/logged-out pages re-rendering HTML per visitor instead of being prerendered/cached. Trigger on requests like "audit performance", "my app feels slow", "why is my app slow at scale", "make it faster before launch", "why is it laggy", or "check for perf issues". Runs a repo scanner and offers copy-pasteable fixes one issue at a time.
---

# Vibe-Code Performance Audit

The "why does this feel slow?" pass. Scans for the five things Claude/Lovable-style codegen usually skips and walks copy-pasteable fixes.

## When to trigger

- User says the app feels slow, laggy, or that loads take a long time.
- User is preparing to launch or scale and wants a perf sweep.
- User asks about optimistic UI, gzip/compression, batching inserts, or prerendering.

## Workflow

1. **Scan.** Run:
   ```bash
   bash .workspace/skills/vibe-code-performance-audit/scripts/perf-audit.sh
   ```
2. **Summarize** findings in the chat with severity.
3. **Fix one at a time** using the matching reference. Respect the user's preference for small, incremental updates.
4. **Re-run the scanner** after each fix.

## What it checks

| # | Issue | Reference |
| --- | --- | --- |
| 1 | Responses not gzip/brotli compressed | `references/1-compression.md` |
| 2 | Rows inserted one-at-a-time inside a loop | `references/2-batch-inserts.md` |
| 3 | Sequential `await`s that could be `Promise.all`; single-dependency bottleneck | `references/3-latency-breakdown.md` |
| 4 | `useMutation` without `onMutate` — UI waits on backend | `references/4-optimistic-ui.md` |
| 5 | Marketing / logged-out routes not prerendered or CDN-cached | `references/5-ssr-static-caching.md` |

## Non-goals

- Not a bundle-size / Lighthouse tool. Runtime perf only.
- Does not modify code without explicit approval.
