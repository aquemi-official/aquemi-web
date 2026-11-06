"""Save a Gemini capture: python save_capture.py <key> <captured png> <real height> <out dir>
Crops the zoom capture to the image's real height (taller captures pick up page background), copies it to
<out dir>/<key>.png and keeps earlier takes as <key>.vN.png."""
import os, shutil, sys
from PIL import Image
key, src, h, outdir = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
os.makedirs(outdir, exist_ok=True)
im = Image.open(src)
if im.size[1] > h: im = im.crop((0, 0, im.size[0], h))
d = os.path.join(outdir, key + '.png')
if os.path.exists(d):
    k = 2
    while os.path.exists(d.replace('.png', f'.v{k}.png')): k += 1
    d = d.replace('.png', f'.v{k}.png')
im.save(d); print(d, im.size)
