import type { ReactElement, ReactNode } from "react";

interface StepProps {
  n: number;
  title: string;
  children: ReactNode;
}

export function Step({ n, title, children }: StepProps): ReactElement {
  return (
    <div className="flex min-w-0 gap-4 pt-2 sm:gap-5">
      <div className="shrink-0">
        <div className="grid h-11 w-11 place-items-center rounded-md bg-ink font-mono text-body-sm font-semibold text-accent">
          {String(n).padStart(2, "0")}
        </div>
      </div>
      <div className="min-w-0 flex-1 border-b border-line pb-8">
        <h3 className="mt-1 text-h3-blog font-semibold text-ink">{title}</h3>
        <div className="mt-2.5 text-body leading-[1.65] text-ink-2">
          {children}
        </div>
      </div>
    </div>
  );
}
