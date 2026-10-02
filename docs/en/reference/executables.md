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
- [ExcavateSiteTask](./tasks#excavatesitetask): Excavate a 16x16 site five blocks below surfaceOrigin.y, with an outside workstation and scaffold shaft. Survey water before work; raise the workstation deck one block when its floor meets water. foundationDepth authorizes support below that deck. Build and verify each layer entrance before clearing that layer.
- [PreparePlatformTask](./tasks#prepareplatformtask): Clear above min.y and build a platform. foundationDepth=1 authorizes one layer below the floor for water landing or floor-plant footing, with separate material and placement receipts.
- [PrepareSiteInfrastructureTask](./tasks#preparesiteinfrastructuretask): Survey and freeze one liquid-free edge shaft, a permanent one-wide road and an air-volume workstation before construction. Build the facilities and verify a native station-to-shaft-bottom round trip.
- [ResumeExcavateSiteTask](./tasks#resumeexcavatesitetask): Resume a site excavation checkpoint or verify an already completed site. Partial workstation and scaffold assembly require reconciliation.

## [Flow](./flows)

- [AccessContainerFlow](./flows#accesscontainerflow): Approach and open a container.
- [AcquireContainerItemsFlow](./flows#acquirecontaineritemsflow): Acquire an exact count from a container in the current dimension.
- [ApproachAreaFlow](./flows#approachareaflow): Travel toward an area using a flight policy.
- [BuildPerimeterSandWallFlow](./flows#buildperimetersandwallflow): Mine each water-wall column into the original seabed, settle real sand around a 6-, 12-, 16- or 32-block inner square, and return to the starting deck. Wall height is at most 96 blocks. The Bot begins on the supported dry startDeck with sand, tools and underwater survival supplies.
- [BuildSchematicFlow](./flows#buildschematicflow): Build a schematic at an origin in the current dimension.
- [ClearAndSettleWaterColumnFlow](./flows#clearandsettlewatercolumnflow): Clear one declared flooded column, return to a supported dry deck horizontally adjacent to its top, then settle sand into every declared Y and return. Declare an adjacent water operation lane and a separate return lane; height is at most 96 blocks. The Bot carries sand, tools and underwater survival supplies.
- [ElytraFlightFlow](./flows#elytraflightflow): Fly toward a position using carried equipment and rockets.
- [EnsureInventoryReadyFlow](./flows#ensureinventoryreadyflow): Prepare an owned direct-use batch, restore inventory levels and free working slots. taskSlots keeps the batch in L1 alongside L0 reserves; incoming declares the next acquisition's capacity. Missing transport boxes use the shared Atlas source lookup and acquisition workflow.
- [ExcavateAreaFlow](./flows#excavateareaflow): Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.
- [ExcavateLayeredAreaFlow](./flows#excavatelayeredareaflow): Clear a prepared sealed volume from top to bottom. Replace liquids within each layer before mining it, and retain depot and abandoned-drop receipts across layers. The egress lies inside the bottom layer; depots are existing empty shulker boxes outside the volume, while additionalDepots are supported free positions for carried empty boxes.
- [FireworkReserveFlow](./flows#fireworkreserveflow): Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.
- [FireworkUseFlow](./flows#fireworkuseflow): Use one carried rocket.
- [LocalNavigationFlow](./flows#localnavigationflow): Navigate to a position in the Bot's current dimension.
- [MineBlockFlow](./flows#mineblockflow): Mine one block under construction safety and drop rules.
- [OpenContainerFlow](./flows#opencontainerflow): Open a container within interaction reach.
- [PortalJourneyFlow](./flows#portaljourneyflow): Traverse the specified portal route and clear the exit; target is a route-selection hint.
- [PrepareAndExcavatePerimeterFlow](./flows#prepareandexcavateperimeterflow): Build a four-sided sand perimeter, dry scaffold shaft, road and workstation; then fill liquids and excavate the inner square layer by layer before returning to the workstation. sealBottom authorizes permanent isolation directly below the excavation; autonomousSupplies maintains layer materials and acquires extra empty depot boxes through shared supply flows.
- [PreparePerimeterInfrastructureFlow](./flows#prepareperimeterinfrastructureflow): Build a sand perimeter around a 6-, 12-, 16- or 32-block inner square, isolate and convert one west-edge sand column into a dry scaffold shaft, then build a permanent concrete road and outside workstation. Wall height is at most 96 blocks. The Bot carries construction supplies; interior excavation has a separate entry.
- [PrepareWorkstationFlow](./flows#prepareworkstationflow): Prepare a workstation outside an excavation area and stock its containers. foundationDepth=1 additionally authorizes a single layer of water-landing or floor-plant foundations below the floor.
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
