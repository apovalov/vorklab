---
date: 2026-05-13
status: design / awaiting user review
related:
  - vault://docs/superpowers/specs/2026-05-02-vorklab-launch-design.md
  - vault://docs/superpowers/plans/2026-05-02-vorklab-launch-execution.md
  - vault://Work/VorkLab/site-refactor-kickoff.md
branch: claude-refactor
target: minimally-sufficient RU landing for Lane B funnel
---

# vorklab.com — Site Refactor Design

## 1. Goal

Привести vorklab.com из текущего состояния (английский лендинг с generic-копирайтом, 5 fake-тестимониалов, ROI-калькулятор с обещанием 70% автоматизации, fake-телефон в контактах) к **минимально-достаточному русскому лендингу** для Lane B (входящие лиды с холодного трафика + тёплые контакты, по spec §5 launch-design 2026-05-02).

**Non-goal:** полный редизайн с нуля, многоязычность, кастомные шрифты/цвета, CMS, блог-функционал, аналитика, новые тяжёлые зависимости.

## 2. Constraints

- **Стек сохраняется:** Next.js 16.2 + React 19 + Tailwind 4 + Shadcn UI + lucide-react
- **Дизайн-токены сохраняются:** тёмная палитра (`--base-bg: #0C0F15`, `--vorklab-accent: #5EEAD4`, `--hero-bg: #0D1B1E`, `--main-text: #F2F2F2`, `--light-text: #A0A0A0`, `--vorklab-card-bg: #1A1A1A`, `--vorklab-card-border: #444`)
- **Только русский** — `<html lang="ru">`, метатеги RU, копирайт RU. EN-версия отдельным проектом потом.
- **Em-dash → дефис** во всех публичных строках сайта (правило пользователя из CLAUDE.md)
- **Mobile responsive** обязательно (текущий уровень: грид схлопывается на мобиле)
- **Не деплоим в этой сессии** — только локально + push на ветку `claude-refactor`. Master не трогаем (там стабильный v1, тег `v1-final`)

## 3. NDA и tone rules

- **StarSmile нигде** — заменяется на "medtech-сервис" / "production-внедрения голосовых AI-ассистентов в medtech"
- **Allegro называется открыто** (явное разрешение пользователя)
- **MediaMarkt не упоминается** (явное решение пользователя — не нравится бренд в портфолио)
- **Royal Ark анонимизируется** до "gamedev-студия"
- **Avito нигде на сайте** — никаких баннеров, ссылок в Footer, плашек "live на Avito" (правило пользователя сохранено в feedback-memory)
- **YouTube @mind.flow777 не упоминается** (другая тематика, размывает фокус)
- **Em-dash нигде** в публичных строках
- **Tone:** "сжатые сроки, прозрачный процесс, production-опыт, 15+ лет в IT" — anti-hype через факты и конкретику, не через критику чужого подхода. Никаких "трансформируем", "революция", "100% гарантия".

## 4. Composition (7 sections top → bottom)

| # | Секция | Действие | Кратко |
|---|---|---|---|
| 1 | Hero | refactor | Новый копирайт F3-B (см. §5.1) |
| 2 | Solutions | refactor | 3 услуги с ценами, wedge выделена |
| 3 | "Что мы автоматизируем" | new (replaces RoiCalculator) | 6 типовых процессов 3×2 с proof-плашками |
| 4 | Past-work | new (replaces Testimonials) | 4 кейса 2×2 (Allegro + 3 NDA) |
| 5 | "Об авторе" | new | Аватар + bio + социалка pills |
| 6 | CTA | refactor | "Записаться на разбор" + email + Telegram |
| 7 | Footer | refactor | RU, реальные контакты |

**Удаляются полностью:** `components/landing/RoiCalculator.tsx`, `components/landing/Testimonials.tsx`, `components/landing/HowWeWork.tsx`. Причина: RoiCalculator обещает 70% автоматизации до Discovery (противоречит anti-hype фрейму); Testimonials содержит 5 fake-цитат; HowWeWork — 4 generic-карточки, чьи differentiator-функции теперь выполняют "Что автоматизируем" и Past-work через факты.

## 5. Per-section detailed design

### 5.1 Hero

- **headline:** `AI-студия с production-опытом. От задачи до проды - в неделях, не в кварталах.`
- **subhead:** `15+ лет в IT, реальные внедрения в маркетплейсе ЦВЕ, medtech и e-commerce. Помогаем SMB и руководителям команд - от личного ассистента до автоматизации обработки обращений и воронок.`
- **CTA primary:** `Записаться на 30-мин разбор` → CALENDLY_URL
- **CTA microcopy:** `Без КП и обязательств. Послушаем задачу и предложим формат.`
- **Стиль:** тот же — центрированный текст на `--hero-bg`, кнопка `--vorklab-accent` фоном, белый текст-на-кнопке
- **Без em-dash, без секонд-CTA (Avito) — кнопка одна**

