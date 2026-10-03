# Development tests

`scripts/testctl.py` is the common development test entry. It schedules native GameTests, navigation, material collection and construction scenes, retaining commands, runtime versions, task identities and acceptance evidence for each attempt. Tests do not require additional Minecraft test commands.

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

New evidence files use compact UTF-8 JSON; CLI output remains indented. This removes formatting whitespace while preserving all fields, traces, counts and components. Historical indented files remain readable, and saved failure reports and signatures are not rewritten. The environment's `maxArtifactBytes` bounds retained evidence. Inspect actual usage, retention dependencies and free disk space before pruning or adjusting this budget.

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

After construction, audit the Bot's return and protected tools/boxes, stop normally and independently decode saved blocks and container inventories. Facility preparation and complete construction have separate acceptance. `mode: "SOURCE_PRESERVING_DEBUG"` uses the common acquisition flow's source-preserving test mode; autonomous supplies additionally require source inventory evidence and cannot be established by a pre-equipped fixture.

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

### Native test clock

Native GameTests run unpaced by default. A case waiting for asynchronous chunk or POI reads can declare `parameters: {"ticksPerSecond":20}` to use the ordinary game rate while preserving its assertions and tick limits. This affects only the test server. Omitted values or `0` retain the fast loop; explicit positive integer rates range from `1` to `200`.

Field construction scenes instead use `parameters.tickRate`, which defaults to `20`, accepts `1–200` and rejects `0`. Faster game ticks do not proportionally accelerate asynchronous database planning or chunk reads, but do spend tick-based operation budgets faster. Start cold autonomous acquisition at `20`; accelerate physical construction only after acquisition and return complete. Recheck the rate if another cold asynchronous supply operation begins.

The framework currently sets the initial scene rate; it does not automatically recognize child flows and switch rates. Record server acknowledgements and the actual phase for additional adjustments, preserving the attempt's original time limit. Distinguish wall time, game ticks and rate in reports; accelerated minutes do not represent construction time at the ordinary game rate.
