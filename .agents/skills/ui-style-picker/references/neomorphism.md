# Neomorphism

Soft UI. Same-color surfaces that appear extruded via dual shadows (light top-left, dark bottom-right). Low contrast — avoid for accessibility-critical flows.

## Tokens (merge into src/styles.css)

```css
:root {
  --background: oklch(0.94 0.01 250);
  --foreground: oklch(0.30 0.02 250);
  --card: oklch(0.94 0.01 250);
  --card-foreground: oklch(0.30 0.02 250);
  --primary: oklch(0.65 0.15 250);
  --primary-foreground: oklch(0.98 0 0);
  --border: oklch(0.94 0.01 250);
  --radius: 1rem;

  --neo-light: oklch(1 0 0 / 0.9);
  --neo-dark: oklch(0.55 0.02 250 / 0.25);
  --shadow-neo: -6px -6px 12px var(--neo-light), 6px 6px 12px var(--neo-dark);
  --shadow-neo-inset: inset -4px -4px 8px var(--neo-light), inset 4px 4px 8px var(--neo-dark);
}

.dark {
  --background: oklch(0.22 0.02 250);
  --foreground: oklch(0.92 0.01 250);
  --card: oklch(0.22 0.02 250);
  --neo-light: oklch(0.35 0.02 250 / 0.6);
  --neo-dark: oklch(0.10 0.01 250 / 0.9);
}
```

## Utilities

```css
@utility neo-surface {
  background: var(--color-background);
  box-shadow: var(--shadow-neo);
  border-radius: var(--radius-lg);
}
@utility neo-inset {
  background: var(--color-background);
  box-shadow: var(--shadow-neo-inset);
  border-radius: var(--radius-lg);
}
```

Use: `<button class="neo-surface px-6 py-3">Click</button>` and inputs get `neo-inset`.
