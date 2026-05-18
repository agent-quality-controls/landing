import type { ReactElement } from "react";
import { cn } from "../lib/utils";
import { MonoLabel } from "./section-shell";

export interface StatStripItem {
  value: string;
  label: string;
}

interface StatStripProps {
  items: StatStripItem[];
  className?: string;
}

export function StatStrip({ items, className }: StatStripProps): ReactElement {
  return (
    <div
      className={cn(
        "grid grid-cols-2 border-l border-t border-line lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="border-b border-r border-line px-6 py-6"
        >
          <div className="ui-metric-2xl">{item.value}</div>
          <div className="mt-2.5">
            <MonoLabel>{item.label}</MonoLabel>
          </div>
        </div>
      ))}
    </div>
  );
}
