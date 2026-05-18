import type { ReactElement, ReactNode } from "react";

export interface BarChartItem {
  readonly color?: string;
  readonly label: string;
  readonly pct: number;
}

interface ChartSlotProps {
  readonly caption?: string;
  readonly children: ReactNode;
  readonly title: string;
}

interface BarChartProps {
  readonly data: readonly BarChartItem[];
}

export function ChartSlot({
  caption,
  children,
  title,
}: ChartSlotProps): ReactElement {
  return (
    <figure className="my-2 overflow-hidden rounded-card border border-line bg-card">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line bg-fill-muted px-5 py-3.5">
        <div className="text-small font-semibold text-ink">{title}</div>
        {caption !== undefined && (
          <div className="font-mono text-micro tracking-subtle text-ink-3">
            {caption}
          </div>
        )}
      </figcaption>
      <div className="p-5">{children}</div>
    </figure>
  );
}

export function BarChart({ data }: BarChartProps): ReactElement {
  const max = Math.max(...data.map((item) => item.pct), 1);

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div
          key={item.label}
          className="grid gap-2 sm:grid-cols-[12rem_minmax(0,1fr)_3.75rem] sm:items-center sm:gap-3"
        >
          <div className="text-caption text-ink-2">{item.label}</div>
          <div className="h-5 overflow-hidden rounded-sm bg-fill-muted">
            <div
              className="h-full rounded-sm bg-ink"
              style={{
                background: item.color,
                width: `${String((item.pct / max) * 100)}%`,
              }}
            />
          </div>
          <div className="font-mono text-caption font-semibold text-ink sm:text-right">
            {item.pct}%
          </div>
        </div>
      ))}
    </div>
  );
}
