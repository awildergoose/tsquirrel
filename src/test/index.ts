import { randRange } from "./std/math";
import { Promise } from "./std/promise";
import { deepPrintTable } from "./std/table";

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

// const a = 5;
// let b = "hello";

// const PI = 3.14159;

// function add(x: number, y: number) {
// 	const result = x + y;
// 	return result;
// }

// print(`${ftos(acall(add, [{}, 3, 2]))}\n`);

// function circleArea(r: number) {
// 	return PI * r * r;
// }

// for (let i = 0; i < 3; i++) {
// 	print(`i = ${i}\n`);
// }

// b = "new string";

// let c = [1, 2, 3];
// c = [2, 4];

// add(2, 4);

// for (let i = 0; i < 3; i++) {
// 	print("Hi!!!\n");
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
// 		print(`hi, i'm ${this.name}`);
// 	}
// }

// if (a == 9 + 10) {
// 	print("YAY");
// } else {
// 	print("NO");
// }

// const d: number[] = [1, 2, 3];

// d.apply((v) => {
// 	print(`ok ${v}!!\n`);
// });

// print("wah");
// print(`${ftos(1.2)}\n`);
// print(format("Hello, world! %d\n", 5));

// let sometest = 5;
// sometest += 2;
// sometest -= 2;
// sometest *= 2;
// sometest /= 2;
// print(format("sometest: %d\n", sometest));

// function defaultTest(a = 5, b = 3) {
// 	print(format("%d %d\n", a, b));
// }

// defaultTest(1, 2);
// defaultTest(3);
// defaultTest();

// class Foo {
// 	static some: number;
// }

// let somenumber = 0;
// while (somenumber++ < 5) {
// 	print("what?\n");
// }

// const table: number[] = [1, 2, 3];
// for (const ent in table) {
// 	print(format("Hi %d\n", ent));
// }

// print(format("%s\n", type(table)));

// deepPrintTable({
// 	v: "hello",
// 	n: 2,
// 	t: true,
// 	we: {
// 		thrive: true,
// 		magically: {
// 			help: true,
// 		},
// 	},
// });

// const x = 3;

// if (2 + 3 === 5) {
// 	print("K");
// } else if (2 + 3 == 6) {
// 	print("L");
// } else if (x >= 3) {
// 	print("N");
// } else print("V");

// const v = Vector(2, 3, 5);
// v.mul(5);

hookGameEvent("infected_hurt", (params) => {
	deepPrintTable(params);
});

hookGameEvent("weapon_fire", (params) => {
	const player = GetPlayerFromUserID(params.userid);

	// pushPlayer(player, player.EyeAngles().Forward(), 2000);

	new Promise<number>((resolve, reject) => {
		// randRange here is undefined,
		// Could this be because it doesn't use `::randRange` in the compiled code?
		if (randRange(100) >= 50) resolve(randRange(100));
		else reject("Stupid!!");
	})
		.then((val) => {
			printl(format("promise returned: %d", val));
		})
		.andCatch((err) => {
			printl(format("FireError: %s", err));
		});

	// forEachPlayer((player) => {
	// 	player.TakeDamage(10, 1, player);
	// });
});
