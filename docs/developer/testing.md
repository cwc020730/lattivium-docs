# 开发测试

`scripts/testctl.py` 是开发环境的统一测试入口。它调度原生 GameTest、导航、材料收集和施工场景，保存每次尝试的命令、运行版本、任务标识和验收证据。测试不需要额外的 Minecraft 测试指令。

新增原生夹具时，先检查同组夹具的绝对坐标和清理范围：一组 GameTest 共用世界，重叠的水池或平台可能在另一个 Bot 开始执行前被覆盖。配置和旧掉落物可能随原生世界保留；短复现应明确相关配置，并在自己的范围内准备食物、运输余量等框架前置资源。这样得到的组件通过不能代替“只有启动装备”的自主补给现场验收。

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

### 拾取耗时对照

`dry-pickup-comparison` 在同一块记录地形上顺序执行两个 8×8 干层对照，比较逐次与既有批量拾取。`layered-dry-pickup-comparison` 另验证真实逐层调用方、严格/含水/海绵/未知/大区域的选择、取消和既有恢复契约，最后运行 Java 检查。

```powershell
python scripts/testctl.py --env native run start dry-pickup-comparison --timeout 360
python scripts/testctl.py --env native run start layered-dry-pickup-comparison --timeout 600
python scripts/testctl.py --env native run verify <run-id>
```

两条命令分开使用，等前一次结束后再启动。夹具使用相同工具、鞘翅、食物、已补给烟花与有限运输余量；先核对顶层净空、容器保护距离和补给水位，再开始计时。保留困难难度与真实饥饿，关闭刷怪及随机方块更新以固定对照地形。结束核验实际空气、物品余额、工具/盒/装备/烟花组件、来源库存和范围外状态。

数量核验同时检查入箱回执和原生的“箱内＋随身＋地上”总量。报告中的 `Abandoned` 是历史放弃数量，`Carried` 与 `Uncollected` 是终态随身和地上数量；后续顺路拾回可以使三者不同。不要把历史放弃直接当作永久损失，也不要用它忽略无来源的额外物品。

这是已补给后的组件测试，不能代替开局仅给三组烟花的自主获取验收。单次顺序对照仍可能受缓存与地形差异影响；报告同时列出两种耗时和掉落损失，不只报告速度。夹具准备失败的耗时保留在开发成本中，不归为被测操作耗时。若同一流程在现场预计仍超出原预算，先测一层的实际吞吐，不直接重跑整轮。

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

方法体变更可使用已有 HotSwap；签名、字段或入口索引变化需要重启。冻结验收运行期间不修改 Java、测试框架源码、构建输出或恢复地图。控制器中断后先恢复其拥有的任务、Bot、测量窗口和区块票据，再启动下一次尝试。清理预览不会删除世界或保护基线。

电脑或 JVM 重启后，原执行栈和内存测量窗口已经丢失。`run recover` 按尝试记录核对新旧运行身份，将已结束 JVM 的测量窗口记为中断，不生成虚假的耗时样本；若仍是原 JVM，则必须成功关闭准确的原测量阶段。运行身份不足时拒绝清理，原中断报告和失败恢复回执仍保留。

恢复清理不回滚施工，也不会自动续跑原任务。已有操作前检查点时，用新尝试重放；没有检查点时，先停服核对保存的方块、设施、Bot 装备、盒内组件及全部来源库存，再冻结实际现场，使用已有组件入口接续未完成部分。接续物资必须与保存库存一致，累计失败和已用预算继续保留；这种组件接续不能算新的自主开局整轮验收。

新的证据文件使用紧凑 UTF-8 JSON，CLI 输出仍保留缩进。该方式只省去格式空白，完整保留字段、trace、数量与组件；旧的缩进文件仍可读取，已保存的失败报告和签名不重写。证据总量受环境的 `maxArtifactBytes` 限制，清理或调整预算前应检查实际占用、保留依赖和磁盘余量。

## 状态查询暂时不可用

轮询使用指定 Bot 的轻量摘要；只有任务归属变化、终态或等待资源时，才读取完整任务回执。服务器线程超过查询调度期限时，接口返回 `503 / SERVER_THREAD_TIMEOUT`，表示这次观察不可用，不表示施工任务失败。

共用观察入口只对这个明确的只读错误重试，窗口最多 10 秒，仍受原阶段时限和取消指令约束。每次间断及恢复写入 `state-observations.jsonl`；持续不可用则停止并保留失败证据。其他 HTTP 错误、连接丢失、操作指令和测量写操作不重试，也不因为观察失败重新提交任务。

原生短案例检查真实 HTTP 超时响应及健康摘要：

```powershell
python scripts/testctl.py --env native run start debug-observation
python scripts/testctl.py run verify <run-id>
```

这项组件测试通过不等于真实施工整轮通过。现场仍须核验任务终态，并在正常停服后独立审计地形、设施和库存。

## 等待长测试时

