# Semantic HTML — the cheapest a11y win

The scanner and every plaintiff's tool grade on structure. Semantic HTML gives it to you for free.

## Landmarks

Every page needs, at minimum:

```html
<header>          <!-- site header / nav wrapper -->
  <nav aria-label="Main">…</nav>
</header>
<main id="main">  <!-- primary content, exactly one -->
  …
</main>
<footer>          <!-- site footer -->
</footer>
```

In TanStack Start, put `<main>` in the file that renders `<Outlet />`, not in each route. Otherwise routes without a `<main>` fail the audit.

Multiple `<nav>`s are fine (primary, footer, breadcrumb) — label each with `aria-label`.

## Buttons vs links

- Action that changes state (open modal, submit form, toggle): `<button type="button">`.
- Navigation to a URL: `<a href>` (or TanStack `<Link>`).

Never a `<div onClick>`. A screen reader user cannot reach it, cannot activate it, and often cannot even perceive it.

## Lists

Any collection of similar items should be `<ul>` / `<ol>` with `<li>` children — not stacked `<div>`s. Screen readers announce list length ("3 items").

## Headings define an outline

Every page has exactly one `<h1>` that describes the page. Sub-sections use `<h2>` in order. Skipping levels (h1 → h3) is a scanner finding.

Card titles inside a section are usually `<h3>` under a section `<h2>`. The heading level is about **document outline**, not visual size — style with Tailwind, don't upgrade to a lower `<h#>` for looks.

## Form structure

```tsx
<form>
  <fieldset>
    <legend>Contact info</legend>
    <Label htmlFor="name">Name</Label>
    <Input id="name" name="name" required aria-required="true" />

    <Label htmlFor="email">Email</Label>
    <Input id="email" name="email" type="email" required
           aria-describedby="email-help" />
    <p id="email-help" className="text-sm text-muted-foreground">
      We'll never share this.
    </p>
  </fieldset>
  <Button type="submit">Send</Button>
</form>
```

Error messages get `role="alert"` so they're announced when they appear.

## Tables

If it's tabular data, use `<table>` with `<thead>` / `<th scope="col">`. Do not use a table for layout — CSS grid is for that.

If your grid of cards looks like a table (rows and columns of the same thing), consider whether it should actually be a `<table>` — pricing comparisons, feature matrices, and admin data grids usually should.

## The rule

If you find yourself adding `role="button"`, `role="list"`, `role="heading"`, `role="main"`, `role="navigation"` — stop. Use the real element instead. ARIA is a patch for when the real element isn't available (custom widgets, third-party embeds). Every `role="button"` you write is a code smell.
