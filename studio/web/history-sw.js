/* Page history service worker. Serves versions/at/<commit>/<path> from the content-addressed files that
   python studio/studio.py history writes (tree/<commit>.json maps each path to blobs/<ab>/<blob-sha>), so every old
   index.html runs exactly as it shipped. Everything else passes through untouched. */
var BASE = new URL('./', self.location).href;
var AT = new URL('at/', BASE).pathname;
var TREES = {};
var TYPES = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  webp: 'image/webp', gif: 'image/gif', ico: 'image/x-icon', woff2: 'font/woff2', txt: 'text/plain; charset=utf-8',
  md: 'text/plain; charset=utf-8' };

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

function tree(c) {
  return TREES[c] || (TREES[c] = fetch(BASE + 'tree/' + c + '.json').then(function (r) {
    if (!r.ok) { delete TREES[c]; throw new Error('No such version: ' + c); }
    return r.json();
  }));
}

self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || u.pathname.indexOf(AT) !== 0) return;
  var rest = u.pathname.slice(AT.length), i = rest.indexOf('/');
  var c = i < 0 ? rest : rest.slice(0, i);
  var p = i < 0 ? '' : decodeURIComponent(rest.slice(i + 1));
  if (p === '' || p.slice(-1) === '/') p += 'index.html';
  e.respondWith(tree(c).then(function (t) {
    var b = t[p];
    if (!b) return new Response('Not in version ' + c + ': ' + p, { status: 404, headers: { 'Content-Type': 'text/plain' } });
    return fetch(BASE + 'blobs/' + b.slice(0, 2) + '/' + b).then(function (r) {
      if (!r.ok) return r;
      var ext = p.split('.').pop().toLowerCase();
      return new Response(r.body, { status: 200, headers: { 'Content-Type': TYPES[ext] || 'application/octet-stream' } });
    });
  }).catch(function (err) {
    return new Response(String(err.message || err), { status: 404, headers: { 'Content-Type': 'text/plain' } });
  }));
});
