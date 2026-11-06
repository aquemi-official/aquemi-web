"""Load the project's studio.config.json and the kit's kit.json. Standard library only.

The kit lives in a folder (normally studio/) at the project root; the project root is the folder holding
studio.config.json. Every path in the config is relative to the project root. Defaults below make a minimal config
work: a project can start from {"project": {"name": "..."}} and grow.
"""
import copy
import json
import os

KIT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # .../studio
CONFIG_NAME = 'studio.config.json'

DEFAULTS = {
    'project': {'name': 'Website', 'about': '', 'repo': '', 'url': '', 'agents': 'AGENTS.md'},
    'brand': {'book': '', 'plan': '', 'summary': '', 'voice': '', 'offer': '', 'never': []},
    'site': {
        'entry': 'index.html',
        'pages': {'adapter': 'html', 'glob': ['*.html', '**/*.html']},
        'current': {'match': 'path'},
        'root': '',
        'toggles': [],
        'notes_label': 'Open notes',
    },
    'theme': {'css': []},
    'data': {
        'dir': 'studio-data',
        'history': 'studio-data/history',
        'gallery': 'studio-data/gallery/gallery.json',
        'atlas': 'studio-data/atlas',
        'scans': 'studio-data/scans',
        'prompt_kit': 'studio-data/atlas/prompt-kit.json',
        'concepts': 'studio-data/concepts',
    },
    'history': {'branch': 'main', 'copy': [], 'skip': [], 'checkpoints': []},
    'gallery': {'sources': [
        {'dir': 'studio-data/concepts', 'cat': 'concept', 'status': 'reference'},
        {'dir': 'studio-data/references', 'cat': 'reference', 'status': 'reference'},
        {'dir': 'images', 'cat': 'site', 'status': 'live'},
        {'dir': 'img', 'cat': 'site', 'status': 'live'},
        {'dir': 'assets', 'cat': 'site', 'status': 'live'},
    ]},
    'atlas': {},
    'images': {'webp': []},
    'notes': {},
    'tools': [],
    'skills': [],
    'refresh': [],
    'checks': [],
    'build': [],
    'branches': {'work': 'dev', 'review': 'staging', 'production': 'main'},
    'copies': [
        {'id': 'production', 'path': '', 'branch': 'main', 'label': 'Production'},
        {'id': 'live', 'path': 'live/', 'branch': 'main', 'label': 'Live preview'},
    ],
    'release': {'production': True, 'heavy': []},
    'live': {'keep': ['index.html']},
    'external': [],
}


def merge(base, over):
    out = copy.deepcopy(base)
    for k, v in (over or {}).items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = merge(out[k], v)
        else:
            out[k] = v
    return out


def find_root(start=None):
    """The project root: the nearest folder upward holding studio.config.json, else the kit's parent."""
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.isfile(os.path.join(d, CONFIG_NAME)):
            return d
        up = os.path.dirname(d)
        if up == d:
            return os.path.dirname(KIT)
        d = up


class Project:
    def __init__(self, root=None):
        self.root = os.path.abspath(root) if root else find_root()
        self.kit = KIT
        self.kit_rel = os.path.relpath(KIT, self.root).replace(os.sep, '/')
        p = os.path.join(self.root, CONFIG_NAME)
        self.has_config = os.path.isfile(p)
        self.raw = json.load(open(p, encoding='utf8')) if self.has_config else {}
        self.cfg = merge(DEFAULTS, self.raw)
        self.kitinfo = json.load(open(os.path.join(KIT, 'kit.json'), encoding='utf8'))

    # paths ------------------------------------------------------------------------------------------------------
    def path(self, *rel):
        return os.path.join(self.root, *rel)

    def data(self, key):
        """Root-relative path of a data location (config data.<key>)."""
        return self.cfg['data'][key]

    def rel(self, p):
        return os.path.relpath(p, self.root).replace(os.sep, '/')

    def fmt(self, s):
        """Fill {data.<key>} in kit text with the project's paths."""
        for k, v in self.cfg['data'].items():
            s = s.replace('{data.%s}' % k, v)
        return s

    # tools ------------------------------------------------------------------------------------------------------
    def tools(self):
        """Project tools first (the site and its own tools), then the kit's, with pages made root-relative.
        A project tool with a kit tool's id replaces it; config "disable": [ids] drops kit tools."""
        own = [dict(t, origin='project') for t in self.cfg.get('tools', [])]
        ids = {t['id'] for t in own}
        off = set(self.cfg.get('disable', []))
        kit = []
        for t in self.kitinfo['tools']:
            if t['id'] in ids or t['id'] in off:
                continue
            t = dict(t, origin='kit', ships='studio')
            t['page'] = self.kit_rel + '/' + t['page']
            for k in ('sources', 'outputs', 'run'):
                t[k] = [self.fmt(x) for x in t.get(k, [])]
            if t.get('heavy'):
                t['production_only'] = True
            kit.append(t)
        return own + kit

    def skills(self):
        """Kit skills (installed into .claude/skills/<name>) and the project's own."""
        k = [dict(s, path='.claude/skills/%s/SKILL.md' % s['name'], origin='kit') for s in self.kitinfo['skills']]
        return k + [dict(s, origin='project') for s in self.cfg.get('skills', [])]


def load(root=None):
    return Project(root)
