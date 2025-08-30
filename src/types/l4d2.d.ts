type table = any;

export interface Convars {
	/**
	 * Returns the convar value for the entindex as a string. Only works on client convars with the FCVAR_USERINFO flag. Convars without FCVAR_USERINFO or non-existent ones return empty string
	 * @param name string
	 * @param entindex int
	 * @returns string
	 */
	GetClientConvarValue(name: string, entindex: number): string;

	/**
	 * Returns the convar as a string. Returns null if no such convar.
	 * @param name string
	 * @returns string
	 */
	GetStr(name: string): string;

	/**
	 * Returns the convar as a float. Returns null if no such convar.
	 * @param name string
	 * @returns float
	 */
	GetFloat(name: string): number;

	/**
	 * Sets the value of the convar. Supported types are bool, int, float, string.
	 * @param name string
	 * @param arg value
	 * @returns void
	 */
	SetValue(name: string, arg: value): void;
}

export interface CDirector {
	/**
	 * Returns true if all Survivors are in the battlefield.
	 * @returns bool
	 */
	AreAllSurvivorsInBattlefield(): boolean;

	/**
	 * True when all survivors are within the finale area.
	 * @returns bool
	 */
	AreAllSurvivorsInFinaleArea(): boolean;

	/**
	 * True when teams are flipped in Versus modes.
	 * @returns bool
	 */
	AreTeamsFlipped(): boolean;

	/**
	 * Mark all cached bot query results as invalid.
	 * @returns void
	 */
	ClearCachedBotQueries(): void;

	/**
	 * Push the ScriptedMode to next stage - i.e. request GNSS be called.
	 * @returns void
	 */
	ForceNextStage(): void;

	/**
	 * Get the distance between the lead and trailing survivors, smoothed over time.
	 * @returns float
	 */
	GetAveragedSurvivorSpan(): number;

	/**
	 * Get the rate at which the lead survivor is moving along the flow, smoothed over time.
	 * @returns float
	 */
	GetAveragedSurvivorSpeed(): number;

	/**
	 * Returns the closest active pipe bomb from this origin.
	 * @param origin Vector
	 * @returns CBaseEntity
	 */
	GetClosestActivePipeBomb(origin: Vector): CBaseEntity;

	/**
	 * Returns the closest character who is IT to the passed character.
	 * @param character CBaseCombatCharacter
	 * @returns CBaseCombatCharacter
	 */
	GetClosestCharacterWhoIsIT(
		character: CBaseCombatCharacter
	): CBaseCombatCharacter;

	/**
	 * Returns the closest Survivor from the passed origin, if incapped Survivors are included in search, or on rescue vehicle.
	 * @param origin Vector
	 * @param bIncludeIncap bool
	 * @param bIncludeOnRescueVehicle bool
	 * @returns CTerrorPlayer
	 */
	GetClosestSurvivor(
		origin: Vector,
		bIncludeIncap: boolean,
		bIncludeOnRescueVehicle: boolean
	): CTerrorPlayer;

	/**
	 * Returns number for infected currently spawned.
	 * @returns int
	 */
	GetCommonInfectedCount(): number;

	/**
	 * Get the maximum distance along the flow that the survivors have reached.
	 * @returns float
	 */
	GetFurthestSurvivorFlow(): number;

	/**
	 * Get the current game mode. If called in a mutation, it returns the current mutation, not the base mode. Will only look for the specific game mode/mutation.
	 * @returns string
	 */
	GetGameMode(): string;

	/**
	 * Get the current base game mode. Does not return the current mutation. Example, if looking for survival, it will also count for all game modes using survival as base. Such as Mutation 15 (Survival Versus)
	 * @returns string
	 */
	GetGameModeBase(): string;

	/**
	 * Returns the Survivor with the highest flow.
	 * @returns CTerrorPlayer
	 */
	GetHighestFlowSurvivor(): CTerrorPlayer;

	/**
	 * Get the end time of the cooldown timer.
	 * @returns float
	 */
	GetHoldoutCooldownEndTime(): number;

	/**
	 * Returns the Survivor with the lowest flow.
	 * @returns CTerrorPlayer
	 */
	GetLowestFlowSurvivor(): CTerrorPlayer;

	/**
	 * Get the current map name.
	 * @returns string
	 */
	GetMapName(): string;

	/**
	 * Return the current map number.
	 * @returns int
	 */
	GetMapNumber(): number;

	/**
	 * Returns the current number of mission wipes.
	 * @returns int
	 */
	GetMissionWipes(): number;

	/**
	 * Returns the number of infected waiting to spawn.
	 * @returns int
	 */
	GetPendingMobCount(): number;

	/**
	 * Returns a random alive Survivor.
	 * @returns CTerrorPlayer
	 */
	GetRandomSurvivor(): CTerrorPlayer;

	/**
     * Get the current survivor set. L4D1 Survivors = 1, L4D2 Survivors = 2.
    Bug*:
    Calling this inside mapspawn_addon or response_testbed_addon will give survivor set value of previous loaded map
    * @returns int
    */
	GetSurvivorSet(): number;

	/**
	 * Returns the time since the passed zombie type was killed.
	 * @param zombieType int
	 * @returns float
	 */
	GetTimeSinceSpecialZombieKilled(zombieType: number): number;

	/**
	 * Returns the total elapsed mission time.
	 * @returns float
	 */
	GetTotalElapsedMissionTime(): number;

	/**
	 * True when one or more survivors have left the starting safe area.
	 * @returns bool
	 */
	HasAnySurvivorLeftSafeArea(): boolean;

	/**
	 * True when one or more survivors are bypassing the Tank.
	 * @returns bool
	 */
	IsAnySurvivorBypassingTank(): boolean;

	/**
	 * Returns true if any survivor recently dealt or took damage.
	 * @returns bool
	 */
	IsAnySurvivorInCombat(): boolean;

	/**
	 * True when one or more survivors are in the exit checkpoint.
	 * @returns bool
	 */
	IsAnySurvivorInExitCheckpoint(): boolean;

	/**
	 * True when one or more survivors are in the starting safe area.
	 * @returns bool
	 */
	IsAnySurvivorInStartArea(): boolean;

	/**
	 * True when the finale has started.
	 * @returns bool
	 */
	IsFinale(): boolean;

	/**
	 * True when the finale escape is in progress.
	 * @returns bool
	 */
	IsFinaleEscapeInProgress(): boolean;

	/**
	 * True when the finale vehicle is ready.
	 * @returns bool
	 */
	IsFinaleVehicleReady(): boolean;

	/**
	 * Returns true if the finale has been won.
	 * @returns bool
	 */
	IsFinaleWon(): boolean;

	/**
	 * True if the first map in a scenario.
	 * @returns bool
	 */
	IsFirstMapInScenario(): boolean;

	/**
	 * Return true if the current campaign is originally from L4D1.
	 * @returns bool
	 */
	IsL4D1Campaign(): boolean;

	/**
	 * Returns true if the passed location is fogged to Survivors.
	 * @param origin Vector
	 * @returns bool
	 */
	IsLocationFoggedToSurvivors(origin: Vector): boolean;

	/**
	 * True if the intro is currently playing.
	 * @returns bool
	 */
	IsPlayingIntro(): boolean;

	/**
	 * Return true if game is running on a console (such as Xbox 360).
	 * @returns bool
	 */
	IsPlayingOnConsole(): boolean;

	/**
	 * True if the map is the start of the session.
	 * @returns bool
	 */
	IsSessionStartMap(): boolean;

	/**
	 * Return true if game is in single player.
	 * @returns bool
	 */
	IsSinglePlayerGame(): boolean;

	/**
	 * WhetherDirectorbelongs to a valid entity. Seems futile to use.
	 * @returns bool
	 */
	IsValid(): boolean;

	/**
	 * Returns true if any tanks are aggro on survivors.
	 * @returns bool
	 */
	IsTankInPlay(): boolean;

	/**
	 * Let the L4D1 survivors know that now is a good time to give the players an item.
	 * @returns void
	 */
	L4D1SurvivorGiveItem(): void;

	/**
	 * Plays a horde scream sound and asks survivors to speak incoming horde lines.
	 * @returns void
	 */
	PlayMegaMobWarningSounds(): void;

	/**
	 * Registers a target entity as forbidden.
	 * @param entity CBaseEntity
	 * @returns void
	 */
	RegisterForbiddenTarget(entity: CBaseEntity): void;

	/**
	 * Trigger a mob as soon as possible when in BUILD_UP.
	 * @returns void
	 */
	ResetMobTimer(): void;

	/**
	 * Reset all special timers (by type and by slot) so that hopefully mobs will spawn asap.
	 * @returns void
	 */
	ResetSpecialTimers(): void;

	/**
	 *
	 * @param time float
	 * @returns void
	 */
	SetHoldoutCooldownEndTime(time: number): void;

	/**
	 * Unregisters a target entity as forbidden.
	 * @param entity CBaseEntity
	 * @returns void
	 */
	UnregisterForbiddenTarget(entity: CBaseEntity): void;

	/**
	 * Warp all Survivors to the battlefield.
	 * @returns void
	 */
	WarpAllSurvivorsToBattlefield(): void;

	/**
	 * Warp all Survivors to the exit checkpoint.
	 * @returns void
	 */
	WarpAllSurvivorsToCheckpoint(): void;

	/**
	 * Warp all Survivors to the finale radio.
	 * @returns void
	 */
	WarpAllSurvivorsToFinale(): void;
}

export interface CEntities {
	/**
	 * Find entities by class name.
	 * @param previous handle
	 * @param class string
	 * @returns handle
	 */
	FindByClassname(
		previous: SquirrelHandle,
		className: string
	): SquirrelHandle;

	/**
	 * Find the entity with the given class name nearest to the specified point.
	 * @param class string
	 * @param origin Vector
	 * @param radius float
	 * @returns handle
	 */
	FindByClassnameNearest(
		className: string,
		origin: Vector,
		radius: number
	): SquirrelHandle;

