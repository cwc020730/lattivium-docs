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

## BuildPerimeterSandWallFlow

逐列挖掘外围沟并填入真实沙子，建成指定高度的沙墙。

### 指令

```text
/lattivium Worker exec BuildPerimeterSandWallFlow {"innerMin":{"x":0,"y":62,"z":0},"size":6,"bottomY":37,"topY":62,"startDeck":{"x":-2,"y":63,"z":-1}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `innerMin` | `object` | `必填` |  |
| `innerMin.x` | `integer` | `必填` |  |
| `innerMin.y` | `integer` | `必填` |  |
| `innerMin.z` | `integer` | `必填` |  |
| `size` | `integer` | `必填` | minimum: 6; maximum: 16 |
| `bottomY` | `integer` | `必填` |  |
| `topY` | `integer` | `必填` |  |
| `startDeck` | `object` | `必填` |  |
| `startDeck.x` | `integer` | `必填` |  |
| `startDeck.y` | `integer` | `必填` |  |
| `startDeck.z` | `integer` | `必填` |  |
| `minimumOriginalSeabedBlocks` | `integer` | `10` | minimum: 0; maximum: 96 |
| `resumeSandColumns` | `integer` | `0` | minimum: 0; maximum: 67 |

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

## EnsureInventoryReadyFlow

准备已拥有的直接使用批次，归位库存并释放工作槽；任务批次使用 L1，容量需求通过共用来源查询和取货流程补充空运输盒。

### 指令

```text
/lattivium Worker exec EnsureInventoryReadyFlow {"demand":[{"item":"minecraft:sand","count":64}],"emptySlots":2,"taskSlots":true}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `demand` | `array` | `[]` | minItems: 0; maxItems: 128 |
| `demand[].item` | `string` | `必填` |  |
| `demand[].count` | `integer` | `必填` | minimum: 1 |
| `emptySlots` | `integer` | `2` | minimum: 0; maximum: 36 |
| `incoming` | `array` | `[]` | minItems: 0; maxItems: 128 |
| `incoming[].item` | `string` | `必填` |  |
| `incoming[].count` | `integer` | `必填` | minimum: 1 |
| `taskSlots` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

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

## ExcavateLayeredAreaFlow

从上到下逐层清理已隔离场地，先填液体再挖掘，可声明底部隔离，并记录仓储与普通掉落物回执。

### 指令

```text
/lattivium Worker exec ExcavateLayeredAreaFlow {"min":{"x":0,"y":47,"z":0},"max":{"x":15,"y":62,"z":15},"egress":{"x":0,"y":47,"z":7},"depots":[{"x":-6,"y":64,"z":7}]}
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
| `egress` | `object` | `必填` |  |
| `egress.x` | `integer` | `必填` |  |
| `egress.y` | `integer` | `必填` |  |
| `egress.z` | `integer` | `必填` |  |
| `depots` | `array` | `必填` | minItems: 1; maxItems: 8 |
| `depots[].x` | `integer` | `必填` |  |
| `depots[].y` | `integer` | `必填` |  |
| `depots[].z` | `integer` | `必填` |  |
| `additionalDepots` | `array` | `[]` | minItems: 0; maxItems: 16 |
| `additionalDepots[].x` | `integer` | `必填` |  |
| `additionalDepots[].y` | `integer` | `必填` |  |
| `additionalDepots[].z` | `integer` | `必填` |  |
| `sealBottom` | `boolean` | `false` |  |

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

## PrepareAndExcavatePerimeterFlow

建造四边沙墙、脚手架井、道路和工作站，逐层处理液体并清空区域，最后返回工作站；sealBottom 声明底部永久隔离，autonomousSupplies 使用通用流程获取物资。

### 指令

```text
/lattivium Worker exec PrepareAndExcavatePerimeterFlow {"innerMin":{"x":0,"y":62,"z":0},"size":16,"bottomY":47,"topY":62}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `innerMin` | `object` | `必填` |  |
| `innerMin.x` | `integer` | `必填` |  |
| `innerMin.y` | `integer` | `必填` |  |
| `innerMin.z` | `integer` | `必填` |  |
| `size` | `integer` | `必填` | minimum: 6; maximum: 16 |
| `bottomY` | `integer` | `必填` |  |
| `topY` | `integer` | `必填` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `3` | minimum: 2; maximum: 6 |
| `sealBottom` | `boolean` | `false` |  |
| `autonomousSupplies` | `boolean` | `false` |  |

## PreparePerimeterInfrastructureFlow

沿方形工地建四边沙墙、隔水脚手架井、永久道路和区外工作站。

### 指令

```text
/lattivium Worker exec PreparePerimeterInfrastructureFlow {"innerMin":{"x":0,"y":62,"z":0},"size":16,"bottomY":47,"topY":62}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `innerMin` | `object` | `必填` |  |
| `innerMin.x` | `integer` | `必填` |  |
| `innerMin.y` | `integer` | `必填` |  |
| `innerMin.z` | `integer` | `必填` |  |
| `size` | `integer` | `必填` | minimum: 6; maximum: 16 |
| `bottomY` | `integer` | `必填` |  |
| `topY` | `integer` | `必填` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `3` | minimum: 2; maximum: 6 |

## PrepareWorkstationFlow

在施工区外搭建工作站并配置容器。

### 指令

```text
/lattivium Worker exec PrepareWorkstationFlow {"origin":{"x":8,"y":64,"z":0},"excavationMin":{"x":0,"y":60,"z":0},"excavationMax":{"x":4,"y":64,"z":4}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `origin` | `object` | `必填` |  |
| `origin.x` | `integer` | `必填` |  |
| `origin.y` | `integer` | `必填` |  |
| `origin.z` | `integer` | `必填` |  |
| `excavationMin` | `object` | `必填` |  |
| `excavationMin.x` | `integer` | `必填` |  |
| `excavationMin.y` | `integer` | `必填` |  |
| `excavationMin.z` | `integer` | `必填` |  |
| `excavationMax` | `object` | `必填` |  |
| `excavationMax.x` | `integer` | `必填` |  |
| `excavationMax.y` | `integer` | `必填` |  |
| `excavationMax.z` | `integer` | `必填` |  |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `emptyBoxes` | `integer` | `4` | minimum: 0; maximum: 16 |
| `floor` | `string` | `""` |  |
| `fillBlocks` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `sand` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `scaffolding` | `integer` | `16` | minimum: 0; maximum: 1728 |
| `foundationDepth` | `integer` | `0` | minimum: 0; maximum: 1 |
| `headroom` | `integer` | `4` | minimum: 2; maximum: 6 |

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
