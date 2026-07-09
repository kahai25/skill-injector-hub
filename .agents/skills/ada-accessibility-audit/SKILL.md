---
name: ada-accessibility-audit
description: Audit a vibe-coded app for ADA / WCAG accessibility issues before an ADA-troll lawyer finds it. Static scan for missing alt text, unlabeled icon-only buttons, div-with-onClick fake buttons, form inputs without labels, missing landmarks (main/nav), skipped heading order, no lang attribute, no skip-link, positive tabindex, autoplay video, and color-only state signals. Warns against accessibility-overlay widgets (accessiBe, UserWay) — they attract lawsuits instead of preventing them. Trigger on "ADA", "accessibility", "WCAG", "screen reader", "am I going to get sued for accessibility", "a11y audit", or when pairing with launch-polish-checklist before shipping.
---

# ADA Accessibility Audit

ADA Title III demand letters target vibe-coded sites because they're low-hanging fruit — automated scanners find the same 8 mistakes on every one, then the lawyer offers to settle for $10–50k. This skill runs those same checks first.

## When to trigger

- "Is my site ADA-compliant?" / "will I get sued?"
- "Accessibility audit" / "a11y" / "WCAG" / "screen reader test"
- Before launch — pair with `launch-polish-checklist`.
- User just added a new page, form, modal, or media element.

## Workflow

1. **Scan.** `bash .workspace/skills/ada-accessibility-audit/scripts/ada-scan.sh` — `rg`-only, safe anywhere. Groups findings as `BLOCKER / SERIOUS / MODERATE`.

2. **Summarize** findings back to the user. Do not fix anything yet.

3. **Fix one at a time**, per the user's incremental-updates preference. Prefer shadcn / Radix primitives — they get ARIA right by default; hand-rolled divs are where lawsuits live.

4. **Re-run the scanner** after each fix.

5. **Do NOT install an accessibility overlay** (accessiBe, UserWay, EqualWeb, AudioEye). Read `references/4-widget-vs-real-fix.md` — they are the #1 signal a plaintiff's firm uses to identify low-effort targets, and every major class action in 2023–2025 named an overlay.

## What the scanner checks

| Category | Detected |
| --- | --- |
| Images | `<img>` without `alt`, `<img alt="">` on non-decorative images |
| Buttons / links | Icon-only shadcn `Button size="icon"` without `aria-label`, empty `<a>` / `<button>` |
| Fake interactives | `<div onClick>` / `<span onClick>` without `role="button"` + keyboard handler |
| Forms | `<input>` / `<textarea>` / `<select>` without `<label htmlFor>` or `aria-label` |
| Landmarks | Missing `<main>`, missing `<nav>`, more than one `<main>` per route |
| Headings | Missing `<h1>`, jumps in heading order (h1 → h3) |
| Root doc | `<html>` without `lang`, missing skip-link |
| Focus / keyboard | Positive `tabIndex` (`tabIndex={1}`+), `outline-none` without `focus-visible:` replacement |
| Media | `<video autoPlay>` without `controls` and `muted`, `<audio autoPlay>` |
| Color | `text-red-*` on error copy without an icon or text prefix ("Error:") sibling |
| Overlays | `accessibe`, `userway`, `equalweb`, `audioeye`, `accessibility-widget` — flag as SERIOUS |
| Motion | GSAP / Framer Motion imported with no `prefers-reduced-motion` check anywhere |

## References

- `references/1-why-lawsuits.md` — Title III demand-letter economics.
- `references/2-wcag-quick-wins.md` — the 10 fixes that clear 90% of scanner findings.
- `references/3-semantic-html.md` — landmarks, headings, buttons vs divs.
- `references/4-widget-vs-real-fix.md` — why overlays make you a bigger target.

## Non-goals

- Not legal advice.
- Not a substitute for a real audit by a disabled user with a screen reader.
- Doesn't test color contrast pixel-by-pixel (Tailwind design tokens are usually fine; use Chrome DevTools Lighthouse for pixel checks).
