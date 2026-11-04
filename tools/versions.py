"""Page history: every commit on main, viewable as the site looked then.

    python tools/versions.py

Writes, from git:
  versions/blobs/<ab>/<blob-sha>   each file that ever shipped, stored once (content-addressed)
  versions/tree/<commit>.json      one commit's files: {path: blob-sha}
  versions/index.json              every commit (oldest first) with date, author, subject, a hash per page
                                   (did this page's copy change?) and a design hash (did the look change?),
                                   plus the named checkpoints below
versions/sw.js (a service worker, hand-written) serves versions/at/<commit>/<path> from those files, so each
old index.html runs unchanged. versions.html is the viewer: it steps through the named checkpoints by default
(keep them to about ten), and "All versions" steps through every commit. Rerun after every push you want in the history
(the newest commit is always also reachable as the live site). Python 3 standard library only; needs git.
"""
import hashlib
import json
import os
import shutil
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'versions')

# The big checkpoints, oldest first: commit, title, what changed.
CHECKPOINTS = [
    ('e26059f', 'First draft',
     'The first site: 31 pages in the first Aquemi design system, one stylesheet and one renderer.'),
    ('e299ecf', 'Second pass and Gemini rebuild',
     'Second-pass copy on every page; sections, table, heroes and footer rebuilt from Gemini concepts; equipment drawings.'),
    ('05157a0', 'Third pass: system skeleton',
     'Every page compressed to the shared page skeleton, content budgets, site-wide phone pass.'),
    ('ea55d15', 'Fourth pass: navy ground',
     'Navy ground with light sheets, the fold, six table shapes, closing exchange, PlanTiers.'),
    ('871f1e0', 'Visual and fidelity passes',
     'Concepts 50 to 63 as components (limit gauges, callouts, binder, hold points), each matched to its concept. Tag pre-pass6.'),
    ('55bd940', 'Pass 6: bold display, design first',
     'Barlow Condensed capitals, first GSAP motion, about half the words, drawn hero figures and spot drawings. Tag pre-pass7.'),
    ('cd1bbf4', 'Pass 7: section refinement and motion',
     'Section-by-section refinement and per-component GSAP choreography.'),
    ('2d50dbf', 'Brand book',
     'Back on the brand book: Geist Light sentence case, light surface, Lucide-style icons, How we work. Pass 7 motion kept.'),
    ('44f3015', 'Pass 8: copy passes',
     'Passes A, B and C on every page against 16 site decisions and the buyer library: each page for its readers at '
     'their buying stage, fewer words, one name per open fact, section reviews, form and link fixes.'),
    ('30040f0', 'Pass 9: every section its own design',
     'Each section of all 27 pages redrawn from Gemini concepts in varied art directions (104 looks, IsoKit drawings, '
     'per-section GSAP), new hero, FAQ, related links, form and closing, then a polish pass. Tag pre-pass9.'),
    ('1f1147c', 'Pass 9b: library motion, every section concepted',
     'Motion ported from the Subframe Motion library site-wide (ambient WebGL shaders, odometer counts, interactions '
     'on every page); the 81 sections pass 9 had no concept for got their own Gemini concepts and were rebuilt from them.'),
    ('3010d6d', 'Pass 10: copy and audience',
     'Every page re-read for each industry and buyer role after notebook interviews and a 73-site competitor study: '
     'natural health products get their own door, device QA its supplier block, failure-led routers, drawings that no '
     'longer state open facts, wired form options. Design kept: the section library holds every look, 32 restored.'),
    ('52711ee', 'Pass 11: commercial lessons, 31 pages',
     'Every page reworked from 395 supplier decks, proposals, tenders, URSs and award packages: four new pages '
     '(writing your URS, how a project runs, your first system, buying from Aquemi) and the first technical note; plain '
     'words for owners and approvers, the buyer\'s own numbering for engineers and QA, honest proof for a new supplier; '
     'reviewed by the distilled conversion library; 13 retired looks back on the site.'),
    ('ba5fd31', 'Pass 12: every industry, mega menu, phones',
     'Every industry the package serves (three new industry pages, an industries hub by water use), an established voice '
     '(Applications with typical configurations, Technical notes), pages reworked from role interviews with the conversion '
     'library, a mega menu, and five build rounds from 75 new Gemini concepts: a phone pass on every section, about 40 '
     'new looks, polypropylene hero drawings; strong desktop sections kept.'),
]

