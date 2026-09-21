# Task

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## AtlasProductionPreviewTask

Preview material production without collecting or crafting items.

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` |  |
| `deliveries` | `array` | `Required` | minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `Required` |  |
| `deliveries[].position` | `object` | `Required` |  |
| `deliveries[].position.x` | `integer` | `Required` |  |
| `deliveries[].position.y` | `integer` | `Required` |  |
| `deliveries[].position.z` | `integer` | `Required` |  |

## AtlasSupplyTask

Plan, acquire, craft and deliver materials using Atlas stock observations.

```text
/lattivium Worker exec AtlasSupplyTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `file` | `string` | `Required` |  |
| `deliveries` | `array` | `Required` | minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `Required` |  |
| `deliveries[].position` | `object` | `Required` |  |
| `deliveries[].position.x` | `integer` | `Required` |  |
| `deliveries[].position.y` | `integer` | `Required` |  |
| `deliveries[].position.z` | `integer` | `Required` |  |
| `useLooseCargo` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

## DelayTask

Wait for a bounded number of game ticks.

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `ticks` | `integer` | `Required` | minimum: 1; maximum: 1200 |
