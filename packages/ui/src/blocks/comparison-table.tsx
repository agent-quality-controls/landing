import type { ReactElement } from "react";

export interface ComparisonTableRow {
  readonly dimension: string;
  readonly primary: string;
  readonly secondary: string;
}

interface ComparisonTableProps {
  readonly primaryLabel: string;
  readonly rows: readonly ComparisonTableRow[];
  readonly secondaryLabel: string;
}

export function ComparisonTable({
  primaryLabel,
  rows,
  secondaryLabel,
}: ComparisonTableProps): ReactElement {
  return (
    <div className="my-8 max-w-full overflow-hidden rounded-card border border-line bg-card">
      <div className="grid sm:hidden">
        {rows.map((row) => (
          <article
            key={row.dimension}
            className="border-b border-line p-4 last:border-b-0"
          >
            <h3 className="mb-3 text-small font-semibold text-ink">
              {row.dimension}
            </h3>
            <div className="grid gap-3">
              <div>
                <div className="mb-1 inline-block rounded-sm bg-ink px-2 py-1 font-mono text-micro tracking-subtle text-accent">
                  {primaryLabel}
                </div>
                <div className="text-small leading-[1.5] text-ink">
                  {row.primary}
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-micro uppercase tracking-kicker text-ink-3">
                  {secondaryLabel}
                </div>
                <div className="text-small leading-[1.5] text-ink-2">
                  {row.secondary}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <table className="hidden w-full border-collapse text-small sm:table">
        <thead>
          <tr className="border-b border-line bg-fill-muted">
            <th className="px-4 py-3.5 text-left font-mono text-micro uppercase tracking-kicker text-ink-3">
              Dimension
            </th>
            <th className="bg-ink px-4 py-3.5 text-left font-mono text-caption tracking-subtle text-accent">
              {primaryLabel}
            </th>
            <th className="px-4 py-3.5 text-left text-caption font-semibold text-ink">
              {secondaryLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.dimension}
              className="border-b border-line last:border-b-0"
              style={{
                background:
                  index % 2 === 0 ? "var(--card)" : "var(--background)",
              }}
            >
              <td className="px-4 py-3.5 font-medium text-ink-2">
                {row.dimension}
              </td>
              <td className="px-4 py-3.5 text-ink">{row.primary}</td>
              <td className="px-4 py-3.5 text-ink-2">{row.secondary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
