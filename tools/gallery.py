"""Build the media gallery (inspiration.html) manifest: every image made or looked at for the site, used or not.

  python tools/gallery.py                     Rescan the repo, make missing thumbnails, write design-system/inspiration/gallery.json
  python tools/gallery.py --import <research> Also copy build records from a research folder (page snapshots per pass,
                                              concept-vs-build comparisons) into design-system/inspiration/record/ as JPEG

Needs Pillow (thumbnails). Sources it scans:
  design-system/inspiration/gemini/*.png        Gemini originals, oldest first
  design-system/inspiration/concept-*.*         captures each component was rebuilt from
  design-system/inspiration/art/*.png           black-on-white sources of the equipment drawings
  design-system/inspiration/archive/*           superseded versions (kept, never shown on the site)
  design-system/inspiration/record/<set>/*.jpg  build records: what the site looked like at each pass
  design-system/inspiration/chats/<source>/*.jpg images from other Claude chats, agents' scratchpads and earlier passes;
                                              chats/index.json gives each one's source chat, time taken and page URL
  assets/illustrations, assets/icons (SVG), brand/   what the site uses
Status of each item is worked out from the inspiration README tables and from whether the live pages use it.
"""
import glob, json, os, re, shutil, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INS = os.path.join(ROOT, 'design-system', 'inspiration')
THUMBS = os.path.join(INS, 'thumbs')
TW = 480  # thumbnail width

# Gemini originals that have no row of their own in the README: what each became
GEMINI_USE = {
    '01': 'WaterPath', '02': 'Hero', '03': 'ProcessDiagram', '04': 'OptionList', '05': 'DocList', '15': 'FAQ',
    '16': 'ProcessSteps', '17': 'RelatedLinks', '18': 'Closing', '19': 'CaseStudy', '21': 'EnquiryForm',
    '23': 'StandardsGrid', '26': 'Readout', '27': 'Prose', '32': 'Band', '33': 'LinkGrid', '34': 'CompareTable',
    '35': 'Hero', '36': 'Footer', '37': 'Hero', '38': 'NavBar', '39': 'KeyFacts', '40': 'Page', '41': 'Page',
    '42': 'Router', '43': 'FaultList', '44': 'Versus', '45': 'EvidenceMap', '46': 'GradeLanes', '47': 'PlanTiers',
    '48': 'RoleMatrix', '49': 'Closing', '50': 'LimitGauges', '51': 'DocList', '52': 'OptionModules',
    '53': 'ProcessSteps', '54': 'Explainer', '55': 'ParameterCallouts', '56': 'VisitRoute', '57': 'Icon',
    '59': 'StandardsMap', '60': 'CaseStudy', '61': 'VisitRoute', '62': 'ContactRoutes', '63': 'NotesRegister',
    '64': 'Spot',
    # pass 9 (2026-11-01): one concept per section, each became a section look
    '68': 'SystemRun', '70': 'IndustryFeed', '71': 'ProjectRun', '72': 'ExplodedService', '73': 'ManifoldRouter',
    '74': 'StrataRun', '75': 'BudgetBento', '76': 'BatteryLimit', '77': 'StandardWires', '78': 'LimitStack',
    '79': 'WindingRoute', '80': 'ParamTiles', '81': 'DocHotspots', '82': 'OptionTags', '83': 'StairRouter',
    '84': 'HoldTimeline', '85': 'PidRoutes', '87': 'MacroLeaders', '88': 'GradeEditorial', '89': 'MarketCallouts',
    '90': 'LimitBento', '91': 'StandardsOrbit', '93': 'ProofFolders', '94': 'CutawayRail',
    # pass 9b (2026-11-01): the remaining sections, same loop
    '95': 'RuleFigures', '96': 'LoopCircuit', '98': 'MethodBento', '99': 'TankTiles', '100': 'SheetStack', '101': 'LoopDock', '102': 'MembraneFace', '105': 'SectionTrain', '106': 'MembraneAtlas', '107': 'DecisionValve', '108': 'DocPipe', '109': 'OptionTaps', '111': 'LayerStack', '113': 'HmiTrend', '114': 'SignalDial', '115': 'ClauseCrosswalk', '116': 'OptionChecker', '117': 'RedlineSheet', '118': 'FidelityLadder', '119': 'IssuedSet', '120': 'TraceLines', '121': 'JointSpine', '122': 'JointMacro', '123': 'SpoolDossier', '124': 'JointSteps', '125': 'VersusSpread', '126': 'WetRunHmi', '127': 'TestSheet', '129': 'WitnessPlan', '131': 'StageTiles', '132': 'SignatureBlocks', '134': 'WalkdownPins', '135': 'PqCalendar', '136': 'CutBand', '137': 'PlanChecker', '138': 'CostSkid', '139': 'SignalDial', '140': 'VisitPlan', '141': 'SpareSheet', '142': 'FaultKnot', '143': 'ApprovalMerge', '144': 'RetrofitPlant', '145': 'StrikeGaps', '146': 'ReviewReticles', '148': 'GateLine', '149': 'CheckerRouter', '150': 'GradeLadder', '151': 'BinderSpines', '152': 'DecisionPlant', '153': 'GradeSwitch', '154': 'DerivationSheet', '156': 'WasherTrace', '157': 'StandardTiles', '158': 'AuditManifold', '159': 'SuiteLoop', '161': 'AuditSkid', '162': 'DuplexTrains', '163': 'TieInRun', '164': 'SkidTags', '165': 'IndexSheet', '166': 'StageStacks', '167': 'RevisionSheet', '168': 'PdfAnatomy', '170': 'RecordSheet', '172': 'NcrTiles', '173': 'MarkingMatch', '174': 'CertReadout', '175': 'TermsSheet', '176': 'CheckLedger', '177': 'RecordAnatomy', '178': 'Colophon', '179': 'SourceSkid', '180': 'SiteTiles', '181': 'RoleLoop', '182': 'TimeCard', '183': 'HirePath', '184': 'RevisionRegister', '185': 'RequestMenu', '186': 'RiserValves', '187': 'SitePlates', '189': 'CoverageMap',
    # pass 12 build A (2026-11-03): new industry pages and their sections
    '191': 'ApplicationWheel', '193': 'FitReadout', '194': 'UseMatrix', '195': 'LimitWriters', '196': 'MultiportRouter',
    '197': 'Hero', '200': 'CalcPad', '201': 'PlantStations', '202': 'SensorLoop', '203': 'ScopeSeam', '204': 'ModulePlinth',
    '205': 'SheetPreviews', '206': 'Hero', '208': 'GradeCrosswalk', '209': 'DrawingRegister', '210': 'BuildingLoop',
    '211': 'TrainStrip', '212': 'SpineShelf', '214': 'Hero', '216': 'LimitDrawer'}
