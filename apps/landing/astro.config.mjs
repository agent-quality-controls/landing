import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import checks from "@nuasite/checks";
import robots from "astro-robots";
import g3tsLlmsAuditor from "g3ts-astro-llms-auditor";
import g3tsLlmsGenerator from "g3ts-astro-llms-generator";
import g3tsAstroMediaAssets from "g3ts-astro-media-assets";
import { structuredDataPresentCheck } from "g3ts-astro-nuasite-checks";
import g3tsRobotsAuditor from "g3ts-astro-robots-auditor";
import g3tsSitemapAuditor from "g3ts-astro-sitemap-auditor";
import { fileURLToPath } from "node:url";

const siteUrl = "https://agent-qc.com";
const sitemapIndexUrl = `${siteUrl}/sitemap-index.xml`;
const faviconPath = "/favicon.ico";
const appleTouchIconPath = "/apple-touch-icon.png";
const defaultSocialImagePath = "/og/default.png";

export default defineConfig({
  site: siteUrl,
  output: "static",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap(),
    g3tsSitemapAuditor({
      site: siteUrl,
      trailingSlash: "always",
    }),
    robots(),
    g3tsRobotsAuditor({
      site: siteUrl,
      sitemapUrls: [sitemapIndexUrl],
    }),
    g3tsLlmsGenerator({
      title: "agent-qc.com",
      site: siteUrl,
      sections: [
        {
          heading: "Main pages",
          links: [
            {
              title: "Homepage",
              href: "/",
              description:
                "Deterministic controls for agent output. Less slop, more signal.",
            },
            {
              title: "Manifesto",
              href: "/manifesto/",
              description:
                "Why agent-qc builds deterministic gates instead of model-based graders.",
            },
          ],
        },
      ],
    }),
    g3tsLlmsAuditor({
      site: siteUrl,
      requiredSections: ["Main pages"],
      requiredRoutePatterns: ["/", "/manifesto/"],
      allowedExternalUrls: [],
      allowedNonPageUrls: [],
      ignoredHtmlFiles: [],
    }),
    g3tsAstroMediaAssets({
      favicon: faviconPath,
      appIcons: [appleTouchIconPath],
      defaultSocialImage: defaultSocialImagePath,
      allowSvgIcons: false,
    }),
    checks({
      mode: "full",
      failOnError: true,
      failOnWarning: true,
      reportJson: true,
      ai: false,
      customChecks: [structuredDataPresentCheck],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
    },
  },
});
