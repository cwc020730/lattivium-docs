# Input files

Store inputs in the server world’s `lattivium-atlas/schematics/` directory. Supply and preview accept direct child files; construction accepts normalized paths within this directory. Use JSON command parameters for names containing spaces.

- `.litematic`: schematic demand and construction input.
- `.materials.json`: material demand for preview and supply.
- `.segment.json`: frozen supply test input.

## Material demand v1

```json
{
  "format": "lattivium-material-demand-v1",
  "materials": {
    "minecraft:stone": 64,
    "minecraft:crafting_table": 1
  }
}
```

Limit: 4 MiB, up to 16384 distinct item IDs, positive exact long-integer quantities. The material map must contain at least one entry and fields must be unique.

## Frozen segment v1

```json
{
  "format": "lattivium-supply-segment-v1",
  "parentPlanSha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "parentSchematicSha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "firstStep": 0,
  "stepCount": 1,
  "sources": [
    {"dimension":"minecraft:overworld","x":100,"y":64,"z":100,"step":0,"items":{"minecraft:stone":64}}
  ]
}
```

Use actual source hashes when generating fixtures. Files are limited to 4 MiB; hashes contain 64 lowercase hexadecimal characters, `firstStep` is nonnegative and `stepCount` is 1–100. Source containers are unique, item counts positive, and ordered step groups cover the declared range. The fixture freezes sources and quantities while execution still performs navigation and safety checks.

## Persistent state

Supply checkpoints use `lattivium/tasks/`; excavation checkpoints use `lattivium/excavations/`. Atlas knowledge lives in `lattivium-atlas/atlas.db`. These are runtime-owned state.
