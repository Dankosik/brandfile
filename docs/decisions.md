# Product Decisions

Decisions by the project's author, as of 2026-11-07. Where another document contradicts them, these decisions win.
Future goals and options are described in the [architecture](research/system-architecture.md).

## Product

| Question | Decision | What follows |
|---|---|---|
| Checking agents' work | No `brand check`, hooks, or CI | The main recommendation of [agent-brand-systems](research/agent-brand-systems.md) is rejected. Agents read the brand book, so quality depends on its text; probes in a clean session stay |
| First user | A founder or developer of a small product | Questions without jargon; the person may not be a designer |
| Order of scenarios | First an existing style, on the author's own product, and right after it creating one from scratch | First `brand-interview`, `brand-book`, `brand-probe`, the entry point, and then `brand-directions` |
| Logo | Not drawn: take an existing one, or leave a note that there is none | No `brand-assets` skill is needed |
| Voice | In the first version, as a short block | A full voice page is switched on by an event. No separate `brand-voice` |
| Languages | The brand book in the brand's language; the skills and everything else in this repository in English | Cyrillic works from the first version |

## Working with the person

| Question | Decision |
|---|---|
| Interview | No separate research. Basis: `grilling` and the [anatomy](research/brand-book-anatomy.md) report |
| Stops | Three: confirm the retelling, choose a style, accept the page |
| Choosing a style | In words in the chat, with no local server |

## Boundaries

| Question | Decision | What follows |
|---|---|---|
| Dependencies | Node 20+ and no dependencies | Terrazzo and YAML are out. The brand book format must be parseable with Node's built-in tools |
| Names | Skills `brandfile` and `brand-*`, folder `brand/` | |
| Several repositories per brand | Not in the first version | The `brand/` folder is copied by hand |
| Publicity | The repository will become public; the date is not set | Everything in it is in English, and it names none of the author's own products |
| First test | The author runs the finished system on their own product. While building it, we do not make that brand book and do not start runs | The results of that test stay outside this repository |
| Measurements | A small pilot, with no "better than competitors" claims | The author has not decided; this is the default |

## Done criterion for the first version

All skills and scripts are written, and the author can run `/brandfile` on their own product. There is no deadline.

Whether the system works, the author will check after the build, on their own product: whether they accept the brand book, and whether an agent following it in a clean session does 2–3 real tasks noticeably better than without it. This checks the result; it is not a condition for the first version being ready.

## What `brand-interview` rests on

All of this is inference or practitioner opinion, not proven sufficiency.

| Skill rule | Basis | Strength |
|---|---|---|
| Rounds of questions; the agent finds facts, the person decides | The `grilling` skill | Practitioner opinion |
| No ready answer on questions of taste | Inference in the [architecture](research/system-architecture.md), section 1 | Hypothesis |
| What meaning covers, the founder's decisions, the voice block | [Anatomy](research/brand-book-anatomy.md), sections 2, 6, and 8 | Inference from where authors overlap |
| No archetypes, personality scales, or manifesto | Anatomy, section 8 | Inference: nobody has shown a benefit |
| Frequency in code is not intent | [agent-brand-systems](research/agent-brand-systems.md), "A company with a product" | Benchmark data from the tools' authors |
| A non-obvious true trait and the main tension | [GoldLegendW80/brand](https://github.com/GoldLegendW80/brand) | Method untested |
| Analyzing references | No basis; to be checked by the author's first run | Hypothesis |
| A name check yields a record of risk, not "free" | [Visual identity](research/visual-identity-craft.md), section 5 | Inference |
