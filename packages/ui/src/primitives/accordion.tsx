"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactElement,
} from "react";
import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
  ({ className, ...props }, ref): ReactElement => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b border-line", className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  ({ className, children, ...props }, ref): ReactElement => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-body-sm font-medium text-ink transition-all [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-ink-3 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(
  ({ className, children, ...props }, ref): ReactElement => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-body-sm text-ink-2 data-[state=closed]:animate-out data-[state=open]:animate-in"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