等待期间可以修正文档、审计已有共用职责或准备下一阶段的小改动。每次选择约 5–10 分钟能产生结果、且不依赖当前测试结论的小项；记录待验证的发现，避免无界的全库重构。冻结运行的 Java、构建输出和世界状态；独立改动单独验证，不能使用旧候选的通过结果作为新代码证据。

长测试记录实际开始时间、预计耗时和进展信号，约 10 分钟复盘；完成或失败后优先核验、接续主线。继续使用 `testctl` 的结果和运行标识，避免重复启动测试或频繁读取完整 trace。

```powershell
python scripts/testctl.py run status <run-id>
python scripts/testctl.py run wait <run-id> --timeout 60
```

`RUNNING` 表示尝试尚未结束，不等于某个施工步骤已完成。观察时结合实际任务、Bot 位置和已完成操作的记录；清理道路净空的挖掘与目标区域逐层挖掘应分别统计。运行中的方块抽查用于判断进展，最终仍需停服后对完整冻结区域和来源库存进行独立验收。

## 施工场景

`construction` 场景复用同一服务端生命周期，通过公开的 `ExcavateLayeredAreaFlow`、`PreparePerimeterInfrastructureFlow` 或 `PrepareAndExcavatePerimeterFlow` 指令执行。冻结输入声明启动物资、原始地形、允许变化范围和最终方块；围墙方案还包含原生规划出的井、道路和工作站布局。

施工结束后按所选入口检查对应回执、工具和盒子保护，正常停服，再直接读取地图方块与容器库存。准备场地与完整施工分别验收。`mode: "SOURCE_PRESERVING_DEBUG"` 使用通用取货流程的无损测试模式；自主补给还必须通过相应来源库存审计，不能用预发物资场景代替。

已准备场地的 `ExcavateLayeredAreaFlow` 场景检查逐层完成、干燥空气、产物箱及库存保护，并支持 `sealBottom: true`。它与 `PrepareAndExcavatePerimeterFlow` 共用封底校验：整个 `minY-1` 平面必须纳入观察与允许变化范围，独立声明最终干燥方块，并核对原生回执中全部 `bottomSeals`，拒绝缺漏、重复或越界位置。天然干燥实心底面保留原材料；水孔、空洞明确声明填料。停服后的完整方块状态审计仍检查含水状态和范围外变化。

```powershell
python scripts/testctl.py --env native run start construction-bottom-contracts
python scripts/testctl.py --env dev run start construction-bottom
```

前者运行框架契约及已有的湿底、水生植物、覆土和连通水穴原生测试；后者复用同一场景的 seed/execute 生命周期，核验保留八格天然石底、填上一格水孔。按返回的 run ID 等待并核验，串行执行这两个案例。已准备场地的组件入口仍没有工作站返回断言；完整施工另行核验实际返回。保留现场的组件接续通过也不能代替新的自主开局完整验收。

### 水柱与沙墙组件

同一 `construction` 场景也可选择 `ClearAndSettleWaterColumnFlow` 或 `BuildPerimeterSandWallFlow`。水柱明确指定顶部、底部、水下操作通道、返回通道与干平台；沙墙明确指定内区尺寸、上下界及起始平台。场景逐格声明最终沙子，同时声明返回平台的底座和净空。返回检查沿用原生安全站姿：身体可站在平台边缘，但必须接触该平台、落地且存活。

需要水下呼吸或防火时，在冻结场景中声明 `effects`，每项为 `id`、`seconds`、`amplifier`。这些属于测试条件，不会改变正式施工的补给规则。旧沙墙已有前缀可通过 `resumeSandColumns` 继续，但冻结原地形必须逐格证明该前缀已填满沙；完整物理验收仍覆盖整圈。检查点回放用于重跑同一操作，不依赖固定测试工地编号。

### 干燥井、道路与工作站

`PrepareSiteInfrastructureTask` 使用显式 `admittedChunks`，每项为区块坐标 `x`、`z`，不是方块坐标。规划和 Bot 行动限于这些已加载区块，不读取本地工地清单，也不自动扩大施工范围。井根部、底部站姿、道路及工作站必须组成可安全往返的完整布局。

`construction-survey` 的干燥场地请求包含 `entry`、`arguments` 和 `preferredStart`。它只读取地形；冻结返回的布局后，`construction` 场景执行相同公开指令，并验收脚手架、道路净空、地板、容器与工作站到井底往返。只读观察超过预算时会明确报告，不能把它解释为地形一定无解。合成场地的 `seed` 阶段只准备地形，不算施工成功；执行阶段仍需冻结的完整布局。

周界整合场景中的 `start` 是勘测的优先搜索位置，可能位于水中。执行前，共用测试入口重新核对冻结布局，并把 Bot 放到原生勘测返回的安全 `start`，随后才发放初始装备和启动任务。安全起点必须位于已观察范围内；记录同时保留 `preferredStart` 与实际使用的 `initialStart`。工地坐标不因此改变，干燥场地的显式起点和已准备好的逐层挖掘起点仍遵守原有规则。

### 固定尺寸完整施工