GEMINI_REFERENCE = {'58'}
RETIRED = {'57': 'the cut icons were later replaced by the Lucide-style SVG set; see Archive', '64': 'the cut spots were retired when the site returned to the brand book; see Archive'}  # looked at as a target, not rebuilt as one thing
# Equipment drawings redrawn on 2026-10-31 to match the offer (polypropylene PW package: no stainless piping, no sterile
# products). page id -> (number of the old Gemini original, old source renamed in art/, what the old drawing showed).
# The old ones show as superseded, the new ones as the PP replacements.
ART_REPLACED = {
    'svc-fabrication': ('14', 'svc-fabrication-stainless', 'orbital weld head on a sanitary stainless tube with tri-clamps'),
    'sys-storage': ('08', 'sys-storage-stainless', 'stainless storage tank'),
    'ind-pharma': ('22', 'ind-pharma-sterile', 'sterile vial filling machine')}
ART_RETIRED_NOTE = 'Retired 2026-10-31: the %s, replaced by the polypropylene package drawing for the %s page'
ART_PP_NOTE = 'PP replacement (2026-10-31) for the %s. '

RECORD_SETS = [  # (folder in record/, label, order)
    ('pass7', 'Pass 7: the site today'),
    ('pass6-audit', 'Pass 6: after the audit'),
    ('pass6', 'Pass 6: mid-pass'),
    ('pass5', 'Before pass 6'),
    ('fidelity', 'Concept beside build (pass 6)'),
]


def rel(p):
    return os.path.relpath(p, ROOT).replace('\\', '/')


def title_of(name):
    s = re.sub(r'^\d+-', '', name)
    s = re.sub(r'^(concept|art)-', '', s)
    return s.replace('-', ' ').strip().capitalize()


def readme_rows():
    rows = {}
    t = open(os.path.join(INS, 'README.md'), encoding='utf8').read()
    for m in re.finditer(r'^\|\s*`([^`]+)`\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$', t, re.M):
        rows[os.path.basename(m.group(1))] = (m.group(2), re.sub(r'`', '', m.group(3)))
    return rows


