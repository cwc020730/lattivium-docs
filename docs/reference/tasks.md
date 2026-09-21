# Task

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## AtlasProductionPreviewTask

预览材料生产计划。

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` |  |
| `deliveries` | `array` | `必填` | minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `必填` |  |
| `deliveries[].position` | `object` | `必填` |  |
| `deliveries[].position.x` | `integer` | `必填` |  |
| `deliveries[].position.y` | `integer` | `必填` |  |
| `deliveries[].position.z` | `integer` | `必填` |  |

## AtlasSupplyTask

根据 Atlas 库存规划、取货、合成并交付材料。

```text
/lattivium Worker exec AtlasSupplyTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `file` | `string` | `必填` |  |
| `deliveries` | `array` | `必填` | minItems: 1; maxItems: 32 |
| `deliveries[].dimension` | `string` | `必填` |  |
| `deliveries[].position` | `object` | `必填` |  |
| `deliveries[].position.x` | `integer` | `必填` |  |
| `deliveries[].position.y` | `integer` | `必填` |  |
| `deliveries[].position.z` | `integer` | `必填` |  |
| `useLooseCargo` | `boolean` | `false` |  |
| `mode` | `string` | `"REAL"` | `REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

## DelayTask

等待指定游戏刻数。

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

| 字段 | 类型 | 默认值 | 约束 |
| --- | --- | --- | --- |
| `ticks` | `integer` | `必填` | minimum: 1; maximum: 1200 |