	/**
	 * Find entities by class name within a radius, while within a set radius.
	 * @param previous handle
	 * @param class string
	 * @param origin Vector
	 * @param radius float
	 * @returns handle
	 */
	FindByClassnameWithin(
		previous: SquirrelHandle,
		className: string,
		origin: Vector,
		radius: number
	): SquirrelHandle;

	/**
	 * Find entities by a model path name.
	 * @param previous handle
	 * @param filename string
	 * @returns handle
	 */
	FindByModel(previous: SquirrelHandle, filename: string): SquirrelHandle;

	/**
	 * Find entities by targetname. Special ones including !bill will work.
	 * @param previous handle
	 * @param name string
	 * @returns handle
	 */
	FindByName(previous: SquirrelHandle, name: string): SquirrelHandle;

	/**
	 * Find entities by targetname nearest to a point, while within a set radius. Special ones including !bill will work.
	 * @param name string
	 * @param origin Vector
	 * @param radius float
	 * @returns handle
	 */
	FindByNameNearest(
		name: string,
		origin: Vector,
		radius: number
	): SquirrelHandle;

	/**
	 * Find entities by targetname within a radius. Special ones including !bill will work.
	 * @param previous handle
	 * @param name string
	 * @param origin Vector
	 * @param radius float
	 * @returns handle
	 */
	FindByNameWithin(
		previous: SquirrelHandle,
		name: string,
		origin: Vector,
		radius: number
	): SquirrelHandle;

	/**
	 * Find entities by its target.
	 * @param previous handle
	 * @param targetname string
	 * @returns handle
	 */
	FindByTarget(previous: SquirrelHandle, targetname: string): SquirrelHandle;

	/**
	 * Returns entities within a set radius.
	 * @param previous handle
	 * @param origin Vector
	 * @param radius float
	 * @returns handle
	 */
	FindInSphere(
		previous: SquirrelHandle,
		origin: Vector,
		radius: number
	): SquirrelHandle;

	/**
	 * The first entity that spawned (Always worldspawn). Can be used to begin an iteration for a list of entities.
	 * @returns handle
	 */
	First(): SquirrelHandle;

	/**
	 * At the given reference of a previously-found entity, returns the next one after it in the list.
	 * @param previous handle
	 * @returns handle
	 */
	Next(previous: SquirrelHandle): SquirrelHandle;

	/**
	 * Whether the handle for Entities is a valid handle.
	 * @returns bool
	 */
	IsValid(): boolean;
}

export interface CScriptEntityOutputs {
	/**
	 * Adds a new output to the entity.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @param targetName string
	 * @param inputName string
	 * @param parameter string
	 * @param delay float
	 * @param timesToFire int
	 * @returns void
	 */
	AddOutput(
		entity: CBaseEntity,
		outputName: string,
		targetName: string,
		inputName: string,
		parameter: string,
		delay: number,
		timesToFire: number
	): void;

	/**
	 * Returns the number of array elements.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @returns int
	 */
	GetNumElements(entity: CBaseEntity, outputName: string): number;

	/**
	 * Fills the passed table with output information.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @param arg table
	 * @param arrayElement int
	 * @returns void
	 */
	GetOutputTable(
		entity: CBaseEntity,
		outputName: string,
		arg: table,
		arrayElement: number
	): void;

	/**
	 * Returns true if an action exists for the output.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @returns bool
	 */
	HasAction(entity: CBaseEntity, outputName: string): boolean;

	/**
	 * Returns true if the output exists.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @returns bool
	 */
	HasOutput(entity: CBaseEntity, outputName: string): boolean;

	/**
	 * Removes an output from the entity.
	 * @param entity CBaseEntity
	 * @param outputName string
	 * @param targetName string
	 * @param inputName string
	 * @param parameter string
	 * @returns void
	 */
	RemoveOutput(
		entity: CBaseEntity,
		outputName: string,
		targetName: string,
		inputName: string,
		parameter: string
	): void;
}

export interface CNavMesh {
	/**
	 * Get nav ladder from ray.
	 * @param startpos Vector
	 * @param endpos Vector
	 * @param ignoreArea TerrorNavArea
	 * @returns CNavLadder
	 */
	FindLadderAlongRay(
		startpos: Vector,
		endpos: Vector,
		ignoreArea: TerrorNavArea
	): CNavLadder;

	/**
	 * Get nav area from ray.
	 * @param startpos Vector
	 * @param endpos Vector
	 * @param ignoreArea TerrorNavArea
	 * @returns TerrorNavArea
	 */
	FindNavAreaAlongRay(
		startpos: Vector,
		endpos: Vector,
		ignoreArea: TerrorNavArea
	): TerrorNavArea;

	/**
	 * Fills a passed in table of all nav areas.
	 * @param arg table
	 * @returns void
	 */
	GetAllAreas(arg: table): void;

	/**
	 * Fills a passed in table of all nav ladders.
	 * @param arg table
	 * @returns void
	 */
	GetAllLadders(arg: table): void;

	/**
	 * Fills a passed in table of all nav areas that have the specified attributes.
	 * @param bits int
	 * @param arg table
	 * @returns void
	 */
	GetAreasWithAttributes(bits: number, arg: table): void;

	/**
	 * Get nav ladder by ID.
	 * @param id int
	 * @returns CNavLadder
	 */
	GetLadderByID(id: number): CNavLadder;

	/**
	 * Return total number of nav ladders.
	 * @returns int
	 */
	GetLadderCount(): number;

	/**
	 * Given a position in the world, return the nav area that is closest and at the same height, or beneath it.
	 * @param origin Vector
	 * @param flBeneath float
	 * @returns TerrorNavArea
	 */
	GetNavArea(origin: Vector, flBeneath: number): TerrorNavArea;

	/**
	 * Get nav area by ID.
	 * @param id int
	 * @returns TerrorNavArea
	 */
	GetNavAreaByID(id: number): TerrorNavArea;

	/**
	 * Return total number of nav areas.
	 * @returns int
	 */
	GetNavAreaCount(): number;

	/**
	 * Fills table with areas from a path. Returns whether a path was found. If 'endArea' is NULL, will compute a path as close as possible to 'goalPos'.
	 * @param startArea TerrorNavArea
	 * @param endArea TerrorNavArea
	 * @param goalPos Vector
	 * @param flMaxPathLength float
	 * @param teamID int
	 * @param ignoreNavBlockers bool
	 * @param arg table
	 * @returns bool
	 */
	GetNavAreasFromBuildPath(
		startArea: TerrorNavArea,
		endArea: TerrorNavArea,
		goalPos: Vector,
		flMaxPathLength: number,
		teamID: number,
		ignoreNavBlockers: boolean,
		arg: table
	): boolean;

	/**
	 * Fills a passed in table of nav areas within radius.
	 * @param origin Vector
	 * @param radius float
	 * @param arg table
	 * @returns void
	 */
	GetNavAreasInRadius(origin: Vector, radius: number, arg: table): void;

	/**
	 * Fills passed in table with areas overlapping entity's extent.
	 * @param entity CBaseEntity
	 * @param arg table
	 * @returns void
	 */
	GetNavAreasOverlappingEntityExtent(entity: CBaseEntity, arg: table): void;

	/**
	 * Given a position in the world, return the nav area that is closest and at the same height, or beneath it.
	 * @param origin Vector
	 * @param maxDist float
	 * @param checkLOS bool
	 * @param checkGround bool
	 * @returns TerrorNavArea
	 */
	GetNearestNavArea(
		origin: Vector,
		maxDist: number,
		checkLOS: boolean,
		checkGround: boolean
	): TerrorNavArea;

	/**
	 * Fills a passed in table of all obstructing entities.
	 * @param arg table
	 * @returns void
	 */
	GetObstructingEntities(arg: table): void;

	/**
	 * Whether the handle belongs to a valid entity. Redundant as navigation meshes are not entity related.
	 * @returns bool
	 */
	IsValid(): boolean;

	/**
	 * Returns true if a path exists. If 'endArea' is NULL, will compute a path as close as possible to 'goalPos'.
	 * @param startArea TerrorNavArea
	 * @param endArea TerrorNavArea
	 * @param goalPos Vector
	 * @param flMaxPathLength float
	 * @param teamID int
	 * @param ignoreNavBlockers bool
	 * @returns bool
	 */
	NavAreaBuildPath(
		startArea: TerrorNavArea,
		endArea: TerrorNavArea,
		goalPos: Vector,
		flMaxPathLength: number,
		teamID: number,
		ignoreNavBlockers: boolean
	): boolean;

	/**
	 * Compute distance between two areas. Return -1 if can't reach 'endArea' from 'startArea'.
	 * @param startArea TerrorNavArea
	 * @param endArea TerrorNavArea
	 * @param flMaxPathLength float
	 * @returns float
	 */
	NavAreaTravelDistance(
		startArea: TerrorNavArea,
		endArea: TerrorNavArea,
		flMaxPathLength: number
	): number;

	/**
	 * Registers an entity as an avoidance obstacle.
	 * @param entity CBaseEntity
	 * @returns void
	 */
	RegisterAvoidanceObstacle(entity: CBaseEntity): void;

	/**
	 * Unblock the rescue vehicle nav areas so bots can path through them.
	 * @returns void
	 */
	UnblockRescueVehicleNav(): void;

	/**
	 * Unregisters an entity as an avoidance obstacle.
	 * @param entity CBaseEntity
	 * @returns void
	 */
	UnregisterAvoidanceObstacle(entity: CBaseEntity): void;
}

export interface CNetPropManager {
	/**
	 * Returns the size of an netprop array, or -1.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns int
	 */
	GetPropArraySize(entity: CBaseEntity, propertyName: string): number;

	/**
	 * Reads an EHANDLE-valued netprop (21 bit integer). Returns the script handle of the entity.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns CBaseEntity
	 */
	GetPropEntity(entity: CBaseEntity, propertyName: string): CBaseEntity;

