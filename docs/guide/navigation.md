# 移动与跨维度

## 同维度到达脚位

```text
/lattivium Worker exec NavigateToPosFlow 100 65 100
```

目标属于 Bot 当前维度，坐标表示导航脚位；到箱子旁边后还需要交互射线，单纯距离接近不等于能开箱。
搜索有节点、tick 和进展预算。普通默认搜索允许部分路线，不能把一次路径前缀当作整个业务任务完成。

## 跨维度旅行入口

当前 operator 命令还不是简单的 `goto <dimension> <xyz>`，它接收显式传送门提示：

```text
/lattivium <Bot> exec PortalJourneyFlow <destinationDimension> <entranceX> <entranceY> <entranceZ> <exitX> <exitY> <exitZ> [targetX targetY targetZ]
```

入口坐标在当前维度；出口与可选最终目标在目标维度。坐标必须对应实际世界。
这些是路线提示，运行中仍需实际进入传送门、等待传送并核对维度，不是管理员 teleport。
内部路线选择可结合 Atlas 记录，也可为同维度远行借其他维度绕行；这不改变该命令当前的参数要求。

## 飞行与补给

`ApproachAreaFlow` 是远程接近区域；`ElytraFlightFlow` 是飞行子流程，不能替代完整的容器访问或跨维度任务。
烟花不足时业务流程可插入补给；无烟花时不能依赖“先飞到烟花箱”形成循环。
没有可用补给路线时报告缺项和位置，不保证任何地形都能脱困。
`netherRoofOnly=true` 限制下界脚位 Y≥128，拒绝未知或屋顶以下的门出口；默认 false。
这项限制可能让某些本可达的目标不可用，是用户的旅行策略。

## 垂直结构与复杂洞穴

水、梯子等是否构成可用路线由实时碰撞、支持面、控制能力和搜索预算共同决定。
不要把“地图上存在路径”理解为“任何有限预算都必能找到”。
清场的浅坑水柱属于有所有权和回收义务的特定操作，见[清场指南](./construction)，不是任意地下空间的通用出口生成器。
