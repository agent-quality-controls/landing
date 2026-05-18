import type { ReactElement } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "../link";
import { Button } from "../primitives";

export interface EndCTAProps {
  title: string;
  body: string;
  primary: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
  kicker?: string;
}

export function EndCTA({
  title,
  body,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
  kicker = "Audit your site",
}: EndCTAProps): ReactElement {
  return (
    <section className="relative mt-14 overflow-hidden rounded-card bg-ink px-10 py-14 text-center text-card">
      <div
        className="pointer-events-none absolute -top-14 left-4 right-4 h-52"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[560px]">
        <div className="mb-3.5 font-mono text-micro uppercase tracking-kicker text-accent">
          {kicker}
        </div>
        <h2 className="mb-4 text-section-md font-medium leading-[1.1] tracking-tight-1">
          {title}
        </h2>
        <p className="mb-7 text-body-sm leading-[1.55] text-ink-4">{body}</p>
        <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          {primaryHref === undefined ? (
            <Button
              type="button"
              variant="accent"
              className="h-auto px-5 py-3 text-body-sm font-semibold"
            >
              {primary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              asChild
              variant="accent"
              className="h-auto px-5 py-3 text-body-sm font-semibold"
            >
              <Link href={primaryHref}>
                {primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {secondary !== undefined &&
            (secondaryHref === undefined ? (
              <Button
                type="button"
                variant="outline"
                className="h-auto border-surface-code-border bg-transparent px-5 py-3 text-body-sm font-medium text-card hover:bg-card/10 hover:text-card"
              >
                <Terminal className="h-4 w-4" />
                {secondary}
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="h-auto border-surface-code-border bg-transparent px-5 py-3 text-body-sm font-medium text-card hover:bg-card/10 hover:text-card"
              >
                <Link href={secondaryHref}>
                  <Terminal className="h-4 w-4" />
                  {secondary}
                </Link>
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
}
