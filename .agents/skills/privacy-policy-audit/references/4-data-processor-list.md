# Sub-processor list

GDPR Art. 28 requires you to name every "processor" (third party that handles personal data on your behalf). CCPA calls them "service providers" or "contractors". Same idea: a table with purpose, data categories, jurisdiction.

## Table format

| Processor | Purpose | Data categories | Jurisdiction | DPA link |
|---|---|---|---|---|
| Supabase | Auth + DB + storage | Email, hashed password, uploads | US / EU (project region) | supabase.com/legal/dpa |
| Stripe | Payment processing | Name, billing address, tokenized card | US, IE | stripe.com/legal/dpa |
| Resend | Transactional email | Email, name, message body | US | resend.com/legal/dpa |
| OpenAI | AI text/image generation | User prompts, generated outputs | US | openai.com/policies/data-processing-addendum |
| Anthropic | AI text generation | User prompts, generated outputs | US | anthropic.com/legal/dpa |
| Google Analytics 4 | Product analytics | Pseudonymous ID, pageviews, device | US (with EU sub-processing) | business.safety.google/gdpr |
| Meta Pixel | Advertising measurement | Hashed email, events | US, IE | facebook.com/legal/terms/dataprocessingterms |
| Cloudflare | CDN + DDoS | IP, request metadata | Global | cloudflare.com/cloudflare-customer-dpa |

## Rules

- **Order matters:** essential (auth, payments) first, then analytics, then advertising. Shows the user what's baseline vs optional.
- **Data categories are specific.** "User data" is not a category. "Email, IP, pageviews" is.
- **Jurisdiction matters.** Any US processor for EU users needs SCCs; note it below the table.
- **Update on every change.** Adding Klaviyo? It goes here before the first email fires.
- **Publish a change log** for enterprise customers who have their own DPA obligations.

## Data flow diagram (optional but pro)

If your app has an interesting flow — e.g. "user uploads PDF → we send to OpenAI for summary → summary saved to Supabase → transactional email via Resend" — draw it. A one-paragraph text description of the flow removes 90% of enterprise privacy-review back-and-forth.
