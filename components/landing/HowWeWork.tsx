import Link from "next/link";
import { Target, Wrench, Eye, HeartHandshake } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const steps = [
  {
    icon: Target,
    title: "Clear success criteria",
    description: 'We define what "success" means before building anything.',
  },
  {
    icon: Wrench,
    title: "Built around your tools",
    description: "We design AI systems that fit into the tools and processes you already use, so your team doesn't need to learn new platforms.",
  },
  {
    icon: Eye,
    title: "Full ownership & clarity",
    description: "You get a custom-built system with full visibility and ownership, so you understand how it works and can evolve it.",
  },
  {
    icon: HeartHandshake,
    title: "Support beyond launch",
    description: "We don't disappear after delivery.",
  },
] as const;

export function HowWeWork() {
  return (
    <section id="why-us" className="bg-[var(--base-bg)] relative py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-8 md:mb-16">
            How we work
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step) => (
            <RevealOnScroll key={step.title}>
              <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8 hover:brightness-125 transition-all duration-300">
                <step.icon className="text-[var(--vorklab-accent)] mb-4" size={28} />
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] mb-3">{step.title}</h3>
                <p className="text-[var(--light-text)] text-base md:text-lg">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll>
          <div className="text-center mt-10">
            <Link href="/about" className="text-[var(--vorklab-accent)] hover:brightness-125 transition-all duration-300 text-base font-medium">
              Who we are →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
