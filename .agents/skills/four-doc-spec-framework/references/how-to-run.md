# How to run the four-doc framework

## Order

1. **PRD first.** Nothing else makes sense without deciding what the app IS NOT.
2. **Architecture second.** Once the scope is fixed, decide folders, tables, module boundaries.
3. **AI rules third.** Pin the stack non-negotiables so the agent doesn't drift.
4. **Plan last.** With the first three docs stable, break the work into numbered steps.

## Feeding the docs to the agent

Every future prompt should start with one of:

- "Read `docs/1-prd.md` and `docs/4-plan.md`. Implement step N."
- "This request must respect `docs/3-ai-rules.md`."
- "Before adding a table, check it's in `docs/2-architecture.md` — if not, update the architecture doc first."

## When to update which doc

| Change | Update |
| --- | --- |
| Cutting a feature | PRD ("IS NOT") + Plan (mark parked) |
| Adding a table | Architecture + Plan |
| Discovering a new stack rule (e.g. no CSS-in-JS) | AI Rules |
| Finishing a step | Plan (`[x]`) |

## Anti-patterns

- Writing all four docs at once, then never re-reading them. They're living docs.
- Skipping the "IS NOT" section in the PRD. That's the whole point.
- Running two plan steps in one turn. Scope always creeps.
- Letting the AI edit `docs/3-ai-rules.md` without approval — those are your rules, not the agent's.
