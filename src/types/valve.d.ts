export interface Vector {
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

export interface QAngle {
	/**
	 * Returns the Forward Vector of the angles.
	 * @returns Vector
	 */
	Forward(): Vector;

	/**
 * Returns the left Vector of the angles.
Bug*:
Returns right Vector instead
 * @returns Vector
 */
	Left(): Vector;

	/**
	 * Returns the pitch angle in degrees.
	 * @returns float
	 */
	Pitch(): number;

	/**
	 * Returns the roll angle in degrees.
	 * @returns float
	 */
	Roll(): number;

	/**
 * Returns a string with the values separated by one space.
Tip:
Use this with the angles key when using the SpawnEntityWithTable function.
 * @returns string
 */
	ToKVString(): string;

	/**
	 * Returns a quaternion representaion of the orientation.
	 * @returns Quaternion
	 */
	ToQuat(): Quaternion;

	/**
	 * Returns the Up Vector of the angles.
	 * @returns Vector
	 */
	Up(): Vector;

	/**
	 * Returns the yaw angle in degrees.
	 * @returns float
	 */
	Yaw(): number;

	/**
	 * Pitch in degrees.
	 */
	x: number;
	/**
	 * Yaw in degrees.
	 */
	y: number;
	/**
	 * Roll in degrees.
	 */
	z: number;

	/**
	 * Sum of both classes's members (XYZ).
	 * @param other
	 */
	add(other: QAngle): QAngle;
	/**
	 * Subtraction of both classes's members (XYZ).
	 * @param other
	 */
	sub(other: QAngle): QAngle;
	/**
	 * QAngle multiplied by a number.
	 * @param scalar
	 */
	mul(scalar: number): QAngle;
}

export interface Vector2D {
	/**
	 * The scalar product of two vectors.
	 * @param factor Vector2D
	 * @returns float
	 */
	Dot(factor: Vector2D): number;

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
	 * Seems to also return the vector length.
	 * @returns float
	 */
	Norm(): number;

	/**
	 * Returns a string without separations commas.
	 * @returns string
	 */
	ToKVString(): string;

	/**
	 * Cartesian X axis.
	 */
	x: number;
	/**
	 * Cartesian Y axis.
	 */
	y: number;

	/**
	 * Returns the sum of both classes's members (XYZ).
	 * @param other
	 */
	add(other: Vector2D): Vector2D;
	/**
	 * Returns the subtraction of both classes's members (XYZ).
	 * @param other
	 */
	sub(other: Vector2D): Vector2D;
	/**
	 * Returns the multiplication of the given Vector variant against a scalar.
	 * @param scalar
	 */
	mul(scalar: number): Vector2D;
}

export interface Vector4D {
	/**
	 * The scalar product of two vectors.
	 * @param factor Vector4D
	 * @returns float
	 */
	Dot(factor: Vector4D): number;

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
	 * Seems to also return the vector length.
	 * @returns float
	 */
	Norm(): number;

	/**
	 * Returns a string without separations commas.
	 * @returns string
	 */
	ToKVString(): string;

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
	 * Component for possibly creating homogeneous coordinates?
	 */
	w: number;

	/**
	 * Returns the sum of both classes's members (XYZ).
	 * @param other
	 */
	add(other: Vector4D): Vector4D;
	/**
	 * Returns the subtraction of both classes's members (XYZ).
	 * @param other
	 */
	sub(other: Vector4D): Vector4D;
	/**
	 * Returns the multiplication of the given Vector variant against a scalar.
	 * @param scalar
	 */
	mul(scalar: number): Vector4D;
}

export interface Quaternion {
	/**
	 * The 4D scalar product of two quaternions. represents the angle between the quaternions in the range [1, 0].
	 * @param factor Quaternion
	 * @returns float
	 */
	Dot(factor: Quaternion): number;

	/**
	 * Returns a quaternion with the complimentary rotation.
	 * @returns Quaternion
	 */
	Invert(): Quaternion;

	/**
 * Normalizes the 4D vector length.
Todo: 	What effect does this have in quaternions?
 * @returns Quaternion
 */
	Norm(): Quaternion;

	/**
	 * Recomputes the quaternion from the supplied Euler angles.
	 * @param pitch float
	 * @param yaw float
	 * @param roll float
	 * @returns void
	 */
	SetPitchYawRoll(pitch: number, yaw: number, roll: number): void;

	/**
	 * Returns a string with the values separated by one space.
	 * @returns string
	 */
	ToKVString(): string;

	/**
	 * Returns the angles resulting from the rotation.
	 * @returns QAngle
	 */
	ToQAngle(): QAngle;

	/**
	 * Vector component along the i axis.
	 */
	x: number;
	/**
	 * Vector component along the j axis.
	 */
	y: number;
	/**
	 * Vector component along the k axis.
	 */
	z: number;
	/**
	 * Scalar part.
	 */
	w: number;

	/**
	 * Sum of the two Quaternions.
	 * @param other
	 */
	add(other: Quaternion): Quaternion;
	/**
	 * Subtraction of the two Quaternions.
	 * @param other
	 */
	sub(other: Quaternion): Quaternion;
	/**
	 * Quaternion multiplied by a number.
	 * @param scalar
	 */
	mul(scalar: number): Quaternion;
}

declare global {
	/**
	 * Creates a new vector with the specified Cartesian coordiantes.
	 */
	declare const Vector: (x = 0, y = 0, z = 0) => Vector;
	/**
	 * Creates a new QAngle.
	 */
	declare const QAngle: (pitch = 0, yaw = 0, roll = 0) => QAngle;
	/**
	 * Creates a new quaternion of the form: w + xi + yj + zk.
	 */
	declare const Quaternion: (x = 0, y = 0, z = 0, w = 0) => Quaternion;

	/**
	 * Print to console with a new line
	 *
	 * @param {string} text Text to print
	 */
	function printl(text: string): void;
}

export {};
