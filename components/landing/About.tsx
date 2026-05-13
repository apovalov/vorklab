import { Send, GitBranch } from "lucide-react";
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
                  Делаем AI-внедрения под ключ: текстовые и голосовые агенты, RAG, evals. Production-опыт в маркетплейсе ЦВЕ, medtech и e-commerce. Канал @focus_ops - про процесс и реальные кейсы; GitHub - открытые компоненты и шаблоны.
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
                    <GitBranch size={14} />
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
