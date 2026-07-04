#!/usr/bin/env bash
# vibe-code-performance-audit — repo scanner
# Usage: bash .workspace/skills/vibe-code-performance-audit/scripts/perf-audit.sh [project-root]
set -u
ROOT="${1:-.}"
cd "$ROOT" || { echo "cannot cd to $ROOT"; exit 2; }
command -v rg >/dev/null 2>&1 || { echo "ripgrep required" >&2; exit 2; }

RED=$'\033[31m'; YEL=$'\033[33m'; CYA=$'\033[36m'; DIM=$'\033[2m'; RST=$'\033[0m'
HIGH=0; MED=0; INFO=0
section() { echo; echo "${CYA}== $1 ==${RST}"; }
high() { echo "${RED}[HIGH]  ${RST} $1  ${DIM}→ $2${RST}"; HIGH=$((HIGH+1)); }
med()  { echo "${YEL}[MEDIUM]${RST} $1  ${DIM}→ $2${RST}"; MED=$((MED+1)); }
info() { echo "[INFO]   $1  ${DIM}→ $2${RST}"; INFO=$((INFO+1)); }

RG_BASE=(rg -n --no-heading --hidden
  -g '!node_modules' -g '!dist' -g '!build' -g '!*.gen.ts' -g '!bun.lock'
  -g '!package-lock.json' -g '!pnpm-lock.yaml' -g '!.git' -g '!coverage')
scan() { "${RG_BASE[@]}" "$@" 2>/dev/null; }

# 1. Compression
section "1. Response compression (gzip / brotli)"
if [ -f vite.config.ts ] || [ -f vite.config.js ]; then
  if ! scan -e 'compression|vite-plugin-compression|CompressionStream|content-encoding' -i vite.config.* >/dev/null 2>&1; then
    med "vite.config: no compression plugin or Content-Encoding config found" "references/1-compression.md"
  else info "compression config detected" "references/1-compression.md"; fi
fi
# API routes returning JSON without any compression header
if scan -g 'src/routes/api/**' -e 'Response\.json|new Response\(' >/dev/null 2>&1; then
  if ! scan -g 'src/routes/api/**' -e 'content-encoding|gzip|brotli|CompressionStream' -i >/dev/null 2>&1; then
    med "api routes return JSON but no compression detected" "references/1-compression.md"
  fi
fi

# 2. Batch inserts
section "2. Row-at-a-time database inserts inside loops"
# Files that contain a loop and a .insert( call — heuristic
candidates=$(scan -l -e '\.(insert|upsert)\(' -g 'src/**' || true)
for f in $candidates; do
  if rg -q -e '(for\s*\(|\.forEach\(|\.map\(|while\s*\()' "$f" 2>/dev/null; then
    # crude: report file if insert appears within 8 lines below a loop keyword
    if rg -nU --pcre2 -e '(for\s*\(|\.forEach\(|\.map\(|while\s*\()[^{]*\{[^}]{0,600}\.(insert|upsert)\(' "$f" >/dev/null 2>&1; then
      high "$f: .insert/.upsert inside a loop — batch into a single array insert" "references/2-batch-inserts.md"
    fi
  fi
done

# 3. Sequential awaits / dependency bottleneck
section "3. Sequential awaits (candidates for Promise.all)"
matches=$(rg -nU --pcre2 -g 'src/**/*.{ts,tsx}' -g '!*.gen.ts' \
  -e 'await\s+[^\n]+\n\s*const\s+\w+\s*=\s*await\s+[^\n]+\n\s*const\s+\w+\s*=\s*await\s+' 2>/dev/null || true)
if [ -n "$matches" ]; then
  echo "$matches" | rg -n '^[^-]' | head -20 | while IFS= read -r l; do med "$l" "references/3-latency-breakdown.md"; done
fi

# 4. Optimistic UI
section "4. Missing optimistic updates in mutations"
candidates=$(scan -l -e 'useMutation\(' -g 'src/**' || true)
for f in $candidates; do
  if ! rg -q -e 'onMutate\s*:' "$f" 2>/dev/null; then
    med "$f: useMutation without onMutate (UI waits on backend)" "references/4-optimistic-ui.md"
  fi
done

# 5. Prerender / static caching
section "5. Marketing / logged-out routes not prerendered or cached"
for route in src/routes/index.tsx src/routes/pricing.tsx src/routes/about.tsx src/routes/landing.tsx; do
  [ -f "$route" ] || continue
  if ! rg -q -e 'prerender|ssg|Cache-Control|revalidate|staleTime' "$route" 2>/dev/null; then
    med "$route: no prerender / Cache-Control / staleTime config" "references/5-ssr-static-caching.md"
  fi
done
if ! scan -g 'src/routes/api/**' -e 'Cache-Control' -i >/dev/null 2>&1; then
  info "no Cache-Control headers set anywhere in src/routes/api/" "references/5-ssr-static-caching.md"
fi

echo; echo "${CYA}== Summary ==${RST}"
printf "  HIGH:   %d\n  MEDIUM: %d\n  INFO:   %d\n" "$HIGH" "$MED" "$INFO"
echo; echo "Fix references live in: .workspace/skills/vibe-code-performance-audit/references/"
exit 0
