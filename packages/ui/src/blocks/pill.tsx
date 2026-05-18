import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface PillProps {
  children: ReactNode;
  count?: number;
  active?: boolean;
  className?: string;
}

export function Pill({
  children,
  count,
  active = false,
  className,
}: PillProps): ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-caption font-medium",
        active
          ? "border-ink bg-ink text-card"
          : "border-line bg-card text-ink-2",
        className,
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            "font-mono text-micro",
            active ? "text-card/70" : "text-ink-4",
          )}
        >
          {count}
        </span>
      )}
    </span>
  );
}
