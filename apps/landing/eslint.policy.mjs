export const MDX_CONTENT_FILES = "content/**/*.mdx";
export const ASTRO_SOURCE_FILES = [
  "src/**/*.astro",
  "src/**/*.ts",
  "src/**/*.tsx",
];
export const ASTRO_AND_MDX_GUARDRAIL_FILES = [
  ...ASTRO_SOURCE_FILES,
  "mdx-components.tsx",
  MDX_CONTENT_FILES,
];
export const ASTRO_I18N_PUBLIC_FILES = [
  "src/content/**/*.{ts,tsx}",
  "src/content-schema/**/*.{ts,tsx}",
  "src/diagnostics/**/*.{ts,tsx}",
  "src/lib/**/*.{ts,tsx}",
  "src/mdx/**/*.{ts,tsx}",
  "src/pages/**/*.{astro,ts,tsx}",
  "src/seo/**/*.{astro,ts,tsx}",
  "src/ui/**/*.{astro,ts,tsx}",
];
export const ASTRO_MEDIA_PUBLIC_FILES = [
  MDX_CONTENT_FILES,
  ...ASTRO_I18N_PUBLIC_FILES,
];
export const STYLE_SOURCE_FILES = [
  "src/**/*.astro",
  "src/**/*.ts",
  "src/**/*.tsx",
];
export const TAILWIND_DENYLIST = [
  "bg-black",
  "bg-white",
  "border-black",
  "border-white",
  "text-black",
  "text-white",
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  "text-8xl",
  "text-9xl",
];
export const STYLE_POLICY_OPTIONS = {
  denyList: TAILWIND_DENYLIST,
  denyPrefixes: [],
  denyPatterns: [],
  ["classAttributes"]: ["class", "className"],
  ["classListAttributes"]: ["class:list"],
  ["classHelpers"]: ["cn", "clsx", "cva", "twMerge", "twJoin"],
};

export const ASTRO_RULES = {
  "astro/missing-client-only-directive-value": "error",
  "astro/no-conflict-set-directives": "error",
  "astro/no-deprecated-astro-canonicalurl": "error",
  "astro/no-deprecated-astro-fetchcontent": "error",
  "astro/no-deprecated-astro-resolve": "error",
  "astro/no-deprecated-getentrybyslug": "error",
  "astro/no-unused-define-vars-in-style": "error",
  "astro/valid-compile": "error",
};

export const ASTRO_PIPELINE_RULES = {
  "astro-pipeline/no-authored-content-fs-read": "error",
  "astro-pipeline/no-authored-content-glob": "error",
  "astro-pipeline/no-authored-content-imports": "error",
  "astro-pipeline/no-content-data-modules-in-routes": "error",
  "astro-pipeline/no-direct-astro-content-in-routes": "error",
  "astro-pipeline/no-runtime-mdx-eval": "error",
  "astro-pipeline/no-side-loader-imports": "error",
  "astro-pipeline/no-velite-imports": "error",
  "astro-pipeline/no-raw-mdx-images": "error",
  "astro-pipeline/mdx-component-map-no-raw-ui-exports": "error",
  "astro-pipeline/require-approved-content-adapter-in-routes": "error",
  "astro-pipeline/require-approved-json-ld-helper-in-routes": "error",
  "astro-pipeline/require-approved-metadata-helper-in-routes": "error",
  "astro-pipeline/mdx-component-wrapper-requires-zod-parse": "error",
  "astro-pipeline/mdx-imports-only-approved-components": "error",
};

export const PROTECTED_DELEGATED_RULES = [
  "@eslint-community/eslint-comments/no-restricted-disable",
  "@eslint-community/eslint-comments/no-unused-disable",
  "@eslint-community/eslint-comments/require-description",
  "astro/valid-compile",
  "astro-i18n-policy/no-unlocalized-internal-hrefs",
  "astro-i18n-policy/*",
  "astro-media-policy/no-inline-image-alt",
  "astro-media-policy/no-raw-public-image-paths",
  "astro-media-policy/require-approved-media-helper",
  "astro-media-policy/require-content-image-key",
  "astro-media-policy/*",
  "astro-pipeline/mdx-component-imports-from-approved-map",
  "astro-pipeline/mdx-component-map-no-raw-ui-exports",
  "astro-pipeline/mdx-component-wrapper-requires-zod-parse",
  "astro-pipeline/mdx-imports-only-approved-components",
  "astro-pipeline/no-authored-content-fs-read",
  "astro-pipeline/no-authored-content-glob",
  "astro-pipeline/no-authored-content-imports",
  "astro-pipeline/no-content-data-modules-in-routes",
  "astro-pipeline/no-direct-astro-content-in-routes",
  "astro-pipeline/no-raw-mdx-images",
  "astro-pipeline/no-side-loader-imports",
  "astro-pipeline/no-velite-imports",
  "astro-pipeline/require-approved-content-adapter-in-routes",
  "astro-pipeline/require-approved-json-ld-helper-in-routes",
  "astro-pipeline/require-approved-metadata-helper-in-routes",
  "i18next/no-literal-string",
  "mdx/remark",
  "no-restricted-syntax",
  "style-policy/no-denied-class-tokens",
  "style-policy/*",
  "tailwind-ban/no-deny-tailwind-tokens",
  "tailwind-ban/*",
];

