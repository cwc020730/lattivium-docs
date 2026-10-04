# Budgets

Budgets bound search work, execution time and recovery attempts. Each has a unit, owner, charging scope and exhaustion behavior. Following those boundaries through the call chain explains which limit ended an operation.

## Units and clocks

| Unit | Measures | Used by |
| --- | --- | --- |
| Node expansions | A* nodes actually expanded | `PlanningSession` |
| Server ticks | Advances of game time | Navigation, travel, source and replenishment timeouts |
| Active ticks | Tick difference minus explicitly suspended intervals | `ExecutionScope` |
| Planning nanoseconds | Elapsed monotonic planning time | Recipe planning and cooperative search slices |
| Attempts | Replanning, maintenance or repeated operations | Owner-specific counters |
| Wall time | Elapsed monotonic time | Asynchronous stock lookup, diagnostics and test-runner deadlines |

Tick allowances change their wall-time meaning with game speed. At sustained 20 TPS, 1200 ticks take about one minute; at 80 TPS, about 15 seconds. Lower TPS makes the same tick allowance take longer. Recipe nanosecond limits follow elapsed computation time.

Active means the execution scope has not been explicitly suspended. Ordinary chunk, database and menu waits still consume active time. Resource waiting uses `TravelFuelWaitDriver` to suspend the original execution. The suspended interval is excluded from its timeout and notified child scopes. Resumption retains previously consumed allowances.

Stock lookup and source ranking in `ReplenishSuppliesFlow` share a ten-second elapsed-time limit. Increasing server speed preserves that lookup deadline. Queries continue in the background, with the deadline measured from submission; failure cancels unfinished lookup and ranking work. Enclosing execution and no-progress limits apply separately.

## Ownership and nesting

```text
Material acquisition / business execution scope
  -> Source-attempt scope
    -> Travel scope
      -> Area-approach or portal scope
        -> Local-navigation / flight scope
          -> Path-edge / Action scope
```

Each scope retains its start tick and limit. Parent time continues advancing while a child runs. A new child creates a child scope; the existing parent retains its consumed time.

`ExecutionScope.remainingActiveTicks()` uses the earliest deadline in the synchronous call chain. Area approach checks it before launching a flight to retain enough time for safe landing.

If a flight still has 5000 ticks available but its source parent has 1000, the operation remains constrained by the parent. Inspect the failed scope, its active child and consumed time together.

## A* search budgets

| Setting | Default | Scope and behavior |
| --- | --- | --- |
| `maxExpandedNodes` | 8192 | Node limit for each `PlanningSession` |
| `expansionsPerTick` | 16 | Expansion ceiling for one search slice |
| Search slice time | About 4 ms | Cooperative time allowance passed by `PathFinder` |
| Repeated path-edge visits | At most 10 | Counter retained by one `LocalNavigationFlow` |

A slice preserves up to four basic expansions, then uses spare time for further work, always subject to the caller's node ceiling. Candidate discovery and stale-queue cleanup have additional local bounds. Indivisible geometry checks can exceed the cooperative time allowance.

A new A* session receives a fresh node allowance, for example after a partial path or a moved search origin. `PathFinder` accumulates expansion statistics, while the current 8192 ceiling applies per session. Total expansions for a local navigation can therefore exceed 8192.

A request allowing partial paths can return an executable prefix at the node limit and continue from its actual position. Navigation planning and movement ticks remain cumulative. Final success still requires the original arrival condition.

### Bounded short-route probe

A flight-enabled session starting on loaded dry support, with a goal hint or candidate within
16 heuristic units, first tries a complete non-flight route in the same planner. It reuses the
existing ground, climb, water, door and parkour edges and safety rules. The probe consumes at
most 64 expansions or one quarter of the session allowance and accepts only complete goals
with accumulated route cost at most 16. Hint distance and route cost are distinct measures.

If no such complete route is found, the temporary frontier is cleared and the original flight
landing discovery and full transport graph resume. Probe expansions and navigation planning
ticks remain charged; a partial prefix cannot complete the probe. This prioritizes a short
safe route, without promising the same minimum cost as searching the entire transport graph.
Unknown terrain, minimum feet height and interaction conditions remain enforced. Requests
without hints, distant requests and small node budgets retain their previous behavior.

