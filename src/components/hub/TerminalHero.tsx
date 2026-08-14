import { Link } from "@tanstack/react-router";

export function TerminalHero({ skillCount }: { skillCount: number }) {
  return (
    <section className="terminal-grid border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <p className="text-xs text-muted-foreground">skill-injector-hub · v0.1</p>

        <h1 className="mt-4 text-3xl leading-tight text-primary crt-glow sm:text-5xl">
          <span className="text-muted-foreground">$</span> inject-skill --list
          <span className="caret-blink ml-2 inline-block h-7 w-2.5 translate-y-0.5 bg-primary align-baseline sm:h-9" />
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-dim sm:text-base">
          An open catalog of {skillCount} AI-agent skills. Pick one, copy its inject prompt,
          paste it into Lovable, Claude Code or Cursor — your agent writes the files into{" "}
          <span className="text-primary">.agents/skills/</span> itself. Free, no login, and
          every skill credits its author.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link
            to="/skills"
            className="border border-border-strong bg-accent px-4 py-2 text-primary hover:crt-glow"
          >
            browse catalog →
          </Link>
          <a
            href="#how-it-works"
            className="border border-border px-4 py-2 text-muted-foreground hover:border-border-strong hover:text-primary"
          >
            how injection works
          </a>
        </div>
      </div>
    </section>
  );
}
