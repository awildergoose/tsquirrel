import { blue, gray, green, red, yellow } from "colorette";

export default {
	info: (msg: string) => console.log(`${green("[INFO]")} ${msg}`),
	warn: (msg: string) => console.log(`${yellow("[WARN]")} ${msg}`),
	error: (msg: string) => console.log(`${red("[ERROR]")} ${msg}`),
	debug: (msg: string) => console.log(`${blue("[DEBUG]")} ${msg}`),
	trace: (msg: string) => {
		console.log(`${gray("[TRACE]")} ${msg}`);
		console.trace();
	},
	traceWarn: (msg: string) => {
		console.log(`${yellow("[WARN]")} ${msg}`);
		console.trace();
	},
};
