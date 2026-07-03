# Brutalism

Raw HTML aesthetic. System font stack, hard borders, no shadows, minimal styling. Feels like a 1996 site on purpose.

## Tokens

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0 0 0);
  --card: oklch(1 0 0);
  --primary: oklch(0 0 0);
  --primary-foreground: oklch(1 0 0);
  --border: oklch(0 0 0);
  --radius: 0;
  --font-sans: ui-monospace, "Courier New", monospace;
}
```

In `@layer base`, force `border-2 border-black`, `no shadows`, `underline links`.

```css
@layer base {
  a { text-decoration: underline; }
  button, .card, input { border: 2px solid var(--color-foreground); border-radius: 0; box-shadow: none; }
}
```
