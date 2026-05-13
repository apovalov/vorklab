# vorklab.com Site Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Spec:** [`docs/superpowers/specs/2026-05-13-vorklab-site-refactor-design.md`](../specs/2026-05-13-vorklab-site-refactor-design.md)

**Goal:** Refactor vorklab.com from EN generic SaaS landing to a 7-section RU minimally-sufficient landing for VorkLab Lane B funnel (Hero · Solutions · AutomateBlock · Cases · About · CTA · Footer).

**Architecture:** Pure component-level refactor of `components/landing/*.tsx`. Stack unchanged (Next.js 16 + React 19 + Tailwind 4 + Shadcn UI). Existing design tokens in `globals.css` preserved. No tests on UI per spec §8 - verification is `npm run build`, `npm run lint`, plus manual browser preview (desktop + mobile devtools).

**Tech Stack:** Next.js 16.2.1, React 19.2.4, Tailwind 4, Shadcn UI, lucide-react 1.7.0, TypeScript 5.

**Branch:** `claude-refactor` (already current). Never commit to `master`. Push at the end of each task to keep remote sync.

---

## File Structure (changes overview)

### Created
| File | Responsibility | Used in |
|---|---|---|
| `components/landing/AutomateBlock.tsx` | Section "Что мы автоматизируем" - 6 process cards 3×2 with proof/scope pills | `app/page.tsx` |
| `components/landing/Cases.tsx` | Section "Past-work" - 4 case cards 2×2 with NDA/open tags + metrics | `app/page.tsx` |
| `components/landing/About.tsx` | Section "Об авторе" - avatar + bio + social pills | `app/page.tsx` |

### Deleted
| File | Why |
|---|---|
| `components/landing/RoiCalculator.tsx` | Replaced by AutomateBlock; obsolete 70%-promise contradicts new tone |
| `components/landing/Testimonials.tsx` | Replaced by Cases; contained 5 fake testimonials |
| `components/landing/HowWeWork.tsx` | Redundant - differentiator now lives in AutomateBlock + Cases via facts |

### Modified
| File | Changes |
|---|---|
| `lib/constants.ts` | RU NAV_LINKS, RU FOOTER_LINKS, real CONTACT (apovalov@gmail.com, no phone), new TELEGRAM_PERSONAL / TELEGRAM_CHANNEL / GITHUB_URL constants |
| `app/layout.tsx` | `lang="ru"`, RU `<title>` / description / OG metadata |
| `components/landing/Navbar.tsx` | RU labels, anchor hrefs to in-page sections, RU CTA |
| `components/landing/Hero.tsx` | New F3-B headline + subhead + microcopy, RU |
| `components/landing/Solutions.tsx` | 4 → 3 cards, prices, wedge highlighted, RU |
| `components/landing/Cta.tsx` | RU copy, secondary block with mailto + Telegram link |
| `components/landing/Footer.tsx` | RU, real contacts (no fake phone, no Avito/YouTube) |
| `app/page.tsx` | New composition: Navbar / Hero / Solutions / AutomateBlock / Cases / About / Cta / Footer |

### Not touched
- `app/globals.css` - dark theme tokens preserved
- `components/ui/*` - shared primitives untouched
- `app/about/`, `app/blog/`, `app/book-call/`, `app/faq/`, `app/products/` - stub pages out of scope
- `package.json` - no new dependencies
- Build config files (`tsconfig.json`, `next.config.ts`, etc.)

---

## Execution Cadence

After each task: (a) `npm run build` must pass, (b) `npm run dev` and user previews in browser, (c) user confirms OK, (d) commit. Push at task boundaries that complete a logical block (e.g. after every 2-3 tasks).

If a task changes `app/page.tsx` such that an imported component doesn't exist yet, that's an intermediate broken state - only commit when the build passes again.

---

## Task 1: Foundation - constants, layout language, metadata

**Files:**
- Modify: `lib/constants.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite `lib/constants.ts`**

Replace the entire contents with:

```typescript
export const CALENDLY_URL = "https://calendly.com/apovalov/30min";

export const CONTACT = {
  email: "apovalov@gmail.com",
} as const;

export const TELEGRAM_PERSONAL = "https://t.me/apovalov";
export const TELEGRAM_PERSONAL_HANDLE = "@apovalov";
export const TELEGRAM_CHANNEL = "https://t.me/focus_ops";
export const TELEGRAM_CHANNEL_HANDLE = "@focus_ops";
export const GITHUB_URL = "https://github.com/apovalov";
export const GITHUB_HANDLE = "apovalov";

