import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Link } from "../link";
import { Card } from "../primitives";

export const articleCardHeadingLevels = {
  nested: "h3",
  section: "h2",
} as const;

export interface ArticleCardProps {
  n?: number;
  title: string;
  desc: string;
  date: string;
  category?: string;
  size?: "md" | "lg";
  href?: string;
  cover?: ReactNode;
  className?: string;
  headingLevel?: (typeof articleCardHeadingLevels)[keyof typeof articleCardHeadingLevels];
}

export function ArticleCard({
  n,
  title,
  desc,
  date,
  category,
  size = "md",
  href,
  cover,
  className,
  headingLevel = articleCardHeadingLevels.nested,
}: ArticleCardProps): ReactElement {
  const isLarge = size === "lg";
  const Heading = headingLevel;
  const shellClassName = cn(
    "flex flex-col gap-3.5 p-3.5 text-ink",
    href === undefined ? undefined : "transition-colors hover:border-ink/10",
    className,
  );
  const body = (
    <>
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-md bg-fill-muted"
        style={
          cover === undefined
            ? {
                background:
                  "linear-gradient(135deg, var(--fill-muted), var(--line-2))",
              }
            : undefined
        }
      >
        {cover}
        {n !== undefined && (
          <div className="absolute left-2.5 top-2.5 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-micro font-semibold text-card">
            {String(n).padStart(2, "0")}
          </div>
        )}
        {category !== undefined && (
          <div className="absolute bottom-2.5 left-2.5 rounded-sm bg-accent px-1.5 py-0.5 font-mono text-micro font-medium uppercase tracking-kicker text-ink">
            {category}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 px-1 pb-2">
        <Heading
          className={cn(
            "font-semibold leading-[1.3] text-ink",
            isLarge ? "text-h3-blog" : "text-body-sm",
          )}
        >
          {title}
        </Heading>
        <p className="text-small leading-[1.5] text-ink-2">{desc}</p>
        <div className="mt-1 font-mono text-micro text-ink-3">
          Last updated {date}
        </div>
      </div>
    </>
  );

  if (href === undefined) {
    return <Card className={shellClassName}>{body}</Card>;
  }

  return (
    <Card asChild className={shellClassName}>
      <Link href={href}>{body}</Link>
    </Card>
  );
}