def thumb(src, mask=False, ratio=3):
    """JPEG thumbnail; masks (transparent line art) are painted navy on limestone so they read.
    Taller images keep only their top, at most `ratio` times as high as wide."""
    from PIL import Image
    os.makedirs(THUMBS, exist_ok=True)
    out = os.path.join(THUMBS, rel(src).replace('/', '__').rsplit('.', 1)[0] + '.jpg')
    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
        return rel(out), None
    im = Image.open(src)
    size = im.size
    if mask or im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        ground = Image.new('RGB', im.size, (235, 223, 214) if mask else (250, 248, 246))
        if mask:
            ink = Image.new('RGB', im.size, (15, 42, 71))
            ground.paste(ink, (0, 0), im.split()[3])
        else:
            ground.paste(im, (0, 0), im.split()[3])
        im = ground
    im = im.convert('RGB')
    w = min(TW, im.width)
    h = max(1, round(im.height * w / im.width))
    if h > w * ratio:  # very tall page shots: keep the top
        im = im.crop((0, 0, im.width, round(im.width * ratio)))
        h = round(w * ratio)
    im.resize((w, h), Image.LANCZOS).save(out, 'JPEG', quality=78, optimize=True, progressive=True)
    return rel(out), size


def dims(src):
    from PIL import Image
    try:
        return list(Image.open(src).size)
    except Exception:
        return None


def import_records(research):
    """Copy page snapshots and concept-vs-build comparisons from research/ into record/ (JPEG, capped size)."""
    from PIL import Image
    rec = os.path.join(INS, 'record')

    def put(src, dest, maxw=1000, maxh=14000):
        if os.path.exists(dest):
            return
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        im = Image.open(src).convert('RGB')
        if im.width > maxw:
            im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
        if im.height > maxh:
            im = im.crop((0, 0, im.width, maxh))
        im.save(dest, 'JPEG', quality=74, optimize=True, progressive=True)

    def sheets(folder, setname):
        seen = set()
        for f in sorted(glob.glob(os.path.join(research, folder, '**', '*-sheet.png'), recursive=True)):
            if re.search(r'[\\/](before|_fold)', f) or 'before' in os.path.basename(f):
                continue
            m = re.match(r'(.+)-(1280|375)-sheet\.png$', os.path.basename(f))
            if not m or m.groups() in seen:
                continue
            seen.add(m.groups())
            put(f, os.path.join(rec, setname, '%s-%s.jpg' % m.groups()))

    sheets('shots', 'pass5')
    sheets('shots6', 'pass6')
    sheets('shots8', 'pass6-audit')
    for f in sorted(glob.glob(os.path.join(research, 'shots-pass7', '*.png'))):
        m = re.match(r'(.+)-(1280|375)\.png$', os.path.basename(f))
        if m:
            put(f, os.path.join(rec, 'pass7', os.path.basename(f)[:-4] + '.jpg'), maxw=1000 if m.group(2) == '1280' else 375)
    for f in sorted(glob.glob(os.path.join(research, 'fidelity', '*.png'))):
        if not re.search(r'-(1280|375)\.png$', f):
            put(f, os.path.join(rec, 'fidelity', os.path.basename(f)[:-4] + '.jpg'), maxw=1800)


PAGE_NAMES = {'index.html': 'site', '': 'site', 'design-system.html': 'design system guide', 'inspiration.html': 'media gallery',
              'versions.html': 'page history', 'versions': 'page history'}
TOOL_HOSTS = {'gemini.google.com': 'Gemini', 'notebook.google.com': 'Notebook', 'claude.ai': 'Claude artifact'}


def chat_title(url, when):
    """Short name for a chat screenshot from the page it shows: 'sys-pw', 'design system guide', 'Gemini'."""
    if not url:
        return 'Screenshot · ' + when
    m = re.match(r'https?://([^/:]+)(?::\d+)?/?([^?#]*)[^#]*#?(.*)$', url)
    host, path, frag = m.groups() if m else ('', '', '')
    if host in TOOL_HOSTS:
        name = TOOL_HOSTS[host] + (' library' if path.startswith('library') else '')
    else:
        name = PAGE_NAMES.get(path.rsplit('/', 1)[-1], path.rsplit('/', 1)[-1] or 'site')
        page = re.sub(r'^page=', '', frag.split('&')[0]) if frag else ''
        if page and not page.startswith(('v=', 'cat=')):
            name = page if name == 'site' else name + ' · ' + page
    return name + ' · ' + when


