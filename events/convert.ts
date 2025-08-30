class ValveLexer {
	private pos = 0;
	private length: number;

	constructor(private text: string) {
		this.length = text.length;
	}

	nextToken(): string | "{" | "}" | null {
		while (this.pos < this.length) {
			const c = this.text[this.pos];

			if (/\s/.test(c)) {
				this.pos++;
				continue;
			}

			if (this.text.startsWith("//", this.pos)) {
				const newline = this.text.indexOf("\n", this.pos);
				this.pos = newline === -1 ? this.length : newline;
				continue;
			}

			if (this.text.startsWith("/*", this.pos)) {
				const end = this.text.indexOf("*/", this.pos + 2);
				if (end === -1) throw new Error("Unterminated /* comment");
				this.pos = end + 2;
				continue;
			}

			if (c === '"') {
				const end = this.text.indexOf('"', this.pos + 1);
				if (end === -1) throw new Error("Unterminated string");
				const token = this.text.slice(this.pos + 1, end);
				this.pos = end + 1;
				return token;
			}

			if (c === "{" || c === "}") {
				this.pos++;
				return c;
			}

			this.pos++;
		}

		return null;
	}
}

interface ValveBlock {
	[key: string]: string | ValveBlock;
}

function parseBlock(lexer: ValveLexer): ValveBlock {
	const obj: ValveBlock = {};
	while (true) {
		const key = lexer.nextToken();
		if (key === null) break;
		if (key === "}") return obj;

		const value = lexer.nextToken();
		if (value === null) throw new Error(`Unexpected EOF after key ${key}`);
		if (value === "{") {
			obj[key] = parseBlock(lexer);
		} else if (value === "}") {
			throw new Error(`Unexpected } after key ${key}`);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

async function parseValveFile(filePath: string): Promise<ValveBlock> {
	if (!(await Bun.file(filePath).exists()))
		throw new Error(`file ${filePath} doesn't exist!`);
	const text = await Bun.file(filePath).text();
	const lexer = new ValveLexer(text);
	const result: ValveBlock = {};

	while (true) {
		const key = lexer.nextToken();
		if (key === null) break;

		const value = lexer.nextToken();
		if (value === null) throw new Error(`Unexpected EOF after key ${key}`);

		result[key] = value === "{" ? parseBlock(lexer) : value;
	}

	return result;
}

async function main() {
	const file = process.argv[2];
	if (file === undefined)
		return console.error(
			"usage: bun convert.ts <filename> (without file extension)"
		);
	const inputFile = `${file}.res`;
	const outputFile = `${file}.json`;

	const data = await parseValveFile(inputFile);
	await Bun.file(outputFile).write(
		JSON.stringify(Object.values(data)[0], null, 4)
	);
}

main();
