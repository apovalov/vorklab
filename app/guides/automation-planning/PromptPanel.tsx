"use client";

import { useRef, useState } from "react";
import { Copy, Download } from "lucide-react";

export function PromptPanel({ prompt }: { prompt: string }) {
  const [message, setMessage] = useState("");
  const details = useRef<HTMLDetailsElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setMessage("Prompt copied. Paste it into your AI assistant.");
    } catch {
      if (details.current) details.current.open = true;
      text.current?.focus();
      text.current?.select();
      setMessage("Automatic copying is unavailable. The text is selected: copy it manually or download the file.");
    }
  }

  const buttonClass = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--vorklab-accent)]";

  return (
    <section id="prompt" className="scroll-mt-24 rounded-2xl border border-[var(--vorklab-accent)]/30 bg-[var(--hero-bg)] p-6 sm:p-9">
      <h2 className="text-2xl font-semibold text-[var(--main-text)]">Make a plan for your workflow</h2>
      <p className="mt-4 text-[var(--heading-text)] leading-relaxed">Open your working project in an AI assistant. Paste this prompt and, if you already have a task in mind, add one example of the input and the result you want.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={copyPrompt} className={`${buttonClass} bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110`}><Copy size={18} aria-hidden="true" />Copy prompt</button>
        <a href="/guides/automation-planning-prompt.txt" download="vorklab-automation-planning-prompt.txt" className={`${buttonClass} border border-[var(--vorklab-card-border)] text-[var(--main-text)] hover:border-[var(--vorklab-accent)]`}><Download size={18} aria-hidden="true" />Download TXT</a>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-[var(--vorklab-accent)]">{message}</p>
      <details ref={details} className="mt-3">
        <summary className="cursor-pointer py-2 text-[var(--main-text)] underline underline-offset-4">Read the full prompt</summary>
        <label htmlFor="planning-prompt" className="sr-only">Automation planning prompt</label>
        <textarea ref={text} id="planning-prompt" readOnly value={prompt} rows={20} className="mt-4 w-full resize-y rounded-lg border border-[var(--vorklab-card-border)] bg-[var(--base-bg)] p-4 text-sm leading-7 text-[var(--heading-text)] focus-visible:outline-[var(--vorklab-accent)]" />
      </details>
      <p className="mt-5 text-sm leading-relaxed text-[var(--light-text)]">The prompt prepares a plan. It does not authorize installation, spending, external messages, or background jobs. Review the plan before implementation.</p>
    </section>
  );
}
