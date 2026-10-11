import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Practical AI Guides | VorkLab",
  description: "Practical guides to planning, costing and testing AI workflow automation. Worked examples and reusable worksheets.",
  alternates: { canonical: "https://vorklab.com/blog" },
};

const guides = [
  { date: "11 October 2026", title: "What does one completed AI task actually cost?", description: "Compare manual handling, reviewed AI drafts and bounded automation. Include human work, retries, support and setup in the calculation.", href: "/guides/ai-task-cost", extra: "Interactive example + worksheet" },
  { date: "30 September 2026", title: "A clear plan for your first automation.", description: "Choose one task, define the result and checks, and prepare a small measurable trial before implementation.", href: "/guides/automation-planning", extra: "Worked example + reusable prompt" },
];

export default function Blog() {
  return <>
    <Navbar />
    <main className="min-h-screen bg-[#0B1016] pt-16">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5EEAD4]">VorkLab · Resources</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#EDF5F4] sm:text-6xl">Practical AI guides</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[#B0C0C3]">Make a clear plan, measure the work and check the result.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => <article key={guide.href} className="flex flex-col rounded-2xl border border-[#5EEAD4]/25 p-6 sm:p-8">
            <p className="text-sm text-[#B0C0C3]">{guide.date}</p>
            <h2 className="mt-4 text-2xl font-semibold leading-8 text-[#EDF5F4]"><Link href={guide.href} className="hover:text-[#5EEAD4]">{guide.title}</Link></h2>
            <p className="mt-4 leading-7 text-[#B0C0C3]">{guide.description}</p>
            <p className="mt-5 text-sm text-[#5EEAD4]">{guide.extra}</p>
            <Link href={guide.href} className="mt-auto pt-7 font-semibold text-[#5EEAD4] underline underline-offset-4">Read the guide →</Link>
          </article>)}
        </div>
      </div>
    </main>
    <Footer />
  </>;
}
