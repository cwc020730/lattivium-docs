# JSON 执行入口

通过 `exec`、`enqueue` 或 `interrupt` 提交 JSON 参数。每次受理都会返回任务 ID。服务端注入 Bot 和世界依赖。字段名及入口名区分大小写，坐标使用绝对值。参见[任务控制](./task-control)和[位置参数命令](./commands)。

```text
/lattivium Worker exec DelayTask {"ticks":20}
/ltv schema
/ltv schema DelayTask
```

## [Task](./tasks)

- [AtlasProductionPreviewTask](./tasks#atlasproductionpreviewtask): 预览材料生产计划。
- [AtlasSupplyTask](./tasks#atlassupplytask): 根据 Atlas 库存规划、取货、合成并交付材料。
- [DelayTask](./tasks#delaytask): 等待指定游戏刻数。

## [Flow](./flows)

- [AccessContainerFlow](./flows#accesscontainerflow): 接近并打开容器。
- [AcquireContainerItemsFlow](./flows#acquirecontaineritemsflow): 从指定容器取得所需物品。
- [ApproachAreaFlow](./flows#approachareaflow): 通过旅行与局部导航接近目标区域。
- [BuildSchematicFlow](./flows#buildschematicflow): 在当前维度的指定原点建造原理图。
- [ElytraFlightFlow](./flows#elytraflightflow): 使用鞘翅飞向目标。
- [ExcavateAreaFlow](./flows#excavateareaflow): 清空包含两端的区域并将掉落物存入区外仓储；可指定液体封堵点。
- [FireworkReserveFlow](./flows#fireworkreserveflow): 根据行程距离补充烟花储备。
- [FireworkUseFlow](./flows#fireworkuseflow): 使用烟花推动飞行。
- [MineBlockFlow](./flows#mineblockflow): 按施工保护与掉落规则挖掘一个方块。
- [NavigateToPosFlow](./flows#navigatetoposflow): 导航到当前维度的目标脚位。
- [OpenContainerFlow](./flows#opencontainerflow): 打开触及范围内的容器。
- [PortalJourneyFlow](./flows#portaljourneyflow): 根据入口和出口提示穿门，并前往可选的最终目标。
- [ResumeExcavation](./flows#resumeexcavation): 从世界中保存的检查点恢复清场任务。
- [TransferItemsFlow](./flows#transferitemsflow): 按方向和数量转移指定物品。
- [UseFlow](./flows#useflow): 对目标方块使用指定手。

## [Action](./actions)

- [JumpAction](./actions#jumpaction): 执行跳跃。
- [LookAction](./actions#lookaction): 看向指定位置。
- [MouseAction](./actions#mouseaction): 执行鼠标按键输入。
- [MoveAction](./actions#moveaction): 按指定方向、强度和时长移动。
- [MoveItemToOffhandAction](./actions#moveitemtooffhandaction): 将指定物品放入副手。
- [SelectHotbarAction](./actions#selecthotbaraction): 选择快捷栏槽位。
- [TransferAction](./actions#transferaction): 转移当前菜单中指定范围的物品。

