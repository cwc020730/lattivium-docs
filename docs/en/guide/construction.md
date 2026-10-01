# Construction

Construction combines site layout, infrastructure, clearing and schematic building. The workstation stores materials, the shaft provides vertical access, and the access road connects them.

![Site section showing the shaft, permanent access road, workstation and planned clearing volume](/construction/site-section-en.svg)

## Stages

| Stage | Result | Responsibility |
| --- | --- | --- |
| [Layout and survey](../construction/planning) | Frozen shaft, workstation and buildable route | Check material budgets and mutation boundaries |
| [Construction supplies](../construction/supplies) | Materials and carrying capacity | Autonomous acquisition reuses shared collection and crafting |
| [Shaft](../construction/shaft) | Scaffold column with a stable base and usable exits | Verify actual ascent and descent |
| [Access road](../construction/road) | Permanent connection to the workstation | Place each segment and check body clearance |
| [Workstation](../construction/workstation) | Floor, storage and walking space | Extend the platform from the road |
| [Site clearing](../construction/clearing) | Cleared volume and accounted excavation products | Work by layer and manage storage and fluids |
| [Schematic building](../construction/schematic) | Verified target block states | Read a schematic and use supported building operations |

## Availability

Area clearing and schematic building have their own [execution entries](../reference/flows). Site preparation uses the shaft, access road, workstation and platform components.

`PreparePerimeterInfrastructureFlow` excavates the four sides of a square work area and fills them as a sand perimeter. It then builds an isolated scaffold shaft in one wall, a permanent white-concrete road and a workstation outside the work area. `PrepareAndExcavatePerimeterFlow` joins these facilities with layered interior clearing in one execution. `PrepareSiteInfrastructureTask` can also plan a shaft, road and workstation for a dry site.

## Combined construction sequence

```text
Survey and material demand
  -> Acquire supplies and return to the start (when autonomous acquisition is enabled)
  -> Excavate the perimeter and fill each column with sand
  -> Convert the isolated shaft center to scaffolding
  -> Build the access road and workstation
  -> Verify round-trip access and organize inventory headroom
  -> From the top: drain or replace liquids -> excavate the layer -> verify dry air
  -> Repeat through the bottom layer
  -> Return to the workstation and verify the cleared volume and retained facilities
```

Each phase has a concrete completion condition. Infrastructure checks physical blocks and actual access. Clearing checks air and liquid state for every layer. Final verification checks both facilities and the Bot's return position. See [construction supplies](../construction/supplies) and [supply and crafting](./supply) for acquisition, construction and delivery ownership.

## Execution layers

A Task owns business progress, recovery and results. A Flow coordinates a reusable operation. An Action performs a concrete interaction. Higher-level tasks supply internal construction components with the selected layout and runtime dependencies.

Existing components include `PrepareScaffoldAccessFlow`, `PreparePlatformFlow`, `PrepareWorkstationFlow` and `BuildBlockFlow`. The stage pages describe their roles. Independently executable types and parameters are listed under [execution entries](../reference/executables).
