# 输入文件格式

## 输入目录与后缀

世界目录下 `lattivium-atlas/schematics/`。服务器本地读取，不会自动读取玩家电脑里的 `.minecraft`。

| 文件 | 用途 |
| --- | --- |
| `.litematic` | 原理图材料需求；建造入口只接受此类 |
| `.materials.json` | 明确材料需求，供预览和供给 |
| `.segment.json` | 冻结来源的测试片段；供给可执行，预览不可执行 |

供给与预览只接受目录直属文件；建造要求规范化后仍在目录内。通用命令解析不支持带空格的文件路径。

## 材料需求 v1

保存为 `example.materials.json`：

```json
{
  "format": "lattivium-material-demand-v1",
  "materials": {
    "minecraft:stone": 64,
    "minecraft:crafting_table": 1
  }
}
```

文件最多4MiB，材料种类最多16384，数量须可精确转换为正long整数；不允许重复字段或重复物品ID，不能是空材料表。
其他顶层字段会被跳过，但不是任意未来字段的执行承诺。

## 冻结片段 v1

仅用于可重复测试，通常由测试工具生成，不要把它作为普通玩家材料清单。

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

哈希是占位示例，真实生成需填写来源哈希。文件最多4MiB，哈希为64位小写十六进制，firstStep≥0，stepCount为1–100。
来源容器不可重复，items非空且数量为正；step分组有序连续，完整覆盖声明范围。
冻结的是来源顺序和数量，运行中的导航、保护核验、失败恢复仍会执行。它不重新规划普通合成。

## 内部持久化文件

`lattivium/tasks/` 是供给检查点，`lattivium/excavations/` 是清场检查点；这两者不是用户材料输入。
检查点包含库存指纹、版本、校验和、回执与预算，手动改数量会破坏恢复保证。
Atlas 的 `lattivium-atlas/atlas.db` 是知识数据库，也不是计划文件。
