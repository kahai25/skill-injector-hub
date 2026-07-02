# 01 · Auth tokens in localStorage / sessionStorage

**Risk:** any XSS on the page can read the token and impersonate the user. Storage is readable by every script on the origin, including third-party libraries and browser extensions.

## Detect

- `localStorage.setItem('token', …)` / `sessionStorage.setItem('access_token', …)`
- Hand-rolled `sb-<project>-auth-token` writes
- JWTs stashed under any key on `window.localStorage`

## Fix

**Preferred: let Supabase's SSR client own the session in httpOnly cookies.** The Lovable stack ships `@supabase/ssr` — do not hand-roll a token store.

```ts
// src/integrations/supabase/client.ts  (browser)
import { createBrowserClient } from '@supabase/ssr'
export const supabase = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
)
```

For anything you actually need to persist client-side (theme, last route), keep using `localStorage` — just **never the token**.

If the app currently reads a token out of `localStorage` to attach to fetch calls, delete that code and use the Supabase client directly, or use the project's `attachSupabaseAuth` middleware for server functions.

## Verify

```bash
rg -n "(local|session)Storage\.(set|get)Item\(\s*[`\"'][^`\"']*(token|jwt|auth|session)" src
```

Should return zero hits.
