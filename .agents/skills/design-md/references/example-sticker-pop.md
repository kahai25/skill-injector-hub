# Sticker-Pop Editorial — Design System (worked example)
> loud, tactile, and funny — a brand that refuses to look corporate

**Theme:** light, saturated. This style lives on one bold flat color, not white.
**Provenance:** authored; principles extracted from the playful anti-corporate editorial genre (Nodeck and its peers). Structure and vocabulary only — no assets or copy copied.

The opposite of the minimal black-canvas studio look. One shouting flat color fills the screen, the wordmark is a fat rounded "sticker" with a thick black outline and a hard drop shadow, and real-world objects (sticky notes, highlighters, tape, hands) sit in the frame like a desk photographed from above. The voice is witty and anti-jargon — "sells thinking, not slides." The whole point is warmth and personality; if it looks like a SaaS template, it failed.

## Tokens — Colors

Built around ONE dominant brand color plus black and white. Restraint through loudness, not neutrality.

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Pop | `#ff86ab` (or any single saturated hue) | `--pop` | The entire background. Flat, edge to edge, unapologetic |
| Ink | `#111111` | `--ink` | Sticker outlines, drop shadows, body text — near-black, never pure #000 |
| Paper | `#ffffff` | `--paper` | The sticker fill and any card faces |
| Highlight | `#f4e58a` | `--highlight` | A second warm accent for props/details (sticky-note yellow) — used sparingly |
| Muted | `rgba(17,17,17,0.6)` | `--muted` | Small eyebrow labels ("WE ARE") on the Pop background |

Rules: pick ONE Pop color and commit — swapping it per section kills the identity. Ink is the workhorse (outlines + shadow + text); white is the sticker. Contrast of Ink on Pop must clear WCAG AA for body text — test it, saturated mid-tones often fail.

## Tokens — Typography

**Family:** a heavy rounded display face for the wordmark and hero (fat, friendly, almost cartoon — think a bold rounded grotesque or a "marker" display), paired with a plain clean sans for body and labels. The contrast between playful display and neutral body is the joke landing.
**Weights:** display is one very heavy weight; body is regular + medium.

### Type scale

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|
| sticker | clamp(64px, 16vw, 260px) | 0.9 | -0.01em | The wordmark — enormous, outlined, shadowed |
| hero | clamp(28px, 5vw, 64px) | 1.05 | normal | Big statements |
| body | 16–18px | 1.55 | normal | Plain sans, high legibility, room to breathe |
| eyebrow | 12–13px | 1.4 | +0.14em | UPPERCASE, Muted, wide-tracked ("WE ARE", "A CONSULTING COMPANY…") |

## Spacing, radii, elevation

- **Spacing:** generous and centered. Content is often stacked and centered on the Pop field, not gridded into columns.
- **Radii:** high on the sticker/cards (12–24px) — roundness is part of the friendly tone — but the sticker's *outline* is what reads, not the corner.
- **Elevation — the signature:** the **hard offset drop shadow.** A solid Ink shadow offset a few pixels (no blur, or minimal), giving the "die-cut sticker peeled off a page" look. This one shadow style is the whole aesthetic; use it on the wordmark and key cards.
- **Sticker outline:** a thick Ink stroke (6–12px) around white shapes. Outline + hard shadow together = the sticker. One without the other looks wrong.
- **Container:** relaxed; hero elements can bleed to the edges (a highlighter or sticky note entering from off-frame).

## Components

**Sticker wordmark:** white fill, thick Ink outline, hard offset Ink shadow, slight rotation (1–3°) so it feels placed by hand, not aligned by a grid.
**Prop photography:** real objects (sticky notes, markers, tape, hands) shot top-down, composited around the type. This tactile realism is what separates the style from flat neubrutalism — keep it if you can, it's the warmth.
**Button:** white or Ink pill with the same outline + hard-shadow treatment; hover presses it "down" (shadow shrinks, element nudges toward the shadow) like a physical press.
**Card:** Paper face, Ink outline, hard shadow, optional slight tilt.
**Eyebrow label:** tiny uppercase Muted text above the loud element — the deadpan setup before the punchline.

## Motion

- **Easing:** bouncy/springy on entrances (`cubic-bezier(0.34, 1.56, 0.64, 1)` — a gentle overshoot) fits the playful tone; snappy 150–250ms on interactions.
- **On load / scroll:** the wordmark and copy assemble on scroll — words pop or spring in, props slide in from the edges. A little overshoot sells the "sticker slapped down" feeling.
- **Hover:** physical presses — buttons and cards nudge toward their shadow; stickers wobble slightly.
- **Never animate:** into illegibility; the wit depends on people actually reading the deadpan copy — don't animate body text while it's being read.
- **`prefers-reduced-motion`:** drop the spring/overshoot to a simple fade; the style still reads fine static because the outline+shadow does the visual work.

## Anti-patterns (never do these)

1. No multiple background colors — one Pop hue, committed.
2. No blurred/soft shadows — the shadow is hard and offset, or it isn't this style.
3. No outline without the hard shadow (or vice versa) — they only work as a pair.
4. No corporate stock illustration — use real photographed objects or nothing.
5. No perfectly-aligned everything — a few degrees of hand-placed rotation is the charm; a rigid grid kills it.
6. Don't let the color fail contrast — loud is fine, illegible is not; test Ink-on-Pop for AA.
