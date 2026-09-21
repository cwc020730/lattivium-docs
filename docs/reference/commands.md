# 位置参数与诊断命令

本页列出位置参数语法、性能命令和 Atlas 诊断命令。新集成建议使用 [JSON 执行入口](./executables)。
尖括号表示必填参数，方括号表示可选；实际输入不写括号。

```text
/lattivium <BotName> exec <RegisteredClassName> <parameters>
```

默认权限等级2，可由 `commandPermissionLevel` 改变。类名区分大小写，可用补全查询。
数字坐标为绝对坐标，不接受 `~` 或 `^`；参数按空白分隔，除旧计划名外不提供通用引号解析。
下面的坐标全是演示值，运行前替换。命令成功返回排队事件，不等于任务完成。

## 按用途选择

| 用途 | 入口 |
| --- | --- |
| 收集并交付 | AtlasSupplyTask |
| 规划预览 | AtlasProductionPreviewTask |
| 清场 / 恢复 | ExcavateAreaFlow |
| 原理图施工 | BuildSchematicFlow |
| 移动 / 穿门 | NavigateToPosFlow / PortalJourneyFlow |
| 指定容器取物 | AcquireContainerItemsFlow |
| 精确菜单转移 | TransferItemsFlow |

## AtlasSupplyTask

按原理图、材料表或冻结分段取货并交付；前两类实际执行模式可规划普通合成。

```text
/lattivium <Bot> exec AtlasSupplyTask <file> <deliveryDimension> <x> <y> <z> [USE_LOOSE_CARGO] [DEBUG|SOURCE_PRESERVING_DEBUG] [DELIVER_TO <dimension> <x> <y> <z>]...
```

交付最多32处，目标互异。模式互斥；后缀选项区分大小写。见材料指南。

示例：

