# Founding Decision: Business-Name Fallback When Contact Name Unknown

**Slug:** `founding-business-name-fallback`
**Date:** June 2026
**Status:** Made
**Review Date:** 2026-10-01
**Type:** Founding Decision — immutable. If thinking changes, create a new decision referencing this one.

---

## The Decision

When a prospect's contact first name is unknown, open the email with the full business name instead (e.g., "Hi M & M Property Services SA"). Do not skip the prospect. Do not use generic openers ("Hi there"). The original rule — "no name = don't send" — was revised because it would have excluded 132 of 181 prospects (73% of the list).

---

## The Problem

Not Forgotten's Phase 2 prospect list contained 181 businesses across three verticals. After exhaustive research — email parsing, website scraping, ABN Lookup, browser subagents visiting actual websites — only 49 had a confirmed contact first name. 132 had nothing.

The original rule was strict: if you don't know the person's name, don't send. The reasoning was sound — personalised outreach performs better, and "Dear Sir/Madam" signals laziness. But 73% of the prospect list is not a rounding error. It's the majority of the addressable market.

The options all had trade-offs. The question was: which trade-off is least damaging to the mission?

---

## Options Considered

| # | Option | Summary |
|---|---|---|
| A | Skip no-name contacts entirely | Only email the 49 with known names. Risk: 73% of prospects unreachable. Misses potentially great-fit businesses. |
| B | Use generic opener ("Hi there," "Hello,") | Quick, doesn't require research. Risk: signals spam/laziness. Lower reply rates. |
| C | Research every name manually before sending | Hire someone or spend weeks researching 132 businesses. Risk: slow, expensive, diminishing returns. |
| D | Use business name as fallback | "Hi M & M Property Services SA" — accurate, respectful, acknowledges the business. Risk: less personal than a first name. |

---

## Why This Path

Option D was chosen because it's accurate where the alternatives are either dishonest (pretending to know a name you don't) or wasteful (excluding 73% of prospects for a formatting preference). The business name acknowledges the entity we're actually reaching out to — a business, not necessarily a specific person.

This wasn't a compromise on quality. It was a correction of an overly rigid rule. The principle "personalisation matters" is still true. But personalisation doesn't require a first name — it requires demonstrating that you know who you're talking to. A business name does that. "Hi there" doesn't.

The research effort also matters: 49 names were found through genuine effort. The remaining 132 genuinely couldn't be identified through reasonable means. At some point, more research becomes avoidance, not diligence.

---

## Core Principles Applied

- **Don't let perfect be the enemy of good** — If the choice is between imperfect outreach and no outreach, imperfect outreach wins. 132 businesses can't be ignored because we couldn't find a name. (Source: implied in every pragmatic decision)
- **Every opportunity matters** — The company's name is Not Forgotten Systems. Excluding 73% of prospects because of a formatting rule contradicts the mission. (Source: mission statement)
- **Accuracy over pretence** — "Hi M & M Property Services SA" is honest. "Hi there" pretends the lack of a name doesn't matter. Honest is better. (Source: Philosophical Directive 9)

---

## Risks Identified

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Lower reply rates from business-name openers vs. first-name openers | High | Low | Track reply rates separately for named vs. business-name cohorts. If gap is significant (>30% lower), reconsider strategy. |
| Business names sound awkward in greeting ("Hi South Australian Commercial Cleaning Pty Ltd") | Medium | Low | Use the trading name, not the legal entity name. "Hi ACS Commercial Cleaning" not "Hi ACS Commercial Cleaning Pty Ltd." |
| Some businesses may find it odd to be addressed by company name | Low | Low | Monitor replies for confusion. If flagged, note for future refinement. |

---

## Expected Outcome

Business-name openers perform within an acceptable range of first-name openers. The 132 previously unreachable prospects generate replies, conversations, and eventually customers. The fallback is accepted as a pragmatic standard, not a permanent compromise — over time, more names will be discovered organically through replies and engagement.

---

## Success Criteria

- [ ] Reply rate for business-name cohort within 50% of first-name cohort (e.g., if named gets 8%, business-name gets at least 4%)
- [ ] Zero complaints or confusion specifically about being addressed by business name
- [ ] At least 5 of the 132 business-name prospects enter active conversation
- [ ] At least 1 of the 132 becomes a paying customer (proving the fallback was worth it)

---

## Atlas's Challenge (Pre-Decision)

> This decision was made during the prospect research phase. After 132 names came back blank despite significant effort, I raised the question: should we extend research (more subagents, more time, more cost) or change the rule? The case for changing the rule was: the research had already been thorough, the cost of perfection was 73% of the prospect list, and the business-name fallback is accurate and respectful. James agreed. The rule changed.

**James's response:** Accepted. Rule changed from "no name = don't send" to "name → Hi [Name]; no name → Hi [Business Name]."

---

## Actual Outcome (Post-Review)

*Pending review on 2026-10-01*

---

## Learnings

*Pending review*

---

## Related Decisions

- R5: No product pitch in first cold email — what the email actually says after the greeting
- R4: atlas@ as primary outreach sender — who sends this email
- R7: Travis case study as bridge, not opener — what content follows the greeting
