import type {
  HomepageContent,
  ManifestoContent,
} from "../content-schema/schemas";
import { metadataImageUrl, metadataImageSize } from "../lib/media-assets";

export interface PublicRouteMetadata {
  readonly canonicalHref: string;
  readonly description: string;
  readonly imageAlt: string;
  readonly imageHeight: string;
  readonly imageHref: string;
  readonly imageMimeType: string;
  readonly imageWidth: string;
  readonly openGraphType: string;
  readonly siteName: string;
  readonly title: string;
  readonly twitterCard: "summary_large_image";
}

const imagePngMimeType = String.fromCodePoint(
  105,
  109,
  97,
  103,
  101,
  47,
  112,
  110,
  103,
);
const websiteOpenGraphType = String.fromCodePoint(
  119,
  101,
  98,
  115,
  105,
  116,
  101,
);
const articleOpenGraphType = String.fromCodePoint(
  97,
  114,
  116,
  105,
  99,
  108,
  101,
);

function baseMetadata(
  siteUrl: URL,
  routeUrl: URL,
  siteName: string,
  title: string,
  description: string,
  openGraphType: string,
): PublicRouteMetadata {
  const canonicalUrl = new URL(routeUrl.pathname, siteUrl);

  return {
    canonicalHref: canonicalUrl.href,
    description,
    imageAlt: siteName,
    imageHeight: metadataImageSize.height,
    imageHref: metadataImageUrl(siteUrl),
    imageMimeType: imagePngMimeType,
    imageWidth: metadataImageSize.width,
    openGraphType,
    siteName,
    title,
    twitterCard: "summary_large_image",
  };
}

export function buildHomepageMetadata(
  homepage: HomepageContent,
  siteUrl: URL,
  routeUrl: URL,
): PublicRouteMetadata {
  return baseMetadata(
    siteUrl,
    routeUrl,
    homepage.brandName,
    homepage.metadata.title,
    homepage.metadata.description,
    websiteOpenGraphType,
  );
}

export function buildManifestoMetadata(
  manifesto: ManifestoContent,
  siteUrl: URL,
  routeUrl: URL,
): PublicRouteMetadata {
  return baseMetadata(
    siteUrl,
    routeUrl,
    manifesto.brandName,
    manifesto.metadata.title,
    manifesto.metadata.description,
    articleOpenGraphType,
  );
}
