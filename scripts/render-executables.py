"""Generate both languages and kind-specific references from the runtime contract."""
import argparse, json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(); p.add_argument('--check', action='store_true'); args = p.parse_args()
catalog = json.loads((root/'execution-catalog.json').read_text(encoding='utf-8'))['entries']
translations = json.loads((root/'translations/zh.json').read_text(encoding='utf-8'))
if set(translations) != set(catalog): raise SystemExit('Translate every execution entry')
def write(path, text):
    text = '\n'.join(line.rstrip() for line in text.splitlines()).rstrip() + '\n'
    path.parent.mkdir(parents=True, exist_ok=True)
    if args.check:
        if not path.exists() or path.read_text(encoding='utf-8') != text: raise SystemExit(f'Stale generated page: {path}')
    else: path.write_text(text, encoding='utf-8')
def rows(schema, en, prefix=''):
    for name, field in schema.get('properties', {}).items():
        path = prefix + name
        kind = field.get('type', 'optional')
        detail = []
        if 'enum' in field: detail.append(', '.join(f'`{v}`' for v in field['enum']))
        for bound in ['minimum','maximum','minItems','maxItems']:
            if bound in field and abs(field[bound]) < 2**31-1: detail.append(f'{bound}: {field[bound]:g}')
        default = json.dumps(field['default'], ensure_ascii=False) if 'default' in field else ('Required' if en else '必填')
        yield f'| `{path}` | `{kind}` | `{default}` | {"; ".join(detail)} |'
        yield from rows(field.get('items',field), en, path + ('[].' if kind=='array' else '.'))
for en in [False, True]:
    directory = root/'docs'/('en' if en else '')/'reference'
    intro = '# JSON execution entries' if en else '# JSON 执行入口'
    intro += '\n\n' + ('Submit JSON parameters through `exec`, `enqueue` or `interrupt`. Each accepted submission returns a task ID. Bot and world dependencies are supplied by the server. Fields and entry names are case-sensitive; coordinates are absolute. See [task control](./task-control) and [positional commands](./commands).' if en else '通过 `exec`、`enqueue` 或 `interrupt` 提交 JSON 参数。每次受理都会返回任务 ID。服务端注入 Bot 和世界依赖。字段名及入口名区分大小写，坐标使用绝对值。参见[任务控制](./task-control)和[位置参数命令](./commands)。')
    intro += '\n\n```text\n/lattivium Worker exec DelayTask {"ticks":20}\n/ltv schema\n/ltv schema DelayTask\n```\n\n'
    for kind in ['Task','Flow','Action']:
        slug=kind.lower()+'s'
        entries={name:e for name,e in catalog.items() if e['kind']==kind}
        intro += f'## [{kind}](./{slug})\n\n' + '\n'.join(f'- [{name}](./{slug}#{name.lower()}): '+(e['description'] if en else translations[name]) for name,e in entries.items())+'\n\n'
        page=f'# {kind}\n\n'+ ('Each entry accepts the JSON object shown below. Defaults and constraints come from the runtime contract.' if en else '各入口接受下列 JSON 参数。默认值与约束由运行时契约生成。')+'\n\n'
        for name,e in entries.items():
            page+=f'## {name}\n\n'+(e['description'] if en else translations[name])+'\n\n'
            example=json.dumps(e['example'],ensure_ascii=False,separators=(',',':'))
            page+=f'```text\n/lattivium Worker exec {name} {example}\n```\n\n'
            fields=list(rows(e['parameters'],en))
            if fields: page+= ('| Field | Type | Default | Constraints |' if en else '| 字段 | 类型 | 默认值 | 约束 |')+'\n| --- | --- | --- | --- |\n'+'\n'.join(fields)+'\n\n'
        write(directory/f'{slug}.md', page)
    write(directory/'executables.md',intro)
print(f'Generated bilingual references for {len(catalog)} entries')
