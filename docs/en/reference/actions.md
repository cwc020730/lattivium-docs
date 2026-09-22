---
pageClass: execution-reference
outline: 2
---

# Action

Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.

## JumpAction

Press jump once.

### Command

```text
/lattivium Worker exec JumpAction {}
```

Parameters: `{}`.

### Positional syntax

```text
/lattivium <Bot> exec JumpAction
```

## LookAction

Look at a world position.

### Command

```text
/lattivium Worker exec LookAction {"target":{"x":0,"y":65,"z":0}}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `target` | `object` | `Required` |  |
| `target.x` | `number` | `Required` |  |
| `target.y` | `number` | `Required` |  |
| `target.z` | `number` | `Required` |  |
| `toleranceDegrees` | `number` | `1.5` | minimum: 0 |
| `maxAttempts` | `integer` | `3` | minimum: 1 |

### Positional syntax

```text
/lattivium <Bot> exec LookAction <x> <y> <z> [toleranceDegrees maxAttempts]
```

## MouseAction

Apply a mouse button input.

### Command

```text
/lattivium Worker exec MouseAction {"button":"RIGHT","mode":"ONCE"}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `button` | `string` | `Required` | `LEFT`, `RIGHT` |
| `mode` | `string` | `Required` | `ONCE`, `CONTINUOUS` |

### Positional syntax

```text
/lattivium <Bot> exec MouseAction <LEFT|RIGHT> <ONCE|CONTINUOUS>
```

## MoveAction

Hold directional input for a fixed number of ticks; does not find a path.

### Command

```text
/lattivium Worker exec MoveAction {"direction":"FORWARD","ticks":20}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `direction` | `string` | `Required` | `FORWARD`, `BACKWARD`, `LEFT`, `RIGHT` |
| `ticks` | `integer` | `Required` | minimum: 1; maximum: 2.14748e+09 |
| `strength` | `number` | `1` | minimum: 0; maximum: 1 |
| `sprint` | `boolean` | `false` |  |

### Positional syntax

```text
/lattivium <Bot> exec MoveAction <FORWARD|BACKWARD|LEFT|RIGHT> <ticks> [strength] [sprint]
```

## MoveItemToOffhandAction

Move a carried item into the offhand.

### Command

```text
/lattivium Worker exec MoveItemToOffhandAction {"item":"minecraft:firework_rocket"}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `item` | `string` | `Required` |  |

### Positional syntax

```text
/lattivium <Bot> exec MoveItemToOffhandAction <item>
```

## SelectHotbarAction

Select a zero-based hotbar slot.

### Command

```text
/lattivium Worker exec SelectHotbarAction {"slot":0}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `slot` | `integer` | `Required` | minimum: 0; maximum: 8 |

### Positional syntax

```text
/lattivium <Bot> exec SelectHotbarAction <zeroBasedSlot>
```

## TransferAction

Quick-move a half-open range of native menu slots.

### Command

```text
/lattivium Worker exec TransferAction {"startSlotInclusive":0,"endSlotExclusive":1}
```

### Parameters

| Field | Type | Default | Constraints |
| --- | --- | --- | --- |
| `startSlotInclusive` | `integer` | `Required` | minimum: 0 |
| `endSlotExclusive` | `integer` | `Required` | minimum: 0 |

### Positional syntax

```text
/lattivium <Bot> exec TransferAction <startSlotInclusive> <endSlotExclusive>
```