	/**
	 * Reads an EHANDLE-valued netprop (21 bit integer) from an array. Returns the script handle of the entity.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param arrayElement int
	 * @returns CBaseEntity
	 */
	GetPropEntityArray(
		entity: CBaseEntity,
		propertyName: string,
		arrayElement: number
	): CBaseEntity;

	/**
	 * Reads a float-valued netprop.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns float
	 */
	GetPropFloat(entity: CBaseEntity, propertyName: string): number;

	/**
	 * Reads a float-valued netprop from an array.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param arrayElement int
	 * @returns float
	 */
	GetPropFloatArray(
		entity: CBaseEntity,
		propertyName: string,
		arrayElement: number
	): number;

	/**
	 * Reads an integer-valued netprop.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns int
	 */
	GetPropInt(entity: CBaseEntity, propertyName: string): number;

	/**
	 * Reads an integer-valued netprop from an array.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param arrayElement int
	 * @returns int
	 */
	GetPropIntArray(
		entity: CBaseEntity,
		propertyName: string,
		arrayElement: number
	): number;

	/**
	 * Reads an string-valued netprop.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns string
	 */
	GetPropString(entity: CBaseEntity, propertyName: string): string;

	/**
	 * Reads an string-valued netprop from an array.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param arrayElement int
	 * @returns string
	 */
	GetPropStringArray(
		entity: CBaseEntity,
		propertyName: string,
		arrayElement: number
	): string;

	/**
	 * Returns the name of the netprop type as a string.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns string
	 */
	GetPropType(entity: CBaseEntity, propertyName: string): string;

	/**
 * Reads a 3D vector-valued netprop.
Todo: 	Does it work for other dimensions too?
 * @param entity CBaseEntity
 * @param propertyName string
 * @returns Vector
 */
	GetPropVector(entity: CBaseEntity, propertyName: string): Vector;

	/**
	 * Reads a 3D vector-valued netprop from an array.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param arrayElement int
	 * @returns Vector
	 */
	GetPropVectorArray(
		entity: CBaseEntity,
		propertyName: string,
		arrayElement: number
	): Vector;

	/**
	 * Checks if a netprop exists.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @returns bool
	 */
	HasProp(entity: CBaseEntity, propertyName: string): boolean;

	/**
	 * Sets an EHANDLE-valued netprop (21 bit integer) to reference the specified entity.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value CBaseEntity
	 * @returns void
	 */
	SetPropEntity(
		entity: CBaseEntity,
		propertyName: string,
		value: CBaseEntity
	): void;

	/**
	 * Sets an EHANDLE-valued netprop (21 bit integer) from an array to reference the specified entity.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value CBaseEntity
	 * @param arrayElement int
	 * @returns void
	 */
	SetPropEntityArray(
		entity: CBaseEntity,
		propertyName: string,
		value: CBaseEntity,
		arrayElement: number
	): void;

	/**
	 * Sets a netprop to the specified float.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value float
	 * @returns void
	 */
	SetPropFloat(
		entity: CBaseEntity,
		propertyName: string,
		value: number
	): void;

	/**
	 * Sets a netprop from an array to the specified float.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value float
	 * @param arrayElement int
	 * @returns void
	 */
	SetPropFloatArray(
		entity: CBaseEntity,
		propertyName: string,
		value: number,
		arrayElement: number
	): void;

	/**
	 * Sets a netprop to the specified integer.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value int
	 * @returns void
	 */
	SetPropInt(entity: CBaseEntity, propertyName: string, value: number): void;

	/**
	 * Sets a netprop from an array to the specified integer.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value int
	 * @param arrayElement int
	 * @returns void
	 */
	SetPropIntArray(
		entity: CBaseEntity,
		propertyName: string,
		value: number,
		arrayElement: number
	): void;

	/**
	 * Sets a netprop to the specified string.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value string
	 * @returns void
	 */
	SetPropString(
		entity: CBaseEntity,
		propertyName: string,
		value: string
	): void;

	/**
	 * Sets a netprop from an array to the specified string.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value string
	 * @param arrayElement int
	 * @returns void
	 */
	SetPropStringArray(
		entity: CBaseEntity,
		propertyName: string,
		value: string,
		arrayElement: number
	): void;

	/**
	 * Sets a netprop to the specified vector.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value Vector
	 * @returns void
	 */
	SetPropVector(
		entity: CBaseEntity,
		propertyName: string,
		value: Vector
	): void;

	/**
	 * Sets a netprop from an array to the specified vector.
	 * @param entity CBaseEntity
	 * @param propertyName string
	 * @param value Vector
	 * @param arrayElement int
	 * @returns void
	 */
	SetPropVectorArray(
		entity: CBaseEntity,
		propertyName: string,
		value: Vector,
		arrayElement: number
	): void;
}

export interface CScriptResponseCriteria {
	/**
	 * Fills the passed table with all criteria.
	 * @param entity CBaseEntity
	 * @param arg table
	 * @returns void
	 */
	GetTable(entity: CBaseEntity, arg: table): void;

	/**
	 * Returns a string.
	 * @param entity CBaseEntity
	 * @param criteriaName string
	 * @returns string
	 */
	GetValue(entity: CBaseEntity, criteriaName: string): string;

	/**
	 * Returns true if the criterion exists.
	 * @param entity CBaseEntity
	 * @param criteriaName string
	 * @returns bool
	 */
	HasCriterion(entity: CBaseEntity, criteriaName: string): boolean;
}

export interface CBaseEntity {
	/**
	 * Apply a Velocity Impulse as a world space impulse vector.
	 * @param impulse Vector
	 * @returns void
	 */
	ApplyAbsVelocityImpulse(impulse: Vector): void;

	/**
	 * Apply an Angular Velocity Impulse in entity local space. The direction of the input vector is the rotation axis, and the length is the magnitude of the impulse.
	 * @param impulse Vector
	 * @returns void
	 */
	ApplyLocalAngularVelocityImpulse(impulse: Vector): void;

	/**
	 * Adds an I/O connection that will call the named function when the specified output fires.
	 * @param output string
	 * @param function string
	 * @returns void
	 */
	ConnectOutput(output: string, func: string): void;

	/**
	 * Removes a connected script function from an I/O event.
	 * @param output string
	 * @param function string
	 * @returns void
	 */
	DisconnectOutput(output: string, func: string): void;

	/**
 * Returns the first entity parented to this one. Needs to be used in combination with NextMovePeer to iterate over all children.
Tip:
Example usage:
for (local child = entity.FirstMoveChild(); child != null; child = child.NextMovePeer())
 * @returns handle
 */
	FirstMoveChild(): SquirrelHandle;

	/**
	 * Returns the orientation of the entity in the world.
	 * @returns QAngle
	 */
	GetAngles(): QAngle;

	/**
	 * Returns any constant velocity currently being imparted onto the entity. This includes being pushed by effects like trigger_push and players standing on moving geometry like elevators. Should always returns a zero vector if the entity is not affected by any movement effects.
	 * @returns Vector
	 */
	GetBaseVelocity(): Vector;

	/**
	 * Get world space center of object - absolute coords.
	 * @returns Vector
	 */
	GetCenter(): Vector;

	/**
	 * Returns the entity class. This includesplayerandinfected.
	 * @returns string
	 */
	GetClassname(): string;

	/**
 * Looks up a response context and returns it if available. May return string, float, or null (if the context isn't found).

Bug*:
Always returns null for contexts with numeric value
Bug*:
Can return value for expired contexts
 * @param name string
 * @returns variable
 */
	GetContext(name: string): variable;

	/**
	 * Get a C++ EHANDLE reference of the entity. This is an opaque type not directly usable by Squirrel, not a normal script handle. Only necessary for CPointScriptUseTarget functions. ↓
	 * @returns unknown
	 */
	GetEntityHandle(): unknown;

	/**
	 * Returns the entity index. This is the same type of index used in most game events.
	 * @returns int
	 */
	GetEntityIndex(): number;

	/**
	 * Get the forward vector of the entity.
	 * @returns Vector
	 */
	GetForwardVector(): Vector;

	/**
	 * Returns the current health of the entity (does not include survivor temporary health).
	 * @returns int
	 */
	GetHealth(): number;

	/**
	 * Returns the orientation of the entity relative to it's parent or attachment point.
	 * @returns QAngle
	 */
	GetLocalAngles(): QAngle;

	/**
	 * Maybe local angvel
	 * @returns QAngle
	 */
	GetLocalAngularVelocity(): QAngle;

	/**
	 * Returns the origin of the entity relative to it's parent or attachment point.
	 * @returns Vector
	 */
	GetLocalOrigin(): Vector;

	/**
	 * Get Entity relative velocity
	 * @returns Vector
	 */
	GetLocalVelocity(): Vector;

	/**
	 * Returns the maximum health of the entity.
	 * @returns int
	 */
	GetMaxHealth(): number;

	/**
	 * Returns the file name of the model used by the entity (if applicable).
	 * @returns string
	 */
	GetModelName(): string;

	/**
	 * If in hierarchy, retrieves the entity's parent
	 * @returns handle
	 */
	GetMoveParent(): SquirrelHandle;

	/**
	 * Returns the targetname of the entity.
	 * @returns string
	 */
	GetName(): string;

	/**
	 * Returns the origin of the entity in the world.
	 * @returns Vector
	 */
	GetOrigin(): Vector;

	/**
	 * Get the owner entity, if there is one.
	 * @returns handle
	 */
	GetOwnerEntity(): SquirrelHandle;

	/**
	 * Get the entity name stripped of template unique decoration.
	 * @returns string
	 */
	GetPreTemplateName(): string;

	/**
	 * If in hierarchy, walks up the hierarchy to find the root parent.
	 * @returns handle
	 */
	GetRootMoveParent(): SquirrelHandle;

	/**
 * Returns the name of the entity's think function.
Tip:
Retrieve the actual script identifier with NetProps.GetPropString(ent, "m_iszScriptId")
 * @returns string
 */
	GetScriptId(): string;

