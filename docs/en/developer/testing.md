# Development tests

`scripts/testctl.py` is the common development test entry. It schedules native GameTests, navigation, material collection and construction scenes, retaining commands, runtime versions, task identities and acceptance evidence for each attempt. Tests do not require additional Minecraft test commands.

Before adding a native fixture, check absolute coordinates and cleanup bounds of other fixtures in its group: GameTests share a world, so overlapping pools or platforms can be overwritten before another Bot executes. Configuration and old drops may persist in that world. A short reproduction should explicitly establish relevant settings and framework prerequisites, such as food and transport headroom, inside its own footprint. Component success with those resources cannot replace a field test of autonomous acquisition from starter equipment alone.

Coordinate isolation and chunk-ticket ownership are separate concerns. New fixtures needing forced chunks should reuse the existing `FieldSiteChunkPins` lease and release their own lease during cleanup. It counts shared holders and preserves an external forced-load baseline. Spacing fixtures apart does not prove that overlapping holders cannot unload chunks needed by another task. Some older fixtures still force chunks directly; an existing gate passing does not establish that every caller has migrated.


For frozen construction scenes, `preimage` covers the whole observation box; `expected` declares dry operation results and retained facilities. Naturally waterlogged cave plants left unchanged in observation margins are not drainage targets. The common audit still compares exact native states outside authorized effects. Preserve a failed signed attempt after an authoring error; supplemental review cannot rewrite it or grant new full-flow acceptance.

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

Load enrolled field neighborhoods and await source readiness before spawning the survival actor. World warmup advances native time and can drown an actor left underwater. Source readiness does not own a separate tick rate; the declared test rate applies once preparation is complete.

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

Reconstructing inventory and a starting pose through a construction case's `kit` creates a component fixture; it does not restore complete player state or an arbitrary execution stack. Check air, health and hunger history separately. Matching inventory counts cannot establish that a submerged continuation pose is safe. Preserve native low-air refusals, then replay a real checkpoint or explicitly declare a new safe start. Do not mask preparation differences with survival buffs or weaker navigation protections.

New evidence files use compact UTF-8 JSON; CLI output remains indented. This removes formatting whitespace while preserving all fields, traces, counts and components. Historical indented files remain readable, and saved failure reports and signatures are not rewritten. The environment's `maxArtifactBytes` bounds retained evidence. Inspect actual usage, retention dependencies and free disk space before pruning or adjusting this budget.

New immutable bulk records of at least 1 MiB use lossless gzip level 9 while retaining names such as `terminal.json` and `preflight.json`. Development scripts read them through `testing.state.read`, which detects the encoding and returns the complete JSON value. Small and mutable records remain plain JSON. Corrupt or truncated files and decoded records over 2 GiB are refused. Atomic publication, evidence signatures and quota accounting still cover the same physical file; no sidecar store or historical recompression is introduced.
Within one stage, `physical-after.json` may reference its complete `preflight.json`, and `failure-state.json` may reference an existing complete `terminal.json`, storing only a smaller lossless difference. `testing.state.read` still reconstructs the complete value and verifies both the baseline physical SHA256 and reconstructed value SHA256. The existing stage signs and retains both files; copy them together. Only complete sibling baselines are allowed: external paths, links, self references and delta chains are refused. Size bounds, numeric types (including signed zero), array order, deletions and nulls remain intact. Unhelpful differences use the original complete format. No historical rewrite or quota increase is introduced.


## Temporary state observation gaps

Polling uses a filtered Bot summary. It reads the full exact event at an ownership, terminal or resource-wait transition. When the server thread exceeds the request scheduling deadline, the host returns `503 / SERVER_THREAD_TIMEOUT`: this observation is unavailable; it is not a construction-task failure.

Summary and full responses use one canonical `bots` collection. The obsolete `actors` mirror is removed to avoid serializing the entire task trace twice. Full responses still retain all traces, tasks and cleanup results, with unchanged physical observation coverage. The separate fixture-recovery journal's `actors` schema remains intact, and historical signed snapshots are not rewritten.

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

The same `construction` fixture can select `ClearAndSettleWaterColumnFlow` or `BuildPerimeterSandWallFlow`. A column declares its top, bottom, underwater work position, supported dry `deck` before sand placement, and optional `finalDeck` after settling (defaults to `deck`). Common navigation selects the return routes; callers do not declare a private flooded corridor. A wall declares its inner size, vertical bounds and starting deck. Freeze expectations for every sand cell, the return deck's foundation and its headroom. Return checks preserve the native safe stance: the Bot may stand over the deck edge, but its body must overlap that deck while grounded and alive.

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

