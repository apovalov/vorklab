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
    priceLabel: "One-time",
    originalPrice: "$200",
    priceNote: "Consultation & written roadmap",
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
    label: "Conversational AI",
    title: "Voice / Text Agent",
    pitch: "An AI agent that answers customer questions, qualifies enquiries, or books appointments through voice or chat.",
    price: "$400",
    priceLabel: "From",
    originalPrice: undefined,
    priceNote: "Setup + hosting and usage billed separately",
    duration: "3-7 days for an initial setup",
    bullets: [
      "One voice or chat channel, connected to your tools",
      "Answers grounded in your documents and knowledge base",
      "Two 30-minute onboarding calls",
      "One month of support and prompt updates",
    ],
    ctaLabel: "Book a discovery call",
    highlight: true,
  },
  {
    icon: Workflow,
    label: "Development automation",
    title: "Automate Your Development",
    pitch: "Turn GitHub tasks into code and reviewed pull requests with Autop. We set it up for your project and your approval rules.",
    price: "$800",
    priceLabel: "From",
    originalPrice: undefined,
    priceNote: "Integration + subscriptions and hosting separately",
    duration: "3-7 days to integrate",
    bullets: [
      "Autop runner setup and GitHub integration",
      "Configure coding, review, and merge approval rules",
      "Pilot on real tasks in one agreed repository",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
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
                      Voice / text agent setup
                    </span>
                  )}
                  <Icon className="text-[var(--vorklab-accent)] mb-4" size={28} />
                  <p className="text-[var(--light-text)] text-xs uppercase tracking-wider font-semibold mb-2">
                    {tier.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] mb-3 lg:min-h-16">
                    {tier.title}
                  </h3>
                  <p className="text-[var(--light-text)] text-sm md:text-base mb-5 lg:min-h-24">
                    {tier.pitch}
                  </p>
                  <div className="border-t border-[var(--vorklab-card-border)]/60 pt-5 mb-3">
                    <p className="text-xs font-medium uppercase tracking-widest text-[var(--light-text)] mb-2">
                      {tier.priceLabel}
                    </p>
                    <div className="flex items-baseline gap-3 whitespace-nowrap tabular-nums">
                      <span className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-none ${tier.originalPrice || isHighlighted ? "text-[var(--vorklab-accent)]" : "text-[var(--main-text)]"}`}>
                        {tier.originalPrice && <span className="sr-only">Current price: </span>}
                        {tier.price}
                      </span>
                      {tier.originalPrice && (
                        <s className="text-lg font-normal text-[var(--light-text)] decoration-1">
                          <span className="sr-only">Regular price: </span>
                          {tier.originalPrice}
                        </s>
                      )}
                    </div>
                    <p className="text-[var(--light-text)] text-xs sm:text-sm mt-3 leading-5">
                      {tier.priceNote}
                    </p>
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
