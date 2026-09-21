# 调试 HTTP 接口

实验性本地接口，默认关闭。启用 `debugUiEnabled`，默认根地址 `http://127.0.0.1:8787`。
只有回环监听；没有面向公网的身份认证，不应直接反向代理为公开管理端点。
本站 GitHub Pages 只展示说明，不调用这些接口。

## 路由清单

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/` | 调试UI HTML |
| GET | `/api/state` | 全量状态 |
| POST | `/api/debug/arm` | 激活分步调试会话 |
| POST | `/api/debug/pause` | 暂停调试执行并停止输入 |
| POST | `/api/debug/next` | 允许下一调试步骤 |
| POST | `/api/debug/resume` | 连续推进调试会话 |
| POST | `/api/debug/reset` | 清除调试会话并停止输入，不是世界回滚或通用取消 |
| POST | `/api/debug/replay` | 重放可重放的历史步骤，需要flow参数 |

## 参数

GET状态：`bot` 按名字精确筛选；省略返回所有在线Bot。`actor` 是旧别名，bot优先。
`summary=true` 返回轻量状态，省略trace/debug/flowHistory和兼容actors字段。
POST：`bot` 必填，`flow` 若提供必须是整数；replay要求flow>0。参数在URL query，不读JSON body。

```sh
curl 'http://127.0.0.1:8787/api/state?bot=Worker&summary=true'
curl -X POST 'http://127.0.0.1:8787/api/debug/pause?bot=Worker'
curl -X POST 'http://127.0.0.1:8787/api/debug/replay?bot=Worker&flow=1'
```

## 状态模型 schemaVersion 2

| 字段 | 含义 |
| --- | --- |
| serverTick | 服务端当前tick |
| uiEnabled / summary / schemaVersion | 面板状态、摘要模式和响应版本 |
| bots | 当前在线Bot数组，不是全部历史假人 |
| bots[].name / dimension / position | 名字、当前维度、实际脚部浮点坐标 |
| bots[].vitals | health/maxHealth/hunger/saturation |
| bots[].task / lastTask | 当前或最近任务说明，不是成功证明 |
| bots[].activeTaskId / taskState | 活跃事件ID与当前/最近事件状态 |
| bots[].debug / flowHistory / trace | 全量模式中的调试会话、最多64条历史、执行trace |
| savedTasks | 供给检查点恢复记录；清场检查点不在这个注册器中 |
| savedTasks[].taskId / botName / status | 保存任务身份与状态 |
| savedTasks[].resumable / reason / unsettled | 能否恢复、原因和未结义务 |
| savedTasks[].position / revision | 保存时位置和检查点修订号，不是实时位置 |
| savedTasks[].remainingAtCheckpoint / consumedBudgets | 保存时未交付需求与累计预算 |
| recoveryIssues | 读取或恢复检查点问题 |
| actors | 仅全量响应保留的bots兼容别名 |

供给检查点剩余需求包含可能缺料的数量，不应当作Bot背包实际持有量。

## 返回与限制

POST通常返回HTTP200，仍需检查JSON `ok`；缺bot、未知bot、坏flow可能是 `ok:false` 并含 `error`。
不支持的方法/路径返回404；处理异常可返回500 JSON。游戏线程操作最多等待2秒。
未知debug action返回 `ok:false`，不能仅靠200判断操作成功。
`arm/next/replay`依赖旧计划调试控制器，不能保证任意Flow都支持按步骤重放。
该HTTP接口没有通用spawn、提交exec、取消任务、配置修改或数据库扫描路由。

## 执行入口目录

`GET /api/executables` 返回 `lattivium-executables-v1` 目录。`entries` 按入口名索引，包含 `kind`、`description`、`parameters`（JSON Schema）及 `example`。接口仅查询契约，不提交任务。