A synthetic native control reduced the same route from 116 to 44 ticks, with island and long
detour fallbacks verified. Real construction throughput is measured separately; accelerated
fixture wall time is not interchangeable with field time at 20 TPS.

## Cumulative local-navigation budgets

`NavigationBudget` captures extra allowance from the initial horizontal distance `d` when `LocalNavigationFlow` is created:

```text
A = ceil(min(12000, max(0, d - 128) * 16))
Planning limit = 4800 + floor(A / 4)
Movement limit = 4800 + A - floor(A / 4)
Execution-scope limit = 9600 + A
```

Each planning advance reserves one planning tick; path execution reserves a movement tick. Water recovery during planning also belongs to that phase. Partial segments and displacement replanning retain both counters.

| Initial horizontal distance | Planning ticks | Movement ticks | Total ticks | Total at 20 TPS | Total at 80 TPS |
| --- | --- | --- | --- | --- | --- |
| <=128 blocks | 4800 | 4800 | 9600 | 8 minutes | 2 minutes |
| 500 blocks | 6288 | 9264 | 15552 | About 13 minutes | About 3.2 minutes |
| >=878 blocks | 7800 | 13800 | 21600 | 18 minutes | 4.5 minutes |

These durations describe the maximum active time of the enclosing scope. Planning or movement can exhaust its own limit first. Actual journey duration depends on paths, obstacles and waits.

Planning exhaustion reports `PATH_TIMEOUT`; movement or execution-scope exhaustion reports `TIMEOUT`. Node exhaustion without an allowed executable prefix can also report `PATH_TIMEOUT`. A search finding no executable path reports `NO_PATH`.

## Travel, flight and source budgets

| Owner | Current base or formula | Additional accounting |
| --- | --- | --- |
| `TravelToFlow` | 36000 ticks | Recorded preparation allowance; at most three controlled replans |
| `PortalJourneyFlow` | 12000 ticks | Distance and bounded preparation allowance |
| `ElytraFlightFlow` | 3600 + ceil(horizontal distance) ticks | Flight distance captured at creation |
| `SupplySourceFlow` | 24000 ticks | Round-trip distance, capacity recovery and preparation allowance |
| `PrepareSupplyFlow` | 24000 ticks | Observed transport-box acquisition, return and external inventory turnover time |
| `AtlasSupplyLoadFlow` | 25200 ticks | Encloses planning and preparation, carrying the same inventory-turnover allowance |
| `AcquireProductionFlow` | 288000 ticks | Outer limit covering collection, production and settlement |

`FlightTimeBudget` adds one tick per horizontal block and doubles that for round-trip allowance. It captures departure distance and retains the allowance during execution. Long area approaches use legs of at most 4096 blocks, with their own leg-count and return limits. Flight remains subject to parent scopes.

The table shows current code constants in ticks. At sustained 20 TPS, 36000 ticks take 30 minutes and 288000 take four hours. At 80 TPS, they take about 7.5 minutes and one hour.

The `TravelToFlow` base does not directly grow with total distance. Portal and approach children can receive distance allowances while the parent base still constrains the journey. `SupplySourceFlow` uses horizontal coordinate distance for its flight-style round-trip allowance; the travel planner separately estimates the actual cross-dimension route.

## Maintenance budgets and allowances

`ResourceMaintenance` retains active ticks and episode counts by resource type. An active type cannot recursively enter itself. Fuel maintenance also restricts external food trips.

| Item | Current limit and scope |
| --- | --- |
| Rocket refills | At most 16 per maintenance context |
| Food refills | At most 16 per maintenance context |
| `fuelTicks` / `foodTicks` | At most 24000 cumulative ticks per type and context |
| `ReplenishSuppliesFlow` | At most 24000 active ticks per instance, preserving partial acquisition and source replacement |
| Source lookup rounds | At most three per replenishment instance |

