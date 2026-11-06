"""Subframe Motion library client (stdlib only): the same calls as the `subframe-motion` MCP server, for agents and
scripts that don't have the MCP tools loaded.

  python motion.py search "<plain-words query>" [--category "WebGL & shaders"] [--runtime webgl|react|motion] [--limit 30]
  python motion.py get <slug> [--out <dir>]     meta as JSON on stdout; with --out the React source goes to <dir>/<slug>.tsx
  python motion.py guide <topic> [<topic> ...]   principles timing enter-exit feedback scroll ambient text-and-numbers
                                                 performance accessibility adapting
  python motion.py catalog                       re-crawl the whole library into ../catalog.json (slug, title, look...)
"""
import itertools, json, os, sys, urllib.request

URL = 'https://mcp.subframe.com/motion/mcp'
HERE = os.path.dirname(os.path.abspath(__file__))

def call(name, args):
    body = json.dumps({'jsonrpc': '2.0', 'id': 1, 'method': 'tools/call', 'params': {'name': name, 'arguments': args}}).encode()
    rq = urllib.request.Request(URL, body, {'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream', 'MCP-Protocol-Version': '2025-06-18'})
    txt = urllib.request.urlopen(rq, timeout=60).read().decode('utf-8')
    for line in txt.splitlines():
        if line.startswith('data: '):
            r = json.loads(line[6:])
            if 'error' in r: raise SystemExit(r['error'])
            t = r['result']['content'][0]['text']
            try: return json.loads(t)
            except ValueError: return t
    raise SystemExit('no reply')

def opt(a, k, d=None):
    return a[a.index(k) + 1] if k in a else d

def main(a):
    if not a: print(__doc__); return
    cmd = a[0]
    out = sys.stdout
    if hasattr(out, 'reconfigure'): out.reconfigure(encoding='utf-8')
    if cmd == 'search':
        q = {'limit': int(opt(a, '--limit', 12))}
        if len(a) > 1 and not a[1].startswith('--'): q['query'] = a[1]
        for k, f in (('category', '--category'), ('runtime', '--runtime')):
            if opt(a, f): q[k] = opt(a, f)
        r = call('search_motion_examples', q)
        for e in (r.get('examples', []) if isinstance(r, dict) else []):
            print('%-28s %-26s %-6s %s | %s' % (e['slug'], e['category'], e['runtime'], e['commonName'], e.get('look', '')))
        if isinstance(r, dict) and r.get('note'): print('note:', r['note'])
    elif cmd == 'get':
        r = call('get_motion_example', {'slug': a[1]}); code = r.pop('code', '')
        d = opt(a, '--out')
        if d:
            os.makedirs(d, exist_ok=True); p = os.path.join(d, a[1] + '.tsx')
            open(p, 'w', encoding='utf-8').write(code); r['source_file'] = p
        else: r['code'] = code
        print(json.dumps(r, ensure_ascii=False, indent=1))
    elif cmd == 'guide':
        print(call('get_motion_guidance', {'topics': a[1:]}))
    elif cmd == 'catalog':
        seen = {}
        qs = ['', 'water', 'liquid', 'lines', 'diagram', 'grid', 'scroll', 'text', 'numbers', 'chart', 'paper', 'cards',
              'button', 'form', 'menu', 'loading', 'hover', 'image', '3d', 'particles', 'light', 'wave', 'glass', 'metal',
              'timeline', 'list', 'drag', 'spring', 'shape', 'pattern', 'audio', 'map', 'clock']
        cats = [None, 'Components & interactions', 'Animation & motion', 'WebGL & shaders']
        for q, c in itertools.product(qs, cats):
            x = {'limit': 30}
            if q: x['query'] = q
            if c: x['category'] = c
            try: r = call('search_motion_examples', x)
            except Exception: continue
            for e in (r.get('examples', []) if isinstance(r, dict) else []):
                e.pop('url', None); seen[e['slug']] = e
        rows = sorted(seen.values(), key=lambda e: (e['category'], e['slug']))
        json.dump(rows, open(os.path.join(HERE, '..', 'catalog.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(len(rows), 'examples -> catalog.json')
    else: print(__doc__)

if __name__ == '__main__': main(sys.argv[1:])
