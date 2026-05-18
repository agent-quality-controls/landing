import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface StatusPillProps {
  children: ReactNode;
  className?: string;
}

export function StatusPill({
  children,
  className,
}: StatusPillProps): ReactElement {
  return (
    <div className={cn("ui-status-pill", className)}>
      <span className="ui-status-pill-dot" />
      {children}
    </div>
  );
}
