// Run this in your browser in
// https://developer.valvesoftware.com/wiki/Left_4_Dead_2/Scripting/Script_Functions#Hooks_5
// Make sure to set the id of the table you're trying to generate the types of
// After that, do `generateTSFromTable("tableId")`
useFunction = false;

function mapType(t) {
	switch (t.toLowerCase()) {
		case "bool":
			return "boolean";
		case "int":
			return "number";
		case "float":
			return "number";
		case "string":
			return "string";
		case "void":
			return "void";
		case "handle":
			return "SquirrelHandle";
		default:
			return t;
	}
}

function generateTSFromTable(tableId) {
	const table = document.getElementById(tableId);
	if (!table) {
		console.error("Table not found:", tableId);
		return;
	}

	const rows = table.querySelectorAll("tr");
	let output = "";

	rows.forEach((row, idx) => {
		if (idx === 0) return;

		const cells = row.querySelectorAll("td");
		if (cells.length < 3) return;

		const funcNames = cells[0].innerText
			.trim()
			.split(/\n/)
			.map((s) => s.trim());
		const signature = cells[1].innerText.trim();
		const description = cells[2].innerText.trim();

		funcNames.forEach((funcName) => {
			if (!funcName) return;

			const match = signature.match(/^(.*?)\s+(\w+)\((.*?)\)$/);
			if (!match) return;

			let [, returnType, name, params] = match;
			returnType = returnType.trim();
			name = funcName;

			let args = [];
			if (params && params.trim() !== "") {
				args = params.split(",").map((p) => {
					let [type, pname] = p.trim().split(/\s+/);
					return {
						type: type || "any",
						name: (pname || "arg").replace(/[<>]/g, ""),
					};
				});
			}

			// generate jsdoc
			output += `/**\n * ${description}\n`;
			args.forEach((arg) => {
				output += ` * @param ${arg.name} ${arg.type}\n`;
			});
			output += ` * @returns ${returnType}\n`;
			output += ` */\n`;

			const argStr = args
				.map((arg) => `${arg.name}: ${mapType(arg.type)}`)
				.join(", ");
			output += `${
				useFunction ? "function " : ""
			}${name}(${argStr}): ${mapType(returnType)};\n\n`;
		});
	});

	console.log(output);
}
