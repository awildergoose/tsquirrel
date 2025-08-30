type HookArgsMap = {
	Update: [];
	OnPlayerConnect: [player: any];
};

export type KnownHook = keyof HookArgsMap;
export type Hook = KnownHook | (string & {});

export type SquirrelType =
	| "null"
	| "integer"
	| "float"
	| "string"
	| "bool"
	| "table"
	| "array"
	| "function"
	| "generator"
	| "class"
	| "instance"
	| "thread"
	| "userdata"
	| "weakref";

declare global {
	class Array<T = any> {
		[n: number]: T;

		append(value: T): void;
		apply(fn: (value: T) => void): void;
		clear(): void;
		extend(other: Array<T>): void;
		filter(fn: (index: number, value: T) => boolean): Array<T>;
		find(value: T): number | null;
		insert(index: number, value: T): void;
		len(): number;
		map<U>(fn: (value: T) => U): Array<U>;
		pop(): T | undefined;
		push(value: T): void;
		reduce<U>(fn: (acc: U, value: T) => U, initial: U): U;
		remove(index: number): T | undefined;
		resize(newSize: number, fillValue?: T): void;
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

	class String {
		find(searchString: string, startIndex: number): number | null;
		len(): number;
		slice(startIndex: number, endIndex?: number): string;
		tofloat(): number;
		tointeger(): number;
		tolower(): string;
		toupper(): string;
	}

	/**
	 * Format specifiers:
	 *
	 * | Spec | Type    | Description                          |
	 * |------|---------|--------------------------------------|
	 * | `%x` | Integer | Hexadecimal (lower-case)             |
	 * | `%X` | Integer | Hexadecimal (upper-case)             |
	 * | `%u` | Integer | Unsigned decimal                     |
	 * | `%o` | Integer | Octal                                |
	 * | `%i` | Integer | Signed decimal                       |
	 * | `%d` | Integer | Signed decimal                       |
	 * | `%f` | Float   | Floating point                       |
	 * | `%e` | Float   | Scientific notation                  |
	 * | `%g` | Float   | Shortest representation (%e or %f)   |
	 * | `%s` | String  | String                               |
	 * | `%c` | Integer | Character                            |
	 * | `%%` | N/A     | Percentage symbol                    |
	 *
	 * @param text String to format
	 * @param values Values to substitute
	 */
	function format(text: string, ...values: any[]): string;
	/**
	 * Strip all whitespace from the start of the string
	 *
	 * @param {string} text string to strip
	 * @returns {string} Stripped string
	 */
	function lstrip(text: string): string;
	/**
	 * Strip all whitespace from the end of the string
	 *
	 * @param {string} text String to strip
	 * @returns {string} Stripped string
	 */
	function rstrip(text: string): string;
	/**
	 * Split a string by a delimiter
	 *
	 * @param {string} text String to split
	 * @param {string} delimiter Delimiter to split the string by
	 * @returns {Array<String>} Array containing the string split by the delimiter
	 */
	function split(text: string, delimiter: string): Array<String>;
	/**
	 * Strip all whitespace from both sides of the string
	 *
	 * @param {string} text String to strip
	 * @returns {string} Stripped string
	 */
	function strip(text: string): string;

	// standard
	function array(size: number, fill?: any): any[];
	function assert(condition: boolean): void;
	function callee(): Function;
	function collectgarbage(): number;
	function resurrectunreachable(): any[] | null;
	function compilestring(code: string, bufferName?: string): Function;
	function enabledebuginfo(enable: any): void;
	function error(message: string): void;
	function seterrorhandler(handler: Function): void;
	function getconsttable(): Record<string, any>;
	function setconsttable(
		constTable: Record<string, any>
	): Record<string, any>;
	function getroottable(): Record<string, any>;
	function setroottable(rootTable: Record<string, any>): Record<string, any>;
	function getstackinfos(stackLevel: number): Record<string, any> | null;
	function newthread(threadFunc: Function): Generator;
	function suspend(returnValue: any): void;
	function type(obj: any): string;

	// Compiler-specific
	declare function hook<K extends KnownHook>(
		to: K,
		callback: (...args: HookArgsMap[K]) => void
	): void;

	declare function hook(to: string, callback: (...args: any[]) => void): void;

	// Standard library
	function acall(fn: Function, args: any[]): any;
	function bindenv(fn: Function, contextObject: any): any;
	function pacall(fn: Function, arguments: any[]): any;

	/**
	 * Print to console without a new line
	 *
	 * @param {unknown} text What to print
	 */
	function print(text: unknown): void;

	/**
	 * Convert a float to an integer
	 *
	 * @param {number} float Float to convert
	 * @returns {string} Float as an integer
	 */
	function ftoi(float: number): number;
	/**
	 * Convert a float to a string
	 *
	 * @param {number} float Float to convert
	 * @returns {string} Float as a string
	 */
	function ftos(float: number): string;
	/**
	 * Convert a float to a character
	 *
	 * @param {number} float Float to convert
	 * @returns {string} Float as a character
	 */
	function ftoc(float: number): string;

	/**
	 * Convert an integer to a character
	 *
	 * @param {number} int Number to convert
	 * @returns {string} Number as a character
	 */
	function itoc(int: number): string;
	/**
	 * Convert an integer to a float
	 *
	 * @param {number} int Number to convert
	 * @returns {number} Number as a string
	 */
	function itof(int: number): number;
	/**
	 * Convert an integer to a string
	 *
	 * @param {number} int Number to convert
	 * @returns {string} Number as a string
	 */
	function itos(int: number): string;

	/**
	 * Equivalent of Squirrel's typeof
	 * @param obj
	 */
	function typeOf(obj: any): SquirrelType;
}

export {};
