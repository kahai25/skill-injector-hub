# WCAG quick wins — 10 fixes that clear 90% of findings

## 1. Alt text on every `<img>`

```tsx
// ✗
<img src={hero} />
// ✓
<img src={hero} alt="Team collaborating around a whiteboard" />
// ✓ (decorative only — logo already accompanied by text)
<img src={logo} alt="" />
```

## 2. `aria-label` on icon-only shadcn buttons

```tsx
// ✗
<Button size="icon" variant="ghost"><X /></Button>
// ✓
<Button size="icon" variant="ghost" aria-label="Close menu"><X /></Button>
```

## 3. `<label htmlFor>` on every form field

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" name="email" />
```

Or `aria-label="Email"` if the label is visually hidden by design.

## 4. Real `<button>` and `<a>`, never `<div onClick>`

```tsx
// ✗
<div onClick={openModal}>Open</div>
// ✓
<button type="button" onClick={openModal}>Open</button>
```

Radix / shadcn primitives already do this correctly.

## 5. One `<h1>`, no heading skips

```tsx
<h1>Product</h1>
  <h2>Features</h2>
    <h3>Real-time sync</h3>   // ✓
    <h5>Details</h5>          // ✗ skipped h4
```

## 6. Page landmarks

Every route wraps its primary content in exactly one `<main>`. Header nav is `<nav>`. Footer is `<footer>`. Put `<main>` in the layout that renders `<Outlet />` — not in individual route components.

## 7. `<html lang="en">`

In `src/routes/__root.tsx`:

```tsx
<html lang="en">
```

## 8. Skip-to-content link

First focusable element on the page:

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-background p-2">
  Skip to content
</a>
...
<main id="main">…</main>
```

## 9. Focus-visible outlines

If you use `outline-none`, replace it — never remove focus without adding a `focus-visible:` alternative:

```tsx
<button className="outline-none focus-visible:ring-2 focus-visible:ring-primary">
```

## 10. Respect `prefers-reduced-motion`

Framer Motion:

```tsx
const reduce = useReducedMotion();
<motion.div animate={reduce ? {} : { y: [0, -10, 0] }} />
```

Tailwind: `motion-safe:animate-pulse` / `motion-reduce:animate-none`.
