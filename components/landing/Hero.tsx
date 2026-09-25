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
          VorkLab is an AI engineering practice led by Valentin Shapovalov, with 15+ years in IT. We help business owners and teams build AI assistants and automate workflows, drawing on production experience in marketplaces, medtech, and e-commerce.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-base px-8 py-4 font-medium"
          >
            Book a 30-minute discovery call
          </a>
          <p className="text-sm text-[var(--light-text)]">
            Tell us about your challenge. We will suggest a practical next step, with no obligation.
          </p>
        </div>
      </div>
    </section>
  );
}
