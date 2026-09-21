# 定义可独立执行的入口

独立入口负责把用户参数转换为可提交的 Flow、Task 或 Action。任务内部的子流程继续通过构造函数组合，不需要为了出现在命令列表里而暴露运行时状态。

每个入口使用一个公开静态工厂方法：

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

第一个参数固定为 `ExecutionContext`，提供当前 Bot 和可选的调用玩家。需要真人请求者的入口调用 `requireRequester()`。第二个参数是公开的 Java record，只描述用户可输入的数据。

支持字符串、布尔值、整数、有限浮点数、枚举、嵌套 record、`List<T>` 和 `Optional<T>`。字段默认必填；`@Input(defaultJson = "...")` 指定缺省值。数字范围、列表长度和描述同时用于校验与 Schema 导出。跨字段关系由 record 构造函数检查；物品注册、世界及文件约束在工厂中检查。

Java 注解处理器在编译时发现 `@ExecutionEntry`，检查公开静态工厂和重名，生成随 JAR 发布的提供者索引。运行时读取索引，检查工厂签名、参数类型与示例。新增入口不需要修改注册表。

```sh
./gradlew executionContractTest exportExecutionCatalog
```

输出为 `build/reports/execution-catalog.json`。将其同步到手册仓库的 `execution-catalog.json`，再执行：

```sh
python scripts/render-executables.py
npm run docs:check
```

手册 CI 会校验生成页与契约是否一致。新增提供者时重新构建索引并重启运行环境；已有入口的方法体修改可沿用开发环境的 HotSwap 流程。
