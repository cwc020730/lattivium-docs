# Local paths and movement

Local navigation searches executable paths in the current dimension and drives the Bot edge by edge. It supports final approach, container poses, construction movement and shorter journeys.

## Requests, goals and results

| Type | Meaning |
| --- | --- |
| `NavigationRequest` | Search reference, candidate poses or exploration goal, and policy |
| `PathGoal` | Predicate defining completion at a feet position |
| `SearchPolicy` | Node and per-tick limits, transport families, drop and partial-path policies |
| Path node | Selected reachable position |
| Path edge | Concrete movement connecting nodes |
| `NavigationResult` | Actual feet, optional reached node, visited nodes and path length |

An exploration goal can request any position suitable for safe shulker staging. Fixed candidates request one of several validated interaction poses. The business caller selects the appropriate contract.

## LocalNavigationFlow

**Input:** a `NavigationRequest`, or current-dimension target feet from the command.

```text
Observe start and destination
  -> Search within planning budgets
  -> Execute PathEdgeExecFlow segments
  -> Check observed position and goal
  -> Replan from the current position within remaining budgets when needed
```

Planning and movement have separate tick budgets. Replanning retains those counters and repeated-edge limits; a new A* session receives its own node allowance.

Partial paths can advance through a useful prefix, observe new terrain and continue planning. Overall success still requires the original goal. Operations requiring a validated complete path can use `requiringCompletePath()`.

## Arrival and interaction poses

Ordinary callers request a feet position with `LocalNavigationFlow.toExactFeet`, or an interaction goal with `toGoal`. Navigation selects among its existing walking, jump, swimming, climbing and elytra capabilities. Actual equipment, collision and survival conditions determine availability. Excavation, building and container access do not impose a route-wide dry-ground, minimum-height or no-flight rule merely because of their task type. A minimum mining pose height applies only when explicitly declared; a layered-task label does not impose it automatically. Explicit transport configuration and facility route contracts still apply.

`BlockPlacementGoal` checks the target, support face, native ray and actor pose. `ApproachBlockPlacementFlow` owns arrival and nearby alignment for ordinary placement, fluid filling and water platforms. Tasks still declare mutation authority, protected recovery obligations and any required return position; those facts do not replace navigation decisions.

Thin supports use their actual collision height. Lily pads, carpets and slabs do not acquire duplicate nodes in the cells below and above physical feet. Underwater nodes use their swim height rather than the top of a slab below. Ordinary platform boarding and return use local navigation.

`CollectMiningDropsFlow` requests native item contact through `ItemPickupGoal`, verifies quantities, components and bound entity UUIDs, then returns using the same navigator. Its default outbound `NavigationRequest.requiringReturnTo(...)` checks a current-world return route through the same planner; it does not guarantee that terrain, supplies or survival will stay unchanged. A composed operation that must build steps before returning explicitly owns that obligation through `withCallerOwnedReturn()`: collect the native receipt, construct authorized access, then call shared navigation. Underwater pickup follows this path too. Ordinary items embedded in block collision become recorded BEST_EFFORT losses. Sponge removal first prefers standing above it through the shared mining contract, with a verified safe landing below. Genuinely unrecoverable native drops use the same collector with bounded BEST_EFFORT loss, retaining UUID, quantity, components and reason. Loss does not count as recovery or drying; cancellation and inventory anomalies do not authorize it. Tools and boxes remain strict.

The shared `ContactGoal` declares regions requiring native contact. Navigation owns terminal alignment, native jumping with verified headroom, and landing. Pickup callers do not drive those inputs. Cancellation releases them through navigation, and a subsequent request settles an actual airborne start before planning. Contact cannot replace item quantity, component and UUID receipts.

Surface and underwater edges establish graph-node arrival. An exact destination additionally settles native position and velocity through navigation, without stopping at every intermediate node. Jumping into a surface node must dissipate downward momentum and settle at the breathable surface before handing off to mining or another operation. Interaction owners still validate their rays and effect authorization.