def chats(add):
    """Images from other Claude chats, agents' scratchpads and earlier passes, one group per source
    (design-system/inspiration/chats/<source>/; chats/index.json says where each came from)."""
    base = os.path.join(INS, 'chats')
    meta = {}
    if os.path.exists(os.path.join(base, 'index.json')):
        meta = {i['file']: i for i in json.load(open(os.path.join(base, 'index.json'), encoding='utf8'))['items']}
    found = []
    for f in glob.glob(os.path.join(base, '*', '*.*')):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        key = rel(f).split('/chats/', 1)[1]
        m = meta.get(key) or {'slug': key.split('/')[0], 'label': key.split('/')[0].replace('-', ' ').capitalize(),
                              'mtime': os.path.getmtime(f), 'from': '', 'url': None, 'sheet': False, 'kind': 'chat'}
        found.append((m['mtime'], f, m))
    first = {}
    for mt, f, m in sorted(found, key=lambda x: x[0]):
        first.setdefault(m['label'], mt)
    for mt, f, m in sorted(found, key=lambda x: (first[x[2]['label']], x[0])):
        when = time.strftime('%d %b %H:%M', time.localtime(mt)).lstrip('0')
        url = m.get('url') or ''
        host = re.sub(r'^https?://([^/:]+).*', r'\1', url) if url else ''
        third_party = bool(host) and host not in TOOL_HOSTS and not re.match(r'(localhost|127\.0\.0\.1|.*\.github\.io)$', host)
        if m.get('kind') == 'chat':
            title = chat_title(url, when)
        else:
            n = os.path.basename(f).rsplit('.', 1)[0].split('--')[-1]
            s = re.match(r'(.+)-(1280|375)(-sheet)?$', n)
            title = ('%s · %s' % (s.group(1), 'desktop' if s.group(2) == '1280' else 'phone')) if s else n.replace('-', ' ')
        note = ('Whole page, sections stacked. ' if m.get('sheet') else '') + 'From ' + (m.get('from') or 'another chat')
        add(f, 'chats', 'reference' if third_party else 'record', title, note, group=m['label'], order=first[m['label']], ratio=1,
            source=m['label'], date=time.strftime('%Y-%m-%d %H:%M', time.localtime(mt)), url=url or None, where=m.get('sub') or None)


