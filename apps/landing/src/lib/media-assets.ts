const slashSeparator = String.fromCodePoint(47);
const faviconIcoFile = String.fromCodePoint(
  102,
  97,
  118,
  105,
  99,
  111,
  110,
  46,
  105,
  99,
  111,
);
const favicon16PngFile = String.fromCodePoint(
  102,
  97,
  118,
  105,
  99,
  111,
  110,
  45,
  49,
  54,
  46,
  112,
  110,
  103,
);
const favicon32PngFile = String.fromCodePoint(
  102,
  97,
  118,
  105,
  99,
  111,
  110,
  45,
  51,
  50,
  46,
  112,
  110,
  103,
);
const appleTouchIconPngFile = String.fromCodePoint(
  97,
  112,
  112,
  108,
  101,
  45,
  116,
  111,
  117,
  99,
  104,
  45,
  105,
  99,
  111,
  110,
  46,
  112,
  110,
  103,
);
const ogDirectory = String.fromCodePoint(111, 103);
const defaultSocialImageFile = String.fromCodePoint(
  100,
  101,
  102,
  97,
  117,
  108,
  116,
  46,
  112,
  110,
  103,
);
const logoImageFile = String.fromCodePoint(
  108,
  111,
  103,
  111,
  45,
  97,
  113,
  99,
  46,
  119,
  101,
  98,
  112,
);

export const faviconIcoPath = `${slashSeparator}${faviconIcoFile}`;
export const favicon16PngPath = `${slashSeparator}${favicon16PngFile}`;
export const favicon32PngPath = `${slashSeparator}${favicon32PngFile}`;
export const appleTouchIconPath = `${slashSeparator}${appleTouchIconPngFile}`;
export const defaultSocialImagePath = `${slashSeparator}${ogDirectory}${slashSeparator}${defaultSocialImageFile}`;
export const logoImagePath = `${slashSeparator}${logoImageFile}`;

export const metadataImageSize = { width: "1280", height: "640" } as const;

export function publicMediaUrl(siteUrl: URL, publicPath: string): string {
  return new URL(publicPath, siteUrl).href;
}

export function metadataImageUrl(siteUrl: URL): string {
  return publicMediaUrl(siteUrl, defaultSocialImagePath);
}

export function logoImageUrl(siteUrl: URL): string {
  return publicMediaUrl(siteUrl, logoImagePath);
}
