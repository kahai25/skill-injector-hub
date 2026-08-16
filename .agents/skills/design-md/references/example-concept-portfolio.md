# Concept-Narrative Portfolio — Design System (worked example)
> the whole site is one committed metaphor — here, a subject on an operating table

**Theme:** dark, clinical, single acid accent.
**Provenance:** authored; principles extracted from the concept-driven creative-developer portfolio genre (Silvia Malavasi and its peers). Structure and vocabulary only — no assets or copy copied.

This isn't primarily a *look*, it's a *format*: a personal portfolio wrapped in one strong conceptual metaphor that governs every label, transition, and interaction. In the reference case the metaphor is a **medical specimen dissection** — the loader reads `LOADING SPECIMEN`, the intro is a `CLASSIFIED FILE`, the scroll is a `DISSECTION`, a live **vitals HUD** (`SpO₂ / EtCO₂ / HR`) sits in the corner, and the visitor is told to `CLICK THE BRAIN TO START`. The palette and type are almost secondary — the metaphor is the design. Any strong concept works (a flight recorder, a terminal boot, a case file, an autopsy); the discipline is that *everything* bends to it.

## The concept layer (author this first)

Before tokens, write the metaphor down and derive the vocabulary from it. For a "dissection" concept:

| Generic UI element | Reskinned by the concept |
|---|---|
| Loading % | `LOADING SPECIMEN … 100` |
| Intro / about | `FILE 015 // CLASSIFIED`, `STATUS: SUBJECT CONSCIOUS` |
| Scroll prompt | `SCROLL TO START DISSECTION` |
| Skills list | vitals / readouts / `INTAKE 2015` |
| Section end | `PROCEDURE HALTED — INCISION`, `END DISSECTION` |
| Contact CTA | `SUBJECT ACQUIRED` → `HIRE ME` |

Every string is in-world. This table *is* the design work; the tokens below just dress it.

## Tokens — Colors

Restrained on purpose so the concept and the readouts carry the personality.

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| Slab | `#0a0a0a` | `--slab` | Near-black background — the operating theatre / dark room |
| Readout | `#c6f24e` | `--readout` | Acid lime — all HUD text, status labels, the "instrument" glow. The one accent |
| Ink | `#e8e8e8` | `--ink` | Primary display text |
| Ghost | `rgba(232,232,232,0.5)` | `--ghost` | Secondary labels, disabled/"halted" states |
| Alert | `#ff4d4d` | `--alert` | Rare — a flatline, an error, a warning within the metaphor |

Rules: one instrument-accent (here acid lime) does all the "machine is alive" work; everything else is near-black and off-white. The accent should feel like a monitor's phosphor, not a brand color.

## Tokens — Typography

**Family:** a **monospace** for all the HUD/readout/label text (it must feel like an instrument printout), plus one clean grotesque or condensed display for the human-scale headings (the name, the big statements). Mono for the machine, sans for the person.
**Weights:** mono regular/bold; display in one strong weight.

### Type scale

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|
| name | clamp(40px, 8vw, 120px) | 1.0 | -0.01em | The subject's name — the one human, large moment |
| heading | clamp(24px, 3.5vw, 48px) | 1.1 | normal | Section / stage titles |
| readout | 12–14px mono | 1.4 | +0.08em | UPPERCASE HUD text: `STATUS: SUBJECT CONSCIOUS`, `SpO₂ 99%`, `FILE 015` |
| body | 16px | 1.55 | normal | The rare plain paragraph |

## Spacing, radii, elevation

- **Spacing:** cinematic — full-viewport stages the visitor moves through, not a scrollable document.
- **Radii:** 0–2px. Instruments and HUDs are boxy.
- **Elevation:** flat; depth is 3D/canvas (a rotating brain, a specimen) and HUD layering, not shadows.
- **HUD frame:** thin `--readout` hairline boxes and corner ticks around the vitals and file labels — the diegetic instrument chrome.
- **Container:** the HUD is fixed/pinned (corners of the viewport); the narrative content moves beneath it.

## Components

