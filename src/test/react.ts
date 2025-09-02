/** @jsx h */
/** @jsxFrag Fragment */

import { deepPrintTable } from "./std/table";

function String(v: any): string {
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

export type Child =
	| string
	| number
	| (() => string | number)
	| undefined
	| null
	| boolean;
export type VNode = { type: string; props: any; children: Child[] };

export function h(type: string, props: any, ...children: any[]): VNode {
	return { type: type, props: props || {}, children: flatten(children) };
}

export function Fragment(props: any, ...children: any[]) {
	return {
		type: "Fragment",
		props: props || {},
		children: flatten(children),
	};
}

function flatten(xs: any[]): any[] {
	const out: any[] = [];
	for (const x of xs) {
		if (typeOf(x) === "array") for (const y of flatten(x)) out.push(y);
		else out.push(x);
	}
	return out;
}

export function createSignal<T>(initial: T): [() => T, (v: T) => void] {
	let val = initial;
	return [
		() => val,
		(v: T) => {
			val = v;
		},
	];
}

function resolveSlot(sAsAny: any): number {
	if (sAsAny == null) return HUD_MID_TOP;
	if (typeOf(sAsAny) === "integer" || typeOf(sAsAny) === "float")
		return sAsAny;
	const key = String(sAsAny).tolower();
	const map: Record<string, number> = {
		middle_top: HUD_MID_TOP,
		mid_top: HUD_MID_TOP,
		middle_bottom: HUD_MID_BOT,
		mid_bottom: HUD_MID_BOT,
		left_top: HUD_LEFT_TOP,
		left_bottom: HUD_LEFT_BOT,
		right_top: HUD_RIGHT_TOP,
		right_bottom: HUD_RIGHT_BOT,
		ticker: HUD_TICKER,
		mid_box: HUD_MID_BOX,
		far_left: HUD_FAR_LEFT,
		far_right: HUD_FAR_RIGHT,
		score_title: HUD_SCORE_TITLE,
		score_1: HUD_SCORE_1,
		score_2: HUD_SCORE_2,
		score_3: HUD_SCORE_3,
		score_4: HUD_SCORE_4,
	};
	return map[key] || HUD_MID_TOP;
}

function normalizeDelims(s: string): string {
	let out = "";
	for (let i = 0; i < s.len(); i++) {
		const ch = s[i];
		if (ch === "|" || ch === "," || ch === " ") out += " ";
		else out += ch;
	}
	return out;
}

function splitTokens(f: any): string[] {
	if (typeOf(f) === "array") return f;
	const s = normalizeDelims(`${f}`);
	return split(s, " ");
}

function resolveFlags(f: any): number {
	if (f == null) return HUD_FLAG_NOBG + HUD_FLAG_ALIGN_CENTER;
	if (typeOf(f) === "integer") return f;

	const tokens = splitTokens(String(f));
	let out = 0;

	for (const tRaw of tokens) {
		const t = String(tRaw).tolower();
		if (!t) continue;

		if (t === "nobg" || t === "no-bg") {
			out = out + HUD_FLAG_NOBG;
		} else if (t === "center" || t === "align-center") {
			out = out + HUD_FLAG_ALIGN_CENTER;
		} else if (t === "left" || t === "align-left") {
			out = out + HUD_FLAG_ALIGN_LEFT;
		} else if (t === "right" || t === "align-right") {
			out = out + HUD_FLAG_ALIGN_RIGHT;
		} else if (t === "blink") {
			out = out + HUD_FLAG_BLINK;
		} else if (t === "beep") {
			out = out + HUD_FLAG_BEEP;
		} else if (t === "countdown-warn") {
			out = out + HUD_FLAG_COUNTDOWN_WARN;
		}
	}

	if (out === 0) {
		return HUD_FLAG_NOBG + HUD_FLAG_ALIGN_CENTER;
	}
	return out;
}

let _autoId = 0;
function nextId(prefix = "text") {
	_autoId++;
	return `${prefix}_${_autoId}`;
}

type Placement = { slot: number; x: number; y: number; w: number; h: number };

export function render(root: VNode) {
	const result = walk(root, null, {}, []);
	const fieldsOut = result.fields;
	const placementsOut = result.placements;

	const hudTable = { Fields: fieldsOut };
	HUDSetLayout(hudTable);

	for (let i = 0; i < placementsOut.len(); i++) {
		const p = placementsOut[i];
		HUDPlace(p.slot, p.x, p.y, p.w, p.h);
	}

	deepPrintTable(hudTable);
}

function walk(
	node: any,
	inheritedSlot: number | null,
	fieldsOut: Record<string, any>,
	placementsOut: Placement[]
): { fields: Record<string, any>; placements: Placement[] } {
	if (!node) return { fields: fieldsOut, placements: placementsOut };

	printl(node.type);

	var newFields = fieldsOut;
	var newPlacements = placementsOut;

	if (node.type === "Fragment" || node.type === "HUD") {
		for (var i = 0; i < node.children.len(); i++) {
			var c = node.children[i];
			if (typeOf(c) === "table") {
				var result = walk(c, inheritedSlot, newFields, newPlacements);
				newFields = result.fields;
				newPlacements = result.placements;
			}
		}
		return { fields: newFields, placements: newPlacements };
	}

	if (node.type === "Text") {
		var props = node.props || {};
		var name = props.name ? String(props.name) : nextId("text");
		var slot = resolveSlot("slot" in props ? props.slot : inheritedSlot);
		var flags = resolveFlags(
			"style" in props ? props.style : "flags" in props ? props.flags : ""
		);

		var updatedPlacements = newPlacements;
		if (
			props.x != null &&
			props.y != null &&
			props.w != null &&
			props.h != null
		) {
			// append without mutating original
			updatedPlacements.append({
				slot: slot,
				x: props.x,
				y: props.y,
				w: props.w,
				h: props.h,
			});
		}

		var getter = makeGetter(node.children);

		// append to fieldsOut immutably
		var updatedFields = {};
		for (let [k, v] of newFields as [any, any][]) updatedFields[k] = v; // shallow copy
		updatedFields[name] = {
			slot: slot,
			datafunc: getter,
			flags: flags,
			name: name,
		};

		deepPrintTable(updatedFields);
		return { fields: updatedFields, placements: updatedPlacements };
	}

	for (var j = 0; j < node.children.len(); j++) {
		var c2 = node.children[j];
		if (typeOf(c2) === "table") {
			var result2 = walk(c2, inheritedSlot, newFields, newPlacements);
			newFields = result2.fields;
			newPlacements = result2.placements;
		}
	}

	return { fields: newFields, placements: newPlacements };
}

function makeGetter(children: Child[]): () => string {
	return () => {
		let out = "";
		for (const ch of children) {
			if (ch == null || ch === true || ch === false) continue;
			if (typeOf(ch) === "function") {
				try {
					const v = (ch as any)();
					out += v == null ? "" : String(v);
				} catch (e) {
					printl("[getter error] " + e);
				}
			} else {
				out += String(ch);
			}
		}
		return out;
	};
}
