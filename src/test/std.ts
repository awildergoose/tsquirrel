export function deepPrintTable(debugTable: any, prefix = "") {
	if (prefix == "") {
		print(`${prefix}${debugTable}\n{\n`);
		prefix = "   ";
	}

	//@ts-ignore TS1091
	for (let idx, val in debugTable) {
		if (typeOf(val) === "table") {
			print(`${prefix}${idx} = \n${prefix}{\n`);
			deepPrintTable(val, `${prefix}   `);
			print(`${prefix}}\n`);
		} else if (typeOf(val) === "string") {
			print(`${prefix + idx}\t= "${val}"\n`);
		} else {
			print(`${prefix + idx}\t= ${val}\n`);
		}
	}

	if (prefix == "   ") print("}\n");
}
