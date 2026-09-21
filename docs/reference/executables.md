# JSON 执行入口

```text
/lattivium <Bot> exec <入口名> <JSON对象>
/ltv <Bot> exec <入口名> <JSON对象>
```

`/ltv` 是 `/lattivium` 的简写。默认需要权限等级 2；一个 Bot 同时执行一个根任务。
入口名和枚举值区分大小写。坐标是绝对坐标。Bot、世界及调用玩家由服务端注入。
缺少必填字段、未知字段、重复字段、错误类型和越界数值会在创建任务前被拒绝。
JSON 支持字符串内的空格；游戏聊天长度不足时，可从服务端控制台或 RCON 提交。

查询当前安装版本的入口和参数：

```text
/lattivium schema
/lattivium schema AtlasSupplyTask
```

启用调试 HTTP 后，`GET /api/executables` 返回相同目录及 JSON Schema。
本页由该契约生成；[位置参数语法](./commands) 仍可使用。

## AccessContainerFlow

**Flow** · Approach and open a container.

```text
/lattivium Worker exec AccessContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | integer | `必填` |  |
| `target.y` | integer | `必填` |  |
| `target.z` | integer | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## AcquireContainerItemsFlow

**Flow** · Acquire an exact count from a container in the current dimension.

```text
/lattivium Worker exec AcquireContainerItemsFlow {"source":{"x":0,"y":64,"z":0},"item":"minecraft:stone","count":64}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `source` | object | `必填` |  |
| `source.x` | integer | `必填` |  |
| `source.y` | integer | `必填` |  |
| `source.z` | integer | `必填` |  |
| `item` | string | `必填` |  |
| `count` | integer | `必填` | 最小 1。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "source": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "item": {
      "type": "string"
    },
    "count": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483647.0
    }
  },
  "required": [
    "source",
    "item",
    "count"
  ]
}
```

</details>

## ApproachAreaFlow

**Flow** · Travel toward an area using a flight policy.

```text
/lattivium Worker exec ApproachAreaFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | number | `必填` |  |
| `target.y` | number | `必填` |  |
| `target.z` | number | `必填` |  |
| `arriveDistance` | number | `0.6` | 最小 1e-06。 |
| `settlingTicks` | integer | `240` | 最小 1。 |
| `cruiseHeight` | integer | `325` | 最小 321。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "arriveDistance": {
      "type": "number",
      "minimum": 1e-06,
      "maximum": 1.7976931348623157e+308,
      "default": 0.6
    },
    "settlingTicks": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483647.0,
      "default": 240
    },
    "cruiseHeight": {
      "type": "integer",
      "minimum": 321.0,
      "maximum": 2147483647.0,
      "default": 325
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## AtlasProductionPreviewTask

**Task** · Preview material production without collecting or crafting items.

```text
/lattivium Worker exec AtlasProductionPreviewTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `file` | string | `必填` |  |
| `deliveries` | array | `必填` | 最少项数 1。 最多项数 32。 |
| `deliveries[].dimension` | string | `必填` |  |
| `deliveries[].position` | object | `必填` |  |
| `deliveries[].position.x` | integer | `必填` |  |
| `deliveries[].position.y` | integer | `必填` |  |
| `deliveries[].position.z` | integer | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "file": {
      "type": "string"
    },
    "deliveries": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "dimension": {
            "type": "string"
          },
          "position": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "x": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              },
              "y": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              },
              "z": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              }
            },
            "required": [
              "x",
              "y",
              "z"
            ]
          }
        },
        "required": [
          "dimension",
          "position"
        ]
      },
      "minItems": 1,
      "maxItems": 32
    }
  },
  "required": [
    "file",
    "deliveries"
  ]
}
```

</details>

## AtlasSupplyTask

**Task** · Plan, acquire, craft and deliver materials using Atlas stock observations.

```text
/lattivium Worker exec AtlasSupplyTask {"file":"example.materials.json","deliveries":[{"dimension":"minecraft:overworld","position":{"x":0,"y":64,"z":0}}]}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `file` | string | `必填` |  |
| `deliveries` | array | `必填` | 最少项数 1。 最多项数 32。 |
| `deliveries[].dimension` | string | `必填` |  |
| `deliveries[].position` | object | `必填` |  |
| `deliveries[].position.x` | integer | `必填` |  |
| `deliveries[].position.y` | integer | `必填` |  |
| `deliveries[].position.z` | integer | `必填` |  |
| `useLooseCargo` | boolean | `false` |  |
| `mode` | string | `"REAL"` | 可选：`REAL`, `DEBUG`, `SOURCE_PRESERVING_DEBUG` |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "file": {
      "type": "string"
    },
    "deliveries": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "dimension": {
            "type": "string"
          },
          "position": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "x": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              },
              "y": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              },
              "z": {
                "type": "integer",
                "minimum": -2147483648.0,
                "maximum": 2147483647.0
              }
            },
            "required": [
              "x",
              "y",
              "z"
            ]
          }
        },
        "required": [
          "dimension",
          "position"
        ]
      },
      "minItems": 1,
      "maxItems": 32
    },
    "useLooseCargo": {
      "type": "boolean",
      "default": false
    },
    "mode": {
      "type": "string",
      "enum": [
        "REAL",
        "DEBUG",
        "SOURCE_PRESERVING_DEBUG"
      ],
      "default": "REAL"
    }
  },
  "required": [
    "file",
    "deliveries"
  ]
}
```

</details>

## BuildSchematicFlow

**Flow** · Build a schematic at an origin in the current dimension.

```text
/lattivium Worker exec BuildSchematicFlow {"file":"example.litematic","origin":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `file` | string | `必填` |  |
| `origin` | object | `必填` |  |
| `origin.x` | number | `必填` |  |
| `origin.y` | number | `必填` |  |
| `origin.z` | number | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "file": {
      "type": "string"
    },
    "origin": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "file",
    "origin"
  ]
}
```

</details>

## DelayTask

**Task** · Wait for a bounded number of game ticks.

```text
/lattivium Worker exec DelayTask {"ticks":20}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `ticks` | integer | `必填` | 最小 1。 最大 1200。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "ticks": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 1200.0
    }
  },
  "required": [
    "ticks"
  ]
}
```

</details>

## ElytraFlightFlow

**Flow** · Fly toward a position using carried equipment and rockets.

```text
/lattivium Worker exec ElytraFlightFlow {"target":{"x":0,"y":150,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | number | `必填` |  |
| `target.y` | number | `必填` |  |
| `target.z` | number | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## ExcavateAreaFlow

**Flow** · Clear an inclusive area and store drops in outside depots; optional seal depots supply liquid containment blocks.

```text
/lattivium Worker exec ExcavateAreaFlow {"min":{"x":0,"y":64,"z":0},"max":{"x":4,"y":66,"z":4},"depots":[{"x":8,"y":64,"z":0}]}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `min` | object | `必填` |  |
| `min.x` | integer | `必填` |  |
| `min.y` | integer | `必填` |  |
| `min.z` | integer | `必填` |  |
| `max` | object | `必填` |  |
| `max.x` | integer | `必填` |  |
| `max.y` | integer | `必填` |  |
| `max.z` | integer | `必填` |  |
| `depots` | array | `必填` | 最少项数 1。 最多项数 1024。 |
| `depots[].x` | integer | `必填` |  |
| `depots[].y` | integer | `必填` |  |
| `depots[].z` | integer | `必填` |  |
| `sealDepots` | array | `[]` | 最少项数 0。 最多项数 1024。 |
| `sealDepots[].x` | integer | `必填` |  |
| `sealDepots[].y` | integer | `必填` |  |
| `sealDepots[].z` | integer | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "min": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "max": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "depots": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "x": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          },
          "y": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          },
          "z": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          }
        },
        "required": [
          "x",
          "y",
          "z"
        ]
      },
      "minItems": 1,
      "maxItems": 1024
    },
    "sealDepots": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "x": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          },
          "y": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          },
          "z": {
            "type": "integer",
            "minimum": -2147483648.0,
            "maximum": 2147483647.0
          }
        },
        "required": [
          "x",
          "y",
          "z"
        ]
      },
      "minItems": 0,
      "maxItems": 1024,
      "default": []
    }
  },
  "required": [
    "min",
    "max",
    "depots"
  ]
}
```

</details>

## FireworkReserveFlow

**Flow** · Prepare carried rocket reserves for a horizontal distance, including carried shulker contents.

```text
/lattivium Worker exec FireworkReserveFlow {"horizontalDistance":1000}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `horizontalDistance` | number | `必填` | 最小 0。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "horizontalDistance": {
      "type": "number",
      "minimum": 0.0,
      "maximum": 1.7976931348623157e+308
    }
  },
  "required": [
    "horizontalDistance"
  ]
}
```

</details>

## FireworkUseFlow

**Flow** · Use one carried rocket.

```text
/lattivium Worker exec FireworkUseFlow {}
```

参数为 `{}`。

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {},
  "required": []
}
```

