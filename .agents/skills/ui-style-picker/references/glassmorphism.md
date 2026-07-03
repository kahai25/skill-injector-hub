# Glassmorphism

Frosted glass panels floating on a colorful background. Requires a vivid background (gradient/image) behind the glass for the effect to read.

## Tokens

```css
:root {
  --background: oklch(0.97 0.03 300);
  --foreground: oklch(0.20 0.02 280);
  --card: oklch(1 0 0 / 0.55);
  --card-foreground: oklch(0.20 0.02 280);
  --primary: oklch(0.60 0.20 300);
  --primary-foreground: oklch(0.98 0 0);
  --border: oklch(1 0 0 / 0.4);
  --radius: 1.25rem;

  --gradient-bg: linear-gradient(135deg, oklch(0.75 0.18 320), oklch(0.75 0.18 220));
  --surface-glass: oklch(1 0 0 / 0.15);
  --border-glass: oklch(1 0 0 / 0.35);
  --shadow-glass: 0 8px 32px oklch(0.2 0.05 280 / 0.35);
}

.dark {
  --background: oklch(0.20 0.05 280);
  --foreground: oklch(0.98 0 0);
  --card: oklch(1 0 0 / 0.08);
  --surface-glass: oklch(1 0 0 / 0.08);
  --border-glass: oklch(1 0 0 / 0.18);
}
```

Set `body { background: var(--gradient-bg); }` in `@layer base`.

## Utilities

```css
@utility glass {
  background: var(--surface-glass);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  box-shadow: var(--shadow-glass);
  border-radius: var(--radius-lg);
}
```
