import { AlertTriangle, Download } from "lucide-react";

import { CopyButton } from "./CopyButton";
import { buildInjectPrompt, buildVerifySnippet, isPromptPending, PLATFORM_NOTES } from "@/lib/inject-prompt";
import { buildMarkdownBundle, getLocalMarkdownFiles } from "@/lib/catalog/content";
import { PLATFORM_LABELS } from "@/lib/catalog/types";
import type { Skill } from "@/lib/catalog/types";

export function InjectPanel({ skill }: { skill: Skill }) {
  const prompt = buildInjectPrompt(skill);
  const verify = buildVerifySnippet(skill);
  const pending = isPromptPending(skill);
  const bundleFiles = getLocalMarkdownFiles(skill.slug, skill.files);

  function downloadBundle() {
    const blob = new Blob([buildMarkdownBundle(skill.slug, skill.files)], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skill.slug}.bundle.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {pending ? (
        <p
          role="status"
          className="flex items-start gap-2 border border-warning/40 bg-warning/10 p-3 text-xs text-warning"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            source repo not yet published — prompt will work once the repo is live. Use the
            markdown bundle download below in the meantime.
          </span>
        </p>
      ) : null}

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm text-primary">
            <span className="text-muted-foreground">$</span> inject prompt
          </h2>
          <CopyButton value={prompt} label="Copy inject prompt" />
        </div>
        <pre className="panel max-h-[28rem] overflow-auto p-4 text-[11px] leading-relaxed whitespace-pre-wrap">
          {prompt}
        </pre>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Paste into your own agent chat. It fetches files from the source repo's raw URLs and
          writes them to .agents/skills/{skill.slug}/ — nothing else in your project is touched.
        </p>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm text-primary">
            <span className="text-muted-foreground">$</span> verify after inject
          </h2>
          <CopyButton value={verify} label="Copy verify snippet" />
        </div>
        <pre className="panel overflow-auto p-4 text-[11px] leading-relaxed">{verify}</pre>
      </section>

      <section>
        <h2 className="mb-3 text-sm text-primary">
          <span className="text-muted-foreground">#</span> per-platform notes
        </h2>
        <ul className="space-y-2">
          {skill.platforms.map((platform) => (
            <li key={platform} className="panel p-3 text-xs">
              <p className="text-primary">{PLATFORM_LABELS[platform]}</p>
              <p className="mt-1 text-muted-foreground">{PLATFORM_NOTES[platform]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm text-primary">
          <span className="text-muted-foreground">#</span> fallback: download
        </h2>
        <button
          type="button"
          onClick={downloadBundle}
          disabled={bundleFiles.length === 0}
          className="inline-flex items-center gap-2 border border-border-strong bg-secondary px-3 py-2 text-xs text-primary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download className="size-3.5" aria-hidden="true" />
          Download {skill.slug}.bundle.md
        </button>
        <p className="mt-2 text-[10px] text-muted-foreground">
          {bundleFiles.length} markdown files concatenated with FILE: headers, so any agent can
          unpack them offline. Scripts are not bundled — grab them from the repo.
        </p>
      </section>
    </div>
  );
}
