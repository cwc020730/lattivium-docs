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

## ExcavateSiteTask

准备区外工作站与脚手架井，分层清空 16×16、深 5 格的施工区域。

### 指令

```text
/lattivium Worker exec ExcavateSiteTask {"surfaceOrigin":{"x":0,"y":64,"z":0}}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `surfaceOrigin` | `object` | `必填` |  |
| `surfaceOrigin.x` | `integer` | `必填` |  |
| `surfaceOrigin.y` | `integer` | `必填` |  |
| `surfaceOrigin.z` | `integer` | `必填` |  |
| `accessSide` | `string` | `"WEST"` | `NORTH`, `EAST`, `SOUTH`, `WEST` |
| `outputBoxes` | `integer` | `2` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `2` | minimum: 2; maximum: 6 |
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `foundationDepth` | `integer` | `1` | minimum: 0; maximum: 1 |

## PreparePlatformTask

清理平台上方空间并铺设地板；可授权一层地基。

### 指令

```text
/lattivium Worker exec PreparePlatformTask {"min":{"x":0,"y":63,"z":0},"max":{"x":4,"y":66,"z":6}}
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
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `foundationDepth` | `integer` | `0` | minimum: 0; maximum: 1 |

## PrepareSiteInfrastructureTask

在显式允许的区块内勘察并建造干燥贴边脚手架井、道路和工作站，验证井底往返。

### 指令

```text
/lattivium Worker exec PrepareSiteInfrastructureTask {"surfaceOrigin":{"x":0,"y":64,"z":0},"admittedChunks":[{"x":-1,"z":-1},{"x":-1,"z":0},{"x":-1,"z":1},{"x":0,"z":-1},{"x":0,"z":0},{"x":0,"z":1},{"x":1,"z":-1},{"x":1,"z":0},{"x":1,"z":1}]}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `surfaceOrigin` | `object` | `必填` |  |
| `surfaceOrigin.x` | `integer` | `必填` |  |
| `surfaceOrigin.y` | `integer` | `必填` |  |
| `surfaceOrigin.z` | `integer` | `必填` |  |
| `admittedChunks` | `array` | `必填` | minItems: 1; maxItems: 81 |
| `admittedChunks[].x` | `integer` | `必填` | minimum: -1.875e+06; maximum: 1.875e+06 |
| `admittedChunks[].z` | `integer` | `必填` | minimum: -1.875e+06; maximum: 1.875e+06 |
| `outputBoxes` | `integer` | `4` | minimum: 2; maximum: 8 |
| `headroom` | `integer` | `4` | minimum: 2; maximum: 6 |
| `material` | `string` | `"minecraft:white_concrete"` |  |
| `emptyBoxes` | `integer` | `0` | minimum: 0; maximum: 16 |
| `fillStock` | `integer` | `0` | minimum: 0; maximum: 1728 |
| `sandStock` | `integer` | `0` | minimum: 0; maximum: 1728 |
| `scaffoldStock` | `integer` | `0` | minimum: 0; maximum: 1728 |

## ResumeExcavateSiteTask

接续工地清场检查点，或复核已完成的工地。

### 指令

```text
/lattivium Worker exec ResumeExcavateSiteTask {"taskId":"00000000-0000-0000-0000-000000000001"}
```

### 参数

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `taskId` | `string` | `必填` |  |