```text
/lattivium Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

## AtlasProductionPreviewTask

只预览生产计划。

```text
/lattivium <Bot> exec AtlasProductionPreviewTask <file.litematic|file.materials.json> <deliveryDimension> <x> <y> <z>
```

不接受 segment、执行模式或额外交付参数；仍需知识库和合法输入。

示例：

```text
/lattivium Worker exec AtlasProductionPreviewTask machine.litematic minecraft:overworld 100 64 100
```

## ExcavateAreaFlow

区域清理或恢复清场检查点。

```text
/lattivium <Bot> exec ExcavateAreaFlow <taskUUID> 或 <minX minY minZ> <maxX maxY maxZ> <depot triples> [--seal <outside seal triples>]
```

生存模式，范围包含端点；至少1个区外仓储点。会破坏授权区域普通方块。

示例：

```text
/lattivium Worker exec ExcavateAreaFlow 100 64 100 101 65 101 98 64 100
```

## BuildSchematicFlow

有界原理图施工。

```text
/lattivium <Bot> exec BuildSchematicFlow <file.litematic> <x> <y> <z>
```

文件位于世界 schematics 目录；不是任意建造承诺。

示例：

```text
/lattivium Worker exec BuildSchematicFlow small.litematic 100 65 100
```

## MineBlockFlow

原生挖掘一个经施工保护检查的方块。

```text
/lattivium <Bot> exec MineBlockFlow <x> <y> <z>
```

会产生真实掉落；该入口不等于清场的拾取和仓储闭环。

示例：

```text
/lattivium Worker exec MineBlockFlow 100 65 100
```

## NavigateToPosFlow

当前维度局部导航。

```text
/lattivium <Bot> exec NavigateToPosFlow <x> <y> <z>
```

目标是脚位，不是自动开箱；无需另外提供维度参数。

示例：

```text
/lattivium Worker exec NavigateToPosFlow 100 65 100
```

## ApproachAreaFlow

飞行接近一个区域。

```text
/lattivium <Bot> exec ApproachAreaFlow <x> <y> <z> [arriveDistance settlingTicks cruiseHeight]
```

可选策略须三个参数一起给；区域接近不代表精确交互到位。

示例：

```text
/lattivium Worker exec ApproachAreaFlow 100 80 100
```

## PortalJourneyFlow

带显式门提示的真实跨维度旅行。

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

入口在当前维度；出口、最终目标在目标维度。示例门必须换成实际存在的门。

示例：

```text
/lattivium Worker exec PortalJourneyFlow minecraft:the_nether 100 65 100 12 129 12 20 129 20
```

## ElytraFlightFlow

执行飞行子流程。

```text
/lattivium <Bot> exec ElytraFlightFlow <x> <y> <z>
```

需要实际飞行条件和装备；不是跨维度任务入口。

示例：

```text
/lattivium Worker exec ElytraFlightFlow 100 80 100
```

## FireworkUseFlow

执行烟花使用子流程。

```text
/lattivium <Bot> exec FireworkUseFlow 
```

需要可用烟花和适用状态；不是发放烟花。

示例：

```text
/lattivium Worker exec FireworkUseFlow 
```

## FireworkReserveFlow

按非负水平距离准备飞行烟花储备。

```text
/lattivium <Bot> exec FireworkReserveFlow <horizontalDistance>
```

使用实际携带资源和流程能力，不会凭空生成烟花。

示例：

```text
/lattivium Worker exec FireworkReserveFlow 200
```

## UseFlow

朝方块执行使用交互。

```text
/lattivium <Bot> exec UseFlow <x> <y> <z> [MAIN_HAND|OFF_HAND]
```

默认主手；交互可能改变世界，须满足实际触及条件。

示例：

```text
/lattivium Worker exec UseFlow 100 65 100 MAIN_HAND
```

## OpenContainerFlow

尝试开箱并核验菜单。

```text
/lattivium <Bot> exec OpenContainerFlow <x> <y> <z>
```

面向已可交互的目标；需要完整接近逻辑时使用 AccessContainerFlow。

示例：

```text
/lattivium Worker exec OpenContainerFlow 100 64 100
```

## AccessContainerFlow

完整接近、定位和访问容器。

```text
/lattivium <Bot> exec AccessContainerFlow <x> <y> <z>
```

是访问流程，不自动指定取货物品。

示例：

```text
/lattivium Worker exec AccessContainerFlow 100 64 100
```

## TransferItemsFlow

在当前容器菜单中精确存取指定物品。

```text
/lattivium <Bot> exec TransferItemsFlow <DEPOSIT|WITHDRAW> <item> <count>
```

方向必须大写、数量为正；先访问正确容器，不能仅靠当前位置推定菜单。

示例：

```text
/lattivium Worker exec TransferItemsFlow WITHDRAW minecraft:stone 16
```

## AcquireContainerItemsFlow

到来源容器取指定正数量物品。

```text
/lattivium <Bot> exec AcquireContainerItemsFlow <x> <y> <z> <item> <count>
```

集成访问、容量、借盒及真实回执；没有最终交付目标。

示例：

```text
/lattivium Worker exec AcquireContainerItemsFlow 100 64 100 minecraft:stone 16
```

## JumpAction

一次跳跃输入。

```text
/lattivium <Bot> exec JumpAction 
```

低层动作，不寻路。

示例：

```text
/lattivium Worker exec JumpAction 
```

## MoveAction

按 Bot 朝向持续移动输入。

```text
/lattivium <Bot> exec MoveAction <FORWARD|BACKWARD|LEFT|RIGHT> <ticks> [strength] [sprint]
```

ticks>0；strength默认1且范围0–1；sprint默认false，给sprint时也须给strength。不负责避障。

示例：

```text
/lattivium Worker exec MoveAction FORWARD 20 1.0 false
```

## LookAction

看向世界坐标。

```text
/lattivium <Bot> exec LookAction <x> <y> <z> [toleranceDegrees maxAttempts]
```

默认容差1.5度、最多3次尝试；可选参数一起提供。

示例：

```text
/lattivium Worker exec LookAction 100 65 100
```

## MouseAction

低层攻击或使用输入。

```text
/lattivium <Bot> exec MouseAction <LEFT|RIGHT> <ONCE|CONTINUOUS>
```

会触发真实交互；CONTINUOUS不是完整业务流程。

示例：

```text
/lattivium Worker exec MouseAction RIGHT ONCE
```

## MoveItemToOffhandAction

将指定物品移动到副手。

```text
/lattivium <Bot> exec MoveItemToOffhandAction <item>
```

物品必须是已注册 ID；需有实际库存。

示例：

```text
/lattivium Worker exec MoveItemToOffhandAction minecraft:firework_rocket
```

## SelectHotbarAction

选择快捷栏。

```text
/lattivium <Bot> exec SelectHotbarAction <zeroBasedSlot>
```

索引从0开始；普通快捷栏0–8。

示例：

```text
/lattivium Worker exec SelectHotbarAction 0
```

## TransferAction

对当前菜单槽位范围执行低层转移。

```text
/lattivium <Bot> exec TransferAction <startSlotInclusive> <endSlotExclusive>
```

半开区间，菜单槽号不是固定的背包槽号；业务精确数量用 TransferItemsFlow。

示例：

```text
/lattivium Worker exec TransferAction 0 1
```

## ItemRecordPlanTask

兼容旧 ItemRecord 玩家计划。

```text
/lattivium <Bot> exec ItemRecordPlanTask [PACKED] [DEBUG] [planName]
```

必须真人在游戏内发起，不能从控制台/RCON替代 requester。计划名可带引号。

示例：

```text
/lattivium Worker exec ItemRecordPlanTask PACKED DEBUG example
```

## SupplyStepFlow

兼容入口：调试 ItemRecord 的指定计划步骤。

```text
/lattivium <Bot> exec SupplyStepFlow DEBUG <planName> <planStep>
```

实际上构造 ItemRecordStepTask；必须游戏内玩家发起。它不是任意内部 SupplyStepFlow 构造器。

示例：

```text
/lattivium Worker exec SupplyStepFlow DEBUG example 1
```

## DelayTask

等待指定游戏 tick。

```text
/lattivium <Bot> exec DelayTask <durationTicks>
```

范围1–1200，默认20TPS下20tick约1秒。

示例：

```text
/lattivium Worker exec DelayTask 20
```

## 性能诊断

权限等级2。统计的是整个服务端 tick，不只 Bot 自身。

| 命令 | 作用 |
| --- | --- |
| `/lattiviumperf start <phase>` | 新测量窗口；phase单词最长80字符，替换旧测量并停止旧容器监测 |
| `/lattiviumperf report` | 输出当前窗口统计 |
| `/lattiviumperf stop` | 返回统计并停止测量/监测 |
| `/lattiviumperf watchcount <x> <y> <z>` | 监测已加载容器顶层数量变化，JFR最多记录256次变化 |

`watchcount` 使用原版 BlockPos 参数，和 exec 的数字解析不同。

## Atlas 诊断

`/lattiviumatlas status`：权限等级2，输出扫描/观察/卸载/传送记录/数据库队列统计。
它不主动扫描或加载区块；尚未就绪会返回错误。
