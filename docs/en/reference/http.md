# Debug HTTP API

Enable `debugUiEnabled` to listen on `127.0.0.1:<debugUiPort>`, port 8787 by default.

| Method and path | Response |
| --- | --- |
| `GET /` | Debug panel |
| `GET /api/executables` | Registered entries, kinds, examples and JSON Schema |
| `GET /api/state` | Online Bots, checkpoints and recovery issues |
| `GET /api/state?bot=Worker` | Full state for one Bot |
| `GET /api/state?summary=true` | Lightweight state, omitting trace and task history |
| `POST /api/tasks/cancel?bot=Worker&taskId=<UUID>` | Request cancellation; returns `ok`, `taskId` and `action` |

Full Bot state includes `activeTaskId`, `taskState`, `tasks`, `cleanupBlockedBy` and `trace`. Each task has `taskId`, `description`, `state` and `failure`. Snapshots are produced on the game thread.

Fields whose value is `null` are omitted from JSON. For example, full state omits `cleanupBlockedBy` when there is no current cleanup block; a block contains the relevant root task UUID. `SUCCEEDED` is the domain outcome: input-release or cleanup failure can still block the next task. At the terminal boundary, while the Bot is online and before acknowledging cleanup, inspect full state for the matching Bot and check this block. Lightweight summaries do not provide that information.

`savedTasks` includes supply checkpoints for offline Bots. `recoveryIssues` reports blocked recovery. Traces record observations, operations and outcomes; coordinate meanings follow their owning fields. Cancellation follows [execution control](./task-control) cleanup semantics.
