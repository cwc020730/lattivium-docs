---
pageClass: execution-reference
outline: 2
---

# Task

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## AtlasProductionPreviewTask

预览材料生产计划。

### 指令

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` | 支持：.litematic, .materials.json; 服务端世界目录下的 `lattivium-atlas/schematics/`; 填写直属文件名 |
| `deliveries` | `array` | `必填` | 各交付容器位置互不重复; minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `必填` |  |
| `deliveries[].position` | `object` | `必填` |  |
| `deliveries[].position.x` | `integer` | `必填` |  |
| `deliveries[].position.y` | `integer` | `必填` |  |
| `deliveries[].position.z` | `integer` | `必填` |  |

### 位置参数写法

```text
/lattivium <Bot> exec AtlasProductionPreviewTask <file.litematic|file.materials.json> <deliveryDimension> <x> <y> <z>
```

## AtlasSupplyTask

根据 Atlas 库存规划、取货、合成并交付材料。

### 指令

```text
/lattivium Worker exec AtlasSupplyTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` | 支持：.litematic, .materials.json, .segment.json; 服务端世界目录下的 `lattivium-atlas/schematics/`; 填写直属文件名 |
| `deliveries` | `array` | `必填` | 各交付容器位置互不重复; minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `必填` |  |
| `deliveries[].position` | `object` | `必填` |  |
| `deliveries[].position.x` | `integer` | `必填` |  |
| `deliveries[].position.y` | `integer` | `必填` |  |
| `deliveries[].position.z` | `integer` | `必填` |  |
| `useLooseCargo` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

### 位置参数写法

```text
/lattivium <Bot> exec AtlasSupplyTask <file> <deliveryDimension> <x> <y> <z> [USE_LOOSE_CARGO] [DEBUG|SOURCE_PRESERVING_DEBUG] [DELIVER_TO <dimension> <x> <y> <z>]...
```

## DelayTask

等待指定游戏刻数。

### 指令

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `ticks` | `integer` | `必填` | minimum: 1; maximum: 1200 |

### 位置参数写法

```text
/lattivium <Bot> exec DelayTask <durationTicks>
```
