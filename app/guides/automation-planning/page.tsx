import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PromptPanel } from "./PromptPanel";

const title = "Automation Planning Guide | VorkLab";
const description = "Plan one useful automation: define the result, checks, operating limits, and first trial. Includes a free reusable prompt for your AI assistant.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://www.vorklab.com/guides/automation-planning" },
  openGraph: { title, description, type: "article", url: "https://www.vorklab.com/guides/automation-planning", siteName: "VorkLab" },
  twitter: { card: "summary_large_image", title, description },
};

const steps = [
  ["01", "Choose one finished result", "Describe the input, the output, and the person who accepts it. Keep the first version small enough to check. List the cases it will handle and the ones it should hand back."],
  ["02", "Decide what good looks like", "Choose observable checks: a correct record, a sourced answer, or a draft accepted without major edits. Measure the manual process if you need a baseline. Set aside examples before you build."],
  ["03", "Use what is already available", "Map the trigger, tools, context, and storage. Check what works in your actual environment. Add an agent or a server only when a specific part of the process needs it."],
  ["04", "Give failures a route", "Define the spending and time limits, where a human decision is needed, and how to pause. After an interrupted external action, check what actually happened before retrying."],
  ["05", "Run a small, measurable trial", "Try ordinary inputs alongside incomplete, repeated, and interrupted cases. Include human review and correction in your cost. Use the results to decide what to fix and whether to expand."],
];

export default async function AutomationPlanningGuide() {
  const prompt = await readFile(path.join(process.cwd(), "public/guides/automation-planning-prompt.txt"), "utf8");
  return <>
    <Navbar />
    <main className="pt-16 min-h-screen">
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--vorklab-accent)]">VorkLab · Practical guides</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[var(--main-text)] sm:text-6xl">A clear plan for your first automation.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--heading-text)]">Define the result, the checks, and what happens when something goes wrong. Then test one small workflow.</p>
          <p className="mt-5 text-sm text-[var(--light-text)]">30 September 2026 · Version 1.0 · Free guide and prompt</p>
          <a href="#prompt" className="mt-8 inline-flex rounded-md bg-[var(--vorklab-accent)] px-6 py-3 font-semibold text-[var(--base-bg)] hover:brightness-110">Get the planning prompt ↓</a>
        </header>
        <section className="my-14 border-y border-[var(--vorklab-card-border)]/60 py-8">
          <h2 className="text-2xl font-semibold text-[var(--main-text)]">Start with a task you can inspect</h2>
          <p className="mt-4 leading-8 text-[var(--heading-text)]">A weekly report, an incoming enquiry, or a draft assembled from approved sources gives you a concrete starting point. You can look at the input, check the result, and see how much work still falls to a person.</p>
          <p className="mt-4 leading-8 text-[var(--heading-text)]">This guide helps you turn that task into a buildable brief. Use the prompt below with an assistant that can read the relevant project context. If it cannot, provide a representative example.</p>
        </section>
        <section aria-labelledby="steps-title">
          <h2 id="steps-title" className="text-2xl font-semibold text-[var(--main-text)]">Five decisions before implementation</h2>
          <ol className="mt-8 space-y-8">
            {steps.map(([number, heading, body]) => <li key={number} className="flex gap-5 sm:gap-7">
              <span aria-hidden="true" className="pt-1 font-mono text-sm text-[var(--vorklab-accent)]">{number}</span>
              <div><h3 className="text-xl font-semibold text-[var(--main-text)]">{heading}</h3><p className="mt-2 leading-8 text-[var(--heading-text)]">{body}</p></div>
            </li>)}
          </ol>
        </section>
        <section className="my-14 rounded-2xl border border-[var(--vorklab-card-border)] bg-[var(--vorklab-card-bg)] p-6 sm:p-9">
          <p className="text-xs uppercase tracking-widest text-[var(--vorklab-accent)]">Worked example · illustrative</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--main-text)]">An enquiry arrives twice</h2>
          <p className="mt-4 leading-8 text-[var(--heading-text)]">Imagine an assistant that extracts details from a sales enquiry, creates a CRM record, and drafts a reply. For the first version, a person reviews the reply before sending it.</p>
          <p className="mt-4 leading-8 text-[var(--heading-text)]">The CRM saves a record, but the connection drops before the assistant receives confirmation. A safe recovery checks whether the record exists before trying again. A missing confirmation is an unknown outcome.</p>
          <dl className="mt-6 space-y-5 text-[var(--heading-text)]">
            <div><dt className="font-semibold text-[var(--main-text)]">Expected result</dt><dd className="mt-1">One record for the enquiry, accurate contact details, and a draft ready for review. Missing details are flagged.</dd></div>
            <div><dt className="font-semibold text-[var(--main-text)]">First checks</dt><dd className="mt-1">A complete enquiry, missing contact information, a repeated submission, and an interruption after the CRM write.</dd></div>
            <div><dt className="font-semibold text-[var(--main-text)]">Evidence to collect</dt><dd className="mt-1">Record accuracy, duplicates, review time, corrections, and cost per completed enquiry.</dd></div>
          </dl>
        </section>
        <PromptPanel prompt={prompt} />
        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-[var(--main-text)]">What to do with the plan</h2>
          <p className="mt-4 leading-8 text-[var(--heading-text)]">Check the assumptions, agree on any open decisions, and implement the smallest useful trial. Keep its results with the plan. A document can describe a sound approach; only running and checking the workflow can show how it performs.</p>
          <p className="mt-4 text-sm leading-7 text-[var(--light-text)]">This is a planning template. Its effectiveness has not yet been measured in a formal evaluation. Adapt the checks and limits to your process.</p>
          <div className="mt-9 border-t border-[var(--vorklab-card-border)]/60 pt-7">
            <h3 className="text-lg font-semibold text-[var(--main-text)]">Want help turning the plan into a working process?</h3>
            <p className="mt-3 leading-7 text-[var(--heading-text)]">VorkLab builds AI assistants and workflow automation. Bring one task, the tools involved, and an example of the result you need.</p>
            <Link href="/#contact" className="mt-4 inline-block text-[var(--vorklab-accent)] underline underline-offset-4">Discuss your workflow →</Link>
          </div>
        </section>
      </article>
    </main>
    <Footer />
  </>;
}
