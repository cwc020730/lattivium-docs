# 状态与错误码

执行从 `QUEUED` 进入 `RUNNING`；等待状态包括 `WAITING_FOR_CHUNK` 和 `WAITING_FOR_SERVER`。终态为 `SUCCEEDED`、`FAILED`、`CANCELLED`。供给结果还会记录实际交付量和缺料量。

## BotFailureCode

| 代码 | 含义 |
| --- | --- |
| `NO_PATH` | 预算内无可用路径 |
| `PATH_TIMEOUT` | 寻路超时 |
| `STUCK` | 移动无有效进展 |
| `TARGET_CHANGED` | 目标或预期世界状态改变 |
| `OUT_OF_REACH` | 目标不在可触及范围 |
| `MISSING_ITEM` | 缺少物品或补给 |
| `INVENTORY_FULL` | 库存无法容纳产物/余料 |
| `SOURCE_UNAVAILABLE` | 来源保护未知、禁止或当前不可用 |
| `TOOL_MISSING` | 没有可用挖掘工具 |
| `TOOL_EXHAUSTED` | 工具耐久不足 |
| `INTERACTION_REJECTED` | 原生交互被拒绝 |
| `CONTAINER_DESYNC` | 容器菜单或转移状态不同步 |
| `CHUNK_UNLOADED` | 所需区块未加载 |
| `ACTOR_DIED` | Bot死亡 |
| `ACTOR_DISCONNECTED` | Bot离线 |
| `UNSUPPORTED` | 当前能力不支持 |
| `TIMEOUT` | 操作或任务超时 |
| `CANCELLED` | 取消 |
| `INTERNAL_ERROR` | 内部错误 |
