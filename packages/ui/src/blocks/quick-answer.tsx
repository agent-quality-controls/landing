import type { ReactElement, ReactNode } from "react";

export function QuickAnswer({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <aside
      id="quick-answer"
      className="my-8 rounded-sm border border-line border-l-[3px] border-l-ink bg-card px-6 py-5"
    >
      <div className="mb-2.5 flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-kicker text-ink-2">
        <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
        Quick answer
      </div>
      <div className="text-body text-ink leading-[1.55]">{children}</div>
    </aside>
  );
}
