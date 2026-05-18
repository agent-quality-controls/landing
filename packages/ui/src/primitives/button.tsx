import type { ButtonHTMLAttributes, ReactElement } from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-mono font-semibold tracking-body transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-accent bg-accent [color:var(--accent-foreground)] hover:bg-accent",
        accent:
          "border-accent bg-accent [color:var(--accent-foreground)] hover:bg-accent",
        outline:
          "border-ink-4 bg-transparent [color:var(--ink)] hover:border-ink-3 hover:bg-fill-muted",
        ghost: "bg-transparent [color:var(--ink-2)] hover:text-ink",
        link: "bg-transparent [color:var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-body-sm",
        sm: "h-8 px-3 text-caption",
        lg: "h-11 px-6 text-body",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, ...props },
    ref,
  ): ReactElement => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
