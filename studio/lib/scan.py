"""Site scans: take other sites apart (sitemap, page outlines, calls to action, copy) and compare them with ours.
Standard library only. Data lives in <data.scans> (studio.config.json), one folder per scanned site.

Commands (python studio/studio.py scan ...)
  scan <url> [--max N] [--name <id>] [--delay s]
           Read robots.txt (its Sitemap: lines, and Disallow rules for our user agent and *), then the sitemaps
           (robots, /sitemap.xml, /sitemap_index.xml; indexes and .gz followed). No sitemap: crawl same-host links
           breadth first from the start URL. Fetch up to N pages (default 40, delay 0.5 s between requests): the home
           page, the home page's navigation, then round-robin across top-level sections (first path segment), so a
           long blog does not crowd out the rest. Each page: status, title, meta description, canonical, lang, h1-h3
           outline, main text and its word count, calls to action, nav links, schema.org types, images (and missing
           alt), internal and external links. Pages under 80 words are marked "thin" (often rendered by JavaScript:
           capture them with a browser and `scan import`).
           Writes <scans>/<id>/site.json (sitemap, URL tree, home nav, page summaries), <scans>/<id>/pages/<slug>.json
           (full record with text) and <scans>/index.json. id: the host without www, dots as dashes.
  scan compare <site> [<our page id>]
           Their pages against ours (pages.collect): words and two-word phrases by document share ("they say, we
           don't", "we say, they don't", shared), median words per page, common h2 headings, calls to action, and
           for each of our pages their most similar pages (tf-idf cosine) with both outlines side by side.
           Writes <scans>/<site>/compare.json and prints the top of each list.
  scan compare --all [<our page id>]
           The same against every scanned site at once. Writes <scans>/compare-all.json.
  scan import <site> <file.html> [<url>]
           Add a page saved by hand or by a browser agent (JS-rendered sites) to a scanned site (made if missing when
           a URL is given), then rewrite the index.
  scan list
           The scanned sites, from <scans>/index.json.
"""
import collections
import datetime
import gzip
import hashlib
import html.parser
import json
import math
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

import pages as pages_mod

UA = 'Mozilla/5.0 (compatible; StudioScan/1.0)'
UA_TOKEN = 'studioscan'
THIN = 80
TEXT_CAP = 20000
SITEMAP_CAP = 2000
SITEMAP_FILES = 25
SKIP_EXT = re.compile(r'\.(pdf|jpe?g|png|gif|webp|avif|svg|ico|zip|gz|rar|7z|mp4|mov|webm|mp3|wav|docx?|xlsx?|pptx?|'
                      r'csv|xml|json|txt|css|js|woff2?|ttf|eot|dmg|exe)$', re.I)
CTA_WORDS = re.compile(r'\b(contact|quote|demo|request|start|book|get|talk|download|buy|sign ?up|subscribe|schedule|try|'
                       r'register|join|enquire|inquire|enquiry|inquiry|apply|call|order|shop|speak|learn more)\b', re.I)
CTA_CLASS = re.compile(r'(^|[\s_-])(btn|button|cta)', re.I)
CTA_NOISE = re.compile(r'^(menu|close|search|toggle|open|next|prev(ious)?|play|pause|back|skip|share|x|×|accept( all)?|'
                       r'reject( all)?|ok|got it|allow( all)?|deny|decline|cookie.*|.*cookies?.*|manage (preferences|settings)|'
                       r'more|less|show more|show less|read more|expand|collapse|go|submit search)$', re.I)
BLOCK = {'p', 'div', 'li', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'section', 'article', 'td', 'th', 'tr',
         'dd', 'dt', 'blockquote', 'figcaption', 'label', 'button', 'table', 'header', 'footer', 'nav', 'main', 'aside',
         'form', 'option', 'hr', 'summary', 'details'}
ROLES = {'navigation': 'nav', 'banner': 'header', 'contentinfo': 'footer', 'complementary': 'aside', 'main': 'main'}
CHROME = {'nav', 'header', 'footer', 'aside'}


def squash(s):
    return re.sub(r'\s+', ' ', s or '').strip()


def now():
    return datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()


def say(*a):
    print(*a)
    sys.stdout.flush()


# ---------------------------------------------------------------- network

def fetch(url, timeout=20, tries=2, accept='text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'):
    """(status, final url, content type, bytes, error). status 0 when the site could not be reached."""
    err = ''
    for i in range(tries):
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': accept, 'Accept-Encoding': 'gzip',
                                                   'Accept-Language': 'en;q=0.9,*;q=0.5'})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                body = r.read(6 * 1024 * 1024)
                if (r.headers.get('Content-Encoding') or '').lower() == 'gzip' or body[:2] == b'\x1f\x8b':
                    try:
                        body = gzip.decompress(body)
                    except OSError:
                        pass
                return r.status, r.geturl(), r.headers.get('Content-Type') or '', body, ''
        except urllib.error.HTTPError as e:
            if e.code < 500 or i == tries - 1:
                return e.code, url, e.headers.get('Content-Type') or '' if e.headers else '', b'', 'HTTP %d' % e.code
            err = 'HTTP %d' % e.code
        except Exception as e:  # URLError, timeout, connection reset, bad TLS
            err = str(getattr(e, 'reason', e)) or e.__class__.__name__
        time.sleep(1)
    return 0, url, '', b'', err


def decode(body, ctype):
    m = re.search(r'charset=([\w-]+)', ctype or '', re.I) or re.search(rb'<meta[^>]+charset=["\']?([\w-]+)', body[:4096], re.I)
    cs = m.group(1) if m else 'utf-8'
    cs = cs.decode('ascii', 'ignore') if isinstance(cs, bytes) else cs
    try:
        return body.decode(cs, 'replace')
    except LookupError:
        return body.decode('utf-8', 'replace')


