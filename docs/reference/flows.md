# Flow

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## AccessContainerFlow

接近并打开容器。

```text
/lattivium Worker exec AccessContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |

## AcquireContainerItemsFlow

从指定容器取得所需物品。

```text
/lattivium Worker exec AcquireContainerItemsFlow {"source":{"x":0,"y":64,"z":0},"item":"minecraft:stone","count":64}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `source` | `object` | `必填` |  |
| `source.x` | `integer` | `必填` |  |
| `source.y` | `integer` | `必填` |  |
| `source.z` | `integer` | `必填` |  |
| `item` | `string` | `必填` |  |
| `count` | `integer` | `必填` | minimum: 1 |

## ApproachAreaFlow

通过旅行与局部导航接近目标区域。

```text
/lattivium Worker exec ApproachAreaFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |
| `arriveDistance` | `number` | `0.6` | minimum: 1e-06 |
| `settlingTicks` | `integer` | `240` | minimum: 1 |
| `cruiseHeight` | `integer` | `325` | minimum: 321 |

## BuildSchematicFlow

在当前维度的指定原点建造原理图。

```text
/lattivium Worker exec BuildSchematicFlow {"file":"example.litematic","origin":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` |  |
| `origin` | `object` | `必填` |  |
| `origin.x` | `number` | `必填` |  |
| `origin.y` | `number` | `必填` |  |
| `origin.z` | `number` | `必填` |  |

## ElytraFlightFlow

使用鞘翅飞向目标。

```text
/lattivium Worker exec ElytraFlightFlow {"target":{"x":0,"y":150,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

## ExcavateAreaFlow

清空包含两端的区域并将掉落物存入区外仓储；可指定液体封堵点。

```text
/lattivium Worker exec ExcavateAreaFlow {"min":{"x":0,"y":64,"z":0},"max":{"x":4,"y":66,"z":4},"depots":[{"x":8,"y":64,"z":0}]}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `min` | `object` | `必填` |  |
| `min.x` | `integer` | `必填` |  |
| `min.y` | `integer` | `必填` |  |
| `min.z` | `integer` | `必填` |  |
| `max` | `object` | `必填` |  |
| `max.x` | `integer` | `必填` |  |
| `max.y` | `integer` | `必填` |  |
| `max.z` | `integer` | `必填` |  |
| `depots` | `array` | `必填` | minItems: 1; maxItems: 1024 |
| `depots[].x` | `integer` | `必填` |  |
| `depots[].y` | `integer` | `必填` |  |
| `depots[].z` | `integer` | `必填` |  |
| `sealDepots` | `array` | `[]` | minItems: 0; maxItems: 1024 |
| `sealDepots[].x` | `integer` | `必填` |  |
| `sealDepots[].y` | `integer` | `必填` |  |
| `sealDepots[].z` | `integer` | `必填` |  |

## FireworkReserveFlow

根据行程距离补充烟花储备。

```text
/lattivium Worker exec FireworkReserveFlow {"horizontalDistance":1000}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `horizontalDistance` | `number` | `必填` | minimum: 0 |

## FireworkUseFlow

使用烟花推动飞行。

```text
/lattivium Worker exec FireworkUseFlow {}
```

## MineBlockFlow

按施工保护与掉落规则挖掘一个方块。

```text
/lattivium Worker exec MineBlockFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

## NavigateToPosFlow

导航到当前维度的目标脚位。

```text
/lattivium Worker exec NavigateToPosFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

## OpenContainerFlow

打开触及范围内的容器。

```text
/lattivium Worker exec OpenContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |

## PortalJourneyFlow

根据入口和出口提示穿门，并前往可选的最终目标。

```text
/lattivium Worker exec PortalJourneyFlow {"destinationDimension":"minecraft:the_nether","entrance":{"x":0,"y":64,"z":0},"exit":{"x":0,"y":129,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `destinationDimension` | `string` | `必填` |  |
| `entrance` | `object` | `必填` |  |
| `entrance.x` | `integer` | `必填` |  |
| `entrance.y` | `integer` | `必填` |  |
| `entrance.z` | `integer` | `必填` |  |
| `exit` | `object` | `必填` |  |
| `exit.x` | `integer` | `必填` |  |
| `exit.y` | `integer` | `必填` |  |
| `exit.z` | `integer` | `必填` |  |
| `target` | `optional` | `必填` |  |

## ResumeExcavation

从世界中保存的检查点恢复清场任务。

```text
/lattivium Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `taskId` | `string` | `必填` |  |

## TransferItemsFlow

按方向和数量转移指定物品。

```text
/lattivium Worker exec TransferItemsFlow {"direction":"WITHDRAW","item":"minecraft:stone","count":64}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `direction` | `string` | `必填` | `DEPOSIT`, `WITHDRAW` |
| `item` | `string` | `必填` |  |
| `count` | `integer` | `必填` | minimum: 1 |

## UseFlow

对目标方块使用指定手。

```text
/lattivium Worker exec UseFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |
| `hand` | `string` | `"MAIN_HAND"` | `MAIN_HAND`, `OFF_HAND` |

