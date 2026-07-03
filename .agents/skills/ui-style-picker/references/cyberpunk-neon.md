# Cyberpunk / Neon

Dark base, neon accent (cyan/magenta/lime), glow rings, mono type, thin lines.

## Tokens

```css
:root {
  --background: oklch(0.12 0.03 280);
  --foreground: oklch(0.95 0.02 180);
  --card: oklch(0.16 0.04 280);
  --card-foreground: oklch(0.95 0.02 180);
  --primary: oklch(0.80 0.25 190);        /* cyan */
  --primary-foreground: oklch(0.10 0.02 280);
  --secondary: oklch(0.70 0.30 330);       /* magenta */
  --accent: oklch(0.85 0.25 130);          /* lime */
  --border: oklch(0.80 0.25 190 / 0.4);
  --radius: 0.25rem;
  --font-sans: "JetBrains Mono", ui-monospace, monospace;

  --glow-cyan: 0 0 12px oklch(0.80 0.25 190 / 0.8), 0 0 24px oklch(0.80 0.25 190 / 0.4);
  --glow-magenta: 0 0 12px oklch(0.70 0.30 330 / 0.8), 0 0 24px oklch(0.70 0.30 330 / 0.4);
}

.dark { /* already dark by default */ }
```

## Utilities

```css
@utility neon {
  border: 1px solid var(--color-primary);
  box-shadow: var(--glow-cyan), inset 0 0 8px oklch(0.80 0.25 190 / 0.2);
  color: var(--color-primary);
  background: transparent;
}
@utility neon-magenta {
  border: 1px solid var(--color-secondary);
  box-shadow: var(--glow-magenta);
  color: var(--color-secondary);
}
```