After startup, the native Atlas observer verifies source admission instead of trusting classification from a previous server process. Before startup and after normal shutdown, the same saved-NBT decoder compares contents and components for every indexed container. Preflight also freezes existing block entities within the observed scene, including empty and not-yet-indexed containers. Only declared workstation and output containers may change.

Physical inventory and index membership remain separate. Late discovery of an existing container requires unchanged contents and components against its pre-operation baseline; removal of an original index entry still fails. An unindexed physical record does not admit a source for acquisition, and protection metadata changes are reported separately. A new source outside the construction footprint without a frozen physical baseline still requires resurvey before acceptance. Current contents cannot backfill an old baseline or turn a failed attempt into a pass. New before/after source archives use a same-directory baseline and lossless diff; historical archives and signatures remain unchanged.

`stockSources` declares fixture preloads and admission checks, not the acquisition flow's exclusive source list. A location still classified `UNKNOWN` after cold startup is not admitted. Preloads may use currently verified locations while retaining rejected locations and reasons; the all-indexed-container inventory audit still covers them. Missing neighbor information remains an Atlas issue to investigate, not evidence that stock is absent or permission to force admission by editing the index.

### Test tick-rate caps

Native, navigation and construction stages use `parameters.tickRateCap`, with positive integer caps from `1` to `10000`. This is an upper limit; actual TPS depends on machine load. Native GameTests omit the value or use `0` to remain unpaced. Live server scenes default to `20` and reject `0`. Prepared short navigation, dry/wet construction and bottom samples default to `3000`, without disabling vanilla mechanics.

```powershell
python scripts/testctl.py --env dev run start navigation-short --tick-rate-cap 3000
python scripts/testctl.py --env dev run start construction-dry --tick-rate-cap 3000
python scripts/testctl.py --env native run start construction-bottom-contracts --tick-rate-cap 3000
```

The CLI freezes selected caps into each stage; checkpoints and replays inherit them without editing historical attempts or extending controller wall budgets. An explicit cap overrides older low-rate parameters. Autonomous acquisition and construction that can re-enter cold supply can use one high rate throughout; live stages default to `20` when no cap is supplied. Historical `tickRate` and `ticksPerSecond` remain decode-only compatibility; mixed fields are refused.

The execution system owns timing. Vanilla movement, mining and furnaces retain game-tick budgets. Pending external futures, queue admission and inventory acknowledgements consume monotonic real time, with each `50 ms` charged as one budget unit. Waits propagate to every enclosing scope; checkpoint, maintenance, navigation, crafting-recovery and acquisition budgets use the same accounting without renewing limits on retries. Physical stalls, external deadlines, errors and cancellation retain their existing failure and cleanup behavior. No temporary switch back to `20 TPS` is needed, and database I/O itself does not become faster.

Native fixture `maxTicks` still bounds game time. A fixture that awaits external data before creating an execution scope needs a test-side external-wait boundary. Use `python scripts/testctl.py --env native run start execution-clock --tick-rate-cap 3000` for bounded native parent/child wait and real-deadline checks.

Live setup remains at `20`. Before operation, `tick query` verifies the configured cap; stage results store `tickRateCap`, with raw acknowledgements in the command journal. Successful, failed and cancelled cleanup first returns to `20`, then restores the original rate. Atlas/cohort and read-only survey adapters keep their existing clock policy.

Asynchronous database planning and chunk reads do not scale with game ticks. Shared external-wait budgets allow one high cap throughout construction, including later cold supply. Do not infer the current phase from historical `STARTED` trace nodes. Report wall time, game ticks and the configured cap separately; budget units are not CPU time. Actual TPS and end-to-end speedup still require measurement.

For an exclusively owned test server, `testctl` sets `max-tick-time=-1` at startup. Vanilla's watchdog measures lag against the scheduled next tick. A cap far above available throughput accumulates scheduling lag and can force termination even while the server continues processing actions. Finite controller wall deadlines, cancellation, normal shutdown and surviving-process checks remain active; an occupied runtime is refused before configuration changes. This policy applies only to managed isolated environments and preserves other game mechanics.

