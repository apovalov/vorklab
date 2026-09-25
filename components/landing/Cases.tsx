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
    title: "Customer support AI for a major marketplace",
    role: "AI/ML Engineer · 20M+ buyers, 5 languages",
    bullets: [
      { text: "Multilingual RAG + agentic workflows (PL / CZ / SK / HU / EN)" },
      { text: "Proof of concept to production in 26 weeks" },
      { text: "~45% auto-resolution, CSAT ~76%, p95 ≤ 350ms", metric: "yes" },
      { text: "Hybrid retrieval over 40M+ chunks; 5× reduction in hallucinations using a critic and reranker" },
    ],
  },
  {
    tags: [
      { text: "NDA", kind: "nda" },
      { text: "Medtech · Voice + Text", kind: "domain" },
    ],
    title: "Voice and text AI assistants for a medtech service",
    role: "AI Engineer · production traffic at clinics",
    bullets: [
      { text: "Handling and qualifying incoming voice and text enquiries" },
      { text: "Booking, rescheduling, cancellations, confirmations, and reminders" },
      { text: "LangGraph and voice tools (Eleven / Silero / Yandex), with domain-specific retrieval" },
      { text: "Production evaluations and guardrails to detect unsupported answers" },
    ],
  },
  {
    tags: [
      { text: "NDA", kind: "nda" },
      { text: "E-commerce retailer · Recommendations", kind: "domain" },
    ],
    title: "Recommendation systems for a major e-commerce retailer",
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
    title: "Lifetime value, churn, anomaly detection, and segmentation for a game studio",
    role: "ML Engineer · production CRM impact",
    bullets: [
      { text: "Production lifetime-value model: +19% marketing campaign ROI", metric: "yes" },
      { text: "Churn prediction (CatBoost / SGB) + anomaly detection (IsolationForest)" },
      { text: "Player clustering (DBSCAN) for personalised CRM workflows" },
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
            Engineering experience
          </h2>
        </RevealOnScroll>

        <p className="text-center text-[var(--light-text)] text-sm max-w-2xl mx-auto mb-8">
          Selected work from Valentin Shapovalov’s engineering career, including roles before VorkLab. These projects show the experience behind the practice.
        </p>
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
