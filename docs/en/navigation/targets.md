# Destinations and arrival

A destination identifies a dimension and reference position. An arrival condition defines the Bot state that completes movement.

## Location terms

| Term | Meaning |
| --- | --- |
| Dimension | Server world identifier, such as Overworld, Nether or End |
| Bot feet | Observed bottom of the player collision box |
| Block coordinates | Integer coordinates identifying one world cell |
| Target feet | Intended Bot feet position |
| Reference position | Coordinates guiding area selection or search |
| Candidate pose | A position admitted by shared operation-feasibility checks that navigation can attempt to reach |
| `PathGoal` | Predicate determining navigation completion |

Container coordinates identify inventory blocks. Tasks declare targets, effect authority and explicit requirements; shared operation-pose checks supply interactive candidates, and navigation owns arrival. Access and construction callers do not duplicate route-admission rules.

Mining a layer does not implicitly require the Bot's feet to remain above that layer. An upper tall-grass block, for example, can be mined from a valid stance one block lower. Only an explicitly declared minimum height restricts the request. Native rays, retained footing, lava safety and paired-block authority remain checked at execution.

## TravelToFlow

**Input:** a `GlobalPos` destination, optional `PathGoal`, route hints, search policy and rejected journey legs.

```text
Query usable routes
  -> Complete selected portal legs
  -> ApproachAreaFlow: reach the destination area
  -> LocalNavigationFlow: satisfy the final goal
  -> Verify dimension and arrival condition
```

Nearby targets can first use local movement. Distant same-dimension travel can consider dimension detours. Actual position, route and policy determine the required stages; some can be skipped.

**Output:** `TravelArrival`, recording observed dimension and feet. Area approach and portal receipts feed this owner's final verification.

## Command destination

The registered command accepts a dimension and target feet. Actual feet must be within 0.75 blocks of the target block's bottom center. See the [overview](../guide/navigation#travel-to-a-destination) and [Flow reference](../reference/flows#traveltoflow).

Partial-height support such as slabs is verified against its actual surface in the same X/Z column. Water destinations use the surface node resolved by navigation, retain the 0.75-block horizontal limit, and accept the surface movement envelope from node Y−0.75 to Y+1.25. Resolution shares navigation's minimum height and physical collision constraints.

## Regions and candidates

Internal callers can supply custom completion conditions. `ApproachAreaFlow.AreaGoal` requires horizontal distance at most 32 blocks, feet height difference at most 32 blocks and a loaded target chunk.

`NavigationRequest` can provide concrete candidate poses or an exploration `PathGoal`. An exploration reference anchors the search; its predicate determines completion. See [local navigation](./local) for request and result semantics.

## Return positions

A return position uses the same dimension-and-feet semantics as a travel destination. Acquisition and maintenance retain their own original goals or return points and invoke travel from the observed position after children finish.

Temporary item recovery asks shared navigation to resolve the current return stance. A Bot can stand safely on a block edge while its center occupies an excavated cell. Actual support and continuous collision checks resolve an adjacent canonical stance instead of waiting inside recovery for the empty center cell to gain a floor. A falling body waits for native landing rather than treating a nearby lower surface as already reached. Return movement and item receipts are still verified.

Delivery coordinates identify receiving containers; [delivery workflows](../supply/delivery) own physical transfer.