def host_of(url):
    return (urllib.parse.urlsplit(url).hostname or '').lower()


def bare(host):
    return host[4:] if host.startswith('www.') else host


def same_host(url, host):
    return bare(host_of(url)) == bare(host)


def clean_url(url, keep_query=False):
    u = urllib.parse.urlsplit(urllib.parse.urldefrag(url)[0])
    if u.scheme not in ('http', 'https'):
        return ''
    path = u.path or '/'
    return urllib.parse.urlunsplit((u.scheme, u.netloc.lower(), path, u.query if keep_query else '', ''))


# ---------------------------------------------------------------- robots and sitemaps

class Robots:
    def __init__(self, text):
        self.sitemaps, groups, agents, rules, last_was_agent = [], [], [], [], False
        for line in (text or '').splitlines():
            line = line.split('#', 1)[0].strip()
            if ':' not in line:
                continue
            k, v = [x.strip() for x in line.split(':', 1)]
            k = k.lower()
            if k == 'sitemap':
                self.sitemaps.append(v)
            elif k == 'user-agent':
                if not last_was_agent and agents:
                    groups.append((agents, rules))
                    agents, rules = [], []
                agents.append(v.lower())
                last_was_agent = True
                continue
            elif k in ('allow', 'disallow') and agents:
                rules.append((k, v))
            last_was_agent = False
        if agents:
            groups.append((agents, rules))
        mine = [r for a, r in groups if any(x != '*' and len(x) > 3 and x in UA_TOKEN for x in a)]
        star = [r for a, r in groups if '*' in a]
        self.rules = [x for r in (mine or star) for x in r]

    def allowed(self, url):
        u = urllib.parse.urlsplit(url)
        path = (u.path or '/') + ('?' + u.query if u.query else '')
        best, verdict = -1, True
        for k, v in self.rules:
            if not v:
                continue
            pat = re.escape(v).replace(r'\*', '.*')
            if pat.endswith(r'\$'):
                pat = pat[:-2] + '$'
            if re.match(pat, path) and len(v) > best:
                best, verdict = len(v), k == 'allow'
        return verdict


def strip_ns(tag):
    return tag.rsplit('}', 1)[-1].lower()


def read_sitemaps(start, robots, delay):
    """All page URLs from the site's sitemaps (followed through indexes), and how many there were in total."""
    queue = list(robots.sitemaps) or [urllib.parse.urljoin(start, '/sitemap.xml'), urllib.parse.urljoin(start, '/sitemap_index.xml')]
    seen, urls, total, files = set(), [], 0, 0
    while queue and files < SITEMAP_FILES:
        sm = queue.pop(0)
        if sm in seen:
            continue
        seen.add(sm)
        status, _, _, body, _ = fetch(sm, accept='application/xml,text/xml,*/*;q=0.5')
        files += 1
        if status != 200 or not body:
            continue
        try:
            root = ET.fromstring(body.lstrip())
        except ET.ParseError:
            # some sites serve a plain text sitemap: one URL per line
            lines = [l.strip() for l in decode(body, '').splitlines() if l.strip().startswith('http')]
            total += len(lines)
            urls += lines[:max(0, SITEMAP_CAP - len(urls))]
            continue
        kind = strip_ns(root.tag)
        locs = [squash(e.text) for e in root.iter() if strip_ns(e.tag) == 'loc' and e.text]
        if kind == 'sitemapindex':
            # pages and services before posts and products, so the cap keeps the site's own structure
            locs.sort(key=lambda u: (bool(re.search(r'post|blog|news|product|tag|categor|author|image|video', u, re.I)), u))
            queue += locs
        else:
            total += len(locs)
            urls += locs[:max(0, SITEMAP_CAP - len(urls))]
        time.sleep(delay / 2)
        if len(urls) >= SITEMAP_CAP and not queue:
            break
    out, s = [], set()
    for u in urls:
        c = clean_url(u, keep_query=True)
        if c and c not in s:
            s.add(c)
            out.append(c)
    return out, total


# ---------------------------------------------------------------- page parsing

