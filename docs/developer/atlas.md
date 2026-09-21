# Atlas 世界知识库

Atlas 保存带来源和时间的世界观察，Lattivium 负责分配材料、规划旅行和执行。数据库位于世界 `lattivium-atlas/atlas.db`，后台队列和扫描都有预算。

| 接口 | 用途 |
| --- | --- |
| `AtlasSessions.get(server)` | 异步世界会话 |
| `session.inventories()` | 库存索引与候选查询 |
| `session.observations()` | 提交库存观察 |
| `session.structures()` | 已记录的结构归属 |
| `session.traversals()` | 实际穿门记录 |
| `AtlasSessions.recipes(server)` | 普通合成配方快照 |
| `AtlasSessions.recipeGeneration(server)` | 数据包重载后的版本核验 |

Bot 使用候选前核对保护、物品组件和可交互性。结构范围来自生成部件元数据；玩家改建后仍可能保留。未展开战利品容器保留其未展开状态。

## 存档导入

在 Atlas 源码工程运行：

```sh
./gradlew importSavedWorld -PsnapshotWorld=/path/to/stopped-world -PatlasDatabase=/path/to/output/atlas.db -PscanRate=100
```

读取已停机存档，输出数据库放在输入存档外。服务端停止时部署到对应世界；已有库存仅需结构补充时使用 `-PstructuresOnly`。数据库旁的 `<数据库名>.pause` 请求停止，续跑核验快照身份。

游戏内 `/lattiviumatlas status` 查询扫描和数据库状态。
