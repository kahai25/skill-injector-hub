#!/usr/bin/env bash
# vibe-code-security-audit — repo scanner
# Usage: bash .workspace/skills/vibe-code-security-audit/scripts/audit.sh [project-root]
# Requires: ripgrep (rg). No writes. Exit code = number of CRITICAL+HIGH findings (capped at 125).

set -u
ROOT="${1:-.}"
cd "$ROOT" || { echo "cannot cd to $ROOT"; exit 2; }

if ! command -v rg >/dev/null 2>&1; then
  echo "ripgrep (rg) is required" >&2; exit 2
fi

CRIT=0; HIGH=0; MED=0; INFO=0
RED=$'\033[31m'; YEL=$'\033[33m'; CYA=$'\033[36m'; DIM=$'\033[2m'; RST=$'\033[0m'

section() { echo; echo "${CYA}== $1 ==${RST}"; }
crit()    { echo "${RED}[CRITICAL]${RST} $1  ${DIM}→ $2${RST}"; CRIT=$((CRIT+1)); }
high()    { echo "${RED}[HIGH]    ${RST} $1  ${DIM}→ $2${RST}"; HIGH=$((HIGH+1)); }
med()     { echo "${YEL}[MEDIUM]  ${RST} $1  ${DIM}→ $2${RST}"; MED=$((MED+1)); }
info()    { echo "[INFO]     $1  ${DIM}→ $2${RST}"; INFO=$((INFO+1)); }

# Standard include/exclude
RG_BASE=(rg -n --no-heading --hidden
  -g '!node_modules' -g '!dist' -g '!build' -g '!.next' -g '!.turbo'
  -g '!*.gen.ts' -g '!bun.lock' -g '!package-lock.json' -g '!pnpm-lock.yaml'
  -g '!.git' -g '!*.min.js' -g '!coverage')

scan() { "${RG_BASE[@]}" "$@" 2>/dev/null; }

