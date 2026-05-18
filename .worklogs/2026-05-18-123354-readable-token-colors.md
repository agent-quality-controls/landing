# Summary

Updated the Agent QC UI text contrast tokens to match the design agency readability changes. The changes are limited to existing token values in `packages/ui/globals.css`.

# Decisions Made

- Changed `--ink-2` from `#a3a3a3` to `#d4d4d4`.
- Changed `--ink-3` from `#737373` to `#adadad`.
- Changed `--muted-foreground` from `#737373` to `#adadad`.
- Left `--ink-4` at `#404040` and documented it as decorative-only.
- Did not add or rename any tokens.

# Key Files For Context

- `packages/ui/globals.css`

# Verification

- `pnpm --filter @project/ui run validate`
- `pnpm --filter landing run validate`

# Next Steps

- Merge this branch into `main` when this visual update is ready to release.
