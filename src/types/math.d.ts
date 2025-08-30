declare global {
	function abs(value: number): number;
	function acos(angle: number): number;
	function asin(angle: number): number;
	function atan(value: number): number;
	function atan2(y: number, x: number): number;
	function ceil(value: number): number;
	function cos(angle: number): number;
	function exp(exponent: number): number;
	function fabs(value: number): number;
	function floor(value: number): number;
	function log(value: number): number;
	function log10(value: number): number;
	function pow(base: number, exponent: number): number;
	function rand(): number;
	function sin(angle: number): number;
	function sqrt(value: number): number;
	function srand(seed: number): void;
	function tan(angle: number): number;
}

export {};
