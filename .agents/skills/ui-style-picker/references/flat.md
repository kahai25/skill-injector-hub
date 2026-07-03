# Flat

No shadows. No gradients. Solid fills. Clear hierarchy through color and typography only.

## Tokens

```css
:root {
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.15 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0 0);
  --primary: oklch(0.60 0.22 25);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.70 0.15 200);
  --accent: oklch(0.80 0.18 90);
  --border: oklch(0.90 0 0);
  --radius: 0.25rem;
}

.dark {
  --background: oklch(0.15 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.20 0 0);
}
```

No extra utilities. Kill shadows in components (`shadow-none`).
