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

export function EntCall(idxorname: string | number, funcname: any) {
	let hEnt = null;
	const g_ModeScript =
		getroottable().DirectorScript.MapScript.ChallengeScript;

	if (typeof idxorname === "string") {
		let foundany = false;
		while ((hEnt = Entities.FindByName(hEnt!, idxorname))) {
			foundany = true;
			g_ModeScript._entHelper(hEnt, funcname);
		}
		if (!foundany) {
			while ((hEnt = Entities.FindByClassname(hEnt, idxorname))) {
				foundany = true;
				g_ModeScript._entHelper(hEnt, funcname);
			}
			printl(`Never saw anything that matched ${idxorname}`);
		}
		return;
	}
	if (typeOf(idxorname) === "integer") {
		hEnt = EntIndexToHScript(idxorname);
		g_ModeScript._entHelper(hEnt, funcname);
	}
}

export function forEachPlayer(callback: (player: CTerrorPlayer) => void) {
	EntCall("player", (ent: CTerrorPlayer) => callback(ent));
}
