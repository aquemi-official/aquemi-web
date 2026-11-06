"""Design research page (research.html): pass 9's image loop, readable by people.

    python tools/research.py

Brings in the pass 9 and 9b research records when the working folder beside the repo has them
(../research/pass9, ../research/pass9b: briefs, concept logs, prompts, build notes; text only, the concept images
are already in design-system/inspiration/gemini/), then writes research.html from:
  research/pass9*/                                 prompts, concept logs, build notes, briefs
  design-system/inspiration/gemini/*.png           every Gemini original (thumbnails from tools/gallery.py)
  design-system/inspiration/style-atlas/           one description per image, keywords.json, STYLE-ATLAS.md
  .claude/skills/*/SKILL.md                        the workflow skills
  content/pages/*.json                             which look each section is built with now
Run tools/gallery.py first when images were added. Python 3 standard library only.
"""
import glob
import html
import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.join(os.path.dirname(ROOT), 'research')  # the working folder outside the repo
RES = os.path.join(ROOT, 'research')
INS = os.path.join(ROOT, 'design-system', 'inspiration')
ATLAS = os.path.join(INS, 'style-atlas')
TEXT = ('.md', '.json', '.py', '.sh', '.js', '.txt')
SKILLS = [('image-prompt-loop', 'Image → text → image: describe images, refresh the atlas, write prompts, generate in Gemini'),
          ('motion-library', 'Port motion from the Subframe Motion library into the site (GSAP and WebGL, tokens)'),
          ('aquemi-design-system', 'Change, check and publish the design system'),
          ('aquemi-studio', 'Run, check and release the studio: every development tool beside the site')]
BRIEFS = [('pass9/BUILD-BRIEF.md', 'Pass 9 build brief'), ('pass9/GEN-BRIEF.md', 'Pass 9 Gemini generator'),
          ('pass9/POLISH-BRIEF.md', 'Pass 9 polish round'), ('pass9b/GEN-BRIEF.md', 'Pass 9b Gemini generator'),
          ('pass9b/BUILD-BRIEF.md', 'Pass 9b build brief'), ('pass9b/MOTION-BRIEF.md', 'Pass 9b motion brief')]
REQUESTS = [('pass9/shared-requests.md', 'Pass 9: requests to shared code'),
            ('pass9/polish-requests.md', 'Pass 9: polish requests'), ('pass9b/requests.md', 'Pass 9b: requests')]


def esc(s):
    return html.escape(str(s), quote=True)


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def load(path):
    return json.loads(read(path))


def sync():
    """Copy the text records of the pass 9 working folders into research/ (images stay in the gallery)."""
    copied = 0
    for name in ('pass9', 'pass9b'):
        src = os.path.join(WORK, name)
        if not os.path.isdir(src):
            continue
        for dirpath, dirs, files in os.walk(src):
            dirs[:] = [d for d in dirs if d not in ('view', 'review', '__pycache__')]
            for f in files:
                if f.endswith(TEXT):
                    rel = os.path.relpath(os.path.join(dirpath, f), src)
                    dest = os.path.join(RES, name, rel)
                    os.makedirs(os.path.dirname(dest), exist_ok=True)
                    shutil.copy2(os.path.join(dirpath, f), dest)
                    copied += 1
    allq = os.path.join(WORK, 'pass9b-queue-all.json')
    if os.path.exists(allq):
        shutil.copy2(allq, os.path.join(RES, 'pass9b', 'queue-all.json'))
    return copied


# ---------- Markdown (the subset our notes use) ----------

def inline(s, link_img=None):
    out, parts = [], re.split(r'(`[^`]+`)', s)
    for p in parts:
        if p.startswith('`') and p.endswith('`') and len(p) > 1:
            code = p[1:-1]
            if link_img and re.fullmatch(r'\d{2,3}', code) and code in link_img:
                out.append('<button class="rs-ref" data-img="%s">%s</button>' % (code, esc(code)))
            else:
                out.append('<code>%s</code>' % esc(code))
            continue
        t = esc(p)
        t = re.sub(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
        t = re.sub(r'(?<![="])(https?://[^\s<)]+)', r'<a href="\1" target="_blank" rel="noopener">\1</a>', t)
        t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
        t = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', t)
        out.append(t)
    return ''.join(out)


def md(text, link_img=None):
    lines = text.replace('\r\n', '\n').split('\n')
    out, i, para = [], 0, []
    L = lambda s: inline(s, link_img)

    def flush():
        if para:
            out.append('<p>%s</p>' % L(' '.join(x.strip() for x in para)))
            para.clear()

    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if s.startswith('```'):
            flush()
            j = i + 1
            while j < len(lines) and not lines[j].strip().startswith('```'):
                j += 1
            out.append('<pre><code>%s</code></pre>' % esc('\n'.join(lines[i + 1:j])))
            i = j + 1
            continue
        m = re.match(r'(#{1,4})\s+(.*)', s)
        if m:
            flush()
            n = min(len(m.group(1)) + 1, 5)
            slug = re.sub(r'[^a-z0-9]+', '-', m.group(2).lower()).strip('-')
            out.append('<h%d id="%s">%s</h%d>' % (n, slug, L(m.group(2)), n))
            i += 1
            continue
        if s.startswith('|') and i + 1 < len(lines) and re.match(r'^\|?\s*:?-{3,}', lines[i + 1].strip()):
            flush()
            cells = lambda r: [c.strip() for c in r.strip().strip('|').split('|')]
            head = cells(s)
            rows, j = [], i + 2
            while j < len(lines) and lines[j].strip().startswith('|'):
                rows.append(cells(lines[j]))
                j += 1
            t = ['<div class="rs-tw"><table><thead><tr>%s</tr></thead><tbody>' % ''.join('<th>%s</th>' % L(c) for c in head)]
            for r in rows:
                t.append('<tr>%s</tr>' % ''.join('<td>%s</td>' % L(c) for c in r))
            out.append(''.join(t) + '</tbody></table></div>')
            i = j
            continue
        if re.match(r'^(\s*)([-*]|\d+[.)])\s+', line):
            flush()
            j, items = i, []
            while j < len(lines):
                m = re.match(r'^(\s*)([-*]|\d+[.)])\s+(.*)', lines[j])
                if m:
                    items.append([len(m.group(1)), m.group(2)[0].isdigit(), m.group(3)])
                elif lines[j].strip() and lines[j].startswith(' ') and items:
                    items[-1][2] += ' ' + lines[j].strip()
                else:
                    break
                j += 1
            html_ = []
            stack = []
            for ind, ordered, txt in items:
                while stack and ind < stack[-1][0]:
                    html_.append('</li></%s>' % stack.pop()[1])
                if not stack or ind > stack[-1][0]:
                    tag = 'ol' if ordered else 'ul'
                    stack.append((ind, tag))
                    html_.append('<%s><li>%s' % (tag, L(txt)))
                else:
                    html_.append('</li><li>%s' % L(txt))
            while stack:
                html_.append('</li></%s>' % stack.pop()[1])
            out.append(''.join(html_))
            i = j
            continue
        if s.startswith('>'):
            flush()
            j, q = i, []
            while j < len(lines) and lines[j].strip().startswith('>'):
                q.append(lines[j].strip()[1:].strip())
                j += 1
            out.append('<blockquote>%s</blockquote>' % L(' '.join(q)))
            i = j
            continue
        if re.fullmatch(r'-{3,}|\*{3,}', s):
            flush()
            if i == 0 or out:  # front matter is handled by the caller
                out.append('<hr>')
            i += 1
            continue
        if not s:
            flush()
        else:
            para.append(line)
        i += 1
    flush()
    return '\n'.join(out)


def front_matter(text):
    m = re.match(r'---\n(.*?)\n---\n', text.replace('\r\n', '\n'), re.S)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).split('\n'):
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    return meta, text[m.end():]


