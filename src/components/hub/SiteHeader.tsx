import { Link } from "@tanstack/react-router";

// Routes are built page-by-page. Items marked `ready: false` render as dimmed
// placeholders until their route file exists, then flip to real <Link>s.
const NAV = [
  { to: "/", label: "home", ready: true },
  { to: "/skills", label: "skills", ready: false },
  { to: "/submit", label: "submit", ready: false },
  { to: "/about", label: "about", ready: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-sm">
          <span className="text-primary crt-glow">[</span>
          <span className="font-medium text-foreground">skill-injector-hub</span>
          <span className="text-primary crt-glow">]</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 text-xs">
          {NAV.map((item) =>
            item.ready ? (
              <Link
                key={item.to}
                to="/"
                className="border border-transparent px-2 py-1 text-muted-foreground transition-colors hover:border-border hover:text-primary"
                activeProps={{ className: "border-border-strong text-primary crt-glow" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.to}
                aria-disabled="true"
                className="border border-transparent px-2 py-1 text-muted-foreground/40"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
