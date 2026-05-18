import type { ReactElement, ReactNode } from "react";

interface HeroImageProps {
  tint?: string;
  label?: string;
  code?: string | undefined;
  sub?: ReactNode;
}

export function HeroImage({
  code,
  tint = "var(--accent)",
  label = "COVER · 1600x900",
  sub,
}: HeroImageProps): ReactElement {
  const decodedCode = code?.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

  return (
    <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-card bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--ink) 0%, #1a1a1a 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px 300px at 70% 40%, color-mix(in srgb, ${tint} 27%, transparent), transparent)`,
        }}
      />
      <svg
        role="presentation"
        width="100%"
        height="100%"
        className="absolute inset-0 opacity-15"
      >
        <defs>
          <pattern
            id="hero-image-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#fff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-image-grid)" />
      </svg>
      {code === undefined ? null : (
        <div className="absolute inset-0 grid min-w-0 place-items-center px-4 sm:px-8">
          <pre className="m-0 max-h-[70%] max-w-full overflow-auto rounded-md border border-surface-code-border bg-surface-code px-4 py-3 font-mono text-code leading-[1.55] text-surface-code-foreground sm:max-w-[80%] sm:px-5 sm:py-4 sm:text-caption">
            {decodedCode}
          </pre>
        </div>
      )}
      {sub}
      <div
        className="absolute bottom-4 left-5 font-mono text-micro text-ink-3"
        style={{ letterSpacing: "var(--tracking-kicker)" }}
      >
        {label}
      </div>
    </div>
  );
}
