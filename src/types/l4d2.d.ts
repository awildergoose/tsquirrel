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

declare global {
	declare const Convars: Convars;
	declare const Director: CDirector;
	declare const Entities: CEntities;
	declare const EntityOutputs: CScriptEntityOutputs;
	declare const NavMesh: CNavMesh;
	declare const NetProps: CNetPropManager;
	declare const ResponseCriteria: CScriptResponseCriteria;
}

export {};
