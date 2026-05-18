import type { ReactElement } from "react";
import { Badge, Button, Card, CardContent } from "@project/ui";
import { ExternalLink } from "lucide-react";
import type { HomepageContent, ToolContent } from "@/content-schema/schemas";
import { cn } from "@/lib/utils";
import {
  ArrowSuffix,
  AccentMark,
  LandingWrap,
  StatusPill,
} from "./homepage-v2-shell";
import {
  HeadingCopy,
  MonoLabel,
  Section,
  SectionEyebrow,
  SectionHeading,
} from "./section";

export function HomeHero({
  hero,
}: {
  hero: HomepageContent["hero"];
}): ReactElement {
  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="ui-accent-dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_80%)]" />
      <LandingWrap styleName="relative z-1">
        <StatusPill>{hero.badge}</StatusPill>
        <h1 className="mt-8 max-w-[20ch] font-serif text-display-lg uppercase leading-[0.95] text-ink sm:text-display-xl lg:text-display-2xl">
          {hero.title} <AccentMark>{hero.accent}</AccentMark>.
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead text-ink-2">{hero.body}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowSuffix />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
              <ArrowSuffix />
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={hero.githubCta.href} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              {hero.githubCta.label}
            </a>
          </Button>
        </div>

        <div className="mt-14 grid max-w-5xl border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {hero.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-r border-line px-4 py-4"
            >
              <div className="ui-metric-xl text-ink">{metric.value}</div>
              <div className="mt-1.5">
                <MonoLabel>{metric.label}</MonoLabel>
              </div>
            </div>
          ))}
        </div>
      </LandingWrap>
    </section>
  );
}

export function ProblemSection({
  content,
}: {
  content: HomepageContent["problem"];
}): ReactElement {
  return (
    <Section>
      <LandingWrap>
        <SectionEyebrow label={content.eyebrow} />
        <SectionHeading styleName="mt-2 max-w-[22ch]">
          <HeadingCopy heading={content} />
        </SectionHeading>
        <div className="mt-10 grid border-l border-t border-line lg:grid-cols-3">
          {content.points.map((point) => (
            <div
              key={point.index}
              className="min-h-48 border-b border-r border-line px-7 py-7"
            >
              <MonoLabel styleName="text-accent">{point.index}</MonoLabel>
              <h3 className="mt-4 text-card-title font-medium text-ink">
                {point.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-body-sm text-ink-2">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </LandingWrap>
    </Section>
  );
}

export function ApproachSection({
  content,
}: {
  content: HomepageContent["approach"];
}): ReactElement {
  return (
    <Section styleName="bg-card">
      <LandingWrap>
        <SectionEyebrow label={content.eyebrow} />
        <SectionHeading styleName="mt-2 max-w-[26ch]">
          <HeadingCopy heading={content} />
        </SectionHeading>
        {content.body === undefined ? null : (
          <p className="mt-4 max-w-[60ch] text-body text-ink-2">
            {content.body}
          </p>
        )}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {content.proofs.map((proof, index) => (
            <Card key={proof.label} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">0{index + 1}</Badge>
                  <h3 className="text-body-sm font-semibold text-ink">
                    {proof.label}
                  </h3>
                </div>
                <p className="mt-4 text-body-sm text-ink-2">{proof.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </LandingWrap>
    </Section>
  );
}

export function LoopSection({
  content,
}: {
  content: HomepageContent["loop"];
}): ReactElement {
  return (
    <Section>
      <LandingWrap>
        <SectionEyebrow label={content.eyebrow} />
        <SectionHeading styleName="mt-2 max-w-[20ch]">
          <HeadingCopy heading={content} />
        </SectionHeading>
        {content.body === undefined ? null : (
          <p className="mt-4 max-w-[60ch] text-body text-ink-2">
            {content.body}
          </p>
        )}
        <div className="mt-12 grid overflow-hidden rounded-card border border-line bg-card md:grid-cols-2 xl:grid-cols-4">
          {content.steps.map((step, index) => (
            <div
              key={step.index}
              className="flex min-h-56 flex-col border-b border-line p-6 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0"
            >
              <div className="flex items-center justify-between">
                <MonoLabel styleName="text-accent">{step.index}</MonoLabel>
                {index === content.steps.length - 1 ? (
                  <span className="font-mono text-caption text-accent">
                    {content.loopLabel}
                  </span>
                ) : (
                  <span className="font-mono text-body-sm text-ink-4">
                    -&gt;
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-card-title font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-body-sm text-ink-2">{step.body}</p>
              <div className="mt-auto rounded-md border border-line bg-surface-code px-3 py-2 font-mono text-caption">
                {step.lines.map((line, lineIndex) => (
                  <div
                    key={`${step.index}:${line}`}
                    className={cn(
                      "truncate",
                      lineIndex === 0 ? "text-ink" : undefined,
                      lineIndex !== 0 && step.tone === "fail"
                        ? "text-tone-critical"
                        : undefined,
                      lineIndex !== 0 && step.tone === "ok"
                        ? "text-tone-ok"
                        : undefined,
                      lineIndex !== 0 && step.tone === "info"
                        ? "text-ink-3"
                        : undefined,
                    )}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-caption text-ink-3">
          <span className="text-accent">{content.loopLabel}</span>{" "}
          {content.note}
        </p>
      </LandingWrap>
    </Section>
  );
}

function ToolCard({
  ownerLabel,
  tool,
}: {
  ownerLabel: string;
  tool: ToolContent;
}): ReactElement {
  return (
    <Card asChild className="flex min-h-[30rem] flex-col overflow-hidden">
      <article>
        <div className="flex items-center justify-between gap-4 border-b border-line bg-fill-muted px-5 py-3.5">
          <MonoLabel>
            {ownerLabel} <span className="text-ink-4">/</span>{" "}
            <span className="text-accent">{tool.name}</span>
          </MonoLabel>
          <Badge variant="outline">{tool.family}</Badge>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-serif text-display-sm lowercase leading-none text-ink">
            {tool.name}
          </h3>
          <p className="mt-2 font-mono text-caption text-ink-3">
            {tool.ecosystem}
          </p>
          <p className="mt-5 text-body-sm font-semibold text-ink">
            {tool.tagline}
          </p>
          <p className="mt-3 text-body-sm text-ink-2">{tool.body}</p>
          <ul className="mt-5 flex list-none flex-col gap-2 p-0">
            {tool.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 font-mono text-caption text-ink-2"
              >
                <span className="text-accent">-&gt;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 overflow-hidden rounded-md border border-ink-4 bg-background px-3 py-2 font-mono text-caption text-ink">
              <span className="text-accent">$</span>
              <span className="truncate">{tool.install}</span>
            </div>
            <Button
              asChild
              className="mt-3 w-full justify-between"
              variant="outline"
            >
              <a href={tool.url} target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {tool.ctaLabel}
                </span>
                <ArrowSuffix />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </Card>
  );
}

export function ToolsSection({
  content,
}: {
  content: HomepageContent["tools"];
}): ReactElement {
  return (
    <Section id="tools">
      <LandingWrap>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow label={content.eyebrow} />
            <SectionHeading styleName="mt-2 max-w-[22ch]">
              <HeadingCopy heading={content} />
            </SectionHeading>
          </div>
          <Button asChild variant="outline">
            <a href={content.cta.href} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              {content.cta.label}
            </a>
          </Button>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {content.items.map((tool) => (
            <ToolCard
              key={tool.name}
              ownerLabel={content.ownerLabel}
              tool={tool}
            />
          ))}
        </div>
      </LandingWrap>
    </Section>
  );
}