def build():
    rows = readme_rows()
    pages = json.load(open(os.path.join(ROOT, 'content', 'pages.json'), encoding='utf8'))['pages']
    page_ids = {p['id'] for p in pages}
    used_text = open(os.path.join(ROOT, 'content', 'pages.json'), encoding='utf8').read() + \
        open(os.path.join(ROOT, 'assets', 'aquemi-site.js'), encoding='utf8').read()
    items = []

    def add(src, cat, status, title, note='', comp=None, mask=False, group=None, order=0, ratio=3, **extra):
        t, size = thumb(src, mask, ratio) if not src.endswith('.svg') else (rel(src), None)
        items.append(dict({'src': rel(src), 'thumb': t, 'cat': cat, 'status': status, 'title': title, 'note': note,
                           'component': comp, 'group': group, 'order': order, 'size': size or (None if src.endswith('.svg') else dims(src)),
                           'kb': round(os.path.getsize(src) / 1024)}, **extra))

    for f in sorted(glob.glob(os.path.join(INS, 'gemini', '*.png'))):
        name = os.path.basename(f)[:-4]
        num = name[:2]
        prompt, became = rows.get(name + '.png', ('', ''))
        if '-art-' in name:
            pid = name.split('-art-')[1]
            old = ART_REPLACED.get(pid)
            if old and old[0] == num:
                add(f, 'gemini', 'superseded', title_of(name), ART_RETIRED_NOTE % (old[2], pid), 'Illustration', order=int(num))
            else:
                note = 'Equipment drawing for the %s page; cleaned into assets/illustrations/%s.png' % (pid, pid)
                add(f, 'gemini', 'source', title_of(name), (ART_PP_NOTE % old[2] if old else '') + note, 'Illustration', order=int(num))
        elif num in GEMINI_REFERENCE:
            add(f, 'gemini', 'reference', title_of(name), prompt or 'Looked at as a target for the page rhythm', order=int(num))
        else:
            comp = GEMINI_USE.get(num)
            note = (prompt + (' → ' + became if became else '')).strip(' →')
            if num in RETIRED:
                note += ' (' + RETIRED[num] + ')'
            add(f, 'gemini', 'built', title_of(name), note, comp, order=int(num))

    for f in sorted(glob.glob(os.path.join(INS, 'concept-*.*'))):
        b = os.path.basename(f)
        prompt, became = rows.get(b, ('', ''))
        comp = re.match(r'(\w+)', became).group(1) if became else None
        add(f, 'capture', 'built' if became else 'reference', title_of(b.rsplit('.', 1)[0]), (prompt + ' → ' + became) if became else prompt, comp)

    retired_art = {v[1]: (pid, v[2]) for pid, v in ART_REPLACED.items()}
    for f in sorted(glob.glob(os.path.join(INS, 'art', '*.png'))):
        pid = os.path.basename(f)[:-4]
        if pid in retired_art:
            page, what = retired_art[pid]
            add(f, 'source', 'superseded', pid, ART_RETIRED_NOTE % (what, page), 'Illustration')
            continue
        old = ART_REPLACED.get(pid)
        add(f, 'source', 'source', pid, (ART_PP_NOTE % old[2] if old else '') + 'Source drawing for assets/illustrations/%s.png' % pid, 'Illustration')

    ARCHIVE = {'': ('Replaced concepts', 'Replaced by a later version; kept for the record', False),
               'retired-icons': ('Raster icons (retired)', 'Row icon cut from the Gemini icon sheet; replaced by the Lucide-style SVG set', True),
               'retired-spots': ('Spot drawings (retired)', 'Equipment vignette cut from the Gemini spots sheet; retired when the site returned to the brand book', True)}
    for i, (sub, (label, note, mask)) in enumerate(ARCHIVE.items()):
        for f in sorted(glob.glob(os.path.join(INS, 'archive', sub, '*.*'))):
            if os.path.isdir(f):
                continue
            add(f, 'archive', 'superseded', title_of(os.path.basename(f).rsplit('.', 1)[0]), note, mask=mask, group=label, order=i)

    for kind, folder, comp in (('drawing', 'illustrations', 'Illustration'), ('spot', 'spots', 'Spot'), ('icon', 'icons', 'Icon')):
        for f in sorted(glob.glob(os.path.join(ROOT, 'assets', folder, '*.png')) + glob.glob(os.path.join(ROOT, 'assets', folder, '*.svg'))):
            n, ext = os.path.basename(f).rsplit('.', 1)
            live = (n in page_ids and 'illustrations/' in used_text) if kind == 'drawing' else (('"%s"' % n) in used_text or ("'%s'" % n) in used_text)
            add(f, kind, 'live' if live else 'kit', n.replace('-', ' '), 'assets/%s/%s.%s' % (folder, n, ext), comp, mask=True)

    for f in sorted(glob.glob(os.path.join(ROOT, 'brand', '*.svg'))):
        n = os.path.basename(f)[:-4]
        add(f, 'brand', 'live', n.replace('-', ' '), 'brand/%s.svg' % n)

    for i, (setname, label) in enumerate(RECORD_SETS):
        for f in sorted(glob.glob(os.path.join(INS, 'record', setname, '*.jpg'))):
            n = os.path.basename(f)[:-4]
            m = re.match(r'(.+)-(1280|375)$', n)
            t = ('%s · %s' % (m.group(1), 'desktop' if m.group(2) == '1280' else 'phone')) if m else n.replace('-', ' ')
            add(f, 'fidelity' if setname == 'fidelity' else 'snapshot', 'record', t, label, group=label, order=i)

    chats(add)

    out = os.path.join(INS, 'gallery.json')
    json.dump({'generated_by': 'tools/gallery.py', 'items': items}, open(out, 'w', encoding='utf8', newline='\n'), ensure_ascii=False, indent=0)
    # Drop thumbnails whose source is gone
    keep = {i['thumb'] for i in items}
    for t in glob.glob(os.path.join(THUMBS, '*.jpg')):
        if rel(t) not in keep:
            os.remove(t)
    from collections import Counter
    print('wrote', rel(out), len(items), 'items', dict(Counter(i['cat'] for i in items)), dict(Counter(i['status'] for i in items)))


if __name__ == '__main__':
    if '--import' in sys.argv:
        import_records(sys.argv[sys.argv.index('--import') + 1])
    build()
