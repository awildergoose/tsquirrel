export function randRange(min: number, max?: number) {
	if (max === null) {
		max = min;
		min = 0;
	}

	printl(format("Min: %d Max: %d", min, max));

	const r = itof(rand()) / itof(RAND_MAX);
	return floor(r * (max! - min + 1)) + min;
}
