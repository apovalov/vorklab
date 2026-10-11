import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const faqs = [
  { q: "What kind of AI solutions do you build?", a: "We build voice and text AI agents for customer questions, enquiries, and booking. We also integrate Autop to automate development tasks, code reviews, and pull requests in GitHub." },
  { q: "How long does a typical project take?", a: "An initial voice or text agent setup typically takes 3-7 days. Autop development automation takes 3-7 days to integrate for an agreed pilot. We confirm scope, access requirements, and timing before starting." },
  { q: "What is included in development automation?", a: "We integrate Autop with one agreed GitHub repository, set up its runner on your infrastructure, configure coding and review steps, and test the flow on real tasks. You choose where human approval is required. We provide documentation and team handover. Required accounts and subscriptions are agreed before setup." },
  { q: "Do I need technical knowledge to work with you?", a: "No. We handle all the technical work and explain everything in plain language. You focus on your business, we handle the AI." },
  { q: "What tools and platforms do you use?", a: "We work with whatever fits your stack - n8n, Make, custom APIs, CRMs, Telegram, WhatsApp, Slack, and more. We build around your existing tools." },
  { q: "What happens after the project is delivered?", a: "We provide ongoing support and can iterate on the system as your needs evolve. We don't disappear after launch." },
  { q: "How much does it cost?", a: "All prices are in US dollars (USD): consultation is $100, a voice or text agent starts at $400, and development automation integration starts at $800. Hosting, model usage, telephony, and any required product subscriptions are separate. We confirm all expected costs and the final scope before work begins." },
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
