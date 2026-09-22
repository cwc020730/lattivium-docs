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
