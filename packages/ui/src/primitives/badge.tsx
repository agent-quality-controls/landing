import type { HTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-kicker",
  {
    variants: {
      variant: {
        default: "border-ink-4 bg-fill-muted text-ink",
        outline: "border-line bg-transparent text-ink-2",
        accent: "border-accent bg-accent text-accent-foreground",
        destructive:
          "border-tone-critical-border bg-tone-critical-surface text-tone-critical",
        success: "border-tone-ok-border bg-tone-ok-surface text-tone-ok",
        warning: "border-tone-warn-border bg-tone-warn-surface text-tone-warn",
        info: "border-tone-info-border bg-tone-info-surface text-tone-info",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  ...props
}: BadgeProps): ReactElement {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
