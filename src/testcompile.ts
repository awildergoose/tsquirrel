import { spawn } from "bun";
import { watch } from "fs";

const filename = "out.nut";
let timeout: NodeJS.Timeout | null = null;
let currentProc: ReturnType<typeof spawn> | null = null;

async function runScript() {
	if (currentProc) {
		// Kill previous process if still running
		currentProc.kill("SIGKILL");
	}

	currentProc = spawn(["bin/sq.exe", filename], {
		stdout: "pipe",
		stderr: "pipe",
	});

	(async () => {
		for await (const chunk of currentProc!.stdout! as ReadableStream) {
			process.stdout.write(chunk);
		}
	})();

	(async () => {
		for await (const chunk of currentProc!.stderr! as ReadableStream) {
			process.stderr.write(chunk);
		}
	})();

	const exitCode = await currentProc.exited;
	console.log(`\nProcess exited with code ${exitCode}`);
	currentProc = null;
}

// @ts-ignore fs types suck
watch(filename, async (watcher) => {
	for await (const _ of watcher) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => runScript(), 100);
	}
});

await runScript();
console.log(`Watching ${filename} for changes...`);
