import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";
import { H1, Lead } from "./typography";

export interface ArticleHeaderProps {
  badges?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  extra?: ReactNode;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
  extraClassName?: string;
  titleWidth?: "md" | "lg";
}

const TITLE_WIDTH: Record<
  NonNullable<ArticleHeaderProps["titleWidth"]>,
  string
> = {
  md: "ui-article-title-wrap-md",
  lg: "ui-article-title-wrap-lg",
};

export function ArticleHeader({
  badges,
  title,
  lead,
  meta,
  extra,
  className,
  titleClassName,
  leadClassName,
  extraClassName,
  titleWidth = "lg",
}: ArticleHeaderProps): ReactElement {
  return (
    <section className={cn("px-4 pb-6 pt-8 sm:px-8 lg:px-12", className)}>
      {badges !== undefined && (
        <div className="mb-5 flex flex-wrap gap-2">
          {typeof badges === "string" ? (
            <span className="inline-block rounded-sm bg-ink px-2 py-1 font-mono text-micro uppercase tracking-kicker text-accent">
              {badges}
            </span>
          ) : (
            badges
          )}
        </div>
      )}
      <H1 className={cn(TITLE_WIDTH[titleWidth], titleClassName)}>{title}</H1>
      {lead !== undefined && (
        <Lead className={cn("ui-article-lead-wrap", leadClassName)}>
          {lead}
        </Lead>
      )}
      {meta !== undefined && (
        <div className="mt-5 font-mono text-caption text-ink-3">{meta}</div>
      )}
      {extra !== undefined && (
        <div className={cn("mt-8", extraClassName)}>{extra}</div>
      )}
    </section>
  );
}
