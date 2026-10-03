# Site clearing

Clearing empties a selected volume and accounts for excavation products, fluid operations and outstanding obligations. It can run on its own or as part of one execution that also builds the perimeter, shaft, road and workstation.

## Area clearing

`ExcavateAreaFlow` accepts inclusive bounds in the current dimension, with a maximum of 64 blocks per axis and 32,768 blocks in total. Prepare tools, finite empty shulker boxes, fill material and storage positions outside the area.

```text
/ltv Worker exec ExcavateAreaFlow 100 64 100 104 66 104 98 64 100
```

The flow mines from top to bottom, verifies collection and deposits cargo when capacity is limited. Protection conflicts involving machines, containers or portals report their positions. See the [Flow reference](../reference/flows#excavateareaflow) for parameters.

### Layered clearing

`ExcavateLayeredAreaFlow` clears a prepared, isolated volume. On each layer, the Bot replaces internal fluid with fill material, mines the blocks, and verifies that the entire layer is dry air before descending. `egress` is an access cell inside the bottom layer. Existing empty shulker boxes receive the products; `additionalDepots` can specify supported spare positions.

When liquid remains below the current layer, filler placement requires stable footing above that layer. Placement extends from existing support into adjacent fluid cells, gradually creating a walkable floor. Both placement navigation and the actual interaction check the footing height and grounded state, keeping the Bot on the completed layer before mining begins.

Within a layer, the Bot may stand on remaining blocks or enter cleared cells with reliable support below. Movement, mining and product recovery share the current layer's height boundary. Mining also validates the actual footing, target reach and fluid safety. Ledge mining uses a verified adjacent support and capture pose.

```text
/ltv Worker exec ExcavateLayeredAreaFlow {"min":{"x":100,"y":47,"z":100},"max":{"x":115,"y":62,"z":115},"egress":{"x":100,"y":47,"z":107},"depots":[{"x":94,"y":64,"z":107}]}
```

The receipt lists completed layers, mined cells, fluid-preparation cells, depot contents, and any ordinary drops abandoned under best-effort recovery. The perimeter seal, scaffold shaft, road and workstation are prepared through [site planning](./planning). See the [Flow reference](../reference/flows#excavatelayeredareaflow) for all parameters.

## Product recovery

Strict recovery requires the corresponding drop obligations to be settled. Best-effort recovery collects ordinary excavation products within configured distance and active-time budgets, recording abandoned items and coordinates.

Tools, borrowed shulker boxes, sponges and delivery cargo retain their own return or delivery obligations. The owning task selects the recovery policy.

### Product storage

Excavation products can reside in L1 or in owned L2 transport boxes. `StoreExcavationCargoFlow` uses `EnsureInventoryReadyFlow` to prepare the next batch in L1, then deposits exact quantities through `TransferItemsFlow`. Each batch retains owned transport boxes and updates outstanding cargo from confirmed transfers.

When a depot fills, the flow returns the quantity actually stored. The owner retains the remaining cargo obligation and selects another depot. Reusing a depot or restoring a task requires its physical contents to match existing receipts. See [inventory tiers](../supply/stock) for shared turnover.

## Fluids

Internal fluids can be handled with finite fill material, with temporary fill recovered afterward. Declared sealing positions outside the volume isolate continuing inflow. Permanent seals are accounted for separately and retained.

### Bottom sealing

`ExcavateLayeredAreaFlow` and `PrepareAndExcavatePerimeterFlow` accept `sealBottom`, which defaults to `false`. Setting it to `true` authorizes the complete plane one block below the clearing volume, with the same horizontal bounds. A bottom layer at `y=47`, for example, declares a sealing plane at `y=46`.

The Bot mines the last layer, then checks the exposed bottom plane, retains existing dry solid blocks, and places white concrete from supported edges to seal gaps, fluids and supported aquatic vegetation. The last layer permits fluid immediately below in the declared plane while retaining side-isolation requirements. Water below the layer stays below the cleared cells.

Permanent seals remain below the cleared volume; mining recovers temporary fill inside it. The receipt's `bottomSeals` lists the declared positions. Completion verifies both the dry-air volume and its bottom isolation. Machines, containers and other protected blocks retain their construction safeguards. A sealing plane with no usable placement support reports that a supported seed is needed within its declared bounds.

### Layered sponge drainage

With `excavationDrainageMode` set to `SPONGE_GRID_WHEN_AVAILABLE`, continuous construction first builds one-block-high partitions on suitable wet layers. A partition every four blocks divides the interior into chambers no larger than 3×3. The Bot places a sponge in a chamber, retrieves the wet sponge, dries it with a furnace and fuel at the workstation, and continues clearing. The layer's mining pass recovers the grid and other temporary fill blocks.

This top-down view shows two rows of chambers. `#` marks a partition, `·` a chamber cell, and `S` one possible sponge position. The actual position depends on the water and reachable placement poses.

```text
···#···#
·S·#···#
···#···#
########
···#···#
···#···#
···#···#
########
```

In cross-section, the partition, chamber water, and sponge occupy the same active layer `Y`; the sponge is inside the chamber. The cleared layer `Y+1` is air, and `Y-1` provides a dry solid floor:

```text
Y+1     air   air    air    air   air
Y       wall  water  sponge water wall
Y-1     floor floor  floor  floor floor
```

A sponge chamber needs a dry solid floor and a usable return position. Other fluid cells use fill material. Every completed layer is verified as dry air. The mode uses physically carried sponges, furnace and fuel, with receipts for placement, recovery and drying.

The shallow-pit water-column exit applies to an already cleared volume up to four blocks deep and 8×8 horizontally, with a sealed floor and sides in a dimension that permits water. The Bot places water, swims out, collects it and verifies 100 consecutive empty ticks.

### Deep-water sand perimeter

`BuildPerimeterSandWallFlow` builds a one-block-thick sand ring around an inner square of 6, 12, 16 or 32 blocks per side. Each column can be up to 96 blocks tall. For each column, the Bot mines the authorized seabed from the top down, drops real sand from a dry working deck, then uses the completed wall top as the next deck. `bottomY` and `topY` set the wall height; `minimumOriginalSeabedBlocks` sets the minimum penetration into the original seabed for every column.

The plan needs a supported starting deck, a solid foundation beneath every column, a continuous outer water lane for mining and return, enough sand and tools, and underwater survival supplies. Preflight reports the position of any unmet condition. Completion checks the physical blocks, remaining supplies and the Bot's return to the starting deck.

`innerMin` is the northwest corner of the inner square. Construction starts at the northwest corner of the outer ring and proceeds along its north edge. `startDeck` is the Bot's feet position, west of the first outer column and one block above `topY`. Build its supported floor before invoking the entry; preflight checks the starting position and supplies. The exterior water lane must remain continuous, or preflight reports the blocked coordinate.

When submerged seagrass obstructs the view of solid seabed, the Bot removes it from above before mining downward. Thin aquatic cover that disappears naturally is recorded in the receipt; every required solid block of original seabed must still be mined.

When box access or another operation moves the Bot away, shared submerged mining first navigates back to the declared water column. Entry retains navigation's cumulative budget; actual entry time does not consume the subsequent dive and mining allowance. Water steering still checks movement progress, breathing, fluids and target reach. The enclosing construction deadline remains effective, and failure does not automatically extend the whole test.

When returning from a flooded pocket beneath the seabed, `SwimToDeckFlow` first calls `SwimToOpenSurfaceFlow` to find a breathable column through loaded, passable connected water. It then swims to the declared deck and boards it. Progress includes both horizontal movement and rising height. If no safe water route exists, the return fails without excavating the roof or adding footholds.

Ordinary mining drops follow the site's recovery policy. In best-effort mode, drops that remain uncollected or merge with other entities and lose precise attribution are recorded as unresolved without stopping wall construction. `resumeSandColumns` continues only a complete prefix physically verified as sand; the precise original seabed height is no longer observable after replacement. Use `/ltv schema BuildPerimeterSandWallFlow` for the entry parameters.

Optional `stagingAreas` supplies up to 16 block-position hints for carried-box operations (empty by default). The shared inventory navigator still checks footing, placement clearance, drop recovery support and reachability. Hints grant no external-inventory access or terrain modification. When continuing a wall whose earlier staging area is distant, supply that hint as well: restoring carried items does not restore an old task’s routing context.

### Perimeter, shaft and workstation

`PreparePerimeterInfrastructureFlow` joins four-sided trench replacement, an isolated scaffold shaft, a white-concrete access road and an outside workstation in one site-preparation operation. It builds the wall's starting footing when needed. Perimeter columns can be open water or continuous solid dry ground. The plan selects a cell in the west wall, fills one sand column on either side of it, then replaces the center with scaffolding. The inner seal remains for interior drainage.

For a water start, `PrepareSandWallStartDeckFlow` raises a sand pillar from a stable seabed. It selects an adjacent continuous water column with open surface headroom and clear placement rays for diving, placing sand and returning to the deck. Kelp does not block swimming but can intercept native clicks, so the flow selects another usable column and preserves neighboring plants. If every adjacent column is obstructed, preflight reports that assistance is needed.

The survey checks every column, its stable foundation, the shaft location, workstation space and the material budget before building. Completion verifies physical blocks and a Bot round trip between the workstation and shaft entrance.

### Continuous construction and clearing

`PrepareAndExcavatePerimeterFlow` builds the four-sided sand perimeter, scaffold shaft, access road and workstation in one execution. It then handles internal fluids and mines the interior layer by layer before returning to the workstation. Each layer must become dry air before the next begins. Completion checks the facilities, the entire cleared volume and the Bot's return position.

```text
/ltv Worker exec PrepareAndExcavatePerimeterFlow {"innerMin":{"x":100,"y":62,"z":100},"size":16,"bottomY":47,"topY":62,"sealBottom":true,"autonomousSupplies":true}
```

`innerMin` is the northwest upper corner of the interior square. The example clears `x=100..115`, `z=100..115` and `y=47..62`, and authorizes a bottom sealing plane at `y=46`. `outputBoxes` defaults to 2, and `headroom` defaults to 3.

The perimeter wall checks hunger at a safe standing position between columns. An active box-unpacking or inventory-turnover operation finishes and returns to the column footing before newly actionable food maintenance starts. The two operations run sequentially. With `automaticFood` enabled, shared food maintenance eats carried food, unpacks carried stock or visits an inventory source, then returns to the work position before wall construction continues.

Each layer retains its final footing near the shaft. Shared navigation reaches that position, using flight equipment when an isolated footing requires it. The Bot lands and aligns before removing the block underfoot through controlled descent onto a verified support surface.

`autonomousSupplies` defaults to `false`, using finite construction materials carried by the Bot. When enabled, shared material demands, Atlas source planning, acquisition and crafting obtain sand, white concrete, scaffolding, fill material and product-storage shulker boxes. Enabling bottom sealing adds its fill budget to the material demand. Initial fill stock covers the maximum demand of one layer. Between layers, construction checks carried stock, replenishes missing materials through the shared acquisition flow and returns to its work position. Sponge mode also prepares a sponge, furnace and per-layer drying fuel. Front and rear storage rows keep the workstation aisles and supply chests accessible; extra product boxes are acquired and placed when needed. For a solid 32³ volume, at least 6 initial output boxes provide up to 24 product-box positions. Prepare tools and travel equipment before construction. See the [Flow reference](../reference/flows#prepareandexcavateperimeterflow) for parameters.

Before construction, `AcquireMaterialsFlow` plans collection and crafting. During construction, additional finished supplies, such as empty product-storage boxes, use `ReplenishSuppliesFlow` to collect the observed deficit under the current material ledger. Cargo, fill and tool reservations remain protected, and `ExcavationResourceTrip` returns the Bot to its work position. Empty storage boxes are acquired as materials; transport boxes carrying stock retain their assigned role.

Between layers, missing construction materials also use `AcquireMaterialsFlow` for collection or crafting. A supply trip can cross dimensions and returns to its departure position at the site. The construction volume, product storage and block operations remain bound to their original dimension; checks and construction continue on the current layer after return.

## Excavation task recovery

```text
/ltv Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

`ResumeExcavation` restores an `ExcavateAreaFlow` area checkpoint by its excavation business `taskId` from the world's `lattivium/excavations/` directory. Checkpoints retain inventory, native drop identities and outstanding recovery obligations. Recovery reconciles these receipts with physical state.

`ExcavateSiteTask` stores its site orchestration checkpoints under `lattivium/sites/`, identified by execution ID, including phases and child task relationships.

## Relationship to infrastructure

`ExcavateSiteTask` orchestrates site excavation. `PrepareAndExcavatePerimeterFlow` joins facility construction and layered clearing under one entry; its receipt records infrastructure and excavation results separately.
