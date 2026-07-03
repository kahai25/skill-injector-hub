# 2 — Code review pass

After a burst of generation, the codebase always has cruft. Do one deliberate read-through before shipping.

## The checklist

Run through these in order. For each hit, offer a fix; apply one at a time with approval.

### 1. Dead / stub code

- `TODO`, `FIXME`, `XXX` comments — resolve or file as an issue.
- `console.log` / `console.debug` left over from debugging — remove or route through a logger.
- Handlers that just `alert("todo")` or return placeholder data.
- Routes with `PlaceholderIndex` or `REPLACE this` still in them.

```bash
rg -n 'TODO|FIXME|XXX|console\.(log|debug)|PlaceholderIndex' src/
```

### 2. Duplicate components

Three cards, four buttons, five modal shells — all with 90% overlapping JSX. Consolidate into one shadcn primitive + variants.

```bash
# Suspiciously many files with the same base name
rg -l 'export (default )?function [A-Z]' src/components | sort
```

### 3. Oversized files

Files >300 lines that mix data fetching, state, JSX, and helpers. Split by concern:
- Data → `*.functions.ts` / `*.queries.ts`
- Hooks → `src/hooks/`
- Presentational bits → child components in the same folder.

```bash
wc -l src/**/*.tsx | sort -n | tail -20
```

### 4. Client-side calls that should be server-side

- `fetch("https://api.openai.com/…", { headers: { Authorization: `Bearer ${apiKey}` }})` in a component = leaked key.
- Direct DB writes from the browser without RLS = future incident.
- Move to `createServerFn` (see `tanstack-server-functions`).

```bash
rg -n 'fetch\(["\x27]https?://' src/components src/routes src/hooks
```

### 5. Type escape hatches

Every `any`, `as any`, `@ts-ignore`, `@ts-expect-error`, or `eslint-disable` is a bug in disguise.

```bash
rg -n 'any|@ts-(ignore|expect-error)|eslint-disable' src/ | rg -v '\.gen\.ts'
```

### 6. Naming drift

- Two names for the same thing (`User` vs `Profile` vs `Account`).
- Snake_case DB columns leaking into camelCase UI without a mapper.
- Route names that don't match the page's H1.

Pick one canonical name and rename with search-replace.

### 7. Error handling

- Every `await` inside a server function is inside try/catch **or** allowed to bubble to the framework — never swallowed silently.
- User-visible errors go through `toast` / a shared error boundary, not `alert()`.
- Loaders on public routes don't call auth-protected server functions (see `auth-protected-server-functions`).

## Report format

Present findings as:

```
CODE REVIEW — 7 findings

CLEANUP (5)
  src/components/Hero.tsx:42   console.log("clicked")
  src/routes/index.tsx:88      TODO: wire signup
  ...

STRUCTURE (2)
  src/routes/dashboard.tsx     412 lines — split data fetching into dashboard.queries.ts
  src/components/Card*.tsx     3 near-duplicate Card components — consolidate

Apply one at a time — which do you want first?
```
