[DEPLOY-RU.md](https://github.com/user-attachments/files/34312452/DEPLOY-RU.md)
# Деплой evolink.es через GitHub Pages

В архиве:
- `evolink-site/` — готовый сайт (его содержимое грузим на GitHub)
- `_generator/build.py` — генератор: правишь тексты, запускаешь `python3 build.py`, перезаливаешь

Структура сайта: `/` испанская версия, `/en/`, `/ru/`, `/aviso-legal/`, `/privacidad/`, плюс `sitemap.xml`, `robots.txt`, `CNAME`.

## 0. Сначала заполни юр. страницы
В `aviso-legal/index.html` и `privacidad/index.html` найди `[COMPLETAR]` и впиши NIF/NIE, адрес и email. Можно после загрузки, прямо на GitHub через значок карандаша. Что публиковать из персональных данных, решаешь ты. Тексты типовые, один раз покажи их gestor'у.

## 1. Репозиторий
1. github.com → New repository → название `evolink-site`, **Public** (на бесплатном тарифе Pages работает с публичными репозиториями).
2. Add file → Upload files → перетащи **содержимое** папки `evolink-site/` (не саму папку), включая папки `en`, `ru`, `assets`, `aviso-legal`, `privacidad` и файл `CNAME`. Commit.
   Файл `.nojekyll` скрытый и может не загрузиться при перетаскивании, это не страшно.

## 2. Включить Pages
Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, папка `/ (root)` → Save.

## 3. Привязать домен
Там же, в поле **Custom domain**, введи `evolink.es` → Save. Делай это **до** настройки DNS.
Рекомендуется заранее подтвердить домен в настройках аккаунта: Settings → Pages (в профиле) → Add a domain, это защита от захвата домена.

## 4. DNS у регистратора evolink.es
Удали старые записи парковки (A/AAAA на чужие адреса) и добавь:

| Тип | Имя | Значение |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | `ТВОЙ-ЛОГИН.github.io` (без названия репозитория) |

Wildcard-записи (`*`) не ставь. Распространение до 24 часов.

## 5. HTTPS
Когда GitHub пройдёт проверку DNS, в Settings → Pages включи **Enforce HTTPS** (опция может появиться не сразу, до 24 часов).

## 6. Проверка
- https://evolink.es, https://evolink.es/en/, https://evolink.es/ru/
- кнопка WhatsApp открывает чат с готовым текстом
- www.evolink.es перенаправляет на evolink.es

## 7. Поиск
- Google Search Console → добавить домен `evolink.es` → отправить `https://evolink.es/sitemap.xml`
- Google Business Profile (бесплатно): бизнес с зоной обслуживания, адрес скрыть. Для запросов «electricista Alicante» это важнее самого сайта.

## Cookies и реклама
Сайт не ставит cookies и не грузит внешние шрифты и скрипты, поэтому баннер не нужен. Если добавишь Google Ads / Analytics / Meta Pixel, понадобятся cookie-баннер и обновление политики приватности.

## Как править сайт
Тексты и цены лежат в `_generator/build.py` (словарь `L`). Меняешь, запускаешь `python3 build.py`, перезаливаешь файлы из `evolink-site/`. Мелкие правки можно делать прямо в HTML на GitHub.
