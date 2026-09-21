# States and failure codes

Execution progresses from `QUEUED` to `RUNNING`, with `WAITING_FOR_CHUNK` and `WAITING_FOR_SERVER` available for wait states. Terminal states are `SUCCEEDED`, `FAILED` and `CANCELLED`. Supply outcomes additionally report delivered quantities and shortages.

## BotFailureCode

| Code | Meaning |
| --- | --- |
| `NO_PATH` | No usable path within budget |
| `PATH_TIMEOUT` | Path search timed out |
| `STUCK` | Movement made no progress |
| `TARGET_CHANGED` | Expected target state changed |
| `OUT_OF_REACH` | Target is outside interaction reach |
| `MISSING_ITEM` | Required item or resource missing |
| `INVENTORY_FULL` | Insufficient inventory capacity |
| `SOURCE_UNAVAILABLE` | Source protected, unknown or unavailable |
| `TOOL_MISSING` | Suitable mining tool missing |
| `TOOL_EXHAUSTED` | Tool durability exhausted |
| `INTERACTION_REJECTED` | Native interaction rejected |
| `CONTAINER_DESYNC` | Container or transfer state desynchronized |
| `CHUNK_UNLOADED` | Required chunk unloaded |
| `ACTOR_DIED` | Bot died |
| `ACTOR_DISCONNECTED` | Bot disconnected |
| `UNSUPPORTED` | Unsupported operation |
| `TIMEOUT` | Operation timed out |
| `CANCELLED` | Cancelled |
| `INTERNAL_ERROR` | Internal error |
