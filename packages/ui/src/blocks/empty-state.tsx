import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps): ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-card px-8 py-16 text-center",
        className,
      )}
    >
      {icon !== undefined && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-fill-muted text-ink-2">
          {icon}
        </div>
      )}
      <h3 className="m-0 text-base font-semibold text-ink">{title}</h3>
      {description !== undefined && (
        <p className="mt-2 max-w-md text-sm text-ink-3">{description}</p>
      )}
      {action !== undefined && <div className="mt-5">{action}</div>}
    </div>
  );
}
