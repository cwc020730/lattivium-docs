# 安装与第一个任务

## 环境

需要 Minecraft 1.21.11、Java 21+、Fabric Loader 0.19.3+、Fabric API、Carpet 1.4.194+ 和 Lattivium Atlas 0.1.23-SNAPSHOT+。

将匹配版本的 JAR 放入服务端 `mods/`，启动服务器。模组 ID 为 `auto-build-bot`，配置文件为 `config/auto-build-bot.json`。

## 创建 Bot

通过 Carpet 创建假人，并将其设为生存模式：

```text
/player Worker spawn
/gamemode survival Worker
/lattivium Worker exec DelayTask {"ticks":20}
```

等待任务持续 20 游戏刻。受理消息中的 `task=<UUID>` 可用于[查询和控制](../reference/task-control)。游戏聊天输入带 `/`；控制台和 RCON 省略 `/`。

## 状态面板

设置 `debugUiEnabled: true` 后重启服务端，在同机浏览器打开 `http://127.0.0.1:8787/`。面板显示 Bot 实际脚部坐标、任务队列、保存的检查点和执行 trace。远程访问可使用 SSH 端口转发。

为任务准备鞘翅、工具、潜影盒及可用库存。自动食物维护默认开启；食物和烟花可通过 Atlas 来源补给。下一步阅读[材料指南](./supply)或[施工指南](./construction)。
