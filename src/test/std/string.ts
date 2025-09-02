export function String(v: any): string {
	const t = typeOf(v);

	switch (t) {
		case "null":
			return "";
		case "integer":
		case "float":
		case "bool":
		case "string":
			return `${v}`;
		case "function":
			try {
				return String(v());
			} catch (e) {
				return "[function]";
			}
		case "array":
			return v.map(String).join("");
		case "table":
			return "[table]";
		case "instance":
		case "class":
			return "[object]";
		case "generator":
		case "thread":
			return `[${t}]`;
		case "userdata":
		case "weakref":
			return `[${t}]`;
		default:
			return "[unknown]";
	}
}
