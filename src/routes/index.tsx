import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skill Injector Hub — inject AI agent skills into any project" },
      {
        name: "description",
        content:
          "A free, open catalog of AI agent skills. Copy one inject prompt, paste it into Lovable, Claude Code or Cursor, and the skill installs itself.",
      },
      {
        property: "og:title",
        content: "Skill Injector Hub — inject AI agent skills into any project",
      },
      {
        property: "og:description",
        content:
          "Copy one inject prompt, paste it into your agent, and the skill installs itself. Free, no login, credit to the authors.",
      },
    ],
  }),
  component: Index,
});

// Boot stub for step 1 (tokens + chrome). The full landing page lands in step 2.
function Index() {
  return (
    <section className="terminal-grid border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-24">
        <p className="text-xs text-muted-foreground">system/boot</p>
        <h1 className="mt-4 text-3xl text-primary crt-glow sm:text-4xl">
          <span className="text-muted-foreground">$</span> skill-injector-hub
          <span className="caret-blink ml-1 inline-block h-6 w-2 translate-y-0.5 bg-primary align-baseline" />
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-dim">
          A free, open catalog of AI agent skills. Pick a skill, copy its inject prompt, paste
          it into your own agent — the files land in{" "}
          <span className="text-primary">.agents/skills/</span> and stars go back to the
          author.
        </p>
        <div className="panel mt-10 max-w-md p-4 text-xs text-muted-foreground">
          <p className="text-dim">status</p>
          <p className="mt-2">design system + shell online. catalog wiring next.</p>
        </div>
      </div>
    </section>
  );
}
