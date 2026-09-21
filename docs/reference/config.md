# 配置选项

停服后编辑 `config/auto-build-bot.json`，再启动服务端。启动时加载配置并补写新增默认值。无效配置可能回退默认值，具体结果见启动日志。

| 字段 | 默认值 | 作用 |
| --- | --- | --- |
| `commandPermissionLevel` | `2` | 命令权限等级，0–4。 |
| `terminalTaskHistory` | `64` | 保留的终态任务数，0–1024。 |
| `defaultTaskTimeoutTicks` | `600` | 默认任务超时，至少 20 tick；具体操作可自定预算。 |
| `elytraFireworkRefillMaxStacks` | `3` | 每次烟花补给组数，1–3 组，每组 64。 |
| `shulkerPortalClearanceBlocks` | `8` | 临时潜影盒工作点距离门的最小间隔，0–16 格。 |
| `containerOpenHoldTicks` | `10` | 可见开箱保持时间，1–40 tick。 |
| `debugLogging` | `false` | 启用调试日志。 |
| `debugUiEnabled` | `false` | 启用仅监听本机的调试面板。 |
| `debugUiPort` | `8787` | 面板端口，1024–65535。 |
| `traceMode` | `off` | 记录详度：off、summary 或 full；无效值回退 off。 |
| `traceRetentionRuns` | `5` | 每个 Bot 保留的已完成 trace 数，1–20。 |
| `defaultActorGameMode` | `survival` | 内部生成上下文的默认游戏模式。 |
| `notifyTaskTerminal` | `true` | 通知任务终态。 |
| `automaticFood` | `true` | 在安全操作边界维护食物。 |
| `foodWhitelist` | `见下表` | 最多 128 个食物 ID；物品还需普通可食用组件和正营养值。 |
| `requireToolForDrops` | `true` | 要求工具能够产生预期挖掘掉落。 |
| `scaffoldFallbackBlocks` | `cobblestone / dirt / netherrack` | 临时支撑的后备材料，使用 minecraft 命名空间。 |
| `allowScaffolding` | `true` | 允许施工临时支撑和通路。 |
| `netherRoofOnly` | `false` | 下界脚位限制为 Y≥128，过滤未知或屋顶以下的门出口。 |
| `excludedSupplyStructures` | `["minecraft:trial_chambers"]` | 最多 64 个排除结构 ID，按已记录生成部件范围匹配。 |
| `excludedSupplyContainers` | `[]` | 最多 4096 个排除容器，字段为 dimension/x/y/z。 |

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
