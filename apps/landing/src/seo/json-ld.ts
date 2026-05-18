import type {
  Article,
  Organization,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import type {
  HomepageContent,
  ManifestoContent,
} from "../content-schema/schemas";
import { logoImageUrl } from "../lib/media-assets";

export type HomepageJsonLd = WithContext<WebSite>;
export type ManifestoJsonLd = WithContext<Article | WebPage>;

const englishLanguageCode = String.fromCodePoint(101, 110);

function publisherJsonLd(siteUrl: URL, name: string): Organization {
  return {
    "@type": "Organization",
    name,
    url: siteUrl.href,
    logo: logoImageUrl(siteUrl),
  };
}

export function buildHomepageJsonLd(
  homepage: HomepageContent,
  siteUrl: URL,
): HomepageJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: homepage.brandName,
    url: siteUrl.href,
    description: homepage.metadata.description,
    publisher: publisherJsonLd(siteUrl, homepage.brandName),
  };
}

export function buildManifestoJsonLd(
  manifesto: ManifestoContent,
  siteUrl: URL,
  routeUrl: URL,
): ManifestoJsonLd {
  const canonicalUrl = new URL(routeUrl.pathname, siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: manifesto.metadata.title,
    description: manifesto.metadata.description,
    url: canonicalUrl.href,
    mainEntityOfPage: canonicalUrl.href,
    inLanguage: englishLanguageCode,
    author: publisherJsonLd(siteUrl, manifesto.brandName),
    publisher: publisherJsonLd(siteUrl, manifesto.brandName),
  };
}
