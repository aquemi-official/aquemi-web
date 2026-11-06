"""Make lossless WebP copies of PNG images, for a site to load instead (studio kit; needs Pillow).

  python studio/tools/images/webp.py <folder> [<folder> ...]
  python studio/studio.py refresh        runs it on studio.config.json images.webp

Writes <name>.webp beside every <name>.png that is newer than its WebP. The PNGs stay the source. Lossless, so masks
and line art stay pixel for pixel the same, usually a quarter to a third smaller.
"""
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow is needed: pip install Pillow')

ROOT = os.getcwd()


def main():
    dirs = sys.argv[1:]
    if not dirs:
        sys.exit(__doc__)
    n = saved = 0
    for d in dirs:
        for f in sorted(os.listdir(d)):
            if not f.endswith('.png'):
                continue
            src, dst = os.path.join(d, f), os.path.join(d, f[:-4] + '.webp')
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                continue
            Image.open(src).save(dst, 'WEBP', lossless=True, method=6)
            saved += os.path.getsize(src) - os.path.getsize(dst)
            n += 1
            print('wrote', os.path.relpath(dst, ROOT))
    print('%d WebP files written, %d KB smaller than their PNGs' % (n, saved // 1024))


if __name__ == '__main__':
    main()
