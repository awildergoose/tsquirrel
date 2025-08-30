export interface TeamInfoEvent {
	teamid: number;
	teamname: string;
}

export interface TeamScoreEvent {
	teamid: number;
	score: number;
}

export interface TeamplayBroadcastAudioEvent {
	team: number;
	sound: string;
}

export interface PlayerTeamEvent {
	userid: number;
	team: number;
	oldteam: number;
	disconnect: boolean;
}

export interface PlayerClassEvent {
	userid: number;
	class: string;
}

export interface PlayerDeathEvent {
	userid: number;
	attacker: number;
}

export interface PlayerHurtEvent {
	userid: number;
	attacker: number;
	health: number;
}

export interface PlayerChatEvent {
	teamonly: boolean;
	userid: number;
	text: string;
}

export interface PlayerScoreEvent {
	userid: number;
	kills: number;
	deaths: number;
	score: number;
}

export interface PlayerSpawnEvent {
	userid: number;
}

export interface PlayerShootEvent {
	userid: number;
	weapon: number;
	mode: number;
}

export interface PlayerUseEvent {
	userid: number;
	entity: number;
}

export interface PlayerChangenameEvent {
	userid: number;
	oldname: string;
	newname: string;
}

export interface PlayerHintmessageEvent {
	hintmessage: string;
}

export interface GameInitEvent {}

export interface GameNewmapEvent {
	mapname: string;
}

export interface GameStartEvent {
	roundslimit: number;
	timelimit: number;
	fraglimit: number;
	objective: string;
}

export interface GameEndEvent {
	winner: number;
}

export interface RoundStartEvent {
	timelimit: number;
	fraglimit: number;
	objective: string;
}

export interface RoundEndEvent {
	winner: number;
	reason: number;
	message: string;
	time: number;
}

export interface GameMessageEvent {
	target: number;
	text: string;
}

export interface BreakBreakableEvent {
	entindex: number;
	userid: number;
	material: number;
}

export interface BreakPropEvent {
	entindex: number;
	userid: number;
}

export interface EntityKilledEvent {
	entindex_killed: number;
	entindex_attacker: number;
	entindex_inflictor: number;
	damagebits: number;
}

export interface BonusUpdatedEvent {
	numadvanced: number;
	numbronze: number;
	numsilver: number;
	numgold: number;
}

export interface AchievementEventEvent {
	achievement_name: string;
	cur_val: number;
	max_val: number;
}

export interface SurvivalGoalReachedEvent {
	goalname: string;
	id: number;
	userid: number;
}

export interface PhysgunPickupEvent {
	entindex: number;
}

export interface FlareIgniteNpcEvent {
	entindex: number;
}

export interface HelicopterGrenadePuntMissEvent {}

export interface UserDataDownloadedEvent {}

export interface RagdollDissolvedEvent {
	entindex: number;
}

export interface PounceFailEvent {
	userid: number;
}

export interface HitSafeRoomEvent {
	userid: number;
}

export interface SpawnedAsTankEvent {
	userid: number;
}

export interface InstructorServerHintCreateEvent {
	userid: number;
	hint_entindex: number;
	hint_name: string;
	hint_target: number;
	hint_timeout: number;
	hint_display_limit: number;
	hint_icon_onscreen: string;
	hint_icon_offscreen: string;
	hint_caption: string;
	hint_color: string;
	hint_icon_offset: number;
	hint_range: number;
	hint_flags: number;
	hint_binding: string;
	hint_allow_nodraw_target: boolean;
	hint_nooffscreen: boolean;
	hint_forcecaption: boolean;
	hint_instance_type: number;
	hint_suppress_rest: boolean;
}

export interface InstructorServerHintStopEvent {
	hint_name: string;
	hint_entindex: number;
}

export interface PlayerBiofeedbackSclEvent {
	local: any;
	microsiemens: number;
	sampleid: number;
}

export interface PlayerDeathEvent {
	userid: number;
	entityid: number;
	attacker: number;
	attackername: string;
	attackerentid: number;
	weapon: string;
	headshot: boolean;
	attackerisbot: boolean;
	victimname: string;
	victimisbot: boolean;
	abort: boolean;
	type: number;
	victim_x: number;
	victim_y: number;
	victim_z: number;
}

export interface PlayerHurtEvent {
	local: any;
	userid: number;
	attacker: number;
	attackerentid: number;
	health: number;
	armor: number;
	weapon: string;
	dmg_health: number;
	dmg_armor: number;
	hitgroup: number;
	type: number;
}

export interface PlayerTeamEvent {
	userid: number;
	team: number;
	oldteam: number;
	disconnect: boolean;
	name: string;
	isbot: boolean;
}

export interface PlayerBotReplaceEvent {
	player: number;
	bot: number;
}

export interface BotPlayerReplaceEvent {
	bot: number;
	player: number;
}

export interface PlayerAfkEvent {
	player: number;
}

export interface WeaponFireEvent {
	local: any;
	userid: number;
	weapon: string;
	weaponid: number;
	count: number;
}

export interface WeaponFireOnEmptyEvent {
	local: any;
	userid: number;
	weapon: string;
	count: number;
}

export interface WeaponReloadEvent {
	userid: number;
	manual: boolean;
}

export interface WeaponZoomEvent {
	userid: number;
}

export interface AbilityUseEvent {
	userid: number;
	ability: string;
	context: number;
}

export interface AmmoPickupEvent {
	userid: number;
}

export interface ItemPickupEvent {
	userid: number;
	item: string;
}

export interface GrenadeBounceEvent {
	userid: number;
}

export interface HegrenadeDetonateEvent {
	userid: number;
}

export interface BulletImpactEvent {
	userid: number;
	x: number;
	y: number;
	z: number;
}

export interface PlayerFootstepEvent {
	userid: number;
}

export interface PlayerJumpEvent {
	userid: number;
}

export interface PlayerBlindEvent {
	userid: number;
}

export interface PlayerFalldamageEvent {
	userid: number;
	damage: number;
	causer: number;
}

export interface PlayerLedgeGrabEvent {
	userid: number;
	causer: number;
}

export interface PlayerLedgeReleaseEvent {
	userid: number;
}

export interface DoorMovingEvent {
	entindex: number;
	userid: number;
}

export interface DoorOpenEvent {
	userid: number;
	checkpoint: boolean;
	closed: boolean;
}

export interface DoorCloseEvent {
	userid: number;
	checkpoint: boolean;
}

export interface DoorUnlockedEvent {
	userid: number;
	checkpoint: boolean;
}

export interface RescueDoorOpenEvent {
	userid: number;
	entindex: number;
}

export interface WaitingCheckpointDoorUsedEvent {
	userid: number;
	entindex: number;
}

export interface WaitingDoorUsedVersusEvent {
	userid: number;
	entindex: number;
}

export interface WaitingCheckpointButtonUsedEvent {
	userid: number;
}

export interface SuccessCheckpointButtonUsedEvent {
	userid: number;
}

export interface RoundFreezeEndEvent {}

export interface RoundStartPreEntityEvent {}

export interface RoundStartPostNavEvent {}

