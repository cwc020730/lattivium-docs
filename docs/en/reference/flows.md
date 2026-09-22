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
