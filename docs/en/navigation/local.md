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

`SwimToDeckFlow` boards an existing platform: recover to breathable surface water, approach the exit, and succeed only with a native grounded stance on a dry, fully supported deck. It neither builds a platform nor clears obstacles. Its deadline accounts for horizontal starting distance and required ascent, with a minimum of 400 ticks; swimming from a distant shore is not treated as a short jump beside the deck.

Local navigation reuses `SwimToOpenSurfaceFlow` for a submerged departure, moving within connected water to a position where the Bot can surface before path search begins. An open block column above the feet does not prove that an off-center body clears a neighboring platform: rising in place can remain trapped beneath its edge. Surface recovery adjusts horizontal position while retaining connected-water, breathable-space and existing time-budget checks.

## Search policy

Default `SearchPolicy` allows at most 8192 expansions per A* search session and 16 per tick, with additional flight, drop, partial-path and minimum-height controls. Execution progresses cooperatively across ticks with time budgets.

Fuel acquisition can disable flight so movement does not depend on rockets still being acquired. Complex caves and long ground-only journeys remain constrained by search and execution budgets. See [budgets](./budgets#a-search-budgets) and [failure handling](./recovery).
