import type { ReactElement, ReactNode } from "react";
import { Info, TriangleAlert, Check, Sparkles } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const calloutVariants = cva("my-6 flex gap-3 rounded-md border px-4 py-3.5", {
  variants: {
    kind: {
      info: "ui-tone-info",
      warn: "ui-tone-warn",
      success: "ui-tone-ok",
      tip: "bg-fill-muted border-line text-ink-2",
    },
  },
  defaultVariants: { kind: "info" },
});

const ICONS: Record<"info" | "warn" | "success" | "tip", typeof Info> = {
  info: Info,
  warn: TriangleAlert,
  success: Check,
  tip: Sparkles,
};

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({
  kind = "info",
  title,
  children,
  className,
}: CalloutProps): ReactElement {
  const kindKey = kind ?? "info";
  const IconComp = ICONS[kindKey];
  return (
    <aside className={cn(calloutVariants({ kind }), className)}>
      <IconComp className="h-4 w-4 shrink-0" />
      <div>
        {title !== undefined && (
          <div className="mb-1 text-small font-semibold text-ink">{title}</div>
        )}
        <div className="text-body-sm text-ink-2">{children}</div>
      </div>
    </aside>
  );
}
