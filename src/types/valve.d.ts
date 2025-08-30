declare global {
	interface Vector {
		/**
		 * The vector product of two vectors. Returns a vector orthogonal to the input vectors.
		 * @param factor Vector
		 * @returns float
		 */
		Cross(factor: Vector): number;

		/**
		 * The scalar product of two vectors.
		 * @param factor Vector
		 * @returns float
		 */
		Dot(factor: Vector): number;

		/**
		 * Magnitude of the vector.
		 * @returns float
		 */
		Length(): number;

		/**
		 * The magnitude of the vector squared. Faster than the above method.
		 * @returns float
		 */
		LengthSqr(): number;

		/**
		 * Returns the magnitude of the vector on the x-y plane. Meant to be used when working with the client's HUD.
		 * @returns float
		 */
		Length2D(): number;

		/**
		 * Returns the square of the magnitude of the vector on the x-y plane. Faster than the above method.
		 * @returns float
		 */
		Length2DSqr(): number;

		/**
		 * Seems to also return the vector length.
		 * @returns float
		 */
		Norm(): number;

		/**
		 * Scales the vector magnitude.
		 * @param factor float
		 * @returns Vector
		 */
		Scale(factor: number): Vector;

		/**
 * Returns a string without separations commas.
Note:
Not required for the SpawnEntityWithTable function, as it understands the Vector data type.
 * @returns string
 */
		ToKVString(): string;

		/**
		 * Returns a human readable string.
		 * @returns string
		 */
		tostring(): string;

		/**
		 * Cartesian X axis.
		 */
		x: number;
		/**
		 * Cartesian Y axis.
		 */
		y: number;
		/**
		 * Cartesian Z axis.
		 */
		z: number;

		/**
		 * Returns the sum of both classes's members (XYZ).
		 * @param other
		 */
		add(other: Vector): Vector;
		/**
		 * Returns the subtraction of both classes's members (XYZ).
		 * @param other
		 */
		sub(other: Vector): Vector;
		/**
		 * Returns the multiplication of a Vector against a scalar.
		 * @param scalar
		 */
		mul(scalar: number): Vector;
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
