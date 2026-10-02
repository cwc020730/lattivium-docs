---
pageClass: execution-reference
outline: 2
---

# Task

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## AtlasProductionPreviewTask

Preview material production without collecting or crafting items.

### Command

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` | Accepted: .litematic, .materials.json; Path under the server world’s `lattivium-atlas/schematics/`; Direct child filename |
| `deliveries` | `array` | `Required` | Distinct container locations; minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `Required` |  |
| `deliveries[].position` | `object` | `Required` |  |
| `deliveries[].position.x` | `integer` | `Required` |  |
| `deliveries[].position.y` | `integer` | `Required` |  |
| `deliveries[].position.z` | `integer` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec AtlasProductionPreviewTask <file.litematic|file.materials.json> <deliveryDimension> <x> <y> <z>
```

## AtlasSupplyTask

Plan, acquire, craft and deliver materials using Atlas stock observations.

### Command

```text
/lattivium Worker exec AtlasSupplyTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` | Accepted: .litematic, .materials.json, .segment.json; Path under the server world’s `lattivium-atlas/schematics/`; Direct child filename |
| `deliveries` | `array` | `Required` | Distinct container locations; minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `Required` |  |
| `deliveries[].position` | `object` | `Required` |  |
| `deliveries[].position.x` | `integer` | `Required` |  |
| `deliveries[].position.y` | `integer` | `Required` |  |
| `deliveries[].position.z` | `integer` | `Required` |  |
| `useLooseCargo` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

### Positional syntax

```text
/lattivium <Bot> exec AtlasSupplyTask <file> <deliveryDimension> <x> <y> <z> [USE_LOOSE_CARGO] [DEBUG|SOURCE_PRESERVING_DEBUG] [DELIVER_TO <dimension> <x> <y> <z>]...
```

## DelayTask

Wait for a bounded number of game ticks.

### Command

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `ticks` | `integer` | `Required` | minimum: 1; maximum: 1200 |

### Positional syntax

```text
/lattivium <Bot> exec DelayTask <durationTicks>
```

## ExcavateSiteTask

Excavate a 16x16 site five blocks below surfaceOrigin.y, with an outside workstation and scaffold shaft. Survey water before work; raise the workstation deck one block when its floor meets water. foundationDepth authorizes support below that deck. Build and verify each layer entrance before clearing that layer.

### Command

```text
/lattivium Worker exec ExcavateSiteTask {"surfaceOrigin":{"x":0,"y":64,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `surfaceOrigin` | `object` | `Required` |  |
| `surfaceOrigin.x` | `integer` | `Required` |  |
| `surfaceOrigin.y` | `integer` | `Required` |  |
| `surfaceOrigin.z` | `integer` | `Required` |  |
| `accessSide` | `string` | `"WEST"` | `NORTH`, `EAST`, `SOUTH`, `WEST` |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `2` | minimum: 2; maximum: 6 |
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `foundationDepth` | `integer` | `1` | minimum: 0; maximum: 1 |

## PreparePlatformTask

Clear above min.y and build a platform. foundationDepth=1 authorizes one layer below the floor for water landing or floor-plant footing, with separate material and placement receipts.

### Command

```text
/lattivium Worker exec PreparePlatformTask {"min":{"x":0,"y":63,"z":0},"max":{"x":4,"y":66,"z":6}}
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
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `foundationDepth` | `integer` | `0` | minimum: 0; maximum: 1 |

## PrepareSiteInfrastructureTask

Within explicitly admitted chunk coordinates, survey and freeze one liquid-free edge shaft, a permanent one-wide road and an air-volume workstation. Build the facilities and verify a native station-to-shaft-bottom round trip. No local manifest files or implicit chunk expansion are used.

### Command

```text
/lattivium Worker exec PrepareSiteInfrastructureTask {"surfaceOrigin":{"x":0,"y":64,"z":0},"admittedChunks":[{"x":-1,"z":-1},{"x":-1,"z":0},{"x":-1,"z":1},{"x":0,"z":-1},{"x":0,"z":0},{"x":0,"z":1},{"x":1,"z":-1},{"x":1,"z":0},{"x":1,"z":1}]}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `surfaceOrigin` | `object` | `Required` |  |
| `surfaceOrigin.x` | `integer` | `Required` |  |
| `surfaceOrigin.y` | `integer` | `Required` |  |
| `surfaceOrigin.z` | `integer` | `Required` |  |
| `admittedChunks` | `array` | `Required` | minItems: 1; maxItems: 81 |
| `admittedChunks[].x` | `integer` | `Required` | minimum: -1.875e+06; maximum: 1.875e+06 |
| `admittedChunks[].z` | `integer` | `Required` | minimum: -1.875e+06; maximum: 1.875e+06 |
| `outputBoxes` | `integer` | `4` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `4` | minimum: 2; maximum: 6 |
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `emptyBoxes` | `integer` | `0` | minimum: 0; maximum: 16 |
| `fillStock` | `integer` | `0` | minimum: 0; maximum: 1728 |
| `sandStock` | `integer` | `0` | minimum: 0; maximum: 1728 |
| `scaffoldStock` | `integer` | `0` | minimum: 0; maximum: 1728 |

## ResumeExcavateSiteTask

Resume a site excavation checkpoint or verify an already completed site. Partial workstation and scaffold assembly require reconciliation.

### Command

```text
/lattivium Worker exec ResumeExcavateSiteTask {"taskId":"00000000-0000-0000-0000-000000000001"}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `taskId` | `string` | `Required` |  |
