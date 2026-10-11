import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CostExplorer } from "./CostExplorer";

const title = "What does one completed AI task actually cost?";
const description = "A worked example of AI workflow costs: human review, retries, maintenance and setup. Compare three approaches and explore how monthly volume changes the result.";
const url = "https://vorklab.com/guides/ai-task-cost";
export const metadata: Metadata = {
  title: `${title} | VorkLab`, description,
  alternates: { canonical: url },
  openGraph: { title, description, type: "article", url, siteName: "VorkLab", publishedTime: "2026-10-11", authors: ["Valentin Shapovalov"] },
  twitter: { card: "summary_large_image", title, description },
};

const sources = [
  { id: "finops-units", label: "FinOps Foundation: Unit Economics", href: "https://www.finops.org/framework/capabilities/unit-economics/", note: "Distinguishes the cost of a resource from the cost of a business outcome." },
  { id: "finops-quality", label: "FinOps Foundation: AI Tools & Services Considerations", href: "https://www.finops.org/wg/finops-for-ai-tools-services-considerations/", note: "Discusses repeat requests, failed workflows and human remediation as cost drivers." },
  { id: "agent-evals", label: "Anthropic: Demystifying evals for AI agents", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", note: "Explains why an agent's claimed success and the actual result must be evaluated separately. January 2026." },
  { id: "agents-matter", label: "Kapoor et al.: AI Agents That Matter", href: "https://arxiv.org/abs/2407.01502", note: "Research on evaluating agent cost alongside task performance. A benchmark study, not a business ROI estimate. 2024." },
  { id: "effective-agents", label: "Anthropic: Building effective agents", href: "https://www.anthropic.com/engineering/building-effective-agents", note: "Discusses the cost and latency tradeoffs of adding agentic complexity. December 2024." },
  { id: "aws-value", label: "AWS: Delivering and sustaining the value of a generative AI application", href: "https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/prod-value.html", note: "Connects ongoing cost and performance monitoring with business value." },
];

function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-base leading-8 text-[#B0C0C3] sm:text-lg">{children}</p>;
}
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="mt-14 scroll-mt-24"><h2 className="text-2xl font-bold tracking-tight text-[#EDF5F4] sm:text-3xl">{title}</h2>{children}</section>;
}
function Cite({ id, children }: { id: string; children: ReactNode }) {
  const source = sources.find((s) => s.id === id)!;
  return <a href={source.href} className="text-[#5EEAD4] underline decoration-[#5EEAD4]/40 underline-offset-4 hover:decoration-[#5EEAD4]">{children}</a>;
}

