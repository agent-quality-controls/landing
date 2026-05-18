import type { ReactElement } from "react";
import { Link } from "../link";

export interface JumpItem {
  id: string;
  label: string;
  n?: string;
}

interface JumpRailProps {
  title?: string;
  items: readonly JumpItem[];
  columns?: 1 | 2;
}

export function JumpRail({
  title = "Jump to",
  items,
  columns = 2,
}: JumpRailProps): ReactElement {
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <div className="my-8 rounded-card border border-line bg-card px-6 py-5">
      <div className="mb-3 ui-mono-label">{title}</div>
      <div className={`grid grid-cols-1 gap-x-5 gap-y-1.5 ${gridCols}`}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className="flex gap-2.5 py-1 text-small text-ink-2 no-underline hover:text-ink"
          >
            {item.n !== undefined && (
              <span className="min-w-5 font-mono text-micro text-ink-4">
                {item.n}
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
