# Navigation and travel

Travel moves the Bot to a destination dimension and satisfies the caller's arrival condition. Local navigation, elytra flight and portal operations supply movement capabilities. Material collection and construction reuse them to reach their business goals.

## Travel to a destination

`TravelToFlow` accepts a destination dimension and Bot feet coordinates. It reads portal records from Atlas, selects a route and completes the final approach.

```text
/ltv Worker exec TravelToFlow minecraft:overworld 100 65 100
```

Equivalent JSON syntax:

```text
/ltv Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":100,"y":65,"z":100}}
```

Success requires the destination dimension and actual feet within 0.75 blocks of the target block's bottom center. Use the returned execution ID to inspect, cancel or track execution. Complete parameters are in the [Flow reference](../reference/flows#traveltoflow).

Prepare an elytra, rockets and food for standalone execution. Business callers can supply resource maintenance policies, which travel uses at supported boundaries.

## Reading order

| Chapter | Covers |
| --- | --- |
| [Destinations and arrival](../navigation/targets) | Bot feet, reference positions, candidate poses and completion conditions |
| [Routes and dimensions](../navigation/routes) | Route nodes, portals, same-dimension detours and actual exits |
| [Local paths and movement](../navigation/local) | Search requests, path nodes, movement types and partial paths |
| [Elytra flight](../navigation/flight) | Area approach, takeoff, cruise, landing and fuel |
| [Rocket estimates and replenishment](../navigation/fuel) | Quantity formulas, route prediction, refill triggers, unpacking and reserve differences |
| [Budgets](../navigation/budgets) | Units, default limits, inheritance, suspension and exhaustion |
| [Observation and failures](../navigation/recovery) | Unloaded terrain, replanning and failure ownership |

## Navigation layers

| Component | Responsibility and completion condition |
| --- | --- |
| `TravelToFlow` | Coordinate the journey and verify final arrival in the destination dimension |
| `PortalJourneyFlow` | Execute portal legs through physical entry, game transfer and exit clearance |
| `ApproachAreaFlow` | Select an approach method and enter the target area in the current dimension |
| `LocalNavigationFlow` | Search and execute a current-dimension path to a local goal |
| `ElytraFlightFlow` | Complete takeoff, flight control, landing and settling |
| `PathEdgeExecFlow` | Execute one movement edge in a local path |

`TravelToFlow` combines these capabilities according to actual position. Nearby goals can use local movement directly. Long journeys can use flight or the portal network. Internal callers can supply area, container-approach or construction-pose goals.

Container operations own interaction poses, reach and menus. Construction owns authorized changes and work poses. Travel moves against those goals and returns actual position.

## Local navigation in the current dimension

`LocalNavigationFlow` can independently execute local goals for precise approach and short path validation.

```text
/ltv Worker exec LocalNavigationFlow 100 65 100
```

See [local paths and movement](../navigation/local) for policies and movement components.

## Travel policy and budgets

`netherRoofOnly=true` restricts Nether feet to Y>=128 and filters unknown or below-roof exits. Search, movement and recovery use finite budgets. See [budgets](../navigation/budgets) and [observation and failures](../navigation/recovery).
