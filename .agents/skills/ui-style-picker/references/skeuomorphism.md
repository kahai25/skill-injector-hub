# Skeuomorphism

Realistic surfaces: gradients, inner highlights, subtle textures, drop shadows. Buttons look pressable.

## Tokens

```css
:root {
  --background: oklch(0.93 0.02 90);
  --foreground: oklch(0.20 0.02 90);
  --card: oklch(0.97 0.02 90);
  --primary: oklch(0.55 0.14 240);
  --primary-foreground: oklch(0.98 0 0);
  --border: oklch(0.75 0.03 90);
  --radius: 0.5rem;

  --gradient-btn: linear-gradient(180deg, oklch(0.72 0.14 240), oklch(0.45 0.14 240));
  --shadow-skeu: 0 1px 0 oklch(1 0 0 / 0.6) inset, 0 -2px 4px oklch(0 0 0 / 0.15) inset, 0 2px 4px oklch(0 0 0 / 0.25);
}
```

## Utilities

```css
@utility skeu-button {
  background: var(--gradient-btn);
  color: var(--color-primary-foreground);
  box-shadow: var(--shadow-skeu);
  border: 1px solid oklch(0 0 0 / 0.2);
  border-radius: var(--radius-md);
  text-shadow: 0 -1px 0 oklch(0 0 0 / 0.3);
}
```
