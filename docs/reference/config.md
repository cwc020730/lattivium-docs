# 配置选项

文件：`config/auto-build-bot.json`，由服务端启动加载并补写新增默认字段。
当前没有公开 reload 命令；正常停止、编辑、启动最明确。
配置无效可能导致整份配置回退默认值，应检查启动日志，不能认为只有一个字段被忽略。

以下覆盖全部公开配置字段。默认值来自代码，不是测试服当前设置。

| 字段 | 默认值 | 作用与约束 |
| --- | --- | --- |
| `commandPermissionLevel` | `2` | 命令权限，限制0–4。 |
| `terminalTaskHistory` | `64` | 终态任务历史条数，0–1024。 |
| `defaultTaskTimeoutTicks` | `600` | 默认超时tick，至少20；具体操作可以自定预算。 |
| `elytraFireworkRefillMaxStacks` | `3` | 每次烟花盒补给最多取多少组64枚，1–3。 |
| `shulkerPortalClearanceBlocks` | `8` | 临时潜影盒工作点距门的最小方块距离，0–16。 |
| `containerOpenHoldTicks` | `10` | 可见开箱保持tick，1–40。 |
| `debugLogging` | `false` | 调试日志开关。 |
| `debugUiEnabled` | `false` | 启动仅监听127.0.0.1的HTTP调试面板。 |
| `debugUiPort` | `8787` | 调试面板端口，1024–65535。 |
| `traceMode` | `off` | off / summary / full，无效值回退off。 |
| `traceRetentionRuns` | `5` | 每个Bot保留已完成trace次数，1–20。 |
| `defaultActorGameMode` | `survival` | 内部生成上下文默认模式；不保证外部Carpet生成也采用此值。 |
| `notifyTaskTerminal` | `true` | 任务终态通知。 |
| `automaticFood` | `true` | 在安全操作边界启用自动食物维护。 |
| `foodWhitelist` | `见下方完整列表` | 允许作为补给的食物ID，最多128项；还需普通可食用组件和正营养值。 |
| `requireToolForDrops` | `true` | 若随身工具无法获得应有掉落，拒绝挖掘。 |
| `scaffoldFallbackBlocks` | `cobblestone / dirt / netherrack` | 无已收集碎料时可用的临时支撑物品ID，均带minecraft命名空间。 |
| `allowScaffolding` | `true` | 允许施工临时搭路/支撑；不代表任意通道均可构造。 |
| `netherRoofOnly` | `false` | 仅下界屋顶脚位Y≥128，拒绝缺失或屋顶下方的门出口。 |
| `excludedSupplyStructures` | `["minecraft:trial_chambers"]` | 最多64种结构ID，按记录部件范围排除库存；并非辨认箱子是谁放的。 |
| `excludedSupplyContainers` | `[]` | 最多4096个明确禁止作为供给来源的坐标；对象字段dimension/x/y/z。 |
| `itemRecordDeliveryDimension` | `minecraft:overworld` | 旧ItemRecord计划无交付列表时的默认维度。 |
| `itemRecordDeliveryTargets` | `历史开发坐标，不适用于你的世界` | 旧兼容入口的字符串坐标数组；首次使用必须改为自己的交付容器，勿照抄开发默认位置。 |

## 默认食物白名单

```json
[
  "minecraft:bread",
  "minecraft:cooked_beef",
  "minecraft:cooked_porkchop",
  "minecraft:cooked_chicken",
  "minecraft:cooked_mutton",
  "minecraft:cooked_rabbit",
  "minecraft:cooked_cod",
  "minecraft:cooked_salmon",
  "minecraft:baked_potato",
  "minecraft:carrot",
  "minecraft:apple",
  "minecraft:melon_slice",
  "minecraft:beetroot",
  "minecraft:cookie",
  "minecraft:pumpkin_pie",
  "minecraft:dried_kelp",
  "minecraft:sweet_berries",
  "minecraft:glow_berries",
  "minecraft:mushroom_stew",
  "minecraft:beetroot_soup",
  "minecraft:rabbit_stew"
]
```

默认不含金苹果、附魔金苹果及常见有害食物。名单是可配置策略；手动加入物品时应自行核对效果。

## 排除专用仓库

```json
{"excludedSupplyContainers":[{"dimension":"minecraft:overworld","x":100,"y":64,"z":100}]}
```

这是字段片段，合并进现有配置。维度ID必须合法。结构排除依赖Atlas结构元数据；缺数据不等于确认该位置不在结构中。
