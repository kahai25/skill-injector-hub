# Immersive Studio — Design System (worked example)
> a black stage where motion is the content and the UI gets out of the way

**Theme:** dark only — this style cannot be done in light mode.
**Provenance:** authored; principles extracted from the award-winning WebGL-studio genre (Lusion and its peers). Motion *vocabulary and structure only* — no assets, code, or copy copied. If you want their exact work, hire them; this file teaches the pattern.

A near-empty black canvas is the whole design. Almost nothing is on screen at rest — a wordmark, one line of intent, a custom loader counting up. Everything else arrives through motion: type animates in per-letter, projects reveal on scroll, the cursor bends space around it. The restraint is the sophistication. Color belongs to the *content* (project videos, 3D scenes); the *chrome* stays monochrome so the work is the only thing that glows.

## Tokens — Colors

Deliberately almost colorless. The palette is a stage, not a subject.

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Stage | `#000000` | `--stage` | The canvas. Pure black, edge to edge, no sections or seams |
| Ink | `#ffffff` | `--ink` | All UI text and the loader — pure white, full strength |
| Ghost | `rgba(255,255,255,0.55)` | `--ghost` | Eyebrows, meta labels, "scroll to explore" |
| Faint | `rgba(255,255,255,0.12)` | `--faint` | The empty half of the loader bar; hairline rules |
| Content | *(from media)* | — | Color lives ONLY inside project thumbnails / video / 3D. The frame never competes with it |

Rules: the UI introduces no brand color at all — resist it. Any accent you're tempted to add belongs on a hover state inside the work, not on the chrome. Contrast is always pure white on pure black; there are no grays in the type except intentional Ghost meta.

## Tokens — Typography

**Family:** one large grotesque/display sans for everything (think tightly-set, wide-weight-range neo-grotesque). No serif, no second family. A monospace may appear *only* in the numeric loader and technical meta.
**Weights:** a wide display weight for headlines; a regular for the rare body paragraph. The size contrast does the work, not the weight count.

### Type scale — driven by scale contrast, not many steps

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|
| mega | clamp(48px, 9vw, 160px) | 0.95 | -0.02em | Full-bleed statement type; often the only thing on screen |
| display | clamp(32px, 5vw, 72px) | 1.0 | -0.01em | Section headers, project titles |
| body | 16–18px | 1.5 | normal | Used sparingly — one short paragraph per section, max |
| eyebrow | 12px | 1.4 | +0.12em | UPPERCASE, Ghost color, wide-tracked meta labels |
| loader | 13px mono | 1 | +0.05em | The counting `000→100` numerals |

The signature move: **headline type set enormous, then animated in one glyph at a time.** Each character is its own element so it can stagger, mask-reveal, or drift independently.

## Spacing, radii, elevation

- **Spacing:** vast. Whitespace (blackspace) is the primary compositional tool. Sections are a full viewport tall; elements float in emptiness rather than sitting in a grid.
- **Radii:** 0 on chrome. Project media may be sharp-cornered or fully masked into shapes by the WebGL layer — but never a "card with rounded corners."
- **Elevation:** none in the CSS sense. Depth is *real* — parallax and 3D, not box-shadows. There are no shadows anywhere in the UI.
- **Container:** effectively none. Content is placed by viewport ratio and motion path, not a max-width column.

## Components

**Custom loader (non-negotiable — it is the brand's handshake):** a numeric counter `000 → 100` bottom-left in mono, plus a thin two-tone bar (Ink fill over Faint track). The site does not render until it completes. This is the one component you must build first; a default spinner breaks the entire style.
**Wordmark:** small, top-left, Ink. Never large, never centered.
**Nav:** hidden behind a MENU toggle that opens a full-screen overlay; the resting page shows almost no navigation.
**Cursor:** a custom element, not the OS arrow — a dot or ring that scales/lags on hover and "magnetizes" to interactive targets.
**Project reveal:** media that scales, unmasks, or slides in as it enters the viewport; title glyphs stagger alongside. Hovering a project is where the only motion-color lives.
**CTA / links:** text with an animated underline or a magnetic pull toward the cursor — never a filled button with a radius.

## Motion — this IS the design; spend the most words here

- **Easing:** expressive, weighted curves — `cubic-bezier(0.16, 1, 0.3, 1)` (strong ease-out) for entrances; smoothed inertia on scroll (lerp toward target, never native jump). Nothing uses `ease` or `linear` except marquees.
- **Durations:** entrances 600–1200ms (slow and deliberate, this style breathes); micro-interactions 150–300ms; the loader runs its own real-time count.
- **Scroll:** **scroll-driven and smoothed.** Position drives reveals, parallax depth, pinned sections, and horizontal marquees. Native scroll is intercepted and eased. This is the backbone — get the smooth-scroll lerp right before anything else.
- **On load:** nothing appears until the loader hits 100, then the hero assembles — glyphs stagger in, the canvas fades from black.
- **Per-letter:** headline text animates one character at a time (mask-reveal, stagger, or drift). Wrap each glyph in its own span.
- **Cursor:** custom cursor lags behind the pointer (lerp), scales on interactive hover, and magnetizes CTAs toward itself.
- **Marquees:** endlessly scrolling tag strips (`WEB • DESIGN • 3D • ANIMATION`) at constant `linear` speed — the one place linear is correct.
- **Never animate:** the reader's body copy while they're reading it; anything that induces layout shift; the loader's honesty (don't fake the percentage).
- **`prefers-reduced-motion`:** this is a hard requirement, not a nicety. Collapse per-letter staggers to a simple fade, disable parallax and smooth-scroll (return to native), freeze marquees, and shorten the loader. The experience must remain usable and non-nauseating.

## Performance & honesty notes (this style's failure modes)

- WebGL/3D and smooth-scroll are heavy. Budget the loader time honestly, lazy-load offscreen scenes, and cap devicePixelRatio. A janky version of this style is worse than not attempting it.
- The custom cursor and intercepted scroll are **accessibility risks** — keyboard navigation, focus order, and reduced-motion must all still work. Test with a keyboard and a screen reader, not just the mouse.
- SEO: a black canvas that renders via JS ships an empty shell to crawlers. Ensure real headings and copy exist in the DOM (they do here — the marquee glyphs are real text), or prerender.

## Anti-patterns (never do these)

1. No brand color on the chrome — color lives only inside the work.
2. No default spinner or instant load — the custom counting loader is the signature.
3. No rounded cards, no box-shadows, no "sections" with backgrounds — one continuous black stage.
4. No dense layouts — if it doesn't breathe, it isn't this style.
5. No motion without a reduced-motion fallback — the spectacle can't come at the cost of usability.
6. Don't clone a specific studio's scenes or copy — extract the *vocabulary* (loader, per-letter type, smooth-scroll reveals, custom cursor) and build your own.
