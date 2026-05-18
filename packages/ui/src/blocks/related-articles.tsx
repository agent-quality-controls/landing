import type { ReactElement } from "react";
import { ArticleCard, type ArticleCardProps } from "./article-card";
import { H2 } from "./typography";

export interface RelatedArticlesProps {
  title?: string;
  items: ArticleCardProps[];
  className?: string;
}

export function RelatedArticles({
  title = "Related reading",
  items,
  className,
}: RelatedArticlesProps): ReactElement {
  return (
    <section className={className ?? "mt-14"}>
      <H2 className="mb-5">{title}</H2>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {items.map((item, index) => (
          <ArticleCard key={item.title + String(index)} {...item} />
        ))}
      </div>
    </section>
  );
}
