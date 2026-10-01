# Access road

The access road connects the shaft to the workstation and supplies the initial placement frontier for its floor. It remains as permanent infrastructure.

## Cross-section

![Road cross-section and placement frontier](/construction/road-section-en.svg)

A one-block-wide route occupies three vertical cells: a floor and two cells of body clearance. Planning checks the whole section and verifies that the next floor block can be placed from the completed part.

If the workstation is above the original entrance, the plan includes the required vertical scaffold connection and materials.

## Incremental construction

Start from reliable support on the shaft side and extend the floor in planned order. After each placement, verify the block state and actual material consumption before moving to the next construction stance.

The final road segment connects directly to the workstation floor. Platform construction continues from that position. The permanent road supports subsequent round trips.

Connecting from the top of a scaffold may require a temporary solid support block to establish the adjacent road. Once that road provides a working stance, recover the temporary block and reopen the shaft entrance. Completion checks actual ascent and descent after the opening is restored.

## Completion conditions

The road has a continuous floor and clear walking space. Its ends connect to the shaft and workstation. The Bot completes travel in both directions, and placement boundaries and material receipts match the plan.

## Components

`BuildBlockFlow`, `PreparePlatformFlow` and `ApproachPlatformPlacementFlow` provide block placement and edge-construction capabilities.

`PrepareSiteRoadFlow` takes a `SiteInfrastructurePlan` and owns scaffold extension, temporary support, permanent road placement, support recovery and round-trip checks. Site preparation calls it to connect the shaft and workstation.
