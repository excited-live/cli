# AGENTS.md

Instructions for AI coding agents in `excited-live/cli`.

## Rules

1. Never commit to `main`. Branch (`feat/*`, `fix/*`, `docs/*`) and open a PR.
2. Never commit secrets or `.env` files.
3. Bun only: `bun install`, `bun test`, `bun run <script>`, Bun APIs over Node polyfills where Bun has one. No npm/pnpm/yarn lockfiles.
4. Keep the CLI deterministic: same input, same output. No hidden state outside what a command documents.
5. Tax math lives in `@excited-live/tax` (repo `excited-live/tax-core`). Import it; never copy or reimplement tax rules here.
6. Commands return exit codes through `run()`; only `src/index.ts` calls `process.exit`.
7. Done means `bun run check` passes (typecheck, tests, compiled build).
