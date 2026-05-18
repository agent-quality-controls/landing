import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import-x";
import unicorn from "eslint-plugin-unicorn";
import regexp from "eslint-plugin-regexp";
import sonarjs from "eslint-plugin-sonarjs";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import i18next from "eslint-plugin-i18next";
import nextPlugin from "@next/eslint-plugin-next";
import tailwindBan from "eslint-plugin-tailwind-ban";
import { UI_TAILWIND_DENYLIST } from "./eslint.ui-denylist.mjs";

// Shared banned import paths — extracted so landing-specific rules can reuse them
const BANNED_PATHS = [
  // Date/Time: use date-fns or native Intl
  {
    name: "moment",
    message: "Use date-fns or Intl — moment is dead and 300KB",
  },

  // HTTP: use native fetch (built into Node 18+)
  { name: "axios", message: "Use native fetch" },
  { name: "request", message: "Dead package — use native fetch" },
  {
    name: "request-promise",
    message: "Dead package — use native fetch",
  },
  {
    name: "node-fetch",
    message: "Built into Node 18+ — use native fetch",
  },
  {
    name: "isomorphic-fetch",
    message: "Built into Node 18+ — use native fetch",
  },
  { name: "got", message: "Use native fetch" },

  // Carousel: use Swiper, not Embla
  {
    name: "embla-carousel",
    message: "Use Swiper for carousels — Embla is banned",
  },
  {
    name: "embla-carousel-react",
    message: "Use Swiper for carousels — Embla is banned",
  },
  {
    name: "embla-carousel-autoplay",
    message: "Use Swiper for carousels — Embla is banned",
  },

  // Utilities: use native methods
  {
    name: "lodash",
    message: "Use native Array/Object methods",
  },
  {
    name: "underscore",
    message: "Use native Array/Object methods",
  },
  {
    name: "uuid",
    message: "Use crypto.randomUUID() — built into Node 19+",
  },
  {
    name: "nanoid",
    message: "Use crypto.randomUUID() — built into Node 19+",
  },

  // Database: use Drizzle ORM from @/db
  {
    name: "pg",
    message: "Use Drizzle ORM from @/db — do not use raw pg client",
  },
  {
    name: "postgres",
    message:
      "Use Drizzle ORM from @/db — do not use raw postgres client",
  },

  // HTTP: more banned fetch wrappers
  { name: "cross-fetch", message: "Use native fetch" },
  { name: "superagent", message: "Use native fetch" },

  // Framework: use Next.js API routes
  { name: "express", message: "Use Next.js API routes" },

  // Utilities: use clsx from @/lib/utils
  { name: "classnames", message: "Use clsx from @/lib/utils" },

  // Logging: use console or structured logging
  { name: "winston", message: "Use console or structured logging" },
  { name: "pino", message: "Use console or structured logging" },
];

// Shared banned import patterns
const BANNED_PATTERNS = [
  {
    group: ["lodash/*"],
    message: "Use native Array/Object methods",
  },
  {
    group: ["lodash-es/*"],
    message: "Use native Array/Object methods",
  },
  { group: ["moment/*"], message: "Use date-fns or Intl" },
  { group: ["axios/*"], message: "Use native fetch" },
  {
    group: ["embla-carousel-*"],
    message: "Use Swiper for carousels — Embla is banned",
  },
  {
    group: ["@project/types/*"],
    message: "Import from @project/types (barrel export)",
  },
  {
    group: ["@project/content-constraints/*"],
    message: "Import from @project/content-constraints (barrel export)",
  },
];