# ---------- data ----------

def concept_logs():
    """key -> {'take', 'idea', 'keep', 'pass'}, plus status lines (quota, stops)."""
    logs, status = {}, []
    for name in ('pass9', 'pass9b'):
        p = os.path.join(RES, name, 'concepts', 'log.md')
        if not os.path.exists(p):
            continue
        for line in read(p).split('\n'):
            parts = [x.strip() for x in line.split('|')]
            if len(parts) == 4 and re.fullmatch(r'[a-z-]+\.\d+', parts[0]):
                logs[parts[0]] = {'take': parts[1], 'idea': parts[2], 'keep': parts[3], 'pass': name}
            elif re.match(r'(QUOTA|STOPPED|RESUME)', line):
                status.append((name, line.strip()))
    return logs, status


def concept_images():
    """key -> list of (gemini file, take2?, pass) from the gallery names."""
    out = {}
    gm = os.path.join(RES, 'pass9', 'gallery-map.json')
    if os.path.exists(gm):
        for src, dest in load(gm).items():
            m = re.match(r'(.+)\.(\d+)(\.v2)?\.png$', src)
            out.setdefault('%s.%s' % (m.group(1), m.group(2)), []).append((dest, bool(m.group(3)), 'pass9'))
    for f in sorted(os.listdir(os.path.join(INS, 'gemini'))):
        m = re.match(r'\d+-p9b-(.+)-(\d+)(-take2)?\.png$', f)
        if m:
            out.setdefault('%s.%s' % (m.group(1), m.group(2)), []).append((f, bool(m.group(3)), 'pass9b'))
    return out


def prompts():
    """(pass 9 prompts by key, pass 9b queue by key). Pass 9b's queue holds the sections pass 9 did not reach, plus
    a few pass 9 drew with the first, blueprint-only prompt and queued again."""
    p9, p9b = {}, {}
    f = os.path.join(RES, 'pass9', 'sections.json')
    if os.path.exists(f):
        p9 = {s['key']: s for s in load(f)}
    f = os.path.join(RES, 'pass9b', 'queue.json')
    if os.path.exists(f):
        p9b = {s['key']: s for s in load(f)}
    return p9, p9b


def pages():
    order = load(os.path.join(ROOT, 'content', 'pages.json'))
    order = [p['id'] for p in (order.get('pages', order) if isinstance(order, dict) else order)]
    byid = {}
    for f in glob.glob(os.path.join(ROOT, 'content', 'pages', '*.json')):
        d = load(f)
        byid[d['id']] = d
    return [byid[i] for i in order if i in byid]


def pascal(look):
    return ''.join(w.capitalize() for w in look.split('-'))


def thumb(file):
    return 'design-system/inspiration/thumbs/design-system__inspiration__gemini__%s.jpg' % file.rsplit('.', 1)[0]


# ---------- panels ----------

def panel_overview(stats, status, kit):
    loop = [('1', 'Page copy', 'Each section of the 27 pages, with its real text', 'content/pages/*.json'),
            ('2', 'Section prompt', 'Base + the section\'s content + one art direction + negatives from the atlas', 'tools/section_prompts.py, kit.json'),
            ('3', 'Gemini concept', 'Edit the chat\'s first prompt and resend, so each image starts fresh; capture full size', 'gemini-helpers.js, save_capture.py'),
            ('4', 'Describe', 'Each image back to text: style family, palette, type, layout devices, 25 to 40 keywords, a reusable prompt', 'describe.workflow.js → style-atlas/images/*.json'),
            ('5', 'Atlas', 'Count it all: brand core, ten families, what combines, what fails, the prompt kit', 'aggregate.py → keywords.json, STYLE-ATLAS.md'),
            ('6', 'Build and ship', 'One look per section from its concept, motion from the library; checked at 1280 and 375', 'look-*.js, ship.sh, versions.py')]
    steps = ''.join('<li><b>%s</b><h3>%s</h3><p>%s</p><code>%s</code></li>' % tuple(esc(x) for x in s) for s in loop)
    nums = ''.join('<div><b>%s</b><span>%s</span></div>' % (esc(v), esc(k)) for k, v in stats)
    stops = ''.join('<li><span class="rs-tag">%s</span> %s</li>' % (esc('Pass 9b' if n == 'pass9b' else 'Pass 9'), esc(l)) for n, l in status)
    dirs = ''.join('<li>%s</li>' % esc(d) for d in kit.get('directions', []))
    return '''
<div class="rs-cols">
 <div class="rs-prose">
  <h2>What this is</h2>
  <p>Pass 9 asked for every section of the site to become its own bold design instead of "tabular data all the way down".
  Each section got a concept image from Gemini, and every image was then read back into words, so the look we were reaching
  for could be named, counted and reused. This page holds all of it: every concept, what each section became, every image
  taken apart into keywords, the themes they add up to, the build notes, and the skills that run the loop again.</p>
  <p>The images are ideas, not the brand: their fonts, logos, copy and figures are invented by the image model. Each was rebuilt
  with Aquemi tokens, type and real content.</p>
 </div>
 <div class="rs-nums">%s</div>
</div>
<h2>The loop: image → text → image</h2>
<ol class="rs-loop">%s</ol>
<p class="rs-note">Stages 2 to 5 run again as one loop: new images are described, the atlas is refreshed, and the next prompts come from its kit.
The <a href="#skills">image-prompt-loop skill</a> runs it.</p>
<div class="rs-cols">
 <div>
  <h2>Where we stopped</h2>
  <p>The Gemini image quota ran out twice. Sections without a concept were built from ideas in the pool (their build notes say which).</p>
  <ul class="rs-stops">%s</ul>
  <p>To carry on when the quota resets: the <code>image-prompt-loop</code> skill, stage 3, with <code>research/pass9b/GEN-BRIEF.md</code>;
  the queue is <code>research/pass9b/queue.json</code> (sections still waiting are marked on <a href="#concepts">Concepts</a>).
  Then describe the new images (stage 1) so the atlas covers them.</p>
 </div>
 <div>
  <h2>The art directions we rotated</h2>
  <p>From the prompt kit (<code>kit.json</code>). Neighbouring sections never share one.</p>
  <ul class="rs-dirs">%s</ul>
 </div>
</div>''' % (nums, steps, stops, dirs)


