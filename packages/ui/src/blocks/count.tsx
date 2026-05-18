import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

export type CountTone = "neutral" | "warn" | "crit";

interface CountProps {
  tone?: CountTone;
  children: ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<CountTone, string> = {
  neutral: "text-ink-2 bg-fill-muted border-line",
  warn: "ui-tone-warn",
  crit: "ui-tone-critical",
};

export function Count({
  tone = "neutral",
  children,
  className,
}: CountProps): ReactElement {
  return (
    <span
      className={cn(
        "inline-block min-w-5 rounded-full border px-2 py-px text-center font-mono text-micro font-semibold tabular-nums",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
