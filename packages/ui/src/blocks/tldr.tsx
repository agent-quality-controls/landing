import type { ReactElement, ReactNode } from "react";

interface TLDRItem {
  lead: ReactNode;
  body?: ReactNode;
}

export function TLDR({ items }: { items: TLDRItem[] }): ReactElement {
  return (
    <section id="tldr" className="my-9">
      <h2 className="mb-4 font-mono text-lead font-semibold uppercase tracking-kicker text-ink">
        TL;DR
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3.5">
            <span className="min-w-[18px] pt-1.5 font-mono text-caption text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="text-body text-ink leading-[1.55]">
              <strong className="font-semibold">{it.lead}</strong>
              {it.body !== undefined && (
                <span className="text-ink-2"> - {it.body}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
