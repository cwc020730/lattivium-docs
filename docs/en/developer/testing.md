# Development tests

`scripts/testctl.py` is the common development test entry. It schedules native GameTests, navigation, material collection and construction scenes, retaining commands, runtime versions, task identities and acceptance evidence for each attempt. Tests do not require additional Minecraft test commands.

Before adding a native fixture, check absolute coordinates and cleanup bounds of other fixtures in its group: GameTests share a world, so overlapping pools or platforms can be overwritten before another Bot executes. Configuration and old drops may persist in that world. A short reproduction should explicitly establish relevant settings and framework prerequisites, such as food and transport headroom, inside its own footprint. Component success with those resources cannot replace a field test of autonomous acquisition from starter equipment alone.

## Cases and attempts

Inspect the case and environment before starting an independent attempt. `run wait` observes completion without extending the execution budget.

```powershell
python scripts/testctl.py case list
python scripts/testctl.py case show command-contract-game-tests
python scripts/testctl.py --env native env check
python scripts/testctl.py --env native run start command-contract-game-tests
python scripts/testctl.py run wait <run-id> --timeout 60
python scripts/testctl.py run verify <run-id>
python scripts/testctl.py report show <run-id>
```

Native tests use the `native` environment. Field scenes use explicitly enrolled server environments and frozen case files. Admission checks the world, ports, resource limits and snapshot footprint. Independently declare expected physical results: task success alone is insufficient acceptance evidence.

### Pickup timing controls

`dry-pickup-comparison` sequentially runs immediate and existing batched pickup on the same recorded 8×8 dry slice. `layered-dry-pickup-comparison` also checks the actual layered caller, strict/wet/sponge/unknown/large-area selection, cancellation and existing resume contracts, followed by Java checks.

```powershell
python scripts/testctl.py --env native run start dry-pickup-comparison --timeout 360
python scripts/testctl.py --env native run start layered-dry-pickup-comparison --timeout 600
python scripts/testctl.py --env native run verify <run-id>
```

Use these commands separately, waiting for the previous run to finish. Both arms receive identical tools, elytra, food, replenished fireworks and finite transport headroom. Verify cleared overhead geometry, container protection spacing and supply waterlines before timing. Keep hard difficulty and real hunger; disable spawning and random block ticks to hold the comparison terrain fixed. Final checks cover physical air, item balances, tool/box/equipment/fuel components, source inventory and outside states.

Quantity checks cover both depot receipts and the native total of stored, carried and ground items. `Abandoned` records historical disposition; `Carried` and `Uncollected` record final inventory and ground quantities. Later incidental pickup can make these differ. Do not treat historical abandonment as permanent loss or use it to overlook unexplained extra items.

This supplied component fixture does not establish autonomous startup with only three rocket stacks. A single ordered pair can still reflect cache and terrain effects. Report both durations and ordinary drop losses. Retain failed setup time as development cost rather than attributing it to the operation being measured. If projected field work still exceeds its original budget, measure one actual layer before another full run.

## Checkpoints and replay

Pause and save a checkpoint before a destructive operation. Preserve the failed report, repair the code and create a new replay attempt.

```powershell
python scripts/testctl.py --env dev run start <case-file> --pause-before <stage-id>
python scripts/testctl.py checkpoint save <run-id> --label before-operation
python scripts/testctl.py run resume <run-id>
python scripts/testctl.py run replay <run-id> --from <checkpoint-id>
python scripts/testctl.py run verify <replay-id> --replay-suffix
```

A checkpoint restores enrolled world regions, entities, players and database state. It is not an instant undo for arbitrary operations. Replaying only the remaining stages produces explicit suffix coverage rather than a whole-case pass.

## Refresh and recovery

```powershell
python scripts/testctl.py --env dev code refresh --mode auto
python scripts/testctl.py run cancel <run-id>
python scripts/testctl.py run recover <run-id>
python scripts/testctl.py --env dev env status
python scripts/testctl.py --env dev env stop
python scripts/testctl.py artifacts prune --keep-days 7
```

