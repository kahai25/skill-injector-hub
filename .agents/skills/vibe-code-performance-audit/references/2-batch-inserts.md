# 2 — Batch inserts / upserts

## The bug

```ts
// BAD — N round-trips, N transactions
for (const row of rows) {
  await supabase.from('items').insert(row)
}
```

At 100 rows this feels fine locally. At 10,000 rows it is minutes.

## Fix

Supabase / PostgREST accept arrays:

```ts
// GOOD — one round-trip
await supabase.from('items').insert(rows)
```

For upserts:

```ts
await supabase
  .from('items')
  .upsert(rows, { onConflict: 'id', ignoreDuplicates: false })
```

## Chunk very large batches

Postgres will reject a single insert that exceeds `max_allowed_packet` / row-limit. Chunk at ~500-1000 rows:

```ts
const CHUNK = 500
for (let i = 0; i < rows.length; i += CHUNK) {
  const { error } = await supabase.from('items').insert(rows.slice(i, i + CHUNK))
  if (error) throw error
}
```

## Also applies to

- `Promise.all` of individual writes — still N round-trips, still worse than one array insert.
- Reads: `.in('id', ids)` beats a loop of `.eq('id', id)`.
