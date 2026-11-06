"""Studio: development and design tooling for a static website, worked by people and Claude agents.
Python 3.8+, standard library only (image steps use Pillow when it is there). Run from anywhere in the project.

Set up
  python studio/studio.py init [--name "<Project>"]   Start a project on the kit: write studio.config.json from what
                                                      is there, add the studio bar to the site's pages, install skills
  python studio/studio.py install                     Copy the kit's skills into .claude/skills/ and its section into
                                                      AGENTS.md (after updating the kit folder)
  python studio/studio.py doctor                      What this machine has: git, Pillow, network, config

Every day
  python studio/studio.py about [tool]                What each tool is, reads, writes; how to refresh it; its skill
  python studio/studio.py status                      Which tools a change made stale
  python studio/studio.py refresh [tool ...] [--history]
                                                      Run every generator in order, then the project's checks and
                                                      `check`. Name tools to refresh only those
  python studio/studio.py check                       The studio's rules and a dry-run release of the live site
  python studio/studio.py build                       Write studio/web/studio.js (the bar) and the page index

Tools
  python studio/studio.py pages                       Write <data.dir>/pages.json, the kit's view of the site
  python studio/studio.py history                     Page history from the production branch (heavy; run there)
  python studio/studio.py gallery                     Media gallery manifest and thumbnails (Pillow)
  python studio/studio.py atlas                       Style atlas index from image descriptions
  python studio/studio.py prompts <out.json> [ids]    One image prompt per site section, from the prompt kit
  python studio/studio.py scan <url> [--max N] [--name <id>]
                                                      Take a site apart: sitemap, outlines, calls to action, copy
  python studio/studio.py scan compare <site> [<our page>]
                                                      Words and structure they use that we don't
  python studio/studio.py scan list                   Scanned sites
  python studio/studio.py motion search "<words>"     The Subframe Motion library (also: get <slug>, guide <topic>)

Ship
  python studio/studio.py release <out> [--from <checkout>]
                                                      The live site only: config live.keep, studio blocks cut
  python studio/studio.py assemble <site> <copy>=<checkout> ...
                                                      Build the GitHub Pages site from branch checkouts

Read studio/README.md first. A project describes itself in studio.config.json at its root; the kit never names one.
"""
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, 'lib'))

import config  # noqa: E402
import core  # noqa: E402


def opt(a, name, default=None):
    return a[a.index(name) + 1] if name in a and a.index(name) + 1 < len(a) else default


def main():
    a = sys.argv[1:]
    cmd = a[0] if a else 'about'
    rest = a[1:]
    if cmd in ('-h', '--help', 'help'):
        print(__doc__)
        return
    if cmd == 'init':
        core.init(os.path.dirname(HERE),  # the project is the folder the kit sits in
                  opt(rest, '--name'), '--force' in rest)
        return
    P = config.load()
    if cmd == 'about':
        core.about(P, rest[0] if rest else None)
    elif cmd == 'status':
        core.status(P)
    elif cmd == 'build':
        core.build(P)
    elif cmd == 'check':
        sys.exit(core.check(P))
    elif cmd == 'refresh':
        core.refresh(P, [x for x in rest if not x.startswith('--')], '--history' in rest)
    elif cmd == 'install':
        core.install(P)
        core.build(P)
    elif cmd == 'doctor':
        core.doctor(P)
    elif cmd == 'pages':
        import pages
        print('%d pages -> %s/pages.json' % (len(pages.write_index(P)), P.cfg['data']['dir']))
    elif cmd == 'history':
        import history
        history.run(P)
        core.history_sw(P)
    elif cmd == 'gallery':
        prod = P.cfg['gallery'].get('producer')
        if prod:
            sys.exit(subprocess.run(core.argv(prod), cwd=P.root, env=core.env(P)).returncode)
        import gallery
        gallery.run(P)
    elif cmd == 'atlas':
        import atlas
        prod = P.cfg['atlas'].get('producer')
        if prod:
            r = subprocess.run(core.argv(prod), cwd=P.root, env=core.env(P)).returncode
            if r:
                sys.exit(r)
        atlas.run(P)
    elif cmd == 'prompts' and rest:
        sys.exit(subprocess.run([core.PY, os.path.join(HERE, 'tools', 'image-loop', 'section_prompts.py')] + rest, cwd=P.root).returncode)
    elif cmd == 'scan':
        import scan
        scan.main(P, rest)
    elif cmd == 'motion':
        sys.exit(subprocess.run([core.PY, os.path.join(HERE, 'tools', 'motion', 'motion.py')] + rest, cwd=P.root).returncode)
    elif cmd == 'release' and rest:
        src = opt(rest, '--from', P.root)
        PS = core.project_at(src, P)
        out = os.path.abspath(rest[0])
        core.release(out, src, PS.cfg['live']['keep'])
        ps = core.release_problems(PS, out)
        for p in ps:
            print('STUDIO', p)
        sys.exit(1 if ps else 0)
    elif cmd == 'assemble' and rest:
        dirs = {}
        for x in rest[1:]:
            if '=' in x:
                k, v = x.split('=', 1)
                dirs[k] = v
        for flag in ('--main', '--staging', '--dev'):  # the older form
            if flag in rest:
                dirs[flag[2:]] = opt(rest, flag)
        core.assemble(P, rest[0], dirs)
    else:
        print(__doc__)
        sys.exit(2)


if __name__ == '__main__':
    main()
