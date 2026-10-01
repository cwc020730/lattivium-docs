# 配置选项

停服后编辑 `config/auto-build-bot.json`，再启动服务端。启动时加载配置并补写新增默认值。无效配置可能回退默认值，具体结果见启动日志。

| 字段 | 默认值 | 作用 |
| --- | --- | --- |
| `commandPermissionLevel` | `2` | 命令权限等级，0–4。 |
| `terminalTaskHistory` | `64` | 保留的终态任务数，0–1024。 |
| `defaultTaskTimeoutTicks` | `600` | 默认任务超时，至少 20 tick；具体操作可自定预算。 |
| `fireworkSupplyMode` | `FIXED` | 烟花水位模式：FIXED 或 AUTO。 |
| `fireworkSupplyThreshold` | `1728` | FIXED 下限，1–10000。 |
| `fireworkSupplyTarget` | `3456` | FIXED 补足目标，下限–20000。 |
| `fireworkPredictionMultiplier` | `1.5` | AUTO 预测安全系数，1–10。 |
| `fireworkSupplyTargetMultiplier` | `2.0` | AUTO 目标相对下限的倍数，1–10。 |
| `foodSupplyThreshold` | `32` | 散装食物营养下限，1–10000。 |
| `foodSupplyTarget` | `80` | 食物营养补足目标，下限–10000。 |
| `supplySourceTravelWeight` | `0.5` | 来源选择中的旅行成本权重。 |
| `supplySourceCoverageWeight` | `0.5` | 剩余需求覆盖度权重；两权重需有限、非负，且总和为正。 |
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
| `miningDropRecoveryMode` | `BEST_EFFORT` | 普通挖掘产物回收模式：BEST_EFFORT 或 STRICT。 |
| `miningDropMaximumDistance` | `8` | 普通掉落物的回收距离，单位为格。 |
| `miningDropMaximumSeconds` | `10` | 每批普通掉落物回收的活动秒数。 |
| `workstationFloorBlocks` | `["minecraft:white_concrete", "minecraft:cobblestone"]` | 稳定地板优先列表，可选白色混凝土、圆石。 |
| `constructionFillBlocks` | `["minecraft:cobblestone", "minecraft:white_concrete"]` | 实心填料优先列表，可选圆石、白色混凝土。 |
| `excavationDrainageMode` | `SOLID_FILL` | 逐层清场的排水方式：`SOLID_FILL`，或 `SPONGE_GRID_WHEN_AVAILABLE`（备有海绵、熔炉和燃料时先处理适合海绵的格室）。 |
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
