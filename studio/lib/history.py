"""Page history: every commit on the production branch, viewable as the site looked then. Standard library; needs git.

    python studio/studio.py history

Writes, from git, into <data.history> (studio.config.json data.history):
  blobs/<ab>/<blob-sha>   each file that ever shipped, stored once (content-addressed)
  tree/<commit>.json      one commit's files: {path: blob-sha}
  index.json              every commit (oldest first): date, author, subject, a hash per page (did this page's copy
                          change?), a design hash (did anything else change?), and the named checkpoints
  sw.js                   the service worker (copied from the kit) that serves at/<commit>/<path> from those files, so
                          every old page runs unchanged
The viewer is studio/web/history.html. Named checkpoints (about ten) are config history.checkpoints:
[{"commit", "title", "note"}]. history.skip lists path prefixes that are not part of the site a visitor loads (the kit,
its data and the config are always skipped); history.copy lists prefixes that count as copy rather than design.
Rerun after every push to the production branch you want in the history.
"""
import hashlib
import json
import os
import shutil
import subprocess

import config
import pages as pagesmod


def git(root, *args, text=True):
    out = subprocess.run(['git', '-C', root, *args], check=True, capture_output=True).stdout
    return out.decode('utf-8') if text else out


class BlobReader(pagesmod.GitReader):
    """Reads a commit's files by blob id, each blob once across the whole history."""
    def __init__(self, root, commit, tree, cache):
        super().__init__(root, commit, tree)
        self.cache = cache

    def read(self, rel):
        b = self.tree.get(rel)
        if b is None:
            return super().read(rel)  # a file the history skips (a generated content file, say): read it from git
        if b not in self.cache:
            self.cache[b] = git(self.root, 'cat-file', 'blob', b)
        return self.cache[b]


def run(P=None):
    P = P or config.load()
    h = P.cfg['history']
    out = P.path(P.cfg['data']['history'])
    skip = tuple(h.get('skip', [])) + (P.kit_rel + '/', P.cfg['data']['dir'] + '/', P.cfg['data']['history'] + '/', config.CONFIG_NAME, '.github/', '.claude/')
    copyp = tuple(h.get('copy', []))
    branch = h.get('branch', 'main')
    # the published branch: origin's copy when there is one (a local branch may be behind), else the local one
    try:
        git(P.root, 'rev-parse', '--verify', '-q', 'origin/' + branch)
        ref = 'origin/' + branch
    except subprocess.CalledProcessError:
        ref = branch
    for sub in ('blobs', 'tree'):
        shutil.rmtree(os.path.join(out, sub), ignore_errors=True)
        os.makedirs(os.path.join(out, sub))
    log = git(P.root, 'log', ref, '--reverse', '--date-order', '--format=%H%x1f%cI%x1f%an%x1f%s%x1f%P').splitlines()
    named = {}
    for cp in h.get('checkpoints', []):
        try:
            named[git(P.root, 'rev-parse', cp['commit']).strip()] = (cp['title'], cp.get('note', ''))
        except subprocess.CalledProcessError:
            print('checkpoint %s is not in this repository, skipped' % cp['commit'])
    adapter = P.cfg['site']['pages'].get('adapter', 'html')
    labels, urls, have, commits, size, cache = {}, {}, set(), [], 0, {}
    for line in log:
        full, date, author, subject, parents = line.split('\x1f')
        tree, design = {}, hashlib.sha1()
        for row in git(P.root, 'ls-tree', '-r', full).splitlines():
            meta, path = row.split('\t', 1)
            kind, blob = meta.split()[1:3]
            if kind != 'blob' or path.startswith(skip):
                continue
            tree[path] = blob
            if not path.startswith(copyp):
                design.update((path + blob).encode())
            if blob not in have:
                have.add(blob)
                dest = os.path.join(out, 'blobs', blob[:2], blob)
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                data = git(P.root, 'cat-file', 'blob', blob, text=False)
                size += len(data)
                with open(dest, 'wb') as f:
                    f.write(data)
        # this commit's pages through the project's own adapter (html pages are cached by blob, so this stays fast)
        reader = BlobReader(P.root, full, tree, cache)
        try:
            ps = pagesmod.collect(P, reader) if adapter != 'command' else []
        except Exception:
            ps = []
        for p in ps:
            labels[p['id']] = ((p['group'] + ' · ') if p.get('group') else '') + p['title']
            urls[p['id']] = p['url']
        with open(os.path.join(out, 'tree', full[:7] + '.json'), 'w', encoding='utf-8') as f:
            json.dump(tree, f, separators=(',', ':'))
        item = {'c': full[:7], 'h': full, 'date': date, 'author': author, 'subject': subject,
                'merge': len(parents.split()) > 1, 'design': design.hexdigest()[:8], 'pages': pagesmod.page_hashes(ps)}
        if full in named:
            item['title'], item['note'] = named[full]
        commits.append(item)
    with open(os.path.join(out, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump({'branch': branch, 'entry': P.cfg['site']['entry'], 'commits': commits, 'labels': labels, 'urls': urls}, f, separators=(',', ':'))
    print('%d commits on %s, %d files stored once (%.1f MB), %d checkpoints -> %s'
          % (len(commits), branch, len(have), size / 1e6, sum(1 for c in commits if 'title' in c), P.cfg['data']['history']))
