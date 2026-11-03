#!/usr/bin/env python3
"""Evolink static site generator (standard library only).
Run:  python3 build.py   ->  writes ../evolink-site  (upload that folder's contents to GitHub)
Edit the texts below, run again, re-upload. Brand/phone/domain are set in the CONFIG block."""
import json, os
from urllib.parse import quote

# ---------- CONFIG ----------
DOMAIN = "https://evolink.es"
BRAND = "Evolink"
PHONE_E164 = "34671997560"
PHONE = "+34 671 997 560"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "evolink-site")
TODO = "[COMPLETAR]"  # placeholders in legal pages: search for this word and fill in
# ----------------------------

L = {
 "es": dict(
  lang="es", locale="es_ES", label="ES",
  title="Evolink — Electricista en Alicante: domótica Shelly, WiFi, cargadores EV y solar",
  desc="Domótica con Shelly, WiFi y CCTV, instalación de cargadores para coche eléctrico, electricidad y solar en Alicante. Precio claro antes de empezar. WhatsApp +34 671 997 560.",
  wa_text="Hola, me gustaría pedir presupuesto.",
  nav_cta="Escribir por WhatsApp", kicker="Alicante y provincia",
  h1='<span class="glow">Domótica</span>, WiFi y electricidad en Alicante — sin sorpresas.',
  lead="Automatización del hogar con Shelly, redes WiFi y cámaras, cargadores para coche eléctrico, instalaciones eléctricas y solar — sobre tu instalación actual, sin obras.",
  cta1="Pedir presupuesto gratis", cta2="Ver servicios",
  area="Trabajo en Alicante capital y hasta 120 km alrededor. Proyectos de energía solar a nivel nacional bajo consulta.",
  s_h2="Servicios", s_lead="Cada visita empieza con un diagnóstico claro: qué hay, qué hace falta, y un precio antes de tocar nada.",
  svc=[("⌂","Domótica con Shelly","Control de luces y persianas desde el móvil, sobre el cableado que ya tienes — sin romper paredes, en una sola visita. Ideal si pasas temporadas fuera de casa.","Compatible con Apple Home y Google Home"),
       ("◎","Redes, WiFi, Starlink y CCTV","Diagnóstico de cobertura WiFi, puntos de acceso, cableado de red, Starlink y cámaras de seguridad.",""),
       ("⚑","Cargador para coche eléctrico","Instalación de Wallbox en vivienda o garaje comunitario, conexión al cuadro, puesta en marcha.",""),
       ("⚡","Instalación y reparación eléctrica","Cuadros eléctricos, automáticos, diferenciales, enchufes, interruptores, iluminación, cableado en tubo corrugado.",""),
       ("☀","Energía solar (PV)","Instalaciones de autoconsumo, inversores, baterías. Presupuesto llave en mano.","")],
  p_h2="Cómo trabajamos",
  steps=[("Me escribes","Cuéntame qué necesitas — por WhatsApp, con fotos si las tienes."),
         ("Presupuesto","Precio claro antes de empezar: mano de obra, materiales y desplazamiento por separado."),
         ("Instalación","La mayoría de trabajos se resuelven en una sola visita."),
         ("Garantía","Trabajo garantizado — si algo falla, vuelvo.")],
  pr_h2="Precios claros", pr_lead="Sabrás el precio antes de que empiece el trabajo — sin sorpresas en la factura.",
  pr=[("Diagnóstico","70€","+ IVA / 1ª hora","Cada hora adicional, 30 € + IVA. Incluye revisión completa y presupuesto detallado antes de actuar."),
      ("Desplazamiento","50€","+ IVA hasta 40 km","Más allá de 40 km, +1,50 €/km.")],
  pr_note="Instalaciones (puntos eléctricos, cuadros, Shelly, Wallbox, solar) se presupuestan según el alcance real del trabajo — confirmado por escrito antes de empezar, y no cambia sin avisarte.",
  c_h2="Hablemos de tu proyecto", c_lead="Respondo el mismo día. Si es urgente, indícalo y lo priorizo.",
  c_label="Presupuesto gratis por foto", c_cta="Escribir por WhatsApp →", c_phone="o llama: "+PHONE,
  f_area="Alicante y provincia", f_legal="Aviso legal", f_priv="Política de privacidad"),
 "en": dict(
  lang="en", locale="en_GB", label="EN",
  title="Evolink — Electrician in Alicante: Shelly smart home, WiFi, EV chargers & solar",
  desc="Shelly smart home, WiFi & CCTV, EV charger installation, electrical work and solar in Alicante. Clear price before we start. WhatsApp +34 671 997 560.",
  wa_text="Hello, I'd like a quote.",
  nav_cta="Message on WhatsApp", kicker="Alicante & province",
  h1='<span class="glow">Smart home</span>, WiFi & electrical work in Alicante — no surprises.',
  lead="Shelly home automation, WiFi networks and cameras, EV chargers, electrical installations and solar — on your existing wiring, no rewiring.",
  cta1="Get a free quote", cta2="See services",
  area="Working in Alicante city and up to 120 km around. Solar projects nationwide on request.",
  s_h2="Services", s_lead="Every visit starts with a clear diagnosis: what's there, what's needed, and a price before touching anything.",
  svc=[("⌂","Shelly smart home","Control your lights and blinds from your phone, on your existing wiring — no rewiring, one visit. Great if you split time between homes.","Works with Apple Home & Google Home"),
       ("◎","Networks, WiFi, Starlink & CCTV","WiFi coverage diagnosis, access points, network cabling, Starlink and security cameras.",""),
       ("⚑","EV charger","Wallbox installation at your home or community garage, connection to the panel, commissioning.",""),
       ("⚡","Electrical installation & repair","Panels, breakers, RCDs, sockets, switches, lighting, conduit wiring.",""),
       ("☀","Solar energy (PV)","Self-consumption installations, inverters, batteries. Turnkey quote.","")],
  p_h2="How we work",
  steps=[("Message me","Tell me what you need — on WhatsApp, with photos if you have them."),
         ("Quote","Clear price before starting: labor, materials and travel listed separately."),
         ("Installation","Most jobs are done in a single visit."),
         ("Warranty","Work is guaranteed — if something fails, I come back.")],
  pr_h2="Clear pricing", pr_lead="You'll know the price before work starts — no surprises on the invoice.",
  pr=[("Diagnosis","70€","+ VAT / 1st hour","Every additional hour, 30€ + VAT. Includes full assessment and detailed quote before acting."),
      ("Travel","50€","+ VAT up to 40 km","Beyond 40 km, +1.50 €/km.")],
  pr_note="Installations (electrical points, panels, Shelly, Wallbox, solar) are quoted based on the actual scope of work — confirmed in writing before starting, and it won't change without telling you.",
  c_h2="Let's talk about your project", c_lead="I reply the same day. If it's urgent, mention it and I'll prioritize it.",
  c_label="Free quote from a photo", c_cta="Message on WhatsApp →", c_phone="or call: "+PHONE,
  f_area="Alicante & province", f_legal="Legal notice (ES)", f_priv="Privacy policy (ES)"),
 "ru": dict(
  lang="ru", locale="ru_RU", label="RU",
  title="Evolink — Электрик в Аликанте: умный дом Shelly, WiFi, зарядки для EV и солнечные панели",
  desc="Умный дом на Shelly, WiFi и видеонаблюдение, установка зарядок для электромобилей, электромонтаж и солнечные панели в Аликанте. Цена до начала работ. WhatsApp +34 671 997 560.",
  wa_text="Здравствуйте, хочу получить расчёт.",
  nav_cta="Написать в WhatsApp", kicker="Аликанте и область",
  h1='<span class="glow">Умный дом</span>, WiFi и электрика в Аликанте — без сюрпризов.',
  lead="Автоматизация дома на Shelly, сети WiFi и камеры, зарядки для электромобилей, электромонтаж и солнечные панели — на вашей текущей проводке, без ремонта.",
  cta1="Бесплатная оценка", cta2="Смотреть услуги",
  area="Работаю в Аликанте и до 120 км вокруг. Солнечные проекты — по всей Испании по запросу.",
  s_h2="Услуги", s_lead="Каждый визит начинается с чёткой диагностики: что есть, что нужно, и цена — прежде чем что-то трогать.",
  svc=[("⌂","Умный дом на Shelly","Управление светом и шторами с телефона, поверх вашей текущей проводки — без ремонта, за один визит. Отлично подходит, если вы часто уезжаете.","Работает с Apple Home и Google Home"),
       ("◎","Сети, WiFi, Starlink и видеонаблюдение","Диагностика покрытия WiFi, точки доступа, прокладка сети, Starlink и камеры видеонаблюдения.",""),
       ("⚑","Зарядка для электромобиля","Установка Wallbox в доме или общем гараже, подключение к щиту, запуск.",""),
       ("⚡","Электромонтаж и ремонт","Щиты, автоматы, УЗО, розетки, выключатели, освещение, кабель в гофре.",""),
       ("☀","Солнечная энергия (PV)","Установки самопотребления, инверторы, аккумуляторы. Цена под ключ.","")],
  p_h2="Как мы работаем",
  steps=[("Напишите мне","Расскажите, что нужно — в WhatsApp, с фото, если есть."),
         ("Оценка","Чёткая цена до начала: работа, материалы и выезд — отдельными пунктами."),
         ("Установка","Большинство работ решается за один визит."),
         ("Гарантия","Работа гарантирована — если что-то не так, я вернусь.")],
  pr_h2="Прозрачные цены", pr_lead="Вы узнаете цену до начала работ — без сюрпризов в счёте.",
  pr=[("Диагностика","70€","+ IVA / 1-й час","Каждый следующий час — 30 € + IVA. Включает полную оценку и детальный расчёт до начала работ."),
      ("Выезд","50€","+ IVA до 40 км","Свыше 40 км — +1,50 €/км.")],
  pr_note="Установки (электроточки, щиты, Shelly, Wallbox, солнечные панели) рассчитываются по факту объёма работ — подтверждается письменно до начала и не меняется без предупреждения.",
  c_h2="Обсудим ваш проект", c_lead="Отвечаю в тот же день. Если срочно — напишите об этом, поставлю в приоритет.",
  c_label="Бесплатная оценка по фото", c_cta="Написать в WhatsApp →", c_phone="или позвоните: "+PHONE,
  f_area="Аликанте и область", f_legal="Юр. информация (ES)", f_priv="Политика конфиденциальности (ES)"),
}
PATH = {"es": "/", "en": "/en/", "ru": "/ru/"}

