export function createSignal<T>(
	initial: T,
): [() => T, (v: T) => void, (cb: (v: T) => void) => void] {
	let val = initial;
	let listeners: Array<(v: T) => void> = [];

	return [
		() => val,
		(v: T) => {
			val = v;

			for (var listener in listeners) {
				listener(v);
			}
		},
		(cb: (v: T) => void) => {
			listeners.push(cb);
		},
	];
}

const collectedFields = {};
const collectedPlacements = [];

export function beginUI() {
	// const hudTable = { Fields: {} };
	// HUDSetLayout(hudTable);
	// for (let i = 0; i < placementsOut.len(); i++) {
	// 	const p = placementsOut[i];
	// 	HUDPlace(p.slot, p.x, p.y, p.w, p.h);
	// }
}

export function endUI() {}
function kaboom() {}
