"""Media gallery manifest: every image made or considered for the site, used or not. Thumbnails need Pillow.

    python studio/studio.py gallery

Scans the folders in studio.config.json gallery.sources ([{"dir", "cat", "status", "group"?}], missing folders are
skipped) and writes <data.gallery> (default studio-data/gallery/gallery.json) with a thumbnail of each raster image in
thumbs/ beside it. The viewer is studio/web/gallery.html.

Per-image facts the files cannot tell (what it was made for, what it became, a note) go in a gallery-meta.json in
the image's folder: {"<file name>": {"title", "note", "status", "became", "link", "source", "date", "url"}}.
An image any site file names (HTML, CSS, JS, JSON) is marked "live" unless its meta says otherwise.
A project with richer needs sets gallery.producer to its own script, which must write the same format:
  {"items": [{"src", "thumb", "cat", "status", "title", "note", "order", "size", "kb", "group", "became", "link",
              "source", "date", "url"}], "cats": [[id, name, about, {"contain", "mask", "numbered"}]],
   "statuses": [[id, name]], "readme": "<path>"}
"""
import json
import os
import re

import config

IMG = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg')
NAMES = {'concept': 'Generated concepts', 'reference': 'References', 'capture': 'Captures', 'site': 'On the site',
         'brand': 'Brand', 'record': 'Build records', 'archive': 'Archive'}
STATUSES = [['live', 'Live on the site'], ['built', 'Became part of the site'], ['reference', 'Reference only'],
            ['superseded', 'Superseded'], ['record', 'Build record']]
TW = 480


def site_text(P):
    """Every site file's text, to tell which images the site uses."""
    skip = (P.kit_rel + '/', P.cfg['data']['dir'] + '/', P.cfg['data']['history'] + '/', 'node_modules/', '.git/')
    out = []
    for d, dirs, fs in os.walk(P.root):
        dirs[:] = [x for x in dirs if not x.startswith('.')]
        r = os.path.relpath(d, P.root).replace(os.sep, '/')
        if (r + '/').startswith(skip):
            continue
        for f in fs:
            if f.endswith(('.html', '.htm', '.css', '.js', '.json', '.md')) and f != 'gallery.json':
                try:
                    out.append(open(os.path.join(d, f), encoding='utf8', errors='ignore').read())
                except OSError:
                    pass
    return '\n'.join(out)


def run(P=None):
    P = P or config.load()
    out = P.path(P.cfg['data']['gallery'])
    base = os.path.dirname(out)
    thumbs = os.path.join(base, 'thumbs')
    os.makedirs(thumbs, exist_ok=True)
    try:
        from PIL import Image
    except ImportError:
        Image = None
        print('Pillow is not installed: the gallery shows full images instead of thumbnails (pip install Pillow)')
    used = site_text(P)
    items, cats, seen = [], [], set()
    for src in P.cfg['gallery'].get('sources', []):
        d = P.path(src['dir'])
        if not os.path.isdir(d):
            continue
        if src['cat'] not in [c[0] for c in cats]:
            cats.append([src['cat'], src.get('name') or NAMES.get(src['cat'], src['cat'].title()), src.get('about', ''),
                         {k: 1 for k in ('contain', 'mask', 'numbered') if src.get(k)}])
        for dd, dirs, fs in os.walk(d):
            dirs[:] = sorted(x for x in dirs if not x.startswith('.') and os.path.join(dd, x) != thumbs)
            meta = {}
            mp = os.path.join(dd, 'gallery-meta.json')
            if os.path.exists(mp):
                meta = json.load(open(mp, encoding='utf8'))
            for n, f in enumerate(sorted(fs)):
                if not f.lower().endswith(IMG):
                    continue
                p = os.path.join(dd, f)
                rel = P.rel(p)
                if rel in seen or os.path.realpath(p).startswith(os.path.realpath(thumbs)):
                    continue
                seen.add(rel)
                m = meta.get(f, {})
                status = m.get('status') or ('live' if (f in used and src.get('status') != 'record') else src.get('status', 'reference'))
                item = {'src': rel, 'cat': src['cat'], 'status': status,
                        'title': m.get('title') or re.sub(r'[-_]+', ' ', re.sub(r'^\d+[-_]', '', os.path.splitext(f)[0])).strip().capitalize(),
                        'note': m.get('note', ''), 'order': n + 1, 'kb': round(os.path.getsize(p) / 1024),
                        'group': src.get('group') or (os.path.relpath(dd, d).replace(os.sep, '/') if dd != d else None)}
                for k in ('became', 'link', 'source', 'date', 'url'):
                    if m.get(k):
                        item[k] = m[k]
                if Image and not f.lower().endswith('.svg'):
                    t = os.path.join(thumbs, rel.replace('/', '__').rsplit('.', 1)[0] + '.jpg')
                    try:
                        if not os.path.exists(t) or os.path.getmtime(t) < os.path.getmtime(p):
                            im = Image.open(p)
                            item['size'] = list(im.size)
                            im = im.convert('RGBA')
                            bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
                            bg.alpha_composite(im)
                            im = bg.convert('RGB')
                            if im.size[0] > TW:
                                im = im.resize((TW, round(im.size[1] * TW / im.size[0])))
                            im.save(t, 'JPEG', quality=78)
                        else:
                            item['size'] = list(Image.open(p).size)
                        item['thumb'] = P.rel(t)
                    except Exception as err:
                        print('  no thumbnail for %s: %s' % (rel, err))
                items.append(item)
    json.dump({'generated_by': 'python %s/studio.py gallery' % P.kit_rel, 'cats': cats, 'statuses': STATUSES, 'items': items},
              open(out, 'w', encoding='utf8', newline='\n'), ensure_ascii=False, indent=0)
    print('wrote %s: %d images in %d kinds' % (P.cfg['data']['gallery'], len(items), len(cats)))