### 5.2 Solutions (3 услуги с ценами)

Сетка 3 колонок на десктопе, схлопывается в 1 колонку на мобиле. Средняя карточка (Wedge) выделена бирюзовой рамкой и плашкой "Самый частый".

| Поле | Tripwire | Wedge (anchor) | Core |
|---|---|---|---|
| Tier label | `Tripwire · вход` | `Wedge · якорь` | `Core · автоматизация` |
| Title | `Часовая консультация / AI-аудит` | `Личный AI-ассистент под ключ` | `Автоматизация одного процесса` |
| Pitch | `60-мин звонок + roadmap-документ: что внедрять и в каком порядке.` | `Telegram-бот или OpenWebUI с RAG по вашим документам и базе знаний.` | `Чат-бот FAQ, обработка заявок, помощник менеджеру, отчётность - один процесс под ключ.` |
| Price | `9 000 ₽` (`~$100`) | `от 15 000 ₽` (`+ ~50$/мес инфра`) | `от 30 000 ₽` |
| Duration | `1 неделя` | `3-7 дней setup` | `2-4 недели` |
| What's in | 60-мин звонок · 12-вопросный скоринг · Roadmap-документ · Рекомендация следующего шага | Установка на ваш сервер или нашу инфру · RAG по базе знаний · 2 онбординг-созвона по 30 мин · Поддержка месяц + обновления | Discovery → MVP → итерации → handover · Один из 6 типовых процессов · AB-тест и метрики до/после · Документация + передача команде |
| CTA | `Записаться` (secondary) | `Записаться на разбор` (primary, accent fill) | `Обсудить задачу` (secondary) |

Иконки на карточках — lucide-react. Цены — крупно, под price-row.

### 5.3 "Что мы автоматизируем"

Заменяет RoiCalculator. Сетка 3×2 на десктопе (на мобиле 1 колонка). 6 типовых процессов, каждый с (а) иконкой lucide-react, (б) названием, (в) 1-2 предложениями описания, (г) плашкой-proof (бирюзовая если реальная цифра с источником, серая если технический scope).

| # | Иконка | Title | Description | Proof / Scope |
|---|---|---|---|---|
| 1 | `MessageSquare` | `Чат-бот FAQ и поддержка` | `Отвечает на типовые вопросы клиентов из вашей базы знаний. Эскалирует сложное оператору. Multilingual если нужно.` | accent `~45% обращений без оператора, CSAT ~76%` · `в проекте маркетплейса ЦВЕ, 20M+ покупателей` |
| 2 | `PhoneCall` | `Запись на услуги и подтверждения` | `Входящие в голосе и тексте: квалификация, бронирование визитов, перенос / отмена, подтверждения, напоминания.` | accent `Live traffic в medtech-сервисе` · `прод-внедрение под NDA` |
| 3 | `Inbox` | `Обработка входящих заявок` | `Quick triage: классификация по типу, заполнение полей в CRM, маршрутизация на ответственного.` | neutral `Интеграция с вашей CRM / Notion / Trello` |
| 4 | `Bot` | `Личный AI-ассистент команде` | `Telegram-бот или OpenWebUI с RAG по вашим документам. Ответы под рукой, без поиска по Notion / Confluence / Google Drive.` | accent `Сетап за 3-7 дней` · `формат wedge, фикс-цена` |
| 5 | `FileText` | `Генерация описаний и контента` | `Описания товаров для маркетплейсов и каталогов, SEO-страницы, шаблонные тексты под бренд-голос.` | neutral `Batch / API · под ваш бренд-голос` |
| 6 | `BarChart3` | `Сегментация и персональные сценарии` | `Сегментация клиентов, LTV / churn, anomaly detection. Триггеры для CRM, маркетинга, удержания.` | accent `+19% ROI по маркетинговым кампаниям` · `gamedev-студия, classic ML` |

Стили плашек:
- accent: `bg rgba(94,234,212,0.08) · border rgba(94,234,212,0.2) · text #5EEAD4` + микро-дисклеймер серым под ней
- neutral: `bg rgba(160,160,160,0.06) · border rgba(160,160,160,0.2) · text #A0A0A0` (без дисклеймера)

### 5.4 Past-work (4 кейса 2×2)

