# 兼容网络协议

这些是 Fabric 游戏连接内的旧 ItemRecord 适配消息，不是 HTTP API，也不是推荐的新自动化入口。
普通 Atlas 任务通过服务端文件执行，不需要手动发送这些包。

| 通道（auto-build-bot命名空间） | 方向 | 用途 |
| --- | --- | --- |
| itemrecord_plan_upload_request | S2C | 请求玩家客户端上传指定Bot的计划 |
| itemrecord_real_schematic_plan | S2C | 请求客户端为原理图与目标生成计划 |
| itemrecord_real_schematic_locations | C2S | 查询真实原理图材料来源 |
| itemrecord_real_schematic_locations_result | S2C | 返回按物品分组的来源位置 |

方向以服务端视角命名；需匹配双方的Fabric payload codec、Minecraft注册表及ItemRecord类型版本。
不能把JSON发送到这些通道，也不能绕开玩家requester语义。
客户端旧计划传输与新Atlas服务端知识/执行路径是两套入口；跨版本第三方扩展宜使用固定版本的Java接口。
