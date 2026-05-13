import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const faqs = [
  { q: "What kind of AI solutions do you build?", a: "We build custom AI agents, chatbots, voice bots, internal automation tools, and full AI-powered applications tailored to your business needs." },
  { q: "How long does a typical project take?", a: "Most projects go live in 1-2 weeks. Complex systems may take longer, but we always define timelines upfront." },
  { q: "Do I need technical knowledge to work with you?", a: "No. We handle all the technical work and explain everything in plain language. You focus on your business, we handle the AI." },
  { q: "What tools and platforms do you use?", a: "We work with whatever fits your stack - n8n, Make, custom APIs, CRMs, Telegram, WhatsApp, Slack, and more. We build around your existing tools." },
  { q: "What happens after the project is delivered?", a: "We provide ongoing support and can iterate on the system as your needs evolve. We don't disappear after launch." },
  { q: "How much does it cost?", a: "Projects start from $1,000. Pricing depends on complexity and scope, which we clarify during the initial call." },
];

export default function FAQ() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] mb-10 text-center">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6">
                <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-2">{faq.q}</h3>
                <p className="text-[var(--light-text)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
