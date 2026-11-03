"""Aquemi design system helper. Standard library only.

  python tools/design_system.py build                  Regenerate every generated file (run after any change):
                                                       design-system/tokens.css, components/bundle.css, components.json,
                                                       assets/aquemi-site.js and content/pages.json
  python tools/design_system.py check                  Check tokens and components for the rules agents must follow
                                                       (content budget overruns and content warnings are counted, never
                                                       fail the check; an intent label that ticks no option on the
                                                       linked form, a docs item's link and an in-page button's jump
                                                       included, is a problem and fails it, DR-014)
  python tools/design_system.py check --budgets [id]   Also list every content budget overrun (or one page's, then that
                                                       page's visible-word count, overrun or not, and that page's
                                                       warning summary)
  python tools/design_system.py check --warnings [id]  Also list every content warning (or one page's, or one type's:
                                                       register, faq, fact, contact, link, look); with a page id the budget
                                                       line and the summary count that page's only
  python tools/design_system.py new <Name> "<Group>"   Scaffold design-system/components/<Name>/ (README.md, preview.html, style.css)
  python tools/design_system.py stage <dir>            Copy the system into <dir>/project/ for publishing to the Claude artifact

design-system/ is the source of truth. The Claude artifact (see design-system/artifact.json) is published from it.

Sources are split so several people or agents can work at once without touching the same file:
  design-system/components/base.css + components/<Name>/style.css  -> components/bundle.css
  assets/src/core.js + parts/*.js + blocks/<type>.js + page.js      -> assets/aquemi-site.js
  assets/src/motion/core.js, gl.js + components/<Name>/motion.js   -> assets/motion.js
  content/pages/NN-<id>.json                                        -> content/pages.json
Section library (tools/specimens.py, sections.html): looks are never deleted. A look no page uses (no block in
content/pages/*.json has "look": "<name>") is retired, decided at every build, and its component is too unless a live
look or renderer still uses it. Retired ones are built into library bundles that only sections.html (and, for the CSS,
the guide) loads, so the site's own bundles never grow:
  components/<retired>/style.css                                    -> components/bundle-library.css
  the site script plus blocks/look-<retired>.js                     -> assets/library.js (sections.html loads it
                                                                       instead of aquemi-site.js)
  components/<retired>/motion.js                                    -> assets/library-motion.js (after motion.js)
Reusing a retired look is setting "look" on a block and rebuilding: it moves back into the site's bundles.
Site copies, made by build for index.html only (the guide and the Claude artifact keep the readable files):
  components/bundle.css   -> components/bundle.min.css   (comments and spaces out, the Google Fonts @import dropped:
                                                          the site self-hosts Geist in assets/fonts/)
  content/pages.json      -> content/pages.min.json      (no indentation)
  index.html and sw.js    get every asset's content hash (?v=…) and the service worker's cache name, so each deploy
                          is fresh and every versioned file can be cached for good
"""
import json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DS = os.path.join(ROOT, 'design-system')
# Files the artifact generates itself or that only the repo needs
NOT_PUBLISHED = {'tokens.css', 'artifact.json', 'components.json'}
# Order of component groups in the guide and the artifact; a new group goes last until added here
GROUPS = ['Foundations', 'Actions', 'Navigation', 'Page sections', 'Data', 'Forms']
MARKER = re.compile(r'<!--\s*@dsCard(.*?)-->')
ATTR = re.compile(r'(\w+)=(?:"([^"]*)"|(\S+))')


def look_component(look):
    """The component a look draws (its header: Look "<name>" -> <Pascal>), '' if the header names none."""
    p = os.path.join(ROOT, 'assets', 'src', 'blocks', 'look-%s.js' % look)
    m = re.search(r'Look "%s"\s*->\s*([A-Z][A-Za-z0-9]*)' % re.escape(look), open(p, encoding='utf8').read(2000)) if os.path.exists(p) else None
    return m.group(1) if m else ''


def all_looks():
    d = os.path.join(ROOT, 'assets', 'src', 'blocks')
    return sorted(f[5:-3] for f in os.listdir(d) if f.startswith('look-') and f.endswith('.js'))


def looks_in_use():
    """Looks some page block names (content/pages/*.json)."""
    d, out = os.path.join(ROOT, 'content', 'pages'), set()
    for f in sorted(os.listdir(d)):
        if f.endswith('.json'):
            for b in json.load(open(os.path.join(d, f), encoding='utf8')).get('blocks') or []:
                if isinstance(b, dict) and b.get('look'):
                    out.add(b['look'])
    return out


def retired_looks():
    """Look renderers no page uses: kept, built into the library bundles only."""
    used = looks_in_use()
    return [l for l in all_looks() if l not in used]


def kebab(name):
    return re.sub(r'(?<!^)([A-Z])', r'-\1', name).lower()


def library_components():
    """Components drawn only by retired looks: no live look draws them and the site script (without the retired
    renderers) never writes their class."""
    retired = retired_looks()
    if not retired:
        return []
    live = {look_component(l) for l in all_looks() if l not in retired}
    js = site_js()
    out = []
    for c in sorted({look_component(l) for l in retired} - live - {''}):
        if os.path.isdir(os.path.join(DS, 'components', c)) and not re.search(r'\baq-%s\b' % re.escape(kebab(c)), js):
            out.append(c)
    return out


def components():
    """Every component folder, with its preview marker and the first sentence of its README (retired: true for a
    component only retired looks draw; it lives in the section library)."""
    out = []
    lib = {look_component(l): l for l in retired_looks()}
    lib = {c: lib[c] for c in library_components()}
    comps = os.path.join(DS, 'components')
    for name in sorted(os.listdir(comps)):
        d = os.path.join(comps, name)
        if not os.path.isdir(d) or name == 'Cover':
            continue
        c = {'name': name, 'readme': 'design-system/components/%s/README.md' % name,
             'preview': 'design-system/components/%s/preview.html' % name}
        prev = os.path.join(d, 'preview.html')
        if os.path.exists(prev):
            m = MARKER.match(open(prev, encoding='utf8').readline().strip())
            if m:
                for k, q, b in ATTR.findall(m.group(1)):
                    c[k] = q or b
        rd = os.path.join(d, 'README.md')
        if os.path.exists(rd):
            text = open(rd, encoding='utf8').read().strip()
            c['summary'] = re.split(r'(?<=\.)\s', text, 1)[0]
        if name in lib:
            c['retired'] = True
            c['look'] = lib[name]
        out.append(c)
    rank = lambda c: (GROUPS.index(c.get('group')) if c.get('group') in GROUPS else len(GROUPS), c['name'])
    return sorted(out, key=rank)


GENERATED_NOTE = '/* GENERATED by tools/design_system.py build from design-system/components/base.css and components/<Name>/style.css. Do not edit; edit those and rerun. */\n'


def bundle_css():
    comps = os.path.join(DS, 'components')
    parts = [GENERATED_NOTE, open(os.path.join(comps, 'base.css'), encoding='utf8').read()]
    for c in components():
        if c.get('retired'):
            continue
        p = os.path.join(comps, c['name'], 'style.css')
        if os.path.exists(p):
            parts.append(open(p, encoding='utf8').read())
    return '\n'.join(x.rstrip('\n') + '\n' for x in parts)


def site_js(library=False):
    """The site script: core, parts, block renderers (the retired looks' only with library=True), page."""
    src = os.path.join(ROOT, 'assets', 'src')
    skip = set() if library else {'look-%s.js' % l for l in retired_looks()}
    files = [os.path.join(src, 'core.js')]
    for sub in ('parts', 'blocks'):
        d = os.path.join(src, sub)
        files += [os.path.join(d, f) for f in sorted(os.listdir(d)) if f.endswith('.js') and f not in skip]
    files.append(os.path.join(src, 'page.js'))
    return ''.join(open(f, encoding='utf8').read().rstrip('\n') + '\n' for f in files)


LIBRARY_NOTE = ('/* Section library build (sections.html only): %s. Live or retired is decided at build time from\n'
                '   content/pages/*.json; a look no page uses is retired, never deleted. GENERATED by tools/design_system.py build. Do not edit. */\n')


def library_js():
    return LIBRARY_NOTE % 'the site script plus every retired look renderer, loaded instead of assets/aquemi-site.js' + site_js(True)


def bundle_library_css():
    comps = os.path.join(DS, 'components')
    parts = [LIBRARY_NOTE % 'the style.css of every component only retired looks draw, loaded after bundle.css']
    for c in library_components():
        p = os.path.join(comps, c, 'style.css')
        if os.path.exists(p):
            parts.append(open(p, encoding='utf8').read())
    return '\n'.join(x.rstrip('\n') + '\n' for x in parts)


def library_motion_js():
    comps = os.path.join(DS, 'components')
    files = [os.path.join(comps, n, 'motion.js') for n in library_components() if os.path.exists(os.path.join(comps, n, 'motion.js'))]
    return LIBRARY_NOTE % 'the motion.js of every component only retired looks draw, loaded after assets/motion.js' + ''.join(
        open(f, encoding='utf8').read().rstrip('\n') + '\n' for f in files)