	/**
	 * Retrieve the table storing the Entity Script associated with this entity, null otherwise.
	 * @returns table
	 */
	GetScriptScope(): table;

	/**
	 * Returns a local velocity Vector.
	 * @returns Vector
	 */
	GetVelocity(): Vector;

	/**
	 * Does this entity belong to the player class.
	 * @returns bool
	 */
	IsPlayer(): boolean;

	/**
	 * Whether the handle still belongs to an entity that's still valid, could become invalid in cases such as the entity, like a destroyed func_breakable.(?)
	 * @returns bool
	 */
	IsValid(): boolean;

	/**
	 * Removes the entity.
	 * @returns void
	 */
	Kill(): void;

	/**
	 * Returns the next child of this entity's parent. Used to continue iteration from FirstMoveChild().
	 * @returns handle
	 */
	NextMovePeer(): SquirrelHandle;

	/**
	 * Takes duration, value for a temporary override
	 * @param duration float
	 * @param friction float
	 * @returns void
	 */
	OverrideFriction(duration: number, friction: number): void;

	/**
	 * Precache a model after the map has loaded and return index of the model.
	 * @param filename string
	 * @returns int
	 */
	PrecacheModel(filename: string): number;

	/**
	 * Precache a sound file, used by the specified soundscript.
	 * @param soundscript string
	 * @returns void
	 */
	PrecacheScriptSound(soundscript: string): void;

	/**
	 * Sets the orientation of the entity.
	 * @param direction QAngle
	 * @returns void
	 */
	SetAngles(direction: QAngle): void;

	/**
	 * Stores any key/value pair in this entity's dialog contexts. Value must be a string. Will last for duration (set -1 to mean 'forever').
	 * @param name string
	 * @param value string
	 * @param duration float
	 * @returns void
	 */
	SetContext(name: string, value: string, duration: number): void;

	/**
	 * Stores any key/value pair in this entity's dialog contexts. Value must be a number (int or float). Will last for duration (set -1 to mean 'forever').
	 * @param name string
	 * @param value float
	 * @param duration float
	 * @returns void
	 */
	SetContextNum(name: string, value: number, duration: number): void;

	/**
	 * Set the orientation of the entity to have this forward vector.
	 * @param direction Vector
	 * @returns void
	 */
	SetForwardVector(direction: Vector): void;

	/**
	 * Set PLAYER friction, ignored for objects.
	 * @param friction float
	 * @returns void
	 */
	SetFriction(friction: number): void;

	/**
	 * Set PLAYER gravity, ignored for objects.
	 * @param gravity float
	 * @returns void
	 */
	SetGravity(gravity: number): void;

	/**
	 * Changes the health value of the entity. Does not check whether to kill players.
	 * @param health int
	 * @returns void
	 */
	SetHealth(health: number): void;

	/**
	 * Sets the entity orientation relative to it's parent or attachment point.
	 * @param direction QAngle
	 * @returns void
	 */
	SetLocalAngles(direction: QAngle): void;

	/**
	 * Sets the entity position relative to it's parent or attachment point.
	 * @param position Vector
	 * @returns void
	 */
	SetLocalOrigin(position: Vector): void;

	/**
	 * Changes the maximum health value of the entity.
	 * @param health int
	 * @returns void
	 */
	SetMaxHealth(health: number): void;

	/**
	 * Changes the model of the entity (if applicable).
	 * @param modelName string
	 * @returns void
	 */
	SetModel(modelName: string): void;

	/**
	 * Sets the world entity position.
	 * @param position Vector
	 * @returns void
	 */
	SetOrigin(position: Vector): void;

	/**
	 * Sets the entity velocity.
	 * @param velocity Vector
	 * @returns void
	 */
	SetVelocity(velocity: Vector): void;

	/**
	 * Damages the entity.
	 * @param damage float
	 * @param damageType int
	 * @param attacker CBaseEntity
	 * @returns void
	 */
	TakeDamage(damage: number, damageType: number, attacker: CBaseEntity): void;

	/**
	 * Damages the entity (extended).
	 * @param inflictor CBaseEntity
	 * @param attacker CBaseEntity
	 * @param weapon CBaseEntity
	 * @param vecDamageForce Vector
	 * @param vecDamagePosition Vector
	 * @param damage float
	 * @param damageType int
	 * @returns void
	 */
	TakeDamageEx(
		inflictor: CBaseEntity,
		attacker: CBaseEntity,
		weapon: CBaseEntity,
		vecDamageForce: Vector,
		vecDamagePosition: Vector,
		damage: number,
		damageType: number
	): void;

	/**
	 * Ensures an entity has a script scope, if it doesn't have one then one is created. Returns true if created successfully.
	 * @returns bool
	 */
	ValidateScriptScope(): boolean;

	// TODO: implement `bool Input[InputName]()`
	/**
	 * If ent_text is used on an entity and this function exists, it will be called every tick. Returns a string that gets displayed as part of the ent_text overlay. This is a handy feature for displaying script data on objects when you ent_text the object, or running arbitrary code (such as turning on additional debugging visualizations) is using ent_text. NOTE: ent_text_allow_script 1 must be set in order for this feature to be active.
	 */
	OnEntText(): string;
	/**
	 * Called after the entity spawns, which is after scripts and players have loaded. This could be used to have an entity register itself with a master script, or adjusting the entity parameters in a programmatic way.
	 */
	OnPostSpawn(): void;
	/**
	 * Called after the script executes.Can be used to call precache functions for models and sounds on map load.
	 */
	Precache(): void;
}

export interface CBaseAnimating extends CBaseEntity {
	/**
	 * Find a bodygroup ID by name. Returns -1 if the bodygroup does not exist.
	 * @param name string
	 * @returns int
	 */
	FindBodygroupByName(name: string): number;

	/**
	 * Get the attachment ID's angles as a QAngle.
	 * @param ID int
	 * @returns QAngle
	 */
	GetAttachmentAngles(ID: number): QAngle;

	/**
	 * Get the attachment ID's parent bone index.
	 * @param ID int
	 * @returns int
	 */
	GetAttachmentBone(ID: number): number;

	/**
	 * Get the attachment ID's origin as a Vector.
	 * @param ID int
	 * @returns Vector
	 */
	GetAttachmentOrigin(ID: number): Vector;

	/**
	 * Get the bodygroup value by bodygroup ID.
	 * @param ID int
	 * @returns int
	 */
	GetBodygroup(ID: number): number;

	/**
	 * Get the bodygroup ID's name.
	 * @param ID int
	 * @returns string
	 */
	GetBodygroupName(ID: number): string;

	/**
	 * Get name by group and part.
	 * @param group int
	 * @param part int
	 * @returns string
	 */
	GetBodygroupPartName(group: number, part: number): string;

	/**
	 * Get the bone ID's angles as a QAngle.
	 * @param ID int
	 * @returns QAngle
	 */
	GetBoneAngles(ID: number): QAngle;

	/**
	 * Get the bone ID's origin Vector.
	 * @param ID int
	 * @returns Vector
	 */
	GetBoneOrigin(ID: number): Vector;

	/**
	 * Get the model scale.
	 * @returns float
	 */
	GetModelScale(): number;

	/**
	 * Get the currently playing sequence ID.
	 * @returns int
	 */
	GetSequence(): number;

	/**
	 * Get the activity name for a sequence by sequence ID.
	 * @param ID int
	 * @returns string
	 */
	GetSequenceActivityName(ID: number): string;

	/**
	 * Get a sequence duration in seconds by sequence ID.
	 * @param ID int
	 * @returns float
	 */
	GetSequenceDuration(ID: number): number;

	/**
	 * Get a sequence name by sequence ID.
	 * @param ID int
	 * @returns string
	 */
	GetSequenceName(ID: number): string;

	/**
	 * Returns true if the current sequence has finished playing.
	 * @returns bool
	 */
	IsSequenceFinished(): boolean;

	/**
	 * Get the named activity index. Returns -1 if the activity does not exist.
	 * @param activity string
	 * @returns int
	 */
	LookupActivity(activity: string): number;

	/**
	 * Get the named attachment index. Returns 0 if the attachment does not exist.
	 * @param name string
	 * @returns int
	 */
	LookupAttachment(name: string): number;

	/**
	 * Get the named bone index. Returns -1 if the bone does not exist.
	 * @param bone string
	 * @returns int
	 */
	LookupBone(bone: string): number;

	/**
	 * Looks up a sequence by sequence name or activity name. Returns -1 if the sequence does not exist.
	 * @param name string
	 * @returns int
	 */
	LookupSequence(name: string): number;

	/**
	 * Reset a sequence by sequence ID. If the ID is different than the current sequence, switch to the new sequence.
	 * @param ID int
	 * @returns void
	 */
	ResetSequence(ID: number): void;

	/**
	 * Set the bodygroup by ID.
	 * @param ID int
	 * @param value int
	 * @returns void
	 */
	SetBodygroup(ID: number, value: number): void;

	/**
	 * Changes a model's scale over time. Set the change duration to 0.0 to change the scale instantly.
	 * @param scale float
	 * @param change_duration float
	 * @returns void
	 */
	SetModelScale(scale: number, change_duration: number): void;

	/**
	 * Sets a pose parameter value. Returns the effective value after clamping or looping.
	 * @param ID int
	 * @param value float
	 * @returns float
	 */
	SetPoseParameter(ID: number, value: number): number;

	/**
	 * Plays a sequence by sequence ID.
	 * @param ID int
	 * @returns void
	 */
	SetSequence(ID: number): void;
}

export interface CBaseFlex extends CBaseAnimating {
	/**
	 * Returns the instance of the oldest active scene entity (if any).
	 * @returns handle
	 */
	GetCurrentScene(): SquirrelHandle;

	/**
	 * Returns the instance of the scene entity at the specified index.
	 * @param index int
	 * @returns handle
	 */
	GetSceneByIndex(index: number): SquirrelHandle;

