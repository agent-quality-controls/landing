import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({
  children,
  className,
}: PageShellProps): ReactElement {
  return <div className={cn("ui-page-shell", className)}>{children}</div>;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "footer";
  tone?: "default" | "muted";
}

const SECTION_TONE: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  muted: "ui-section-shell-muted",
};

export function Section({
  children,
  className,
  as = "section",
  tone = "default",
}: SectionProps): ReactElement {
  const Comp = as;
  return (
    <Comp className={cn("ui-section-shell", SECTION_TONE[tone], className)}>
      {children}
    </Comp>
  );
}

interface SectionIndexProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionEyebrow({
  index,
  label,
  className,
}: SectionIndexProps): ReactElement {
  return (
    <div className={cn("ui-section-eyebrow", className)}>
      {index} - {label}
    </div>
  );
}

const MONO_LABEL_SIZES: Record<"xs" | "sm", string> = {
  xs: "ui-mono-label",
  sm: "ui-mono-label-sm",
};

interface MonoLabelProps {
  size?: "xs" | "sm";
  children: ReactNode;
  className?: string;
}

export function MonoLabel({
  size = "xs",
  children,
  className,
}: MonoLabelProps): ReactElement {
  return (
    <span className={cn(MONO_LABEL_SIZES[size], className)}>{children}</span>
  );
}

interface MonoMetaProps {
  children: ReactNode;
  className?: string;
}

export function MonoMeta({ children, className }: MonoMetaProps): ReactElement {
  return <span className={cn("ui-mono-meta", className)}>{children}</span>;
}

const HEADING_SIZES: Record<"md" | "lg" | "xl" | "2xl", string> = {
  md: "ui-section-title-md",
  lg: "ui-section-title-lg",
  xl: "ui-section-title-xl",
  "2xl": "ui-section-title-2xl",
};

interface SectionHeadingProps {
  size?: "md" | "lg" | "xl" | "2xl";
  children: ReactNode;
  className?: string;
}

export function SectionHeading({
  size = "lg",
  children,
  className,
}: SectionHeadingProps): ReactElement {
  return <h2 className={cn(HEADING_SIZES[size], className)}>{children}</h2>;
}
