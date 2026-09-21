"""Render the exported runtime contract without a private source checkout."""
import argparse
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
catalog = json.loads((root / 'execution-catalog.json').read_text(encoding='utf-8'))

def rows(schema, prefix=''):
    for name, field in schema.get('properties', {}).items():
        path = prefix + name
        kind = field.get('type', 'optional')
        detail = field.get('description', '')
        if 'enum' in field:
            detail += ' 可选：' + ', '.join(f'`{v}`' for v in field['enum'])
        for bound, label in [('minimum', '最小'), ('maximum', '最大'), ('minItems', '最少项数'), ('maxItems', '最多项数')]:
            if bound in field and abs(field[bound]) < 2**31 - 1:
                detail += f' {label} {field[bound]:g}。'
        default = json.dumps(field['default'], ensure_ascii=False) if 'default' in field else '必填'
        yield f'| `{path}` | {kind} | `{default}` | {detail.strip()} |'
        nested = field.get('items', field)
        yield from rows(nested, path + ('[].' if kind == 'array' else '.'))
        for variant in field.get('anyOf', []):
            yield from rows(variant, path + '.')

parts = ['''# JSON 执行入口

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
''']
for name, entry in catalog['entries'].items():
    example = json.dumps(entry['example'], ensure_ascii=False, separators=(',', ':'))
    parts += [f"## {name}\n\n**{entry['kind']}** · {entry['description']}\n",
              f'```text\n/lattivium Worker exec {name} {example}\n```\n']
    fields = list(rows(entry['parameters']))
    if fields:
        parts += ['| 字段 | 类型 | 默认值 / 必填 | 约束 |\n| --- | --- | --- | --- |\n' + '\n'.join(fields) + '\n']
    else:
        parts += ['参数为 `{}`。\n']
    schema = json.dumps(entry['parameters'], ensure_ascii=False, indent=2)
    parts += [f'<details>\n<summary>JSON Schema</summary>\n\n```json\n{schema}\n```\n\n</details>\n']
rendered = '\n'.join(parts)
page = root / 'docs/reference/executables.md'
if args.check:
    if page.read_text(encoding='utf-8') != rendered:
        raise SystemExit('Executable reference is stale: run python scripts/render-executables.py')
else:
    page.write_text(rendered, encoding='utf-8')
print(f"Executable reference: {len(catalog['entries'])} entries")