def rel(frm, to):
    if frm == to: return "./"
    if frm == "es": return PATH[to].lstrip("/")
    return "../" + ("" if to == "es" else to + "/")

def head(title, desc, canonical, prefix, extra="", lang="es", locale="es_ES"):
    return f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#12181c">
<link rel="icon" href="{prefix}favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{BRAND}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canonical}">
<meta property="og:locale" content="{locale}">
<link rel="stylesheet" href="{prefix}assets/style.css">
{extra}</head>
'''

def main_page(code):
    t = L[code]
    prefix = "" if code == "es" else "../"
    wa = f"https://wa.me/{PHONE_E164}?text={quote(t['wa_text'])}"
    alts = "".join(f'<link rel="alternate" hreflang="{c}" href="{DOMAIN}{PATH[c]}">\n' for c in L)
    alts += f'<link rel="alternate" hreflang="x-default" href="{DOMAIN}/">\n'
    ld = {"@context": "https://schema.org", "@type": "Electrician", "name": BRAND, "url": DOMAIN + "/",
          "telephone": "+" + PHONE_E164, "description": t["desc"], "availableLanguage": ["es", "en", "ru"],
          "areaServed": {"@type": "AdministrativeArea", "name": "Alicante"},
          "knowsAbout": ["Shelly smart home", "WiFi networks", "EV charger installation", "Electrical installation", "Solar PV"]}
    extra = alts + '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script>\n'
    h = head(t["title"], t["desc"], DOMAIN + PATH[code], prefix, extra, t["lang"], t["locale"])
    langs = "".join(f'<a href="{rel(code, c)}" hreflang="{c}"' + (' aria-current="page" class="on"' if c == code else '') + f'>{L[c]["label"]}</a>' for c in L)
    svc = "".join(f'<div class="service"><span class="icon" aria-hidden="true">{i}</span><h3>{a}</h3><p>{b}</p>' + (f'<p class="compat">{c}</p>' if c else '') + '</div>' for i, a, b, c in t["svc"])
    steps = "".join(f'<li><div><h3>{a}</h3><p>{b}</p></div></li>' for a, b in t["steps"])
    cards = "".join(f'<div class="price-card"><div class="label">{a}</div><div><span class="amount">{b}</span><span class="unit">{c}</span></div><div class="desc">{d}</div></div>' for a, b, c, d in t["pr"])
    leg = prefix + "aviso-legal/"; pri = prefix + "privacidad/"
    return h + f'''<body>