Method-body changes can use the existing HotSwap support. Signature, field and entry-index changes require restart. Do not edit Java, test-framework sources or build outputs, or restore worlds during frozen acceptance runs. After controller interruption, reconcile its owned tasks, Bots, measurement windows and chunk tickets before starting another attempt. Cleanup previews do not delete worlds or protected baselines.

After a computer or JVM restart, the old execution stack and in-memory measurement window are gone. `run recover` compares recorded runtime identities and records a departed JVM's window as interrupted without fabricating timing samples. A surviving original JVM must still stop its exact native phase. Missing runtime identity refuses cleanup, and the original interrupted report and failed recovery receipts remain intact.

Cleanup neither rolls back construction nor resumes the old task. Replay a before-operation checkpoint when available. Without one, first stop the server and reconcile saved blocks, facilities, Bot equipment, packed components and all source inventories. Freeze that actual scene and continue the unfinished part through an existing component entry. Keep the exact saved provisions and cumulative failure/time costs; component continuation does not establish fresh autonomous whole-site acceptance.

New evidence files use compact UTF-8 JSON; CLI output remains indented. This removes formatting whitespace while preserving all fields, traces, counts and components. Historical indented files remain readable, and saved failure reports and signatures are not rewritten. The environment's `maxArtifactBytes` bounds retained evidence. Inspect actual usage, retention dependencies and free disk space before pruning or adjusting this budget.

## Temporary state observation gaps

Polling uses a filtered Bot summary. It reads the full exact event at an ownership, terminal or resource-wait transition. When the server thread exceeds the request scheduling deadline, the host returns `503 / SERVER_THREAD_TIMEOUT`: this observation is unavailable; it is not a construction-task failure.

The shared observation entry retries only this explicit read-only response within a window of at most ten seconds, retaining the original stage deadline and cancellation boundary. It records gaps and recovery in `state-observations.jsonl`; persistent unavailability stops the attempt with failure evidence. Other HTTP errors, lost connections, commands and measurement mutations are not retried. An observation failure never authorizes resubmitting a task.

The short native case checks the actual HTTP timeout response and a healthy summary:

```powershell
python scripts/testctl.py --env native run start debug-observation
python scripts/testctl.py run verify <run-id>
```

This component pass does not establish whole-site acceptance. Field verification still requires the exact task terminal and independent terrain, facility and inventory audits after normal shutdown.

## Work while long tests run

Use waiting time for documentation corrections, reviews of shared responsibilities or small preparations for the next stage. Choose an independent task that can produce a result in roughly 5–10 minutes; record findings that still need validation and avoid unbounded repository-wide refactoring. Freeze the running Java, build outputs and world state. Verify independent changes separately rather than using an older candidate's pass as evidence for new code.

Record the test's actual start time, estimated duration and progress signals, and review progress about every 10 minutes. Prioritize verification and continuation when it completes or fails. Keep using `testctl` results and run identities; avoid duplicate attempts or frequent full-trace reads.

```powershell
python scripts/testctl.py run status <run-id>
python scripts/testctl.py run wait <run-id> --timeout 60
```

`RUNNING` means the attempt has not ended; it does not establish that a construction step is complete. Cross-check the actual task, Bot position and completed-operation receipts. Count road-clearance excavation separately from the target area's layers. Live block samples establish progress; final acceptance still independently audits the complete frozen region and source inventories after normal server shutdown.

## Construction scenes

The `construction` fixture shares the same server lifecycle and submits public `ExcavateLayeredAreaFlow`, `PreparePerimeterInfrastructureFlow` or `PrepareAndExcavatePerimeterFlow` commands. Frozen input declares starter stock, original terrain, permitted changes and final blocks. Perimeter scenes also freeze the native shaft, road and workstation plan.

After construction, audit the selected entry's receipts and protected tools/boxes, stop normally and independently decode saved blocks and container inventories. Facility preparation and complete construction have separate acceptance. `mode: "SOURCE_PRESERVING_DEBUG"` uses the common acquisition flow's source-preserving test mode; autonomous supplies additionally require source inventory evidence and cannot be established by a pre-equipped fixture.