class Page(html.parser.HTMLParser):
    SKIP = {'script', 'style', 'noscript', 'svg', 'template', 'iframe', 'object', 'canvas'}

    def __init__(self, url):
        super().__init__(convert_charrefs=True)
        self.url = self.base = url
        self.title, self.desc, self.ogdesc, self.canonical, self.lang = '', '', '', '', ''
        self.outline, self.ctas, self.nav, self.types = [], [], [], []
        self.marks = []           # open landmark elements: [tag, kind, nesting of the same tag]
        self.skip = 0
        self.intitle = False
        self.ld = None
        self.head = None          # [level, [text]]
        self.a = None             # open link
        self.btn = None           # open button
        self.main_parts, self.body_parts = [], []
        self.images = self.images_no_alt = self.internal = self.external = 0
        self.has_main = False

    def kinds(self):
        return {m[1] for m in self.marks}

    def where(self):
        k = self.kinds()
        for x in ('nav', 'header', 'footer', 'aside', 'main'):
            if x in k:
                return x
        return 'body'

    def handle_starttag(self, tag, attrs):
        at = {k: (v or '') for k, v in attrs}
        for m in self.marks:
            if m[0] == tag:
                m[2] += 1
        kind = tag if tag in ('nav', 'header', 'footer', 'aside', 'main') else ROLES.get(at.get('role', '').lower())
        if kind:
            self.marks.append([tag, kind, 0])
            if kind == 'main':
                self.has_main = True
        if tag == 'script' and 'ld+json' in at.get('type', '').lower():
            self.ld = []
        if tag in self.SKIP:
            self.skip += 1
            return
        if self.skip:
            return
        if tag in BLOCK:
            self._text('\n')
            for x in (self.head and self.head[1], self.a and self.a['text'], self.btn and self.btn['text']):
                if isinstance(x, list):
                    x.append(' ')
        if tag == 'html':
            self.lang = at.get('lang', '')
        elif tag == 'base' and at.get('href'):
            self.base = urllib.parse.urljoin(self.url, at['href'])
        elif tag == 'title' and not self.title:
            self.intitle = True
        elif tag == 'meta':
            n = (at.get('name') or at.get('property') or '').lower()
            if n == 'description':
                self.desc = squash(at.get('content'))
            elif n == 'og:description':
                self.ogdesc = squash(at.get('content'))
        elif tag == 'link' and 'canonical' in at.get('rel', '').lower().split():
            self.canonical = urllib.parse.urljoin(self.base, at.get('href', ''))
        elif tag in ('h1', 'h2', 'h3'):
            self.head = [int(tag[1]), []]
        elif tag == 'img':
            self.images += 1
            if 'alt' not in at:
                self.images_no_alt += 1
            if self.a is not None and at.get('alt'):
                self.a['alt'].append(at['alt'])
        elif tag == 'a' and at.get('href') is not None:
            self._close_a()
            self.a = {'href': at['href'], 'text': [], 'alt': [], 'cls': at.get('class', '') + ' ' + at.get('id', ''),
                      'role': at.get('role', ''), 'label': at.get('aria-label') or at.get('title') or '', 'where': self.where(),
                      'kinds': self.kinds()}
        elif tag == 'button':
            self.btn = {'text': [], 'label': at.get('aria-label', ''), 'where': self.where()}
        elif tag == 'input' and at.get('type', '').lower() == 'submit' and at.get('value'):
            self._cta(at['value'], '', self.where())

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in ('img', 'meta', 'link', 'input', 'br', 'hr', 'base'):
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == 'script' and self.ld is not None:
            self._ld(''.join(self.ld))
            self.ld = None
        if tag in self.SKIP:
            self.skip = max(0, self.skip - 1)
        elif not self.skip:
            if tag == 'title':
                self.intitle = False
            elif tag in ('h1', 'h2', 'h3') and self.head:
                h = squash(''.join(self.head[1]))
                if h and not ({'nav', 'footer'} & self.kinds()):
                    self.outline.append({'l': self.head[0], 'h': h[:300]})
                self.head = None
            elif tag == 'a':
                self._close_a()
            elif tag == 'button' and self.btn is not None:
                self._cta(''.join(self.btn['text']) or self.btn['label'], '', self.btn['where'])
                self.btn = None
            if tag in BLOCK:
                self._text('\n')
        for m in [m for m in self.marks if m[0] == tag]:
            if m[2] == 0:
                self.marks.remove(m)
            else:
                m[2] -= 1

    def handle_data(self, d):
        if self.ld is not None:
            self.ld.append(d)
            return
        if self.skip:
            return
        if self.intitle:
            self.title += d
            return
        if self.head:
            self.head[1].append(d)
        if self.a is not None:
            self.a['text'].append(d)
        if self.btn is not None:
            self.btn['text'].append(d)
        self._text(d)

    def _text(self, d):
        k = self.kinds()
        if 'main' in k:
            self.main_parts.append(d)
        if not (k & CHROME):
            self.body_parts.append(d)

    def _cta(self, text, href, where):
        t = squash(text)
        if not t or len(t) > 60 or CTA_NOISE.match(t):
            return
        if any(c['text'].lower() == t.lower() and c['href'] == href for c in self.ctas):
            return
        self.ctas.append({'text': t, 'href': href, 'in': where})

    def _close_a(self):
        a, self.a = self.a, None
        if a is None:
            return
        href = a['href'].strip()
        text = squash(''.join(a['text'])) or squash(a['label']) or squash(' '.join(a['alt']))
        low = href.lower()
        if low.startswith(('javascript:', '#')) or not href:
            return
        if low.startswith(('mailto:', 'tel:')):
            full = href
        else:
            full = urllib.parse.urljoin(self.base, href)
            if host_of(full):
                if same_host(full, host_of(self.url)):
                    self.internal += 1
                else:
                    self.external += 1
        if a['kinds'] & {'nav', 'header'} and text and len(text) <= 80:
            if not any(n['href'] == full and n['text'] == text for n in self.nav):
                self.nav.append({'text': text, 'href': full})
        words = len(text.split())
        if CTA_CLASS.search(a['cls']) or a['role'] == 'button' or (words <= 6 and CTA_WORDS.search(text)) \
                or low.startswith(('mailto:', 'tel:')) and words <= 6:
            self._cta(text, full, a['where'])

    def _ld(self, raw):
        try:
            data = json.loads(raw.strip())
        except ValueError:
            return

        def walk(x):
            if isinstance(x, dict):
                t = x.get('@type')
                for v in (t if isinstance(t, list) else [t]):
                    if isinstance(v, str) and v not in self.types:
                        self.types.append(v)
                for v in x.values():
                    walk(v)
            elif isinstance(x, list):
                for v in x:
                    walk(v)
        walk(data)

    def record(self):
        self._close_a()

        def tidy(parts):
            lines = [squash(l) for l in ''.join(parts).split('\n')]
            return '\n'.join(l for l in lines if l)
        main, body = tidy(self.main_parts), tidy(self.body_parts)
        text = main if self.has_main and len(main.split()) >= 50 else (body if len(body.split()) >= len(main.split()) else main)
        return {'title': squash(self.title), 'description': self.desc or self.ogdesc, 'canonical': self.canonical,
                'lang': self.lang, 'outline': self.outline, 'words': len(text.split()), 'text': text[:TEXT_CAP],
                'ctas': self.ctas, 'nav': self.nav, 'schema': self.types, 'images': self.images,
                'images_no_alt': self.images_no_alt, 'links_internal': self.internal, 'links_external': self.external}