def panel_concepts(pg, imgs, logs, p9, p9b):
    out, toc = [], []
    for p in pg:
        rows = []
        for i, b in enumerate(p['blocks']):
            key = '%s.%d' % (p['id'], i)
            ims, lg = imgs.get(key, []), logs.get(key)
            made = {ps for _, _, ps in ims}
            q = p9b.get(key, {}) if ('pass9b' in made or not made) else p9.get(key, {})
            # pass 9's first seven sections were drawn with the first, blueprint-only prompt; their entry in sections.json
            # is the newer prompt written to redo them (log takes without "new mid")
            redo = made == {'pass9'} and lg and 'new mid' not in lg['take']
            h = b.get('h') or q.get('h') or b.get('type')
            look = b.get('look')
            if not ims and not look and key not in p9b:
                continue
            fig = ''.join('<button class="rs-fig" data-full="design-system/inspiration/gemini/%s"><img loading="lazy" src="%s" alt="Gemini concept for %s%s"><span>%s</span></button>'
                          % (esc(f), esc(thumb(f)), esc(h), ', take 2' if t2 else '', 'Take 2' if t2 else ('Pass 9b' if ps == 'pass9b' else 'Pass 9'))
                          for f, t2, ps in ims) or '<div class="rs-nofig">%s</div>' % ('Waiting for the next Gemini reset' if key in p9b else 'No concept of its own: built from ideas in the pool')
            meta = []
            if redo:
                meta.append(('Art direction', 'the first prompt: blueprint line art for every section'))
            elif made:
                meta.append(('Art direction', esc(q.get('dir') or '')))
            elif q.get('dir'):
                meta.append(('Planned art direction', esc(q['dir'])))
            if lg:
                meta.append(('The idea', esc(lg['idea'])))
                meta.append(('For the builder', esc(lg['keep'])))
                if len(ims) > 1:
                    meta.append(('Take built', esc(lg['take'])))
            if redo:
                meta.append(('Next', 'A new take is written, not yet generated: %s' % esc(q.get('dir', ''))))
            if look:
                comp = pascal(look)
                has = os.path.isdir(os.path.join(ROOT, 'design-system', 'components', comp))
                meta.append(('Built as', ('<a href="design-system.html#c-%s">%s</a>' % (comp, comp) if has else esc(comp)) + ' <span class="rs-muted">(look <a href="sections.html#%s"><code>%s</code></a> in the section library)</span>' % (esc(look), esc(look))))
            else:
                meta.append(('Built as', '<span class="rs-muted">the shared %s section</span>' % esc(b.get('type'))))
            prompt = q.get('prompt') or q.get('mid')
            pdet = ('<details><summary>%s</summary><pre class="rs-prompt">%s</pre></details>'
                    % ('The prompt for the new take' if redo else 'The prompt Gemini received' if q.get('prompt') else 'The section part of the prompt (the kit\'s base and ending wrap it)', esc(prompt))) if prompt else ''
            status = 'has' if ims else ('queued' if key in p9b else 'none')
            rows.append('<article class="rs-sec" data-s="%s"><div class="rs-sec__figs">%s</div><div class="rs-sec__txt"><p class="rs-key">%s · section %d</p><h3>%s</h3><dl>%s</dl>%s</div></article>'
                        % (status, fig, esc(p['id']), i + 1, esc(h), ''.join('<dt>%s</dt><dd>%s</dd>' % m for m in meta), pdet))
        if not rows:
            continue
        name = p.get('nav_label') or p.get('title') or p['id']
        toc.append('<a href="#cp-%s">%s</a>' % (esc(p['id']), esc(name)))
        out.append('<section class="rs-page" id="cp-%s"><header><h2>%s</h2><a href="index.html#%s">See the page live →</a> <a href="#n-%s" class="rs-goto">Build notes</a></header>%s</section>'
                   % (esc(p['id']), esc(name), esc(p['id']), esc(p['id']), ''.join(rows)))
    filt = '''<div class="rs-bar"><span class="rs-lab">Show</span>
<button class="rs-chip" data-cf="all" aria-pressed="true">All sections</button>
<button class="rs-chip" data-cf="has" aria-pressed="false">With a concept</button>
<button class="rs-chip" data-cf="queued" aria-pressed="false">Waiting for a concept</button>
<button class="rs-chip" data-cf="none" aria-pressed="false">Built from the pool</button></div>'''
    return '<p class="rs-intro">Every section of every page, in site order: the Gemini concept (both takes where there were two), the art direction it was prompted with, the idea the builder kept, and the look it is built with today. Click an image to see it full size.</p>' + filt + '<nav class="rs-toc">%s</nav>%s' % (''.join(toc), ''.join(out))


def panel_images(desc, fams, imgs_all):
    chips = ''.join('<button class="rs-chip" data-ff="%s" aria-pressed="false">%s <i>%d</i></button>' % (esc(k), esc(v['name']), v['images']) for k, v in fams.items())
    eras = [('early', 'Early (01–30)'), ('later', 'Later passes (31–67)'), ('pass9', 'Pass 9 (68–94)')]
    echips = ''.join('<button class="rs-chip" data-fe="%s" aria-pressed="false">%s</button>' % e for e in eras)
    cards = []
    for f in imgs_all:
        n = f.split('-')[0]
        d = desc.get(n)
        if d:
            cards.append('<li class="rs-card" data-n="%s" data-fam="%s" data-era="%s" data-q="%s"><button><span class="rs-cf"><img loading="lazy" src="%s" alt=""><i>%s</i></span><b>%s</b><span>%s · fit %s/5</span></button></li>'
                         % (n, esc(d['_fam']), esc(d['_era']), esc((' '.join(d.get('t2i_keywords', [])) + ' ' + d.get('prompted_for', '') + ' ' + d.get('style_family', '')).lower()),
                            esc(thumb(f)), n, esc(d.get('signature_idea') or d.get('prompted_for', '')), esc(fams.get(d['_fam'], {}).get('name', d.get('style_family', ''))), d.get('brand_fit', '?')))
        else:
            cards.append('<li class="rs-card rs-card--new" data-n="%s" data-fam="" data-era="pass9b" data-q="%s"><button><span class="rs-cf"><img loading="lazy" src="%s" alt=""><i>%s</i></span><b>%s</b><span>Pass 9b · not described yet</span></button></li>'
                         % (n, esc(f.lower()), esc(thumb(f)), n, esc(f.rsplit('.', 1)[0])))
    return '''<p class="rs-intro">Each Gemini original was read back into text: what style family it belongs to, its palette, type, composition and layout
devices, the motion it implies, 25 to 40 text-to-image keywords, a content-free prompt that would make it again, what works, what fails, and how well it fits
the brand (1 to 5). Click an image for its full description. The 34 pass 9b images are not described yet (image-prompt-loop, stage 1).</p>
<div class="rs-bar"><input class="rs-search" type="search" placeholder="Search keywords, e.g. limestone, leader lines, macro" aria-label="Search the descriptions">
<span class="rs-count" id="rs-icount"></span></div>
<div class="rs-bar"><span class="rs-lab">Family</span>%s</div>
<div class="rs-bar"><span class="rs-lab">When</span>%s<button class="rs-chip" data-fe="pass9b" aria-pressed="false">Pass 9b (95–128)</button></div>
<ul class="rs-grid">%s</ul>''' % (chips, echips, ''.join(cards))


def bars(rows, maxv, fmt='%d'):
    return ''.join('<li><span class="rs-bl">%s</span><span class="rs-bb"><i style="width:%.1f%%"></i></span><span class="rs-bv">%s</span></li>'
                   % (lab, 100.0 * v / maxv if maxv else 0, fmt % v) for lab, v in rows)


