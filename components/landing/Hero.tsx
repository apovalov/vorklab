import { CALENDLY_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-[var(--hero-bg)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--heading-text)] mb-6 hover:brightness-125 transition-all duration-300">
          AI automation that works for your business
        </h1>
        <p className="text-base md:text-lg text-[var(--light-text)] mb-10 max-w-2xl mx-auto">
          AI-студия с 15+ лет в IT. Production-опыт в маркетплейсах Восточной Европы, medtech и e-commerce. Помогаем SMB и руководителям команд внедрить AI: от ассистента до автоматизации воронок.
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
