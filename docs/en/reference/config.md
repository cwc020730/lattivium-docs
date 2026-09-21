# Configuration

Edit `config/auto-build-bot.json` while the server is stopped, then restart. Startup loads configuration and writes new defaults. Invalid configuration may fall back to defaults; inspect startup logs.

| Field | Default | Meaning |
| --- | --- | --- |
| `commandPermissionLevel` | `2` | Command permission level, 0–4. |
| `terminalTaskHistory` | `64` | Retained terminal task records, 0–1024. |
| `defaultTaskTimeoutTicks` | `600` | Default task timeout in ticks, minimum 20; operations may define their own budgets. |
| `elytraFireworkRefillMaxStacks` | `3` | Firework stacks per refill, 1–3 stacks of 64. |
| `shulkerPortalClearanceBlocks` | `8` | Minimum portal clearance for temporary shulker work, 0–16 blocks. |
| `containerOpenHoldTicks` | `10` | Visible container-open hold, 1–40 ticks. |
| `debugLogging` | `false` | Enable debug logging. |
| `debugUiEnabled` | `false` | Enable the loopback HTTP debug panel. |
| `debugUiPort` | `8787` | HTTP port, 1024–65535. |
| `traceMode` | `off` | Trace detail: off, summary or full; invalid values use off. |
| `traceRetentionRuns` | `5` | Completed traces retained per Bot, 1–20. |
| `defaultActorGameMode` | `survival` | Default game mode for internal spawn contexts. |
| `notifyTaskTerminal` | `true` | Notify task terminal outcomes. |
| `automaticFood` | `true` | Maintain food at safe operation boundaries. |
| `foodWhitelist` | `See list below` | Allowed food IDs, up to 128; items also require ordinary edible components and positive nutrition. |
| `requireToolForDrops` | `true` | Require tools that produce the expected mining drops. |
| `scaffoldFallbackBlocks` | `cobblestone / dirt / netherrack` | Fallback temporary support items, with the minecraft namespace. |
| `allowScaffolding` | `true` | Allow temporary construction supports and access paths. |
| `netherRoofOnly` | `false` | Restrict Nether feet positions to Y≥128; filter unknown or below-roof exits. |
| `excludedSupplyStructures` | `["minecraft:trial_chambers"]` | Up to 64 excluded structure IDs, matched against recorded generation pieces. |
| `excludedSupplyContainers` | `[]` | Up to 4096 excluded source containers, with dimension/x/y/z fields. |

## Default food whitelist

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
