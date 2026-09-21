# Java API

Invoke these source-level interfaces on the server thread. Each Bot owns one root execution slot. Submit high-level work through event handles, then inspect state on subsequent ticks. Input controls retain explicit ownership; terminal cleanup releases root inputs.

## Bot

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

```java
public interface BotView {
    UUID id();
    String name();
    BotSnapshot snapshot();
}
```

## LookRequest

```java
public record LookRequest(
		Vec3 target,
		float toleranceDegrees,
		int maxAttempts
);
```

## OpenContainerRequest

```java
public record OpenContainerRequest(
		BlockPos target
);
```

## OpenContainerResult

```java
public record OpenContainerResult(
		BlockPos target,
		boolean opened,
		String menuClass,
		int containerId
);
```

## TransferRequest

```java
public record TransferRequest(
		int startSlotInclusive,
		int endSlotExclusive
);
```

## TransferResult

```java
public record TransferResult(
		int startSlotInclusive,
		int endSlotExclusive,
		int clickedSlots
);
```

## UseRequest

```java
public record UseRequest(
		BlockPos target,
		InteractionHand hand
);
```

## UseResult

```java
public record UseResult(
		BlockPos target,
		boolean interacted,
		String menuClass
);
```

## BotFailure

```java
public record BotFailure(BotFailureCode code, String message, Throwable cause);
```

## BotFailureCode

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

```java
public record NavigationRequest(GlobalPos reference, List<BlockPos> candidates, SearchPolicy searchPolicy,
        cwc.autobuildbot.pathfinding.PathGoal explorationGoal);
```

## NavigationResult

```java
public record NavigationResult(
        Vec3 reachedFeet,
        Optional<BlockPos> reachedPathNode,
		int visitedNodes,
		int pathLength
);
```

## SearchPolicy

```java
public record SearchPolicy(int maxExpandedNodes, int expansionsPerTick, boolean allowElytra, int cruiseHeight,
                           boolean allowLongDrops, boolean allowPartialPaths, int minimumFeetY);
```
