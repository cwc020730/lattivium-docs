# Containers and shulker boxes

Container acquisition turns allocated source quantities into physical Bot inventory. It checks contents, material filters and carrying capacity, retaining transfer records and box ownership obligations.

## Inventory terms

| Term | Meaning |
| --- | --- |
| Source container | Physical inventory visited by a source job, such as a chest or placed shulker box |
| Loose items | Stacks directly accessible in player or container slots |
| Packed contents | Inventory inside a carried shulker item, requiring access or unpacking |
| Staging position | A location supporting placement, opening, recovery and pickup |
| Borrowed source box | A source box temporarily removed for extraction, then returned with its remainder |
| Transport box | A box used to carry and organize the operation's materials |
| Empty-box material | A requested shulker item whose contents must be empty |
| Acquisition receipt | Confirmed quantities, transfers and outstanding obligations |

Borrowed boxes, transport boxes and requested empty boxes have distinct purposes. Inventory observations can include packed quantities; immediately usable quantities also depend on unpacking and capacity.

## Atlas source states

Atlas records container locations, quantities, packed contents and access assessments. `ADMISSIBLE` means observed storage meets the pickup policy, with another check during physical access. `PROTECTED` has an explicit protection reason. `UNKNOWN` means assessment evidence is incomplete.

An unloaded neighboring chunk can leave a complete item record marked `UNKNOWN`. Usable-stock queries and world-stock totals can therefore differ. When allocation is short, shared surveying can visit a candidate, update its observed facts and replan. Recorded quantities and route reachability are assessed separately.

Flight fuel also applies a component filter: rockets with explosion effects are excluded. Packed quantities count through shulker contents, and physical acquisition uses the container and box flows below.

## AcquireContainerItemsFlow

**Input:** container position, item quantities, execution mode, material filter and optional capacity recovery.

```text
Prepare inventory room
  -> AccessContainerFlow: reach and open the source
  -> Transfer eligible loose items
  -> Borrow and extract a source box when packed contents are needed
  -> Reconcile acquisition, remaining demand and box obligations
```

Transfers are bounded by physical stock and available capacity. Exhausted stock, capacity shortages or failed access retain already confirmed transfers, allowing the parent to choose alternatives, recover capacity or finish.

**Result:** an `AcquisitionReceipt` containing confirmed quantities and box-return state. The caller settles demand from those observations.

## BorrowSourceShulkerFlow

**Input:** original source container and slot, box identity and metadata, extraction quantities and execution mode.

For a demand of 10 items from a box holding 64:

1. Verify the source and box, recording the loan.
2. Remove the box and find a safe staging location.
3. Place and open it, then extract 10 items.
4. Close, break and confirm recovery into carried inventory.
5. Return to the source, verify container and slot identity, and replace the box with its remaining 54 items in the original slot.

Return checks cover the original slot, box metadata and remainder. Lost boxes, replaced containers or failed return retain an obligation even after material extraction, requiring recovery or an explicit failure report.

Source-preserving debug verifies the original source box and creates a uniquely tagged clone, leaving the original in its source. The Bot still physically places the clone, extracts the requested quantity, breaks it and confirms recovery. It then removes the verified clone with its remaining contents. Acquired items remain with the Bot for subsequent physical construction. See [execution modes](./delivery#execution-modes).

In a trace, the clone's `Take exact borrowed-box contents` child reports `REAL` because it transfers physical items from the placed clone. Its parent `BorrowSourceShulkerFlow` records the `debug_clone_source_box` policy and reports `SOURCE_PRESERVING_DEBUG` in its receipt. A child's mode alone does not establish consumption of the original warehouse. Acceptance must still compare original source inventories and reconcile clone recovery and outstanding obligations.

## AccessShulkerStagingFlow

This component finds and reaches a reusable shulker work position for unpacking, packing and resource maintenance.

The parent declares existing work areas, such as a workstation platform, through `StockRequirements.bindWorkAreas(owner, positions)`. Search checks positions usable from the current stance, then declared areas, then nearby terrain. Each area has its own height range, allowing a Bot working below a platform to return there for box access. Navigation uses hints in the current dimension and checks physical reachability. A work-area declaration grants no external inventory transfer or terrain modification permission. The parent removes its declarations on completion, failure or cancellation.

Candidates check support, opening space, entity occupancy, Bot stance, interaction reach and safe pickup after breaking. Entity collision checks follow native placement requirements and exclude cells occupied by animals. The reached position is revalidated. Before placing a box, changed terrain or occupancy triggers the same search again, with at most three reselections within the operation's original timeout.

Access reuses local navigation with walking or Elytra flight. A staging flight uses loose rockets already prepared in L0; boxed stock remains sealed until the working position is reached. Insufficient direct fuel produces an explicit shortage, preventing recursive requests to open a fuel box to reach that same box's staging position.

Selecting a staging position may move the Bot away from its route or work face. After extraction and recovery, the parent continues its original goal from the Bot's actual position. Travel selects a route again, and construction first reaches the required working stance.

Position selection, box access, extraction and recovery have cooperating owners. The operation initiating access retains responsibility for the box and contents.

## Capacity and batching

Ordinary acquisition receives batches within L1 capacity. After each transfer or source-box return, `EnsureInventoryReadyFlow` settles the inventory before another batch or journey. Owned transport boxes provide L2 capacity. Borrowed boxes use L0 working slots; empty-box bootstrap can use remaining physical slots.

The total `incoming` quantity estimates carried transport capacity, while the next loose batch has a separate receiving-space check. Larger requests alternate receiving and packing. Readiness can also unpack the next owned batch or call a parent-provided external turnover operation.

Delivery workflows can make intermediate loose-cargo deliveries on supported paths, then return to collect more. Acquisition and construction arrange capacity through their own integration contracts; see [construction supplies](../construction/supplies).

Ordinary mining-drop recovery has a separate best-effort policy. Shulker boxes and source loans retain their own protections. See [clearing recovery](../construction/clearing#product-recovery).
