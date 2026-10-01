# Routes and dimensions

Routes connect places and dimensions to guide approach and portal order. Atlas supplies recorded transport facilities; Bot planning combines them with current observations and policies.

## Route terms

| Term | Meaning |
| --- | --- |
| Route node | Known place with type, dimension and coordinates |
| Route edge | Movement or teleport connection with an estimated weight |
| Portal transition | Intended entry and exit places across dimensions |
| Entry candidate | A position used to approach and enter a transport facility |
| Observed exit | Actual Bot location after game transport |
| Exit clearance | Leaving the retrigger region before subsequent movement |

`TravelRoute` stores immutable nodes and edges. Entrances, exits and connections guide planning; execution verifies facilities and observed transitions.

## Same-dimension detours

`TravelToFlow` can compare direct movement with dimension detours. Long Overworld journeys can enter the Nether and return near the destination. Known transport networks, estimated cost and permitted areas govern route selection.

Source planning uses travel estimates to allocate stock. Travel owns actual movement and alternatives. These layers share observations while retaining source-allocation and arrival responsibilities.

## PortalJourneyFlow

**Input:** route hints, destination dimension, selection reference and search policy.

It selects an entrance and approach poses, uses area or local navigation, physically enters the facility, waits for the dimension transition, observes the exit and clears the trigger region. Rejected entrances or legs can lead to eligible alternatives within remaining budgets.

**Completion:** the selected transport journey and exit clearance. `TravelToFlow` subsequently verifies the final business destination.

Explicit command fields `entrance` and `exit` provide route hints; `target` guides selection. Use [TravelToFlow](./targets#traveltoflow) for ordinary destinations. See the [Flow reference](../reference/flows#portaljourneyflow) for parameters.

## Prediction and observation

Nether coordinate scaling and nearby existing portals inform exit predictions. Recorded portals can be removed and actual arrival can differ from prediction. Travel proceeds from observed dimension, position and valid entrances.

Unexpected dimensions, blocked entrances and failed exit clearance can trigger replanning or failure. Exhausted budgets retain reasons and coordinates.

## Permitted areas

`netherRoofOnly=true` restricts Nether feet to Y≥128 and filters unknown or below-roof exits. Structure exclusions and inventory protection primarily govern sources; transport policies govern eligible legs. See [configuration](../reference/config).
