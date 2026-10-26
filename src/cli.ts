import { parseArgs } from "node:util"
import pkg from "../package.json"

export interface Io {
	out: (line: string) => void
	err: (line: string) => void
}

type Command = {
	summary: string
	run: (args: string[], io: Io) => number | Promise<number>
}

// Add a command here: one entry, one file under src/commands/ when it grows.
const commands: Record<string, Command> = {
	version: {
		summary: "Print the CLI version",
		run: (_args, io) => {
			io.out(pkg.version)
			return 0
		},
	},
}

function usage(): string {
	const width = Math.max(...Object.keys(commands).map((name) => name.length))
	const lines = Object.entries(commands).map(
		([name, cmd]) => `  ${name.padEnd(width)}  ${cmd.summary}`,
	)
	return ["Usage: excited <command> [options]", "", "Commands:", ...lines].join("\n")
}

/** Runs the CLI and returns the exit code. Never calls process.exit, so tests can drive it. */
export async function run(argv: string[], io: Io): Promise<number> {
	const { values, positionals } = parseArgs({
		args: argv,
		options: {
			help: { type: "boolean", short: "h" },
			version: { type: "boolean", short: "v" },
		},
		allowPositionals: true,
		strict: false,
	})

	if (values.version) return commands.version!.run([], io)

	const [name, ...rest] = positionals
	if (!name || values.help) {
		io.out(usage())
		return 0
	}

	const command = commands[name]
	if (!command) {
		io.err(`Unknown command: ${name}\n\n${usage()}`)
		return 1
	}
	return command.run(rest, io)
}