	/**
	 * Play the specified .vcd file, causing the related characters to speak and subtitles to play.
	 * @param sceneFile string
	 * @param delay float
	 * @returns float
	 */
	PlayScene(sceneFile: string, delay: number): number;
}

export interface CBaseCombatCharacter extends CBaseFlex {
	/**
	 * Return the last nav area occupied - NULL if unknown.
	 * @returns TerrorNavArea
	 */
	GetLastKnownArea(): TerrorNavArea;
}

export interface CTerrorPlayer extends CBaseCombatCharacter {
	/**
	 * Make the player drop an item/weapon from their inventory, by classname.
	 * @param classname string
	 * @returns void
	 */
	DropItem(classname: string): void;

	/**
	 * Extinguish a burning player.
	 * @returns void
	 */
	Extinguish(): void;

	/**
	 * Returns the direction the player is looking.
	 * @returns QAngle
	 */
	EyeAngles(): QAngle;

	/**
	 * Returns the players eye position in the world.
	 * @returns Vector
	 */
	EyePosition(): Vector;

	/**
	 * Get the player's active weapon entity.
	 * @returns handle
	 */
	GetActiveWeapon(): SquirrelHandle;

	/**
	 * Returns the time the character has been alive (only valid when alive).
	 * @returns float
	 */
	GetAliveDuration(): number;

	/**
 * Returns a bitfield of currently pressed buttons. Test against each value to see which button is pressed. Recognized buttons are:
1 - IN_ATTACK
2 - IN_JUMP
4 - IN_DUCK
8 - IN_FORWARD
16 - IN_BACK
32 - IN_USE
2048 - IN_ATTACK2
8192 - IN_RELOAD
 * @returns int
 */
	GetButtonMask(): number;

	/**
	 * Returns the current temporary health of a survivor.
	 * @returns float
	 */
	GetHealthBuffer(): number;

	/**
	 * Get the player's network (i.e. Steam) ID.
	 * @returns string
	 */
	GetNetworkIDString(): string;

	/**
	 * Get the players name.
	 * @returns string
	 */
	GetPlayerName(): string;

	/**
	 * Get the players userID.
	 * @returns int
	 */
	GetPlayerUserId(): number;

	/**
 * Get the current bot sense flags. Test against each value to see which flag is set. Values:
1 - BOT_CANT_SEE
2 - BOT_CANT_HEAR
4 - BOT_CANT_FEEL
 * @returns int
 */
	GetSenseFlags(): number;

	/**
	 * Get the Special Infected dominating this Survivor.
	 * @returns CTerrorPlayer
	 */
	GetSpecialInfectedDominatingMe(): CTerrorPlayer;

	/**
	 * Get the player's slot number.
	 * @returns int
	 */
	GetSurvivorSlot(): number;

	/**
 * If an infected, find out what type. Recognized ZombieTypes are: Smoker = 1, Boomer = 2, Hunter = 3, Spitter = 4, Jockey = 5, Charger = 6, Witch = 7, Tank = 8, Survivor = 9
Tip:
witch is not a CTerrorPlayer derived entity therefore trying to check her zombie type with this method would result in an error. Use check like ent.GetClassname() == "witch" instead.
 * @returns int
 */
	GetZombieType(): number;

	/**
	 * Adds ammo for the player's primary weapon ammo pool.
	 * @param amount int
	 * @returns void
	 */
	GiveAmmo(amount: number): void;

	/**
 * Give an item/weapon by name. Uses the same names as the give console command(health, katana, rifle_ak47, etc.).
Bug*:
Cannot give item to a player that is currently running a chainsaw (same applies to GiveItemWithSkin)
 * @param itemname string
 * @returns void
 */
	GiveItem(itemname: string): void;

	/**
	 * Gives the player a skinned weapon.
	 * @param classname string
	 * @param skin int
	 * @returns void
	 */
	GiveItemWithSkin(classname: string, skin: number): void;

	/**
 * Give a primary weapon upgrade. Possible values:
0 - UPGRADE_INCENDIARY_AMMO
1 - UPGRADE_EXPLOSIVE_AMMO
2 - UPGRADE_LASER_SIGHT
 * @param upgradeType int
 * @returns void
 */
	GiveUpgrade(upgradeType: number): void;

	/**
	 * Returns true if the character has ever been injured by a member of the given team.
	 * @param team int
	 * @returns bool
	 */
	HasEverBeenInjured(team: number): boolean;

	/**
	 * Cover the player with a boomer vomit attack.
	 * @returns void
	 */
	HitWithVomit(): void;

	/**
	 * Return true if adrenaline is active.
	 * @returns bool
	 */
	IsAdrenalineActive(): boolean;

	/**
	 * Returns true when a player is dead for more than 5 seconds. Note that taking over a dying bot immediately switches to the dead phase.
	 * @returns bool
	 */
	IsDead(): boolean;

	/**
	 * Return true if being dominated by a Special Infected (i.e. held by smoker, charger, jockey or hunter)
	 * @returns bool
	 */
	IsDominatedBySpecialInfected(): boolean;

	/**
	 * Returns true when a player has recently died for 5 seconds. Note that taking over a dying bot skips the dying phase.
	 * @returns bool
	 */
	IsDying(): boolean;

	/**
	 * Return true if player is firing a weapon.
	 * @returns bool
	 */
	IsFiringWeapon(): boolean;

	/**
	 * Returns true if in incapacitated state.
	 * @returns bool
	 */
	IsIncapacitated(): boolean;

	/**
	 * Returns true if in ledge hang state.
	 * @returns bool
	 */
	IsHangingFromLedge(): boolean;

	/**
	 * Return true if player is currently getting up.
	 * @returns bool
	 */
	IsGettingUp(): boolean;

	/**
	 * Returns true if in ghost infected state.
	 * @returns bool
	 */
	IsGhost(): boolean;

	/**
 * Return true if currently immobilized.
Tip:
Is true when in getting up animation, punched by tank, flung by charger, caught by charger, smoker or hunter, hanging, incapacitated, dead, being healed, using kit, defibrillator or unpacking an upgrade pack, using timed button, pouring gas can, handing in cola or using minigun (not true when staggering or caught by jockey)
 * @returns bool
 */
	IsImmobilized(): boolean;

	/**
	 * Return true if currently in combat.
	 * @returns bool
	 */
	IsInCombat(): boolean;

	/**
	 * Return true if currently IT from bile.
	 * @returns bool
	 */
	IsIT(): boolean;

	/**
	 * Returns true if a player is on fire, e.g. Standing in fireworks crate explosions.
	 * @returns bool
	 */
	IsOnFire(): boolean;

	/**
	 * Return true if on third-strike.
	 * @returns bool
	 */
	IsOnThirdStrike(): boolean;

	/**
	 * Return true if player is staggering.
	 * @returns bool
	 */
	IsStaggering(): boolean;

	/**
	 * Returns true if falling damage is currently suppressed, which is if the entity received the IgnoreFallDamage or IgnoreFallDamageWithoutReset input, provided that it is still active.
	 * @returns bool
	 */
	IsSuppressingFallingDamage(): boolean;

	/**
	 * Returns true if entity is on the survivor or l4d1 survivor team (Otherwise, unknown, spectator or infected).
	 * @returns bool
	 */
	IsSurvivor(): boolean;

	/**
 * Remove a primary weapon upgrade. Possible values:
0 - UPGRADE_INCENDIARY_AMMO
1 - UPGRADE_EXPLOSIVE_AMMO
2 - UPGRADE_LASER_SIGHT
 * @param upgradeType int
 * @returns void
 */
	RemoveUpgrade(upgradeType: number): void;

	/**
	 * Revive a dead player by defib.
	 * @returns void
	 */
	ReviveByDefib(): void;

	/**
	 * Revive an incapacitated player.
	 * @returns void
	 */
	ReviveFromIncap(): void;

	/**
	 * Set player friction.
	 * @param friction int
	 * @returns void
	 */
	SetFriction(friction: number): void;

	/**
	 * Set player gravity.
	 * @param gravity int
	 * @returns void
	 */
	SetGravity(gravity: number): void;

	/**
	 * Sets the temporary health of a survivor; No effect for infecteds. Does not incapacitate or kill when set to zero.
	 * @param health float
	 * @returns void
	 */
	SetHealthBuffer(health: number): void;

	/**
 * Sets the number of times a survivor has been revived, and updates third-strike state (B&W) and heartbeat sound.
Bug*:
Doesn't update the m_isGoingToDie netprop, which controls the dying quotes.
 * @param count int
 * @returns void
 */
	SetReviveCount(count: number): void;

	/**
 * Set the set of bot sense flags. Combine values to set appropriate flags:
1 - BOT_CANT_SEE
2 - BOT_CANT_HEAR
4 - BOT_CANT_FEEL
 * @param flags int
 * @returns void
 */
	SetSenseFlags(flags: number): void;

	/**
	 * Sets the view angles. Supports rolling the view.
	 * @param angles QAngle
	 * @returns void
	 */
	SnapEyeAngles(angles: QAngle): void;

	/**
	 * Stagger a player away from a position. Use Vector(0,0,0) to just stagger forward.
	 * @param position Vector
	 * @returns void
	 */
	Stagger(position: Vector): void;

	/**
	 * Make the player switch to an item/weapon by classname. Returns true if the switch was performed.
	 * @param classname string
	 * @returns bool
	 */
	SwitchToItem(classname: string): boolean;

	/**
	 * Get a location on the nav the player can path to within the desired radius.
	 * @param radius float
	 * @returns Vector
	 */
	TryGetPathableLocationWithin(radius: number): Vector;

	/**
	 * Causes Adrenaline's speed and visual effect, no change to health.
	 * @param duration float
	 * @returns void
	 */
	UseAdrenaline(duration: number): void;
}

export interface CTerrorWeapon extends CBaseAnimating {
	/**
	 * Current amount of ammo in a weapon's clip.
	 * @returns int
	 */
	Clip1(): number;

	/**
	 * Current 'secondary clip' ammo count. Always -1 in default game.
	 * @returns int
	 */
	Clip2(): number;