# Not part of the site a visitor loads.
SKIP = ('design-system/inspiration/', '.github/', 'tools/', '.claude/', 'versions/', 'versions.html', 'research.html', 'sections.html', 'board/', 'research/',
        'design-system/specimens/', 'design-system/section-library.', 'design-system/components/bundle-library.css', 'assets/library')
# Count as copy, not design, when deciding what changed.
COPY = ('content/',)


def git(*args, text=True):
    out = subprocess.run(['git', '-C', ROOT, *args], check=True, capture_output=True).stdout
    return out.decode('utf-8') if text else out


LABELS = {}  # page id -> 'Section · Nav label', newest wins, so retired pages keep a name


def page_hashes(commit):
    try:
        d = json.loads(git('show', commit + ':content/pages.json'))
    except (subprocess.CalledProcessError, ValueError):
        return {}
    pages = d.get('pages', d) if isinstance(d, dict) else d
    for p in pages:
        if isinstance(p, dict) and 'id' in p:
            LABELS[p['id']] = '%s · %s' % (p.get('section', ''), p.get('nav_label') or p.get('title') or p['id'])
    return {p['id']: hashlib.sha1(json.dumps(p, sort_keys=True).encode()).hexdigest()[:8]
            for p in pages if isinstance(p, dict) and 'id' in p}


def main():
    for sub in ('blobs', 'tree'):
        shutil.rmtree(os.path.join(OUT, sub), ignore_errors=True)
        os.makedirs(os.path.join(OUT, sub))
    for name in os.listdir(OUT):  # snapshot folders from the first version of this tool
        if name.startswith('v') and os.path.isdir(os.path.join(OUT, name)):
            shutil.rmtree(os.path.join(OUT, name))
    log = git('log', 'main', '--reverse', '--date-order', '--format=%H%x1f%cI%x1f%an%x1f%s%x1f%P').splitlines()
    named = {git('rev-parse', c).strip(): (t, n) for c, t, n in CHECKPOINTS}
    have, commits, size = set(), [], 0
    for line in log:
        full, date, author, subject, parents = line.split('\x1f')
        tree, design = {}, hashlib.sha1()
        for row in git('ls-tree', '-r', full).splitlines():
            meta, path = row.split('\t', 1)
            kind, blob = meta.split()[1:3]
            if kind != 'blob' or path.startswith(SKIP):
                continue
            tree[path] = blob
            if not path.startswith(COPY):
                design.update((path + blob).encode())
            if blob not in have:
                have.add(blob)
                dest = os.path.join(OUT, 'blobs', blob[:2], blob)
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                data = git('cat-file', 'blob', blob, text=False)
                size += len(data)
                with open(dest, 'wb') as f:
                    f.write(data)
        with open(os.path.join(OUT, 'tree', full[:7] + '.json'), 'w', encoding='utf-8') as f:
            json.dump(tree, f, separators=(',', ':'))
        item = {'c': full[:7], 'h': full, 'date': date, 'author': author, 'subject': subject,
                'merge': len(parents.split()) > 1, 'design': design.hexdigest()[:8], 'pages': page_hashes(full)}
        if full in named:
            item['title'], item['note'] = named[full]
        commits.append(item)
    with open(os.path.join(OUT, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump({'commits': commits, 'labels': LABELS}, f, separators=(',', ':'))
    old = os.path.join(OUT, 'versions.json')
    if os.path.exists(old):
        os.remove(old)
    print('%d commits, %d files stored once (%.1f MB), %d checkpoints'
          % (len(commits), len(have), size / 1e6, sum(1 for c in commits if 'title' in c)))


if __name__ == '__main__':
    main()
