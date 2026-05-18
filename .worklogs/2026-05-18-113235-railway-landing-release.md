# Summary

Added the Railway static deployment contract for the Agent QC landing app. The service now has a root Railpack config and a contract test that matches the SEOChecks static Astro deployment shape.

# Decisions Made

- Used `railpack-landing.json` with `pnpm --filter landing build`.
- Kept the app as static Astro and did not add `@astrojs/node`.
- Added a repository-level test script so the Railway deployment contract is mechanically checked.

# Key Files For Context

- `railpack-landing.json`
- `tests/tooling/landing-railway-contract.test.mjs`
- `package.json`
- `apps/landing/package.json`
- `apps/landing/astro.config.mjs`

# Verification

- `pnpm test`
- `pnpm --filter @project/ui run validate`
- `pnpm --filter landing run validate`

# Next Steps

- Push `development`.
- Create Railway project `agent-qc.com`.
- Add `landing` service linked to `agent-quality-controls/landing`.
- Set `RAILPACK_CONFIG_FILE`, `RAILPACK_SPA_OUTPUT_DIR`, and `HOST`.
- Deploy and verify service status.