<header><div class="wrap">
<a class="brand" href="{rel(code, code)}">Evo<span>link</span></a>
<div class="header-right"><nav class="lang-switch" aria-label="Language">{langs}</nav>
<a class="cta-btn" href="{wa}" target="_blank" rel="noopener">{t["nav_cta"]}</a></div>
</div></header>
<main>
<section class="hero"><div class="wrap">
<div class="kicker">{t["kicker"]}</div>
<h1>{t["h1"]}</h1>
<p class="lead">{t["lead"]}</p>
<div class="actions"><a class="cta-btn" href="{wa}" target="_blank" rel="noopener">{t["cta1"]}</a><a class="btn-outline" href="#services">{t["cta2"]}</a></div>
<div class="area">{t["area"]}</div>
</div></section>
<section id="services"><div class="wrap"><h2>{t["s_h2"]}</h2><p class="section-lead">{t["s_lead"]}</p>{svc}</div></section>
<section class="process"><div class="wrap"><h2>{t["p_h2"]}</h2><ol>{steps}</ol></div></section>
<section class="pricing"><div class="wrap"><h2>{t["pr_h2"]}</h2><p class="section-lead">{t["pr_lead"]}</p><div class="price-cards">{cards}</div><p class="price-note">{t["pr_note"]}</p></div></section>
<section class="contact"><div class="wrap"><div class="grid"><div><h2>{t["c_h2"]}</h2><p class="section-lead">{t["c_lead"]}</p>
<div class="langs"><span class="lang-tag">Español</span><span class="lang-tag">English</span><span class="lang-tag">Русский</span></div></div>
<div class="contact-card"><div class="label">{t["c_label"]}</div><a class="big-cta" href="{wa}" target="_blank" rel="noopener">{t["c_cta"]}</a><div class="phone"><a href="tel:+{PHONE_E164}">{t["c_phone"]}</a></div></div></div></div></section>
</main>
<footer><div class="wrap"><div>© 2026 {BRAND} · {t["f_area"]}</div><div><a href="{leg}">{t["f_legal"]}</a> · <a href="{pri}">{t["f_priv"]}</a></div></div></footer>
</body>
</html>
'''

LEGAL = {
 "aviso-legal": ("Aviso legal", "Aviso legal de evolink.es: titular, condiciones de uso y responsabilidad.", f'''
