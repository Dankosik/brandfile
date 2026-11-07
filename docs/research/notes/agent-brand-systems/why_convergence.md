# Why agents produce the same faceless design: measured findings and folklore

Cutoff date: 2026-11-06. Tags: [measured] means a study or dataset with a stated method; [primary] means a claim by the party itself; [opinion] means a comment or blog post; [inference] means my own conclusion.

Main result for the report: "facelessness" is not one defect but at least three layers: surface (color, typeface, effects), structure (composition, component anatomy, set of sections), and content (copy, lack of a subject). Tokens fix the first layer. I found no direct controlled experiment of "tokens versus structure"; the conclusion rests on indirect data and has medium confidence.

---

## 1. Which mechanisms have been proposed and which have evidence

### Takeaway
Best established are the drop in diversity after post-training (on text), the repetitiveness of output (on UI), and the rigidly fixed stack in generators. Popularity in training data is the most popular explanation and the least measured: nobody has counted the corpus. The indigo-500 story is a joke, not a result.

### Cited Findings

Summary:

| Mechanism | Strength of evidence | What exists | What is missing |
|---|---|---|---|
| (a) popularity in the data | weak, indirect | statements by Anthropic and v0; the agent's stack choice | corpus frequencies versus output frequencies |
| (b) defaults in system prompts | strong for the stack, medium for aesthetics | primary documents from Bolt, v0, Lovable; extracted prompts | how much variation the prompt explains |
| (c) seeking the mode when underspecified | medium | [measured] repetitiveness on UI and text; the explanation is [primary] | a direct test of the mechanism on UI |
| (d) the agent does not see its output | medium | [measured] quality gain with a visual loop | the loop's effect on diversity |
| (e) thin context | medium, and partly against the hypothesis | [measured] changing domain and content barely changes structure | an experiment with a full brand input |
| (f) selection: RLHF, arenas, acceptance | strong on text, zero on UI | [measured] diversity drop and typicality bias | measurement on design |
| (g) libraries and templates | medium | [measured] shadcn chosen 90%; similarity noted even when libraries are banned, but without a comparison baseline | share of the contribution |

