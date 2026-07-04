# The policy must match the code (BetterHelp case)

In 2023 the FTC fined BetterHelp $7.8M and banned them from sharing health data with advertisers. Their policy said they wouldn't share consumer health information with third parties for advertising. Their code was firing the Meta Pixel, Snap Pixel, Pinterest tag, and Criteo pixel on intake forms — sharing email hashes plus "considering therapy for anxiety" with those platforms.

The FTC calls this **unfair and deceptive** — Section 5 of the FTC Act. Same doctrine applied to Cerebral ($7M), GoodRx ($1.5M), Flo Health (consent decree). All same fact pattern: policy promised privacy, code shipped pixels.

## The rule

Every collection channel in the code must be in the policy. Every promise in the policy must be enforced in the code. If they diverge, the code wins in court — the policy becomes evidence of deception.

## Practical enforcement

1. Run the scanner. It catches the actual channels.
2. Any channel with hits gets an entry in Section 4 (sub-processors).
3. Any channel classed as marketing/advertising gets consent-gated (Section 5).
4. Never write "we don't share data with third parties" if the scanner shows any hits — pretty much every real app fails that phrasing.
5. Health, finance, kids, biometrics: don't ship pixels on those pages **at all**. Consent isn't enough for HIPAA-adjacent data.

## Wording to avoid

- "We don't sell your data" — CCPA defines "sale" broadly; ad pixels can count.
- "We only share with trusted partners" — meaningless.
- "We take your privacy seriously" — say what you do, not how you feel.
- "May collect" — either you do or you don't. Ambiguity reads as concealment.
