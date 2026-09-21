# Excavation and construction

## Clear an area

`ExcavateAreaFlow` clears an inclusive region in the current dimension, up to 64 blocks per axis and 32768 blocks total. Use survival mode and supply tools, empty shulker boxes and fill blocks. Distinct outside depot positions hold boxes for collected drops.

```text
/ltv Worker exec ExcavateAreaFlow 100 64 100 104 66 104 98 64 100
```

The workflow mines from the top down, verifies pickup, deposits when capacity is low, then checks that the region is empty and liquid-stable. Protection conflicts involving machinery, containers or portals report coordinates.

## Liquids and exits

Finite fill blocks handle interior liquids and are recovered afterward. Use `--seal` to authorize outside sealing positions for continuing inflow. Permanent seals have separate accounting and remain in place.

The shallow-pit water exit supports fully cleared pits up to 4 blocks deep and 8×8 horizontally, with enclosed sides and floor in a dimension where water persists. The Bot places water, swims out, retrieves it and verifies 100 consecutive empty ticks. Other exits use available navigation and flight capabilities.

## Resume excavation

```text
/ltv Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

Use the business `taskId` from the excavation trace. Checkpoints live in `lattivium/excavations/`; recovery validates identity, inventory, receipts and remaining obligations.

## Build a schematic

```text
/ltv Worker exec BuildSchematicFlow small.litematic 100 65 100
```

The workflow loads a supported bounded schematic, replenishes materials, travels, surveys, builds and verifies final states. Correct existing blocks are currently retained. Layered clearance, movement space and more complex construction are evolving capabilities. Input files live in the world's `lattivium-atlas/schematics/`; the origin belongs to the Bot's dimension at submission.
