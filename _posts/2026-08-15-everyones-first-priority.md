---
title: "Everyone's first priority, almost nobody's first requirement"
date: 2026-08-15
author: Kyle Sherman
tags: [procurement, governance, evidence]
description: >-
  Four K-12 edtech reports, read as one document. They describe a chain of
  custody for a single question — is this tool safe, and does it work? — and
  the chain loses something at every handoff.
---

Over the last month I've written about four reports: [SETDA and CoSN](/blog/the-safety-gap/) on
what states advise and districts require, then [Project Unicorn and Clever](/blog/cost-per-user-wins-by-default/)
on what districts can measure and what teachers actually experience. Individually each is a
sector update. Stacked in order of altitude, they stop being four surveys and start being one
document: a chain of custody for a single question, and a record of what gets dropped at each
handoff.

The question is *is this tool safe, and does it work?* Four organizations asked four populations
some version of it. Here is what happens to it on the way down.

## The same five indicators, measured at two altitudes

There is one place where two of these reports ask a genuinely comparable question. The
[EdTech Quality Collaborative](https://www.cast.org/our-impact/projects/edtech-coalition-quality-indicators/) —
1EdTech, CAST, CoSN, Digital Promise, InnovateEDU, ISTE and SETDA — published five quality
indicators for edtech: Safe, Usable, Interoperable, Inclusive, Evidence-based. SETDA then asked
state leaders which indicators their AI procurement guidance covers. CoSN asked district leaders
which they require vendors to provide information about.

Same five indicators. Two altitudes.

<figure class="viz">
<p class="viz-title">Every indicator loses ground between the statehouse and the purchase order</p>
<p class="viz-sub">Share of state AI procurement guidance covering each EdTech Quality Indicator, against the share of districts requiring vendors to provide information on it. Ordered by the size of the drop.</p>
<div class="viz-scroll">
<svg viewBox="0 0 760 316" role="img" aria-labelledby="viz1t viz1d">
<title id="viz1t">Dumbbell chart comparing state guidance coverage with district vendor requirements for five edtech quality indicators</title>
<desc id="viz1d">Safe falls from 95 percent of state guidance to 55 percent of districts, a 40 point drop. Usable falls from 68 to 45. Inclusive falls from 50 to 29. Interoperable falls from 59 to 46. Evidence-based falls from 45 to 41, a 4 point drop.</desc>

<g stroke="#ded5c4" stroke-width="1">
<line x1="200" y1="48" x2="200" y2="278"/><line x1="330" y1="48" x2="330" y2="278"/><line x1="460" y1="48" x2="460" y2="278"/><line x1="590" y1="48" x2="590" y2="278"/><line x1="720" y1="48" x2="720" y2="278"/>
</g>
<g font-family="'DM Sans',sans-serif" font-size="11.5" fill="#8c8574" text-anchor="middle">
<text x="200" y="296">0%</text><text x="330" y="296">25%</text><text x="460" y="296">50%</text><text x="590" y="296">75%</text><text x="720" y="296">100%</text>
</g>

<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#5a5a72">
<circle cx="206" cy="28" r="6" fill="#7aa3c9" stroke="#fff9f0" stroke-width="2"/>
<text x="220" y="32">State guidance covers it</text>
<circle cx="396" cy="28" r="6" fill="#1a2f4a" stroke="#fff9f0" stroke-width="2"/>
<text x="410" y="32">District requires it of vendors</text>
</g>

<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#1a1a2e" text-anchor="end">
<text x="150" y="74">Safe</text><text x="150" y="122">Usable</text><text x="150" y="170">Inclusive</text><text x="150" y="218">Interoperable</text><text x="150" y="266">Evidence-based</text>
</g>

<g stroke="#ded5c4" stroke-width="2" stroke-linecap="round">
<line x1="486" y1="70" x2="694" y2="70"/><line x1="434" y1="118" x2="554" y2="118"/><line x1="351" y1="166" x2="460" y2="166"/><line x1="439" y1="214" x2="507" y2="214"/><line x1="413" y1="262" x2="434" y2="262"/>
</g>

<g stroke="#fff9f0" stroke-width="2">
<circle cx="694" cy="70" r="6" fill="#7aa3c9"><title>Safe — 95% of state AI procurement guidance</title></circle>
<circle cx="554" cy="118" r="6" fill="#7aa3c9"><title>Usable — 68% of state AI procurement guidance</title></circle>
<circle cx="460" cy="166" r="6" fill="#7aa3c9"><title>Inclusive — 50% of state AI procurement guidance</title></circle>
<circle cx="507" cy="214" r="6" fill="#7aa3c9"><title>Interoperable — 59% of state AI procurement guidance</title></circle>
<circle cx="434" cy="262" r="6" fill="#7aa3c9"><title>Evidence-based — 45% of state AI procurement guidance</title></circle>
<circle cx="486" cy="70" r="6" fill="#1a2f4a"><title>Safe — required of vendors by 55% of districts</title></circle>
<circle cx="434" cy="118" r="6" fill="#1a2f4a"><title>Usable — required of vendors by 45% of districts</title></circle>
<circle cx="351" cy="166" r="6" fill="#1a2f4a"><title>Inclusive — required of vendors by 29% of districts</title></circle>
<circle cx="439" cy="214" r="6" fill="#1a2f4a"><title>Interoperable — required of vendors by 46% of districts</title></circle>
<circle cx="413" cy="262" r="6" fill="#1a2f4a"><title>Evidence-based — required of vendors by 41% of districts</title></circle>
</g>

<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#1a1a2e" text-anchor="end">
<text x="472" y="74">55%</text><text x="420" y="122">45%</text><text x="337" y="170">29%</text><text x="425" y="218">46%</text><text x="399" y="266">41%</text>
</g>
<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#5a5a72" text-anchor="start">
<text x="708" y="74">95%</text><text x="568" y="122">68%</text><text x="474" y="170">50%</text><text x="521" y="218">59%</text><text x="448" y="266">45%</text>
</g>
<text x="590" y="58" font-family="'DM Sans',sans-serif" font-size="11.5" fill="#8c8574" text-anchor="middle">40-point drop</text>
</svg>
</div>
<figcaption>Sources: SETDA, 2025 State EdTech Trends Report (states that provide AI procurement guidance, n≈40% of responding states); CoSN, U.S. State of EdTech 2026 (607 district leaders across 44 states). The two denominators differ — see the note on the numbers at the end.</figcaption>
<details class="viz-table"><summary>Table view</summary>
<table>
<tr><th>Indicator</th><th>State guidance</th><th>District requirement</th><th>Drop</th></tr>
<tr><td>Safe</td><td>95%</td><td>55%</td><td>40</td></tr>
<tr><td>Usable</td><td>68%</td><td>45%</td><td>23</td></tr>
<tr><td>Inclusive</td><td>50%</td><td>29%</td><td>21</td></tr>
<tr><td>Interoperable</td><td>59%</td><td>46%</td><td>13</td></tr>
<tr><td>Evidence-based</td><td>45%</td><td>41%</td><td>4</td></tr>
</table>
</details>
</figure>

Everything drops, which is unsurprising. The interesting part is *which* thing drops furthest.

Safe is the indicator states lead with — 95%, near-unanimous, the closest thing this sector has to
a settled position. It is also the indicator that loses the most on the way down: a 40-point fall
to 55% of districts. Evidence-based is the indicator states care least about, at 45%, and it
barely moves — a 4-point fall to 41%.

So the correlation between how loudly a priority is stated at the top and how reliably it is
required at the bottom is, if anything, negative. The louder the guidance, the bigger the gap
between it and the paperwork.

## The framework is not the problem. Knowing it exists is.

The obvious explanation would be that districts disagree with the framework. That is not what the
data says. **69% of districts require vendors to provide information on at least one of the five
indicators** — most districts are already doing the thing the framework describes.

They are just not doing it *from* the framework. **54% of district technology leaders report being
unfamiliar with the Five Quality Indicators.** A majority of the people implementing a standard
have not read it.

That is a much more tractable problem than disagreement, and it explains the shape of the drop.
An improvised checklist will independently reinvent "is it safe" — that one is obvious. It will
not independently reinvent "is it accessible to learners with disabilities," which is why
Inclusive sits at 29%, the lowest of the five, in a sector where accessibility is a legal
obligation rather than a preference.

## Why this isn't negligence

It would be easy, and wrong, to read all this as districts not caring. The capacity numbers make
the arithmetic plain.

<figure class="viz">
<p class="viz-title">The mandate arrived; the capacity didn't</p>
<p class="viz-sub">Four figures from two of the reports, describing what districts have to work with.</p>
<div class="viz-tiles">
<div class="viz-tile">
<div class="v">58%</div>
<div class="viz-meter"><i style="width:58%"></i></div>
<div class="l">are understaffed for supporting the technology used in teaching and learning — while 66% are adequately staffed for core technical functions.</div>
<div class="src">CoSN 2026</div>
</div>
<div class="viz-tile">
<div class="v">65%</div>
<div class="viz-meter"><i style="width:65%"></i></div>
<div class="l">name the lack of a dedicated budget as the top barrier to addressing cybersecurity — the most-cited barrier of any.</div>
<div class="src">CoSN 2026</div>
</div>
<div class="viz-tile">
<div class="v">54%</div>
<div class="viz-meter"><i style="width:54%"></i></div>
<div class="l">of district technology leaders are unfamiliar with the Five Quality Indicator framework their state guidance is built on.</div>
<div class="src">CoSN 2026</div>
</div>
<div class="viz-tile">
<div class="v">17%</div>
<div class="viz-meter"><i style="width:17%"></i></div>
<div class="l">report that interoperability initiatives are entirely or almost fully funded. For privacy initiatives it is 24%.</div>
<div class="src">Project Unicorn 2025</div>
</div>
</div>
<figcaption>Sources: CoSN, U.S. State of EdTech 2026; Project Unicorn / InnovateEDU, State of the Sector 2025.</figcaption>
</figure>

Read those together and the 58% is the one that reframes the rest. Districts are *not* broadly
understaffed — two-thirds have enough people to keep the network running. They are specifically
understaffed for the work of making the technology function in classrooms, which is precisely the
work that a quality-indicator review is. The staffing exists for the infrastructure and not for
the instruction.

## What fills the vacuum

When a district cannot run the review the framework describes, the decision does not get deferred.
It gets made on whatever evidence is already lying around.

<figure class="viz">
<p class="viz-title">How districts decide whether a licensed tool is worth keeping</p>
<p class="viz-sub">Share of school decision-makers citing each factor. Respondents could select more than one, so the bars do not sum to 100%.</p>
<div class="viz-scroll">
<svg viewBox="0 0 760 384" role="img" aria-labelledby="viz3t viz3d">
<title id="viz3t">Bar chart of the factors districts use to decide whether to keep a licensed edtech tool</title>
<desc id="viz3d">Budget impact and cost per user leads at 60 percent, followed by student performance outcomes at 45, usage analytics and login data at 44, direct feedback from users at 35, teacher adoption and training completion at 20, input from district leadership at 18, and not sure at 16.</desc>

<g stroke="#ded5c4" stroke-width="1">
<line x1="270" y1="38" x2="270" y2="345"/><line x1="377.5" y1="38" x2="377.5" y2="345"/><line x1="485" y1="38" x2="485" y2="345"/><line x1="592.5" y1="38" x2="592.5" y2="345"/><line x1="700" y1="38" x2="700" y2="345"/>
</g>
<g font-family="'DM Sans',sans-serif" font-size="11.5" fill="#8c8574" text-anchor="middle">
<text x="270" y="365">0%</text><text x="377.5" y="365">25%</text><text x="485" y="365">50%</text><text x="592.5" y="365">75%</text><text x="700" y="365">100%</text>
</g>

<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#1a1a2e" text-anchor="end">
<text x="258" y="64">Budget impact and cost per user</text>
<text x="258" y="108">Student performance outcomes</text>
<text x="258" y="152">Usage analytics and login data</text>
<text x="258" y="196">Direct feedback from users</text>
<text x="258" y="240">Teacher adoption and training</text>
<text x="258" y="284">Input from district leadership</text>
<text x="258" y="328">Not sure</text>
</g>

<path d="M270 51 L524 51 A4 4 0 0 1 528 55 L528 65 A4 4 0 0 1 524 69 L270 69 Z" fill="#1a2f4a"><title>Budget impact and cost per user — 60%</title></path>
<path d="M270 95 L459.5 95 A4 4 0 0 1 463.5 99 L463.5 109 A4 4 0 0 1 459.5 113 L270 113 Z" fill="#8c8574"><title>Student performance outcomes — 45%</title></path>
<path d="M270 139 L455.2 139 A4 4 0 0 1 459.2 143 L459.2 153 A4 4 0 0 1 455.2 157 L270 157 Z" fill="#8c8574"><title>Usage analytics and login data — 44%</title></path>
<path d="M270 183 L416.5 183 A4 4 0 0 1 420.5 187 L420.5 197 A4 4 0 0 1 416.5 201 L270 201 Z" fill="#8c8574"><title>Direct feedback from users — 35%</title></path>
<path d="M270 227 L352 227 A4 4 0 0 1 356 231 L356 241 A4 4 0 0 1 352 245 L270 245 Z" fill="#8c8574"><title>Teacher adoption and training completion — 20%</title></path>
<path d="M270 271 L343.4 271 A4 4 0 0 1 347.4 275 L347.4 285 A4 4 0 0 1 343.4 289 L270 289 Z" fill="#8c8574"><title>Input from district leadership — 18%</title></path>
<path d="M270 315 L334.8 315 A4 4 0 0 1 338.8 319 L338.8 329 A4 4 0 0 1 334.8 333 L270 333 Z" fill="#8c8574"><title>Not sure — 16%</title></path>

<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#1a1a2e" text-anchor="start">
<text x="540" y="64">60%</text>
</g>
<g font-family="'DM Sans',sans-serif" font-size="12.5" fill="#5a5a72" text-anchor="start">
<text x="475.5" y="108">45%</text><text x="471.2" y="152">44%</text><text x="432.5" y="196">35%</text><text x="368" y="240">20%</text><text x="359.4" y="284">18%</text><text x="350.8" y="328">16%</text>
</g>
</svg>
</div>
<figcaption>Source: Clever, Classroom of the Future Report 2025 (2,500+ U.S. educators, surveyed Q2 2025 with Whiteboard Advisors).</figcaption>
<details class="viz-table"><summary>Table view</summary>
<table>
<tr><th>Factor</th><th>Share citing it</th></tr>
<tr><td>Budget impact and cost per user</td><td>60%</td></tr>
<tr><td>Student performance outcomes</td><td>45%</td></tr>
<tr><td>Usage analytics and login data</td><td>44%</td></tr>
<tr><td>Direct feedback from users</td><td>35%</td></tr>
<tr><td>Teacher adoption and training completion</td><td>20%</td></tr>
<tr><td>Input from district leadership</td><td>18%</td></tr>
<tr><td>Not sure</td><td>16%</td></tr>
</table>
</details>
</figure>

Cost per user is the only input on that list that requires no infrastructure to obtain. You divide
the invoice by the headcount. Every other row needs something the reports say most districts do
not have — and note that "not sure" at 16% outranks nothing except itself, which is its own kind
of finding.

## The chain, in four handoffs

Put end to end, the four reports describe one process with a loss at every step.

- **States publish.** 95% of state AI procurement guidance leads with Safe — but only around 40%
  of states issue procurement guidance at all.
- **Districts don't receive the framework.** 54% of district technology leaders have not
  encountered the Five Quality Indicators; they improvise a review instead, and 55% land on
  requiring safety information.
- **Procurement can't document it.** Project Unicorn finds 61% of districts say they "always" or
  "usually" weigh privacy and interoperability, but only 33% put privacy language and 28% put
  interoperability language in an RFP. An intention that isn't in the contract isn't a requirement.
- **Teachers aren't asked.** 21% of educators report having any say in tool selection or privacy
  safeguards, and 20% of keep-or-kill decisions weigh teacher adoption — despite Clever's own
  segmentation showing engaged teachers reaching 60–70% of disengaged students against 15% for
  reluctant ones.

Not one of those four steps is unreasonable on its own. A state that publishes guidance without a
mandate is respecting local control. A district that improvises a review with no staff for it is
doing the best available thing. A procurement office that considers privacy without writing it
into the RFP is still considering privacy. A district that doesn't poll teachers on every license
is managing its time.

The chain still doesn't hold. Nobody in it is failing, and the question still arrives at the
classroom unanswered.

## What we're doing about it

The reason I keep coming back to these reports is that they describe our actual go-to-market
conditions, and they are not flattering to the standard vendor playbook. If 54% of your buyers
have never seen the framework, you can pass a lot of reviews without being good.

So the two commitments for [Lerad](/lerad) are the ones this chain argues for. **Answer the five
indicators before anyone asks** — in writing, in one document, whether or not the district's
process has a field for it. Our NY Education Law §2-d pack exists for the same reason and is with
education-privacy counsel now; it was drafted before we had a single user.

And **make the evidence cheap enough to beat cost per user.** Not a case study we wrote about
ourselves — usage and outcome data a district can pull without first standing up a data team,
because the funding numbers above say most of them will not be standing one up.

We start piloting in one Brooklyn classroom next month. The bar I actually care about is whether a
teacher who didn't choose Lerad still opens it in October.

## A note on the numbers

Writing this meant reading all four reports against each other rather than trusting my own earlier
summaries, and three things turned up that are worth stating plainly.

**CoSN's report disagrees with itself by a point.** Its executive summary says 56% of districts
require vendors to provide safety information; the procurement section says 55%. I've used 55%
throughout, because that's the figure in the section that carries the full five-indicator
breakdown and it's internally consistent with the other four.

**Two of these surveys measure the same practice 15 points apart.** CoSN reports that 43% of
districts include interoperability requirements in their RFPs. Project Unicorn reports 28%.
Different populations, different question wording, both credible. I've cited each to its own
report and I'd treat the gap between them as the honest error bar on this whole genre.

**Two figures from my July post didn't survive.** I cited a fall in ESSER-sustained edtech from 27%
to 6% to CoSN's 2026 report. It isn't in that report — there is no mention of ESSER at all — and it
isn't in the 2025 edition either, so I can't source it and have removed it. In the same paragraph I
reported 65% of districts as understaffed for cybersecurity; 65% is the share naming a lack of
*dedicated budget* as their top cybersecurity barrier, which is a different claim. Both are now
corrected in [that post](/blog/the-safety-gap/), with a note saying so. Its argument didn't depend
on either number, which is lucky rather than to my credit.

Which is, more or less, the argument of the last three posts pointed at myself. A claim without a
document behind it is an intention, and this is what it costs to check.

---

*Sources: SETDA, [2025 State EdTech Trends Report](https://www.setda.org/priorities/state-trends/);
CoSN, [U.S. State of EdTech 2026](https://www.cosn.org/tools-and-resources/resource/u-s-state-of-edtech-2026/);
Project Unicorn / InnovateEDU, [State of the Sector 2025](https://www.projectunicorn.org/state-of-the-sector);
Clever, [Classroom of the Future Report 2025](https://www.clever.com/classroom-future-report).*
