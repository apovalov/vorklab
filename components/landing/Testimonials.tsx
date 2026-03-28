import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const testimonials = [
  {
    quote: "We launched an AI assistant that now handles all inbound inquiries. Response time went from hours to seconds.",
    name: "Sarah M.",
    title: "Operations Director",
    company: "TechScale Solutions",
  },
  {
    quote: "The automation saves our team roughly 20 hours per week on reporting alone. Huge productivity boost.",
    name: "James K.",
    title: "Head of Engineering",
    company: "DataBridge Analytics",
  },
  {
    quote: "We needed help automating our client onboarding. The system now handles classification and document processing automatically.",
    name: "Elena R.",
    title: "Founder",
    company: "LegalFlow Partners",
  },
  {
    quote: "The team was spending too much time answering repetitive client questions. Now the AI handles most of it from our knowledge base.",
    name: "Michael T.",
    title: "Managing Director",
    company: "Greenfield Consulting",
  },
  {
    quote: "I needed a tool to track and manage my portfolio strategies. We built an app that does exactly that — total game changer.",
    name: "David L.",
    title: "Investment Analyst",
    company: "Apex Capital",
  },
];

export function Testimonials() {
  return (
    <section id="social-proof" className="py-16 md:py-20 bg-[var(--base-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] text-center mb-10 md:mb-14">
            Client feedback
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <RevealOnScroll key={t.name}>
              <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 hover:brightness-110 transition-all duration-300 flex flex-col">
                <p className="text-[var(--main-text)] text-base italic mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--vorklab-accent)]/20 flex items-center justify-center text-[var(--vorklab-accent)] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[var(--heading-text)] font-semibold text-sm">{t.name}</p>
                    <p className="text-[var(--light-text)] text-xs">{t.title} at {t.company}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
