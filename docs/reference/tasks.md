# Task

各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。

## 直接使用 .litematic 原理图

1. 将 `machine.litematic` 放入服务端世界目录的 `lattivium-atlas/schematics/`。远程服务器由管理员上传文件。
2. 选择已在线的 Bot 和实际交付箱。
3. 执行下列位置参数命令，Bot 会读取原理图并统计材料需求。

```text
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

将 `Worker`、文件名和交付坐标替换成实际值。末尾坐标指向交付箱。下列 JSON 表达相同的命令参数，原理图直接读取 `.litematic` 文件。

```text
/ltv Worker exec AtlasSupplyTask {"file":"machine.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":100,"y":64,"z":100}}]}
```

## AtlasProductionPreviewTask

预览材料生产计划。

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
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
/lattivium Worker exec AtlasSupplyTask {"file":"example.litematic","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
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
