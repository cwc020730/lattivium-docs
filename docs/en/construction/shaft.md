# Shaft

The shaft provides vertical access between the surface and working layers. A scaffold column beside the site can connect to adjacent working layers at different heights once their side clearance and footing are ready. Its foundation may be lower than the lowest working layer.

![Relative positions of the scaffold foundation, working layer and shaft entrance](/construction/shaft-section-en.svg)

## Positions and access

| Term | Meaning |
| --- | --- |
| Foundation | Stable block supporting the scaffold column |
| Entrance | Top access point connecting to the surface or road |
| Layer connection | Passage between the scaffold and the current working layer, varying with construction height |
| Bottom working stance | Adjacent standing space used when installing scaffolding from the side, planned for the selected construction method |

Extending the foundation downward preserves working-layer heights. The bottom working stance supports operations such as scaffold installation. Any required adjacent stance belongs to the planned mutation area.

## Construction sequence

1. Verify the foundation, shaft, required stances and surrounding safety conditions.
2. Establish the passage using safe incremental descent and native mining.
3. Install scaffolding from valid placement stances.
4. Actually ascend, descend and pass through the required exits.

Starting supplies and storage capacity must cover this stage because the workstation is built afterward.

## Completion conditions

The scaffold column has reliable support and its entrances provide body clearance. Footing needed by working layers remains compatible with the bottom opening. Physical block state and actual round trips jointly establish completion.

## Components

`ScaffoldAccessPlan` describes scaffold access geometry. `PrepareScaffoldAccessFlow` already provides controlled shaft mining, drop collection, scaffold placement and transit verification.

The four-sided sand-perimeter layout uses `PrepareSealedScaffoldFlow`: it builds sand seals on the inner and outer sides of the selected shaft cell, removes the sand in that cell and installs scaffolding. The seals and scaffolding extend from the planned bottom to the wall top.

The dry-site plan records the selected shaft position, foundation and exit heights, and any required entrance extension. Callers supply internal Flow parameters; the [execution contract](../reference/executables) defines independently executable commands.
