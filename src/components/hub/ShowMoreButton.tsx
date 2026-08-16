import { Link } from "@tanstack/react-router";

type Props = {
  /** Items currently shown. */
  visible: number;
  /** Total items available. */
  total: number;
  /** Whether the grid has been fully expanded. */
  expanded: boolean;
  /** Click to expand the next batch. Called when expanded is false. */
  onExpand: () => void;
  /** Optional destination shown once everything is visible. */
  allHref?: string;
  allLabel?: string;
};

export function ShowMoreButton({
  visible,
  total,
  expanded,
  onExpand,
  allHref,
  allLabel = "view all in catalog →",
}: Props) {
  const fullyVisible = visible >= total;

  if (fullyVisible) {
    if (!allHref) return null;
    return (
      <div className="mt-8 flex justify-center">
        <Link
          to={allHref}
          className="border border-border px-4 py-2 text-xs text-primary transition-colors hover:border-border-strong hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {allLabel}
        </Link>
      </div>
    );
  }

  const remaining = total - visible;

  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onExpand}
        aria-expanded={expanded}
        aria-controls="skill-grid"
        className="border border-border px-4 py-2 text-xs text-primary transition-colors hover:border-border-strong hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring"
      >
        $ show more ({remaining} remaining)
      </button>
    </div>
  );
}
