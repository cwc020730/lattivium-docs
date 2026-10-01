# Material collection

Material collection turns item demand into physically acquired supplies. It owns demand planning, source selection, container transfers, necessary crafting and settlement. The caller decides whether materials stay with the Bot for work or are delivered to containers.

## Start collecting

Place `.litematic` or `.materials.json` files in the server world's `lattivium-atlas/schematics/` directory. These commands preview production and execute material delivery. The final coordinates identify the delivery container.

```text
/ltv Worker exec AtlasProductionPreviewTask machine.litematic minecraft:overworld 100 64 100
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

See the [Task reference](../reference/tasks) for complete parameters. Atlas supplies stock observations; the Bot checks physical inventory and access at each source.

## Reading order

| Chapter | Covers |
| --- | --- |
| [Demand and planning](../supply/planning) | Demand maps, ingredients, allocations, Steps, plans and return positions |
| [Source access](../supply/travel) | How a source job invokes travel, opens its container and handles access failure |
| [Containers and shulker boxes](../supply/containers) | Direct transfers, borrowed-box extraction and return, transport boxes and capacity |
| [Crafting and accounting](../supply/crafting) | Recipes, batches, inventory and table crafting, purpose reservations |
| [Maintenance and recovery](../supply/maintenance) | Rocket and food maintenance, triggers and resuming the original goal |
| [Delivery and results](../supply/delivery) | Physical delivery, shortages, source failures and execution modes |

Destinations, portals, local paths and flight are described under [Navigation and travel](./navigation). Material workflows define the access goal; travel components handle arrival.

## Shared components

Schematic delivery and preconstruction acquisition share planning, collection and crafting components.

![Shared acquisition chain for schematic delivery and construction](/construction/supply-chain-en.svg)

| Component | Responsibility | Details |
| --- | --- | --- |
| `AtlasSupplyLoadFlow` | Load demand, allocate sources and prepare carrying capacity | [Planning](../supply/planning#atlassupplyloadflow) |
| `AcquireProductionFlow` | Collect ingredients, replan against physical stock, craft and settle | [Production](../supply/crafting#acquireproductionflow) |
| `SupplySourceFlow` | Own travel and acquisition for one source | [Source access](../supply/travel#supplysourceflow) |
| `AcquireContainerItemsFlow` | Acquire specified items from a selected container | [Container transfers](../supply/containers#acquirecontaineritemsflow) |
| `BorrowSourceShulkerFlow` | Extract exact quantities and return the box with its remainder | [Borrowing](../supply/containers#borrowsourceshulkerflow) |
| `ProduceCarriedMaterialsFlow` | Execute batches funded by carried ingredients | [Crafting](../supply/crafting#producecarriedmaterialsflow) |
| `MaterialLedger` | Observe quantities, reserve purposes and settle operations | [Accounting](../supply/crafting#materialledger) |
| `TravelToFlow` | Reach a destination dimension and arrival condition | [Travel targets](../navigation/targets#traveltoflow) |

`AtlasSupplyTask` arranges physical delivery after acquisition. The internal `AcquireMaterialsFlow` takes a demand map, obtains supplies and can return to specified feet coordinates for a caller such as construction. Each chapter explains inputs, outputs and completion conditions. Registered commands are listed in [execution entries](../reference/executables).

## Planning and execution

The main sequence reads demand, plans sources and production, prepares capacity, collects, crafts against actual ingredients and settles the result. Collection currently precedes production. Differences between indexed and physical stock preserve acquired quantities and trigger bounded source reselection. See [planning](../supply/planning) and [crafting](../supply/crafting).

## Resource maintenance

Travel and inventory operations check resources at supported boundaries. Callers provide maintenance policies. The parent retains its goal and progress, then resumes after replenishment and cleanup. See [maintenance and recovery](../supply/maintenance) for triggers, budgets and waiting states.

## Execution modes

`REAL` physically transfers items. `DEBUG` exercises access and skips transfers. `SOURCE_PRESERVING_DEBUG` copies acquired items while preserving source stock; delivery and temporary facilities still change the world. See [delivery and results](../supply/delivery#execution-modes) for the full boundaries.

## Shulker boxes and capacity

Source boxes can be borrowed, placed, opened, partially emptied, recovered and returned. A demand of 10 from a box containing 64 acquires 10 and returns the box with 54. Boxes requested as building materials must be empty. See [containers and shulker boxes](../supply/containers) for carrying capacity and packed inventory access.

## Results

Demand, allocation, acquisition, delivery, shortages and unsettled obligations are recorded separately. Unreachable sources trigger alternatives or shortage reporting. Box return, inventory consistency and acquired cargo still need settlement. See [delivery and results](../supply/delivery).
