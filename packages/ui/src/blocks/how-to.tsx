import type { ReactElement, ReactNode } from "react";
import { H2 } from "./typography";
import { Step } from "./step";

export interface HowToStep {
  readonly name: string;
  readonly text: ReactNode;
}

export interface HowToProps {
  readonly title?: string;
  readonly steps: readonly HowToStep[];
}

export function HowTo({ title, steps }: HowToProps): ReactElement {
  return (
    <section className="my-12">
      {title === undefined ? null : <H2 className="mb-6 mt-0">{title}</H2>}
      <ol className="grid gap-0" aria-label={title}>
        {steps.map((step, index) => (
          <li key={step.name}>
            <Step n={index + 1} title={step.name}>
              {step.text}
            </Step>
          </li>
        ))}
      </ol>
    </section>
  );
}
