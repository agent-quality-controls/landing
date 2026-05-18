import type {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  ReactElement,
} from "react";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref): ReactElement => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-small", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b [&_tr]:border-line", className)}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-line bg-fill-muted font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-line transition-colors hover:bg-fill-muted/60 data-[state=selected]:bg-fill-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-3 text-left align-middle text-micro font-semibold uppercase tracking-kicker text-ink-3 [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <td
      ref={ref}
      className={cn(
        "p-3 align-middle text-ink [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(
  ({ className, ...props }, ref): ReactElement => (
    <caption
      ref={ref}
      className={cn("mt-4 text-small text-ink-3", className)}
      {...props}
    />
  ),
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
