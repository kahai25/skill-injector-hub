# 3 — Latency breakdown: find the single blocking dependency

## The bug

One handler does five things sequentially:

```ts
// BAD — 5 sequential round-trips
const user = await getUser(userId)
const org = await getOrg(user.orgId)
const plan = await getPlan(org.planId)
const usage = await getUsage(userId)
const features = await getFeatures(plan.id)
```

Total = sum of every latency. Even if each is 80ms, the user waits 400ms.

## Fix

### Parallelize independent awaits

```ts
const user = await getUser(userId)
const [org, usage] = await Promise.all([
  getOrg(user.orgId),
  getUsage(userId),
])
const [plan, features] = await Promise.all([
  getPlan(org.planId),
  getFeaturesForOrg(org.id),
])
```

Only chain `await`s when the next call literally needs the previous result.

### Find the real bottleneck

Add `Server-Timing` headers so the browser Network tab breaks down where time is spent:

```ts
const t0 = performance.now()
const data = await heavyQuery()
const t1 = performance.now()
return new Response(JSON.stringify(data), {
  headers: { 'server-timing': `db;dur=${(t1 - t0).toFixed(1)}` },
})
```

Open DevTools → Network → click the request → **Timing** tab. If one span is 90%+ of the total, that's your single-dependency bottleneck. Common culprits:

- Auth check calling out to an external identity provider on every request → cache the JWT verification.
- N+1 query — loading a list then one query per row → single `select ... in (...)` or a `.select('*, related(*)')` join.
- External API call (Stripe, OpenAI) blocking the response → move to a background job / server-sent events / return early and stream.

### Client-side: parallel `useQuery`

TanStack Query fires queries in parallel automatically. Don't gate a second query on `data` from the first unless it genuinely depends on it.
