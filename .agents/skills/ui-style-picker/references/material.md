# Material

Google Material: elevation via layered shadows, bold primary color, rounded rectangles, clear surface hierarchy.

## Tokens

```css
:root {
  --background: oklch(0.99 0.005 260);
  --foreground: oklch(0.20 0.02 260);
  --card: oklch(1 0 0);
  --primary: oklch(0.55 0.18 265);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.94 0.02 260);
  --border: oklch(0.90 0.01 260);
  --radius: 0.5rem;

  --shadow-1: 0 1px 2px oklch(0 0 0 / 0.12), 0 1px 3px oklch(0 0 0 / 0.08);
  --shadow-2: 0 3px 6px oklch(0 0 0 / 0.15), 0 2px 4px oklch(0 0 0 / 0.10);
  --shadow-3: 0 10px 20px oklch(0 0 0 / 0.15), 0 3px 6px oklch(0 0 0 / 0.10);
  --shadow-4: 0 15px 30px oklch(0 0 0 / 0.20), 0 5px 15px oklch(0 0 0 / 0.10);
}
```

## Utilities

```css
@utility elev-1 { box-shadow: var(--shadow-1); }
@utility elev-2 { box-shadow: var(--shadow-2); }
@utility elev-3 { box-shadow: var(--shadow-3); }
@utility elev-4 { box-shadow: var(--shadow-4); }
```
