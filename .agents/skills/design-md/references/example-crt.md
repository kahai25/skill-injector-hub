# Skill Injector Hub — Design System (worked example)

> "a green-phosphor CRT terminal that shipped a modern product"

**Theme:** dark (single palette — `:root` and `.dark` hold identical values on purpose)
**Provenance:** extracted from this repo's `src/styles.css` (Retro-Tech Terminal Modernism)

Built for developers who live in a terminal. Every surface is flat black, every
edge is a 1px hairline, every character is monospace, and the only warmth comes
from a soft phosphor bloom on primary text. It reads like tooling, not like a
marketing site: no cards floating on gradients, no rounded pills, no illustration.
It is deliberately not "friendly SaaS" — the restraint is the brand.

## Tokens — Colors

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Void | `oklch(0 0 0)` | `--background` | Page background, nothing else |
| Panel | `oklch(0.14 0 0)` | `--card` | Cards, panels, code blocks, popovers |
| Phosphor | `oklch(0.92 0.16 158)` | `--foreground` | Primary body text |
| Beam | `oklch(0.87 0.24 156)` | `--primary` | THE accent — headings, links, active state. Use sparingly |
| Dim | `oklch(0.76 0.14 158)` | `--dim` | De-emphasized green: labels, inline metadata |
| Ghost | `oklch(0.68 0.11 158)` | `--muted-foreground` | Secondary text, captions, help copy |
| Alert | `oklch(0.62 0.23 27)` | `--destructive` | Destructive actions and errors only |
| Warn | `oklch(0.82 0.16 85)` | `--warning` | Advisory banners only |
| Hairline | `oklch(1 0 0 / 12%)` | `--border` | Default 1px dividers and frames |
| Hairline-Active | `oklch(0.87 0.24 156 / 40%)` | `--border-strong` | Focused/selected frames, primary buttons |
| Surface-Alt | `oklch(0.19 0.02 158)` | `--secondary` | Button fills, inline `code` backgrounds |
| Ring | `oklch(0.87 0.24 156 / 55%)` | `--ring` | Focus ring |

**Rules:** every color in a component references a variable above. No literal
hex/rgb/oklch in TSX. Beam is a single accent — never introduce a second hue.
New value needed → add it to this table and `src/styles.css` first.

## Tokens — Typography

- **Families:** `IBM Plex Mono` for everything (body, UI, code); `VT323` for
  display-only flourishes (boot banner, hero wordmark) — never for body copy.
- **Weights:** 400 / 500 / 600 — no others, no italics for emphasis.

### Type scale

| Token | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| display | 2.25rem | 1.1 | -0.01em | 400 (VT323) |
| h1 | 1.5rem | 1.2 | -0.01em | 400 |
| h2 | 1.25rem | 1.3 | -0.01em | 500 |
| h3 | 1.05rem | 1.3 | -0.01em | 500 |
| body | 0.875rem | 1.65 | 0 | 400 |
| small | 0.8125rem | 1.55 | 0 | 400 |
| caption | 0.6875rem | 1.4 | 0.02em | 400 |

## Spacing, radii, elevation

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px (Tailwind 1–16)
- **Radii:** `sm 0px`, `md 1px`, `lg 2px` — 2px is the hard ceiling
- **Shadows:** none. Elevation is expressed with 1px borders and the
  `--glow-primary` text bloom (`0 0 6px oklch(0.87 0.24 156 / 0.45)`) only
- **Container:** `max-w-5xl` content / `max-w-6xl` chrome, `px-4`, sections `py-12`
- **Texture utilities:** `scanlines` (1px repeating lines at 3.5% white),
  `terminal-grid` (32px 1px grid at 5% white), `panel` / `panel-active`
  (1px frame + Panel fill), `crt-glow` (phosphor bloom on primary text)

## Components

- **Primary button:** `--secondary` fill / `--primary` text / `--border-strong`
  1px frame / radius 0 / `px-3 py-3` / `small` type / hover fill `--muted` /
  focus `--ring`
- **Ghost button:** transparent fill / `--border` 1px / `--muted-foreground` text
  / hover text `--primary`
- **Card:** `panel` utility — `--card` fill, `--border` 1px, radius 0, `p-4`,
  no shadow; hover promotes the frame to `--border-strong`
- **Input:** `--card` fill / `--input` 1px border / radius 0 / `h-9` / `small`
  mono type / focus ring `--ring` / invalid border `--destructive`
- **Nav:** 1px bottom `--border`, Void background, active item `--primary` +
  `crt-glow`, inactive `--muted-foreground`
- **Tabs:** `-mb-px` 1px frames; active tab `--border-strong` + `--card` + glow
- **Caret:** `caret-blink` — 1.1s `step-end` opacity blink, decorative only

## Motion

- **Easing:** `step-end` for anything terminal-flavored (caret, boot lines);
  `cubic-bezier(0.2, 0, 0, 1)` for the rare opacity fade
- **Durations:** fast 120ms (hover/focus color), base 200ms (fades), caret 1.1s
- **On load:** optional one-shot typed boot lines on the hero. Nowhere else.
- **On scroll:** nothing. No reveals, no parallax.
- **On hover:** border color and background fill only.
- **Never animate:** layout, size, position, radius, page transitions; no CRT
  flicker, no screen curvature, no falling-green-characters effect.
- **Reduced motion:** the caret and boot typing stop under
  `@media (prefers-reduced-motion: reduce)`.

## Anti-patterns (never do these)

1. Any radius above 2px — no pills, no rounded avatars, no `rounded-xl`.
2. Any box-shadow. Elevation is 1px borders and phosphor glow only.
3. Gradients or blur/glass surfaces of any kind.
4. A second accent hue. Beam plus Alert/Warn for state is the whole palette.
5. CRT kitsch: screen curvature, flicker, static noise, "green rain", or
   ASCII-art filler used as decoration.
