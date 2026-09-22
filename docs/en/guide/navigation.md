# Movement and dimensions

## Travel to a destination

`TravelToFlow` accepts a destination dimension and Bot feet coordinates. It reads portal records from Atlas, selects a route and completes the final approach. Nearby targets first use local navigation; longer journeys also consider shortcuts through the Nether.

```text
/ltv Worker exec TravelToFlow minecraft:overworld 100 65 100
```

Equivalent JSON syntax:

```text
/ltv Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":100,"y":65,"z":100}}
```

The Bot physically enters portals and waits for the game to transfer it. Success requires the destination dimension and actual feet within 0.75 blocks of the target block's bottom center. Missing routes, travel-policy restrictions and unsatisfied arrival conditions return a failure reason. Use the returned task ID to inspect, cancel or track execution.

Cross-dimension routes require usable portal records in Atlas. For standalone execution, supply an elytra, rockets and food. Travel reuses resource replenishment services provided by its owning business workflow.

## Local navigation in the current dimension

`LocalNavigationFlow` searches and executes local paths within the current dimension. It supports precise approach and focused navigation testing.

```text
/ltv Worker exec LocalNavigationFlow 100 65 100
```

## Navigation layers

| Executable | Completion condition |
| --- | --- |
| `TravelToFlow` | Satisfy the final arrival condition in the destination dimension; the command uses destination feet |
| `PortalJourneyFlow` | Finish the selected portal route and clear the exit trigger |
| `ApproachAreaFlow` | Approach the target area in the current dimension |
| `LocalNavigationFlow` | Complete a local path goal in the current dimension |
| `ElytraFlightFlow` | Complete the requested flight operation |

Business workflows can provide area or construction-site arrival conditions to `TravelToFlow`. Container workflows travel to the area, then use container access to verify standing positions, reach and line of sight.

The `entrance` and `exit` parameters of `PortalJourneyFlow` are explicit route hints; optional `target` guides route selection. Use `TravelToFlow` for ordinary destination-based travel.

## Travel policy and budgets

`netherRoofOnly=true` restricts Nether movement to feet at Y≥128 and filters unknown or below-roof exits. Path searches and journeys have finite budgets; travel replans at most three times after unexpected dimension changes. Water, ladder and cave routes depend on observed terrain and Bot movement capabilities.
