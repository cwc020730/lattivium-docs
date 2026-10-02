# Workstation

The workstation provides a floor, material storage and space for construction logistics. It may be elevated and connected to the shaft by a permanent road.

## Layout

`WorkstationLayout` derives its footprint from the number of output containers:

| Element | Layout |
| --- | --- |
| Output shulker boxes | 2–8, arranged with gaps |
| Supply chest | One position |
| Empty-box chest | One position |
| Floor | Output count × 2 + 1 blocks wide, 7 blocks along the other axis |
| Clearance | 2–6 blocks above the floor, selected by the layout |

Four output boxes require a 9×7 floor containing 63 blocks. The layout includes aisles and container opening space.

## Elevated platform

The joint infrastructure plan finds a completely empty volume and extends the floor from the end of the permanent road. It uses a uniform material from the floor allowlist, with white concrete preferred.

Workstation selection and road planning jointly determine construction height. The floor and body clearance must fit within world height limits.

Each placement prepares directly usable material before approaching the working pose. For material in a carried transport box, the Bot uses shared inventory turnover to find an accessible staging position and unpack it. The current material requirement remains reserved during travel. Elevated working poses can use available walking, climbing or Elytra routes.

## Supplies and completion checks

Preflight counts loose stock and material inside carried transport boxes. Construction prepares the current phase's batch: floor material first, the relevant container before placement, and one stack at a time for stocking. The whole station's material does not need to occupy direct task slots together. Reserved output boxes remain protected, and each transfer is checked against its physical receipt.

After the floor is ready, place output boxes and storage chests, then deposit the supplies requested by the task. Completion checks verify:

- Physical floor blocks match the plan.
- Aisles and space above containers are clear.
- Container types, positions and actual inventories match the receipts.
- Actual round trips between the shaft and workstation succeed.

## Components

`PrepareWorkstationFlow` manages platform preparation, container placement, stocking and verification, using `PreparePlatformFlow` for the floor.

The component can clear and replace blocks in an explicit area. Joint infrastructure supplies an elevated empty layout and extends the platform from the access road. Combined clearing also uses the workstation's product depots and furnace work positions in sponge mode.
