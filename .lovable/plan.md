## The 3 videos

| Video | Topic | Action |
| --- | --- | --- |
| afac | "Attack this page" prompt — flip Claude from sycophant into brutal copy editor, loop until it finds nothing | **NEW** `attack-this-copy` skill (adversarial copy review) |
| e0d8 | DevTools → Network → search `sk-` finds Anthropic keys exposed in the frontend bundle | Extend `vibe-code-security-audit` `references/06-secrets-hygiene.md` — add "how attackers actually find it" section (Network tab + `sk-`, `pk_live_`, `AIza`, `AKIA`, `xoxb-`, `SUPABASE_SERVICE_ROLE` search); scanner already covers `VITE_*` but should also grep bundled `dist/` if present |
| eee5 | Try `/admin` on any dashboard; BOLA / IDOR check | Already covered by `vibe-code-security-audit` `references/13-idor.md` — extend with `/admin` route enumeration + one-line "add authorization to every `_authenticated/admin*` route" check |

## Deliverable 1 — NEW `attack-this-copy`

Small skill, no scanner. Prompt-driven adversarial copy review. The insight: Claude/GPT default to encouragement. Flipping the prompt from "improve" to "attack" surfaces real conversion killers.

```
.agents/skills/attack-this-copy/
├── SKILL.md
└── references/
    ├── 1-attack-prompts.md      # exact prompts for landing page, pricing, email, proposal
    ├── 2-loop-until-empty.md    # fix → paste back → attack again → stop only when nothing found
    └── 3-what-to-attack.md      # 12 conversion killers to specifically ask about (unexplained price, weak guarantee, buried value prop, 3 CTAs competing, social proof from randos, etc.)
```

Triggers: "review my landing page", "why isn't this converting", "critique this pricing", "attack my copy", "harsh feedback", "make my sales page better".

Rule: never used on user's own writing without their explicit ask — this is a "you asked me to be mean" tool.

## Deliverable 2 — extend `vibe-code-security-audit` #6 (secrets hygiene)

Add to `references/06-secrets-hygiene.md`:
- **How attackers actually find it** — DevTools → Network → search for `sk-`, `sk_live_`, `sk_test_`, `AIza`, `AKIA`, `xoxb-`, `ghp_`, `SUPABASE_SERVICE_ROLE`, `service_role`. Takes ~15 seconds per site.
- **What to grep locally before publishing** — one-liner: `rg -n "sk-[a-zA-Z0-9]{20,}|sk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[a-zA-Z0-9]{36}" dist src public` (checks the built bundle too, since `VITE_*` gets inlined there).
- Scanner script (`audit.sh`) gets a new pattern that also scans `dist/` if it exists — that's where `VITE_ANTHROPIC_API_KEY` actually surfaces.

## Deliverable 3 — extend `vibe-code-security-audit` #13 (IDOR / BOLA)

Add to `references/13-idor.md`:
- **The `/admin` test** — try every reasonable admin path against a normal user session: `/admin`, `/admin/users`, `/dashboard/admin`, `/settings/admin`, `/_authenticated/admin`. Any 200 that renders admin data (not just a UI shell) = broken.
- **The rule**: TanStack `_authenticated/` gates only auth, not role. Admin routes need a **second** gate — a `beforeLoad` that calls a `has_role(auth.uid(), 'admin')` server fn and redirects on false. Never gate admin visibility with `if (user.role === 'admin')` in the component.
- Scanner check: flag any route file under `src/routes/**/admin*` that does not import `has_role` / a role check middleware.

## What I will NOT change

- No app source files. Only `.agents/skills/` additions.
- No new top-level skill for IDOR or secrets — extending the existing security skill is the right home.

## Order of operations

1. Write all files in parallel.
2. Apply:
   - `attack-this-copy` (new)
   - `vibe-code-security-audit` (updated — refs 6 & 13, scanner tweak)
3. Report trigger phrases.
