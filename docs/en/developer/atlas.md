# Atlas world knowledge

Atlas stores observations with provenance and timestamps. Lattivium owns material allocation, travel planning and execution. The database is at `lattivium-atlas/atlas.db` in the world directory. Background queues and scanning have bounded budgets.

| Interface | Purpose |
| --- | --- |
| `AtlasSessions.get(server)` | Asynchronous world session |
| `session.inventories()` | Stock indexes and candidate queries |
| `session.observations()` | Submit inventory observations |
| `session.structures()` | Recorded structure membership |
| `session.traversals()` | Observed portal travel |
| `AtlasSessions.recipes(server)` | Ordinary crafting recipe snapshot |
| `AtlasSessions.recipeGeneration(server)` | Validate generation after data-pack reload |

Before using a candidate, the Bot checks protection, item components and interaction access. Structure bounds come from generation pieces and may persist after player modifications. Unresolved loot containers retain their unresolved state.

## Import a saved world

Run in the Atlas source project:

```sh
./gradlew importSavedWorld -PsnapshotWorld=/path/to/stopped-world -PatlasDatabase=/path/to/output/atlas.db -PscanRate=100
```

Read a stopped world and write the database outside that input world. Deploy into the matching world while the server is stopped. Use `-PstructuresOnly` to supplement structure data while retaining inventory observations. A `<database-name>.pause` file requests a stop; resumption validates snapshot identity.

In game, `/lattiviumatlas status` reports scanner and database state.
