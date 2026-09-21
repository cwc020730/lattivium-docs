# Recovery and troubleshooting

## Execution status

Use `/ltv Worker tasks`, then `/ltv Worker status <taskId>` for a specific result. In the debug panel, `position` is the Bot's live feet position; `savedTasks[].position` is the position at checkpoint time.

Submission, acquisition and delivery are recorded separately. Assess supply outcomes using delivered quantities, shortages and outstanding obligations.

## Checkpoints

Supply checkpoints live in the world's `lattivium/tasks/` directory. After a normal shutdown, the recovery registry attempts eligible tasks when a Bot with the same UUID rejoins and is idle. Inventory differences, conflicting unfinished tasks or unsettled obligations block recovery. Records left running by an abnormal exit become `BLOCKED` for inspection.

Excavation checkpoints live in `lattivium/excavations/`. Use `ResumeExcavation` with the business task ID from the excavation trace. Recovery validates the Bot, dimension, inventory, receipts and remaining budgets.

## Troubleshooting

| Symptom | Inspect |
| --- | --- |
| Busy Bot | Active task and queue; choose enqueue or interrupt |
| Cleanup blocked | `cleanupBlockedBy`, logs and remaining world facilities |
| Stock missing | Atlas index readiness, protection and structure exclusions |
| Quantity mismatch | Actual container contents and observation time |
| Navigation failure | Dimension, Bot feet position, target and search budget |
| Recovery rejected | Checkpoint reason, actual inventory and obligations |

Cross-check traces with entities, containers and block states. When a source is unreachable within budget, supply execution seeks alternatives or reports the shortage while completing remaining obligations.
