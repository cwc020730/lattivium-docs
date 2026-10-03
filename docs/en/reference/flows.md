---
pageClass: execution-reference
outline: 2
---

# Flow

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## AccessContainerFlow

Approach and open a container.

### Command

```text
/lattivium Worker exec AccessContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec AccessContainerFlow <x> <y> <z>
```

## AcquireContainerItemsFlow

Acquire an exact count from a container in the current dimension.

### Command

```text
/lattivium Worker exec AcquireContainerItemsFlow {"source":{"x":0,"y":64,"z":0},"item":"minecraft:stone","count":64}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `source` | `object` | `Required` |  |
| `source.x` | `integer` | `Required` |  |
| `source.y` | `integer` | `Required` |  |
| `source.z` | `integer` | `Required` |  |
| `item` | `string` | `Required` |  |
| `count` | `integer` | `Required` | minimum: 1 |

### Positional syntax

```text
/lattivium <Bot> exec AcquireContainerItemsFlow <x> <y> <z> <item> <count>
```

## ApproachAreaFlow

Travel toward an area using a flight policy.

### Command

```text
/lattivium Worker exec ApproachAreaFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |
| `arriveDistance` | `number` | `0.6` | minimum: 1e-06 |
| `settlingTicks` | `integer` | `240` | minimum: 1 |
| `cruiseHeight` | `integer` | `325` | minimum: 321 |

### Positional syntax

```text
/lattivium <Bot> exec ApproachAreaFlow <x> <y> <z> [arriveDistance settlingTicks cruiseHeight]
```

## BuildPerimeterSandWallFlow

Mine each water-wall column into the original seabed, settle real sand around a 6-, 12-, 16- or 32-block inner square, and return to the starting deck. Wall height is at most 96 blocks. The Bot begins on the supported dry startDeck with sand, tools and underwater survival supplies.

### Command

