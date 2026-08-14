import type { FeaturedRepo, Skill } from "./types";

/**
 * Single swap point for the GitHub account that owns the hub repo and the
 * featured repos.
 */
export const OWNER_GITHUB = "kahai25";

/** The hub repo is still private; flip to true once it goes public. */
export const HUB_REPO_PUBLIC = false;

const HUB_REPO = "skill-injector-hub";

export const isLocalSkill = (skill: Skill) => skill.repo.name === HUB_REPO;

const author = {
  handle: OWNER_GITHUB,
  avatarUrl: `https://github.com/${OWNER_GITHUB}.png?size=80`,
  profileUrl: `https://github.com/${OWNER_GITHUB}`,
};

function hubRepo(slug: string) {
  return {
    owner: OWNER_GITHUB,
    name: HUB_REPO,
    branch: "main",
    license: "MIT",
    url: `https://github.com/${OWNER_GITHUB}/${HUB_REPO}`,
    subdir: `.agents/skills/${slug}`,
  };
}

export const SKILLS: Skill[] = [
  {
    slug: "vibe-code-security-audit",
    name: "vibe-code-security-audit",
    purpose:
      "Scans a vibe-coded app for the flaws AI codegen ships by default: tokens in localStorage, client-side role checks, missing rate limits, exposed secrets, missing RLS and GRANTs, IDOR, PII in logs, emoji charset crashes.",
    categories: ["security"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "run the security audit",
      "check my app for security issues",
      "is my vibe-coded app safe",
      "check for exposed secrets",
      "can users see each other's data",
    ],
    author,
    repo: hubRepo("vibe-code-security-audit"),
    files: [
      "SKILL.md",
      "references/01-session-storage.md",
      "references/02-server-side-roles.md",
      "references/03-2fa-email-verify.md",
      "references/04-rate-limiting.md",
      "references/05-password-policy.md",
      "references/06-secrets-hygiene.md",
      "references/07-rls-policies.md",
      "references/08-logout-invalidation.md",
      "references/09-async-and-load.md",
      "references/10-pii-in-logs.md",
      "references/11-utf8mb4-emoji.md",
      "references/12-tests-and-observability.md",
      "references/13-idor.md",
      "references/15-ai-usage-caps.md",
      "references/16-abuse-mitigation.md",
      "references/baseline-hardening.md",
      "scripts/audit.sh",
    ],
  },
  {
    slug: "vibe-code-performance-audit",
    name: "vibe-code-performance-audit",
    purpose:
      "Finds the five performance mistakes AI codegen almost always ships — uncompressed JSON, row-at-a-time inserts in loops, blocking sequential awaits, non-optimistic UI, and uncached logged-out pages.",
    categories: ["performance"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "audit performance",
      "my app feels slow",
      "why is my app slow at scale",
      "make it faster before launch",
    ],
    author,
    repo: hubRepo("vibe-code-performance-audit"),
    files: [
      "SKILL.md",
      "references/1-compression.md",
      "references/2-batch-inserts.md",
      "references/3-latency-breakdown.md",
      "references/4-optimistic-ui.md",
      "references/5-ssr-static-caching.md",
      "scripts/perf-audit.sh",
    ],
  },
  {
    slug: "ada-accessibility-audit",
    name: "ada-accessibility-audit",
    purpose:
      "Static WCAG scan for the issues ADA demand letters actually cite: missing alt text, unlabeled icon buttons, fake div buttons, unlabeled inputs, missing landmarks, skipped headings, no skip link. Warns off overlay widgets.",
    categories: ["accessibility", "compliance"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "accessibility audit",
      "ADA compliance",
      "WCAG",
      "screen reader",
      "am I going to get sued for accessibility",
    ],
    author,
    repo: hubRepo("ada-accessibility-audit"),
    files: [
      "SKILL.md",
      "references/1-why-lawsuits.md",
      "references/2-wcag-quick-wins.md",
      "references/3-semantic-html.md",
      "references/4-widget-vs-real-fix.md",
      "scripts/ada-scan.sh",
    ],
  },
  {
    slug: "privacy-policy-audit",
    name: "privacy-policy-audit",
    purpose:
      "Maps every tracker, pixel, analytics tag, CRM, AI provider and processor your app actually uses against what your privacy policy claims — and flags missing cookie consent.",
    categories: ["compliance"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "privacy policy",
      "GDPR",
      "cookie consent",
      "am I compliant",
      "check my tracking",
    ],
    author,
    repo: hubRepo("privacy-policy-audit"),
    files: [
      "SKILL.md",
      "assets/privacy-policy.template.md",
      "references/1-what-collects-data.md",
      "references/2-policy-must-match.md",
      "references/3-cookie-consent.md",
      "references/4-data-processor-list.md",
      "scripts/privacy-scan.sh",
    ],
  },
  {
    slug: "launch-polish-checklist",
    name: "launch-polish-checklist",
    purpose:
      "A five-stage pre-launch pass: plan the feature, review the generated code for bloat, commit to a distinctive UI, audit screenshots and copy, then run the launch-day metadata and SEO checks.",
    categories: ["planning", "growth"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "get my app ready to launch",
      "polish this before I ship",
      "review my UI",
      "make my landing page convert",
    ],
    author,
    repo: hubRepo("launch-polish-checklist"),
    files: [
      "SKILL.md",
      "references/1-plan-first.md",
      "references/2-code-review.md",
      "references/3-creative-ui.md",
      "references/4-screenshots-and-copy.md",
      "references/5-launch-day-checklist.md",
      "scripts/launch-check.sh",
    ],
  },
  {
    slug: "pre-ship-verification",
    name: "pre-ship-verification",
    purpose:
      "The four-question gate before merging any AI-generated feature: most secure way? most efficient way? what regressions? what tests before it ships?",
    categories: ["planning", "security"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "is this ready to ship",
      "review this before I merge",
      "did we break anything",
      "should I deploy",
    ],
    author,
    repo: hubRepo("pre-ship-verification"),
    files: ["SKILL.md", "references/1-the-four-questions.md"],
  },
  {
    slug: "four-doc-spec-framework",
    name: "four-doc-spec-framework",
    purpose:
      "Turns a fuzzy app idea into four short docs — PRD (including what the app is NOT), architecture, AI rules, and a numbered plan the agent executes one step at a time.",
    categories: ["planning"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "help me plan a new app",
      "write a PRD",
      "spec this out",
      "I keep getting scope creep",
    ],
    author,
    repo: hubRepo("four-doc-spec-framework"),
    files: [
      "SKILL.md",
      "assets/1-prd.template.md",
      "assets/2-architecture.template.md",
      "assets/3-ai-rules.template.md",
      "assets/4-plan.template.md",
      "references/how-to-run.md",
      "references/multi-agent-tickets.md",
      "references/examples/todo-app-prd.md",
    ],
  },
  {
    slug: "ui-style-picker",
    name: "ui-style-picker",
    purpose:
      "Applies one distinct visual identity through design tokens — 10 whole-app themes plus 17 strict single-component restyle prompts (Neumorphism, Glassmorphism, Aurorism, Retro-Tech Terminal, and more).",
    categories: ["design"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "change the UI style",
      "apply glassmorphism",
      "what UI styles can I pick",
      "make the app look like",
    ],
    author,
    repo: hubRepo("ui-style-picker"),
    files: [
      "SKILL.md",
      "references/brutalism.md",
      "references/claymorphism.md",
      "references/cyberpunk-neon.md",
      "references/flat.md",
      "references/glassmorphism.md",
      "references/material.md",
      "references/neomorphism.md",
      "references/neubrutalism.md",
      "references/retro-y2k.md",
      "references/skeuomorphism.md",
      "references/prompts/aurorism.md",
      "references/prompts/chromatic-vaporwave-minimalism.md",
      "references/prompts/claymorphism.md",
      "references/prompts/color-form-modernism.md",
      "references/prompts/digital-bauhaus.md",
      "references/prompts/frosted-metal-aesthetic.md",
      "references/prompts/glassmorphism.md",
      "references/prompts/gooey-liquid-morphism.md",
      "references/prompts/hyperflat-flat-3-0.md",
      "references/prompts/isomorphic-3d.md",
      "references/prompts/kinetic-minimalism.md",
      "references/prompts/minimal-brutalism.md",
      "references/prompts/neumorphism.md",
      "references/prompts/retro-tech-terminal-modernism.md",
      "references/prompts/retrofuturism.md",
      "references/prompts/skeuomorphic-revival.md",
      "references/prompts/soft-ui.md",
    ],
  },
  {
    slug: "attack-this-copy",
    name: "attack-this-copy",
    purpose:
      "Adversarial copy review. Flips the assistant from encouraging editor into ruthless conversion critic, then loops fix-and-re-attack until it finds nothing left to attack.",
    categories: ["growth"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "attack my copy",
      "why isn't this converting",
      "critique my pricing",
      "roast my landing page",
    ],
    author,
    repo: hubRepo("attack-this-copy"),
    files: [
      "SKILL.md",
      "references/1-attack-prompts.md",
      "references/2-loop-until-empty.md",
      "references/3-what-to-attack.md",
    ],
  },
  {
    slug: "startup-strategy-primer",
    name: "startup-strategy-primer",
    purpose:
      "Reference vocabulary for founder-level strategy calls: TAM/SAM/SOM, beachhead markets, moats, red vs blue ocean, vertical vs horizontal SaaS, marketplaces, market timing.",
    categories: ["growth", "planning"],
    platforms: ["lovable", "claude-code", "cursor"],
    triggers: [
      "market sizing",
      "TAM SAM SOM",
      "should I go vertical or horizontal",
      "am I too early",
    ],
    author,
    repo: hubRepo("startup-strategy-primer"),
    files: [
      "SKILL.md",
      "references/1-market-sizing.md",
      "references/2-beachhead.md",
      "references/3-moats.md",
      "references/4-competition.md",
      "references/5-saas-shapes.md",
      "references/6-timing.md",
    ],
  },
];

