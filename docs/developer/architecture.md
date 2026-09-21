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
| AcquisitionReceipt | 本次实际取得物品及副作用的回执 |
| SupplyResult | 交付、缺料和失败来源的业务结果 |
| Obligation | 尚未完成的归还、回收、交付或清理责任 |
| Checkpoint | 包含校验信息的可恢复保存状态 |
| Atlas observation | 带来源与观察时间的世界事实 |
| Unreachable | 在指定策略与预算内无法取得的来源 |

Flow 按独立结果、状态所有权和清理边界拆分。飞行与挖掘会话保留专用控制状态，在合适处共享生命周期契约。手册覆盖执行契约与公开 API 包，实现细节由源码提供。
