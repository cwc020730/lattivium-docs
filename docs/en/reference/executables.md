# Execution entries

Submit JSON parameters through `exec`, `enqueue` or `interrupt`. Each accepted submission returns a task ID. Bot and world dependencies are supplied by the server. Fields and entry names are case-sensitive; coordinates are absolute. See [execution control](./task-control) and [diagnostic commands](./commands).

```text
/lattivium Worker exec DelayTask {"ticks":20}
/ltv schema
/ltv schema DelayTask
```

An **executable** is an operation with a lifecycle: Task, Flow or Action. Entries declared for independent execution have commands. JSON is the common parameter format; entries with positional syntax list it alongside their parameters.

## [Task](./tasks)

- [AtlasProductionPreviewTask](./tasks#atlasproductionpreviewtask): Preview material production without collecting or crafting items.
- [AtlasSupplyTask](./tasks#atlassupplytask): Plan, acquire, craft and deliver materials using Atlas stock observations.
- [DelayTask](./tasks#delaytask): Wait for a bounded number of game ticks.

## [Flow](./flows)

- [AccessContainerFlow](./flows#accesscontainerflow): Approach and open a container.
- [AcquireContainerItemsFlow](./flows#acquirecontaineritemsflow): Acquire an exact count from a container in the current dimension.
- [ApproachAreaFlow](./flows#approachareaflow): Travel toward an area using a flight policy.
- [BuildSchematicFlow](./flows#buildschematicflow): Build a schematic at an origin in the current dimension.
- [ElytraFlightFlow](./flows#elytraflightflow): Fly toward a position using carried equipment and rockets.
- [ExcavateAreaFlow](./flows#excavateareaflow): Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.
- [FireworkReserveFlow](./flows#fireworkreserveflow): Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.
- [FireworkUseFlow](./flows#fireworkuseflow): Use one carried rocket.
- [LocalNavigationFlow](./flows#localnavigationflow): Navigate to a position in the Bot's current dimension.
- [MineBlockFlow](./flows#mineblockflow): Mine one block under construction safety and drop rules.
- [OpenContainerFlow](./flows#opencontainerflow): Open a container within interaction reach.
- [PortalJourneyFlow](./flows#portaljourneyflow): Traverse the specified portal route and clear the exit; target is a route-selection hint.
- [ResumeExcavation](./flows#resumeexcavation): Resume excavation from a saved task UUID in this world.
- [TransferItemsFlow](./flows#transferitemsflow): Transfer an exact item count through the currently open menu.
- [TravelToFlow](./flows#traveltoflow): Travel to destination feet in any dimension using Atlas portal routes and local navigation.
- [UseFlow](./flows#useflow): Interact with a block using the selected hand.

## [Action](./actions)

- [JumpAction](./actions#jumpaction): Press jump once.
- [LookAction](./actions#lookaction): Look at a world position.
- [MouseAction](./actions#mouseaction): Apply a mouse button input.
- [MoveAction](./actions#moveaction): Hold directional input for a fixed number of ticks; does not find a path.
- [MoveItemToOffhandAction](./actions#moveitemtooffhandaction): Move a carried item into the offhand.
- [SelectHotbarAction](./actions#selecthotbaraction): Select a zero-based hotbar slot.
- [TransferAction](./actions#transferaction): Quick-move a half-open range of native menu slots.
