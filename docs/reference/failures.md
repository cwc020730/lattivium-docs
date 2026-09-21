# 状态与错误码

`EventState` 是执行事件生命周期，不等于材料业务结果：

| 状态 | 含义 |
| --- | --- |
| QUEUED | 已受理排队 |
| RUNNING | 执行中 |
| WAITING_FOR_CHUNK | 等待区块 |
| WAITING_FOR_SERVER | 等待服务端条件 |
| SUCCEEDED | 事件成功终态；仍要查看业务缺料报告 |
| FAILED | 失败终态，检查failure及剩余义务 |
| CANCELLED | 取消终态，不表示世界已回滚 |

后三种为终态。供给检查点的RUNNING/SUSPENDED/BLOCKED等是另一套持久化状态，不能混用。

## BotFailureCode 完整列表

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

错误码是分类，坐标、阶段和剩余义务在具体错误信息、trace及检查点中。
不自动把所有 NO_PATH 当作可跳过：只有业务流程确认部分回执和清理义务安全时才允许换源或缺料结算。