export interface NavBlockedEvent {
	area: number;
	blocked: boolean;
}

export interface NavGenerateEvent {}

export interface RoundEndMessageEvent {
	winner: number;
	reason: number;
	message: string;
}

export interface RoundEndEvent {
	winner: number;
	reason: number;
	message: string;
	time: number;
}

export interface VoteEndedEvent {}

export interface VoteStartedEvent {
	issue: string;
	param1: string;
	team: number;
	initiator: number;
}

export interface VoteChangedEvent {
	yesVotes: number;
	noVotes: number;
	potentialVotes: number;
}

export interface VotePassedEvent {
	details: string;
	param1: string;
	team: number;
}

export interface VoteFailedEvent {
	team: number;
}

export interface VoteCastYesEvent {
	team: number;
	entityid: number;
}

export interface VoteCastNoEvent {
	team: number;
	entityid: number;
}

export interface InfectedHurtEvent {
	local: any;
	attacker: number;
	entityid: number;
	hitgroup: number;
	amount: number;
	type: number;
}

export interface InfectedDeathEvent {
	attacker: number;
	infected_id: number;
	gender: number;
	weapon_id: number;
	headshot: boolean;
	minigun: boolean;
	blast: boolean;
	submerged: boolean;
}

export interface HostnameChangedEvent {
	hostname: string;
}

export interface DifficultyChangedEvent {
	newDifficulty: number;
	oldDifficulty: number;
	strDifficulty: string;
}

export interface FinaleStartEvent {
	rushes: number;
}

export interface FinaleRushEvent {}

export interface FinaleEscapeStartEvent {}

export interface FinaleVehicleReadyEvent {}

export interface FinaleVehicleLeavingEvent {
	survivorcount: number;
}

export interface FinaleWinEvent {
	map_name: string;
	difficulty: number;
}

export interface MissionLostEvent {}

export interface FinaleRadioStartEvent {
	health: number;
}

export interface FinaleRadioDamagedEvent {
	health: number;
}

export interface FinalReportscreenEvent {}

export interface MapTransitionEvent {}

export interface PlayerTransitionedEvent {
	userid: number;
}

export interface HealBeginEvent {
	userid: number;
	subject: number;
}

export interface HealSuccessEvent {
	userid: number;
	subject: number;
	health_restored: number;
}

export interface HealEndEvent {
	userid: number;
	subject: number;
}

export interface HealInterruptedEvent {
	userid: number;
	subject: number;
}

export interface AmmoPackUsedEvent {
	userid: number;
	subject: number;
}

export interface GiveWeaponEvent {
	userid: number;
	recipient: number;
	weapon: number;
}

export interface PillsUsedEvent {
	userid: number;
	subject: number;
}

export interface PillsUsedFailEvent {
	userid: number;
}

export interface AmmoPackUsedFailNoWeaponEvent {
	userid: number;
	subject: number;
}

export interface AmmoPackUsedFailFullEvent {
	userid: number;
	subject: number;
}

export interface AmmoPackUsedFailDoesntUseAmmoEvent {
	userid: number;
	subject: number;
}

export interface AmmoPileWeaponCantUseAmmoEvent {
	userid: number;
}

export interface DefibrillatorBeginEvent {
	userid: number;
	subject: number;
}

export interface DefibrillatorUsedEvent {
	userid: number;
	subject: number;
}

export interface DefibrillatorUsedFailEvent {
	userid: number;
	subject: number;
}

export interface DefibrillatorInterruptedEvent {
	userid: number;
	subject: number;
}

export interface UpgradePackBeginEvent {
	userid: number;
}

export interface UpgradePackUsedEvent {
	upgradeid: number;
	userid: number;
}

export interface UpgradeItemAlreadyUsedEvent {
	userid: number;
	upgradeclass: string;
}

export interface UpgradeFailedNoPrimaryEvent {
	userid: number;
	upgrade: string;
}

export interface DeadSurvivorVisibleEvent {
	userid: number;
	subject: number;
	deadplayer: number;
}

export interface AdrenalineUsedEvent {
	userid: number;
}

export interface ReviveBeginEvent {
	userid: number;
	subject: number;
}

export interface ReviveSuccessEvent {
	userid: number;
	subject: number;
	lastlife: boolean;
	ledge_hang: boolean;
}

export interface ReviveEndEvent {
	userid: number;
	subject: number;
	ledge_hang: boolean;
}

export interface DragBeginEvent {
	userid: number;
	subject: number;
}

export interface DragEndEvent {
	userid: number;
	subject: number;
}

export interface PlayerIncapacitatedEvent {
	userid: number;
	attacker: number;
	attackerentid: number;
	weapon: string;
	type: number;
}

export interface PlayerIncapacitatedStartEvent {
	userid: number;
	attacker: number;
	attackerentid: number;
	weapon: string;
	type: number;
}

export interface PlayerEnteredStartAreaEvent {
	userid: number;
}

export interface PlayerFirstSpawnEvent {
	userid: number;
	map_name: string;
	isbot: boolean;
}

export interface PlayerLeftStartAreaEvent {
	userid: number;
}

export interface PlayerEnteredCheckpointEvent {
	userid: number;
	entityid: number;
	door: number;
	area: number;
	doorname: string;
}

export interface PlayerLeftCheckpointEvent {
	userid: number;
	entityid: number;
	area: number;
}

export interface PlayerShovedEvent {
	userid: number;
	attacker: number;
}

export interface EntityShovedEvent {
	entityid: number;
	attacker: number;
}

export interface PlayerJumpApexEvent {
	userid: number;
}

export interface PlayerBlockedEvent {
	userid: number;
	blocker: number;
}

export interface PlayerNowItEvent {
	userid: number;
	attacker: number;
	exploded: boolean;
	infected: boolean;
	by_boomer: boolean;
}

export interface PlayerNoLongerItEvent {
	userid: number;
}

export interface WitchHarasserSetEvent {
	userid: number;
	witchid: number;
	first: boolean;
}

export interface WitchSpawnEvent {
	witchid: number;
}

export interface WitchKilledEvent {
	userid: number;
	witchid: number;
	oneshot: boolean;
}

export interface TankSpawnEvent {
	userid: number;
	tankid: number;
}

export interface MeleeKillEvent {
	userid: number;
	entityid: number;
	ambush: boolean;
}

export interface AreaClearedEvent {
	userid: number;
	area: number;
}

export interface AwardEarnedEvent {
	userid: number;
	entityid: number;
	subjectentid: number;
	award: number;
}

export interface TongueGrabEvent {
	userid: number;
	victim: number;
}

export interface TongueBrokeBentEvent {
	userid: number;
}

export interface TongueReleaseEvent {
	userid: number;
	victim: number;
	distance: number;
}

export interface ChokeStartEvent {
	userid: number;
	victim: number;
}

export interface ChokeEndEvent {
	userid: number;
	victim: number;
}

export interface ChokeStoppedEvent {
	userid: number;
	victim: number;
	smoker: number;
	release_type: number;
}

export interface TonguePullStoppedEvent {
	userid: number;
	victim: number;
	smoker: number;
	release_type: number;
}