<h1>Aviso legal</h1>
<p>En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
<ul>
<li><strong>Titular:</strong> Jevgenijs Lavrenovs (autónomo)</li>
<li><strong>NIF/NIE:</strong> {TODO} NIF/NIE</li>
<li><strong>Domicilio:</strong> {TODO} dirección</li>
<li><strong>Email:</strong> {TODO} email</li>
<li><strong>Teléfono / WhatsApp:</strong> {PHONE}</li>
<li><strong>Sitio web:</strong> evolink.es</li>
</ul>
<h2>Objeto</h2><p>Este sitio ofrece información sobre servicios de instalación eléctrica, domótica, redes, cargadores para vehículo eléctrico y energía solar. La información tiene carácter orientativo; los precios y condiciones definitivos se confirman por escrito en cada presupuesto.</p>
<h2>Propiedad intelectual</h2><p>Los textos, el diseño y el resto de contenidos del sitio pertenecen al titular. Queda prohibida su reproducción sin autorización.</p>
<h2>Responsabilidad</h2><p>El titular no responde de los daños derivados de un uso indebido del sitio ni de interrupciones técnicas ajenas a su control. El sitio contiene enlaces a servicios de terceros (por ejemplo WhatsApp), cuyas condiciones y políticas son responsabilidad de sus titulares.</p>
<h2>Legislación aplicable</h2><p>Este aviso se rige por la legislación española. Para consumidores y usuarios, serán competentes los juzgados que resulten legalmente aplicables.</p>
'''),
 "privacidad": ("Política de privacidad", "Política de privacidad y cookies de evolink.es.", f'''
