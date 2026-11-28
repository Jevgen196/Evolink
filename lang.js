/* Evolink: keep the reading position when switching language (section index + fraction). */
(function () {
  var KEY = 'evolink_pos';
  function secs() { return Array.prototype.slice.call(document.querySelectorAll('main > section, body > section, section')); }
  function top(el) { return el.getBoundingClientRect().top + window.pageYOffset; }
  function save() {
    try {
      var y = window.pageYOffset, s = secs(), idx = -1, frac = 0;
      for (var i = 0; i < s.length; i++) { if (top(s[i]) <= y + 1) idx = i; }
      if (idx >= 0) frac = (y - top(s[idx])) / Math.max(1, s[idx].offsetHeight);
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sessionStorage.setItem(KEY, JSON.stringify({ n: s.length, i: idx, f: Math.min(Math.max(frac, 0), 1), p: y / max, t: Date.now() }));
    } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.lang-switch a, a.lang-tag');
    if (a) save();
  });
  function restore() {
    var d; try { d = JSON.parse(sessionStorage.getItem(KEY) || 'null'); sessionStorage.removeItem(KEY); } catch (e) { return; }
    if (!d || Date.now() - d.t > 15000 || location.hash) return;
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
    var s = secs(), y;
    if (d.i >= 0 && d.n === s.length) y = top(s[d.i]) + d.f * s[d.i].offsetHeight;
    else y = d.p * Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: Math.max(0, Math.round(y)), left: 0, behavior: 'instant' });
  }
  if (document.readyState === 'complete') restore(); else window.addEventListener('load', restore);
})();
