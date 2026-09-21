# Flow

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## AccessContainerFlow

Approach and open a container.

```text
/lattivium Worker exec AccessContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |

## AcquireContainerItemsFlow

Acquire an exact count from a container in the current dimension.

```text
/lattivium Worker exec AcquireContainerItemsFlow {"source":{"x":0,"y":64,"z":0},"item":"minecraft:stone","count":64}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `source` | `object` | `Required` |  |
| `source.x` | `integer` | `Required` |  |
| `source.y` | `integer` | `Required` |  |
| `source.z` | `integer` | `Required` |  |
| `item` | `string` | `Required` |  |
| `count` | `integer` | `Required` | minimum: 1 |

## ApproachAreaFlow

Travel toward an area using a flight policy.

```text
/lattivium Worker exec ApproachAreaFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |
| `arriveDistance` | `number` | `0.6` | minimum: 1e-06 |
| `settlingTicks` | `integer` | `240` | minimum: 1 |
| `cruiseHeight` | `integer` | `325` | minimum: 321 |

## BuildSchematicFlow

Build a schematic at an origin in the current dimension.

```text
/lattivium Worker exec BuildSchematicFlow {"file":"example.litematic","origin":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` |  |
| `origin` | `object` | `Required` |  |
| `origin.x` | `number` | `Required` |  |
| `origin.y` | `number` | `Required` |  |
| `origin.z` | `number` | `Required` |  |

## ElytraFlightFlow

Fly toward a position using carried equipment and rockets.

```text
/lattivium Worker exec ElytraFlightFlow {"target":{"x":0,"y":150,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

## ExcavateAreaFlow

Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.

```text
/lattivium Worker exec ExcavateAreaFlow {"min":{"x":0,"y":64,"z":0},"max":{"x":4,"y":66,"z":4},"depots":[{"x":8,"y":64,"z":0}]}
```

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

## FireworkReserveFlow

Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.

```text
/lattivium Worker exec FireworkReserveFlow {"horizontalDistance":1000}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `horizontalDistance` | `number` | `Required` | minimum: 0 |

## FireworkUseFlow

Use one carried rocket.

```text
/lattivium Worker exec FireworkUseFlow {}
```

## MineBlockFlow

Mine one block under construction safety and drop rules.

```text
/lattivium Worker exec MineBlockFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

## NavigateToPosFlow

Navigate to a position in the Bot's current dimension.

```text
/lattivium Worker exec NavigateToPosFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |

## OpenContainerFlow

Open a container within interaction reach.

```text
/lattivium Worker exec OpenContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |

## PortalJourneyFlow

Physically traverse the specified portal route; optionally continue to a destination.

```text
/lattivium Worker exec PortalJourneyFlow {"destinationDimension":"minecraft:the_nether","entrance":{"x":0,"y":64,"z":0},"exit":{"x":0,"y":129,"z":0}}
```

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
| `target` | `optional` | `Required` |  |

## ResumeExcavation

Resume excavation from a saved task UUID in this world.

```text
/lattivium Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `taskId` | `string` | `Required` |  |

## TransferItemsFlow

Transfer an exact item count through the currently open menu.

```text
/lattivium Worker exec TransferItemsFlow {"direction":"WITHDRAW","item":"minecraft:stone","count":64}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `direction` | `string` | `Required` | `DEPOSIT`, `WITHDRAW` |
| `item` | `string` | `Required` |  |
| `count` | `integer` | `Required` | minimum: 1 |

## UseFlow

Interact with a block using the selected hand.

```text
/lattivium Worker exec UseFlow {"target":{"x":0,"y":64,"z":0}}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `integer` | `Required` |  |
| `target.y` | `integer` | `Required` |  |
| `target.z` | `integer` | `Required` |  |
| `hand` | `string` | `"MAIN_HAND"` | `MAIN_HAND`, `OFF_HAND` |

