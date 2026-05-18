import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import stylePolicy from "g3ts-eslint-plugin-style-policy";
import rootConfig from "../../eslint.config.mjs";
import { UI_TAILWIND_DENYLIST } from "../../eslint.ui-denylist.mjs";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const STYLE_SOURCE_FILES = ["src/**/*.ts", "src/**/*.tsx"];
const STYLE_POLICY_OPTIONS = {
  denyList: UI_TAILWIND_DENYLIST,
  denyPrefixes: [],
  denyPatterns: [],
  ["classAttributes"]: ["class", "className"],
  ["classListAttributes"]: ["class:list"],
  ["classHelpers"]: ["cn", "clsx", "cva", "twMerge", "twJoin"],
};

const packageRootConfig = rootConfig.map((entry) => {
  if (
    entry.rules?.["@next/next/no-html-link-for-pages"] === undefined &&
    entry.rules?.["@next/next/no-img-element"] === undefined
  ) {
    return entry;
  }

  return {
    ...entry,
    rules: {
      ...entry.rules,
      "@next/next/no-html-link-for-pages": "off", // EXCEPTION: shared UI package is router-agnostic and not a Next app.
      "@next/next/no-img-element": "off", // EXCEPTION: shared UI package owns framework-neutral image wrappers.
    },
  };
});

export default [
  ...packageRootConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: packageRoot,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        noWarnOnMultipleProjects: true,
        tsconfigRootDir: packageRoot,
      },
    },
  },
  {
    files: STYLE_SOURCE_FILES,
    plugins: {
      "@eslint-community/eslint-comments": eslintComments,
      "style-policy": stylePolicy,
    },
    rules: {
      "@eslint-community/eslint-comments/no-restricted-disable": [
        "error",
        "style-policy/no-denied-class-tokens",
        "style-policy/*",
        "tailwind-ban/no-deny-tailwind-tokens",
        "tailwind-ban/*",
      ],
      "style-policy/no-denied-class-tokens": ["error", STYLE_POLICY_OPTIONS],
      "unicorn/no-keyword-prefix": ["error", { disallowedPrefixes: ["new"] }],
    },
  },
];
