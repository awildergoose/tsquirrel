import { blue, gray, green, red, yellow } from "colorette";

export default {
	info: (msg: any) => console.log(`${green("[INFO]")} ${msg}`),
	warn: (msg: any) => console.log(`${yellow("[WARN]")} ${msg}`),
	error: (msg: any) => console.log(`${red("[ERROR]")} ${msg}`),
	debug: (msg: any) => console.log(`${blue("[DEBUG]")} ${msg}`),
	trace: (msg: any) => {
		console.log(`${gray("[TRACE]")} ${msg}`);
		console.trace();
	},
	traceWarn: (msg: any) => {
		console.log(`${yellow("[WARN]")} ${msg}`);
		console.trace();
	},
};
