# Java API

当前是随模组发布的源码级契约，尚不是独立稳定SDK；调用应在正确的服务端线程和Bot执行上下文内进行。
一个Bot只拥有一个根执行位。高层导航/容器操作通过事件提交；`BotControl` 是底层输入，不提供同等业务核验。
持有输入有owner；只释放自己的输入。`releaseAll` 留给根终止/明确控制权移交。
不要直接修改 ServerPlayer 库存来冒充真实业务回执。

## 使用模式

```java
// 集成代码持有 Bot；在服务端线程且 Bot 空闲时提交。
EventHandle<NavigationResult> event = bot.moveTo(new NavigationRequest(target));
// 后续 tick 观察，不阻塞游戏线程等待。
if (event.state().isTerminal()) {
    event.result();
    event.failure();
}
// 需要取消时：event.cancel();
```

`target` 是 GlobalPos；`moveTo` 是导航请求边界，不把它当作自动规划任意传送门旅程的保证。
下列签名摘自源码，省略实现、import和普通record自动生成的方法。

## Bot

包：`cwc.autobuildbot.api.bot`

```java
public interface Bot extends BotView {
	BotControl control();
	ServerPlayer player();
	Optional<UUID> activeTaskId();
	EventHandle<Void> look(LookRequest request);
	EventHandle<Integer> selectHotbar(int zeroBasedSlot);
	EventHandle<UseResult> use(UseRequest request);
	EventHandle<OpenContainerResult> openContainer(OpenContainerRequest request);
	EventHandle<TransferResult> transfer(TransferRequest request);
    EventHandle<NavigationResult> moveTo(cwc.autobuildbot.navigation.NavigationRequest request);
	void stopCurrentTask();
	void stopAll();
}
```

## BotControl

包：`cwc.autobuildbot.api.bot`

```java
public interface BotControl {
    enum Button { JUMP, USE, ATTACK }
    void move(Object owner, float forward, float strafe, boolean sprint);
    void press(Object owner, Button button, boolean continuous);
    void release(Object owner);
    void look(float yaw, float pitch);
    void lookAt(Vec3 target);
    void jumpOnce();
    void useItem(net.minecraft.world.InteractionHand hand);
    void selectHotbar(int zeroBasedSlot);
    void setSneaking(boolean sneaking);
    boolean tryStartGliding();
    void stopGliding();
    void assistedVelocity(Vec3 velocity);
    void releaseAll();
}
```

## BotSnapshot

包：`cwc.autobuildbot.api.bot`

```java
public record BotSnapshot(
		UUID actorId,
		String name,
		String dimension,
		Vec3 position,
		BlockPos blockPosition,
		float yaw,
		float pitch,
		Vec3 velocity,
		boolean onGround,
		boolean inWater,
		boolean onFire,
		float health,
		int foodLevel,
		int selectedHotbarSlot,
		String currentMenu,
		UUID activeTaskId,
		String activeTaskDescription,
		EventState activeEventState,
		long lastProgressTick
);
```

## BotView

包：`cwc.autobuildbot.api.bot`

```java
public interface BotView {
    UUID id();
    String name();
    BotSnapshot snapshot();
}
```

## LookRequest

包：`cwc.autobuildbot.api.bot`

```java
public record LookRequest(
		Vec3 target,
		float toleranceDegrees,
		int maxAttempts
);
```

## OpenContainerRequest

包：`cwc.autobuildbot.api.bot`

```java
public record OpenContainerRequest(
		BlockPos target
);
```

## OpenContainerResult

包：`cwc.autobuildbot.api.bot`

```java
public record OpenContainerResult(
		BlockPos target,
		boolean opened,
		String menuClass,
		int containerId
);
```

## TransferRequest

包：`cwc.autobuildbot.api.bot`

```java
public record TransferRequest(
		int startSlotInclusive,
		int endSlotExclusive
);
```

## TransferResult

包：`cwc.autobuildbot.api.bot`

```java
public record TransferResult(
		int startSlotInclusive,
		int endSlotExclusive,
		int clickedSlots
);
```

## UseRequest

包：`cwc.autobuildbot.api.bot`

```java
public record UseRequest(
		BlockPos target,
		InteractionHand hand
);
```

## UseResult

包：`cwc.autobuildbot.api.bot`

```java
public record UseResult(
		BlockPos target,
		boolean interacted,
		String menuClass
);
```

## BotFailure

包：`cwc.autobuildbot.api.task`

```java
public record BotFailure(BotFailureCode code, String message, Throwable cause);
```

## BotFailureCode

包：`cwc.autobuildbot.api.task`

```java
public enum BotFailureCode {
NO_PATH,
	PATH_TIMEOUT,
	STUCK,
	TARGET_CHANGED,
	OUT_OF_REACH,
	MISSING_ITEM,
	INVENTORY_FULL,
	SOURCE_UNAVAILABLE,
	TOOL_MISSING,
	TOOL_EXHAUSTED,
	INTERACTION_REJECTED,
	CONTAINER_DESYNC,
	CHUNK_UNLOADED,
	ACTOR_DIED,
	ACTOR_DISCONNECTED,
	UNSUPPORTED,
	TIMEOUT,
	CANCELLED,
	INTERNAL_ERROR
;
}
```

## EventHandle

包：`cwc.autobuildbot.api.task`

```java
public interface EventHandle<T> {
	UUID id();
	String description();
	EventState state();
	Optional<T> result();
	Optional<BotFailure> failure();
	long createdAtTick();
	long lastProgressTick();
	boolean cancel();
}
```

## EventState

包：`cwc.autobuildbot.api.task`

```java
public enum EventState {
QUEUED,
	RUNNING,
	WAITING_FOR_CHUNK,
	WAITING_FOR_SERVER,
	SUCCEEDED,
	FAILED,
	CANCELLED;
}
```

## NavigationRequest

包：`cwc.autobuildbot.navigation`

```java
public record NavigationRequest(GlobalPos reference, List<BlockPos> candidates, SearchPolicy searchPolicy,
        cwc.autobuildbot.pathfinding.PathGoal explorationGoal);
```

## NavigationResult

包：`cwc.autobuildbot.navigation`

```java
public record NavigationResult(
        Vec3 reachedFeet,
        Optional<BlockPos> reachedPathNode,
		int visitedNodes,
		int pathLength
);
```

## SearchPolicy

包：`cwc.autobuildbot.pathfinding`

```java
public record SearchPolicy(int maxExpandedNodes, int expansionsPerTick, boolean allowElytra, int cruiseHeight,
                           boolean allowLongDrops, boolean allowPartialPaths, int minimumFeetY);
```

## 补充约束

`LookRequest(target)` 默认容差1.5度、最多3次尝试。TransferRequest为半开槽区间，起点非负、终点不小于起点。
NavigationRequest的固定候选与探索PathGoal互斥；探索模式下reference是搜索锚点，不一定是完成目标。
SearchPolicy.defaults() 当前为8192总展开节点、每tick最多16、允许鞘翅、巡航高度325；不是每次必展开16。
`withoutElytra()`、`requiringCompletePath()`、`withMinimumFeetY(y)` 返回新的策略对象。
运行时可进一步施加时间和地形限制。NavigationResult.reachedFeet 是真实脚位；reachedPathNode可为空。
