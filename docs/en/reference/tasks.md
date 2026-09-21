# Task

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## Use a .litematic file

1. Place `machine.litematic` in the server world’s `lattivium-atlas/schematics/` directory. For a remote server, ask its administrator to upload the file.
2. Choose an online Bot and an actual delivery container.
3. Run the positional command below. The Bot reads the schematic and computes its material requirements.

```text
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

Replace `Worker`, the filename and delivery coordinates with your own values. The final coordinates identify the delivery container. JSON syntax below expresses the same command parameters; `.litematic` is read directly.

```text
/ltv Worker exec AtlasSupplyTask {"file":"machine.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":100,"y":64,"z":100}}]}
```

## AtlasProductionPreviewTask

Preview material production without collecting or crafting items.

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
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
/lattivium Worker exec AtlasSupplyTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
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