export interface LungeShoveEvent {
	userid: number;
	victim: number;
}

export interface LungePounceEvent {
	userid: number;
	victim: number;
	distance: number;
}

export interface PounceEndEvent {
	userid: number;
	victim: number;
}

export interface PounceStoppedEvent {
	userid: number;
	victim: number;
}

export interface FatalVomitEvent {
	userid: number;
	victim: number;
}

export interface SurvivorCallForHelpEvent {
	userid: number;
	subject: number;
}

export interface SurvivorRescuedEvent {
	rescuer: number;
	victim: number;
}

export interface SurvivorRescueAbandonedEvent {}

export interface RelocatedEvent {
	userid: number;
}

export interface RespawningEvent {
	userid: number;
}

export interface TankFrustratedEvent {
	userid: number;
}

export interface WeaponGivenEvent {
	userid: number;
	giver: number;
	weapon: number;
	weaponentid: number;
}

export interface WeaponDropEvent {
	userid: number;
	item: string;
	propid: number;
}

export interface BreakBreakableEvent {
	userid: number;
	entindex: number;
	material: number;
	hulkonly: boolean;
}

export interface AchievementEarnedEvent {
	player: number;
	achievement: number;
}

export interface SpecTargetUpdatedEvent {}

export interface SpawnerGiveItemEvent {
	userid: number;
	item: string;
	spawner: number;
}

export interface CreatePanicEventEvent {
	userid: number;
}

export interface ExplainPillsEvent {
	subject: number;
}

export interface ExplainWeaponsEvent {
	subject: number;
}

export interface EntityVisibleEvent {
	userid: number;
	subject: number;
	classname: string;
	entityname: string;
}

export interface WeaponSpawnVisibleEvent {
	userid: number;
	subject: number;
	weaponname: string;
	subtype: string;
}

export interface BoomerNearEvent {
	userid: number;
	victim: number;
}

export interface ExplainPreRadioEvent {
	userid: number;
	subject: number;
}

export interface StartedPreRadioEvent {
	userid: number;
	subject: number;
}

export interface ExplainRadioEvent {
	userid: number;
	subject: number;
}

export interface ExplainGasTruckEvent {
	userid: number;
	subject: number;
}

export interface ExplainPanicButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainElevatorButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainLiftButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainChurchDoorEvent {
	userid: number;
	subject: number;
}

export interface ExplainEmergencyDoorEvent {
	userid: number;
	subject: number;
}

export interface ExplainCraneEvent {
	userid: number;
	subject: number;
}

export interface ExplainBridgeEvent {
	userid: number;
	subject: number;
}

export interface ExplainGasCanPanicEvent {
	userid: number;
	subject: number;
}

export interface ExplainVanPanicEvent {
	userid: number;
	subject: number;
}

export interface ExplainMainstreetEvent {
	userid: number;
	subject: number;
}

export interface ExplainTrainLeverEvent {
	userid: number;
	subject: number;
}

export interface ExplainDisturbanceEvent {
	userid: number;
	subject: number;
}

export interface ExplainScavengeGoalEvent {
	userid: number;
	subject: number;
}

export interface ExplainScavengeLeaveAreaEvent {
	userid: number;
	subject: number;
}

export interface BeginScavengeOvertimeEvent {}

export interface ScavengeRoundStartEvent {}

export interface ScavengeRoundHalftimeEvent {}

export interface ScavengeRoundFinishedEvent {}

export interface ScavengeScoreTiedEvent {}

export interface VersusRoundStartEvent {}

export interface GascanPourBlockedEvent {
	userid: number;
}

export interface GascanPourCompletedEvent {
	userid: number;
}

export interface GascanDroppedEvent {
	userid: number;
}

export interface GascanPourInterruptedEvent {
	userid: number;
}

export interface ScavengeMatchFinishedEvent {
	winners: number;
}

export interface VersusMatchFinishedEvent {
	winners: number;
}

export interface UseTargetEvent {
	targetid: number;
	classname: string;
	isprop: boolean;
}

export interface PlayerUseEvent {
	userid: number;
	targetid: number;
}

export interface FriendlyFireEvent {
	attacker: number;
	victim: number;
	guilty: number;
	type: number;
}

export interface GameinstructorDrawEvent {}

export interface GameinstructorNodrawEvent {}

export interface RequestWeaponStatsEvent {
	userid: number;
}

export interface PlayerTalkingStateEvent {
	player: number;
	istalking: boolean;
}

export interface WeaponPickupEvent {
	context: number;
	weaponid: number;
	weaponslot: number;
	dropped_by_infected: boolean;
}

export interface HunterPunchedEvent {
	userid: number;
	hunteruserid: number;
	islunging: boolean;
}

export interface HunterHeadshotEvent {
	userid: number;
	hunteruserid: number;
	islunging: boolean;
}

export interface ZombieIgnitedEvent {
	userid: number;
	gender: number;
	entityid: number;
	victimname: string;
	fire_ammo: boolean;
}

export interface BoomerExplodedEvent {
	userid: number;
	attacker: number;
	splashedbile: boolean;
}

export interface NonPistolFiredEvent {
	userid: number;
}

export interface WeaponFireAt40Event {
	userid: number;
	weapon: string;
	weaponid: number;
	count: number;
}

export interface TotalAmmoBelow40Event {
	userid: number;
}

export interface PlayerHurtConciseEvent {
	userid: number;
	attackerentid: number;
	type: number;
	dmg_health: number;
}

export interface TankKilledEvent {
	userid: number;
	attacker: number;
	solo: boolean;
	melee_only: boolean;
}

export interface AchievementWriteFailedEvent {}

export interface GhostSpawnTimeEvent {
	userid: number;
	spawntime: number;
}

export interface SurvivalAt30minEvent {}

export interface ExplainPreDrawbridgeEvent {
	userid: number;
	subject: number;
}

export interface ExplainDrawbridgeEvent {
	userid: number;
	subject: number;
}

export interface ExplainPerimeterEvent {
	userid: number;
	subject: number;
}

export interface ExplainDeactivateAlarmEvent {
	userid: number;
	subject: number;
}

export interface ExplainImpoundLotEvent {
	userid: number;
	subject: number;
}

export interface ExplainDeconEvent {
	userid: number;
	subject: number;
}

export interface ExplainMallWindowEvent {
	userid: number;
	subject: number;
}

export interface ExplainMallAlarmEvent {
	userid: number;
	subject: number;
}

export interface ExplainCoasterEvent {
	userid: number;
	subject: number;
}

export interface ExplainCoasterStopEvent {
	userid: number;
	subject: number;
}

export interface ExplainDeconWaitEvent {
	userid: number;
	subject: number;
}

export interface GauntletFinaleStartEvent {}

export interface ExplainFloatEvent {
	userid: number;
	subject: number;
}

export interface ExplainFerryButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainHatchButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainShackButtonEvent {
	userid: number;
	subject: number;
}

export interface UpgradeIncendiaryAmmoEvent {
	userid: number;
}

export interface UpgradeExplosiveAmmoEvent {
	userid: number;
}

