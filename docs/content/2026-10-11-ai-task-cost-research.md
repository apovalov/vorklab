# Research and editorial record: AI task cost

Date: 2026-10-11
Audience: business owners and teams commissioning one AI workflow.
Public article: https://vorklab.com/guides/ai-task-cost
Language: English, matching existing VorkLab material.

## Evidence checked

1. https://www.finops.org/framework/capabilities/unit-economics/
   Distinguishes resource efficiency from business outcome metrics. Used only for this distinction and the importance of defined cost scope.
2. https://www.finops.org/wg/finops-for-ai-tools-services-considerations/
   Quality failures create repeat requests, workflow failures and human remediation. No universal cost-saving percentage adopted.
3. https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
   Published 2026-01-09. The outcome in the environment is distinct from a claimed success in a transcript. Human grading and calibration have costs.
4. https://arxiv.org/abs/2407.01502
   Kapoor et al., AI Agents That Matter (2024). Joint evaluation of cost and task performance. Benchmark research is not evidence for the financial returns of this example.
5. https://www.anthropic.com/engineering/building-effective-agents
   Published 2024-12-19. Complexity can trade additional cost and latency for task performance. Tool recommendations change; none are copied into the article.
6. https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/prod-value.html
   Ongoing tracking of application costs, performance and business value.

Additional research considered but not included in the article:
- https://arxiv.org/abs/2304.11771 (v2): observed productivity changes in a specific customer-support setting. Not transferable as an ROI assumption.
- https://metr.org/blog/2026-02-24-uplift-update/: selection and time-measurement problems complicate current coding-productivity estimates. The early-2025 slowdown headline would distract from the method and is not used.

Research fallback: Parallel research API returned insufficient credit; no funded run was started. Primary-source web research and separate research/economics agents supplied the evidence and verification instead.

## Original illustrative model

All costs in USD. N enquiries per month, all assumed eventually accepted. This is an explanatory assumption, not an inferred quality result. Identical shared CRM/email costs are excluded from all options. Serious error consequences are not priced; they are separate rollout constraints.

Manual: 6 minutes per enquiry at $30/hour -> 3N.
Drafts: 2 minutes for every enquiry, plus 6 additional minutes for 20%; usage .05N; support 250; setup 3000/12 -> 500 + 1.65N.
Bounded: 20% at 2 minutes, 10% directly handled at 6 minutes, 70% automatic path with 10% of that path audited at 2 minutes; usage .15N; support 600; setup 12000/12 -> 1600 + .72N.

The three bounded routes are exclusive. Audits are additional. Support includes maintenance labour and excludes handling time already counted. The draft review and rework really are sequential.

| N | Manual | Drafts | Bounded |
|---|---:|---:|---:|
| 200 | 600 | 830 | 1744 |
| 1000 | 3000 | 2150 | 2320 |
| 2000 | 6000 | 3800 | 3040 |

Sensitivity at N=1000: draft review 3 rather than 2 minutes -> 2650; rework share 30% rather than 20% -> 2450, each changed separately.

At N=1000, ongoing cost before allocated setup: manual 3000, drafts 1900, bounded 1320. The main unit figures include setup allocation. Allocation is a planning convention, not instalment payment or an accounting policy claim.

## Review corrections

Independent research and economics reviews both caught a unit mismatch in the opening. It now says average model/tool usage per enquiry rather than an AI step. Explicitly exclude pending human handoffs from accepted outcomes. Cash-payback ratio now requires steady monthly net cash benefit; changing benefits require cumulative cash flow. Slider wording now explains constant volume over the allocation horizon for each chosen value.

## Publication scope

Article, interactive illustrative comparison, plain-text worksheet, share preview and linked company post. No invented client case, no private customer details, no location or registration facts added. The existing brand is VorkLab Teal.
