# Source access

Source access turns an allocation into physical acquisition. It retains container identity, assigned quantities and failure receipts, invokes travel to reach the source, then delegates interaction to container components.

## Source position and access goals

A `SourceJob` identifies a container block in a dimension and assigns items and quantities. Access requires a Bot pose with support, reach and a valid interaction ray.

For a chest at `(100,64,100)`, the Bot can stand at a usable adjacent location. The container coordinate identifies stock. Travel feet and arrival conditions are defined in [destinations and arrival](../navigation/targets).

## SupplySourceFlow

**Input:** one `SourceJob`, an execution request and optional capacity recovery.

```text
Check the destination dimension
  -> TravelToFlow: approach the source
  -> AcquireContainerItemsFlow: access and acquire assigned items
  -> Return the physical acquisition receipt
```

This Flow owns travel and acquisition for one source attempt. Approach can use bounded alternative routes. Before item transfers, at a grounded and cleaned boundary, it can replan access or return control to source reselection.

If maintenance moves the Bot, travel and precise access are rebuilt from its actual position. Partial acquisition and borrowed-box obligations remain in the receipt and are handled by their owning workflows.

**Output:** physical acquisition or failure records and any remaining recovery obligations for the source.

## Travel integration

Source operations provide `TravelToFlow` with a dimension, reference position and approach condition. Travel chooses current-dimension or cross-dimension routes and reports actual arrival. Collection then verifies container interaction.

Travel reuses rocket and food policies provided by its caller. Routes, portals, local movement and flight are described under [Navigation and travel](../guide/navigation). Maintenance triggers and resumption are covered by [maintenance and recovery](./maintenance).

## AccessContainerFlow

**Input:** a container block in the current dimension and an access policy.

It searches for interaction poses, approaches the area as needed, navigates locally, aligns and invokes `OpenContainerFlow`. Physical checks cover the container, body clearance, reach, line of sight and opening space.

**Completion:** the menu for the intended physical inventory is open, with an `OpenContainerResult`. [Container acquisition components](./containers) handle subsequent transfers.

## Terrain observation and unreachability

Atlas can record containers in unloaded regions. Physical access still requires terrain observations. Unknown geometry, missing poses, exhausted route budgets and protected sources affect access separately. See [travel failures](../navigation/recovery) for observation and search limits.

Unreachable means access could not be completed under the current policy and budget. Collection records coordinates and reasons, tries alternatives or reports shortages. See [delivery and results](./delivery#shortages-and-failures).

`netherRoofOnly`, excluded structures and source protection can reduce eligible routes or inventory. See [configuration](../reference/config).
