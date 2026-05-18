import { getEntry } from "astro:content";
import {
  homepageSchema,
  manifestoSchema,
  type HomepageContent,
  type ManifestoContent,
} from "../content-schema/schemas";
import contentPaths from "../content-paths.json";
import {
  invalidLandingPageContentError,
  missingLandingPageContentError,
} from "../diagnostics/internal-errors";

async function getLandingEntry(id: string): Promise<unknown> {
  const entry: unknown = await getEntry(contentPaths.landing.collection, id);

  if (entry === undefined) {
    throw missingLandingPageContentError(id);
  }

  return (entry as { data?: unknown }).data;
}

export async function getHomepage(): Promise<HomepageContent> {
  const page = await getLandingEntry(contentPaths.landing.homepageId);
  const parsed = homepageSchema.safeParse(page);

  if (!parsed.success) {
    throw invalidLandingPageContentError(contentPaths.landing.homepageId);
  }

  return parsed.data;
}

export async function getManifesto(): Promise<ManifestoContent> {
  const page = await getLandingEntry(contentPaths.landing.manifestoId);
  const parsed = manifestoSchema.safeParse(page);

  if (!parsed.success) {
    throw invalidLandingPageContentError(contentPaths.landing.manifestoId);
  }

  return parsed.data;
}
