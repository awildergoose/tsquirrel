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

declare const HUD_MID_TOP: number;
declare const HUD_MID_BOT: number;
declare const HUD_LEFT_TOP: number;
declare const HUD_LEFT_BOT: number;
declare const HUD_RIGHT_TOP: number;
declare const HUD_RIGHT_BOT: number;
declare const HUD_TICKER: number;
declare const HUD_MID_BOX: number;
declare const HUD_FAR_LEFT: number;
declare const HUD_FAR_RIGHT: number;
declare const HUD_SCORE_TITLE: number;
declare const HUD_SCORE_1: number;
declare const HUD_SCORE_2: number;
declare const HUD_SCORE_3: number;
declare const HUD_SCORE_4: number;

declare const HUD_FLAG_NOBG: number;
declare const HUD_FLAG_ALIGN_LEFT: number;
declare const HUD_FLAG_ALIGN_CENTER: number;
declare const HUD_FLAG_ALIGN_RIGHT: number;
declare const HUD_FLAG_BLINK: number;
declare const HUD_FLAG_BEEP: number;
declare const HUD_FLAG_COUNTDOWN_WARN: number;

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
	let fields: Record<string, any> = {};
	const placements: Placement[] = [];

	fields = walk(root, null, fields, placements);

	const hudTable = { Fields: fields };
	for (const p of placements) {
		HUDPlace(p.slot, p.x, p.y, p.w, p.h);
	}
	HUDSetLayout(hudTable);
	deepPrintTable(hudTable);
}

function walk(
	node: any,
	inheritedSlot: number | null,
	fieldsOut: Record<string, any>,
	placementsOut: Placement[]
): Record<string, any> {
	if (!node) return fieldsOut;

	printl(node.type);

	if (node.type === "Fragment" || node.type === "HUD") {
		for (const c of node.children) {
			if (typeOf(c) === "table") {
				fieldsOut = walk(c, inheritedSlot, fieldsOut, placementsOut);
			}
		}
		return fieldsOut;
	}

	if (node.type === "Text") {
		const props = node.props || {};
		const name = props.name ? String(props.name) : nextId("text");
		const slot = resolveSlot("slot" in props ? props.slot : inheritedSlot);
		const flags = resolveFlags(
			"style" in props ? props.style : props.flags
		);

		if (
			props.x != null &&
			props.y != null &&
			props.w != null &&
			props.h != null
		) {
			placementsOut.push({
				slot: slot,
				x: props.x,
				y: props.y,
				w: props.w,
				h: props.h,
			});
		}

		const getter = makeGetter(node.children);
		fieldsOut[name] = {
			slot: slot,
			datafunc: getter,
			flags: flags,
			name: name,
		};
		return fieldsOut;
	}

	for (const c of node.children) {
		if (typeOf(c) === "table") {
			fieldsOut = walk(c, inheritedSlot, fieldsOut, placementsOut);
		}
	}
	return fieldsOut;
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
