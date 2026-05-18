import type { ReactElement, ReactNode } from "react";

interface StatSectionProps {
  readonly children: ReactNode;
  readonly intro?: string;
  readonly num: string;
  readonly title: string;
}

export function StatSection({
  children,
  intro,
  num,
  title,
}: StatSectionProps): ReactElement {
  return (
    <section className="mt-16">
      <div className="mb-3 flex items-baseline gap-3.5">
        <div className="font-mono text-display-sm font-normal leading-none tracking-tight-1 text-ink-3">
          {num}
        </div>
        <h2 className="m-0 text-h2-blog font-semibold text-ink">{title}</h2>
      </div>
      {intro !== undefined && (
        <p className="mb-7 ml-0 text-body text-ink-2 sm:ml-16">{intro}</p>
      )}
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
    </section>
  );
}
