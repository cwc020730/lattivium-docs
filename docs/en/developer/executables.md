# Declare an execution entry

A public static factory declares an independently executable Task, Flow or Action with `@ExecutionEntry`. Its first parameter is `ExecutionContext`, providing the Bot and optional requesting player. Its second parameter is a public Java record describing user inputs.

```java
public record WaitInput(@Input(min = 1, max = 1200) int ticks) {}

@ExecutionEntry(
    value = "Wait",
    description = "Wait for a bounded number of game ticks.",
    example = "{\"ticks\":20}"
)
public static DelayTask wait(ExecutionContext context, WaitInput input) {
    return new DelayTask(input.ticks());
}
```

Inputs support strings, booleans, integers, finite floating-point values, enums, nested records, lists and Optional. `@Input` sets defaults, numeric ranges and list lengths. Record constructors validate relationships between fields; factories validate items, world state and file constraints.

The annotation processor discovers declarations and generates an entry index inside the JAR. Runtime discovery validates signatures, parameters and examples. Existing method bodies can follow the HotSwap workflow; new providers require an index rebuild and restart.

```sh
./gradlew executionContractTest exportExecutionCatalog
```

Copy `build/reports/execution-catalog.json` into the documentation repository, add Chinese descriptions to `translations/zh.json`, then run `python scripts/render-executables.py` and `npm run docs:check`. Parameters and examples come from the shared contract; translations maintain explanatory text.
