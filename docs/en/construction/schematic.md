# Schematic building

`BuildSchematicFlow` reads a supported schematic, prepares materials, builds it and verifies the resulting block states.

The current entry accepts at most 256 solid blocks within a 16×8×16 extent. It supports full blocks without state properties, such as stone and glass. Directional, openable or configurable blocks, including trapdoors, fence gates and redstone components, are not yet supported; this does not establish easy placement. Schematic air does not authorize removing an existing block at that position.

## File and command

Place the schematic under `lattivium-atlas/schematics/` in the server world directory.

```text
/ltv Worker exec BuildSchematicFlow small.litematic 100 65 100
```

The origin uses the Bot's dimension at submission time. See [BuildSchematicFlow](../reference/flows#buildschematicflow) for JSON parameters and input constraints.

## Workflow

Read the schematic and material requirements, prepare materials, travel to the site, survey, place blocks and verify the target state. The existing implementation preserves blocks that already match the target.

## Relationship to site preparation

The workstation, shaft and clearing operations provide logistics and working space. Full integration with unified site preparation and more complex movement between layers remains a subsequent integration stage.
