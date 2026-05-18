import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  ReactElement,
} from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

const Card = forwardRef<ComponentRef<"div">, CardProps>(
  ({ className, asChild = false, ...props }, ref): ReactElement => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-card border border-line bg-card text-card-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref): ReactElement => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref): ReactElement => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
