import type { ReactElement, ReactNode } from "react";

interface DefinitionProps {
  term: string;
  children: ReactNode;
}

export function Definition({ term, children }: DefinitionProps): ReactElement {
  return (
    <div className="my-6 rounded-md bg-fill-muted px-5 py-4">
      <div className="font-mono text-micro uppercase tracking-kicker text-ink-3">
        Definition
      </div>
      <div className="mt-1.5">
        <strong className="text-body font-semibold text-ink">{term}</strong>
        <span className="text-body text-ink-2"> - {children}</span>
      </div>
    </div>
  );
}
