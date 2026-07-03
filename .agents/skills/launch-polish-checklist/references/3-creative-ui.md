# 3 — Distinctive creative UI

Default AI-generated apps look the same: Inter font, purple-to-indigo gradient on white, three-column feature grid, generic hero. Users can smell it in 2 seconds. The polish pass is where you commit to one visual identity.

## The anti-patterns to kill

- **Inter or Poppins everywhere.** Fine as a body font, but never as your identity.
- **Purple → indigo gradient hero.** Overexposed. Pick a different palette or a solid color with intent.
- **"Card grid of 6 features with icons."** Every AI landing page has one.
- **`text-white bg-black` hardcoded in components.** Breaks dark mode and bypasses theming. All colors go through `src/styles.css` tokens.
- **Generic stock imagery.** Better to have zero images than a Unsplash "team high-fiving at laptop."

## The 4 decisions to make

Force these choices *before* touching a component:

### 1. Typography pair

One display font + one body font, both distinctive. Examples of pairs that don't scream "AI defaults":
- Fraunces (display, serif) + Inter (body)
- Space Grotesk (display) + IBM Plex Sans (body)
- Instrument Serif + Geist Sans
- Bricolage Grotesque + Söhne

Install via `@fontsource/*`:
```bash
bun add @fontsource/fraunces @fontsource/inter
```
Import in `src/main.tsx` and wire into `src/styles.css` as `--font-display` / `--font-sans`.

### 2. Color palette

Three colors max: background, surface, one accent. Everything else derives. Put every value in `src/styles.css` as an `oklch()` token — never hardcode in a component.

```css
:root {
  --background: oklch(0.98 0.005 90);   /* warm off-white */
  --foreground: oklch(0.18 0.02 260);
  --primary: oklch(0.55 0.22 25);       /* clay red — the identity */
  --muted: oklch(0.94 0.01 90);
}
```

If the user hasn't chosen a style, pair with the `ui-style-picker` skill and pick one of the 10 documented directions (Neomorphism, Glass, Skeu, Flat, Material, Brutalism, Neubrutalism, Clay, Y2K, Cyberpunk).

### 3. One distinctive layout choice

Pick **one** thing that isn't the default:
- Asymmetric hero (big type left, image bleeding off-canvas right).
- Oversized editorial type (headline is 120px+ on desktop).
- Sidebar-first navigation instead of top bar.
- No hero at all — jump straight into the product.
- Bento grid for features instead of 3-column.

### 4. One micro-detail

Something small that shows a human cared:
- Custom cursor on interactive elements.
- Ligatures / stylistic set on the display font.
- A single animated element (subtle gradient shift, cursor-follow blob) — not every element animating at once.
- Real photography or a considered illustration set.

## Verification

Open the preview at desktop and mobile. Ask: **if I stripped the logo, would this page look like any other Lovable app?** If yes, iterate. If no, ship.
