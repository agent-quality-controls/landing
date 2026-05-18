/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
  ],
  plugins: ["@double-great/stylelint-a11y"],
  rules: {
    // Accessibility rules
    "a11y/content-property-no-static-value": true,
    "a11y/font-size-is-readable": true,
    "a11y/line-height-is-vertical-rhythmed": true,
    "a11y/media-prefers-reduced-motion": true,
    "a11y/no-display-none": true,
    "a11y/no-obsolete-attribute": true,
    "a11y/no-obsolete-element": true,
    "a11y/no-spread-text": true,
    "a11y/no-outline-none": true,
    "a11y/no-text-align-justify": true,
    "a11y/selector-pseudo-class-focus": true,

    // Tailwind-specific: allow @apply, @theme, @custom-variant etc.
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "source",
          "config",
          "theme",
          "custom-variant",
          "plugin",
          "responsive",
          "variants",
          "screen",
        ],
      },
    ],

    // Allow CSS custom properties without strict naming
    "custom-property-pattern": null,
    "custom-property-empty-line-before": null,

    // Disable oklch notation rules - shadcn generates decimal format
    "color-hex-length": null,
    "lightness-notation": null,
    "hue-degree-notation": null,
    "number-max-precision": null,
    "value-keyword-case": null,
    "declaration-empty-line-before": null,

    // Allow Tailwind's CSS variable function syntax
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.css"],
      customSyntax: "postcss",
    },
    {
      files: ["packages/ui/globals.css"],
      rules: {
        "color-hex-length": null,
        "custom-property-empty-line-before": null,
        "declaration-empty-line-before": null,
        "number-max-precision": null,
        "rule-empty-line-before": null,
        "value-keyword-case": null,
      },
    },
  ],
};