Заменяет Testimonials. Сетка 2 колонки на десктопе, 1 на мобиле. Все карточки **равного размера** (никаких широких). Каждая карточка имеет: tag-row (`✓ OPEN` бирюзовая ИЛИ `NDA` серая + второй тег с доменом/типом проекта), title, role-строка, bullet-список с подсветкой ключевых метрик.

**Карточка 1 — Allegro Customer Support AI** (`✓ Allegro` бирюзовая + `CEE Marketplace · Support AI` серая)
- Title: `Customer Support AI в крупнейшем маркетплейсе ЦВЕ`
- Role: `AI/ML Engineer · 20M+ покупателей, 5 языков`
- Bullets:
  - `Multilingual RAG + agentic workflows (PL / CZ / SK / HU / EN)`
  - `PoC → prod за 26 недель`
  - `~45% auto-resolution`, `CSAT ~76%`, `p95 ≤ 350ms` (метрики выделены `--vorklab-accent`)
  - `Гибридный retrieval по 40M+ чанков, hallucinations ↓×5 (critic + reranker)`

**Карточка 2 — Medtech** (`NDA` серая + `Medtech · Voice + Text` серая)
- Title: `Голосовые и текстовые AI-ассистенты для medtech-сервиса`
- Role: `AI Engineer · live traffic, реальные клиники`
- Bullets:
  - `Обработка входящих обращений в голосе и тексте, квалификация`
  - `Бронирование визитов, перенос / отмена, подтверждения, напоминания`
  - `LangGraph + voice stack (Eleven / Silero / Yandex), RAG по доменной базе`
  - `Evals и guardrails в проде - ловит галлюцинации до клиента`

**Карточка 3 — E-commerce ритейлер** (`NDA` серая + `E-commerce ритейлер · RecSys` серая)
- Title: `Рекомендательные системы для крупного европейского e-commerce-ритейлера`
- Role: `AI/ML Engineer · production, AB-tested`
- Bullets:
  - `Similar-items (HNSW + ALS): +8% CTR`
  - `Complementary-items (co-purchase HNSW / ALS): +4.6% GMV`
  - `Learning-to-rank (CatBoost / YetiRank): +17% MAP`

**Карточка 4 — Gamedev studio** (`NDA` серая + `Gamedev Studio · Classic ML` серая)
- Title: `ML-стек для gamedev-студии: LTV, churn, аномалии, сегментация`
- Role: `ML Engineer · production CRM impact`
- Bullets:
  - `LTV-модель в проде: +19% ROI по маркетинговым кампаниям`
  - `Churn prediction (CatBoost / SGB) + anomaly detection (IsolationForest)`
  - `Player clustering (DBSCAN) для персональных CRM-сценариев`

### 5.5 "Об авторе"

Новый блок. Композиция: одна карта `--vorklab-card-bg`, внутри строка из двух колонок: слева аватар 64×64 круглый (placeholder с инициалом "В" на градиенте бирюзовый→тёмный, ждёт фото пользователя позже), справа bio + социалка-pills.

- **Имя:** `Валентин Шаповалов`
- **Role-строка:** `AI/ML Engineer · команда VorkLab · 15+ лет в IT · Белград`
- **Bio (1 параграф, 2-3 предложения):** `Делаем AI-внедрения под ключ и публикуем процесс открыто. Production-опыт в маркетплейсе ЦВЕ, medtech и e-commerce. Канал @focus_ops - про процесс и реальные кейсы; GitHub - открытые компоненты и шаблоны.`
- **Социалка pills (горизонтальный ряд):**
  - `@focus_ops Telegram` → `https://t.me/focus_ops`
  - `GitHub apovalov` → `https://github.com/apovalov`
- **Иконки в pills:** lucide-react `Send` и `Github` (заменить эмодзи на иконки при имплементации)
- **НЕТ:** Avito-ссылки, YouTube-ссылки, телефона, никаких "доверьтесь нам"-фраз

### 5.6 CTA (Contact)

Refactor существующего `Cta.tsx`. Сохраняется структура (центрированный текст + primary CTA + дополнительный mailto-блок), но всё на русском.

- **Headline:** `Готовы обсудить задачу?`
- **Subhead:** `30 минут разговора - расскажете, что у вас сейчас, мы скажем, чем можем помочь и в каком формате. Без КП и обязательств.`
- **Primary CTA:** `Записаться на 30-мин разбор` → CALENDLY_URL (стилистика существующая)
- **Secondary block ниже:** `Не готовы созваниваться? Напишите.` → `apovalov@gmail.com` + Telegram `@apovalov`
- Без упоминания "transform your business" и подобной generic-копирайтерщины.

### 5.7 Footer

Refactor. 3 колонки сохраняются, всё на русском, реальные контакты, без fake-телефона.

