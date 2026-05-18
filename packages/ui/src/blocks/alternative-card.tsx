import type { ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives";
import { Link } from "../link";

export interface AlternativeCardProps {
  readonly bestFor: string;
  readonly desc: string;
  readonly href?: string;
  readonly n: number;
  readonly name: string;
  readonly price: string;
  readonly score: string;
  readonly tag: string;
  readonly vsIncumbent: string;
}

export function AlternativeCard({
  bestFor,
  desc,
  href,
  n,
  name,
  price,
  score,
  tag,
  vsIncumbent,
}: AlternativeCardProps): ReactElement {
  const button = (
    <>
      <span className="truncate">Visit {name}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
    </>
  );

  return (
    <article className="grid gap-6 rounded-card border border-line bg-card p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_11.25rem]">
      <div className="min-w-0">
        <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
          <div className="font-mono text-caption text-ink-3">
            #{String(n).padStart(2, "0")}
          </div>
          <h3 className="m-0 text-h2-blog font-semibold tracking-tight-1 text-ink">
            {name}
          </h3>
          <span className="rounded-sm bg-fill-muted px-2 py-1 font-mono text-micro uppercase tracking-subtle text-ink-2">
            {tag}
          </span>
        </div>
        <p className="m-0 mb-4 text-small leading-[1.6] text-ink-2">{desc}</p>

        <div className="mb-3.5 rounded-md border-l-[3px] border-l-accent bg-fill-muted px-4 py-3">
          <div className="mb-1 font-mono text-micro uppercase tracking-kicker text-ink-3">
            Why it wins here
          </div>
          <div className="text-small leading-[1.5] text-ink">{vsIncumbent}</div>
        </div>

        <div className="text-caption text-ink-2">
          <span className="font-mono text-micro uppercase text-ink-3">
            Best for -{" "}
          </span>
          {bestFor}
        </div>
      </div>

      <aside className="flex min-w-0 flex-col justify-between gap-3 border-t border-line pt-5 lg:border-t-0 lg:pt-0">
        <div>
          <div className="flex items-baseline gap-1">
            <div className="text-section-md font-medium leading-none tracking-tight-1 text-ink">
              {score}
            </div>
            <div className="font-mono text-caption text-ink-3">/10</div>
          </div>
          <div className="mt-1 font-mono text-micro uppercase tracking-kicker text-ink-3">
            Our score
          </div>
          <div className="mt-3.5 border-t border-line pt-3.5">
            <div className="mb-1 font-mono text-micro uppercase tracking-kicker text-ink-3">
              Price
            </div>
            <div className="text-small font-medium text-ink">{price}</div>
          </div>
        </div>
        {href === undefined ? (
          <Button
            type="button"
            variant="outline"
            className="h-auto w-full min-w-0 justify-center px-3 py-2 text-caption"
          >
            {button}
          </Button>
        ) : (
          <Button
            asChild
            variant="outline"
            className="h-auto w-full min-w-0 justify-center px-3 py-2 text-caption"
          >
            <Link href={href}>{button}</Link>
          </Button>
        )}
      </aside>
    </article>
  );
}