export default function AITaskCostGuide() {
  return <>
    <Navbar />
    <main className="min-h-screen bg-[#0B1016] pt-16">
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <header>
          <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5EEAD4]">VorkLab · Practical guides</Link>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-[#EDF5F4] sm:text-6xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-[#B0C0C3]">Count the work needed to reach an accepted result, including the work a person still has to do.</p>
          <p className="mt-6 text-sm leading-6 text-[#B0C0C3]">By Valentin Shapovalov · 11 October 2026 · Includes an interactive example and worksheet</p>
        </header>

        <div className="mt-10 border-l-2 border-[#5EEAD4] pl-5 sm:pl-7">
          <p className="text-lg leading-8 text-[#EDF5F4]">Model and tool usage averages five cents per enquiry. After review, corrections, maintenance and allocated setup, the accepted result costs $2.15.</p>
          <p className="mt-3 leading-7 text-[#B0C0C3]">That is still below the $3 manual baseline in the example below. It is also a very different number to budget around. Every figure in this example is illustrative.</p>
        </div>
        <P>A useful automation proposal should explain how much work reaches an acceptable finish, what it costs, and what happens to the exceptions. The model invoice answers only part of that question.</P>
        <P>The <Cite id="finops-units">FinOps Foundation separates resource metrics, such as cost per token, from business metrics, such as cost per resolved case</Cite>. For a small team, this distinction can be made concrete with one workflow and a short cost ledger.</P>

        <nav aria-label="In this guide" className="mt-9 rounded-xl border border-[#5EEAD4]/20 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5EEAD4]">In this guide</p>
          <ol className="mt-4 grid gap-3 text-sm text-[#EDF5F4] sm:grid-cols-2">
            {[["finished", "Define a finished task"], ["costs", "Count the whole workflow"], ["example", "Compare three approaches"], ["volume", "Change the monthly volume"], ["cash", "Separate time from cash"], ["pilot", "Measure your own process"]].map(([id, label], i) => <li key={id}><a className="underline decoration-[#B0C0C3]/30 underline-offset-4 hover:text-[#5EEAD4]" href={`#${id}`}>{i + 1}. {label}</a></li>)}
          </ol>
        </nav>

        <Section id="finished" title="First, agree on what counts as finished">
          <P>Take an incoming sales enquiry. For this article, a completed task means: the right details are recorded once in the CRM, a correct reply has been sent under the agreed rules, and the action is confirmed. Missing information has been resolved, or the enquiry has reached a defined final exception outcome, such as a valid closure for an unsupported request. Sending it to a person for further work does not count as completion.</P>
          <P>A draft alone does not meet that definition. Neither does an agent saying it sent the reply. <Cite id="agent-evals">Anthropic&apos;s guide to agent evaluation makes the same distinction</Cite>: the outcome must be checked in the system where the work happened.</P>
          <P>Count unique accepted enquiries. Three attempts to process one enquiry still produce, at most, one accepted result. A task rescued by a person counts as a result of the combined workflow. Record separately whether it needed human completion.</P>
          <P>Compare approaches on the same workload, quality requirements and deadline. Also report unresolved cases and time to completion. A low cost per completed task can hide a growing queue of difficult work.</P>
        </Section>

        <Section id="costs" title="Put all the work in the numerator">
          <div className="mt-6 rounded-xl border border-[#5EEAD4]/25 bg-[#5EEAD4]/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#5EEAD4]">Cost per accepted result</p>
            <p className="mt-4 text-xl font-semibold leading-8 text-[#EDF5F4]">All costs attributable to the workflow<br /><span className="text-[#5EEAD4]">÷</span> Unique accepted results</p>
            <p className="mt-4 text-sm leading-6 text-[#B0C0C3]">Use matching costs and outcomes. For a pilot, follow one batch of enquiries through completion and attach all its attempts and corrections to that batch.</p>
          </div>
          <ul className="mt-6 space-y-4 text-base leading-7 text-[#B0C0C3] sm:text-lg">
            <li><strong className="text-[#EDF5F4]">Model and tool usage.</strong> Include retrieval, external services, paid actions and every retry, including attempts that fail.</li>
            <li><strong className="text-[#EDF5F4]">Human handling.</strong> Include review, corrections, manual fallback and quality checks. Count the same minute once.</li>
            <li><strong className="text-[#EDF5F4]">Ongoing operation.</strong> Include additional hosting, monitoring, support and the work needed when integrations or business rules change.</li>
            <li><strong className="text-[#EDF5F4]">Implementation.</strong> Include process design, data preparation, integration, testing, training and handover. Show the upfront amount and the period over which you allocate it.</li>
          </ul>
          <P>FinOps guidance explicitly identifies <Cite id="finops-quality">repeated requests and human remediation as consequences of poor output quality</Cite>. A cheaper model can therefore make the whole workflow more expensive if people spend longer fixing its work.</P>
          <P>If 1,000 enquiries consume $2,150 but only 900 meet the acceptance criteria, the cost is about $2.39 per accepted result. The other 100 remain visible as unresolved or rejected work, with any later recovery costs still to come. Keep their costs in the calculation.</P>
        </Section>

        <Section id="example" title="One workload, three ways to complete it">
          <P>Assume 1,000 enquiries per month and a loaded handling cost of $30 per hour. Loaded means the cost of staff time including employer costs. Manual handling takes six minutes per enquiry, including its normal checks and corrections.</P>
          <aside className="mt-6 rounded-xl border border-[#B0C0C3]/20 p-5 text-sm leading-7 text-[#B0C0C3]">
            <strong className="text-[#EDF5F4]">Illustrative assumptions, not a client case or a quote.</strong> All 1,000 enquiries are assumed to reach the same accepted outcome, with human help where needed. This isolates the cost comparison; a real pilot must establish quality and completion rates. Shared CRM and email costs are excluded because they are identical across the three options. Add them to every option for a complete company cost view.
          </aside>
          <h3 className="mt-8 text-xl font-semibold text-[#EDF5F4]">A. People complete the work</h3>
          <P>1,000 × 6 minutes is 100 hours. At $30 per hour, monthly handling costs $3,000.</P>
          <h3 className="mt-8 text-xl font-semibold text-[#EDF5F4]">B. AI drafts; a person checks and completes</h3>
          <P>Every enquiry takes two minutes to check and finish. In 20% of cases, the draft is insufficient and needs another six minutes of manual work. That is 3,200 minutes, costing $1,600. The additional six minutes are counted after the initial review.</P>
          <P>Model and tool usage, including retries, averages $0.05 per incoming enquiry. Additional operation and support costs $250 a month. A $3,000 implementation is allocated over 12 months, adding $250 a month.</P>
          <h3 className="mt-8 text-xl font-semibold text-[#EDF5F4]">C. AI completes permitted cases; people handle exceptions</h3>
          <P>Assume 70% follow the automatic path, 20% need two minutes of human review and completion, and 10% go directly to six minutes of manual handling. These are separate paths. The direct handoffs do not also receive the two-minute review.</P>
          <P>Separately, staff audit 10% of the 700 automatic-path results, at two minutes each. Total handling and audit time is 1,140 minutes, costing $570. This sample is a cost assumption, not proof that all automatic results are correct. Errors discovered in practice require extra correction work and a revised count of accepted results.</P>
          <P>Usage averages $0.15 per incoming enquiry, including retries. Additional operation and support costs $600 a month. A $12,000 implementation, allocated over 12 months, adds $1,000 a month. Support includes maintenance labour; it excludes enquiry handling already counted above.</P>
        </Section>

        <Section id="volume" title="The result changes with the volume">
          <CostExplorer />
          <P>At 1,000 enquiries, reviewed drafts cost $2.15 per accepted result. The more autonomous approach costs $2.32. It uses less handling time, but its higher setup and support costs outweigh that advantage at this volume.</P>
          <P>At 200 enquiries, manual handling is the lowest-cost option in this model. At 2,000, the more autonomous approach costs $1.52 per result, compared with $1.90 for reviewed drafts and $3 manually. The work mix, handling times and fixed support costs are held constant here. Real systems may need more support or infrastructure as volume grows.</P>
          <P>The calculation does not establish a universal winner. <Cite id="agents-matter">AI Agents That Matter argues for evaluating cost alongside performance</Cite>, while <Cite id="effective-agents">Anthropic recommends adding agentic complexity when the task justifies it</Cite>. Your own workload determines whether that extra complexity earns its cost.</P>
        </Section>

        <Section id="sensitivity" title="One extra minute can change the decision">
          <P>In the reviewed-draft option, increasing review time from two to three minutes adds $500 a month at 1,000 enquiries. Cost per accepted result rises from $2.15 to $2.65.</P>
          <P>If review still takes two minutes but 30% of drafts need manual rework instead of 20%, cost rises to $2.45. Each of these changes matters more than the entire $50 monthly model-and-tool bill in that scenario.</P>
          <P>That makes review time and exception frequency useful pilot measurements. Test your optimistic assumptions as well as a slower-review, higher-rework case. Check whether the decision survives both.</P>
        </Section>

        <Section id="cash" title="Freed time and cash savings are different">
          <P>Reviewed drafts reduce enquiry-handling time from 100 to about 53.3 hours a month in the example. That releases about 46.7 hours of capacity. If salaries stay the same, payroll does not fall by the value of those hours. Additional maintenance effort is budgeted separately in support.</P>
          <P>The business benefit depends on what changes: fewer paid overtime hours, less outsourced work, an avoided hire, or more useful work completed with the same team. If nobody can use the released capacity, its practical value may be much smaller than the labour-cost comparison suggests.</P>
          <P>Keep an economic view and a cash view. The first values staff time. The second records actual additional payments and costs genuinely removed. Measure extra revenue or faster response separately, using evidence from your own process.</P>
          <P>Allocating setup over 12 months is a planning convention. It does not turn a $3,000 invoice into a $250 payment. In this simplified example, setup is paid upfront. If monthly net cash benefit stays constant, estimate cash payback by dividing upfront spending by that benefit after additional operating payments. If it stays zero or negative, there is no cash payback. For changing benefits, track cumulative net cash flow until it covers the upfront spending.</P>
        </Section>

        <Section id="pilot" title="Measure one small workflow before expanding">
          <ol className="mt-6 space-y-5 text-base leading-8 text-[#B0C0C3] sm:text-lg">
            <li><strong className="text-[#EDF5F4]">1. Establish a manual baseline.</strong> Measure handling time, corrections, quality and completion time on representative work. Include difficult cases.</li>
            <li><strong className="text-[#EDF5F4]">2. Agree on acceptance before the trial.</strong> Define the required result, prohibited errors, deadline and evidence. Keep those rules the same across approaches.</li>
            <li><strong className="text-[#EDF5F4]">3. Log the whole journey.</strong> Use one enquiry ID across model calls, retries, reviews and final actions. Record human minutes and the reason for each handoff.</li>
            <li><strong className="text-[#EDF5F4]">4. Compare a similar mix of work.</strong> Where practical, allocate comparable enquiries between the existing and assisted process. A small trial can reveal failure modes without establishing a precise long-term error rate.</li>
            <li><strong className="text-[#EDF5F4]">5. Review the decision.</strong> Look at cost per accepted result alongside unresolved work, serious errors, response time and human involvement. Repeat after material changes to the workflow.</li>
          </ol>
          <P><Cite id="aws-value">AWS guidance treats maintaining business value as an ongoing activity</Cite>. Costs, usage and performance can change after launch. Keep the calculation close to the operating data rather than leaving it in the original proposal.</P>
          <P>Some errors should block a rollout regardless of average unit cost. Track their severity separately. The worked example budgets for normal rework; it does not price every possible consequence of an incorrect external action.</P>
          <div className="mt-8 rounded-xl border border-[#5EEAD4]/30 bg-[#5EEAD4]/5 p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-[#EDF5F4]">Build your own cost ledger</h3>
            <p className="mt-3 leading-7 text-[#B0C0C3]">The worksheet includes acceptance criteria, cost categories, formulas and a separate cash-benefit check. Use observed pilot data where you have it, and label estimates where you do not.</p>
            <a href="/guides/ai-task-cost-worksheet.txt" download className="mt-6 inline-flex rounded-md bg-[#5EEAD4] px-5 py-3 font-semibold text-[#0B1016] hover:brightness-110">Download the worksheet</a>
            <p className="mt-4 text-sm text-[#B0C0C3]">Plain text · No sign-up</p>
          </div>
          <P>If you are still choosing the workflow, start with the <Link href="/guides/automation-planning" className="text-[#5EEAD4] underline underline-offset-4">Automation Planning Guide</Link>. Then bring the proposed scope, a few representative enquiries and your baseline to the cost calculation.</P>
        </Section>

        <Section id="sources" title="Sources and method">
          <P>This guide combines the sources below with an original illustrative cost model. The sources support the evaluation approach; they do not establish the example&apos;s prices, handling times or routing rates. Sources checked on 11 October 2026. No model tariff or universal savings estimate is assumed.</P>
          <ol className="mt-6 space-y-5 text-sm leading-6 text-[#B0C0C3]">
            {sources.map((source, i) => <li key={source.id} id={source.id} className="scroll-mt-24"><a href={source.href} className="font-semibold text-[#5EEAD4] underline underline-offset-4">{i + 1}. {source.label}</a><p className="mt-1">{source.note}</p></li>)}
          </ol>
        </Section>
        <aside className="mt-14 border-t border-[#B0C0C3]/20 pt-8">
          <h2 className="text-2xl font-semibold text-[#EDF5F4]">Have a workflow worth measuring?</h2>
          <p className="mt-4 leading-8 text-[#B0C0C3]">VorkLab helps teams scope, build and test AI assistants and workflow automation. Bring one process and an example of the result you need.</p>
          <Link href="/#contact" className="mt-5 inline-block font-semibold text-[#5EEAD4] underline underline-offset-4">Discuss your workflow →</Link>
        </aside>
      </article>
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: title, description, datePublished: "2026-10-11", dateModified: "2026-10-11", author: { "@type": "Person", name: "Valentin Shapovalov" }, publisher: { "@type": "Organization", name: "VorkLab", url: "https://vorklab.com" }, mainEntityOfPage: url }) }} />
  </>;
}
