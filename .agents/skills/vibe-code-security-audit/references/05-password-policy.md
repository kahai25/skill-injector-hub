# 05 · Password policy & leaked-password check

**Risk:** if `password123` is allowed, `password123` is what people use.

## Fix — Supabase config

Project settings → Auth → Password:

- Minimum length **12**
- Require uppercase + lowercase + digit + symbol (as your product tolerates)
- Enable **"Prevent use of leaked passwords"** (Supabase queries HIBP for you)

## Fix — client-side hint (UX only, not security)

```ts
import zxcvbn from 'zxcvbn'
const strength = zxcvbn(password)
if (strength.score < 3) setError('Password too weak')
```

Client checks are for UX. The real gate is Supabase's server-side setting above.