export const NAV_LINKS = [
  { label: "Услуги", href: "/#solutions" },
  { label: "Что автоматизируем", href: "/#automate" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Об авторе", href: "/#about" },
] as const;

export const FOOTER_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/#solutions" },
  { label: "Что автоматизируем", href: "/#automate" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Об авторе", href: "/#about" },
  { label: "Контакт", href: "/#contact" },
] as const;
```

Notes for the engineer:
- `CONTACT.phone` is removed entirely — every consumer must drop the `tel:` link.
- All anchor hrefs use `/#section-id` (absolute path + hash) so they work from any route.

- [ ] **Step 2: Update `app/layout.tsx`**

Open the file. Two changes:

(a) Change `<html lang="en"` to `<html lang="ru"`.

(b) Replace the entire `metadata` export block (currently EN with em-dashes) with:

```typescript
export const metadata: Metadata = {
  title: "VorkLab - AI-студия с production-опытом",
  description:
    "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсе ЦВЕ, medtech и e-commerce. От ассистента до автоматизации воронок.",
  metadataBase: new URL("https://vorklab.com"),
  openGraph: {
    title: "VorkLab - AI-студия с production-опытом",
    description:
      "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсе ЦВЕ, medtech и e-commerce.",
    type: "website",
    url: "https://vorklab.com",
    siteName: "VorkLab",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "VorkLab - AI-студия с production-опытом",
    description:
      "AI-внедрения для бизнеса. 15+ лет в IT, прод-опыт в маркетплейсе ЦВЕ, medtech и e-commerce.",
  },
  robots: "index, follow",
  other: {
    "theme-color": "#5EEAD4",
  },
};
```

No em-dashes anywhere. Verify after save: `grep "—" app/layout.tsx` should return nothing.

- [ ] **Step 3: Build verification**

Run from project root:
```bash
npm run build
```

Expected: green build. If anything imports `CONTACT.phone` it fails - that's Footer (we'll fix in task 2). For now, **this step is allowed to fail on Footer** because next task fixes it. If you see other build errors, stop and debug.

- [ ] **Step 4: Commit**

```bash
git add lib/constants.ts app/layout.tsx
git commit -m "refactor: RU constants, layout lang+metadata"
```

Don't push yet - waiting on Task 2 to make build pass again.

---

## Task 2: Navbar + Footer RU refactor

**Files:**
- Modify: `components/landing/Navbar.tsx`
- Modify: `components/landing/Footer.tsx`

- [ ] **Step 1: Rewrite `components/landing/Navbar.tsx`**

Replace entire file with:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CALENDLY_URL } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-[var(--base-bg)]/90 backdrop-blur-md border-b border-[var(--vorklab-card-border)]/30"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-[var(--main-text)]">
            VorkLab
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-sm font-medium px-4 h-8"
            >
              Записаться на разбор
            </a>
          </div>

          <button
            className="md:hidden text-[var(--main-text)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-sm font-medium px-4 h-8"
            >
              Записаться на разбор
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
```

Differences from previous version: `Book a Call` → `Записаться на разбор`, `aria-label="Toggle menu"` → `Открыть меню`. Anchor hrefs come from RU NAV_LINKS via constants.

- [ ] **Step 2: Rewrite `components/landing/Footer.tsx`**

Replace entire file with:

```typescript
import Link from "next/link";
import {
  FOOTER_LINKS,
  CONTACT,
  TELEGRAM_PERSONAL,
  TELEGRAM_PERSONAL_HANDLE,
  TELEGRAM_CHANNEL,
  TELEGRAM_CHANNEL_HANDLE,
  GITHUB_URL,
  GITHUB_HANDLE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--base-bg)] border-t border-[var(--vorklab-card-border)]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-[var(--main-text)]">
              VorkLab
            </Link>
            <p className="text-[var(--light-text)] text-sm mt-3">
              AI-студия с production-опытом. Внедряем AI в бизнес-процессы под ключ.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">
              Навигация
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">
              Контакт
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_PERSONAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  Telegram {TELEGRAM_PERSONAL_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  Канал {TELEGRAM_CHANNEL_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--light-text)] hover:text-[var(--main-text)] transition-colors duration-300"
                >
                  GitHub {GITHUB_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--vorklab-card-border)]/30 mt-8 pt-8 text-center">
          <p className="text-[var(--light-text)] text-xs">© 2026 VorkLab</p>
        </div>
      </div>
    </footer>
  );
}
```

Differences: no `tel:` link, no `Prefer text? Contact us` line. 4 contact links (email + 2 telegram + github). Copyright simplified to `© 2026 VorkLab`.

- [ ] **Step 3: Verify build + lint**

```bash
npm run build
npm run lint
```

Expected: both green. Build should now pass since `CONTACT.phone` is no longer referenced.

- [ ] **Step 4: Dev preview**

```bash
npm run dev
```

Open http://localhost:3000. Verify Navbar items show in RU (Услуги / Что автоматизируем / Кейсы / Об авторе), CTA button reads "Записаться на разбор". Scroll to bottom: Footer in RU, 4 contact links, no phone, no Avito. Mobile preview (DevTools 375px): hamburger menu opens with RU links.

User confirms OK → continue.

- [ ] **Step 5: Commit and push**

```bash
git add components/landing/Navbar.tsx components/landing/Footer.tsx
git commit -m "refactor: RU Navbar and Footer with real contacts"
git push origin claude-refactor
```

---

## Task 3: Hero refactor (F3-B copy)

**Files:**
- Modify: `components/landing/Hero.tsx`

- [ ] **Step 1: Rewrite `components/landing/Hero.tsx`**

Replace entire file with:

```typescript
import { CALENDLY_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-[var(--hero-bg)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--heading-text)] mb-6 hover:brightness-125 transition-all duration-300">
          AI-студия с production-опытом. От задачи до проды - в неделях, не в кварталах.
        </h1>
        <p className="text-base md:text-lg text-[var(--light-text)] mb-10 max-w-2xl mx-auto">
          15+ лет в IT, реальные внедрения в маркетплейсе ЦВЕ, medtech и e-commerce. Помогаем SMB и руководителям команд - от личного ассистента до автоматизации обработки обращений и воронок.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-base px-8 py-4 font-medium"
          >
            Записаться на 30-мин разбор
          </a>
          <p className="text-sm text-[var(--light-text)]">
            Без КП и обязательств. Послушаем задачу и предложим формат.
          </p>
        </div>
      </div>
    </section>
  );
}
```

No em-dashes, no `&apos;`, no English. Structure unchanged (`<section id="hero">`, full-screen height, accent CTA, microcopy below).

- [ ] **Step 2: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Verify: headline reads in two lines on desktop with the hyphen between "до проды" and "в неделях". Subhead readable on mobile (DevTools 375px). CTA button visible and bright. Microcopy reads "Без КП и обязательств. Послушаем задачу и предложим формат."

Run a sanity check from another terminal:
```bash
grep -c "—" components/landing/Hero.tsx
```
Expected output: `0`.

User confirms OK → continue.

- [ ] **Step 3: Commit**

```bash
git add components/landing/Hero.tsx
git commit -m "refactor(hero): RU F3-B copy"
```

---

## Task 4: Solutions refactor (3 pricing cards, wedge highlighted)

**Files:**
- Modify: `components/landing/Solutions.tsx`

- [ ] **Step 1: Rewrite `components/landing/Solutions.tsx`**

Replace entire file with:

```typescript
import { ClipboardCheck, Bot, Workflow } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CALENDLY_URL } from "@/lib/constants";

