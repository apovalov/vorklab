import {
  CALENDLY_URL,
  CONTACT,
  TELEGRAM_PERSONAL,
  TELEGRAM_PERSONAL_HANDLE,
} from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Cta() {
  return (
    <section id="contact" className="py-16 md:py-20 bg-[var(--base-bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-6">
            Tell us what you want to improve
          </h2>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-[var(--light-text)] text-base md:text-lg mb-8 max-w-2xl mx-auto">
            In a free 30-minute call, we will review your current process and discuss where AI could help. You will leave with a clear next step, with no obligation.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] text-base px-8 py-4 font-medium"
          >
            Book a 30-minute discovery call
          </a>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="mt-12 bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-3">
              Prefer to write first?
            </h3>
            <p className="text-[var(--light-text)] text-sm mb-4">
              Send a message about your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center border border-[var(--vorklab-accent)] text-[var(--vorklab-accent)] hover:bg-[var(--vorklab-accent)]/10 rounded-[var(--border-radius-main)] px-6 py-2 text-sm font-medium transition-all duration-300"
              >
                {CONTACT.email}
              </a>
              <a
                href={TELEGRAM_PERSONAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[var(--vorklab-accent)] text-[var(--vorklab-accent)] hover:bg-[var(--vorklab-accent)]/10 rounded-[var(--border-radius-main)] px-6 py-2 text-sm font-medium transition-all duration-300"
              >
                Telegram {TELEGRAM_PERSONAL_HANDLE}
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
