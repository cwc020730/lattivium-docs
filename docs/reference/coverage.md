# 覆盖范围与版本

核验日期：2026-09-21。Lattivium 源码提交：`fdcf6a87cf85625cef11f21ffb61461471bb080a`。


| 边界 | 覆盖 |
| --- | --- |
| exec注册表 | 27个入口：JSON契约、用途、示例；26个位置参数入口 |
| 模组配置 | 23个公开字段及默认食物列表 |
| HTTP | 入口目录、UI、状态、6个调试动作，参数与错误语义 |
| Java API | api.bot/api.task全部15个类型，另附导航相关契约 |
| 性能命令 | start / report / stop / watchcount |
| Atlas命令 | status；另说明离线导入工具 |
| 兼容网络 | 4个Fabric payload通道与用途 |

外部Carpet、Minecraft、Fabric的全部接口不属于本模组手册范围。
Atlas本页介绍Bot所需知识入口，不宣称覆盖Atlas全部数据库内部方法。
普通内部class按[架构语义](../developer/architecture)说明，不逐类生成API页。

## 与源码保持一致

执行参数来自注解工厂的 record 契约，由 `exportExecutionCatalog` 导出并生成 [JSON 参考](./executables)。`reference-manifest.json` 记录配置、API、HTTP 等边界的哈希；`python scripts/check-reference.py --source /path/to/Lattivium` 检查源码漂移。CI 验证契约生成页、接口覆盖及页面构建。
