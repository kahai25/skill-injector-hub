import { Link } from "@tanstack/react-router";

type Props = {
  visible: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
  allHref?: string;
  allLabel?: string;
  /** Number of items revealed on each incremental step. Defaults to all remaining. */
  step?: number;
};

export function ShowMoreButton({
  visible,
  total,
  expanded,
  onToggle,
  allHref,
  allLabel,
  step,
}: Props) {
  if (visible >= total) {
    if (!allHref) return null;
    return (
      <div className="mt-8 flex justify-center">
        <Link
          to={allHref}
          className="text-xs text-primary transition-colors hover:crt-glow focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {allLabel ?? "view all →"}
        </Link>
      </div>
    );
  }

  const remaining = total - visible;
  const nextStep = step ? Math.min(step, remaining) : remaining;
  const label = expanded
    ? (allLabel ?? "view all in catalog →")
    : `$ show more (${remaining} remaining)`;

  return (
    <div className="mt-8 flex justify-center">
      {expanded && allHref ? (
        <Link
          to={allHref}
          className="border border-border px-4 py-2 text-xs text-primary transition-colors hover:border-border-strong hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {label}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="border border-border px-4 py-2 text-xs text-primary transition-colors hover:border-border-strong hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {expanded ? label : `$ show more (${remaining} remaining)`}
        </button>
      )}
    </div>
  );
}
