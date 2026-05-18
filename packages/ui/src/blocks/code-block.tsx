import type { ReactElement, ReactNode } from "react";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  lang?: string;
  filename?: string;
  value: string;
  children?: ReactNode;
}

export function CodeBlock({
  lang = "xml",
  filename,
  value,
  children,
}: CodeBlockProps): ReactElement {
  return (
    <div className="my-6 max-w-full overflow-hidden rounded-md border border-line bg-surface-code">
      <div className="flex items-center justify-between border-b border-surface-code-border bg-[#111] px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-micro uppercase text-surface-code-muted"
            style={{ letterSpacing: "var(--tracking-kicker)" }}
          >
            {lang}
          </span>
          {filename !== undefined && (
            <span className="font-mono text-caption text-surface-code-foreground">
              {filename}
            </span>
          )}
        </div>
        <CopyButton value={value} />
      </div>
      <pre className="max-w-full overflow-auto px-4 py-4 font-mono text-code text-surface-code-foreground leading-[1.65] sm:text-caption">
        {children ?? value}
      </pre>
    </div>
  );
}
