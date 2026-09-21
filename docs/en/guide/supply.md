# Supply and crafting

Place `.litematic` or `.materials.json` files in the server world's `lattivium-atlas/schematics/` directory. Delivery coordinates identify container blocks. Atlas supplies stock observations; the Bot checks actual contents and access during collection.

```text
/ltv Worker exec AtlasProductionPreviewTask machine.litematic minecraft:overworld 100 64 100
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

Preview computes a production plan. Supply execution plans, replenishes resources, collects inputs, crafts as needed, transports and verifies delivery. Supported recipes use ordinary 2×2 inventory or 3×3 crafting-table grids. The workflow finds or prepares a table. Recipe expansion has finite budgets and cycle checks.

## Execution modes

| Mode | Behavior |
| --- | --- |
| `REAL` | Transfer and deliver items, reducing source stock |
| `DEBUG` | Exercise travel and container access while skipping transfers |
| `SOURCE_PRESERVING_DEBUG` | Copy items for testing while preserving source stock; delivery and temporary facilities still change the world |

Existing personal loose items are protected by default. `USE_LOOSE_CARGO` permits eligible items to count toward demand. Append delivery containers with `DELIVER_TO`, up to 32 distinct locations. See the [Task reference](../reference/tasks).

## Shulker boxes and capacity

To collect 10 items from a box containing 64, the workflow borrows the box, places and opens it, extracts 10, then returns the box with the remainder. Shulker boxes requested as building materials must be empty.

Capacity maintenance organizes transport boxes. Supply execution can also make a bounded intermediate delivery of collected loose cargo and return. Transport-box unloading and production batching remain subject to each workflow's supported operations.

## Results

Demand, allocation, acquisition, delivery and shortages have separate ledger entries. An unreachable source triggers bounded alternative selection. If alternatives are exhausted, record the shortage and coordinates, then settle remaining obligations. Box returns, temporary facilities and acquired cargo remain owned by their workflows. Inspect receipts to distinguish full delivery, completion with shortages and failure.
