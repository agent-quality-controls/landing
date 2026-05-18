import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testFilePath = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(testFilePath), "../..");

test("landing is shaped as a Railway-startable static Astro service", async () => {
  const packagePath = path.join(rootDir, "apps/landing/package.json");
  const astroConfigPath = path.join(rootDir, "apps/landing/astro.config.mjs");
  const railpackPath = path.join(rootDir, "railpack-landing.json");

  const [packageSource, astroConfigSource, railpackSource] = await Promise.all([
    readFile(packagePath, "utf8"),
    readFile(astroConfigPath, "utf8"),
    readFile(railpackPath, "utf8"),
  ]);

  const manifest = JSON.parse(packageSource);
  const railpack = JSON.parse(railpackSource);

  assert.equal(manifest.dependencies?.astro !== undefined, true);
  assert.equal(manifest.dependencies?.["@astrojs/react"] !== undefined, true);
  assert.equal(manifest.dependencies?.["@astrojs/node"], undefined);
  assert.equal(manifest.scripts.start, undefined);
  assert.match(manifest.scripts.preview, /astro preview/v);
  assert.match(
    manifest.scripts.preview,
    /--allowed-hosts agent-qc\.com,www\.agent-qc\.com/v,
  );
  assert.match(astroConfigSource, /output: "static"/v);
  assert.doesNotMatch(astroConfigSource, /@astrojs\/node/v);

  assert.equal(railpack.provider, "node");
  assert.deepEqual(railpack.steps.build.commands, [
    "pnpm --filter landing build",
  ]);
  assert.equal(railpack.deploy?.startCommand, undefined);
});