<h1>Política de privacidad</h1>
<h2>Responsable del tratamiento</h2><p>Jevgenijs Lavrenovs, NIF/NIE {TODO} NIF/NIE, {TODO} dirección, email {TODO} email.</p>
<h2>Qué datos tratamos y para qué</h2><p>Este sitio no tiene formularios. Si usted nos contacta por WhatsApp, teléfono o email, tratamos los datos que nos facilite (nombre, teléfono, descripción del trabajo, fotos) para responder a su consulta y preparar un presupuesto.</p>
<h2>Base jurídica</h2><p>Su consentimiento al contactarnos y la aplicación de medidas precontractuales a petición suya. Si se contrata el servicio, la ejecución del contrato y las obligaciones legales (por ejemplo, facturación).</p>
<h2>Conservación</h2><p>Mientras dure la relación y, después, durante los plazos exigidos por la ley.</p>
<h2>Destinatarios</h2><p>No cedemos sus datos a terceros salvo obligación legal. Pueden acceder a ellos los colaboradores técnicos necesarios para prestar el servicio (por ejemplo, el técnico que tramita la documentación de la instalación) y la plataforma de mensajería que usted elija (WhatsApp, de Meta). Este sitio se aloja en GitHub Pages (GitHub, Inc.), que puede tratar datos técnicos de conexión, como la dirección IP, para servir las páginas.</p>
<h2>Cookies</h2><p>Este sitio no utiliza cookies propias ni de terceros, ni herramientas de analítica o publicidad. No carga fuentes ni scripts externos.</p>
<h2>Sus derechos</h2><p>Puede solicitar el acceso, rectificación, supresión, oposición, limitación y portabilidad de sus datos escribiendo al email indicado arriba. Si considera que sus derechos no han sido atendidos, puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
'''),
}

def legal_page(slug):
    title, desc, body = LEGAL[slug]
    h = head(f"{title} — {BRAND}", desc, f"{DOMAIN}/{slug}/", "../")
    return h + f'''<body>
