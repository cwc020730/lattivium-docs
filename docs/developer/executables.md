# 定义执行入口

公开静态工厂通过 `@ExecutionEntry` 声明可独立执行的 Task、Flow 或 Action。第一个参数为 `ExecutionContext`，提供 Bot 和可选调用玩家；第二个参数为公开 Java record，描述用户输入。

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

支持字符串、布尔值、整数、有限浮点数、枚举、嵌套 record、列表和 Optional。`@Input` 指定默认值、数值范围和列表长度。record 构造函数核验跨字段关系，工厂核验物品、世界和文件约束。

编译时注解处理器发现声明并生成 JAR 内的入口索引。运行时核验签名、参数和示例。方法体 HotSwap 可沿用现有流程；新增提供者后重建索引并重启。

```sh
./gradlew executionContractTest exportExecutionCatalog
```

将 `build/reports/execution-catalog.json` 同步至手册仓库；在 `translations/zh.json` 补充中文说明，再运行 `python scripts/render-executables.py` 和 `npm run docs:check`。参数和示例由同一契约生成，翻译只维护说明文字。
