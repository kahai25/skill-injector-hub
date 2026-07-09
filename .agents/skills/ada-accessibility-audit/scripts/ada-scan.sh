#!/usr/bin/env bash
# ADA / WCAG static scan. rg-only. Non-destructive.
set -u
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

RG="rg --no-heading -n --color=never -S -g '!node_modules' -g '!dist' -g '!build' -g '!.next' -g '!*.min.*' -g '!*.lock' -g '!package-lock.json'"

section() { printf "\n\033[1m== %s ==\033[0m\n" "$1"; }
scan() {
  local sev="$1" label="$2" pattern="$3"; shift 3
  local color="33"; [ "$sev" = "BLOCKER" ] && color="31"
  local hits
  hits=$(eval "$RG" -e "'$pattern'" "$@" 2>/dev/null || true)
  if [ -n "$hits" ]; then
    printf "  \033[${color}m[%s] %s\033[0m\n" "$sev" "$label"
    echo "$hits" | head -20 | sed 's/^/    /'
    local n; n=$(echo "$hits" | wc -l | tr -d ' ')
    [ "$n" -gt 20 ] && printf "    … +%d more\n" "$((n-20))"
  fi
}
absent() {
  local sev="$1" label="$2" pattern="$3"; shift 3
  local color="33"; [ "$sev" = "BLOCKER" ] && color="31"
  if ! eval "$RG" -lq -e "'$pattern'" "$@" 2>/dev/null; then
    printf "  \033[${color}m[%s] %s\033[0m\n" "$sev" "$label"
  fi
}

section "IMAGES"
scan BLOCKER "<img> without alt attribute" '<img\s+(?![^>]*\balt=)[^>]*>' -g '*.{tsx,jsx,html}'

section "BUTTONS & LINKS"
scan BLOCKER 'Icon-only Button (size="icon") without aria-label' 'size=("|\{")icon("|\})(?![^>]*aria-label)' -g '*.{tsx,jsx}'
scan SERIOUS 'Empty <a> / <button> (no children, no aria-label)' '<(a|button)[^>]*>\s*</(a|button)>' -g '*.{tsx,jsx,html}'

section "FAKE INTERACTIVES"
scan BLOCKER '<div onClick> without role="button"' '<div[^>]*\bonClick=(?![^>]*role=)' -g '*.{tsx,jsx}'
scan BLOCKER '<span onClick> without role="button"' '<span[^>]*\bonClick=(?![^>]*role=)' -g '*.{tsx,jsx}'

section "FORMS"
scan SERIOUS '<input> without id (likely no <label htmlFor>)' '<input\s+(?![^>]*\b(id|aria-label|aria-labelledby)=)[^>]*type=' -g '*.{tsx,jsx,html}'
scan SERIOUS '<textarea> without aria-label / id' '<textarea\s+(?![^>]*\b(id|aria-label|aria-labelledby)=)' -g '*.{tsx,jsx,html}'
scan SERIOUS '<select> without aria-label / id' '<select\s+(?![^>]*\b(id|aria-label|aria-labelledby)=)' -g '*.{tsx,jsx,html}'

section "LANDMARKS & HEADINGS"
absent SERIOUS 'No <main> landmark anywhere in src/' '<main[\s>]' src
absent MODERATE 'No <nav> landmark anywhere in src/' '<nav[\s>]' src
absent SERIOUS 'No <h1> anywhere in src/' '<h1[\s>]' src

section "ROOT DOC"
absent BLOCKER 'No lang= on <html> (check src/routes/__root.tsx)' '<html[^>]*\blang=' src
absent MODERATE 'No skip-to-content link' 'skip.?to.?(content|main)|Skip to' src

section "FOCUS & KEYBOARD"
scan SERIOUS 'Positive tabIndex (breaks keyboard order)' 'tabIndex=\{?["'"'"']?[1-9]' -g '*.{tsx,jsx}'
scan MODERATE 'outline-none without focus-visible replacement' 'outline-none(?!.*focus-visible:)' -g '*.{tsx,jsx,css}'

section "MEDIA"
scan SERIOUS '<video autoPlay> without controls' '<video[^>]*\bautoPlay(?![^>]*\bcontrols)' -g '*.{tsx,jsx,html}'
scan BLOCKER '<audio autoPlay>' '<audio[^>]*\bautoPlay' -g '*.{tsx,jsx,html}'

section "OVERLAYS (lawsuit magnets — remove)"
scan SERIOUS 'Accessibility overlay widget detected' 'accessibe|userway|equalweb|audioeye|accessibility-widget'

section "MOTION"
if eval "$RG" -lq -e '"(framer-motion|gsap|@react-spring)"' package.json 2>/dev/null; then
  absent MODERATE 'Motion library present but no prefers-reduced-motion check' 'prefers-reduced-motion|useReducedMotion' src
fi

printf "\n\033[1mDone.\033[0m Any BLOCKER must be fixed. SERIOUS = likely in a demand letter. MODERATE = fix before launch.\n"
