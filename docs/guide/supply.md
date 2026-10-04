# 材料收集

材料收集把物品需求转换为实际取得的物资。它负责需求规划、来源选择、容器取货、必要合成和结果结算；调用者决定材料留在 Bot 身上用于作业，还是交付到容器。

## 开始收集

将 `.litematic` 或 `.materials.json` 放入服务端世界的 `lattivium-atlas/schematics/`。以下命令分别预览生产计划和执行材料交付，末尾坐标指向交付容器。

```text
/ltv Worker exec AtlasProductionPreviewTask machine.litematic minecraft:overworld 100 64 100
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

完整参数见 [Task 参考](../reference/tasks)。Atlas 提供库存记录，Bot 在访问来源时核对实物和可交互性。

### 收集并随身携带

只需要取得材料时，可以直接提交需求表：

```text
/ltv Worker exec AcquireMaterialsFlow {"demand":[{"item":"minecraft:sand","count":64}]}
```

这个入口复用施工前取货所用的 Atlas 规划、生产、容器取货和库存周转。取得的材料留在 Bot 身上，之后由调用者使用；本入口不安排交付或施工。需求采用普通物品的默认组件规则，装货运输盒不能充当需求表中的空潜影盒。

可选的 `returnTo` 指定完成取货后必须实际到达的维度和脚位；省略时在取货收尾位置完成。`mode` 默认是 `REAL`，开发验收可以使用 `SOURCE_PRESERVING_DEBUG` 保留来源库存。字段见 [AcquireMaterialsFlow](../reference/flows#acquirematerialsflow)。

## 阅读顺序

| 章节 | 说明 |
| --- | --- |
| [需求与规划](../supply/planning) | 需求表、原料需求、来源分配、Step、计划与返回位置 |
| [来源访问](../supply/travel) | 来源任务如何调用旅行、打开容器并处理访问失败 |
| [容器取货与潜影盒](../supply/containers) | 直接取货、借盒拆取归还、运输盒与容量恢复 |
| [合成与物资账目](../supply/crafting) | 配方、批次、背包和工作台合成、用途预留 |
| [补给与执行恢复](../supply/maintenance) | 烟花、食物、资源维护的触发与原目标恢复 |
| [交付与结果](../supply/delivery) | 实际交付、缺料、来源失败与执行模式 |

目的地、传送门、局部路径和飞行的说明集中在[寻路与旅行](./navigation)。材料流程给出访问目标，旅行组件负责到达。

## 共用组件

原理图材料交付与施工前获取材料共用规划、取货和合成组件。

![原理图交付与施工获取共用物资链](/construction/supply-chain-zh.svg)

| 组件 | 职责 | 详细说明 |
| --- | --- | --- |
| `AtlasSupplyLoadFlow` | 加载需求、分配来源、准备运输容量 | [需求与规划](../supply/planning#atlassupplyloadflow) |
| `AcquireProductionFlow` | 收集原料、按实物重新规划、合成及结算 | [合成与账目](../supply/crafting#acquireproductionflow) |
| `SupplySourceFlow` | 推进单个来源的旅行与取货 | [来源访问](../supply/travel#supplysourceflow) |
| `AcquireContainerItemsFlow` | 从已选容器取得指定物品 | [容器取货](../supply/containers#acquirecontaineritemsflow) |
| `BorrowSourceShulkerFlow` | 精确拆取带货盒并归还余料连盒 | [借盒操作](../supply/containers#borrowsourceshulkerflow) |
| `ProduceCarriedMaterialsFlow` | 执行携带原料能够满足的合成批次 | [合成执行](../supply/crafting#producecarriedmaterialsflow) |
| `MaterialLedger` | 观察数量、预留用途和结算实际操作 | [物资账目](../supply/crafting#materialledger) |
| `TravelToFlow` | 按目标维度和到达条件完成移动 | [旅行目标](../navigation/targets#traveltoflow) |

`AtlasSupplyTask` 获取后安排实际交付。`AcquireMaterialsFlow` 接受需求表，取得物资并可返回指定脚位，供施工等调用者继续使用，也可以独立执行。各组件的输入、输出和完成条件在对应章节中说明；可执行的注册入口见[执行入口](../reference/executables)。

## 规划与执行

主线依次读取需求、规划来源和生产、准备容量、收集、按实际原料合成、结算结果。当前主线先完成收集阶段，再推进生产；实际库存与索引不符时记录取得量并在预算内重选来源。详细流程见[需求与规划](../supply/planning)和[合成与账目](../supply/crafting)。

## 资源维护

旅行和库存操作在支持的边界检查资源。调用者提供维护策略；原操作保存目标和进度，等待补给及其清理完成后继续。触发条件、预算和等待语义见[补给与执行恢复](../supply/maintenance)。

## 执行模式

`REAL` 实际转移物品；`DEBUG` 验证访问并跳过转移；`SOURCE_PRESERVING_DEBUG` 复制取货、保留来源库存，交付和临时设施仍实际改变世界。完整边界见[交付与结果](../supply/delivery#执行模式)。

## 潜影盒和容量

带货盒支持借出、放置打开、精确拆取、回收并归还。例如需要 10 件、盒内有 64 件时，取得 10 件并把剩余 54 件连盒归还。建筑材料所需潜影盒接受空盒。运输容量与盒内访问见[容器取货与潜影盒](../supply/containers)。

## 结果

分别记录需求、分配、取得、交付、缺料和未结责任。来源不可达时尝试替代或报告缺料；原盒归还、库存一致性和已取得货物仍需结算。结果契约见[交付与结果](../supply/delivery)。