def panel_themes(k):
    fams = k['families']
    fam_rows = []
    for key, f in fams.items():
        era = f.get('by_era', {})
        ex = ' '.join('<button class="rs-ref" data-img="%s">%s</button>' % (x[0].split('-')[0], x[0].split('-')[0]) for x in f.get('files', [])[:6])
        kw = ', '.join(esc(x[0]) for x in f.get('top_t2i_keywords', [])[:6])
        fam_rows.append('<tr><td><b>%s</b></td><td>%d</td><td>%.2f</td><td>%d / %d / %d</td><td>%s</td><td>%s</td></tr>'
                        % (esc(f['name']), f['images'], f['mean_fit'], era.get('early', 0), era.get('later', 0), era.get('pass9', 0), kw, ex))
    groups = {}
    for key, c in k['concepts'].items():
        groups.setdefault(c['group'], []).append(c)
    gnames = {'palette': 'Palette', 'rendering': 'Rendering', 'typography': 'Typography', 'layout': 'Layout devices',
              'motion': 'Motion the images imply', 'anti': 'What goes wrong (share of images with the problem)'}
    gblocks = []
    for g in ('palette', 'rendering', 'typography', 'layout', 'motion', 'anti'):
        cs = sorted(groups.get(g, []), key=lambda c: -c['share'])[:12]
        rows = []
        for c in cs:
            be = c.get('by_era', {})
            trend = ''.join('<i title="%s %d%%" style="height:%d%%"></i>' % (e, round(100 * be.get(e, 0)), max(4, round(100 * be.get(e, 0)))) for e in ('early', 'later', 'pass9'))
            rows.append('<li><span class="rs-bl">%s</span><span class="rs-bb"><i style="width:%.1f%%"></i></span><span class="rs-bv">%d%%</span><span class="rs-tr" aria-hidden="true">%s</span></li>'
                        % (esc(c['label']), 100 * c['share'], round(100 * c['share']), trend))
        gblocks.append('<div class="rs-th"><h3>%s</h3><ul class="rs-bars">%s</ul></div>' % (gnames[g], ''.join(rows)))
    es = k['era_shift']
    lab = lambda t: esc(k['concepts'].get(t, {}).get('label', t.replace('_', ' ')))
    rise = bars([(lab(t), v * 100) for t, v in es.get('biggest_risers', [])[:8]], 100, '+%d pts')
    fall = bars([(lab(t), -v * 100) for t, v in es.get('biggest_fallers', [])[:8]], 100, '−%d pts')
    voc = k['t2i_vocabulary']['words'][:70]
    top = voc[0][1] if voc else 1
    cloud = ''.join('<span style="font-size:%.2fem">%s</span>' % (0.8 + 1.1 * c / top, esc(w)) for w, c in voc)
    neg = bars([(esc(w), c) for w, c in k['negations'][:14]], k['negations'][0][1] if k['negations'] else 1)
    bf = k['brand_fit']
    bfam = bars([(esc(fams.get(f, {}).get('name', f)), v['mean']) for f, v in sorted(bf['by_family'].items(), key=lambda x: -x[1]['mean'])], 5, '%.2f')
    return '''<p class="rs-intro">What the %d described images add up to, counted by <code>style-atlas/aggregate.py</code> into <code>keywords.json</code>.
The bars are the share of images that show each trait; the three small columns show early, later and pass 9 images, so you can see where the look was heading.
The <a href="#atlas">style atlas</a> turns these counts into decisions.</p>
<h2>Ten style families</h2>
<div class="rs-tw"><table><thead><tr><th>Family</th><th>Images</th><th>Mean brand fit</th><th>Early / later / pass 9</th><th>Its keywords</th><th>Examples</th></tr></thead><tbody>%s</tbody></table></div>
<h2>Brand fit by family</h2><p class="rs-note">Overall mean %.2f of 5 across %d images.</p><ul class="rs-bars rs-bars--wide">%s</ul>
<h2>Traits</h2><div class="rs-themes">%s</div>
<div class="rs-cols"><div><h2>Rising over time</h2><ul class="rs-bars">%s</ul></div><div><h2>Falling over time</h2><ul class="rs-bars">%s</ul></div></div>
<h2>The prompt vocabulary</h2><p class="rs-note">The words that recur most in the 94 reusable prompts, sized by count.</p><div class="rs-cloud">%s</div>
<h2>What the prompts had to rule out</h2><ul class="rs-bars rs-bars--wide">%s</ul>''' % (
        k['meta']['images'], ''.join(fam_rows), bf['overall'], k['meta']['images'], bfam, ''.join(gblocks), rise, fall, cloud, neg)


def doc_panel(docs, pid):
    """docs: list of (id, title, sub, html). A list on the left, one shown at a time."""
    nav = ''.join('<a href="#%s-%s" data-doc="%s"%s>%s%s</a>' % (pid, esc(i), esc(i), ' aria-current="true"' if n == 0 else '', esc(t), '<span>%s</span>' % esc(s) if s else '')
                  for n, (i, t, s, _) in enumerate(docs))
    body = ''.join('<article class="rs-doc rs-prose" data-doc="%s" id="%s-%s"%s>%s</article>' % (esc(i), pid, esc(i), '' if n == 0 else ' hidden', h)
                   for n, (i, t, s, h) in enumerate(docs))
    return '<div class="rs-docs"><nav class="rs-docnav">%s</nav><div class="rs-docbody">%s</div></div>' % (nav, body)


def panel_notes(pg, link_img):
    docs = []
    for p in pg:
        parts = []
        for name, lab in (('pass9', 'Pass 9'), ('pass9b', 'Pass 9b')):
            f = os.path.join(RES, name, 'build', p['id'] + '.md')
            if os.path.exists(f):
                parts.append('<p class="rs-tag">%s</p>%s' % (lab, md(read(f), link_img)))
        if parts:
            docs.append((p['id'], p.get('nav_label') or p['id'], ' + '.join(n for n in ('9', '9b') if os.path.exists(os.path.join(RES, 'pass' + n, 'build', p['id'] + '.md'))), '<hr>'.join(parts)))
    shared = os.path.join(RES, 'pass9', 'build', 'shared.md')
    if os.path.exists(shared):
        docs.append(('shared', 'Shared parts', 'IsoKit, motion', md(read(shared), link_img)))
    for rel, title in REQUESTS:
        f = os.path.join(RES, rel)
        if os.path.exists(f):
            body = read(f)
            items = [l[2:] for l in body.split('\n') if l.startswith('- ')]
            h = '<h2>%s</h2><p class="rs-note">Each line is a request one builder made of shared code, then what was done (after the arrow).</p><ul class="rs-reqs">%s</ul>' % (
                esc(title), ''.join('<li>%s</li>' % inline(x).replace(' -&gt; ', '<br><b>→</b> ').replace('\n  -&gt; ', '<br><b>→</b> ') for x in items)) if items else md(body)
            docs.append((rel.replace('/', '-').replace('.md', ''), title, '', h))
    return '<p class="rs-intro">What each builder did, page by page: the look per section, the concept idea kept, the art direction borrowed, what was cut, and what was still weak.</p>' + doc_panel(docs, 'n')


