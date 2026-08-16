---
name: design-md
description: Give any AI-built project a real design system by authoring or importing a DESIGN.md — a single AI-readable file carrying the theme, color tokens, typography, spacing, components and motion rules the agent must follow on every edit. Ships a blank template, six worked examples (a flat green terminal system, a motion-heavy black WebGL studio, a loud anti-corporate sticker-pop editorial, a Y2K chrome atmospheric editorial, a concept-narrative portfolio, and a monospace publisher), and a curated gallery guide. Use when the user says "make it look professional", "it looks like every other AI site", "use this design", "match this site's style", "create a design system", "write a DESIGN.md", or pastes a link from styles.refero.design or motionsites.ai. Also use at project start, before any redesign, and whenever visual drift appears between pages.

---

# DESIGN.md

AI-built apps drift visually because the design lives in the agent's short-term memory. A `DESIGN.md` in the project root fixes that: it is the single source of truth the agent re-reads on every edit, the same way `AGENTS.md` carries behavior rules.

**The rule this skill enforces: tokens before taste.** No hex value, font size, or shadow gets written into a component that is not derived from the DESIGN.md. If a new value is needed, it gets added to DESIGN.md first, then used.

## The workflow

1. **Get a DESIGN.md** — one of three ways:
   - **Import one:** browse [styles.refero.design](https://styles.refero.design) (2,000+ free, AI-readable design systems extracted from real product sites — every entry has Copy and .md download, plus Tailwind v4 / CSS-variable views). Pick a style, download the .md, drop it in the project root.
   - **Author one:** fill in `assets/DESIGN.template.md` from the client's brand or an agreed direction.
   - **Extract one:** given a reference site the user owns or admires, read its rendered styles and write the tokens into the template. Describe, don't copy assets.
2. **Wire it in.** Add one line to the project's agent rules (AGENTS.md / project knowledge): *"DESIGN.md is the design source of truth. Derive every color, size, font and shadow from it. If a needed value is missing, propose an addition to DESIGN.md before using it."*
3. **Convert tokens to code once** — CSS variables or the Tailwind theme block — and reference only the variables in components. The DESIGN.md and the token file must never disagree; when they do, DESIGN.md wins and the token file gets regenerated.
4. **Apply, then audit.** After the first pass: check color contrast (WCAG AA), check that no component carries a hardcoded value, and screenshot every page — the drift you're killing is visible, so verification is visual.

## Motion

Static token files under-specify motion, and motion is where AI sites look most generic. Add a `## Motion` section to every DESIGN.md (the template includes one): easing curves, duration scale, what animates on scroll vs hover vs load, and — critically — what *never* animates. Respect `prefers-reduced-motion` globally.

For motion inspiration and hero patterns, [motionsites.ai](https://motionsites.ai) is a curated gallery of animated landing pages with ready-made prompts. **Their prompt library is a paid product — link to it, learn from what you see, but never reproduce their prompts in a project or skill.** Browsing the gallery to name the pattern you want ("magnetic buttons", "scroll-driven 3D hero") and then implementing it yourself is the legitimate use.

## What a good DESIGN.md contains

See `assets/DESIGN.template.md` for the full scaffold and `references/example-crt.md`, `references/example-immersive-studio.md`, `references/example-sticker-pop.md`, `references/example-chrome-editorial.md`, `references/example-concept-portfolio.md`, and `references/example-mono-publisher.md` for six complete worked examples. The load-bearing sections:


| Section | Why it matters |
|---|---|
| Theme + mood line | One sentence the agent can test any decision against |
| Color tokens table | Name, value, CSS variable, **role** — role is what stops misuse |
| Typography + type scale | Family, weights, exact sizes with line-height and tracking |
| Spacing + radii | The rhythm; the difference between designed and assembled |
| Components | Buttons, cards, inputs: exact recipes referencing the tokens above |
| Motion | Easing, durations, what animates, what never does |
| Anti-patterns | The five things this style must never do — as important as the rules |

## Sourcing rules (do not skip)

- **styles.refero.design**: free to copy into projects — that is its stated purpose. Keep the style's name in a comment for provenance.
- **motionsites.ai**: paid prompts. Reference and link only. Never paste their prompt text into anything.
- **A client's own brand assets**: theirs — use freely on their project.
- **A third-party site the user "wants to look like"**: extract *tokens and principles* (spacing rhythm, type scale, palette structure), never copy assets, copy, or distinctive trade dress wholesale. If the result would be mistaken for the reference site, you went too far.

## References

| File | Use |
|---|---|
| `assets/DESIGN.template.md` | Blank scaffold to author a new design system |
| `references/example-crt.md` | First worked example: green CRT terminal style |
| `references/example-immersive-studio.md` | Second worked example: black-canvas WebGL "immersive studio" style — heavy on the Motion section |
| `references/example-sticker-pop.md` | Third worked example: loud flat-color "sticker-pop editorial" style (playful, anti-corporate) |
| `references/example-chrome-editorial.md` | Fourth example: Y2K "chrome atmospheric editorial" — sky photo + scanlines + liquid-metal 3D type |
| `references/example-concept-portfolio.md` | Fifth example: "concept-narrative portfolio" — a site built as one committed metaphor with a live HUD |
| `references/example-mono-publisher.md` | Sixth example: "monospace publisher" — mono as a display face for editorial commerce; products are the hero |
| `references/galleries.md` | Curated sources and exactly what each may be used for |

