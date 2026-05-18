import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps): ReactElement {
  return <div className="ui-page-shell">{children}</div>;
}

interface SectionProps {
  children: ReactNode;
  styleName?: string;
  as?: "section" | "footer";
  id?: string;
}

export function Section({
  children,
  id,
  styleName,
  as = "section",
}: SectionProps): ReactElement {
  const Comp = as;
  return (
    <Comp
      id={id}
      className={cn("ui-section-shell", "border-b border-line", styleName)}
    >
      {children}
    </Comp>
  );
}

interface SectionIndexProps {
  label: string;
}

export function SectionEyebrow({ label }: SectionIndexProps): ReactElement {
  return <div className="ui-section-eyebrow">{label}</div>;
}

const MONO_LABEL_SIZES: Record<"xs" | "sm", string> = {
  xs: "ui-mono-label",
  sm: "ui-mono-label-sm",
};

interface MonoLabelProps {
  size?: "xs" | "sm";
  children: ReactNode;
  styleName?: string;
}

export function MonoLabel({
  size = "xs",
  children,
  styleName,
}: MonoLabelProps): ReactElement {
  return (
    <span className={cn(MONO_LABEL_SIZES[size], styleName)}>{children}</span>
  );
}

interface MonoMetaProps {
  children: ReactNode;
  styleName?: string;
}

export function MonoMeta({ children, styleName }: MonoMetaProps): ReactElement {
  return <span className={cn("ui-mono-meta", styleName)}>{children}</span>;
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
  styleName?: string;
}

export function SectionHeading({
  size = "lg",
  children,
  styleName,
}: SectionHeadingProps): ReactElement {
  return <h2 className={cn(HEADING_SIZES[size], styleName)}>{children}</h2>;
}

interface HeadingCopyProps {
  heading: {
    title: string;
    mutedTitle?: string | undefined;
  };
}

export function HeadingCopy({ heading }: HeadingCopyProps): ReactElement {
  return (
    <>
      {heading.title}
      {heading.mutedTitle === undefined ? null : (
        <>
          {" "}
          <span className="text-ink-3">{heading.mutedTitle}</span>
        </>
      )}
    </>
  );
}
