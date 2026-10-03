import { CTerrorPlayer } from "../types/l4d2";

const LOOP_SOUND = "sentrybuster/mvm_sentrybuster_loop.wav";
const MODEL = "models/sentrybuster/bot_sentry_buster.mdl";
const HEALTH = 2000;
const SPEED = 2;
const CHANCE = 1;

const EntitySounds: string[] = [
	"sentrybuster/mvm_sentrybuster_spin.wav",
	"sentrybuster/mvm_sentrybuster_intro.wav",
	"sentrybuster/mvm_sentrybuster_loop.wav",
	"sentrybuster/mvm_sentrybuster_explode.wav",
];

function SetupSlenderman(player: CTerrorPlayer) {
	EmitAmbientSoundOn(
		"ambient/alarms/alarm1.wav",
		1.0,
		0,
		100,
		Entities.FindByName(null as any, "SlendermanSoundTarget"),
	);
	player.SetMaxHealth(HEALTH);
	player.SetHealth(HEALTH);
	player.ValidateScriptScope();
	// player.SetSenseFlags(7); // cant see or hear or feel?
	NetProps.SetPropFloat(player, "m_flLaggedMovementValue", SPEED);
	/*<-*/ player.GetScriptScope()["IsSlenderman"] = 1;
	SetFakeClientConVarValue(player, "name", "Slenderman");
	player.SetModel(MODEL);
	// ?? wat
	NetProps.SetPropInt(
		player,
		"m_fFlags",
		NetProps.GetPropInt(player, "m_fFlags") & ~256,
	);
	SpawnEntityFromTable("ambient_generic", {
		targetname: `SlendermanTick${player.GetPlayerUserId().tostring()}`,
		spawnflags: 1,
		message: LOOP_SOUND,
		radius: 10000,
		pitch: "100",
		pitchstart: "100",
		health: 10,
	});
	NetProps.SetPropFloat(player, "m_flNextSecondaryAttack", Time() + 999999);
}

function IsSlenderman(player: CTerrorPlayer) {
	player.ValidateScriptScope();

	// I don't know if Squirrel allows directly doing `return "" in ...` here
	if ("IsSlenderman" in player.GetScriptScope()) {
		return true;
	}
	return false;
}

hookGameEvent("round_start", (params) => {
	// Preload sounds
	for (const sound of EntitySounds) {
		if (!IsSoundPrecached(sound)) {
			PrecacheSound(sound);
		}
	}

	// Preload model
	if (!IsModelPrecached(MODEL)) {
		PrecacheModel(MODEL);
	}

	const timeThinker = SpawnEntityFromTable("info_target", {});

	if (timeThinker.ValidateScriptScope()) {
		/*<-*/ timeThinker.GetScriptScope()["Think"] = () => {
			DirectorScript.Slenderman.Think();
			return 0.33;
		};
		AddThinkToEnt(timeThinker, "Think");
	}

	SpawnEntityFromTable("info_target", {
		targetname: "SlendermanSoundTarget",
	});
});

hookGameEvent("player_spawn", (params) => {
	if ("userid" in params) {
		if (params.userid) {
			const player = GetPlayerFromUserID(params.userid);

			if (
				player.GetClassname() == "witch" &&
				RandomInt(1, CHANCE) == 1 &&
				IsPlayerABot(player)
			) {
				SetupSlenderman(player);
			}
		}
	}
});

let Slenderman = {
	Think: () => {},
};
