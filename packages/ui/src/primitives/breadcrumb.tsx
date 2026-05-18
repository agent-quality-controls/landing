import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

const Breadcrumb = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref): ReactElement => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("w-full", className)}
      {...props}
    />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<
  HTMLOListElement,
  HTMLAttributes<HTMLOListElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 text-[12px] text-ink-3",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref): ReactElement => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = forwardRef<ComponentRef<"a">, BreadcrumbLinkProps>(
  ({ asChild = false, className, ...props }, ref): ReactElement => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        className={cn("transition-colors hover:text-ink", className)}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-ink-2", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

function BreadcrumbSeparator({
  children = "/",
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <span aria-hidden="true" className={cn("text-ink-4", className)}>
      {children}
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
