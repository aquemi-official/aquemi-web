"""Section library: every look (a section design) kept with every content it has shown. Standard library only.

  python tools/specimens.py snapshot          Record every block with a look in content/pages/*.json into
                                              design-system/specimens/<look>.json (a new instance only when its content
                                              hash is new; nothing is ever removed) and mark each instance and look
                                              live or retired. Run it after page edits, before shipping.
  python tools/specimens.py fit <block type>  Looks that take that block type: status, fields, items held, best for,
  python tools/specimens.py fit --all         pages. Check this before inventing a new look.
  python tools/specimens.py catalog           Write design-system/section-library.md, the editors' catalog.
  python tools/specimens.py restore <look> <commit>
                                              Bring back a look deleted in <commit> (its renderer, component folder and
                                              the content it last had, from <commit>^) as a retired specimen.
  python tools/specimens.py restore --deleted Do that for every look file git shows as deleted and not back yet.

A look is a block's "look": "<name>" -> LOOKS[name] in assets/src/blocks/look-<name>.js, drawn by the component
design-system/components/<Pascal>/ (style.css, README.md, preview.html, motion.js). Looks are never deleted: a look no
page uses is retired and stays in the section library (sections.html), built into the library bundles, not the
site's (tools/design_system.py build).
"""
import datetime, hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOCKS = os.path.join(ROOT, 'assets', 'src', 'blocks')
COMPS = os.path.join(ROOT, 'design-system', 'components')
SPEC = os.path.join(ROOT, 'design-system', 'specimens')
PAGES = os.path.join(ROOT, 'content', 'pages')
CATALOG = os.path.join(ROOT, 'design-system', 'section-library.md')
INDEX = os.path.join(ROOT, 'design-system', 'section-library.json')   # what sections.html lists (blocks stay in specimens/)
# The list a block's items live in, first match wins (for "items held")
ITEM_KEYS = ('items', 'rows', 'stages', 'points', 'zones', 'stops', 'phases')


def git(*a):
    return subprocess.run(['git'] + list(a), cwd=ROOT, capture_output=True, text=True, encoding='utf8').stdout


def today():
    return datetime.date.today().isoformat()


