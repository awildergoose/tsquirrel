import { Vector } from "../../types/valve";

export const VECTOR_ZERO = Vector(0, 0, 0);
export const VECTOR_ONE = Vector(1, 1, 1);

export const VECTOR_UP = Vector(0, 0, 1);
export const VECTOR_DOWN = Vector(0, 0, -1);

export const VECTOR_FORWARD = Vector(1, 0, 0);
export const VECTOR_BACK = Vector(-1, 0, 0);

export const VECTOR_LEFT = Vector(0, 1, 0);
export const VECTOR_RIGHT = Vector(0, -1, 0);

export function multiplyVector(a: Vector, b: Vector) {
	return Vector(a.x * b.x, a.y * b.y, a.z * b.z);
}

export function normalizeVector(vec: Vector): Vector {
	const length = sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
	if (length === 0) return Vector(0, 0, 0);
	return Vector(vec.x / length, vec.y / length, vec.z / length);
}