	/**
	 * Clip count of a weapon when its newly picked up.
	 * @returns int
	 */
	GetDefaultClip1(): number;

	/**
	 * Default 'secondary clip' ammo count. Always -1 in default game; Only a positive value if a custom weapon script has clip2_size set.
	 * @returns int
	 */
	GetDefaultClip2(): number;

	/**
	 * Max clip count a weapon can hold. Will always return the same value as the GetDefaultClip1 function.
	 * @returns int
	 */
	GetMaxClip1(): number;

	/**
	 * Max 'secondary clip' count. Always -1 in default game; Only a positive value if a custom weapon script has clip2_size set. Will always return the same value as the GetDefaultClip2 function.
	 * @returns int
	 */
	GetMaxClip2(): number;

	/**
	 * Revert both weapons's clip to their default values.
	 * @returns void
	 */
	GiveDefaultAmmo(): void;

	/**
	 * Forces the weapon to reload if it is not full. Returns true if it could start a weapon reload.
	 * @returns bool
	 */
	Reload(): boolean;

	/**
	 * Sets a weapon's clip count.
	 * @param amount int
	 * @returns void
	 */
	SetClip1(amount: number): void;

	/**
	 * Sets a weapon's 'secondary clip' count; Works just fine but has no gameplay effect in default game.
	 * @param amount int
	 * @returns void
	 */
	SetClip2(amount: number): void;
}

export interface CBaseTrigger extends CBaseEntity {
	/**
	 * Disable the trigger. Identical to the Disable input.
	 * @returns void
	 */
	Disable(): void;

	/**
	 * Enable the trigger. Identical to the Enable input.
	 * @returns void
	 */
	Enable(): void;

	/**
	 * Checks whether the passed entity is touching the trigger.
	 * @param entity handle
	 * @returns bool
	 */
	IsTouching(entity: SquirrelHandle): boolean;
}

export interface AI_Response {
	/**
	 * Relative score of this match's quality (based on number of criteria matched).
	 */
	// TODO: check if this signature is right, Valve documentation does not put a signature
	GetMatchScore(): number;
}

export interface CEnvEntityMaker extends CBaseEntity {
	/**
	 * Create an entity at the location of the maker.
	 * @returns void
	 */
	SpawnEntity(): void;

	/**
	 * Create an entity at the location of a specified entity instance.
	 * @param entity CBaseEntity
	 * @returns void
	 */
	SpawnEntityAtEntityOrigin(entity: CBaseEntity): void;

	/**
	 * Create an entity at a specified location and orientation.
	 * @param origin Vector
	 * @param orientation QAngle
	 * @returns void
	 */
	SpawnEntityAtLocation(origin: Vector, orientation: QAngle): void;

	/**
	 * Create an entity at the location of a named entity.
	 * @param name string
	 * @returns void
	 */
	SpawnEntityAtNamedEntityOrigin(name: string): void;
}

export interface CInfoItemPosition extends CBaseEntity {
	// TODO: Find these function signatures, Valve, please fix.
	/**
	 * Get the group number for this item position
	 */
	GetGroup(): unknown;
	/**
	 * Get the rarity for this item position.
	 */
	GetRarity(): unknown;
	/**
	 * Get a replacement parameter by index.
	 */
	GetReplaceParm(): unknown;
	/**
	 * Set the group number for this item position.
	 */
	SetGroup(): unknown;
	/**
	 * Set the rarity for this item position.
	 */
	SetRarity(): unknown;
}

export interface TerrorNavArea {
	/**
	 * Add areas that connect TO this area by a ONE-WAY link.
	 * @param area TerrorNavArea
	 * @param dir int
	 * @returns void
	 */
	AddIncomingConnection(area: TerrorNavArea, dir: number): void;

	/**
	 * Return direction from this area to the given point.
	 * @param point Vector
	 * @returns int
	 */
	ComputeDirection(point: Vector): number;

	/**
	 * Connect this area to given area in given direction. If you set direction to -1, it will be automatically applied.
	 * @param area TerrorNavArea
	 * @param dir int
	 * @returns void
	 */
	ConnectTo(area: TerrorNavArea, dir: number): void;

	/**
	 * Connect this area to given ladder.
	 * @param ladder CNavLadder
	 * @returns void
	 */
	ConnectToLadder(ladder: CNavLadder): void;

	/**
	 * Return true if other area is on or above this area, but no others.
	 * @param area TerrorNavArea
	 * @returns bool
	 */
	Contains(area: TerrorNavArea): boolean;

	/**
	 * Return true if given point is on or above this area, but no others.
	 * @param point Vector
	 * @returns bool
	 */
	ContainsOrigin(point: Vector): boolean;

	/**
	 * Draw area as a filled rectangle of the given color.
	 * @param r int
	 * @param g int
	 * @param b int
	 * @param a int
	 * @param duration float
	 * @param noDepthTest bool
	 * @returns void
	 */
	DebugDrawFilled(
		r: number,
		g: number,
		b: number,
		a: number,
		duration: number,
		noDepthTest: boolean
	): void;

	/**
	 * Disconnect this area from given area.
	 * @param area TerrorNavArea
	 * @returns void
	 */
	Disconnect(area: TerrorNavArea): void;

	/**
	 * Disconnect this area from given ladder.
	 * @param ladder CNavLadder
	 * @returns void
	 */
	DisconnectLadder(ladder: CNavLadder): void;

	/**
	 * Get random origin within extent of area.
	 * @returns Vector
	 */
	FindRandomSpot(): Vector;

	/**
	 * Return the n'th adjacent area in the given direction.
	 * @param dir int
	 * @param nAreas int
	 * @returns TerrorNavArea
	 */
	GetAdjacentArea(dir: number, nAreas: number): TerrorNavArea;

	/**
	 * Fills a passed in table with all adjacent areas in the given direction.
	 * @param dir int
	 * @param arg table
	 * @returns void
	 */
	GetAdjacentAreas(dir: number, arg: table): void;

	/**
	 * Get the number of adjacent areas in the given direction.
	 * @param dir int
	 * @returns int
	 */
	GetAdjacentCount(dir: number): number;

	/**
	 * Get area attribute bits.
	 * @returns int
	 */
	GetAttributes(): number;

	/**
	 * Returns the maximum height of the obstruction above the ground.
	 * @returns float
	 */
	GetAvoidanceObstacleHeight(): number;

	/**
	 * Get center origin of area.
	 * @returns Vector
	 */
	GetCenter(): Vector;

	/**
	 * Get corner origin of area.
	 * @param corner int
	 * @returns Vector
	 */
	GetCorner(corner: number): Vector;

	/**
	 * Return shortest distance between point and this area.
	 * @param pos Vector
	 * @returns float
	 */
	GetDistanceSquaredToPoint(pos: Vector): number;

	/**
	 * Returns the door entity above the area.
	 * @returns CBaseEntity
	 */
	GetDoor(): CBaseEntity;

	/**
	 * Returns the elevator if in an elevator's path.
	 * @returns CBaseEntity
	 */
	GetElevator(): CBaseEntity;

	/**
	 * Fills a passed in table with a collection of areas reachable via elevator from this area.
	 * @param arg table
	 * @returns void
	 */
	GetElevatorAreas(arg: table): void;

	/**
	 * Get area ID.
	 * @returns int
	 */
	GetID(): number;

	/**
	 * Fills a passed in table with areas connected TO this area by a ONE-WAY link (ie: we have no connection back to them).
	 * @param dir int
	 * @param arg table
	 * @returns void
	 */
	GetIncomingConnections(dir: number, arg: table): void;

	/**
	 * Fills a passed in table of ladders in direction.
	 * @param dir int
	 * @param arg table
	 * @returns void
	 */
	GetLadders(dir: number, arg: table): void;

	/**
	 * Returns the area just prior to this one in the search path.
	 * @returns TerrorNavArea
	 */
	GetParent(): TerrorNavArea;

	/**
	 * Returns how we get from parent to us.
	 * @returns int
	 */
	GetParentHow(): number;

	/**
	 * Get place name, null if no name.
	 * @returns string
	 */
	GetPlaceName(): string;

	/**
	 * Return number of players of given team currently within this area (team of zero means any/all).
	 * @param team int
	 * @returns int
	 */
	GetPlayerCount(team: number): number;

	/**
	 * Return a random adjacent area in the given direction.
	 * @param dir int
	 * @returns TerrorNavArea
	 */
	GetRandomAdjacentArea(dir: number): TerrorNavArea;

	/**
	 * Return the area size along the X axis.
	 * @returns float
	 */
	GetSizeX(): number;

	/**
	 * Return the area size along the Y axis.
	 * @returns float
	 */
	GetSizeY(): number;

	/**
	 * Get spawn attribute bits.
	 * @returns int
	 */
	GetSpawnAttributes(): number;

	/**
	 * Returns the time since the area was cleared.
	 * @returns float
	 */
	GetTimeSinceCleared(): number;

	/**
	 * Returns the height of the area at the specified point.
	 * @param pos Vector
	 * @returns float
	 */
	GetZ(pos: Vector): number;

	/**
	 * Has area attribute bits.
	 * @param bits int
	 * @returns bool
	 */
	HasAttributes(bits: number): boolean;

	/**
	 * Returns true if there's a large, immobile object obstructing this area.
	 * @param maxHeight float
	 * @returns bool
	 */
	HasAvoidanceObstacle(maxHeight: number): boolean;

	/**
	 * Has spawn attribute bits.
	 * @param bits int
	 * @returns bool
	 */
	HasSpawnAttributes(bits: number): boolean;

	/**
	 * Return true if team is blocked in this area.
	 * @param team int
	 * @param affectsFlow bool
	 * @returns bool
	 */
	IsBlocked(team: number, affectsFlow: boolean): boolean;

	/**
	 * Returns true if area is a bottleneck.
	 * @returns bool
	 */
	IsBottleneck(): boolean;

