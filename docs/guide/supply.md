# 材料收集与合成

将 `.litematic` 或 `.materials.json` 放入服务端世界的 `lattivium-atlas/schematics/`。交付坐标指向实际容器方块。Atlas 提供库存记录，Bot 在取货时核对实际内容和可交互性。

```text
/ltv Worker exec AtlasProductionPreviewTask machine.litematic minecraft:overworld 100 64 100
/ltv Worker exec AtlasSupplyTask machine.litematic minecraft:overworld 100 64 100
```

预览计算材料生产计划。供给任务依次规划、补给、取料、执行必要合成、运输并核验交付。当前支持背包 2×2 与工作台 3×3 普通配方，工作台由流程搜索或准备；配方展开受有限预算和循环检查约束。

## 执行模式

| 模式 | 行为 |
| --- | --- |
| `REAL` | 实际取货与交付，减少来源库存 |
| `DEBUG` | 验证旅行和容器访问，跳过物品转移 |
| `SOURCE_PRESERVING_DEBUG` | 测试用复制取货，保留来源库存；交付和临时设施仍实际改变世界 |

默认保留 Bot 原有个人散料；`USE_LOOSE_CARGO` 允许计入可用材料。`DELIVER_TO` 可追加交付箱，总计最多 32 处且各不相同。完整参数见 [Task 参考](../reference/tasks)。

## 潜影盒和容量

从装有 64 件物品的盒子取 10 件时，流程借出原盒、放置打开、取出 10 件，再将剩余物品连盒归还。作为建筑材料的潜影盒须为空盒。

容量不足时整理运输盒；供给流程也可在有限预算内中途交付已取得的散装货物并返回。运输盒卸载和原料生产分批调度仍受各流程当前能力约束。

## 结果

需求、已分配、取得、交付和缺料分别记账。来源在预算内不可达时尝试替代；没有替代时记录缺料和坐标，并完成剩余义务。借盒归还、设施回收和已有货物交付均由所属流程处理。查看业务回执以区分完整交付、带缺料完成及失败。
