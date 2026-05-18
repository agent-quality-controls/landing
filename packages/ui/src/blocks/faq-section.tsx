import type { ReactElement } from "react";
import { FaqList, type FaqItem } from "./faq-list";
import { H2 } from "./typography";

export interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  className?: string;
}

export function FaqSection({
  items,
  title = "FAQ",
  className,
}: FaqSectionProps): ReactElement {
  return (
    <section className={className ?? "mt-12"}>
      <H2 className="mb-6 mt-0">{title}</H2>
      <FaqList items={items} variant="simple" />
    </section>
  );
}
