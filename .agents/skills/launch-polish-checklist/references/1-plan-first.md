# 1 — Plan before implementing

The biggest source of vibe-coded bloat is jumping straight from "I want feature X" to "generate 400 lines of code". Every feature should get a 60-second planning pass first.

## The 3-question plan

Before writing any code, answer in plain English:

1. **What's the one capability being added?** One sentence, no "and".
   - ✅ "Users can save any article to a reading list."
   - ❌ "Users can save articles and share them and get recommendations and…"

2. **What's the smallest surface area that ships it?**
   - Which tables? (name them)
   - Which server functions / API routes? (name them)
   - Which UI routes / components? (name them)
   - Which existing files change vs. which are new?

3. **What's explicitly out of scope for this pass?**
   List 2–4 things you're *not* doing. This is where scope creep dies.
   - "No sharing UI in this pass."
   - "No recommendation engine — that's next milestone."

## Output shape

Before touching code, produce something like:

```md
### Feature: Reading list

**Capability:** Signed-in users can save any article and see a list of saved articles.

**Data:**
- `public.saved_articles(user_id uuid, article_id uuid, created_at timestamptz)` — new table, RLS on.

**Server:**
- `saveArticle`, `unsaveArticle`, `listSaved` — createServerFn in `src/lib/reading-list.functions.ts`.

**UI:**
- `src/routes/reading-list.tsx` — new authenticated route.
- Bookmark button on `src/routes/article.$id.tsx` — existing file.

**Out of scope:**
- Sharing / public reading lists.
- Sorting or tagging saved items.
- Email digests of saved items.
```

Get user sign-off on this before writing code. If the plan grows past ~10 bullets, split it into two features.

## Why this matters

- The AI generates *exactly* what you point it at. Vague plan → vague code.
- The plan doubles as the acceptance test: "does the app do the one thing in the Capability line?"
- Out-of-scope bullets keep the model from silently adding features you'll have to debug later.