A prepared `ExcavateLayeredAreaFlow` scene checks completed layers, dry air, output depots and inventory protection, and supports `sealBottom: true`. It shares the bottom contract with `PrepareAndExcavatePerimeterFlow`: observe and authorize the complete plane at `minY-1`, independently declare its dry final blocks, and verify every native `bottomSeals` position without omissions, duplicates or foreign cells. Existing dry solid floor keeps its original material; water and air holes explicitly declare their fill. The saved full-state audit still checks waterlogging and changes outside the footprint after normal shutdown.

```powershell
python scripts/testctl.py --env native run start construction-bottom-contracts
python scripts/testctl.py --env dev run start construction-bottom
```

The first case runs the framework contracts and existing native wet, aquatic, buried and connected-pocket floor tests. The second shares the scene seed/execute lifecycle and verifies eight preserved natural stone cells plus one filled water hole. Wait for and verify the returned run IDs sequentially. The prepared component still has no workstation-return assertion; complete construction checks the actual return separately. A retained-field component continuation also cannot replace fresh autonomous whole-site acceptance.

### Water-column and sand-wall components

The same `construction` fixture can select `ClearAndSettleWaterColumnFlow` or `BuildPerimeterSandWallFlow`. A column declares its top, bottom, underwater operation lane, return lane and dry deck. A wall declares its inner size, vertical bounds and starting deck. Freeze expectations for every sand cell, the return deck's foundation and its headroom. Return checks preserve the native safe stance: the Bot may stand over the deck edge, but its body must overlap that deck while grounded and alive.

Declare underwater breathing or fire resistance in the scene's `effects` list, with `id`, `seconds` and `amplifier`. These are test conditions, not changes to production supply rules. `resumeSandColumns` admits an existing wall prefix only when the frozen terrain proves every prefix cell is already sand; the physical audit still covers the whole wall. Checkpoint replay repeats the same operation without fixed historical test-site identifiers.

### Dry shaft, road and workstation

`PrepareSiteInfrastructureTask` takes explicit `admittedChunks`: each `x`, `z` pair is a chunk coordinate, not a block coordinate. Surveying and Bot movement stay inside these loaded chunks. The command does not read local site manifests or expand permission implicitly. The shaft root, bottom stance, road and workstation must form one safely traversable layout.

A dry `construction-survey` request declares `entry`, `arguments` and `preferredStart`. This read-only stage returns the layout to freeze. The common `construction` fixture then submits the same public command and checks scaffolds, road clearance, floor, containers and the station-to-bottom round trip. An observation-budget refusal is diagnostic, not proof that the terrain has no solution. Synthetic `seed` only prepares terrain; execution still needs its complete frozen layout.

For integrated perimeter scenes, `start` is the preferred survey search position and may be in water. Before equipping the Bot or submitting its task, the common fixture rechecks the frozen layout and places the actor at the native survey's safe `start`. That point must remain inside the observed scene. Receipts retain both `preferredStart` and the resolved `initialStart`; the construction coordinates do not move. Explicit dry-site and prepared-layer starts retain their existing contracts.

### Fixed-size complete site execution

`ExcavateSiteTask` shares read-only observation, frozen layouts, execution and checkpoint replay. Its public entry has a fixed 16×16×5 excavation. Acceptance checks all 1,280 dry-air cells, bottom supports, scaffolds, roads, workstation containers and the Bot's return, rather than trusting task success alone. Partially precleared small scenes verify the lifecycle and do not replace full-solid or real-terrain acceptance.

The frozen `kit` may contain full shulker boxes. Before startup or world mutation, the controller checks each complete RCON command's length. An oversized atomic item command is refused explicitly; provisions are never silently reduced. Replay uses the same offline checkpoint with a new attempt identity and retains the original failure.

Full perimeter construction may deploy additional output shulker boxes in the workstation's reserved positions. The audit derives those positions from the frozen layout and checks physical boxes, contents and task receipts. Unused empty positions do not count as boxes. Long excavations therefore retain the same inventory and physical acceptance rules.

