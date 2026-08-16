# Chrome Atmospheric Editorial — Design System (worked example)
> a corporate department from a parallel-universe 1999 — sky, scanlines, and liquid metal

**Theme:** dark-tinted over photography. Not a flat color and not a black canvas — a *photographic* atmosphere.
**Provenance:** authored; principles extracted from the chrome/Y2K-corporate editorial genre (PX PUSH and its peers). Structure and vocabulary only — no assets or copy copied.

An atmospheric sky/cloud photograph fills the background, dimmed and pulled through a heavy horizontal scanline/interlace overlay so the whole page reads like a CRT broadcast. Over it: a chromed, liquid-metal 3D wordmark, enormous tightly-set display type sliding horizontally as a marquee, and small monospace "transmission" captions (`V.02 —— WELCOME ——`). The voice is dry, formal, and slightly theatrical — an "operating department," a "retained" service, copy written like a memo from a serious institution. The mood is aspirational-corporate with a knowing retro-futurist wink.

## Tokens — Colors

The palette comes mostly from the photograph. The UI adds only white type, a mono grey, and one signal accent.

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Atmosphere | *(photographic, blue-grey)* | `--atmosphere` | The sky/cloud background image, dimmed ~30–50% |
| Scanline | `rgba(0,0,0,0.12)` | `--scanline` | The horizontal interlace overlay — 1–2px lines, the signature texture |
| Ink | `#f4f6f8` | `--ink` | Display type and headings — near-white, slightly cool |
| Chrome | *(gradient)* | `--chrome` | The metallic logo: a silver→grey→white gradient with a dark core, faux-3D bevel |
| Meta | `rgba(244,246,248,0.6)` | `--meta` | Monospace captions and labels — recedes into the atmosphere |
| Signal | `#4ade80` | `--signal` | The single live-status accent (a green "online" dot). Used once, tiny |

Rules: the background photo carries the color; the UI stays monochrome-plus-one-signal. Never add a second bright accent — the atmosphere is the color story. The scanline overlay goes on top of everything, always.

## Tokens — Typography

**Family:** a tight, wide-weight neo-grotesque (Helvetica/Neue-Haas lineage) for the giant display marquees and headings, paired with a **monospace** for captions, section numbers, and technical labels. The grotesque/mono pairing is the whole typographic identity.
**Weights:** display in a heavy/bold cut; mono in regular. Tight tracking on the huge type.

### Type scale

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|
| marquee | clamp(64px, 12vw, 200px) | 0.95 | -0.03em | The sliding horizontal headline — tight, huge, cropped by the viewport edges |
| heading | clamp(28px, 4vw, 56px) | 1.05 | -0.02em | Section headers |
| body | 16–18px | 1.5 | normal | Grotesque, comfortable measure |
| caption | 12–13px mono | 1.4 | +0.06em | UPPERCASE mono transmissions: `V.02 —— WELCOME ——`, `//`, section `Nº001` |

The signature moves: **display type set so large it bleeds off both edges and slides horizontally**, and **every section stamped with a monospace number** (`Nº001 / INTRO`) like a document index.

## Spacing, radii, elevation

- **Spacing:** editorial and generous, but content sits in a loose document structure (numbered sections) rather than floating in void.
- **Radii:** 0. Sharp edges; this style is print-broadcast, not soft-app.
- **Elevation:** none from shadows. Depth comes from the *chrome bevel* on the logo and the atmospheric photo, not box-shadows.
- **Texture (non-negotiable):** the horizontal scanline/interlace overlay across the entire viewport is what makes this style. Without it, it's just type on a photo.
- **Container:** wide, near-full-bleed; the marquee type intentionally exceeds it.

## Components

**Chrome wordmark/logo:** a liquid-metal 3D mark — silver gradient, dark reflective core, faux-bevel highlights. The centerpiece. Often slowly rotating or catching a moving specular highlight.
**Marquee band:** a row of the display word repeated with a `●` bullet separator (`● On–Demand Design Department ● …`), scrolling horizontally at constant speed. Used as section dividers.
**Transmission caption:** a monospace block bottom-corner, dashed rules around a status message, like a broadcast ident.
**Section stamp:** `Nº00X / NAME` in mono at the top of each section.
**Status dot:** a single small `--signal` green dot meaning "open / online" — the only saturated color on the page.
**CTA:** text link with a `↗` arrow glyph, understated; never a big filled button.

## Motion

- **Easing:** smooth, mechanical — steady `linear` for the marquees, gentle ease for reveals. The tone is "broadcast running," not "bouncy."
- **Marquees:** horizontal, constant-speed, seamless loops — both the giant display type and the bullet-separated tag bands. This perpetual horizontal drift is the style's heartbeat.
- **On scroll:** sections index past like documents; the chrome logo catches a moving highlight; parallax between the fixed atmosphere photo and the moving type.
- **Scanline life:** the overlay may subtly flicker or drift 1px to feel like a live signal — keep it faint, never seizure-inducing.
- **Never animate:** the body copy while it's read; the scanline into anything harsh.
- **`prefers-reduced-motion`:** freeze the marquees to static (still legible), stop the scanline flicker, drop parallax. The composition holds still.

## Anti-patterns (never do these)

1. No flat solid background — the atmospheric photo + scanline overlay is the identity.
2. No rounded corners, no soft shadows — this is sharp broadcast, not soft app.
3. No second bright accent — one green status dot, and the photo carries the rest.
4. No missing scanline — type on a plain photo is a different, weaker style.
5. No casual voice — the copy is dry, formal, institutional; the retro-corporate tone is the joke.
6. Don't skip the mono/grotesque split — one font family flattens the whole thing.
