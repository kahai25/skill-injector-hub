---
name: launch-polish-checklist
description: A pre-launch polish workflow for a vibe-coded app inspired by Freddy Fang's 4-step routine — (1) plan features carefully before implementing, (2) review the generated code for bloat/dead paths, (3) design a creative, distinctive UI instead of generic AI-default styling, and (4) audit App Store / landing-page screenshots and copy for conversion. Trigger on requests like "get my app ready to launch", "polish this before I ship", "review my UI", "audit my screenshots", "make my landing page convert", "help me plan this feature properly", or when the user is about to publish / submit to a store. Walks the four stages one at a time; does not modify code without explicit approval.
---

# Launch-Polish Checklist

This skill turns a working-but-rough vibe-coded app into something you're not embarrassed to ship. Based on the Freddy Fang / Fable-style workflow: **plan → implement → review → design → audit copy**. Applied to Lovable, that becomes four discrete passes you can run in order.

## When to trigger

- The user says they're getting ready to launch, publish, submit, or "ship it."
- The user asks to polish, review, or "make it look less AI-generated."
- The user wants help writing App Store / landing-page copy or screenshots.
- The user asks how to plan a feature before implementing it.

## Workflow

Run each stage as its own back-and-forth with the user. **Never combine stages** — the whole point is to slow down and think between them. Per the user's memory: **small, incremental updates, page-by-page, explicit approval before destructive changes.**

### Stage 1 — Plan before implementing

Read `references/1-plan-first.md`. Extract from the user:

- What's the *one* new capability we're adding?
- What tables / server functions / UI states does it touch?
- What's explicitly **out** of scope for this pass?

Write the plan as a short bullet list, get user sign-off, **then** implement. Don't skip to code.

### Stage 2 — Code review

Read `references/2-code-review.md`. Walk the files that were just touched (or the whole repo if it's a general polish pass) and look for:

- Dead code / stubbed handlers / `TODO` / `console.log`
- Duplicated components (three different "Card" components with the same JSX)
- Files >300 lines that should be split
- Client-side calls that should be server functions
- Any `any` types, `@ts-ignore`, or eslint-disable that snuck in

Report findings, fix one at a time with user approval.

### Stage 3 — Distinctive UI

Read `references/3-creative-ui.md`. The default Lovable output is functional but generic. Push for **one** clear visual identity:

- Pair with the `ui-style-picker` skill if the user hasn't picked a direction.
- Kill purple-gradient-on-white / default Inter / interchangeable hero-nav-footer patterns unless the user explicitly asked for them.
- Commit to real typography (paired display + body), a considered color palette in `src/styles.css` tokens, and at least one distinctive layout choice (asymmetric grid, oversized type, unusual navigation, etc.).

### Stage 4 — Audit screenshots & copy

Read `references/4-screenshots-and-copy.md`. This is the conversion pass:

- Landing-page hero: does the headline say what the app **does** in <8 words?
- Screenshots (App Store / Play / landing): first three tell the whole story, no chrome-heavy placeholders.
- Pricing card copy: benefit-first, price second.
- Meta tags: unique title/description per route (see the head-metadata rules).

Suggest concrete rewrites; don't just critique.

## Non-goals

- Not a security audit — use `vibe-code-security-audit` for that. Run it *before* launch.
- Does not submit to any store or publish the app.
- Does not generate marketing collateral (ads, social posts). Landing + store listing only.
