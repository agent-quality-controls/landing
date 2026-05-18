import path from "node:path";
import { fileURLToPath } from "node:url";
import rootConfig from "../../eslint.config.mjs";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroI18nPolicy from "g3ts-eslint-plugin-astro-i18n-policy";
import astroMediaPolicy from "g3ts-eslint-plugin-astro-media-policy";
import astroPipeline from "g3ts-eslint-plugin-astro-pipeline";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import i18next from "eslint-plugin-i18next";
import * as mdx from "eslint-plugin-mdx";
import stylePolicy from "g3ts-eslint-plugin-style-policy";
import {
  ASTRO_AND_MDX_GUARDRAIL_FILES,
  ASTRO_I18N_POLICY_OPTIONS,
  ASTRO_I18N_PUBLIC_FILES,
  ASTRO_MEDIA_POLICY_OPTIONS,
  ASTRO_MEDIA_PUBLIC_FILES,
  ASTRO_PIPELINE_OPTIONS,
  ASTRO_RULES,
  ASTRO_SOURCE_FILES,
  INLINE_PUBLIC_COPY_RULE_OPTIONS,
  MDX_CONTENT_FILES,
  PROTECTED_DELEGATED_RULES,
  RAW_I18N_FORMATTING_BANS,
  STYLE_SOURCE_FILES,
  STYLE_POLICY_OPTIONS,
} from "./eslint.policy.mjs";

const landingRoot = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ["**/.astro/**"],
  },
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: landingRoot,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        noWarnOnMultipleProjects: true,
        tsconfigRootDir: landingRoot,
      },
    },
  },
  ...astro.configs["flat/recommended"],
  {
    files: ["src/**/*.astro"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ASTRO_SOURCE_FILES,
    plugins: {
      astro,
    },
    rules: ASTRO_RULES,
  },
  {
    files: [...ASTRO_SOURCE_FILES, "mdx-components.tsx"],
    plugins: {
      "astro-pipeline": astroPipeline,
    },
    rules: {
      "astro-pipeline/no-authored-content-fs-read": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-authored-content-glob": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-authored-content-imports": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-content-data-modules-in-routes": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-direct-astro-content-in-routes": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-runtime-mdx-eval": ["error", ASTRO_PIPELINE_OPTIONS],
      "astro-pipeline/no-side-loader-imports": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-velite-imports": ["error", ASTRO_PIPELINE_OPTIONS],
      "astro-pipeline/no-raw-mdx-images": ["error", ASTRO_PIPELINE_OPTIONS],
      "astro-pipeline/mdx-component-map-no-raw-ui-exports": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/require-approved-content-adapter-in-routes": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/require-approved-json-ld-helper-in-routes": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/require-approved-metadata-helper-in-routes": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/mdx-component-wrapper-requires-zod-parse": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/mdx-imports-only-approved-components": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
    },
  },
  {
    files: ASTRO_AND_MDX_GUARDRAIL_FILES,
    plugins: {
      "@eslint-community/eslint-comments": eslintComments,
    },
    rules: {
      "@eslint-community/eslint-comments/no-restricted-disable": [
        "error",
        ...PROTECTED_DELEGATED_RULES,
      ],
      "@eslint-community/eslint-comments/no-unused-disable": "error",
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: [] },
      ],
    },
  },
  {
    files: ASTRO_I18N_PUBLIC_FILES,
    plugins: {
      "astro-i18n-policy": astroI18nPolicy,
      i18next,
    },
    rules: {
      "astro-i18n-policy/no-unlocalized-internal-hrefs": [
        "error",
        ASTRO_I18N_POLICY_OPTIONS,
      ],
      "i18next/no-literal-string": ["error", INLINE_PUBLIC_COPY_RULE_OPTIONS],
      "no-restricted-syntax": ["error", ...RAW_I18N_FORMATTING_BANS],
    },
  },
  {
    files: [MDX_CONTENT_FILES],
    plugins: {
      "astro-i18n-policy": astroI18nPolicy,
    },
    rules: {
      "astro-i18n-policy/no-unlocalized-internal-hrefs": [
        "error",
        ASTRO_I18N_POLICY_OPTIONS,
      ],
    },
  },
  {
    files: ASTRO_MEDIA_PUBLIC_FILES,
    plugins: {
      "astro-media-policy": astroMediaPolicy,
    },
    rules: {
      "astro-media-policy/no-inline-image-alt": [
        "error",
        ASTRO_MEDIA_POLICY_OPTIONS,
      ],
      "astro-media-policy/no-raw-public-image-paths": [
        "error",
        ASTRO_MEDIA_POLICY_OPTIONS,
      ],
      "astro-media-policy/require-approved-media-helper": [
        "error",
        ASTRO_MEDIA_POLICY_OPTIONS,
      ],
      "astro-media-policy/require-content-image-key": [
        "error",
        ASTRO_MEDIA_POLICY_OPTIONS,
      ],
    },
  },
  {
    files: STYLE_SOURCE_FILES,
    plugins: {
      "style-policy": stylePolicy,
    },
    rules: {
      "style-policy/no-denied-class-tokens": ["error", STYLE_POLICY_OPTIONS],
    },
  },
  {
    files: ["src/diagnostics/internal-errors.ts"],
    rules: {
      "i18next/no-literal-string": "off", // EXCEPTION: internal thrown diagnostics are not public copy.
    },
  },
  {
    files: ["mdx-components.tsx"],
    rules: {
      "max-lines": "off", // EXCEPTION: the approved MDX component map must keep local Zod schemas beside wrappers.
    },
  },
  {
    files: [MDX_CONTENT_FILES],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
  },
  {
    ...mdx.configs.flat,
    files: [MDX_CONTENT_FILES],
    rules: {
      ...mdx.configs.flat.rules,
      "@typescript-eslint/no-unused-vars": "off", // EXCEPTION: MDX component imports are consumed as tags, but this rule sees them as unused variables.
      "astro-pipeline/mdx-component-imports-from-approved-map": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/mdx-imports-only-approved-components": [
        "error",
        ASTRO_PIPELINE_OPTIONS,
      ],
      "astro-pipeline/no-raw-mdx-images": ["error", ASTRO_PIPELINE_OPTIONS],
      "mdx/remark": "error",
    },
    plugins: {
      ...mdx.configs.flat.plugins,
      "astro-pipeline": astroPipeline,
    },
  },
  {
    files: ["**/*.{ts,tsx,astro}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-img-element": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-sync-scripts": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-head-import-in-document": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-duplicate-head": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/google-font-display": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/google-font-preconnect": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-page-custom-font": "off", // EXCEPTION: landing is Astro, not Next.
      "@next/next/no-title-in-document-head": "off", // EXCEPTION: landing is Astro, not Next.
    },
  },
];
