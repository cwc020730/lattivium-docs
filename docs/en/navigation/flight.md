# Elytra flight

Flight executes a defined flying operation. Travel chooses when to fly, departure and onward goals; flight components own takeoff, control and observed completion.

## Flight terms

| Term | Meaning |
| --- | --- |
| `FlightPolicy` | Arrival distance, settling timeout, cruise height and short-flight parameters |
| Flight route | Departure geometry and optional checkpoints |
| Takeoff position | Location satisfying launch stance and clearance |
| Landing candidate | Position near the target satisfying collision and landing conditions |
| Settling | Observed position and movement state satisfying completion after flight |
| Direct fuel | Rockets immediately usable, distinct from packed quantities |

## ApproachAreaFlow

**Input:** a current-dimension area target and transport policy.

It selects approach from actual position, equipment and resources, potentially combining several flight legs or local movement stages. The supported area goal uses a 32-block horizontal and vertical range; see [arrival conditions](./targets#regions-and-candidates).

**Output:** the actual navigation result. Subsequent components verify precise poses or container interaction.

## ElytraFlightFlow

**Input:** flight policy, destination, optional planned route and departure position.

```text
Prepare and validate departure
  -> ElytraTakeoffFlow
  -> Ascend, cruise and descend
  -> Select landing and control approach
  -> Verify settling
```

Short hops and long flights use their respective policies. Obstructions, failed launch, resource shortages and changed landing conditions lead to bounded recovery or a classified failure.

**Output:** `NavigationResult`, recording actual feet and navigation statistics. The travel owner then verifies its final arrival condition.

## Fuel and maintenance

Flight requires usable elytra equipment and plain propulsion rockets. Preflight maintenance can unpack carried fuel or visit sources. Unpacking requires grounding and a usable operation position.

Area approach considers direct fuel and return reserves. See [rocket estimates and replenishment](./fuel) for leg formulas, route splitting, thresholds, packed stock and implementation boundaries. Travel uses caller-provided policies; physical replenishment reuses material acquisition. See [maintenance](../supply/maintenance#taskfireworksupply) for ownership.

## Inspecting flight state

Trace exposes preparation, ascent, cruise, descent, landing and recovery phases. Arrival verification combines observed dimension, feet, flight state and execution receipts.
