import type { ReactElement } from "react";
import { Button, Card } from "@project/ui";
import { ExternalLink } from "lucide-react";
import type { ManifestoContent } from "@/content-schema/schemas";
import { logoImagePath } from "@/lib/media-assets";
import { cn } from "@/lib/utils";
import {
  ArrowSuffix,
  AccentMark,
  LandingFrame,
  LandingWrap,
  StatusPill,
} from "../landing/homepage-v2-shell";
import { MonoLabel } from "../landing/section";

type ManifestoBlock = ManifestoContent["blocks"][number];

function renderManifestoBlock(
  block: ManifestoBlock,
  index: number,
): ReactElement {
  if (block.type === "paragraphs") {
    return (
      <div key={`paragraphs:${String(index)}`}>
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (block.type === "pullquote") {
    return (
      <blockquote
        key={`pullquote:${String(index)}`}
        className="my-8 border-l-2 border-accent pl-5 font-mono text-lead text-ink"
      >
        {block.body}
      </blockquote>
    );
  }

  if (block.type === "heading") {
    return (
      <h2
        key={`heading:${block.index}`}
        className="mb-5 mt-14 text-section-md font-medium text-ink"
      >
        <MonoLabel styleName="mb-2 block text-accent">{block.index}</MonoLabel>
        {block.title}
      </h2>
    );
  }

  if (block.type === "proofs") {
    return (
      <Card key={`proofs:${String(index)}`} className="my-8 overflow-hidden">
        {block.items.map((item, itemIndex) => (
          <div
            key={item.label}
            className={cn(
              "grid gap-4 px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)]",
              itemIndex === block.items.length - 1
                ? undefined
                : "border-b border-line",
            )}
          >
            <span className="h-fit rounded-md bg-accent px-2 py-0.5 font-mono text-micro font-semibold text-accent-foreground">
              0{itemIndex + 1}
            </span>
            <div>
              <h3 className="text-body-sm font-semibold text-ink">
                {item.label}
              </h3>
              <p className="mt-1 text-body-sm text-ink-2">{item.body}</p>
            </div>
          </div>
        ))}
      </Card>
    );
  }

  return (
    <ol
      key={`loop:${String(index)}`}
      className="my-7 list-none overflow-hidden rounded-card border border-line bg-card p-0"
    >
      {block.items.map((item, itemIndex) => (
        <li
          key={item.index}
          className={cn(
            "grid gap-3 px-5 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)]",
            itemIndex === block.items.length - 1
              ? undefined
              : "border-b border-line",
          )}
        >
          <MonoLabel styleName="text-accent">{item.index}</MonoLabel>
          <div>
            <span className="font-mono text-body-sm font-semibold text-ink">
              {item.title}
            </span>
            <span className="font-mono text-body-sm text-ink-3">
              {" "}
              - {item.body}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ManifestoBody({
  blocks,
}: {
  blocks: ManifestoContent["blocks"];
}): ReactElement {
  return (
    <div className="article-body">
      {blocks.map((block, index) => renderManifestoBlock(block, index))}
    </div>
  );
}

function ManifestoEnd({ end }: { end: ManifestoContent["end"] }): ReactElement {
  return (
    <div className="mt-16 border-t border-line pt-8">
      <MonoLabel styleName="text-accent">{end.eyebrow}</MonoLabel>
      <h3 className="mt-3 text-card-title font-medium text-ink">
        {end.title} <span className="text-ink-3">{end.mutedTitle}</span>
      </h3>
      <div className="mt-5 flex flex-col gap-2">
        {end.tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noreferrer"
            className="grid gap-3 rounded-lg border border-line bg-card px-4 py-3 no-underline hover:border-ink-4 hover:no-underline sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
          >
            <span className="font-serif text-card-title lowercase text-accent">
              {tool.name}
            </span>
            <span className="font-mono text-caption text-ink-2">
              {tool.body}
            </span>
            <span className="font-mono text-caption text-ink-3">-&gt;</span>
          </a>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <a href={end.homeCta.href}>{end.homeCta.label}</a>
        </Button>
        <Button asChild>
          <a href={end.githubCta.href} target="_blank" rel="noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            {end.githubCta.label}
            <ArrowSuffix />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ManifestoPage({
  content,
  currentPath,
}: {
  content: ManifestoContent;
  currentPath: string;
}): ReactElement {
  return (
    <LandingFrame
      brandName={content.brandName}
      currentPath={currentPath}
      footer={content.footer}
      githubLabel={content.githubLabel}
      githubUrl={content.githubUrl}
      navLinks={content.navLinks}
    >
      <LandingWrap styleName="max-w-[45rem] px-4 py-16 sm:px-6 lg:px-0 lg:py-20">
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill>{content.label}</StatusPill>
            <span className="ui-mono-meta">{content.meta}</span>
          </div>
          <h1 className="mt-7 max-w-[16ch] font-serif text-display-lg uppercase leading-[0.96] text-ink sm:text-display-xl">
            {content.title}
            <br />
            <AccentMark>{content.accent}</AccentMark>.
          </h1>
          <p className="mt-6 max-w-[60ch] text-lead text-ink-2">
            {content.lede}
          </p>
          <div className="mt-8 flex items-center gap-4 border-t border-line pt-5">
            <img
              alt=""
              className="h-7 w-7 rounded-md"
              height={28}
              src={logoImagePath}
              width={28}
            />
            <div>
              <div className="font-mono text-caption font-semibold text-ink">
                {content.authorName}
              </div>
              <div className="font-mono text-micro uppercase tracking-kicker text-ink-3">
                {content.authorMeta}
              </div>
            </div>
          </div>
        </header>
        <ManifestoBody blocks={content.blocks} />
        <ManifestoEnd end={content.end} />
      </LandingWrap>
    </LandingFrame>
  );
}
