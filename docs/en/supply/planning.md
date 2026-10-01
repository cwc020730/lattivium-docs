# Demand and planning

An item-demand map expresses the items and quantities a caller wants. Planning combines it with eligible carried inventory, Atlas stock, recipes and travel costs to allocate sources and required crafting.

## Item demand

Demand maps item IDs to positive integer quantities. For example, `minecraft:oak_planks → 6` requests six oak planks as a final result.

| Term | Meaning |
| --- | --- |
| Final demand | Finished items the caller will use or deliver |
| Carried allocation | Existing Bot inventory admitted toward this demand |
| Ingredient demand | Items consumed to produce the final materials |
| Source stock | Atlas observations of materials offered by a container |
| Allocated quantity | Planned source acquisitions plus carried allocation |
| Unallocated quantity | Collection demand with no assigned source yet |

Demand can come from `.litematic` statistics, a `.materials.json` file or an in-memory request from construction or another caller. See [input files](../reference/files). Item components and source protection also govern which physical items qualify.

## Three planning structures

| Type | Contents | Consumer |
| --- | --- | --- |
| `SupplyPlan` | Source jobs, step groups, collection demand, carried allocation, delivery containers and travel hints | Collection workflows |
| `MaterialProductionPlanner.Plan` | Final demand, required stock inputs, recipe batches, expected products and shortfalls | Production planning and execution |
| `SupplyRequest` | Collection plan, execution mode, material filter, packing arrangement and delivery targets | Prepared supply execution |

With crafting enabled, collection demand often represents the production plan's stock inputs. The production plan retains the final product target. For six planks with two logs available, collection allocates two logs and crafting plans eight planks. Six are reserved for the final goal; the remaining two are accounted for in physical inventory.

Plans describe intended work. Execution receipts record physical transfers, and observations reconcile quantities after collection and crafting.

## Sources, clusters and steps

A `ContainerKey` combines dimension and container block coordinates to identify one source. A `SourceJob` assigns items, quantities, a step index and a travel hint to that container.

A `Step` groups source jobs sharing a step index. Sources in the same dimension and within the grouping radius can share a step, so one step can visit multiple containers.

`SupplyPlanner` repeatedly chooses a source that covers remaining demand and has an estimable route. Its current score is:

```text
Coverage = sum over remaining items: min(source stock, remaining demand) / remaining demand
Travel cost = outbound ticks + return ticks when a return position is declared
Source score = Coverage^(coverage weight / weight sum) / (1 + travel cost)^(travel weight / weight sum)
```

Weights default to 0.5 each and are configured with `supplySourceTravelWeight` and `supplySourceCoverageWeight`. Indexed direct and boxed stock both contribute coverage. Detail admission follows the same weighted order and stops when verified sources fund demand and satisfy travel constraints. Actual admissible contents determine allocation.

| Weights | Preference |
| --- | --- |
| Travel 0.5, coverage 0.5 | Compare both journey cost and demand coverage |
| Higher travel weight | Prefer nearby stock, allowing more source visits |
| Higher coverage weight | Prefer concentrated stock, reducing source visits |

Weights are normalized by their sum, so their ratio determines the preference. Direct and boxed stock use the same score: a box covering more demand gains coverage, while a nearby partial stack may offer a cheaper trip. Containers with unknown protection need live observation and protection checks before becoming acquisition sources.

After allocation, that source becomes the next departure point. Clustering organizes visits; execution checks actual route and source access.

## AtlasSupplyLoadFlow

**Input:** a demand file or in-memory map, delivery targets, eligible carried inventory and execution mode.

**Sequence:** read demand → query admissible stock and recipes → allocate sources and production inputs → prepare capacity through `PrepareSupplyFlow`.

**Output:** a `SupplyRequest`, plus a production plan and shared source locator when production is enabled.

Transport preparation may acquire empty boxes or other supplies, so loading includes physical execution. Use `AtlasProductionPreviewTask` for a planning preview; see the [Task reference](../reference/tasks#atlasproductionpreviewtask).

## AcquireMaterialsFlow

**Input:** an in-memory demand map, execution mode and optional `returnTo`.

It runs `AtlasSupplyLoadFlow`, then `AcquireProductionFlow`. Fulfilled demand and settled inventory leave materials carried by the Bot. When a return target is supplied, reaching it is also required for success.

`returnTo` combines a dimension and Bot feet position for travel after acquisition. Delivery coordinates identify a container for item transfer. Acquisition planning includes the return leg in source cost and route admission. Delivery targets remain empty, so acquired material stays carried until the caller uses it.

This is an internal reusable component. See [construction supplies](../construction/supplies) for construction demand and integration boundaries.

## Replanning

If stock is insufficient, a source is inaccessible within budget or protection rejects it, collection records acquired items and source failures before querying alternatives. Recipe expansion and replanning use finite budgets. See [delivery and results](./delivery) for acquisition, shortage and delivery accounting.

Food and rocket replenishment rank sources against the minimum readiness deficit, then request quantities toward the target. Once the minimum is met, optional headroom can stop without an extra source visit.
