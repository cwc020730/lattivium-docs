# 位置参数与诊断命令

`exec`、`enqueue` 和 `interrupt` 同时接受位置参数和 JSON。位置参数按空白分隔，含空格的值使用 JSON。坐标采用绝对值。两种形式共用参数校验与任务调度。

## AccessContainerFlow

接近并打开容器。

```text
/lattivium <Bot> exec AccessContainerFlow <x> <y> <z>
```

## AcquireContainerItemsFlow

从指定容器取得所需物品。

```text
/lattivium <Bot> exec AcquireContainerItemsFlow <x> <y> <z> <item> <count>
```

## ApproachAreaFlow

通过旅行与局部导航接近目标区域。

```text
/lattivium <Bot> exec ApproachAreaFlow <x> <y> <z> [arriveDistance settlingTicks cruiseHeight]
```

## AtlasProductionPreviewTask

预览材料生产计划。

```text
/lattivium <Bot> exec AtlasProductionPreviewTask <file.litematic|file.materials.json> <deliveryDimension> <x> <y> <z>
```

## AtlasSupplyTask

根据 Atlas 库存规划、取货、合成并交付材料。

```text
/lattivium <Bot> exec AtlasSupplyTask <file> <deliveryDimension> <x> <y> <z> [USE_LOOSE_CARGO] [DEBUG|SOURCE_PRESERVING_DEBUG] [DELIVER_TO <dimension> <x> <y> <z>]...
```

## BuildSchematicFlow

在当前维度的指定原点建造原理图。

```text
/lattivium <Bot> exec BuildSchematicFlow <file.litematic> <x> <y> <z>
```

## DelayTask

等待指定游戏刻数。

```text
/lattivium <Bot> exec DelayTask <durationTicks>
```

## ElytraFlightFlow

使用鞘翅飞向目标。

```text
/lattivium <Bot> exec ElytraFlightFlow <x> <y> <z>
```

## ExcavateAreaFlow

清空包含两端的区域并将掉落物存入区外仓储；可指定液体封堵点。

```text
/lattivium <Bot> exec ExcavateAreaFlow <taskUUID> | <minX minY minZ> <maxX maxY maxZ> <depot triples> [--seal <outside seal triples>]
```

## FireworkReserveFlow

根据行程距离补充烟花储备。

```text
/lattivium <Bot> exec FireworkReserveFlow <horizontalDistance>
```

## FireworkUseFlow

使用烟花推动飞行。

```text
/lattivium <Bot> exec FireworkUseFlow
```

## JumpAction

执行跳跃。

```text
/lattivium <Bot> exec JumpAction
```

## LookAction

看向指定位置。

```text
/lattivium <Bot> exec LookAction <x> <y> <z> [toleranceDegrees maxAttempts]
```

## MineBlockFlow

按施工保护与掉落规则挖掘一个方块。

```text
/lattivium <Bot> exec MineBlockFlow <x> <y> <z>
```

## MouseAction

执行鼠标按键输入。

```text
/lattivium <Bot> exec MouseAction <LEFT|RIGHT> <ONCE|CONTINUOUS>
```

## MoveAction

按指定方向、强度和时长移动。

```text
/lattivium <Bot> exec MoveAction <FORWARD|BACKWARD|LEFT|RIGHT> <ticks> [strength] [sprint]
```

## MoveItemToOffhandAction

将指定物品放入副手。

```text
/lattivium <Bot> exec MoveItemToOffhandAction <item>
```

## NavigateToPosFlow

导航到当前维度的目标脚位。

```text
/lattivium <Bot> exec NavigateToPosFlow <x> <y> <z>
```

## OpenContainerFlow

打开触及范围内的容器。

```text
/lattivium <Bot> exec OpenContainerFlow <x> <y> <z>
```

## PortalJourneyFlow

根据入口和出口提示穿门，并前往可选的最终目标。

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

## SelectHotbarAction

选择快捷栏槽位。

```text
/lattivium <Bot> exec SelectHotbarAction <zeroBasedSlot>
```

## TransferAction

转移当前菜单中指定范围的物品。

```text
/lattivium <Bot> exec TransferAction <startSlotInclusive> <endSlotExclusive>
```

## TransferItemsFlow

按方向和数量转移指定物品。

```text
/lattivium <Bot> exec TransferItemsFlow <DEPOSIT|WITHDRAW> <item> <count>
```

## UseFlow

对目标方块使用指定手。

```text
/lattivium <Bot> exec UseFlow <x> <y> <z> [MAIN_HAND|OFF_HAND]
```

## 诊断命令

下列命令使用固定参数命令树，需要权限等级 2。

```text
/lattiviumperf start <phase>
/lattiviumperf report
/lattiviumperf stop
/lattiviumperf watchcount <x> <y> <z>
/lattiviumatlas status
```

`start` 开始服务端 tick 测量窗口，`report` 读取统计，`stop` 结束测量。`phase` 为最长 80 字符的单词。`watchcount` 监测已加载容器变化，在 JFR 中最多记录 256 次，坐标使用原版方块位置语法。Atlas 状态命令报告扫描和数据库队列。
