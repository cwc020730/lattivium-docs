# 移动与跨维度

## 当前维度导航

```text
/ltv Worker exec NavigateToPosFlow {"target":{"x":100,"y":65,"z":100}}
```

目标表示 Bot 脚位。路径搜索使用节点、时间和进展预算，并核验碰撞与支撑面。开箱交互还需满足射线和触及条件，由容器访问流程处理。

## 穿门旅行

```text
/ltv Worker exec PortalJourneyFlow minecraft:the_nether 100 65 100 12 129 12 20 129 20
```

参数依次为目标维度、当前维度入口、目标维度出口和可选最终脚位。流程真实进入传送门，等待传送并核验维度。业务路线选择可结合 Atlas 门记录，为长途旅行安排跨维度绕行。

## 飞行与资源

`ApproachAreaFlow` 负责远程接近区域，`ElytraFlightFlow` 负责飞行操作。业务流程在安全边界检查烟花储备并插入补给；路线不可用时返回原因和坐标。

`netherRoofOnly=true` 将下界活动限制为 Y≥128 的脚位，同时过滤未知或屋顶以下的传送出口。水、梯子和复杂洞穴的路线由实时世界状态、控制能力及有限搜索预算共同决定。
