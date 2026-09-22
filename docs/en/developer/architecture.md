# Architecture and terminology

Commands submit a declared Task, Flow or Action to the Bot scheduler. The scheduler owns the root slot and queue; ExecutionScope owns tick progression and termination. Tasks compose business operations, Flows compose interactions, and Actions or specialized sessions drive native controls. Atlas supplies facts; planners turn facts into requests and routes. Trace observes execution.

```text
Command → BotEventScheduler → ExecutionScope
                                  ├─ Task
                                  ├─ Flow → child Flow / Action / Session
                                  └─ Action
Atlas → Planner → Execution request
```

## Terms

| Term | Meaning |
| --- | --- |
| Executable | An operation with a shared execution lifecycle, implemented as Task, Flow or Action |
| Bot | A scheduled Carpet fake player and its capability boundary |
| Task | A root business objective with long-lived state |
| Flow | An orchestration that owns child lifecycles and produces a concrete result |
| Action | A low-level input or native interaction operation |
| ExecutionScope | An execution unit’s tick progression, budgets, terminal state and cleanup |
| EventHandle | An observation and cancellation handle for one submission |
| Session | State for a specialized continuous operation |
| Plan | An execution plan derived from knowledge and policy |
| Step | A group of source containers in a supply plan |
| SourceJob | Items and quantities allocated to one source container |
| TravelRoute | Travel hints between locations and dimensions |
| NavigationRequest | Local navigation positions, candidate feet locations and search policy |
| PathGoal | The navigation completion condition |
| NavigationResult | Actual reached feet position and optional path nodes |
| MaterialLedger | Demand, holdings, reservations, acquisition and delivery accounting |
| AcquisitionReceipt | Receipt for actual acquisition and associated effects |
| SupplyResult | Business outcome containing delivery, shortages and failed sources |
| Obligation | Outstanding return, recovery, delivery or cleanup responsibility |
| Checkpoint | Validated saved state for supported recovery |
| Atlas observation | World facts with provenance and observation time |
| Unreachable | A source unavailable under the selected policy and budget |

Flows are separated by independently meaningful results, owned state and cleanup boundaries. Flight and mining sessions retain their specialized control state and share lifecycle contracts where useful. This manual documents executable contracts and public API packages; implementation details remain in source.

## Travel composition

```text
TravelToFlow
  ├─ PortalJourneyFlow
  ├─ ApproachAreaFlow → ElytraFlightFlow / LocalNavigationFlow
  └─ LocalNavigationFlow → PathEdgeExecFlow → Action
```

`TravelToFlow` owns the destination dimension and final arrival condition. Its result, `TravelArrival`, contains the observed dimension and feet position. Portal crossings and area approach are intermediate legs. Inventory and construction owners supply their arrival conditions and retain ownership of interactions and material changes.
