---
name: four-doc-spec-framework
description: Turn a fuzzy app idea into four short docs that keep AI codegen from spiraling into spaghetti — a PRD (what the app IS and IS NOT), an architecture doc (folders, data model, module boundaries), an AI rules doc (stack non-negotiables like "TanStack Start only", "no localStorage tokens", "secrets via secrets tool"), and a numbered step-by-step plan the agent works one step at a time. Trigger on requests like "help me plan a new app", "spec this out", "write a PRD", "before I start building", "I keep getting scope creep", "give me a plan", or when a user pastes a paragraph-length app idea and asks how to start. Produces the four docs under `docs/` in the user's project.
---

# Four-Doc Spec Framework

Turns "I want to build X" into four short docs that scope the project and give the AI agent (Lovable, Claude Code, Cursor, whatever) a rail to run on. Based on the framework that lets people ship real apps in days instead of piles of half-working prompts.

## When to trigger

- User is starting a new app / feature and has only a rough idea.
- User complains about scope creep, spaghetti code, or "the AI keeps changing things I already had working."
- User asks for a PRD, spec, or plan.

## Workflow

1. **Get the one-paragraph idea.** Ask the user for a paragraph: what the app does, who it's for, what platform, what the "wow" moment is. Ask targeted follow-ups if anything critical is missing (auth? payments? mobile-first?).

2. **Generate the four docs** under `docs/` in the project, using the templates in `assets/`:
   - `docs/1-prd.md` — What the app IS and, crucially, what it is NOT. The non-goals section is the scope-creep guard.
   - `docs/2-architecture.md` — Folder layout, data model, module boundaries.
   - `docs/3-ai-rules.md` — Stack non-negotiables (e.g. "TanStack Start only", "no localStorage for auth", "secrets via the secrets tool", "UI in shadcn").
   - `docs/4-plan.md` — Numbered steps. The rule at the top: **work exactly one step at a time; do not start step N+1 until step N is committed and verified.**

3. **Commit the four docs before writing any feature code.** They're the source of truth for every future prompt.

4. **In future prompts, reference the docs explicitly**, e.g. "Read `docs/3-ai-rules.md` and `docs/4-plan.md`, then implement step 3." Keeps the agent aligned across sessions.

## Guardrails

- Keep each doc under 2 pages. Long docs get ignored.
- The PRD's "What this app is NOT" section is not optional — it is the whole point.
- The plan is executed **one step at a time**. Never run two steps in the same turn.
- After each step, re-read the PRD to confirm nothing has drifted.

## Non-goals

- Not a design system doc — that's a separate `ui-style-picker` concern.
- Not a security checklist — see `vibe-code-security-audit`.
- Not a launch checklist — see `launch-polish-checklist`.