export const FEATURED_REPOS: FeaturedRepo[] = [
  {
    slug: "vibe-security",
    name: "vibe-security",
    purpose:
      "Full security skill pack for vibe-coded apps — auth, secrets, RLS, abuse mitigation, and the scanners that catch them.",
    categories: ["security"],
    owner: OWNER_GITHUB,
  },
  {
    slug: "vibe-compliance",
    name: "vibe-compliance",
    purpose:
      "Privacy, cookie consent, ADA/WCAG and processor-disclosure skills for apps that need to survive a compliance review.",
    categories: ["compliance", "accessibility"],
    owner: OWNER_GITHUB,
  },
  {
    slug: "lovable-hardening",
    name: "lovable-hardening",
    purpose:
      "Opinionated hardening pass for Lovable projects: server-side gates, rate limits, role checks, and pre-ship verification.",
    categories: ["security", "planning"],
    owner: OWNER_GITHUB,
  },
];

export const ALL_CATEGORIES = [
  "security",
  "compliance",
  "performance",
  "design",
  "planning",
  "accessibility",
  "growth",
] as const;

export const ALL_PLATFORMS = ["lovable", "claude-code", "cursor"] as const;

export function getSkill(slug: string) {
  return SKILLS.find((s) => s.slug === slug);
}
