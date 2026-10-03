# 执行入口

通过 `exec`、`enqueue` 或 `interrupt` 提交 JSON 参数。每次受理都会返回任务 ID。服务端注入 Bot 和世界依赖。字段名及入口名区分大小写，坐标使用绝对值。参见[执行控制](./task-control)和[诊断命令](./commands)。

```text
/lattivium Worker exec DelayTask {"ticks":20}
/ltv schema
/ltv schema DelayTask
```

**执行单元（Executable）**统称具有执行生命周期的 Task、Flow 和 Action。声明为可独立执行的入口具有对应命令。JSON 是通用参数格式，支持位置参数的入口另列对应写法。

## [Task](./tasks)

- [AtlasProductionPreviewTask](./tasks#atlasproductionpreviewtask): 预览材料生产计划。
- [AtlasSupplyTask](./tasks#atlassupplytask): 根据 Atlas 库存规划、取货、合成并交付材料。
- [DelayTask](./tasks#delaytask): 等待指定游戏刻数。
- [ExcavateSiteTask](./tasks#excavatesitetask): 准备区外工作站与脚手架井，分层清空 16×16、深 5 格的施工区域。
- [PreparePlatformTask](./tasks#prepareplatformtask): 清理平台上方空间并铺设地板；可授权一层地基。
- [PrepareSiteInfrastructureTask](./tasks#preparesiteinfrastructuretask): 在显式允许的区块内勘察并建造干燥贴边脚手架井、道路和工作站，验证井底往返。
- [ResumeExcavateSiteTask](./tasks#resumeexcavatesitetask): 接续工地清场检查点，或复核已完成的工地。

## [Flow](./flows)

- [AccessContainerFlow](./flows#accesscontainerflow): 接近并打开容器。
- [AcquireContainerItemsFlow](./flows#acquirecontaineritemsflow): 从指定容器取得所需物品。
- [ApproachAreaFlow](./flows#approachareaflow): 在当前维度内通过飞行或地面移动接近目标区域。
- [BuildPerimeterSandWallFlow](./flows#buildperimetersandwallflow): 围绕边长为 6、12、16 或 32 格的内方形挖沟并落沙封边，每柱最多 96 格高，完成后返回起始工作位。Bot 从有支撑的干燥工作位出发，携带沙、工具及水下生存物资。
- [BuildSchematicFlow](./flows#buildschematicflow): 在当前维度的指定原点建造原理图。
- [ClearAndSettleWaterColumnFlow](./flows#clearandsettlewatercolumnflow): 在已调查的有水竖柱内清除障碍，回到相邻干平台后落沙封满；明确指定操作水柱、独立返回水道及上下界，每柱最多 96 格高。
- [ElytraFlightFlow](./flows#elytraflightflow): 使用鞘翅飞向目标。
- [EnsureInventoryReadyFlow](./flows#ensureinventoryreadyflow): 准备已拥有的直接使用批次，归位库存并释放工作槽；任务批次使用 L1，容量需求通过共用来源查询和取货流程补充空运输盒。
- [ExcavateAreaFlow](./flows#excavateareaflow): 清空包含两端的区域并将掉落物存入区外仓储；可指定液体封堵点。
- [ExcavateLayeredAreaFlow](./flows#excavatelayeredareaflow): 从上到下逐层清理已隔离场地，先填液体再挖掘，可声明底部隔离，并记录仓储与普通掉落物回执。 mode 复用通用补给执行模式；选择海绵网格时须给出 furnace 和 furnaceFeet。
- [FireworkReserveFlow](./flows#fireworkreserveflow): 根据行程距离补充烟花储备。
- [FireworkUseFlow](./flows#fireworkuseflow): 使用烟花推动飞行。
- [LocalNavigationFlow](./flows#localnavigationflow): 在当前维度内执行局部寻路，到达目标脚位。
- [MineBlockFlow](./flows#mineblockflow): 按施工保护与掉落规则挖掘一个方块。
- [OpenContainerFlow](./flows#opencontainerflow): 打开触及范围内的容器。
- [PortalJourneyFlow](./flows#portaljourneyflow): 穿越指定传送路线并离开出口触发区；target 用于路线选择。
- [PrepareAndExcavatePerimeterFlow](./flows#prepareandexcavateperimeterflow): 建造四面沙墙、干燥脚手架井、道路及工作站，逐层填液体并向下挖掘，完成后返回工作站。sealBottom 授权底部下一格的永久封底；autonomousSupplies 使用通用取货流程维持每层建材，并按需获取额外产物空盒。
- [PreparePerimeterInfrastructureFlow](./flows#prepareperimeterinfrastructureflow): 建造边长为 6、12、16 或 32 格的沙墙，隔水并将西侧一根沙柱改为脚手架井，再建造永久混凝土道路和区外工作站。每柱最多 96 格高，Bot 携带施工物资。内部清场使用独立入口。
- [PrepareWorkstationFlow](./flows#prepareworkstationflow): 在施工区外搭建工作站并配置容器。
- [ResumeExcavation](./flows#resumeexcavation): 从世界中保存的检查点恢复清场任务。
- [TransferItemsFlow](./flows#transferitemsflow): 按方向和数量转移指定物品。
- [TravelToFlow](./flows#traveltoflow): 使用 Atlas 传送门路线与局部导航，到达指定维度的目标脚位。
- [UseFlow](./flows#useflow): 对目标方块使用指定手。

## [Action](./actions)

- [JumpAction](./actions#jumpaction): 执行跳跃。
- [LookAction](./actions#lookaction): 看向指定位置。
- [MouseAction](./actions#mouseaction): 执行鼠标按键输入。
- [MoveAction](./actions#moveaction): 按指定方向、强度和时长移动。
- [MoveItemToOffhandAction](./actions#moveitemtooffhandaction): 将指定物品放入副手。
- [SelectHotbarAction](./actions#selecthotbaraction): 选择快捷栏槽位。
- [TransferAction](./actions#transferaction): 转移当前菜单中指定范围的物品。