A real A02 acquisition sample on 2026-10-05 took `123.672 s` for the operation and `187.484 s` for the complete controller attempt. Its `37785` game ticks averaged approximately `305.5 TPS`, under a configured cap of `3000`. An older `20 TPS` sample with the same demand, start and starter equipment took `1572.320 s`: an observed reduction of about `24 min 09 s`, or `12.7` times the speed. Candidate, index and preferred source preloads differ, so this is a qualified field comparison rather than a controlled rate-only experiment. Independent audits checked terrain and source inventory; passing A02 does not establish whole-construction acceptance. The first watchdog interruption and recovery costs remain separate.

Shared construction starter items accept explicit `enchantments` maps, such as `{"minecraft:respiration":3}` on a helmet. Actual native item components are checked before task submission; declared enchantments do not add potion effects or extra supply.

### Reading timing evidence

Controller wall time, task operation time and trace game ticks have different measurement boundaries. Convert ticks with `ticks / 20` only when that entire interval is confirmed to use `20 TPS`. This includes physical actions, waiting and scheduling; it is not method CPU time.

Parent intervals already include their children. Use interval unions or explicit mutually exclusive accounting for navigation, flight, mining and inventory operations; do not add parent and child durations. Count actual `FLOW` nodes rather than counting their `CONDITION` nodes again. Missing terminal records are measurement gaps. Finished child durations do not establish a complete parent duration.

Paired speed comparisons need the same terrain, workload, equipment, execution mode and supply obligations. Different layers or retained continuations can provide throughput references, but are not controlled paired experiments. Native task success still needs physical, inventory and cleanup verification. Retain failed reports; independently gathered component evidence cannot rewrite a whole-attempt conclusion.

Measure representative wet layers before assigning a not-yet-started acceptance deadline; do not reuse a dry full-run estimate. In a deep-water 16³ sample on 2026-10-06, six fluid-preparation scopes took about 72–97 seconds each, including about 6–7 seconds for each layer's 16 drying cycles; layer replenishment separately took about 28–44 seconds. Some intervals are nested, so these figures cannot be added into CPU cost or a whole-run acceptance duration. Partition construction, sponge recovery and movement also count.

Record external operation expiry as a test-budget stop, preserving physical progress, cumulative cost and cleanup results. Do not count a disconnect caused by teardown as another business failure. Eight completed layers and sponge recovery/drying are component evidence; they do not establish the complete volume, bottom sealing or return. Historical attempt deadlines and unsuccessful conclusions remain unchanged.


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

### Water drops and receipt identity

`STRICT` must reject an ordinary native drop that remains alive and uncollected.
`BEST_EFFORT` can record its UUID, components, quantity and position within the
existing recovery limits. Ordinary and underwater collection share the same collector and
completion predicate: sufficient inventory gain and no still-living bound native
target. Picking up another matching entity cannot settle a target that remains.
Native contact and actual return both use common navigation, retaining native air,
distance, time and cancellation protection. The real task contract declares the
return destination.

```powershell
python scripts/testctl.py --env native run start wet-drop-contracts
python scripts/testctl.py run verify <run-id>
```

This gate covers 25 aquatic, 38 mining identity and six ordinary drop policy
controls, plus Java check. Negative controls need explicit native identity and
pickup conditions: placement below a platform alone cannot establish that an
item is uncollectable. It can float, merge or be collected incidentally. Wait for
native entity sections to load before cleaning ordinary remnants in an isolated
reused fixture. Fixture limits must include the unchanged operation budget and
preparation; they do not increase production limits. Component contracts do not
replace actual sponge recovery/drying or complete field construction audits.


### Short-route and mining cost controls

```powershell
python scripts/testctl.py --env native run start mining-navigation-cost
python scripts/testctl.py run verify <run-id>
```

The gate includes a three-arm synthetic native experiment, 13 search-budget/safety regressions
and Java check. The arms separate safe direct mining, default navigation and explicit ground
navigation, reporting approach, alignment and native mining independently. They verify terrain
authority, equipment, drop receipts and queued cancellation. Island and long-detour controls
exercise full-graph fallback and cumulative search budgets after a bounded short-route probe.

This is a component cost comparison, not an exact replay of an old partially excavated field
or proof of a complete autonomous construction run.


### Shared contact and local handoff gates

```powershell
python scripts/testctl.py --env native run start navigation-contact-contracts
python scripts/testctl.py --env native run start excavation-handoff-contracts
python scripts/testctl.py run verify <run-id>
```

Run sequentially and verify each terminal result. Contact covers four shared
navigation controls, five original pickup regressions and Java check. Handoff
covers three native support/cancellation/checkpoint identity controls, one unchanged
independent enclosed-pit refusal and Java check. Use
`navigation-interaction-unification` for broader affected callers. These gates do
not replace autonomous startup, facilities, excavation, bottom sealing, actual
return and source-inventory audits. Prior failure records remain retained.

