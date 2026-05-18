import type { ReactElement } from "react";
import { cn } from "../lib/utils";

interface MetricTileProps {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  trend?: string;
  trendTone?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricTile({
  label,
  value,
  unit,
  sub,
  trend,
  trendTone = "neutral",
  className,
}: MetricTileProps): ReactElement {
  const trendClass: Record<"up" | "down" | "neutral", string> = {
    up: "text-success",
    down: "text-dash-crit",
    neutral: "text-ink-2",
  };
  return (
    <div className={cn("px-6 py-5", className)}>
      <div className="ui-mono-label">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <div className="text-metric-lg font-medium leading-none tabular-nums tracking-tight-2">
          {value}
        </div>
        {unit !== undefined && (
          <div className="font-mono text-xs text-ink-3">{unit}</div>
        )}
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink-3">
        {sub !== undefined && <span>{sub}</span>}
        {trend !== undefined && (
          <span
            className={cn("font-mono font-semibold", trendClass[trendTone])}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
