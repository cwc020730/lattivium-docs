# Lattivium 使用手册

公开文档站：https://cwc020730.github.io/lattivium-docs/

内容涵盖操作教程、完整注册命令、配置、调试 HTTP、Java API 和领域语义。

## 本地开发

Node.js 22、Python 3；执行 `npm ci`，然后 `npm run docs:dev`。
发布前运行 `npm run docs:check` 和 `npm run docs:build`。
合入 main 后 GitHub Actions 自动发布 GitHub Pages；PR 只构建。

## 与代码同步

`reference-manifest.json` 记录已核验的代码提交和接口清单。
运行 `python scripts/check-reference.py --source /path/to/Lattivium` 可检查私有源码与清单的漂移；
源码有变化时先人工核对语义和示例，再更新手册与清单。公共 CI 不需要私有源码或访问令牌。
执行入口由 `execution-catalog.json` 生成：更新导出后运行 `python scripts/render-executables.py`。
