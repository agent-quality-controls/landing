import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

export interface ActivityItem {
  id: string;
  time: string;
  actor?: string;
  title: ReactNode;
  icon?: ReactNode;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  className?: string;
}

export function ActivityFeed({
  items,
  title,
  className,
}: ActivityFeedProps): ReactElement {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-card",
        className,
      )}
    >
      {title !== undefined && (
        <div className="border-b border-line px-5 py-3">
          <h3 className="m-0 text-sm font-semibold">{title}</h3>
        </div>
      )}
      <ul className="m-0 list-none p-0">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className={cn(
              "flex items-start gap-3 px-5 py-3",
              idx < items.length - 1 ? "border-b border-line" : "",
            )}
          >
            {item.icon !== undefined && (
              <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fill-muted text-ink-2">
                {item.icon}
              </div>
            )}
            <div className="flex-1">
              <div className="text-[13px] text-ink">{item.title}</div>
              <div className="mt-0.5 font-mono text-[11px] text-ink-3">
                {item.actor === undefined ? "" : `${item.actor} · `}
                {item.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
