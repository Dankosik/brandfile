# Source-of-truth formats for the brand book: DESIGN.md, DTCG, toolchain

Snapshot date: 2026-11-06. Tags: [code] verified in code, [README] claimed in documentation, code does not confirm it or it was not checked, [test] a test exists (behavior or structure is noted), [external] independent or primary external source, [inference] my conclusion.

Pinned SHAs: design.md `1ed38aa9`, community-group `882ebd67`, style-dictionary `795233d9`, terrazzo `519ee07b`, stitch-skills `0337446d`, awesome-design-md `fcc70284`, impeccable `c3bb418e`, open-design `87a4f91c`, brandsystem-mcp `eab3927a`, GoldLegendW80/brand `e2f2f4de`, dembrandt `90e2691a`, shadcn-ui/ui `d549251b`.

Limits of the method: the code of the clones was only read, nothing was run. CLI behavior is inferred from reading the sources, not from a run. Pages read through WebFetch arrived as paraphrases (Figma, Google, shadcn).

Main conclusion for the report [inference]: no candidate works as the single file. Token values are best kept in DTCG 2025.10. Everything DTCG cannot express (voice, logos, usage rules) goes in a schema of our own, and DESIGN.md is generated as a view the agent can read. The reverse direction, from DESIGN.md to DTCG, loses too much and currently produces invalid DTCG.

## 1. DESIGN.md: format, linter, CLI, tests, boundaries, status

### Takeaway
DESIGN.md is YAML tokens plus prose that the agent reads as context. The linter checks only the file itself, and nothing checks the generated code. The format is in alpha status, and the maintainer deliberately does not extend the tokens: categories beyond the minimum go into prose.

### Cited Findings