const APPROVED_MDX_COMPONENT_NAMES = [
  "AlternativeCard",
  "ArticleImage",
  "BarChart",
  "Breadcrumbs",
  "Callout",
  "ChartSlot",
  "CodeBlock",
  "ComparisonTable",
  "EndCTA",
  "FAQ",
  "HowTo",
  "InlineCTA",
  "InlineStatList",
  "PullQuote",
  "QuickAnswer",
  "RelatedArticles",
  "SeriesNav",
  "Stat",
  "StatGrid",
  "StatSection",
  "TLDR",
];

export const ASTRO_PIPELINE_OPTIONS = {
  routeGlobs: ["src/pages/**/*.{astro,ts,tsx,js,jsx,mjs,cjs,mts,cts}"],
  endpointGlobs: ["src/pages/**/*.ts"],
  contentDataModuleGlobs: ["src/**/*.data.ts"],
  mdxContentGlobs: [MDX_CONTENT_FILES],
  adapterModuleGlobs: [],
  mdxRuntimeModuleGlobs: [],
  routeRegistryModuleGlobs: [],
  approvedContentAdapterModules: ["src/content/**"],
  approvedJsonLdHelperModules: ["src/seo/json-ld.ts", "src/seo/JsonLd.astro"],
  approvedLoaderModules: [],
  approvedMetadataHelperModules: ["src/seo/metadata.ts"],
  approvedMdxComponentModules: ["mdx-components.tsx"],
  approvedMdxComponentNames: APPROVED_MDX_COMPONENT_NAMES,
  allowedMdxComponentMapExports: ["mdxComponents"],
  approvedMdxImageComponents: ["ArticleImage"],
  mdxPropsParserName: ["parseMdxComponentProps"],
  rawUiModuleGlobs: ["@project/ui"],
  approvedGeneratedArtifactRoots: [".astro/**", "dist/**"],
  authoredContentGlobs: ["content/**"],
  specContentGlobs: [],
};

export const INLINE_PUBLIC_COPY_RULE_OPTIONS = {
  framework: "react",
  mode: "all",
  message:
    "Inline public copy must live in Astro content entries. Move this text into the content collection, validate it through the collection schema, and pass the typed value into source.",
  "should-validate-template": true,
  words: {
    include: [],
    exclude: ["[0-9!-/:-@[-`{-~]+", "[A-Z_-]+"],
  },
  "jsx-components": {
    include: [],
    exclude: [],
  },
  "jsx-attributes": {
    include: [],
    exclude: [
      "as",
      "class",
      "className",
      "color",
      "data-.+",
      "height",
      "href",
      "id",
      "intent",
      "key",
      "name",
      "rel",
      "role",
      "size",
      "slot",
      "src",
      "style",
      "styleName",
      "target",
      "tone",
      "type",
      "variant",
      "width",
      "aria-hidden",
    ],
  },
  callees: {
    include: [],
    exclude: [
      "require",
      "clsx",
      "cn",
      "cx",
      "cva",
      "twMerge",
      "twJoin",
      "tv",
      "URL",
    ],
  },
  "object-properties": {
    include: [],
    exclude: ["[A-Z_-]+"],
  },
  "class-properties": {
    include: [],
    exclude: ["displayName"],
  },
};

export const ASTRO_I18N_POLICY_OPTIONS = {
  locales: ["en"],
  defaultLocale: "en",
  requireLocalePrefixForContentRoutes: true,
  allowedUnprefixedRoutes: ["/", "/manifesto/"],
  contentRoutePrefixes: ["/manifesto"],
  approvedInternalLinkHelpers: ["localePath"],
  checkedInternalLinkHelpers: ["localePath"],
  approvedLocalizedLinkComponents: ["LocalizedLink"],
};

export const ASTRO_MEDIA_POLICY_OPTIONS = {
  publicSourceGlobs: ASTRO_MEDIA_PUBLIC_FILES,
  mediaHelperModules: ["src/lib/media-assets"],
  approvedMediaHelpers: [
    "logoImagePath",
    "logoImageUrl",
    "metadataImageUrl",
    "publicMediaUrl",
  ],
  contentImageComponents: ["ArticleImage"],
  contentImageKeyProps: ["imageKey"],
  bannedImageSourceProps: ["src"],
  bannedImageAltProps: ["alt"],
  allowedPublicImagePaths: [
    "/apple-touch-icon.png",
    "/favicon.ico",
    "/favicon-16.png",
    "/favicon-32.png",
    "/logo-aqc.png",
    "/og/default.png",
  ],
  checkedImageExtensions: [".ico", ".png", ".jpg", ".jpeg", ".webp", ".svg"],
  metadataImagePropertyNames: ["imageHref"],
};

export const RAW_I18N_FORMATTING_BANS = [
  {
    selector: "CallExpression[callee.property.name='toLocaleDateString']",
    message:
      "Use an approved i18n formatting helper instead of raw date formatting.",
  },
  {
    selector: "CallExpression[callee.property.name='toLocaleString']",
    message:
      "Use an approved i18n formatting helper instead of raw locale formatting.",
  },
  {
    selector:
      "NewExpression[callee.object.name='Intl'][callee.property.name='DateTimeFormat']",
    message:
      "Use an approved i18n formatting helper instead of raw date formatting.",
  },
  {
    selector:
      "NewExpression[callee.object.name='Intl'][callee.property.name='NumberFormat']",
    message:
      "Use an approved i18n formatting helper instead of raw number formatting.",
  },
];