	/**
	 * Returns true if this area has been cleared for the player.
	 * @param player CTerrorPlayer
	 * @returns bool
	 */
	IsCleared(player: CTerrorPlayer): boolean;

	/**
	 * Return true if given area is completely visible from somewhere in this area by someone on the team.
	 * @param team int
	 * @returns bool
	 */
	IsCompletelyVisibleToTeam(team: number): boolean;

	/**
	 * Return true if this area is connected to other area in given direction. (If you set direction to -1 or 4, it will automatically check all directions for a connection)
	 * @param area TerrorNavArea
	 * @param dir int
	 * @returns bool
	 */
	IsConnected(area: TerrorNavArea, dir: number): boolean;

	/**
	 * Return true if this area is connected to ladder in given direction.
	 * @param ladder CNavLadder
	 * @param dir int
	 * @returns bool
	 */
	IsConnectedLadder(ladder: CNavLadder, dir: number): boolean;

	/**
	 * Return true if this area and given area are approximately co-planar.
	 * @param area TerrorNavArea
	 * @returns bool
	 */
	IsCoplanar(area: TerrorNavArea): boolean;

	/**
	 * Return true if continuous damage (ie: fire) is in this area.
	 * @returns bool
	 */
	IsDamaging(): boolean;

	/**
	 * Return true if this area is badly formed.
	 * @returns bool
	 */
	IsDegenerate(): boolean;

	/**
	 * Return true if there are no bi-directional links on the given side.
	 * @param dir int
	 * @returns bool
	 */
	IsEdge(dir: number): boolean;

	/**
	 * Return true if this area is approximately flat.
	 * @returns bool
	 */
	IsFlat(): boolean;

	/**
	 * Return true if 'area' overlaps our 2D extents.
	 * @param area TerrorNavArea
	 * @returns bool
	 */
	IsOverlapping(area: TerrorNavArea): boolean;

	/**
	 * Return true if 'pos' is within 2D extents of area.
	 * @param pos Vector
	 * @param tolerance float
	 * @returns bool
	 */
	IsOverlappingOrigin(pos: Vector, tolerance: number): boolean;

	/**
	 * Return true if any portion of this area is visible to anyone on the given team.
	 * @param team int
	 * @returns bool
	 */
	IsPotentiallyVisibleToTeam(team: number): boolean;

	/**
	 * Return true if this area is approximately square.
	 * @returns bool
	 */
	IsRoughlySquare(): boolean;

	/**
	 * Returns true if spawning is allowed in this area.
	 * @returns bool
	 */
	IsSpawningAllowed(): boolean;

	/**
	 * Return true if area is underwater.
	 * @returns bool
	 */
	IsUnderwater(): boolean;

	/**
	 * Whether the handle belongs to a valid area.
	 * @returns bool
	 */
	IsValid(): boolean;

	/**
	 * Returns true if area is valid for wandering population.
	 * @returns bool
	 */
	IsValidForWanderingPopulation(): boolean;

	/**
	 * Return true if area is visible from the given point.
	 * @param point Vector
	 * @returns bool
	 */
	IsVisible(point: Vector): boolean;

	/**
	 * Mark this area as cleared for the player.
	 * @param player CTerrorPlayer
	 * @returns void
	 */
	MarkAreaCleared(player: CTerrorPlayer): void;

	/**
	 * Mark this area as not cleared.
	 * @returns void
	 */
	MarkAreaNotCleared(): void;

	/**
	 * Mark this area as blocked for team.
	 * @param team int
	 * @returns void
	 */
	MarkAsBlocked(team: number): void;

	/**
	 * Mark this area is damaging for the next 'duration' seconds.
	 * @param duration float
	 * @returns void
	 */
	MarkAsDamaging(duration: number): void;

	/**
	 * Marks the obstructed status of the nav area.
	 * @param height float
	 * @returns void
	 */
	MarkObstacleToAvoid(height: number): void;

	/**
	 * Removes area attribute bits.
	 * @param bits int
	 * @returns void
	 */
	RemoveAttributes(bits: number): void;

	/**
	 * Removes all connections in directions to left and right of specified direction.
	 * @param dir int
	 * @returns void
	 */
	RemoveOrthogonalConnections(dir: number): void;

	/**
	 * Remove spawn attribute bits.
	 * @param bits int
	 * @returns void
	 */
	RemoveSpawnAttributes(bits: number): void;

	/**
	 * Set area attribute bits.
	 * @param bits int
	 * @returns void
	 */
	SetAttributes(bits: number): void;

	/**
	 * Set place name. If you pass null, the place name will be set to nothing.
	 * @param name string
	 * @returns void
	 */
	SetPlaceName(name: string): void;

	/**
	 * Set spawn attribute bits.
	 * @param bits int
	 * @returns void
	 */
	SetSpawnAttributes(bits: number): void;

	/**
	 * Unblocks this area.
	 * @returns void
	 */
	UnblockArea(): void;
}

export interface CNavLadder {
	/**
	 * Connect this ladder to given area.
	 * @param area TerrorNavArea
	 * @returns void
	 */
	ConnectTo(area: TerrorNavArea): void;

	/**
	 * Disconnect this ladder from given area.
	 * @param area TerrorNavArea
	 * @returns void
	 */
	Disconnect(area: TerrorNavArea): void;

	/**
	 * Area of the bottom of the ladder.
	 * @returns TerrorNavArea
	 */
	GetBottomArea(): TerrorNavArea;

	/**
	 * World coords of the bottom of the ladder.
	 * @returns Vector
	 */
	GetBottomOrigin(): Vector;

	/**
	 * Return the way the ladder faces (ie: surface normal of climbable side).
	 * @returns int
	 */
	GetDir(): number;

	/**
	 * Get ladder ID.
	 * @returns int
	 */
	GetID(): number;

	/**
	 * Returns the ladder entity.
	 * @returns CBaseEntity
	 */
	GetLadderEntity(): CBaseEntity;

	/**
	 * Return the length of the ladder.
	 * @returns float
	 */
	GetLength(): number;

	/**
	 * Return x,y coordinate of the ladder at a given height.
	 * @param height float
	 * @returns Vector
	 */
	GetPosAtHeight(height: number): Vector;

	/**
	 * Area of the top of the ladder.
	 * @returns TerrorNavArea
	 */
	GetTopArea(): TerrorNavArea;

	/**
	 * World coords of the top of the ladder.
	 * @returns Vector
	 */
	GetTopOrigin(): Vector;

	/**
	 * Return the width of the ladder.
	 * @returns float
	 */
	GetWidth(): number;

	/**
	 * Return true if given ladder is connected in given direction.
	 * @param area TerrorNavArea
	 * @param dir int
	 * @returns bool
	 */
	IsConnected(area: TerrorNavArea, dir: number): boolean;

	/**
	 * Return true if someone is on this ladder (other than 'ignore').
	 * @param ignore CBaseEntity
	 * @returns bool
	 */
	IsInUse(ignore: CBaseEntity): boolean;

	/**
	 * Returns true if ladder is usable for team.
	 * @param teamID int
	 * @returns bool
	 */
	IsUsableByTeam(teamID: number): boolean;

	/**
	 * Whether the handle belongs to a valid ladder.
	 * @returns bool
	 */
	IsValid(): boolean;
}

export interface CPointTemplate extends CBaseEntity {
	// TODO: verify
	/**
	 * If this is defined, it will be called right before the entity is created, and any KeyValues returned will be assigned to the entity.
	 * This could be used to dynamically assign target names, colors, even models. Unfortunately, models don't work like one would think. Yes, it is possible to change that gas tank into a football model, will even keep the weapon_gascan class, but it won't behave like one.
	 * @param entityClass
	 * @param entityName
	 */
	PreSpawnInstance(entityClass: string, entityName: string): any;
	/**
	 * Called after the entities are spawned. A table with the handles of the spawned entities indexed by name is passed to the function. Could use this to connect outputs or do whatever needs to be done after the entity was created.
	 * @param entities
	 */
	PostSpawn(entities: any): void;
}

export interface CPointScriptTemplate extends CBaseEntity {
	/**
	 * Add an entity to the template spawner.
	 * @param arg string
	 * @param arg handle
	 * @returns void
	 */
	AddTemplate(arg: string, arg: SquirrelHandle): void;

	/**
	 * Cache the group spawn tables.
	 * @param arg handle
	 * @param arg handle
	 * @returns void
	 */
	SetGroupSpawnTables(arg: SquirrelHandle, arg: SquirrelHandle): void;
}

export interface CPointScriptUseTarget extends CBaseEntity {
	/**
	 * Sets if the UI panel for the button is shown.
	 * @param showPanel bool
	 * @returns void
	 */
	CanShowBuildPanel(showPanel: boolean): void;

	/**
	 * Get the entity name of the prop bound to this button.
	 * @returns string
	 */
	GetUseModelName(): string;

	/**
	 * Sets the use text for the button UI.
	 * @param text string
	 * @returns void
	 */
	SetProgressBarText(text: string): void;

	/**
	 * Sets the subtext below the progress bar for the button UI.
	 * @param text string
	 * @returns void
	 */
	SetProgressBarSubText(text: string): void;

	/**
	 * Sets the total time the button takes to use. If '0', no progress bar will be displayed.
	 * @param time float
	 * @returns void
	 */
	SetProgressBarFinishTime(time: number): void;

	/**
	 * Sets the current use progress. It can be used to save the use progress when the user releases the use key.
	 * @param time float
	 * @returns void
	 */
	SetProgressBarCurrentProgress(time: number): void;

	/**
	 * Stop the current use action.
	 * @returns void
	 */
	StopUse(): void;

	/**
	 * Called when the player has used this button for at least 'FinishTime' seconds.
	 */
	OnUseFinished(): void;
	/**
	 * This breaks point_script_use_target when declared. Use ConnectOutput() and hook a function to the OnUseStarted output instead.
	 */
	OnUseStart(): boolean;
	/**
	 * Called when the player stops using this button. Passes the time this button has been used (time between StartUse and now).
	 * @param timeUsed
	 */
	OnUseStop(timeUsed: number): void;
	/**
	 * Called by the game engine when the entity first spawns, immediately after this script is run.
	 */
	Precache(): void;
}

