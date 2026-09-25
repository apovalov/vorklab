import { ClipboardCheck, Bot, Workflow } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CALENDLY_URL } from "@/lib/constants";

const tiers = [
  {
    icon: ClipboardCheck,
    label: "Start here",
    title: "AI consultation and audit",
    pitch: "A 60-minute call and a written roadmap: what to implement and in what order.",
    price: "$100",
    originalPrice: "$200",
    priceNote: "One-time",
    duration: "1 week",
    bullets: [
      "60-minute discovery call",
      "A structured assessment of your needs",
      "Written roadmap with priorities",
      "Recommended next step",
    ],
    ctaLabel: "Book a call",
    highlight: false,
  },
  {
    icon: Bot,
    label: "AI assistant",
    title: "Your own AI assistant",
    pitch: "A Telegram bot or OpenWebUI assistant with retrieval over your documents and knowledge base.",
    price: "From $200",
    originalPrice: "$400",
    priceNote: "+ ~$50/month hosting",
    duration: "3–7 days to set up",
    bullets: [
      "Deployment on your server or managed infrastructure",
      "Answers grounded in your documents and knowledge base",
      "Two 30-minute onboarding calls",
      "One month of support and prompt updates",
    ],
    ctaLabel: "Book a discovery call",
    highlight: true,
  },
  {
    icon: Workflow,
    label: "Workflow automation",
    title: "Automate one workflow",
    pitch: "An FAQ bot, lead processing, a team assistant, or reporting: one workflow delivered end to end.",
    price: "From $800",
    originalPrice: undefined,
    priceNote: undefined,
    duration: "2–4 weeks",
    bullets: [
      "Discovery → MVP → iteration → handover",
      "One agreed workflow: support, leads, content, reporting, or booking",
      "Before-and-after metrics and A/B testing",
      "Documentation and team handover",
    ],
    ctaLabel: "Discuss your project",
    highlight: false,
  },
] as const;

export function Solutions() {
  return (
    <section id="solutions" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Services and pricing
          </h2>
          <p className="text-center text-sm text-[var(--light-text)] mb-8">
            All prices in USD. Final scope and quote agreed before work begins.
          </p>
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
                      AI assistant setup
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
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                    {tier.originalPrice && (
                      <s className="text-lg md:text-xl text-[var(--light-text)] decoration-1">
                        <span className="sr-only">Regular price: </span>
                        {tier.originalPrice}
                      </s>
                    )}
                    <span className={`text-2xl md:text-3xl font-bold ${tier.originalPrice ? "text-[var(--vorklab-accent)]" : "text-[var(--main-text)]"}`}>
                      {tier.originalPrice && <span className="sr-only">Current price: </span>}
                      {tier.price}
                    </span>
                  </div>
                  {tier.priceNote && (
                    <p className="text-[var(--light-text)] text-sm mb-2">
                      {tier.priceNote}
                    </p>
                  )}
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
