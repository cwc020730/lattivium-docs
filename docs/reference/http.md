# 调试 HTTP 接口

启用 `debugUiEnabled` 后监听 `127.0.0.1:<debugUiPort>`，默认端口 8787。

| 方法与路径 | 内容 |
| --- | --- |
| `GET /` | 调试面板 |
| `GET /api/executables` | 注册入口、类型、示例及 JSON Schema |
| `GET /api/state` | 所有在线 Bot、检查点和恢复问题 |
| `GET /api/state?bot=Worker` | 指定 Bot 的完整状态 |
| `GET /api/state?summary=true` | 轻量状态，省略 trace 和任务历史 |
| `POST /api/tasks/cancel?bot=Worker&taskId=<UUID>` | 请求取消指定 Bot 的任务，返回 `ok`、`taskId` 和 `action` |

完整 Bot 状态包含 `activeTaskId`、`taskState`、`tasks`、`cleanupBlockedBy` 和 `trace`。`tasks` 中每项包含 `taskId`、`description`、`state`、`failure`。服务端在游戏线程生成状态快照。

值为 `null` 的字段会在 JSON 中省略。例如，当前没有清理阻塞时，完整状态不输出 `cleanupBlockedBy`；有阻塞时，它是相关根任务的 UUID。`SUCCEEDED` 是业务终态，输入释放或清理失败仍可能阻塞下一任务。核验时应在 Bot 尚在线、清理尚未被确认解除的终态边界，读取匹配 Bot 的完整状态并检查该阻塞；轻量摘要不提供此信息。

`savedTasks` 包含离线 Bot 的供给检查点；`recoveryIssues` 给出恢复阻塞原因。trace 记录观察、操作与结果，坐标含义以所属字段为准。取消任务遵循[执行控制](./task-control)的清理语义。
