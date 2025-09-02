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

import { createSignal, h, render } from "./react";

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

// hookGameEvent("infected_hurt", (params) => {
// 	deepPrintTable(params);
// });

// hookGameEvent("weapon_fire", (params) => {
// 	const player = GetPlayerFromUserID(params.userid);

// 	// pushPlayer(player, player.EyeAngles().Forward(), 2000);

// 	new Promise<number>((resolve, reject) => {
// 		if (randRange(100) >= 50) resolve(randRange(100));
// 		else reject("Stupid!!");
// 	})
// 		.andThen((val) => {
// 			printl(format("promise returned: %d", val));
// 		})
// 		.andCatch((err) => {
// 			printl(format("FireError: %s", err));
// 		});

// 	forEachPlayer((player) => {
// 		player.TakeDamage(10, 1, player);
// 	});
// });

// function* idk() {
// 	for (let n = 1; true; n *= 2) yield n;
// }

// let x = 100;

// for (let [i, pow] of idk() as [number, number][]) {
// 	if (pow >= x) {
// 		x = pow;
// 		printl(format("X: %d", x));
// 		break;
// 	}
// }

// printl(format("X: %d", x));

/** @jsx h */
/** @jsxFrag Fragment */

// function InitHUD() {
// 	const layout = {
// 		Fields: {
// 			hello: {
// 				slot: HUD_MID_BOX, // middle slot constant
// 				dataval: "Hello World!",
// 				flags: HUD_FLAG_NOBG | HUD_FLAG_ALIGN_CENTER,
// 				x: 0.4,
// 				y: 0.45,
// 				w: 0.2,
// 				h: 0.1,
// 			},
// 		},
// 	};

// 	HUDSetLayout(layout);
// }

export const [score, setScore] = createSignal(0);
export const [clock, setClock] = createSignal("");

const ui = (
	<hud>
		<text
			name="scoreLine"
			slot={"middle_top"}
			x={0.3}
			y={0.05}
			w={0.4}
			h={0.1}
		>
			{"Score: "}
			{() => score()}
		</text>

		<text
			name="ticker"
			slot={"ticker"}
			x={0.25}
			y={0.04}
			w={0.4}
			h={0.08}
			style={"align-center|nobg"}
		>
			{() => "[Event] " + clock()}
		</text>
	</hud>
);

function InitHUD() {
	render(ui);
}

hookGameEvent("weapon_fire", (params) => {
	setScore(score() + 1);
	setClock("weapon_fire");
});

InitHUD();