def panel_skills():
    docs = []
    for name, sub in SKILLS:
        f = os.path.join(ROOT, '.claude', 'skills', name, 'SKILL.md')
        if not os.path.exists(f):
            continue
        meta, body = front_matter(read(f))
        tools = sorted(os.listdir(os.path.join(ROOT, '.claude', 'skills', name, 'tools'))) if os.path.isdir(os.path.join(ROOT, '.claude', 'skills', name, 'tools')) else []
        head = '<p class="rs-tag">Skill · <code>.claude/skills/%s/</code></p><p class="rs-lead">%s</p>' % (esc(name), esc(meta.get('description', sub)))
        if tools:
            head += '<p class="rs-note">Tools: %s</p>' % ', '.join('<code>%s</code>' % esc(t) for t in tools if t != '__pycache__')
        docs.append((name, name, sub, head + md(body)))
    for rel, title in BRIEFS:
        f = os.path.join(RES, rel)
        if os.path.exists(f):
            docs.append((rel.replace('/', '-').replace('.md', ''), title, 'Brief · research/' + rel, md(read(f))))
    kit = os.path.join(ROOT, '.claude', 'skills', 'image-prompt-loop', 'tools', 'kit.json')
    if os.path.exists(kit):
        k = load(kit)
        h = ('<h2>The prompt kit</h2><p>%s</p><h3>Base (before the section)</h3><pre class="rs-prompt">%s</pre><h3>Section part</h3><p>The section\'s heading and real content, written by <code>section_prompts.py</code> from the page file, then one art direction.</p>'
             '<h3>Ending (after the section)</h3><pre class="rs-prompt">%s</pre><h3>Art directions</h3><ul>%s</ul><p class="rs-note">Section types skipped: %s.</p>'
             % (esc(k.get('_about', '')), esc(k.get('pre', '')), esc(k.get('suf', '')), ''.join('<li>%s</li>' % esc(d) for d in k.get('directions', [])), esc(', '.join(k.get('skip_types', [])))))
        docs.insert(1, ('prompt-kit', 'The prompt kit', 'kit.json', h))
    return '<p class="rs-intro">The skills and briefs we built so the work can be run again by any agent or person: the image loop, the motion library, the design system, and the briefs each pass\'s agents worked from.</p>' + doc_panel(docs, 's')


# ---------- page ----------