<header><div class="wrap"><a class="brand" href="../">Evo<span>link</span></a><nav class="lang-switch" aria-label="Language"><a href="../" hreflang="es">ES</a><a href="../en/" hreflang="en">EN</a><a href="../ru/" hreflang="ru">RU</a></nav></div></header>
<main><div class="wrap legal">{body}<p><a href="../">← Volver al inicio</a></p></div></main>
<footer><div class="wrap"><div>© 2026 {BRAND}</div><div><a href="../aviso-legal/">Aviso legal</a> · <a href="../privacidad/">Política de privacidad</a></div></div></footer>
</body>
</html>
'''

CSS = ''':root{--bg:#12181c;--surface:#1b2229;--surface-2:#212a32;--line:#2c363f;--text:#ece9e2;--dim:#9aa5ac;--accent:#f5c518;--on-accent:#161200;--teal:#3f8f88;color-scheme:dark light}
@media (prefers-color-scheme:light){:root{--bg:#f4f2ec;--surface:#fff;--surface-2:#ece8dd;--line:#ddd6c4;--text:#181510;--dim:#5c554a;--accent:#b3860f;--on-accent:#fff;--teal:#2c6b64}}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:72px}
body{background:var(--bg);color:var(--text);font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
h1,h2,h3,.brand{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;letter-spacing:-.02em}
a{color:inherit}
a:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}
.wrap{max-width:920px;margin:0 auto;padding:0 24px}
section{padding:88px 0}
@media (max-width:640px){section{padding:56px 0}}
header{position:sticky;top:0;z-index:10;padding:14px 0;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
header .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.brand{font-size:1.25rem;font-weight:700;text-decoration:none}
.brand span{color:var(--accent)}
.header-right{display:flex;align-items:center;gap:10px}
.lang-switch{display:flex;gap:2px;border:1px solid var(--line);border-radius:8px;padding:3px}
.lang-switch a{color:var(--dim);font-size:.78rem;font-weight:600;padding:5px 8px;border-radius:5px;text-decoration:none}
.lang-switch a.on{background:var(--accent);color:var(--on-accent)}
.cta-btn{display:inline-block;background:var(--accent);color:var(--on-accent);font-weight:600;font-size:.9rem;padding:10px 16px;border-radius:8px;text-decoration:none;white-space:nowrap}
.cta-btn:hover{filter:brightness(1.08)}
.hero{padding-top:64px}
.kicker{color:var(--teal);font-weight:600;font-size:.95rem;margin-bottom:18px}
h1{font-size:clamp(2rem,5.5vw,3.3rem);font-weight:700;max-width:17ch;line-height:1.08}
.glow{color:var(--accent);animation:flick 2.6s ease-in-out .3s 1}
@media (prefers-reduced-motion:reduce){.glow{animation:none}html{scroll-behavior:auto}}
@keyframes flick{0%{opacity:.3}8%{opacity:1}12%{opacity:.4}18%{opacity:1}100%{opacity:1}}
.lead{max-width:54ch;color:var(--dim);font-size:1.08rem;margin-top:22px}
.actions{display:flex;gap:14px;margin-top:32px;flex-wrap:wrap}
.btn-outline{border:1px solid var(--line);padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:500;font-size:.95rem}
.area{margin-top:40px;color:var(--dim);font-size:.9rem;border-top:1px solid var(--line);padding-top:20px;max-width:54ch}
h2{font-size:clamp(1.5rem,3.5vw,2rem);font-weight:600;margin-bottom:12px}
.section-lead{color:var(--dim);max-width:58ch;margin-bottom:40px}
.service{border-left:2px solid var(--line);padding:18px 0 18px 22px;transition:border-color .15s}
.service:hover{border-color:var(--accent)}
.service h3{font-size:1.1rem;font-weight:600;margin-bottom:6px}
.service p{color:var(--dim);font-size:.95rem;max-width:62ch}
.service .compat{font-size:.82rem;margin-top:6px}
.icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;background:var(--surface-2);color:var(--accent);font-size:1.1rem;margin-bottom:10px}
.process ol{list-style:none;counter-reset:s}
.process li{counter-increment:s;display:grid;grid-template-columns:44px 1fr;gap:18px;padding:20px 0;border-bottom:1px solid var(--line)}
.process li:last-child{border-bottom:none}
.process li::before{content:counter(s);font-weight:700;color:var(--accent);font-size:1.3rem;line-height:1.4}
.process h3{font-size:1rem;font-weight:600;margin-bottom:4px}
.process p{color:var(--dim);font-size:.95rem}
.pricing,.contact{background:var(--surface);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.price-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media (max-width:640px){.price-cards{grid-template-columns:1fr}}
.price-card,.contact-card{background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:26px}
.label{color:var(--dim);font-size:.85rem;margin-bottom:8px}
.amount{font-size:2rem;font-weight:700;color:var(--accent)}
.unit{color:var(--dim);font-size:.85rem;margin-left:6px}
.desc{color:var(--dim);font-size:.9rem;margin-top:10px}
.price-note{color:var(--dim);font-size:.88rem;margin-top:22px;max-width:62ch}
.contact .grid{display:grid;grid-template-columns:1.2fr 1fr;gap:48px}
@media (max-width:720px){.contact .grid{grid-template-columns:1fr;gap:28px}}
.big-cta{display:inline-block;background:var(--accent);color:var(--on-accent);font-weight:700;padding:14px 22px;border-radius:8px;text-decoration:none;margin-top:16px}
.phone{color:var(--dim);margin-top:14px;font-size:.9rem}
.langs{margin-top:18px;display:flex;gap:8px;flex-wrap:wrap}
.lang-tag{font-size:.78rem;border:1px solid var(--line);border-radius:20px;padding:4px 12px;color:var(--dim)}
footer{padding:32px 0;color:var(--dim);font-size:.85rem}
footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}
footer a{text-decoration:none}footer a:hover{text-decoration:underline}
.legal{padding-top:56px;padding-bottom:56px;max-width:760px}
.legal h1{font-size:2rem;max-width:none;margin-bottom:20px}
.legal h2{font-size:1.15rem;margin:28px 0 8px}
.legal p,.legal li{color:var(--dim)}
.legal ul{margin:10px 0 10px 20px}
'''

FAVICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#12181c"/><path d="M36 8 18 36h12l-4 20 20-30H34z" fill="#f5c518"/></svg>'

def write(rel_path, text):
    p = os.path.join(OUT, rel_path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f: f.write(text)

def main():
    for code in L:
        write("index.html" if code == "es" else f"{code}/index.html", main_page(code))
    for slug in LEGAL: write(f"{slug}/index.html", legal_page(slug))
    write("assets/style.css", CSS); write("favicon.svg", FAVICON)
    write("CNAME", "evolink.es\n"); write(".nojekyll", "")
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n")
    alt = lambda: "".join(f'<xhtml:link rel="alternate" hreflang="{c}" href="{DOMAIN}{PATH[c]}"/>' for c in L) + f'<xhtml:link rel="alternate" hreflang="x-default" href="{DOMAIN}/"/>'
    urls = "".join(f"<url><loc>{DOMAIN}{PATH[c]}</loc>{alt()}</url>" for c in L)
    urls += "".join(f"<url><loc>{DOMAIN}/{s}/</loc></url>" for s in LEGAL)
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">{urls}</urlset>\n')
    write("404.html", head("Página no encontrada — " + BRAND, "Página no encontrada.", DOMAIN + "/", "/").replace("<head>", "<head>\n<meta name=\"robots\" content=\"noindex\">") +
          '<body><main><div class="wrap legal"><h1>404</h1><p>Página no encontrada · Page not found · Страница не найдена</p><p><a href="/">evolink.es</a></p></div></main></body>\n</html>\n')
    print("OK ->", os.path.abspath(OUT))

if __name__ == "__main__":
    main()