export interface Decider {
	/**
	 * Add a CRule object (defined in rulescript_base.nut)
	 * @param CRule handle
	 * @returns bool
	 */
	AddRule(CRule: SquirrelHandle): boolean;

	/**
	 * Returns an array of all matching responses. If leeway is nonzero, all results scoring within 'leeway' of the best score return.
	 * @param query handle
	 * @param leeway float
	 * @returns handle
	 */
	FindAllMatches(query: SquirrelHandle, leeway: number): SquirrelHandle;

	/**
	 * Query the database and return the best result found. If multiple of equal score found, an arbitrary one returns.
	 * @param query handle
	 * @returns handle
	 */
	FindBestMatch(query: SquirrelHandle): SquirrelHandle;

	/**
	 * Whether the object belongs to a valid entity(?).
	 * @returns bool
	 */
	IsValid(): boolean;
}

export interface CCallChainer {
	/**
	 * Search for all non-native functions with matching prefixes, then push them into the chains table.
	 * @returns void
	 */
	PostScriptExecute(): void;

	/**
	 * Find an unprefixed function name in the chains table and call it with the given arguments.
	 * @param event string
	 * @param ...args any
	 * @returns bool
	 */
	Call(event: string, ...args: any): boolean;

	/**
	 * Contains names of unprefixed functions, each with an array of functions to call.
	 */
	chains: any;

	/**
	 * Prefix that functions should have to be added into the chains table. Set by the constructor.
	 */
	prefix: string;

	/**
	 * If set, seek functions in this scope instead. Set by the constructor.
	 */
	scope: any;
}

export interface CSimpleCallChainer {
	/**
	 * Begin searching for all non-native functions with matching prefixes, then push them into the chain array.
	 * @returns void
	 */
	PostScriptExecute(): void;

	/**
	 * Call all functions inside the chain array with the given arguments.
	 * @param ...args any
	 * @returns bool
	 */
	Call(...args: any): boolean;

	/**
	 * All functions to be called by the Call() method.
	 */
	chain: any;

	/**
	 * If set, names of non-native functions and prefix must be an exact match. Set by the constructor.
	 */
	exactMatch: boolean;

	/**
	 * Prefix that functions should have to be added into the chain array. Set by the constructor.
	 */
	prefix: string;

	/**
	 * If set, seek functions in this scope instead. Set by the constructor.
	 */
	scope: any;
}

export interface LateBinder {
	// TODO: what the hell is this??
	Begin(...args: unknown): unknown;
	End(...args: unknown): unknown;
	EstablishDelegation(...args: unknown): unknown;
	HookRootMetamethod(...args: unknown): unknown;
	UnhookRootMetamethod(...args: unknown): unknown;
	RemoveDelegation(...args: unknown): unknown;
	Resolve(...args: unknown): unknown;

	m_bindNamesStack: Array;
	m_fixupSet: Array;
	m_log: boolean;
	m_logIndent: number;
	m_targetTable: any;
}

declare global {
	declare const Convars: Convars;
	declare const Director: CDirector;
	declare const Entities: CEntities;
	declare const EntityOutputs: CScriptEntityOutputs;
	declare const NavMesh: CNavMesh;
	declare const NetProps: CNetPropManager;
	declare const ResponseCriteria: CScriptResponseCriteria;

	function CCallChainer(
		functionPrefix: string,
		scope: any = null
	): CCallChainer;
	function CSimpleCallChainer(
		functionPrefix: string,
		scope: any = null,
		exactMatch = false
	): CSimpleCallChainer;

	/**
 * Dumps a scope's contents and expands all tables and arrays; this is what the ent_script_dump command uses.
Tip:
You can use this to print tables/arrays.
Example Expand
 * @param indentation int
 * @param scope table
 * @returns void
 */
	function __DumpScope(indentation: number, scope: table): void;

	/**
	 * Print a client message. If you pass null instead of a valid player, the message will be sent to all clients.
	 * @param player CTerrorPlayer
	 * @param destination int
	 * @param message string
	 * @returns void
	 */
	function ClientPrint(
		player: CTerrorPlayer,
		destination: number,
		message: string
	): void;

	/**
	 * Draw a debug overlay box.
	 * @param origin Vector
	 * @param min vector
	 * @param max vector
	 * @param r int
	 * @param g int
	 * @param b int
	 * @param alpha int
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawBox(
		origin: Vector,
		min: vector,
		max: vector,
		r: number,
		g: number,
		b: number,
		alpha: number,
		duration: number
	): void;

	/**
	 * Draw a debug oriented box (cent, min, max, angles(p,y,r), vRgb, a, duration).
	 * @param origin Vector
	 * @param min Vector
	 * @param max Vector
	 * @param direction QAngle
	 * @param rgb Vector
	 * @param alpha int
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawBoxAngles(
		origin: Vector,
		min: Vector,
		max: Vector,
		direction: QAngle,
		rgb: Vector,
		alpha: number,
		duration: number
	): void;

	/**
	 * Draw a debug forward box.
	 * @param center Vector
	 * @param min Vector
	 * @param max Vector
	 * @param forward Vector
	 * @param rgb Vector
	 * @param alpha float
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawBoxDirection(
		center: Vector,
		min: Vector,
		max: Vector,
		forward: Vector,
		rgb: Vector,
		alpha: number,
		duration: number
	): void;

	/**
	 * Draw a debug circle.
	 * @param center Vector
	 * @param rgb Vector
	 * @param alpha float
	 * @param radius float
	 * @param ztest bool
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawCircle(
		center: Vector,
		rgb: Vector,
		alpha: number,
		radius: number,
		ztest: boolean,
		duration: number
	): void;

	/**
	 * Try to clear all the debug overlay info.
	 * @returns void
	 */
	function DebugDrawClear(): void;

	/**
	 * Draw a debug overlay line.
	 * @param start Vector
	 * @param end Vector
	 * @param red int
	 * @param green int
	 * @param blue' int
	 * @param zTest bool
	 * @param time float
	 * @returns void
	 */
	function DebugDrawLine(
		start: Vector,
		end: Vector,
		red: number,
		green: number,
		blue: number,
		zTest: boolean,
		time: number
	): void;

	/**
	 * Draw a debug line using color vec.
	 * @param start Vector
	 * @param end vector
	 * @param rgb vector
	 * @param ztest bool
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawLine_vCol(
		start: Vector,
		end: vector,
		rgb: vector,
		ztest: boolean,
		duration: number
	): void;

	/**
	 * Draw text with a line offset.
	 * @param x float
	 * @param y float
	 * @param lineOffset int
	 * @param text string
	 * @param r int
	 * @param g int
	 * @param b int
	 * @param a int
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawScreenTextLine(
		x: number,
		y: number,
		lineOffset: number,
		text: string,
		r: number,
		g: number,
		b: number,
		a: number,
		duration: number
	): void;

	/**
	 * Draw text on the screen, starting on the position of origin.
	 * @param origin Vector
	 * @param text string
	 * @param useViewCheck bool
	 * @param duration float
	 * @returns void
	 */
	function DebugDrawText(
		origin: Vector,
		text: string,
		useViewCheck: boolean,
		duration: number
	): void;

	/**
	 * Dumps information about a class or instance.
	 * @param object handle
	 * @returns void
	 */
	function DumpObject(object: SquirrelHandle): void;

	/**
	 * Manages the HUD timers. Valid command enumerations are: TIMER_DISABLE, TIMER_COUNTUP, TIMER_COUNTDOWN, TIMER_STOP, TIMER_SET
	 * @param timerID int
	 * @param command int
	 * @param value float
	 * @returns void
	 */
	function HUDManageTimers(
		timerID: number,
		command: number,
		value: number
	): void;

	/**
	 * Sets the position of a HUD element. See L4D2_EMS/Appendix:_HUD
	 * @param slot int
	 * @param x float
	 * @param y float
	 * @param width float
	 * @param height float
	 * @returns void
	 */
	function HUDPlace(
		slot: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;

	/**
	 * Returns the value of a HUD timer. See L4D2_EMS/Appendix:_HUD
	 * @param timerID int
	 * @returns float
	 */
	function HUDReadTimer(timerID: number): number;

	/**
 * Applies a HUD to the screen. See L4D2_EMS/Appendix:_HUD
Important:
Scriptedmode feature, usable properly in mutations only
 * @param HUDTable table
 * @returns void
 */
	function HUDSetLayout(HUDTable: table): void;

	/**
	 * Prints message to console without any line feed after.
	 * @param message string
	 * @returns void
	 */
	function Msg(message: string): void;

	/**
	 * Prints message to console without any line feed after. Identical to Msg().
	 * @param message string
	 * @returns void
	 */
	function print(message: string): void;

	/**
	 * Prints message to console with a line feed after.
	 * @param message string
	 * @returns void
	 */
	function printl(message: string): void;

	/**
	 * Identical to print. print seems to be a wrapper for this.
	 * @param message string
	 * @returns void
	 */
	function realPrint(message: string): void;

	/**
 * Print a HUD message on all clients.
Bug*:
Non-functional.
 * @param message string
 * @returns void
 */
	function ShowMessage(message: string): void;

	/**
	 * Calling this will have the specified player send the message to chat, either to teamOnly (true) or to everyone.
	 * @param player CTerrorPlayer
	 * @param message string
	 * @param teamOnly bool
	 * @returns void
	 */
	function Say(
		player: CTerrorPlayer,
		message: string,
		teamOnly: boolean
	): void;

	/**
	 * Send a string to the console as a command.
	 * @param command string
	 * @returns void
	 */
	function SendToConsole(command: string): void;

	/**
	 * Send a string to the server console as a command.
	 * @param command string
	 * @returns void
	 */
	function SendToServerConsole(command: string): void;
}

export {};
