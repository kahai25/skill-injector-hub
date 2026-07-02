# 03 · 2FA & email verification

**Risk:** without email verification anyone signs up as anyone. Without MFA a leaked password = full takeover.

## Fix — Supabase

### Require email confirmation

Project settings → Auth → *Enable email confirmations*. In code, treat `session === null && user.email_confirmed_at === null` as "check your inbox" state; don't drop the user into the app.

### Enroll TOTP MFA

```ts
// enroll
const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
// show data.totp.qr_code to the user

// verify enrollment
await supabase.auth.mfa.challengeAndVerify({ factorId: data.id, code })

// later, on sign-in
const { data: factors } = await supabase.auth.mfa.listFactors()
if (factors.totp.length) {
  await supabase.auth.mfa.challengeAndVerify({ factorId: factors.totp[0].id, code })
}
```

Gate sensitive server functions on `aal2` when MFA is enrolled:

```ts
const { data: aal } = await context.supabase.auth.mfa.getAuthenticatorAssuranceLevel()
if (aal.currentLevel !== 'aal2') throw new Error('MFA required')
```
