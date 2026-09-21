# Action

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## JumpAction

执行跳跃。

```text
/lattivium Worker exec JumpAction {}
```

## LookAction

看向指定位置。

```text
/lattivium Worker exec LookAction {"target":{"x":0,"y":65,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |
| `toleranceDegrees` | `number` | `1.5` | minimum: 0 |
| `maxAttempts` | `integer` | `3` | minimum: 1 |

## MouseAction

执行鼠标按键输入。

```text
/lattivium Worker exec MouseAction {"button":"RIGHT","mode":"ONCE"}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `button` | `string` | `必填` | `LEFT`, `RIGHT` |
| `mode` | `string` | `必填` | `ONCE`, `CONTINUOUS` |

## MoveAction

按指定方向、强度和时长移动。

```text
/lattivium Worker exec MoveAction {"direction":"FORWARD","ticks":20}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `direction` | `string` | `必填` | `FORWARD`, `BACKWARD`, `LEFT`, `RIGHT` |
| `ticks` | `integer` | `必填` | minimum: 1; maximum: 2.14748e+09 |
| `strength` | `number` | `1` | minimum: 0; maximum: 1 |
| `sprint` | `boolean` | `false` |  |

## MoveItemToOffhandAction

将指定物品放入副手。

```text
/lattivium Worker exec MoveItemToOffhandAction {"item":"minecraft:firework_rocket"}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `item` | `string` | `必填` |  |

## SelectHotbarAction

选择快捷栏槽位。

```text
/lattivium Worker exec SelectHotbarAction {"slot":0}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `slot` | `integer` | `必填` | minimum: 0; maximum: 8 |

## TransferAction

转移当前菜单中指定范围的物品。

```text
/lattivium Worker exec TransferAction {"startSlotInclusive":0,"endSlotExclusive":1}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `startSlotInclusive` | `integer` | `必填` | minimum: 0 |
| `endSlotExclusive` | `integer` | `必填` | minimum: 0 |
