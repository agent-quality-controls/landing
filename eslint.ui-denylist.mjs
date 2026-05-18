const HUES = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink",
  "rose", "slate", "gray", "zinc", "neutral", "stone",
];

const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const FAMILIES = [
  "accent", "bg", "border", "caret", "decoration", "divide", "fill", "from",
  "outline", "placeholder", "ring", "ring-offset", "shadow", "stroke", "text",
  "to", "via",
];

export const UI_TAILWIND_DENYLIST = FAMILIES.flatMap((family) =>
  HUES.flatMap((hue) => SHADES.map((shade) => `${family}-${hue}-${shade}`)),
);
