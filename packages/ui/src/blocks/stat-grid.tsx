import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface StatGridProps {
  readonly children: ReactNode;
  readonly columns?: 2 | 3;
}

export function StatGrid({
  children,
  columns = 2,
}: StatGridProps): ReactElement {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}
