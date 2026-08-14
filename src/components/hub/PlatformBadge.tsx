import { PLATFORM_LABELS, type Platform } from "@/lib/catalog/types";

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span className="border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
      {PLATFORM_LABELS[platform]}
    </span>
  );
}
