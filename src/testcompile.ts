import { ChildProcessByStdio, spawn } from "child_process";
import { watch } from "fs";
import Stream from "stream";

const filename = "out.nut";
let timeout: NodeJS.Timeout | null = null;
let currentProc: ChildProcessByStdio<
	null,
	Stream.Readable,
	Stream.Readable
> | null = null;

async function runScript() {
	if (currentProc) currentProc.kill("SIGKILL");

	currentProc = spawn("bin/sq.exe", [filename], {
		stdio: ["ignore", "pipe", "pipe"],
	});

	currentProc.stdout.on("data", (chunk) => {
		process.stdout.write(chunk);
	});

	currentProc.stderr.on("data", (chunk) => {
		process.stderr.write(chunk);
	});

	currentProc.on("close", (code) => {
		console.log(`\nProcess exited with code ${code}`);
		currentProc = null;
	});
}

watch(filename, () => {
	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(() => runScript(), 100);
});

runScript();
console.log(`Watching ${filename} for changes...`);
