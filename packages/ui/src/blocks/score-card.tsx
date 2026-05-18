import type { ReactElement } from "react";
import { cn } from "../lib/utils";

export type ScoreTone = "neutral" | "crit" | "warn" | "ok";

interface ScoreCardProps {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  trend?: string;
  tone?: ScoreTone;
  bar?: number;
  className?: string;
}

const VALUE_COLOR: Record<ScoreTone, string> = {
  neutral: "text-ink",
  crit: "text-dash-crit",
  warn: "text-dash-warn-strong",
  ok: "text-success",
};

const BAR_COLOR: Record<ScoreTone, string> = {
  neutral: "bg-ink",
  crit: "bg-dash-crit",
  warn: "bg-dash-warn-strong",
  ok: "bg-success",
};

export function ScoreCard({
  label,
  value,
  unit,
  sub,
  trend,
  tone = "neutral",
  bar,
  className,
}: ScoreCardProps): ReactElement {
  const trendIsUp = trend?.startsWith("+") ?? false;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-card px-5 py-[1.125rem]",
        className,
      )}
    >
      <div className="mb-2.5 ui-mono-label">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <div
          className={cn(
            "text-metric-xl font-medium leading-none tabular-nums tracking-heading",
            VALUE_COLOR[tone],
          )}
        >
          {value}
        </div>
        {unit !== undefined && (
          <div className="font-mono text-caption text-ink-3">{unit}</div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline justify-between">
        {sub !== undefined && <div className="text-xs text-ink-3">{sub}</div>}
        {trend !== undefined && (
          <div
            className={cn(
              "font-mono text-micro font-semibold",
              trendIsUp ? "text-dash-crit" : "text-success",
            )}
          >
            {trend}
          </div>
        )}
      </div>
      {bar !== undefined && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-fill-muted">
          <div
            className={cn("h-full", BAR_COLOR[tone])}
            style={{ width: `${String(bar)}%` }}
          />
        </div>
      )}
    </div>
  );
}
