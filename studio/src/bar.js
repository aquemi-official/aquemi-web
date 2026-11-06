/* The studio bar: one strip across the top of the site and every studio page (studio/manifest.json, "tools").
   Source file; studio/studio.js is generated from it and the manifest by python tools/design_system.py build.
   Load it with <script defer src="studio/studio.js" data-tool="<tool id>"></script> and studio/studio.css.
   On the site (data-tool="site") it adds the draft tools: placeholder highlighting, open facts, page jump and page
   history; index.html announces each render with a "aq:render" event and needs nothing else from it, so the live
   release (python tools/studio.py release) drops the bar without touching the site. Tokens only, no dependencies. */
(function () {
  var M = /*@MANIFEST@*/null;
  var me = document.currentScript || document.querySelector('script[src*="studio/studio.js"]');
  if (!M || !me) return;
  var TOOL = me.getAttribute('data-tool') || '';
  // the site root this page is served from: the script's URL less "studio/studio.js"
  var BASE = new URL('..', me.src).href;
  var path = new URL(BASE).pathname;
  var local = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname) || location.protocol === 'file:';
  var copy = 'production';
  M.copies.forEach(function (c) { if (c.path && path.slice(-c.path.length - 1) === '/' + c.path) copy = c.id; });
  if (local) copy = 'local';
  // the root of the production copy, and where its production-only tools live (history and gallery are left out of
  // the staging and dev copies to keep the site under the Pages size limit; when production is live they move to /studio/)
  var ROOT = copy === 'local' || copy === 'production' ? BASE : new URL('../', BASE).href;
  var PROD = M.release.production ? ROOT : ROOT + 'studio/';
  var LABEL = { local: 'Local copy', production: M.release.production ? 'Production draft' : 'Studio', staging: 'Staging copy', dev: 'Dev copy', studio: 'Studio', live: 'Live preview' };

  function e(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  function href(t) { return (t.production_only && copy !== 'local' && copy !== 'production' && copy !== 'studio' ? PROD : BASE) + t.page }

  var links = M.tools.map(function (t) {
    var cur = t.id === TOOL ? ' aria-current="page"' : '';
    return '<a class="sb__t" data-t="' + e(t.id) + '" href="' + e(href(t)) + '"' + cur + ' title="' + e(t.what) + '">' + e(t.name) + '</a>';
  }).join('');
  var bar = document.createElement('div');
  bar.className = 'sb';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Studio');
  bar.innerHTML = '<span class="sb__id"><a class="sb__home" href="' + e(BASE) + 'studio.html">Aquemi studio</a>' +
    '<span class="sb__copy" data-copy="' + e(copy) + '">' + e(LABEL[copy] || copy) + ' · not for release</span></span>' +
    '<nav class="sb__nav" aria-label="Studio tools">' + links + '</nav><span class="sb__x" id="sbx"></span>';
  function mount() { document.body.insertBefore(bar, document.body.firstChild) }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  window.AQStudio = { manifest: M, copy: copy, base: BASE, tool: TOOL, slot: function () { return bar.querySelector('#sbx') } };
  if (TOOL !== 'site') return;

  /* Draft tools on the site */
  var ph = true, facts = false;
  try { ph = localStorage.getItem('aq-studio-ph') !== '0'; facts = localStorage.getItem('aq-studio-facts') === '1' } catch (x) {}
  var x = bar.querySelector('#sbx');
  x.innerHTML = '<label><input type="checkbox" id="sbph"' + (ph ? ' checked' : '') + '> Placeholders</label>' +
    '<label><input type="checkbox" id="sbfacts"' + (facts ? ' checked' : '') + '> Open facts</label>' +
    '<select id="sbjump" aria-label="Jump to page"></select>';
  var hist = bar.querySelector('[data-t="history"]');
  var list = document.createElement('div');
  list.className = 'sb-facts';
  list.hidden = !facts;
  function site() { return document.getElementById('wsite') }
  function paint() { var s = site(); if (s) s.classList.toggle('is-clean', !ph) }
  function onRender(ev) {
    var p = ev.detail && ev.detail.page, s = site();
    if (!p || !s) return;
    paint();
    if (!list.parentNode) s.parentNode.insertBefore(list, s.nextSibling);
    var j = x.querySelector('#sbjump');
    if (!j.options.length && window.AQ && AQ.pages) j.innerHTML = AQ.pages().map(function (q) { return '<option value="' + e(q.id) + '">' + e(q.section + ' · ' + q.nav_label) + '</option>' }).join('');
    j.value = p.id;
    if (hist) hist.href = href(M.tools.filter(function (t) { return t.id === 'history' })[0]) + '#page=' + encodeURIComponent(p.id);
    var t = p.todo || [];
    list.innerHTML = '<h2>Open facts on this page (' + t.length + ')</h2>' + (t.length ? '<ul>' + t.map(function (f) { return '<li>' + e(f) + '</li>' }).join('') + '</ul>' : '<p>None.</p>');
  }
  document.addEventListener('aq:render', onRender);
  x.addEventListener('change', function (ev) {
    var t = ev.target;
    if (t.id === 'sbph') { ph = t.checked; paint(); try { localStorage.setItem('aq-studio-ph', ph ? '1' : '0') } catch (y) {} }
    if (t.id === 'sbfacts') { facts = t.checked; list.hidden = !facts; try { localStorage.setItem('aq-studio-facts', facts ? '1' : '0') } catch (y) {} }
    if (t.id === 'sbjump' && window.AQ && AQ.onNav) AQ.onNav(t.value);
  });
})();
