import type { ReactElement, ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../primitives";
import { Link } from "../link";
import { cn } from "../lib/utils";

export interface BreadcrumbItemDef {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  trail: BreadcrumbItemDef[];
  className?: string;
  listClassName?: string;
  separator?: ReactNode;
}

export function Breadcrumbs({
  trail,
  className,
  listClassName,
  separator = "/",
}: BreadcrumbsProps): ReactElement {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={cn("font-mono", listClassName)}>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <BreadcrumbItem key={item.href ?? `breadcrumb-${String(index)}`}>
              {isLast || item.href === undefined ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
              {!isLast && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
