# Positional and diagnostic commands

The `exec`, `enqueue` and `interrupt` verbs accept positional parameters as well as JSON. Positional syntax splits arguments on whitespace; use JSON for values containing spaces. Coordinates are absolute. The same validation and task scheduler apply to both forms.

## AccessContainerFlow

Approach and open a container.

```text
/lattivium <Bot> exec AccessContainerFlow <x> <y> <z>
```

## AcquireContainerItemsFlow

Acquire an exact count from a container in the current dimension.

```text
/lattivium <Bot> exec AcquireContainerItemsFlow <x> <y> <z> <item> <count>
```

## ApproachAreaFlow

Travel toward an area using a flight policy.

```text
/lattivium <Bot> exec ApproachAreaFlow <x> <y> <z> [arriveDistance settlingTicks cruiseHeight]
```

## AtlasProductionPreviewTask

Preview material production without collecting or crafting items.

```text
/lattivium <Bot> exec AtlasProductionPreviewTask <file.litematic|file.materials.json> <deliveryDimension> <x> <y> <z>
```

## AtlasSupplyTask

Plan, acquire, craft and deliver materials using Atlas stock observations.

```text
/lattivium <Bot> exec AtlasSupplyTask <file> <deliveryDimension> <x> <y> <z> [USE_LOOSE_CARGO] [DEBUG|SOURCE_PRESERVING_DEBUG] [DELIVER_TO <dimension> <x> <y> <z>]...
```

## BuildSchematicFlow

Build a schematic at an origin in the current dimension.

```text
/lattivium <Bot> exec BuildSchematicFlow <file.litematic> <x> <y> <z>
```

## DelayTask

Wait for a bounded number of game ticks.

```text
/lattivium <Bot> exec DelayTask <durationTicks>
```

## ElytraFlightFlow

Fly toward a position using carried equipment and rockets.

```text
/lattivium <Bot> exec ElytraFlightFlow <x> <y> <z>
```

## ExcavateAreaFlow

Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.

```text
/lattivium <Bot> exec ExcavateAreaFlow <taskUUID> | <minX minY minZ> <maxX maxY maxZ> <depot triples> [--seal <outside seal triples>]
```

## FireworkReserveFlow

Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.

```text
/lattivium <Bot> exec FireworkReserveFlow <horizontalDistance>
```

## FireworkUseFlow

Use one carried rocket.

```text
/lattivium <Bot> exec FireworkUseFlow 
```

## JumpAction

Press jump once.

```text
/lattivium <Bot> exec JumpAction 
```

## LookAction

Look at a world position.

```text
/lattivium <Bot> exec LookAction <x> <y> <z> [toleranceDegrees maxAttempts]
```

## MineBlockFlow

Mine one block under construction safety and drop rules.

```text
/lattivium <Bot> exec MineBlockFlow <x> <y> <z>
```

## MouseAction

Apply a mouse button input.

```text
/lattivium <Bot> exec MouseAction <LEFT|RIGHT> <ONCE|CONTINUOUS>
```

## MoveAction

Hold directional input for a fixed number of ticks; does not find a path.

```text
/lattivium <Bot> exec MoveAction <FORWARD|BACKWARD|LEFT|RIGHT> <ticks> [strength] [sprint]
```

## MoveItemToOffhandAction

Move a carried item into the offhand.

```text
/lattivium <Bot> exec MoveItemToOffhandAction <item>
```

## NavigateToPosFlow

Navigate to a position in the Bot's current dimension.

```text
/lattivium <Bot> exec NavigateToPosFlow <x> <y> <z>
```

## OpenContainerFlow

Open a container within interaction reach.

```text
/lattivium <Bot> exec OpenContainerFlow <x> <y> <z>
```

## PortalJourneyFlow

Physically traverse the specified portal route; optionally continue to a destination.

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

## SelectHotbarAction

Select a zero-based hotbar slot.

```text
/lattivium <Bot> exec SelectHotbarAction <zeroBasedSlot>
```

## TransferAction

Quick-move a half-open range of native menu slots.

```text
/lattivium <Bot> exec TransferAction <startSlotInclusive> <endSlotExclusive>
```

## TransferItemsFlow

Transfer an exact item count through the currently open menu.

```text
/lattivium <Bot> exec TransferItemsFlow <DEPOSIT|WITHDRAW> <item> <count>
```

## UseFlow

Interact with a block using the selected hand.

```text
/lattivium <Bot> exec UseFlow <x> <y> <z> [MAIN_HAND|OFF_HAND]
```

## Diagnostics

These commands use fixed command-tree parameters and require permission level 2.

```text
/lattiviumperf start <phase>
/lattiviumperf report
/lattiviumperf stop
/lattiviumperf watchcount <x> <y> <z>
/lattiviumatlas status
```

`start` opens a server tick measurement window; `report` reads it and `stop` ends it. `phase` is one word, at most 80 characters. `watchcount` observes changes in a loaded container, recording up to 256 changes in JFR; it uses vanilla block-position syntax. Atlas status reports scanning and database queues.
