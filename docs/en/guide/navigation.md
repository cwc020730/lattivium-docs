# Navigation and dimensions

## Navigate in the current dimension

```text
/ltv Worker exec NavigateToPosFlow {"target":{"x":100,"y":65,"z":100}}
```

The target is a Bot feet position. Search validates collision and support surfaces within node, time and progress budgets. Container access additionally checks interaction rays and reach.

## Portal travel

```text
/ltv Worker exec PortalJourneyFlow minecraft:the_nether 100 65 100 12 129 12 20 129 20
```

Parameters specify the destination dimension, entrance in the current dimension, exit in the destination, and optional final feet position. The workflow physically enters the portal and verifies the resulting dimension. Business route planning can use Atlas portal records for cross-dimension detours during long trips.

## Flight and resources

`ApproachAreaFlow` handles long-distance approach; `ElytraFlightFlow` handles flight. Business workflows inspect firework reserves at safe boundaries and insert replenishment. Unavailable routes produce reasons and coordinates.

`netherRoofOnly=true` restricts Nether feet positions to Y≥128 and filters unknown or below-roof exits. Routes through water, ladders and complex caves depend on live world state, control capabilities and finite search budgets.
