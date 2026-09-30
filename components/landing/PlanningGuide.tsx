import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export function PlanningGuide() {
  return (
    <section id="planning-guide" aria-labelledby="planning-guide-title" className="scroll-mt-20 bg-[var(--base-bg)] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-9 rounded-2xl border border-[var(--vorklab-accent)]/30 bg-[var(--hero-bg)] p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:p-12">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--vorklab-accent)]"><FileText size={16} aria-hidden="true" />Free guide + reusable prompt</p>
            <h2 id="planning-guide-title" className="mt-5 text-3xl font-bold leading-tight text-[var(--main-text)] md:text-4xl">Plan your first automation.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--heading-text)]">Choose one task, define a good result, and decide how to test it. Our practical guide helps you turn an idea into a clear implementation plan with your AI assistant.</p>
            <Link href="/guides/automation-planning" className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--vorklab-accent)] px-6 py-3 font-semibold text-[var(--base-bg)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--vorklab-accent)]">Read the guide<ArrowRight size={18} aria-hidden="true" /></Link>
            <p className="mt-3 text-sm text-[var(--light-text)]">Read online, copy the prompt, or download it. No sign-up.</p>
          </div>
          <div className="self-center rounded-xl border border-[var(--vorklab-card-border)]/60 bg-[var(--base-bg)]/50 p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-[var(--main-text)]">Leave with a plan that covers</h3>
            <ul className="mt-5 space-y-4 text-[var(--heading-text)]">
              {[
                "A clear scope and a result you can check",
                "Human decisions, spending limits, and recovery",
                "A small trial before a live rollout",
              ].map((item) => <li key={item} className="flex gap-3 leading-7"><span aria-hidden="true" className="text-[var(--vorklab-accent)]">✓</span><span>{item}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
