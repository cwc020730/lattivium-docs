# Installation and your first task

## Requirements

Use Minecraft 1.21.11, Java 21+, Fabric Loader 0.19.3+, Fabric API, Carpet 1.4.194+ and Lattivium Atlas 0.1.23-SNAPSHOT+.

Place matching JARs in the server's `mods/` directory and start the server. The mod ID is `auto-build-bot`; configuration lives at `config/auto-build-bot.json`.

## Create a Bot

Create a Carpet fake player and select survival mode:

```text
/player Worker spawn
/gamemode survival Worker
/lattivium Worker exec DelayTask {"ticks":20}
```

The delay lasts 20 game ticks. Use `task=<UUID>` from the acceptance message to [inspect and control the task](../reference/task-control). Chat commands include `/`; console and RCON commands omit it.

## Status panel

Set `debugUiEnabled: true`, restart the server and open `http://127.0.0.1:8787/` on the server machine. The panel shows live Bot feet positions, task queues, saved checkpoints and execution traces. SSH port forwarding supports remote access.

Prepare elytra, tools, shulker boxes and accessible stock for the task. Automatic food maintenance is enabled by default; food and fireworks can be replenished from Atlas sources. Continue with [supply](./supply) or [construction](./construction).
