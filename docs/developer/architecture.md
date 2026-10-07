# 架构与术语

命令将已声明的 Task、Flow 或 Action 提交给 Bot 调度器。调度器拥有根执行位和队列，ExecutionScope 推进 tick 并处理终态。Task 组合业务操作，Flow 编排具体交互，Action 与专用会话驱动原生控制。Atlas 提供事实，规划器据此生成请求和路线，trace 观察执行。

```text
Command → BotEventScheduler → ExecutionScope
                                  ├─ Task
                                  ├─ Flow → child Flow / Action / Session
                                  └─ Action
Atlas → Planner → Execution request
```

## 语义词典

| 术语 | 含义 |
| --- | --- |
| Executable | 具有统一执行生命周期的操作，分为 Task、Flow 和 Action |
| Bot | 受调度的 Carpet 假人及其能力边界 |
| Task | 拥有业务意图与长期状态的根任务 |
| Flow | 拥有子操作生命周期并输出具体结果的编排 |
| Action | 底层输入或原生交互动作 |
| ExecutionScope | 推进执行单元、管理预算、终态和清理 |
| EventHandle | 观察或取消一次提交的句柄 |
| Session | 专用持续操作的运行状态 |
| Plan | 根据知识和策略生成的执行计划 |
| Step | 供给计划的一组来源容器 |
| SourceJob | 针对一个来源容器分配的物品及数量 |
| TravelRoute | 地点与维度间的旅行提示 |
| NavigationRequest | 局部导航位置、候选脚位与搜索策略 |
| PathGoal | 导航的完成条件 |
| NavigationResult | 导航实际到达脚位及可选路径节点 |
| MaterialLedger | 需求、持有、用途预留与取得交付账目 |
| ResourceMaintenance | 当前执行的资源维护准入及累计预算；具体资源策略选择补给操作 |
| MaterialSourceLocator | 按物品查询与筛选来源的接口，供取货及补给复用 |
| AcquisitionReceipt | 本次实际取得物品及副作用的回执 |
| SupplyResult | 交付、缺料和失败来源的业务结果 |
| Obligation | 尚未完成的归还、回收、交付或清理责任 |
| Checkpoint | 包含校验信息的可恢复保存状态 |
| Atlas observation | 带来源与观察时间的世界事实 |
| Unreachable | 在指定策略与预算内无法取得的来源 |

Flow 按独立结果、状态所有权和清理边界拆分。飞行与挖掘会话保留专用控制状态，在合适处共享生命周期契约。手册覆盖执行契约与公开 API 包，实现细节由源码提供。

## Flow 与能力的职责边界

本轮职责迁移位于 `codex/flow-ownership-refactor` 分支；源码盘点与短场回归分别记录，不能视为完整施工现场已通过。

Flow 维护组合阶段、子 Flow/Action 的生命周期，按能力返回的事实分支，并投影结果或检查点。库存选槽与容量、来源排名、寻路搜索、物理控制、世界勘察、交互可行性及原生物品回执由对应能力实现；它们的内部工作状态也由能力持有。

例如，`TransferItemsFlow` 调度交易，`ContainerTransferSession` 验证原生菜单和数量；`MineBlockFlow` 编排接近、选工具和挖掘，`MiningStance`/`MiningToolSelector` 决定姿态与工具；`ElytraFlightFlow` 编排准备、起飞及烟花子操作，`FlightControl` 维护飞行物理反馈。Flow 可以读取用于追踪或结果投影的事实，但不能再实现另一份规则。

各 Flow 自定义所需阶段，没有统一的业务状态枚举。`Flow<R>` 的 `R` 是结果类型。能力内部可以持有持续操作状态，但不负责创建、推进或取消子 Flow 的执行 scope。命令或 UI 仍通过执行契约提交根操作，并通过运行句柄观察状态。

结构迁移需要保留每 tick 的边界、原生输入 owner、短路求值顺序、预算、部分回执和清理顺序。单个组件通过不等于完整现场任务通过；原生行为和职责边界分别验证。

## 旅行编排

```text
TravelToFlow
  ├─ PortalJourneyFlow
  ├─ ApproachAreaFlow → ElytraFlightFlow / LocalNavigationFlow
  └─ LocalNavigationFlow → PathEdgeExecFlow → Action
```

`TravelToFlow` 持有目标维度与最终到达条件。结果 `TravelArrival` 包含实际到达维度和脚位。穿门和区域接近是中间航段；库存、施工等业务提供到达条件，并持有交互与材料变更的责任。

## 获取、交付与施工

`AtlasSupplyTask` 和 `AcquireMaterialsFlow` 共用 `AtlasSupplyLoadFlow` 及 `AcquireProductionFlow`。前者拥有交付目标，后者输出携带材料供调用者使用。`PrepareAndExcavatePerimeterFlow` 将场地勘察转换成材料需求，并在启用自主获取时调用后者。

取货链中的来源访问、精确拆盒、合成与用途结算各自保留结果和清理边界。`ResourceMaintenance` 控制资源维护准入；`TaskFireworkSupply` 和 `TaskFoodSupply` 决定具体资源策略。补给子操作完成后，由仍持有原目标的父操作继续推进。

调用链与当前接入范围见[材料收集与合成](../guide/supply)和[施工物资与补给](../construction/supplies)。
