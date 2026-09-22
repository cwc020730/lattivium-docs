# 诊断命令

下列命令使用固定参数命令树，需要权限等级 2。

```text
/lattiviumperf start <phase>
/lattiviumperf report
/lattiviumperf stop
/lattiviumperf watchcount <x> <y> <z>
/lattiviumatlas status
```

`start` 开始服务端 tick 测量窗口，`report` 读取统计，`stop` 结束测量。`phase` 为最长 80 字符的单词。`watchcount` 监测已加载容器变化，在 JFR 中最多记录 256 次，坐标使用原版方块位置语法。Atlas 状态命令报告扫描和数据库队列。
