import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  meta,
  actions,
  className,
}: PageHeaderProps): ReactElement {
  const hasMeta = meta !== undefined && meta !== null && meta !== false;
  const hasSubtitle = subtitle !== undefined && subtitle !== "";
  const hasActions =
    actions !== undefined && actions !== null && actions !== false;

  return (
    <div
      className={cn(
        "mb-7 flex items-start justify-between gap-6 border-b border-line pb-6",
        className,
      )}
    >
      <div>
        {hasMeta ? <div className="mb-2.5 ui-mono-label">{meta}</div> : null}
        <h1 className="ui-page-title m-0">{title}</h1>
        {hasSubtitle ? (
          <p className="ui-page-subtitle mt-2.5 max-w-[45rem]">{subtitle}</p>
        ) : null}
      </div>
      {hasActions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  );
}