class Links(html.parser.HTMLParser):
    """Every <a href> on a page, for the crawl."""
    def __init__(self, url):
        super().__init__(convert_charrefs=True)
        self.url, self.out = url, []

    def handle_starttag(self, tag, attrs):
        if tag == 'base':
            h = dict(attrs).get('href')
            if h:
                self.url = urllib.parse.urljoin(self.url, h)
        if tag == 'a':
            h = dict(attrs).get('href')
            if h:
                self.out.append(urllib.parse.urljoin(self.url, h.strip()))


def parse(markup, url):
    p = Page(url)
    lk = Links(url)
    for x in (p, lk):
        try:
            x.feed(markup)
            x.close()
        except Exception:
            pass
    rec = p.record()
    return rec, lk.out


# ---------------------------------------------------------------- choosing pages

def section(url):
    segs = [s for s in urllib.parse.urlsplit(url).path.split('/') if s]
    return segs[0].lower() if segs else ''


def depth(url):
    return len([s for s in urllib.parse.urlsplit(url).path.split('/') if s])


def spread(urls, n, first=()):
    """Up to n URLs: `first` in order, then round-robin across top-level sections, shallow pages first."""
    out, s = [], set()
    for u in first:
        if u not in s and len(out) < n:
            out.append(u)
            s.add(u)
    groups = collections.OrderedDict()
    for u in sorted(urls, key=lambda u: (depth(u), len(u), u)):
        if u not in s:
            groups.setdefault(section(u), []).append(u)
    order = sorted(groups, key=lambda g: -len(groups[g]))
    while len(out) < n and any(groups.values()):
        for g in order:
            if groups[g] and len(out) < n:
                u = groups[g].pop(0)
                out.append(u)
                s.add(u)
    return out


def slug_of(url, taken):
    u = urllib.parse.urlsplit(url)
    s = re.sub(r'[^a-z0-9]+', '-', u.path.lower()).strip('-')[:80] or 'home'
    if u.query or s in taken:
        s = (s + '-' + hashlib.sha1(url.encode()).hexdigest()[:6])[:90]
    taken.add(s)
    return s


def tree_of(urls):
    root = {'name': '/', 'path': '/', 'children': [], 'count': 0}
    idx = {'/': root}
    for u in urls:
        segs = [s for s in urllib.parse.urlsplit(u).path.split('/') if s]
        node = root
        root['count'] += 1
        path = ''
        for sg in segs:
            path += '/' + sg
            child = idx.get(path)
            if child is None:
                child = {'name': urllib.parse.unquote(sg), 'path': path, 'children': [], 'count': 0}
                idx[path] = child
                node['children'].append(child)
            child['count'] += 1
            node = child

    def sort(n):
        n['children'].sort(key=lambda c: (-c['count'], c['name']))
        for c in n['children']:
            sort(c)
    sort(root)
    return root


# ---------------------------------------------------------------- storage

def scans_dir(P):
    return P.path(P.cfg['data']['scans'])


def site_dir(P, sid):
    return os.path.join(scans_dir(P), sid)


def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write('\n')


def read_json(path, default=None):
    try:
        with open(path, encoding='utf8') as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def median(xs):
    xs = sorted(xs)
    if not xs:
        return 0
    m = len(xs) // 2
    return xs[m] if len(xs) % 2 else (xs[m - 1] + xs[m]) // 2


def summary(rec):
    s = {k: v for k, v in rec.items() if k not in ('text', 'nav')}
    s['h1'] = [o['h'] for o in rec.get('outline', []) if o['l'] == 1]
    s['h2_count'] = sum(1 for o in rec.get('outline', []) if o['l'] == 2)
    return s


def site_id(url):
    return re.sub(r'[^a-z0-9-]+', '-', bare(host_of(url)).replace('.', '-')).strip('-') or 'site'


def write_index(P):
    d = scans_dir(P)
    sites = []
    if os.path.isdir(d):
        for name in sorted(os.listdir(d)):
            s = read_json(os.path.join(d, name, 'site.json'))
            if not s:
                continue
            ok = [p for p in s.get('pages', []) if p.get('status') in (200, 'imported')]
            ctas = collections.Counter()
            for p in ok:
                for t in {c['text'].lower(): c['text'] for c in p.get('ctas', []) if c.get('in') != 'footer'}.values():
                    ctas[t] += 1
            sites.append({'id': s['id'], 'url': s['url'], 'host': s['host'], 'scanned_at': s.get('scanned_at', ''),
                          'pages': len(ok), 'thin': sum(1 for p in ok if p.get('thin')),
                          'sitemap_urls_total': s.get('sitemap_urls_total', 0),
                          'words_median': median([p.get('words', 0) for p in ok]),
                          'top_ctas': [t for t, _ in ctas.most_common(5)],
                          'compare': os.path.isfile(os.path.join(d, name, 'compare.json')),
                          'findings': os.path.isfile(os.path.join(d, name, 'findings.md'))})
    write_json(os.path.join(d, 'index.json'), {
        'about': 'Generated by python %s/studio.py scan. Do not edit; one folder per scanned site.' % P.kit_rel,
        'generated_at': now(), 'compare_all': os.path.isfile(os.path.join(d, 'compare-all.json')), 'sites': sites})
    return sites


