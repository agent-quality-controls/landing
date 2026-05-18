import type { ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives/button";
import { cn } from "../lib/utils";

interface UrlInputProps {
  theme?: "light" | "dark";
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

const SHELL_THEME: Record<NonNullable<UrlInputProps["theme"]>, string> = {
  light: "ui-url-input-light",
  dark: "ui-url-input-dark",
};

const VALUE_THEME: Record<NonNullable<UrlInputProps["theme"]>, string> = {
  light: "ui-url-input-value-light",
  dark: "ui-url-input-value-dark",
};

export function UrlInput({
  theme = "light",
  placeholder = "your-site.com",
  buttonLabel = "Run free audit",
  className,
}: UrlInputProps): ReactElement {
  return (
    <div className={cn("ui-url-input-shell", SHELL_THEME[theme], className)}>
      <div className={cn("ui-url-input-value", VALUE_THEME[theme])}>
        <span className="ui-url-input-muted">https://</span>
        <span className="truncate">{placeholder}</span>
        <span
          className={cn(
            "ui-text-caret",
            theme === "dark" ? "bg-card" : "bg-ink",
          )}
        />
      </div>
      <Button type="button" variant="accent" size="lg">
        {buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