**Vitals HUD (signature):** a small fixed cluster of live-updating readouts (`SpO₂ 99% · EtCO₂ 39 · HR 79`) in mono `--readout`, always on screen — it sells "the machine is running" continuously.
**Themed loader:** `LOADING SPECIMEN … NN` counting up — the concept's handshake, same principle as the immersive-studio loader but reskinned to the metaphor.
**Staged scroll / scrollytelling:** scroll is often *taken over* to advance discrete narrative stages (`SCROLL TO START DISSECTION` → stages → `END DISSECTION`), not free document scroll.
**Diegetic interaction:** a hero interaction inside the metaphor — `CLICK THE BRAIN TO START` — instead of a generic "enter" button.
**Status/stage banners:** `PROCEDURE HALTED — INCISION`, `SCROLL DISABLED //` — system messages that stay in-world.
**Contact reveal:** the CTA arrives as a concept payoff (`SUBJECT ACQUIRED` → `HIRE ME`).

## Motion

- **Easing:** precise, instrument-like — quick snaps for HUD value changes, smooth eased transitions between stages.
- **Stage transitions:** scroll-driven, discrete, often pinned — each "incision" is a beat. Get the scroll-jack feeling deliberate, not laggy.
- **Live readouts:** the vitals tick and jitter subtly and continuously (small randomized deltas) so the instrument feels alive even at rest.
- **Never animate:** to the point of nausea or trapping the user; scroll-jacking is the biggest risk here.
 - **`prefers-reduced-motion`:** **critical for this genre** — release the scroll-jack back to native scrolling, stop the vitals jitter (show static values), and make every stage reachable without the choreography. The concept must survive as a plain scrollable page.

## Variant: editorial broadsheet / dystopian newspaper (Orwell-class)

The concept-narrative pattern isn't only for dark sci-fi HUDs — it works just as well wrapped in a *print* metaphor. A "propaganda newspaper" concept (imagine a 1984 Ministry-of-Truth front page) swaps the instrument aesthetic for editorial typography and adds moves the medical version doesn't have:

- **Broadsheet typography.** A serif or slab masthead, an all-caps nameplate, and a real dateline (`VOL. CCCXLII NO. 58,291 — MONDAY, APRIL 4, 1984`). Multi-column body text, drop caps, hairline column rules. The typographic system *is* the concept — it must read as a newspaper, not a webpage.
- **Redaction as a design element.** Solid black censor bars struck over "corrected" text — headlines whose facts change as you read, casualty numbers being "amended." The redaction block is this variant's signature visual, the equivalent of the medical version's vitals HUD.
- **Surveillance system messages.** In-world interjections that break the fourth wall of the metaphor: `THOUGHTCRIME DETECTED`, `THIS SESSION HAS BEEN RECORDED`, `2 + 2 = 5`. These are the concept "talking back," the same role as `PROCEDURE HALTED` in the medical example.
- **One ominous accent.** A single blood-red on black does all the alarm work; everything else is newsprint off-white on near-black.

Same discipline as the base pattern: commit the metaphor to every label, and — because a "newspaper you can't trust" is still a real thing someone made — keep the actual author/credit and any real links findable, and give reduced-motion users a plain readable version. The point is that the idea lands, not that the reader gets trapped.

## Accessibility & honesty notes (this genre's failure modes)

- **Scroll-jacking + a taken-over cursor are the two biggest accessibility risks in web design.** Keyboard navigation, focus order, and a reduced-motion fallback are mandatory, not optional. Test with a keyboard and a screen reader.
- Don't let the metaphor bury the information a real client needs: who this is, what they do, how to hire them, and the work itself must be findable, in-world labels notwithstanding.
- Concept-heavy sites often ship an empty shell to crawlers — ensure the name, role, and contact exist as real DOM text.

## Anti-patterns (never do these)

1. No half-committed concept — if the metaphor doesn't touch every label and transition, drop it.
2. No scroll-jack without a reduced-motion / keyboard escape hatch.
3. No second accent competing with the instrument color.
4. No generic "Enter" / "Menu" / "Contact" labels — everything is in-world.
5. Don't sacrifice the hire-me path to the theatre — the payoff must actually convert.
6. Don't clone a specific portfolio's concept — invent your own metaphor; the *approach* is transferable, the theme should be yours.
