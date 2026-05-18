import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { landingPageSchema } from "./content-schema/schemas";
import contentPaths from "./content-paths.json";

function landingEntryId(entry: string): string {
  const fileName = entry.startsWith(contentPaths.landing.entryPrefix)
    ? entry.slice(contentPaths.landing.entryPrefix.length)
    : entry;

  return fileName.endsWith(contentPaths.extensions.json)
    ? fileName.slice(0, -contentPaths.extensions.json.length)
    : fileName;
}

const landing = defineCollection({
  loader: glob({
    pattern: contentPaths.landing.pattern,
    base: contentPaths.base,
    generateId: ({ entry }) => landingEntryId(entry),
  }),
  schema: landingPageSchema,
});

export const collections = { landing };
