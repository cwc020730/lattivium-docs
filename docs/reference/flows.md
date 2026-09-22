---
pageClass: execution-reference
outline: 2
---

# Flow

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## AccessContainerFlow

接近并打开容器。

### 指令

```text
/lattivium Worker exec AccessContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec AccessContainerFlow <x> <y> <z>
```

## AcquireContainerItemsFlow

从指定容器取得所需物品。

### 指令

```text
/lattivium Worker exec AcquireContainerItemsFlow {"source":{"x":0,"y":64,"z":0},"item":"minecraft:stone","count":64}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `source` | `object` | `必填` |  |
| `source.x` | `integer` | `必填` |  |
| `source.y` | `integer` | `必填` |  |
| `source.z` | `integer` | `必填` |  |
| `item` | `string` | `必填` |  |
| `count` | `integer` | `必填` | minimum: 1 |

### 位置参数写法

```text
/lattivium <Bot> exec AcquireContainerItemsFlow <x> <y> <z> <item> <count>
```

## ApproachAreaFlow

在当前维度内通过飞行或地面移动接近目标区域。

### 指令

```text
/lattivium Worker exec ApproachAreaFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |
| `arriveDistance` | `number` | `0.6` | minimum: 1e-06 |
| `settlingTicks` | `integer` | `240` | minimum: 1 |
| `cruiseHeight` | `integer` | `325` | minimum: 321 |

### 位置参数写法

```text
/lattivium <Bot> exec ApproachAreaFlow <x> <y> <z> [arriveDistance settlingTicks cruiseHeight]
```

## BuildSchematicFlow

在当前维度的指定原点建造原理图。

### 指令

```text
/lattivium Worker exec BuildSchematicFlow {"file":"example.litematic","origin":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` | 支持：.litematic; 服务端世界目录下的 `lattivium-atlas/schematics/` |
| `origin` | `object` | `必填` |  |
| `origin.x` | `number` | `必填` |  |
| `origin.y` | `number` | `必填` |  |
| `origin.z` | `number` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec BuildSchematicFlow <file.litematic> <x> <y> <z>
```

## ElytraFlightFlow

使用鞘翅飞向目标。

### 指令

```text
/lattivium Worker exec ElytraFlightFlow {"target":{"x":0,"y":150,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec ElytraFlightFlow <x> <y> <z>
```

## ExcavateAreaFlow

清空包含两端的区域并将掉落物存入区外仓储；可指定液体封堵点。

### 指令

```text
/lattivium Worker exec ExcavateAreaFlow {"min":{"x":0,"y":64,"z":0},"max":{"x":4,"y":66,"z":4},"depots":[{"x":8,"y":64,"z":0}]}
```

### 参数

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

### 位置参数写法

```text
/lattivium <Bot> exec ExcavateAreaFlow <taskUUID> | <minX minY minZ> <maxX maxY maxZ> <depot triples> [--seal <outside seal triples>]
```

## FireworkReserveFlow

根据行程距离补充烟花储备。

### 指令

```text
/lattivium Worker exec FireworkReserveFlow {"horizontalDistance":1000}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `horizontalDistance` | `number` | `必填` | minimum: 0 |

### 位置参数写法

```text
/lattivium <Bot> exec FireworkReserveFlow <horizontalDistance>
```

## FireworkUseFlow

使用烟花推动飞行。

### 指令

```text
/lattivium Worker exec FireworkUseFlow {}
```

参数：`{}`。

### 位置参数写法

```text
/lattivium <Bot> exec FireworkUseFlow
```

## LocalNavigationFlow

在当前维度内执行局部寻路，到达目标脚位。

### 指令

```text
/lattivium Worker exec LocalNavigationFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec LocalNavigationFlow <x> <y> <z>
```

## MineBlockFlow

按施工保护与掉落规则挖掘一个方块。

### 指令

```text
/lattivium Worker exec MineBlockFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `number` | `必填` |  |
| `target.y` | `number` | `必填` |  |
| `target.z` | `number` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec MineBlockFlow <x> <y> <z>
```

## OpenContainerFlow

打开触及范围内的容器。

### 指令

```text
/lattivium Worker exec OpenContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec OpenContainerFlow <x> <y> <z>
```

## PortalJourneyFlow

穿越指定传送路线并离开出口触发区；target 用于路线选择。

### 指令

```text
/lattivium Worker exec PortalJourneyFlow {"destinationDimension":"minecraft:the_nether","entrance":{"x":0,"y":64,"z":0},"exit":{"x":0,"y":129,"z":0}}
```

### 参数

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
| `target` | `optional` | `必填` | 路线选择参考点；完成条件为离开传送出口触发区 |

### 位置参数写法

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

## ResumeExcavation

从世界中保存的检查点恢复清场任务。

### 指令

```text
/lattivium Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `taskId` | `string` | `必填` | 清场检查点 UUID |

## TransferItemsFlow

按方向和数量转移指定物品。

### 指令

```text
/lattivium Worker exec TransferItemsFlow {"direction":"WITHDRAW","item":"minecraft:stone","count":64}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `direction` | `string` | `必填` | `DEPOSIT`, `WITHDRAW` |
| `item` | `string` | `必填` |  |
| `count` | `integer` | `必填` | minimum: 1 |

### 位置参数写法

```text
/lattivium <Bot> exec TransferItemsFlow <DEPOSIT|WITHDRAW> <item> <count>
```

## TravelToFlow

使用 Atlas 传送门路线与局部导航，到达指定维度的目标脚位。

### 指令

```text
/lattivium Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `dimension` | `string` | `必填` | 服务端已加载的维度标识符 |
| `target` | `object` | `必填` | Bot 脚位；到达方块底面中心 0.75 格范围内 |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec TravelToFlow <dimension> <x> <y> <z>
```

## UseFlow

对目标方块使用指定手。

### 指令

```text
/lattivium Worker exec UseFlow {"target":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `target` | `object` | `必填` |  |
| `target.x` | `integer` | `必填` |  |
| `target.y` | `integer` | `必填` |  |
| `target.z` | `integer` | `必填` |  |
| `hand` | `string` | `"MAIN_HAND"` | `MAIN_HAND`, `OFF_HAND` |

### 位置参数写法

```text
/lattivium <Bot> exec UseFlow <x> <y> <z> [MAIN_HAND|OFF_HAND]
```
