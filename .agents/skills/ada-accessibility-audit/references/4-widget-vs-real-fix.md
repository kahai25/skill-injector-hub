# Overlays are lawsuit magnets — do the real fix

## The pitch vs the reality

Overlay vendors (accessiBe, UserWay, EqualWeb, AudioEye, Accessibility Spark, and clones) sell a single `<script>` tag that promises WCAG compliance in one line. **It does not work**, and installing one makes you a *bigger* target, not a smaller one.

## Why they fail

- They inject ARIA at runtime, after the DOM loads — screen readers have already parsed the original markup.
- They can't fix keyboard traps, missing labels, or bad heading structure at the source.
- The floating widget button itself often fails a11y (poor contrast, keyboard trap, focus stealing).
- They break real assistive tech: NVDA and JAWS users have publicly documented sites they can no longer use because an overlay took over the a11y tree.

## Why they attract lawsuits

Plaintiff's firms specifically search for the overlay's fingerprint scripts (e.g. `accessibe.com/access.js`, `userway.org/widget`). A site with an overlay is easier to sue because:

- The complaint can quote the vendor's marketing ("guaranteed WCAG 2.1 AA compliance") against the actual audit results.
- Courts have repeatedly refused to accept overlays as a defense (see the 2021 UsableNet class action tracking; the trend is unchanged in 2024–2025).
- accessiBe itself was named in a class-action complaint and paid a $1M FTC settlement in 2025 for deceptive marketing.

## The National Federation of the Blind position

The NFB has publicly urged its members and lawyers to prioritize suing sites that use overlays, calling them "misleading, ineffective, and often actively harmful."

## What to do instead

1. **Remove any overlay script.** Delete it from `index.html`, `<head>`, GTM, and any component that injects it.
2. **Run the scanner in this skill.** Fix findings by category.
3. **Use shadcn/Radix primitives** wherever you'd write a custom widget — they get focus, ARIA, and keyboard right by default.
4. **Test with a real screen reader once.** VoiceOver on macOS (Cmd+F5) or NVDA on Windows (free). One 10-minute session catches things no scanner does.
5. **Publish an accessibility statement** at `/accessibility` naming the WCAG version you target (2.1 AA), how to report issues, and a real contact email. This is called out favorably in demand-letter responses.

## The rule

**If the answer to "how is your site accessible" is a script tag, you are the target, not the solution.**
