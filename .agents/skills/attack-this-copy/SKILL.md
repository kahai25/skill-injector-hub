---
name: attack-this-copy
description: Adversarial copy review. Flips Claude/GPT from encouraging editor into ruthless conversion critic. Use "attack this page — list every reason someone closes the tab without buying" instead of "improve this page". Loop the fix-and-re-attack cycle until the model finds nothing left to attack. Works on landing pages, pricing pages, cold emails, sales proposals, App Store descriptions, and Product Hunt launch copy. Trigger on "review my landing page", "why isn't this converting", "critique my pricing", "attack my copy", "harsh feedback on this", "make my sales page better", "roast my copy", or when a user shares copy asking for feedback.
---

# Attack This Copy

Default AI copy review is polite: it polishes tone, tightens sentences, tells you it's great. It never says "this doesn't sell." The fix is a prompt reframe — from *improve* to *attack*.

## When to trigger

- User asks for feedback on a landing page, pricing page, email, proposal, or App Store description.
- User asks why a page isn't converting.
- Pre-launch pass — pair with `launch-polish-checklist` Stage 4.
- Any request containing "attack", "roast", "harsh", "brutal", "critique", "poke holes".

## The rule

**Never use this on the user's own writing without their explicit ask.** Adversarial mode is opt-in — it's the "you asked me to be mean" tool. If they said "make it better", ask first whether they want gentle polish or an attack pass.

## Workflow

1. **Get the copy.** Full page text or URL. Include headline, subhead, CTAs, pricing, testimonials, FAQ, footer.

2. **Attack.** Use the prompt from `references/1-attack-prompts.md` matching the copy type. The core template:

   > **Attack this page.** List every reason someone lands here and closes the tab without buying. Be specific — quote the sentence, name the objection, name the reader who bounces. Do not suggest improvements yet. Do not compliment anything. Rank findings by how many readers each one loses.

3. **Fix.** Address the top-ranked findings. Rewrite, don't tweak.

4. **Re-attack.** Paste the fixed version back with:

   > Attack this new version the same way. Ignore that we fixed the previous issues — find new ones.

5. **Loop.** Repeat 3–4 until the model returns "nothing significant to attack." Usually 3–5 rounds. See `references/2-loop-until-empty.md`.

6. **Sanity check.** Before shipping, read `references/3-what-to-attack.md` for the 12 conversion killers to specifically probe (unexplained price, weak guarantee, buried value prop, competing CTAs, no-name testimonials, etc.).

## Non-goals

- Not a substitute for real user testing — an AI attack surfaces obvious defects, not the ones only a real customer will articulate.
- Not a design critique. Copy first; visual polish is `launch-polish-checklist` Stage 3.
- Not for user-generated content or writing you have not been asked to review.