export interface ReceiveUpgradeEvent {
	userid: number;
	upgrade: string;
}

export interface ExplainVehicleArrivalEvent {
	subject: number;
}

export interface MountedGunStartEvent {
	userid: number;
	subject: number;
}

export interface MountedGunOverheatedEvent {
	userid: number;
}

export interface ExplainBurgerSignEvent {
	userid: number;
	subject: number;
}

export interface ExplainCarouselButtonEvent {
	userid: number;
	subject: number;
}

export interface ExplainCarouselDestinationEvent {
	userid: number;
	subject: number;
}

export interface ExplainStageLightingEvent {
	userid: number;
	subject: number;
}

export interface ExplainStageFinaleStartEvent {
	userid: number;
	subject: number;
}

export interface ExplainStageSurvivalStartEvent {
	userid: number;
	subject: number;
}

export interface AbilityOutOfRangeEvent {
	userid: number;
	ability: string;
}

export interface ExplainStagePyrotechnicsEvent {
	userid: number;
	subject: number;
}

export interface ExplainC3m4Radio1Event {
	userid: number;
	subject: number;
}

export interface ExplainC3m4Radio2Event {
	userid: number;
	subject: number;
}

export interface ExplainGatesAreOpenEvent {
	userid: number;
	subject: number;
}

export interface ExplainC2m4TicketboothEvent {
	userid: number;
	subject: number;
}

export interface ExplainC3m4RescueEvent {
	userid: number;
	subject: number;
}

export interface ExplainHotelElevatorDoorsEvent {
	userid: number;
	subject: number;
}

export interface ExplainGunShopTankerEvent {
	userid: number;
	subject: number;
}

export interface ExplainGunShopEvent {
	userid: number;
	subject: number;
}

export interface ExplainStoreAlarmEvent {
	userid: number;
	subject: number;
}

export interface ExplainStoreItemEvent {
	userid: number;
	subject: number;
}

export interface ExplainStoreItemStopEvent {
	userid: number;
	subject: number;
}

export interface ExplainSurvivalGenericEvent {
	userid: number;
	subject: number;
}

export interface ExplainSurvivalAlarmEvent {
	userid: number;
	subject: number;
}

export interface ExplainSurvivalRadioEvent {
	userid: number;
	subject: number;
}

export interface ExplainSurvivalCarouselEvent {
	userid: number;
	subject: number;
}

export interface ExplainReturnItemEvent {
	userid: number;
	subject: number;
}

export interface ExplainSaveItemsEvent {
	userid: number;
	subject: number;
}

export interface SpitBurstEvent {
	userid: number;
	subject: number;
}

export interface EnteredSpitEvent {
	userid: number;
}

export interface TempC4m1GetgasEvent {
	userid: number;
	subject: number;
}

export interface TempC4m3ReturnToBoatEvent {
	userid: number;
	subject: number;
}

export interface ExplainC1m4FinaleEvent {
	userid: number;
	subject: number;
}

export interface C1m4ScavengeInstructionsEvent {
	userid: number;
	subject: number;
}

export interface PunchedClownEvent {
	userid: number;
}

export interface ChargerKilledEvent {
	userid: number;
	attacker: number;
	melee: boolean;
	charging: boolean;
}

export interface SpitterKilledEvent {
	userid: number;
	attacker: number;
	has_spit: boolean;
}

export interface JockeyRideEvent {
	userid: number;
	victim: number;
}

export interface JockeyRideEndEvent {
	userid: number;
	victim: number;
	rescuer: number;
	ride_length: number;
}

export interface JockeyKilledEvent {
	userid: number;
	attacker: number;
}

export interface NonMeleeFiredEvent {
	userid: number;
}

export interface InfectedDecapitatedEvent {
	userid: number;
}

export interface UpgradePackAddedEvent {
	upgradeid: number;
	userid: number;
}

export interface VomitBombTankEvent {
	userid: number;
}

export interface TriggeredCarAlarmEvent {}

export interface PanicEventFinishedEvent {}

export interface ChargerChargeStartEvent {
	userid: number;
}

export interface ChargerChargeEndEvent {
	userid: number;
}

export interface ChargerCarryStartEvent {
	userid: number;
	victim: number;
}

export interface ChargerCarryEndEvent {
	userid: number;
	victim: number;
}

export interface ChargerImpactEvent {
	userid: number;
	victim: number;
}

export interface ChargerPummelStartEvent {
	userid: number;
	victim: number;
}

export interface ChargerPummelEndEvent {
	userid: number;
	victim: number;
	rescuer: number;
}

export interface StrongmanBellKnockedOffEvent {
	userid: number;
	subject: number;
}

export interface MolotovThrownEvent {
	userid: number;
}

export interface GasCanForcedDropEvent {
	userid: number;
	victim: number;
}

export interface ExplainSurvivorGlowsDisabledEvent {
	userid: number;
}

export interface ExplainItemGlowsDisabledEvent {
	userid: number;
}

export interface ExplainRescueDisabledEvent {
	userid: number;
}

export interface ExplainBodyshotsReducedEvent {
	userid: number;
}

export interface ExplainWitchInstantKillEvent {
	userid: number;
}

export interface SetInstructorGroupEnabledEvent {
	group: string;
	enabled: number;
}

export interface StashwhackerGameWonEvent {
	userid: number;
	subject: number;
}

export interface VersusMarkerReachedEvent {
	userid: number;
	marker: number;
}

export interface StartScoreAnimationEvent {}

export interface SurvivalRoundStartEvent {}

export interface ScavengeGasCanDestroyedEvent {
	userid: number;
}

export interface ServerSpawnEvent {
	hostname: string;
	address: string;
	port: number;
	game: string;
	mapname: string;
	maxplayers: number;
	os: string;
	dedicated: boolean;
	password: boolean;
	vanilla: boolean;
}

export interface ServerPreShutdownEvent {
	reason: string;
}

export interface ServerShutdownEvent {
	reason: string;
}

export interface ServerCvarEvent {
	cvarname: string;
	cvarvalue: string;
}

export interface ServerMessageEvent {
	text: string;
}

export interface ServerAddbanEvent {
	name: string;
	userid: number;
	networkid: string;
	ip: string;
	duration: string;
	by: string;
	kicked: boolean;
}

export interface ServerRemovebanEvent {
	networkid: string;
	ip: string;
	by: string;
}

export interface PlayerConnectEvent {
	name: string;
	index: number;
	userid: number;
	xuid: any;
	networkid: string;
	address: string;
	bot: boolean;
	reliable: any;
}

export interface PlayerInfoEvent {
	name: string;
	index: number;
	userid: number;
	xuid: any;
	networkid: string;
	bot: boolean;
}

export interface PlayerDisconnectEvent {
	userid: number;
	reason: string;
	name: string;
	xuid: any;
	networkid: string;
	bot: boolean;
	reliable: any;
}

export interface PlayerActivateEvent {
	userid: number;
}

export interface PlayerConnectFullEvent {
	userid: number;
	index: number;
}

export interface PlayerSayEvent {
	userid: number;
	text: string;
}

