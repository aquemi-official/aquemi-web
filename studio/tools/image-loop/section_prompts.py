"""Text -> image: one image prompt per site section, built from the site's pages and a prompt kit.

  python studio/studio.py prompts <out queue.json> [page ids ...] [--kit <prompt-kit.json>]

The prompt kit (default: studio.config.json data.prompt_kit) is
  {"pre": "<fixed head: what to draw + the brand core>", "suf": "<fixed tail: the quality bar + negative keywords>",
   "directions": ["<art direction module>", ...], "skip_types": ["faq", ...], "seed": 9}
The pages come from the kit's page adapters (studio.config.json site.pages), so this works for any site.
Each queue item: {key: "<page>.<section index>", page, i, type, h, dir, mid}. The prompt sent is pre + mid + suf, so
the per-image call carries only `mid` (see gemini-helpers.js). Directions rotate in shuffled rounds so neighbouring
sections differ. Hand-edit a `mid` when a section deserves a specific idea (a hybrid from the style atlas, say).
"""
import json
import os
import random
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', 'lib'))
import config  # noqa: E402
import pages as pagesmod  # noqa: E402


def clean(s):
    return re.sub(r'\s+', ' ', str(s)).strip()


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    P = config.load()
    kitp = a[a.index('--kit') + 1] if '--kit' in a else P.path(P.cfg['data']['prompt_kit'])
    a = [x for i, x in enumerate(a) if x != '--kit' and (i == 0 or a[i - 1] != '--kit')]
    out, want = a[0], a[1:]
    if not os.path.exists(kitp):
        sys.exit('No prompt kit at %s: write one (see the studio-image-loop skill) or pass --kit' % kitp)
    kit = json.load(open(kitp, encoding='utf-8'))
    pages = pagesmod.collect(P)
    if want:
        pages = [p for w in want for p in pages if p['id'] == w]
    skip = set(kit.get('skip_types', ['faq', 'related', 'form']))
    rnd = random.Random(kit.get('seed', 9))
    dirs = list(kit['directions'])
    seq, q = [], []
    for p in pages:
        for i, s in enumerate(p['sections']):
            if s.get('type') in skip or not s.get('h') or len(s.get('text', '').split()) < 3:
                continue
            if not seq:
                rnd.shuffle(dirs)
                seq = dirs[:]
            d = seq.pop(0)
            mid = ("The section is on the page '%s' and is titled '%s'. It must communicate: %s. Art direction for this one: %s."
                   % (p['title'], clean(s.get('h', '')), clean(s.get('text', ''))[:900], d))
            q.append({'key': '%s.%d' % (p['id'], i), 'page': p['id'], 'i': i, 'type': s.get('type'), 'h': s.get('h'), 'dir': d, 'mid': mid})
    json.dump(q, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(q), 'prompts ->', out)


if __name__ == '__main__':
    main()
