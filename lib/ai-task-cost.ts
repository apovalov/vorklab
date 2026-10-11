export type TaskCost = {
  id: "manual" | "drafts" | "bounded";
  name: string;
  humanMinutes: number;
  humanCost: number;
  apiCost: number;
  supportCost: number;
  setupCost: number;
  monthlyTotal: number;
  costPerAcceptedResult: number;
  savingsVsManual: number;
};

/** Illustrative steady-volume model. All incoming enquiries eventually succeed. */
export function calculateTaskCosts(volume: number): TaskCost[] {
  if (!Number.isFinite(volume) || volume <= 0 || !Number.isInteger(volume)) {
    throw new RangeError("Monthly volume must be a positive whole number.");
  }

  const hourlyRate = 30;
  const manualTotal = (volume * 6 / 60) * hourlyRate;
  const scenarios = [
    {
      id: "manual" as const,
      name: "Manual work",
      humanMinutes: volume * 6,
      apiCost: 0,
      supportCost: 0,
      setupCost: 0,
    },
    {
      id: "drafts" as const,
      name: "AI drafts + review",
      humanMinutes: volume * 2 + volume * 0.2 * 6,
      apiCost: volume * 0.05,
      supportCost: 250,
      setupCost: 3000 / 12,
    },
    {
      id: "bounded" as const,
      name: "Bounded automation",
      humanMinutes: volume * 0.2 * 2 + volume * 0.1 * 6 + volume * 0.7 * 0.1 * 2,
      apiCost: volume * 0.15,
      supportCost: 600,
      setupCost: 12000 / 12,
    },
  ];

  return scenarios.map((scenario) => {
    const humanCost = (scenario.humanMinutes / 60) * hourlyRate;
    const monthlyTotal = humanCost + scenario.apiCost + scenario.supportCost + scenario.setupCost;
    return {
      ...scenario,
      humanCost,
      monthlyTotal,
      costPerAcceptedResult: monthlyTotal / volume,
      savingsVsManual: manualTotal - monthlyTotal,
    };
  });
}
