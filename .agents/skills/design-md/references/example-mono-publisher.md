# Monospace Publisher — Design System (worked example)
> a bookshop for developers — everything set in code type, the products are the hero

**Theme:** dark, monochrome chrome; color enters only through the products.
**Provenance:** authored; principles extracted from the monospace editorial-commerce / dev-publisher genre (Codapress and its peers). Structure and vocabulary only — no assets or copy copied.

A content-and-commerce site (a technical-book publisher) where the entire type system — including the giant display headings, not just captions — is **monospace**. The chrome is pure black and white; the color and warmth come from the product objects themselves: a horizontal shelf of designed, faux-3D book covers that tilt and parallax as you browse. It feels like a terminal that grew up and opened a shop: precise, editorial, product-forward. The distinguishing idea is *mono as a display face*, applied to a real catalog rather than a UI.

## Tokens — Colors

The UI is two colors. The catalog supplies the rest.

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Void | `#0a0a0a` | `--void` | Page background — near-black, flat, edge to edge |
| Ink | `#f2f2f2` | `--ink` | All type: display headings, body, nav, labels — near-white |
| Glass | `rgba(255,255,255,0.08)` | `--glass` | The floating pill nav's frosted fill |
| Hairline | `rgba(255,255,255,0.14)` | `--hairline` | Dividers, card edges, the `View detail` underline |
| Product | *(from cover art)* | — | Color lives ONLY inside the book covers / product objects — the shelf is the palette |
| Badge | `#f2f2f2` on `--void` | `--badge` | `Bestseller` / `New` tags — monochrome, tiny, uppercase |

Rules: the chrome never introduces brand color — restraint makes the vivid covers pop. If you need warmth, design a better cover, don't tint the UI.

## Tokens — Typography

**Family:** ONE monospace across the whole site — nav, huge headings, body, badges, prices. That single decision is the identity. (A serif or grotesque may appear *on the book covers*, which are their own designed objects, but never in the site chrome.)
**Weights:** the mono in regular for body and a bold cut for display. Mono at display size is the whole trick — the fixed-width rhythm is the brand.

### Type scale

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|
| display | clamp(40px, 7vw, 120px) | 1.0 | normal | `Books by Codapress`, `Latest release` — mono, huge, left-aligned |
| heading | clamp(22px, 3vw, 40px) | 1.1 | normal | Section titles, book titles |
| body | 15–16px mono | 1.6 | normal | Descriptions — mono body needs extra line-height to breathe |
| label | 11–12px mono | 1.4 | +0.08em | UPPERCASE badges, nav, `VIEW DETAIL`, `ALL BOOKS →` |

Note: mono body copy is harder to read in long runs — keep descriptions short (2–3 lines per product) and lift line-height. Mono earns its keep in headings and labels; don't set an essay in it.

## Spacing, radii, elevation

- **Spacing:** roomy and left-aligned; the fixed-width type sets a natural grid rhythm — lean into it.
- **Radii:** small on cards (4–8px); large/pill on the floating nav only.
- **Elevation:** the product covers cast soft real shadows and tilt in 3D; the chrome stays flat. Depth belongs to the merchandise, not the layout.
- **Container:** the book shelf is a horizontally-scrolling row that overflows the viewport on both edges — the "there's more" affordance.

## Components

**Floating glass pill-nav:** a rounded, frosted (`backdrop-blur`) pill centered near the top, holding the wordmark + `BOOKS INSIGHTS CONTACT CLAIM` in mono. It floats over content rather than sitting in a bar.
**Square logo mark:** a small boxed monogram (a `C` in a rounded square) — a stamp, top-left.
**Product object (the hero):** a faux-3D rendered book cover with real spine/shadow, presented at a slight angle; hover lifts and straightens it. The covers are individually art-directed and are where all the color lives.
**Badge taxonomy:** tiny uppercase mono tags — `Bestseller`, `New`, `Fully Revised` — sitting above each cover.
**Text CTAs:** `View detail` with a hairline underline, `ALL BOOKS →` with an arrow glyph. No filled buttons in the chrome; the covers are the buttons.

## Motion

- **Easing:** clean and mechanical — quick, precise eases (150–250ms). This style is composed, not bouncy.
- **Shelf:** the book row scrolls horizontally (drag / scroll-linked); covers parallax and tilt toward the cursor as they pass.
- **Hover:** a cover lifts, straightens, and its shadow deepens — a tactile "pick it up" beat.
- **Headings:** mono display can type-in or mask-reveal on scroll, echoing a terminal print, but keep it subtle — the fixed-width rhythm is already doing work.
- **Never animate:** body descriptions while being read; the nav's blur into anything distracting.
- **`prefers-reduced-motion`:** freeze the parallax/tilt, keep hover as a simple opacity/shadow change, make the shelf a normal scroll region.

## Anti-patterns (never do these)

1. No non-mono type in the chrome — the moment a heading goes grotesque, the identity is gone.
2. No brand color on the UI — the covers carry color; the chrome is black and white.
3. No filled buttons competing with the product objects — the merchandise is the interface.
4. Don't set long body copy in mono — short product blurbs only; mono readability drops fast.
5. No flat product thumbnails — the faux-3D, art-directed covers are the whole hero; a plain grid of flat images kills it.
6. Don't bury the catalog behind the effect — this is commerce; titles, prices, and `View detail` must be instantly scannable.
