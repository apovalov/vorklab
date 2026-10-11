"use client";

import { useId, useState } from "react";
import { calculateTaskCosts } from "@/lib/ai-task-cost";

const dollars = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
const count = (value: number) => new Intl.NumberFormat("en-US").format(value);
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5EEAD4]";

export function CostExplorer() {
  const [volume, setVolume] = useState(1000);
  const id = useId();
  const costs = calculateTaskCosts(volume);

  return (
    <section aria-labelledby={`${id}-title`} className="not-prose my-10 rounded-2xl border border-[#5EEAD4]/30 bg-[#0B1016] p-5 text-[#EDF5F4] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id={`${id}-title`} className="text-xl font-semibold sm:text-2xl">What changes with volume?</h3>
        <span className="rounded-full border border-[#5EEAD4]/25 px-3 py-1 text-xs text-[#5EEAD4]">Illustrative model · USD</span>
      </div>
      <p id={`${id}-assumptions`} className="mt-3 text-sm leading-6 text-[#B0C0C3]">Change monthly enquiries. Every enquiry is assumed to reach an accepted outcome, including human fallback. These are fictional assumptions, not measured results or a quote.</p>

      <div className="mt-7">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${id}-volume`} className="text-sm font-medium">Enquiries per month</label>
          <output htmlFor={`${id}-volume`} className="text-2xl font-semibold tabular-nums text-[#5EEAD4]">{count(volume)}</output>
        </div>
        <input id={`${id}-volume`} type="range" min={100} max={5000} step={100} value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-describedby={`${id}-assumptions`} aria-valuetext={`${count(volume)} enquiries per month`} className={`mt-3 block h-8 w-full cursor-pointer accent-[#5EEAD4] ${focus}`} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Monthly enquiry presets">
          {[200, 1000, 2000].map((preset) => (
            <button key={preset} type="button" aria-pressed={volume === preset} onClick={() => setVolume(preset)} className={`min-h-11 rounded-lg border px-4 text-sm tabular-nums ${focus} ${volume === preset ? "border-[#5EEAD4] bg-[#5EEAD4] font-semibold text-[#0B1016]" : "border-[#B0C0C3]/30 text-[#B0C0C3] hover:border-[#5EEAD4] hover:text-[#EDF5F4]"}`}>
              {count(preset)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {costs.map((cost) => (
          <div key={cost.id} className="rounded-xl border border-[#B0C0C3]/20 p-4">
            <h4 className="text-sm font-semibold">{cost.name}</h4>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-[#5EEAD4]">{dollars(cost.costPerAcceptedResult, 2)}</p>
            <p className="mt-1 text-xs text-[#B0C0C3]">per accepted result</p>
            <p className="mt-4 text-sm tabular-nums">{dollars(cost.monthlyTotal)} <span className="text-[#B0C0C3]">/ month</span></p>
            <p className="mt-2 text-xs leading-5 text-[#B0C0C3]">
              {cost.id === "manual" ? "Comparison baseline" : cost.savingsVsManual === 0 ? "Same modeled cost as manual work" : `${dollars(Math.abs(cost.savingsVsManual))} ${cost.savingsVsManual > 0 ? "less" : "more"} per month than manual`}
            </p>
          </div>
        ))}
      </div>
      <p role="status" className="sr-only">At {count(volume)} monthly enquiries: {costs.map((cost) => `${cost.name}, ${dollars(cost.monthlyTotal)} per month, ${dollars(cost.costPerAcceptedResult, 2)} per accepted result`).join(". ")}.</p>

      <details className="mt-6 border-t border-[#B0C0C3]/20 pt-4">
        <summary className={`cursor-pointer py-2 text-sm font-medium text-[#5EEAD4] ${focus}`}>Inspect costs and assumptions</summary>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {costs.map((cost) => (
            <div key={cost.id}>
              <h4 className="mb-3 text-sm font-semibold">{cost.name}</h4>
              <dl className="space-y-2 text-sm">
                {[
                  ["Human handling", dollars(cost.humanCost)],
                  ["Handling minutes", count(cost.humanMinutes)],
                  ["AI + tools, with retries", dollars(cost.apiCost)],
                  ["Ongoing support", dollars(cost.supportCost)],
                  ["Operating subtotal", dollars(cost.monthlyTotal - cost.setupCost)],
                  ["Allocated setup", dollars(cost.setupCost)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-[#B0C0C3]">{label}</dt>
                    <dd className="shrink-0 tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-sm leading-6 text-[#B0C0C3]">
          <p><strong className="text-[#EDF5F4]">Human time: $30/hour.</strong> Manual work takes 6 minutes per enquiry. AI drafts need 2 minutes of review on every enquiry, plus another 6 minutes of rework on 20% of enquiries.</p>
          <p>Bounded automation routes 20% to a person for 2 minutes of assistance and 10% directly to manual handling for 6 minutes. The remaining 70% run automatically; a 10% sample of that group receives a 2-minute quality check. Sampling alone does not establish that every outcome was accepted.</p>
          <p>AI and tools cost $0.05 per incoming enquiry for drafts and $0.15 for bounded automation, including retries. Monthly support is $250 and $600 respectively and includes support labor. Handling minutes above exclude this support time.</p>
          <p>Setup is $3,000 for drafts and $12,000 for bounded automation, allocated evenly over 12 months. All totals include that allocation. It spreads the cost for comparison; it does not change when you pay. For each selected volume, that monthly workload is assumed to continue throughout the 12-month allocation period. Routing proportions, handling times and fixed support costs stay unchanged.</p>
        </div>
      </details>
      <p className="mt-5 text-xs leading-5 text-[#B0C0C3]">Lower modeled handling cost is not automatically a cash saving. Salaries only fall if spending changes; released capacity has value when you can use it.</p>
    </section>
  );
}
