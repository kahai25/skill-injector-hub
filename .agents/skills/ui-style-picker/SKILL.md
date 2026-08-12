---
name: ui-style-picker
description: Pick and apply a distinct UI visual style (Neomorphism, Glassmorphism, Skeuomorphism, Flat, Material, Brutalism, Claymorphism, Neubrutalism, Retro/Y2K, Cyberpunk/Neon) to a Lovable app by writing the matching token block into src/styles.css and adding utility classes for surfaces, shadows, and borders. Trigger when the user asks for a UI style, wants to "apply neomorphism/glassmorphism/etc.", asks "what UI styles can I pick", wants to change the visual language of the app, or asks to make the app look like a specific aesthetic.
---

# UI Style Picker

Apply one distinct UI aesthetic to the current project by editing tokens in `src/styles.css`. Never hardcode colors in components — everything goes through semantic tokens.

## Workflow

1. Ask the user which style (or infer from their prompt). Offer the menu below if unclear.
2. Read the current `src/styles.css` to see existing tokens.
3. Merge the chosen style's token block from `references/<style>.md` into `:root` and `.dark`. Add any `@utility` blocks after `@theme inline`.
4. Show a small demo (button + card) using the new tokens so the user can eyeball it.
5. If the user rejects, revert and offer another style. If they accept, stop.

## Styles available

| Style | File | Feel |
| --- | --- | --- |
| Neomorphism | `references/neomorphism.md` | Soft extruded surfaces, dual light/dark shadows |
| Glassmorphism | `references/glassmorphism.md` | Frosted translucent panels with backdrop blur |
| Skeuomorphism | `references/skeuomorphism.md` | Realistic textures, gradients, inner highlights |
| Flat | `references/flat.md` | Solid colors, zero shadow, sharp edges |
| Material | `references/material.md` | Elevation shadows, ripple accents, rounded rects |
| Brutalism | `references/brutalism.md` | Raw HTML feel, system fonts, harsh borders |
| Neubrutalism | `references/neubrutalism.md` | Chunky black borders, hard offset shadows, bold color |
| Claymorphism | `references/claymorphism.md` | Puffy 3D pastel blobs with inner+outer soft shadow |
| Retro-Y2K | `references/retro-y2k.md` | Chrome, gradients, aqua buttons, pixel accents |
| Cyberpunk-Neon | `references/cyberpunk-neon.md` | Dark base, neon glow rings, mono type |

## Component restyle prompts (uistyle.lovable.app set)

`references/prompts/` holds 17 strict, copy-paste restyle prompts. Each one restyles a single component's aesthetic layer only — layout, JSX structure, hierarchy, labels, and functionality must not change — and includes exact hex values, shadow values, radii, typography, and a FORBIDDEN list.

Use these when the user wants **one component** transformed rather than the whole app theme. Use the token files above when they want the **whole app's** design system changed.

| Style | Prompt file |
| --- | --- |
| Neumorphism | `references/prompts/neumorphism.md` |
| Soft UI | `references/prompts/soft-ui.md` |
| Glassmorphism | `references/prompts/glassmorphism.md` |
| Claymorphism | `references/prompts/claymorphism.md` |
| Gooey / Liquid Morphism | `references/prompts/gooey-liquid-morphism.md` |
| Minimal Brutalism | `references/prompts/minimal-brutalism.md` |
| Skeuomorphic Revival | `references/prompts/skeuomorphic-revival.md` |
| Kinetic Minimalism | `references/prompts/kinetic-minimalism.md` |
| Hyperflat / Flat 3.0 | `references/prompts/hyperflat-flat-3-0.md` |
| Aurorism | `references/prompts/aurorism.md` |
| Digital Bauhaus | `references/prompts/digital-bauhaus.md` |
| Chromatic Vaporwave Minimalism | `references/prompts/chromatic-vaporwave-minimalism.md` |
| Isomorphic 3D | `references/prompts/isomorphic-3d.md` |
| Frosted Metal Aesthetic | `references/prompts/frosted-metal-aesthetic.md` |
| Color-Form Modernism | `references/prompts/color-form-modernism.md` |
| Retrofuturism | `references/prompts/retrofuturism.md` |
| Retro-Tech Terminal Modernism | `references/prompts/retro-tech-terminal-modernism.md` |

When applying one of these in a Lovable project, still route colors through tokens or scoped utilities in `src/styles.css` instead of hardcoding hex in JSX — translate the prompt's hex values into `oklch()` tokens.

## Rules

- Only edit `src/styles.css` — never hardcode colors in components.
- All colors in `oklch()`. Keep existing shadcn token names (`--background`, `--foreground`, `--primary`, etc.) — override values, don't rename.
- Add style-specific extras as new tokens (`--shadow-neo`, `--surface-glass`) and expose them via `@theme inline` when needed as utilities.
- One style at a time. If switching, remove the previous style's extra tokens/utilities first.
- Follow each prompt's FORBIDDEN list literally — those constraints are what keep the style recognizable.

