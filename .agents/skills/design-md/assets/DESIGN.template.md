# <Project name> — Design System

> "<one-line mood quote — the sentence every decision gets tested against>"

**Theme:** <dark | light | both>
**Provenance:** <authored | imported from styles.refero.design "<style name>" | extracted from <reference>>

<One paragraph of personality: who this is for, what it should feel like in the
hand, what it deliberately is not. Concrete, not adjectives-only.>

## Tokens — Colors

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Canvas | `<value>` | `--background` | Page background, nothing else |
| Surface | `<value>` | `--card` | Cards, panels, raised regions |
| Ink | `<value>` | `--foreground` | Primary body text |
| Muted | `<value>` | `--muted-foreground` | Secondary text, metadata, captions |
| Primary | `<value>` | `--primary` | THE accent — use sparingly |
| Danger | `<value>` | `--destructive` | Destructive actions and errors only |
| Border | `<value>` | `--border` | Hairlines, dividers, input outlines |

**Rules:** every color in a component references a variable above. No literal hex,
rgb or oklch values in JSX/TSX. New value needed → add it to this table first.

## Tokens — Typography

- **Families:** <display family> for <use>, <body family> for <use>
- **Weights:** <e.g. 400 / 500 / 600 — no others>

### Type scale

| Token | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| display | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| h1 | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| h2 | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| h3 | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| body | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| small | `<size>` | `<lh>` | `<tracking>` | `<weight>` |
| caption | `<size>` | `<lh>` | `<tracking>` | `<weight>` |

## Spacing, radii, elevation

- **Spacing scale:** `<e.g. 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px>`
- **Radii:** `<sm / md / lg values>`
- **Shadows:** `<shadow tokens — or "flat: no shadows at all">`
- **Container:** `<max width + horizontal padding + section rhythm>`

## Components

- **Primary button:** `<bg token>` / `<text token>` / `<radius>` / `<padding>` / `<type token>` / hover `<change>` / focus `<ring token>`
- **Ghost button:** `<border token>` / transparent bg / hover `<change>`
- **Card:** `<surface token>` / `<border token>` / `<radius>` / `<padding>` / `<elevation>`
- **Input:** `<bg>` / `<border>` / `<height>` / `<type token>` / focus `<ring>` / invalid `<danger token>`
- **Nav:** `<height>` / `<bg>` / `<border>` / active-item treatment `<token>`

## Motion

- **Easing:** `<curve(s) and when each applies>`
- **Durations:** `<fast / base / slow values>`
- **On load:** `<what animates, if anything>`
- **On scroll:** `<what reveals, distance, stagger>`
- **On hover:** `<the one or two properties allowed to change>`
- **Never animate:** `<list — e.g. layout, text color, page transitions>`
- **Reduced motion:** all non-essential animation is disabled under
  `@media (prefers-reduced-motion: reduce)`.

## Anti-patterns (never do these)

1. <anti-pattern>
2. <anti-pattern>
3. <anti-pattern>
4. <anti-pattern>
5. <anti-pattern>
