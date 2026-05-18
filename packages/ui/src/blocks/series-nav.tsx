import type { ReactElement } from "react";
import { Card } from "../primitives";
import { Link } from "../link";
import { cn } from "../lib/utils";

export interface SeriesNavItem {
  label: string;
  href?: string;
}

export interface SeriesNavProps {
  series: string;
  prev?: SeriesNavItem;
  next?: SeriesNavItem;
}

function SeriesNavCard({
  item,
  direction,
}: {
  item: SeriesNavItem;
  direction: "prev" | "next";
}): ReactElement {
  const isNext = direction === "next";
  const content = (
    <>
      <div className="font-mono text-micro tracking-kicker text-ink-3">
        {isNext ? "Next →" : "← Previous"}
      </div>
      <div className="mt-1.5 text-small font-medium leading-[1.35]">
        {item.label}
      </div>
    </>
  );

  if (item.href === undefined) {
    return (
      <Card
        className={cn(
          "min-w-0 flex-1 px-4 py-3 text-ink",
          isNext ? "text-right" : undefined,
        )}
      >
        {content}
      </Card>
    );
  }

  return (
    <Card
      asChild
      className={cn(
        "min-w-0 flex-1 px-4 py-3 text-ink",
        isNext ? "text-right" : undefined,
      )}
    >
      <Link href={item.href}>{content}</Link>
    </Card>
  );
}

export function SeriesNav({
  series,
  prev,
  next,
}: SeriesNavProps): ReactElement {
  return (
    <nav className="mt-12 border-y border-line py-5">
      <div className="mb-3.5 font-mono text-micro uppercase tracking-kicker text-ink-3">
        Part of the {series} series
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        {prev === undefined ? null : (
          <SeriesNavCard item={prev} direction="prev" />
        )}
        {next === undefined ? null : (
          <SeriesNavCard item={next} direction="next" />
        )}
      </div>
    </nav>
  );
}