</details>

## ItemRecordPlanTask

**Task** · Execute a legacy ItemRecord plan supplied by an in-game requester.

```text
/lattivium Worker exec ItemRecordPlanTask {}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `planName` | optional | `必填` |  |
| `packed` | boolean | `false` |  |
| `debug` | boolean | `false` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "planName": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "packed": {
      "type": "boolean",
      "default": false
    },
    "debug": {
      "type": "boolean",
      "default": false
    }
  },
  "required": []
}
```

</details>

## JumpAction

**Action** · Press jump once.

```text
/lattivium Worker exec JumpAction {}
```

参数为 `{}`。

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {},
  "required": []
}
```

</details>

## LookAction

**Action** · Look at a world position.

```text
/lattivium Worker exec LookAction {"target":{"x":0,"y":65,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | number | `必填` |  |
| `target.y` | number | `必填` |  |
| `target.z` | number | `必填` |  |
| `toleranceDegrees` | number | `1.5` | 最小 0。 |
| `maxAttempts` | integer | `3` | 最小 1。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "toleranceDegrees": {
      "type": "number",
      "minimum": 0.0,
      "maximum": 3.4028234663852886e+38,
      "default": 1.5
    },
    "maxAttempts": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483647.0,
      "default": 3
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## MineBlockFlow

**Flow** · Mine one block under construction safety and drop rules.

```text
/lattivium Worker exec MineBlockFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | number | `必填` |  |
| `target.y` | number | `必填` |  |
| `target.z` | number | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## MouseAction

**Action** · Apply a mouse button input.

```text
/lattivium Worker exec MouseAction {"button":"RIGHT","mode":"ONCE"}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `button` | string | `必填` | 可选：`LEFT`, `RIGHT` |
| `mode` | string | `必填` | 可选：`ONCE`, `CONTINUOUS` |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "button": {
      "type": "string",
      "enum": [
        "LEFT",
        "RIGHT"
      ]
    },
    "mode": {
      "type": "string",
      "enum": [
        "ONCE",
        "CONTINUOUS"
      ]
    }
  },
  "required": [
    "button",
    "mode"
  ]
}
```

</details>

## MoveAction

**Action** · Hold directional input for a fixed number of ticks; does not find a path.

```text
/lattivium Worker exec MoveAction {"direction":"FORWARD","ticks":20}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `direction` | string | `必填` | 可选：`FORWARD`, `BACKWARD`, `LEFT`, `RIGHT` |
| `ticks` | integer | `必填` | 最小 1。 最大 2.14748e+09。 |
| `strength` | number | `1` | 最小 0。 最大 1。 |
| `sprint` | boolean | `false` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "direction": {
      "type": "string",
      "enum": [
        "FORWARD",
        "BACKWARD",
        "LEFT",
        "RIGHT"
      ]
    },
    "ticks": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483637.0
    },
    "strength": {
      "type": "number",
      "minimum": 0.0,
      "maximum": 1.0,
      "default": 1
    },
    "sprint": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "direction",
    "ticks"
  ]
}
```

</details>

## MoveItemToOffhandAction

**Action** · Move a carried item into the offhand.

```text
/lattivium Worker exec MoveItemToOffhandAction {"item":"minecraft:firework_rocket"}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `item` | string | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "item": {
      "type": "string"
    }
  },
  "required": [
    "item"
  ]
}
```

</details>

## NavigateToPosFlow

**Flow** · Navigate to a position in the Bot's current dimension.

```text
/lattivium Worker exec NavigateToPosFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | number | `必填` |  |
| `target.y` | number | `必填` |  |
| `target.z` | number | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "y": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        },
        "z": {
          "type": "number",
          "minimum": -1.7976931348623157e+308,
          "maximum": 1.7976931348623157e+308
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## OpenContainerFlow

**Flow** · Open a container within interaction reach.

```text
/lattivium Worker exec OpenContainerFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | integer | `必填` |  |
| `target.y` | integer | `必填` |  |
| `target.z` | integer | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    }
  },
  "required": [
    "target"
  ]
}
```

</details>

## PortalJourneyFlow

**Flow** · Physically traverse the specified portal route; optionally continue to a destination.

```text
/lattivium Worker exec PortalJourneyFlow {"destinationDimension":"minecraft:the_nether","entrance":{"x":0,"y":64,"z":0},"exit":{"x":0,"y":129,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `destinationDimension` | string | `必填` |  |
| `entrance` | object | `必填` |  |
| `entrance.x` | integer | `必填` |  |
| `entrance.y` | integer | `必填` |  |
| `entrance.z` | integer | `必填` |  |
| `exit` | object | `必填` |  |
| `exit.x` | integer | `必填` |  |
| `exit.y` | integer | `必填` |  |
| `exit.z` | integer | `必填` |  |
| `target` | optional | `必填` | Optional final destination after traversing the portal. |
| `target.x` | integer | `必填` |  |
| `target.y` | integer | `必填` |  |
| `target.z` | integer | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "destinationDimension": {
      "type": "string"
    },
    "entrance": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "exit": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "target": {
      "anyOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "x": {
              "type": "integer",
              "minimum": -2147483648.0,
              "maximum": 2147483647.0
            },
            "y": {
              "type": "integer",
              "minimum": -2147483648.0,
              "maximum": 2147483647.0
            },
            "z": {
              "type": "integer",
              "minimum": -2147483648.0,
              "maximum": 2147483647.0
            }
          },
          "required": [
            "x",
            "y",
            "z"
          ]
        },
        {
          "type": "null"
        }
      ],
      "description": "Optional final destination after traversing the portal."
    }
  },
  "required": [
    "destinationDimension",
    "entrance",
    "exit"
  ]
}
```

</details>

## ResumeExcavation

**Flow** · Resume excavation from a saved task UUID in this world.

```text
/lattivium Worker exec ResumeExcavation {"taskId":"00000000-0000-0000-0000-000000000001"}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `taskId` | string | `必填` |  |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "taskId": {
      "type": "string"
    }
  },
  "required": [
    "taskId"
  ]
}
```

</details>

## SelectHotbarAction

**Action** · Select a zero-based hotbar slot.

```text
/lattivium Worker exec SelectHotbarAction {"slot":0}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `slot` | integer | `必填` | 最小 0。 最大 8。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "slot": {
      "type": "integer",
      "minimum": 0.0,
      "maximum": 8.0
    }
  },
  "required": [
    "slot"
  ]
}
```

</details>

## SupplyStepFlow

**Task** · Execute one legacy ItemRecord debug step; compatibility name for ItemRecordStepTask, requires an in-game requester.

```text
/lattivium Worker exec SupplyStepFlow {"planName":"example","step":1}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `planName` | string | `必填` |  |
| `step` | integer | `必填` | 最小 1。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "planName": {
      "type": "string"
    },
    "step": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483647.0
    }
  },
  "required": [
    "planName",
    "step"
  ]
}
```

</details>

## TransferAction

**Action** · Quick-move a half-open range of native menu slots.

```text
/lattivium Worker exec TransferAction {"startSlotInclusive":0,"endSlotExclusive":1}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `startSlotInclusive` | integer | `必填` | 最小 0。 |
| `endSlotExclusive` | integer | `必填` | 最小 0。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "startSlotInclusive": {
      "type": "integer",
      "minimum": 0.0,
      "maximum": 2147483647.0
    },
    "endSlotExclusive": {
      "type": "integer",
      "minimum": 0.0,
      "maximum": 2147483647.0
    }
  },
  "required": [
    "startSlotInclusive",
    "endSlotExclusive"
  ]
}
```

</details>

## TransferItemsFlow

**Flow** · Transfer an exact item count through the currently open menu.

```text
/lattivium Worker exec TransferItemsFlow {"direction":"WITHDRAW","item":"minecraft:stone","count":64}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `direction` | string | `必填` | 可选：`DEPOSIT`, `WITHDRAW` |
| `item` | string | `必填` |  |
| `count` | integer | `必填` | 最小 1。 |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "direction": {
      "type": "string",
      "enum": [
        "DEPOSIT",
        "WITHDRAW"
      ]
    },
    "item": {
      "type": "string"
    },
    "count": {
      "type": "integer",
      "minimum": 1.0,
      "maximum": 2147483647.0
    }
  },
  "required": [
    "direction",
    "item",
    "count"
  ]
}
```

</details>

## UseFlow

**Flow** · Interact with a block using the selected hand.

```text
/lattivium Worker exec UseFlow {"target":{"x":0,"y":64,"z":0}}
```

| 字段 | 类型 | 默认值 / 必填 | 约束 |
| --- | --- | --- | --- |
| `target` | object | `必填` |  |
| `target.x` | integer | `必填` |  |
| `target.y` | integer | `必填` |  |
| `target.z` | integer | `必填` |  |
| `hand` | string | `"MAIN_HAND"` | 可选：`MAIN_HAND`, `OFF_HAND` |

<details>
<summary>JSON Schema</summary>

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "target": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "y": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        },
        "z": {
          "type": "integer",
          "minimum": -2147483648.0,
          "maximum": 2147483647.0
        }
      },
      "required": [
        "x",
        "y",
        "z"
      ]
    },
    "hand": {
      "type": "string",
      "enum": [
        "MAIN_HAND",
        "OFF_HAND"
      ],
      "default": "MAIN_HAND"
    }
  },
  "required": [
    "target"
  ]
}
```

</details>
