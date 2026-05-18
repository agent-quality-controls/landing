import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

export type ChipTone =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "ok"
  | "warn"
  | "info"
  | "neutral";

interface ChipProps {
  tone?: ChipTone;
  filled?: boolean;
  children: ReactNode;
  className?: string;
}

const OUTLINE_CLASSES: Record<ChipTone, string> = {
  critical: "ui-tone-critical",
  high: "ui-tone-high",
  medium: "ui-tone-medium",
  low: "text-ink-3 bg-fill-muted border-line",
  ok: "ui-tone-ok",
  warn: "ui-tone-warn",
  info: "ui-tone-info",
  neutral: "text-ink bg-card border-line",
};

const FILLED_CLASSES: Record<ChipTone, string> = {
  critical: "bg-dash-crit text-white border-dash-crit",
  high: "bg-dash-warn-strong text-white border-dash-warn-strong",
  medium: "bg-tone-medium text-white border-tone-medium",
  low: "bg-ink-3 text-white border-ink-3",
  ok: "bg-success text-white border-success",
  warn: "bg-destructive text-white border-destructive",
  info: "bg-dash-info text-white border-dash-info",
  neutral: "bg-ink text-white border-ink",
};

export function Chip({
  tone = "info",
  filled = false,
  children,
  className,
}: ChipProps): ReactElement {
  const classes = filled ? FILLED_CLASSES[tone] : OUTLINE_CLASSES[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-sm border px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-kicker",
        classes,
        className,
      )}
    >
      {children}
    </span>
  );
}
