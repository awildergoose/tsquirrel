export function randRange(min: number, max?: number) {
	if (max === null) {
		max = min;
		min = 0;
	}

	const r = itof(rand()) / itof(RAND_MAX);
	return floor(r * (max! - min + 1)) + min;
}
