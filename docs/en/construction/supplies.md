# Construction supplies

Construction uses materials consumed by facilities and excavation, plus rockets, food and carrying capacity that keep the Bot operating. The site plan computes material demand; maintenance policies check operating resources at supported boundaries.

## From site to material demand

`PrepareAndExcavatePerimeterFlow` selects its startup behavior through the autonomous-supply option:

| Integration | Before construction |
| --- | --- |
| `autonomousSupplies: false` (default) | Use supplies already carried by the Bot and start infrastructure |
| `autonomousSupplies: true`, or Java call to `withAutonomousSupplies(mode)` | Survey, acquire demand through `AcquireMaterialsFlow`, return to the starting position, then start infrastructure |

The registered command also accepts autonomous acquisition, `mode`, `sealBottom` and `drainageMode`, alongside the region, output-box count and headroom. See the [Flow reference](../reference/flows#prepareandexcavateperimeterflow) for command parameters.

Demand combines `PerimeterInfrastructurePlan` with observed liquids:

| Resource | Current calculation | Purpose |
| --- | --- | --- |
| Sand | Perimeter, two shaft-isolation columns and starting-deck shortfall; a verified reused wall removes perimeter demand | Perimeter sealing and shaft isolation |
| White concrete | Facilities, optional floor sealing and maximum single-layer liquid-processing demand | Road, platform, liquid replacement and partitions |
| Scaffolding | Planned shaft demand | Vertical access |
| Chests and empty shulker boxes | Two chests and the workstation plan's output-box count | Workstation storage and product containers |
| Rockets | Shared FIXED or AUTO stock policy | Flight and onward reserves |
| Food | Shared food policy and stock requirements | Eating under real hunger and maintaining reserves |
| Sponge, furnace and coal | Wet-layer sponge mode: one dry sponge, one furnace and coal for the maximum chamber count in a layer | Absorption, recovery and workstation drying |

Planning observes liquids in each layer and takes the **maximum layer demand for each item**. A wet layer requires its liquid-cell count plus 64 filler blocks; sponge mode adds that layer's partition-cell count. Dry layers add no liquid-processing demand. This is a working reserve for a layer, rather than a limit on total consumption: later shortages still use the shared acquisition chain.

Drying currently uses a single-sponge transaction. After absorption and wet-sponge recovery, the Bot returns to the workstation, prepares one wet sponge, one furnace and one coal, then recovers the dry sponge and furnace before continuing. Fuel demand therefore counts drying operations at one coal each; the sponge and furnace are reused.

Facility concrete demand is the workstation floor-cell count plus two blocks. Floor sealing adds the entire bottom-plane count; execution preserves qualifying existing solid blocks, so some budget can remain unused. Shared inventory preparation maintains transport-box capacity separately from the output boxes intended for workstation placement. Construction demand has no additional fixed `outputBoxes + 1` transport-box rule.

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

Acquisition provides rocket and food policies. Infrastructure uses carried supplies. Layered excavation connects `ExcavationSupplies` to shared food and fuel policies and admitted sources, and performs supply trips at safe boundaries. Maintenance observes L0, L1 and owned L2 transport-box contents together; mined cargo retains its reservation after packing. Each child scope owns its stock declarations and inherits the root session's active state and cumulative budgets. Ending the child does not reset parent budgets or close borrowed sources; see [shared maintenance](../supply/maintenance#capacity-and-context).

## Admission boundary

Autonomous acquisition requires all demand to be fulfilled and inventory obligations settled, followed by return to the starting position. Missing supplies produce item counts and source failures while infrastructure remains unstarted.

Food and rockets are maintained through shared stock policies. Sponge mode includes sponge, furnace and fuel in wet-layer demand; chambers that cannot safely use a sponge still use solid filler and are recorded separately. After acquisition, `AcquireMaterialsFlow` explicitly returns to the starting position with cargo retained. This return belongs to the construction acquisition workflow. `TravelToFlow` executes the one-way destination it receives and does not automatically add return travel to every trip.

Rocket maintenance first collects existing plain propulsion rockets, then attempts bounded crafting when stock is insufficient. If departure reserves remain unmet, it enters `WAITING_FOR_RESOURCE` at a grounded, settled inventory boundary and reports the deficit and Bot position. Adding plain rockets and passing renewed inventory and route checks resumes the original goal.

## Shulker access and material replenishment

Borrowed source boxes follow an ownership lifecycle: remove, place, extract exact quantities, recover and return the remainder. Carried transport boxes use shared staging and inventory operations to make loose sand, filler, rockets or food available.

Construction consumers declare their next native batch through shared `PrepareInventoryConsumptionFlow`; inventory owns eligible selection and admitted unpacking. Explicit `consumingMaterialOwner(UUID)` grants business stock permission; trace ancestry and target coordinates do not. Native effects recheck common limits and report exact confirmed item deltas. Foreign claims, TOOL reservations and pending box cleanup remain protected. Acquisition and consumption retain separate receipts. Root budgets and inherited source permissions remain unchanged. Consumption and relocation have native contract gates; full field acceptance is recorded separately.

Ordinary mining products follow the configured best-effort recovery policy. Tools, shulker boxes, sponges and inventory consistency retain their own protections. See [product recovery](./clearing#product-recovery).

Source-preserving debug mode is inherited by acquisition and excavation food/rocket replenishment. Source inventory remains unchanged; the Bot consumes acquired copies normally.
