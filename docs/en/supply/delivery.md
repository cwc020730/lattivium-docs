# Delivery and results

After acquisition, the caller delivers materials to containers or retains them for construction. Results describe physical transfers, shortages and outstanding obligations separately.

## Delivery and return targets

| Target | Meaning | Completion evidence |
| --- | --- | --- |
| Delivery target | Dimension and physical container coordinates | Verified item transfer |
| Return position | Dimension and Bot feet location | Arrival condition satisfied |
| Construction target | Site where acquired materials will be used | Construction's facility and area checks |

`AtlasSupplyTask` owns delivery obligations. `AcquireMaterialsFlow` retains materials for its caller and supports a final return position. See the [Task reference](../reference/tasks#atlassupplytask).

## ProductionSupplyFlow

It runs `AcquireProductionFlow`, then passes physically allocated products to `SupplyFlow` for transport and delivery.

Recoverable partial acquisition retains actual cargo and shortages. If production recorded a failure, available products are delivered and that production failure is still reported with confirmed delivery and outstanding demand. Execution state and delivered quantities are separate observations.

## SupplyFlow

It sequences collection, packing, delivery and verification. The caller can supply source jobs or already carried cargo for subsequent stages.

`DeliverSupplyFlow` accesses targets and transfers items. `VerifySupplyDeliveryFlow` verifies the delivery manifest and receipts. Packing follows the execution request. Supported capacity-recovery paths can deliver some cargo early and resume source collection.

Delivery containers must be accessible and have capacity. Requests declare multiple targets, and results record physical delivery locations and allocations.

## Quantity glossary

| Quantity | Meaning |
| --- | --- |
| Demand | Final quantity requested |
| Allocation | Planned source and carried quantities |
| Acquisition | Confirmed physical source transfers |
| Production | Actual native crafting outputs |
| Holdings | Observed carried inventory |
| Final reservation | Held materials assigned to this goal |
| Delivery | Confirmed transfers into target containers |
| Unallocated | Demand without a source assignment in the current plan |
| Unavailable | Assigned quantities not acquired within budget |
| Final shortage | Unfulfilled final demand determined by settlement |

For a demand and allocation of 64 stone, with 48 collected and delivered, results retain 48 physical deliveries and a shortage of 16. Completed steps measure workflow progress separately from item quantities.

## Shortages and failures

After a source failure, collection seeks alternatives within budget. If none are usable, it records items, quantities, source dimension, coordinates and reason, then settles cargo and outstanding obligations.

Delivery operations can finish with explicit shortages. Preconstruction acquisition requires `fulfilled()` and blocks construction while demand is incomplete. Unreturned boxes, inventory inconsistencies, unsettled tools and cleanup failures retain independent failure responsibilities.

Source unreachability depends on access policy and search budget. Recorded evidence supports later manual review. See [terrain observation and unreachability](./travel#terrain-observation-and-unreachability).

## Execution modes

| Mode | Inventory and world effects |
| --- | --- |
| `REAL` | Acquire and deliver physical items, reducing source stock |
| `DEBUG` | Exercise travel and container access while skipping transfers |
| `SOURCE_PRESERVING_DEBUG` | Copy acquired items and preserve source stock; delivery, construction and temporary facilities still change the world |

Skipped transfers have their corresponding effect status. Physical-delivery acceptance uses real inventories and transfer receipts.

## Inspecting results

Accepted submissions return a task ID. Use `/ltv Worker status <taskId>` and business receipts to inspect delivery, shortages, source failures and obligations.

Trace observes the call chain, conditions and positions. Verification combines it with actual inventories, containers and world state. See [states and failures](../reference/failures).
