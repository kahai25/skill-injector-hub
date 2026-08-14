/**
 * Build-time markdown content for the skills that live in this repo.
 * v0.1 reads `.agents/skills/**\/*.md` at build time — no network, no GitHub
 * rate limits. When live GitHub sync lands (v0.2) this module becomes the
 * offline fallback.
 */
const modules = import.meta.glob("/.agents/skills/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const prefix = "/.agents/skills/";

/** Strip a leading YAML frontmatter block (---...---) from markdown text. */
function stripFrontmatter(source: string): string {
  const trimmed = source.trimStart();
  if (!trimmed.startsWith("---")) return source;
  const end = trimmed.indexOf("---", 3);
  if (end === -1) return source;
  return trimmed.slice(end + 3).replace(/^\n*/, "");
}

export function getSkillFileContent(slug: string, file: string): string | null {
  const raw = modules[`${prefix}${slug}/${file}`] ?? null;
  return raw && file.endsWith(".md") ? stripFrontmatter(raw) : raw;
}

export function getSkillDoc(slug: string): string | null {
  return getSkillFileContent(slug, "SKILL.md");
}

/** Repo-relative markdown paths we actually have content for, in manifest order. */
export function getLocalMarkdownFiles(slug: string, files: string[]): string[] {
  return files.filter((f) => f.endsWith(".md") && getSkillFileContent(slug, f) !== null);
}

/** Concatenated-markdown fallback bundle (download when inject is not an option). */
export function buildMarkdownBundle(slug: string, files: string[]): string {
  const available = getLocalMarkdownFiles(slug, files);
  const header = [
    `# ${slug} — skill bundle`,
    "",
    `Unpack each section below into \`.agents/skills/${slug}/<path>\`.`,
    "Non-markdown files (scripts) are not included in this bundle — fetch them from the source repo.",
    "",
  ].join("\n");

  const body = available
    .map((file) => {
      const content = getSkillFileContent(slug, file) ?? "";
      return [`\n\n---\n\n## FILE: ${file}\n`, content.trimEnd(), ""].join("\n");
    })
    .join("");

  return header + body + "\n";
}