const tiers = [
  {
    icon: ClipboardCheck,
    label: "Tripwire · вход",
    title: "Часовая консультация / AI-аудит",
    pitch: "60-мин звонок + roadmap-документ: что внедрять и в каком порядке.",
    price: "9 000 ₽",
    priceNote: "~$100",
    duration: "1 неделя",
    bullets: [
      "60-минутный звонок-разбор",
      "12-вопросный скоринг по фреймворку Discovery",
      "Roadmap-документ с приоритетами",
      "Рекомендация по следующему шагу",
    ],
    ctaLabel: "Записаться",
    highlight: false,
  },
  {
    icon: Bot,
    label: "Wedge · якорь",
    title: "Личный AI-ассистент под ключ",
    pitch: "Telegram-бот или OpenWebUI с RAG по вашим документам и базе знаний.",
    price: "от 15 000 ₽",
    priceNote: "+ ~50$/мес инфра",
    duration: "3-7 дней setup",
    bullets: [
      "Установка на ваш сервер или нашу инфру",
      "RAG по вашей базе знаний / документам",
      "2 онбординг-созвона по 30 минут",
      "Поддержка месяц + обновления промптов",
    ],
    ctaLabel: "Записаться на разбор",
    highlight: true,
  },
  {
    icon: Workflow,
    label: "Core · автоматизация",
    title: "Автоматизация одного процесса",
    pitch: "Чат-бот FAQ, обработка заявок, помощник менеджеру, отчётность - один процесс под ключ.",
    price: "от 30 000 ₽",
    priceNote: undefined,
    duration: "2-4 недели",
    bullets: [
      "Discovery → MVP → итерации → handover",
      "Один из 6 типовых: FAQ / заявки / описания / отчётность / запись",
      "AB-тест и метрики до и после",
      "Документация + передача команде",
    ],
    ctaLabel: "Обсудить задачу",
    highlight: false,
  },
] as const;

