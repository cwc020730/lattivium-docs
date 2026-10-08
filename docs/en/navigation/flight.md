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

## Water-surface departure

Common local navigation can launch from an admitted surface node when usable elytra and rockets are available, then reach a supported destination. Submerged nodes first use shared swimming edges to reach the surface. Navigation owns emergence clearance, entity collision and fuel; construction and recovery callers declare their destinations.

Shared `TakeoffControl` owns water-column steering during surface launch. It continuously corrects horizontal steering through native jump and glide preparation to stay in the admitted continuous open column, rather than aligning only once at startup. Existing takeoff control takes over after water exit; collision, clearance, fuel, cancellation and input release retain the same contract. Construction, mining and recovery callers do not implement separate column steering.

Planning and execution share logical feet, physical stance and the first airborne checkpoint. Short hops and direct flights reuse surface alignment and native jump/fall-flying inputs. Fuel preparation returns to the original logical stance. Fractional slab/chest supports keep their current cell, without an above-cell alias. Changed water/clearance and cancellation retain revalidation and input cleanup.

Twenty-four water/departure and sixteen adjacent dry-landing controls passed. This establishes the shared capability, not a complete wet construction acceptance. The legacy departure cohort still has recorded pre-existing failures.
