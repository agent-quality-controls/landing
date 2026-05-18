import type { ReactElement } from "react";
import { logoImagePath } from "@/lib/media-assets";

interface LogoProps {
  label: string;
  loading?: "eager" | "lazy";
}

export function Logo({ label, loading = "eager" }: LogoProps): ReactElement {
  return (
    <span className="inline-flex h-8 items-center gap-2.5">
      <img
        alt=""
        className="h-6 w-6 shrink-0 rounded-md"
        height={24}
        loading={loading}
        src={logoImagePath}
        width={24}
      />
      <span className="whitespace-nowrap font-mono text-small font-semibold leading-none text-ink">
        {label}
      </span>
    </span>
  );
}
