# Neubrutalism

Chunky black borders + hard offset shadows + saturated block colors. High-contrast, playful.

## Tokens

```css
:root {
  --background: oklch(0.97 0.05 90);
  --foreground: oklch(0 0 0);
  --card: oklch(0.90 0.18 90);
  --card-foreground: oklch(0 0 0);
  --primary: oklch(0.65 0.22 15);
  --primary-foreground: oklch(0 0 0);
  --secondary: oklch(0.70 0.20 200);
  --accent: oklch(0.75 0.22 140);
  --border: oklch(0 0 0);
  --radius: 0.25rem;

  --shadow-nb: 4px 4px 0 0 oklch(0 0 0);
  --shadow-nb-lg: 8px 8px 0 0 oklch(0 0 0);
}
```

## Utilities

```css
@utility nb {
  border: 3px solid var(--color-foreground);
  box-shadow: var(--shadow-nb);
  border-radius: var(--radius-sm);
  transition: transform 0.1s, box-shadow 0.1s;
}
@utility nb:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-nb-lg);
}
@utility nb:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 0 oklch(0 0 0);
}
```