```text
/lattivium Worker exec BuildPerimeterSandWallFlow {"innerMin":{"x":0,"y":62,"z":0},"size":6,"bottomY":37,"topY":62,"startDeck":{"x":-2,"y":63,"z":-1}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `innerMin` | `object` | `Required` |  |
| `innerMin.x` | `integer` | `Required` |  |
| `innerMin.y` | `integer` | `Required` |  |
| `innerMin.z` | `integer` | `Required` |  |
| `size` | `integer` | `Required` | minimum: 6; maximum: 32 |
| `bottomY` | `integer` | `Required` |  |
| `topY` | `integer` | `Required` |  |
| `startDeck` | `object` | `Required` |  |
| `startDeck.x` | `integer` | `Required` |  |
| `startDeck.y` | `integer` | `Required` |  |
| `startDeck.z` | `integer` | `Required` |  |
| `minimumOriginalSeabedBlocks` | `integer` | `10` | minimum: 0; maximum: 96 |
| `resumeSandColumns` | `integer` | `0` | minimum: 0; maximum: 131 |
| `stagingAreas` | `array` | `[]` | minItems: 0; maxItems: 16 |
| `stagingAreas[].x` | `integer` | `Required` |  |
| `stagingAreas[].y` | `integer` | `Required` |  |
| `stagingAreas[].z` | `integer` | `Required` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

## BuildSchematicFlow

Build a schematic at an origin in the current dimension.

### Command

```text
/lattivium Worker exec BuildSchematicFlow {"file":"example.litematic","origin":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` | Accepted: .litematic; Path under the server world’s `lattivium-atlas/schematics/` |
| `origin` | `object` | `Required` |  |
| `origin.x` | `number` | `Required` |  |
| `origin.y` | `number` | `Required` |  |
| `origin.z` | `number` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec BuildSchematicFlow <file.litematic> <x> <y> <z>
```

## ClearAndSettleWaterColumnFlow

Clear one declared flooded column, return to a supported dry deck horizontally adjacent to its top, then settle sand into every declared Y and return. Declare an adjacent water operation lane and a separate return lane; height is at most 96 blocks. The Bot carries sand, tools and underwater survival supplies.

### Command

```text
/lattivium Worker exec ClearAndSettleWaterColumnFlow {"top":{"x":3,"y":62,"z":3},"bottom":{"x":3,"y":58,"z":3},"operationSurface":{"x":2,"y":62,"z":3},"returnLanding":{"x":2,"y":62,"z":2},"deck":{"x":3,"y":63,"z":2}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `top` | `object` | `Required` |  |
| `top.x` | `integer` | `Required` |  |
| `top.y` | `integer` | `Required` |  |
| `top.z` | `integer` | `Required` |  |
| `bottom` | `object` | `Required` |  |
| `bottom.x` | `integer` | `Required` |  |
| `bottom.y` | `integer` | `Required` |  |
| `bottom.z` | `integer` | `Required` |  |
| `operationSurface` | `object` | `Required` |  |
| `operationSurface.x` | `integer` | `Required` |  |
| `operationSurface.y` | `integer` | `Required` |  |
| `operationSurface.z` | `integer` | `Required` |  |
| `returnLanding` | `object` | `Required` |  |
| `returnLanding.x` | `integer` | `Required` |  |
| `returnLanding.y` | `integer` | `Required` |  |
| `returnLanding.z` | `integer` | `Required` |  |
| `deck` | `object` | `Required` |  |
| `deck.x` | `integer` | `Required` |  |
| `deck.y` | `integer` | `Required` |  |
| `deck.z` | `integer` | `Required` |  |
| `returnViaNewColumn` | `boolean` | `false` |  |

## ElytraFlightFlow

Fly toward a position using carried equipment and rockets.

### Command

```text
/lattivium Worker exec ElytraFlightFlow {"target":{"x":0,"y":150,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec ElytraFlightFlow <x> <y> <z>
```

## EnsureInventoryReadyFlow

Prepare an owned direct-use batch, restore inventory levels and free working slots. taskSlots keeps the batch in L1 alongside L0 reserves; incoming declares the next acquisition's capacity. Missing transport boxes use the shared Atlas source lookup and acquisition workflow.

### Command

```text
/lattivium Worker exec EnsureInventoryReadyFlow {"demand":[{"item":"minecraft:sand","count":64}],"emptySlots":2,"taskSlots":true}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `demand` | `array` | `[]` | minItems: 0; maxItems: 128 |
| `demand[].item` | `string` | `Required` |  |
| `demand[].count` | `integer` | `Required` | minimum: 1 |
| `emptySlots` | `integer` | `2` | minimum: 0; maximum: 36 |
| `incoming` | `array` | `[]` | minItems: 0; maxItems: 128 |
| `incoming[].item` | `string` | `Required` |  |
| `incoming[].count` | `integer` | `Required` | minimum: 1 |
| `taskSlots` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

## ExcavateAreaFlow

Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.

### Command

```text
/lattivium Worker exec ExcavateAreaFlow {"min":{"x":0,"y":64,"z":0},"max":{"x":4,"y":66,"z":4},"depots":[{"x":8,"y":64,"z":0}]}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `min` | `object` | `Required` |  |
| `min.x` | `integer` | `Required` |  |
| `min.y` | `integer` | `Required` |  |
| `min.z` | `integer` | `Required` |  |
| `max` | `object` | `Required` |  |
| `max.x` | `integer` | `Required` |  |
| `max.y` | `integer` | `Required` |  |
| `max.z` | `integer` | `Required` |  |
| `depots` | `array` | `Required` | minItems: 1; maxItems: 1024 |
| `depots[].x` | `integer` | `Required` |  |
| `depots[].y` | `integer` | `Required` |  |
| `depots[].z` | `integer` | `Required` |  |
| `sealDepots` | `array` | `[]` | minItems: 0; maxItems: 1024 |
| `sealDepots[].x` | `integer` | `Required` |  |
| `sealDepots[].y` | `integer` | `Required` |  |
| `sealDepots[].z` | `integer` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec ExcavateAreaFlow <taskUUID> | <minX minY minZ> <maxX maxY maxZ> <depot triples> [--seal <outside seal triples>]
```

## ExcavateLayeredAreaFlow

Clear a prepared sealed volume from top to bottom. Replace liquids within each layer before mining it, and retain depot and abandoned-drop receipts across layers. The egress lies inside the bottom layer; depots are existing empty shulker boxes outside the volume, while additionalDepots are supported free positions for carried empty boxes.

### Command

```text
/lattivium Worker exec ExcavateLayeredAreaFlow {"min":{"x":0,"y":47,"z":0},"max":{"x":15,"y":62,"z":15},"egress":{"x":0,"y":47,"z":7},"depots":[{"x":-6,"y":64,"z":7}]}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `min` | `object` | `Required` |  |
| `min.x` | `integer` | `Required` |  |
| `min.y` | `integer` | `Required` |  |
| `min.z` | `integer` | `Required` |  |
| `max` | `object` | `Required` |  |
| `max.x` | `integer` | `Required` |  |
| `max.y` | `integer` | `Required` |  |
| `max.z` | `integer` | `Required` |  |
| `egress` | `object` | `Required` |  |
| `egress.x` | `integer` | `Required` |  |
| `egress.y` | `integer` | `Required` |  |
| `egress.z` | `integer` | `Required` |  |
| `depots` | `array` | `Required` | minItems: 1; maxItems: 8 |
| `depots[].x` | `integer` | `Required` |  |
| `depots[].y` | `integer` | `Required` |  |
| `depots[].z` | `integer` | `Required` |  |
| `additionalDepots` | `array` | `[]` | minItems: 0; maxItems: 32 |
| `additionalDepots[].x` | `integer` | `Required` |  |
| `additionalDepots[].y` | `integer` | `Required` |  |
| `additionalDepots[].z` | `integer` | `Required` |  |
| `sealBottom` | `boolean` | `false` |  |
| `autonomousSupplies` | `boolean` | `false` |  |

## FireworkReserveFlow

Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.

### Command

```text
/lattivium Worker exec FireworkReserveFlow {"horizontalDistance":1000}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `horizontalDistance` | `number` | `Required` | minimum: 0 |

### Positional syntax

```text
/lattivium <Bot> exec FireworkReserveFlow <horizontalDistance>
```

## FireworkUseFlow

Use one carried rocket.

### Command

```text
/lattivium Worker exec FireworkUseFlow {}
```

Parameters: `{}`.

### Positional syntax

```text
/lattivium <Bot> exec FireworkUseFlow
```

## LocalNavigationFlow

Navigate to a position in the Bot's current dimension.

### Command

```text
/lattivium Worker exec LocalNavigationFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec LocalNavigationFlow <x> <y> <z>
```

## MineBlockFlow

Mine one block under construction safety and drop rules.

### Command

```text
/lattivium Worker exec MineBlockFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec MineBlockFlow <x> <y> <z>
```

## OpenContainerFlow

Open a container within interaction reach.

### Command

```text
/lattivium Worker exec OpenContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec OpenContainerFlow <x> <y> <z>
```

## PortalJourneyFlow

Traverse the specified portal route and clear the exit; target is a route-selection hint.

### Command

```text
/lattivium Worker exec PortalJourneyFlow {"destinationDimension":"minecraft:the_nether","entrance":{"x":0,"y":64,"z":0},"exit":{"x":0,"y":129,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `destinationDimension` | `string` | `Required` |  |
| `entrance` | `object` | `Required` |  |
| `entrance.x` | `integer` | `Required` |  |
| `entrance.y` | `integer` | `Required` |  |
| `entrance.z` | `integer` | `Required` |  |
| `exit` | `object` | `Required` |  |
| `exit.x` | `integer` | `Required` |  |
| `exit.y` | `integer` | `Required` |  |
| `exit.z` | `integer` | `Required` |  |
| `target` | `optional` | `Required` | Route-selection hint; travel ends after clearing the portal exit |

### Positional syntax

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

## PrepareAndExcavatePerimeterFlow

Build a four-sided sand perimeter, dry scaffold shaft, road and workstation; then fill liquids and excavate the inner square layer by layer before returning to the workstation. sealBottom authorizes permanent isolation directly below the excavation; autonomousSupplies maintains layer materials and acquires extra empty depot boxes through shared supply flows.

### Command

```text
/lattivium Worker exec PrepareAndExcavatePerimeterFlow {"innerMin":{"x":0,"y":62,"z":0},"size":16,"bottomY":47,"topY":62}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `innerMin` | `object` | `Required` |  |
| `innerMin.x` | `integer` | `Required` |  |
| `innerMin.y` | `integer` | `Required` |  |
| `innerMin.z` | `integer` | `Required` |  |
| `size` | `integer` | `Required` | minimum: 6; maximum: 32 |
| `bottomY` | `integer` | `Required` |  |
| `topY` | `integer` | `Required` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `3` | minimum: 2; maximum: 6 |
| `sealBottom` | `boolean` | `false` |  |
| `autonomousSupplies` | `boolean` | `false` |  |
| `reuseSandWall` | `boolean` | `false` |  |
| `stagingAreas` | `array` | `[]` | minItems: 0; maxItems: 16 |
| `stagingAreas[].x` | `integer` | `Required` |  |
| `stagingAreas[].y` | `integer` | `Required` |  |
| `stagingAreas[].z` | `integer` | `Required` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |
| `drainageMode` | `optional` | `Required` |  |

## PreparePerimeterInfrastructureFlow

Build a sand perimeter around a 6-, 12-, 16- or 32-block inner square, isolate and convert one west-edge sand column into a dry scaffold shaft, then build a permanent concrete road and outside workstation. Wall height is at most 96 blocks. The Bot carries construction supplies; interior excavation has a separate entry.

### Command

```text
/lattivium Worker exec PreparePerimeterInfrastructureFlow {"innerMin":{"x":0,"y":62,"z":0},"size":16,"bottomY":47,"topY":62}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `innerMin` | `object` | `Required` |  |
| `innerMin.x` | `integer` | `Required` |  |
| `innerMin.y` | `integer` | `Required` |  |
| `innerMin.z` | `integer` | `Required` |  |
| `size` | `integer` | `Required` | minimum: 6; maximum: 32 |
| `bottomY` | `integer` | `Required` |  |
| `topY` | `integer` | `Required` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `3` | minimum: 2; maximum: 6 |
| `reuseSandWall` | `boolean` | `false` |  |
| `stagingAreas` | `array` | `[]` | minItems: 0; maxItems: 16 |
| `stagingAreas[].x` | `integer` | `Required` |  |
| `stagingAreas[].y` | `integer` | `Required` |  |
| `stagingAreas[].z` | `integer` | `Required` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

## PrepareWorkstationFlow

Prepare a workstation outside an excavation area and stock its containers. foundationDepth=1 additionally authorizes a single layer of water-landing or floor-plant foundations below the floor.

### Command

```text
/lattivium Worker exec PrepareWorkstationFlow {"origin":{"x":8,"y":64,"z":0},"excavationMin":{"x":0,"y":60,"z":0},"excavationMax":{"x":4,"y":64,"z":4}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `origin` | `object` | `Required` |  |
| `origin.x` | `integer` | `Required` |  |
| `origin.y` | `integer` | `Required` |  |
| `origin.z` | `integer` | `Required` |  |
| `excavationMin` | `object` | `Required` |  |
| `excavationMin.x` | `integer` | `Required` |  |
| `excavationMin.y` | `integer` | `Required` |  |
| `excavationMin.z` | `integer` | `Required` |  |
| `excavationMax` | `object` | `Required` |  |
| `excavationMax.x` | `integer` | `Required` |  |
| `excavationMax.y` | `integer` | `Required` |  |
| `excavationMax.z` | `integer` | `Required` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `emptyBoxes` | `integer` | `4` | minimum: 0; maximum: 16 |
| `floor` | `string` | `""` |  |
| `fillBlocks` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `sand` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `scaffolding` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `foundationDepth` | `integer` | `0` | minimum: 0; maximum: 1 |
| `headroom` | `integer` | `4` | minimum: 2; maximum: 6 |

## ResumeExcavation

Resume excavation from a saved task UUID in this world.

### Command

```text
/lattivium Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `taskId` | `string` | `Required` | Excavation checkpoint UUID |

## TransferItemsFlow

Transfer an exact item count through the currently open menu.

### Command

```text
/lattivium Worker exec TransferItemsFlow {"direction":"WITHDRAW","item":"minecraft:stone","count":64}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `direction` | `string` | `Required` | `DEPOSIT`, `WITHDRAW` |
| `item` | `string` | `Required` |  |
| `count` | `integer` | `Required` | minimum: 1 |

### Positional syntax

```text
/lattivium <Bot> exec TransferItemsFlow <DEPOSIT|WITHDRAW> <item> <count>
```

## TravelToFlow

Travel to destination feet in any dimension using Atlas portal routes and local navigation.

### Command

```text
/lattivium Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `dimension` | `string` | `Required` | Loaded server dimension identifier |
| `target` | `object` | `Required` | Bot feet; arrival within 0.75 blocks of the bottom center |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec TravelToFlow <dimension> <x> <y> <z>
```

## UseFlow

Interact with a block using the selected hand.

### Command

```text
/lattivium Worker exec UseFlow {"target":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |
| `hand` | `string` | `"MAIN_HAND"` | `MAIN_HAND`, `OFF_HAND` |

### Positional syntax

```text
/lattivium <Bot> exec UseFlow <x> <y> <z> [MAIN_HAND|OFF_HAND]
```
