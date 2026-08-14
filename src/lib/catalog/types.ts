export type Platform = "lovable" | "claude-code" | "cursor";

export type Category =
  | "security"
  | "compliance"
  | "performance"
  | "design"
  | "planning"
  | "accessibility"
  | "growth";

export type SkillAuthor = {
  handle: string;
  avatarUrl: string;
  profileUrl: string;
};

export type SkillRepo = {
  owner: string;
  name: string;
  branch: string;
  license: string;
  url: string;
  /** Repo-relative folder holding SKILL.md. "" means repo root. */
  subdir: string;
};

export type Skill = {
  slug: string;
  name: string;
  purpose: string;
  categories: Category[];
  platforms: Platform[];
  triggers: string[];
  author: SkillAuthor;
  repo: SkillRepo;
  /** Exact repo-relative paths, relative to repo.subdir. */
  files: string[];
};

export type FeaturedRepo = {
  slug: string;
  name: string;
  purpose: string;
  categories: Category[];
  owner: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  security: "security",
  compliance: "compliance",
  performance: "performance",
  design: "design",
  planning: "planning",
  accessibility: "accessibility",
  growth: "growth",
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  lovable: "Lovable",
  "claude-code": "Claude Code",
  cursor: "Cursor",
};
