# 08 · Logout / session invalidation

**Risk (Patrick's video):** user logs in, copies a URL, logs out, opens the URL in a new tab — still signed in. Or React Query cache still holds the previous user's data and paints it for the next visitor on the same browser.

## Fix

```ts
// src/lib/auth.ts
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'

export function useSignOut() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return async () => {
    await supabase.auth.signOut({ scope: 'local' })  // revoke this device
    qc.clear()                                       // drop cached user data
    await navigate({ to: '/auth', replace: true })   // hard route change
  }
}
```

Key points:

- `signOut({ scope: 'global' })` if you want to kill every session for this user (recommended for "log out everywhere" and after password change).
- `queryClient.clear()` — not `invalidateQueries()`. Invalidating just refetches; clearing drops the old data.
- `replace: true` so the back button doesn't return to the authenticated URL.
- Route-guard authenticated pages under `src/routes/_authenticated/route.tsx` so a stale URL redirects to `/auth` before its loader runs.

## Route guard shape

```ts
// src/routes/_authenticated/route.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      throw redirect({ to: '/auth', search: { next: location.href } })
    }
  },
  component: () => <Outlet />,
})
```

Test Patrick's exact flow after fixing: log in → copy URL → log out → paste URL in a new tab. Should land on `/auth`.