**(a) Popularity in training data**
- [primary] Anthropic explains the similarity by token statistics and writes: "Safe design choices–those that work universally and offend no one–dominate web training data". The post has no measurements, only screenshots — [Anthropic, 12.11.2025](https://claude.com/blog/improving-frontend-design-through-skills).
- [primary] Vercel: v0 "trained on the default implementations" of shadcn/ui components, so heavy customization gives an unexpected result — [v0 docs](https://v0.app/docs/design-systems-legacy).
- [primary, joke] Adam Wathan, 07.08.2025, 1.5 million views: "I'd like to formally apologize for making every button in Tailwind UI" indigo-500 — [X](https://x.com/adamwathan/status/1953510802159219096), text read through an API mirror. The post has no data. Commenters build out the causality with claims that have no counts — [opinion, DEV](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p).
- [primary, color check] `#667EEA` is Indigo 500 in the [Tailwind v1](https://v1.tailwindcss.com/docs/customizing-colors) palette (released [13.05.2019](https://github.com/tailwindlabs/tailwindcss/releases/tag/v1.0.0)); `#6366f1` is in the [Tailwind v3](https://v3.tailwindcss.com/docs/customizing-colors) palette. But the pair `#667eea → #764ba2` already sits as `plum_plate` in [webgradients.css, a 2017 commit](https://github.com/itmeo/webgradients/blob/daf70e8e68259ac2f5d33b672199b54e523e7c44/webgradients.css), that is, earlier than Tailwind v1 and Tailwind UI.
- [measured, n=3, one run] Both values do occur in Claude's base output without a skill: `linear-gradient(#667eea, #764ba2)` and the indigo `#6366f1` — [dani-z benchmark](https://github.com/dani-z/frontend-design-skill-benchmark).
- [measured] Claude Code picks Tailwind in 68.4% of cases (52/76, CI 57–78%) and shadcn/ui in 90.1% (64/71, CI 81–95%); 2,430 responses, 3 models, 4 repositories. The authors themselves note that selection frequency cannot be separated from frequency in the training data. Extraction accuracy is about 85% on a manual sample of 50 — [Amplifying, February 2026](https://amplifying.ai/research/claude-code-picks/report).
- [measured] New models change the choice within an ecosystem: Prisma 79% → 0%, Drizzle 21% → 100% between Sonnet 4.5 and Opus 4.6 — [same source](https://amplifying.ai/research/claude-code-picks/report).
- [measured] Bootstrap is on 13.0% of all sites, Tailwind on 0.3% — [W3Techs, 06.11.2026](https://w3techs.com/technologies/overview/css_framework). W3Techs detects from the public web; undercounting Tailwind is possible, and I did not check the size.

**(b) Defaults in generators' system prompts**

Source reliability varies, and it matters not to mix them:

| Source | Status | What it confirms |
|---|---|---|
| [`.bolt/prompt` in stackblitz/starters](https://github.com/stackblitz/starters/blob/HEAD/vite-shadcn/.bolt/prompt) | [primary], public repository | Tailwind, shadcn/ui, Lucide; "Use icons from lucide-react for logos."; a request not to make cookie cutter designs; a ban on installing other UI packages without need |
| [`bolt-vite-react-ts/.bolt/prompt`](https://github.com/stackblitz/starters/blob/HEAD/bolt-vite-react-ts/.bolt/prompt) | [primary] | the same without shadcn |
| [v0 docs](https://v0.app/docs/design-systems-legacy) | [primary] | shadcn/ui as the default component system |
| [Lovable FAQ](https://docs.lovable.dev/introduction/faq) | [primary] | one stack for all projects with no choice; since 13.05.2026 TanStack Start instead of React + Vite; Tailwind and shadcn are not named in the FAQ |
| [v0, extracted prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt), commit of 10.05.2026 | unofficial, medium reliability | exactly 3–5 colors, at most 2 font families, Geist in the layout sample, a ban on purple and gradients |
| [Lovable, extracted prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Lovable/Agent%20Prompt.txt), commit of 16.09.2025 | unofficial, outdated | shadcn, HSL semantic tokens, `--gradient-primary` samples, a "wow them" setting |
| [Claude Sonnet 5, extracted prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Anthropic/Claude%20Sonnet%205.txt) | unofficial | Tailwind core utilities and lucide-react are available in artifacts |
| [bolt.new OSS](https://github.com/stackblitz/bolt.new/blob/HEAD/app/lib/.server/llm/prompts.ts) | [primary], old open version | a preference for Vite; I found no aesthetic rules |

- [opinion, attribution not verified] A comment attributed to a Vercel employee: the prompt is not protected, but most "extractions" are hallucination — [Reddit mirror](https://redlib.ssps.io/r/nextjs/comments/1k92ojw/full_leaked_v0_system_prompts_and_tools_updated). So I treat the stack as reliable (there is primary confirmation) and figures like "3–5 colors" as probable but unconfirmed.
- Going stale: the extracted Lovable prompt names React + Vite, while the [FAQ](https://docs.lovable.dev/introduction/faq) already reports a change of default.

**(c) Seeking the mode when underspecified**
- [primary] Anthropic: without direction, output clusters around safe solutions; the term "on distribution" is in the [blog](https://claude.com/blog/improving-frontend-design-through-skills), and also in the [documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). This is an explanation, not a measurement.
- [measured] Indirect confirmation: 73.0% of screenshots fall in a model's dominant cluster, and 76.0–97.8% for commercial models — [PhishGen](https://arxiv.org/html/2610.30226); LLM answers are much closer to each other than human ones — [Wenger & Kenett](https://arxiv.org/html/2501.19361v1). Details in section 2.
- [opinion, survey] Shin et al. (63 sources, an analysis of six tools without users and without sampling generations): the model fills the gaps in a vague prompt with probabilistic defaults; design fixation on the first plausible result is added — [arXiv 2603.13036](https://arxiv.org/abs/2603.13036), analysis of the [full text](https://arxiv.org/html/2603.13036).

**(d) The agent does not see the result**
- There are two separate flaws here. First: it does not look at the render. Second: it does not see other generations.
- [primary, qualitative] Anthropic: agents tend to praise their own work, especially in design; a separate evaluator with Playwright is easier to tune toward skepticism than a generator toward self-criticism. There is no formal benchmark — [Harness design, 24.03.2026](https://www.anthropic.com/engineering/harness-design-long-running-apps).
- [measured] WebGen-Agent with a screenshot and VLM scoring: Claude 3.5 Sonnet, accuracy 26.4% → 51.9%, appearance 3.0 → 3.9 on WebGen-Bench — [arXiv 2509.22644](https://arxiv.org/abs/2509.22644v1). This is quality, not diversity.
- [measured] The stated rationale diverges from the implementation: about 25% of the reasoning is absent from the interface, 34% on functional requirements; 120 interfaces, 5 tools — [Design Theater](https://arxiv.org/html/2607.22928v2).
- [opinion] The instruction "do not converge across generations" cannot be followed: the model does not see other runs — [Justin Wetch](https://www.justinwetch.com/blog/improvingclaudefrontend). [primary] The current skill advises keeping notes on what has already been tried and taking screenshots — [SKILL.md, September 2026](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).
- Caution: the claim "VLMs cannot tell colors apart, hence the slop" is self-published; 40 samples, 480 observations, ΔE00 2.51–3.33 for GPT-4o and Claude. The authors did not test a link to UI output — [Imoto](https://dev.to/kenimo49/why-ai-generated-uis-are-all-the-same-color-and-the-data-to-prove-it-12oe).

**(e) Thin context**
- [measured] The most direct result: when domain, content, and brand name change inside a prompt pair, the models' creative range is 0.581 (CI 0.567–0.597), humans' is 0.902 (0.884–0.919); on unrelated tasks the same model gives 0.811. The paper's section title: "Differentiating the prompt does not differentiate the design" — [Design Creativity Bench](https://arxiv.org/html/2610.11539v1). The metric counts mainly structure (see section 2). So context has an effect, but not enough: 0.581 is clearly below both humans and unrelated tasks.
- [measured, different setting] In text-image loops, longer prompts did not cancel convergence — [EurekAlert](https://www.eurekalert.org/news-releases/1109574).
- [primary] Since September 2026, Anthropic's skill first requires defining the subject, audience, and task: that is the source of differences — [SKILL.md](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md). The effect is not measured.

**(f) Selection: RLHF, arenas, user acceptance**
- [measured] RLHF substantially reduces diversity relative to SFT (LLaMA 7B, summarization, 16 samples on 500 inputs; EAD and Sentence-BERT). Numbers only on charts; the authors speak of mode collapse — [Kirk et al.](https://arxiv.org/html/2310.06452).
- [measured] Typicality bias in preferences: on HelpSteer (6,874 pairs of equal correctness) raters prefer the typical, α̂ 0.57–0.65, p < 10⁻¹⁴. Tulu-3: diversity base 45.4% → SFT 20.8% → DPO 10.8% — [Verbalized Sampling](https://arxiv.org/html/2510.01171v3). All on text.
- [measured] In 2024–2026 models became more stable with themselves but not closer to each other; conventions appear at SFT and are reformatted by preference optimization — [Qiu et al., 01.11.2026](https://arxiv.org/abs/2611.01549).
- [opinion] Design Arena: voting on a "like" basis; critics in the thread think it rewards flashiness or fidelity to the prompt and may entrench a new formulaic taste. The founders speak of a possible human baseline — [Launch HN](https://hn.svelte.dev/item/44878257). I found no measurement that arena wins shift output toward the safe.
- [measured, our recount] On Krebs's data, the Spearman correlation between pattern count and HN points is −0.048 (n=1,369) — [results](https://github.com/AdrianKrebs/ai-design-checker). [measured] Independently, another author gets −0.001 (n=2,079, different rules, the author sells a grader) — [mattbusel](https://dev.to/mattbusel/landing-page-grader-tested-on-2077-show-hn-pages-correlation-000-5d96). The HN market outwardly does not punish templated design. This does not measure conversion.
- [measured] Individual gain versus collective loss: stories with ideas from AI are rated higher (novelty +8.1% with five ideas) and are more like each other (8.9–10.7% of the range) — [Doshi & Hauser, n=293 authors, 600 raters](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532). This is text, but the social-dilemma logic carries over.

**(g) Libraries and templates**
- [primary] shadcn admits: "Somewhere along the way, all apps started looking the same." `npx shadcn create` rewrites component code, not only colors: spacing, structure, density; five styles — [changelog, December 2025](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create).
- [measured, secondary] Before LLMs: Goree et al. name the overlap of code and libraries as one cause of convergence — [project page](https://cv-web-history.neocities.org/). I saw the names Bootstrap, Font Awesome, and jQuery UI only in a search summary of retellings; I could not open the page or the paper's PDF, so this cannot be cited as a verified fact.
- [measured] Counter-evidence: in Design Theater the tools are forbidden external libraries (only HTML, CSS, JS), and similarity is still noted; but the authors did not check compliance with the ban and have no human baseline — [Design Theater](https://arxiv.org/html/2607.22928v2).
- [measured, author has a conflict of interest] Among pages known to be AI-made (n=120): default shadcn with a recolored main button 61%, only Lucide 63% — [Build to Launch](https://buildtolaunch.substack.com/p/fix-ai-slop-website-design). The selection is self-selected, and the author sells a fix.

### Inferences
- [inference] The naive version of (a) is refuted: on the public web Bootstrap leads Tailwind by tens of times, yet the agent picks Tailwind. So what matters is not frequency on the web but novelty-weighted code, documentation, repository context, and post-training. A working formula: the corpus sets the candidates, and RLHF and prompts narrow them to the mode.
- [inference] Wathan explains the form of one specific shade, but not the cause. The color `#667eea` appeared in a popular gradient set before Tailwind v1. Tailwind is probably an amplifier, not the source.
- [inference] (b) is needed to explain the library layer in builders, but not convergence itself: Kombai tests models with default API parameters, and Design Arena gives the same prompt to different models. There are no builder prompts there, yet similarity and fingerprints are visible.
- [inference] (e) shows something uncomfortable: simple context input does not translate into structure. Context must become explicit structural decisions, or the model recolors the same page.

### Gaps
- Nobody has compared the frequency of Tailwind, Inter, or Lucide in the training corpus with their frequency in output. The corpora are closed.
- There is no experiment separating the model's contribution from the system prompt's on one set of briefs.

---

## 2. Measured evidence of convergence

### Takeaway
Convergence on UI has now been measured, and the best data speak about structure, not color. But the database is young: almost all of it is 2026 preprints, often with a conflict of interest and without an agreed human baseline.

### Cited Findings

| Study | n, method | Effect | Limitations |
|---|---|---|---|
| [Design Creativity Bench](https://arxiv.org/html/2610.11539v1), Kombai, 08.10.2026 [measured] | 15 models, 80 tasks, 160 prompts, 2,400 designs; segment comparison (Gemini + UIClip, Hungarian); S = 0.9 × information architecture + 0.1 × color; AUC 0.87 and 0.85 on human labels | Originality: models 0.592, human–model 0.764. Creative range: 0.581 versus 0.902. Appropriateness above 93% for all 15. Originality and range are unrelated (ρ −0.13, p=0.66) | The authors sell a UI product; the projection deliberately ignores theme, copy, spacing, type size; designers used Behance; default temperature, no diversifying prompts; preprint |
| [Design Theater](https://arxiv.org/html/2607.22928v2), AIES, 07.2026 [measured] | 5 tools (ChatGPT, Claude, Firebase Studio, v0, Bolt), 24 tasks, 120 interfaces; UIClip, CIELCh EMD, OmniParser with tree edit distance | Appearance and layout: narrow spread between pairs (0.119–0.151 and 0.181–0.211); color: wider (20.6–39.7) | Metric units are not comparable, no significance tests, no human baseline, only one screen, library ban |
| [Krebs](https://adriankrebs.ch/blog/design-slop/), 20.04.2026 [measured] | 1,590 Show HN pages; Playwright, deterministic DOM and CSS checks; false positives about 5–10% | 4+ patterns 22%, 2–3 patterns 32%, 0–1 patterns 46% | No "made by AI" label, no control group, the pattern list comes from designers he knows |
| [Build to Launch](https://buildtolaunch.substack.com/p/fix-ai-slop-website-design) [measured, weak] | 120 pages from the galleries of Lovable, Bolt, Replit, Base44, Claude Code, Cursor; 16 signs, some judged by eye | Icon cards on 63% of landings, centered headline 51%, pill above H1 51%, Inter or no font 60%, purple buttons 13% (12 of 91); 57 pages with 6+ signs, 20 with 2 or fewer | Self-selection, the author sells tools, different denominators |
| [Design Arena](https://x.com/DesignArena/status/2111884406868808191), 18.10.2026 [primary, about its own analysis] | 64,000+ sites, a "style vector" per model, overlay of the 40 nearest pages | OpenAI: cream and italic serif; Anthropic: dark, glowing, purple; DeepMind: dark-blue dashboards with a sidebar; Meta: magazine-style blocks | Only a post with an image, method not published, not in the [changelog](https://www.designarena.ai/changelog) |
| [PhishGen](https://arxiv.org/html/2610.30226), 21.10.2026 [measured] | 28,121 valid sites, 14 LLMs, 4 brands; share in the largest FastDup cluster at threshold 0.96 | 73.0% across models; commercial 76.0–97.8%; human-made sets are clearly more diverse: 7.7% for Facebook, up to 38.5% for Amazon | Narrow task (brand clone), threshold without sensitivity analysis; in the table by prompt type the same metric is aggregated differently and gives 55.5% |
| [Goree et al., CHI 2021](https://cv-web-history.neocities.org/) [measured, pre-LLM] | Sites 2003–2019, CNN and color and layout features, 11 interviews | Designs converge markedly since 2007; layout distance fell by more than 30% | PDF not opened, data from the authors' project page. The figure "10,000 sites, almost 200,000 images" comes only from a [secondary repost](https://pipedot.org/53EQ1) |
| [Wenger & Kenett, 2025](https://arxiv.org/html/2501.19361v1) [measured] | 102 people, 22 LLMs (7 in the main statistics); AUT, FF, DAT; 1 − cosine similarity | Population diversity: AUT 0.459 versus 0.738; FF 0.534 versus 0.835; DAT 0.665 versus 0.819. Individual originality is comparable | One type of metric; test leakage into training is possible; preprint |
| [Hintze et al., Patterns 2026](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.patter.2025.101451&resultType=core&format=json) [measured] | SDXL and LLaVA in a loop, 700 trajectories (100 prompts, 7 temperature values); check on other model pairs | All converge to nearly the same images, 12 motifs; stabilization around cycle 100 | Read the abstract and [press release](https://www.eurekalert.org/news-releases/1109574); the full text is closed to my tool; images, not UI; the loop differs from generation from a brief |
| [Doshi & Hauser, Science Advances 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532) [measured] | 293 authors, 600 raters, ideas from GPT-4 without dialogue with the model, preregistration | Similarity rises by 8.9–10.7% of the range | Short texts, one model, non-professional authors |
| [Wadinambiarachchi et al., CHI 2024](https://arxiv.org/html/2403.11164v1) [measured] | N=60, 3 groups; avatar sketches | Fixation higher with Midjourney (+0.32) and with image search (+0.27); diversity lower in both cases | Novices, 20 minutes, 1 task |

**Our recount of Krebs's files.** [measured, classification mine, [inference]] Data: [repo, results/tier-*.json](https://github.com/AdrianKrebs/ai-design-checker), snapshot of 1,390 pages, posts 10.04–09.05.2026, 14 patterns, distribution 47.1% / 32.5% / 20.4%. Script: [`scripts/krebs_ban.py`](scripts/krebs_ban.py).

| Pattern | Layer (my labeling) | Share of pages |
|---|---|---|
| perma dark mode | surface | 34.7% |
| gradients | surface | 26.0% |
| icon card grid | structure | 21.7% |
| centered hero | structure | 20.9% |
| hero eyebrow pill | structure | 16.5% |
| numbered steps | structure | 16.3% |
| FAQ accordion | structure | 14.2% |
| glassmorphism | surface | 14.0% |
| templated fonts (Space Grotesk, Instrument Serif, Geist, Syne, Fraunces) | surface | 10.4% |
| all-caps headings | surface | 9.4% |
| accent stripe | surface | 6.3% |
| **purple accent** | surface | **5.4%** |
| colored glows | surface | 5.4% |
| stat banner | structure | 5.0% |
| emoji nav | structure | 1.4% |

- At least one surface pattern on 61.5% of pages, a structural one on 53.8%; only surface 23.7%, only structural 16.0%, none 22.5%.
- In the 4+ patterns group, structure accounts for 48.3% of hits; 79.5% of these pages have 2+ structural patterns.
- 76.9% of pages with 2+ patterns have neither purple nor a templated font. A ban on these two signs does not touch them.
- If the whole surface layer were hypothetically removed, 26.1% of all pages would still have 2+ structural patterns.
- In another index of the same repository (`results/index`, n=982, a different detector version) `shadcn_signature` is 21.8%.
- Limits of the recount: the detector catches only what is easy to check in the DOM, and structure is probably underrepresented there. FAQ and a centered hero were the norm before LLMs too. The labeling is mine and debatable: for example, accent stripe could count as structure.

**Folklore and what to do with it**

| Claim | Status |
|---|---|
| "All AI sites are purple" | Outdated. 5.4% on Show HN in spring 2026; 13% of buttons in a sample of AI pages. But base output without a skill in the micro-sample is 2 of 3 ([dani-z](https://github.com/dani-z/frontend-design-skill-benchmark)). v0, judging by the [extracted prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt), bans it outright |
| "95.4% of AI interface colors are blue-purple" | Do not use. The [article](https://dev.to/kenimo49/why-ai-generated-uis-are-all-the-same-color-and-the-data-to-prove-it-12oe) gives no sample size, generators, or counting method; the [README](https://github.com/kenimo49/ai-blue-color-bias) repeats the figure, and I did not find a sample size there |
| "67% of Show HN has signs of AI design" | An outdated secondary figure from [slop-detect](https://github.com/ravidsrk/slop-detect); a similar 21/46/33 is given by [wikidocs](https://wikidocs.net/blog/@jaehong/12209/) per search results, and I did not open the page. The current text by [Krebs](https://adriankrebs.ch/blog/design-slop/): 22/32/46 at 1,590; 2+ patterns on 54% |
| "indigo-500 explains everything" | The author's joke, no data |
| "Show HN tripled" | Present in the [headline of an early version on an HN aggregator](https://hnshowcase.com/post/47864393/show-hn-submissions-tripled-and-are-now-mostly-vibe-coded); the current [post](https://adriankrebs.ch/blog/design-slop/) has only a chart without this wording |

### Inferences
- [inference] The most valuable figure in the section is Kombai 0.581 versus 0.902: when domain and brand change, structure changes markedly less than it does for designers. But the designers' samples were themselves taken from portfolios, where distinctiveness matters. The gap may be overstated.
- [inference] Design Theater will often be cited as "color is more diverse than structure," but this is a comparison of ranges of incomparable metrics without a significance test. Use only as a hint.
- [inference] Homogenization is older than LLMs: Krebs writes "before the AI era, everything looked like Bootstrap" ([post](https://adriankrebs.ch/blog/design-slop/)), and Goree gives a numerical baseline. Agents inherited an already compressed distribution and compressed it further.

### Gaps
- There is no measurement of Show HN or the wider web before and after LLMs with one detector.
- There is no public method for Design Arena.
- There is no shared human baseline for UI metrics: Design Theater has none, and Kombai uses designers with inspiration.

---

## 3. Model fingerprints and second-order convergence

### Takeaway
The shift of the mode after a ban is well documented by primary sources and confirmed by a micro-sample, but not measured at large scale. Anthropic writes directly that general bans move the model to a different fixed palette.

### Cited Findings

Timeline:

| Date | What is recorded | Tag |
|---|---|---|
| 11.2025 | Anthropic blog: Inter, purple gradients; even after a ban the model can get stuck in another local maximum, for example Space Grotesk | [primary](https://claude.com/blog/improving-frontend-design-through-skills) |
| 12.2025 | Skill, 583 words: ban on Inter, Roboto, Arial, system fonts, purple gradients; convergence on Space Grotesk | [primary](https://github.com/anthropics/skills/blob/00756142ab04c82a447693cf373c4e0c554d1005/skills/frontend-design/SKILL.md) |
| 03.2026 | With the skill: Playfair + warm paper `#f5f0e8`, Playfair + `#f7f4ef`, acid lime `#c8f135` + JetBrains Mono and Syne. Three tasks, one run, the skill's criteria match the test's criteria | [measured, micro](https://github.com/dani-z/frontend-design-skill-benchmark) |
| 04.2026 | Designers name Space Grotesk, Instrument Serif, Geist to Krebs as LLM combinations | [opinion](https://adriankrebs.ch/blog/design-slop/) |
| 06.2026 | Skill, 1,336 words: cream `#F4F1EA` + serif display + terracotta; near-black + acid green or vermilion; broadsheet with thin rules | [primary](https://github.com/anthropics/skills/blob/2235be7c60b551f5de82ade908fd3816455afcda/skills/frontend-design/SKILL.md) |
| 2026 | Opus 4.8 documentation: the house style is `#F4F1EA`, Georgia, Fraunces, Playfair, italic accent words, terracotta, amber. General guidance "shift the model to a different fixed palette rather than producing variety" | [primary](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) |
| 2026 | Sonnet 5: the same thesis without a palette description | [primary](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5) |
| 09.2026 | Skill, 1,516 words: added the SaaS card set and templated chrome (eyebrow in caps, middle dots, `→`, mono for captions); `#D97757` recognized as a telltale. About the traits it says: "they are defaults rather than choices" | [primary](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md), [PR #1713](https://github.com/anthropics/skills/pull/1713) |
| 10.2026 | Design Arena: OpenAI has cream with an italic serif | [primary, about its own analysis](https://x.com/DesignArena/status/2111884406868808191) |

- [primary about its own list, the cause is opinion] Impeccable keeps a font block under the comment "Newer monoculture": Fraunces, Instrument Serif, Instrument Sans, Geist, Space Grotesk, and others — [constants.rs](https://github.com/pbakaus/impeccable/blob/HEAD/crates/foundation/src/constants.rs).
- [opinion] avoid-ai-design singles out a separate class of "second-order defaults" and says outright that the fix converged too — [README](https://github.com/funboy322/avoid-ai-design).
- [measured] Fingerprint and diversity are different axes: GPT-6 Astra is the most original relative to other labs (0.646) but has the narrowest range (0.472); [Design Creativity Bench](https://arxiv.org/html/2610.11539v1). By the numbers of the same table, Claude Opus 5.5 leads in appropriateness (99.2%) and is 13th of 15 in originality (0.557). This is one benchmark by one vendor.

### Inferences
- [inference] A ban moves the mode; it does not remove it. Support: Anthropic's direct statement, the skill's growth from 583 to 1,516 words in nine months, the appearance of new clusters. Growing rule length is a sign of playing catch-up.
- [inference] An important ambiguity: the cream style may be both a consequence of the bans and the model's new base style. The Opus 4.8 documentation describes it as the model's default, and Design Arena attributes a close style to OpenAI. What is caused by skills and what by training is unknown.
- [inference] A contradiction: Design Arena calls Anthropic's style dark and purple, while Anthropic's documentation calls it cream. The vector is probably averaged across model versions, but the method is closed and cannot be checked. In the report, do not present one as a refutation of the other.

### Gaps
- There is no multi-run measurement of font and palette frequencies with and without a ban.
- There is no time series of Instrument Serif and cream pages: Krebs's data are a snapshot. There are no direct data that Instrument Serif specifically became a mass default, apart from 10.4% for the whole templated-font group.

---

## 4. Which interventions have evidence

### Takeaway
There is little direct data on UI. Positive specification and choosing among several directions rest so far on primary statements, and Verbalized Sampling is proven on text. Temperature is nearly useless. A component registry is best confirmed for compliance with the system. Nobody has shown that tokens reduce similarity rather than change the color.

### Cited Findings

| Intervention | Best data | What it actually changes | Confidence |
|---|---|---|---|
| Banning telltale signs | [primary] Anthropic: a different fixed palette ([Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)); 76.9% of flagged pages are outside the two meme signs (our recount above) | Shifts the mode | medium |
| A concrete alternative | [primary] The model follows an explicit specification precisely; Anthropic's example also sets the grid, radii, section order, buttons, motion ([Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)) | Moves output to the set point | medium, no numbers |
| Propose 4 directions before building | [primary] Anthropic recommends it instead of temperature ([Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5)) | Different directions between runs | medium, no numbers |
| Verbalized Sampling | [measured] Diversity gain of 1.6–2.1× in creative writing; on poems and Tulu-3 after DPO about 66.8% of base is retained versus 23.8%; 100 prompts per task ([arXiv](https://arxiv.org/abs/2510.01171v3), [full text](https://arxiv.org/html/2510.01171v3)) | Text. Not tested on UI; with images only qualitatively, through captions | high on text, unknown on UI |
| CoT for idea diversity | [measured] The best of the prompts tested, approaches the human group ([Meincke et al.](https://arxiv.org/abs/2402.01727)); only the abstract was read, with no n in it | GPT-4 ideas | medium |
| System prompt "be very creative" | [measured] AUT from 0.459 to 0.576 versus 0.738 for humans ([Wenger](https://arxiv.org/html/2501.19361v1)) | Moderate | medium |
| Temperature | [measured] The loop converges at all 7 values ([Hintze](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.patter.2025.101451&resultType=core&format=json)). [primary] Sonnet 5 returns 400 on temperature ([Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5)). [measured] Persona plus top-p and T ≥ 4.0 on open models: cosine 0.85 → 0.65, contributions not separated ([Fu et al.](https://arxiv.org/abs/2608.02618)). VS and temperature complement each other ([VS](https://arxiv.org/html/2510.01171v3)) | Often unavailable in closed APIs | medium |
| Visual loop | [measured] appearance 3.0 → 3.9 ([WebGen-Agent](https://arxiv.org/abs/2509.22644v1)). [primary] Evaluator with Playwright, 5–15 iterations, up to 4 hours; the wording "museum quality" caused its own convergence: the criteria "steered the generator in ways I didn't fully anticipate" ([Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)) | Quality. Effect on diversity not measured; the criterion itself sets a new mode | medium |
| References | [measured] In brand cloning, screenshot prompts raise perceived quality (2.35–2.54 versus 1.35–2.07) and lower diversity (60.7–65.0% versus 45.5–58.8% in the top cluster) ([PhishGen](https://arxiv.org/html/2610.30226)). [measured] In humans, both AI images and search raise fixation ([CHI 2024](https://arxiv.org/html/2403.11164v1)) | Anchors to the reference: good for brand fidelity, bad for diversity | medium, different task |
| The skill as a whole | [measured, weak] 3 tasks: 100% versus 28% of assertions, but the assertions repeat the skill's bans ([dani-z](https://github.com/dani-z/frontend-design-skill-benchmark)). A skill edit: 21 of 28 decisive comparisons, judge Opus 4.5, the metric is quality, not similarity ([Wetch](https://www.justinwetch.com/blog/improvingclaudefrontend)) | Quality and the judge's taste | low |
| Tokens, design file, brand | see below | Holds the palette; structure unclear | low |

**Tokens and design files: do they reduce similarity or only change the color?**
- [primary, non-target study] Atlassian, 15.06.2026: in a prototype, DESIGN.md moved output from generic to recognizably Atlassian (color, spacing, shape, typography, elevation; judged by eye). In production the input was 7.21 million tokens versus 3.75 million for MCP and 4.43 million for a skill; DESIGN.md more often recreated components than imported them; 80 KB of the file covers about 30% of the context versus 80%. The number of runs is not stated, and the authors call the result inconclusive. For them the format is a "useful portability format as a snapshot of your design system" — [Atlassian](https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice).
- [measured] A registry of ready components gave 95.08% compliance, the best of three strategies (instructions, context, registry); 6 UIs, a pilot with 9 practitioners; I have not seen the numbers for the other two, and the full text is closed — [Cha et al., CHI EA 2026](https://pure.seoultech.ac.kr/en/publications/design-system-compliant-user-interface-generation-with-llm-agents/). The metric is compliance, not distinctiveness.
- [opinion, uncontrolled] With tokens and no prose, screens 5–8 of 8 kept the palette but blurred the layout language; with DESIGN.md the drift is smaller: "Not zero. Smaller." The number of runs and the models are not stated — [WaveSpeed](https://wavespeed.ai/blog/posts/design-md-vs-design-tokens-ai-workflows/).
- [opinion] "Contextual anchoring" on tokens and brand books is only proposed and not evaluated in the Shin et al. survey — [arXiv 2603.13036](https://arxiv.org/html/2603.13036).
- I found no controlled "with and without tokens" test with a structural similarity metric.

### Inferences
- [inference] There are three different results that get mixed up in conversation: compliance with the system, distinctiveness from others, quality. The registry is confirmed for the first, references and tokens are probable for the second, the loop for the third.
- [inference] For a brand book, anchoring to a reference is a plus, not a minus. PhishGen shows that a reference narrows the spread and improves fidelity: exactly what is needed inside a brand.

### Gaps
- There is no test of VS or its analogs on UI generation.
- There are no data on whether a visual loop reduces similarity. It may increase it if there is one criterion for everyone.
- The full text of Cha et al. is unavailable, and the numbers for the two baseline strategies are unknown.

---

## 5. Causal model: tokens or structure

### Takeaway
"Facelessness" is mostly not a token problem, if you count by what remains after color and typeface are fixed. Color and typeface are the most visible signs, but removing them leaves structure and copy. A brand source of truth fully covers only part of the causes: the choice of values and context. The rest needs a registry, a composition grammar, a content model, and a render check.

### Cited Findings

Evidence for structure:
- [measured] Kombai: the structure weight of 0.9 was tuned on human labels and edit ladders; the authors think people weigh color differently than composition. The models' creative range is low precisely on such a metric — [Design Creativity Bench](https://arxiv.org/html/2610.11539v1). Caveat: the projection is pre-tuned to ignore theme, so this does not prove that color does not matter.
- [measured] Goree: a convergence of layout by more than 30% is shown quantitatively even before LLMs — [project page](https://cv-web-history.neocities.org/).
- [measured, our recount] 79.5% of heavy pages have 2+ structural patterns; 26.1% of all pages keep 2+ structural patterns even if the whole surface layer is removed — [Krebs's data](https://github.com/AdrianKrebs/ai-design-checker).
- [primary] The evolution of Anthropic's skill: from bans on fonts and colors to structure as information, a plan with an ASCII wireframe, a section on text — [December 2025](https://github.com/anthropics/skills/blob/00756142ab04c82a447693cf373c4e0c554d1005/skills/frontend-design/SKILL.md), [September 2026](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).
- [primary] shadcn: for a real change of look, the CLI rewrites spacing and structure, not only colors — [changelog](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create).
- [primary] In Anthropic's example, alongside the palette, the container and sections, radii, spacing, block order, buttons, and typography are set — [Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8).
- [opinion] Tokens preserve the palette, but the layout sprawls — [WaveSpeed](https://wavespeed.ai/blog/posts/design-md-vs-design-tokens-ai-workflows/).

Evidence for tokens and surface:
- [measured] The most frequent patterns at Krebs are surface: perma dark 34.7%, gradients 26.0%; at least one surface pattern on 61.5% versus 53.8% structural — [data](https://github.com/AdrianKrebs/ai-design-checker).
- [primary] Atlassian: the design file made the prototype recognizable, although the file holds not only colors but also shape and elevation — [Atlassian](https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice).
- [primary about its own analysis] Design Arena's description of fingerprints is half surface: cream, serif, glowing, purple; half structural: dashboards with a sidebar, magazine-style blocks — [post](https://x.com/DesignArena/status/2111884406868808191).
- [inference] The first impression "this is AI" usually comes from color and typeface, and lists of telltale signs are built on this; I found no direct perception test.

Causal table (all estimates in the "fixes" columns are [inference]):

| Cause | Brand source of truth | How and why | What else is needed |
|---|---|---|---|
| (a) corpus mode | Partly | Overrides values where they are set; on unset axes the model returns to the prior | Coverage of all axes, not only color |
| (b) the generator's rigid stack | Partly | The stack stays, the theme changes | Adapters for Tailwind, shadcn registry, v0, Lovable; accept the stack as a given |
| (c) seeking the mode | Partly, in proportion to coverage | Unset axes are filled with the mode | A specification of composition, density, hierarchy, motion, images |
| (d) does not see the render | Does not fix | The source of truth describes the target but does not report the result | Render, screenshots, computed style lint, a separate evaluator |
| (d2) does not remember other runs | Partly | If decisions are recorded in the repository | A log of decisions and of what was already tried |
| (e) thin context | Fixes best, but not automatically | Business, audience, position, subject materials | Translating context into explicit structural decisions, real content |
| (f) RLHF, arenas, acceptance | Does not fix | The bias remains and returns on unset axes; the user likes the default | Friction in the process: direction choice, plan review |
| (g) libraries, templates | Tokens no; registry yes | Recoloring leaves the anatomy; a registry changes the anatomy itself | Own components and page templates, a ban on assembling from defaults |
| Copy | Partly | Voice is set, but [Qiu et al.](https://arxiv.org/abs/2611.01549) show: models say similar things in different words | A content model: real evidence, facts, a ban on invented statistics |

What is needed beyond color and typefaces for each structural layer:
- **Composition.** Grid, rhythm, first-screen scenarios. [primary] Anthropic requires a layout concept and an ASCII wireframe before code — [SKILL.md](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).
- **Hierarchy.** What matters most on a brand page, which accent devices are allowed. The skill directly names emphasizing a single word, eyebrow captions, and numbering without a sequence as template signs — [same source](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).
- **Component anatomy.** [measured] Registry 95.08% — [Cha et al.](https://pure.seoultech.ac.kr/en/publications/design-system-compliant-user-interface-generation-with-llm-agents/). [primary] Heavy customization of shadcn can cause failures, since v0 is trained on the defaults — [v0 docs](https://v0.app/docs/design-systems-legacy).
- **Copy.** There are no numerical data on UI text; the skill gives it a separate section — [SKILL.md](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).

### Inferences
- [inference] The answer to the key question: surface is the most visible symptom, structure is the largest unfixed remainder, and thin context and the absence of selection are causes higher up the chain. A skill that ships only tokens will probably produce a recolored identical landing page. Confidence is medium, because there is no direct experiment.
- [inference] A model of causes as a chain: the corpus prior and post-training create a narrow peak; the stack and libraries lock in structure; a thin brief prevents movement; the agent sees neither the render nor other runs; the user accepts the result. Removing one link moves the output to the next nearby mode. This agrees with the fact that [a ban yields a different fixed palette](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8).
- [inference] It is important to separate the axes. A brand needs not diverse generation but a private mode: high distance from other brands, low spread of identity within the brand, while structure should still vary from task to task. Kombai shows that originality and range are unrelated, so they must be measured separately. Moving the mode, which is bad for bans, is good for a brand if the new point belongs to it alone.
- [inference] Domain and content on their own change structure little, so the brand source of truth must contain decisions, not descriptions: not "we are bold," but "the first screen is the live product, no centered headlines."

### Gaps
- A direct test: tokens, tokens plus prose, plus a registry, plus page templates, with a structural similarity metric. Not found.
- There is no perception test: which layer people consider "faceless" when color and structure change independently.
- It is unknown whether facelessness hurts sales or trust.

---

## What this means for the skill

1. **Goal.** Phrase it as the brand's private mode, not "uniqueness of every generation." Three metrics instead of one: distance between brands, consistency of identity within a brand, response of structure to the task. [inference]
2. **Axis coverage.** The brand book includes tokens, a composition grammar (grid, first screen, allowed and forbidden section patterns), component anatomy, a content model and voice, images, motion. An unset axis will be filled by the mode. [inference based on [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)]
3. **Positive decisions instead of bans.** Keep bans as a linter for the remainder. Date the list of telltale signs and update it: Anthropic has three markedly different versions in nine months ([December](https://github.com/anthropics/skills/blob/00756142ab04c82a447693cf373c4e0c554d1005/skills/frontend-design/SKILL.md), [June](https://github.com/anthropics/skills/blob/2235be7c60b551f5de82ade908fd3816455afcda/skills/frontend-design/SKILL.md), [September](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md)). [inference]
4. **The brand-book creation skill is subject to the same thing.** Thin input will give typical brands: warm, human, cream. It needs a mandatory interview, real materials and content, a comparison with competitors, several directions in the VS style with typicality marked, and a choice by a person. [inference based on [VS](https://arxiv.org/abs/2510.01171v3) and [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8); not tested on brand books]
5. **Enforcement matters more than description.** Priority: a component registry ([95.08%](https://pure.seoultech.ac.kr/en/publications/design-system-compliant-user-interface-generation-with-llm-agents/)), then deterministic checks: computed styles against tokens and DOM pattern detectors on the model of [Krebs](https://github.com/AdrianKrebs/ai-design-checker). Only after that, a separate evaluator with screenshots. Check the rubric wording; it [sets the mode itself](https://www.anthropic.com/engineering/harness-design-long-running-apps).
6. **The price of context.** A short core and loading on demand: [Atlassian's 80-kilobyte DESIGN.md](https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice) cost almost twice as much as MCP and recreated components.
7. **Adapters for the real stack.** The agent will almost certainly take [Tailwind and shadcn](https://amplifying.ai/research/claude-code-picks/report), and Bolt [directly fixes Lucide](https://github.com/stackblitz/starters/blob/HEAD/vite-shadcn/.bolt/prompt). Ship a theme, a registry, and rules for that stack instead of fighting it. Take into account the [risk of failures under heavy customization in v0](https://v0.app/docs/design-systems-legacy).
8. **Memory.** A log of decisions and of what was tried, kept in the repository, removes part of problem (d2): [Anthropic advises the same](https://github.com/anthropics/skills/blob/41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f/skills/frontend-design/SKILL.md).
9. **Our own benchmark as an advantage.** There are almost no public measurements, and this is a rare chance to stand out. Minimal design [inference]: 5–10 briefs, 3–5 runs each, arms: no skill; bans; tokens; tokens plus prose; plus a registry; plus page templates; plus a visual loop. Metrics: structural (UIClip and tree edit distance as in [Design Theater](https://arxiv.org/html/2607.22928v2) or the segment approach of [Kombai](https://arxiv.org/html/2610.11539v1)), color (CIELCh EMD), Krebs's detector, token compliance, a blind human test "whose brand is this?".
10. **Caution in promises.** Do not promise "uniqueness" and "removal of the AI look" without your own data. Detectors measure signs, not authorship: [Krebs himself](https://adriankrebs.ch/blog/design-slop/) considers one pattern an insufficient indicator.

## Open questions

- Do tokens and a design file reduce structural similarity or only change the color? There are no controlled data.
- What is the share of each cause? Nobody has decomposed the variance into corpus, post-training, prompt, library, and brief.
- Does a skill reduce similarity on a large sample, and what new modes does it create? There is only n=3 and a model judge.
- Where does the model's cream default end and the effect of bans and skills begin? Inseparable by open data.
- Design Arena's method is closed. Without it, model fingerprints remain a description, not a measurement.
- How are selection on arenas and post-training related to design? RLHF data exist only for text.
- Does facelessness hurt business? HN votes do not react, and I found conversion and trust measured nowhere. In a popular article Goree also points to upsides: shared libraries can help accessibility and navigation ([retelling with quotes](https://www.zmetro.com/?p=8079)), so not all convergence is a defect.
- What level of structural similarity counts as the norm? Kombai takes designers from Behance and Kombai Gallery, which may overstate the baseline.
- Has convergence of copy in interfaces been measured? I found nothing like it; text is studied only outside UI ([Qiu et al.](https://arxiv.org/abs/2611.01549), [Wenger & Kenett](https://arxiv.org/html/2501.19361v1)).
- How does all this look in Cyrillic? None of the studies found examined Russian-language pages and Cyrillic typefaces separately.
