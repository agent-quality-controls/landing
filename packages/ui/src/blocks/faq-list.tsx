import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

export interface FaqItem {
  q: ReactNode;
  a: ReactNode;
}

export interface FaqListProps {
  items: FaqItem[];
  variant?: "simple" | "qa";
  className?: string;
  itemClassName?: string;
}

export function FaqList({
  items,
  variant = "simple",
  className,
  itemClassName,
}: FaqListProps): ReactElement {
  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <div
          key={`faq-${String(index)}`}
          className={cn(
            variant === "qa"
              ? "border-b border-line py-6"
              : "border-t border-line py-5",
            itemClassName,
          )}
        >
          {variant === "qa" ? (
            <>
              <div className="flex gap-5">
                <span className="font-mono text-micro text-ink-3">Q.</span>
                <div className="text-body-sm font-medium tracking-subtle text-ink">
                  {item.q}
                </div>
              </div>
              <div className="mt-2.5 flex gap-5 text-ink-2">
                <span className="font-mono text-micro text-ink-3">A.</span>
                <div className="max-w-[620px] text-small leading-[1.6]">
                  {item.a}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-2.5 text-h4-blog font-semibold leading-[1.35] text-ink">
                {item.q}
              </h3>
              <div className="max-w-[620px] text-body-sm leading-[1.6] text-ink-2">
                {item.a}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
