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
    title: "Чат-бот FAQ и поддержка",
    description:
      "Отвечает на типовые вопросы клиентов из вашей базы знаний. Эскалирует сложное оператору. Multilingual если нужно.",
    proofKind: "accent",
    proofText: "~45% обращений без оператора, CSAT ~76%",
    proofNote: "в проекте маркетплейса ЦВЕ, 20M+ покупателей",
  },
  {
    icon: PhoneCall,
    title: "Запись на услуги и подтверждения",
    description:
      "Входящие в голосе и тексте: квалификация, бронирование визитов, перенос / отмена, подтверждения, напоминания.",
    proofKind: "accent",
    proofText: "Live traffic в medtech-сервисе",
    proofNote: "прод-внедрение под NDA",
  },
  {
    icon: Inbox,
    title: "Обработка входящих заявок",
    description:
      "Quick triage: классификация по типу, заполнение полей в CRM, маршрутизация на ответственного.",
    proofKind: "neutral",
    proofText: "Интеграция с вашей CRM / Notion / Trello",
  },
  {
    icon: Bot,
    title: "Личный AI-ассистент команде",
    description:
      "Telegram-бот или OpenWebUI с RAG по вашим документам. Ответы под рукой, без поиска по Notion / Confluence / Google Drive.",
    proofKind: "accent",
    proofText: "Сетап за 3-7 дней",
    proofNote: "формат wedge, фикс-цена",
  },
  {
    icon: FileText,
    title: "Генерация описаний и контента",
    description:
      "Описания товаров для маркетплейсов и каталогов, SEO-страницы, шаблонные тексты под бренд-голос.",
    proofKind: "neutral",
    proofText: "Batch / API · под ваш бренд-голос",
  },
  {
    icon: BarChart3,
    title: "Сегментация и персональные сценарии",
    description:
      "Сегментация клиентов, LTV / churn, anomaly detection. Триггеры для CRM, маркетинга, удержания.",
    proofKind: "accent",
    proofText: "+19% ROI по маркетинговым кампаниям",
    proofNote: "gamedev-студия, classic ML",
  },
] as const;

export function AutomateBlock() {
  return (
    <section id="automate" className="bg-[var(--base-bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4 py-6 md:py-10">
            Что мы автоматизируем
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
