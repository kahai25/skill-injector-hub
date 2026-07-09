#!/usr/bin/env bash
# Static launch-readiness check. rg-only. Non-destructive.
set -u
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; }
miss() { printf "  \033[31m✗\033[0m %s\n" "$1"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$1"; }

section() { printf "\n\033[1m== %s ==\033[0m\n" "$1"; }

check_file() {
  if [ -f "$1" ] || [ -f "public/$1" ] || [ -f "static/$1" ]; then ok "$1"; else miss "$1 missing"; fi
}

check_rg() {
  local label="$1" pat="$2"
  if rg -q -S "$pat" -g '!node_modules' -g '!dist' -g '!build' 2>/dev/null; then ok "$label"; else miss "$label not found"; fi
}

section "Head metadata"
check_rg "og:title"        'property=["'"'"']og:title'
check_rg "og:description"  'property=["'"'"']og:description'
check_rg "og:image"        'property=["'"'"']og:image'
check_rg "twitter:card"    'name=["'"'"']twitter:card'
check_rg "canonical link"  'rel=["'"'"']canonical'

section "Static assets"
check_file "favicon.ico"
check_file "apple-touch-icon.png"
check_file "manifest.json"
check_file "robots.txt"
check_file "sitemap.xml"

section "Legal pages"
if rg -lq -S 'privacy' -g '!node_modules' src/routes 2>/dev/null; then ok "privacy route"; else miss "privacy route"; fi
if rg -lq -S 'terms'   -g '!node_modules' src/routes 2>/dev/null; then ok "terms route";   else miss "terms route"; fi

section "SEO integrations (optional)"
check_rg "Google Search Console verification" 'google-site-verification'
check_rg "Bing Webmasters verification"       'msvalidate\.01'
check_rg "IndexNow endpoint wired"            'indexnow'

section "Structured data"
check_rg "JSON-LD" 'application/ld\+json'

section "Placeholders still in code (must be zero)"
if rg -nq -S 'REPLACE this|PlaceholderIndex|Lovable App|Lovable Generated Project|lovable-blank-page-placeholder|lorem ipsum|unsplash\.com/random' src 2>/dev/null; then
  warn "placeholder strings found — run: rg -n 'REPLACE this|PlaceholderIndex|Lovable App|Lovable Generated Project|lorem ipsum' src"
else
  ok "no placeholder strings"
fi

section "Vibe-coded tells"
if rg -nq -S 'data-lovable-badge|LovableBadge|lovable\.dev/badge' src public 2>/dev/null; then
  warn "Lovable badge markup found — verify Publish settings hides it before launch"
else
  ok "no visible Lovable badge markup"
fi
if rg -lq -S '"(framer-motion|gsap|@react-spring)"' package.json 2>/dev/null; then
  if rg -nq -S 'prefers-reduced-motion|useReducedMotion' src 2>/dev/null; then
    ok "motion library respects reduced-motion"
  else
    warn "motion library imported but no prefers-reduced-motion / useReducedMotion check"
  fi
fi
if rg -lq -S '(Footer|SiteFooter)' src 2>/dev/null; then
  ok "footer component present"
else
  warn "no Footer component found — legal links likely missing on inner routes"
fi

printf "\n\033[1mDone.\033[0m Any ✗ must be resolved before launch. Also run privacy-policy-audit, ada-accessibility-audit, and vibe-code-security-audit.\n"
