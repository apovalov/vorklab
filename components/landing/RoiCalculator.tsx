"use client";

import { useState } from "react";
import { CALENDLY_URL } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const CURRENCIES = [
  { symbol: "€", label: "EUR" },
  { symbol: "$", label: "USD" },
  { symbol: "₽", label: "RUB" },
  { symbol: "₴", label: "UAH" },
] as const;

const TIME_MODES = ["per day", "per week", "per month"] as const;

const AUTOMATION_RATE = 0.7;

export function RoiCalculator() {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(25);
  const [currency, setCurrency] = useState(0);
  const [timeMode, setTimeMode] = useState(1); // per week

  const currencySymbol = CURRENCIES[currency].symbol;

  // Normalize to weekly hours
  const weeklyHours =
    timeMode === 0 ? hours * 5 : timeMode === 1 ? hours : hours / 4.33;

  const monthlyHours = weeklyHours * 4.33;
  const yearlyHours = monthlyHours * 12;
  const monthlyCost = monthlyHours * rate;
  const yearlyCost = yearlyHours * rate;

  const savedMonthlyHours = monthlyHours * AUTOMATION_RATE;
  const savedYearlyHours = yearlyHours * AUTOMATION_RATE;
  const savedMonthlyCost = monthlyCost * AUTOMATION_RATE;
  const savedYearlyCost = yearlyCost * AUTOMATION_RATE;

  const freedDaysPerMonth = Math.round(savedMonthlyHours / 8);

  const fmt = (n: number) =>
    n >= 1000 ? `${currencySymbol}${Math.round(n).toLocaleString()}` : `${currencySymbol}${Math.round(n)}`;

  return (
    <section className="py-16 md:py-20 bg-[var(--base-bg)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--heading-text)] hover:brightness-125 transition-all duration-300 text-center mb-4">
            What AI could save you
          </h2>
          <p className="text-[var(--light-text)] text-center mb-10 text-base md:text-lg">
            Calculate how much routine work costs you and what automation could give back.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="bg-[var(--vorklab-card-bg)] border border-[var(--vorklab-card-border)] rounded-[var(--border-radius-main)] p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-6">
              Your Current Workload
            </h3>

            {/* Hours slider */}
            <div className="mb-6">
              <label className="text-[var(--light-text)] text-sm mb-2 block">
                How many hours do you spend on repetitive work?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="flex-1 accent-[var(--vorklab-accent)]"
                />
                <span className="text-[var(--main-text)] font-bold text-lg min-w-[80px] text-right">
                  {hours}h
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {TIME_MODES.map((mode, i) => (
                  <button
                    key={mode}
                    onClick={() => setTimeMode(i)}
                    className={`px-3 py-1 text-xs rounded-[var(--border-radius-main)] transition-all duration-300 ${
                      timeMode === i
                        ? "bg-[var(--vorklab-accent)] text-[var(--base-bg)]"
                        : "bg-[var(--base-bg)] text-[var(--light-text)] border border-[var(--vorklab-card-border)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Rate slider */}
            <div className="mb-6">
              <label className="text-[var(--light-text)] text-sm mb-2 block">
                Hourly cost?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5}
                  max={500}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="flex-1 accent-[var(--vorklab-accent)]"
                />
                <span className="text-[var(--main-text)] font-bold text-lg min-w-[80px] text-right">
                  {currencySymbol}{rate}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {CURRENCIES.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setCurrency(i)}
                    className={`px-3 py-1 text-xs rounded-[var(--border-radius-main)] transition-all duration-300 ${
                      currency === i
                        ? "bg-[var(--vorklab-accent)] text-[var(--base-bg)]"
                        : "bg-[var(--base-bg)] text-[var(--light-text)] border border-[var(--vorklab-card-border)]"
                    }`}
                  >
                    {c.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Current spending */}
              <div className="bg-[var(--base-bg)] rounded-[var(--border-radius-main)] p-5 border border-[var(--vorklab-card-border)]">
                <h4 className="text-sm font-bold text-[var(--light-text)] mb-4 uppercase">
                  You&apos;re currently spending on repetitive work
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[var(--light-text)]">PER MONTH</p>
                    <p className="text-2xl font-bold text-[var(--main-text)]">{fmt(monthlyCost)}</p>
                    <p className="text-sm text-[var(--light-text)]">{monthlyHours.toFixed(1)}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--light-text)]">PER YEAR</p>
                    <p className="text-2xl font-bold text-[var(--main-text)]">{fmt(yearlyCost)}</p>
                    <p className="text-sm text-[var(--light-text)]">{yearlyHours.toFixed(1)}h</p>
                  </div>
                </div>
              </div>

              {/* Automation savings */}
              <div className="bg-[var(--base-bg)] rounded-[var(--border-radius-main)] p-5 border border-[var(--vorklab-accent)]/30">
                <h4 className="text-sm font-bold text-[var(--vorklab-accent)] mb-4 uppercase">
                  Automation can recover
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[var(--light-text)]">PER MONTH</p>
                    <p className="text-2xl font-bold text-[var(--vorklab-accent)]">≈{fmt(savedMonthlyCost)}</p>
                    <p className="text-sm text-[var(--light-text)]">~{savedMonthlyHours.toFixed(1)}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--light-text)]">PER YEAR</p>
                    <p className="text-2xl font-bold text-[var(--vorklab-accent)]">≈{fmt(savedYearlyCost)}</p>
                    <p className="text-sm text-[var(--light-text)]">~{savedYearlyHours.toFixed(1)}h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-[var(--light-text)] text-sm">
                Typical automation covers 60–80% of repetitive work
              </p>
              <p className="text-[var(--main-text)] font-semibold">
                That&apos;s ~{freedDaysPerMonth} working days freed every month
              </p>
              <p className="text-[var(--light-text)] text-sm mt-4">
                Ready to reclaim those hours?
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--vorklab-accent)] text-[var(--base-bg)] hover:brightness-110 transition-all duration-300 rounded-[var(--border-radius-main)] mt-2 px-6 py-3 text-base font-medium"
              >
                Book a Call
              </a>
              <p className="text-xs text-[var(--light-text)]">
                We&apos;ll map your workflow and estimate ROI in 15 minutes
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
