# Construction supplies

Construction uses materials consumed by facilities and excavation, plus rockets, food and carrying capacity that keep the Bot operating. The site plan computes material demand; maintenance policies check operating resources at supported boundaries.

## From site to material demand

`PrepareAndExcavatePerimeterFlow` has two integration paths:

| Integration | Before construction |
| --- | --- |
| Registered command | Use supplies already carried by the Bot and start infrastructure |
| Java call to `withAutonomousSupplies(mode)` | Survey, acquire the full demand through `AcquireMaterialsFlow`, return to the starting position, then start infrastructure |

The registered command accepts the region, output-box count and headroom. Autonomous acquisition is enabled through Java. See the [Flow reference](../reference/flows#prepareandexcavateperimeterflow) for command parameters.

Demand combines `PerimeterInfrastructurePlan` with observed liquids:

| Resource | Current calculation | Purpose |
| --- | --- | --- |
| Sand | Planned perimeter and isolation columns | Perimeter sealing and shaft isolation |
| White concrete | Facility demand plus interior liquid cells, grid allowance and 64 spare blocks | Road, platform, liquid replacement and partitions |
| Scaffolding | Planned shaft demand | Vertical access |
| Chests and empty shulker boxes | Facility demand plus `outputBoxes + 1` extra empty boxes | Workstation storage, excavation products and carrying capacity |
| Rockets | Travel maintenance estimates the route | Flight and onward reserves |

The grid allowance multiplies the number of layers containing liquid by the partition-cell count per layer. Liquid-replacement stock covers all observed liquid cells. Sponge mode retains filler stock for layers or chambers that cannot safely use a sponge.

## Shared acquisition chain

Construction converts its demand into an item-ID-to-count map for `AcquireMaterialsFlow`. This reuses the planning, collection, shulker handling and crafting components used by schematic supply.

```text
Site survey -> Construction demand
  -> AcquireMaterialsFlow
    -> AtlasSupplyLoadFlow: allocation, recipe expansion, transport preparation
    -> AcquireProductionFlow: collection, crafting, quantity settlement
    -> TravelToFlow: return to the starting position
  -> Infrastructure -> Layered excavation -> Workstation return -> Verification
```

`AcquireMaterialsFlow` leaves materials in the Bot's carried inventory; its caller owns their subsequent use. `AtlasSupplyTask` uses the same acquisition chain and adds physical delivery. See [shared components](../guide/supply#shared-components).

## Maintenance triggers and resumption

| Resource | Checker | Trigger | Resumes at |
| --- | --- | --- | --- |
| Rockets | Travel workflows and `TaskFireworkSupply` | Spendable ordinary rockets fall below the configured FIXED or AUTO level | Original travel destination |
| Food | Safe operation boundaries and `TaskFoodSupply` | Hunger requires eating, or permitted replenishment finds insufficient reserves | Original collection or travel operation |
| Capacity | Transport preparation and inventory organization | Insufficient room for transport or the next operation | Original inventory operation or construction phase |
| Construction materials | Quantity settlement in `AcquireMaterialsFlow` | Preconstruction demand is incomplete | Continue acquisition; begin construction when fulfilled |

Maintenance runs as a child operation. The parent retains its goal, progress and inventory obligations, then continues after the child and its cleanup finish. `ResourceMaintenance` owns active resource types and cumulative budgets, preventing same-resource recursion. Fuel maintenance restricts additional food-replenishment trips.

Acquisition provides rocket and food policies. Infrastructure uses carried supplies. Layered excavation connects `ExcavationSupplies` to the shared `TaskFoodSupply`, `TaskFireworkSupply` and Atlas source lookup, and performs supply trips at safe boundaries. Maintenance observes L0, L1 and owned L2 transport-box contents together; mined cargo retains its reservation after packing. Each stage owns its maintenance lifecycle while sharing resource policies and acquisition components; see [resource maintenance](../guide/supply#resource-maintenance).

## Admission boundary

Autonomous acquisition requires all demand to be fulfilled and inventory obligations settled, followed by return to the starting position. Missing supplies produce item counts and source failures while infrastructure remains unstarted.

Food and rockets are maintained through the shared stock policies. Optional sponge mode uses already available sponge, furnace and fuel; solid filler remains the fallback. Material planning includes return travel while retaining cargo on the Bot.

Rocket maintenance first collects existing plain propulsion rockets, then attempts bounded crafting when stock is insufficient. If departure reserves remain unmet, it enters `WAITING_FOR_RESOURCE` at a grounded, settled inventory boundary and reports the deficit and Bot position. Adding plain rockets and passing renewed inventory and route checks resumes the original goal.

## Shulker access and material replenishment

Borrowed source boxes follow an ownership lifecycle: remove, place, extract exact quantities, recover and return the remainder. Carried transport boxes use shared staging and inventory operations to make loose sand, filler, rockets or food available.

Construction children check carried inventory and unpack or report shortages according to their contracts. Upfront quantity settlement and in-progress shulker access have separate ownership responsibilities.

Ordinary mining products follow the configured best-effort recovery policy. Tools, shulker boxes, sponges and inventory consistency retain their own protections. See [product recovery](./clearing#product-recovery).

Source-preserving debug mode is inherited by acquisition and excavation food/rocket replenishment. Source inventory remains unchanged; the Bot consumes acquired copies normally.
