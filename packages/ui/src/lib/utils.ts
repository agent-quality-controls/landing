import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "body",
        "body-sm",
        "caption",
        "card-title",
        "code",
        "display-sm",
        "display-md",
        "display-lg",
        "display-xl",
        "display-2xl",
        "h1-blog",
        "h2-blog",
        "h3-blog",
        "h4-blog",
        "hero",
        "lead",
        "metric-lg",
        "metric-xl",
        "metric-2xl",
        "micro",
        "page-title",
        "page-subtitle",
        "section-md",
        "section-lg",
        "section-xl",
        "section-2xl",
        "small",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
