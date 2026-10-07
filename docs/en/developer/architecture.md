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
| ResourceMaintenance | Maintenance admission and cumulative budgets; resource policies select operations |
| MaterialSourceLocator | Shared item-source lookup and filtering interface for acquisition and maintenance |
| AcquisitionReceipt | Receipt for actual acquisition and associated effects |
| SupplyResult | Business outcome containing delivery, shortages and failed sources |
| Obligation | Outstanding return, recovery, delivery or cleanup responsibility |
| Checkpoint | Validated saved state for supported recovery |
| Atlas observation | World facts with provenance and observation time |
| Unreachable | A source unavailable under the selected policy and budget |

Flows are separated by independently meaningful results, owned state and cleanup boundaries. Flight and mining sessions retain their specialized control state and share lifecycle contracts where useful. This manual documents executable contracts and public API packages; implementation details remain in source.

## Flow and capability ownership

This migration lives on `codex/flow-ownership-refactor`. Source review and short native regressions are separate evidence; they do not establish full construction-field acceptance.

A Flow owns composition phases, child Flow/Action lifetimes, branches on capability facts, and projects results or checkpoints. The relevant capability owns slot and capacity decisions, source ranking, path search, physical control, world surveys, interaction feasibility and native item receipts, including internal work state.

For example, `TransferItemsFlow` schedules transactions while `ContainerTransferSession` verifies native menus and quantities. `MineBlockFlow` composes approach, tool selection and mining while `MiningStance`/`MiningToolSelector` decide stance and tools. `ElytraFlightFlow` composes preparation, takeoff and rocket operations while `FlightControl` maintains physical feedback. Trace and result observations do not authorize another implementation of the policy.

Each Flow defines its required phases; there is no universal business-state enum. `R` in `Flow<R>` is the result type. Capabilities may retain continuous operation state, but they do not create, advance or cancel child execution scopes. Commands and UI integrations still submit root operations through the execution contract and observe their runtime handles.

Structural migration preserves per-tick boundaries, native input ownership, short-circuit evaluation, budgets, partial receipts and cleanup order. Component success does not establish complete field-task success; behavior and ownership are verified separately.

## Travel composition

```text
TravelToFlow
  ├─ PortalJourneyFlow
  ├─ ApproachAreaFlow → ElytraFlightFlow / LocalNavigationFlow
  └─ LocalNavigationFlow → PathEdgeExecFlow → Action
```

`TravelToFlow` owns the destination dimension and final arrival condition. Its result, `TravelArrival`, contains the observed dimension and feet position. Portal crossings and area approach are intermediate legs. Inventory and construction owners supply their arrival conditions and retain ownership of interactions and material changes.

## Acquisition, delivery and construction

`AtlasSupplyTask` and `AcquireMaterialsFlow` share `AtlasSupplyLoadFlow` and `AcquireProductionFlow`. The former owns delivery targets; the latter leaves materials in carried inventory for its caller. `PrepareAndExcavatePerimeterFlow` turns a site survey into material demand and invokes acquisition when autonomous supplies are enabled.

Source access, precise shulker extraction, crafting and material reservations retain separate results and cleanup boundaries. `ResourceMaintenance` governs maintenance admission. `TaskFireworkSupply` and `TaskFoodSupply` select resource policies. The parent retains the original goal and continues after maintenance completes.

See [supply and crafting](../guide/supply) and [construction supplies](../construction/supplies) for the call chain and integration boundaries.