### Hostile suppression in construction tests

Construction tests retain Hard difficulty, hunger and survival while disabling natural mob spawning, spawners, phantoms, patrols, wardens and raids. Isolated development environments owned by `testctl` also remove existing and newly loaded hostile-category entities while preserving passive mobs, drops, containers and terrain. This is a test condition, not production combat or avoidance behavior. A mismatching environment identity or world path refuses protection rather than treating a production world as a test environment.

Real-terrain acceptance sets `withoutSaturation: true` at the scene's top level. Before execution and at completion, the fixture reads the Bot's actual game mode and effects, requiring survival without saturation. When omitted, short fixtures use saturation to isolate other features; they do not establish real-hunger supply acceptance. Explicit water-breathing and fire-resistance `effects` are recorded separately.

### Autonomous source audits

Complete construction scenes can enable `autonomousSupplies: true` and declare `stockSources`, each with a `dimension` and `position`. These are existing storage locations, not inventory grants. The common material-acquisition flow performs withdrawals. Sources must be outside the authorized construction footprint, with their neighborhoods included in the environment's checkpoint regions.

After startup, the native Atlas observer verifies source admission instead of trusting classification from a previous server process. Offline before/after audits decode all indexed physical inventory NBT and compare contents and components. Only declared workstation and output containers may change; protection metadata changes are reported separately. A newly discovered source outside the construction footprint needs a surveyed, frozen inventory baseline before acceptance.

`stockSources` declares fixture preloads and admission checks, not the acquisition flow's exclusive source list. A location still classified `UNKNOWN` after cold startup is not admitted. Preloads may use currently verified locations while retaining rejected locations and reasons; the all-indexed-container inventory audit still covers them. Missing neighbor information remains an Atlas issue to investigate, not evidence that stock is absent or permission to force admission by editing the index.

### Native test clock

Native GameTests run unpaced by default. A case waiting for asynchronous chunk or POI reads can declare `parameters: {"ticksPerSecond":20}` to use the ordinary game rate while preserving its assertions and tick limits. This affects only the test server. Omitted values or `0` retain the fast loop; explicit positive integer rates range from `1` to `200`.

Field construction scenes instead use `parameters.tickRate`, which defaults to `20`, accepts `1–200` and rejects `0`. Faster game ticks do not proportionally accelerate asynchronous database planning or chunk reads, but do spend tick-based operation budgets faster. Start cold autonomous acquisition at `20`; accelerate physical construction only after acquisition and return complete. Recheck the rate if another cold asynchronous supply operation begins.

The framework currently sets the initial scene rate; it does not automatically recognize child flows and switch rates. Record server acknowledgements and the actual phase for additional adjustments, preserving the attempt's original time limit. Distinguish wall time, game ticks and rate in reports; accelerated minutes do not represent construction time at the ordinary game rate.

Long construction can travel for supplies again between layers. If those transitions cannot be tracked reliably, keep the entire autonomous-supply scene at `20` rather than leaving it accelerated after its first collection. Historical trace nodes still marked `STARTED` may already have ended; they alone cannot establish the active child operation or justify a rate change.


### Shared native chunk leases

Native fixtures share `FieldSiteChunkPins`, keyed by the actual ServerLevel and
ChunkPos. Only the last overlapping owner releases a ticket originally created
by fixtures. Pre-existing external tickets survive, and repeated cleanup cannot
release another owner's reference. Crafting fixtures and RecordedGeometry use
this owner, including startup failure cleanup, instead of private counters or
unconditional ticket removal.

```powershell
python scripts/testctl.py --env native run start fixture-chunk-ownership
python scripts/testctl.py run verify <run-id>
```

The gate includes six ownership controls, 33 existing crafting regressions and
Java check. This verifies test-resource lifecycle. Other older fixtures and
Python multi-actor leases still need migration; it does not establish complete
fixture unification. Field-state, source-inventory, tool and box audits remain
separate obligations.
