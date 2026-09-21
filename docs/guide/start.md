# 安装与第一个任务

## 运行环境

当前源码要求 Minecraft **1.21.11**、Java **21 或以上**、Fabric Loader **0.19.3 或以上**、
Fabric API、Carpet **1.4.194 或以上**、Lattivium Atlas **0.1.23-SNAPSHOT 或以上**。
Lattivium 的兼容 Mod ID 仍为 `auto-build-bot`，配置仍叫 `auto-build-bot.json`。
版本要求来自 `fabric.mod.json`；安装包由项目维护者提供。

把维护者提供的匹配版本 JAR 放入服务端 `mods/` 后正常启动；开发环境的 Loom 已加载源码时不要重复放同一个 Mod JAR。
核心 Atlas 材料流程运行在服务端。旧 ItemRecord 上传计划入口另需兼容的玩家客户端组件。

## 创建 Bot

假人实体由 Carpet 提供，Lattivium 识别在线 Carpet 假人。
管理员可在游戏中用 Carpet 的 `/player Worker spawn` 创建假人；该指令属于 Carpet，详情以其补全和版本为准。
确认假人在安全位置，然后显式执行 `/gamemode survival Worker`。
清场要求生存模式；创建来源不同可能导致初始模式不同。

## 第一个低风险任务

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

这是等待 20 游戏 tick，默认 20 TPS 下约 1 秒，不改变地形。
看到 `Queued` 只表示已受理。任务是否成功需要查看终态。
Bot 一次只执行一个根任务；忙碌时不能再提交另一个。

然后把下面的示例坐标换成 Bot 附近实际可站立的位置：

```text
/ltv Worker exec NavigateToPosFlow {"target":{"x":100,"y":65,"z":100}}
```

游戏聊天输入带 `/`；服务器控制台和 RCON 中去掉 `/`。
`exec` 的坐标由普通数字解析，不支持 Minecraft 的 `~`、`^`。

## 打开本地状态面板

在 `config/auto-build-bot.json` 设置 `debugUiEnabled: true`，正常重启服务端。
在服务端同机浏览器打开 `http://127.0.0.1:8787/`。Bot 的实时脚部位置、任务和 trace 在这里查看。
远程服务器可通过 SSH 本地端口转发访问；该地址不是文档站，也没有公开远程管理服务。

## 准备物资

Bot 不会凭空获得鞘翅、烟花、工具或潜影盒。按任务准备生存物资，或建立可用的 Atlas 库存索引。
自动食物维护默认开启，但来源和路线必须可用。和平难度会自动恢复饥饿，不能据此验收自动找食物。
采集从[材料指南](./supply)开始；破坏世界的清场命令先阅读[施工范围](./construction)。
