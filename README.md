# excited

The excited.live command line. Bun only.

```bash
bun install
bun run dev -- --help     # run from source
bun test
bun run build             # single-file binary at dist/excited
bun run lint              # Biome, zero warnings
bun run format            # Biome format + import order, writes files
bun run check             # lint + typecheck + test + build, what CI runs
```

## Adding a command

Add an entry to `commands` in `src/cli.ts` (move it to `src/commands/<name>.ts`
once it grows) and a test in `src/cli.test.ts`. `run()` takes argv and an `Io`
and returns an exit code, so every command is testable without spawning a
process.