Rocket replenishment may acquire transport boxes or arrange inventory before and after pickup. `RefillTravelFuelFlow` records this preparation separately, adding at most 24000 cumulative ticks. Preparation still blocks recursive fuel acquisition without charging `fuelTicks`. Rocket acquisition retains its existing 24000-tick cumulative consumption limit and child deadlines. Completion, source replacement and suspension never reset spent budgets.

`BoundedTimeAllowance` adds observed preparation time to a parent operation's timeout, subject to a cumulative ceiling. Completed episodes, source changes and replanning retain recorded allowances.

The allowance compensates the parent for extra work already performed. Resource policy separately limits consumed time and episode count. For example, a completed 2000-tick replenishment can add recorded parent allowance while those 2000 ticks remain charged to its resource context.

Relevant parents explicitly report and accumulate preparation allowances. Transport preparation and physical acquisition currently have separate maintenance contexts and counters. See [maintenance contexts](../supply/maintenance#capacity-and-context).

## Recipe-planning budgets

`MaterialProductionPlanner` has per-plan limits and a shared task budget:

| Item | Per plan | Shared task |
| --- | --- | --- |
| Expansion depth | 12 | Same depth limit in each plan |
| Expansions | 10000 | 50000 cumulative |
| Planning time | 100 ms | 500 ms cumulative |
| Plans | — | At most 16 |

Timing uses monotonic `System.nanoTime()` differences. Reusing the task budget for replanning retains used plans, expansions and time. Creating another budget object creates another accounting scope. Cycles and exhausted limits produce specific shortfalls. Physical crafting has separate execution scopes.

## Responsibilities after exhaustion

| Exhausted work | Handling |
| --- | --- |
| Local search or movement | Return a classified path failure; travel or collection selects alternatives |
| Travel or source time | End the attempt, settle cleanup and acquired stock, then let the parent consider another source |
| Recipe planning | Record shortfalls and limit reasons; execute the currently feasible portion |
| Rocket-refill count or eligible stock | Wait for resources when safe, retaining the original execution |
| Box, tool or inventory obligations | Retain recovery duties and block unsafe continuation under the owning contract |

Exhaustion means the work did not complete within its allowance. Source replacement, shortage reporting, resource waiting and construction admission follow their own result contracts. See [delivery and results](../supply/delivery).

## Parameters and configuration

Most values above come from class defaults and constants. Internal callers can provide `SearchPolicy` or shared budget objects. Public command and server configuration fields are listed in [execution entries](../reference/executables) and [configuration](../reference/config).

At creation, `SwimToDeckFlow` measures required ascent D from the current feet position and horizontal distance H to the deck center. Its local total deadline is `max(400, 200 + 20 × ceil(D) + 40 × ceil(H))` ticks, with D clamped to zero or above. Horizontal allowance accounts for conservative swimming speed; deck support, dry stance and collision checks remain unchanged. Parent deadlines still apply, and extra time does not make an obstructed route passable.

The current interface has no single total-task-budget parameter. Local search policies, an individual Flow timeout and a test runner's wall-time limit affect different layers.

## Progress during construction resupply

`ExcavationResourceTrip` forwards collection and return-travel progress to `ExcavateAreaFlow`. Reported phase transitions or movement update the excavation progress timer; continued waiting consumes that timer. Each execution scope also retains its total deadline. The owning flow settles child cleanup and propagates classified failures.

Excavation cargo storage includes container access and local transfer time. `StoreExcavationCargoFlow` reuses the access allowance from `AccessContainerFlow.budgetTicks()` and adds 2400 ticks for local transfers. The access allowance is 9600 ticks plus the shared distance allowance, captured when the flow is created. Navigation retains its safe landing reserve during flights to elevated workstations. The enclosing excavation's total and no-progress limits also apply to storage.

## Inspecting a timeout

1. Identify the execution ID, failure code and reporting component.
2. Check its unit, limit and start time.
3. Inspect planning and movement counters, search sessions, maintenance counters and active children.
4. Check parent remaining time and explicit suspension intervals.
5. Compare actual TPS, world progress and any wall-time limit imposed by the test runner.

Current budgets have several owners. Distinguish session node limits from cumulative navigation time, ordinary waits from suspension, resource consumption from parent allowance, and new children from their existing parent scope. Changing a child limit requires checking those boundaries together.
