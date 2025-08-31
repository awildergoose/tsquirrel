export const PI = 3.141592653589793;

export function randRange(min: number, max?: number) {
	if (max === null) {
		max = min;
		min = 0;
	}

	return floor(rand() * (max! - min + 1)) + min;
}