CSS = r'''
body { background: var(--surface); }
.rs-in { max-width: 1280px; margin: 0 auto; padding-inline: max(16px, env(safe-area-inset-left, 0px)) max(16px, env(safe-area-inset-right, 0px)); }
@media (min-width: 900px) { .rs-in { padding-inline: var(--space-10); } }
.rs-head { padding-block: var(--space-12) var(--space-6); border-bottom: 1px solid var(--line); }
.rs-head h1 { margin: 0; font: 300 clamp(36px, 6vw, 64px)/1.05 var(--font-sans); letter-spacing: -0.02em; color: var(--ink); text-wrap: balance; }
.rs-head p { max-width: 68ch; color: var(--ink-muted); font: 400 16px/24px var(--font-sans); }
.rs-links { font: 400 13px/18px var(--font-mono); }
.rs-links a, .rs-prose a, .rs-intro a, .rs-note a, dd a, .rs-page header a { color: var(--action); }
.rs-tabs { position: sticky; top: 0; z-index: 6; background: var(--surface); border-bottom: 1px solid var(--line); }
.rs-tabs .rs-in { display: flex; gap: var(--space-1); overflow-x: auto; scrollbar-width: thin; }
.rs-tabs a { flex: none; padding: var(--space-4) var(--space-3); font: 500 13px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted); text-decoration: none; border-bottom: 2px solid transparent; }
.rs-tabs a:hover { color: var(--ink); }
.rs-tabs a[aria-current="page"] { color: var(--ink); border-bottom-color: var(--flow); }
.rs-panel { padding-block: var(--space-8) var(--space-16); }
.rs-panel h2 { font: 300 30px/36px var(--font-sans); letter-spacing: -0.01em; color: var(--ink); margin: var(--space-10) 0 var(--space-4); text-wrap: balance; }
.rs-panel h3 { font: 500 16px/22px var(--font-sans); color: var(--ink); margin: var(--space-6) 0 var(--space-2); }
.rs-intro { max-width: 80ch; font: 400 16px/25px var(--font-sans); color: var(--ink-muted); margin: 0 0 var(--space-6); }
.rs-note { font: 400 14px/21px var(--font-sans); color: var(--ink-muted); max-width: 80ch; }
.rs-muted { color: var(--ink-subtle); }
.rs-tag { display: inline-block; margin: 0 0 var(--space-2); padding: 2px 8px; border: 1px solid var(--line); font: 500 11px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted); }
.rs-lead { font: 400 17px/26px var(--font-sans); color: var(--ink); }
.rs-cols { display: grid; gap: var(--space-8); grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); align-items: start; }
.rs-cols > * { min-width: 0; }
.rs-nums { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--space-5) var(--space-4); margin-top: var(--space-10); }
.rs-nums b { display: block; font: 300 44px/48px var(--font-sans); color: var(--ink); letter-spacing: -0.02em; }
.rs-nums span { font: 400 12px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted); }
.rs-loop { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr)); gap: 0; border: 1px solid var(--line); }
.rs-loop li { position: relative; padding: var(--space-5) var(--space-4); border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--surface-raised); min-width: 0; }
.rs-loop li > b { font: 300 32px/32px var(--font-mono); color: var(--flow); }
.rs-loop h3 { margin: var(--space-3) 0 var(--space-1); }
.rs-loop p { margin: 0 0 var(--space-3); font: 400 14px/20px var(--font-sans); color: var(--ink-muted); }
.rs-loop code { font: 400 11px/15px var(--font-mono); color: var(--ink-subtle); overflow-wrap: anywhere; }
.rs-stops { padding-left: 0; list-style: none; display: grid; gap: var(--space-2); font: 400 13px/19px var(--font-mono); color: var(--ink-muted); }
.rs-stops .rs-tag { margin: 0 var(--space-2) 0 0; }
.rs-dirs { padding-left: var(--space-5); display: grid; gap: var(--space-2); font: 400 14px/20px var(--font-sans); color: var(--ink-muted); }
.rs-bar { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center; margin-bottom: var(--space-3); }
.rs-lab { font: 500 12px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-subtle); min-width: 64px; }
.rs-chip { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 32px; padding: 0 var(--space-3); border: 1px solid var(--line); background: var(--surface-raised); color: var(--ink-muted); font: 400 13px/16px var(--font-mono); cursor: pointer; border-radius: var(--radius-sm); }
.rs-chip:hover { border-color: var(--line-strong); color: var(--ink); }
.rs-chip[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--surface); }
.rs-chip i { font-style: normal; opacity: 0.7; }
.rs-search { flex: 1 1 260px; min-height: 38px; padding: 0 var(--space-3); border: 1px solid var(--line-strong); background: var(--surface-raised); color: var(--ink); font: 400 14px/20px var(--font-mono); }
.rs-count { font: 400 13px/18px var(--font-mono); color: var(--ink-muted); }
:is(.rs-chip, .rs-tabs a, .rs-card button, .rs-fig, .rs-ref, .rs-docnav a, .rs-lb button):focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.rs-toc { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-4); margin: var(--space-4) 0 var(--space-6); font: 400 13px/22px var(--font-mono); }
.rs-toc a { color: var(--action); }
.rs-page { padding-top: var(--space-6); }
.rs-page header { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-2) var(--space-5); border-top: 1px solid var(--line-strong); padding-top: var(--space-4); margin-bottom: var(--space-2); font: 400 13px/18px var(--font-mono); }
.rs-page header h2 { margin: 0; flex: 1 1 auto; }
.rs-sec { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 4fr); gap: var(--space-6); padding-block: var(--space-6); border-bottom: 1px solid var(--line); }
@media (max-width: 860px) { .rs-sec { grid-template-columns: minmax(0, 1fr); } }
.rs-sec__figs { display: grid; gap: var(--space-3); grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); align-content: start; }
.rs-fig { position: relative; display: block; padding: 0; border: 1px solid var(--line); background: var(--surface-sunken); cursor: zoom-in; }
.rs-fig img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top center; }
.rs-fig span { position: absolute; left: var(--space-2); top: var(--space-2); padding: 2px 6px; background: var(--surface-raised); border: 1px solid var(--line); font: 500 11px/14px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink); }
.rs-fig:hover { border-color: var(--flow); }
.rs-nofig { display: grid; place-items: center; min-height: 160px; padding: var(--space-4); border: 1px dashed var(--line-strong); font: 400 13px/18px var(--font-mono); color: var(--ink-subtle); text-align: center; }
.rs-key { margin: 0; font: 400 12px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-subtle); }
.rs-sec h3 { margin-top: var(--space-1); font: 400 22px/28px var(--font-sans); }
.rs-sec dl { display: grid; grid-template-columns: minmax(0, 8em) minmax(0, 1fr); gap: var(--space-2) var(--space-4); margin: var(--space-3) 0; font: 400 14px/20px var(--font-sans); }
.rs-sec dt { font: 500 11px/20px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-subtle); }
.rs-sec dd { margin: 0; color: var(--ink); min-width: 0; }
details summary { cursor: pointer; font: 500 13px/20px var(--font-mono); color: var(--action); }
.rs-prompt { white-space: pre-wrap; overflow-wrap: anywhere; padding: var(--space-3); background: var(--surface-sunken); border: 1px solid var(--line); font: 400 12px/18px var(--font-mono); color: var(--ink-muted); max-height: 420px; overflow: auto; }
.rs-grid { --c: 220px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--c)), 1fr)); gap: var(--space-5) var(--space-4); list-style: none; margin: var(--space-5) 0 0; padding: 0; }
.rs-card button { all: unset; display: grid; gap: 4px; cursor: pointer; width: 100%; }
.rs-cf { position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden; border: 1px solid var(--line); background: var(--surface-sunken); }
.rs-cf img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
.rs-cf i { position: absolute; right: var(--space-2); top: var(--space-2); padding: 2px 6px; background: var(--ink); color: var(--surface); font: 500 11px/14px var(--font-mono); font-style: normal; }
.rs-card button:hover .rs-cf { border-color: var(--flow); }
.rs-card b { font: 400 14px/19px var(--font-sans); color: var(--ink); }
.rs-card span:last-child { font: 400 12px/16px var(--font-mono); color: var(--ink-muted); }
.rs-card--new b { font-family: var(--font-mono); font-size: 12px; overflow-wrap: anywhere; }
.rs-tw { overflow-x: auto; margin: var(--space-4) 0; }
.rs-panel table { border-collapse: collapse; width: 100%; font: 400 13px/19px var(--font-sans); }
.rs-panel th { text-align: left; font: 500 11px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-subtle); border-bottom: 1px solid var(--line-strong); padding: var(--space-2) var(--space-3) var(--space-2) 0; vertical-align: bottom; }
.rs-panel td { border-bottom: 1px solid var(--line); padding: var(--space-2) var(--space-3) var(--space-2) 0; vertical-align: top; color: var(--ink); min-width: 7em; }
.rs-ref { all: unset; cursor: pointer; padding: 0 4px; border: 1px solid var(--line-strong); font: 500 12px/18px var(--font-mono); color: var(--action); }
.rs-ref:hover { border-color: var(--flow); }
.rs-themes { display: grid; gap: var(--space-6) var(--space-10); grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); }
.rs-th h3 { margin-top: 0; }
.rs-bars { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.rs-bars li { display: grid; grid-template-columns: minmax(0, 13em) minmax(0, 1fr) 4.5em auto; gap: var(--space-3); align-items: center; font: 400 13px/18px var(--font-sans); color: var(--ink); }
.rs-bars--wide li { grid-template-columns: minmax(0, 20em) minmax(0, 1fr) 4.5em; }
.rs-bb { height: 8px; background: var(--surface-sunken); border: 1px solid var(--line); }
.rs-bb i { display: block; height: 100%; background: var(--flow); }
.rs-bv { font: 400 12px/16px var(--font-mono); color: var(--ink-muted); text-align: right; }
.rs-tr { display: inline-flex; align-items: flex-end; gap: 2px; height: 18px; width: 22px; }
.rs-tr i { flex: 1; background: var(--line-strong); }
.rs-tr i:last-child { background: var(--flow); }
@media (max-width: 560px) { .rs-bars li, .rs-bars--wide li { grid-template-columns: minmax(0, 1fr) 4em; } .rs-bars li .rs-bb, .rs-tr { display: none; } }
.rs-cloud { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-4); align-items: baseline; line-height: 1.5; font-family: var(--font-sans); font-weight: 300; color: var(--ink); max-width: 1000px; }
.rs-docs { display: grid; grid-template-columns: minmax(0, 15em) minmax(0, 1fr); gap: var(--space-8); align-items: start; }
@media (max-width: 860px) { .rs-docs { grid-template-columns: minmax(0, 1fr); } }
.rs-docnav { position: sticky; top: 64px; display: grid; gap: 2px; max-height: calc(100vh - 80px); overflow: auto; }
@media (max-width: 860px) { .rs-docnav { position: static; max-height: none; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); } }
.rs-docnav a { display: grid; padding: var(--space-2) var(--space-3); border-left: 2px solid var(--line); color: var(--ink-muted); text-decoration: none; font: 400 14px/19px var(--font-sans); }
.rs-docnav a span { font: 400 11px/15px var(--font-mono); color: var(--ink-subtle); }
.rs-docnav a:hover { color: var(--ink); border-left-color: var(--line-strong); }
.rs-docnav a[aria-current="true"] { color: var(--ink); border-left-color: var(--flow); background: var(--surface-raised); }
.rs-prose { max-width: 86ch; min-width: 0; font: 400 15px/24px var(--font-sans); color: var(--ink); }
.rs-prose p, .rs-prose li { color: var(--ink); }
.rs-prose h2:first-child, .rs-doc > h2:first-of-type { margin-top: 0; }
.rs-prose ul, .rs-prose ol { padding-left: var(--space-5); }
.rs-prose li { margin-bottom: 4px; }
.rs-prose code, .rs-intro code, .rs-note code, dd code, .rs-reqs code { font: 400 0.86em/1 var(--font-mono); padding: 1px 4px; background: var(--surface-sunken); border: 1px solid var(--line); overflow-wrap: anywhere; }
.rs-prose pre { overflow: auto; padding: var(--space-3); background: var(--surface-sunken); border: 1px solid var(--line); font: 400 12px/18px var(--font-mono); }
.rs-prose pre code { padding: 0; border: 0; background: none; font: inherit; }
.rs-prose blockquote { margin: var(--space-4) 0; padding-left: var(--space-4); border-left: 2px solid var(--flow); color: var(--ink-muted); }
.rs-prose hr { border: 0; border-top: 1px solid var(--line-strong); margin: var(--space-8) 0; }
.rs-reqs { display: grid; gap: var(--space-3); font: 400 14px/21px var(--font-sans); }
.rs-lb { position: fixed; inset: 0; z-index: 50; display: grid; grid-template-rows: auto minmax(0, 1fr); background: var(--surface); padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px); }
.rs-lb__bar { display: flex; gap: var(--space-3); align-items: center; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--line); font: 400 13px/18px var(--font-mono); color: var(--ink-muted); }
.rs-lb__bar b { flex: 1; color: var(--ink); font-weight: 500; overflow-wrap: anywhere; }
.rs-lb__bar a { color: var(--action); }
.rs-lb button { min-height: 36px; padding: 0 var(--space-3); border: 1px solid var(--line-strong); background: var(--surface-raised); color: var(--ink); font: 500 13px/16px var(--font-mono); cursor: pointer; }
.rs-lb__body { overflow: auto; display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--space-6); padding: var(--space-5) var(--space-4); align-items: start; }
.rs-lb__body.is-img { grid-template-columns: minmax(0, 1fr); }
@media (max-width: 860px) { .rs-lb__body { grid-template-columns: minmax(0, 1fr); } }
.rs-lb__body img { max-width: 100%; height: auto; display: block; margin: 0 auto; border: 1px solid var(--line); }
.rs-desc { font: 400 14px/21px var(--font-sans); color: var(--ink); }
.rs-desc h3 { font: 400 22px/28px var(--font-sans); margin: 0 0 var(--space-3); }
.rs-desc h4 { margin: var(--space-4) 0 var(--space-1); font: 500 11px/16px var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-subtle); }
.rs-desc ul { margin: 0; padding-left: var(--space-5); }
.rs-kw { display: flex; flex-wrap: wrap; gap: 6px; }
.rs-kw span { padding: 2px 8px; border: 1px solid var(--line); background: var(--surface-raised); font: 400 12px/18px var(--font-mono); color: var(--ink-muted); }
.rs-copy { margin-top: var(--space-2); }
'''

