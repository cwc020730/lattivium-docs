# 开发测试

`scripts/testctl.py` 是开发环境的统一测试入口。它调度原生 GameTest、导航、材料收集和施工场景，保存每次尝试的命令、运行版本、任务标识和验收证据。测试不需要额外的 Minecraft 测试指令。

## 案例与运行

先检查案例和环境，再启动一次独立尝试。`run wait` 只等待结果，不会延长测试的执行预算。

```powershell
python scripts/testctl.py case list
python scripts/testctl.py case show command-contract-game-tests
python scripts/testctl.py --env native env check
python scripts/testctl.py --env native run start command-contract-game-tests
python scripts/testctl.py run wait <run-id> --timeout 60
python scripts/testctl.py run verify <run-id>
python scripts/testctl.py report show <run-id>
```

原生测试使用 `native` 环境。真实场地使用显式登记的服务端环境和冻结案例文件；运行前核验地图、端口、资源上限与快照范围。场景的预期结果必须独立声明，任务返回成功本身不等于验收通过。

## 检查点与重跑

在破坏性操作之前暂停并保存检查点。失败后保留原报告，修复代码，再创建新的重跑尝试。

```powershell
python scripts/testctl.py --env dev run start <case-file> --pause-before <stage-id>
python scripts/testctl.py checkpoint save <run-id> --label before-operation
python scripts/testctl.py run resume <run-id>
python scripts/testctl.py run replay <run-id> --from <checkpoint-id>
python scripts/testctl.py run verify <replay-id> --replay-suffix
```

检查点恢复的是登记范围内的地图、实体、玩家和数据库状态。它不是任意操作的即时撤销。只重跑后半段时，报告明确标为后缀覆盖，不冒充整轮通过。

## 热更新与故障恢复

```powershell
python scripts/testctl.py --env dev code refresh --mode auto
python scripts/testctl.py run cancel <run-id>
python scripts/testctl.py run recover <run-id>
python scripts/testctl.py --env dev env status
python scripts/testctl.py --env dev env stop
python scripts/testctl.py artifacts prune --keep-days 7
```

方法体变更可使用已有 HotSwap；签名、字段或入口索引变化需要重启。冻结验收运行期间不修改 Java、构建或恢复地图。控制器中断后先恢复其拥有的任务、Bot、测量窗口和区块票据，再启动下一次尝试。清理预览不会删除世界或保护基线。

## 施工场景

`construction` 场景复用同一服务端生命周期，通过公开的 `ExcavateLayeredAreaFlow`、`PreparePerimeterInfrastructureFlow` 或 `PrepareAndExcavatePerimeterFlow` 指令执行。冻结输入声明启动物资、原始地形、允许变化范围和最终方块；围墙方案还包含原生规划出的井、道路和工作站布局。

施工结束后检查 Bot 返回、工具和盒子保护，正常停服，再直接读取地图方块与容器库存。准备场地与完整施工分别验收。`mode: "SOURCE_PRESERVING_DEBUG"` 使用通用取货流程的无损测试模式；自主补给还必须通过相应来源库存审计，不能用预发物资场景代替。
