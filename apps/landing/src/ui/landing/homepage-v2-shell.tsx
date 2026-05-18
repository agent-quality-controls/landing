import type { ReactElement, ReactNode } from "react";
import { Button } from "@project/ui";
import { ArrowRight, ExternalLink } from "lucide-react";
import type {
  HomepageContent,
  SiteFooterContent,
} from "@/content-schema/schemas";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MonoLabel, PageShell } from "./section";

export function LandingWrap({
  children,
  styleName,
  id,
}: {
  children: ReactNode;
  styleName?: string;
  id?: string;
}): ReactElement {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-[77.5rem]", styleName)}>
      {children}
    </div>
  );
}

export function AccentMark({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <em className="bg-[linear-gradient(to_top,var(--color-accent)_0,var(--color-accent)_42%,transparent_42%)] bg-no-repeat px-[0.04em] not-italic text-ink [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </em>
  );
}

export function StatusPill({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <span className="ui-status-pill">
      <span className="ui-status-pill-dot" />
      {children}
    </span>
  );
}

function Header({
  brandName,
  githubUrl,
  githubLabel,
  navLinks,
  currentPath,
}: {
  brandName: HomepageContent["brandName"];
  githubUrl: HomepageContent["githubUrl"];
  githubLabel: HomepageContent["githubLabel"];
  navLinks: HomepageContent["navLinks"];
  currentPath: string;
}): ReactElement {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background">
      <LandingWrap styleName="flex items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-0">
        <a href="/" className="text-inherit no-underline hover:no-underline">
          <Logo label={brandName} />
        </a>
        <nav className="flex min-w-0 items-center gap-1">
          {navLinks.slice(0, 2).map((link) => {
            const active = link.href === currentPath;

            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 font-mono text-caption no-underline hover:no-underline",
                  active ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {link.label}
              </a>
            );
          })}
          <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
          <Button
            asChild
            className="hidden sm:inline-flex"
            size="sm"
            variant="outline"
          >
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              {githubLabel}
            </a>
          </Button>
        </nav>
      </LandingWrap>
    </header>
  );
}

function Footer({
  brandName,
  footer,
}: {
  brandName: HomepageContent["brandName"];
  footer: SiteFooterContent;
}): ReactElement {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-8 lg:px-12">
      <LandingWrap>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo label={brandName} loading="lazy" />
            <p className="mt-4 max-w-[38ch] text-body-sm text-ink-3">
              {footer.body}
            </p>
          </div>
          {footer.columns.map((column) => (
            <div key={column.heading}>
              <MonoLabel>{column.heading}</MonoLabel>
              <ul className="mt-3 flex list-none flex-col gap-2 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-caption text-ink-2 no-underline hover:text-ink hover:no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-5 font-mono text-micro uppercase tracking-kicker text-ink-3">
          <span>{footer.legal}</span>
          <span>{footer.copyright}</span>
        </div>
      </LandingWrap>
    </footer>
  );
}

export function LandingFrame({
  brandName,
  children,
  currentPath,
  footer,
  githubLabel,
  githubUrl,
  navLinks,
}: {
  brandName: HomepageContent["brandName"];
  children: ReactNode;
  currentPath: string;
  footer: SiteFooterContent;
  githubLabel: HomepageContent["githubLabel"];
  githubUrl: HomepageContent["githubUrl"];
  navLinks: HomepageContent["navLinks"];
}): ReactElement {
  return (
    <PageShell>
      <Header
        brandName={brandName}
        currentPath={currentPath}
        githubLabel={githubLabel}
        githubUrl={githubUrl}
        navLinks={navLinks}
      />
      <main>{children}</main>
      <Footer brandName={brandName} footer={footer} />
    </PageShell>
  );
}

export function ArrowSuffix(): ReactElement {
  return <ArrowRight className="h-3.5 w-3.5" />;
}
