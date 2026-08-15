# Curated Sources

What each source is, what it's good for, and exactly what you may take from it. Licensing posture matters: getting this wrong puts someone else's work in a client project.

## styles.refero.design — DESIGN.md library (free)

2,000+ AI-readable design systems extracted from real product websites, published specifically for use in Cursor, Claude Code, Codex, v0 and Lovable. Each entry ships four views (DESIGN.md, Tailwind v4, CSS Variables, Design Tokens) in Compact and Extended forms, with one-click Copy and .md download.

- **Take:** the entire DESIGN.md, verbatim, into a project. That is the product's stated purpose.
- **Best for:** starting a project with a proven, coherent system instead of letting the agent improvise; studying how good token tables are written.
- **Practice:** keep the style name in a provenance comment; re-check color contrast after applying (extracted palettes aren't guaranteed AA); the mood-line + role-column format is the part most worth imitating in your own files.

## motionsites.ai — premium AI website prompts (PAID)

A curated, constantly updated gallery of animated landing pages and hero sections, each backed by a ready-made build prompt. Also offers animated backgrounds, an academy, and an MCP server.

- **Take: nothing verbatim.** The prompt library is their paid product. Do not copy prompt text into projects, skills, or repos — free previews included.
- **Legitimate use:** browse to *name* the motion pattern you want ("scroll-driven 3D hero", "magnetic buttons", "dreamcore gradient field"), then implement it yourself and record the recipe in your DESIGN.md's Motion section. If the user owns a motionsites subscription, they paste the prompt themselves.
- **Best for:** the Motion section of a DESIGN.md — the layer static token files always under-specify.

## The ui-style-picker skill (this hub) — style prompts (free, MIT)

Seventeen named aesthetic directions (glassmorphism, neubrutalism, retro-tech terminal, claymorphism, aurorism…) as reusable prompts. Complementary to refero: refero gives you *a specific product's* system; ui-style-picker gives you *a genre* to author within.

- **Take:** everything — it's MIT, same as the rest of this hub.
- **Combine:** pick a genre from ui-style-picker, author the DESIGN.md with the template here, borrow token-table discipline from refero examples.

## General extraction rule (any other site)

Tokens, scales and principles are ideas — extractable. Assets, copy, illustrations and distinctive trade dress are property — not. The test: if a screenshot of your result could be mistaken for the reference site, you crossed the line. Extract the *why* (spacing rhythm, contrast strategy, type pairing logic), rewrite the *what*.
