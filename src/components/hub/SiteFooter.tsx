export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-primary">$</span> free &amp; open · no login · no tracking
        </p>
        <p>
          every skill links back to its source repo — stars go to the authors, never to this
          hub.
        </p>
      </div>
    </footer>
  );
}