A local clearing stage within scaffold preparation can declare a real handoff stance whose support survives that clearing. Shared support geometry verifies that the remaining support preserves its native feet height; ordinary point navigation actually returns there before the stage completes. Checkpoints retain the same destination and revalidate it before restoring work. This completes only the local stage. An unbuilt scaffold is not an existing exit, and its parent still builds and verifies column passage.

## Edge execution

| Component | Movement |
| --- | --- |
| `GroundPathEdgeExecFlow` | Ground walking, steps and supported drops |
| `DoorPathEdgeExecFlow` | Traversing operable doors |
| `WaterPathEdgeExecFlow` | Water segments |
| `ClimbPathEdgeExecFlow` | Supported climbing structures |
| `ParkourPathEdgeExecFlow` | Permitted jumps |
| `ShortElytraHopPathEdgeExecFlow` / `ElytraPathEdgeExecFlow` | Policy-permitted elytra segments |

Edges check collision, stance, liquids, equipment and control requirements. Navigation uses existing geometry; excavation, bridging and mutation authorization belong to their business owners.

Ladders and scaffolding support ascent and controlled descent. The Bot can enter from the air cell above a column, descend through its continuous blocks, and step onto an exit checked for collision and support. Water and upward bubble columns provide ascent. Construction flows establish any required openings first.

Water-column construction, ordinary platforms and pickup use shared local navigation for boarding and return. There is no separate construction swimming route.

When enabled, local navigation plans three-dimensional swim edges directly from valid underwater nodes, including descent, ascent and horizontal movement. Air preparation uses the shared `RestoreAirFlow`; callers do not select a second swimming route. Native body collision, fluid and portal checks remain. Execution retains survival and low-air refusal; refusing low-air movement does not prove an emergency return succeeded.

Local surface alignment checks connected water in each actual column; fluid-cell heights may differ. Its swept body envelope covers the full rise from the current height, including an off-center shoulder. Unloaded regions, collisions, lava, portals and dry gaps are rejected. Lower flowing surfaces use the same planar control and native buoyancy for recovery, mining and flight departure.

Long submerged segments also follow their validated corridor. If actual feet drift off its centerline, the shared water-edge executor regains that corridor before advancing, rather than swimming diagonally toward a distant endpoint beside neighboring blocks. Vertical edges retain their three-dimensional target; native surface buoyancy, air budgets, collision checks and cancellation cleanup keep the same contracts.

Short elytra edges consume the planner's selected launch corridor and landing point. Steering corrects horizontal drift during native water emergence toward that corridor. Once over the target column, the existing assisted flight descent keeps the glide brake until close to its support. Entering landing is separate from success, which still requires native ground contact and the planned position and height. This uses the existing assisted velocity controls; it is not unassisted vanilla flight. Construction callers do not supply a second launch or landing policy.

Submerged transit and destination posture are separate. An open surface destination does not permit rising throughout the preceding submerged corridor. The water-edge executor follows the admitted swim corridor and hands off to native surface posture only in the actual destination column, including when intermediate cells have a grid or other cover. Precise arrival, air checks and input cancellation remain shared navigation responsibilities.

## Search policy

Default `SearchPolicy` allows at most 8192 expansions per A* search session and 16 per tick, with additional flight, drop, partial-path and minimum-height controls. Execution progresses cooperatively across ticks with time budgets.

`navigationAllowUnderwater` defaults to `true` for current underwater work. Set it to `false` to disable underwater edges. A caller can further restrict its request using `SearchPolicy.withUnderwater(false)` but cannot override the global switch. Potion eligibility and remaining-duration selection are outside the current implementation.

Fuel acquisition can disable flight so movement does not depend on rockets still being acquired. Complex caves and long ground-only journeys remain constrained by search and execution budgets. See [budgets](./budgets#a-search-budgets) and [failure handling](./recovery).