export interface GameEventMap {
	team_info: TeamInfoEvent;
	team_score: TeamScoreEvent;
	teamplay_broadcast_audio: TeamplayBroadcastAudioEvent;
	player_class: PlayerClassEvent;
	player_chat: PlayerChatEvent;
	player_score: PlayerScoreEvent;
	player_spawn: PlayerSpawnEvent;
	player_shoot: PlayerShootEvent;
	player_changename: PlayerChangenameEvent;
	player_hintmessage: PlayerHintmessageEvent;
	game_init: GameInitEvent;
	game_newmap: GameNewmapEvent;
	game_start: GameStartEvent;
	game_end: GameEndEvent;
	round_start: RoundStartEvent;
	game_message: GameMessageEvent;
	break_prop: BreakPropEvent;
	entity_killed: EntityKilledEvent;
	bonus_updated: BonusUpdatedEvent;
	achievement_event: AchievementEventEvent;
	survival_goal_reached: SurvivalGoalReachedEvent;
	physgun_pickup: PhysgunPickupEvent;
	flare_ignite_npc: FlareIgniteNpcEvent;
	helicopter_grenade_punt_miss: HelicopterGrenadePuntMissEvent;
	user_data_downloaded: UserDataDownloadedEvent;
	ragdoll_dissolved: RagdollDissolvedEvent;
	pounce_fail: PounceFailEvent;
	hit_safe_room: HitSafeRoomEvent;
	spawned_as_tank: SpawnedAsTankEvent;
	instructor_server_hint_create: InstructorServerHintCreateEvent;
	instructor_server_hint_stop: InstructorServerHintStopEvent;
	player_biofeedback_scl: PlayerBiofeedbackSclEvent;
	player_death: PlayerDeathEvent;
	player_hurt: PlayerHurtEvent;
	player_team: PlayerTeamEvent;
	player_bot_replace: PlayerBotReplaceEvent;
	bot_player_replace: BotPlayerReplaceEvent;
	player_afk: PlayerAfkEvent;
	weapon_fire: WeaponFireEvent;
	weapon_fire_on_empty: WeaponFireOnEmptyEvent;
	weapon_reload: WeaponReloadEvent;
	weapon_zoom: WeaponZoomEvent;
	ability_use: AbilityUseEvent;
	ammo_pickup: AmmoPickupEvent;
	item_pickup: ItemPickupEvent;
	grenade_bounce: GrenadeBounceEvent;
	hegrenade_detonate: HegrenadeDetonateEvent;
	bullet_impact: BulletImpactEvent;
	player_footstep: PlayerFootstepEvent;
	player_jump: PlayerJumpEvent;
	player_blind: PlayerBlindEvent;
	player_falldamage: PlayerFalldamageEvent;
	player_ledge_grab: PlayerLedgeGrabEvent;
	player_ledge_release: PlayerLedgeReleaseEvent;
	door_moving: DoorMovingEvent;
	door_open: DoorOpenEvent;
	door_close: DoorCloseEvent;
	door_unlocked: DoorUnlockedEvent;
	rescue_door_open: RescueDoorOpenEvent;
	waiting_checkpoint_door_used: WaitingCheckpointDoorUsedEvent;
	waiting_door_used_versus: WaitingDoorUsedVersusEvent;
	waiting_checkpoint_button_used: WaitingCheckpointButtonUsedEvent;
	success_checkpoint_button_used: SuccessCheckpointButtonUsedEvent;
	round_freeze_end: RoundFreezeEndEvent;
	round_start_pre_entity: RoundStartPreEntityEvent;
	round_start_post_nav: RoundStartPostNavEvent;
	nav_blocked: NavBlockedEvent;
	nav_generate: NavGenerateEvent;
	round_end_message: RoundEndMessageEvent;
	round_end: RoundEndEvent;
	vote_ended: VoteEndedEvent;
	vote_started: VoteStartedEvent;
	vote_changed: VoteChangedEvent;
	vote_passed: VotePassedEvent;
	vote_failed: VoteFailedEvent;
	vote_cast_yes: VoteCastYesEvent;
	vote_cast_no: VoteCastNoEvent;
	infected_hurt: InfectedHurtEvent;
	infected_death: InfectedDeathEvent;
	hostname_changed: HostnameChangedEvent;
	difficulty_changed: DifficultyChangedEvent;
	finale_start: FinaleStartEvent;
	finale_rush: FinaleRushEvent;
	finale_escape_start: FinaleEscapeStartEvent;
	finale_vehicle_ready: FinaleVehicleReadyEvent;
	finale_vehicle_leaving: FinaleVehicleLeavingEvent;
	finale_win: FinaleWinEvent;
	mission_lost: MissionLostEvent;
	finale_radio_start: FinaleRadioStartEvent;
	finale_radio_damaged: FinaleRadioDamagedEvent;
	final_reportscreen: FinalReportscreenEvent;
	map_transition: MapTransitionEvent;
	player_transitioned: PlayerTransitionedEvent;
	heal_begin: HealBeginEvent;
	heal_success: HealSuccessEvent;
	heal_end: HealEndEvent;
	heal_interrupted: HealInterruptedEvent;
	ammo_pack_used: AmmoPackUsedEvent;
	give_weapon: GiveWeaponEvent;
	pills_used: PillsUsedEvent;
	pills_used_fail: PillsUsedFailEvent;
	ammo_pack_used_fail_no_weapon: AmmoPackUsedFailNoWeaponEvent;
	ammo_pack_used_fail_full: AmmoPackUsedFailFullEvent;
	ammo_pack_used_fail_doesnt_use_ammo: AmmoPackUsedFailDoesntUseAmmoEvent;
	ammo_pile_weapon_cant_use_ammo: AmmoPileWeaponCantUseAmmoEvent;
	defibrillator_begin: DefibrillatorBeginEvent;
	defibrillator_used: DefibrillatorUsedEvent;
	defibrillator_used_fail: DefibrillatorUsedFailEvent;
	defibrillator_interrupted: DefibrillatorInterruptedEvent;
	upgrade_pack_begin: UpgradePackBeginEvent;
	upgrade_pack_used: UpgradePackUsedEvent;
	upgrade_item_already_used: UpgradeItemAlreadyUsedEvent;
	upgrade_failed_no_primary: UpgradeFailedNoPrimaryEvent;
	dead_survivor_visible: DeadSurvivorVisibleEvent;
	adrenaline_used: AdrenalineUsedEvent;
	revive_begin: ReviveBeginEvent;
	revive_success: ReviveSuccessEvent;
	revive_end: ReviveEndEvent;
	drag_begin: DragBeginEvent;
	drag_end: DragEndEvent;
	player_incapacitated: PlayerIncapacitatedEvent;
	player_incapacitated_start: PlayerIncapacitatedStartEvent;
	player_entered_start_area: PlayerEnteredStartAreaEvent;
	player_first_spawn: PlayerFirstSpawnEvent;
	player_left_start_area: PlayerLeftStartAreaEvent;
	player_entered_checkpoint: PlayerEnteredCheckpointEvent;
	player_left_checkpoint: PlayerLeftCheckpointEvent;
	player_shoved: PlayerShovedEvent;
	entity_shoved: EntityShovedEvent;
	player_jump_apex: PlayerJumpApexEvent;
	player_blocked: PlayerBlockedEvent;
	player_now_it: PlayerNowItEvent;
	player_no_longer_it: PlayerNoLongerItEvent;
	witch_harasser_set: WitchHarasserSetEvent;
	witch_spawn: WitchSpawnEvent;
	witch_killed: WitchKilledEvent;
	tank_spawn: TankSpawnEvent;
	melee_kill: MeleeKillEvent;
	area_cleared: AreaClearedEvent;
	award_earned: AwardEarnedEvent;
	tongue_grab: TongueGrabEvent;
	tongue_broke_bent: TongueBrokeBentEvent;
	tongue_release: TongueReleaseEvent;
	choke_start: ChokeStartEvent;
	choke_end: ChokeEndEvent;
	choke_stopped: ChokeStoppedEvent;
	tongue_pull_stopped: TonguePullStoppedEvent;
	lunge_shove: LungeShoveEvent;
	lunge_pounce: LungePounceEvent;
	pounce_end: PounceEndEvent;
	pounce_stopped: PounceStoppedEvent;
	fatal_vomit: FatalVomitEvent;
	survivor_call_for_help: SurvivorCallForHelpEvent;
	survivor_rescued: SurvivorRescuedEvent;
	survivor_rescue_abandoned: SurvivorRescueAbandonedEvent;
	relocated: RelocatedEvent;
	respawning: RespawningEvent;
	tank_frustrated: TankFrustratedEvent;
	weapon_given: WeaponGivenEvent;
	weapon_drop: WeaponDropEvent;
	break_breakable: BreakBreakableEvent;
	achievement_earned: AchievementEarnedEvent;
	spec_target_updated: SpecTargetUpdatedEvent;
	spawner_give_item: SpawnerGiveItemEvent;
	create_panic_event: CreatePanicEventEvent;
	explain_pills: ExplainPillsEvent;
	explain_weapons: ExplainWeaponsEvent;
	entity_visible: EntityVisibleEvent;
	weapon_spawn_visible: WeaponSpawnVisibleEvent;
	boomer_near: BoomerNearEvent;
	explain_pre_radio: ExplainPreRadioEvent;
	started_pre_radio: StartedPreRadioEvent;
	explain_radio: ExplainRadioEvent;
	explain_gas_truck: ExplainGasTruckEvent;
	explain_panic_button: ExplainPanicButtonEvent;
	explain_elevator_button: ExplainElevatorButtonEvent;
	explain_lift_button: ExplainLiftButtonEvent;
	explain_church_door: ExplainChurchDoorEvent;
	explain_emergency_door: ExplainEmergencyDoorEvent;
	explain_crane: ExplainCraneEvent;
	explain_bridge: ExplainBridgeEvent;
	explain_gas_can_panic: ExplainGasCanPanicEvent;
	explain_van_panic: ExplainVanPanicEvent;
	explain_mainstreet: ExplainMainstreetEvent;
	explain_train_lever: ExplainTrainLeverEvent;
	explain_disturbance: ExplainDisturbanceEvent;
	explain_scavenge_goal: ExplainScavengeGoalEvent;
	explain_scavenge_leave_area: ExplainScavengeLeaveAreaEvent;
	begin_scavenge_overtime: BeginScavengeOvertimeEvent;
	scavenge_round_start: ScavengeRoundStartEvent;
	scavenge_round_halftime: ScavengeRoundHalftimeEvent;
	scavenge_round_finished: ScavengeRoundFinishedEvent;
	scavenge_score_tied: ScavengeScoreTiedEvent;
	versus_round_start: VersusRoundStartEvent;
	gascan_pour_blocked: GascanPourBlockedEvent;
	gascan_pour_completed: GascanPourCompletedEvent;
	gascan_dropped: GascanDroppedEvent;
	gascan_pour_interrupted: GascanPourInterruptedEvent;
	scavenge_match_finished: ScavengeMatchFinishedEvent;
	versus_match_finished: VersusMatchFinishedEvent;
	use_target: UseTargetEvent;
	player_use: PlayerUseEvent;
	friendly_fire: FriendlyFireEvent;
	gameinstructor_draw: GameinstructorDrawEvent;
	gameinstructor_nodraw: GameinstructorNodrawEvent;
	request_weapon_stats: RequestWeaponStatsEvent;
	player_talking_state: PlayerTalkingStateEvent;
	weapon_pickup: WeaponPickupEvent;
	hunter_punched: HunterPunchedEvent;
	hunter_headshot: HunterHeadshotEvent;
	zombie_ignited: ZombieIgnitedEvent;
	boomer_exploded: BoomerExplodedEvent;
	non_pistol_fired: NonPistolFiredEvent;
	weapon_fire_at_40: WeaponFireAt40Event;
	total_ammo_below_40: TotalAmmoBelow40Event;
	player_hurt_concise: PlayerHurtConciseEvent;
	tank_killed: TankKilledEvent;
	achievement_write_failed: AchievementWriteFailedEvent;
	ghost_spawn_time: GhostSpawnTimeEvent;
	survival_at_30min: SurvivalAt30minEvent;
	explain_pre_drawbridge: ExplainPreDrawbridgeEvent;
	explain_drawbridge: ExplainDrawbridgeEvent;
	explain_perimeter: ExplainPerimeterEvent;
	explain_deactivate_alarm: ExplainDeactivateAlarmEvent;
	explain_impound_lot: ExplainImpoundLotEvent;
	explain_decon: ExplainDeconEvent;
	explain_mall_window: ExplainMallWindowEvent;
	explain_mall_alarm: ExplainMallAlarmEvent;
	explain_coaster: ExplainCoasterEvent;
	explain_coaster_stop: ExplainCoasterStopEvent;
	explain_decon_wait: ExplainDeconWaitEvent;
	gauntlet_finale_start: GauntletFinaleStartEvent;
	explain_float: ExplainFloatEvent;
	explain_ferry_button: ExplainFerryButtonEvent;
	explain_hatch_button: ExplainHatchButtonEvent;
	explain_shack_button: ExplainShackButtonEvent;
	upgrade_incendiary_ammo: UpgradeIncendiaryAmmoEvent;
	upgrade_explosive_ammo: UpgradeExplosiveAmmoEvent;
	receive_upgrade: ReceiveUpgradeEvent;
	explain_vehicle_arrival: ExplainVehicleArrivalEvent;
	mounted_gun_start: MountedGunStartEvent;
	mounted_gun_overheated: MountedGunOverheatedEvent;
	explain_burger_sign: ExplainBurgerSignEvent;
	explain_carousel_button: ExplainCarouselButtonEvent;
	explain_carousel_destination: ExplainCarouselDestinationEvent;
	explain_stage_lighting: ExplainStageLightingEvent;
	explain_stage_finale_start: ExplainStageFinaleStartEvent;
	explain_stage_survival_start: ExplainStageSurvivalStartEvent;
	ability_out_of_range: AbilityOutOfRangeEvent;
	explain_stage_pyrotechnics: ExplainStagePyrotechnicsEvent;
	explain_c3m4_radio1: ExplainC3m4Radio1Event;
	explain_c3m4_radio2: ExplainC3m4Radio2Event;
	explain_gates_are_open: ExplainGatesAreOpenEvent;
	explain_c2m4_ticketbooth: ExplainC2m4TicketboothEvent;
	explain_c3m4_rescue: ExplainC3m4RescueEvent;
	explain_hotel_elevator_doors: ExplainHotelElevatorDoorsEvent;
	explain_gun_shop_tanker: ExplainGunShopTankerEvent;
	explain_gun_shop: ExplainGunShopEvent;
	explain_store_alarm: ExplainStoreAlarmEvent;
	explain_store_item: ExplainStoreItemEvent;
	explain_store_item_stop: ExplainStoreItemStopEvent;
	explain_survival_generic: ExplainSurvivalGenericEvent;
	explain_survival_alarm: ExplainSurvivalAlarmEvent;
	explain_survival_radio: ExplainSurvivalRadioEvent;
	explain_survival_carousel: ExplainSurvivalCarouselEvent;
	explain_return_item: ExplainReturnItemEvent;
	explain_save_items: ExplainSaveItemsEvent;
	spit_burst: SpitBurstEvent;
	entered_spit: EnteredSpitEvent;
	temp_c4m1_getgas: TempC4m1GetgasEvent;
	temp_c4m3_return_to_boat: TempC4m3ReturnToBoatEvent;
	explain_c1m4_finale: ExplainC1m4FinaleEvent;
	c1m4_scavenge_instructions: C1m4ScavengeInstructionsEvent;
	punched_clown: PunchedClownEvent;
	charger_killed: ChargerKilledEvent;
	spitter_killed: SpitterKilledEvent;
	jockey_ride: JockeyRideEvent;
	jockey_ride_end: JockeyRideEndEvent;
	jockey_killed: JockeyKilledEvent;
	non_melee_fired: NonMeleeFiredEvent;
	infected_decapitated: InfectedDecapitatedEvent;
	upgrade_pack_added: UpgradePackAddedEvent;
	vomit_bomb_tank: VomitBombTankEvent;
	triggered_car_alarm: TriggeredCarAlarmEvent;
	panic_event_finished: PanicEventFinishedEvent;
	charger_charge_start: ChargerChargeStartEvent;
	charger_charge_end: ChargerChargeEndEvent;
	charger_carry_start: ChargerCarryStartEvent;
	charger_carry_end: ChargerCarryEndEvent;
	charger_impact: ChargerImpactEvent;
	charger_pummel_start: ChargerPummelStartEvent;
	charger_pummel_end: ChargerPummelEndEvent;
	strongman_bell_knocked_off: StrongmanBellKnockedOffEvent;
	molotov_thrown: MolotovThrownEvent;
	gas_can_forced_drop: GasCanForcedDropEvent;
	explain_survivor_glows_disabled: ExplainSurvivorGlowsDisabledEvent;
	explain_item_glows_disabled: ExplainItemGlowsDisabledEvent;
	explain_rescue_disabled: ExplainRescueDisabledEvent;
	explain_bodyshots_reduced: ExplainBodyshotsReducedEvent;
	explain_witch_instant_kill: ExplainWitchInstantKillEvent;
	set_instructor_group_enabled: SetInstructorGroupEnabledEvent;
	stashwhacker_game_won: StashwhackerGameWonEvent;
	versus_marker_reached: VersusMarkerReachedEvent;
	start_score_animation: StartScoreAnimationEvent;
	survival_round_start: SurvivalRoundStartEvent;
	scavenge_gas_can_destroyed: ScavengeGasCanDestroyedEvent;
	server_spawn: ServerSpawnEvent;
	server_pre_shutdown: ServerPreShutdownEvent;
	server_shutdown: ServerShutdownEvent;
	server_cvar: ServerCvarEvent;
	server_message: ServerMessageEvent;
	server_addban: ServerAddbanEvent;
	server_removeban: ServerRemovebanEvent;
	player_connect: PlayerConnectEvent;
	player_info: PlayerInfoEvent;
	player_disconnect: PlayerDisconnectEvent;
	player_activate: PlayerActivateEvent;
	player_connect_full: PlayerConnectFullEvent;
	player_say: PlayerSayEvent;
}

