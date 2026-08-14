import { CATEGORY_LABELS, type Category } from "@/lib/catalog/types";

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="border border-border-strong px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
      {CATEGORY_LABELS[category]}
    </span>
  );
}
