# Brownfield: how to work with a company that already has a product and "some kind of style"

Date: 2026-11-06. Tag legend: [code] checked in code; [test] confirmed by a test; [README] stated in documentation, not checked; [external] an independent or third-party source, vendor status noted; [inference] my conclusion.

Method: static reading only; nothing was installed or run. Files in the clones that are addressed to agents were not read as instructions. The Atlassian ESLint plugin is absent from GitHub, so the compiled `dist` from the npm tarball [16.16.0](https://registry.npmjs.org/@atlaskit/eslint-plugin-design-system/-/eslint-plugin-design-system-16.16.0.tgz) was read; line numbers refer to files inside the tarball. Repository activity was taken through the GitHub API on 2026-11-06.

| Repository | SHA | Stars / last push | Status |
|---|---|---|---|
| Manavarya09/design-extract (package `designlang`) | 6050fdb | 4808 / 2026-11-05 | active |
| dembrandt/dembrandt | 90e2691 | 3955 / 2026-11-01 | active |
| projectwallace/css-analyzer | 7a0aaf2 | 366 / 2026-11-01 | active |
| cssstats/cssstats | 1bfbf3a | 2814 / 2023-10-07 | effectively abandoned |
| firecrawl/firecrawl (only `lib/branding`, read through the GitHub API) | edf0264 | commit of 2026-11-05 | active |
| Shopify/polaris (now `polaris-react-archive`) | 3f7954a | 6148 / 2026-09-11 | **archived** |
| primer/stylelint-config; primer/eslint-plugin-primer-react | 0dab605; 560c91c | commits of 2026-11-04 | active |
| salesforce-ux/slds-linter | 7904c5e | 12 / 2026-10-22 | active |
| phenomnomnominal/betterer | 69a83c1 | 637 / 2026-07-11 | active |
| eslint/eslint; stylelint/stylelint (Stylelint was read through the GitHub API) | 17f17cd; 994bc56 | commits of 2026-11-05; 2026-11-06 | active |
| rangle/radius-tracker | b4ad509 | 61 / 2024-07-03 | stalled |
| moroshko/react-scanner | 6b787b3 | 661 / 2026-04-20 | maintained |

---

## 1. Extraction tools: method, confidence, failure modes

### Takeaway
There are two classes of working extractors: computed-style (Playwright: designlang, dembrandt) and static AST (Wallace, CSS Stats). The first see what is drawn but lose names and source. The second keep source and lines but do not see the render, CSS-in-JS, or area. None distinguishes intent from accident: on the designlang author's benchmark the primary color was guessed in 53% and 71% of cases, the font in 93%. So an extractor supplies evidence, not canon.

### Cited Findings

**Comparison of methods**

| Tool | Data collection | How it counts | How it expresses confidence |
|---|---|---|---|
| designlang | Playwright, `getComputedStyle`, limit of [5000 elements](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L8), [open shadow DOM is traversed](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L603-L612), [cross-origin CSS is skipped](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L646) [code] | [Greedy clustering by distance <15](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/utils.js#L190-L216); [`brandScore`](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L167-L179): chroma, log of interactive backgrounds and links, log of count, square root of the area share, a bonus for a declared variable [code] | [A number up to 1 by the gap between the first and second candidate: about 0.3 when nearly tied, 1 with a large gap](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L214-L233), for primary only; [ranking with reasons](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L251-L261) [code]. There is no calibration against true answers in this code [inference] |
| dembrandt | Playwright, [`querySelectorAll("*")`](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L246); `shadowRoot` appears in the extractors [only in the consent banner](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/consent.ts#L106), so tokens inside web components will not reach the colors [code, negative result] | [Context weights (logo, cta, hero)](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L256-L260), [palette merge at deltaE <15, preference for the declared token](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L589-L607) [code] | [high/medium/low](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L579-L581), [a cap by number of uses](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L792-L802) [test: [colors.test.ts](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/test/colors.test.ts#L102-L104)]; [`semanticEvidence` with a decision of elected or refused, a rule, a reason, and alternatives](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L665-L674) [code] |
| Project Wallace css-analyzer | Static AST: [`analyze(css: string)`](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/src/index.ts#L71-L78), [one parser of its own](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/package.json#L69-L71) [code] | [total, unique, `uniquenessRatio`](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/src/collection.ts#L88-L105); [defined, used, unused, unknown for custom properties](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/src/defined-used.ts#L8-L42); [optionally the line and offset of each value](https://github.com/projectwallace/css-analyzer/blob/7a0aaf205f2ce2bc46f1754393455c1883120e76/src/index.ts#L66-L69) [code] | None: counters only. Roles and intent are outside the model [inference] |
| CSS Stats | [`node-fetch` + `cheerio`, no JS execution](https://github.com/cssstats/cssstats/blob/1bfbf3ae54ff8086cb068eecb5ce958a9509b1c5/packages/get-css/index.js#L6-L8); [PostCSS](https://github.com/cssstats/cssstats/blob/1bfbf3ae54ff8086cb068eecb5ce958a9509b1c5/packages/cssstats/index.js#L1-L4) [code] | By default [expands custom properties, erasing token names](https://github.com/cssstats/cssstats/blob/1bfbf3ae54ff8086cb068eecb5ce958a9509b1c5/packages/cssstats/index.js#L25-L34) [code] | None. But there is [`wayback-css`](https://github.com/cssstats/cssstats/blob/1bfbf3ae54ff8086cb068eecb5ce958a9509b1c5/packages/wayback-css/index.js#L8-L17): a site's CSS on a date from the Internet Archive [code] |
| Firecrawl branding | Heuristics in the browser plus LLM refinement [code] | [The LLM must return confidence and a rationale](https://github.com/firecrawl/firecrawl/blob/edf02642c8f002576e9f26b9bbbb7b327313558c/apps/api/src/lib/branding/schema.ts#L24-L34) [code] | [A color from the LLM is accepted at ≥0.5, discarded below 0.4, and between them only in a narrow case](https://github.com/firecrawl/firecrawl/blob/edf02642c8f002576e9f26b9bbbb7b327313558c/apps/api/src/lib/branding/color-roles.ts#L164-L181); [a measured link outweighs a heuristic one](https://github.com/firecrawl/firecrawl/blob/edf02642c8f002576e9f26b9bbbb7b327313558c/apps/api/src/lib/branding/merge.ts#L26-L31) [code]. The LLM's self-assessment is not calibrated [inference] |

**Accuracy.** [The benchmark of 2026-09-15](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/results/2026-09-15-baseline.md#L1-L11): primary color designlang 9/17 (53%), dembrandt 12/17 (71%); body font 25/27 (93%) for both. The sample is small, and the benchmark's author is the author of designlang, yet the competitor won in it. Both programs erred on linear, slack, duolingo, paypal, framer [code: data in the repository; the recount is mine]. A labeled [holdout of 37 sites](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L2) exists, but there is no published result for it in `bench/results` at this SHA [code, negative result].

**Drift and conformance.** dembrandt: [snapshot comparison with ΔE thresholds and a weighted score](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/drift.ts#L38-L45), [an `inconclusive` flag when there is nothing to compare: this is not a pass](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/drift.ts#L79-L82), [a check of rendered values against DTCG with the nearest token and ΔE 2.3](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/token-conformance.ts#L214-L243), [`--max-off-token`, `--approve`](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/README.md#L85-L89) [code + README]. designlang claims [`verify-ui` and `slop`](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/README.md#L90-L92) [README], and also the principle of [a "missing measurement stays missing"](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/README.md#L226-L237) [README]. dembrandt isolates failures: [a failed extractor records the reason and degrades only its own category](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/guard.ts#L10-L22) [code].

**Failure modes**

| Scenario | What the code shows | Status |
|---|---|---|
| CSS-in-JS | Computed-style sees the result [on any element](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L696-L697), but the token name and file are lost. designlang's attribution takes [the first stylesheet with a matching value](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/token-sources.js#L6-L13). Wallace and CSS Stats receive only the CSS text | [code]; the consequence is [inference] |
| JS rendering | designlang: [a `networkidle` wait of 5 s and a silent continue](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L21-L23), dembrandt: [a wait for SPA hydration](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/index.ts#L562-L565). A partially loaded page can give incomplete data | [code]; the risk is [inference] |
| Login wall | dembrandt: [`--login`, storageState](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/README.md#L108-L112). [A session rejection is detected only on a host change](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/auth-session.ts#L227-L239); a redirect to `/login` on the same host is not caught. designlang: [cookies and headers](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/README.md#L390); there are no matches for `redirect` or `login` in `crawler.js`. Risk: extracting the tokens of the login page and taking them for the product | [code]; the risk is [inference] |
| A/B variants | dembrandt only [keeps the drift gate from failing when a variant appears in the palette](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/drift.ts#L327-L330). designlang [collects information about the experimentation stack](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/index.js#L166). I found no repeated runs and no split by bucket | [code, negative result for the files read] |
| Dark mode | dembrandt: [guesses attributes and classes, emulates media](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/index.ts#L1244-L1251), then [overwrites semantic with the dark values](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/index.ts#L1264). designlang: [a separate `colorScheme: dark` context](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/crawler.js#L212-L220), [semantic light/dark pairs](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/dark-mode-pair.js#L4-L8). A theme from user settings or localStorage is guaranteed by neither | [code]; the last point is [inference] |
| Legacy pages | dembrandt: [scope site/section/page by page count](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/coverage.ts#L28-L32), [confidence grows with the number of pages](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/merger.ts#L91-L94). Nobody has the age of a value | [code]; the conclusion about absence is [inference] |
| Marketing versus app | designlang: [discovery through navigation, types pricing/docs/product/about/blog](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/multipage.js#L17-L30), [shared and unique values across pages](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/multipage.js#L163-L191). dembrandt: [excludes login and signup](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/discovery.ts#L15-L17). Both are biased by default toward public marketing. There is no concept of an "app surface" | [code]; the bias is [inference] |

A study of a sample of sites: [OverlayQA, vendor](https://www.designsystemscollective.com/design-token-drift-we-audited-375-sites-only-7-5-got-it-right-78890bfbb9de), 375 home pages, mean token coverage 40.4%, only 7.5% of sites ≥90%. The numbers inside the article disagree (375 and 410), and inner pages were not scanned [external, vendor; read from a search excerpt].

### Inferences
- [inference] Both classes are needed at once. Runtime answers "what the user sees", static answers "where to fix it". Without linking a runtime value to a file and line, a migration cannot be built.
- [inference] The unit of extraction must not be a site but the pair "surface + theme + authorization state". Otherwise the divergence between marketing and app is averaged out and disappears.
- [inference] Each run must record quality signs: the session was accepted, the fonts loaded, what degraded. A failure and `inconclusive` must be normal outcomes. dembrandt is the best sample here.
- [inference] A merge threshold of ΔE 15 suits a short palette but is harmful for a conflict registry: it hides exactly those close variants that need a decision.

### Gaps
- `sunil-dsb/design.md` (73 stars): the checkout failed because of an LFS filter, and the code was not read. Superposition, OpenBrand, and others were not examined.
- No independent benchmark of extractors was found, only the data of the designlang author.
- The real share of CSS-in-JS errors and the handling of runtime injection were not measured: that needs a run, and the conditions forbid it.

---

## 2. Which sources diverge and who decides

### Takeaway
All of them diverge. In designlang's data, an official or secondary brand document often does not match what is drawn. Frequency is not intent: the two leading tools even weigh "declared" and "used" in opposite ways. The solution: store `observed`, `declared`, and `decided` separately. Canon arises only from a recorded decision by a named person.

### Cited Findings

**PDFs and guidelines versus the live site.** The `evidence` field in [sites.json](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L2) (111 sites) and [holdout.json](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L2) (37 sites), labeling from 2026-11-04 [code: data]:
- [LinkedIn](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L4): the color from the official PDF is absent from the page, and a different one is drawn.
- [Stripe](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L4): the old color from the brand-assets CSS is not drawn. Likewise [Spotify](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L12), [Atlassian](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L15), [HubSpot](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L21), [Trello](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L18), [MIT](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L31).
- Font: [Slack](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L14) draws not what the 2020 guidelines name; at [Calendly](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L10) both color and font differ from the agency's material; at [Zoom](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L5) the page body is drawn in a different font than the one named for the product interface.
- Surfaces: at [GitLab](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L21) and [Walmart](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/holdout.json#L27) part of the official palette does not appear on the home page.
- My regex count over 148 records: 16 mention an outdated color that is not on the page; in 28 no found color is drawn; in 69 the `primary` field is empty [inference]. Caveats: home page only, 1280×800, one date, the tool's author, part of the colors from secondary sets, and monochrome brands also give an empty field. The absence of a color on the home page is not always a conflict: the brand may have been updated, and the color may live on other surfaces. This illustrates the order of magnitude of the phenomenon, not an exact figure.

**Figma versus code.** [UX Tools](https://www.uxtools.co/survey/design-systems/overview), n=2220: 46.3% reported significant divergences between specs and components, and 67% called design-code synchronization a significant problem [external; a third-party survey, but the year is unclear: the description says 2024, the page has a 2026 stamp]. [Sparkbox](https://sparkbox.com/foundry/finding_and_fixing_design_system_drift): treat code as "now", Figma as "next"; a divergence is neutral at first, AI only finds it, and a human decides; four levels of consequences from safe to deprecation with coexistence [external, consulting, no data]. Opinions on the source of truth are opposite: [Harvey chose a table of Figma variables and a PR through a GitHub Action](https://www.harvey.ai/blog/rebuilding-harveys-design-system-from-the-ground-up) [external, self-report], [Atomize claims there is less drift where token definitions live in code](https://atomize.tools/blog/figma-design-system-parity-code-sync/) [external, vendor, from a search excerpt].

**Sales presentations.** [Visme, vendor](https://www.visme.co/resources/b2b-sales-content-report-2026/), n=164, margin of error about 7.7%: in 80% of teams, salespeople at least sometimes change the approved presentation; 53% report that outdated, off-brand, or incorrect materials reach customers monthly or more often [external, vendor, the report itself calls the numbers approximate].

**Frequency is not intent.**
- designlang cites cases in comments: [linear weights let the green CTA of gov.uk on 4 buttons beat GOV.UK blue, and a one-off blue beat Framer Blue with 44 uses; a near-black atlassian.com scored 702 uses](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L145-L160) [code]. Diff highlight colors [reached secondary roles only because of saturation](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L186-L199) [code]. [The first color in document order may be the `html` color, which is absent from the visible text](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L124-L128) [code].
- The tools disagree: designlang [puts a declared variable above statistics](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/extractors/colors.js#L26-L31) (bonus 120), while dembrandt [treats a token as a mere +20 bonus, and a frequent color can beat a rare token](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/extractors/colors.ts#L615-L619) [code]. Both rules are derived from examples; there is no winner.
- A brand may not be a single color: on [IKEA](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/results/2026-09-15-baseline.md#L20) the programs chose blue and yellow, and both answers were counted [code: data].
- What can be automated honestly: [ΔE <1 as one token split in two; a higher threshold is already noisy on intentional surfaces](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/lib/findings.ts#L49-L72) [code].

**Who makes the decision.** [Frost](https://bradfrost.com/blog/post/a-design-system-governance-process/): a joint process, formal rights are not fixed, and the organization defines them itself [external]. [Atomic Design, chapter 4](https://atomicdesign.bradfrost.com/chapter-4/): whether to keep, remove, or merge is decided by a smaller cross-disciplinary group [external]. The tools read here have no concept of a "decision owner"; the closest is [`--approve` in dembrandt](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/README.md#L89), but that is acceptance of a whole snapshot, not of a value with a rationale [inference from the code read; another researcher is looking at brandsystem-mcp and impeccable, and they may differ].

### Inferences
- [inference] Six different signals cannot be collapsed into one score: number of elements, area, page coverage, role (interactive, logo), declared name, stability over time. Show them side by side without averaging.
- [inference] A record model for each value:
  - `observed`: where, how many, area, theme, surface, date, file and line, extractor version. Facts only.
  - `declared`: who declared it and where: PDF, Figma, tokens, CSS variable `--brand`, date, author. A named variable in code counts as a declaration, not a decision.
  - `decided`: status, replacement, deadline, who, when, why, from which evidence. Filled in by a human only.
- [inference] Statuses: `canon`, `tolerated` (with a deadline), `deprecated` (with a replacement), `forbidden`, `protected` (with a rationale), `unknown`. The agent can only propose. `unknown` counts as neither permission nor prohibition.
- [inference] A proposed order of authority by domain (each domain has one named owner, in a small company often the founder):

| Domain | Who decides | Constraints that taste does not override |
|---|---|---|
| Logo, primary color, font, tone | brand owner or founder | font licenses, requirements of a parent company |
| Token semantics in the product | design or product lead | contrast and accessibility: on conflict, escalation, not a silent edit |
| Token → code mapping | engineering lead | behavior and performance |
| Marketing, presentations | marketing lead | an intentional divergence from the product is recorded as a decision |

- [inference] The seniority of sources is not fixed in advance. A value on the live site proves only that it exists, and a PDF proves only that someone once wanted it. These are evidence of different natures for one human decision.

### Gaps
- I found no quantitative data on the divergence of PDF, Figma, code, and presentations **in one company**. Each pair is covered by a separate source.
- There are no controlled data on which authority rule reduces drift.

---

## 3. Design system practice: inventory, tiers, sanctioned values, governance

### Takeaway
Frost's inventory is valuable as a social mechanism of agreement, not only as an audit; the agent can prepare a draft, but the decision stays with the group. Token tiers are needed first of all so that a linter can tell "the value is allowed" from "the value makes sense here". Two tiers are often enough.

### Cited Findings
- **Interface inventory.** [All disciplines take part; the first pass of screenshots takes 30–90 minutes with a timer; by category, one instance of each differing pattern is captured, not only the home page; then a showing, a discussion of names, a report to stakeholders](https://atomicdesign.bradfrost.com/chapter-4/). The document persuades non-designers better than arguments do [external]. [The original post](https://bradfrost.com/blog/post/interface-inventory/) describes comparing variants side by side [external].
- **Tiers.** [Fowler: option, decision, component; it is better to hide the option, but that makes developers dependent on designers; two tiers suit settled decisions; for a snowflake the tiers can be skipped; the token standard has no scoping mechanism](https://martinfowler.com/articles/design-token-based-ui-architecture.html) [external].
- **Tiers in linters** [code]:
  - Primer: [the allowed token types depend on the property](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/colors.js#L26-L32), [`base` typography tokens give a warning with a suggestion of a functional one](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/typography.js#L125-L133). Even [an autofix to a base token is accompanied by a warning](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/typography.js#L181-L192).
  - Polaris: [an allowlist of custom property prefixes and values](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/stylelint-polaris/index.js#L117-L122), [a ban on overriding the system's classes](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/stylelint-polaris/index.js#L110-L116).
  - SLDS: [the order of groups depends on the property, `reference` last](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/handlers/color-handler.ts#L69-L94).
  - Atlassian (`dist/cjs/rules/ensure-design-token-usage/find-token-name-by-property-value.js`, L14–18): for spacing autoreplacement only active tokens by `attributes.state` are taken.
- **Sanctioned and unsanctioned.**
  - [Frost's snowflake](https://bradfrost.com/blog/post/a-design-system-governance-process/): a single component lives in the product backlog but follows rules that ease its later inclusion in the system [external].
  - [Primer: alpha colors are allowed with caution and the approval of the Primer team](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/no-display-colors.js#L4-L7) [code]: a ready exception path.
  - [SLDS `customMapping`](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/custom-mapping.ts#L10-L18): the client itself declares which value corresponds to which hook [code]. Atlassian: the `exceptions` option (`rule-meta.js`, L28–30) [code].
  - Lifecycle: [DTCG `$deprecated` with a reason](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L194) [README: specification]; Atlassian (`no-unsafe-design-token-usage/index.js`, L36–37) separately reports removed and experimental tokens with a replacement [code].
- **Governance in practice.** [Harvey](https://www.harvey.ai/blog/rebuilding-harveys-design-system-from-the-ground-up): new tokens with the prefix `hy-`, first migrating clean one-to-one mappings, new features only on new tokens, old components when touched, adjacent ones together. Not every old token has an equivalent. The thresholds of 80% and 95% are described as a plan, with no result [external, self-report].

### Inferences
- [inference] The agent can take over the routine of the inventory: screenshots, grouping, counting variants. The discussion of names and the choice to keep or remove cannot be automated: that is exactly where a shared language and agreement appear.
- [inference] For brownfield, the minimum is two tiers plus a bridge: `primitive` (hidden), `semantic` (public), and `legacy alias` (the old name points to the new). Add a component tier only if necessary.
- [inference] Every prohibition rule must come with an exception path that has an owner and a deadline. Otherwise exceptions will go into anonymous `disable` comments.

### Gaps
- No empirical comparison of 2 and 3 token tiers for small teams was found.

---

## 4. Enforcement in legacy code without stopping work

### Takeaway
A working pattern has four parts: freeze the old, forbid the new, split autofixes by confidence level, and first replace without changing the picture. All large systems keep a mapping of values, but there are almost no published measured cases about migration cost and coverage growth.

### Cited Findings

**Rules and migrators**

| System | Mechanism | Tag |
|---|---|---|
| stylelint-polaris | [The `coverage` plugin wraps ordinary rules and names them `polaris/<category>/<rule>`](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/stylelint-polaris/plugins/coverage/index.js#L54-L71): hence a per-domain metric and its own error text. [The documentation ties the rules to measuring coverage](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris.shopify.com/content/tools/stylelint-polaris.mdx#L98) | [code], [README] |
| Polaris baseline | [A codemod inserts `stylelint-disable` with the note `-- generated by polaris-migrator DO NOT COPY`](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris-migrator/src/migrations/styles-insert-stylelint-disable/transform.ts#L10-L34) | [code] |
| polaris-migrator | [Universal replacement by maps](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris-migrator/src/migrations/styles-replace-custom-property/transform.ts#L12-L50), [migration steps](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris-migrator/src/migrations/v12-styles-replace-custom-property-color/transform.ts#L12-L21). **It does not apply a partial edit: it rolls back the node and writes a suggestion as a comment** ([sass.ts](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris-migrator/src/utilities/sass.ts#L507-L515)). [The documentation advises separating commits of mechanical edits from those that need review](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris.shopify.com/content/tools/polaris-migrator.mdx#L1156-L1181) | [code], [README] |
| Atlassian `ensure-design-token-usage` 16.16.0 | An error in [recommended](https://registry.npmjs.org/@atlaskit/eslint-plugin-design-system/-/eslint-plugin-design-system-16.16.0.tgz) (`presets/recommended.codegen.js`, L18). Options `domains`, `exceptions`, `applyImport`, `shouldEnforceFallbacks` (`rule-meta.js`, L7–31). **For color the suggestion inserts an empty `token('')`; the value is not guessed** (`get-token-suggestion.js`, L13–26). Spacing autofix only on an exact match of value and scale (`find-token-name-by-property-value.js`, L19–25). The messages are worded as fix instructions and ask to choose a token by the element's purpose (`rule-meta.js`, L42–47). CSS-in-JS: objects, templates, JSX (`index.js`, L121–324) | [code] |
| Atlassian: fallbacks | `fallbackUsage: forced/none` (`no-unsafe-design-token-usage/index.js`, L44–63, L169–186): you can first require `token(name, old value)`, then forbid it. [The guide describes this as stages](https://atlassian.design/foundations/tokens/use-tokens-in-code) | [code], [README, from a search excerpt] |
| Atlassian: ratcheting | The CHANGELOG mentions ratcheting of outdated imports and exceptions for documentation with intentionally bad examples (`CHANGELOG.md`, L272, L287). The mechanism lives outside the package | [README] |
| Primer stylelint | [`reportNeedlessDisables: true`](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/index.js#L19), [unknown custom properties as a warning by primitives files](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/index.js#L40-L58), [messages with a link to the documentation](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/colors.js#L13-L22) | [code] |
| Primer ESLint | [Autofix of CSS variables only when the map has a replacement](https://github.com/primer/eslint-plugin-primer-react/blob/560c91cc4f087dfed3c21d2b1a67aedabb197f62/src/rules/new-color-css-vars.js#L24-L43); [deprecated components are imported from an explicit `@primer/react/deprecated`](https://github.com/primer/eslint-plugin-primer-react/blob/560c91cc4f087dfed3c21d2b1a67aedabb197f62/src/rules/use-deprecated-from-deprecated.js#L102-L120) | [code] |
| SLDS linter | [ESLint-based, HTML, CSS, CMP, JSX, TSX](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/README.md#L11-L17), [a SARIF report through the `report` command](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/README.md#L69) [README]. **[Four levels: deterministic, semi-deterministic, llm, no-hooks](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/docs/no-hardcoded-values-rule-options.md#L425-L434)**, [when context exists, autofix only for the first two, `deterministicOnly` limits it to the first](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/handlers/color-handler.ts#L33-L35); [without classification the replacement is applied if a single hook is found](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/handlers/color-handler.ts#L39), so the levels are not the only path to an autofix. [The replacement keeps the original value as a fallback: `var(hook, color)`](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/handlers/color-handler.ts#L45-L49). [The search for the nearest hook takes the property and the color family into account](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/no-hardcoded-values/handlers/color-handler.ts#L51-L72). [styled-components is read through postcss-styled-syntax](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/eslint-plugin-react-slds/src/utils/styled-components.ts#L2). The classifier lives in [a separate `@salesforce-ux/context-extractor`](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/packages/cli/package.json#L40); it was not read | [code] |

An important negative fact: [Polaris React is declared deprecated, the repository is archived, and since 2025-10-01 Web Components are recommended](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/README.md#L1-L16) [README]. A strong toolset turned out to be tied to the fate of its framework [inference].

**Ratchet and baseline**

| Mechanism | How it works | Limitation |
|---|---|---|
| ESLint bulk suppressions | [A counter per file and rule](https://github.com/eslint/eslint/blob/17f17cd7a248c532cfce61b7f915760608ca7121/lib/services/suppressions-service.js#L60-L75); [if the violations do not exceed the counter, they are hidden, otherwise all are shown](https://github.com/eslint/eslint/blob/17f17cd7a248c532cfce61b7f915760608ca7121/lib/services/suppressions-service.js#L128-L176). [Unused suppressions give a non-zero exit](https://github.com/eslint/eslint/blob/17f17cd7a248c532cfce61b7f915760608ca7121/docs/src/use/suppressions.md#L48-L66) [code] | [Only `error`, not `warn`](https://github.com/eslint/eslint/blob/17f17cd7a248c532cfce61b7f915760608ca7121/docs/src/use/suppressions.md#L14-L16) [code]. The counter will not notice swapping one violation for another in the same file [inference]. Added in [v9.24.0](https://eslint.org/blog/2025/04/introducing-bulk-suppressions/) [external] |
| Stylelint suppressions | [A port of the ESLint service](https://github.com/stylelint/stylelint/blob/994bc5604223d3315d7cfe80e2240418ad80434c/lib/utils/suppressionsService.mjs#L1-L3), [`--suppress` cleans up stale entries itself](https://github.com/stylelint/stylelint/blob/994bc5604223d3315d7cfe80e2240418ad80434c/lib/utils/suppressionsService.mjs#L36-L76) [code] | [Experimental status](https://github.com/stylelint/stylelint/blob/994bc5604223d3315d7cfe80e2240418ad80434c/docs/user-guide/suppressions.md#L3-L4) [README] |
| Betterer | [New = worse, fixed = better](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/betterer/src/test/file-test/constraint.ts#L7-L29); [comparison by line, column, length, and hash, then recognition of moves by hash](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/betterer/src/test/file-test/differ.ts#L80-L110); [`deadline`](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/betterer/src/test/file-test/file-test.ts#L100-L109) and [`goal`](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/betterer/src/test/file-test/file-test.ts#L123-L132); [a wrapper for Stylelint](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/stylelint/src/stylelint.ts#L45-L65) [code] | In the Stylelint wrapper [the hash equals the message text](https://github.com/phenomnomnominal/betterer/blob/69a83c14975b6ef2e4e42736e686ffba0f28895f/packages/stylelint/src/stylelint.ts#L61), so a violation with the same text elsewhere may be taken for a move [inference] |

**Visual regression.**
- [Chromatic TurboSnap](https://www.chromatic.com/docs/turbosnap/): a file imported from `preview.js` triggers a full re-capture; even a cosmetic edit in the dependency graph leads to a capture; a copied snapshot costs 0.2 of an ordinary one [README]. So a global tokens file can trigger a re-capture of all stories [inference].
- [Playwright `toHaveScreenshot`](https://playwright.dev/docs/test-snapshots): the baseline is tied to the browser and platform, rendering depends on the OS and environment, and the `threshold` is 0.2 by default [README].
- Atlassian forbids dark VR tests with a separate rule as redundant (`no-dark-theme-vr-tests/index.js`, L9–24; not in recommended) [code]. The rationale is in an internal RFC, which was not read.
- [Zalando](https://engineering.zalando.com/posts/2025/02/llm-migration-ui-component-libraries.html): the LLM could not assess the visual result; a page could be syntactically correct and visually broken [external, self-report].
- Percy was not investigated.

**Adoption metrics**

| Tool | What it measures | Limits |
|---|---|---|
| react-scanner | [Static AST](https://github.com/moroshko/react-scanner/blob/6b787b353fa7e817d13b37f1221ae29553020795/src/scan.js#L1), [instances and props](https://github.com/moroshko/react-scanner/blob/6b787b353fa7e817d13b37f1221ae29553020795/src/processors/count-components-and-props.js#L6-L26), [the `importedFrom` filter](https://github.com/moroshko/react-scanner/blob/6b787b353fa7e817d13b37f1221ae29553020795/README.md#L246) [code] | JSX only; it does not count tokens [inference] |
| Radius Tracker | [Homebrew components are detected by DOM tags or known primitives, including the CSS-in-JS libraries mentioned](https://github.com/rangle/radius-tracker/blob/b4ad5096172e74175935f72e3b182a808be65cbe/src/lib/detectHomebrew/detectHomebrew.ts#L19-L45); [usage source: homebrew or target](https://github.com/rangle/radius-tracker/blob/b4ad5096172e74175935f72e3b182a808be65cbe/src/lib/cli/sharedTypes.ts#L26-L27); [history by git](https://github.com/rangle/radius-tracker/blob/b4ad5096172e74175935f72e3b182a808be65cbe/src/lib/cli/timelines/git.ts) [code] | [React only; the documentation says wrappers like `styled.div` are not supported for homebrew](https://github.com/rangle/radius-tracker/blob/b4ad5096172e74175935f72e3b182a808be65cbe/src/docs/pages/supported_technologies.md#L8-L12) [README]; a comment in the code looks broader, and I did not look into the discrepancy. Last push 2024 |
| Omlet | Commercial, closed source. [An Optimizely session](https://blog.zeplin.io/optimizely-harmony-session-2023) describes the benefit qualitatively [external, linked to the vendor] | No published case with a percentage of growth was found [negative result] |
| Gestalt (Pinterest) | [The share of own components to DOM elements, the number of deprecated ones, codemods](https://deploy-preview-2023--gestalt.netlify.app/tooling) [external; only a snippet of a preview build, [the canonical address](https://gestalt.pinterest.systems/tooling) leads to an internal login] | Numbers not obtained |

**Published cases, with caveats**

| Case | Numbers | Data quality |
|---|---|---|
| [Zalando, GPT-4o](https://engineering.zalando.com/posts/2025/02/llm-migration-ui-component-libraries.html) | 15 B2B applications; accuracy above 90%; cost estimate under $40 per repository | Self-report; the way accuracy was measured is not described. Generated mappings were sometimes wrong: the old button's "medium" was visually equal to the new one's "large". Complex components required manual work |
| [Coinbase, Figma blog](https://www.figma.com/blog/how-coinbase-used-code-connect-to-shrink-token-costs/) | Tokens −11.5%, time −22.3%, cost −22.5% | Vendor; three runs; **a clean codebase**, so it proves nothing for brownfield. No numeric adherence is given |
| [Harvey](https://www.harvey.ai/blog/rebuilding-harveys-design-system-from-the-ground-up) | Thresholds of 80% and 95% | A plan, no actual adoption |
| Polaris, Atlassian, Primer, SLDS | none | I found no measured cases about migration cost and coverage growth [negative result] |

### Inferences
- [inference] The best set of techniques:
  1. Ban the new through `error` plus a baseline.
  2. Mark legacy right in the code and keep an external counter, both together. An in-source mark is visible to the agent when it reads; an external file does not warn it, but it does not pollute the code. Polaris and ESLint together cover both cases.
  3. Autofix tiers on the SLDS model, where the `llm` and `no-hooks` tiers are not applied automatically.
  4. Refusal of partial application on the Polaris model.
- [inference] **Two-phase migration.** Phase A preserves the picture: an alias or a token with the same resulting value, or `var(token, old value)`. The visual diff must be zero, and a non-zero diff counts as an error. Phase B changes values deliberately: each change is tied to a decision and approved separately. Mixing these phases makes any large PR unverifiable.
- [inference] A per-file counter is insufficient for an agent that edits files in bulk: swapping violations goes unnoticed. A diff-line check is needed: added lines contain no new off-canon values.
- [inference] Warnings do not hold the line: bulk suppressions do not count them. New violations need `error`; `warn` is fine for observation until the domain is ready.
- [inference] The metric is worth counting at three levels: tokens (the share of values by domain), components (own system, homebrew, raw DOM), rendering (off-token on the live site). React-only scanners cover just the middle one.
- [inference] The live check `--tokens --max-off-token` in dembrandt and code linting catch different things: the linter sees the source, while the live check also sees what got into the product around the linter (third-party widgets, CMS content).

### Gaps
- There are no independent data on how much a token migration costs in person-hours and how fast coverage grows.
- The behavior of ratchets under mass agent work was not studied.
- `@salesforce-ux/context-extractor` and Atlassian's internal ratcheting mechanisms were not read.

---

## 5. Brand: what an extractor does not see and how to tell a recognizable oddity from accidental debt

### Takeaway
Distinctiveness lives in buyers' memory, so it cannot be derived from CSS. A recognizable ugliness and accidental debt look the same in the data. Telling them apart takes a combination of a short interview, an analysis of stability over time and across surfaces, and, for a disputed and important value, an unbranded test. A `protected` status is needed that overrides anti-slop and best-practice rules, except for legal frames and accessibility (there, escalation).

### Cited Findings
- **The Ehrenberg-Bass frame.** [Distinctive assets: colors, shapes, fonts, faces, words; you need to understand the strength by uniqueness and fame, and use it as a palette](http://marketingscience.info/brands-need-distinctive-assets) [external]. From [a recording of an episode with Jenni Romaniuk](https://labmarcel.substack.com/p/jenni-romaniuk-building-distinctive-e06): "Not everything has to be a distinctive asset." [external].
- **The grid.** [A secondary retelling of the book](https://tianpan.co/blog/2025-09-01-building-distinctive-brand-assets-by-jenni-romaniuk): protect an asset that is famous and unique; make one that is famous but not unique more your own, or gradually replace it; promote one that is unique but little known; rework or drop one that is weak on both axes. The test: show the asset without the brand name and ask which brand comes to mind; also watch whether competitors are named. It is better to refresh an outdated asset while keeping the recognizable core. The same source: only about 4% of the colors tested are unambiguously tied to one brand [external, a retelling, the text itself warns of conjecture; the book was not read].
- **The cost of loss.** Tropicana, 2009: [a sales drop of about 20%, losses of $30 million, the return of the packaging announced on February 23](https://www.thebrandingjournal.com/2015/05/what-to-learn-from-tropicanas-packaging-redesign-failure/) [external; the article gives the figures without an exact reference, other publications give different sums; the period is short and other causes are not excluded]. This is packaging, not an interface; transfer to a product is only an analogy [inference].
- **An example from an interface.** Bloomberg: [employees call black with amber the main sign of the design, recognizable across a trading floor, and protect it as part of the brand; competitors also switched to a dark background](https://digitalcontentnext.org/?p=14856) [external, the company's self-report, 2017]. A narrow specialist audience, no causal data.
- **Anti-slop can hit a real brand.** [designlang's slop calibration](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/results/slop-2026-11-04.md#L3-L5): 0% false alarms on 40 hand-made sites in the final band, but only 3% of 30 AI pages were caught (27% in the mixed or general band) [code: the author's data]. At the same time individual "signs" fired on [Stripe, BBC, Slack, Shopify (`indigo-gradient`), gov.uk (`hero-three-cards`), Mailchimp (`glow-shadows`), Dropbox (`uniform-radius`)](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/results/slop-2026-11-04.md#L15-L27). [The detector checks only gradient colors](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/slop/detectors.js#L55-L66), and [the comparison with the brand is computed separately](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/src/slop/score.js#L50) [code]. In the final band they are all "distinct", and that is honest; the danger arises if a rule is applied on a single sign [inference]. On Stripe the sign fires at [the brand color #533afd](https://github.com/Manavarya09/design-extract/blob/6050fdb470d87c14f3db42a07ba782ca93286c75/bench/sites.json#L4) [inference: a coincidence does not prove the cause, but it illustrates the risk].

### Inferences

**Minimal interview** [inference]: 20–30 minutes, each question closes something the extractor does not see. Show evidence (screenshots side by side), not abstract questions.

| # | Question | What it closes |
|---|---|---|
| 1 | Who makes the final call on the logo, color, font, tone, product UI? | Authority |
| 2 | If the name is removed from a screenshot, what gives you away to a customer? What have customers, sales, the press said about it? | Recognizability hypotheses |
| 3 | What must not be changed, even if you do not like it? | Candidates for `protected` |
| 4 | What would you remove tomorrow? Where did it come from? | Debt candidates, history |
| 5 | Which recently made screen is closest to what you want to be? Is a rebrand underway? | to-be versus as-is, a sample |
| 6 | Who must you not be confused with? Who looks similar? | Uniqueness |
| 7 | Are there obligations: font licenses, a parent brand, white label, regulation, accessibility requirements? | Hard boundaries |
| 8 | Do marketing and product diverge intentionally? | Status of the divergence |
| 9 | Which surfaces are dying or will be rewritten within six months? | Do not migrate the dead |
| 10 | Which files count as outdated, and which presentation really goes to customers? | `declared` evidence |

**How to tell oddity from debt** [inference, a heuristic, not checked against data]:

| Sign | More likely a recognizable oddity | More likely accidental debt |
|---|---|---|
| Time | Holds for years and through redesigns ([Wayback](https://github.com/cssstats/cssstats/blob/1bfbf3ae54ff8086cb068eecb5ce958a9509b1c5/packages/wayback-css/index.js#L8-L17), git) | Appeared recently, drifts |
| Surfaces | Product, marketing, presentations, logo | One screen or one team |
| Variability | One value, applied consistently | Twins with ΔE <1, different versions |
| Prominence | Important elements, large area | Side edges |
| Person | Someone can explain and defend it | Nobody knows where it came from |
| External | Customers, press, mentions, imitation | Silence |
| Competitors | Rarely found in the category | A technique common to the category |

- One fact does not decide: a logo can be young, and debt can be old. Inertia also survives for years. So the result is a candidate with evidence and a question to a human, not an automatic label.
- For key disputed assets, offer a quick unbranded test (a masked screenshot, the question "whose product is this?"). For small B2B companies the sample is small, so the result is approximate.
- Ugliness and nonconformity with best practice are not evidence in themselves. "Bad contrast" is not a verdict but a constraint: keep the identity by changing the application (for example, the color on large panels but not as text). A human decides.
- Record: `protected: { asset, why, evidence, owner, date, allowed_uses, review_date }`. Anti-slop, best-practice checks, and autofixes must read this list. Anti-template checks work only in warning mode if the brand is not yet described.

### Gaps
- Romaniuk's book was not read, and the description of the grid comes from a secondary retelling. The figure about the inflation of fame under a prompt, up to about 20 pp, appeared only in search results; the [Contagious](https://contagious.com/io/article/jenni-romaniuk-on-distinctive-assets) page returned the home page. The "60/70%" threshold values on one of the sites are not attributed and cannot be used.
- No measured data were found on the harm or benefit of keeping visual oddities **specifically in digital products**. Cracker Barrel 2025 is confirmed only by a blog and is not included in the conclusions.
- There are no data on how applicable the fame and uniqueness method is to B2B with a small number of buyers.

---

## 6. How an agent should behave in a brownfield repository

### Takeaway
Neither "follow the neighboring code" nor "always write to the new brand" works. A policy by zone is needed: new code is written to canon; an edit to legacy keeps the local structure but adds no new off-canon values; `protected` is not "improved". A warning in prose is weaker than mechanics: a ratchet on added lines and marks in the code. I found no direct controlled data on agents copying **design patterns**.

### Cited Findings
- [A secondary survey](https://yage.ai/share/harness-engineering-survey-en-20260312.html) of the [OpenAI post on harness engineering](https://openai.com/index/harness-engineering/) (2026-02-11): Codex repeats the repository's existing patterns, including suboptimal ones; the team fixed rules and ran background tasks that find deviations and open PRs; earlier about a fifth of the time went to manual cleanup [external, a secondary retelling; the original returned 403; one codebase, self-report].
- [Snyk](https://snyk.io/blog/copilot-amplifies-insecure-codebases-by-replicating-vulnerabilities): Copilot uses open tabs as context; in a demonstration one SQL injection turned into two [external, vendor, a demonstration, not an experiment; read through excerpts; about security, not style].
- [Pattern Replication Risk](https://agentpatterns.ai/patterns/anti-patterns/pattern-replication-risk/): search ranks by similarity, not quality, and a TODO does not lower the rank; examples in the repository are stronger than prose; treat with mechanical rules; for code in the middle of a migration, narrow the rules, starting with new files [external, a practical site, not a study].
- [Gloaguen et al., arXiv 2602.11988 v3](https://arxiv.org/abs/2602.11988): context files on the whole do not improve task success, raise the inference cost by more than 20%, agents follow specific instructions well, repository overviews did not help, and files are useful for nonstandard practices [external, an independent preprint; the tasks are not about design].
- [arXiv 2605.02741](https://arxiv.org/html/2605.02741v1) on code smells in LLMs **does not measure** pattern copying: there is only a qualitative phrase about a copy-paste style [external; negative result].
- Mechanisms in code that are useful to agents [code]: [a `DO NOT COPY` mark](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/polaris-migrator/src/migrations/styles-insert-stylelint-disable/transform.ts#L10); [an explicit `deprecated` entry in the import](https://github.com/primer/eslint-plugin-primer-react/blob/560c91cc4f087dfed3c21d2b1a67aedabb197f62/src/rules/use-deprecated-from-deprecated.js#L102-L120); Atlassian messages with a fix instruction (`rule-meta.js`, L42–47). Harvey [added rules for Cursor so that the AI takes the new tokens by default](https://www.harvey.ai/blog/rebuilding-harveys-design-system-from-the-ground-up) [external, self-report, effect not measured].

### Inferences

**Policy by zone** [inference]:

| Zone | What to do | What is forbidden |
|---|---|---|
| New file, new component | Canon only. Samples only from the `exemplars` list | Taking a neighboring legacy file as a sample |
| Edit in legacy | Keep the local structure and behavior, minimal diff. New lines without new off-canon values | A redesign on the side; copying other raw values from the file |
| Touching legacy with a value that has a deterministic mapping | Replace only the affected lines if the picture does not change | Replacing the `semi`, `llm`, `no-token` tiers without confirmation |
| No token or an unclear role | Create a proposal record (`needs-decision`) with evidence, do not invent a token, refer to the `unknown` status | Silently picking the nearest token |
| `protected` | Do not change, follow `allowed_uses` | "Improving" by best practice |
| Generated code, third-party widgets, CMS content | Do not touch, record as a source | Automatic edits |

A rule conflict is resolved from top to bottom: law and accessibility (escalation to a human) → `protected` → decisions in the log → canon → local code → default best practice.

**Mechanisms against the spread of legacy** [inference]:
1. A map of zones and `exemplars` in a short `BRAND.md`: only what the agent will not infer on its own, since long files cost more and give no gain per Gloaguen's data.
2. Legacy marks right in the code and in import paths.
3. A hook or lint on changed lines right after an edit, with a message that contains the way to fix and a link to the decision.
4. A ratchet in CI as independent insurance: the agent must not be the only check on itself.
5. Planned background PRs that reduce legacy, so new copies are found less often in context.
6. Testing the skill on a repository with an intentional "trap": a bad sample next to it, and a task about a new component. Metric: the share of new off-canon values with the mechanism and without it.

### Gaps
- I found no controlled experiments on the influence of neighboring code on following design tokens. This is the main void: it is worth closing with our own eval before claiming advantages.
- It is unknown which form of mark is most effective for agents: a comment, an import path, a map file, or a hook.

---

## 7. A staged brownfield onboarding process [inference]

The whole scheme is a proposal based on the sources above and has not been tested in this form. The principle: **first record, then decide, then freeze, and only then change the picture.** The client team's work does not stop at any stage.

| Stage | The agent does | The human decides | Outputs | Exit condition |
|---|---|---|---|---|
| **0. Frame** | Builds a list of surfaces (marketing, app, documentation, emails, presentations), repositories, stacks, existing tokens. Determines whether login is needed | Who owns each domain; what is in scope. They log in themselves and provide a test session by hand; the agent gets no passwords | `surfaces.yaml`, `owners.yaml` | Owners assigned |
| **1. Observed** | A runtime snapshot by surface + theme + authorization pairs; a static analysis with file and line; defined and used tokens; history through git and Wayback; a draft inventory. Records the quality of the run: session accepted, fonts loaded, what degraded | Looks at samples to check it is the right product | `observed.json`, screenshots, a log of limitations | Values have provenance; the unmeasured is marked as missing |
| **2. Declared** | Brings PDFs, Figma, tokens, presentations, templates to a single form with a date and author | Hands over the materials; marks the outdated ones | `declared.json` | Sources are dated |
| **3. Conflict registry** | Matches observed against declared. Automatically flags only mechanics: twins at ΔE <1, single-page values, unused tokens. For roles, proposes options with evidence and alternatives; may refuse | Nothing yet | `conflicts.md`: screenshots side by side, signals, an option, confidence, a question | Every conflict is phrased as a question |
| **4. Interview and decision session** | Runs the interview (section 5), shows the registry, records decisions, flags candidates for an unbranded test | **The main decision:** the status of each value: canon, tolerated with a deadline, deprecated with a replacement, forbidden, protected with a rationale. A skip leaves `unknown` | `decisions.log`, `protected.yaml` | Key roles decided; the disputed has a deadline |
| **5. Encoding** | Tokens: `primitive`, `semantic`, `legacy alias`; DTCG with `$deprecated` and `$extensions` for provenance. An old → new table with a tier: deterministic, semi, needs-decision, no-token. A short `BRAND.md`, zones, exemplars | Reviews `semi` and the mappings, especially sizes and scales, confirms the samples | Tokens, `mapping.json`, `BRAND.md`, `zones.yaml` | Correspondence confirmed on examples |
| **6. Freeze** | `error` with a baseline, legacy marks, a check of added lines, a hook for the agent, a VR baseline of key screens in a stable environment, initial metrics | What blocks now and what is only observed; who approves exceptions | Lint config, suppressions, an exception path, an initial report | **Old code does not fail, a new violation fails** |
| **7. Migration without changing the picture** | Small PRs by domain, deterministic only, preserving the resulting value; no partial application. The VR diff must be zero | Merge, spot checks | PRs, updated metrics | Zero diff or an analyzed cause |
| **8. Intentional changes** | Separate PRs for decisions: first merge twins, then accessibility, then brand changes. Each PR links to a decision; `protected` is not touched | Approves each visible change; chooses the order and rollback | PRs with before and after screenshots, an entry in the log | Visible changes are tied to decisions |
| **9. Ratchet and closure** | Removes suppressions, deletes legacy aliases, raises strictness by domain, opens planned PRs, re-extracts and checks the live site | Deadlines, extension of `tolerated`, canon changes only through the log | A report: token coverage by domain, homebrew, off-token in prod, new violations by agents, age of exceptions | Coverage grows, exceptions do not age |

**A shortened path for a small team** [inference, hypothesis]: stages 0–1 on one marketing page and one app screen; stages 3–4 in one session; stages 5–6 in minimal form. Stages 7–9 go along the way, when code is touched, as at Harvey. The freeze and the decision log stay mandatory, because they are what gives the effect when agents work.

**Where a human is always required**: the choice of canon, `protected`, an intentional visible change, a conflict of brand with accessibility, logging in to closed systems, a deviation from `decisions.log`.

---

## What to take

1. **The separation of `observed`, `declared`, `decided`** with a decision log. The tools read here have nothing like it: they mix observation and conclusion in one value [inference; compare with the results on brandsystem-mcp and impeccable from the neighboring track].
2. **Refusal as a normal outcome:** `decision: refused` and `inconclusive` from dembrandt, "a missing measurement stays missing" from designlang.
3. **Uncollapsed signals:** count, area, page coverage, role, declared name, age. Plus the `ranking` with reasons from designlang and the `semanticEvidence` from dembrandt.
4. **The SLDS autofix tiers** (deterministic, semi-deterministic, llm, no-hooks) and a fallback that keeps the value.
5. **Refusal of partial application** and the separation of commits from polaris-migrator.
6. **Atlassian's `token('')`:** do not guess the semantics of a color, require a choice. Change spacing automatically only on an exact match.
7. **A `DO NOT COPY` mark plus an external ratchet** plus a check of added lines.
8. **Property-aware rules** (Primer), a warning about base tokens, `reportNeedlessDisables`.
9. **Coverage by domain** from Polaris `coverage` and `deadline`, `goal` from Betterer.
10. **A live check** against the nearest token from dembrandt (`--tokens`, `--max-off-token`, `inconclusive`). Use the ΔE values of 1 for merging and 2.3 for matching as starting values, not as truth.
11. **Measuring time through `wayback-css` and git** as evidence of intent, missing from current extractors.
12. **Frost's inventory session** as a form of the conflict registry and the **`protected` status** based on the fame and uniqueness grid.
13. **Linter messages as instructions for the agent** with the name of the action and a selection criterion.

## What to avoid

1. Taking an extractor's output for a brand book. Even the best primary-color result in the author's data is 71% on 17 sites.
2. Treating frequency, area, or `--brand` as intent. None of the rules has earned the right to be an authority.
3. Appointing a "winner" in advance among the PDF, Figma, or prod. All of them diverge, and seniority depends on the domain.
4. Extracting only public marketing and calling the result the product; taking a login page on the same host for a successful session.
5. Collapsing at ΔE 15 before a human decides: the conflicts that had to be shown disappear.
6. Mixing a technical replacement and a change of appearance in one PR.
7. Letting AI assign the nearest token without checking semantics or scale: the Zalando example with "medium" and "large" shows this clearly.
8. Introducing new rules only as `warn`, relying only on a per-file counter or on prose in `AGENTS.md`/`BRAND.md`.
9. Bloating context files with repository overviews: per Gloaguen's data this is expensive and does not raise success.
10. Applying anti-slop or best-practice rules to a brand on a single sign and without a `protected` list.
11. Tying to one framework and React-only metrics: the Polaris archive is a reminder.
12. Using `--stealth` and bypassing protections. [dembrandt offers such a mode with a caveat about permission](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/README.md#L120) [README]; for our product, the client's own sites and a session the client opened personally are enough [inference].
13. Promising numbers based on vendor cases. Coinbase is not about brownfield, Harvey shows a plan, and Zalando does not disclose the measurement method.

## Open questions

1. How much does neighboring bad code affect token compliance in current agents, and which protection actually reduces the effect? Our own eval with traps is needed.
2. Which ΔE values and clustering thresholds suit a conflict registry on real clients? For now there are only the values of the tool authors.
3. How can we reliably determine that a session was accepted if the redirect to login does not change the host and the app serves a stub?
4. How do we separate A/B variants, client themes, and white label during extraction?
5. How do we run an unbranded test for a small B2B company with a small base, and will it be excessive?
6. What to do when nobody in the company can make the decision, or the founder and marketing disagree? Are escalation rules needed?
7. What counts as the source of truth for tokens for a small team: Figma or code? The sources disagree, and there are no data for choosing.
8. How do we link a runtime value to a file and line with CSS-in-JS and a build without source maps?
9. Which set of metrics works outside React, including web components, Vue, server templates, and Tailwind?
10. How do we extract a brand from presentations and other non-web materials, and what role should they play in the decision about canon?
11. How often should `protected` be rechecked, and who initiates the review?
