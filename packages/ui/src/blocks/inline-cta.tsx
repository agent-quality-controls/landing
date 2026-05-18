import type { ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives";
import { Link } from "../link";

export interface InlineCTAProps {
  kicker: string;
  title: string;
  body: string;
  button: string;
  href?: string;
}

export function InlineCTA({
  kicker,
  title,
  body,
  button,
  href,
}: InlineCTAProps): ReactElement {
  const buttonClassName = "relative h-auto px-4 py-3 text-small font-semibold";

  return (
    <aside className="relative my-10 flex min-w-0 flex-col items-start justify-between gap-6 overflow-hidden rounded-card bg-ink px-5 py-7 text-card sm:flex-row sm:items-center sm:px-8">
      <div
        className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full opacity-15"
        style={{
          background: "var(--accent)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative min-w-0 flex-1">
        <div className="mb-2 font-mono text-micro uppercase tracking-kicker text-accent">
          {kicker}
        </div>
        <div className="mb-1.5 text-h3-blog font-semibold tracking-subtle">
          {title}
        </div>
        <div className="max-w-[440px] text-small leading-[1.5] text-card/70">
          {body}
        </div>
      </div>
      {href === undefined ? (
        <Button type="button" variant="accent" className={buttonClassName}>
          {button}
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button asChild variant="accent" className={buttonClassName}>
          <Link href={href}>
            {button}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </aside>
  );
}