export type GameEventName =
	| "team_info"
	| "team_score"
	| "teamplay_broadcast_audio"
	| "player_team"
	| "player_class"
	| "player_death"
	| "player_hurt"
	| "player_chat"
	| "player_score"
	| "player_spawn"
	| "player_shoot"
	| "player_use"
	| "player_changename"
	| "player_hintmessage"
	| "game_init"
	| "game_newmap"
	| "game_start"
	| "game_end"
	| "round_start"
	| "round_end"
	| "game_message"
	| "break_breakable"
	| "break_prop"
	| "entity_killed"
	| "bonus_updated"
	| "achievement_event"
	| "survival_goal_reached"
	| "physgun_pickup"
	| "flare_ignite_npc"
	| "helicopter_grenade_punt_miss"
	| "user_data_downloaded"
	| "ragdoll_dissolved"
	| "pounce_fail"
	| "hit_safe_room"
	| "spawned_as_tank"
	| "instructor_server_hint_create"
	| "instructor_server_hint_stop"
	| "player_biofeedback_scl"
	| "player_death"
	| "player_hurt"
	| "player_team"
	| "player_bot_replace"
	| "bot_player_replace"
	| "player_afk"
	| "weapon_fire"
	| "weapon_fire_on_empty"
	| "weapon_reload"
	| "weapon_zoom"
	| "ability_use"
	| "ammo_pickup"
	| "item_pickup"
	| "grenade_bounce"
	| "hegrenade_detonate"
	| "bullet_impact"
	| "player_footstep"
	| "player_jump"
	| "player_blind"
	| "player_falldamage"
	| "player_ledge_grab"
	| "player_ledge_release"
	| "door_moving"
	| "door_open"
	| "door_close"
	| "door_unlocked"
	| "rescue_door_open"
	| "waiting_checkpoint_door_used"
	| "waiting_door_used_versus"
	| "waiting_checkpoint_button_used"
	| "success_checkpoint_button_used"
	| "round_freeze_end"
	| "round_start_pre_entity"
	| "round_start_post_nav"
	| "nav_blocked"
	| "nav_generate"
	| "round_end_message"
	| "round_end"
	| "vote_ended"
	| "vote_started"
	| "vote_changed"
	| "vote_passed"
	| "vote_failed"
	| "vote_cast_yes"
	| "vote_cast_no"
	| "infected_hurt"
	| "infected_death"
	| "hostname_changed"
	| "difficulty_changed"
	| "finale_start"
	| "finale_rush"
	| "finale_escape_start"
	| "finale_vehicle_ready"
	| "finale_vehicle_leaving"
	| "finale_win"
	| "mission_lost"
	| "finale_radio_start"
	| "finale_radio_damaged"
	| "final_reportscreen"
	| "map_transition"
	| "player_transitioned"
	| "heal_begin"
	| "heal_success"
	| "heal_end"
	| "heal_interrupted"
	| "ammo_pack_used"
	| "give_weapon"
	| "pills_used"
	| "pills_used_fail"
	| "ammo_pack_used_fail_no_weapon"
	| "ammo_pack_used_fail_full"
	| "ammo_pack_used_fail_doesnt_use_ammo"
	| "ammo_pile_weapon_cant_use_ammo"
	| "defibrillator_begin"
	| "defibrillator_used"
	| "defibrillator_used_fail"
	| "defibrillator_interrupted"
	| "upgrade_pack_begin"
	| "upgrade_pack_used"
	| "upgrade_item_already_used"
	| "upgrade_failed_no_primary"
	| "dead_survivor_visible"
	| "adrenaline_used"
	| "revive_begin"
	| "revive_success"
	| "revive_end"
	| "drag_begin"
	| "drag_end"
	| "player_incapacitated"
	| "player_incapacitated_start"
	| "player_entered_start_area"
	| "player_first_spawn"
	| "player_left_start_area"
	| "player_entered_checkpoint"
	| "player_left_checkpoint"
	| "player_shoved"
	| "entity_shoved"
	| "player_jump_apex"
	| "player_blocked"
	| "player_now_it"
	| "player_no_longer_it"
	| "witch_harasser_set"
	| "witch_spawn"
	| "witch_killed"
	| "tank_spawn"
	| "melee_kill"
	| "area_cleared"
	| "award_earned"
	| "tongue_grab"
	| "tongue_broke_bent"
	| "tongue_release"
	| "choke_start"
	| "choke_end"
	| "choke_stopped"
	| "tongue_pull_stopped"
	| "lunge_shove"
	| "lunge_pounce"
	| "pounce_end"
	| "pounce_stopped"
	| "fatal_vomit"
	| "survivor_call_for_help"
	| "survivor_rescued"
	| "survivor_rescue_abandoned"
	| "relocated"
	| "respawning"
	| "tank_frustrated"
	| "weapon_given"
	| "weapon_drop"
	| "break_breakable"
	| "achievement_earned"
	| "spec_target_updated"
	| "spawner_give_item"
	| "create_panic_event"
	| "explain_pills"
	| "explain_weapons"
	| "entity_visible"
	| "weapon_spawn_visible"
	| "boomer_near"
	| "explain_pre_radio"
	| "started_pre_radio"
	| "explain_radio"
	| "explain_gas_truck"
	| "explain_panic_button"
	| "explain_elevator_button"
	| "explain_lift_button"
	| "explain_church_door"
	| "explain_emergency_door"
	| "explain_crane"
	| "explain_bridge"
	| "explain_gas_can_panic"
	| "explain_van_panic"
	| "explain_mainstreet"
	| "explain_train_lever"
	| "explain_disturbance"
	| "explain_scavenge_goal"
	| "explain_scavenge_leave_area"
	| "begin_scavenge_overtime"
	| "scavenge_round_start"
	| "scavenge_round_halftime"
	| "scavenge_round_finished"
	| "scavenge_score_tied"
	| "versus_round_start"
	| "gascan_pour_blocked"
	| "gascan_pour_completed"
	| "gascan_dropped"
	| "gascan_pour_interrupted"
	| "scavenge_match_finished"
	| "versus_match_finished"
	| "use_target"
	| "player_use"
	| "friendly_fire"
	| "gameinstructor_draw"
	| "gameinstructor_nodraw"
	| "request_weapon_stats"
	| "player_talking_state"
	| "weapon_pickup"
	| "hunter_punched"
	| "hunter_headshot"
	| "zombie_ignited"
	| "boomer_exploded"
	| "non_pistol_fired"
	| "weapon_fire_at_40"
	| "total_ammo_below_40"
	| "player_hurt_concise"
	| "tank_killed"
	| "achievement_write_failed"
	| "ghost_spawn_time"
	| "survival_at_30min"
	| "explain_pre_drawbridge"
	| "explain_drawbridge"
	| "explain_perimeter"
	| "explain_deactivate_alarm"
	| "explain_impound_lot"
	| "explain_decon"
	| "explain_mall_window"
	| "explain_mall_alarm"
	| "explain_coaster"
	| "explain_coaster_stop"
	| "explain_decon_wait"
	| "gauntlet_finale_start"
	| "explain_float"
	| "explain_ferry_button"
	| "explain_hatch_button"
	| "explain_shack_button"
	| "upgrade_incendiary_ammo"
	| "upgrade_explosive_ammo"
	| "receive_upgrade"
	| "explain_vehicle_arrival"
	| "mounted_gun_start"
	| "mounted_gun_overheated"
	| "explain_burger_sign"
	| "explain_carousel_button"
	| "explain_carousel_destination"
	| "explain_stage_lighting"
	| "explain_stage_finale_start"
	| "explain_stage_survival_start"
	| "ability_out_of_range"
	| "explain_stage_pyrotechnics"
	| "explain_c3m4_radio1"
	| "explain_c3m4_radio2"
	| "explain_gates_are_open"
	| "explain_c2m4_ticketbooth"
	| "explain_c3m4_rescue"
	| "explain_hotel_elevator_doors"
	| "explain_gun_shop_tanker"
	| "explain_gun_shop"
	| "explain_store_alarm"
	| "explain_store_item"
	| "explain_store_item_stop"
	| "explain_survival_generic"
	| "explain_survival_alarm"
	| "explain_survival_radio"
	| "explain_survival_carousel"
	| "explain_return_item"
	| "explain_save_items"
	| "spit_burst"
	| "entered_spit"
	| "temp_c4m1_getgas"
	| "temp_c4m3_return_to_boat"
	| "explain_c1m4_finale"
	| "c1m4_scavenge_instructions"
	| "punched_clown"
	| "charger_killed"
	| "spitter_killed"
	| "jockey_ride"
	| "jockey_ride_end"
	| "jockey_killed"
	| "non_melee_fired"
	| "infected_decapitated"
	| "upgrade_pack_added"
	| "vomit_bomb_tank"
	| "triggered_car_alarm"
	| "panic_event_finished"
	| "charger_charge_start"
	| "charger_charge_end"
	| "charger_carry_start"
	| "charger_carry_end"
	| "charger_impact"
	| "charger_pummel_start"
	| "charger_pummel_end"
	| "strongman_bell_knocked_off"
	| "molotov_thrown"
	| "gas_can_forced_drop"
	| "explain_survivor_glows_disabled"
	| "explain_item_glows_disabled"
	| "explain_rescue_disabled"
	| "explain_bodyshots_reduced"
	| "explain_witch_instant_kill"
	| "set_instructor_group_enabled"
	| "stashwhacker_game_won"
	| "versus_marker_reached"
	| "start_score_animation"
	| "survival_round_start"
	| "scavenge_gas_can_destroyed"
	| "server_spawn"
	| "server_pre_shutdown"
	| "server_shutdown"
	| "server_cvar"
	| "server_message"
	| "server_addban"
	| "server_removeban"
	| "player_connect"
	| "player_info"
	| "player_disconnect"
	| "player_activate"
	| "player_connect_full"
	| "player_say";
