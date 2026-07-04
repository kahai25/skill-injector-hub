# Multi-agent tickets (advanced)

Once `docs/4-plan.md` gets longer than ~15 steps, or you want to run more than one agent in parallel, upgrade each plan step into a **ticket**. This is agent-tool-agnostic — works with Linear, GitHub Issues, a Kanban board in Notion, or just numbered files in `docs/tickets/`.

## Ticket shape

Each ticket has four fields, in this order:

1. **Context** — which rows of the PRD and architecture doc this ticket touches. Link them: `PRD §3.2`, `docs/2-architecture.md#data-model`. An agent picking up the ticket needs to know what to re-read.
2. **Dependencies** — ticket IDs that must be `done` before this one can start. This is the whole point: it turns a linear plan into a DAG so multiple agents can pick up unblocked leaves in parallel.
3. **Acceptance criteria** — the *observable* end state. "The `/settings/profile` route renders the current user's display name from `useSuspenseQuery(getProfileQO)` and updates optimistically on save." Not "add settings page" — that's a title, not a spec.
4. **Out of scope** — a one-liner listing what this ticket does NOT touch. This is the anti-scope-creep clause: an agent that finds an unrelated bug files a new ticket instead of expanding this one.

## Rules

- **One agent per ticket, one ticket per turn.** An agent finishes a ticket, updates its status, then stops. Do not chain tickets in a single agent run — you lose the review boundary.
- **A ticket that can't be described in the four fields above is too big.** Split it. This is the same instinct as "the plan step should be reviewable in a single git diff."
- **Human reviews between tickets.** Even if the agents are technically parallelizable, review is serial. Two agents landing conflicting changes into the same file is worse than one agent doing both tickets sequentially.
- **The PRD is immutable during ticket execution.** If a ticket surfaces a PRD problem, stop, propose a PRD amendment, get user approval, then resume.

## When multi-agent is worth it

- 20+ tickets, and you're tired of babysitting.
- Tickets are cleanly independent (e.g. six separate marketing pages, or a dozen isolated CRUD endpoints).
- You have a review process you trust (typecheck + tests + visual diff).

## When to stay single-agent

- Fewer than 10 tickets — the coordination cost isn't worth it.
- Tickets touch overlapping files — you'll spend all your time resolving merge conflicts.
- You don't yet have automated verification for the acceptance criteria — parallel agents without a review gate is how you ship regressions at 10x speed.