# ---------------------------------------------------------------------------
section "1. Auth tokens in localStorage / sessionStorage"
# Match token-ish keys being written to web storage.
matches=$(scan -e '(local|session)Storage\.setItem\(\s*[`"'\''][^`"'\'']*(token|jwt|auth|session|access|refresh|sb-[^`"'\'']+-auth-token)' -i || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l" "references/01-session-storage.md"; done
else info "no auth tokens found in web storage" "references/01-session-storage.md"; fi

# ---------------------------------------------------------------------------
section "2. Client-side admin / role checks"
matches=$(scan -g '!*.server.*' -g '!**/*.functions.*' -g 'src/**' \
  -e "role\s*===\s*['\"](admin|owner|superuser|super_admin)['\"]" \
  -e "isAdmin\s*=\s*(user|profile|session)" \
  -e "user\.(user_metadata|app_metadata)\.role" || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l" "references/02-server-side-roles.md"; done
else info "no obvious client-side role gates" "references/02-server-side-roles.md"; fi

# ---------------------------------------------------------------------------
section "3. Email confirmation / 2FA"
if scan -e 'signInWithPassword|signUp' -g 'src/**' >/dev/null 2>&1; then
  if ! scan -e 'mfa\.enroll|mfa\.challenge|verifyOtp|email.*confirm' -i >/dev/null 2>&1; then
    med "auth used but no MFA / email confirmation code found" "references/03-2fa-email-verify.md"
  else
    info "MFA or email-confirm helpers present" "references/03-2fa-email-verify.md"
  fi
fi

# ---------------------------------------------------------------------------
section "4. Rate limiting on sensitive endpoints"
# Any file that names a sensitive endpoint and doesn't reference a rate limiter.
candidates=$(scan -l -e 'login|signUp|sign-up|signup|reset-password|forgot-password|/api/ai/|generateText|streamText' \
  -g 'src/routes/api/**' -g 'src/**/*.functions.*' -g 'supabase/functions/**' || true)
missing=""
for f in $candidates; do
  if ! rg -q -e 'rateLimit|Upstash|ratelimit|@upstash/ratelimit|checkRateLimit|withRateLimit' "$f" 2>/dev/null; then
    missing+="$f"$'\n'
  fi
done
if [ -n "$missing" ]; then
  echo "$missing" | sed '/^$/d' | while IFS= read -r f; do high "$f" "references/04-rate-limiting.md"; done
else info "sensitive endpoints reference a rate limiter (or none found)" "references/04-rate-limiting.md"; fi

# ---------------------------------------------------------------------------
section "5. Password policy / leaked-password check"
if scan -e 'signUp|updateUser|resetPasswordForEmail' -g 'src/**' >/dev/null 2>&1; then
  if ! scan -e 'zxcvbn|pwnedpasswords|haveibeenpwned|leakedPassword|minLength\s*[:=]\s*(1[0-9]|[2-9][0-9])' -i >/dev/null 2>&1; then
    med "auth flows found but no password strength / leaked-password check" "references/05-password-policy.md"
  fi
fi

# ---------------------------------------------------------------------------
section "6. Secrets in frontend / committed .env"
# a) VITE_ vars whose name screams "secret"
matches=$(scan -e 'VITE_[A-Z0-9_]*(SECRET|PRIVATE|SERVICE_ROLE|SERVICE_KEY|API_KEY|TOKEN)' || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do crit "$l" "references/06-secrets-hygiene.md"; done
fi
# b) service_role / sk_live / sb_secret literals in tracked files
matches=$(scan -e 'service_role|sk_live_[A-Za-z0-9]+|sb_secret_[A-Za-z0-9]+|-----BEGIN (RSA |EC )?PRIVATE KEY-----' || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do crit "$l" "references/06-secrets-hygiene.md"; done
fi
# c) committed .env* files (any that aren't .env.example)
env_files=$(find . -maxdepth 3 -type f \( -name '.env' -o -name '.env.*' \) \
  ! -name '.env.example' ! -name '.env.template' ! -path '*/node_modules/*' 2>/dev/null || true)
if [ -n "$env_files" ]; then
  echo "$env_files" | while IFS= read -r f; do high "$f (committed env file)" "references/06-secrets-hygiene.md"; done
fi

# ---------------------------------------------------------------------------
section "7. RLS + GRANTs on public.* tables"
mig_dir="supabase/migrations"
if [ -d "$mig_dir" ]; then
  # Every migration that CREATE TABLE public.X should also enable RLS and GRANT.
  for f in "$mig_dir"/*.sql; do
    [ -f "$f" ] || continue
    tables=$(rg -oN --pcre2 'create\s+table\s+(?:if\s+not\s+exists\s+)?public\.([a-zA-Z0-9_]+)' -i "$f" -r '$1' 2>/dev/null || true)
    for t in $tables; do
      rg -q -e "alter\s+table\s+public\.$t\s+enable\s+row\s+level\s+security" -i "$f" \
        || crit "$f: public.$t created without ENABLE ROW LEVEL SECURITY" "references/07-rls-policies.md"
      rg -q -e "grant\s+[^;]*on\s+(table\s+)?public\.$t" -i "$f" \
        || high "$f: public.$t created without GRANT" "references/07-rls-policies.md"
    done
  done
else info "no supabase/migrations dir; skipping RLS check" "references/07-rls-policies.md"; fi

# ---------------------------------------------------------------------------
section "8. Logout / session invalidation"
signout=$(scan -l -e 'signOut\(' -g 'src/**' || true)
if [ -n "$signout" ]; then
  for f in $signout; do
    if ! rg -q -e 'queryClient\.(clear|removeQueries|invalidateQueries)|router\.(invalidate|navigate)' "$f" 2>/dev/null; then
      med "$f: signOut() without queryClient clear / router navigate" "references/08-logout-invalidation.md"
    fi
  done
fi

# ---------------------------------------------------------------------------
section "9. Heavy work not moved server-side"
# nodemailer / pdf-lib / puppeteer imported from a client file
matches=$(scan -g 'src/**' -g '!**/*.server.*' -g '!**/*.functions.*' \
  -e "from ['\"](nodemailer|pdf-lib|puppeteer|resend|@sendgrid/mail|openai)['\"]" || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l" "references/09-async-and-load.md"; done
fi

# ---------------------------------------------------------------------------
section "10. PII in logs"
# console.log of user/session/request-body/webhook payloads — the classic PII leak.
matches=$(scan -g 'src/**' \
  -e 'console\.(log|error|warn|info|debug)\([^)]*\b(user|session|profile|request\.body|req\.body|payload|event\.data|customer|card|payment_intent|password|token)\b' || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l" "references/10-pii-in-logs.md"; done
else info "no obvious PII in console.* calls" "references/10-pii-in-logs.md"; fi

# ---------------------------------------------------------------------------
section "11. Emoji / 4-byte UTF-8 safety"
# a) MySQL/MariaDB migrations using utf8 instead of utf8mb4
matches=$(scan -g '**/migrations/**' -g '*.sql' \
  -e 'CHARACTER SET utf8[^m]' -e 'CHARSET=utf8[^m]' -e "charset:\s*['\"]utf8['\"]" -i || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l  (use utf8mb4)" "references/11-utf8mb4-emoji.md"; done
fi
# b) Tight varchar(N) with N <= 32 in Postgres migrations — likely to bite on multi-byte input
matches=$(scan -g 'supabase/migrations/**' -e 'varchar\(([1-9]|[12][0-9]|3[0-2])\)' -i || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do med "$l  (tight varchar; validate by grapheme)" "references/11-utf8mb4-emoji.md"; done
fi
# c) Client-side .length bounds on user text without Intl.Segmenter
if scan -g 'src/**' -e '\.length\s*[<>]=?\s*(1[5-9]|[2-9][0-9]|1[0-9]{2,})' >/dev/null 2>&1; then
  if ! scan -g 'src/**' -e 'Intl\.Segmenter|grapheme' >/dev/null 2>&1; then
    info "length-based validation found but no Intl.Segmenter — emoji may miscounted" "references/11-utf8mb4-emoji.md"
  fi
fi

# ---------------------------------------------------------------------------
section "12. Tests & observability"
# a) No test files at all
test_files=$(find . -type f \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' -o -name '*.spec.tsx' \) \
  ! -path '*/node_modules/*' 2>/dev/null | head -5 || true)
if [ -z "$test_files" ]; then
  med "no *.test.* or *.spec.* files found" "references/12-tests-and-observability.md"
else
  info "test files present" "references/12-tests-and-observability.md"
fi
# b) No error reporting wired
if ! scan -e '@sentry/|Sentry\.init|posthog|datadog' -i >/dev/null 2>&1; then
  med "no error-reporting SDK detected (Sentry/PostHog/Datadog)" "references/12-tests-and-observability.md"
fi
# c) No health check endpoint
if ! scan -g 'src/routes/api/**' -e '/health|/healthz|/status' >/dev/null 2>&1; then
  info "no /health endpoint found for uptime monitoring" "references/12-tests-and-observability.md"
fi

# ---------------------------------------------------------------------------
section "13. IDOR — object access without ownership check"
# a) supabaseAdmin (service role) used inside server functions / route handlers
matches=$(scan -g 'src/**/*.functions.*' -g 'src/routes/api/**' \
  -e 'supabaseAdmin\.from\(' || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do high "$l  (RLS bypass on user data path)" "references/13-idor.md"; done
fi
# b) handlers that filter by id from params/data with no user_id / auth.uid() nearby
candidates=$(scan -l -g 'src/**/*.functions.*' -g 'src/routes/api/**' \
  -e "\.eq\(\s*['\"]id['\"]\s*,\s*(params|data|input|body)\." || true)
for f in $candidates; do
  if ! rg -q -e "user_id|auth\.uid\(\)|context\.userId|requireSupabaseAuth" "$f" 2>/dev/null; then
    high "$f  (id-lookup without ownership check)" "references/13-idor.md"
  fi
done
# c) sequential integer PKs in user-owned tables
matches=$(scan -g 'supabase/migrations/**' -e '\b(bigserial|serial)\s+primary\s+key' -i || true)
if [ -n "$matches" ]; then
  echo "$matches" | while IFS= read -r l; do med "$l  (prefer uuid for user-referenced ids)" "references/13-idor.md"; done
fi

# ---------------------------------------------------------------------------
echo
echo "${CYA}== Summary ==${RST}"
printf "  CRITICAL: %d\n  HIGH:     %d\n  MEDIUM:   %d\n  INFO:     %d\n" "$CRIT" "$HIGH" "$MED" "$INFO"
echo
echo "Fix references live in: .workspace/skills/vibe-code-security-audit/references/"


total=$((CRIT + HIGH))
[ "$total" -gt 125 ] && total=125
exit "$total"
