# 09 · Move heavy / secret-carrying work to the server

**Risk:** email SDKs, PDF generation, AI SDK calls, and payment SDKs all need API keys. If they run in the browser, the key is in the bundle (see #06). Even without keys, doing PDF/AI work inline blocks the UI and can't be rate-limited.

## Rule of thumb

If a package needs a secret or takes >200ms, it belongs on the server.

| Package | Correct home |
| --- | --- |
| `nodemailer`, `resend`, `@sendgrid/mail` | server function / edge function |
| `pdf-lib`, `puppeteer` | server function / edge function (Cloudflare Workers can't run puppeteer — use an external service) |
| `openai`, direct AI provider SDKs | server function using Lovable AI Gateway |
| `stripe` (server SDK) | server function / edge function only |

## Fix pattern (TanStack Start)

```ts
// src/lib/send-welcome.functions.ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const sendWelcome = createServerFn({ method: 'POST' })
  .inputValidator((d) => z.object({ email: z.string().email() }).parse(d))
  .handler(async ({ data }) => {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: 'hi@example.com', to: data.email, subject: 'Welcome', html: '…',
    })
    return { ok: true }
  })
```

For fire-and-forget jobs (long PDF, batch email), enqueue into a `jobs` table and have a scheduled edge function drain it — don't make the user wait on the request.

## Load test before launch

Even correct code falls over at 100 concurrent users if the DB has no indexes. Run `k6` or `artillery` against staging before you post the launch tweet.
