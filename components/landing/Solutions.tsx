import Link from "next/link";
import { Bot, MessageSquare, Settings, Rocket } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const solutions = [
  {
    icon: Bot,
    title: "AI Agents & Assistants",
    description:
      "Agents that handle conversations, qualification, scheduling, and internal tasks — integrated into your business workflows.",
  },
  {
    icon: MessageSquare,
    title: "Chatbots & Voice Bots",
    description:
      "Conversational AI for lead handling, customer support, onboarding, and internal communication — beyond simple scripted bots.",
  },
  {
    icon: Settings,
    title: "Custom Internal AI Tools",
    description:
      "AI-powered internal tools that connect data, automate decisions, and reduce manual operational work across teams.",
  },
  {
    icon: Rocket,
    title: "Custom AI Apps & MVPs",
    description:
      "From idea to working AI-powered applications — internal tools, client-facing apps, and product MVPs built for real use.",
  },
] as const;

export function Solutions() {
  return (
    <section id="ai-solutions" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Examples of AI systems we build
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((solution) => (
            <RevealOnScroll key={solution.title}>
              <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8 hover:brightness-125 transition-all duration-300">
                <solution.icon
                  className="text-[var(--vorklab-accent)] mb-4"
                  size={32}
                />
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] mb-3">
                  {solution.title}
                </h3>
                <p className="text-[var(--light-text)] text-base md:text-lg">
                  {solution.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="text-[var(--vorklab-accent)] hover:brightness-125 transition-all duration-300 text-base font-medium"
            >
              See what we&apos;ve built →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
