/* Aquemi site service worker: repeat visits load from the device, deploys still show at once.
   - Page loads (navigations) go to the network first, so a new deploy is seen on the next load; the cached copy is only
     used when the network fails.
   - Versioned files (?v=<content hash>, written into index.html by tools/design_system.py build) and the static folders
     (fonts, icons, illustrations, brand, vendor) are served from the cache once fetched: a new version is a new URL.
   - CACHE is a hash of all of those, stamped by the build, so any change starts a fresh cache and the old one is deleted.
   - Nothing else is touched: other files use the network and the browser's own cache, and versions/ keeps its own worker. */
const CACHE = 'aquemi-4345a83dad';
const STATIC = /^(assets\/(fonts|icons|illustrations|vendor)|brand)\//;

self.addEventListener('install', function () { self.skipWaiting() });

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('aquemi-') === 0 && k !== CACHE }).map(function (k) { return caches.delete(k) }));
  }).then(function () { return self.clients.claim() }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  var path = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (path.indexOf('versions/') === 0) return;

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy) }) }
      return res;
    }).catch(function () { return caches.match(req, { ignoreSearch: true }) }));
    return;
  }

  if (!url.searchParams.has('v') && !STATIC.test(path)) return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { if (res.ok) c.put(req, res.clone()); return res });
    });
  }));
});
