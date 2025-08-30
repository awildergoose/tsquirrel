interface MatchRange {
	begin: number;
	end: number;
}

interface Regexp {
	match(str: string): boolean;
	search(str: string, start?: number): MatchRange | null;
	capture(str: string, start?: number): MatchRange[] | null;

	readonly subexpcount: number;
}

declare global {
	function regexp(pattern: string): Regexp;
}

export {};