# ---------------------------------------------------------------- scan

def opt(a, name, default=None):
    return a[a.index(name) + 1] if name in a and a.index(name) + 1 < len(a) else default


def scan(P, url, n=40, sid=None, delay=0.5):
    if not re.match(r'https?://', url):
        url = 'https://' + url
    url = clean_url(url) or url
    say('Scanning %s (up to %d pages)' % (url, n))
    status, final, ctype, body, err = fetch(url)
    if status == 0:
        say('Could not reach %s: %s' % (url, err))
        return 1
    if status >= 400 and not body:
        say('%s answered HTTP %d. Check the address, or capture the pages with a browser and use `scan import`.' % (url, status))
        return 1
    home = clean_url(final) or url
    host = host_of(home)
    sid = sid or site_id(home)
    root = '%s://%s/' % (urllib.parse.urlsplit(home).scheme, host)

    rs, _, _, rbody, _ = fetch(urllib.parse.urljoin(root, '/robots.txt'), accept='text/plain,*/*')
    robots = Robots(decode(rbody, 'text/plain') if rs == 200 else '')
    if not robots.allowed(home):
        say('robots.txt disallows %s for crawlers; not scanning it.' % home)
        return 1

    sitemap, total = read_sitemaps(root, robots, delay)
    sitemap = [u for u in sitemap if same_host(u, host)]
    say('  robots.txt: %s; sitemap: %d URLs%s' % ('found' if rs == 200 else 'none', total,
                                                  '' if sitemap else ' (none usable, crawling links instead)'))

    taken, records, fetched, queue_links = set(), [], set(), []
    old = read_json(os.path.join(site_dir(P, sid), 'site.json'), {}) or {}
    kept = [p for p in old.get('pages', []) if p.get('source') == 'import']
    taken.update(p['slug'] for p in kept)

    def visit(u, markup_known=None):
        if u in fetched:
            return None
        fetched.add(u)
        if markup_known is not None:
            st, fin, ct, b, e = markup_known
        else:
            time.sleep(delay)
            st, fin, ct, b, e = fetch(u)
        rec = {'url': u, 'path': urllib.parse.urlsplit(u).path or '/', 'status': st, 'section': section(u), 'source': 'scan'}
        if st != 200 or not b:
            rec.update(error=e or 'HTTP %d' % st)
            say('  %-4s %s' % (st or '--', u))
            records.append(rec)
            return None
        if 'html' not in ct.lower() and not b.lstrip()[:200].lower().startswith((b'<!doctype html', b'<html')):
            return None
        page, links = parse(decode(b, ct), clean_url(fin, keep_query=True) or u)
        rec.update(page)
        rec['thin'] = page['words'] < THIN
        rec['slug'] = slug_of(u, taken)
        records.append(rec)
        say('  200  %s  %d words%s' % (rec['path'], rec['words'], '  (thin)' if rec['thin'] else ''))
        return links

    def ok(u):
        return u and same_host(u, host) and not SKIP_EXT.search(urllib.parse.urlsplit(u).path) and robots.allowed(u)

    home_links = visit(home, (status, final, ctype, body, err)) or []
    home_rec = records[0] if records else {}
    nav_first = []
    for x in home_rec.get('nav', []):
        c = clean_url(x['href'])
        if ok(c) and c != home and c not in nav_first:
            nav_first.append(c)
    nav_first = sorted(nav_first, key=depth)[:max(1, n // 2)]   # top-level pages of the menu first

    def html_count():
        return sum(1 for r in records if r.get('status') == 200 and 'slug' in r)

    if sitemap:
        for u in spread([u for u in sitemap if ok(u) and u != home], n * 2, nav_first):
            if html_count() >= n:
                break
            visit(u)
        found = sitemap
    else:
        pool = set()
        for l in home_links:
            c = clean_url(l)
            if ok(c):
                pool.add(c)
        found = set(pool) | {home}
        first = list(nav_first)
        done = collections.Counter(section(u) for u in fetched)
        while html_count() < n:
            cand = [u for u in pool if u not in fetched]
            if not cand:
                break
            nxt = [u for u in first if u not in fetched]
            if nxt:
                pick = nxt[0]
            else:  # round-robin: the section fetched least so far, its shallowest page
                size = collections.Counter(section(u) for u in cand)
                pick = min(cand, key=lambda u: (done[section(u)], -size[section(u)], depth(u), len(u), u))
            done[section(pick)] += 1
            links = visit(pick) or []
            for l in links:
                c = clean_url(l)
                if ok(c) and len(found) < SITEMAP_CAP:
                    pool.add(c)
                    found.add(c)
        found = sorted(found)
        total = len(found)

    sd = site_dir(P, sid)
    pd = os.path.join(sd, 'pages')
    os.makedirs(pd, exist_ok=True)
    keep_files = {p['slug'] + '.json' for p in kept}
    for f in os.listdir(pd):
        if f.endswith('.json') and f not in keep_files:
            os.remove(os.path.join(pd, f))
    for r in records:
        if 'slug' in r:
            write_json(os.path.join(pd, r['slug'] + '.json'), r)
    scanned = [r['url'] for r in records]
    allurls = list(found) + [u for u in scanned if u not in set(found)]
    site = {'id': sid, 'url': home, 'host': host, 'scanned_at': now(), 'max': n,
            'robots': rs == 200, 'sitemap_found': bool(sitemap), 'sitemap_urls_total': total,
            'sitemap': allurls[:SITEMAP_CAP], 'tree': tree_of(allurls[:SITEMAP_CAP]),
            'nav': home_rec.get('nav', []), 'pages': [summary(r) for r in records] + kept}
    write_json(os.path.join(sd, 'site.json'), site)
    write_index(P)
    good = [r for r in records if 'slug' in r]
    thin = [r for r in good if r['thin']]
    say('%d pages -> %s/%s/ (median %d words)' % (len(good), P.cfg['data']['scans'], sid, median([r['words'] for r in good])))
    if thin:
        say('%d thin page(s) (under %d words), probably rendered by JavaScript. A browser capture may be needed: save the '
            'rendered HTML and run `python %s/studio.py scan import %s <file.html> <url>`.' % (len(thin), THIN, P.kit_rel, sid))
    say('Next: python %s/studio.py scan compare %s' % (P.kit_rel, sid))
    return 0


def import_page(P, sid, file, url=None):
    if not os.path.isfile(file):
        say('No such file: %s' % file)
        return 1
    sd = site_dir(P, sid)
    site = read_json(os.path.join(sd, 'site.json'))
    markup = open(file, encoding='utf8', errors='replace').read()
    if not url:
        m = re.search(r'<link[^>]+rel=["\']?canonical["\']?[^>]*href=["\']([^"\']+)', markup, re.I)
        if m:
            url = m.group(1)
        elif site:
            url = site['url'].rstrip('/') + '/' + re.sub(r'\.html?$', '', os.path.basename(file))
    if not site:
        if not re.match(r'https?://', url or ''):
            say('No scanned site "%s". Give the page URL to start one: scan import %s <file.html> <url>' % (sid, sid))
            return 1
        site = {'id': sid, 'url': clean_url(urllib.parse.urljoin(url, '/')), 'host': host_of(url), 'scanned_at': now(),
                'robots': False, 'sitemap_found': False, 'sitemap_urls_total': 0, 'sitemap': [], 'nav': [], 'pages': []}
    url = clean_url(url, keep_query=True) or url
    page, _ = parse(markup, url)
    others = [p for p in site['pages'] if p.get('url') != url]
    taken = {p.get('slug') for p in others if p.get('slug')}
    rec = {'url': url, 'path': urllib.parse.urlsplit(url).path or '/', 'status': 'imported', 'section': section(url),
           'source': 'import', 'file': os.path.basename(file)}
    rec.update(page)
    rec['thin'] = page['words'] < THIN
    rec['slug'] = slug_of(url, taken)
    write_json(os.path.join(sd, 'pages', rec['slug'] + '.json'), rec)
    site['pages'] = others + [summary(rec)]
    if url not in site['sitemap']:
        site['sitemap'].append(url)
    site['tree'] = tree_of(site['sitemap'])
    site['sitemap_urls_total'] = max(site.get('sitemap_urls_total', 0), len(site['sitemap']))
    if not site.get('nav') and rec['path'] == '/':
        site['nav'] = page['nav']
    write_json(os.path.join(sd, 'site.json'), site)
    write_index(P)
    say('Imported %s into %s: %d words, %d headings, %d calls to action%s' % (
        rec['path'], sid, rec['words'], len(rec['outline']), len(rec['ctas']), '  (still thin)' if rec['thin'] else ''))
    return 0


# ---------------------------------------------------------------- compare

STOP = set('''a about above after again against all almost also although always am among an and another any anyone
anything are aren't around as at be because been before being below between both but by can can't cannot could couldn't
did didn't do does doesn't doing don't down during each either else even ever every few for from further get gets got had
hadn't has hasn't have haven't having he her here here's hers herself him himself his how how's however i i'd i'll i'm
i've if in into is isn't it it's its itself just let's like made make makes many may me might more most much must
mustn't my myself near need needs neither never new no nor not now of off often on once one only onto or other others
ought our ours ourselves out over own per please put rather re really said same say says see seen shall shan't she
should shouldn't since so some something still such than that that's the their theirs them themselves then there there's
these they they'd they'll they're they've this those though through thus to too toward towards under until up upon us
use used uses using very via was wasn't way we we'd we'll we're we've well were weren't what what's when when's where
where's whether which while who who's whom whose why why's will with within without won't would wouldn't yet you you'd
you'll you're you've your yours yourself yourselves also etc e g i e vs click here read learn view across along already
amp nbsp quot'''.split())
WORD = re.compile(r"[^\W_]+(?:[-'][^\W_]+)*", re.UNICODE)


def tokens(text):
    """Words in order, None where a stopword or number breaks a phrase."""
    out = []
    for w in WORD.findall((text or '').lower().replace('\u2019', "'")):
        if w in STOP or len(w) < 2 or not re.search(r'[^\W\d_]', w):
            out.append(None)
        else:
            out.append(w[:-2] if w.endswith("'s") else w)
    return out


def terms(text):
    t = tokens(text)
    uni = [w for w in t if w]
    bi = ['%s %s' % (a, b) for a, b in zip(t, t[1:]) if a and b and a != b]
    return uni, bi


def norm_heading(h):
    return squash(re.sub(r'[^\w\s]|\d', ' ', (h or '').lower()))


def their_docs(P, sids):
    docs = []
    for sid in sids:
        sd = site_dir(P, sid)
        site = read_json(os.path.join(sd, 'site.json'))
        if not site:
            continue
        for p in site.get('pages', []):
            if not p.get('slug'):
                continue
            rec = read_json(os.path.join(sd, 'pages', p['slug'] + '.json'))
            if not rec:
                continue
            heads = ' . '.join(o['h'] for o in rec.get('outline', []))
            docs.append({'site': sid, 'slug': rec['slug'], 'path': rec['path'], 'title': rec.get('title', ''),
                         'words': rec.get('words', 0), 'thin': rec.get('thin', False), 'outline': rec.get('outline', []),
                         'ctas': rec.get('ctas', []),
                         'text': ' . '.join([rec.get('title', ''), rec.get('description', ''), heads, rec.get('text', '')])})
    return docs


def our_docs(P):
    out = []
    ps = pages_mod.collect(P)
    ids = re.compile(r'(?<![\w-])(%s)(?![\w-])' % '|'.join(re.escape(p['id']) for p in ps if '-' in p['id']) or '$^')
    for p in ps:
        secs = p.get('sections', [])
        text = p.get('text', '')
        for n in p.get('notes', []):    # open notes are about the page, not its copy
            text = text.replace(squash(n), ' ')
        text = ids.sub(' ', text)       # links to our own pages
        lv = {'h1': 1, 'h2': 2, 'h3': 3}
        out.append({'id': p['id'], 'title': p.get('title', ''), 'group': p.get('group', ''), 'words': len(text.split()),
                    'outline': [{'l': lv.get(s.get('type'), 2), 'h': s['h'], 'type': s.get('type', '')} for s in secs if s.get('h')],
                    'ctas': p.get('ctas') or [{'text': s['h']} for s in secs if s.get('h') and re.search(r'cta|closing|contact', s.get('type', ''), re.I)],
                    'text': ' . '.join([p.get('title', '')] + [s.get('h', '') for s in secs] + [text])})
    return out


def df_of(docs):
    df, tf = collections.Counter(), []
    for d in docs:
        uni, bi = terms(d['text'])
        c = collections.Counter(uni + bi)
        tf.append(c)
        df.update(set(c))
    return df, tf


def term_lists(them, us, tdf, udf, ttf):
    N, M = max(1, len(them)), max(1, len(us))
    min_t = 2 if len(them) >= 3 else 1
    min_u = 2 if len(us) >= 3 else 1

    def where(term, k=3):
        return [them[i]['path'] if 'path' in them[i] else '' for i, c in enumerate(ttf) if term in c][:k]

    def row(t):
        return {'term': t, 'n': 2 if ' ' in t else 1, 'their_pages': tdf[t], 'their_share': round(tdf[t] / N, 3),
                'our_pages': udf.get(t, 0), 'our_share': round(udf.get(t, 0) / M, 3)}
    they = [t for t in tdf if tdf[t] >= min_t and udf.get(t, 0) / M <= min(0.1, tdf[t] / N / 3)]
    we = [t for t in udf if udf[t] >= min_u and tdf.get(t, 0) / N <= min(0.1, udf[t] / M / 3)]
    both = [t for t in tdf if tdf[t] >= min_t and udf.get(t, 0) >= min_u]
    they.sort(key=lambda t: (-tdf[t], -udf.get(t, 0), t))
    we.sort(key=lambda t: (-udf[t], t))
    both.sort(key=lambda t: (-min(tdf[t] / N, udf[t] / M), t))
    cap = 300
    return ([dict(row(t), **{'in': where(t)}) for t in they[:cap]], [row(t) for t in we[:cap]], [row(t) for t in both[:cap]])


def pairs_for(them, us, ttf, utf, only=None, k=3):
    n_docs = len(them) + len(us)
    df = collections.Counter()
    for c in ttf + utf:
        df.update(set(c))

    def vec(c):
        v = {t: (1 + math.log(f)) * math.log((1 + n_docs) / (1 + df[t])) for t, f in c.items() if ' ' not in t}
        n = math.sqrt(sum(x * x for x in v.values())) or 1
        return {t: x / n for t, x in v.items()}
    tv = [vec(c) for c in ttf]
    out = []
    for i, d in enumerate(us):
        if only and d['id'] != only:
            continue
        uv = vec(utf[i])
        scores = []
        for j, v in enumerate(tv):
            if them[j].get('thin'):
                continue
            s = sum(x * v.get(t, 0) for t, x in uv.items())
            scores.append((s, j))
        scores.sort(reverse=True)
        out.append({'ours': {'id': d['id'], 'title': d['title'], 'words': d['words'], 'outline': d['outline']},
                    'matches': [{'site': them[j]['site'], 'slug': them[j]['slug'], 'path': them[j]['path'],
                                 'title': them[j]['title'], 'words': them[j]['words'], 'score': round(s, 3),
                                 'outline': them[j]['outline']} for s, j in scores[:k] if s > 0]})
    return out


def compare(P, sids, label, only=None):
    them = their_docs(P, sids)
    if not them:
        say('No scanned pages for %s. Run: python %s/studio.py scan <url>' % (', '.join(sids) or 'any site', P.kit_rel))
        return 1
    us = our_docs(P)
    if not us:
        say('No pages of ours found (studio.config.json site.pages).')
        return 1
    if only and only not in {d['id'] for d in us}:
        say('No page "%s" of ours. Ours: %s' % (only, ', '.join(d['id'] for d in us)))
        return 1
    tdf, ttf = df_of(them)
    udf, utf = df_of(us)
    they, we, both = term_lists(them, us, tdf, udf, ttf)

    def heads(docs, key):
        c, show = collections.Counter(), {}
        for d in docs:
            seen = set()
            for o in d['outline']:
                if key(o):
                    n = norm_heading(o['h'])
                    if n and n not in seen:
                        seen.add(n)
                        c[n] += 1
                        show.setdefault(n, o['h'])
        return [{'h': show[n], 'norm': n, 'pages': k} for n, k in c.most_common(100)]

    def ctas(docs, skip_footer=True):
        c, show = collections.Counter(), {}
        for d in docs:
            for t in {x['text'].lower(): x['text'] for x in d['ctas'] if not (skip_footer and x.get('in') == 'footer')}.values():
                c[t.lower()] += 1
                show.setdefault(t.lower(), t)
        return [{'text': show[t], 'pages': k} for t, k in c.most_common(60)]

    out = {'about': 'Generated by python %s/studio.py scan compare. Words and structure: their pages against ours.' % P.kit_rel,
           'sites': sids, 'generated_at': now(),
           'theirs': {'pages': len(them), 'thin': sum(1 for d in them if d['thin']),
                      'words_median': median([d['words'] for d in them if not d['thin']] or [0])},
           'ours': {'pages': len(us), 'words_median': median([d['words'] for d in us])},
           'they_say': they, 'we_say': we, 'shared': both,
           'headings': {'theirs': heads(them, lambda o: o['l'] == 2), 'ours': heads(us, lambda o: True)},
           'ctas': {'theirs': ctas(them), 'ours': ctas(us, False),
                    'ours_note': '' if any(d['ctas'] for d in us) else 'Our calls to action are not in the page index: name their fields in studio.config.json site.pages.ctas (JSON adapter), or use buttons and .btn links (HTML adapter).'},
           'pairs': pairs_for(them, us, ttf, utf, only, 5 if only else 3)}
    path = os.path.join(scans_dir(P), 'compare-all.json') if label == '--all' else os.path.join(site_dir(P, sids[0]), 'compare.json')
    write_json(path, out)
    write_index(P)

    def show(title, rows, n):
        say('\n%s' % title)
        for r in rows[:n]:
            say('  %-32s them %3d/%-3d  us %3d/%-3d' % (r['term'][:32], r['their_pages'], len(them), r['our_pages'], len(us)))
    say('Compared %s (%d pages, median %d words) with ours (%d pages, median %d words)' % (
        ', '.join(sids), len(them), out['theirs']['words_median'], len(us), out['ours']['words_median']))
    if out['theirs']['thin']:
        say('%d of their pages are thin (JavaScript?); a browser capture and `scan import` would add them.' % out['theirs']['thin'])
    show('They say, we don\'t: words', [r for r in they if r['n'] == 1], 25)
    show('They say, we don\'t: phrases', [r for r in they if r['n'] == 2], 25)
    show('We say, they don\'t', [r for r in we if r['n'] == 1], 25)
    show('Shared', both, 25)
    say('\nTheir common h2 headings')
    for h in out['headings']['theirs'][:25]:
        say('  %3d  %s' % (h['pages'], h['h'][:80]))
    say('\nTheir calls to action')
    for c in out['ctas']['theirs'][:25]:
        say('  %3d  %s' % (c['pages'], c['text']))
    for p in out['pairs'] if only else []:
        say('\nOur page %s, side by side with their closest pages' % p['ours']['id'])
        for m in p['matches']:
            say('\n  %s %s (score %.2f, %d words)' % (m['site'], m['path'], m['score'], m['words']))
            ours, theirs = p['ours']['outline'], m['outline']
            for i in range(max(len(ours), len(theirs))):
                a = ours[i]['h'] if i < len(ours) else ''
                b = ('  ' * (theirs[i]['l'] - 1) + theirs[i]['h']) if i < len(theirs) else ''
                say('    %-48s | %s' % (a[:48], b[:60]))
    say('\n-> %s' % P.rel(path))
    return 0


def list_sites(P):
    idx = read_json(os.path.join(scans_dir(P), 'index.json'), {}) or {}
    sites = idx.get('sites', [])
    if not sites:
        say('No sites scanned yet. Run: python %s/studio.py scan <url>' % P.kit_rel)
        return 0
    for s in sites:
        say('%-28s %3d pages  %5d in sitemap  median %4d words  %s  %s' % (
            s['id'], s['pages'], s['sitemap_urls_total'], s['words_median'], s['scanned_at'][:10], s['url']))
        if s.get('top_ctas'):
            say('%-28s calls to action: %s' % ('', ' | '.join(s['top_ctas'])))
    return 0


def main(P, args):
    a = list(args)
    if not a or a[0] in ('-h', '--help', 'help'):
        print(__doc__)
        return
    cmd = a[0]
    if cmd == 'list':
        code = list_sites(P)
    elif cmd == 'compare':
        rest = [x for x in a[1:] if x != '--all']
        if '--all' in a:
            idx = read_json(os.path.join(scans_dir(P), 'index.json'), {}) or {}
            code = compare(P, [s['id'] for s in idx.get('sites', [])], '--all', rest[0] if rest else None)
        elif rest:
            code = compare(P, [rest[0]], rest[0], rest[1] if len(rest) > 1 else None)
        else:
            say('Usage: scan compare <site> [<our page id>]  |  scan compare --all [<our page id>]')
            code = 2
    elif cmd == 'import':
        if len(a) < 3:
            say('Usage: scan import <site> <file.html> [<url>]')
            code = 2
        else:
            code = import_page(P, a[1], a[2], a[3] if len(a) > 3 else None)
    elif cmd == 'index':
        write_index(P)
        code = 0
    else:
        try:
            n = int(opt(a, '--max', 40))
            delay = float(opt(a, '--delay', 0.5))
        except ValueError:
            say('--max takes a whole number and --delay seconds')
            sys.exit(2)
        code = scan(P, cmd, n, opt(a, '--name'), delay)
    if code:
        sys.exit(code)
