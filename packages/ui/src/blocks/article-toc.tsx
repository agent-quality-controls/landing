import type { ReactElement, ReactNode } from "react";
import { Link } from "../link";

export interface TocItem {
  id: string;
  label: string;
  indent?: boolean | undefined;
  active?: boolean | undefined;
}

interface ArticleTocProps {
  title?: string;
  items: readonly TocItem[];
  extra?: ReactNode;
}

function tocLinkClass(isActive: boolean, isIndent: boolean): string {
  if (isActive) {
    return "-ml-4 border-l-2 border-ink pl-3.5 font-semibold text-ink";
  }
  if (isIndent) {
    return "pl-3.5 text-micro text-ink-3 hover:text-ink";
  }
  return "text-ink-3 hover:text-ink";
}

export function ArticleToc({
  title = "On this page",
  items,
  extra,
}: ArticleTocProps): ReactElement {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8 max-w-56">
        <div className="mb-3.5 ui-mono-label">{title}</div>
        <nav className="flex flex-col gap-0.5 border-l border-line pl-3.5">
          {items.map((item) => {
            const isActive = item.active === true;
            const isIndent = item.indent === true;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`py-1 font-sans text-small leading-snug no-underline ${tocLinkClass(isActive, isIndent)}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {extra !== undefined && <div className="mt-8">{extra}</div>}
      </div>
    </aside>
  );
}
