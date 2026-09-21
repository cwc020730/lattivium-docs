# Atlas 世界知识库

Atlas和Bot是两个独立模组。Atlas保存观察与索引，Bot决定材料分配、旅行、合成和施工。
数据库位于世界目录的 `lattivium-atlas/atlas.db`，后台数据库队列有界。
当前不存在“启动就自动扫完所有未加载区块”的玩家命令。

## 记录与查询语义

| 知识入口 | 含义 |
| --- | --- |
| AtlasSessions.get(server) | 获取异步世界会话，不在tick中阻塞等待 |
| session.inventories() | 索引库存、评估候选与有限明细查询 |
| session.observations() | 提交当前世界库存观察 |
| session.structures() | 坐标的已记录结构归属，可能有多个或未知 |
| session.traversals() | 真实穿门观测与统计 |
| AtlasSessions.recipes(server) | 共享配方快照future |
| AtlasSessions.recipeGeneration(server) | 数据包重载后的配方代号核验 |

库存明细并不授予取货权限。调用方仍需核验保护、组件、嵌套容器和当前可交互性。
已加载区块按有界扫描周期更新，卸载后后台读取原版存储队列；可能有遗漏和延迟。
结构范围是生成部件元数据，不是“天然箱/人工箱”的准确分类；玩家改建后范围仍可能保留。
未开战利品容器不应通过扫描来触发展开。

## 离线存档导入（维护者）

这是Atlas工程的Gradle工具，不是Minecraft游戏命令：

```sh
./gradlew importSavedWorld -PsnapshotWorld=/path/to/stopped-world -PatlasDatabase=/path/to/output/atlas.db -PscanRate=100
```

使用已停机存档，输出数据库不得位于读取的存档内。导入完成后在服务端停止状态下部署到对应世界；不要覆盖较新的实际库存。
如已有库存只缺结构，可加 `-PstructuresOnly`，只回填同一世界的结构事实。
输出数据库旁的 `<数据库文件名>.pause` 可请求停止；续跑要满足快照身份校验。
工具是开发入口，需要Atlas源码和匹配工具链；

`/lattiviumatlas status` 用于查看状态，不触发加载或导入。
配方快照只描述受支持的普通有序/无序合成，不代表Bot已有材料、工作台或执行资格。
