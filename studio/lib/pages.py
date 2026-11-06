"""Pages: how the kit sees the project's site, whatever it is built with. Standard library only.

Every tool works from one normalized list (schemas/pages.schema.json):
  {"id", "title", "group", "url", "file", "sections": [{"type", "h", "text"}], "notes": [...], "ctas": [{"text", "href"}],
   "text"}
written to <data.dir>/pages.json by `studio.py pages` (and by `build`).

Adapters (config site.pages.adapter):
  html     static HTML files (default). glob: patterns relative to the root. Sections are cut at h1-h3.
  json     one JSON file holding every page. file, list (dotted key), id, title, group, url ("{id}" filled),
           sections (key of the section list), heading, type, notes (key of a list of open notes), ctas (dotted keys
           of calls to action: a label or {label|button|text, link|href}). Keys that hold addresses or settings (link,
           href, src, id, intent, type ...) and values that are only a page id are not counted as copy.
  command  any build: run (argv list) prints the normalized list as JSON on stdout.
The same adapters read the project at any commit (history), through a Reader.
"""
import fnmatch
import hashlib
import html.parser
import json
import os
import re
import subprocess


class FsReader:
    def __init__(self, root):
        self.root = root

    def read(self, rel):
        p = os.path.join(self.root, rel)
        return open(p, encoding='utf8', errors='replace').read() if os.path.isfile(p) else None

    def files(self):
        out = []
        for d, dirs, fs in os.walk(self.root):
            dirs[:] = [x for x in dirs if not x.startswith('.') and x != 'node_modules']
            out += [os.path.relpath(os.path.join(d, f), self.root).replace(os.sep, '/') for f in fs]
        return out


class GitReader:
    """The project as it was at one commit."""
    def __init__(self, root, commit, tree=None):
        self.root, self.commit, self.tree = root, commit, tree

    def read(self, rel):
        try:
            return subprocess.run(['git', '-C', self.root, 'show', '%s:%s' % (self.commit, rel)], capture_output=True,
                                  check=True).stdout.decode('utf8', 'replace')
        except subprocess.CalledProcessError:
            return None

    def files(self):
        if self.tree is not None:
            return list(self.tree)
        out = subprocess.run(['git', '-C', self.root, 'ls-tree', '-r', '--name-only', self.commit], capture_output=True,
                             text=True).stdout
        return out.splitlines()


def dig(obj, key):
    for k in (key or '').split('.'):
        if not k:
            continue
        obj = obj.get(k) if isinstance(obj, dict) else None
    return obj


# Keys whose values are addresses, ids or settings, not copy a reader sees
NOT_COPY = re.compile(r'(^|_)(type|look|as|id|ids|href|src|url|link|path|icon|art|intent|anchor|index|uses|class|slug|key)$')


def strings(x, skip=(), ids=frozenset()):
    """Every string a reader would see in x: keys that hold addresses or settings are left out, and so are values that
    are only a page id (a link to another page)."""
    if isinstance(x, str):
        return [] if x in ids or x.split('#')[0] in ids else [x]
    if isinstance(x, list):
        return [s for v in x for s in strings(v, skip, ids)]
    if isinstance(x, dict):
        return [s for k, v in x.items() if k not in skip and not NOT_COPY.search(k) for s in strings(v, skip, ids)]
    return []


def squash(s):
    return re.sub(r'\s+', ' ', s or '').strip()


# ---------------------------------------------------------------- json

def ctas_of(v):
    """Calls to action from a config-named field: a label, {label|button|text, link|href}, or a list of those."""
    if isinstance(v, list):
        return [c for x in v for c in ctas_of(x)]
    if isinstance(v, str) and v.strip():
        return [{'text': squash(v)}]
    if isinstance(v, dict):
        t = v.get('label') or v.get('button') or v.get('text')
        return [{'text': squash(t), 'href': v.get('link') or v.get('href') or ''}] if t else []
    return []


def from_json(spec, reader):
    raw = reader.read(spec['file'])
    if raw is None:
        return []
    data = json.loads(raw)
    lst = dig(data, spec.get('list', '')) if spec.get('list') else data
    if isinstance(lst, dict) and 'pages' in lst:
        lst = lst['pages']
    lst = [p for p in lst or [] if isinstance(p, dict)]
    ids = frozenset(str(p.get(spec.get('id', 'id'), '')) for p in lst)
    notes_key = spec.get('notes', 'notes')
    skip = (notes_key, 'meta')
    out = []
    for p in lst:
        pid = str(p.get(spec.get('id', 'id'), ''))
        secs = []
        for b in p.get(spec.get('sections', 'sections'), []) or []:
            if isinstance(b, dict):
                secs.append({'type': str(b.get(spec.get('type', 'type'), '') or ''), 'h': squash(str(b.get(spec.get('heading', 'h'), '') or '')),
                             'text': squash(' '.join(strings(b, skip, ids)))})
        out.append({'id': pid, 'title': squash(str(p.get(spec.get('title', 'title')) or p.get('title') or pid)),
                    'group': squash(str(p.get(spec.get('group', 'group'), '') or '')),
                    'url': spec.get('url', '{id}').replace('{id}', pid), 'file': spec['file'], 'sections': secs,
                    'notes': [squash(str(n)) for n in (p.get(notes_key) or [])],
                    'ctas': [c for c in (ctas_of(dig(p, k)) for k in spec.get('ctas', [])) for c in c],
                    'text': squash(' '.join(strings(p, skip, ids)))})
    return out


