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