export function Solutions() {
  return (
    <section id="solutions" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Услуги
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isHighlighted = tier.highlight;
            return (
              <RevealOnScroll key={tier.title}>
                <div
                  className={`relative bg-[var(--vorklab-card-bg)] rounded-[var(--border-radius-main)] p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:brightness-125 border ${
                    isHighlighted
                      ? "border-[var(--vorklab-accent)] shadow-[0_0_0_1px_rgba(94,234,212,0.2)]"
                      : "border-[var(--vorklab-card-border)]"
                  }`}
                >
                  {isHighlighted && (
                    <span className="absolute -top-3 right-4 bg-[var(--vorklab-accent)] text-[var(--base-bg)] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                      Самый частый
                    </span>
                  )}
                  <Icon className="text-[var(--vorklab-accent)] mb-4" size={28} />
                  <p className="text-[var(--light-text)] text-xs uppercase tracking-wider font-semibold mb-2">
                    {tier.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] mb-3">
                    {tier.title}
                  </h3>
                  <p className="text-[var(--light-text)] text-sm md:text-base mb-5">
                    {tier.pitch}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl md:text-3xl font-bold text-[var(--main-text)]">
                      {tier.price}
                    </span>
                    {tier.priceNote && (
                      <span className="text-[var(--light-text)] text-sm">
                        · {tier.priceNote}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--vorklab-accent)] text-xs font-semibold mb-5">
                    {tier.duration}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-[var(--main-text)] text-sm leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--vorklab-accent)]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-[var(--border-radius-main)] text-sm font-medium px-4 py-3 transition-all duration-300 ${
                      isHighlighted
                        ? "bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110"
                        : "border border-[var(--vorklab-accent)] text-[var(--vorklab-accent)] hover:bg-[var(--vorklab-accent)]/10"
                    }`}
                  >
                    {tier.ctaLabel}
                  </a>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

Notes:
- 3 cards (was 4). Middle (Wedge) has accent border + "Самый частый" badge + filled CTA. Side cards use outline CTA style.
- The legacy "See what we've built →" link is removed.
- Bullets use the `before:content-['→']` pseudo-element pattern, no list-disc default.
- Cards equal height through `h-full flex flex-col` + `flex-1` on the bullet list.
- Section id is `solutions` to match Navbar anchor.

- [ ] **Step 2: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Scroll to Solutions section. Verify:
- 3 columns on desktop ≥768px, single column on mobile
- Middle card has bright bird-eye accent border + "Самый частый" badge
- Prices visible at-a-glance (9 000 ₽ / от 15 000 ₽ / от 30 000 ₽)
- Bullets read with → arrow prefix
- Middle CTA "Записаться на разбор" filled, side CTAs outline
- All 3 cards have equal height

Em-dash check:
```bash
grep -c "—" components/landing/Solutions.tsx
```
Expected: `0`.

User confirms OK → continue.

- [ ] **Step 3: Commit**

```bash
git add components/landing/Solutions.tsx
git commit -m "refactor(solutions): 3 pricing tiers with wedge highlighted"
```

---

## Task 5: AutomateBlock (NEW) - 6 process cards, replaces RoiCalculator

**Files:**
- Create: `components/landing/AutomateBlock.tsx`
- Delete: `components/landing/RoiCalculator.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/landing/AutomateBlock.tsx`**

```typescript
import {
  MessageSquare,
  PhoneCall,
  Inbox,
  Bot,
  FileText,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ProofKind = "accent" | "neutral";

type Process = {
  icon: LucideIcon;
  title: string;
  description: string;
  proofKind: ProofKind;
  proofText: string;
  proofNote?: string;
};

const processes: readonly Process[] = [
  {
    icon: MessageSquare,
    title: "Чат-бот FAQ и поддержка",
    description:
      "Отвечает на типовые вопросы клиентов из вашей базы знаний. Эскалирует сложное оператору. Multilingual если нужно.",
    proofKind: "accent",
    proofText: "~45% обращений без оператора, CSAT ~76%",
    proofNote: "в проекте маркетплейса ЦВЕ, 20M+ покупателей",
  },
  {
    icon: PhoneCall,
    title: "Запись на услуги и подтверждения",
    description:
      "Входящие в голосе и тексте: квалификация, бронирование визитов, перенос / отмена, подтверждения, напоминания.",
    proofKind: "accent",
    proofText: "Live traffic в medtech-сервисе",
    proofNote: "прод-внедрение под NDA",
  },
  {
    icon: Inbox,
    title: "Обработка входящих заявок",
    description:
      "Quick triage: классификация по типу, заполнение полей в CRM, маршрутизация на ответственного.",
    proofKind: "neutral",
    proofText: "Интеграция с вашей CRM / Notion / Trello",
  },
  {
    icon: Bot,
    title: "Личный AI-ассистент команде",
    description:
      "Telegram-бот или OpenWebUI с RAG по вашим документам. Ответы под рукой, без поиска по Notion / Confluence / Google Drive.",
    proofKind: "accent",
    proofText: "Сетап за 3-7 дней",
    proofNote: "формат wedge, фикс-цена",
  },
  {
    icon: FileText,
    title: "Генерация описаний и контента",
    description:
      "Описания товаров для маркетплейсов и каталогов, SEO-страницы, шаблонные тексты под бренд-голос.",
    proofKind: "neutral",
    proofText: "Batch / API · под ваш бренд-голос",
  },
  {
    icon: BarChart3,
    title: "Сегментация и персональные сценарии",
    description:
      "Сегментация клиентов, LTV / churn, anomaly detection. Триггеры для CRM, маркетинга, удержания.",
    proofKind: "accent",
    proofText: "+19% ROI по маркетинговым кампаниям",
    proofNote: "gamedev-студия, classic ML",
  },
] as const;

export function AutomateBlock() {
  return (
    <section id="automate" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Что мы автоматизируем
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processes.map((process) => {
            const Icon = process.icon;
            const proofClasses =
              process.proofKind === "accent"
                ? "bg-[var(--vorklab-accent)]/10 border-[var(--vorklab-accent)]/30 text-[var(--vorklab-accent)]"
                : "bg-[var(--light-text)]/5 border-[var(--vorklab-card-border)] text-[var(--light-text)]";

            return (
              <RevealOnScroll key={process.title}>
                <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 h-full flex flex-col hover:brightness-125 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-[var(--vorklab-accent)]/10 flex items-center justify-center mb-4">
                    <Icon className="text-[var(--vorklab-accent)]" size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-2 leading-snug">
                    {process.title}
                  </h3>
                  <p className="text-[var(--light-text)] text-sm leading-relaxed mb-4 flex-1">
                    {process.description}
                  </p>
                  <div>
                    <span
                      className={`inline-block text-xs font-medium border rounded px-2.5 py-1 leading-snug ${proofClasses}`}
                    >
                      {process.proofText}
                    </span>
                    {process.proofNote && (
                      <p className="text-[var(--light-text)] text-[10px] mt-1.5">
                        {process.proofNote}
                      </p>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

Notes:
- 6 cards in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive behavior (1 col on mobile, 2 on tablet, 3 on desktop).
- Two pill styles: `accent` (bird-eye green - real proof) vs `neutral` (grey - scope-only).
- Section id `automate` matches Navbar anchor.
- Icons via lucide-react. Same color treatment as Solutions.

- [ ] **Step 2: Delete `components/landing/RoiCalculator.tsx`**

```bash
rm components/landing/RoiCalculator.tsx
```

Project will not compile yet because `app/page.tsx` still imports `RoiCalculator` - that's expected, fixed in next step.

- [ ] **Step 3: Update `app/page.tsx`**

Replace the entire file with the intermediate version (final composition comes in Task 9; here we swap RoiCalculator → AutomateBlock only):

```typescript
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { AutomateBlock } from "@/components/landing/AutomateBlock";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <AutomateBlock />
        <HowWeWork />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
```

`HowWeWork` and `Testimonials` are still here intentionally - they're deleted in Task 9 to keep build green between tasks.

- [ ] **Step 4: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Verify:
- Below Solutions, the new "Что мы автоматизируем" section appears with 6 cards
- 3 cards have bird-eye plashka (accent), 3 have grey plashka (neutral)
- Each accent card has a small grey disclaimer line below the pill
- Mobile (DevTools 375px): cards stack 1-wide; tablet (768px): 2-wide; desktop (1024px+): 3-wide

User confirms OK → continue.

- [ ] **Step 5: Commit and push**

```bash
git add components/landing/AutomateBlock.tsx app/page.tsx
git rm components/landing/RoiCalculator.tsx
git commit -m "feat(automate-block): replace ROI calc with 6 process cards"
git push origin claude-refactor
```

---

## Task 6: Cases (NEW) - 4 case cards, replaces Testimonials

**Files:**
- Create: `components/landing/Cases.tsx`
- Delete: `components/landing/Testimonials.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/landing/Cases.tsx`**

```typescript
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Tag = {
  text: string;
  kind: "open" | "nda" | "domain";
};

type Bullet = {
  text: string;
  metric?: string;
};

type Case = {
  tags: readonly Tag[];
  title: string;
  role: string;
  bullets: readonly Bullet[];
};

const cases: readonly Case[] = [
  {
    tags: [
      { text: "✓ Allegro", kind: "open" },
      { text: "CEE Marketplace · Support AI", kind: "domain" },
    ],
    title: "Customer Support AI в крупнейшем маркетплейсе ЦВЕ",
    role: "AI/ML Engineer · 20M+ покупателей, 5 языков",
    bullets: [
      { text: "Multilingual RAG + agentic workflows (PL / CZ / SK / HU / EN)" },
      { text: "PoC → prod за 26 недель" },
      { text: "~45% auto-resolution, CSAT ~76%, p95 ≤ 350ms", metric: "yes" },
      { text: "Гибридный retrieval по 40M+ чанков, hallucinations ↓×5 (critic + reranker)" },
    ],
  },
  {
    tags: [
      { text: "NDA", kind: "nda" },
      { text: "Medtech · Voice + Text", kind: "domain" },
    ],
    title: "Голосовые и текстовые AI-ассистенты для medtech-сервиса",
    role: "AI Engineer · live traffic, реальные клиники",
    bullets: [
      { text: "Обработка входящих обращений в голосе и тексте, квалификация" },
      { text: "Бронирование визитов, перенос / отмена, подтверждения, напоминания" },
      { text: "LangGraph + voice stack (Eleven / Silero / Yandex), RAG по доменной базе" },
      { text: "Evals и guardrails в проде - ловит галлюцинации до клиента" },
    ],
  },
  {
    tags: [
      { text: "NDA", kind: "nda" },
      { text: "E-commerce ритейлер · RecSys", kind: "domain" },
    ],
    title: "Рекомендательные системы для крупного европейского e-commerce-ритейлера",
    role: "AI/ML Engineer · production, AB-tested",
    bullets: [
      { text: "Similar-items (HNSW + ALS): +8% CTR", metric: "yes" },
      { text: "Complementary-items (co-purchase HNSW / ALS): +4.6% GMV", metric: "yes" },
      { text: "Learning-to-rank (CatBoost / YetiRank): +17% MAP", metric: "yes" },
    ],
  },
  {
    tags: [
      { text: "NDA", kind: "nda" },
      { text: "Gamedev Studio · Classic ML", kind: "domain" },
    ],
    title: "ML-стек для gamedev-студии: LTV, churn, аномалии, сегментация",
    role: "ML Engineer · production CRM impact",
    bullets: [
      { text: "LTV-модель в проде: +19% ROI по маркетинговым кампаниям", metric: "yes" },
      { text: "Churn prediction (CatBoost / SGB) + anomaly detection (IsolationForest)" },
      { text: "Player clustering (DBSCAN) для персональных CRM-сценариев" },
    ],
  },
] as const;

function tagClasses(kind: Tag["kind"]) {
  if (kind === "open") {
    return "bg-[var(--vorklab-accent)]/10 border-[var(--vorklab-accent)]/30 text-[var(--vorklab-accent)]";
  }
  if (kind === "nda") {
    return "bg-[var(--light-text)]/10 border-[var(--vorklab-card-border)] text-[var(--light-text)]";
  }
  return "bg-transparent border-[var(--vorklab-card-border)] text-[var(--light-text)]";
}

export function Cases() {
  return (
    <section id="cases" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Прошлый прод-опыт
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((c) => (
            <RevealOnScroll key={c.title}>
              <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8 h-full flex flex-col hover:brightness-125 transition-all duration-300">
                <div className="flex flex-wrap gap-2 mb-3">
                  {c.tags.map((tag) => (
                    <span
                      key={tag.text}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded border ${tagClasses(tag.kind)}`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--heading-text)] mb-1 leading-snug">
                  {c.title}
                </h3>
                <p className="text-[var(--light-text)] text-sm mb-4">{c.role}</p>
                <ul className="space-y-2 flex-1">
                  {c.bullets.map((bullet) => (
                    <li
                      key={bullet.text}
                      className={`text-sm leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--vorklab-accent)] ${
                        bullet.metric
                          ? "text-[var(--vorklab-accent)] font-medium"
                          : "text-[var(--main-text)]"
                      }`}
                    >
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Notes:
- 4 cards in `grid-cols-1 md:grid-cols-2` for 2×2 on tablet+desktop, single column on mobile
- All cards equal height (`h-full flex flex-col` + `flex-1` on bullets)
- Tag system: `open` (accent green tag for Allegro), `nda` (grey filled), `domain` (grey outline)
- Metric bullets highlighted in accent color
- Section id `cases` matches Navbar anchor

- [ ] **Step 2: Delete `components/landing/Testimonials.tsx`**

```bash
rm components/landing/Testimonials.tsx
```

Build will break temporarily because `app/page.tsx` imports `Testimonials` - next step fixes it.

- [ ] **Step 3: Update `app/page.tsx`** (swap Testimonials → Cases)

```typescript
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { AutomateBlock } from "@/components/landing/AutomateBlock";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Cases } from "@/components/landing/Cases";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <AutomateBlock />
        <HowWeWork />
        <Cases />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
```

`HowWeWork` still present - deleted in Task 9.

- [ ] **Step 4: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Scroll to "Прошлый прод-опыт" section. Verify:
- 4 cards in 2×2 grid (desktop), single column (mobile DevTools 375px)
- Allegro card has green "✓ Allegro" tag, other 3 have grey "NDA" tag
- Metric bullets (containing numbers like "+8% CTR", "+19% ROI") rendered in accent green
- All cards equal height

User confirms OK → continue.

- [ ] **Step 5: Commit and push**

```bash
git add components/landing/Cases.tsx app/page.tsx
git rm components/landing/Testimonials.tsx
git commit -m "feat(cases): replace fake testimonials with 4 production cases"
git push origin claude-refactor
```

---

## Task 7: About (NEW) - avatar + bio + social pills

**Files:**
- Create: `components/landing/About.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/landing/About.tsx`**

```typescript
import { Send, Github } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  TELEGRAM_CHANNEL,
  TELEGRAM_CHANNEL_HANDLE,
  GITHUB_URL,
  GITHUB_HANDLE,
} from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Об авторе
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <div
                aria-hidden="true"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-[var(--base-bg)] font-bold text-2xl md:text-3xl flex-shrink-0 bg-gradient-to-br from-[var(--vorklab-accent)] to-[#2dd4bf]"
              >
                В
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-[var(--heading-text)] mb-1">
                  Валентин Шаповалов
                </h3>
                <p className="text-[var(--light-text)] text-sm mb-4">
                  AI/ML Engineer · команда VorkLab · 15+ лет в IT · Белград
                </p>
                <p className="text-[var(--main-text)] text-sm md:text-base leading-relaxed mb-5">
                  Делаем AI-внедрения под ключ и публикуем процесс открыто. Production-опыт в маркетплейсе ЦВЕ, medtech и e-commerce. Канал @focus_ops - про процесс и реальные кейсы; GitHub - открытые компоненты и шаблоны.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={TELEGRAM_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--vorklab-card-border)] rounded-full text-[var(--light-text)] hover:text-[var(--vorklab-accent)] hover:border-[var(--vorklab-accent)] text-xs md:text-sm transition-colors duration-300"
                  >
                    <Send size={14} />
                    {`${TELEGRAM_CHANNEL_HANDLE} Telegram`}
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--vorklab-card-border)] rounded-full text-[var(--light-text)] hover:text-[var(--vorklab-accent)] hover:border-[var(--vorklab-accent)] text-xs md:text-sm transition-colors duration-300"
                  >
                    <Github size={14} />
                    {`GitHub ${GITHUB_HANDLE}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

Notes:
- Avatar is currently a coloured circle with the initial "В" - real photo can be added later by user.
- Bio reuses already-locked copy from spec §5.5.
- Two pills only: Telegram channel and GitHub. No Avito, no YouTube, no personal Telegram (the personal handle stays in Footer + CTA for direct contact).
- Section id `about` matches Navbar anchor.
- Responsive: avatar stacks above bio on mobile, sits left on desktop.

- [ ] **Step 2: Update `app/page.tsx`** (add About after Cases)

```typescript
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { AutomateBlock } from "@/components/landing/AutomateBlock";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Cases } from "@/components/landing/Cases";
import { About } from "@/components/landing/About";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <AutomateBlock />
        <HowWeWork />
        <Cases />
        <About />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Scroll to "Об авторе". Verify:
- Avatar circle on the left (desktop), top (mobile), with white "В" letter
- Bio + role line readable
- Two pills (Telegram + GitHub), hover changes to accent
- No phone number, no Avito link, no YouTube link

User confirms OK → continue.

- [ ] **Step 4: Commit**

```bash
git add components/landing/About.tsx app/page.tsx
git commit -m "feat(about): author block with bio and social pills"
```

---

## Task 8: CTA refactor (RU + Telegram link)

**Files:**
- Modify: `components/landing/Cta.tsx`

- [ ] **Step 1: Rewrite `components/landing/Cta.tsx`**

```typescript
import {
  CALENDLY_URL,
  CONTACT,
  TELEGRAM_PERSONAL,
  TELEGRAM_PERSONAL_HANDLE,
} from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Cta() {
  return (
    <section id="contact" className="py-16 md:py-20 bg-[var(--base-bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-6">
            Готовы обсудить задачу?
          </h2>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-[var(--light-text)] text-base md:text-lg mb-8 max-w-2xl mx-auto">
            30 минут разговора - расскажете, что у вас сейчас, мы скажем, чем можем помочь и в каком формате. Без КП и обязательств.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-base px-8 py-4 font-medium"
          >
            Записаться на 30-мин разбор
          </a>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="mt-12 bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-3">
              Не готовы созваниваться?
            </h3>
            <p className="text-[var(--light-text)] text-sm mb-4">
              Напишите - ответим в течение дня.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center border border-[var(--vorklab-accent)] text-[var(--vorklab-accent)] hover:bg-[var(--vorklab-accent)]/10 rounded-[var(--border-radius-main)] px-6 py-2 text-sm font-medium transition-all duration-300"
              >
                {CONTACT.email}
              </a>
              <a
                href={TELEGRAM_PERSONAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[var(--vorklab-accent)] text-[var(--vorklab-accent)] hover:bg-[var(--vorklab-accent)]/10 rounded-[var(--border-radius-main)] px-6 py-2 text-sm font-medium transition-all duration-300"
              >
                Telegram {TELEGRAM_PERSONAL_HANDLE}
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

Differences from previous: headline + body translated to RU, no generic "transform your business" line, secondary block now has 2 contact options (email + Telegram) instead of just 1 email.

- [ ] **Step 2: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Scroll to bottom (before Footer). Verify:
- "Готовы обсудить задачу?" headline in RU
- Two contact buttons in secondary block (email + Telegram), side-by-side on desktop, stacked on mobile

User confirms OK → continue.

- [ ] **Step 3: Commit**

```bash
git add components/landing/Cta.tsx
git commit -m "refactor(cta): RU copy and Telegram contact"
```

---

## Task 9: Drop HowWeWork + finalize `app/page.tsx` composition order

**Files:**
- Delete: `components/landing/HowWeWork.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Delete `components/landing/HowWeWork.tsx`**

```bash
rm components/landing/HowWeWork.tsx
```

- [ ] **Step 2: Rewrite `app/page.tsx`** (final 7-section composition)

```typescript
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Solutions } from "@/components/landing/Solutions";
import { AutomateBlock } from "@/components/landing/AutomateBlock";
import { Cases } from "@/components/landing/Cases";
import { About } from "@/components/landing/About";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <AutomateBlock />
        <Cases />
        <About />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
```

This is the final composition: Hero → Solutions → AutomateBlock → Cases → About → CTA → Footer.

- [ ] **Step 3: Verify build + dev preview**

```bash
npm run build && npm run dev
```

Open http://localhost:3000. Scroll full page top-to-bottom. Verify section order:
1. Navbar (fixed top)
2. Hero (dark `--hero-bg`, F3-B headline, CTA)
3. Услуги (3 pricing cards, middle highlighted)
4. Что мы автоматизируем (6 process cards)
5. Прошлый прод-опыт (4 case cards)
6. Об авторе (avatar + bio + 2 pills)
7. Готовы обсудить задачу? (CTA)
8. Footer

Click each Navbar link - smooth scroll to corresponding section anchor. No "HowWeWork" / "How we work" section visible anywhere.

User confirms OK → continue.

- [ ] **Step 4: Commit and push**

```bash
git add app/page.tsx
git rm components/landing/HowWeWork.tsx
git commit -m "refactor(page): drop HowWeWork, finalize 7-section composition"
git push origin claude-refactor
```

---

## Task 10: Final verification sweep

**Files:** none modified - this is QA only.

- [ ] **Step 1: Em-dash check across all touched files**

```bash
grep -rn "—" app/ components/landing/ lib/constants.ts
```

Expected: zero matches. If any found, replace with `-` and recommit.

- [ ] **Step 2: Forbidden words check**

```bash
grep -rin -E "starsmile|avito|mediamarkt|mind\.flow777|royal ark" app/ components/landing/ lib/constants.ts
```

Expected: zero matches. If any found, the public-facing leak must be fixed before claiming done.

- [ ] **Step 3: Build + lint final pass**

```bash
npm run build && npm run lint
```

Both must be green. Note any warnings - if there are new warnings introduced by this work, decide with user whether to address now or note as follow-up.

- [ ] **Step 4: Mobile responsive sweep**

Run `npm run dev`. In Chrome DevTools, Toggle Device Toolbar (Cmd+Shift+M on Mac). Test these widths:
- 375px (iPhone SE) - Hero text wraps OK, pricing cards stack, "Что автоматизируем" cards stack 1-wide, cases stack 1-wide, About card stacks vertical
- 768px (iPad portrait) - Solutions 3-wide visible? AutomateBlock should be 2-wide, Cases 2-wide
- 1024px+ (desktop) - all multi-column grids correct

User confirms all viewports OK.

- [ ] **Step 5: Browser cross-check**

Same dev server, open `http://localhost:3000` in:
- Chrome / Arc / Comet (current browser): full pass
- Safari (if available): quick visual scan - check that lucide icons render, dark theme intact, fonts load

- [ ] **Step 6: Final commit if anything was fixed**

If the sweep surfaced anything (em-dash leak, accidental forbidden word, layout break), commit those fixes:

```bash
git add <fixed-files>
git commit -m "fix: post-refactor cleanup from final sweep"
git push origin claude-refactor
```

If everything was clean from the start, skip this step.

- [ ] **Step 7: Hand off for code review**

At this point the refactor branch is ready. Invoke `superpowers:requesting-code-review` skill to get an independent review pass before considering merge to master.

Do **NOT** merge to master in this session. The user said master = stable v1, untouched until they decide to ship.

---

## Self-Review (writing-plans skill checklist)

**Spec coverage:**
- §1 Goal → Task 10 verification confirms minimally-sufficient state ✓
- §2 Constraints (stack, theme, RU, em-dash, mobile, no deploy) → enforced through Task 1 (lang+meta), Task 2-9 (RU copy + theme preserved), Task 10 (em-dash + mobile sweep) ✓
- §3 NDA & tone → enforced in Task 5 (AutomateBlock proof labels), Task 6 (Cases tags), Task 10 (forbidden words grep) ✓
- §4 Composition (7 sections) → assembled across Tasks 1-9, finalized in Task 9 ✓
- §5.1 Hero F3-B → Task 3 ✓
- §5.2 Solutions 3 cards → Task 4 ✓
- §5.3 AutomateBlock 6 cards → Task 5 ✓
- §5.4 Cases 4 cards 2×2 equal size → Task 6 ✓
- §5.5 About with avatar + bio + 2 pills → Task 7 ✓
- §5.6 CTA RU + Telegram → Task 8 ✓
- §5.7 Footer 3 cols RU → Task 2 ✓
- §5.8 Navbar RU + anchors → Task 2 ✓
- §6 File-level changes → all create/delete/edit operations covered by Tasks 1-9 ✓
- §7 Verification criteria (build, lint, mobile, em-dash, NDA, target=_blank) → Task 10 sweep ✓
- §8 Anti-scope → respected throughout (no new pages, no new deps, no analytics, no deploy) ✓

**Placeholder scan:** none found - every step has concrete code or commands.

**Type / name consistency:**
- Constants: `CONTACT.email`, `TELEGRAM_PERSONAL`, `TELEGRAM_PERSONAL_HANDLE`, `TELEGRAM_CHANNEL`, `TELEGRAM_CHANNEL_HANDLE`, `GITHUB_URL`, `GITHUB_HANDLE` defined in Task 1 and consumed by Tasks 2, 7, 8 with matching names ✓
- Section ids: `solutions`, `automate`, `cases`, `about`, `contact` defined consistently in components and referenced from NAV_LINKS / FOOTER_LINKS ✓
- Component names: `AutomateBlock`, `Cases`, `About` defined in their own files and imported with matching names in `app/page.tsx` across Tasks 5, 6, 7, 9 ✓
