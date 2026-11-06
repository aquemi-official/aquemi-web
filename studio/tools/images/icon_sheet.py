"""Cut a specimen sheet of small line drawings (a grid of spots with captions under each) into icon masks.

    python studio/tools/images/icon_sheet.py <sheet.png> <out dir> <name,name,...> [--frame 34,90,732,1000] [--max 96]

Finds the drawings by themselves: rows of ink taller than --min-h are drawings (captions are short text lines and
are dropped), and inside each row, ink runs separated by more than --gap px are separate drawings. Names are given
left to right, top to bottom; the count must match what it finds. Each drawing becomes a square transparent PNG
mask (lines as alpha, no colour), the same treatment as studio/tools/images/line_art.py, so CSS paints it with a colour token and
one file works on navy and on light sheets.

Needs Pillow (pip install pillow), like studio/tools/images/line_art.py. Not used by the build.
"""
import argparse
import os

from PIL import Image, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('outdir')
ap.add_argument('names', help='comma-separated icon names, left to right, top to bottom')
ap.add_argument('--frame', default='34,90,732,1000', help='x0,y0,x1,y1 inside the sheet border and below its title')
ap.add_argument('--min-h', type=int, default=40, help='ink rows shorter than this are captions (px)')
ap.add_argument('--gap', type=int, default=20, help='blank columns wider than this separate two drawings (px)')
ap.add_argument('--ink', type=int, default=200, help='luminance below this counts as ink when finding drawings')
ap.add_argument('--floor', type=int, default=40, help='darkness below this counts as paper (0-255)')
ap.add_argument('--max', type=int, default=96, help='side of the square output, in px')
ap.add_argument('--bold', type=int, default=1, help='thicken lines by this many px each side first, so they hold at 24-32 px')
a = ap.parse_args()

names = [n.strip() for n in a.names.split(',') if n.strip()]
sheet = Image.open(a.src).convert('L')
x0, y0, x1, y1 = (int(v) for v in a.frame.split(','))
px = sheet.load()


def runs(values, start, gap=0):
    """(start, end) of non-zero runs, merging runs separated by a gap of at most `gap`."""
    out, s, last = [], None, None
    for i, v in enumerate(values):
        if v:
            if s is None:
                s = i
            elif last is not None and i - last > gap + 1:
                out.append((start + s, start + last + 1))
                s = i
            last = i
    if s is not None:
        out.append((start + s, start + last + 1))
    return out


row_ink = [any(px[x, y] < a.ink for x in range(x0, x1)) for y in range(y0, y1)]
bands = [r for r in runs(row_ink, y0) if r[1] - r[0] >= a.min_h]
cells = []
for top, bottom in bands:
    col_ink = [any(px[x, y] < a.ink for y in range(top, bottom)) for x in range(x0, x1)]
    cells += [(left, top, right, bottom) for left, right in runs(col_ink, x0, a.gap)]
if len(cells) != len(names):
    raise SystemExit('found %d drawings, got %d names: %s' % (len(cells), len(names), cells))

os.makedirs(a.outdir, exist_ok=True)
for name, box in zip(names, cells):
    im = sheet.crop(box)
    # darkness: 0 = paper, 255 = line; drop faint paper and pale fill tints, stretch so the darkest line is opaque
    dark = ImageOps.invert(im)
    top = max(dark.getextrema()[1], a.floor + 1)
    dark = dark.point(lambda v: 0 if v < a.floor else min(255, int((v - a.floor) * 255 / (top - a.floor))))
    dark = dark.crop(dark.getbbox())
    if a.bold > 0:
        dark = dark.filter(ImageFilter.MaxFilter(2 * a.bold + 1))
    side = int(max(dark.size) * 1.04)
    sq = Image.new('L', (side, side), 0)
    sq.paste(dark, ((side - dark.width) // 2, (side - dark.height) // 2))
    sq = sq.resize((a.max, a.max), Image.LANCZOS)
    out = Image.new('LA', sq.size, 0)
    out.putalpha(sq)
    path = os.path.join(a.outdir, name + '.png')
    out.save(path, optimize=True)
    print('wrote', path, box)