**Format**
- [README] The file has two layers: tokens (YAML front matter or fenced `yaml` blocks inside sections) and prose. The tokens are declared normative values — [spec.md L8](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L8), [L17-L22](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L17-L22).
- [code] Parser: `unified` + `remark-parse` + `remark-frontmatter`. It collects `yaml` nodes and code blocks with the language `yaml`/`yml`, headings only H2, and merges the blocks into one object — [parser/handler.ts L32-L74](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.ts#L32-L74), [L140-L187](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.ts#L140-L187).
- [README] Token schema: `version`, `name`, `description`, `omitted`, `colors`, `typography`, `rounded`, `spacing`, `components` — [spec.md L84-L99](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L84-L99).
- [README] Color: hex, named, `rgb/hsl/hwb`, `oklch/oklab/lch/lab`, `color-mix`. The spec allows only px, em, rem as dimensions — [spec.md L103-L125](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L103-L125).
- [README] Typography: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation` — [spec.md L115-L123](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L115-L123).
- [README] Eight sections in a canonical order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts — [spec.md L146-L153](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L146-L153).
- [README] Components: a map from name to sub-token, with 8 allowed properties. Variants and states are separate keys such as `button-primary-hover`, and the spec leaves the choice between them to the agent. The section is marked as evolving — [spec.md L351-L381](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L351-L381).
- [README] Philosophy: "The token values serve as context and are not rendering instructions" ([PHILOSOPHY.md L42](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L42)). The claim that quality depends more on describing intent than on exact values remains an opinion: the repository has no evals ([L17](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L17)).

**Linter rules (all 11, registry in [rules/index.ts L31-L43](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/index.ts#L31-L43)) [code]**

| Rule | Severity | What it actually checks | Code |
|---|---|---|---|
| `broken-ref` | error (sub-token: warning) | Unresolved references only inside `components`; an unknown sub-token is a warning | [broken-ref.ts L22-L45](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/broken-ref.ts#L22-L45) |
| `missing-primary` | warning | Colors exist, `primary` does not | [L21-L29](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/missing-primary.ts#L21-L29) |
| `contrast-ratio` | warning | WCAG 4.5:1, only `backgroundColor`/`textColor` pairs in one component; no 3:1 and no large fonts | [L19-L45](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/contrast-ratio.ts#L19-L45) |
| `orphaned-tokens` | warning | A color is not used by any component; Material 3 families are excluded, colors only | [L26-L100](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/orphaned-tokens.ts#L26-L100) |
| `token-summary` | info | Token counters | [L22-L36](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/token-summary.ts#L22-L36) |
| `missing-sections` | info | No `spacing` or `rounded` when colors exist | [L21-L40](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/missing-sections.ts#L21-L40) |
| `missing-typography` | warning | Colors exist, typography does not | [L23-L36](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/missing-typography.ts#L23-L36) |
| `section-order` | warning | Order of H2 sections, first violation | [L28-L59](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/section-order.ts#L28-L59) |
| `unknown-key` | warning | Typo in a top-level key, Levenshtein distance at most 2 | [L21-L58](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/unknown-key.ts#L21-L58) |
| `token-like-ignored` | warning | An unknown key looks like tokens and will be dropped by the export | [L79-L99](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/token-like-ignored.ts#L79-L99) |
| `omitted-rules` | info/warning | Unknown or extra entry in `omitted` | [L21-L66](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/rules/omitted.ts#L21-L66) |

- [code] Outside the rules, errors come from the model: invalid color, units, collisions between flat and nested names, nesting depth, a color where a font belongs, an unknown typography property — [model/handler.ts L57-L136](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L57-L136), [L337-L440](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L337-L440).

**CLI [code]**
- Four commands: `lint`, `diff`, `export`, `spec` — [index.ts L29-L34](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/index.ts#L29-L34).
- `lint`: JSON with findings and summary, exit 1 only when errors > 0 — [lint.ts L50-L56](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/commands/lint.ts#L50-L56).
- `diff`: added/removed/modified across five groups by comparing JSON. A regression is only a rise in the number of errors or warnings. It does not compare prose, although [README L73](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/README.md#L73) promises prose regressions — [diff.ts L59-L83](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/commands/diff.ts#L59-L83).
- `export`: `css-tailwind`, `json-tailwind`, `tailwind`, `dtcg`, `css-vars` (the last is not in the README table). Exit 0 regardless of linter findings — [export.ts L20](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/commands/export.ts#L20), [L124-L127](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/commands/export.ts#L124-L127).
- `spec`: prints the spec and the rules table, in markdown or JSON, for pasting into a prompt — [spec.ts L39-L78](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/commands/spec.ts#L39-L78).
- `fixSectionOrder` exists in the library but is not wired up as a CLI command — [fixer/handler.ts L18-L62](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/fixer/handler.ts#L18-L62).
- Custom rules are available only through the API (`LintOptions.rules`); the CLI has no config — [lint.ts L25-L28](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/lint.ts#L25-L28). The configurable linter with rule packs promised for 2026-06-15 ([comment #74](https://github.com/google-labs-code/design.md/pull/74#issuecomment-4712517667)) had not appeared in the code as of this date.

**Mismatches between spec and code [code]**
- The spec says broken YAML and a duplicate top-level key reject the file ([spec.md L417-L418](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L417-L418)). The parser marks them `recoverable: true` ([handler.ts L150-L158](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.ts#L150-L158), [L167-L174](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.ts#L167-L174)), and `lint()` turns that into a single warning with `errors: 0` ([lint.ts L64-L85](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/lint.ts#L64-L85)). Result: CI running `design.md lint` passes on unreadable YAML, and `export` gives an empty result with exit 0.
- Duplicate section heading: the spec requires rejection, there is no check. A search for `duplicate` across `packages/cli/src` found only tokens and YAML keys.
- The spec promises to keep the original color format on export ([spec.md L111](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L111)), but `ResolvedColor` has no source string ([model/spec.ts L35-L45](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/spec.ts#L35-L45)), and all exporters take `hex`.
- A broken reference in `colors.*` produces no finding: phase 2 simply skips what is unresolved ([model/handler.ts L141-L159](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L141-L159)), and `broken-ref` looks only at components.
- A reference in a typography property (`fontSize: "{spacing.md}"`) silently drops out: no value and no finding ([model/handler.ts L399-L423](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L399-L423)).
- `spacing` accepts any CSS unit (`%`, `vh`) and a number without a unit. The first goes into the model unchecked. The second stays only in the symbolTable and is not exported ([L123-L136](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L123-L136)).
- `version` is parsed ([parser L214](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.ts#L214)) but is not passed to the model ([L212-L225](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L212-L225)) and is not validated. In practice there is no file versioning.
- The linter does not read prose: `DesignSystemState` holds only headings ([model/spec.ts L72-L89](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/spec.ts#L72-L89)). The `{colors.x}` references in prose that [PHILOSOPHY.md L36](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L36) recommends are not checked, and neither is a hex mismatch between prose and YAML ([#16](https://github.com/google-labs-code/design.md/issues/16) is open; the PR for the `prose-token-leak` rule [#167](https://github.com/google-labs-code/design.md/pull/167) is closed, and the rule is not in the registry).

**Tests**
- [test, behavior] 315 cases in 39 files (counted by regex over `it(`/`test(`). Most are unit tests of rules and the model on synthetic state, for example [handler.test.ts L57-L75](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/linter/handler.test.ts#L57-L75).
- [test, structure] The parser tests check the parser's error code, but not that the CLI fails afterward ([parser/handler.test.ts L129-L141](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/parser/handler.test.ts#L129-L141)). `fixture.test.ts` holds basic field checks.
- [test, behavior, locks in a defect] A test explicitly expects incomplete typography to be exported without the required fields ([dtcg/handler.test.ts L195-L215](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.test.ts#L195-L215)).
- [code] The only compatibility test with an external tool, Terrazzo, is under `test.skip` ([conformance.test.ts L24-L27](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/conformance.test.ts#L24-L27)), and its fixture avoids the problem cases (`letterSpacing: 0px`).
- Negative searches [code]: `ajv|jsonschema|json-schema|validate(` across the CLI found nothing, so the DTCG output is not checked against the official JSON Schema. `playwright|puppeteer|computed|getComputedStyle|jsdom|postcss|babel|.tsx|.jsx|screenshot` across `packages/cli/src` and package.json: 0 matches. The dependencies are only citty, remark/unified, yaml, zod ([package.json](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/package.json)), with no LLM SDK. There are no evals of generation quality.

**What lies outside the format**
Search of [docs/spec.md](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md) [code]: `logo`, `imagery`, `photo`, `illustration`, `tone`, `motion`, `animation`, `dark`, `mode`, `breakpoint`, `responsive`, `shadow`, `icon`: 0 matches. `voice`: 1, an incidental word in a typography example.

| Area | Status | Source |
|---|---|---|
| Voice, content rules | No; a prose-only PR is open, with no reply | [PR #183](https://github.com/google-labs-code/design.md/pull/183) |
| Logos, imagery | No section; no proposals in the titles of open issues and PRs | negative search of the spec and the titles of [open issues](https://github.com/google-labs-code/design.md/issues) |
| Motion | Only a free-form key and prose; tokens rejected | [PHILOSOPHY L90-L110](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L90-L110), [#74](https://github.com/google-labs-code/design.md/pull/74#issuecomment-4712517667), [PR #182](https://github.com/google-labs-code/design.md/pull/182) open |
| Dark mode, themes | No; the maintainer supports the idea, PR not merged | [#13](https://github.com/google-labs-code/design.md/issues/13#issuecomment-4362034517), [PR #128](https://github.com/google-labs-code/design.md/pull/128) |
| States | Only key names | [spec.md L357](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L357), [#17](https://github.com/google-labs-code/design.md/issues/17) |
| Shadows, elevation | Prose only, no tokens | [spec.md L294-L307](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L294-L307), [PR #163](https://github.com/google-labs-code/design.md/pull/163) |
| Icons | A prose-first section under discussion | [#101](https://github.com/google-labs-code/design.md/issues/101) |
| Rationale | Exists, it is the prose itself, but without structure | [PHILOSOPHY L21](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L21) |
| Multiple files in a project | The spec does not define this | [#63](https://github.com/google-labs-code/design.md/issues/63) |

**Enforcement**
- [code] Nothing is checked against generated output: `lint` accepts only DESIGN.md. [Issue #181](https://github.com/google-labs-code/design.md/issues/181) asks exactly this question (checking the rendered page against the tokens with Playwright), and the maintainers have not answered. [PR #80](https://github.com/google-labs-code/design.md/pull/80) with an HTML preview was rejected: the CLI is limited to conversion, validation, and linting.
- [external] A real case of false safety: a clean lint presented as WCAG AA conformance, while the CSS has pairs below 4.5:1 — [#116, comment from 2026-11-03](https://github.com/google-labs-code/design.md/issues/116).

**Status**
- [code] `version: alpha` ([spec-config.yaml L19](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/spec-config.yaml#L19)). Package 0.4.1 in the repository, npm latest at the time of the query 0.4.0 from 2026-07-27 ([npm](https://www.npmjs.com/package/@google/design.md)). Releases: 0.1.0 from 2026-04-21, then 0.2.0, 0.3.0, 0.4.0 ([releases](https://github.com/google-labs-code/design.md/releases)).
- [external] 28.7k stars, 40 open issues and PRs, 1.37M npm downloads in 30 days ([npm API](https://api.npmjs.org/downloads/point/last-month/@google%2fdesign.md)). This signals demand, not effectiveness, and the downloads include CI and `npx`.
- [external] Announcement: Google opened a draft of the spec on 2026-04-21. The claim that agents understand the purpose of a color is a vendor statement — [Google blog](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/).
- [external] The maintainer refused tokens for motion, textTransform, and 9 CSS sub-tokens, citing PHILOSOPHY — [#49](https://github.com/google-labs-code/design.md/pull/49), [#89](https://github.com/google-labs-code/design.md/pull/89).

### Inferences
- [inference] The slogan "tokens are normative" and the position "tokens are context" conflict: tokens cannot be relied on as a contract, because the authors of the format do not promise that themselves.
- [inference] The exit code of `lint` cannot serve as a CI gate without post-processing: you have to parse the JSON and count parser messages as errors.
- [inference] For a product meant to make the agent follow the file, DESIGN.md gives only a reading instruction. The whole control layer would have to be built by us.

### Gaps
- Plans for the configurable linter and the timing of `imports` are not published, only maintainer comments exist.
- The CLI was not run, following the research rules, so behavior on broken YAML is inferred from the code.

## 2. DTCG: status, types, modes, boundaries

### Takeaway
The claim of a stable 2025.10 version holds up, but it is a Final Community Group Report, not a W3C Standard. There is no newer version. The spec is strong on typed values and aliases. Modes are moved into a separate module, Resolver. The spec has no usage rules, voice, logos, or layout.

### Cited Findings

**Status**
- [code] The published version is a Final Community Group Report of October 28, 2025, not a W3C Standard and not on the Standards Track. The Candidate Recommendation label is applied as a signal of readiness for implementation, and the text declares itself stable — [TR/2025.10/format/index.html L237](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/www/src/pages/TR/2025.10/format/index.html#L237), [L311-L345](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/www/src/pages/TR/2025.10/format/index.html#L311-L345). Confirmation at W3C: [announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/), [CG-FINAL](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/).
- [code] Version 2025.10 is the newest in the README table, the rest are editor's drafts — [README L100-L103](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/README.md#L100-L103). The sources in `technical-reports` remain `CG-DRAFT` ([format/index.html L14](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/index.html#L14)).
- [external] After 2025-10-28, `technical-reports` has only example fixes and clarifications, plus a JSON Schema resolver (#356) — [commits](https://github.com/design-tokens/community-group/commits/main/technical-reports). A test suite was added separately ([#413](https://github.com/design-tokens/community-group/pull/413), 2026-09-08). A third-party site mentions a "draft preview from May 7, 2026": it matches commits #406 and #408 of the same date, so this is a rebuild of the draft, not a new version [inference]. A search for an announcement of a version newer than 2025.10 found nothing.
- [test, structure] The official test suite has 220 format cases and 30 resolver cases. These are sets of valid and invalid files for checking schemas and third-party implementations. Such files do not by themselves check mode resolution or tool output [inference] — [test-suite/README.md](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/test-suite/README.md).
- [external] The 2025.10 JSON Schema has known holes: values of tokens with an inherited `$type` are not validated ([#439](https://github.com/design-tokens/community-group/issues/439)), and references to `$root` are rejected ([#448](https://github.com/design-tokens/community-group/issues/448)). So the schema alone is not enough for validation.

**Model**
- [code] 13 types in the schema: color, dimension, fontFamily, fontWeight, duration, cubicBezier, number, strokeStyle, border, transition, shadow, gradient, typography — [tokenType.json](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/tokenType.json).
- [code] Strictness: `dimension` allows only px or rem ([types.md L54](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/types.md#L54), [dimension.json L24](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/values/dimension.json#L24)). `typography` requires all 5 fields ([typography.json L64-L70](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/values/typography.json#L64-L70)). `lineHeight` is a number only ([composite-types.md L649](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/composite-types.md#L649)). Requests to relax these are open: [`em` #390](https://github.com/design-tokens/community-group/issues/390), [letterSpacing #417](https://github.com/design-tokens/community-group/issues/417).
- [code] The Color module: 14 color spaces, `components`, `alpha`, `hex` as a 6-digit fallback — [color-type.md L9-L16](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/color/color-type.md#L9-L16), [color.json L59-L66](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/values/color.json#L59-L66).
- [code] Aliases: `{group.token}` for a whole token and a JSON Pointer `$ref` at the property level. Chains are allowed, cycles are forbidden — [aliases.md L16-L49](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/aliases.md#L16-L49), [L154](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/aliases.md#L154).
- [code] Groups: `$description`, `$type`, `$extends`, and `$root` — [groups.md L15](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/groups.md#L15), [L62-L70](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/groups.md#L62-L70), [L144-L146](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/groups.md#L144-L146).
- [code] `$description` is a plain string. Tools may use it but are not required to. `$deprecated` exists — [design-token.md L90-L99](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L90-L99), [L194](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L194).
- [code] `$extensions`: a vendor key with arbitrary JSON. Tools must preserve other parties' data, and authors are advised not to put anything there that is critical for understanding the value. Teams may use it too, not only vendors — [L157-L160](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L157-L160), [L184-L190](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L184-L190).
- [code] The format is JSON, with the extensions `.tokens` and `.tokens.json` — [file-format.md](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/file-format.md).

**Modes and themes**
- [code] The Format module has no modes. Resolver defines `sets`, `modifiers` with `contexts`, and `resolutionOrder`. A later entry overrides an earlier one, and aliases are resolved after merging — [syntax.md L5-L15](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/resolver/syntax.md#L5-L15), [L73-L111](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/resolver/syntax.md#L73-L111), [resolution-logic.md L90](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/resolver/resolution-logic.md#L90).
- [code] The number of results equals the product of the contexts of all modifiers, so 4×3×2 gives 24 resolutions — [L197-L206](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/resolver/syntax.md#L197-L206).

**What cannot be expressed**
- [code] A search for `rationale|voice|tone|imagery|image|logo|icon|iconography|layout|grid|breakpoint|illustration|photograph|guideline|usage` across `technical-reports/format`, `resolver`, `color-type.md`: the matches are incidental (the logo of the spec site, a group named `Layout`, `layout` in an alias example, "Rationale" as the justification of the spec's own decision). There are no normative concepts.
- [code] The File type for assets appears only in an informative list of possible types and is not adopted — [types.md L210-L217](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/types.md#L210-L217). There is no string type either.
- [code] Groups are arbitrary, and tools must not infer a type or purpose from them — [terminology.md L99](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/terminology.md#L99), [composite-types.md L126-L127](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/composite-types.md#L126-L127). Semantic roles are not expressed in a machine-readable way in the spec. There are only informative naming recommendations in [color/token-naming.md](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/color/token-naming.md).
- [code] The Out of Scope section in the charter is not filled in, it says TBD — [CHARTER.md L19-L21](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/CHARTER.md#L19-L21). [motion #429](https://github.com/design-tokens/community-group/issues/429) and [i18n #396](https://github.com/design-tokens/community-group/issues/396) are open.

### Inferences
- [inference] A usage rule can be put in `$description` or `$extensions`. This conforms to the spec, but no tool in the DTCG ecosystem can check it, apart from Terrazzo's check that a description exists.
- [inference] DTCG suits the values layer and is a poor fit as the only brand book.

### Gaps
- There are no plans for a next version in public sources. Meetings are held in Google Docs, which I did not read.

## 3. Toolchain: Style Dictionary, Terrazzo, Tokens Studio, Figma

### Takeaway
Of the tools checked, only Terrazzo implements Resolver and contains a real token linter. Style Dictionary is the most widely used but supports 2025.10 only in part and has no Resolver. Figma imports only flat types. Tokens Studio writes `$value`/`$type` but keeps modes in its own format. No tool checks code generated by an agent.

### Cited Findings

**Terrazzo** (`@terrazzo/parser` 2.10.0)
- [code] 27 lint rules: type validators, `colorspace`, `consistent-naming`, `descriptions`, `duplicate-values`, `max-gamut`, `required-children`, `required-modes`, `required-type`, `required-typography-properties`, `a11y/min-contrast`, `a11y/min-font-size` — [plugin-core/index.ts L56-L84](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/index.ts#L56-L84), [documentation](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/www/src/pages/docs/linting/index.md#L10-L38).
- [code] By default only the type validators and `consistent-naming` are on. Contrast, descriptions, and modes are opt-in — [L95-L113](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/index.ts#L95-L113), [config.ts L171-L174](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/config.ts#L171-L174).
- [code] `a11y/min-contrast` works on explicitly given pairs of tokens and supports AA and AAA and large text — [a11y-min-contrast.ts L15-L38](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/rules/a11y-min-contrast.ts#L15-L38). This is stronger than the DESIGN.md rule, which sees only pairs inside a component.
- [code] `core/required-modes` checks that tokens have modes, by glob — [required-modes.ts L47-L60](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/rules/required-modes.ts#L47-L60). `core/descriptions` requires `$description` — [descriptions.ts L28-L38](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/rules/descriptions.ts#L28-L38).
- [code] Mismatch: a comment promises px and rem for `valid-dimension`, but the default also contains `em`. Terrazzo is more lenient than the official schema — [valid-dimension.ts L22-L26](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/rules/valid-dimension.ts#L22-L26), [L50-L53](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/lint/plugin-core/rules/valid-dimension.ts#L50-L53).
- [code] Resolver is implemented: `loadResolver`, `createResolver`, permutation counting. The old `$extensions.mode` is converted into a synthetic resolver — [create-synthetic-resolver.ts L33-L47](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/resolver/create-synthetic-resolver.ts#L33-L47), [load.ts L184](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/resolver/load.ts#L184).
- [code] It preserves `$description`, `$deprecated`, `$extensions` — [parse/token.ts L79-L84](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/parse/token.ts#L79-L84). Errors are printed with a code frame, line, and column, which is convenient for an agent — [logger.ts L90-L95](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/logger.ts#L90-L95). It accepts YAML through `yamlToMomoa` — [parse/index.ts L29](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/parser/src/parse/index.ts#L29).
- [code] Import from Figma through an access token — [cli/src/import/index.ts L30-L41](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/packages/cli/src/import/index.ts#L30-L41). Plugins: css, sass, js, swift, tailwind, vanilla-extract, css-in-js, token-listing ([packages](https://github.com/terrazzoapp/terrazzo/tree/519ee07b2f947b23cd1279264bececdabd7712b8/packages)).
- [README] The claim "the only tool with full support" comes from the project itself, and the phrase about 2.0 in it is out of date — [docs/index.md L40](https://github.com/terrazzoapp/terrazzo/blob/519ee07b2f947b23cd1279264bececdabd7712b8/www/src/pages/docs/index.md#L40).
- [inference, from code] The rules receive only tokens as input. Terrazzo cannot check how tokens are used in application code.

**Style Dictionary** (5.8.0)
- [README] The documentation states plainly that support for 2025.10 is incomplete — [DTCG.mdx L13-L16](https://github.com/style-dictionary/style-dictionary/blob/795233d9bee6a7b5787d685d75d626df3399d24d/docs/src/content/docs/info/DTCG.mdx#L13-L16). The checklist in [#1590](https://github.com/style-dictionary/style-dictionary/issues/1590) is open, with resolver unchecked.
- [code] Negative search for `resolver|resolutionOrder|modifiers` (as separate words) across `lib` and `types`: 0 matches. There is no Resolver.
- [code] DTCG is detected by the presence of `$value` or `$type`, without a version check — [detectDtcgSyntax.js L9-L27](https://github.com/style-dictionary/style-dictionary/blob/795233d9bee6a7b5787d685d75d626df3399d24d/lib/utils/detectDtcgSyntax.js#L9-L27). The 2025.10 color objects are supported — [transform-utils/colors.js L14-L29](https://github.com/style-dictionary/style-dictionary/blob/795233d9bee6a7b5787d685d75d626df3399d24d/lib/common/transform-utils/colors.js#L14-L29). Units are wider than in the spec — [tokenTypes.js L4-L9](https://github.com/style-dictionary/style-dictionary/blob/795233d9bee6a7b5787d685d75d626df3399d24d/lib/enums/tokenTypes.js#L4-L9).
- [code] Control is limited to broken references and collisions through `log`, and there is no separate linter — [logging.md](https://github.com/style-dictionary/style-dictionary/blob/795233d9bee6a7b5787d685d75d626df3399d24d/docs/src/content/docs/reference/logging.md). Search for `contrast|wcag` across `lib`: 0 matches.
- [external] 9.16M downloads in 30 days, against 642k for `@terrazzo/parser` and 871k for `@tokens-studio/sd-transforms` ([npm API](https://api.npmjs.org/downloads/point/last-month/style-dictionary)). Transitive installs inflate the figures.

**Tokens Studio**
- [external] DTCG as opt-in since 2.0.0 (2024-08-13), the default format since 2.11.0 (2026-02-04) — [releases](https://github.com/tokens-studio/figma-plugin/releases).
- [external] A list of deviations from the spec is described in [#3236](https://github.com/tokens-studio/figma-plugin/issues/3236): dimension as a string, the outdated types `spacing`, `sizing`, `borderRadius`. The issue is open, last updated 2025-03-18, and I did not fully check the state of the code after that.
- [inference] A search for `colorSpace` across the repository gives 11 matches, mostly color-modification utilities, and `$themes` gives 29 matches in `src`. It looks like themes are stored in a format of their own and the plugin does not write the 2025.10 color objects. GitHub search is incomplete, so this is not proof.

**Figma**
- [external] Native import and export exist: Professional and above, DTCG JSON. Import: color (only HSL and sRGB), dimension (only px), fontFamily (one name), duration (only s), number (and boolean through `com.figma.type`), plus a non-standard string. Each file becomes a mode, and a variable is created only if the token is in all files — [Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables). Composites (typography, shadow, border, gradient) are not mentioned on the page.
- [external] Announcement at Schema 2025 on 2025-10-28 — [Figma blog](https://www.figma.com/blog/schema-2025-design-systems-recap/). On 2025-12-04 the rollout was still under way for some customers — [forum](https://forum.figma.com/ask-the-community-7/native-variable-export-feature-47831).
- [external] The Variables REST API is only for Enterprise full seats — [developers.figma.com](https://developers.figma.com/docs/rest-api/variables/).

### Inferences
- [inference] Terrazzo fits the core of our pipeline (Resolver, linter, code frame). Style Dictionary is worth supporting as a target because it is so widespread, but by feeding it files already resolved per mode.
- [inference] Figma cannot be treated as the source of truth for typography and shadows: values outside variables do not pass through native import and export. Rem tokens will also need conversion.

### Gaps
- No direct compatibility test of Terrazzo, Style Dictionary, and Figma on one file was run.
- No official statement from Tokens Studio about Resolver support was found.

## 4. Conversion losses and coexistence

### Takeaway
Exporting DESIGN.md to DTCG loses components, aliases, prose, and transparency, and some of the output violates DTCG. There is no reverse converter at all. It is better to generate DESIGN.md from DTCG.

### Cited Findings

**DESIGN.md → DTCG, per [dtcg/handler.ts](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts) [code]**

| What | What happens | Lines |
|---|---|---|
| `components` | Dropped entirely | [L41-L51](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L41-L51) |
| Aliases `{colors.x}` | Resolved to the value, the link is lost | [model L141-L159](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L141-L159) |
| Prose, Do's and Don'ts | Not passed on, no token descriptions | [L60-L69](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L60-L69) |
| `name` when `description` is present | Lost, `$description` takes one of the two | [L37-L39](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L37-L39) |
| `version`, `omitted`, free-form keys (motion and the like) | Dropped | [L33-L51](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L33-L51) |
| `fontFeature`, `fontVariation` | Dropped | [L110-L140](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L110-L140) |
| `oklch()`, `lab()` and the like | Rounded to sRGB in 8-bit steps | [L71-L81](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L71-L81), [color-parser L286-L301](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/color-parser.ts#L286-L301) |
| Alpha | There is no `alpha` field. When a<1, `hex` becomes 8-digit, which violates the [schema](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/values/color.json#L59-L66). `transparent` turns into black `components: [0,0,0]` with no alpha [inference from code] | [L71-L81](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L71-L81) |
| The `em` unit (the main example in the spec uses it) | Passes as is, although DTCG allows only px and rem | [L94-L96](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L94-L96), [spec.md L40](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L40) |
| `%`, `vh` in spacing | Same, the `unit: string` type is not restricted | [dtcg/spec.ts](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/spec.ts) |
| Nested color groups | Become keys with a dot, which DTCG forbids ([design-token.md L78-L82](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/technical-reports/format/design-token.md#L78-L82)) | [model L481-L510](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L481-L510) |
| Incomplete typography | Required fields are missing, `letterSpacing: 0px` is added on its own | [L115-L121](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L115-L121) |
| `lineHeight` in px or rem | Converted to a multiplier when fontSize is known, otherwise dropped with a warning to stderr, root taken as 16px | [L122-L158](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L122-L158) |
| Numeric spacing | Does not reach the export | [model L128-L134](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L128-L134) |
| Modes | Nothing to lose: DESIGN.md has none | see section 1 |
| The `colors` group | Becomes `color`, so reference paths do not match | [L41-L42](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/dtcg/handler.ts#L41-L42) |

- [external] A recent example: the `dtcg` output did not pass the schema it declares itself. Partly fixed by today's commit — [#172](https://github.com/google-labs-code/design.md/issues/172), [PR #177](https://github.com/google-labs-code/design.md/pull/177). The cases above remain at this SHA.
- [code] The examples in the repository diverge from the exporter: `design_tokens.json` uses `colors`, `components`, and `name` with `$type: string`, none of which is in [tokenType.json](https://github.com/design-tokens/community-group/blob/882ebd6716abef9a46d8ef5fb12e82009d6cee2e/schemas/src/2025.10/format/tokenType.json), and contains `unit: em` ([L586-L589](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/examples/paws-and-paths/design_tokens.json#L586-L589)). The example's README nevertheless calls the file compatible with token pipelines [README] ([L11](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/examples/paws-and-paths/README.md#L11)).

**Other exports [code]**
- Tailwind v3: components and `fontFeature` are lost. `fontFamily` is created for every typography token — [tailwind/handler.ts L27-L70](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/tailwind/handler.ts#L27-L70).
- Tailwind v4: any nested name fails the whole export with the error `INVALID_TOKEN_NAME` ([v4/handler.ts L18](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/tailwind/v4/handler.ts#L18), [L36-L46](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/tailwind/v4/handler.ts#L36-L46); [test, behavior] [v4/handler.test.ts L151-L157](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/tailwind/v4/handler.test.ts#L151-L157)). `fontFamily` is quoted as a whole ([L64](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/tailwind/v4/handler.ts#L64)), so the stack `Inter, sans-serif` becomes a single name [inference].
- `css-vars`: typography is not exported at all — [css-vars/handler.ts L26-L36](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/css-vars/handler.ts#L26-L36).

**DTCG → DESIGN.md**
- [code] There is no import: a search for `imports|tokens.json|fromDtcg|parseDtcg` across the CLI sources found only exporter comments and the spec's phrase about easy conversion in both directions ([spec.md L15](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L15)). By the code, the spec's promise is not kept.
- [inference, from the color model and parser] What would be lost if we wrote the converter ourselves:

| DTCG | In DESIGN.md | Loss |
|---|---|---|
| `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `xyz-*` | There is no `color()` function in the [parser](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/color-parser.ts#L95-L194) | Only through the hex fallback |
| `oklch`, `lab`, `hsl` | A CSS string | No loss, but the export then gives sRGB |
| `fontFamily` as an array | The array is silently ignored, a string is needed ([model L340](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L340)) | The font stack |
| `fontWeight: "bold"` | Number only ([L351-L373](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/packages/cli/src/linter/model/handler.ts#L351-L373)) | A mapping table is needed |
| duration, cubicBezier, number, strokeStyle, border, transition, shadow, gradient | No types; only a free-form key. The linter warns `token-like-ignored`, and the export drops it | Typing |
| `$description` | No field; it can only be moved into prose | The link between a value and its description |
| `$deprecated`, `$extensions`, `$extends`, `$ref` | None | Total |
| Resolver | None, [PR #128](https://github.com/google-labs-code/design.md/pull/128) is not merged | Only the default mode remains |
| Aliases in typography | Drop out silently | Must be resolved beforehand |

**Coexistence**
- [external] The maintainer's direction: DESIGN.md as the source of truth about intent, with values in an external file through `imports`, including DTCG, Tailwind, and `:root`. In a conflict the front matter wins — [#76](https://github.com/google-labs-code/design.md/pull/76#issuecomment-4712629482), [#13](https://github.com/google-labs-code/design.md/issues/13#issuecomment-4362034517). So far this is only an idea.
- [code] Independent projects already treat DESIGN.md as a derived file:
  - Impeccable: its own DESIGN.md says the values duplicate a CSS file and the front matter is just a portable export — [DESIGN.md L5-L7](https://github.com/pbakaus/impeccable/blob/c3bb418ee38ee49a6b999b7752c1368f3123a2bd/DESIGN.md#L5-L7). Everything the schema cannot hold (tonal scales, shadows, motion, breakpoints, component HTML, rules) lies in a sidecar — [document.md L253](https://github.com/pbakaus/impeccable/blob/c3bb418ee38ee49a6b999b7752c1368f3123a2bd/plugin/skills/impeccable/reference/document.md#L253).
  - brandsystem-mcp: `.brand/` contains DTCG `tokens.json`, policy files, and DESIGN.md as a portable brief — [README L82-L92](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/README.md#L82-L92).
  - Open Design: DESIGN.md stays prose for the agent, and compiled tokens and a manifest sit next to it — [manifest.schema.ts L6-L10](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/design-systems/_schema/manifest.schema.ts#L6-L10).
- [external] The reverse workflow also occurs: DESIGN.md as the source and a watcher that writes `root.css` — [#66](https://github.com/google-labs-code/design.md/issues/66).

### Inferences
- [inference] Yes, they can coexist, and this is the best option. Values go from DTCG into the front matter through a generator. Prose is written by hand and takes part in generation as an insert. One file must not be edited from two sides.
- [inference] The "front matter wins" rule from the maintainer's idea is dangerous for our case: it legitimizes a hidden mismatch. In our product a mismatch must be a CI error.
- [inference] The join point is modes. Until PR #128 is merged, the default mode goes into the front matter, and the agent gets the other modes from a separate file or from CSS.

### Gaps
- The exporter output was not run through JSON Schema, since running the clone's code is forbidden. The violations are inferred by comparing the code with the schema.

## 5. Comparison of candidates for the single source

### Takeaway
By the sum of criteria there is no winner. DTCG leads on values and machine checking, a schema of our own on brand coverage, DESIGN.md on reading cost and the agent ecosystem, CSS on closeness to reality. Figma and shadcn work as targets, not as a source.

### Cited Findings

The ratings below are [inference]. The grounds are given in the cells and links.

| Criterion | DESIGN.md | DTCG JSON + Resolver | Own schema (`.brand`) | CSS vars, code | Figma variables | shadcn registry theme |
|---|---|---|---|---|---|---|
| Expressiveness of values | Medium: 5 groups, no shadows or modes | High: 13 types, modes, aliases | Anything, as much as you build | High for web, almost no types | Low: 4 types, no composites | Low: string to string, light, dark |
| Intent, rationale, voice, logos | Prose without structure | Only `$description`, `$extensions` | Best: separate fields | Comments | Variable description | `docs`, `meta` |
| Machine checking | 11 rules, holes (section 1) | Schema + Terrazzo 27 rules | Zod or JSON Schema, we write it all ourselves | Direct check of code and computed styles | Plugins, REST only Enterprise | JSON Schema of the structure, values are not typed |
| Manual editing | Best | Poor for colors: 12 lines per color | Good with YAML | Good | GUI for designers | Medium |
| Reading cost for an agent | Low | High, about 4 times higher | Depends on design, can be split | Low | Needs MCP or an export | Low |
| Merge conflicts | Medium: one file, regeneration rewrites everything | Poor with manual edits, tolerable when split | Good when split | Good if the file is not generated | Outside git; an export is a snapshot | Medium |
| Ecosystem | Large among agents, alpha | Large among design tools | None | Universal | De facto designers' standard | Large in React and Tailwind |

**Grounds**
- [code, measurement] Reading cost, examples from the design.md repository (my estimate at chars/4, not a tokenizer; script `scripts-formats/measure.py`): for paws-and-paths, front matter 4134 characters (about 1030 tokens), prose 4270 (about 1070), `design_tokens.json` 16943 (about 4235) for the same 71 tokens, minified JSON 9388 (about 2350), `tailwind.config.js` 4573 (about 1140). For 47 colors, about 12 lines of JSON per color against one line of YAML. Two other examples give the same proportions. Caveat: this JSON does not match the current exporter in shape.
- [code, measurement] Real files in awesome-design-md are much larger than the canonical example: on average about 29 KB, that is about 7300 tokens (84 files, 2,466,141 bytes; my own count) — [repository](https://github.com/VoltAgent/awesome-design-md/tree/fcc70284932276d085f01ef9f83edde90b1258cb/design-md).
- [inference] Merge: nobody has published direct measurements. Grounds: lines per token, JSON commas on neighboring lines, full rewrite on regeneration, no comments in JSON. Changing a color in DTCG touches `components` and `hex` at once, which means several lines with a high chance of conflict.
- [code] An own schema, using brandsystem-mcp as the example: zod schemas for composition, patterns, illustrations, photography, anti-patterns ([visual-identity.ts L3-L38](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/src/schemas/visual-identity.ts#L3-L38)), never-say words and AI clichés ([messaging.ts L36-L54](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/src/schemas/messaging.ts#L36-L54)), voice and claims policies ([interaction-policy.ts L10-L31](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/src/schemas/interaction-policy.ts#L10-L31)). The compiler cuts off low-confidence values ([dtcg-compiler.ts L7-L10](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/src/lib/dtcg-compiler.ts#L7-L10)) and writes a non-standard root `$name` ([L21-L25](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/src/lib/dtcg-compiler.ts#L21-L25)). An analog: the `brand.json` contract in GoldLegendW80 ([README L97-L100](https://github.com/GoldLegendW80/brand/blob/e2f2f4de9f2166c744a6079ce65fbf0c14e34db9/README.md#L97-L100)).
- [code] shadcn: `cssVars.theme`, `light`, `dark` are arbitrary pairs of strings ([registry-item.json L138-L164](https://github.com/shadcn-ui/ui/blob/d549251bab2e57dbf72f7c909d6458c02c43f529/apps/v4/public/schema/registry-item.json#L138-L164)). There are `registry:theme`, `css`, `docs`, `font`, `iconLibrary`. [external] The documentation has no field for usage rules, and the examples mix value formats — [documentation](https://ui.shadcn.com/docs/registry/registry-item-json).
- [external] Figma: see section 3.
- [external] Ecosystem, GitHub code search: `$schema` with `designtokens.org/schemas/2025.10/format.json` in about 2220 files, against 408 mentions of `@google/design.md` in package.json. The figures are noisy and incomplete, but they show that 2025.10 is used in real files.
- [external] A signal on CSS: the maintainer considers `:root` an acceptable source of values ([#13](https://github.com/google-labs-code/design.md/issues/13#issuecomment-4362034517)). Impeccable uses CSS as the truth (section 4).

### Inferences
- [inference] Recommended layout:
  - `tokens/*.tokens.json` and `resolver.json`: the truth about values, checked by Terrazzo with `core/descriptions`, `core/required-modes`, `a11y/min-contrast` turned on.
  - `brand.yaml` (own schema): voice, logos, imagery, usage rules with IDs and a link to a check. The name and shape must be our own, there is no standard.
  - `DESIGN.md`: generated, front matter from DTCG, prose from author files; read first by the agent.
  - CSS vars, Tailwind `@theme`, shadcn theme, Figma import: build artifacts.
- [inference] Minimal option for one mode and a team without a pipeline: a single DESIGN.md is acceptable as a start, but without `lint` as a gate and with a plan to migrate the values to DTCG.
- [inference] Tying to an alpha schema is risky, but emitting DESIGN.md pays off: it is an entry into the agent ecosystem at a low price, because the file is derived.

### Gaps
- There are no controlled comparisons of agent generation quality across formats. The claims found rest on authors' opinions.

## 6. Who actually consumes DESIGN.md, and how

### Takeaway
The vast majority of consumers read the file as text and insert it into the prompt. Few parse the YAML, and mostly for secondary tasks. Native loading in Claude Code could not be confirmed.

### Cited Findings
- [external] Stitch: export and import of rules between projects are claimed by the vendor — [Google blog](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/). The internals are closed. The [documentation page](https://stitch.withgoogle.com/docs/design-md/overview/) returned only a title through WebFetch.
- [code] Google's own teams give incompatible file shapes. `design-md` generates 5 numbered sections without YAML ([SKILL L95-L117](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-utilities/skills/design-md/SKILL.md#L95-L117)). `extract-design-md` requires YAML ([L278-L283](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-design/skills/extract-design-md/SKILL.md#L278-L283)). `stitch-loop` tells the agent to copy Section 6 into the prompt, which does not exist in the `design-md` format ([L46](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-utilities/skills/stitch-loop/SKILL.md#L46), [L245](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-utilities/skills/stitch-loop/SKILL.md#L245)). `design-md` also does not use the canonical headings.
- [code] The consumption mechanism in `stitch-loop` is copying a block into the prompt, and there is no control of the result. `react-vite-dashboard` advises running `lint` before sending the UI ([L54-L57](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-build/skills/react-vite-dashboard/SKILL.md#L54-L57)), but that checks the file, not the UI. `react-components/validate.js` catches hex in JSX through the AST and does not read DESIGN.md ([L21](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-build/skills/react-components/scripts/validate.js#L21)). This is the fragment closest to enforcement, but it is not tied to the format.
- [code] awesome-design-md: 84 files, 74 with front matter (my count), add their own sections `Responsive Behavior` and `Iteration Guide` ([stripe L455-L486](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/stripe/DESIGN.md#L455-L486)). The README presents the format as plain markdown with no tools ([L39](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/README.md#L39)). 125k stars do not prove the quality of the result.
- [code] Impeccable: inserts the file into context as text ([CLI-CONTRACT L751](https://github.com/pbakaus/impeccable/blob/c3bb418ee38ee49a6b999b7752c1368f3123a2bd/docs/CLI-CONTRACT.md#L751)) and is the only one found that uses tokens in a detector: a purple declared in DESIGN.md turns off the AI-palette check ([L203-L205](https://github.com/pbakaus/impeccable/blob/c3bb418ee38ee49a6b999b7752c1368f3123a2bd/docs/CLI-CONTRACT.md#L203-L205)).
- [README] Open Design: every render reads the DESIGN.md of the active package as the brand contract, 151 packages — [README L238](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/README.md#L238), [L404](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/README.md#L404).
- [test, behavior] Dembrandt generates DESIGN.md and checks the output with the real linter `@google/design.md/linter`, pinned at 0.4.0 — [design-md-lint.test.ts L8-L16](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/test/design-md-lint.test.ts#L8-L16), [package.json L144](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/package.json#L144). This is a good model for our generator.
- [code] TypeUI downloads the file into the project root ([README L944](https://github.com/bergside/typeui/blob/efc5f21dff38692e4eaffc304fed465d7cb531e8/README.md#L944)). Lyse only detects its presence ([manifest-detector.ts L61](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/packages/core/src/bench/evidence-pack/manifest-detector.ts#L61)).
- [README] brandsystem-mcp claims that Claude Design reads `.brand/` natively. This is the project's own claim, not confirmed — [README L43](https://github.com/Brandcode-Studio/brandsystem-mcp/blob/eab3927a9eee5c6bada016ccf1c0bf007af696fb/README.md#L43).
- [code] Negative result: in the local clones of `anthropics/claude-code`, `anthropics/skills`, `anthropics/claude-plugins-official`, `anthropics/knowledge-work-plugins`, `vercel-labs/agent-skills`, `warpdotdev/common-skills` the string `DESIGN.md` does not occur (search `rg --hidden`, 0 files in each). The public Claude Code repository does not contain the main code of the CLI, so this does not prove there is no autoload, it only fails to confirm it. A way to connect it through CLAUDE.md or Cursor rules is described only in third-party blogs ([example](https://www.mindstudio.ai/blog/google-stitch-design-md-claude-code-consistent-ui)).
- [external] GitHub code search, very noisy because DESIGN.md often means an architecture document: a root file with `colors:` and `typography:` about 18.9k, `@google/design.md` in package.json 408, `design.md lint` in workflows 59, a mention in CLAUDE.md about 31k. Real use of the linter in CI is orders of magnitude smaller than the number of files [inference].

### Inferences
- [inference] The agent reads DESIGN.md as an instruction in natural language, so the agent can also swallow YAML errors that the linter lets through. How accurately a value is carried over depends on the model, and there is no control.
- [inference] A size of 7 thousand tokens, and the fact that the file is inserted whole, make the cost non-trivial. Reading by section and serving by task would give a gain.

### Gaps
- How exactly Stitch parses the file and how far it respects the values is unknown: the code is closed.
- How Cursor, Copilot, and others handle the file is not confirmed from primary sources.
- The Stitch page did not load through WebFetch; a second request returned only a title.

## What to take
- The two layers of DESIGN.md, value plus prose: a concrete pointer and a short list of prohibitions as the carrier of intent ([PHILOSOPHY L48-L58](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/PHILOSOPHY.md#L48-L58)). As a hypothesis, not as a proven fact.
- `{colors.x}` references in prose instead of literals, but with a check of our own, which Google lacks.
- The `omitted` field with a reason: an explicit "intentionally absent" separates a decision from forgetfulness ([spec.md L127-L136](https://github.com/google-labs-code/design.md/blob/1ed38aa9dd4451b9039f9aeb9ed1d2579edafddf/docs/spec.md#L127-L136)).
- The linter's structured JSON output and `spec --rules --format json` as an interface for the agent.
- DTCG 2025.10 as the values layer: types, aliases, Resolver, the rule to preserve others' `$extensions`.
- Terrazzo as the core of checking: `core/descriptions`, `core/required-modes`, `a11y/min-contrast` by pairs, a code frame in errors.
- The Dembrandt pattern: a test that runs our output through the real linter at a pinned version.
- The official DTCG test suite for checking our output.
- The structure of `.brand/` as an example of a split: separate files for policy, voice, and tokens.

## What to avoid
- Relying on the exit code of `design.md lint` as a gate: unreadable YAML passes with code 0.
- Using `design.md export --format dtcg` as a bridge into DTCG: it loses components, aliases, alpha, and risks an invalid file.
- Making DESIGN.md the single source with several modes or brands: the spec has no modes.
- Treating a clean lint as confirmation of WCAG: only pairs inside a component are checked.
- Duplicating values in prose without checking for mismatches ([#16](https://github.com/google-labs-code/design.md/issues/16)).
- The "front matter beats the external file" rule that the maintainer is discussing.
- Relying only on the DTCG JSON Schema: it lets through values with an inherited `$type`.
- Treating Figma as the source of truth for composites; treating stars and downloads as proof of quality.
- Editing the same file both with the generator and by hand.
- Storing render-critical values in `$extensions`: the spec advises against it.

## Open questions
- How do we tie a usage rule to a check, so the format describes not only the value but also the way to control it? None of the formats can do this.
- The shape of `brand.yaml`: should rules go into DTCG `$extensions` or into a separate file? Tentatively a separate file: voice and logos are not tied to tokens.
- What will become of DESIGN.md if PR #128 (modes), #163 (shadows), #183 (voice) are merged, and when will the promised linter config appear? There are no dates, so the generator must make it easy to change the target.
- Does a compact DESIGN.md actually give an agent better accuracy than CSS vars or DTCG? We need an eval of our own: one task, different formats, measuring deviations from the tokens.
- What amount of context is optimal: the whole file or sections served by task?
- Do we need an authoring mode in YAML compiled to DTCG JSON? Terrazzo accepts YAML, but Figma and others expect JSON.
