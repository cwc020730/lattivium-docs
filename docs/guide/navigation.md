# 移动与跨维度

## 前往目的地

`TravelToFlow` 接受目标维度与 Bot 脚位坐标，从 Atlas 读取传送门记录，选择路线并完成最终接近。附近目标先尝试局部导航；长途旅行也会比较借下界绕行的路线。

```text
/ltv Worker exec TravelToFlow minecraft:overworld 100 65 100
```

对应 JSON 写法：

```text
/ltv Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":100,"y":65,"z":100}}
```

Bot 实际进入传送门并等待游戏传送。执行成功要求位于目标维度，实际脚位距指定方块底面中心不超过 0.75 格。未找到路线、受活动范围配置限制或无法满足到达条件时，执行返回失败原因。使用返回的任务 ID 查询状态、取消或跟踪执行。

跨维度路线依赖 Atlas 中已有的可用传送门记录。独立执行时准备好鞘翅、烟花和食物；业务流程提供的资源补给服务会被旅行流程复用。

## 当前维度内的局部导航

`LocalNavigationFlow` 搜索并执行当前维度内的局部路径，适合精确接近和单独测试寻路。

```text
/ltv Worker exec LocalNavigationFlow 100 65 100
```

## 导航层次

| 执行单元 | 完成条件 |
| --- | --- |
| `TravelToFlow` | 在目标维度满足最终到达条件；命令入口使用目标脚位 |
| `PortalJourneyFlow` | 完成所选传送路线，并离开出口触发区 |
| `ApproachAreaFlow` | 在当前维度接近目标区域 |
| `LocalNavigationFlow` | 完成当前维度内的局部路径目标 |
| `ElytraFlightFlow` | 完成指定飞行操作 |

内部业务可以向 `TravelToFlow` 提供区域或施工站位等到达条件。容器业务先到达目标区域，再由容器访问流程核验可站立位置、触及距离和交互射线。

`PortalJourneyFlow` 的 `entrance` 和 `exit` 是显式路线提示；可选 `target` 是路线选择参考点。日常指定目的地使用 `TravelToFlow`。

## 活动范围与预算

`netherRoofOnly=true` 将下界活动限制为 Y≥128 的脚位，并过滤未知或屋顶以下的传送出口。路径搜索和旅行采用有限预算；意外维度变化后的旅行重规划最多三次。水、梯子和洞穴路线由实时地形与 Bot 移动能力决定。
