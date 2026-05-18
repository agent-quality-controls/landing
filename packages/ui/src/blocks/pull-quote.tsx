import type { ReactElement, ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

export function PullQuote({
  children,
  attribution,
}: PullQuoteProps): ReactElement {
  return (
    <figure className="my-10 border-l-[3px] border-l-accent pl-6">
      <blockquote className="font-serif text-[1.5rem] leading-[1.35] text-ink tracking-[var(--tracking-tight-1)]">
        {children}
      </blockquote>
      {attribution !== undefined && (
        <figcaption className="mt-3 font-mono text-caption text-ink-3">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
