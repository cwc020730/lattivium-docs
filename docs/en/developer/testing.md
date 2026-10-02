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

Method-body changes can use the existing HotSwap support. Signature, field and entry-index changes require restart. Do not edit Java, build or restore worlds during frozen acceptance runs. After controller interruption, reconcile its owned tasks, Bots, measurement windows and chunk tickets before starting another attempt. Cleanup previews do not delete worlds or protected baselines.

## Construction scenes

The `construction` fixture shares the same server lifecycle and submits public `ExcavateLayeredAreaFlow`, `PreparePerimeterInfrastructureFlow` or `PrepareAndExcavatePerimeterFlow` commands. Frozen input declares starter stock, original terrain, permitted changes and final blocks. Perimeter scenes also freeze the native shaft, road and workstation plan.

After construction, audit the Bot's return and protected tools/boxes, stop normally and independently decode saved blocks and container inventories. Facility preparation and complete construction have separate acceptance. `mode: "SOURCE_PRESERVING_DEBUG"` uses the common acquisition flow's source-preserving test mode; autonomous supplies additionally require source inventory evidence and cannot be established by a pre-equipped fixture.
