"""Validate published coverage, optionally against a private local source tree."""
import argparse,hashlib,json,re
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--source',type=Path);args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'reference-manifest.json').read_text(encoding='utf-8'))
for key,page in [('commands','reference/executables'),('configFields','reference/config'),('httpActions','reference/http'),('apiTypes','developer/api')]:
    text=(root/'docs'/f'{page}.md').read_text(encoding='utf-8')
    for name in m[key]:
        if name not in text:raise SystemExit(f'Missing documented {key}: {name}')
if args.source:
    changed=[name for name,digest in m['sourceHashes'].items() if not (args.source/name).exists() or hashlib.sha256((args.source/name).read_bytes()).hexdigest()!=digest]
    if changed:raise SystemExit('Review source drift before updating manifest: '+', '.join(changed))
catalog=json.loads((root/'execution-catalog.json').read_text(encoding='utf-8'))
if set(m['commands']) != set(catalog['entries']): raise SystemExit('Catalog entry coverage differs from manifest')
for p in (root/'docs').rglob('*.md'):
    text=p.read_text(encoding='utf-8')
    if re.search(r'(?:[A-Z]:[\\/](?:Users|Dev)[\\/]|gh[pousr]_[A-Za-z0-9]{20,})',text):raise SystemExit(f'Local path or credential pattern in {p.name}')
print(f"Coverage OK: {len(m['commands'])} commands, {len(m['configFields'])} config fields, {len(m['apiTypes'])} API types")
