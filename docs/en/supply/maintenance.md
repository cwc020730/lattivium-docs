# Maintenance and recovery

Resource maintenance is a child operation owned by the current execution. Checkpoint recovery validates saved state after reconnection or resubmission for supported business operations.

## Maintenance terms

| Term | Meaning |
| --- | --- |
| Resource policy | Rules for when to replenish, how much and from which source |
| Maintenance episode | A bounded child operation that can include travel, unpacking and acquisition |
| Safe boundary | An operation state suitable for inventory settlement, eating, replenishment or waiting |
| Stock minimum | Available stock below this level triggers resource policy |
| Replenishment target | Desired stock at the end of an episode |
| Resource wait | The original execution retains its goal while awaiting physical resources and validation |
| Checkpoint | Saved progress, identity, inventory and obligations for supported recovery |

## Trigger and resumption ownership

Travel and inventory components invoke resource policies at supported boundaries. A policy creates a child Flow when needed. The parent advances it and resumes its original goal and progress once maintenance and obligations settle.

Maintenance can move the Bot. `TravelToFlow` checks its arrival condition again when maintenance ends: it continues confirmation at the destination, or resumes route selection from the actual position. The original execution retains elapsed time, rejected sources and maintenance budgets.

```text
Parent prepares to continue
  -> Check resource policy
  -> Run maintenance child -> Settle inventory and temporary facilities
  -> Resume the parent from the Bot's actual position
```

`ResourceMaintenance` owns active resource types, time and episode counts, restricting same-resource recursion. Fuel maintenance restricts food-replenishment trips; policies decide eligible local work. Cargo, borrowed boxes and delivery obligations remain owned during maintenance.

## TaskFireworkSupply

See [rocket reserves](../navigation/fuel) for modes, predictions and takeoff checks, and [inventory requirements](./stock) for shared quantity semantics.

Default `FIXED` replenishment starts below 1,728 rockets and aims for 3,456. `AUTO` uses itinerary predictions and configurable multipliers. Spendable stock includes loose and carried-box fuel, preserving delivery reservations.

External acquisition uses `ReplenishSuppliesFlow`, with the last source that actually supplied fuel as a fallback. `ProducePropulsionFuelFlow` can acquire ingredients and craft a remaining shortage. Airborne checks wait for a safe landing. In water, settled inventory allows ordinary acquisition navigation to begin; navigation and container operations choose a suitable interaction stance. After settlement, the parent resumes from the Bot's actual position.

An unresolved shortage at a safe location enters `WAITING_FOR_RESOURCE`, reporting deficit, dimension, position and reason. Added propulsion fuel is validated against the minimum. Explosive rockets remain excluded.

An acquisition batch from the current source finishes before deciding whether another source is needed. Sufficient source stock is acquired toward the target; after settlement, scarce stock or capacity can be judged against the minimum.

## TaskFoodSupply

`FoodPolicy` filters food through `foodWhitelist`, plain-item components and nutritional value. Default items are ordinary food; valuable or poisonous items such as golden apples are excluded from the default list. Users can configure the list.

Eating is considered when hunger is below full and at most 18, or when injured with hunger below full and saturation at most 1. A safe boundary requires grounding outside liquids, finished flight and item use, and settled container and crafting interactions.

`EatCarriedFoodFlow` consumes loose food first. Packed food uses shared shulker access; external replenishment uses `ReplenishSuppliesFlow` to acquire eligible food. When trips are permitted, loose reserves have a minimum nutritional value of 32 and a target of 80.

An unavailable optional reserve can be skipped while eating is unnecessary, with replenishment reconsidered when hunger requires it. Unmet hunger, inventory discrepancies or unreturned boxes retain their respective failures or recovery obligations.

Food uses the shared inventory requirement: `foodSupplyThreshold=32` and `foodSupplyTarget=80`, measured in nutrition. Food and rocket maintenance share the execution mode from transport preparation through collection.

## Capacity and context

Capacity workflows organize inventory for the next acquisition, craft or construction operation. See [capacity and batching](./containers#capacity-and-batching).

One `ResourceMaintenance` session belongs to the root execution. Preparation, acquisition, crafting, return and construction descendants share active maintenance state and cumulative budgets. A child scope owns only its declarations: completion removes them without closing or resetting the parent session. Food and fuel policies require an explicit session instead of convenience constructors that create hidden independent budgets. Root termination closes the session; later tasks inherit neither its declarations nor its authority.

Checkpoint restoration must establish maintenance-budget ownership. Area checkpoint version18 and site checkpoint version14 record this contract. Older versions remain readable for audit but cannot resume directly: reconcile physical stock, facilities and obligations first, without resetting historical budgets.

## Budget scope

Episode counts, cumulative active ticks, parent preparation allowances and explicit suspension have distinct scopes. See [budgets](../navigation/budgets#maintenance-budgets-and-allowances) for limits and accounting.

## Waiting, cancellation and recovery

| Situation | Handling |
| --- | --- |
| Maintenance completes | Resume parent, rebuilding travel from the new position when needed |
| Resource wait | Retain execution, observe new resources and validate |
| User cancels or interrupts | Handle active children and cleanup obligations; interruption cancels the original task |
| Recovery after normal shutdown | Supported checkpoint owners verify Bot identity, physical inventory and obligations |
| Abnormal exit or unsettled cleanup | Report the blocker and reconcile before recovery |

Submission IDs identify executions for observation and control. See [recovery](../guide/recovery) for checkpoint conditions and commands, and [execution control and queues](../reference/task-control) for rejection, queuing and interruption semantics.

## Consumption preparation and parent execution

Shared `PrepareInventoryConsumptionFlow` prepares the next ordinary native batch. If unpacking requires a visit elsewhere, this preparation returns through shared navigation to its original consumption position and observes stock again; callers recheck actual interaction feasibility. Finish the same pending request before geometry checks, then validate actual stance. Inherited source access and material consumption permission are separate contracts; `consumingMaterialOwner(UUID)` authorizes business stock, while trace parentage grants no permission.

Food and propulsion policies retain their triggers. Common `consumptionLimits` checks their roles, weighted nutrition and foreign carried minimums. Exact owned reservations keep their existing reserve/settle receipts; confirmed ordinary effects report `confirmConsumption(removed, returned)` without double settlement. Cancellation retains outstanding box/menu/inventory cleanup and does not reset root-session counts, active time or parent budgets. Native contract gates validate consumption, relocation and cancellation separately from complete construction acceptance.
