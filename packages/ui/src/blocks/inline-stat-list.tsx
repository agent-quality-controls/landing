import type { ReactElement } from "react";

export interface InlineStatListItem {
  readonly label: string;
  readonly source: string;
  readonly value: string;
}

interface InlineStatListProps {
  readonly items: readonly InlineStatListItem[];
}

export function InlineStatList({ items }: InlineStatListProps): ReactElement {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-card">
      {items.map((item, index) => (
        <div
          key={item.value + item.label}
          className="grid gap-2 px-4 py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)_11rem] sm:items-center sm:gap-4 sm:px-5"
          style={{
            borderTop: index === 0 ? undefined : "1px solid var(--line)",
          }}
        >
          <div className="font-mono text-h3-blog font-medium tracking-tight-1 text-ink">
            {item.value}
          </div>
          <div className="text-small leading-[1.5] text-ink-2">
            {item.label}
          </div>
          <div className="font-mono text-micro text-ink-4 sm:text-right">
            {item.source}
          </div>
        </div>
      ))}
    </div>
  );
}
