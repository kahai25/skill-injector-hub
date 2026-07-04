#!/usr/bin/env bash
# Privacy scan — rg-only. Detects trackers, integrations, and consent tooling.
# Groups by category. Safe to run in any project.
set -u
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

RG="rg --no-heading -n --color=never -S -g '!node_modules' -g '!dist' -g '!build' -g '!.next' -g '!.turbo' -g '!*.min.js' -g '!*.lock' -g '!package-lock.json' -g '!bun.lockb'"

section() { printf "\n\033[1m== %s ==\033[0m\n" "$1"; }
scan() {
  local label="$1"; shift
  local pattern="$1"; shift
  local hits
  hits=$(eval "$RG" -e "'$pattern'" "$@" 2>/dev/null || true)
  if [ -n "$hits" ]; then
    printf "  \033[33m%s\033[0m\n" "$label"
    echo "$hits" | sed 's/^/    /'
  fi
}

section "AD PIXELS (require cookie consent in EU/UK)"
scan "Meta / Facebook Pixel"      "fbq\(|connect\.facebook\.net/.*/fbevents\.js|facebook-pixel"
scan "Google Ads / gtag conversion" "AW-[0-9]+|gtag\('config', ?'AW-"
scan "TikTok Pixel"                "ttq\.|analytics\.tiktok\.com"
scan "LinkedIn Insight"            "_linkedin_partner_id|snap\.licdn\.com"
scan "Reddit Pixel"                "rdt\('init'|reddit_pixel"
scan "Pinterest Tag"               "pintrk\("

section "ANALYTICS (most require consent)"
scan "GA4 / gtag"                  "G-[A-Z0-9]{8,}|googletagmanager\.com/gtag"
scan "Google Tag Manager"          "GTM-[A-Z0-9]+|googletagmanager\.com/gtm"
scan "Plausible"                   "plausible\.io/js|data-domain="
scan "PostHog"                     "posthog(-js|\.init|\.capture)"
scan "Mixpanel"                    "mixpanel\.(init|track|identify)"
scan "Amplitude"                   "amplitude\.(getInstance|init|track)"
scan "Segment"                     "analytics\.(load|track|identify)\(|cdn\.segment\.com"
scan "Hotjar"                      "static\.hotjar\.com|hj\('|hjSetting"
scan "Microsoft Clarity"           "clarity\.ms|clarity\('"
scan "FullStory"                   "fullstory\.com|FS\.identify"

section "CHAT / SUPPORT WIDGETS"
scan "Intercom"                    "widget\.intercom\.io|Intercom\('"
scan "Crisp"                       "client\.crisp\.chat|\\\$crisp"
scan "Drift"                       "js\.driftt\.com|drift\.load"
scan "Tidio"                       "code\.tidio\.co"
scan "HelpScout Beacon"            "beacon-v2\.helpscout\.net|Beacon\('"
scan "Zendesk"                     "static\.zdassets\.com|zE\('"

section "CRM"
scan "HubSpot"                     "js\.hs-scripts\.com|_hsq"
scan "Salesforce"                  "salesforce\.com/embeddedservice|force\.com"
scan "Pipedrive"                   "pipedrive\.com/webforms"
scan "Attio"                       "attio\.com"

section "EMAIL / MARKETING"
scan "Mailchimp"                   "chimpstatic\.com|list-manage\.com|mailchimp"
scan "Klaviyo"                     "klaviyo\.com|_klOnsite"
scan "Resend"                      "@resend/|resend\.emails\.send|resend\.com"
scan "SendGrid"                    "@sendgrid/|sendgrid\.com"
scan "Postmark"                    "postmarkapp\.com"
scan "Loops"                       "app\.loops\.so|@loops/"
scan "ConvertKit"                  "convertkit\.com"

section "FORMS / SCHEDULING"
scan "Typeform"                    "typeform\.com|@typeform/"
scan "Tally"                       "tally\.so"
scan "Formspree"                   "formspree\.io"
scan "Calendly"                    "calendly\.com|@calendly/"
scan "Cal.com"                     "cal\.com/embed|@calcom/"

section "AI PROVIDERS (list in policy — user prompts may be logged)"
scan "OpenAI"                      "@?openai|api\.openai\.com"
scan "Anthropic"                   "@anthropic-ai|api\.anthropic\.com"
scan "Lovable AI Gateway"          "ai\.gateway\.lovable\.dev|LOVABLE_API_KEY"
scan "Perplexity"                  "api\.perplexity\.ai"
scan "Replicate"                   "api\.replicate\.com|@replicate"
scan "ElevenLabs"                  "api\.elevenlabs\.io|@elevenlabs"

section "AUTH"
scan "Supabase"                    "@supabase/|supabase\.co"
scan "Clerk"                       "@clerk/|clerk\.com|clerk\.dev"
scan "Auth0"                       "@auth0/|auth0\.com"
scan "Firebase"                    "firebase\.google\.com|@firebase/"
scan "NextAuth / Auth.js"          "next-auth|@auth/"

section "PAYMENTS (⚠ PCI scope — policy must name processor)"
scan "Stripe"                      "@stripe/|stripe\.com|pk_(test|live)_"
scan "Paddle"                      "@paddle/|paddle\.com"
scan "LemonSqueezy"                "lemonsqueezy\.com|@lemonsqueezy"

section "FILE STORAGE"
scan "Supabase Storage"            "supabase\.storage|from\('storage'"
scan "Cloudinary"                  "cloudinary\.com|@cloudinary/"
scan "S3 / R2"                     "@aws-sdk/client-s3|amazonaws\.com|r2\.cloudflarestorage"
scan "UploadThing"                 "uploadthing|@uploadthing/"

section "COOKIE CONSENT"
scan "cookieconsent (orestbida)"   "vanilla-cookieconsent|CookieConsent"
scan "iubenda"                     "iubenda\.com"
scan "Cookiebot"                   "cookiebot\.com|consent\.cookiebot"
scan "Osano"                       "osano\.com"
scan "OneTrust"                    "onetrust\.com|otSDKStub"
scan "Klaro"                       "kiprotect/klaro|klaro"

printf "\n\033[1m== SUMMARY ==\033[0m\n"
printf "  Every category above with hits MUST appear in your privacy policy.\n"
printf "  If AD PIXELS or ANALYTICS have hits but COOKIE CONSENT is empty:\n"
printf "  you need a consent banner before those trackers fire (EU/UK/CA).\n"
