import { ALL_CATEGORIES, ALL_PLATFORMS } from "@/lib/catalog/skills";
import { PLATFORM_LABELS, type Category, type Platform } from "@/lib/catalog/types";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  category: Category | "all";
  onCategoryChange: (v: Category | "all") => void;
  platform: Platform | "all";
  onPlatformChange: (v: Platform | "all") => void;
  resultCount: number;
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "border border-border-strong bg-accent px-2 py-1 text-[11px] text-primary"
          : "border border-border px-2 py-1 text-[11px] text-muted-foreground hover:border-border-strong hover:text-primary"
      }
    >
      {children}
    </button>
  );
}

export function FilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  platform,
  onPlatformChange,
  resultCount,
}: Props) {
  return (
    <div className="space-y-4 border-b border-border pb-6">
      <div className="flex items-center gap-2 border border-border px-3 py-2">
        <span aria-hidden className="text-primary">
          $
        </span>
        <label htmlFor="skill-search" className="sr-only">
          Search skills
        </label>
        <input
          id="skill-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="grep skills… (name, purpose, trigger)"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <span className="shrink-0 text-[11px] text-muted-foreground">{resultCount} hits</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-1 text-[11px] text-muted-foreground">category</span>
        <Chip active={category === "all"} onClick={() => onCategoryChange("all")}>
          all
        </Chip>
        {ALL_CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => onCategoryChange(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-1 text-[11px] text-muted-foreground">platform</span>
        <Chip active={platform === "all"} onClick={() => onPlatformChange("all")}>
          all
        </Chip>
        {ALL_PLATFORMS.map((p) => (
          <Chip key={p} active={platform === p} onClick={() => onPlatformChange(p)}>
            {PLATFORM_LABELS[p]}
          </Chip>
        ))}
      </div>
    </div>
  );
}