JS = r'''
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var DESC = JSON.parse(document.getElementById('rs-desc').textContent), FILES = JSON.parse(document.getElementById('rs-files').textContent);
  var TABS = $$('.rs-tabs a').map(function (a) { return a.getAttribute('href').slice(1); });
  function tab() {
    var h = location.hash.slice(1), t = h.split('-')[0];
    var id = TABS.indexOf(h) >= 0 ? h : ({ cp: 'concepts', n: 'notes', s: 'skills' })[t] || (TABS.indexOf(t) >= 0 ? t : 'overview');
    $$('.rs-panel').forEach(function (p) { p.hidden = p.id !== id; });
    $$('.rs-tabs a').forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'page' : 'false'); });
    if (t === 'n' || t === 's') { var d = $('[data-doc="' + h.slice(2) + '"]', $('#' + id)); if (d) showDoc($('#' + id), h.slice(2)); }
    var el = h && h !== id ? document.getElementById(h) : null;
    if (el && t === 'cp') el.scrollIntoView(); else if (!el) window.scrollTo(0, 0);
  }
  function showDoc(panel, id) {
    $$('.rs-docnav a', panel).forEach(function (a) { a.setAttribute('aria-current', a.dataset.doc === id ? 'true' : 'false'); });
    $$('.rs-doc', panel).forEach(function (d) { d.hidden = d.dataset.doc !== id; });
    var top = panel.getBoundingClientRect().top + window.scrollY - 60;
    if (window.scrollY > top) window.scrollTo(0, top);
  }
  window.addEventListener('hashchange', tab); tab();
  // concepts filter
  $$('[data-cf]').forEach(function (b) { b.onclick = function () {
    $$('[data-cf]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    var f = b.dataset.cf;
    $$('.rs-sec').forEach(function (s) { s.hidden = f !== 'all' && s.dataset.s !== f; });
    $$('.rs-page').forEach(function (p) { p.hidden = !$$('.rs-sec', p).some(function (s) { return !s.hidden; }); });
  }; });
  // image filters
  var fam = '', era = '', q = '';
  function filt() {
    var n = 0;
    $$('.rs-card').forEach(function (c) {
      var ok = (!fam || c.dataset.fam === fam) && (!era || c.dataset.era === era) && (!q || q.split(/\s+/).every(function (w) { return c.dataset.q.indexOf(w) >= 0; }));
      c.hidden = !ok; if (ok) n++;
    });
    $('#rs-icount').textContent = n + ' of ' + $$('.rs-card').length + ' images';
  }
  $$('[data-ff]').forEach(function (b) { b.onclick = function () { fam = fam === b.dataset.ff ? '' : b.dataset.ff; $$('[data-ff]').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.ff === fam ? 'true' : 'false'); }); filt(); }; });
  $$('[data-fe]').forEach(function (b) { b.onclick = function () { era = era === b.dataset.fe ? '' : b.dataset.fe; $$('[data-fe]').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.fe === era ? 'true' : 'false'); }); filt(); }; });
  $('.rs-search').oninput = function () { q = this.value.trim().toLowerCase(); filt(); }; filt();
  // docs
  $$('.rs-docnav a').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); history.replaceState(null, '', a.getAttribute('href')); showDoc(a.closest('.rs-panel'), a.dataset.doc); }; });
  // lightbox
  var lb = $('#rs-lb'), last = null;
  function e(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }
  function list(t, a) { return a && a.length ? '<h4>' + t + '</h4><ul>' + a.map(function (x) { return '<li>' + e(x) + '</li>'; }).join('') + '</ul>' : ''; }
  function open(src, title, side) {
    last = document.activeElement;
    $('.rs-lb__bar b', lb).textContent = title; $('.rs-lb__bar a', lb).href = src;
    var body = $('.rs-lb__body', lb); body.className = 'rs-lb__body' + (side ? '' : ' is-img');
    body.innerHTML = '<div><img src="' + src + '" alt="' + e(title) + '"></div>' + (side || '');
    lb.hidden = false; document.body.style.overflow = 'hidden'; $('button', lb).focus();
  }
  function close() { lb.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); }
  function openImg(n) {
    var f = FILES[n], d = DESC[n]; if (!f) return;
    var side = '<div class="rs-desc">';
    if (d) {
      side += '<p class="rs-key">' + e(n) + ' · ' + e(d.section_kind) + ' · fit ' + e(d.brand_fit) + '/5</p><h3>' + e(d.signature_idea || d.prompted_for) + '</h3>' +
        '<h4>Prompted for</h4><p>' + e(d.prompted_for) + '</p><h4>Style family</h4><p>' + e(d.style_family) + '</p>' +
        list('Art direction', d.art_direction) + list('Composition', d.composition) + list('Layout devices', d.layout_devices) + list('Palette', d.palette) +
        list('Typography', d.typography) + list('Rendering', d.rendering) + list('Line and texture', d.line_and_texture) + list('Motifs', d.motifs) +
        list('UI patterns', d.ui_patterns) + list('Motion it implies', d.motion_implied) + list('Mood', d.mood) +
        '<h4>Text-to-image keywords</h4><div class="rs-kw">' + (d.t2i_keywords || []).map(function (k) { return '<span>' + e(k) + '</span>'; }).join('') + '</div>' +
        '<h4>A prompt that would make it again</h4><pre class="rs-prompt">' + e(d.t2i_prompt) + '</pre><button class="rs-copy" data-copy="' + e(n) + '">Copy prompt</button>' +
        list('What works', d.strengths) + list('What fails', d.weaknesses) + '<h4>Brand fit</h4><p>' + e(d.brand_fit) + ' of 5. ' + e(d.brand_fit_why) + '</p>';
    } else side += '<p class="rs-key">' + e(n) + ' · pass 9b</p><h3>' + e(f) + '</h3><p>Not described yet. The image-prompt-loop skill, stage 1, writes its description and adds it to the atlas.</p>';
    open('design-system/inspiration/gemini/' + f, n + ' · ' + f, side + '</div>');
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('.rs-card button, .rs-ref, .rs-fig, .rs-copy');
    if (!t) return;
    if (t.classList.contains('rs-copy')) {
      var txt = DESC[t.dataset.copy].t2i_prompt;
      try { navigator.clipboard.writeText(txt).then(function () { t.textContent = 'Copied'; }, function () { t.textContent = 'Select the text above to copy'; }); } catch (x) { t.textContent = 'Select the text above to copy'; }
      return;
    }
    if (t.classList.contains('rs-fig')) { open(t.dataset.full, $('img', t).alt); return; }
    openImg(t.dataset.img || t.closest('.rs-card').dataset.n);
  });
  $('button', lb).onclick = close;
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !lb.hidden) close(); });
})();
'''


