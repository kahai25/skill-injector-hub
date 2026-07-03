# Claymorphism

Puffy 3D pastel shapes. Big radius, dual inner highlight + soft drop shadow, pastel color palette.

## Tokens

```css
:root {
  --background: oklch(0.96 0.03 300);
  --foreground: oklch(0.30 0.05 300);
  --card: oklch(0.85 0.08 300);
  --card-foreground: oklch(0.25 0.06 300);
  --primary: oklch(0.75 0.15 340);
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.80 0.13 200);
  --accent: oklch(0.85 0.15 90);
  --border: transparent;
  --radius: 1.75rem;

  --shadow-clay:
    0 20px 40px -10px oklch(0.50 0.10 300 / 0.4),
    inset 0 -6px 12px oklch(0 0 0 / 0.10),
    inset 0 6px 12px oklch(1 0 0 / 0.55);
}
```

## Utilities

```css
@utility clay {
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-clay);
}
```