export default tseslint.config(
  // Global ignores — generated/copied code that agents must NOT touch
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/target/**",
      "**/dist/**",
      "**/.astro/**",
      "**/components/ui/**",
      "**/components/pro-blocks/**",
      "**/*.generated.*",
      "**/.velite/**",
      "**/.venv/**",
      "**/venv/**",
      "**/__pycache__/**",
      "apps/landing/src/content.config.ts",
      "apps/landing/src/content/landing-homepage.ts",
    ],
  },

  // Strict type-checked presets
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Unicorn plugin — code quality and modernization (T-ESLP-01, T-ESLP-02, T-ESLP-03)
  {
    plugins: { unicorn },
    rules: {
      ...unicorn.configs.recommended.rules,
      // Disabled rules (T-ESLP-02) — intentional deviations
      "unicorn/prevent-abbreviations": "off", // EXCEPTION: too noisy for common patterns
      "unicorn/no-null": "off", // EXCEPTION: null is valid in many APIs
      "unicorn/filename-case": "off", // EXCEPTION: Next.js conventions differ
      "unicorn/no-array-reduce": "off", // EXCEPTION: reduce is fine when readable
      "unicorn/no-array-for-each": "off", // EXCEPTION: forEach is fine for side effects
      "unicorn/prefer-module": "off", // EXCEPTION: CJS still needed in some configs
      "unicorn/prefer-node-protocol": "off", // EXCEPTION: node: prefix not universally supported
      "unicorn/no-useless-undefined": "off", // EXCEPTION: React hooks often need explicit undefined
      "unicorn/prefer-global-this": "off", // EXCEPTION: window is clearer in browser code
      "unicorn/prefer-export-from": "off", // EXCEPTION: not always cleaner
      "unicorn/no-empty-file": "off", // EXCEPTION: type barrel files can be empty
      "unicorn/no-keyword-prefix": "error",
      "unicorn/no-unused-properties": "error",
      "unicorn/require-post-message-target-origin": "error",
      // Extra hardening (T-ESLP-03) - beyond recommended
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/error-message": "error", // Require error messages
      "unicorn/throw-new-error": "error", // Require new when throwing
      "unicorn/catch-error-name": "error", // Consistent error naming
      "unicorn/prefer-type-error": "error", // TypeError for type errors
      "unicorn/no-nested-ternary": "error", // No nested ternaries
      "unicorn/prefer-string-slice": "error", // slice over substring
      "unicorn/prefer-array-find": "error", // find over filter[0]
      "unicorn/prefer-includes": "error", // includes over indexOf !== -1
      "unicorn/no-lonely-if": "error", // No lonely if in else
      "unicorn/no-negated-condition": "error", // Avoid negated conditions
      "unicorn/prefer-top-level-await": "off", // EXCEPTION: not always appropriate
    },
  },

  // Regexp plugin — safer regex patterns (T-ESLP-04, T-ESLP-05)
  {
    plugins: { regexp },
    rules: {
      ...regexp.configs.recommended.rules,
      // Extra hardening (T-ESLP-05)
      "regexp/no-super-linear-backtracking": "error",
      "regexp/no-control-character": "error",
      "regexp/no-octal": "error",
      "regexp/no-standalone-backslash": "error",
      "regexp/require-unicode-regexp": "error",
      "regexp/require-unicode-sets-regexp": "error",
      "regexp/prefer-named-capture-group": "error",
      "regexp/prefer-named-backreference": "error",
      "regexp/prefer-result-array-groups": "error",
      "regexp/prefer-escape-replacement-dollar-char": "error",
    },
  },

  // SonarJS plugin — code smell detection (T-ESLP-06)
  {
    plugins: { sonarjs },
    rules: {
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["error", { threshold: 5 }], // Higher threshold - config files repeat strings
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-collection-size-mischeck": "error",
      "sonarjs/no-empty-collection": "error",
      "sonarjs/no-element-overwrite": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-unused-collection": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/no-nested-switch": "error",
      "sonarjs/no-nested-template-literals": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/expression-complexity": "error",
      "sonarjs/no-async-constructor": "error",
      "sonarjs/no-hook-setter-in-body": "error",
      "sonarjs/no-useless-react-setstate": "error",
      "sonarjs/no-gratuitous-expressions": "error",
      "sonarjs/no-invariant-returns": "error",
      "sonarjs/prefer-immediate-return": "off", // EXCEPTION: often clearer with named variable
      "sonarjs/prefer-single-boolean-return": "error",
    },
  },

  // Tailwind-ban plugin - ban specific Tailwind classes (T-ESLP-12)
  // Configure denyList array when design-token restrictions are needed
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
    plugins: { "tailwind-ban": tailwindBan },
    rules: {
      // Currently no banned classes - add to denyList when design tokens mandate restrictions
      // Example: ["error", { denyList: ["bg-red-500", "text-blue-500"] }]
      "tailwind-ban/no-deny-tailwind-tokens": ["error", { denyList: [] }],
    },
  },

  {
    files: ["packages/ui/src/**/*.{ts,tsx}", "apps/web/src/**/*.{ts,tsx}"],
    plugins: { "tailwind-ban": tailwindBan },
    rules: {
      "tailwind-ban/no-deny-tailwind-tokens": ["error", { denyList: UI_TAILWIND_DENYLIST }],
    },
  },

  {
    files: ["packages/ui/src/**/*.{ts,tsx}"],
    rules: {
      "unicorn/no-keyword-prefix": "off", // EXCEPTION: `className` is standard React API in shared JSX components.
      "@next/next/no-html-link-for-pages": "off", // EXCEPTION: shared UI package is router-agnostic and not a Next app.
    },
  },

  // Parser options for type-checked rules
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        noWarnOnMultipleProjects: true,
      },
    },
  },

  // JS files do not participate in typed linting
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      "no-console": "error",
      "eqeqeq": ["error", "always"],
      "no-restricted-imports": [
        "error",
        {
          paths: [...BANNED_PATHS],
          patterns: [...BANNED_PATTERNS],
        },
      ],
    },
  },

  // JSX-A11y plugin — accessibility (T-ESLP-07, T-ESLP-08)
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      ...jsxA11y.configs.strict.rules,
      // Ensure key a11y rules are enabled (T-ESLP-08)
      "jsx-a11y/control-has-associated-label": "error",
      "jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: true }],
      "jsx-a11y/anchor-is-valid": "error",
    },
  },

  // React plugin — React best practices (T-ESLP-09)
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: { react },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // EXCEPTION: not needed with new JSX transform
      "react/react-in-jsx-scope": "off", // EXCEPTION: not needed with new JSX transform
      "react/no-unescaped-entities": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/self-closing-comp": "error",
      "react/void-dom-elements-no-children": "error",
    },
  },

  // React Hooks plugin — hooks rules
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },

  // Next.js plugin — Next-specific rules
  {
    files: ["**/*.tsx", "**/*.jsx", "**/*.ts"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      // pagesDir array covers all Next.js apps in monorepo
      "@next/next/no-html-link-for-pages": [
        "error",
        ["apps/web/src/app", "apps/landing/src/app"],
      ],
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-head-import-in-document": "error",
      "@next/next/no-duplicate-head": "error",
      "@next/next/google-font-display": "error",
      "@next/next/google-font-preconnect": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/no-title-in-document-head": "error",
    },
  },

  {
    files: ["packages/ui/src/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off", // EXCEPTION: shared UI package is router-agnostic and not a Next app.
      "@next/next/no-img-element": "off", // EXCEPTION: shared UI package owns framework-neutral image wrappers.
    },
  },

  // TypeScript rules — async safety + error handling + strict type safety
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Async bugs — real issues, not style
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",

      // Error handling — catch real bugs
      "no-empty": ["error", { allowEmptyCatch: false }],
      "no-throw-literal": "error",

      // Import hygiene — zero friction
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // Type safety
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Async safety
      "@typescript-eslint/require-await": "error",

      // Security — ban eval and Function constructor
      "no-restricted-globals": [
        "error",
        { name: "eval", message: "eval() is a code injection vector" },
        {
          name: "Function",
          message: "Function() constructor is a code injection vector",
        },
      ],

      // Code quality
      "no-console": "error",
      "no-param-reassign": "error",
      complexity: ["error", { max: 25 }],
      "max-lines": ["error", { max: 400, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": [
        "error",
        { max: 100, skipBlankLines: true, skipComments: true },
      ],

      // Unsafe-any family — block any from leaking
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",

      // Function signatures
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // Boolean/Promise discipline
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/promise-function-async": "error",

      // Type consistency
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Code quality
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-deprecated": "error",
      "@typescript-eslint/restrict-template-expressions": "error",

      // Equality
      "eqeqeq": ["error", "always"],

      // Dependency bans — wrong/outdated libraries
      "no-restricted-imports": [
        "error",
        {
          paths: [...BANNED_PATHS],
          patterns: [...BANNED_PATTERNS],
        },
      ],
    },
  },

  // Structural health — file-level limits and circular dependency detection
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "import-x": importPlugin },
    rules: {
      // Max import sources per file — prevents coupling creep
      "import-x/max-dependencies": ["error", { max: 15, ignoreTypeImports: true }],

      // Circular dependency detection — zero cycles allowed
      "import-x/no-cycle": ["error", { maxDepth: 5 }],
    },
  },

  // Test file overrides — relax quality rules for tests (T-ESLP-11)
  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**"],
    rules: {
      "max-lines": "off", // EXCEPTION: generated and config files exceed line caps
      "max-lines-per-function": "off", // EXCEPTION: generated and config files exceed line caps
      complexity: "off", // EXCEPTION: generated and config files exceed complexity caps
      "no-console": "off", // EXCEPTION: scripts and configs can print diagnostics
      "@typescript-eslint/explicit-function-return-type": "off", // EXCEPTION: config modules do not benefit from this
      "@typescript-eslint/no-explicit-any": "off", // EXCEPTION: tests often need boundary and fixture shims
      "@typescript-eslint/no-unsafe-assignment": "off", // EXCEPTION: config loading is intentionally dynamic
      "import-x/max-dependencies": "off", // EXCEPTION: config files aggregate plugins by design
    },
  },

  // Build/config scripts — relax unsafe-any rules (dynamic imports from untyped sources)
  {
    files: ["**/scripts/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off", // EXCEPTION: untyped build config imports are intentional
      "@typescript-eslint/no-unsafe-member-access": "off", // EXCEPTION: untyped build config imports are intentional
      "@typescript-eslint/no-unsafe-argument": "off", // EXCEPTION: untyped build config imports are intentional
      "@typescript-eslint/no-unsafe-call": "off", // EXCEPTION: untyped build config imports are intentional
      "@typescript-eslint/no-unsafe-return": "off", // EXCEPTION: untyped build config imports are intentional
    },
  },

  // process.env ban + dynamic RegExp ban — for all files EXCEPT env.ts and route files
  // Route files have their own combined no-restricted-syntax rule below
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/lib/env.ts", "**/app/api/**/route.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message: "Use env from @/lib/env instead of process.env directly",
        },
        {
          selector: "NewExpression[callee.name='RegExp']",
          message: "Dynamic RegExp is banned — use static regex literals or structured parsing (T-ESLP-15)",
        },
      ],
    },
  },

  // Route file restrictions — combined rule (ESLint flat config doesn't merge)
  // Bans raw route exports + process.env in a single no-restricted-syntax
  {
    files: ["**/app/api/**/route.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportNamedDeclaration > FunctionDeclaration",
          message:
            "Use withBody/withRoute/withPublicBody/withPublicRoute wrapper from @/lib/api",
        },
        {
          selector:
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression",
          message:
            "Use withBody/withRoute/withPublicBody/withPublicRoute wrapper from @/lib/api",
        },
        {
          selector:
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression",
          message:
            "Use withBody/withRoute/withPublicBody/withPublicRoute wrapper from @/lib/api",
        },
        {
          selector:
            "ExportNamedDeclaration[declaration=null] > ExportSpecifier",
          message:
            "Use withBody/withRoute/withPublicBody/withPublicRoute wrapper — do not re-export raw handlers",
        },
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message: "Use env from @/lib/env instead of process.env directly",
        },
        {
          selector: "NewExpression[callee.name='RegExp']",
          message: "Dynamic RegExp is banned — use static regex literals or structured parsing (T-ESLP-15)",
        },
      ],
    },
  },

  // Landing-specific import restrictions
  {
    files: ["apps/landing/**/*.ts", "apps/landing/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [...BANNED_PATHS],
          patterns: [
            ...BANNED_PATTERNS,
            {
              group: ["@project/spec", "@project/spec/*"],
              message: "Landing content must come from Astro content collections.",
            },
            {
              group: ["@project/validator-types", "@project/validator-types/*"],
              message: "Landing must not import from validator-types.",
            },
          ],
        },
      ],
    },
  },

  {
    files: ["apps/landing/mdx-components.tsx"],
    linterOptions: {
      reportUnusedDisableDirectives: "off", // EXCEPTION: package-local lint uses this suppression; root lint only needs to parse it.
    },
    plugins: { i18next },
    rules: {
      "i18next/no-literal-string": "error",
      "max-lines": "off", // EXCEPTION: the approved MDX component map must keep local Zod schemas beside wrappers.
    },
  },

  // Import boundary enforcement
  // Requires eslint-import-resolver-typescript to resolve @/ path aliases
  {
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
        },
      },
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "components",
          pattern: "src/components",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "velite",
          pattern: ".velite",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "domain",
          pattern: "src/modules/domain",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "commands",
          pattern: "src/modules/application/commands",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "adapters-inbound",
          pattern: "src/modules/adapters/inbound",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "adapters-outbound",
          pattern: "src/modules/adapters/outbound",
          mode: "folder",
          basePattern: "apps/*",
        },
        {
          type: "lib",
          pattern: "src/lib",
          mode: "folder",
          basePattern: "apps/*",
        },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          rules: [
            // Domain is pure — zero dependencies on other zones
            {
              from: "domain",
              disallow: ["components", "app", "commands", "adapters-inbound", "adapters-outbound", "lib"],
            },
            // Commands (application layer) — can use domain, adapters-outbound; no UI or inbound
            {
              from: "commands",
              disallow: ["components", "app", "adapters-inbound"],
            },
            // Adapters outbound (db, external services) — can use domain, lib
            {
              from: "adapters-outbound",
              disallow: ["components", "app", "commands", "adapters-inbound"],
            },
            // Adapters inbound (API wrappers) — can use domain, commands, adapters-outbound, lib
            {
              from: "adapters-inbound",
              disallow: ["components"],
            },
            // Components — can use lib, domain; no application/adapter/app imports
            {
              from: "components",
              disallow: ["commands", "adapters-inbound", "adapters-outbound", "app"],
            },
            // Lib — can use domain, adapters-outbound; no UI, no app, no commands
            {
              from: "lib",
              disallow: ["components", "app", "commands"],
            },
          ],
        },
      ],

      // Entry-point enforcement — only barrel exports (index.ts) are importable
      // Prevents deep imports like @domain/types/schemas/internal
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          rules: [
            // Exact barrel paths — add new entries when adding new submodules
            { target: "domain", allow: "types/index.ts" },
            { target: "commands", allow: "index.ts" },
            { target: "adapters-inbound", allow: "api/index.ts" },
            { target: "adapters-outbound", allow: "db/index.ts" },
            // lib, app, components, velite — no entry-point restriction
            { target: "lib", allow: "**" },
            { target: "app", allow: "**" },
            { target: "components", allow: "**" },
            { target: "velite", allow: "**" },
          ],
        },
      ],

      // External dependency control — per-layer npm package restrictions
      // Prevents agents from pulling in database clients in domain code, etc.
      "boundaries/external": [
        "error",
        {
          default: "allow",
          rules: [
            // Domain: only zod (for schema definitions)
            { from: "domain", disallow: ["*"] },
            { from: "domain", allow: ["zod"] },

            // Commands: only zod (for type inference) — all IO via injected adapters
            { from: "commands", disallow: ["*"] },
            { from: "commands", allow: ["zod"] },
          ],
        },
      ],
    },
  },

  // .mjs files — non-type-checked rules only (no parserOptions.project)
  // These contain real logic (velite.config, next.config) and must be linted,
  // but TypeScript type-checked rules require a tsconfig project reference.
  {
    files: ["**/*.mjs"],
    ignores: ["eslint.config.mjs"],
    rules: {
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      "no-console": "error",
      "eqeqeq": ["error", "always"],
      "no-restricted-imports": [
        "error",
        {
          paths: [...BANNED_PATHS],
          patterns: [...BANNED_PATTERNS],
        },
      ],
    },
  },

  // eslint.config.mjs — same rules but higher line limit (config files are inherently long)
  {
    files: ["eslint.config.mjs"],
    rules: {
      "max-lines": ["error", { max: 700, skipBlankLines: true, skipComments: true }],
      "no-console": "error",
      "eqeqeq": ["error", "always"],
      "sonarjs/no-duplicate-string": "off", // EXCEPTION: config files legitimately repeat strings
    },
  },

  // Drizzle config entrypoints are config files, not app source modules
  {
    files: ["**/drizzle.config.ts"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
  },

  // Web dashboard components + app routes: className prop is idiomatic JSX
  {
    files: [
      "apps/web/src/components/dashboard/**/*.tsx",
      "apps/web/src/components/link-provider.tsx",
      "apps/web/src/app/**/*.tsx",
    ],
    rules: {
      "unicorn/no-keyword-prefix": "off", // EXCEPTION: `className` prop is required by JSX
    },
  },

  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
  },
);
