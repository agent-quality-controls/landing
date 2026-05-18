import type { ReactElement } from "react";
import { cn } from "../lib/utils";

interface StatProps {
  value: string;
  unit?: string;
  label: string;
  source?: string;
  size?: "md" | "lg";
}

export function Stat({
  value,
  unit,
  label,
  source,
  size = "md",
}: StatProps): ReactElement {
  const big = size === "lg";
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-card",
        big ? "px-6 py-7" : "p-5",
      )}
    >
      <div className="flex items-baseline gap-1">
        <div
          className={cn(
            "font-medium leading-none text-ink",
            big
              ? "text-display-md tracking-heading"
              : "text-metric-lg tracking-tight-2",
          )}
        >
          {value}
        </div>
        {unit !== undefined && (
          <div
            className={cn(
              "font-mono text-ink-3",
              big ? "text-body-sm" : "text-caption",
            )}
          >
            {unit}
          </div>
        )}
      </div>
      <div
        className={cn(
          "text-ink-2",
          big ? "mt-2.5 text-small" : "mt-1.5 text-caption",
        )}
      >
        {label}
      </div>
      {source !== undefined && (
        <div className="mt-2 font-mono text-micro text-ink-4">
          Source: {source}
        </div>
      )}
    </div>
  );
}