def bhash(b):
    return hashlib.sha1(json.dumps(b, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf8')).hexdigest()[:10]


def look_files():
    return sorted(f[5:-3] for f in os.listdir(BLOCKS) if f.startswith('look-') and f.endswith('.js'))


def header(src):
    m = re.match(r'\s*/\*(.*?)\*/', src, re.S)
    return m.group(1) if m else ''


def component_of(src, look):
    m = re.search(r'Look "%s"\s*->\s*([A-Z][A-Za-z0-9]*)' % re.escape(look), src)
    return m.group(1) if m else ''


def fields_of(src):
    """The look's "Fields …" paragraph from its header comment, as one line ('' without one)."""
    h = header(src)
    i = h.find('Fields')
    if i < 0:
        return ''
    out = []
    for n, line in enumerate(h[i:].split('\n')):
        s = line.strip()
        if n and (not s or re.match(r'[A-Z][a-z]+\b', s)):
            break
        out.append(s)
    t = ' '.join(out)
    t = re.split(r'(?<=[.)])\s+(?=[A-Z][A-Za-z ]+:)', t)[0]
    t = re.sub(r'^Fields\s*(\((?:as )?an? [\w-]+ block\))?\s*,?\s*(as an? [\w-]+ block)?\s*:?\s*', '', t)
    return t.rstrip('.') + '.' if t else ''


def keys_of(instances):
    """Fields seen in a look's blocks, for a look whose header names none: top-level keys, and the keys of its items."""
    top, sub = [], []
    for x in instances:
        b = x['block']
        top += [k for k in b if k not in top and k not in ('type', 'look', 'nav', 'anchor')]
        for k in ITEM_KEYS:
            if isinstance(b.get(k), list):
                for it in b[k]:
                    if isinstance(it, dict):
                        sub += [j for j in it if j not in sub]
                break
    return ('seen in its blocks: ' + ', '.join(top) + (' (items: ' + ', '.join(sub) + ')' if sub else '') + '.') if top else ''


def readme_first(comp):
    p = os.path.join(COMPS, comp, 'README.md')
    if not os.path.exists(p):
        return ''
    text = open(p, encoding='utf8').read().strip()
    return re.split(r'(?<=\.)\s', text, 1)[0]


def items_held(b):
    for k in ITEM_KEYS:
        v = b.get(k)
        if isinstance(v, list):
            return len(v)
    return None


def pages_now():
    """[(page id, file, page)] in site order."""
    out = []
    for f in sorted(os.listdir(PAGES)):
        if f.endswith('.json'):
            p = json.load(open(os.path.join(PAGES, f), encoding='utf8'))
            out.append((p['id'], f, p))
    return out


def used_now():
    """{look: [(page id, slot, block)]} from the current page files."""
    u = {}
    for pid, _, p in pages_now():
        for i, b in enumerate(p.get('blocks') or []):
            if isinstance(b, dict) and b.get('look'):
                u.setdefault(b['look'], []).append((pid, i, b))
    return u


def load(look):
    p = os.path.join(SPEC, look + '.json')
    return json.load(open(p, encoding='utf8')) if os.path.exists(p) else None


def save(s):
    os.makedirs(SPEC, exist_ok=True)
    open(os.path.join(SPEC, s['look'] + '.json'), 'w', encoding='utf8', newline='\n').write(json.dumps(s, ensure_ascii=False, indent=1) + '\n')


def describe(look, s=None):
    """Refresh a specimen's header fields from the look file and its component."""
    s = s or {'look': look, 'instances': []}
    p = os.path.join(BLOCKS, 'look-%s.js' % look)
    src = open(p, encoding='utf8').read() if os.path.exists(p) else ''
    comp = component_of(src, look) or s.get('component', '')
    head = {'look': look, 'component': comp, 'type': s.get('type', ''), 'fields': fields_of(src) or s.get('fields', ''),
            'best_for': readme_first(comp) or s.get('best_for', ''), 'status': s.get('status', 'retired')}
    if not src:
        head['missing'] = 'assets/src/blocks/look-%s.js is not in the repo' % look
    for k in ('note',):
        if s.get(k):
            head[k] = s[k]
    head['instances'] = s.get('instances', [])
    return head


def snapshot(quiet=False):
    commit = git('rev-parse', '--short', 'HEAD').strip()
    day = today()
    used = used_now()
    files = {pid: f for pid, f, _ in pages_now()}
    looks = set(look_files()) | set(used)
    if os.path.isdir(SPEC):
        looks |= {f[:-5] for f in os.listdir(SPEC) if f.endswith('.json')}
    new = live = 0
    for look in sorted(looks):
        s = describe(look, load(look))
        here = used.get(look, [])
        hashes = set()
        for pid, slot, b in here:
            h = bhash(b)
            hashes.add(h)
            s['type'] = b.get('type', s['type'])
            hit = next((x for x in s['instances'] if x['hash'] == h), None)
            if hit:
                hit.update({'page': pid, 'slot': slot, 'h': b.get('h', '')})
            else:
                s['instances'].append({'page': pid, 'slot': slot, 'h': b.get('h', ''), 'status': 'live',
                                       'first_seen': first_seen(look, 'content/pages/' + files[pid], h, 'HEAD') or day,
                                       'last_seen': day, 'commit': commit, 'hash': h, 'block': b})
                new += 1
        for x in s['instances']:
            now = 'live' if x['hash'] in hashes else 'retired'
            if x['status'] == 'live' and now == 'retired':
                x['last_seen'] = day   # the first snapshot that no longer finds it on a page
            elif now == 'live':
                x['last_seen'] = x.get('last_seen') or day
            x['status'] = now
        if not s['type'] and s['instances']:
            s['type'] = s['instances'][-1]['block'].get('type', '')
        if not s['fields'] or s['fields'].startswith('seen in its blocks'):
            s['fields'] = keys_of(s['instances'])
        s['status'] = 'live' if here else 'retired'
        live += bool(here)
        save(s)
    if not quiet:
        print('specimens: %d looks (%d live, %d retired), %d new content version(s) recorded at %s'
              % (len(looks), live, len(looks) - live, new, commit))


def all_specimens():
    if not os.path.isdir(SPEC):
        return []
    return [json.load(open(os.path.join(SPEC, f), encoding='utf8')) for f in sorted(os.listdir(SPEC)) if f.endswith('.json')]


def stats(s):
    n = [items_held(x['block']) for x in s['instances']]
    n = [x for x in n if x is not None]
    held = ('%d' % n[0] if min(n) == max(n) else '%d-%d' % (min(n), max(n))) if n else '-'
    where = sorted({x['page'] for x in s['instances'] if x['status'] == 'live'})
    last = sorted(s['instances'], key=lambda x: x['last_seen'])
    was = '' if where else ('%s (%s)' % (last[-1]['page'], last[-1]['last_seen']) if last else '')
    return held, where, was


def fit(kind):
    S = [s for s in all_specimens() if kind == '--all' or s.get('type') == kind]
    if not S:
        types = sorted({s.get('type') for s in all_specimens()})
        print('no look takes block type %r; types with looks: %s' % (kind, ', '.join(types)))
        return
    S.sort(key=lambda s: (s.get('type', ''), s['status'] != 'live', s['look']))
    cur = None
    for s in S:
        if s.get('type') != cur:
            cur = s.get('type')
            print('\n== %s (%d looks)' % (cur, sum(1 for x in S if x.get('type') == cur)))
        held, where, was = stats(s)
        print('\n%-22s %-8s %s' % (s['look'], s['status'], s['component']))
        print('  items held: %s   pages: %s' % (held, ', '.join(where) if where else 'none (last on %s)' % was))
        if s.get('fields'):
            print('  fields: ' + s['fields'])
        if s.get('best_for'):
            print('  best for: ' + s['best_for'])
        if s.get('note'):
            print('  note: ' + s['note'])


def md_cell(t):
    return str(t or '').replace('|', '\\|').replace('\n', ' ')


def catalog():
    S = all_specimens()
    by = {}
    for s in S:
        by.setdefault(s.get('type') or '(unknown)', []).append(s)
    live = sum(1 for s in S if s['status'] == 'live')
    out = ['# Section library', '',
           'Every section design (a "look") the site has had, with the content it showed. %d looks: %d live on a page, '
           '%d retired. Each one still renders with its motion in the [Section library](../sections.html); this file is '
           'generated by `python tools/specimens.py catalog` from `design-system/specimens/` (do not edit it by hand).'
           % (len(S), live, len(S) - live), '',
           '**Swap a look.** A look renders one block type (the shape of data it shows). For a block of the same type, set '
           'its `"look"` to another look of that type and rebuild; check that the block has the fields the look reads '
           '(Fields below) and an item count inside the range it has held. For a look of another type, restructure the '
           'content to that look\'s fields and type (copy the specimen\'s block in `design-system/specimens/<look>.json` '
           'as the template). Before inventing a new look, run `python tools/specimens.py fit <type>`.', '',
           '**Never delete a look.** A look no page uses is retired: its renderer, component folder, motion and '
           'specimens stay, built into the library bundles (not the site\'s), so it can be reused by setting `look` on a '
           'block again. After page edits, run `python tools/specimens.py snapshot` before shipping so every content '
           'version is kept.', '']
    for t in sorted(by):
        L = sorted(by[t], key=lambda s: (s['status'] != 'live', s['look']))
        out += ['## %s (%d)' % (t, len(L)), '',
                '| Look | Component | Status | Fields | Items held | Best for | Used on / last used on |',
                '| --- | --- | --- | --- | --- | --- | --- |']
        for s in L:
            held, where, was = stats(s)
            out.append('| [`%s`](../sections.html#%s) | %s | %s | %s | %s | %s | %s |' % (
                s['look'], s['look'], s['component'], s['status'], md_cell(s.get('fields')), held,
                md_cell(s.get('best_for')), ', '.join(where) if where else 'last: ' + was))
        out.append('')
    open(CATALOG, 'w', encoding='utf8', newline='\n').write('\n'.join(out))
    idx = []
    for s in sorted(S, key=lambda s: s['look']):
        held, where, was = stats(s)
        x = {k: s.get(k) for k in ('look', 'component', 'type', 'status', 'fields', 'best_for', 'note') if s.get(k)}
        x.update({'held': held, 'pages': where, 'instances': [{k: v for k, v in i.items() if k != 'block'} for i in s['instances']]})
        idx.append(x)
    open(INDEX, 'w', encoding='utf8', newline='\n').write(json.dumps(
        {'about': 'Generated by tools/specimens.py catalog from design-system/specimens/. Do not edit.', 'looks': idx},
        ensure_ascii=False, indent=1) + '\n')
    print('wrote design-system/section-library.md and section-library.json (%d looks in %d block types)' % (len(S), len(by)))


# ---- restore: bring back a look deleted in a commit, as retired --------------------------------------------------

def show(rev, path):
    r = subprocess.run(['git', 'show', '%s:%s' % (rev, path)], cwd=ROOT, capture_output=True)
    return r.stdout if r.returncode == 0 else None


def last_content(look, rev):
    """[(page id, slot, block, commit, date)] for the blocks with this look at rev, walking back along history until
    some page used it."""
    revs = git('rev-list', '--max-count=60', rev, '--', 'content/pages').split()
    for r in revs:
        hits = []
        for f in git('ls-tree', '--name-only', r, 'content/pages/').split():
            if not f.endswith('.json'):
                continue
            p = json.loads(show(r, f).decode('utf8'))
            for i, b in enumerate(p.get('blocks') or []):
                if isinstance(b, dict) and b.get('look') == look:
                    hits.append((p['id'], i, b, f))
        if hits:
            return r, hits
    return None, []


def first_seen(look, f, h, rev):
    """Date of the oldest commit (up to rev) from which page file f kept a block with this look and content hash."""
    day = None
    for line in git('log', '--format=%h %ad', '--date=short', rev, '--', f).split('\n'):
        if not line.strip():
            continue
        c, d = line.split()
        src = show(c, f)
        if not src:
            break
        p = json.loads(src.decode('utf8'))
        if any(isinstance(b, dict) and b.get('look') == look and bhash(b) == h for b in p.get('blocks') or []):
            day = d
        else:
            break
    return day


def restore(look, commit):
    par = commit + '^'
    rel = 'assets/src/blocks/look-%s.js' % look
    src = show(par, rel)
    if src is None:
        print('%s: no %s at %s' % (look, rel, par))
        return
    dest = os.path.join(ROOT, rel)
    if not os.path.exists(dest):
        open(dest, 'wb').write(src)
    comp = component_of(src.decode('utf8'), look)
    files = [f for f in git('ls-tree', '-r', '--name-only', par, 'design-system/components/%s/' % comp).split() if f]
    for f in files:
        d = os.path.join(ROOT, f)
        if not os.path.exists(d):
            os.makedirs(os.path.dirname(d), exist_ok=True)
            open(d, 'wb').write(show(par, f))
    r, hits = last_content(look, par)
    s = load(look) or {'look': look, 'instances': []}
    if r:
        cs = git('rev-parse', '--short', r).strip()
        day = git('log', '-1', '--format=%ad', '--date=short', r).strip()
        for pid, slot, b, f in hits:
            h = bhash(b)
            if any(x['hash'] == h for x in s['instances']):
                continue
            s['instances'].append({'page': pid, 'slot': slot, 'h': b.get('h', ''), 'status': 'retired',
                                   'first_seen': first_seen(look, f, h, r) or day, 'last_seen': day, 'commit': cs,
                                   'hash': h, 'block': b})
            s['type'] = b.get('type', s.get('type', ''))
    s['status'] = 'retired'
    s.setdefault('restored', {'from': git('rev-parse', '--short', par).strip(), 'deleted_in': git('rev-parse', '--short', commit).strip()})
    keep = s.pop('restored')
    s = describe(look, s)
    if not s['fields']:
        s['fields'] = keys_of(s['instances'])
    s['restored'] = keep
    save(s)
    print('%s -> %s (%d files), %d content version(s)%s' % (look, comp, len(files), len(s['instances']),
                                                              '' if hits else ' (no page content found)'))


def deleted_looks():
    out, cur = [], None
    for line in git('log', '--diff-filter=D', '--name-only', '--format=@%h', '--', 'assets/src/blocks/look-*.js').split('\n'):
        line = line.strip()
        if line.startswith('@'):
            cur = line[1:]
        elif line:
            look = os.path.basename(line)[5:-3]
            if not os.path.exists(os.path.join(ROOT, line)) and look not in [x[0] for x in out]:
                out.append((look, cur))
    return out


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(errors='backslashreplace')
    a = sys.argv[1:]
    cmd = a[0] if a else ''
    if cmd == 'snapshot':
        snapshot()
        catalog()
    elif cmd == 'fit' and len(a) > 1:
        fit(a[1])
    elif cmd == 'catalog':
        catalog()
    elif cmd == 'restore' and a[1:2] == ['--deleted']:
        for look, c in deleted_looks():
            restore(look, c)
    elif cmd == 'restore' and len(a) > 2:
        restore(a[1], a[2])
    else:
        print(__doc__)
        sys.exit(2)
