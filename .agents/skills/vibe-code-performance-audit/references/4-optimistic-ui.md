# 4 — Optimistic UI

## The bug

Every user action (toggle a todo, like a post, rename a file) shows a spinner until the server responds. On a 200ms round-trip the app feels sluggish; on flaky mobile it feels broken.

## Fix — TanStack Query `onMutate`

Update the cache immediately, roll back on error.

```ts
const queryClient = useQueryClient()

const toggleTodo = useMutation({
  mutationFn: (id: string) => api.toggleTodo(id),

  onMutate: async (id) => {
    // Cancel outgoing refetches so they don't overwrite the optimistic update
    await queryClient.cancelQueries({ queryKey: ['todos'] })

    const previous = queryClient.getQueryData<Todo[]>(['todos'])

    queryClient.setQueryData<Todo[]>(['todos'], (old) =>
      old?.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

    return { previous }
  },

  onError: (_err, _id, ctx) => {
    // Roll back
    if (ctx?.previous) queryClient.setQueryData(['todos'], ctx.previous)
  },

  onSettled: () => {
    // Reconcile with server truth
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

## When NOT to use optimistic UI

- Payments, transfers, anything where "we lied" is unacceptable.
- Operations where the server assigns a value the client can't predict (IDs, timestamps, computed fields the UI depends on).

## Adjacent wins

- **`placeholderData: keepPreviousData`** on paginated queries — the previous page stays visible while the next one loads instead of showing a spinner.
- **Skeleton loaders** on the first paint, then optimistic updates for subsequent mutations.
