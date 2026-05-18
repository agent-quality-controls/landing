# Goal

Release the Agent QC landing site to Railway in the same static Astro shape used by the SEOChecks landing service.

# Approach

- Add `railpack-landing.json` at the repository root with the same static Railpack build command as SEOChecks: `pnpm --filter landing build`.
- Add a small repository-level contract test that proves the app stays Railway-startable as static Astro:
  - `apps/landing/package.json` has Astro and React runtime dependencies.
  - `@astrojs/node` is not used.
  - `astro.config.mjs` remains `output: "static"`.
  - `railpack-landing.json` builds `pnpm --filter landing build` and has no custom start command.
  - Preview allowed hosts include `agent-qc.com` and `www.agent-qc.com`.
- Add a root test script for the contract test.
- Validate the app and UI package again.
- Commit the Railway contract work with a worklog.
- Push `development`.
- Create Railway project `agent-qc.com`.
- Add service `landing` linked to `agent-quality-controls/landing`.
- Set service variables:
  - `RAILPACK_CONFIG_FILE=railpack-landing.json`
  - `RAILPACK_SPA_OUTPUT_DIR=apps/landing/dist`
  - `HOST=0.0.0.0`
- Deploy the service and verify service status/domain output.

# Key Decisions

- Use static Railpack hosting, not Astro Node server output.
  - Matches the current SEOChecks landing release contract.
  - Avoids adding `@astrojs/node` and a production start command.
- Keep Railway config at repo root.
  - Matches the monorepo service pattern used by SEOChecks.
- Do not add custom domain DNS changes unless Railway returns the exact DNS record and the domain is ready to attach.

# Files To Modify

- `railpack-landing.json`
- `tests/tooling/landing-railway-contract.test.mjs`
- `package.json`
- `.worklogs/<timestamp>-railway-landing-release.md`
