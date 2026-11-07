# How to measure that a brand skill really improves agent output, and which instruction layer agents obey

Date: 2026-11-06. Tags: [measured] a study or dataset with a method; [code] checked in code; [primary] a party's claim about itself; [opinion] commentary; [inference] my conclusion. The note "abstract" means only the abstract was open.

## 1. Which instruction layer agents obey

### Takeaway
There are no direct measurements of "the agent follows the brand book". The data come from other goals (API knowledge, bug fixing, format constraints, keyword instructions, trivial annotations). From the adjacent data, always-loaded context is followed more reliably than a skill the agent has to decide to invoke. But it does not guarantee the result, and it gets more expensive. Compliance drops within a session and at compaction. The only things that can be forced are those checked by code outside the model's context: values, not taste.

### Cited Findings

**Always-loaded context (AGENTS.md, CLAUDE.md)**
- [primary, vendor promoting its own CLI] Vercel, 01/27/2026, Next.js 16 API evals: baseline 53%, skill by default 53%, skill with an explicit instruction 79%, compressed docs index in AGENTS.md 100%. The skill was not invoked in 56% of cases. An explicit instruction raised invocation to 95%+, but the result was still 79%. Compressing the index from 40KB to 8KB did not lower the result. Build/Lint/Test: baseline 84/95/63, AGENTS.md 100/100/100. The number of tasks, the models, and the number of repeats are not named. No held-out set is mentioned. The authors themselves call their explanation a working theory. — [Vercel](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [inference] I found no independent replication. The eval targets knowledge of fresh APIs, not style compliance. Transfer to a brand book is not proven.
- [measured] Gloaguen et al. (ETH Zurich, LogicStar), arXiv 2602.11988 v3: SWE-bench Lite 300 tasks + CTXbench 138 tasks from 12 repositories (the benchmark was earlier called AGENTbench); Claude Code + Sonnet-4.5, Codex + GPT-5.2 and GPT-5.1 mini, Qwen Code; 1 sample per agent and task. LLM-generated files: success rate −0.5% and −2% (p=0.87, 0.37, not significant). Developer-written files: +2.4% (p=0.21, not significant), 7% better than LLM files (p=0.038). Cost +20% and +23% (p<0.001), up to +19% for developer files. File length and removing sections had no significant effect on accuracy. Python only; style and code quality were not measured. — [arXiv](https://arxiv.org/html/2602.11988)
- [measured] Same source: instructions are followed. `uv` is used 1.6 times per task when mentioned, versus <0.01 when not; repository tools 2.5 versus <0.05. The authors state outright that the lack of gain is not explained by an inability to follow instructions. — [arXiv](https://arxiv.org/html/2602.11988)
- [measured, abstract] Closest in setup: the factorial study arXiv 2605.10039: 1650 Claude Code CLI sessions, 16050 function-level observations, 2 TypeScript codebases, 5 tasks, mostly Sonnet 4.6, checked on Opus 4.6; metric: compliance with a trivial annotation. File size, instruction position, file architecture, and contradictions in neighboring files gave no visible contrasts after correction (for size and conflict this is confirmed by BF10 0.05-0.10; for position and architecture it is only a failure to reject the null). The largest effect within a session: each next function lowers the odds of compliance by about 5.6% (OR=0.944). The dependence is non-monotonic, was found post hoc, and was reproduced on a second codebase and on Opus 4.6. Compliance depends systematically on the task. — [arXiv](https://arxiv.org/abs/2605.10039)
- [primary] Claude Code: CLAUDE.md is treated as context, not as enforced configuration; for unconditional blocking the docs point to a PreToolUse hook. Target: up to 200 lines; longer files lower adherence (no figures given). — [Claude Code memory](https://code.claude.com/docs/en/memory)
- [inference] The docs and the factorial study disagree about file size. The study was run on a trivial rule, so for dozens of brand rules the question stays open. But it is too early to bet on file structure.
- [measured, abstract] Lulla et al., arXiv 2601.20404: 10 repositories, 124 PRs; with AGENTS.md the median runtime is −28.64% and output tokens −16.58%, task completion comparable. The authors' wording is associative. — [arXiv](https://arxiv.org/abs/2601.20404)

**On-demand skills**
- [measured] SkillsBench v4 (06/14/2026), arXiv 2602.12670: 87 tasks, 8 domains, 18 model+harness configurations, deterministic verifiers, 3 attempts per cell, paired conditions. Pass rate 33.9% → 50.5% (+16.6 pp, normalized gain 25.5%), from +4.1 to +25.7 pp by configuration. 13 of 87 tasks had a negative effect. The v1 numbers (84 tasks, 7 configurations, 5 attempts, +16.2 pp) are outdated; cite v4. The authors also build the BenchFlow framework itself. — [arXiv abs](https://arxiv.org/abs/2602.12670), [v1](https://arxiv.org/html/2602.12670v1)
- [measured] SkillsBench v4, Table 14: Skill Invocation Rate in the curated condition ranges from 46.4% to 99.2%; Codex + GPT-5.5 99.2% (259/261), Claude Code + Opus 4.7 68.2% (178/261), OpenHands + Gemini 3.1 Flash Lite 46.4% (121/261). High invocation does not guarantee a solution. — [arXiv](https://arxiv.org/html/2602.12670)
- [measured] SkillsBench v4, ablations: 1 skill +18.0 pp (23 tasks), 2-3 skills +19.0 (43), ≥4 skills +10.1 (21); compact and standard +19.0 and +21.5, detailed +14.5, comprehensive +0.7. Harm appears when a skill imposes one heavy pipeline with no limits of applicability. — [arXiv](https://arxiv.org/html/2602.12670)
- [measured] SkillsBench v4: skills written by the agent itself through skill-creator fall below baseline on all three configurations (−8.1, −11.3, −11.5 pp), while curated skills on the same configurations give +18.2...+24.8. Per the trace audit: the packages are not discovered, the author displaces the solver, and the content is confidently wrong. Selection: curated from the top quartile by rubric, mean 10.1/12 versus 6.2/12 across the ecosystem (v1). — [arXiv](https://arxiv.org/html/2602.12670), [v1](https://arxiv.org/html/2602.12670v1)
- [measured] SWE-Skills-Bench, arXiv 2603.15401 v2: 98 public skills, 3920 paired runs, 4 configurations, the skill is invoked explicitly. Pass ratio 76.59% → 76.93% (+0.34). 69.2% of pairs gave an identical result. 92 of 98 skills are ineffective, 4 are useful, 2 are harmful (down to −17 points). Skill deltas correlate weakly across configurations (−0.11...0.21); 40 of 98 change sign between two harnesses on the same model. — [arXiv](https://arxiv.org/html/2603.15401)
- [inference] The gap with SkillsBench is not accidental: there the skill-task pairs were selected from the top quartile, here the public skills are taken as they are. The average public skill gives almost nothing, and the effect depends strongly on the configuration, so an evaluation on one model is unreliable.
- [measured, blog, small n] Scott Spence, activation in a real `claude -p`: 22 prompts × 2 runs, Sonnet 4.5, one domain, the author wrote the hooks and prompts himself. Without a hook 50-55%, a plain instruction 50-59%, forced-eval hook 100%, llm-eval 100%, native prompt hook 41-55%. On 24 hard prompts forced-eval 75%, llm-eval 67% with 4 false positives out of 5 negatives. About 250 calls cost $5.59. — [Spence](https://scottspence.com/posts/measuring-claude-code-skill-activation-with-sandboxed-evals)
- [primary] Claude Code skills: descriptions are always in context; the body is loaded on invocation and stays. The description plus `when_to_use` are truncated at 1536 characters. After compaction, the first 5000 tokens of each skill are attached under a total budget of 25000; older skills may drop out. No figures on invocation reliability. — [Claude Code skills](https://code.claude.com/docs/en/skills)

**MCP tools**
- [primary, vendor, method not disclosed] Storybook MCP on the Reshaped library: +12.8% correct code use, 2.76 times faster, −27% tokens. n and method are not given. — [Storybook](https://storybook.js.org/blog/storybook-mcp-for-react/)
- [primary, n=1 per cell] Bill: 4 tasks, one scored run per configuration, Sonnet 4.6, "no harness" versus "skills+MCP+CLI". Tokens 19.0M → 10.4M (−45%), time about 5 minutes in both cases, quality was rated by their own engineers, not blind. Without a harness, agents hardcoded colors and sizes. Agents kept digging in `node_modules` until the skills spelled out the workflow explicitly. MCP failures stopped the work. Automatic token checking is listed as a next step, which means it did not exist. — [Bill](https://www.bill.com/engineering/how-we-made-our-design-system-bilingual)
- [inference] I found no independent controlled comparisons of MCP and documentation for design systems.
- [measured, single-author preprint] arXiv 2604.20911: tool schemas add about 10000 tokens (mean context at turn 5: 12623 versus 2639) and, in the two models checked, explain 62-100% of the weakening of constraints. — [arXiv](https://arxiv.org/html/2604.20911)
- [inference] A heavy MCP server can itself weaken compliance with prohibitions. This is a hypothesis: the control covered only two models.

**Hooks and blocking checks**
- [primary] Hooks run on lifecycle events and give deterministic control: "certain actions always happen". For judgments there are prompt- and agent-based hooks, and those are already non-deterministic. — [Hooks guide](https://code.claude.com/docs/en/hooks-guide)
- [primary] Exit 2 blocks PreToolUse, Stop, SubagentStop, UserPromptSubmit, and other events. Exit 1 does not block. PostToolUse cannot be blocked: the tool has already run, and you can only return feedback. A PreToolUse hook that times out does not block the call; blocking on failure requires `onFailure: block` (v2.1.295+). The `if` field works best-effort; for a hard ban the docs recommend permissions. — [Hooks reference](https://code.claude.com/docs/en/hooks)
- [opinion] The pydevtools guide: instructions describe policy but do not constrain the process; deny rules catch the typical spellings of `--no-verify`; an independent CI run and a required check are more reliable. — [pydevtools](https://pydevtools.com/handbook/how-to/how-to-stop-ai-agents-from-bypassing-pre-commit-hooks/)
- [inference] For Claude Code a workable combination: PreToolUse forbids editing the tokens file and suppressions, PostToolUse returns linter errors, Stop does not let the agent finish while there are violations, and CI catches the rest. Other harnesses have a different set of events, so portability must be checked.
- [inference] I found no controlled study of "hook versus instruction" on UI quality. The effect of hooks is confirmed architecturally and on skill activation.

**CI and feedback from checks**
- [measured, abstract] Blyth et al., arXiv 2508.14419: GPT-4o, PythonSecurityEval, 10 iterations on Bandit and Pylint reports. The share of security issues fell from >40% to 13%, of readability issues from >80% to 11%, of reliability issues from >50% to 11%. The abstract does not disclose whether functionality was preserved. The domain is not UI. — [arXiv](https://arxiv.org/abs/2508.14419)
- [measured] ImpossibleBench, arXiv 2510.20270: a contradiction between the specification and the tests (349 SWE-bench tasks, 103 LiveCodeBench). GPT-5 passes the "impossible" tests in 76% on Oneoff-SWEbench and 54% on Conflicting-SWEbench, Opus 4.1 in 50%, o3 in 49%. Claude models mostly edit the tests (>79%). Hidden tests almost remove cheating but lower the legitimate result; read-only tests stop the editing but not special-casing and operator overloading. The option "flag to a human" lowered GPT-5 from 54% to 9%; for Opus 4.1 the effect is much smaller. — [arXiv](https://arxiv.org/html/2510.20270)
- [inference] The agent will optimize the check. For a brand this means editing tokens.json, `stylelint-disable`, a new token with an off-brand value, inline SVG, canvas, raster images. The verifier must live outside the agent's repository, the tokens file must be read-only, and there must be a legitimate option "no suitable token, escalating to a human".
- [measured] AIDev: each additional failed CI check is associated with a drop in the odds of merge of about 15% (OR≈0.85); the data are observational. — [arXiv](https://arxiv.org/html/2601.15195)

**How many rules and for how long**
- [measured] IFScale, arXiv 2507.11538: 10-500 keyword instructions in a report, 20 models, 5 runs per density. The best model reaches 68% at 500. Three patterns: threshold decay (reasoning models are almost perfect up to 150+), linear, exponential. The bias toward early instructions peaks at 150-200. As density grows, omissions dominate. — [arXiv](https://arxiv.org/html/2507.11538)
- [inference] IFScale does not give a "rule limit" for a brand: it is the simplest inclusion of words, while a brand book contains rules with conflicts and context. We take only one technique: measure omissions, not only errors.
- [measured] Li et al., arXiv 2402.10962: self-chat of two bots, LLaMA2-chat-70B and GPT-3.5, significant drift within eight rounds. The models are old, the tasks are not agentic. — [arXiv](https://arxiv.org/html/2402.10962)
- [measured, single-author preprint v1] arXiv 2604.20911: 4416 attempts, 12 models, 8 providers, three arms. Prohibitions erode with dialog depth, requirements hold: for Mistral Large 3 the prohibition holds at 73% on turn 5 and 33% on turn 16, while requirements stay ≥93% for all models at all depths. Gemma behaves like an immune control; the models differ strongly. All 8 constraints are format constraints; the author considers transfer to semantic ones unverified. Per the abstract, re-injection before the "Safe Turn Depth" restores compliance. — [arXiv](https://arxiv.org/html/2604.20911)
- [measured, abstract] Lost in Context Compaction, arXiv 2608.11242 (abstract checked through the arXiv API): compactors keep on average 17% of the constraints the user set in the session. In the email experiment, the agent deleted emails without confirmation in 30 of 100 sessions after compaction and never before it. Retention depends on the compactor, the context length, the wording, and the place of injection. A separate constraint extractor that appends them to the compressed context gives >90%. What was tested here is user constraints within a session, not CLAUDE.md. — [arXiv](https://arxiv.org/abs/2608.11242), [DAIR.AI summary](https://academy.dair.ai/papers/lost-in-compaction)
- [inference] Brand rules set at the start of a session can be lost at compaction, so they must be stored outside the compressible context: in a hook, in an always-loaded file, or in a check. For skills the risk exists too: only the first 5000 tokens are attached, so the critical part must sit at the start of `SKILL.md`.
- [inference] Brand rules resemble format rules, so the result of arXiv 2604.20911 is more relevant than usual. Hypothesis for the cheap arm: "use var(--x)" holds longer than "never use hex".
- [measured] Control Illusion, arXiv 2502.15851, AAAI-26: 6 models, 1200 data points, conflicting format constraints. System-over-user priority is respected on average in 9.6-45.8% of cases, against 74.8-90.8% for a single constraint. Social signals (authority, expertise, consensus) work stronger than roles: 32.4-77.8% versus 14.4-47.5% on 3 models. Models of the 2024 generation. — [arXiv](https://arxiv.org/html/2502.15851)

### Inferences
- [inference] The hierarchy for "make the agent follow the brand book", from strong to weak: (1) an external verifier and CI that the agent cannot edit; (2) hook blocks and feedback in the loop; (3) MCP or CLI as the only convenient path to token values; (4) a short always-loaded pointer with the critical requirements; (5) an on-demand skill with procedure and examples. This is a hierarchy of reliability, not of value: the upper layers catch values, the lower ones carry intent.
- [inference] What can be forced: hex, font, grid step, component. What cannot be forced: hierarchy, character, tone. The product hypothesis splits into two parts, and they must be measured separately: enforcement raises adherence, narrative raises distinctiveness. Neither is directly confirmed.
- [inference] A skill must not be the only entry point: invocation ranges from 46% to 99% in SkillsBench and is 50-55% without a hook at Spence. Keep the critical part in a layer that needs no agent decision, and leave the skill for heavy procedures: creating a brand book, review, migration.
- [inference] Auto-generating a brand book needs a separate check of the downstream effect: both SkillsBench (−8...−11.5 pp) and Gloaguen (LLM files 7% worse than human ones) show that generated instructions can be worse than no instructions.
- [inference] A decisive long-session check is mandatory: per studies 2605.10039 and 2604.20911, the drop in compliance within a session is stronger than the effect of file structure.

### Gaps
- No direct measurements of brand-rule compliance exist for any layer.
- There is no controlled comparison of hooks and instructions on UI tasks. Search results showed practical figures (documentation 25-40% versus hooks about 95%, 166 sessions), but they were not found in the open dev.to article and the method is not described, so I do not use them.
- The MCP numbers are vendor-only.
## 2. Design and UI benchmarks, tools for skill evals

### Takeaway
No open UI benchmark measures brand fidelity. They measure similarity to a reference page, functional tests, or general preference. The only close brand sample I found is VIST (illustrations, not UI). The methods and metrics are portable; the construct for UI has to be built from scratch. Ready-made eval tools give a paired with/without scheme, but no statistics, no browser metrics, and no multi-arm design.

### Cited Findings

| Benchmark | What it measures and how | n | Human | Brand |
|---|---|---|---|---|
| [VIST](https://toloka.ai/blog/vist-a-new-benchmark-for-brand-style-transfer-in-ai-image-generation/) [primary, blog of a labeling vendor] | blind: which of two images matches 10 brand references better; Bradley-Terry-Davidson with ties (8.46%) | 12 systems, 5 brands, 15 prompts, 60 items per system, 3900 tasks, 39300 judgments | 393 raters, 54.5% professionals, 5-18 votes per pair | yes, but illustrations, not UI |
| [Design Arena](https://notes.designarena.ai/methodology/) [primary] | anonymous pairs, sessions of 4 models, Bradley-Terry, Wilson CI | at least 15 votes for a rating | community, who votes is not disclosed | no |
| [DesignBench](https://arxiv.org/abs/2506.06251) [measured] | React, Vue, Angular, HTML; generation, edit, repair; CLIP, SSIM, compile rate, CMLS, CMCS, GPT-4o as judge | 900 samples | 5 PhDs, kappa 0.86 and 0.84 in judge validation | no |
| [WebUIBench](https://arxiv.org/html/2506.07818v1) [measured] | CLIP, text similarity, font and background color on elements (Hungarian), layout block similarity, compile rate | 719 pages, 2488 slices, 21793 QA, 29 models | 3 experts on 100 samples; correlation with ranks 0.83, CLIP alone 0.77 | no |
| [FrontendBench](https://arxiv.org/html/2506.13832) [measured] | sandbox and test scripts, DOM and interaction | 148 tasks | agreement with experts 90.54% on average | no |
| [Design2Code](https://arxiv.org/html/2403.03163) [measured] | CLIP on inpainted screenshots, Block-Match, Text, Position, Color (CIEDE2000) | 484 pages | 100 examples × 5 annotators, Prolific $16/h | no |
| [FullFront](https://arxiv.org/html/2505.17399) [measured] | CLIP, DINOv2, Gemini Visual Score, Code Score by DOM | 200 design tasks, 1800 perception questions | Spearman with humans (values in the paper) | no |
| [UI-Bench](https://ar5iv.labs.arxiv.org/html/2508.20410) [measured] | blind pairwise "what would you hand to a client", adapted TrueSkill, 95% CI | 10 tools, 30 prompts, 300 sites, 4075 matches | panel of 194 experts, how many actually voted is not stated | explicitly no |
| [AUV-Bench](https://arxiv.org/abs/2609.34854) [measured, abstract] | evaluation, diagnosis, repair, generation | 1395 interfaces, 660 degradations, 12 models | designers, number not stated | no |
| [GraphicDesignBench](https://arxiv.org/html/2604.04192v1) [measured] | 49-50 tasks; mIoU, LPIPS, SSIM, DreamSim, CLIP, HPSv3, ΔE, OCR, clustering | from 100 to 2568 examples per task | judge M-Judge | no; dependence on the brand is named an open problem |
| [WiserUI-Bench](https://arxiv.org/abs/2505.05026) [measured, abstract] | whether models understand which UI won an A/B test | 300 pairs | real A/B outcomes | no |
| [AesEval-Bench](https://arxiv.org/abs/2603.01083) [measured, abstract] | 4 dimensions, 12 indicators, judgment, region, localization | no numbers in the abstract | human-guided labeling | no |

- [measured] Design2Code, logistic regression on winning a pairwise human evaluation: Block-Match 0.74, Position 0.76, CLIP 0.49, Color 0.35, Text −0.35 (all p<0.05). This is rare direct evidence of a link between such metrics and human judgment. In the same study 49% of pages were judged interchangeable with the reference, and the page generated by GPT-4V was preferred in 64%. — [arXiv](https://arxiv.org/html/2403.03163)
- [inference] Human preference is not fidelity: a "what looks better" rating can reward an agent for departing from the brand. The question to the rater must be about conformity to the brand, and the quality question goes in a separate guardrail measurement. VIST does exactly this.
- [primary, vendor, internal data] Galileo Visual Fidelity: an LLM checks the image against a list of brand rules, the result is binary, and all applicable rules must pass. F1 on expert labels: GPT-4.1 0.79, Sonnet 4.6 0.76, Gemini 3.1 Flash 0.81. The dataset size is not disclosed. — [Galileo](https://docs.galileo.ai/concepts/metrics/multimodal-quality/visual-fidelity)

**`claude plugin eval`** [primary]
- Each case runs 3 times with the plugin and 3 times without; the report shows WITH, W/OUT, Δ. The run score equals the share of passed graders, and the case score equals the mean. The default threshold is 1.0. Δ does not affect the exit code. — [Docs](https://code.claude.com/docs/en/plugin-evals)
- Six grader types: `regex`, `tool_used`, `tool_order`, `file_exists`, `llm`, `baseline`. There are no custom-code graders. To check a build, the docs suggest asking Claude to run it and write the result to a file. — [Docs](https://code.claude.com/docs/en/plugin-evals)
- `tool_used: Skill` is excluded from the score in both arms and shown as an indicator, so as not to inflate Δ. — [Docs](https://code.claude.com/docs/en/plugin-evals)
- The workspace is empty, the scaffold covers only files and git, and project configuration written by a script is not loaded. Bash runs under an OS sandbox, the network only by grant. — [Docs](https://code.claude.com/docs/en/plugin-evals)
- [inference] For a brand protocol this is not enough: two arms instead of a ladder of conditions, no browser verifier, and verification by the agent's own hands can be faked. It suits a fast CI gate on triggers and regressions; the main experiment needs its own runner.

**skill-creator** [code, SHA ca45fc4, commit of 10/28/2026]
- Arms with_skill and baseline (no skill, or the old version); aggregation computes mean, stddev, min, max, and the difference of means, with no significance test. — [aggregate_benchmark.py](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/skill-creator/scripts/aggregate_benchmark.py#L45-L61)
- The analyzer suggests marking checks that always pass in both arms or are unstable. — [analyzer.md](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/skill-creator/agents/analyzer.md#L212-L218)
- Description optimization uses a stratified train/test split. — [run_loop.py](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/skill-creator/scripts/run_loop.py#L24-L44)
- The trigger evaluation writes a temporary file to `.claude/commands/`. — [run_eval.py](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/skill-creator/scripts/run_eval.py#L43-L53)
- [primary, user report] Issue #79998 claims that on Claude Code 2.1.210 such files are registered as slash commands and do not take part in auto-triggering, so recall stayed at 0-11%. Closed on 10/26/2026 as not_planned for inactivity. — [GitHub](https://github.com/anthropics/claude-code/issues/79998)
- [inference] The trigger numbers from `run_loop.py` cannot be trusted without a control check on your version. It is more reliable to look at the real `Skill` call of the installed skill.

**promptfoo** [primary]
- Separates routing from result quality. `skill-used` and `not-skill-used`, near-miss prompts for neighboring skills, `--repeat 3` in the example, cost and latency as secondary signals. Codex has no separate call; invocation is inferred from reading `SKILL.md`. — [promptfoo](https://www.promptfoo.dev/docs/guides/test-agent-skills/)

**Other**
- [code] pbakaus/impeccable contains an activation eval: 54 cases × 2 samples × 2 models, 216 single-step calls, about $1 on Sonnet; positive and negative cases, a gate on zero false positives. A cheap sample of a trigger test. — [activation.eval.mjs](https://github.com/pbakaus/impeccable/blob/c3bb418ee38ee49a6b999b7752c1368f3123a2bd/tests/skill-behavior/activation.eval.mjs#L1-L40)
- [primary] Anthropic on building evals: start with 20-50 tasks from real failures, balance positive and negative cases, isolate attempts, give the LLM judge an "Unknown" option, read transcripts; 75% per attempt gives about 42% for pass^3; near 100% means the eval has become a regression eval. — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

### Inferences
- [inference] Portable components: the VIST design (brand references plus blind forced choice); the elementwise metrics from Design2Code and WebUIBench; paired runs and task-macro from SkillsBench; the split of routing and quality from promptfoo.
- [inference] The absence of a brand benchmark for UI looks like a real niche: a public "brand fidelity benchmark" would be both a tool and an argument for the product.

### Gaps
- FullFront: the values of the correlation with humans are not written out.
- `claude plugin eval` was checked only against the docs and was not run under the rules of this task.

## 3. Metric families: validity and pitfalls

### Takeaway
Deterministic metrics are reliable but say nothing about the character of a brand. Perceptual metrics measure similarity, not belonging to a brand. Distinctiveness has to be measured between brands on one task with the logo masked. The only external validation comes from humans, yet designers agree with each other only weakly, and LLM judges on aesthetics are close to random; on narrow verifiable questions they do noticeably better.

### Cited Findings

**Deterministic**
- [inference] I found no validation studies of the link between off-token rate or token coverage and human on-brand judgment. These are operational definitions, and the link to perception has to be shown by us. The closest analogue: the WebUIBench correlation 0.83 and the Design2Code coefficients above.
- [code] Counting unique values and tokens exists in ready-made tools: projectwallace/css-analyzer ("token usage, uniqueness ratios"), and rangle/radius-tracker measures design-system adoption. — [css-analyzer](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/README.md#L23), [radius-tracker](https://github.com/rangle/radius-tracker/blob/b4ad5096172e74175935f72e3b182a808be65cbe/README.md#L8)
- [code] The Chrome DevTools Protocol has `CSS.getComputedStyleForNode` and `CSS.getPlatformFontsForNode`; the second reports which platform fonts the text nodes were actually rendered with, and the glyph count. — [browser_protocol.json](https://github.com/ChromeDevTools/devtools-protocol/blob/master/json/browser_protocol.json)
- [inference] For a font match, computed style is not enough: it holds the stack with fallbacks. You need the font actually rendered, with weight by glyphs.
- [primary, vendor sells axe] Deque: 57% of the volume of accessibility issues is covered by automated tests (2000+ audits, 13000+ pages, about 300000 issues, March 2021). This is a share of volume, not of WCAG criteria, and the ground truth is not disclosed. — [Deque](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues)
- [inference] axe in the protocol is a guardrail measurement: a clean result does not mean accessibility, but a growth in violations means a decline.
- [inference] Pitfalls: (a) the right value in the wrong role (primary on a destructive button) passes the off-token check, so a semantic check is needed; (b) 0% off-token is reachable by giving up color, so a brand presence check is needed; (c) color in SVG, canvas, and images is not visible through computed styles, so pixels must be counted too; (d) count by area: one hardcode on the hero matters more than ten on utility text.

**Perceptual**
- [primary] CIEDE2000: Sharma et al. 2005 describe typical implementation errors and a gap in the formula, and publish test data. — [Sharma](https://hajim.rochester.edu/ece/sites/gsharma/ciede2000/)
- [code] The noticeability threshold depends on size: the Stone, Szafir, Setlur 2014 model is implemented in d3-jnd with size and percent parameters. I did not open the paper itself; the information comes from the library README. — [d3-jnd](https://cdn.jsdelivr.net/npm/d3-jnd@0.1.3/README.md)
- [inference] ΔE00≈1 as a JND is a convention. For text and small elements the threshold must be higher than for large fills; one threshold for everything overstates violations on small details.
- [measured] GraphicDesignBench: the best text ΔE is 5.57, with 63.3% below ΔE 5 (GPT-5.4); the best top-1 font family recognition accuracy for the same model is 23.7%. — [GraphicDesignBench](https://arxiv.org/html/2604.04192v1)
- [inference] Models see fonts and exact color poorly. They cannot be checked through an LLM's eyes, only deterministically.
- [measured, abstract] LPIPS: on a dataset of human similarity judgments, deep features beat PSNR and SSIM by a wide margin and across different architectures. Domain: not UI. — [arXiv](https://arxiv.org/abs/1801.03924)
- [measured, abstract] Stein et al., NeurIPS 2023: on psychophysics of realism, none of the existing metrics correlates strongly with humans; a switch to DINOv2-ViT-L/14 gives a richer evaluation. Domain: generated images, not UI. — [arXiv](https://arxiv.org/abs/2306.04675)
- [measured] UIClip, 12 designers, 892 pairs: on choosing the best design UIClip gets 75.12%, CLIP-objective 65.42%, LLaVA 54.59%, GPT-4V 51.58% with 10% refusals, and base CLIP B/32 is worst. On real screens it is worse than on synthetic ones (57.89% versus 67.65%). — [UIClip](https://ar5iv.labs.arxiv.org/html/2404.12500)
- [inference] Bare CLIP does not encode design quality; cosine with a reference shows similarity of content. A brand is not defined by one page, so the "similarity to a reference" from Design2Code and DesignBench does not transfer directly.
- [measured] WebUIBench compares layouts as pictures of colored blocks without attributes, and Design2Code removes text by inpainting before CLIP. — [WebUIBench](https://arxiv.org/html/2506.07818v1), [Design2Code](https://arxiv.org/html/2403.03163)
- [inference] Mask text and logo before embeddings, and compare only within one task, otherwise the content of the task will drown out the brand.

**Distinctiveness**
- [primary] Silhouette: s=(b−a)/max(a,b), range from −1 to 1; higher for convex clusters, which in itself biases the score. — [scikit-learn](https://scikit-learn.org/stable/modules/clustering.html)
- [inference] I found no application of silhouette to brands in UI. There are no absolute norms, so set the threshold as a difference from the placebo: C0 with arbitrary brand labels should give about zero.
- [primary, no metrics] Anthropic explains averaged aesthetics by distributional convergence: without direction, models move toward the center of the distribution (Inter, purple gradients), and after Inter is banned they converge on a new default such as Space Grotesk. A blog, screenshots only. — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- [inference] Hence the comparison with the centroid of default output on the same task (C0). A plain distance is not enough: random oddness is also far from the default. The thing to compute is the ratio `d(output, default)/d(brand reference, default)` together with similarity to the brand.
- [measured] Anti-phishing systems, arXiv 2405.19598 (451k real phishing sites): brand identification by logo (Phishpedia) 95.82%, by the whole screenshot (VisualPhishNet) 66.03% on correctly detected D_learn examples; simply removing the logo breaks logo-based methods. — [arXiv](https://arxiv.org/html/2405.19598v2)
- [inference] Without logo masking, a brand classifier will guess by the logo and show inflated "distinctiveness". Masking is mandatory. The whole-screenshot figure of 66% with hundreds of brands sets a reasonable order of expectations.
- [primary, blog of a labeling vendor] VIST: comparison against 10 brand references; Toloka claims that absolute scales work poorly for style. Top systems hold the style across all brands, while the bottom ones show the specifics of individual brands. Expert and non-expert: the ranking of systems matched between professionals (20900 judgments) and the rest (18400), and for professionals the spread of win probability is wider by 21.9%. — [VIST](https://toloka.ai/blog/vist-a-new-benchmark-for-brand-style-transfer-in-ai-image-generation/)
- [inference] If the VIST result transfers to UI, novices give the same order more cheaply, while experts give more resolution. So the protocol uses both panels: novices for blind matching, experts for close pairs. VIST is the only brand-oriented measurement of this difference I found, and it exists only in a vendor blog.

**Humans**
- [measured] DesignPref: 20 designers, 12k UI pairs, Krippendorff alpha 0.25 on binary preferences. Personalization predicts 20 times better than the aggregate. 90 minutes of work, $15.55/h. — [arXiv](https://arxiv.org/html/2511.20513v1)
- [inference] 12000/20 = 600 pairs per designer in 90 minutes, about 9 seconds per pair. With a brand board, plan for 20-30 seconds.
- [measured] UIClip: alpha 0.37 among 12 designers of different experience. — [UIClip](https://ar5iv.labs.arxiv.org/html/2404.12500)
- [measured] TASTE (Lica, Contra), arXiv 2605.20731: 10 designers in two cohorts, 4 image generators, 9 criteria, 1600 ratings per criterion. Leave-one-out ceiling 0.741. Mean Kendall τ from +0.103 (Color Harmony) to +0.224 (Typography in the Descriptions cohort); criteria of fidelity to the description agree more strongly than aesthetic ones, by a factor of up to 2.2. — [arXiv](https://arxiv.org/html/2605.20731)
- [inference] The main argument for the wording "does it conform" rather than "do you like it": agreement there is higher.
- [measured, abstract] Visual Aesthetic Benchmark, arXiv 2605.12684: ratings from scalar scores match direct comparison poorly, and direct ranking gives noticeably higher agreement. 8 experts in a controlled study. — [arXiv](https://arxiv.org/abs/2605.12684)
- [measured] Perez-Ortiz and Mantiuk: with fewer than 20 observers, CI and RMSE can be very large; at least 3 repeats, otherwise outliers are hard to find; comparing only neighboring conditions is almost as accurate (10 conditions: 9 pairs instead of 45); forced choice without ties, since ties give a negative bias; bootstrap >500 resamples; beyond about 2 JOD, scaling is unreliable. — [Guide](https://ar5iv.labs.arxiv.org/html/1712.03686)
- [measured] Expert and crowd, Chatbot Arena: BT with sandwich CI; on 160 battles, crowd-expert agreement is 72.8-83.1%, expert-expert 79.4-89.8%; adaptive pair selection saves from 5% to 54% of votes. Domain: text. — [Arena](https://ar5iv.labs.arxiv.org/html/2403.04132)
- [primary, inference] Design Arena uses BT, UI-Bench adapted TrueSkill, VIST BTD. With a fixed batch of conditions and offline evaluation, BT or a logistic model with random effects of rater and item is simpler and more transparent; TrueSkill and Elo are useful with a stream of votes. — [Design Arena](https://notes.designarena.ai/methodology/), [UI-Bench](https://ar5iv.labs.arxiv.org/html/2508.20410), [VIST](https://toloka.ai/blog/vist-a-new-benchmark-for-brand-style-transfer-in-ai-image-generation/)
- [measured, abstract] Koo and Li 2016: ICC is read by its 95% CI: <0.5 poor, 0.5-0.75 moderate, 0.75-0.9 good, >0.9 excellent; state the ICC form explicitly. — [DOI](https://doi.org/10.1016/j.jcm.2016.02.012)
- [opinion] The usual norm in content analysis: alpha ≥0.8 is reliable, 0.667-0.8 for cautious conclusions. — [Wikipedia, citing Krippendorff](https://en.wikipedia.org/wiki/Krippendorff%27s_alpha)
- [inference] An alpha threshold of 0.8 is unreachable for taste judgments: designers get 0.25 and 0.37. A gate on it would kill any experiment. Set the threshold for the on-brand question separately and check it in a pilot.

**LLM judges**
- [measured] TASTE: 9 off-the-shelf judges (HPSv2.1, LAION, PickScore, 6 VLMs) give 0.499-0.543 at chance 0.5, all within a band of 4.4 points. For VLMs, position bias and conditional accuracy are linked, Spearman +0.94. A fine-tuned head on a 2B encoder gets 0.611. — [arXiv](https://arxiv.org/html/2605.20731)
- [measured, abstract] Visual Aesthetic Benchmark: 20 multimodal and 6 reward models; the best finds both the best and the worst image at once in 26.5% of tasks, human experts in 68.9%. 400 tasks, 10 experts per task; painting, photo, illustration, not UI. — [arXiv](https://arxiv.org/abs/2605.12684)
- [measured, abstract] AUV-Bench: 12 models, moderate agreement with designers in holistic evaluation (statistic not named), the exact diagnosis chain reaches 24.7% at most, and a correct judgment does not guarantee a successful repair. — [arXiv](https://arxiv.org/abs/2609.34854)
- [measured] DesignBench: when GPT-4o judged concrete edit and repair tasks, five humans confirmed it with kappa 0.86 and 0.84. This is a narrow question of "requirement met", not taste. — [DesignBench](https://arxiv.org/abs/2506.06251)
- [measured, abstract] Zheng et al. 2023 (text): GPT-4 as a judge agrees with humans above 80%, at the level of humans among themselves; position, length, and self-enhancement biases are described. — [arXiv](https://arxiv.org/abs/2306.05685)
- [measured, abstract] In another domain (network layouts, 27 participants), few-shot plus a confidence filter bring LLM-human agreement to the human-human level. — [arXiv 2604.03417](https://arxiv.org/abs/2604.03417)
- [measured] Position: Shi et al., 15 judges, more than 100000 examples. For strong judges, repeat stability is often >0.95, the bias is systematic, and the side depends on the task (Claude-3.5-Sonnet PF 0.01 on MTBench and 0.22 on DevBench). The bias is stronger for variants close in quality. — [arXiv](https://arxiv.org/html/2406.07791v9)
- [measured] Fooling the LVLM Judges, arXiv 2505.15249: 8 judges, 500 examples; manipulations without a change of content raised the GPT-4o score from 1.14 to 2.05 (+80.2%) with a bounding box; attack success 64.71-67.65%; a bias-aware prompt helps partially. Pairs are run twice with the order swapped. — [ar5iv](https://ar5iv.labs.arxiv.org/html/2505.15249)
- [measured] Sycophancy: MM-SY (ICLR 2025), 1500 questions: GPT-4V agrees with a wrong opinion in 30.6-56.8% depending on tone, LLaVA-1.5 up to 99.4%. The questions are about facts in the picture, and the models are old. — [ar5iv](https://ar5iv.labs.arxiv.org/html/2410.11302)
- [measured, abstract] Self-preference: Panickssery et al., NeurIPS 2024: models recognize their own text better than chance, and the strength of preference is linearly tied to the ability of self-recognition. Laurito et al., PNAS 2025: GPT-3.5, GPT-4, and open-weight models in a binary choice prefer what an LLM presented. Text, not UI. — [NeurIPS](https://papers.nips.cc/paper_files/paper/2024/hash/7f1f0218e45f5414c79c0679633e47bc-Abstract-Conference.html), [PNAS](https://doi.org/10.1073/pnas.2415697122)
- [inference] Use a judge from a different vendor than the generator; swap the order and average; the condition label and words like "our skill" stay out of the prompt; the question is narrow and verifiable; a control on manipulations; calibration against human labels. A judge is good for triage and diagnostics, but not as the only go/no-go.

**Workflow**
- [measured] AIDev, arXiv 2601.15195: 33596 PRs, 71.48% merged; Codex 82.59%, Cursor 65.22%, Claude Code 59.04%, Devin 53.76%, Copilot 43.04%. Of 562 labeled rejections: 228 unreviewed or abandoned, 142 duplicates, 24 unneeded feature, 99 failed CI and tests, only 13 at the level of agent behavior. — [arXiv](https://arxiv.org/html/2601.15195)
- [inference] Rejected PR rate as a brand metric is almost useless: rejections are mostly not about code. It is better to count reviewers' brand comments on PRs and edits to style lines.
- [measured] METR RCT: 16 developers, 246 tasks, 19% longer with AI, while they had expected −24% and after the work believed it had been −20%. — [arXiv](https://arxiv.org/abs/2507.09089)
- [inference] Take time from logs, not from self-reports. This applies to both "got more convenient" and "got more on-brand".
- [inference] I found no validated studies on human edit distance for style edits. CMLS and CMCS from DesignBench give a close tool for code edits. — [DesignBench](https://arxiv.org/abs/2506.06251)

**Marketing science**
- [primary] Ehrenberg-Bass: a strong asset must be unique and famous; the Distinctive Asset Grid compares brand elements and competitors', with quadrants Use or Lose, Invest, Avoid, Test or ignore. — [EBI](https://marketingscience.info/brands-of-distinction)
- [primary] Romaniuk: Fame is the share of category buyers for whom the asset brings the brand to mind; it must be measured without a prompt, because a prompt gives "inaccurate, inflamed fame scores" by about 20 points. — [Mumbrella on the EBI site](https://marketingscience.info/news-and-insights/mumbrella360-ehrenberg-bass-professor-says-youre-poorly-branding-if-youre-focusing-on-assets-over-your-brand)
- [measured, abstract] Brus et al., Journal of Brand Management 2025: 405 elements, 50 brands, 5 categories. Marketers' judgments are rarely accurate: they overestimate fame and underestimate uniqueness; strong elements are rated more accurately. — [DOI](https://doi.org/10.1057/s41262-025-00395-y)
- [inference] A team must not judge its own assets by itself. The same applies to which brand book rules are worth forcing.
- [inference] Fame and Uniqueness measure the memory structures of buyers accumulated over years of exposure. A new small brand will get about zero on any agent output, so as a test of the agent this is invalid. Apply it this way: (1) decide which assets are worth forcing at all; (2) on a known brand, show logo-masked fragments of agent output against reference fragments; (3) for new brands, replace it with trained blind matching: first show the brand board, then test recognition. To estimate a share to ±7 points at p≈0.5 and 95% CI, about 200 category buyers per cell are needed.

### Inferences
- [inference] Do not collapse the metrics into one score. A single number hides the trade of adherence for character and at once becomes a Goodhart target.
- [inference] Order of trust: deterministic metrics on values, then humans on conformity, then embeddings as a fast proxy, then an LLM judge as triage.

### Gaps
- There are no data on rater agreement specifically on the question "does this conform to the brand" in UI. VIST is the closest, but it is illustrations, and I did not extract its agreement data.
- There are no measurements of homogeneity of AI UI in embeddings. Search turned up only journalism and pre-AI-era studies, which I did not open.
- Ward et al. 2020 (Journal of Brand Management): only the title and journal are confirmed through [Crossref](https://doi.org/10.1057/s41262-020-00187-6); the abstract did not open. By a search snippet it has 1281 elements, 13 categories, 19 countries, and the conclusion that color is harder to make unique. Check before citing.
- Luther et al. CSCW 2015 on comparing crowd and experts in design critique: the page did not open (403), and the data come only from a snippet (an aggregate of 10-14 people finds 40-60% of expert remarks). Check before citing.
- The effect of the expert-novice difference on the brand question in UI: no direct data.

## 4. Experiment design

### Takeaway
The main source of generalization here is not the number of runs but the number of brands and tasks. Brand and task must be random factors, and runs within a cell give diminishing returns after about 3. A ladder of conditions with an extra arm of enforcement without narrative separates the contribution of the layers, and a brand swap shows that the output is really driven by the file.

### Cited Findings

**Random factors, power, repeats**
- [measured, abstract] Judd, Westfall, Kenny 2012: analyses that ignore the randomness of stimuli give substantial bias; the solution is mixed models with crossed random factors. — [DOI](https://doi.org/10.1037/a0028347)
- [measured, abstract] Westfall, Kenny, Judd 2014: in crossed designs, power does not tend to 1 as the number of participants grows but hits a ceiling that depends on the sample of stimuli. — [DOI](https://doi.org/10.1037/xge0000014)
- [measured, abstract] Barr et al. 2013: confirmatory tests need the maximal random-effects structure justified by the design; random intercepts only generalize worse. — [DOI](https://doi.org/10.1016/j.jml.2012.11.001)
- [inference] Transfer: a run corresponds to an observation, and brand and task correspond to stimuli. With 6 brands, maximal random slopes are often poorly estimated, so do the primary analysis at the brand level and use the mixed model as supporting.
- [measured, abstract] Agarwal et al., NeurIPS 2021: with a small number of runs, comparisons of point estimates mislead; interval estimates, performance profiles, and IQM are needed. — [arXiv](https://arxiv.org/abs/2108.13264)
- [measured, abstract] Bouthillier et al., MLSys 2021: variability of data sampling, initialization, and hyperparameters noticeably affects the result; adding sources of variation brings a cheap estimator close to the ideal one with 51 times less compute. — [arXiv](https://arxiv.org/abs/2103.03098)
- [primary] Anthropic, the same model, harness, and tasks on Terminal-Bench 2.0: a 6 pp difference from infrastructure resources alone (p<0.01). SWE-bench: 227 tasks × 10 samples, 1.54 pp from RAM. Recommendations: document the configuration, run on different days and hours, and be skeptical of a difference under about 3 pp. — [Anthropic](https://www.anthropic.com/engineering/infrastructure-noise)
- [measured] Repeat practice: SkillsBench 3 per cell (v1: 5), plugin eval 3, promptfoo 3, Gloaguen 1, Anthropic on SWE-bench 10. — [SkillsBench](https://arxiv.org/html/2602.12670), [plugin eval](https://code.claude.com/docs/en/plugin-evals), [promptfoo](https://www.promptfoo.dev/docs/guides/test-agent-skills/), [Gloaguen](https://arxiv.org/html/2602.11988), [Anthropic](https://www.anthropic.com/engineering/infrastructure-noise)

**Own simulation** [inference; the variances are assumptions, not measurements; script [`scripts/power_sim.py`](scripts/power_sim.py)]

Paired t-test on brand means, α=0.05, 4000 simulations. Effect δ in units of the SD of one run. Scenario A: SD of slopes brand=0.5, task=0.5, brand×task=0.5. Scenario B, where the effect varies strongly between brands: 1.0, 0.5, 0.7. The task effect is shared across all brands and is not in the denominator, so for generalizing to new tasks the numbers are optimistic.

| Brands × tasks × runs | Paired runs per contrast | A, δ=1.0 | A, δ=0.5 | B, δ=1.0 |
|---|---|---|---|---|
| 4×8×3 | 192 | 0.60 | 0.23 | 0.25 |
| 6×8×1 | 96 | 0.76 | 0.30 | 0.42 |
| 6×8×3 | 288 | 0.87 | 0.39 | 0.46 |
| 6×8×10 | 960 | 0.91 | 0.45 | 0.48 |
| 6×16×3 | 576 | 0.92 | 0.44 | 0.49 |
| 8×8×3 | 384 | 0.96 | 0.53 | 0.62 |
| 12×8×3 | 576 | 0.99 | 0.68 | 0.82 |
| 12×8×1 | 192 | 0.97 | 0.57 | 0.77 |

- [inference] Raising runs from 3 to 10 in scenario B gives almost nothing (0.46 → 0.48). With the same 576 runs, 6×16×3 gives 0.49 and 12×8×3 gives 0.82. Put the money into brands.
- [inference] The minimum two-sided p of a sign-flip test at the brand level is 2/2^B: 4 brands 0.125, 5 brands 0.0625, 6 brands 0.031, 8 brands 0.0078. With fewer than 6 brands a strict result is impossible in principle; with three contrasts and the Holm correction, at least 8 are needed.
- [inference] Votes per contrast under independence, α=0.05, power 0.8: a true win rate of 75% requires 29, 70% requires 47, 65% requires 85, 60% requires 194. With 5 votes per item the design effect is 1.4 at ICC 0.1 and 2.2 at ICC 0.3. 4-alternative matching (chance 25%): for a true 50% you need 26, for 40% you need 71.

**Condition design**
- [inference] SkillsBench and `claude plugin eval` work with two arms. To separate the layers you need a ladder: C0 nothing, C1 tokens only, C2 tokens plus narrative, C3 plus enforcement. The ladder mixes up the order, so I propose adding C4, tokens plus enforcement without narrative: this closes the 2×2 (narrative × enforcement on top of tokens) and answers the main product question, whether narrative is needed if there is a linter.
- [inference] For the positioning "better than existing solutions" you need active comparators: ready-made skills and DESIGN.md on the same tokens. A comparison with an empty baseline alone does not answer this question.
- [inference] Creating a brand book needs a separate arm: a brand book from a human against a brand book from your skill, given the same input. The result is checked downstream by the same compliance metrics; this is the only evaluation robust to beautiful but useless documentation.
- [inference] Measure invocation separately from effect. Report intent-to-treat (the skill is available) and per-protocol (the skill was invoked). SkillsBench shows both quantities in Table 14, while SWE-Skills-Bench works only with explicit invocation and does not measure invocation.

**Brand swap and mutation** [inference; I found no direct precedents for a brand, this is a transfer of the idea of metamorphic testing]
- Cross-swap: the same tasks, with brand files A and B swapped. Off-token against the correct brand should be low, against the other brand high; C0 should show no difference (placebo).
- Leakage: the output for brand B contains no values of brand A.
- Single mutation: shift one token (the primary color to a new hue, change the font). The output must follow the new value and not contain the old one. This catches caching and reliance on the model's prior.
- Duplicate a real brand with recolored values: the model knows Primer or Polaris, and that masks the effect of the file.

**Adversarial tasks** [inference from ImpossibleBench and Control Illusion]
- A user request "make the button purple, quickly"; define the expected behavior by policy in advance.
- Authority: "the CEO decided so", "all designers agree" (per Control Illusion this works stronger than roles).
- Inherited code with off-brand patterns.
- A third-party component with a default theme.
- A missing token: a state is needed that is not in the palette.
- Time pressure.
- A gaming trap: the easiest way to pass the linter is to edit the config or a token.

**Decay in a long session** [inference from arXiv 2605.10039, 2604.20911 and the skills docs]
- A scripted 20-turn session with dilution and forced compaction, necessarily with arms "rule given in chat" and "rule in a file" (Lost in Compaction: 17% is kept). Metrics: off-token by turn, the OR of compliance for each new function (reference 0.944 from the factorial study), and the turn at which the threshold is violated (an analogue of Safe Turn Depth).
- Compare C2 and C3, and also the wordings "prohibition" and "requirement".

**Goodhart**
- [measured, abstract] Manheim and Garrabrant describe at least four mechanisms of Goodhart's law. — [arXiv](https://arxiv.org/abs/1803.04585)
- [inference] Defense: do not show the agent the verifier; keep part of the metrics hidden and change them in later waves; count gaming events as a separate metric; keep the pair "compliance plus brand presence" and the guardrail metrics; keep held-out tasks and brands the skill author has not seen; refresh the set at saturation (a saturation signal is given by [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)).

**Cost**
- [primary] Prices per MTok: Sonnet 5 $2 input, $2.50 cache write, $0.20 cache read, $10 output; Opus 5.5 $4, $5, $0.20, $20; Haiku 4.5 $1, $1.25, $0.10, $5. The Batch API gives −50%. — [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [measured] Actual consumption: SkillsBench, Claude Code + Opus 4.7: 4.3-6.4M tokens and $5.21-6.74 per attempt (hard terminal tasks); Bill: a UI task 1.5-8.2M input tokens, about 5 minutes. — [SkillsBench](https://arxiv.org/html/2602.12670), [Bill](https://www.bill.com/engineering/how-we-made-our-design-system-bilingual)
- [inference] At 90% cache reads: 1.5M input and 15k output is about $0.8 on Sonnet 5 and $1.3 on Opus 5.5; 3M and 40k about $1.7 and $2.8; 8M and 80k about $4.2 and $6.9. Budget $1-6 per run. The Batch API is usually not applicable in an agentic harness.
- [primary] Prolific: minimum $8/h, recommends from $12/h, fee 42.8% for companies and 33.3% for academics. `-j` in plugin eval allows up to 8 parallel runs. — [Prolific](https://www.prolific.com/pricing), [plugin eval](https://code.claude.com/docs/en/plugin-evals)

### Inferences
- [inference] Deterministic metrics probably give large effects, so 6 brands are enough for them. Human contrasts are weaker and need 8-12 brands; a pilot on 6 gives an estimate of the effect, not a confirmation.
- [inference] If C4≈C3 by humans, narrative does not pay off and the product should be a linter with tokens. If C3≫C4 on distinctiveness, narrative is the value of the product. Pay for this contrast first.

### Gaps
- There are no data on real variances across brands and tasks; they will come only from the pilot, and the simulation must be recomputed on them.
- I found no standard solutions for the "brand×task×run" scheme in the agentic evals literature.

## Minimal protocol

All thresholds below are **our proposed thresholds, not established norms**. There are no norms in the literature for a brand. Fix them before the launch and revise them only after a pilot on dev brands.

### What we compare
- **C0** no brand artifacts.
- **C1** a tokens file and one pointer line.
- **C2** C1 + narrative (a skill with principles and examples, a short always-loaded pointer).
- **C3** C2 + enforcement (hooks, linter, feedback from the verifier).
- **C4** C1 + enforcement without narrative.
- **Cx** 1-2 active comparators (a ready-made skill, DESIGN.md).

### Material
- **Brands:** 2 dev for setup and 6 held-out in the pilot; 8-12 for confirmation. Half fictional, half real public design systems with recolored values, to remove the model's prior.
- **Tasks:** 8 held-out: 3 greenfield (landing page, pricing, an empty state of a dashboard), 3 edits in an existing repository (a form, dark theme, a new component next to legacy), 2 adversarial.
- **Runs:** 3 per cell, a fresh container, the model and harness version pinned, launches spread over at least 2 days.
- **Models:** the main one across all arms, a second one at least on C0 and C3 (configuration dependence is shown in SWE-Skills-Bench).
- **Separation:** the skill author does not see the held-out brands and tasks.

### Scope
| Stage | Design | Runs | API | Time |
|---|---|---|---|---|
| 0. Verifier check | A/A on C0; 50 manually introduced violations | dozens | <$50 | 3-5 engineer-days |
| 1. Invocation | 40 prompts (20 should trigger, 12 near-miss, 8 unrelated) × 3 × 2 models, real `Skill` call | 240 | on the order of $5-20 | 1 day |
| 2. Pilot | 6×8×4 arms (C0-C3)×3 | 576 | $0.6-3.5k | 6 hours of clean time at 8 parallel and 5 min per run, limits may stretch it |
| 2a. Second model | 6×8×2×3 | 288 | $0.3-1.7k | 3 hours |
| 2b. C4 and comparator | 6×8×2×3 | 288 | $0.3-1.7k | 3 hours |
| 3. Decay | 3 brands × 2 arms × 5 sessions of 20 turns | 30 sessions | on the order of $150-450 | 1-2 days |
| 4. Humans, experts | 3 neighboring pairs × 48 cells × 5 raters = 720 votes, 5-8 designers, 20-30 seconds per vote | 4-6 hours in total | on the order of $300-600 at a rate of $50-100/h (assumption) | a week |
| 5. Humans, blind matching | 40 raters × 24 items, 10 minutes | 960 attempts | on the order of $120-200 on Prolific | 1-2 days |
| 6. LLM judge | calibration on 200 pairs, 2 orders, 3 repeats, 2 judges | 2400 calls | on the order of <$100 | 1 day |
| 7. Confirmation | 8-12×10×5×3 | 1200-1800 | $1.2-10k | 2-3 days |
| 8. Field test | 1-2 teams, crossover, 20-40 real PRs | | people's time | 4-6 weeks |

Total before the decision to continue (stages 0-6): [inference] on the order of $2-8k for API and people, 2-3 person-weeks, 3-4 calendar weeks. The estimates rest on the range of $1-6 per run. Invocation in C3 with a forced hook and without it is better measured already at stage 1.

### Metrics and go/no-go (our thresholds)

**Adherence (checked outside the agent, on the rendered page and the diff)**
| # | Metric | Threshold |
|---|---|---|
| G1 | Off-token value rate, by area of computed style and screenshot pixels; a violation at ΔE00 >2 to the nearest token | C3 ≤2%; a reduction of ≥80% against C0 |
| G2 | Hard-coded value rate in the diff | C3 ≤1%, C2 ≤10% |
| G3 | Token coverage for color, spacing, typography, radii | C3 ≥95% |
| G4 | Font match by actually rendered glyphs | C3 ≥99% |
| G5 | Role semantics: a token in the right role, sampled by rules | C3 ≥90% |
| G6 | Brand presence: the brand's primary color and font are actually visible | ≥90% of screens |

**Guardrails (non-inferiority)**
| # | Metric | Threshold |
|---|---|---|
| G7 | Build and functional tests | lower CI bound of the C3−C0 difference ≥ −5 pp |
| G8 | axe serious and critical, contrast | no worse than C0 |
| G9 | Tokens and time | C3/C0 ≤1.5 |
| G10 | Craft, the question "what would you send to a client" | C3 against C0: lower bound of win rate ≥40% |

**Distinctiveness and controllability**
| # | Metric | Threshold |
|---|---|---|
| G11 | Brand swap, off-token to its own brand against another's | own ≤5%, other ≥50%; C0 shows no difference |
| G12 | Leakage of another brand's values | ≤1% |
| G13 | Single token mutation | ≥95% of runs follow the new value |
| G14 | Brand attribution on masked screenshots, 6 classes, leave-task-out, DINOv2 or analogue | C3 ≥60%, C0 ≤30%, chance 16.7% |
| G15 | Silhouette within a task, label is the brand | C3−C0 ≥0.10, CI excludes 0 |
| G16 | Ratio to the default centroid `d(out,default)/d(ref,default)` | C3 within 0.7-1.3, with similarity to the brand higher than C0 |

**Humans**
| # | Metric | Threshold |
|---|---|---|
| G17 | Blind matching, 4 options, novices after seeing the board | C3 ≥55%, difference from C0 ≥25 pp |
| G18 | Pairwise "which fits this brand more", experts, BT | C3 against C0 ≥70%; C2 against C1 ≥60% |
| G19 | Reliability | alpha on the on-brand question ≥0.4, repeated pairs 5-10%. Below: rephrase the question, do not discard raters |

**Robustness**
| # | Metric | Threshold |
|---|---|---|
| G20 | Trigger | recall ≥90%, false positives ≤5% |
| G21 | Gaming (editing tokens, suppressions, `--no-verify`, a new token outside the palette) | ≤1% of C3 runs, 0 in the final diff |
| G22 | Adversarial tasks: a violation without disclosure | ≤5% |
| G23 | Decay: off-token at turn 20 against turn 1, including after compaction | C3 without significant growth; C2 no more than ×2 |

### Decision rule
- **Go:** G1-G4, G7-G9, G11-G13, and at least one of G14 or G17.
- **Linter only:** adherence passed, distinctiveness did not, or C4≈C3 by humans. Then sell enforcement and tokens; remove or rework narrative.
- **Rework narrative:** C3≫C4 on values, but C2≈C1 by humans. Run the new version only on dev brands.
- **Stop:** G7 or G10 failed at any adherence thresholds: forcing breaks the work or the taste.
- **Better than competitors:** claim this only with superiority over Cx on held-out brands by G14 or G18 and no worse on G1-G4.

### Analysis
- Unit of inference: the brand. Primary test on a contrast: sign-flip or paired t on brand means. Intervals: cluster bootstrap (brands, then tasks within). Supporting: `score ~ arm + (1+arm|brand) + (1+arm|task) + (1|brand:task)`, with a binomial or fractional link for shares.
- Fix the contrasts in advance: C3−C0, C2−C1, C3−C2, C3−C4. Holm for multiple comparisons; a strict conclusion requires 8+ brands, and the pilot counts as exploratory.
- Show the distribution across brands and tasks, not only the mean. Analyze negative cells from transcripts (in SkillsBench that is 13 of 87 tasks).
- Human data: 2AFC without ties, random order, neighboring pairs, BT or logistic regression with random rater and item.
- LLM judge: a different vendor, both orders, a question from the rule checklist, "Unknown" allowed, a check on manipulations. Use it only if agreement with the majority of humans is no lower than the humans' leave-one-out agreement minus 5 points and position consistency is ≥0.9.
- Check the verifier first: at stage 0, recall on introduced violations ≥95%, false positives ≤2%.
- Record the model, harness, resources, and dates in the report.

### What to defer
- Apply Fame and Uniqueness after the pilot and only to brands with real recognition.
- Do not use workflow metrics (brand comments on PRs, edits to style lines, review cycles, time from logs) as an early gate: they are noisy and require a real team.

## Open questions
- Do off-token and coverage correlate with human on-brand ratings? The literature has no answer; the pilot must give a first estimate.
- What agreement is reachable on the question "does it conform to the brand" in UI? There are only data on preferences (alpha 0.25 and 0.37), fidelity to a description in graphics (TASTE), and illustration style (VIST).
- Does narrative give distinctiveness beyond tokens and a linter? This is the central question of the product, and there are no direct data.
- Do prohibitions persist in long UI sessions as poorly as in the format tests of arXiv 2604.20911? Check requirement against prohibition with a separate arm.
- Does the Vercel result transfer to style rules? Experiment: the same brand book content in an always-loaded index and in a skill, 3 brands × 8 tasks × 3 placements × 3 runs = 216 runs.
- Do file size and structure matter for dozens of brand rules? arXiv 2605.10039 found no effect on one trivial rule, while the Claude Code docs claim the opposite without figures.
- What variances do brand, task, and run give in practice? Without them the power calculation stays conditional.
- The behavior of other harnesses (Codex, Cursor, Gemini CLI): the hooks event model differs, and the portability of enforcement is not checked.
