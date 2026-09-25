import {
  MessageSquare,
  PhoneCall,
  Inbox,
  Bot,
  FileText,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ProofKind = "accent" | "neutral";

type Process = {
  icon: LucideIcon;
  title: string;
  description: string;
  proofKind: ProofKind;
  proofText: string;
  proofNote?: string;
};

const processes: readonly Process[] = [
  {
    icon: MessageSquare,
    title: "FAQ and customer support",
    description:
      "Answer common customer questions using your knowledge base and hand complex requests to a person. Add multilingual support where needed.",
    proofKind: "accent",
    proofText: "~45% automatic resolution, ~76% CSAT",
    proofNote: "From prior engineering experience at a marketplace with 20M+ buyers",
  },
  {
    icon: PhoneCall,
    title: "Appointment booking and reminders",
    description:
      "Handle voice and text enquiries, qualify requests, book or reschedule appointments, and send confirmations and reminders.",
    proofKind: "accent",
    proofText: "Production experience in medtech",
    proofNote: "Prior engineering work; client details confidential",
  },
  {
    icon: Inbox,
    title: "Incoming lead processing",
    description:
      "Classify incoming requests, populate CRM fields, and route each lead to the right person.",
    proofKind: "neutral",
    proofText: "Connect your CRM, Notion, or Trello",
  },
  {
    icon: Bot,
    title: "A knowledge assistant for your team",
    description:
      "Give your team an assistant that retrieves answers from your documents, including Notion, Confluence, and Google Drive.",
    proofKind: "accent",
    proofText: "Setup in 3–7 days",
    proofNote: "Defined scope and fixed setup price",
  },
  {
    icon: FileText,
    title: "Product descriptions and content",
    description:
      "Generate product descriptions, catalogue content, and SEO pages using templates and your brand voice.",
    proofKind: "neutral",
    proofText: "Batch or API delivery · your brand voice",
  },
  {
    icon: BarChart3,
    title: "Segmentation and personalisation",
    description:
      "Segment customers, predict lifetime value and churn, and detect anomalies. Connect the results to CRM and retention workflows.",
    proofKind: "accent",
    proofText: "+19% marketing campaign ROI",
    proofNote: "From prior ML engineering work at a game studio",
  },
] as const;

export function AutomateBlock() {
  return (
    <section id="automate" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            What we automate
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processes.map((process) => {
            const Icon = process.icon;
            const proofClasses =
              process.proofKind === "accent"
                ? "bg-[var(--vorklab-accent)]/10 border-[var(--vorklab-accent)]/30 text-[var(--vorklab-accent)]"
                : "bg-[var(--light-text)]/5 border-[var(--vorklab-card-border)] text-[var(--light-text)]";

            return (
              <RevealOnScroll key={process.title}>
                <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 h-full flex flex-col hover:brightness-125 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-[var(--vorklab-accent)]/10 flex items-center justify-center mb-4">
                    <Icon className="text-[var(--vorklab-accent)]" size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-2 leading-snug">
                    {process.title}
                  </h3>
                  <p className="text-[var(--light-text)] text-sm leading-relaxed mb-4 flex-1">
                    {process.description}
                  </p>
                  <div>
                    <span
                      className={`inline-block text-xs font-medium border rounded px-2.5 py-1 leading-snug ${proofClasses}`}
                    >
                      {process.proofText}
                    </span>
                    {process.proofNote && (
                      <p className="text-[var(--light-text)] text-[10px] mt-1.5">
                        {process.proofNote}
                      </p>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