# ---------------------------------------------------------------- html

class Outline(html.parser.HTMLParser):
    SKIP = {'script', 'style', 'noscript', 'svg', 'template'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self.secs, self.cur, self.skip, self.inh, self.intitle = '', [], {'type': 'intro', 'h': '', 'text': []}, 0, None, False
        self.ctas, self.inbtn = [], None

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.skip += 1
        elif tag == 'title':
            self.intitle = True
        elif not self.skip and (tag == 'button' or (tag == 'a' and re.search(r'\b(btn|button|cta)\b', (dict(attrs).get('class') or '') + ' ' + (dict(attrs).get('role') or '')))):
            self.inbtn = {'tag': tag, 'text': '', 'href': dict(attrs).get('href') or ''}
        elif tag in ('h1', 'h2', 'h3') and not self.skip:
            self.flush()
            self.inh = tag
            self.cur = {'type': tag, 'h': '', 'text': []}

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skip:
            self.skip -= 1
        elif tag == 'title':
            self.intitle = False
        elif tag == self.inh:
            self.inh = None
        elif self.inbtn and tag == self.inbtn['tag']:
            if squash(self.inbtn['text']):
                self.ctas.append({'text': squash(self.inbtn['text']), 'href': self.inbtn['href']})
            self.inbtn = None

    def handle_data(self, d):
        if self.intitle:
            self.title += d
        elif not self.skip:
            if self.inbtn:
                self.inbtn['text'] += d
            if self.inh:
                self.cur['h'] += d
            else:
                self.cur['text'].append(d)

    def flush(self):
        t = squash(' '.join(self.cur['text']))
        if t or self.cur['h']:
            self.secs.append({'type': self.cur['type'], 'h': squash(self.cur['h']), 'text': t})

    def result(self):
        self.flush()
        return squash(self.title), self.secs


def outline(markup, with_ctas=False):
    o = Outline()
    try:
        o.feed(markup)
    except Exception:
        pass
    return o.result() + ((o.ctas,) if with_ctas else ())


def from_html(spec, reader, exclude=()):
    pats = spec.get('glob') or ['*.html']
    pats = [pats] if isinstance(pats, str) else pats
    out = []
    for f in sorted(reader.files()):
        if not f.endswith(('.html', '.htm')) or any(f == e or f.startswith(e.rstrip('/') + '/') for e in exclude):
            continue
        if not any(fnmatch.fnmatch(f, p) for p in pats):
            continue
        markup = reader.read(f) or ''
        title, secs, ctas = outline(markup, True)
        pid = re.sub(r'(^|/)index\.html?$', r'\1', f)
        pid = re.sub(r'\.html?$', '', pid).strip('/') or 'home'
        out.append({'id': pid, 'title': title or pid, 'group': os.path.dirname(f), 'url': f, 'file': f,
                    'sections': secs, 'ctas': ctas, 'notes': re.findall(r'\[([^\]\n]{2,80})\]', ' '.join(s['text'] for s in secs))[:40],
                    'text': ' '.join((s['h'] + ' ' + s['text']).strip() for s in secs)})
    return out


# ---------------------------------------------------------------- entry points

def studio_paths(project):
    """Paths the html adapter never treats as site pages: the kit, the data, project tool pages."""
    c = project.cfg
    ex = [project.kit_rel, c['data']['dir'], c['data']['history'], c['data']['scans'], 'node_modules']
    ex += [t['page'].split('#')[0] for t in c.get('tools', []) if t.get('ships') != 'live']
    return ex + list(c['site']['pages'].get('exclude', []))


def collect(project, reader=None):
    spec = project.cfg['site']['pages']
    reader = reader or FsReader(project.root)
    a = spec.get('adapter', 'html')
    if a == 'json':
        return from_json(spec, reader)
    if a == 'command':
        if not isinstance(reader, FsReader):
            return []
        out = subprocess.run(spec['run'], cwd=project.root, capture_output=True, text=True, check=True).stdout
        return json.loads(out)
    return from_html(spec, reader, studio_paths(project))


def page_hashes(pages):
    """A short hash of each page's content, for the history's 'did this page's copy change' mark."""
    return {p['id']: hashlib.sha1(json.dumps(p, sort_keys=True).encode()).hexdigest()[:8] for p in pages}


def write_index(project):
    pages = collect(project)
    d = project.path(project.cfg['data']['dir'])
    os.makedirs(d, exist_ok=True)
    slim = {'about': 'Generated by python %s/studio.py pages from the site (studio.config.json site.pages). Do not edit. '
                     'Headings only; tools that need the copy read it through pages.collect().' % project.kit_rel,
            'pages': [{'id': p['id'], 'title': p['title'], 'group': p['group'], 'url': p['url'], 'file': p.get('file', ''),
                       'sections': [{'type': x['type'], 'h': x['h']} for x in p['sections']], 'notes': p['notes'],
                       'words': len(p['text'].split())} for p in pages]}
    p = os.path.join(d, 'pages.json')
    new = json.dumps(slim, ensure_ascii=False, separators=(',', ':')) + '\n'
    if not os.path.exists(p) or open(p, encoding='utf8').read() != new:
        open(p, 'w', encoding='utf8', newline='\n').write(new)
    return pages
