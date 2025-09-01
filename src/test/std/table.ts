export function deepPrintTable(debugTable: any, prefix = "") {
	if (prefix === "") {
		print("{\n");
		prefix = "   ";
	}

	for (let [idx, val] of debugTable) {
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

	if (prefix === "   ") print("}\n");
}
