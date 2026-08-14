import { describe, expect, it } from "vitest";

import { SKILLS } from "@/lib/catalog/skills";
import { buildInjectPrompt, rawUrl } from "@/lib/inject-prompt";

const skill = SKILLS[0]!;

describe("buildInjectPrompt", () => {
  it("builds raw URLs scoped to the repo subdir", () => {
    expect(rawUrl(skill, "SKILL.md")).toBe(
      `https://raw.githubusercontent.com/${skill.repo.owner}/${skill.repo.name}/${skill.repo.branch}/${skill.repo.subdir}/SKILL.md`,
    );
  });

  it("targets .agents/skills/<slug>/ as the write path", () => {
    const prompt = buildInjectPrompt(skill);
    expect(prompt).toContain(`.agents/skills/${skill.slug}/`);
    expect(prompt).not.toContain(".claude/skills/");
  });

  it("lists every manifest file with its raw URL", () => {
    const prompt = buildInjectPrompt(skill);
    for (const file of skill.files) {
      expect(prompt).toContain(file);
      expect(prompt).toContain(rawUrl(skill, file));
    }
    expect(prompt).toContain(`expected: ${skill.files.length}`);
  });

  it("produces well-formed prompts for every skill in the catalog", () => {
    for (const s of SKILLS) {
      const prompt = buildInjectPrompt(s);
      expect(prompt).toContain(s.repo.url);
      expect(prompt).toContain(`@${s.author.handle}`);
      expect(prompt).not.toContain("PENDING");
      for (const file of s.files) {
        expect(prompt).toContain(rawUrl(s, file));
      }
    }
  });
});
