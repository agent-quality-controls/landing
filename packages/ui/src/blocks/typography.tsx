import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/utils";

interface TypoProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function H1({ children, className, id }: TypoProps): ReactElement {
  return (
    <h1
      id={id}
      className={cn(
        "text-section-md font-medium text-ink sm:text-h1-blog",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, id }: TypoProps): ReactElement {
  return (
    <h2
      id={id}
      className={cn(
        "mt-12 scroll-mt-24 text-h2-blog font-semibold text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, id }: TypoProps): ReactElement {
  return (
    <h3
      id={id}
      className={cn(
        "mt-8 scroll-mt-24 text-h3-blog font-semibold text-ink",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, id }: TypoProps): ReactElement {
  return (
    <h4
      id={id}
      className={cn(
        "mt-6 scroll-mt-24 text-h4-blog font-semibold text-ink",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function Lead({ children, className }: TypoProps): ReactElement {
  return (
    <p className={cn("mt-4 text-lead text-ink-2", className)}>{children}</p>
  );
}

export function P({ children, className }: TypoProps): ReactElement {
  return (
    <p className={cn("mt-4 text-body text-ink-2", className)}>{children}</p>
  );
}

interface LProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function L({ children, href = "#", className }: LProps): ReactElement {
  return (
    <a
      href={href}
      className={cn(
        "text-ink underline decoration-accent decoration-2 underline-offset-[3px] hover:decoration-ink",
        className,
      )}
    >
      {children}
    </a>
  );
}
