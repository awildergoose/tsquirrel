import { CBaseEntity } from "../types/l4d2";
import { Vector } from "../types/valve";

export const VECTOR_ZERO = Vector(0, 0, 0);
export const VECTOR_ONE = Vector(1, 1, 1);

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
	player.SetVelocity(currentVel.add(push));
}

export type Record<K extends string | number, V> = {
	[P in K]: V;
};

export class Promise<T> {
	private state: "pending" | "fulfilled" | "rejected" = "pending";
	private value: T | null = null;
	private reason: any = null;
	private handlers: ((val: T) => void)[] = [];
	private catchHandlers: ((err: any) => void)[] = [];

	constructor(
		executor: (
			resolve: (val: T) => void,
			reject: (err: any) => void
		) => void
	) {
		const resolve = (val: T) => {
			if (this.state !== "pending") return;
			this.state = "fulfilled";
			this.value = val;
			for (const h of this.handlers) h(val);
		};

		const reject = (err: any) => {
			if (this.state !== "pending") return;
			this.state = "rejected";
			this.reason = err;
			for (const h of this.catchHandlers) h(err);
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(
		onFulfilled: (val: T) => void,
		onRejected?: (err: any) => void
	): Promise<T> {
		if (this.state === "fulfilled" && this.value != null) {
			onFulfilled(this.value);
		} else if (this.state === "rejected" && onRejected) {
			onRejected(this.reason);
		} else {
			this.handlers.push(onFulfilled);
			if (onRejected) this.catchHandlers.push(onRejected);
		}

		return this;
	}

	andCatch(onRejected: (err: any) => void): Promise<T> {
		if (this.state === "rejected") {
			onRejected(this.reason);
		} else {
			this.catchHandlers.push(onRejected);
		}
		return this;
	}
}

export class Set<T> {
	private _arr: T[] = [];

	add(val: T) {
		if (!this.has(val)) this._arr.push(val);
	}

	del(val: T) {
		for (let i = 0; i < this._arr.len(); i++)
			if (this._arr[i] == val) {
				this._arr.remove(i);
				return true;
			}
		return false;
	}

	has(val: T) {
		for (let i = 0; i < this._arr.len(); i++)
			if (this._arr[i] == val) return true;
		return false;
	}

	forEach(fn: (val: T) => void) {
		for (let i = 0; i < this._arr.len(); i++) fn(this._arr[i]);
	}

	values(): T[] {
		return this._arr;
	}
}

export class Map<K extends string | number, V> {
	private table: Record<string, V> = {} as Record<string, V>;

	set(key: K, value: V): void {
		this.table[key as string] = value;
	}

	get(key: K): V | null {
		const val = this.table[key as string];
		return val !== undefined ? val : null;
	}

	has(key: K): boolean {
		return this.table[key as string] !== undefined;
	}

	del(key: K): boolean {
		const k = key;
		if (this.table[k as string] !== undefined) {
			delete this.table[k as string];
			return true;
		}
		return false;
	}

	clear(): void {
		this.table = {} as Record<string, V>;
	}

	keys(): K[] {
		const result: any[] = [];
		for (const k in this.table) {
			result.push(k);
		}
		return result as K[];
	}

	values(): V[] {
		const result: V[] = [];
		for (const k in this.table) {
			result.push(this.table[k]);
		}
		return result;
	}

	entries(): [K, V][] {
		const result: [K, V][] = [];
		for (const k in this.table) {
			result.push([k as K, this.table[k]]);
		}
		return result;
	}

	forEach(callback: (value: V, key: K) => void): void {
		for (const k in this.table) {
			callback(this.table[k], k as K);
		}
	}
}
