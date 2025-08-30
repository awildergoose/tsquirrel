interface Math {
	abs(value: number): number;
	acos(angle: number): number;
	asin(angle: number): number;
	atan(value: number): number;
	atan2(y: number, x: number): number;
	ceil(value: number): number;
	cos(angle: number): number;
	exp(exponent: number): number;
	fabs(value: number): number;
	floor(value: number): number;
	log(value: number): number;
	log10(value: number): number;
	pow(base: number, exponent: number): number;
	rand(): number;
	sin(angle: number): number;
	sqrt(value: number): number;
	srand(seed: number): void;
	tan(angle: number): number;
}

declare global {
	declare let math: Math;
}

export {};
