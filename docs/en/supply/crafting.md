# Crafting and accounting

Crafting converts physical carried inputs into requested materials. Recipe facts, quantity planning, native interactions and purpose accounting have separate responsibilities.

## Recipes and batches

| Term | Meaning |
| --- | --- |
| Recipe fact | Game-provided input slots, eligible ingredients, outputs and grid requirements |
| Recipe catalog | Recipes indexed by output, supplied by Atlas |
| Recipe expansion | Trace missing products to required inputs and select recipes and ingredients |
| Craft batch | Repetitions of a recipe with total inputs and expected outputs |
| Native crafting | Place ingredients and take products through actual inventory or crafting-table menus |
| Remainder | Carried inputs or excess products remaining after final demand is allocated |

One log produces four planks. A demand of six requires two repetitions, consuming two logs and producing eight planks. Six go to the final goal and two remain as surplus.

## MaterialProductionPlanner

**Input:** final demand, usable stock, recipe catalog, table availability and planning budgets.

It consumes eligible stock first and expands missing products through recipes, generating ordered batches and shortfall reasons. Its output contains `finalDemand`, `usedStock`, `crafts`, `allocatedFinal` and `shortfalls`.

Default per-plan limits are depth 12, 10000 expansions and approximately 100 ms of planning computation. Cumulative task limits are 16 plans, 50000 expansions and approximately 500 ms. These bound planning work; travel and physical crafting have separate execution budgets. Cycles, missing recipes, unsupported component outputs and exhausted budgets produce specific shortfalls.

## AcquireProductionFlow

**Input:** a prepared collection request, proposed production plan, source-reallocation service and task budget.

```text
CollectSupplyFlow: acquire source materials
  -> Reconcile physical inputs and acquisition receipts
  -> Replan executable production from acquired inputs
  -> ProduceCarriedMaterialsFlow: execute batches
  -> Settle final allocation, surplus, shortages and obligations
```

The current main sequence finishes collection before planning executable production from actual acquisitions. Child operations such as crafting-tool preparation can acquire their own supplies.

**Result:** `available` final allocation, `missing` quantities, route information, source failures and `settled`. `fulfilled()` requires settlement, no missing quantities and no production failure. The caller then decides delivery or construction admission.

## ProduceCarriedMaterialsFlow

If all batches fit the player's 2×2 grid, it uses `ExecuteProductionFlow`. Otherwise it selects a work position through `AccessCraftingTableFlow` and executes through `CraftAtTableFlow`.

Existing usable tables can be accessed. Temporary tables must be prepared, placed and recovered. `PrepareCraftingToolFlow` obtains required tool materials through shared sources and bounded production planning. `CraftBatchFlow` runs native menu interactions for a recipe batch.

Packed ingredients or insufficient loose capacity use the shared `EnsureInventoryReadyFlow`. Missing transport boxes use common acquisition, followed by access to the original crafting table. The batch reserves an active inventory or table-access child's declared execution window; completed recovery episodes retain only their actual elapsed time. A short recipe therefore does not truncate box-acquisition travel to a few seconds. The existing 25-minute batch/production caps and any shorter enclosing deadline still apply. Retries retain elapsed costs and do not weaken safe flight landing reserves.

Completion relies on observed products and consumed ingredients. An unrecovered temporary table, unsettled menu items or inventory discrepancies retain recovery obligations.

## MaterialLedger

The ledger separates physical holdings from purpose reservations:

| Purpose | Reservation |
| --- | --- |
| `FINAL_CARGO` | Final delivery or materials passed to the caller |
| `INGREDIENT` | Inputs to be consumed by crafting |
| `TOOL` | Work tools and temporary crafting-table use |
| `TRAVEL` | Flight and travel resources |
| `FOOD` | Eating resources |

Available quantity is physical holdings minus all reservations. Operations reserve inputs, then settle verified consumption, products and returns. Delivery additionally requires confirmed physical transfer.

For example, gunpowder may be requested cargo or an ingredient for propulsion rockets. Reservations govern these competing uses so the same items cannot fund both goals. Recovery checks reservations against actual inventory.
