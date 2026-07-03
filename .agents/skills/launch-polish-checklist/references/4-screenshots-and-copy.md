# 4 — Screenshots & copy audit

The moment right before a user pays or downloads is decided by two things: what your **screenshots** show and what your **copy** says. Both are usually the last thing an AI-built app polishes, and both punch above their weight on conversion.

## A. Landing-page copy

### Hero headline

- **≤8 words.** Says what the app *does* for *whom*.
- ✅ "Turn your voice memos into blog posts."
- ✅ "The reading list for people who actually read."
- ❌ "The next-generation platform for creators."
- ❌ "Empowering teams with AI-powered workflows."

### Subhead (one sentence)

- Names the specific benefit + who it's for.
- Cuts every buzzword: "AI-powered", "next-gen", "leverage", "seamless", "empower", "unlock", "revolutionize".

### Primary CTA button

- Verb + outcome, not "Get started".
- ✅ "Save my first article", "Try it with my voice", "See it on my calendar".
- The CTA should read like the user is saying it, not you.

### Social proof (if any)

- Real names, real logos, or none. Fake avatars/quotes beat nothing but they should be labeled as illustrative.
- Numbers only if true: "used by 1,200 writers" not "used by thousands".

### Meta tags per route

- Every route sets its own `head()` with unique `title`, `description`, `og:title`, `og:description`.
- Never leave the default "Lovable App" / "Lovable Generated Project".
- Add `og:image` on leaf routes with a real hero image URL (see the head-metadata rules).

## B. Pricing card copy

- Benefit first, price second.
  - ✅ "Save unlimited articles — $6.99/week, 3-day free trial."
  - ❌ "$6.99/week — Save unlimited articles."
- Show the yearly savings *inline* on the yearly plan (e.g. "SAVE 89% ANNUALLY").
- One CTA per plan. No "Contact sales" unless the plan actually requires it.

## C. App Store / Play screenshots

You get 8 slots. The first three sell the app; assume most users never see 4–8.

### Screenshot 1 — one-sentence promise

- Full-screen editorial: **giant headline + one screenshot behind it.**
- Headline is the same promise as the landing hero.
- No status bar chrome, no floating device frames.

### Screenshot 2 — the core action

- Show the app *doing the one thing*. Not a settings screen. Not the empty state.
- Annotate with one arrow + one 3-word label if needed.

### Screenshot 3 — the payoff

- What the user gets *after* the action: the finished blog post, the saved list, the completed workout.

### Screenshots 4–8

- One feature per screenshot, one label per screenshot.
- Never a wall of features on a single frame.

## D. The launch-day audit

Walk the app one screen at a time. For each screen, ask:

1. **First-glance test.** In 2 seconds, can a stranger say what this screen is for?
2. **Copy test.** Read every button label out loud. Any that sound corporate? Rewrite.
3. **Empty-state test.** What does this screen look like with zero data? Is it welcoming or broken?
4. **Loading-state test.** Skeletons, not spinners on white. Real dimensions, not "Loading…".
5. **Error-state test.** Real recovery action, not a red toast that says "Something went wrong."

## Report format

For each screen or asset, produce:

```
LANDING HERO
  Current:  "The next-generation platform for content creators"
  Rewrite:  "Turn your voice memos into blog posts."
  Why:      Names the input, the output, and cuts the buzzwords.

PRICING CARD (weekly)
  Current:  "$6.99/week — Save unlimited articles"
  Rewrite:  "Save unlimited articles — $6.99/week, 3-day free trial"
  Why:      Benefit first, trial visible before commitment.
```

Then let the user pick which rewrites to apply.