- **Колонка 1** — Логотип `VorkLab` + слоган: `AI-студия с production-опытом. Внедряем AI в бизнес-процессы под ключ.`
- **Колонка 2** — Навигация: `Главная` / `Услуги` (#solutions) / `Что автоматизируем` (#automate) / `Кейсы` (#cases) / `Об авторе` (#about) / `Контакт` (#contact)
- **Колонка 3** — Контакт:
  - `apovalov@gmail.com` mailto
  - `Telegram @apovalov` → `https://t.me/apovalov`
  - `@focus_ops` → `https://t.me/focus_ops` (канал)
  - `GitHub apovalov` → `https://github.com/apovalov`
  - **НЕТ** `phone`, **НЕТ** `Avito`, **НЕТ** `YouTube`
- Bottom: `© 2026 VorkLab`. Без `All rights reserved` английского хвоста — просто copyright + год.

### 5.8 Navbar

Refactor. Лого + ссылки-якоря + primary CTA. Всё на русском.

- **NAV_LINKS:** `Услуги` (#solutions) · `Что автоматизируем` (#automate) · `Кейсы` (#cases) · `Об авторе` (#about)
- **CTA в navbar:** `Записаться на разбор` → CALENDLY_URL (сохраняется существующая стилистика)
- Мобильное меню (existing hamburger) сохраняется, переводится на RU
- **Удаляются из nav:** `Products`, `Blog`, `FAQ`, `About` (как отдельные страницы) — они заглушки, ссылки убираем, страницы оставляем как есть (не наш scope сейчас)

## 6. File-level changes

### Создаются (new)
- `components/landing/AutomateBlock.tsx` — секция 5.3
- `components/landing/Cases.tsx` — секция 5.4
- `components/landing/About.tsx` — секция 5.5

### Удаляются (delete)
- `components/landing/RoiCalculator.tsx` (203 строки)
- `components/landing/Testimonials.tsx` (69 строк)
- `components/landing/HowWeWork.tsx` (59 строк)

### Редактируются
- `app/page.tsx` — новая композиция импорта 7 секций
- `app/layout.tsx` — `lang="ru"`, RU metadata (title/description/og)
- `lib/constants.ts` — `CONTACT` (apovalov@gmail.com, telegram handle, без phone), `NAV_LINKS` RU, `FOOTER_LINKS` пересобрать, новые константы: `TELEGRAM_PERSONAL`, `TELEGRAM_CHANNEL`, `GITHUB_URL`
- `components/landing/Navbar.tsx` — RU + якорные ссылки
- `components/landing/Hero.tsx` — копирайт F3-B
- `components/landing/Solutions.tsx` — 4 → 3 карточки, цены, выделенная wedge
- `components/landing/Cta.tsx` — RU + telegram-ссылка
- `components/landing/Footer.tsx` — RU + 3 ссылки в контактах

### Не трогаются
- `app/globals.css` (токены сохраняются)
- `components/ui/*` (button, card, slider, RevealOnScroll)
- `app/about/`, `app/blog/`, `app/book-call/`, `app/faq/`, `app/products/` — страницы остаются как есть, не наш scope
- `package.json` — никаких новых зависимостей
- `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json` — без изменений

## 7. Verification criteria

Для каждой секции, после имплементации:

- [ ] `npm run build` проходит без ошибок
- [ ] `npm run lint` без ошибок
- [ ] Секция рендерится в `npm run dev` (визуальная проверка пользователем в браузере)
- [ ] Мобильная вёрстка (DevTools 375px width) — текст не вылазит, грид схлопывается, кнопки кликабельны
- [ ] Нет em-dash в публичных строках (поиск `—` по итоговым .tsx файлам)
- [ ] Нет упоминаний "StarSmile" / "Avito" / "MediaMarkt" / "@mind.flow777" в публичном тексте
- [ ] Все внешние ссылки открываются `target="_blank" rel="noopener noreferrer"`

После всего: проверка пользователя в браузере на desktop + mobile, апрув → коммит на ветку `claude-refactor`, push (без merge в master).

## 8. Anti-scope (что НЕ делаем в этой сессии)

- Не редизайним цветовую палитру / шрифт / основные размеры
- Не делаем мультиязычность (EN — отдельным проектом)
- Не делаем страницы /about, /products, /blog, /faq — оставляем как заглушки
- Не добавляем анимации/motion (существующего RevealOnScroll достаточно)
- Не подключаем аналитику (Yandex Metrika / GA4)
- Не настраиваем формы / email-capture / lead-gen
- Не деплоим — только локально и push на ветку `claude-refactor`
- Не пишем тесты на UI (вёрстка проверяется визуально)
- Не делаем дополнительных страниц (одностраничник)
