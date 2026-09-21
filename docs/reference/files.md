# 输入文件

输入位于服务端世界 `lattivium-atlas/schematics/`。供给与预览读取直属文件；建造支持规范化后仍在目录内的路径。含空格的文件名通过 JSON 参数传入。

- `.litematic`：原理图材料需求与建造输入。
- `.materials.json`：预览和供给材料需求。
- `.segment.json`：冻结来源的供给测试输入。

## 材料需求 v1

```json
{
  "format": "lattivium-material-demand-v1",
  "materials": {
    "minecraft:stone": 64,
    "minecraft:crafting_table": 1
  }
}
```

限制为 4 MiB、最多 16384 个物品 ID，数量为可精确转换的正 long 整数。材料表至少一项，字段及物品 ID 唯一。

## 冻结片段 v1

```json
{
  "format": "lattivium-supply-segment-v1",
  "parentPlanSha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "parentSchematicSha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "firstStep": 0,
  "stepCount": 1,
  "sources": [
    {"dimension":"minecraft:overworld","x":100,"y":64,"z":100,"step":0,"items":{"minecraft:stone":64}}
  ]
}
```

生成时使用真实来源哈希。文件最多 4 MiB，哈希为 64 位小写十六进制，`firstStep` 非负，`stepCount` 为 1–100。来源容器唯一，数量为正，步骤分组有序且覆盖声明范围。片段固定来源和数量，执行时仍进行导航与保护核验。

## 持久化状态

供给检查点位于 `lattivium/tasks/`，清场检查点位于 `lattivium/excavations/`，Atlas 知识库位于 `lattivium-atlas/atlas.db`。这些文件由运行时管理。
