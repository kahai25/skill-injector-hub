# Why ADA lawsuits target vibe-coded sites

## The economics

Plaintiff's firms run automated WAVE / axe scans against thousands of small-business sites per week. Any site with >5 obvious violations gets a demand letter. Typical settlement: **$10k–$50k plus a "remediation plan"** the same firm bills against.

The math works because:

- The scans are free.
- The complaint template is copy-paste.
- Small businesses usually settle rather than litigate — legal defense costs more.
- Federal Rule 68 offers of judgment shift fees quickly.

## What triggers a scan

- Presence of an **accessibility overlay** (accessiBe, UserWay, EqualWeb, AudioEye). Plaintiffs specifically search for these — they signal a site that thinks it's covered but isn't. See `4-widget-vs-real-fix.md`.
- Sites that just launched — Product Hunt, Indie Hackers, App Store new releases.
- Sites with obvious e-commerce or booking (an ADA plaintiff needs standing as a "would-be customer").

## What plaintiffs actually cite

Almost every complaint cites the same handful of failures:

1. Images without `alt`.
2. Form fields without labels.
3. Empty links / buttons (icon-only, no accessible name).
4. Insufficient color contrast.
5. Keyboard traps or unreachable interactive elements.
6. Missing page structure (no `<main>`, no `<h1>`, no landmarks).
7. Modals that don't trap focus / don't return focus on close.
8. Autoplay media without controls.

Every one of these is caught by the scanner in this skill or by shadcn/Radix primitives out of the box.

## The 2024 DOJ Title II update also matters

State and local government sites now have a hard WCAG 2.1 AA deadline (April 2026 for larger entities, April 2027 for smaller). If your app is sold into government, "we plan to fix accessibility later" is now a procurement blocker.

## Bottom line

You don't need perfect WCAG 2.2 AAA. You need to not be the easiest target in the search results. Fix the top 8, remove any overlay, ship real semantic HTML.
