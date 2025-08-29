// const myTable = {
// 	a: 3,
// 	b: 7,
// 	[6]: "six",
// 	func() {
// 		return this.a + this.b;
// 	},
// 	nestedTable: {
// 		z: "a string",
// 	},
// };

// myTable.a = 2;
// myTable["a"] = 2;

// let a = 5;
// let b = "hello";

// const PI = 3.14159;

// global.x = 42;
// x = 3;

// function add(x: number, y: number) {
// 	let result = x + y;
// 	return result;
// }

// function circleArea(r: number) {
// 	return PI * r * r;
// }

// for (let i = 0; i < 3; i++) {
// 	print("i =", i);
// }

// b = "new string";

// c = [1, 2, 3];
// c = [2, 4];

// add(2, 3 * global.da);
// add(2, 4, 5, 3, 2);

// for (let i = 0; i < 10; i++) {
// 	global.d = null;
// 	global.c = undefined;
// }

// class Person {
// 	name: string;
// 	age: number;
// 	lo: boolean;

// 	constructor(name: string, age: number) {
// 		this.name = name;
// 		this.age = age;
// 		this.lo = true;
// 	}

// 	greet() {
// 		print("hi, i'm " + this.name);
// 	}
// }

// const a = 10;

// if (a == 9 + 10) {
// 	print("YAY");
// } else {
// 	print("NO");
// }

const d: number[] = [];

d.apply((v) => {
	printl(`OK ${v}`);
});
