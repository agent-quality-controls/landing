export const DEFAULT_R2_IMAGE_WIDTHS = [400, 768, 1376] as const;
export const DEFAULT_R2_IMAGE_SIZES = "(min-width: 768px) 672px, 100vw";

export interface R2ImageTransformOptions {
  readonly format?: "auto" | "avif" | "webp" | "json";
  readonly quality?: number;
  readonly width: number;
}

export interface R2ImageConfig {
  readonly baseUrl: string;
  readonly quality?: number;
  readonly widths?: readonly number[];
}

function normalizedBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function r2ObjectPath(src: string, baseUrl: string): string {
  const base = `${normalizedBaseUrl(baseUrl)}/`;
  if (src.startsWith(base)) {
    return src.slice(base.length);
  }

  let index = 0;
  while (src[index] === "/") {
    index += 1;
  }

  return src.slice(index);
}

export function buildR2ImageTransformUrl(
  src: string,
  config: R2ImageConfig,
  options: R2ImageTransformOptions,
): string {
  const base = normalizedBaseUrl(config.baseUrl);
  const path = r2ObjectPath(src, base);
  const format = options.format ?? "auto";
  const quality = options.quality ?? config.quality ?? 80;

  return `${base}/cdn-cgi/image/format=${format},width=${String(options.width)},quality=${String(quality)}/${path}`;
}

export function buildR2ImageSrcSet(src: string, config: R2ImageConfig): string {
  const widths = config.widths ?? DEFAULT_R2_IMAGE_WIDTHS;

  return widths
    .map(
      (width) =>
        `${buildR2ImageTransformUrl(src, config, { width })} ${String(width)}w`,
    )
    .join(", ");
}
