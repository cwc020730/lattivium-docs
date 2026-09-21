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

`savedTasks` 包含离线 Bot 的供给检查点；`recoveryIssues` 给出恢复阻塞原因。trace 记录观察、操作与结果，坐标含义以所属字段为准。取消任务遵循[任务控制](./task-control)的清理语义。
