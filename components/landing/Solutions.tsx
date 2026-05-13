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
            Услуги и цены
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