### Parent and child budget boundaries

Ordinary operations retain an inclusive overall deadline. An orchestrator can declare fixed local-work and total ceilings: execution excludes only intervals delegated to a running direct child Flow from local cost, while atomic Actions still consume local work. Every child remains included in total cost. Retries, child changes and suspension cannot reset used work or the total ceiling; shorter inclusive ancestor deadlines remain effective.

Mining arrival time uses this common contract. Aquatic clearing composes the public mining and collector ceilings. Navigation retains its own planning, movement and safety limits, and controller wall deadlines remain unchanged. A clearing wrapper therefore cannot truncate legitimate navigation planning with its local-work window. Component regressions do not establish a fresh wet whole-flow acceptance.

When a child returns `PROGRESS` on its actual tick, or first returns `SUCCESS` after clean settlement, the shared execution scope updates progress along the actual ancestor stack. Wrappers need no separate child-progress policy. Waiting, `CONTINUE`, cached success, failure, cancellation and unsettled cleanup provide no such credit. Fixed total deadlines, local-work charges and navigation budgets remain effective.

### Fixture equipment protection

Construction, acquisition and Atlas fixtures share the equipment-protection contract. Armor remains in its original equipment slot. Durable carried gear is checked by quantity and components across the main inventory, offhand and owned transport boxes, allowing legitimate movement between them. Consumable hand items such as rockets follow their item contract; moving them does not mean armor was lost. Protecting existing gear does not forbid acquiring new tools.

Construction and acquisition preserve exact components. Atlas fixtures that already permit wear retain item-identity and quantity protection, without claiming unchanged durability or components. Boxes, sponges, cargo and source inventories retain their separate checks. New construction reports declare the equipment-protection version and consume the same contract in live acceptance and saved verification. Historical reports gain no additional coverage and their original failures remain unchanged.

### Native posture during external waits

```powershell
python scripts/testctl.py --env native run start external-wait-posture
python scripts/testctl.py --env native run verify <run-id>
```

Native air, gravity and hunger continue while a database or worker request is pending. The shared execution scope permits the input adapter to hold an already reached breathable water surface only when every active child is purely waiting externally and no foreground work or input occurred. It uses native JUMP without changing air, velocity, effects or the world. A deep open water column is not an already reached surface, and this does not replace shared navigation to an exit.

Active diving, foreground movement or posture, and parked unfinished children veto background input. Cancellation, suspension and entity rebinding withdraw it. An adapter-release error must not skip the business owner's cleanup, and both errors remain visible. Atlas, inventory and construction do not implement separate floating branches. Timing, progress and total deadlines retain their existing contracts.

The gate covers eight native waiting-posture controls, twenty execution-clock and cleanup-fault controls, and Java checks. Use `water-egress` for adjacent water navigation. These component proofs do not replace a complete wet construction audit of autonomous supply, sponge recovery and drying, clearing, sealing, actual return and inventories.


### Executable origins and replanning lifecycle

```powershell
python scripts/testctl.py --env native run start navigation-origin
python scripts/testctl.py run verify <run-id>
```

The gate includes ten origin controls and adjacent ground, water, displaced recovery, scaffold entry/ascent/descent and recorded portal-room regressions: 95 native controls plus Java check. The broader 21-test vertical movement group has six failures on both the prior and modified production sources; these remain open, and this entry does not establish that the whole vertical group passes. Finite recorded river geometry distinguishes public navigation, a deliberately wrong first-edge entry and normal movement from actual support; it does not replay the historical world's fluid timing. Other controls cover a virtual future origin, cancellation and the original planning limit for a live inadmissible origin. The pending negative repeatedly supplies an explicitly airborne pose to test the contract; it does not claim vanilla gravity would hold an actor in the air. Component success is not new whole-construction acceptance.

The lower-river controls verify native body clearance and floor support before restoring a supported initial pose; public placement navigation must form an admitted origin and reach a native interaction stance. Cancellation and budget negatives hold a supported wet pose outside an explicit travel region and verify no executable edge, the original 4800 planning-tick limit and input release. They do not claim every natural wet trap settles. Concurrent controls separate actors and geometry while retaining shared chunk-ticket leases.

Low-roof departure controls also retain the shared chunk lease throughout native execution. One synchronous read does not guarantee continued residency of remote neighboring chunks. Terminal cleanup releases the actor and lease; navigation still refuses unknown geometry.
