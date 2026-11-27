/* Evolink: cookie consent. Google Tag Manager loads only after "Accept". */
(function () {
  var GTM_ID = 'GTM-K4KNN7X9', KEY = 'evolink_consent';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  function state(v) { return { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v }; }
  gtag('consent', 'default', state('denied'));

  var T = {
    es: ['Usamos cookies de Google para medir la publicidad y el uso del sitio. Solo se activan si las aceptas.', 'Aceptar', 'Rechazar', 'Más información', 'Configurar cookies'],
    en: ['We use Google cookies to measure our ads and site usage. They are only enabled if you accept.', 'Accept', 'Reject', 'More info (ES)', 'Cookie settings'],
    ru: ['Мы используем cookie Google, чтобы измерять рекламу и посещения сайта. Они включаются только после вашего согласия.', 'Принять', 'Отклонить', 'Подробнее (ES)', 'Настройки cookie']
  };
  var t = T[document.documentElement.lang] || T.es;
  var loaded = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGtm() {
    gtag('consent', 'update', state('granted'));
    if (loaded) return;
    loaded = true;
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  function clearCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl)/.test(n)) return;
      ['', '; domain=.' + host, '; domain=' + host].forEach(function (d) {
        document.cookie = n + '=; Max-Age=0; path=/' + d;
      });
    });
  }

  function choose(v) {
    save(v);
    var box = document.getElementById('cookie-box');
    if (box) box.remove();
    if (v === 'granted') { loadGtm(); return; }
    gtag('consent', 'update', state('denied'));
    clearCookies();
    if (loaded) location.reload();
  }

  function banner(privacyUrl) {
    if (document.getElementById('cookie-box')) return;
    var box = document.createElement('div');
    box.id = 'cookie-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookies');
    box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:100;max-width:640px;margin:0 auto;padding:16px;background:var(--surface,#1b2229);color:var(--text,#ece9e2);border:1px solid var(--line,#2c363f);border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.35);font-size:.9rem';
    var p = document.createElement('p');
    p.textContent = t[0] + ' ';
    var a = document.createElement('a');
    a.href = privacyUrl;
    a.textContent = t[3];
    p.appendChild(a);
    box.appendChild(p);
    [['granted', t[1]], ['denied', t[2]]].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = o[1];
      b.style.cssText = 'margin:12px 10px 0 0;padding:10px 20px;min-width:120px;border-radius:8px;border:1px solid var(--text,#ece9e2);background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer';
      b.onclick = function () { choose(o[0]); };
      box.appendChild(b);
    });
    document.body.appendChild(box);
  }

  var privacy = new URL('privacidad/', document.currentScript.src).href;

  if (read() === 'granted') loadGtm();

  /* WhatsApp click: sent to GTM only when consent is granted */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
    if (link && loaded && read() !== 'denied') window.dataLayer.push({ event: 'whatsapp_click', page_lang: document.documentElement.lang });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var foot = document.querySelector('footer .wrap');
    if (foot) {
      var s = document.createElement('a');
      s.href = '#';
      s.textContent = t[4];
      s.onclick = function (e) { e.preventDefault(); banner(privacy); };
      foot.appendChild(s);
    }
    if (!read()) banner(privacy);
  });
})();