def main():
    n = sync()
    k = load(os.path.join(ATLAS, 'keywords.json'))
    fam_of = {im['stem'].split('-')[0]: (im['family'], im['era']) for im in k['images']}
    desc = {}
    for f in glob.glob(os.path.join(ATLAS, 'images', '*.json')):
        d = load(f)
        num = os.path.basename(f).split('-')[0]
        d['_fam'], d['_era'] = fam_of.get(num, ('', ''))
        desc[num] = d
    gem = sorted((f for f in os.listdir(os.path.join(INS, 'gemini')) if re.match(r'\d+-.*\.png$', f)), key=lambda f: int(f.split('-')[0]))
    files = {f.split('-')[0]: f for f in gem}
    pg = pages()
    logs, status = concept_logs()
    imgs = concept_images()
    p9, p9b = prompts()
    done = set(imgs)
    waiting = sorted(set(p9b) - done)
    kit = load(os.path.join(ROOT, '.claude', 'skills', 'image-prompt-loop', 'tools', 'kit.json'))
    nsec = sum(len(p['blocks']) for p in pg)
    nlook = sum(1 for p in pg for b in p['blocks'] if b.get('look'))
    looks = len(glob.glob(os.path.join(ROOT, 'assets', 'src', 'blocks', 'look-*.js')))
    cat = os.path.join(ROOT, '.claude', 'skills', 'motion-library', 'catalog.json')
    motion = len(load(cat)) if os.path.exists(cat) else 0
    if isinstance(load(cat), dict):
        motion = len(load(cat).get('examples', load(cat)))
    stats = [('Gemini originals kept', len(gem)), ('Section concepts (pass 9 + 9b)', sum(len(v) for v in imgs.values())),
             ('Sections with a concept', len(done)), ('Sections still queued', len(waiting)),
             ('Images taken apart into keywords', len(desc)), ('Style families', len(k['families'])),
             ('Section looks built', looks), ('Sections drawn with a look, of %d' % nsec, nlook),
             ('Motion examples in the library', motion)]
    link_img = set(files)
    tabs = [('overview', 'Overview'), ('concepts', 'Concepts'), ('images', 'Images taken apart'), ('themes', 'Themes and keywords'),
            ('atlas', 'Style atlas'), ('notes', 'Build notes'), ('skills', 'Skills and briefs')]
    atlas = md(read(os.path.join(ATLAS, 'STYLE-ATLAS.md')), link_img)
    panels = {
        'overview': panel_overview(stats, status, kit),
        'concepts': panel_concepts(pg, imgs, logs, p9, p9b),
        'images': panel_images(desc, k['families'], gem),
        'themes': panel_themes(k),
        'atlas': '<p class="rs-intro">The conclusions: the brand core, the ten families, what combines well, what fails and how to say so in a prompt, the prompt kit, and three ways to unify the looks. Numbers in boxes open that image. Source: <code>design-system/inspiration/style-atlas/STYLE-ATLAS.md</code>.</p><div class="rs-prose">%s</div>' % atlas,
        'notes': panel_notes(pg, link_img),
        'skills': panel_skills(),
    }
    slim = {n_: {kk: v for kk, v in d.items() if not kk.startswith('_') and kk != 'file'} for n_, d in desc.items()}
    page = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Design research | Aquemi</title>
<meta name="robots" content="noindex">
<link rel="icon" href="brand/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Geist+Mono:wght@300;400;500&display=swap">
<link rel="stylesheet" href="design-system/tokens.css">
<link rel="stylesheet" href="assets/site.css">
<link rel="stylesheet" href="studio/studio.css">
<script defer src="studio/studio.js" data-tool="research"></script>
<script src="assets/theme.js"></script>
<!-- Generated by tools/research.py; edit the sources, not this file. -->
<style>%s</style>
</head>
<body>
<header class="rs-head"><div class="rs-in">
 <h1>Design research</h1>
 <p>Pass 9's image loop, start to finish: the Gemini concepts for each section, every image taken apart into words, the themes and design choices they add up to, the build notes, and the skills that run it again.</p>
</div></header>
<nav class="rs-tabs" aria-label="Research sections"><div class="rs-in">%s</div></nav>
<main class="rs-in">%s</main>
<div class="rs-lb" id="rs-lb" hidden role="dialog" aria-modal="true" aria-label="Image"><div class="rs-lb__bar"><b></b><a target="_blank" rel="noopener">Full size ↗</a><button type="button">Close</button></div><div class="rs-lb__body"></div></div>
<script type="application/json" id="rs-desc">%s</script>
<script type="application/json" id="rs-files">%s</script>
<script>%s</script>
</body>
</html>
''' % (CSS, ''.join('<a href="#%s">%s</a>' % t for t in tabs),
       ''.join('<section class="rs-panel" id="%s" aria-label="%s"%s>%s</section>' % (i, esc(t), '' if i == 'overview' else ' hidden', panels[i]) for i, t in tabs),
       json.dumps(slim, ensure_ascii=False).replace('</', '<\\/'), json.dumps(files).replace('</', '<\\/'), JS)
    with open(os.path.join(ROOT, 'research.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(page)
    print('research.html: %d KB; %d records synced; %d concepts on %d sections, %d queued, %d images described'
          % (len(page.encode()) // 1024, n, sum(len(v) for v in imgs.values()), len(done), len(waiting), len(desc)))


if __name__ == '__main__':
    main()
