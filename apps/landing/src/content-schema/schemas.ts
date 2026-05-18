import { z } from "astro/zod";

const nonEmptyString = z.string().min(1);
const shortText = z.string().min(1).max(96);
const hrefSchema = z.union([
  z.string().startsWith("/"),
  z.string().startsWith("#"),
  z.url(),
]);

const linkSchema = z.object({
  href: hrefSchema,
  label: shortText,
});

const metadataSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
});

const footerColumnSchema = z.object({
  heading: shortText,
  links: z.array(linkSchema).min(1),
});

const siteFooterSchema = z.object({
  body: nonEmptyString,
  columns: z.array(footerColumnSchema).min(1),
  legal: nonEmptyString,
  copyright: shortText,
});

const sectionHeadingSchema = z.object({
  eyebrow: shortText,
  title: nonEmptyString,
  mutedTitle: nonEmptyString.optional(),
  body: nonEmptyString.optional(),
});

const metricSchema = z.object({
  value: shortText,
  label: shortText,
});

const pointSchema = z.object({
  index: shortText,
  title: shortText,
  body: nonEmptyString,
});

const proofSchema = z.object({
  label: shortText,
  body: nonEmptyString,
});

const loopStepSchema = z.object({
  index: shortText,
  title: shortText,
  body: nonEmptyString,
  lines: z.array(nonEmptyString).min(1),
  tone: z.enum(["info", "ok", "fail"]),
});

const toolSchema = z.object({
  name: shortText,
  family: shortText,
  ecosystem: shortText,
  install: nonEmptyString,
  tagline: nonEmptyString,
  body: nonEmptyString,
  bullets: z.array(nonEmptyString).min(1),
  ctaLabel: shortText,
  url: z.url(),
});

export const homepageSchema = z.object({
  page: z.literal("home"),
  metadata: metadataSchema,
  brandName: shortText,
  githubUrl: z.url(),
  githubLabel: shortText,
  navLinks: z.array(linkSchema).min(1),
  hero: z.object({
    badge: shortText,
    title: nonEmptyString,
    accent: shortText,
    body: nonEmptyString,
    primaryCta: linkSchema,
    secondaryCta: linkSchema,
    githubCta: linkSchema,
    metrics: z.array(metricSchema).min(1),
  }),
  problem: sectionHeadingSchema.extend({
    points: z.array(pointSchema).min(1),
  }),
  approach: sectionHeadingSchema.extend({
    proofs: z.array(proofSchema).min(1),
  }),
  loop: sectionHeadingSchema.extend({
    loopLabel: shortText,
    steps: z.array(loopStepSchema).min(1),
    note: nonEmptyString,
  }),
  tools: sectionHeadingSchema.extend({
    ownerLabel: shortText,
    cta: linkSchema,
    items: z.array(toolSchema).min(1),
  }),
  footer: siteFooterSchema,
});

const manifestoBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraphs"),
    paragraphs: z.array(nonEmptyString).min(1),
  }),
  z.object({
    type: z.literal("pullquote"),
    body: nonEmptyString,
  }),
  z.object({
    type: z.literal("heading"),
    index: shortText,
    title: nonEmptyString,
  }),
  z.object({
    type: z.literal("proofs"),
    items: z.array(proofSchema).min(1),
  }),
  z.object({
    type: z.literal("loop"),
    items: z.array(pointSchema).min(1),
  }),
]);

export const manifestoSchema = z.object({
  page: z.literal("manifesto"),
  metadata: metadataSchema,
  brandName: shortText,
  githubUrl: z.url(),
  githubLabel: shortText,
  navLinks: z.array(linkSchema).min(1),
  label: shortText,
  meta: shortText,
  title: nonEmptyString,
  accent: shortText,
  lede: nonEmptyString,
  authorName: shortText,
  authorMeta: shortText,
  blocks: z.array(manifestoBlockSchema).min(1),
  end: z.object({
    eyebrow: shortText,
    title: nonEmptyString,
    mutedTitle: nonEmptyString,
    tools: z
      .array(toolSchema.pick({ name: true, body: true, url: true }))
      .min(1),
    homeCta: linkSchema,
    githubCta: linkSchema,
  }),
  footer: siteFooterSchema,
});

export const landingPageSchema = z.discriminatedUnion("page", [
  homepageSchema,
  manifestoSchema,
]);

export type HomepageContent = z.infer<typeof homepageSchema>;
export type ManifestoContent = z.infer<typeof manifestoSchema>;
export type SiteFooterContent = z.infer<typeof siteFooterSchema>;
export type ToolContent = z.infer<typeof toolSchema>;
