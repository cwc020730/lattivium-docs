# Site clearing

Clearing empties a selected volume and accounts for excavation products, fluid operations and outstanding obligations. It can run on its own or as part of one execution that also builds the perimeter, shaft, road and workstation.

## Area clearing

`ExcavateAreaFlow` accepts inclusive bounds in the current dimension, with a maximum of 64 blocks per axis and 32,768 blocks in total. Prepare tools, finite empty shulker boxes, fill material and storage positions outside the area.

```text
/ltv Worker exec ExcavateAreaFlow 100 64 100 104 66 104 98 64 100
```

The flow mines from top to bottom, verifies collection and deposits cargo when capacity is limited. Protection conflicts involving machines, containers or portals report their positions. See the [Flow reference](../reference/flows#excavateareaflow) for parameters.

### Layered clearing

`ExcavateLayeredAreaFlow` clears a prepared, isolated volume. On each layer, the Bot replaces internal fluid with fill material, mines the blocks, and verifies that the entire layer is dry air before descending. `egress` is an access cell inside the bottom layer. `depots` declares existing shulker boxes that may contain ordinary items; the entry reads their loaded native contents, verifies them during use and retains the existing cargo. `additionalDepots` declares supported free positions for product storage. The depot list may be empty, but at least one storage position is required across the two lists. The Bot places an empty box when storage is needed. With `autonomousSupplies`, it obtains missing boxes through the shared supply flow, so every depot need not be placed in advance.

Fill placement extends from existing support into adjacent fluid cells, growing a construction frontier. Shared native support and interaction-ray checks decide placement feasibility; common navigation supplies arrival. Enabled underwater navigation may use a valid water stance without a layered-task restriction on routes or minimum height. The entire layer must be dry air before descending to the next one.

Residual-fluid filling uses the same supported frontier. When the target and all neighbors are loaded but no usable support face exists, the public placement goal rejects before searching. Unknown or unloaded state is not treated as absent support. If liquid remains with no placeable or drainable candidate, filling reports the missing support frontier; an empty candidate set is not successful clearance. Operations requesting a specific support face continue to honor it.

Within a layer, the Bot may stand on remaining blocks or enter cleared cells with reliable support below. A layered-task label does not impose a minimum mining-pose height; only an explicitly declared minimum-feet contract constrains navigation height. Shared mining and navigation still validate actual support, collision, interaction rays and fluid safety. Placement and product recovery also use their shared interaction goals, UUID contact and return contracts, without separate construction routes.

A double-height plant can span two layers. Mining its upper half may also remove the lower half when both lie within the parent flow's authorized excavation volume. The mining target must still belong to the active layer, and this permission does not authorize removing the plant's support block. A standalone single-layer operation still refuses a plant half outside its declared volume.

```text
/ltv Worker exec ExcavateLayeredAreaFlow {"min":{"x":100,"y":47,"z":100},"max":{"x":115,"y":62,"z":115},"egress":{"x":100,"y":47,"z":107},"depots":[{"x":94,"y":64,"z":107}]}
```

The receipt lists completed layers, mined cells, fluid-preparation cells, depot contents, and any ordinary drops abandoned under best-effort recovery. The perimeter seal, scaffold shaft, road and workstation are prepared through [site planning](./planning). See the [Flow reference](../reference/flows#excavatelayeredareaflow) for all parameters.

## Product recovery

Strict recovery requires the corresponding drop obligations to be settled. Best-effort recovery collects ordinary excavation products within configured distance and active-time budgets, recording abandoned items and coordinates.

Aquatic vegetation clearing and temporary road seeds use the shared collector's policy, execution budget and disposition. Their parents do not implement another clock, distance cancellation or loss reconciliation. Bound native UUIDs are observed directly even beyond the nearby discovery window; inventory gained from another matching UUID cannot prove their recovery. Component anomalies or acknowledged cargo disappearing during return propagate as failures, rather than becoming loss-success.

Tools, borrowed shulker boxes, sponges and delivery cargo retain their own return or delivery obligations. The owning task selects the recovery policy.

Current sponge work prefers removal from above the sponge. Mining, underwater arrival and pickup remain owned by their shared systems. An authorized, genuinely unrecoverable wet sponge can be recorded as a loss; only physically recovered quantities enter drying demands. Abandonment is never a drying receipt. Temporary furnaces retain strict recovery: inventory gained from another matching item entity cannot settle the original furnace UUID.

Item custody and completed return are separate outcomes. The shared collector validates native UUIDs, exact components and inventory gain, then rechecks custody on failure or cancellation. Received wet sponges or strictly protected furnaces can settle their item obligations while a failed return still fails the operation; it does not start drying or advance another layer. Later cargo loss, changed components or dirty child cleanup prevent an earlier receipt from releasing protection.

### Batching ordinary dry-layer drops

Layered excavation delegates recovery policy to the same `ExcavateAreaFlow`. BEST_EFFORT ordinary work reuses the existing batch collector for loaded sections of at most 1536 cells. Wet layers first use the existing fluid preparation; once drained, they use the same batch contract. A 32×32 layer has 1024 cells and fits this bound, which does not establish whole 32³ acceptance. Strict recovery, native sponge targets, unloaded and oversized sections do not automatically enable batching. Explicit single-area entries retain their chosen pickup mode.

A batch records native drop identities and the initial inventory. It settles at 128 native receipts, 1200 execution-budget ticks, inventory or preparation transitions, or when the next work position escapes the recovery radius. The task supplies facts such as food, fuel, empty slots and completion; the pending batch settles before preparations that change inventory. It uses the same `CollectMiningDropsFlow`, recovery budgets, cancellation checkpoints and depot storage.

Each receipt retains its source and any owned-material obligation. Ordinary recovered products enter the cargo ledger; recovered temporary fill does not become new cargo. Live or merged native entity counts bound attributable inventory gains. Credit is assigned only after the whole batch verifies; rejection leaves no partial ledger updates. UUID accounting is attribution, not proof of touching that particular entity. Tools, carried-box components, supply stock, loans and delivery obligations retain separate checks. Measure products alongside speed; a short comparison does not establish whole-site throughput.

New checkpoints use version 17 and retain sources, UUIDs, quantities and consumed recovery budgets across cancellation and restoration. The physical slot snapshot remains the 36 main-inventory slots; recovery quantities delegate to shared L0/L1/owned-L2 observation, including legitimate packing and offhand changes. Restoration authenticates saved slots, components, equipment and offhand state before reconstructing carried stock and reconciling native receipts. Older records with pending pickup lack this quantity baseline and require physical reconciliation before automatic restoration; older records without pending pickup remain compatible. Reconciliation can reduce credited recovery and never resets the consumed budget.

Abandonment records the decision to stop pursuing a drop at that time. Later movement may pick it up, and shared inventory observation still includes it. Report historical abandonment, final ground items and final carried items separately; abandonment does not establish permanent loss.

The 2026-10-04 layered 64-cell comparison at 20 TPS measured 100.18 seconds for immediate pickup and 62.78 seconds for batching, with physical clearance and protected stock verified. Batching recorded 23 abandoned items; six were carried and 17 remained on the ground at completion. This small component test does not establish autonomous whole-site supply, sponge drying, bottom sealing or return.

A fresh plains 16³ run on 2026-10-05 completed autonomous supply, infrastructure, all 16 layers, bottom verification and actual workstation return from the minimal starting kit. The operation used 583.859 seconds and 260653 game ticks, averaging a measured 446.431 TPS. Independent verification covered 4096 dry-air cells, 256 floor cells, protected items, source stock and changes outside authority. The same tick count at 20 TPS is about 217.21 minutes versus 9.73 minutes here; this is an equivalent estimate, not a paired benchmark. Tools retained the unbreakable fixture limitation, so durability and repair were not accepted. This dry run had no sponge cycles; wet sites and 32³ long runs still require separate evidence.

A fresh river 16³ run on 2026-10-06 completed the whole workflow from the same minimal kit, starting with 2323 water cells. The operation took 22 min 39 s and the controller 24 min, averaging a measured 505.293 TPS. Of 95 sponge absorptions, 92 actually recovered the wet sponge and completed native furnace drying and furnace recovery. Three unrecovered cycles retained identity and position records; final carried stock included one dry and no wet sponge. Independent audits after shutdown verified 4096 dry-air cells, 256 floor cells, facilities and actual workstation return; existence states of all 30531 original source records, contents of existing inventories and states outside authority were preserved, along with three carried boxes, two output boxes, tools and equipment. At that point, fresh autonomous full16 acceptance was plains and river, 2/4; the subsequent ocean result is below. The unbreakable-tool fixture still does not establish durability or repair. Historical abandonment is not proof of permanent loss, and unrecovered sponges are not counted as successful drying.

A fresh ocean 16³ run on 2026-10-06 completed the whole workflow from the same minimal kit, starting with 3916 water cells. The operation took 42 min 59.625 s and the controller 44 min 34 s, averaging a measured 401.592 TPS; the configured 3000 TPS cap is not measured speed. Shutdown audits verified 4096 dry-air cells, 256 floor cells, facilities and actual workstation return, with zero changes outside authority across 443625 observed cells. Existence states of 30535 original source records and contents of 30521 existing inventories were preserved, along with tools, equipment and boxes. Native aggregate results reported 187 sponge cycles; direct diagnostics verified 162 wet-sponge recoveries and native furnace drying/recovery receipts. Event registration reached its 200000-entry cap, leaving 23 aggregate cycles without direct receipts; these are not counted as directly proven drying. Independent physical and inventory audits passed. At the time of that ocean run, fresh autonomous full16 acceptance was plains, river and ocean, **3/4**; the latest swamp result follows below. Tool durability and repair remain outside the fixture evidence.

On 2026-10-08 a fresh swamp 16³ run completed the whole workflow from the minimal starting kit. The operation took 1789.141 seconds (about 29 min 49 s) and the controller 1918.610 seconds, averaging a measured 276.501 TPS. Independent shutdown audits verified 4096 dry-air cells, 256 floor cells, facilities, actual workstation return, tools, equipment and boxes. Eight wet sponges were actually recovered and dried in native furnaces. One unrecoverable sponge was recorded as a loss and is not counted as successful drying.

The original signed report retains its failure under the old audit criteria. A separate assessment applied the approved criteria: contents of source containers protected by Atlas flags at the test's start need not retain identical hashes, while existence and index coverage remain checked; 6977 eligible sources retain strict content verification. Content changes in four protected hoppers and four incidental mushroom losses remain recorded without blocking acceptance. This assessment reused the same real whole execution, with no rerun or combination of components. Historical whole16 evidence for plains, river, ocean and swamp is now **4/4 across different candidates**, not four-site acceptance of one current version. The wet32 long run and remaining small terrain regressions are still pending; tool durability and repair remain uncovered.


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

The grid grows outward from the layer's access cell. Candidate cells must first have a neighboring block that provides placement support; distance to the access cell then determines their order. At a corner, this fills the connecting cell before selecting a closer water cell with no support on any face. Selection reuses the common placement-support check; navigation, native clicking and the actual working stance still require validation by their shared capabilities.

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

In cross-section, the partition, chamber water, and sponge occupy the same active layer `Y`; the sponge is inside the chamber. The cleared layer `Y+1` is air. Below it may be deeper water within the declared authority or existing solid ground:

```text
Y+1     air   air    air    air   air
Y       wall  water  sponge water wall
Y-1     authorized water or existing solid ground
```

Grid candidates no longer require a dry solid floor beneath the entire chamber. Native absorption checks still cover the complete effect authority, loaded surroundings and protected infrastructure: authorizing only the current layer does not authorize removing water below it. Working poses, wet-sponge pickup and return use shared navigation; losing a route after drainage cannot count as reaching a raised deck. Chambers that cannot execute safely use fill material and retain the reason. Every completed layer is verified as dry air. The mode uses physically carried sponges, furnace and fuel, with receipts for placement, recovery and drying. Filler fallback is not sponge acceptance evidence.

Standing on the target before mining is a shared mining pose preference, separate from an explicitly authorized shaft descent. Its landing after removal uses navigation's read-only collision and fall checks: a safe short fall or deep-water landing may admit the pose, with actual state rechecked before the effect. When the preference is unavailable, shared navigation and recovery still own the operation. Native controls cover safe falls, pickup inside a water well, terrain changes during approach and cancellation; they do not guarantee recovery of every drop in open deep water.

Before drying, shared inventory readiness prepares the furnace, wet sponge and fuel together as directly usable stock. Drying waits for an active unpacking or packing operation to settle before checking the temporary furnace location again. Stock may temporarily be in a placed box during that operation, so carried counts alone cannot establish a shortage. If failure or cancellation leaves a box unrecovered, its location and recovery obligation remain explicit; construction cannot treat that as an optional drying failure and continue.

The shallow-pit water-column exit applies to an already cleared volume up to four blocks deep and 8×8 horizontally, with a sealed floor and sides in a dimension that permits water. The Bot places water, swims out, collects it and verifies 100 consecutive empty ticks.

### Deep-water sand perimeter

`BuildPerimeterSandWallFlow` builds a one-block-thick sand ring around an inner square of 6, 12, 16 or 32 blocks per side. Each column can be up to 96 blocks tall. For each column, the Bot mines the authorized seabed from the top down, drops real sand from a dry working deck, then uses the completed wall top as the next deck. `bottomY` and `topY` set the wall height; `minimumOriginalSeabedBlocks` sets the minimum penetration into the original seabed for every column.

The plan needs a supported starting deck, a solid foundation beneath every column, a continuous outer water lane for mining and return, enough sand and tools, and underwater survival supplies. Preflight reports the position of any unmet condition. Completion checks the physical blocks, remaining supplies and the Bot's return to the starting deck.

`innerMin` is the northwest corner of the inner square. Construction starts at the northwest corner of the outer ring and proceeds along its north edge. `startDeck` is the Bot's feet position, west of the first outer column and one block above `topY`. Build its supported floor before invoking the entry; preflight checks the starting position and supplies. The exterior water lane must remain continuous, or preflight reports the blocked coordinate.

When submerged seagrass obstructs the view of solid seabed, the Bot removes it from above before mining downward. Thin aquatic cover that disappears naturally is recorded in the receipt; every required solid block of original seabed must still be mined.

Column preflight and mining share `AquaticVegetation.supports` for seagrass, tall seagrass and kelp. Both halves of tall seagrass must lie within the declared mining area; a lower half that disappears after harvesting the upper half is recorded separately. Kelp in the adjacent swimming lane does not become authorized for removal merely because it blocks a side ray. The Bot works from directly above the target column and retains the native ray and underwater stance checks.

When box access or another operation moves the Bot away, shared submerged mining first navigates back to the declared water column. Entry retains navigation's cumulative budget; actual entry time does not consume the subsequent dive and mining allowance. Water steering still checks movement progress, breathing, fluids and target reach. The enclosing construction deadline remains effective, and failure does not automatically extend the whole test.

When returning from a flooded pocket beneath the seabed, construction requests the declared deck through shared `LocalNavigationFlow`. The same navigation and air systems handle three-dimensional underwater movement, breathable positions and native breathing; the old private ascent and boarding flows have been removed. Return still requires a native dry stance, health and collision checks. If no legal route exists, it fails without excavating the roof or adding footholds. Surface and submerged mining use the same air-preparation interface.

The shared air budget reads vanilla `OXYGEN_BONUS`, converts expected work and return ticks into air consumption, and retains variation headroom plus a 40-point air reserve. Without an oxygen bonus it retains one air point per tick. Respiration's random savings are not a guarantee: execution still checks actual air every tick and restores breathing through shared navigation, without assigning air or granting effects. The 32-block-deep native column regression passed actual mining, settled sand, full health and a dry return twice using only a Respiration III helmet. Shallow-water, low-air return and cancellation controls also passed. These component results do not establish whole wet 32³ acceptance.

Ordinary mining drops follow the site's recovery policy. In best-effort mode, drops that remain uncollected or merge with other entities and lose precise attribution are recorded as unresolved without stopping wall construction. `resumeSandColumns` continues only a complete prefix physically verified as sand; the precise original seabed height is no longer observable after replacement. Use `/ltv schema BuildPerimeterSandWallFlow` for the entry parameters.

If the saved Bot is at an inventory staging area, resume first verifies the completed prefix, then uses shared navigation to reach its declared handoff deck: above the last completed column for a partial wall, or the start deck for a complete wall. Arrival still rechecks the wall, remaining columns and materials. Restoring carried items requires no manual Bot repositioning and does not replace physical verification. Cancellation, cleanup and the enclosing deadline remain effective; an old task's budget is not automatically extended.

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

The perimeter entry currently supports `size` values **6, 12, 16 and 32**, rather than every integer in that range. It always builds all four sand walls; unsealed and automatic side policies are not yet integrated into this complete entry. `sealBottom` controls only the bottom plane: setting it to `false` still builds the side walls.

The independent dry infrastructure entry, `PrepareSiteInfrastructureTask`, can build a shaft, road and elevated workstation, with a currently fixed 16×16 site layout. Its size and plan contracts differ from the perimeter entry. It does not establish complete unsealed tower construction at arbitrary sizes. Workstation selection beneath overhead obstacles and the unified side policy still require further acceptance testing.

The perimeter wall checks hunger at a safe standing position between columns. An active box-unpacking or inventory-turnover operation finishes and returns to the column footing before newly actionable food maintenance starts. The two operations run sequentially. With `automaticFood` enabled, shared food maintenance eats carried food, unpacks carried stock or visits an inventory source, then returns to the work position before wall construction continues.

Each layer retains its final footing near the shaft. Shared navigation reaches that position, using flight equipment when an isolated footing requires it. The Bot lands and aligns before removing the block underfoot through controlled descent onto a verified support surface.

Deep-water filling prefers to grow its working floor outward from existing support near the shaft. Mining removes that floor from the far end back toward the shaft. This ordering selects construction targets without adding route or stance-height restrictions. Arrival uses shared navigation; candidate and live placement checks share native support, interaction-ray and body-collision geometry. With underwater capability enabled, legal surface or submerged stances are available. Placement must not enclose the Bot in the target block, and a valid candidate never replaces the final live check.

With a prepared perimeter, shaft and workstation, [`ExcavateLayeredAreaFlow`](../reference/flows#excavatelayeredareaflow) runs the excavation phase independently. It uses the same supply and drainage implementation as complete construction: `mode` defaults to `REAL` and `drainageMode` to `SOLID_FILL`. Sponge-grid mode requires explicit workstation `furnace` and adjacent `furnaceFeet` positions. Declared existing output boxes may contain plain items. The entry snapshots their loaded native contents and rechecks that receipt during use, preserving old cargo separately from new excavation output. Unloaded boxes or item components outside this plain-content contract are refused. Additional depot positions remain free cells for empty carried or acquired boxes.

`furnace` is a temporary placement cell: it starts as air, has a reliable floor, and must satisfy the surrounding safety checks. After drying a sponge, the Bot mines and recovers its carried furnace, so the cell returns to air at verification. `furnaceFeet` is the adjacent standing cell.

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

On 2026-10-07 the swamp full run failed during surface-to-submerged navigation after successful autonomous acquisition. A small saved-terrain reproduction showed that upward bobbing clearance had incorrectly constrained downward swim entry. The shared navigation fix preserves surface headroom, disabled-underwater policy and native collision checks; a bounded short-route probe still falls back to the full flight graph without increasing planning allowances. The original failure passed twice, followed by 22 native water-interaction, search-budget, flight-fallback and headroom controls plus build checks. This establishes a component repair, not fresh swamp whole-run acceptance; complete 16³ acceptance remains **3/4**.

The original first column then passed in the saved field with the same stock, item components and position: 23.391 seconds of task operation, 54.360 seconds for the stage including preparation, and 139.582 seconds for the controller including startup, shutdown and audit. It mined 14 blocks, settled 16 sand blocks, recovered all 14 drops and returned alive to the dry platform. Full-state audits found only the 16 column changes and zero changes outside authority; all 30,540 original source inventories, tools and equipment were preserved. Actual cost was deducted from the original budget. No terrain reset or extra stock was used, and this retained component does not count as a fresh whole run.

Another fresh swamp start drowned while waiting for supplies. The test framework had converted the native survey's lily-pad node to an integer height, losing the physical support height. It now consumes the shared geometry's position directly, including slabs and carpets, and refuses missing, inconsistent or out-of-bounds positions. Saved-terrain idle, partial-support and dry/aquatic-start controls, 185 framework regressions and build checks passed. The failed field's terrain and source stock were unchanged, with tools and equipment retained in saved player data. Complete acceptance remains **3/4**; this repair is not a swamp whole-run pass.