`ExcavateSiteTask` 可复用相同的只读观察、冻结布局、施工和检查点重放；它的公开入口固定为 16×16×5。验收同时检查 1,280 格干空气、坑底支撑、脚手架、道路、工作站容器和 Bot 返回，而非只看任务的成功状态。部分预清空的小场景用于快速验证生命周期，不能替代完整实心或真实地形测试。

冻结的 `kit` 可以包含满装潜影盒。测试程序在启动和改动世界前检查每条完整 RCON 指令的长度；不能安全提交的原子物品指令会明确拒绝，不会静默缩减物资。重复测试使用同一个离线检查点和新的 attempt，原始失败记录保留。

完整周界施工还会在工作站的预留位置增加卸货潜影盒。审计根据冻结的工作站布局读取这些位置，核对实际盒子、内容和任务记录；尚未放盒的空位不会计入潜影盒数量。这样长时间挖掘的额外卸货仍使用同一套库存与物理验收。

### 施工测试中的刷怪控制

施工测试保留困难难度、真实饥饿和生存模式，同时关闭自然刷怪、刷怪笼、幻翼、巡逻队、监守者生成和袭击。由 `testctl` 管理的隔离开发环境还会清理已有及新加载的敌对类别实体，保护被动生物、掉落物、容器和地图方块。这是测试环境条件；正式 Bot 的避怪、战斗行为不由该机制实现。环境身份或世界路径不一致时拒绝启动保护，不能把生产世界当成测试环境。

实场验收在场景顶层指定 `withoutSaturation: true`，开工前和结束时读取 Bot 的实际生存模式与效果，拒绝饱食效果。未指定时，短夹具会使用饱食来隔离非食物功能，不能据此宣称真实饥饿补给已通过。水下呼吸和防火等显式 `effects` 与这一条件分别记录。

### 自主补给的来源审计

完整施工场景可设置 `autonomousSupplies: true`，并声明 `stockSources`，每项包含 `dimension` 与 `position`。这些是现有仓储位置，不是给 Bot 发物资的指令；取货仍由通用材料获取流程执行。来源必须位于施工授权范围外，其邻接区块纳入测试环境的检查点范围。

启动后通过原生 Atlas 观察器确认来源可取，避免沿用上一个服务端进程留下的过期分类。停服前后的审计直接读取全部已索引容器的地图 NBT，比较数量及组件；仅允许声明的工作站与输出箱变化。保护分类变化单独列出。如果途中发现授权施工范围外的新来源而没有原始库存基线，需重新调查并冻结基线后再验收。

`stockSources` 是夹具要求预加载并核验的来源，不是通用取货流程的唯一来源列表。冷启动后仍为 `UNKNOWN` 的位置不能当作已准入；可以选择当前已核验来源做预加载，但需保留拒绝位置及原因，全部索引容器的库存审计仍包含它们。邻接信息不足是待调查的 Atlas 问题，不能解释为材料不存在或修改索引来强行准入。

### 原生测试时钟

原生 GameTest 默认尽快运行。等待异步区块或 POI 读取的场景可设置 `parameters: {"ticksPerSecond":20}`，按普通游戏速率推进，同时保留原断言与 tick 上限。这仅影响测试服务器；省略或设为 `0` 时仍快速运行，允许的正整数范围为 `1–200`。

真实施工场景使用另一项参数 `parameters.tickRate`，默认 `20`，允许 `1–200`，不接受 `0`。加速游戏 tick 不会同比加速数据库规划、区块读取等异步工作，却会更快消耗按 tick 计的操作预算。因此冷启动自主补给先使用 `20`；确认取货和返回已完成后，纯物理施工才适合加速。途中再次进入冷异步补给时，应重新检查速率。

测试框架目前只按场景参数设置起始速率，不会自动识别子流程并切换。额外调整需要保留服务端回执和实际发生阶段，不改变尝试的原始时间上限。报告区分真实耗时、游戏 tick 和速率；不能把加速后的分钟数当作普通游戏速率下的施工耗时。

长施工可能在层间再次旅行补给。无法可靠跟踪这些阶段时，自主补给场景应全程保持 `20`，而不是在首次取货结束后一直加速。历史 trace 中仍标为 `STARTED` 的节点可能已经结束，不能单独作为当前子流程或调速依据。


### 共享原生区块租约

原生夹具使用同一 `FieldSiteChunkPins` 管理实际 ServerLevel/ChunkPos。重叠租约
全部释放后，才解除夹具最初创建的强加载票；进入前已有外部票继续保留，重复
清理不会减少别人的引用。合成夹具和 RecordedGeometry 已接入同一入口，启动
失败沿同一释放路径，不再各自维护计数或裸解除票。

```powershell
python scripts/testctl.py --env native run start fixture-chunk-ownership
python scripts/testctl.py run verify <run-id>
```

该门禁包含6项所有权控制、33项既有合成回归及Java check。它验证测试资源
生命周期；其余旧夹具与Python多actor资源清理仍在迁移，不能据此宣布全部夹具
已经统一。真实施工的世界、来源、工具与盒子审计仍独立执行。
