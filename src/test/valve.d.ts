declare global {
	interface Vector {
		Cross(factor: Vector): number;
		Length(): number;
	}

	// constructor
	declare const Vector: (x = 0, y = 0, z = 0) => Vector;

	/**
	 * Print to console with a new line
	 *
	 * @param {string} text Text to print
	 */
	function printl(text: string): void;
}

export {};
