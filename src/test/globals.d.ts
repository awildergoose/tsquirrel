declare global {
	class Array<T = any> {
		constructor(size?: number);

		append(item: T): void;
		apply(fn: (item: T) => void): void;
		clear(): void;
		extend(other: Array<T>): void;
		filter(fn: (item: T) => boolean): Array<T>;
		find(value: T): number | null;
		insert(index: number, item: T): void;
		len(): number;
		map<U>(fn: (item: T) => U): Array<U>;
		pop(): T | undefined;
		push(item: T): void;
		reduce<U>(fn: (acc: U, item: T) => U, initial: U): U;
		remove(index: number): T | undefined;
		resize(newSize: number): void;
		reverse(): void;
		slice(start: number, end?: number): Array<T>;
		sort(compareFn?: (a: T, b: T) => number): void;
		top(): T | undefined;
	}

	class Boolean {
		tofloat(): number;
		tointeger(): number;
		tostring(): string;
	}

	// todo Integer and Float, somehow

	function printl(text: string): void;
}

export {};
