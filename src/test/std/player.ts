import { CBaseEntity, CTerrorPlayer } from "../../types/l4d2";
import { Vector } from "../../types/valve";
import { normalizeVector } from "./vector";

export function getPlayerForward(player: CBaseEntity): Vector {
	return normalizeVector(player.GetForwardVector());
}

export function getPlayerRight(player: CBaseEntity): Vector {
	const forward = getPlayerForward(player);
	const right = Vector(forward.y, -forward.x, 0);
	return normalizeVector(right);
}

export function getPlayerLeft(player: CBaseEntity): Vector {
	const right = getPlayerRight(player);
	return right.mul(-1);
}

export function pushPlayer(
	player: CBaseEntity,
	dir: Vector,
	magnitude: number
) {
	const currentVel = player.GetVelocity();
	const push = dir.mul(magnitude);
	player.SetVelocity(currentVel.add(push));
}

export function EntCall(idxorname: string | number, func: any) {
	let hEnt = null;

	if (typeof idxorname === "string") {
		let foundany = false;
		while ((hEnt = Entities.FindByName(hEnt!, idxorname))) {
			foundany = true;
			func(hEnt);
		}
		if (!foundany) {
			while ((hEnt = Entities.FindByClassname(hEnt, idxorname))) {
				foundany = true;
				func(hEnt);
			}
		}
		return;
	}
	if (typeOf(idxorname) === "integer") {
		hEnt = EntIndexToHScript(idxorname);
		func(hEnt);
	}
}

export function forEachPlayer(callback: (player: CTerrorPlayer) => void) {
	EntCall("player", (ent: CTerrorPlayer) => callback(ent));
}
