# Retro Y2K

Aqua chrome bubbles, glossy gradients, iridescent accents. Early-2000s Mac OS X vibe.

## Tokens

```css
:root {
  --background: oklch(0.95 0.02 220);
  --foreground: oklch(0.20 0.02 250);
  --card: oklch(0.98 0.01 220);
  --primary: oklch(0.65 0.18 230);
  --primary-foreground: oklch(0.99 0 0);
  --border: oklch(0.75 0.05 220);
  --radius: 999px;

  --gradient-aqua: linear-gradient(180deg,
    oklch(0.90 0.10 230) 0%,
    oklch(0.70 0.18 230) 45%,
    oklch(0.55 0.20 240) 50%,
    oklch(0.75 0.18 230) 100%);
  --gradient-chrome: linear-gradient(180deg, oklch(0.98 0 0), oklch(0.75 0.01 250), oklch(0.98 0 0));
  --shadow-aqua: inset 0 1px 0 oklch(1 0 0 / 0.9), 0 4px 12px oklch(0.4 0.15 240 / 0.4);
}
```

## Utilities

```css
@utility aqua {
  background: var(--gradient-aqua);
  color: var(--color-primary-foreground);
  box-shadow: var(--shadow-aqua);
  border-radius: 999px;
  border: 1px solid oklch(0.45 0.15 240);
  text-shadow: 0 -1px 0 oklch(0 0 0 / 0.3);
}
@utility chrome {
  background: var(--gradient-chrome);
  border: 1px solid oklch(0.60 0.01 250);
}
```