def motion_js():
    # Motion core, then each component's own choreography (design-system/components/<Name>/motion.js)
    comps = os.path.join(DS, 'components')
    md = os.path.join(ROOT, 'assets', 'src', 'motion')
    files = [os.path.join(md, 'core.js')] + [os.path.join(md, n) for n in sorted(os.listdir(md)) if n.endswith('.js') and n != 'core.js']
    lib = set(library_components())
    files += [os.path.join(comps, n, 'motion.js') for n in sorted(os.listdir(comps)) if n not in lib and os.path.exists(os.path.join(comps, n, 'motion.js'))]
    return '/* GENERATED by tools/design_system.py build from assets/src/motion/*.js and components/<Name>/motion.js. Do not edit. */\n' + ''.join(open(f, encoding='utf8').read().rstrip('\n') + '\n' for f in files)


def pages_json():
    d = os.path.join(ROOT, 'content', 'pages')
    pages = [json.load(open(os.path.join(d, f), encoding='utf8')) for f in sorted(os.listdir(d)) if f.endswith('.json')]
    return json.dumps({'pages': pages}, ensure_ascii=False, indent=1) + '\n'


def minify_css(css):
    """Small, safe CSS minifier: drops comments and the Google Fonts @import, collapses whitespace outside quoted
    strings. It never removes a space before ':' (a descendant pseudo-class) or around + and - (calc), and leaves every
    string as written, so it cannot change what a rule means."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'@import url\([^)]*fonts\.googleapis[^)]*\);', '', css)
    keep = []

    def hold(m):
        keep.append(m.group(0))
        return '\u0001%d\u0001' % (len(keep) - 1)
    css = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', hold, css)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};,>])\s*', r'\1', css)
    css = re.sub(r':\s+', ':', css)
    css = css.replace(';}', '}')
    css = re.sub('\u0001(\\d+)\u0001', lambda m: keep[int(m.group(1))], css)
    return css.strip() + '\n'


def bundle_min_css():
    return minify_css(bundle_css())


def pages_min_json():
    return json.dumps(json.loads(pages_json()), ensure_ascii=False, separators=(',', ':')) + '\n'


GENERATED = [('design-system/components/bundle.css', bundle_css), ('assets/aquemi-site.js', site_js), ('assets/motion.js', motion_js), ('content/pages.json', pages_json),
             ('design-system/components/bundle.min.css', bundle_min_css), ('content/pages.min.json', pages_min_json),
             ('design-system/components/bundle-library.css', bundle_library_css), ('assets/library.js', library_js),
             ('assets/library-motion.js', library_motion_js)]


def build():
    tokens_css()
    for rel, fn in GENERATED:
        open(os.path.join(ROOT, rel), 'w', encoding='utf8', newline='\n').write(fn())
        print('wrote', rel)
    stamp()
    art = json.load(open(os.path.join(DS, 'artifact.json'), encoding='utf8'))
    # Previews point at the artifact's uploads (/_blob/<id>); the guide swaps in the repo's brand/ copies
    assets = {}
    for files in art['assets'].values():
        for name, blob in files.items():
            local = 'brand/' + name.replace('aquemi-', '')
            if os.path.exists(os.path.join(ROOT, local)):
                assets['/_blob/' + blob] = local
    manifest = {'about': 'Generated by tools/design_system.py build. Do not edit.',
                'artifact': art['artifact'], 'groups': GROUPS, 'assets': assets, 'components': components()}
    path = os.path.join(DS, 'components.json')
    open(path, 'w', encoding='utf8', newline='\n').write(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n')
    print('wrote', os.path.relpath(path, ROOT), '(%d components, %d retired: in the section library)' % (
        len(manifest['components']), sum(1 for c in manifest['components'] if c.get('retired'))))


# Files index.html loads with a ?v=<content hash> (and the service worker may keep for good, since a new version is a
# new URL). Fonts and illustrations change name when they change, so they need no hash.
VERSIONED = ['design-system/tokens.css', 'design-system/components/bundle.min.css', 'assets/site.css',
             'assets/vendor/gsap-3.13.0.min.js', 'assets/aquemi-site.js', 'assets/motion.js', 'content/pages.min.json']


def short_hash(rel):
    import hashlib
    return hashlib.sha1(open(os.path.join(ROOT, rel), 'rb').read()).hexdigest()[:10]


def stamp():
    """Write each versioned file's hash into index.html (every quoted "...?v=<hash>", the boot script's fetch included), the
    list of pages with an illustration into the boot script, and the cache name into sw.js."""
    hashes = {rel: short_hash(rel) for rel in VERSIONED}
    ip = os.path.join(ROOT, 'index.html')
    html = open(ip, encoding='utf8').read()
    for rel, h in hashes.items():
        html = re.sub(r'(["\'])' + re.escape(rel) + r'(\?v=[0-9a-f]*)?\1', lambda m: m.group(1) + rel + '?v=' + h + m.group(1), html)
    art = sorted(f[:-5] for f in os.listdir(os.path.join(ROOT, 'assets', 'illustrations')) if f.endswith('.webp'))
    html = re.sub(r"ART=\[[^\]]*\]", 'ART=' + json.dumps(art, separators=(',', ':')).replace('"', "'"), html)
    open(ip, 'w', encoding='utf8', newline='\n').write(html)
    sp = os.path.join(ROOT, 'sw.js')
    if os.path.exists(sp):
        import hashlib
        # the cache name covers the versioned files and every file in the static folders the worker keeps
        h = hashlib.sha1(''.join(sorted(hashes.values())).encode())
        for d in ('assets/fonts', 'assets/icons', 'assets/illustrations', 'assets/vendor', 'brand'):
            for f in sorted(os.listdir(os.path.join(ROOT, d))):
                h.update(f.encode() + open(os.path.join(ROOT, d, f), 'rb').read())
        cache = h.hexdigest()[:10]
        sw = re.sub(r"CACHE = 'aquemi-[0-9a-f]*'", "CACHE = 'aquemi-" + cache + "'", open(sp, encoding='utf8').read())
        open(sp, 'w', encoding='utf8', newline='\n').write(sw)
    print('stamped index.html and sw.js (%d versioned files)' % len(hashes))


def new(name, group):
    if not re.fullmatch(r'[A-Z][A-Za-z0-9]*', name):
        sys.exit('Name the component in PascalCase, e.g. PullQuote')
    d = os.path.join(DS, 'components', name)
    if os.path.exists(d):
        sys.exit('design-system/components/%s already exists' % name)
    os.makedirs(d)
    cls = 'aq-' + re.sub(r'(?<!^)([A-Z])', r'-\1', name).lower()
    open(os.path.join(d, 'README.md'), 'w', encoding='utf8', newline='\n').write(
        '%s [one sentence: what it is and when to use it].\n\n'
        '- Markup: `<div class="%s">` [structure, child classes, what the consumer provides].\n'
        '- [Rules that name tokens: which colours, spacing and type styles it uses.]\n'
        '- [When not to use it, and which component to use instead.]\n' % (name, cls))
    open(os.path.join(d, 'preview.html'), 'w', encoding='utf8', newline='\n').write(
        '<!-- @dsCard group="%s" height=240 width=1000 subtitle="[what this preview shows]" -->\n'
        '<div class="aq-page"><section class="aq-section"><div class="aq-in aq-stack-l">\n'
        '  <div class="%s">[Real Aquemi copy, never lorem ipsum]</div>\n'
        '</div></section></div>\n' % (group, cls))
    open(os.path.join(d, 'style.css'), 'w', encoding='utf8', newline='\n').write(
        '/* ---------- %s ---------- */\n.%s { }\n\n@container (max-width: 860px) {\n  .%s { }\n}\n' % (name, cls, cls))
    print('created design-system/components/%s/README.md, preview.html and style.css (.%s)' % (name, cls))
    print('next: write the README and preview, style .%s in style.css with tokens only, then run: python tools/design_system.py build && python tools/design_system.py check' % cls)


def load_tokens():
    return json.load(open(os.path.join(DS, 'tokens.json'), encoding='utf8'))


def theme_value(tok, theme, first):
    v = tok['value']
    return v if isinstance(v, str) else v.get(theme, v.get(first))


def tokens_css():
    t = load_tokens()
    themes = [th['id'] for th in t['color']['themes']]
    first = themes[0]
    themed = t['color']['tokens'] + t.get('shadow', {}).get('tokens', [])

    def block(theme):
        return ''.join('  --%s: %s;\n' % (k['name'], theme_value(k, theme, first)) for k in themed)

    out = ['/* %s — generated from tokens.json by tools/design_system.py. Do not edit; edit tokens.json and rerun. */\n' % t['name']]
    out.append(':root, [data-theme="%s"] {\n%s}\n' % (first, block(first)))
    for th in themes[1:]:
        dark = '  color-scheme: dark;\n' if th == 'dark' else ''
        if th == 'dark':
            out.append('@media (prefers-color-scheme: dark) {\n:root:not([data-theme="%s"]) {\n%s%s}\n}\n' % (first, block(th), dark))
        out.append('[data-theme="%s"] {\n%s%s}\n' % (th, block(th), dark))
    flat = []
    for fam, v in t.items():
        if fam in ('color', 'type', 'shadow') or not isinstance(v, dict) or 'tokens' not in v:
            continue
        flat += ['  --%s: %s;\n' % (k['name'], k['value']) for k in v['tokens']]
    flat += ['  --font-%s: %s;\n' % (k, s) for k, s in t['type']['families'].items()]
    out.append(':root {\n%s}\n' % ''.join(flat))
    path = os.path.join(DS, 'tokens.css')
    open(path, 'w', encoding='utf8', newline='\n').write(''.join(out))
    print('wrote', os.path.relpath(path, ROOT))


# Content budgets (design-system/website.md, "Content budgets"). Reported by check, never failing it (yet).
BUDGET = {
    'headline': 14, 'lead': 35, 'h': 9, 'intro': 35, 'item': 25, 'prose': 120,
    'faq_count': 8, 'faq_answer': 60, 'spec_rows': 10, 'table_rows': 8, 'blocks': 9,
    'page_words': 1300, 'placeholder': 8, 'tinted_bands': 1,
}
WORD = re.compile(r'\S*[A-Za-z0-9µ°]\S*')
# Keys that are not visible copy: settings, link targets, and names the renderer turns into a drawing or an attribute
# (spot and icon vignettes, intents on links, a file field's accept list, a gauge row's level, which the renderer words;
# a row's look-only part, the drawing key a look lights for it, and the look name itself)
NOT_COPY = {'type', 'nav', 'anchor', 'link', 'kind', 'tone', 'id', 'hl', 'required', 'unit', 'name', 'section', 'show_if', 'when', 'mark', 'as', 'ground', 'fold', 'fold_noun', 'lean', 'to', 'at', 'icon', 'icons', 'end', 'art', 'key',
            'spot', 'intent', 'accept', 'caption_noun', 'level', 'note_link', 'part', 'look',
            'band', 'macro', 'panel'}  # pass 12 C: look-only variant keys (seam is not here: scope-seam and battery-limit use it as copy)


def words(s):
    return len(WORD.findall(str(s or '')))


def strings(x, skip=(), shown=False):
    """Every visible string in a block, page fragment or list (keys in NOT_COPY and skip are left out).
    shown=True also leaves out conditional form fields (with `when` or `show_if`), hidden until triggered."""
    if shown and isinstance(x, dict) and ('when' in x or 'show_if' in x):
        return
    if isinstance(x, str):
        yield x
    elif isinstance(x, list):
        for v in x:
            yield from strings(v, skip, shown)
    elif isinstance(x, dict):
        for k, v in x.items():
            if k not in NOT_COPY and k not in skip:
                yield from strings(v, skip, shown)


def placeholders(s):
    out, d, st = [], 0, 0
    for i, c in enumerate(s):
        if c == '[':
            if not d:
                st = i
            d += 1
        elif c == ']' and d:
            d -= 1
            if not d:
                out.append(s[st + 1:i])
    return out


# Block types whose renderer folds (fold: N, a "Show all" button) in every shape; grid, steps and table fold in most
# (folds). DocList folds on phones only and is counted folded: pages are read on a phone first.
FOLDS = {'docs', 'options', 'spec', 'tags', 'register'}


def folds(b):
    """Whether the renderer folds this block: the shapes with a "Show all" button, not those that draw every item (steps
    with a hold point, the hold-point flow, or as a row; a grid as a route; the router)."""
    n, t, a = b.get('fold'), b.get('type'), b.get('as')
    if not (isinstance(n, int) and n > 0):
        return False
    if t == 'steps':
        return a != 'row' and not any(isinstance(it, dict) and it.get('hold') for it in b.get('items') or [])
    return t in FOLDS or (t == 'grid' and a != 'route') or (t == 'table' and a != 'router')


def first_at(rows, rx):
    """Index of the first row whose label (its first cell, or that cell's t) matches rx, as versus and plans find their
    verdict and "Suits" rows; None without one."""
    for i, r in enumerate(rows):
        c = r[0] if isinstance(r, list) and r else ''
        if rx.match(str((c.get('t') if isinstance(c, dict) else c) or '')):
            return i
    return None


_ART = None


def art_pages():
    """Page ids with an equipment drawing (ART in assets/src/parts/Hero.js), the pages where a callouts spec draws its
    callouts (blocks/spec.js); on any other page it renders as the plain sheet."""
    global _ART
    if _ART is None:
        m = re.search(r'var ART=\{(.*?)\};', open(os.path.join(ROOT, 'assets', 'src', 'parts', 'Hero.js'), encoding='utf8').read(), re.S)
        _ART = set(re.findall(r"'([a-z0-9-]+)'\s*:", m.group(1))) if m else set()
    return _ART


def callouts(rows, n):
    """(callout rows, [(index, row)] for the sheet under them) as wCallouts in assets/src/blocks/spec.js picks them: a row
    with at: [x, y] inside the fold (the first n rows; every row without fold) becomes a callout, at most three a side
    (x under 50 is the left), every other row lists in the sheet."""
    lim = n if isinstance(n, int) and n > 0 else len(rows)
    side, pick, rest = {'l': 0, 'r': 0}, [], []
    for i, r in enumerate(rows):
        at = r.get('at') if isinstance(r, dict) else None
        s = ('l' if at[0] < 50 else 'r') if isinstance(at, list) and at and isinstance(at[0], (int, float)) else None
        if s and i < lim and side[s] < 3:
            side[s] += 1
            pick.append(r)
        else:
            rest.append((i, r))
    return pick, rest


def drawn(b, page=None):
    """A block as its renderer draws it, for the visible-word count: the rows and items behind "Show all" left out where
    the shape folds (folds; a versus verdict and a plans "Suits" row always show), and strings the renderer never prints:
    related-page ids (each card shows its page's own name), the column heads a shape leaves out (the router's,
    failures', roles', versus' and plans' first column; grades' all but the step column; an evidence table's link
    column; dials' and rule bars' heads; a callouts spec's heads while its sheet holds no row in the default view, every
    row not drawn as a callout sitting behind "Show N more") and register lines outside the featured panel. A callout
    prints its parameter, value and basis only. Spot, icon and intent names and a file field's accept list are never copy
    (NOT_COPY); FAQ answers and conditional form fields are left to the caller. page: the page id, which decides whether
    a callouts spec draws its callouts (a page with an equipment drawing, art_pages) or the plain sheet."""
    t, a, n, fold = b.get('type'), b.get('as'), b.get('fold'), folds(b)
    b = dict(b)
    items, rows, cols = list(b.get('items') or []), list(b.get('rows') or []), list(b.get('cols') or [])
    if t == 'related':
        b['items'] = []
        return b
    if t == 'spec' and a == 'callouts' and page in art_pages():
        pick, rest = callouts(rows, n)
        if pick:
            # the sheet under the callouts shows the rest rows inside the fold (all of them without fold); with none,
            # the whole sheet, its column heads with it, sits behind "Show N more" (aq-fold-x, wSpecTable foldAt 0)
            shown = [r for i, r in rest if not fold or i < n]
            b['rows'] = [{k: r.get(k) for k in ('p', 'v', 'm')} for r in pick] + shown
            if not shown:
                b['cols'] = []
            return b
    if t == 'register' and items:
        topics = b.get('topics') or []
        fi = next((i for i, it in enumerate(items) if isinstance(it, dict) and it.get('featured')), None)
        if fi is None:
            fi = next((i for i, it in enumerate(items) if topics and isinstance(it, dict) and it.get('topic') == topics[0]), 0)
        shown, f = items[:n] if fold else items, items[fi] if isinstance(items[fi], dict) else {}
        # rows show date, topic, title and standard; the panel adds the featured note's line, or all of it when its row is folded
        b['items'] = [{k: v for k, v in it.items() if k != 'd'} if isinstance(it, dict) else it for it in shown] + [
            {k: f.get(k) for k in (('d',) if fi < len(shown) else ('t', 'd', 'std'))}]
        return b
    if t == 'table':
        hide = set()
        if a in ('router', 'failures', 'roles', 'versus', 'plans'):
            hide = {0}
        elif a == 'grades':
            g = b.get('grade')
            if g is None:
                g = next((i for i, c in enumerate(cols) if re.search('grade|water', str(c), re.I)), len(cols) - 1)
            hide = set(range(len(cols))) - set([i for i in range(len(cols)) if i != g][:1])
        elif a == 'evidence':
            go = {i for i in range(2, len(cols)) if rows and all(isinstance(r, list) and i < len(r) and isinstance(r[i], dict) and r[i].get('link') for r in rows)}
            hide = go - (set() if set(range(2, len(cols))) - go else {2})  # with no file column the third head is printed
        b['cols'] = [c for i, c in enumerate(cols) if i not in hide]
        k = first_at(rows, re.compile(r'(fits when|choose)' if a == 'versus' else r'suits', re.I)) if fold and a in ('versus', 'plans') else None
        if k is not None:
            b['rows'] = [r for i, r in enumerate(rows) if i != k][:n] + [rows[k]]
            return b
    if t == 'spec' and a in ('gauges', 'rules'):
        b['cols'] = []
    if fold:
        for key in ('items', 'rows'):
            if isinstance(b.get(key), list):
                b[key] = b[key][:n]
    return b


def visible_words(pg):
    """((hero, blocks, closing) word counts, (hero, blocks, closing) strings): what a reader sees on the page. The hero's
    text stack as Hero.js draws it (eyebrow, headline, lead, button, secondary link, tags) and its facts (the KeyFacts
    strip or the drawing's callouts); the drawn figure (aria-hidden line art and its labels, like spot names) and a hub's
    index of other pages' names are left out. Every block as drawn (drawn), FAQ answers (and their link) and
    conditional form fields left out; the closing."""
    hero = [pg.get(k) for k in ('eyebrow', 'headline', 'lead', 'primary_cta')] + [(pg.get('secondary_cta') or {}).get('label')] + list(pg.get('tags') or []) + list(strings(pg.get('facts', [])))
    body = [s for b in pg.get('blocks', []) for s in strings(drawn(b, pg.get('id')), ('a', 'link_label') if b.get('type') == 'faq' else (), shown=True)]
    cta = list(strings(pg.get('cta') or {}))
    src = (hero, body, cta)
    return tuple(sum(words(x) for x in s) for s in src), src


def budgets(pages):
    """[(page id, where, field, count, limit)] for every overrun of the content budgets."""
    out = []
    for pid, pg in pages.items():
        def over(where, field, n, key):
            if n > BUDGET[key]:
                out.append((pid, where, field, n, BUDGET[key]))
        over('hero', 'headline', words(pg.get('headline')), 'headline')
        over('hero', 'lead', words(pg.get('lead')), 'lead')
        blocks = pg.get('blocks', [])
        over('page', 'blocks', len(blocks), 'blocks')
        faqs, tinted = 0, 0
        for i, b in enumerate(blocks):
            t = b.get('type')
            w = 'block %d (%s)' % (i, t)
            over(w, 'h', words(b.get('h')), 'h')
            for f in ('intro',):
                over(w, f, words(b.get(f)), 'intro')
            if t in ('band', 'tags', 'readout', 'diagram'):
                over(w, 'body' if t != 'diagram' else 'caption', words(b.get('body') or b.get('caption')), 'intro')
            if t == 'band' or t == 'tags':
                tinted += 1
            items = b.get('items', [])
            if t in ('grid', 'options', 'steps', 'docs'):
                for j, it in enumerate(items):
                    if isinstance(it, dict):
                        over(w, 'items[%d].d' % j, words(it.get('d')), 'item')
            if t == 'table':
                over(w, 'rows', len(b.get('rows', [])), 'table_rows')
                for j, r in enumerate(b.get('rows', [])):
                    for k, c in enumerate(r):
                        over(w, 'rows[%d][%d]' % (j, k), words(c.get('t') if isinstance(c, dict) else c), 'item')
            if t == 'spec':
                over(w, 'rows', len(b.get('rows', [])), 'spec_rows')
            if t == 'prose':
                over(w, 'body', sum(words(x) for x in b.get('body', [])), 'prose')
            if t == 'faq':
                faqs += len(items)
                for j, it in enumerate(items):
                    over(w, 'items[%d].a' % j, words(it.get('a')), 'faq_answer')
        over('page', 'faq questions', faqs, 'faq_count')
        over('page', 'tinted bands (band, tags)', tinted, 'tinted_bands')
        counts, (hero, body, cta) = visible_words(pg)
        over('page', 'visible words (FAQ answers excluded)', sum(counts), 'page_words')
        for where, src in (('hero', hero), ('blocks', body), ('cta', cta)):
            for s in src:
                for ph in placeholders(str(s or '')):
                    n = words(ph)
                    if n > BUDGET['placeholder']:
                        out.append((pid, where, 'placeholder "[%s]"' % (ph[:60] + ('...' if len(ph) > 60 else '')), n, BUDGET['placeholder']))
    return out


# Content warnings (design-system/website.md, "Content warnings"): the site-wide decision records' rules, checked on the
# page files. Like the budgets they never fail the check: pages are rewritten to the records pass by pass, and CI runs
# check on every push. Each warning is (type, sub-check, page ids, where, message).
WARN_TYPES = [  # type, record, what the summary line counts, sub-checks with their summary words
    ('register', 'DR-003', 'register warnings', [('lead', 'leads over 2 codes'), ('spell', 'codes never spelled out'),
        ('twice', 'two-meaning codes'), ('sentence', 'sentences over 20 words'), ('button', 'buttons over 5 words'),
        ('question', 'FAQ questions over 12 words')]),
    ('faq', 'DR-009', 'FAQ questions asked on two or more pages', []),
    ('fact', 'DR-010', 'hero fact warnings', [('limit', 'equal a public limit'), ('code', 'have a code as the value'),
        ('basis', 'have no basis in the label')]),
    # DR-014 intents are not here: an intent label that ticks nothing fails the check (intent_problems)
    ('contact', 'DR-008', 'CONTACT values no page file carries', []),
    ('link', 'DR-008', 'links to a missing page or anchor', []),
    ('look', 'DR-018', 'look fields that state what the copy does not', [('placeholder', 'hold a placeholder'),
        ('figure', 'hold a figure no reading field states')]),
]
REGISTER = {'lead_codes': 2, 'sentence': 20, 'button': 5, 'question': 12}  # DR-003 rule 3 (language/register-rules.md in the library; an FAQ question is 12 words or fewer on its register card)
# Page fields a reader never sees as copy (beyond NOT_COPY). LABELS are seen, but as labels: a code there needs spelling
# out in the page's reading text, and is never spelled out there.
NOT_SHOWN = {'title', 'meta', 'nav_label', 'path', 'todo', 'intent', 'primary_cta_intent', 'primary_cta_link', 'index', 'hero_index', 'spot'}
LABELS = {'eyebrow', 'caption'}
# A code: two or more capitals, "&" allowed (PW, URS, P&ID); a plural s is dropped. Not glued to digits (SDR11, B51).
CODE = re.compile(r'(?<![A-Za-z0-9_&])([A-Z][A-Z&]*[A-Z])s?(?![A-Za-z0-9_&])')
ROMAN = {'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'XI', 'XII'}
# Cited as they are, never spelled out: standards and their bodies, regulators and laws, places, currency, file types,
# industrial protocols, and CO (CO₂). EU and CSA as names only; their second meanings are the two-meaning check.
CODE_NAMES = set('USP NF ISO ASTM ASME BPE FDA ICH WHO TRS CSA EN IEC UL CLSI GAMP ISPE CFR PIC MDSAP QMSR MDR EMA EPA '
                 'AAMI ANSI NSF JP GUI GHTF TSSA PEO RBQ OIQ EGBC ABSA APEGA CASL PIPEDA EU US USA UK BC CAD PDF CSV IT ID '
                 'CV OPC UA TCP IP PROFINET SLC CO'.split())
# Full forms that spell a code out anywhere on the page, besides "words (CODE)" and "CODE (words)"
CODE_FULL = {
    'FAT': r'factory acceptance test', 'SAT': r'site acceptance test', 'IQ': r'installation qualification',
    'OQ': r'operational qualification', 'PQ': r'performance qualification', 'DQ': r'design qualification',
    'URS': r'user requirements? specification', 'EDI': r'electro-?deioni[sz]ation', 'DI': r'(?<!electro)(?<!-)deioni[sz]ation',
    'RO': r'reverse osmosis', 'TOC': r'total organic carbon', 'GMP': r'good manufacturing practice', 'PW': r'purified water',
    'WFI': r'water for injection', 'PP': r'polypropylene', 'PVC': r'polyvinyl chloride', 'PVDF': r'polyvinylidene (?:di)?fluoride',
    'CFU': r'colony[- ]forming unit', 'CRN': r'canadian registration number', 'P&ID': r'piping and instrumentation diagram',
    'PLC': r'programmable logic controller', 'HMI': r'human[- ]machine interface', 'SCADA': r'supervisory control and data acquisition',
    'UV': r'ultraviolet', 'C&Q': r'commissioning and qualification', 'CAPA': r'corrective and preventive action',
    'QMS': r'quality management system', 'SDI': r'silt density index', 'ORP': r'oxidation[- ]reduction potential',
    'DMZ': r'demilitari[sz]ed zone', 'FMEA': r'failure modes? and effects analysis', 'NHP': r'natural health product',
    'CDMO': r'contract development and manufacturing', 'VMP': r'validation master plan', 'NCR': r'non-?conformance report',
    'PPQ': r'process performance qualification', 'GA': r'general arrangement', 'PFD': r'process flow diagram',
}
# A public limit's source: a spec row or table cell citing a pharmacopoeia or regulator (DR-010)
REGULATOR = re.compile(r'\bUSP\b|Ph\. ?Eur\b|\bJP\b|\bWHO\b|\bEU GMP\b|\bAnnex \d|\bEMA\b|\bFDA\b|\bCFR\b|Health Canada|\bICH\b')
FIGURE = re.compile(r'(?<![\w.])(\d+(?:[.,]\d+)?)\s*(%|°C|[µm]S/cm|[mµn]g/L|ppb|ppm|CFU/\d* ?mL|EU/mL|EU|[µn]m|mm|m/s|m³/h|'
                    r'L/h|L/min|bar|kPa|MPa|psi|L/D|working days|days?|weeks?|months?|hours?|minutes?|years?)(?![\w/])')
# A hero fact whose value is a code, clause, standard or bare material (DR-010 rule 2), not a figure
CODE_VALUE = re.compile(r'^\s*[<>≤≥]?\s*(?:[A-Z][A-Z&]*[A-Z](?![A-Za-z])|Part \d|Annex \d|Class [IVX]|Ph\. ?Eur)|<\d+>')


def copy_items(x, path='', skip=NOT_SHOWN):
    """(JSON path, string) for each string a reader sees: "blocks[2].items[0].d"."""
    if isinstance(x, str):
        yield path, x
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from copy_items(v, '%s[%d]' % (path, i), skip)
    elif isinstance(x, dict):
        for k, v in x.items():
            if k not in NOT_COPY and k not in skip:
                yield from copy_items(v, path + '.' + k if path else k, skip)


def leaf(path):
    return re.sub(r'\[\d+\]', '', path).split('.')[-1]


def bare(s, by=' '):
    """s with every [placeholder] replaced (they are filled before launch, so their words never count)."""
    s, prev = str(s or ''), None
    while s != prev:
        prev, s = s, re.sub(r'\[[^\[\]]*\]', by, s)
    return s


def clip(s, n=70):
    s = re.sub(r'\s+', ' ', str(s)).strip()
    return s if len(s) <= n else s[:n].rstrip() + '...'


# A standard's name that holds codes: "EU GMP Annex 15", "EU GMP Annex 1", "EU GMP Chapter 3" or "EU GMP ANNEX 15" in an
# eyebrow cite the EU GMP Guide by its name, so their EU and GMP are a name, never a code to spell out (a bare "GMP"
# elsewhere still counts)
STD_NAME = re.compile(r'\bEU GMP(?=\s+(?:Annex|Chapter|Part)\b)', re.I)


def codes(s, known=None):
    """The codes in s, in order, standards' names (STD_NAME) left out. A string with no lower-case letter (an eyebrow, a
    caption) is all capitals, so there only codes known from sentence-case copy count."""
    s = STD_NAME.sub(' ', bare(s))
    out = [c for c in CODE.findall(s) if c not in ROMAN]
    return [c for c in out if c in known] if known is not None and not re.search('[a-z]', s) else out


def sentences(s):
    """Sentences as the register counts them: split after . ; : ? ! before a capital, digit or [."""
    return [x for x in re.split(r'(?<=[.;:?!])\s+(?=[A-Z0-9\[])', str(s or '').strip()) if words(x)]


def swords(s):
    """Words in a sentence or label, a [placeholder] counting as one (language/register-rules.md, rule 2)."""
    return words(bare(s, 'X'))


def spelled_out(text):
    """Codes the text pairs with their words: "Purified Water (PW)", "(IQ, OQ and PQ)", "URS (user requirement
    specification)", or a full form from CODE_FULL anywhere."""
    out = set()
    for m in re.finditer(r'\(([^()]*)\)', text):
        parts = [p for p in re.split(r',\s*|\s+and\s+|\s+or\s+|/', m.group(1).strip()) if p]
        if parts and all(re.fullmatch(r'[A-Z][A-Z&]*[A-Z]s?', p) for p in parts) and re.search('[a-z]', text[max(0, m.start() - 40):m.start()]):
            out |= {p[:-1] if p.endswith('s') else p for p in parts}
    out |= set(re.findall(r'(?<![A-Za-z0-9_&])([A-Z][A-Z&]*[A-Z])s?\s+\([^()]*[a-z][^()]*\)', text))
    return out | {c for c, rx in CODE_FULL.items() if re.search(rx, text, re.I)}


def two_meanings(s):
    """EU, CSA and DI used in the meaning DR-003 rule 4 bans: EU after a figure (endotoxin units), a CSA that is not a CSA
    Group standard (software assurance), DI in a sentence on data integrity."""
    out = []
    if re.search(r'(?:\d|\])\s*EU\b|\bEU\s*/\s*mL\b', s):
        out.append('EU for endotoxin units')
    if re.search(r'\bCSA\b(?!\s+(?:[A-Z]\d|Group\b))', s):
        out.append('CSA for computer software assurance')
    if any(re.search(r'\bDI\b', x) and re.search(r'integrity|ALCOA', x, re.I) for x in sentences(s)):
        out.append('DI for data integrity')
    return out


def register_warnings(pages):
    """DR-003: leads with more than 2 codes, codes never spelled out on a page (a standard's name such as "EU GMP Annex
    15" is not one), two-meaning codes, sentences over 20 words, buttons and link labels over 5 words, FAQ questions over
    12 words. Pattern-based, so it over-flags (P&ID, NTU); placeholders never count, and count as one word."""
    out = []
    known = {c for pg in pages.values() for path, s in copy_items(pg) if leaf(path) not in LABELS and re.search('[a-z]', bare(s)) for c in codes(s)}
    for pid, pg in pages.items():
        lead = list(dict.fromkeys(codes(pg.get('lead'))))
        if len(lead) > REGISTER['lead_codes']:
            out.append(('register', 'lead', (pid,), 'lead', '%d codes (%s), at most %d' % (len(lead), ', '.join(lead), REGISTER['lead_codes'])))
        used, reading = [], []
        for path, s in copy_items(pg):
            used += codes(s, known)
            if leaf(path) in LABELS or not re.search('[a-z]', bare(s)):
                continue
            reading.append(s)
            for x in sentences(s):
                if swords(x) > REGISTER['sentence']:
                    out.append(('register', 'sentence', (pid,), path, '%d words, at most %d: "%s"' % (swords(x), REGISTER['sentence'], clip(x))))
        full = spelled_out('\n'.join(reading))
        for c in sorted(set(used) - full - CODE_NAMES, key=used.index):
            out.append(('register', 'spell', (pid,), 'page', '%s never spelled out' % c))
        for path, s in copy_items(pg, skip=NOT_SHOWN - {'title', 'meta'}):
            for m in two_meanings(s):
                out.append(('register', 'twice', (pid,), path, '%s: "%s"' % (m, clip(s))))
        btn = [('primary_cta', pg.get('primary_cta')), ('secondary_cta.label', (pg.get('secondary_cta') or {}).get('label')), ('cta.button', (pg.get('cta') or {}).get('button'))]
        for i, b in enumerate(pg.get('blocks', [])):
            btn += [('blocks[%d].routes[%d].action' % (i, j), r.get('action')) for j, r in enumerate(b.get('routes') or []) if isinstance(r, dict)]
            btn += [('blocks[%d].steps[%d].next' % (i, j), s.get('next')) for j, s in enumerate(b.get('steps') or []) if isinstance(s, dict)]
            btn.append(('blocks[%d].submit' % i, b.get('submit')))
            # links drawn as the Button link variant or a row link: an FAQ answer's link, a form note's action, a docs
            # block's link, a spec row's link (SpecTable, gauges and rules) and a spec note's link
            btn += [('blocks[%d].items[%d].link_label' % (i, j), it.get('link_label')) for j, it in enumerate(b.get('items') or []) if b.get('type') == 'faq' and isinstance(it, dict)]
            btn += [(p + '.action', f.get('action')) for p, f in (form_notes(b, 'blocks[%d]' % i) if b.get('type') == 'form' else [])]
            if b.get('type') == 'docs':
                btn.append(('blocks[%d].link_label' % i, b.get('link_label')))
            if b.get('type') == 'spec':
                btn += [('blocks[%d].rows[%d].link_label' % (i, j), r.get('link_label')) for j, r in enumerate(b.get('rows') or []) if isinstance(r, dict)]
                btn.append(('blocks[%d].note_link_label' % i, b.get('note_link_label')))
            # an FAQ question is the asker's words, 12 or fewer (the register card)
            for j, it in enumerate(b.get('items') or [] if b.get('type') == 'faq' else []):
                q = it.get('q') if isinstance(it, dict) else None
                if q and swords(q) > REGISTER['question']:
                    out.append(('register', 'question', (pid,), 'blocks[%d].items[%d].q' % (i, j), '%d words, at most %d: "%s"' % (swords(q), REGISTER['question'], clip(q))))
        for where, s in btn:
            if s and swords(s) > REGISTER['button']:
                out.append(('register', 'button', (pid,), where, '%d words, at most %d: "%s"' % (swords(s), REGISTER['button'], s)))
    return out


def faq_warnings(pages):
    """DR-009: one FAQ question on two or more pages (case and punctuation aside), unless every page gives it the same
    one-line answer. Paraphrases are not caught."""
    norm = lambda s: re.sub(r'\s+', ' ', re.sub(r'[^\w\s<>]', '', str(s or '').lower().replace('’', "'"))).strip()
    asked = {}
    for pid, pg in pages.items():
        for b in pg.get('blocks', []):
            if b.get('type') == 'faq':
                for it in b.get('items', []):
                    if isinstance(it, dict) and it.get('q'):
                        asked.setdefault(norm(it['q']), []).append((pid, it['q'], it.get('a') or ''))
    out = []
    for hits in asked.values():
        pids = tuple(dict.fromkeys(h[0] for h in hits))
        one_line = len({norm(h[2]) for h in hits}) == 1 and len(re.split(r'(?<=[.?!])\s+(?=\S)', hits[0][2].strip())) == 1
        if len(pids) > 1 and not one_line:
            out.append(('faq', '', pids, '', '"%s"' % hits[0][1]))
    return out


def figures(s):
    """(number, unit) for each figure with a unit in s; [placeholders] and "@ 25 °C" conditions left out."""
    s = re.sub(r'@\s*\d+(?:[.,]\d+)?\s*°C', ' ', bare(s))
    return [(float(n.replace(',', '')), u.lower()) for n, u in FIGURE.findall(s)]


def fact_warnings(pages):
    """DR-010: a hero fact equal to a public limit (a figure the site states with a pharmacopoeia or regulator), a code as
    the value, or a label without its " · " basis."""
    limits = {}
    for pid, pg in pages.items():
        for b in pg.get('blocks', []):
            for r in b.get('rows', []) if b.get('type') == 'spec' else []:
                if isinstance(r, dict) and REGULATOR.search('%s %s' % (r.get('p') or '', r.get('m') or '')):
                    for f in figures(r.get('v')):
                        limits.setdefault(f, '%s, %s on %s' % (clip(r.get('v'), 40), r.get('m'), pid))
            for row in b.get('rows', []) if b.get('type') == 'table' else []:
                for c in row if isinstance(row, list) else []:
                    t = c.get('t') if isinstance(c, dict) else c
                    if isinstance(t, str) and REGULATOR.search(t):
                        for f in figures(t):
                            limits.setdefault(f, '"%s" on %s' % (clip(t, 50), pid))
    out = []
    for pid, pg in pages.items():
        for i, f in enumerate(pg.get('facts') or []):
            if not isinstance(f, dict):
                continue
            v, l, w = str(f.get('v') or ''), str(f.get('l') or ''), 'facts[%d]' % i
            hit = next((limits[x] for x in figures(v) if x in limits), None)
            if hit:
                out.append(('fact', 'limit', (pid,), w, '"%s" equals a public limit (%s)' % (v, hit)))
            if CODE_VALUE.search(bare(v, '0')):
                out.append(('fact', 'code', (pid,), w, '"%s" is a code, clause or material, not our figure' % v))
            if ' · ' not in l:
                out.append(('fact', 'basis', (pid,), w, 'label "%s" has no " · " basis' % l))
    return out


def form_fields(pg):
    return [x for b in pg.get('blocks', []) if b.get('type') == 'form' for x in b.get('fields', []) + [y for s in b.get('steps', []) for y in s.get('fields', [])]]


def preset(fields, labels):
    """The options a form ticks for an intent, as wPreset in assets/src/parts/EnquiryForm.js: in shown radio and checkbox
    groups (one option per radio), a field with "when" shown once an option it names is ticked (three passes)."""
    shown = [not f.get('when') for f in fields]
    def ticks(i):
        f = fields[i]
        if not shown[i] or f.get('kind') not in ('radio', 'checkbox-group'):
            return []
        t = [o for o in f.get('options', []) if o in labels]
        return t[:1] if f.get('kind') == 'radio' else t
    for _ in range(3):
        on = {o for i in range(len(fields)) for o in ticks(i)}
        shown = [not f.get('when') or any(v in on for v in f['when'].split('|')) for f in fields]
    return {o for i in range(len(fields)) for o in ticks(i)}


def form_notes(b, w):
    """(JSON path, field) for each note (field kind "note") of a form block at path w."""
    fs = [('%s.fields[%d]' % (w, j), f) for j, f in enumerate(b.get('fields') or [])]
    fs += [('%s.steps[%d].fields[%d]' % (w, s, j), f) for s, st in enumerate(b.get('steps') or []) for j, f in enumerate(st.get('fields') or [])]
    return [(p, f) for p, f in fs if isinstance(f, dict) and f.get('kind') == 'note']


def jid(b, i):
    """A block's section id, as jid in assets/src/parts/SectionNav.js: its anchor, else s-<index>-<nav label>."""
    return b.get('anchor') or 's-%d-%s' % (i, re.sub(r'[^a-z0-9]+', '-', str(b.get('nav')).lower()))


def intent_problems(pages):
    """DR-014: intent labels that tick nothing on the linked page's form: no such option, or an option the intent never
    opens ("situation|follow-up" names the situation first). Read from the hero button and secondary link, the closing,
    contact routes, table and router cells ({t, link, intent}), plan columns ({t, intent}, on the page's own CTA link),
    FAQ links, form notes, a docs block's link and its items' links, and gauge and rule rows. The buttons wBtn draws
    (the hero's two, the closing's, the plans') may jump within the page ("#anchor"): that intent ticks the form in the
    block it lands on (wTick in assets/src/parts/EnquiryForm.js), so it is read against that block's fields, and a jump to
    a block that holds no form ticks nothing. An intent on any other in-page link, on a phone (tel:) link or with no link
    ticks nothing. Each one is a problem that fails check (it was a content warning while the page passes rewrote the
    forms and the intents that link to them; pass B left none, aquemi-web 7027d23)."""
    out = []
    for pid, pg in pages.items():
        pc, c, sc = pg.get('primary_cta') or '', pg.get('cta') or {}, pg.get('secondary_cta') or {}
        links = [('primary_cta_intent', pg.get('primary_cta_intent'), pg.get('primary_cta_link') or ('contact-service' if re.search('service', pc, re.I) else 'contact-proposal')),
                 ('secondary_cta.intent', sc.get('intent'), sc.get('link') or 'systems'),
                 ('cta.intent', c.get('intent'), c.get('link') or 'contact-proposal')]
        jumps = {'primary_cta_intent', 'secondary_cta.intent', 'cta.intent'}  # wBtn links, where "#anchor" jumps in the page
        for i, b in enumerate(pg.get('blocks', [])):
            w = 'blocks[%d]' % i
            links += [('%s.routes[%d].intent' % (w, j), r.get('intent'), r.get('link') or '') for j, r in enumerate(b.get('routes') or [])
                      if isinstance(r, dict) and r.get('link') and not r.get('current') and r.get('link') != pid]
            if b.get('type') == 'table':
                links += [('%s.rows[%d][%d].intent' % (w, j, k), x.get('intent'), x.get('link') or '') for j, r in enumerate(b.get('rows') or [])
                          if isinstance(r, list) for k, x in enumerate(r) if isinstance(x, dict)]
            if b.get('type') == 'faq':
                links += [('%s.items[%d].intent' % (w, j), it.get('intent'), it.get('link') or '') for j, it in enumerate(b.get('items') or []) if isinstance(it, dict)]
            if b.get('type') == 'form':
                links += [(p + '.intent', f.get('intent'), f.get('link') or '') for p, f in form_notes(b, w)]
            if b.get('type') == 'docs':
                links.append(('%s.intent' % w, b.get('intent'), b.get('link') or ''))
                links += [('%s.items[%d].intent' % (w, j), it.get('intent'), it.get('link') or '') for j, it in enumerate(b.get('items') or []) if isinstance(it, dict)]
            if b.get('type') == 'spec' and b.get('as') in ('gauges', 'rules'):
                links += [('%s.rows[%d].intent' % (w, j), r.get('intent'), r.get('link') or '') for j, r in enumerate(b.get('rows') or []) if isinstance(r, dict)]
            if b.get('type') == 'table' and b.get('as') == 'plans':
                # each plan's button follows the page's own CTA (blocks/plans.js): primary_cta and its link, else cta.link
                to = (pg.get('primary_cta_link') or ('contact-service' if re.search('service', pc, re.I) else 'contact-proposal')) if pc else (c.get('link') or 'contact-proposal')
                links += [('%s.cols[%d].intent' % (w, k), x.get('intent'), to) for k, x in enumerate(b.get('cols') or []) if k and isinstance(x, dict)]
                jumps |= {'%s.cols[%d].intent' % (w, k) for k in range(1, len(b.get('cols') or []))}
        for where, intent, link in links:
            if not intent:
                continue
            if link.startswith('#') and where in jumps:
                # an in-page jump ticks the form in the block it lands on (wTick), the page's own
                target = pid + link
                blk = next((b for i, b in enumerate(pg.get('blocks', [])) if (b.get('nav') or b.get('anchor')) and jid(b, i) == link[1:]), None)
                fields = form_fields({'blocks': [blk]}) if blk and blk.get('type') == 'form' else []
                if not fields:
                    out.append(('intent', '', (pid,), where, 'on an in-page link (%s) to %s, which ticks nothing' % (link, 'a block with no form' if blk else 'no block on this page')))
                    continue
            elif not link or link.startswith('#') or link.lower().startswith('tel:'):
                out.append(('intent', '', (pid,), where, 'on %s, which ticks nothing' % ('no link' if not link else 'an in-page link (%s)' % link if link.startswith('#') else 'a phone link (%s)' % link)))
                continue
            else:
                target = link.split('#')[0]
                fields = form_fields(pages.get(target, {}))
            options = {o for f in fields if f.get('kind') in ('radio', 'checkbox-group') for o in f.get('options', [])}
            on = preset(fields, intent.split('|'))
            for label in intent.split('|'):
                if label not in on:
                    out.append(('intent', '', (pid,), where, '"%s" %s on %s' % (label, 'is an option the intent never opens' if label in options else 'is not a form option', target)))
    return out


def contact_warnings(pages):
    """DR-008: a CONTACT value (assets/src/core.js) that no page file carries, so the nav and footer copy has drifted."""
    m = re.search(r'var CONTACT=\{(.*?)\};', open(os.path.join(ROOT, 'assets', 'src', 'core.js'), encoding='utf8').read(), re.S)
    text = [s for pg in pages.values() for _, s in copy_items(pg, skip={'todo'})]
    return [('contact', '', (), 'CONTACT.' + k, '"%s" is on no page file' % v) for k, v in re.findall(r"(\w+):'((?:[^'\\]|\\.)*)'", m.group(1) if m else '')
            if not any(v in s for s in text)]


def link_warnings(pages):
    """DR-008 rule 6: a link field (link, primary_cta_link, a spec's note_link, related items) naming a page that does
    not exist, a page#anchor or #anchor whose page has no block with that anchor (jid in assets/src/parts/SectionNav.js),
    or an in-page #anchor outside the hero and closing buttons (wBtn), which are the only links that jump within a page."""
    def ids(pg):
        return {jid(b, i) for i, b in enumerate(pg.get('blocks', [])) if b.get('nav') or b.get('anchor')}
    def walk(x, path=''):
        if isinstance(x, dict):
            for k, v in x.items():
                p = path + '.' + k if path else k
                if k in ('link', 'primary_cta_link', 'note_link') and isinstance(v, str):
                    yield p, v
                elif k == 'items' and x.get('type') == 'related' and isinstance(v, list):
                    yield from (('%s[%d]' % (p, i), s) for i, s in enumerate(v) if isinstance(s, str))
                else:
                    yield from walk(v, p)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                yield from walk(v, '%s[%d]' % (path, i))
    out = []
    for pid, pg in pages.items():
        for where, link in walk(pg):
            if re.match(r'[a-z][a-z0-9+.-]*:|/', link):
                continue  # an address outside the site
            page, _, anchor = link.partition('#')
            if not page and where not in ('primary_cta_link', 'secondary_cta.link', 'cta.link'):
                out.append(('link', '', (pid,), where, '"%s": an in-page link works only in the hero and closing buttons; write %s%s' % (link, pid, link)))
                continue
            page = page or pid
            if page not in pages:
                out.append(('link', '', (pid,), where, '"%s": no page %s' % (link, page)))
            elif anchor and anchor not in ids(pages[page]):
                out.append(('link', '', (pid,), where, '"%s": %s has no block with anchor "%s"' % (link, page, anchor)))
    return out


# DR-018 rule 4: look-only fields (a look draws them; they are not the block's reading copy). train: only its labels.
LOOK_FIELDS = ('alt', 'big', 'spines', 'scale', 'train', 'grid')
# keys inside a look field that place or index a drawn thing, never a figure
LOOK_GEOM = {'row', 'col', 'index', 'i', 'k', 'x', 'y', 'dx', 'dy', 'lx', 'ly', 'at', 'w', 'part', 'example'}
NUMBER = re.compile(r'(?<![\w.])\d+(?:[.,]\d+)?(?![\w])')


def look_warnings(pages):
    """DR-018 rule 4 (website.md, "Content rules"): a look-only field (alt, big, spines, scale, train[].label, grid) that
    holds a [placeholder], or a figure (a number with its unit, or a bare number value) that no reading field of the same
    block states. Never fails the check: the drawing may repeat a fact; it may not state one alone."""
    def look_leaves(x, path, field):
        """(path, value) for every string or number inside one look field; train keeps only each stop's label."""
        if isinstance(x, dict):
            for k, v in x.items():
                if k in LOOK_GEOM or (field == 'train' and k != 'label'):
                    continue
                yield from look_leaves(v, path + '.' + k, field)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                yield from look_leaves(v, '%s[%d]' % (path, i), field)
        elif isinstance(x, (str, int, float)) and not isinstance(x, bool):
            yield path, x
    def find(x, path=''):
        """(path, field, value) for each look field anywhere in a block."""
        if isinstance(x, dict):
            for k, v in x.items():
                p = path + '.' + k if path else k
                if k in LOOK_FIELDS:
                    yield p, k, v
                else:
                    yield from find(v, p)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                yield from find(v, '%s[%d]' % (path, i))
    def num(n):
        return float(str(n).replace(',', '.') if re.fullmatch(r'\d+,\d{1,2}', str(n)) else str(n).replace(',', ''))
    out = []
    for pid, pg in pages.items():
        for bi, b in enumerate(pg.get('blocks', [])):
            looks = list(find(b))
            if not looks:
                continue
            reading = ' '.join(t for _, t in copy_items(b, skip=NOT_SHOWN | set(LOOK_FIELDS)))
            figs, nums = set(figures(reading)), {num(n) for n in NUMBER.findall(bare(reading))}
            for p, field, val in looks:
                for lp, v in look_leaves(val, p, field):
                    where = 'blocks[%d].%s' % (bi, lp)
                    if isinstance(v, str) and placeholders(v):
                        out.append(('look', 'placeholder', (pid,), where, '"%s" holds a placeholder: keep it in the reading fields, draw it neutral or not at all' % clip(v, 50)))
                        continue
                    if isinstance(v, str):
                        miss = [f for f in figures(v) if f not in figs]
                        if miss:
                            out.append(('look', 'figure', (pid,), where, '"%s": %s stated by no reading field of the block' % (clip(v, 50), ', '.join('%g %s' % f for f in miss))))
                    elif float(v) not in nums:
                        out.append(('look', 'figure', (pid,), where, '%g stated by no reading field of the block' % v))
    return out


def content_warnings(pages):
    return register_warnings(pages) + faq_warnings(pages) + fact_warnings(pages) + contact_warnings(pages) + link_warnings(pages) + look_warnings(pages)


def report_warnings(ws, show=False, only=None, page=False):
    """With show, one WARN line per warning; only (a page id or a warning type) keeps that page's or that type's
    warnings. Then one summary line per type. page: only is a page id, so every summary line is marked "(DR-003,
    <page> only)" and counts that page's warnings alone (a page's editor never reads another page's warning as theirs)."""
    if only:
        ws = [w for w in ws if w[0] == only or only in w[2]]
    if show:
        for kind, sub, pids, where, msg in ws:
            print('WARN %s %s: %s' % (kind, ' '.join(x for x in (', '.join(pids), where) if x), msg))
    on = ', %s only' % only if page else ''
    for kind, record, label, subs in WARN_TYPES:
        mine = [w for w in ws if w[0] == kind]
        parts = ', '.join('%d %s' % (sum(1 for w in mine if w[1] == s), t) for s, t in subs)
        print('%d %s (%s%s)%s' % (len(mine), label, record, on, ': ' + parts if parts else ''))
    if not show:
        print('content warnings never fail the check; run check --warnings %s for detail' % (only if page else '[page or type]'))


def check(show_budgets=False, only=None, show_warnings=False):
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(errors='backslashreplace')  # warnings quote page copy (≤, µ); never crash on a narrow console
    t = load_tokens()
    names = set()
    problems = []
    for fam, v in t.items():
        if isinstance(v, dict) and 'tokens' in v:
            for k in v['tokens']:
                if k['name'] in names:
                    problems.append('duplicate token name: ' + k['name'])
                names.add(k['name'])
                if not k.get('usage'):
                    problems.append('token without a usage note: ' + k['name'])
    names |= {'font-' + k for k in t['type']['families']}
    comps_dir = os.path.join(DS, 'components')
    sources = [('components/base.css', os.path.join(comps_dir, 'base.css'))] + [
        ('components/%s/style.css' % n, os.path.join(comps_dir, n, 'style.css')) for n in sorted(os.listdir(comps_dir))
        if os.path.exists(os.path.join(comps_dir, n, 'style.css'))]
    for label, path in sources:
        src = open(path, encoding='utf8').read()
        for var in sorted(set(re.findall(r'var\(--([A-Za-z0-9_-]+)\)', src))):
            if var not in names:
                problems.append('%s uses an undefined token: --%s' % (label, var))
        body = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
        for hexval in sorted(set(re.findall(r'#[0-9A-Fa-f]{3,8}\b', body))):
            problems.append('%s has a literal colour (use a token): %s' % (label, hexval))
    css = bundle_css()
    comps = os.path.join(DS, 'components')
    for name in sorted(os.listdir(comps)):
        d = os.path.join(comps, name)
        if not os.path.isdir(d):
            continue
        if name != 'Cover' and not os.path.exists(os.path.join(d, 'README.md')):
            problems.append('component without README.md: ' + name)
        prev = os.path.join(d, 'preview.html')
        if not os.path.exists(prev):
            problems.append('component without preview.html: ' + name)
        else:
            ptext = open(prev, encoding='utf8').read()
            if not ptext.startswith('<!-- @dsCard'):
                problems.append('preview.html line 1 is not a @dsCard marker: ' + name)
            if re.search(r'lorem ipsum', ptext, re.I):
                problems.append('preview.html uses lorem ipsum (write real Aquemi copy): ' + name)
            if name != 'Cover' and not re.search(r'@dsCard[^>]*group="', ptext):
                problems.append('preview.html marker has no group: ' + name)
        rtext = open(os.path.join(d, 'README.md'), encoding='utf8').read() if os.path.exists(os.path.join(d, 'README.md')) else ''
        if re.search(r'^\[one sentence', rtext):
            problems.append('README.md is still the scaffold: ' + name)
    # Generated files must be current, so the guide shows what is in the repo
    manifest = os.path.join(DS, 'components.json')
    listed = {(c['name'], bool(c.get('retired'))) for c in json.load(open(manifest, encoding='utf8'))['components']} if os.path.exists(manifest) else set()
    if listed != {(c['name'], bool(c.get('retired'))) for c in components()}:
        problems.append('components.json is out of date: run python tools/design_system.py build')
    for rel, fn in GENERATED:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p) or open(p, encoding='utf8').read() != fn():
            problems.append('%s is out of date: run python tools/design_system.py build' % rel)
    js = site_js()
    defined = set(re.findall(r'\.(aq-[A-Za-z0-9_-]+)', css))
    # names ending in "--" are prefixes the renderer completes at run time (aq-btn--' + kind)
    used = {c for c in re.findall(r'\baq-[a-z0-9_-]+', js) if not c.endswith('--')}
    for cls in sorted(used - defined - {'aq-ah'}):
        problems.append('assets/src uses a class no component style.css defines: ' + cls)
    # The section library: the retired looks' renderers against the site's styles plus the library's
    lib_defined = defined | set(re.findall(r'\.(aq-[A-Za-z0-9_-]+)', bundle_library_css()))
    lib_used = {c for c in re.findall(r'\baq-[a-z0-9_-]+', site_js(True)) if not c.endswith('--')}
    for cls in sorted(lib_used - used - lib_defined - {'aq-ah'}):
        problems.append('a retired look (assets/src/blocks/look-*.js) uses a class no component style.css defines: ' + cls)
    # Looks are never deleted (tools/specimens.py): every look draws a component that exists, and every look with a
    # specimen keeps its renderer; every page block with a look has its content recorded
    spec_dir = os.path.join(DS, 'specimens')
    specs = {f[:-5]: json.load(open(os.path.join(spec_dir, f), encoding='utf8')) for f in sorted(os.listdir(spec_dir)) if f.endswith('.json')} if os.path.isdir(spec_dir) else {}
    looks = all_looks()
    for l in looks:
        c = look_component(l)
        if not c or not os.path.isdir(os.path.join(comps, c)):
            problems.append('look %s names no component folder (header: Look "%s" -> <Pascal>)' % (l, l))
    for l in sorted(set(specs) - set(looks)):
        problems.append('look %s has specimens but its renderer assets/src/blocks/look-%s.js is gone: looks are never deleted (restore it: python tools/specimens.py restore %s <commit>)' % (l, l, l))
    import hashlib
    unrecorded = []
    # Page files. An intent that ticks no option on the linked form is a problem (DR-014, intent_problems): it was a
    # content warning while the page passes rewrote the forms and their intents, and is one again now none is left.
    pdir = os.path.join(ROOT, 'content', 'pages')
    pages = {}
    for f in sorted(os.listdir(pdir)):
        if f.endswith('.json'):
            pg = json.load(open(os.path.join(pdir, f), encoding='utf8'))
            pages[pg['id']] = pg
    for pid, pg in pages.items():
        for i, b in enumerate(pg.get('blocks') or []):
            if isinstance(b, dict) and b.get('look'):
                h = hashlib.sha1(json.dumps(b, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf8')).hexdigest()[:10]
                if not any(x.get('hash') == h for x in (specs.get(b['look']) or {}).get('instances', [])):
                    unrecorded.append('%s block %d (%s)' % (pid, i, b['look']))
    if unrecorded:
        problems.append('content not in the section library yet, run python tools/specimens.py snapshot: ' + ', '.join(unrecorded[:6]) + (' and %d more' % (len(unrecorded) - 6) if len(unrecorded) > 6 else ''))
    for pid, pg in pages.items():
        c = pg.get('cta') or {}
        # Closing proof: explicit {v, l}, a confirmed figure (no [placeholder]); nothing is taken from the hero facts
        pr = c.get('proof')
        if pr is not None and (not isinstance(pr, dict) or not pr.get('v') or '[' in str(pr.get('v'))):
            problems.append('%s cta.proof: needs {"v", "l"} with a confirmed value, no [placeholder]' % pid)
    for _, _, pids, where, msg in intent_problems(pages):
        problems.append('%s %s: %s (DR-014: an intent label must tick an option on the linked form)' % (', '.join(pids), where, msg))
    for p in problems:
        print('PROBLEM', p)
    over = budgets(pages)
    if show_budgets:
        shown = [o for o in over if not only or o[0] == only]
        if only and only not in pages:
            print('no page with id ' + only)
        for pid, where, field, n, lim in shown:
            print('BUDGET %s %s %s: %d/%d' % (pid, where, field, n, lim))
        print('%d budget overrun(s)%s' % (len(shown), ' on ' + only if only else ''))
        if only in pages:
            (h, bl, c), _ = visible_words(pages[only])
            print('%s: %d visible words of %d (hero %d, blocks %d, closing %d; FAQ answers, folded rows, conditional form '
                  'fields and strings the renderer never prints left out)' % (only, h + bl + c, BUDGET['page_words'], h, bl, c))
    elif only in pages:
        # check --warnings <page>: that page's own overrun count, not the site's
        print('%d budget overrun(s) on %s (run check --budgets %s for detail)' % (sum(1 for o in over if o[0] == only), only, only))
    else:
        print('%d budget overruns (run check --budgets for detail)' % len(over))
    if show_warnings and only == 'intent':
        print('intent labels that tick nothing are problems, not warnings: see the PROBLEM lines above (DR-014)')
    elif show_warnings and only and only not in pages and only not in [w[0] for w in WARN_TYPES]:
        print('no page or warning type named ' + only)
    # With a page id (check --budgets <page> or check --warnings <page>) the warning summary is that page's alone; check
    # and check --budgets without a page sum the site's
    scope = only if show_warnings or only in pages else None
    report_warnings(content_warnings(pages), show_warnings, scope, scope in pages)
    # The site script must parse; node is optional (skipped where it isn't installed, e.g. some CI images).
    node = shutil.which('node')
    if node:
        import subprocess
        for rel in ('aquemi-site.js', 'motion.js', 'library.js', 'library-motion.js'):
            js = os.path.join(ROOT, 'assets', rel)
            r = subprocess.run([node, '--check', js], capture_output=True, text=True)
            if r.returncode:
                problems.append('assets/%s does not parse: ' % rel + (r.stderr.strip().splitlines() or ['?'])[-1])
                print(problems[-1])
    print('%d problem(s)' % len(problems))
    return not problems


def stage(dest):
    out = os.path.join(dest, 'project')
    if os.path.exists(out):
        shutil.rmtree(out)
    n = 0
    lib = tuple('components/%s/' % c for c in library_components())
    for base, _, files in os.walk(DS):
        for f in files:
            rel = os.path.relpath(os.path.join(base, f), DS).replace('\\', '/')
            if rel.startswith(lib) or rel.startswith('specimens/') or rel in ('section-library.md', 'components/bundle-library.css'):
                continue  # retired components live in the section library (sections.html), not the Claude design system
            if rel in NOT_PUBLISHED or rel.startswith('inspiration/') or rel.endswith('/style.css') or rel.endswith('/motion.js') or rel == 'components/base.css':
                continue  # inspiration images carry invented branding; style sources are already in bundle.css
            target = os.path.join(out, rel)
            os.makedirs(os.path.dirname(target), exist_ok=True)
            shutil.copyfile(os.path.join(base, f), target)
            print('project/' + rel)
            n += 1
    print('%d files staged in %s (the index, project/design-system.json, is read from the live artifact and written last)' % (n, out))


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else ''
    if cmd in ('build', 'tokens'):
        build()
    elif cmd == 'new' and len(sys.argv) > 3:
        new(sys.argv[2], sys.argv[3])
    elif cmd == 'check':
        b, w = '--budgets' in sys.argv, '--warnings' in sys.argv
        rest = [a for a in sys.argv[2:] if a not in ('--budgets', '--warnings')]
        sys.exit(0 if check(b, rest[0] if (b or w) and rest else None, w) else 1)
    elif cmd == 'stage' and len(sys.argv) > 2:
        stage(sys.argv[2])
    else:
        print(__doc__)
        sys.exit(2)
