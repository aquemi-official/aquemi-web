"""Turn a black-on-white line drawing (for example one generated in Gemini) into a transparent PNG mask.

    python studio/tools/images/line_art.py <input image> <output.png> [--inset 0.03] [--max 900]

The output keeps only the lines, as alpha on black, cropped to the drawing with a small margin.
The site never shows it as an image: CSS uses it as a mask (`mask-image`) and paints it with a
colour token, so one file works in light and dark themes and follows token changes.
A site paints it with CSS mask-image and a colour token, so one file works in light and dark themes.

Needs Pillow (pip install pillow). Not used by the build.
"""
import argparse

from PIL import Image, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--inset', type=float, default=0.03, help='fraction trimmed from each edge first (drops capture borders)')
ap.add_argument('--max', type=int, default=900, help='longest side of the output, in px')
ap.add_argument('--floor', type=int, default=40, help='darkness below this counts as paper (0-255)')
a = ap.parse_args()

im = Image.open(a.src).convert('L')
w, h = im.size
dx, dy = int(w * a.inset), int(h * a.inset)
im = im.crop((dx, dy, w - dx, h - dy))
# darkness: 0 = white paper, 255 = black line; drop faint paper noise, stretch the rest
dark = ImageOps.invert(im).point(lambda v: 0 if v < a.floor else min(255, int((v - a.floor) * 255 / (255 - a.floor))))
box = dark.getbbox()
if not box:
    raise SystemExit('no lines found')
pad = int(max(dark.size) * 0.02)
box = (max(0, box[0] - pad), max(0, box[1] - pad), min(dark.width, box[2] + pad), min(dark.height, box[3] + pad))
dark = dark.crop(box)
dark.thumbnail((a.max, a.max), Image.LANCZOS)
out = Image.new('LA', dark.size, 0)
out.putalpha(dark)
out.save(a.out, optimize=True)
print('wrote', a.out, out.size)
