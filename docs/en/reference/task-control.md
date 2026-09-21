# Task control

`/ltv` is the short alias for `/lattivium`. These commands require permission level 2 by default, configured through `commandPermissionLevel`.

## Submit and queue

| Command | Behavior |
| --- | --- |
| `/ltv <Bot> exec <entry> <parameters>` | Accept while idle; reject when active work, queued work or a cleanup block exists |
| `/ltv <Bot> enqueue <entry> <parameters>` | Append to the Bot's FIFO queue |
| `/ltv <Bot> interrupt <entry> <parameters>` | Cancel the active task and put the replacement at the front of the waiting queue |

All three share entry discovery and validation. Parameters may be JSON or the entry's positional syntax. Acceptance messages include `task=<UUID>`, the Bot name and initial state.

Each Bot runs one root task and holds at most 32 waiting tasks. A queued task retains its ID; execution budgets and trace recording start when it receives the execution slot. Interruption preserves existing queued work. The replacement starts after the active task finishes cleanup.

## Inspect and cancel

```text
/ltv Worker tasks
/ltv Worker status <taskId>
/ltv Worker cancel <taskId>
```

`tasks` lists active, queued and retained terminal tasks, plus `cleanupBlockedBy`. `status` reports the selected task's state, description and failure. Queries are scoped to the specified Bot.

Cancelling queued work marks it `CANCELLED` immediately. Active cancellation runs cleanup on a scheduler tick before publishing its terminal state. Completed world changes remain; each operation owns cleanup of borrowed containers and temporary facilities.

## Cleanup blocks

An operation cleanup or input-release failure blocks queue admission and new submissions. Inspect logs, trace and the world, resolve outstanding obligations, then run:

```text
/ltv Worker acknowledge-cleanup
```

This acknowledges the repair, releases inputs and allows queued work to continue. The failed task's history remains available.

## IDs and recovery

A task ID tracks one submission. `terminalTaskHistory` controls retained terminal records. Queues live in the current server process. During a normal shutdown, active checkpoint-capable tasks use their own persistence mechanism; waiting tasks are cancelled.

`interrupt` cancels the original task. Later recovery uses its existing [checkpoint mechanism](../guide/recovery). Excavation recovery uses the business `taskId` recorded in the excavation trace.
