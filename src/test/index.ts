let myTable = {
	a: 3,
	b: 7,
	[6]: "six",
	func() {
		return this.a + this.b;
	},
	nestedTable: {
		z: "a string",
	},
};

myTable.a = 2;
myTable["a"] = 2;

const a = 5;
let b = "hello";

const PI = 3.14159;

// global.x = 42;
// x = 3;

function add(x: number, y: number) {
	let result = x + y;
	return result;
}

function circleArea(r: number) {
	return PI * r * r;
}

for (let i = 0; i < 3; i++) {
	print("i = " + i + "\n");
}

b = "new string";

let c = [1, 2, 3];
c = [2, 4];

add(2, 4);

for (let i = 0; i < 3; i++) {
	print("Hi!!!\n");
}

class Person {
	name: string;
	age: number;
	lo: boolean;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
		this.lo = true;
	}

	greet() {
		print("hi, i'm " + this.name);
	}
}

if (a == 9 + 10) {
	print("YAY");
} else {
	print("NO");
}

let d: number[] = [1, 2, 3];

d.apply((v) => {
	print(`ok ${v}!!\n`);
});

print("wah");
print(ftos(1.2));
