# 寻路与旅行

旅行把 Bot 移动到指定维度，并满足调用者的到达条件。局部寻路、鞘翅飞行和传送门操作提供具体移动能力；材料收集与施工调用这些组件到达自己的业务目标。

## 前往目的地

`TravelToFlow` 接受目标维度与 Bot 脚位坐标，从 Atlas 读取传送门记录，选择路线并完成最终接近。

```text
/ltv Worker exec TravelToFlow minecraft:overworld 100 65 100
```

对应 JSON 写法：

```text
/ltv Worker exec TravelToFlow {"dimension":"minecraft:overworld","target":{"x":100,"y":65,"z":100}}
```

成功要求位于目标维度，实际脚位距指定方块底面中心不超过 0.75 格。使用返回的执行 ID 查询状态、取消或跟踪执行。完整参数见 [Flow 参考](../reference/flows#traveltoflow)。

独立执行时准备好鞘翅、烟花和食物。业务调用可以提供资源维护策略，由旅行在支持的边界复用。

## 阅读顺序

| 章节 | 说明 |
| --- | --- |
| [目的地与到达条件](../navigation/targets) | Bot 脚位、参考位置、候选站位与完成条件 |
| [路线与跨维度](../navigation/routes) | 路线节点、传送门、同维度绕行与实际出口 |
| [局部寻路与移动](../navigation/local) | 搜索请求、路径节点、移动类型与部分路径 |
| [鞘翅飞行](../navigation/flight) | 区域接近、起飞、巡航、着陆与燃料 |
| [烟花估算与补给](../navigation/fuel) | 数量公式、路线预测、触发时机、拆盒与储备差异 |
| [预算](../navigation/budgets) | 单位、默认限额、继承、挂起与耗尽处理 |
| [观察与异常处理](../navigation/recovery) | 未加载地形、重规划与失败责任 |

## 导航层次

| 组件 | 职责与完成条件 |
| --- | --- |
| `TravelToFlow` | 统筹旅行，在目标维度核验最终到达条件 |
| `PortalJourneyFlow` | 执行传送航段，实际进入设施、等待游戏传送并清离出口 |
| `ApproachAreaFlow` | 选择区域接近方式，在当前维度进入目标区域 |
| `LocalNavigationFlow` | 搜索并执行当前维度内的路径，满足局部目标 |
| `ElytraFlightFlow` | 完成起飞、飞行控制、着陆和落稳核验 |
| `PathEdgeExecFlow` | 执行局部路径中的单段移动 |

`TravelToFlow` 根据实际位置组合这些能力。附近目标可以直接局部移动；长途行程可以飞行或使用传送网络。内部调用可提供区域、容器接近或施工站位条件。

容器业务负责确认交互站位、触及距离和菜单；施工业务负责可修改范围和作业站位。旅行依据它们给出的目标移动，完成后返回实际位置。

## 当前维度内的局部导航

`LocalNavigationFlow` 可独立执行当前维度内的局部目标，用于精确接近和短路径验证。

```text
/ltv Worker exec LocalNavigationFlow 100 65 100
```

它的输入策略和移动组件见[局部寻路与移动](../navigation/local)。

## 活动范围与预算

`netherRoofOnly=true` 将下界活动限制为 Y≥128 的脚位，并过滤未知或屋顶以下的传送出口。搜索、移动和恢复采用有限预算，详见[预算](../navigation/budgets)和[观察与异常处理](../navigation/recovery)。
