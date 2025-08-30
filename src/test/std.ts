import { CBaseEntity } from "../types/l4d2";
import { Vector } from "../types/valve";

export const VECTOR_ZERO = Vector(0, 0, 0);

export const VECTOR_UP = Vector(0, 0, 1);
export const VECTOR_DOWN = Vector(0, 0, -1);

export const VECTOR_FORWARD = Vector(1, 0, 0);
export const VECTOR_BACK = Vector(-1, 0, 0);

export const VECTOR_LEFT = Vector(0, 1, 0);
export const VECTOR_RIGHT = Vector(0, -1, 0);

export const PI = 3.141592653589793;

export function deepPrintTable(debugTable: any, prefix = "") {
	if (prefix === "") {
		print("{\n");
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

	if (prefix === "   ") print("}\n");
}

export function multiplyVector(a: Vector, b: Vector) {
	return Vector(a.x * b.x, a.y * b.y, a.z * b.z);
}

export function normalizeVector(vec: Vector): Vector {
	const length = sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
	if (length === 0) return Vector(0, 0, 0);
	return Vector(vec.x / length, vec.y / length, vec.z / length);
}

export function getPlayerForward(player: CBaseEntity): Vector {
	return normalizeVector(player.GetForwardVector());
}

export function getPlayerRight(player: CBaseEntity): Vector {
	const forward = getPlayerForward(player);
	const right = Vector(forward.y, -forward.x, 0);
	return normalizeVector(right);
}

export function getPlayerLeft(player: CBaseEntity): Vector {
	const right = getPlayerRight(player);
	return right.mul(-1);
}

export function pushPlayer(
	player: CBaseEntity,
	dir: Vector,
	magnitude: number
) {
	const currentVel = player.GetVelocity();
	const push = dir.mul(magnitude);
	player.SetVelocity(Vector(push.x, push.y, currentVel.z));
}
