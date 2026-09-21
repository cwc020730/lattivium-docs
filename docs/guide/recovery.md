# 暂停、恢复与排错

## 查看状态

启用本地调试 UI 后读取 `GET /api/state?bot=Worker&summary=true`。
`position` 是 Bot 当前实际脚部坐标；`savedTasks[].position` 是保存时的位置。
`Queued`、开始旅行、开箱、取得物品和交付物品是不同事实。

## 暂停不是取消，取消不是回滚

调试 HTTP 的 `pause` / `resume` 控制调试会话；`next`、`arm`、`replay` 有特定 ItemRecord 分步调试语义。
它们不是通用的任务提交或恢复 API；`reset` 清除调试会话，不会回滚世界，也不是删除存档。
Java `EventHandle.cancel()` / `Bot.stopCurrentTask()` 用于实际取消，可能留下需要恢复的物品或施工义务。
当前没有注册 `/lattivium Worker cancel` 这样的通用聊天子命令，不能凭名称猜测。
Carpet 的停止输入或移除假人也不应被描述成 Lattivium 的安全暂停接口。

## 正常关服后的供给任务

世界 `lattivium/tasks/` 保存供给检查点。正常挂起、符合恢复条件、同 UUID 的 Bot 重新上线且空闲时，恢复注册器会尝试接续。
多个未解决任务争用同一 Bot、库存不匹配或未结义务会阻止恢复。
异常退出遗留 RUNNING 的记录会被标为 BLOCKED，不盲目重放可能已经执行的转移。
在状态 API 中查看 `savedTasks`、`resumable`、`reason`、`unsettled`、`recoveryIssues`。
清场使用[单独 UUID 入口](./construction#清场恢复)，不能混用两类检查点。

## 常见问题

| 现象 | 首先检查 |
| --- | --- |
| Unknown actor | Carpet 假人是否在线、名字是否正确，等一个服务器 tick 后重试 |
| Actor is busy | 查看当前任务；不要重复提交同一取货请求 |
| 页面没有 Bot | 服务器是否启动、UI 是否开启、筛选名是否正确 |
| 查不到库存 | Atlas 是否就绪并建有索引；保护与结构排除策略是否过滤来源 |
| 库存数量对不上 | 重查实际箱子与观察时间，不能把索引当作实时保证 |
| NO_PATH / STUCK | 记录维度、Bot 脚位、目标和障碍；预算失败不证明绝对封闭 |
| 缺料却显示结束 | 区分完整交付、带缺料完成与真正失败，查看具体回执 |
| 恢复被拒绝 | 保留检查点和源盒；核对实际库存，不删除义务强行重跑 |

trace 是诊断证据，不是世界状态的绝对真相。重要验收应交叉核对实际实体位置、容器内容和方块状态。
