# Landscape: how agents are given a brand and a design system (without GoldLegendW80/brand, design.md, DTCG, brandsystem-mcp, impeccable, frontend-design, taste-skill, ui-ux-pro-max, emil, web-interface-guidelines)

Snapshot date: 2026-11-06. Tags: [code] checked in code; [README] stated in documentation or marketing, not checked in code; [test] there is a test or eval (in parentheses: behavior or structure); [external] an independent source; [inference] my conclusion. Stars and installs below count as popularity telemetry, not as proof of effectiveness.

The clones were in a temporary local folder; the SHA is baked into each permalink.

## Summary map of mechanisms

### Takeaway
The market has split into three halves that are not connected to each other: brand book generators produce a document, platforms and bridges give context read-only, and drift scanners check code but know nothing about the brand. In 13 checked repositories of brand skills and collections there is not a single mention of agent hooks or linter configs as an output of the work.

### Cited Findings

| Mechanism | How the agent gets the brand | Checking the result | Existing product | Best representative found |
|---|---|---|---|---|
| A. Design system -> agent bridge | MCP, skill, CLI, component manifest | Mostly none; Storybook has tests and a11y | Yes, it is their main scenario | Storybook MCP, shadcn skill, Atlassian ADS |
| B. Brand platforms | Read-only MCP to guidelines and assets | None, except Adobe GenStudio (closed) | Yes, if the brand is already in the platform | Frontify, Bynder, Adobe GenStudio |
| C. Generators with a design system concept | Import into the project or a skill | Lovable scans every generation; the rest check the import or nothing | Partly | Lovable, v0, Bolt |
| D. Collections and DESIGN.md extraction | A file in the repository | None | Extraction from a URL, not from intent | getdesign, Open Design, extract-design-system |
| E. Voice and copywriting | MCP, plugin, rules | Vale and StyleMCP deterministically; Markup AI as a service | Yes | Vale, Markup AI, StyleMCP |
| F. Guardrails for styles | Linter, hook, CI | Deterministic, but without knowledge of the brand | Yes, a baseline at Lyse | Lyse, ds-drift, vendor linters |
| G. Skills that create a brand book | A file after an interview or extraction | Only a check of the artifact itself | Weakly | echowang97/brandbook-skill, cofoundy/brand-skills |
| H. Measuring the effect | A benchmark | That is the check | Yes | open-design-system-bench |

- Grep over 13 repositories (cofoundy, arnabbagxd, echowang97, brandbookfy, brandbooker, pbc-os brand-identity, rampstack brand-style-guide, resend, brand-voice, typeui, awesome-design-md, stitch-skills, superdesign-skill): 0 matches for `PostToolUse|PreToolUse|Stop hook|hooks.json` and 0 for `stylelint|eslint-plugin|no-restricted|vale ` in file contents (lock files, package.json, and HTML excluded). [code; a grep check, a mention in other words is not caught]

### Inferences
- [inference] Nobody among those reviewed has built the end-to-end loop "created a brand book -> compiled it into checks -> the agent cannot finish work with a violation -> CI backs it up". This is the main unoccupied area.

### Gaps
- The catalog is not exhaustive: skill registries hold thousands of entries; I read code only for the entries named below.

## A. Design system -> agent bridges

### Takeaway
Bridges solve the task "which components exist", not "how the brand should feel". Checking the result is rare, and the only published effect figures come from the vendors themselves.

### Cited Findings

**Figma MCP + Code Connect + skills** (official).
- What: 42 tools: 18 read, 14 write, 9 Weave, 1 prompt. [README](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- Context: `get_design_context`, `get_variable_defs`, `search_design_system`, `get_code_connect_map`; the prompt `create_design_system_rules` returns a template, and the agent writes the rules after analyzing the code. [code](https://github.com/figma/mcp-server-guide/blob/19be8d51c6a2f8ca949d33e5cd8e9662c5d243e8/figma-power/steering/create-design-system-rules.md#L1-L60)
- Checking: no tool is described as an audit or lint on the tools page. [README](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) The write skill recommends checking the node structure through `get_metadata` and a screenshot; this checks "was it created", not "does it conform to the brand". [code](https://github.com/figma/mcp-server-guide/blob/19be8d51c6a2f8ca949d33e5cd8e9662c5d243e8/skills/figma-use/references/validation-and-recovery.md#L1-L40)
- Existing product: yes; the skill `figma-design-to-code` requires finding and reusing the project's components before edits ([code](https://github.com/figma/mcp-server-guide/blob/19be8d51c6a2f8ca949d33e5cd8e9662c5d243e8/skills/figma-design-to-code/SKILL.md#L20)); `figma-generate-library` can handle a scenario of reconciling code and Figma ([code](https://github.com/figma/mcp-server-guide/blob/19be8d51c6a2f8ca949d33e5cd8e9662c5d243e8/skills/figma-generate-library/SKILL.md#L1-L30)).
- Plans: remote on all plans, desktop requires a Dev or Full seat; writing to the canvas is free in beta, then paid by usage. [README](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) On Code Connect the sources diverge: an aggregator writes Organization/Enterprise, while the tools page speaks of a limit of one framework on Professional.
- Evidence: none independent found. Figma's page states that Code Connect raises quality, without figures. [README]

**Figma Make + Make kits.** A kit ties the design system's React package to `Guidelines.md`, which Make reads first; it needs React 18, Vite compatibility, and publication to npm; an admin can approve a kit and enable it by default. [README](https://developers.figma.com/docs/code/bring-your-design-system-package/) [README](https://help.figma.com/hc/en-us/articles/35946832653975-Use-your-design-system-package-in-Figma-Make) Checking the result is not described in the fragments viewed. React only.

**Storybook MCP** (`@storybook/addon-mcp`, open source).
- Context: a component manifest from JSDoc and stories, plus server instructions; the manifest has preview status. [README](https://storybook.js.org/docs/ai/best-practices)
- Checking: the test-run tool returns results and a11y. [code](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/packages/addon-mcp/src/tools/run-story-tests.ts#L49-L68) A discrepancy: in the main code the names are `preview-stories`, `get-changed-stories`, `run-story-tests` ([code](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/packages/addon-mcp/src/tools/tool-names.ts#L5-L10)), in the documentation `stories-preview`, `stories-changed`, `test-run` ([README](https://storybook.js.org/docs/ai/mcp/overview)). Do not rely on specific names.
- Existing product: yes, but Storybook is required; the docs toolset works on React frameworks, `angular-vite`, and with flags on `vue3-vite`. [README](https://storybook.js.org/docs/ai/mcp/overview)
- Evidence: the vendor claims 12.8% better code use, a 2.76 times speedup, and 27% fewer tokens on the Reshaped library; the page has no methodology. [README](https://storybook.js.org/blog/storybook-mcp-for-react/) The repository has a harness: tasks, agents, scoring by build, types, lint, tests, a11y, and a public results table. [test, behavior](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/eval/README.md#L7-L16) There is also an LLM judge over the transcript. [test, behavior](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/eval/tasks/912-fix-a11y-violations/judge.md#L1-L20) The tasks test the Storybook workflow, not the brand. [inference]
- A practical finding: a code comment says that clients truncate MCP server instructions (Claude Code at 2048 characters), so rules must be moved into tool descriptions and results. [code](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/packages/addon-mcp/src/instructions/build-server-instructions.ts#L22-L28) Another comment: agents by default grep the sources and do not reach a rule lower down in the text, so the main rule is moved to the first line. [code](https://github.com/storybookjs/mcp/blob/4589b69a081272508be2b00220f38b9d6ee488de/packages/addon-mcp/src/instructions/build-server-instructions.ts#L41-L45)

**shadcn skill, registry, MCP.**
- Context: `shadcn info --json` on every call gives the framework, the Tailwind version, aliases, and installed components; activation by `components.json`. [README](https://ui.shadcn.com/docs/skills) Principles and critical rules, including semantic colors instead of `bg-blue-500`. [code](https://github.com/shadcn-ui/ui/blob/d549251bab2e57dbf72f7c909d6458c02c43f529/skills/shadcn/SKILL.md#L22-L27)
- Checking: no lint by default, only a preview through `--dry-run` and `--diff`. A separate flow "design system from DESIGN.md or a brand spec": mapping tokens to shadcn variables, restyling `cva` variants, a showcase page with a contrast and coverage check, a check in the browser. [code](https://github.com/shadcn-ui/ui/blob/d549251bab2e57dbf72f7c909d6458c02c43f529/skills/shadcn/SKILL.md#L197-L206)
- Existing product: only if it is on shadcn. Presets pack decisions into one `init --preset` line. [external](https://dev.to/codedthemes/shadcnui-march-2026-update-cli-v4-ai-agent-skills-and-design-system-presets-1gp1)
- Evidence: none; 408,970 installs on skills.sh count as popularity. [external](https://skills.sh/shadcn-ui/ui/shadcn)
- [inference] The official flow closest to a brand among the bridges: it takes a brand spec as input and ends with a browser check, but it checks the showcase, not the agent's future changes.

**Atlassian Design System (ADS).**
- Context: skill + `@atlaskit/ads-cli` by default, `@atlaskit/ads-mcp` as a fallback path; commands `search`, `component`, `token`, `docs`, `batch`. [README](https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli)
- Checking: the ESLint rule `ensure-design-token-usage` lives separately; its link to the CLI is not described in the article. [README](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage)
- Evidence: the vendor's internal benchmark (the same agent and model, only the way of getting context changes): 352 -> 325 s and 218k -> 201k tokens per task. Reviewing transcripts revealed cases where the agent succeeded while ignoring instructions and reading the sources. [README](https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli)

**Shopify Dev MCP.** A tool for validating Polaris component code against the real schema; the official changelog confirms Polaris support in the MCP, while the name `validate_component_codeblocks` and the wording about it being mandatory come from third-party pages. [README](https://shopify.dev/changelog/posts/the-shopifydev-mcp-server-now-supports-polaris-web-components.md) [external](https://policylayer.com/tools/dev/validate-component-codeblocks) [inference] A useful pattern: a check as a tool the agent is required to call.

**Design system documentation platforms.**
- Supernova: the Editor MCP reads and writes the system (Contributor role and above), the Consumer MCP reads context and sends feedback; conformance checking is not mentioned. [README](https://learn.supernova.io/latest/design-systems/features/mcp-for-design-system-LIHAMhjr-LIHAMhjr) The vendor's comparison of servers is biased and contradicts other sources about zeroheight. [README](https://www.supernova.io/blog/design-system-mcp-servers)
- Knapsack: an endpoint per workspace; sources Storybook, workspace, Markdown; sources are unlocked through the sales team; "drift detection" is claimed as a result, the validator is not described. [README](https://docs.knapsack.cloud/intelligent-tools)
- zeroheight: search fragments of the help describe reading pages and checking style values in code against tokens with a safe replacement; direct access to the help returned 403, so the mechanism is not confirmed. [README](https://help.zeroheight.com/hc/en-us/articles/48004395674011) The competitor Supernova claims it has 4 read tools. The conflict is unresolved.
- Omlet: the home page does not mention agents or MCP; it is analytics of React component usage, with the CLI `npx @omlet/cli init`, and a move to open source is announced. [README](https://omlet.dev/) Suitable as a measuring tool, not as a bridge.

**Other.**
- `open-design-system-mcp-starter`: an MCP template; on a miss it answers that there is no such thing and names the nearest option instead of inventing one. [README](https://github.com/christophhdesign/open-design-system-mcp-starter/blob/04eaa50302b8f917fbcb99cbed5f0878ac8668b4/README.md#L7-L11) There is `src/server.test.ts`; I did not examine its content.
- Penpot: the media kit claims an open MCP server and native tokens; I did not find the official server's repository, though third-party implementations exist. [README](https://penpot.app/media-kit)
- Vendor MCPs of other systems (Primer, Chakra, Mantine, Carbon) were not checked in this iteration.

### Inferences
- [inference] Context from MCP does not solve "the agent ignored it": both Storybook and Atlassian independently record that agents bypass the intended path. So a skill needs external control.
- [inference] The CLI's gain over MCP at Atlassian is small (about 8%); the main argument there is coverage of agents without an MCP client.

### Gaps
- There are no independent data on the effect of Figma MCP and Code Connect.
- The mechanics of token checking in zeroheight are not confirmed (403).

## B. Brand platforms and AI brand governance

### Takeaway
Almost all platforms give the agent guidelines read-only and promise "on-brand" without presenting a check. The only closed conformance check found among platforms is in Adobe GenStudio, and it is closed inside the product.

### Cited Findings
- **Frontify MCP.** 52 tools, a starter discovery pack of 25 read-only tools, the other packs add writing; conformance checking is not described; connection through an admin. [README](https://help.frontify.com/en/articles/14787214-frontify-mcp-beta) The beta status is ambiguous: the URL contains beta, the page does not state the status. A competitor claims the MCP can check conformance; I found no confirmation from Frontify. [external, interested party](https://slidespeak.co/blog/figma-mcp-alternatives)
- **Bynder MCP.** Six `cxuc_*` tools (search of rules, groups, guides, sections, widgets), it needs the CX User Community and the scope `guidelines.guide:read`; there is no check tool. [README](https://api.bynder.com/page/mcp)
- **Brandfolder.** No native MCP found; the only direct source about this is the competitor Masset. [external, interested party](https://www.getmasset.com/resources/blog/brandfolder-mcp-server) Brand Intelligence is described as tagging and search of assets. [README](https://brandfolder.com/resources/new-and-next-at-brandfolder)
- **Brandfetch MCP.** `get_brand`, `get_brand_context` (voice, audience, positioning, style), `brand_search`, and others; data on external brands by domain; the source's status as an official standard is not stated. [README](https://docs.brandfetch.com/mcp/overview.md) [inference] Suitable for a quick start and reconnaissance, not for brand management.
- **Canva MCP and AI Connector.** Brand Kits and templates are applied during generation, the result is editable; checking is not described. [README](https://www.canva.dev/solutions/mcp/) The pages diverge: the connector's FAQ limits Autofill and Brand Templates to the Enterprise plan. [README](https://www.canva.com/en_in/ai-connector/)
- **Adobe GenStudio.** The content check summary shows the percentage of brand rules passed, plus platform rules and accessibility, with a Recheck score action after an edit. [README](https://experienceleague.adobe.com/en/docs/genstudio-for-performance-marketing/user-guide/guidelines/brand-validation) I found neither the way of weighting nor an API for getting the score. Firefly Custom Models are trained on the company's images. [README](https://business.adobe.com/products/firefly-business/custom-models.html) Firefly Design Intelligence is mentioned only in secondary sources. [external](https://www.constellationr.com/insights/news/adobe-expand-genstudio-launches-custom-firefly-models-firefly-foundry)
- **IntelligenceBank.** A Figma plugin that checks a design for nonconformity with guidelines; I saw only a fragment of the help. [README](https://help.intelligencebank.com/support/solutions/articles/51000516757-about-the-intelligencebank-ai-marketing-compliance-plugin-for-figma)
- **Google Pomelli.** A Google Labs experiment: from a website it builds a Business DNA (colors, fonts, voice, images), then campaigns and assets for SMBs; I found no agent interface. [README](https://blog.google/innovation-and-ai/models-and-research/google-labs/pomelli/)

### Inferences
- [inference] The "read-only MCP to a portal" pattern has become a commodity. A small team cannot stand out on it; it can consume it as one of the inputs.
- [inference] GenStudio confirms the shape of the product (a percentage, a recheck), but outside code and without open rules.

### Gaps
- The accuracy of the GenStudio check is not measured anywhere in the sources reviewed.
- Bynder Brand AI and asset checking were not found.

## C. Generators with a brand or design system concept

### Takeaway
The import of an existing system is done best in closed products. Checking every generation is claimed only by Lovable; the rest check the import or nothing.

### Cited Findings

**Lovable Design Systems.**
- Context: a separate design system project (npm, Git URL, files, or instructions); a release generates a schema and documents; components are copied to `src/design-system/<slug>/`, rules to `.lovable/rules/libraries/<slug>/`, and are read on every generation. [README](https://docs.lovable.dev/features/design-systems)
- Checking: two different loops. Setup verification checks the connection; adherence checks scan every generation for raw colors, one-off values, inline styles, and local copies of components, with a retry on violation. [README](https://docs.lovable.dev/features/design-systems) Closed, accuracy not published.
- Existing product: yes, through a library; versioning and "Update available"; a project is connected to at most one system. Plans: React libraries on all paid plans, wrapping an npm package only on Enterprise. [README](https://docs.lovable.dev/features/design-systems)

**v0 Design Systems 2.0.**
- Context: an import from GitHub, npm, Figma, links, and attachments turns into a skill, `SKILL.md`, `v0.json`, a starter; connection manually or as a default team on paid plans. [README](https://v0.app/docs/design-systems-2)
- Checking: a starter app with a preview, a pause for approval, validation of the saved skill, a re-check of the starter on update. An intent to use only verifiable components is claimed, but checking every generation is not described. [README](https://v0.app/docs/design-systems-2)
- Existing product: projects are not updated automatically, you have to ask v0. [README](https://v0.app/docs/design-systems-2)

**Bolt.** Sources: files, websites, GitHub, Storybook, NPM; it builds a Storybook inside Bolt in 45–60 minutes; the best result comes from GitHub and NPM, a documentation site gives only a theme; only the paid Team plan, 10 additions or syncs per week. [README](https://support.bolt.new/building/design-system/add-design-system) Checking the result is not described on this page. A claim that Max follows standards more precisely than Standard, without figures. [README](https://support.bolt.new/design-system/use-design-system.md)

**Claude Design (Anthropic Labs).** The design system is built at onboarding from code and files, several can be kept, with export to Canva, PDF, PPTX, HTML, and a handoff package into Claude Code; research preview as of the announcement date of April 17, 2026, Opus 4.7. There is no formal check on the page, only customer testimonials. [README](https://www.anthropic.com/news/claude-design-anthropic-labs) I did not check the current status as of November 2026.

**Google Stitch.** An official skill synthesizes `DESIGN.md` from a Stitch project through MCP as a source of truth for the following prompts. [code](https://github.com/google-labs-code/stitch-skills/blob/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-utilities/skills/design-md/SKILL.md#L1-L25) Extraction from a URL is described only in secondary sources; I could not get the body of the Stitch documentation page. [external](https://youmind.com/ar/blog/google-stitch-design-md-ai-brand-consistency) Changes to the system are not applied to finished screens automatically. [external](https://tutorialsdojo.com/?p=38720)

**Cursor.** I found no "design system" entity; there is Design Mode ([README](https://cursor.com/changelog/canvas-improvements)), project rules, and hooks (see section F).

**Replit.** Import of Figma frames and extraction of tokens in a beta chat are documented; I found no flow for importing a whole design system. [README](https://docs.replit.com/design/import-figma-designs-into-replit-design.md)

**Superdesign.** The old extension is no longer supported, and the product moved to the web. [code](https://github.com/superdesigndev/superdesign/blob/49e2b9dd9615c6dae936b326b1ddb85d4f1d6f19/README.md#L3-L14) The current skill works through a CLI to the hosted product; `superdesign init` writes the full source code of shared components and layouts into `.superdesign/init/`. [code](https://github.com/superdesigndev/superdesign-skill/blob/f9f05cd988c247dce6c072eaf9ac6b162f2ffc4b/skills/superdesign/references/INIT.md#L1-L30) There is no checking in the part read.

**Pencil.** `.pen` on JSON, MCP tools `get_style`, `read_skill`, `get_app_state`, `execute`, `save`, optionally `browser`, `spawn_agents`; there is no automatic checking on the page. [README](https://docs.pencil.dev/getting-started/ai-integration)

**Paper.** A canvas on HTML/CSS, open alpha, MCP in Desktop; the number of tools and the platforms diverge across sources; the main review was written by the competitor Banani. [external, interested party](https://www.banani.co/blog/paper-design-mcp-review) I did not read the primary documentation.

**nexu-io/open-design** (Apache 2.0). About 150 `design-systems/` directories and 171 skills. A brand directory contains `DESIGN.md`, `tokens.css`, a manifest, `components.html`. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/design-systems/stripe/tokens.css#L1-L20)
- Checking: `lint-artifact.ts`, 1000 lines of grep over HTML, 16 unique rule identifiers (for example `purple-gradient`, `raw-hex`, `accent-overuse`, `invented-metric`), and the findings go to the agent for self-correction. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/apps/daemon/src/lint-artifact.ts#L1-L18) The finding format contains a `fix` written for the agent, there is an `agentMessage` block and a `--fail-on` threshold. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/packages/contracts/src/api/artifact-lint.ts#L10-L52) Tests on rule behavior (94 `it`/`test` calls). [test, behavior](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/apps/daemon/tests/lint-artifact.test.ts)
- Limitations: saving on P0 is not blocked. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/craft/README.md#L73-L76) `raw-hex` fires only at more than 12 values outside `:root`. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/apps/daemon/src/lint-artifact.ts#L405-L428) The rules catch general signs of AI templating, not a specific brand. [inference]
- Provenance: the directories are synced from the npm package `getdesign`. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/scripts/sync-design-systems.ts#L2-L6) `brand-extract` measures a live page through the browser. [code](https://github.com/nexu-io/open-design/blob/87a4f91c308170a8270458fc40fc66a86ed69aac/skills/brand-extract/SKILL.md#L1-L40)

### Inferences
- [inference] Lovable confirms it: the split "the system is connected" versus "the generation complies with it" is worth making explicit in an open solution too.
- [inference] Bolt and v0 show that the best input for an existing product is code and packages, not documentation.

### Gaps
- Lovable's claims about scanning cannot be verified from outside: the product is closed.
- The primary documents of Paper and Stitch were not read.

## D. Collections and generated DESIGN.md

### Takeaway
Collections give someone else's look as a starting point and do not solve the task of your own brand. They are popular, but they do not publish checks of extraction fidelity.

### Cited Findings
- **VoltAgent/awesome-design-md.** 84 files; the file has YAML with `version: alpha`, but the brand name is intentionally distorted (Stripi). [code](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/stripe/DESIGN.md#L1-L5) The README in the directory points to getdesign.md. [code](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/stripe/README.md#L1-L5) 125,863 stars count as a marketing signal.
- **getdesign.md.** A catalog of 550+ marked "analysis", a paid Catalog Pass and custom private DESIGN.md files; the way of production is not disclosed, there is no affiliation disclaimer, and no other verification besides a link to the specification is described. [README](https://getdesign.md/) A fork snapshot "before the paywall" exists, which points to the dissatisfaction of part of the community (only the repository description). [external](https://github.com/Meliwat/awesome-design-md-pre-paywall)
- **bergside/typeui.** A CLI renders a design system description into skill files for different agents with a managed block, and there is a registry and MCP. The schema stores the palette and scales as free strings, for example `colorPalette: z.string()`. [code](https://github.com/bergside/typeui/blob/efc5f21dff38692e4eaffc304fed465d7cb531e8/src/domain/designSystemSchema.ts#L24-L35) The tests check the writing of the managed block, not the quality of the result. [test, structure](https://github.com/bergside/typeui/blob/efc5f21dff38692e4eaffc304fed465d7cb531e8/test/updateSkillFile.test.ts#L24-L50)
- **arvindrk/extract-design-system.** Skill + CLI + MCP on top of dembrandt. [code](https://github.com/arvindrk/extract-design-system/blob/1873741ba8dea755e35e6e15134f7918cd58e036/src/adapters/dembrandt.ts#L1-L9) The skill itself honestly calls the result a starter set, not an exact reproduction. [code](https://github.com/arvindrk/extract-design-system/blob/1873741ba8dea755e35e6e15134f7918cd58e036/skills/extract-design-system/SKILL.md#L10-L20) The `audit` command checks code against tokens, with a color distance threshold of 15. [code](https://github.com/arvindrk/extract-design-system/blob/1873741ba8dea755e35e6e15134f7918cd58e036/src/commands/audit.ts#L12-L74) There are unit tests of the matchers. [test, behavior](https://github.com/arvindrk/extract-design-system/tree/1873741ba8dea755e35e6e15134f7918cd58e036/tests) 131,159 installs on skills.sh. [external](https://skills.sh/arvindrk/extract-design-system/extract-design-system)
- **Others (description only, code not read):** `VoltAgent/awesome-claude-design`, `bergside/awesome-design-skills`, `bergside/design-md-chrome`, `kzhrknt/awesome-design-md-jp` (extends the format for Japanese UI), `Meliwat/awesome-ios-design-md`, `MohtashamMurshid/getdesign`, `Kargatharaakash/website-design-systems-mcp`.
- **Inspiration libraries.** Refero MCP: real screens and flows, a Pro subscription, 8,000 calls per month. [README](https://doc.refero.design/mcp/getting-started) Mobbin MCP: 600,000+ screens claimed, Pro and Team plans. [README](https://mobbin.com/mcp?via=aiuxplayground) These are references, not a brand.

### Inferences
- [inference] The distorted name and the word "inspired" show that the authors are aware of the trademark risk. For your own brand such a collection is useful at best as a sample of the format.
- [inference] Free strings in a schema cannot be checked by a machine. Verifiability is built in at the schema stage.

### Gaps
- None of those reviewed publishes the accuracy of extraction from a URL.

## E. Voice and copywriting

### Takeaway
In voice, the gap between "claimed" and "verified" is especially large. Vocabulary and formal features are checked deterministically; tone is left to an LLM judge, and none of those reviewed publishes its accuracy.

### Cited Findings

**Vale and style packs.**
- Mechanism: YAML rules; the Microsoft package contains 47 rules: 35 `existence`, 9 `substitution`, and one each `capitalization`, `conditional`, `occurrence`. [code](https://github.com/errata-ai/Microsoft/tree/ea5fa73c530a8413f39701b01856258c0223f101/Microsoft) An example of `substitution` with a replace action. [code](https://github.com/errata-ai/Microsoft/blob/ea5fa73c530a8413f39701b01856258c0223f101/Microsoft/Wordiness.yml#L1-L9) Level `error` on a style rule. [code](https://github.com/errata-ai/Microsoft/blob/ea5fa73c530a8413f39701b01856258c0223f101/Microsoft/Contractions.yml#L1-L9)
- The catalog contains Google, Microsoft, RedHat, Elastic, Salesforce, and `Voices` (voices as rules: against padding and evasiveness). [code](https://github.com/errata-ai/packages/blob/35e3980ab7f6781416a678bee0dd9fd03ed1c426/library.json#L214-L216) There is no package with Russian in its name in the catalog. [code]
- `tbhb/vale-ai-tells`: signs of AI text for technical documentation; the author explicitly limits applicability. [README](https://github.com/tbhb/vale-ai-tells/blob/51f646e366ba7c9dcb078ebeae345b7ff353eb3b/README.md#L1-L10) There are script rules in tengo, for example the entropy of sentence openings. [code](https://github.com/tbhb/vale-ai-tells/blob/51f646e366ba7c9dcb078ebeae345b7ff353eb3b/styles/ai-tells-experimental/SentenceStartEntropy.yml#L1-L6) Many test files and a separate document on false positives. [test, behavior](https://github.com/tbhb/vale-ai-tells/blob/51f646e366ba7c9dcb078ebeae345b7ff353eb3b/test-false-positives.md)
- A GitHub search found no tool that compiles a brand voice into a Vale package (limitation: the search covered only names and descriptions). An example of a corporate package: `coopnorge/vale-coop` (description only).

**StyleMCP** (DistinctlyDeveloped/stylemcp).
- Close to "executable brand rules" in open code: YAML packs (`voice`, `cta_rules`, `tokens`, and others), 8 industry packs. [code](https://github.com/DistinctlyDeveloped/stylemcp/blob/fb5ea98cf4ffea9c68e82b8a1ed4cc14d2849511/packs/saas/voice.yaml#L1-L25)
- Checking: regular expressions over forbidden words and do-not rules. [code](https://github.com/DistinctlyDeveloped/stylemcp/blob/fb5ea98cf4ffea9c68e82b8a1ed4cc14d2849511/src/validator/rules/voice.ts#L1-L45) A 0–100 score and a threshold. [code](https://github.com/DistinctlyDeveloped/stylemcp/blob/fb5ea98cf4ffea9c68e82b8a1ed4cc14d2849511/src/validator/index.ts#L32-L46) Rewriting goes through the Anthropic API, that is, separately from the deterministic part. [code](https://github.com/DistinctlyDeveloped/stylemcp/blob/fb5ea98cf4ffea9c68e82b8a1ed4cc14d2849511/src/rewriter/ai-rewriter.ts#L129-L150) REST, MCP, CLI, and a GitHub Action are claimed. [README](https://github.com/DistinctlyDeveloped/stylemcp/blob/fb5ea98cf4ffea9c68e82b8a1ed4cc14d2849511/README.md#L1-L14) The last commit in the clone is 2026-03-03. There is `voice.test.ts`; I did not examine its content.

**brand-voice from Tribe AI** (`anthropics/knowledge-work-plugins`, partner-built).
- Discovery across Notion, Confluence, Drive, Box, Slack, Gong, Granola, then guidelines and application; the README promises "enforceable guardrails". [README](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/partner-built/brand-voice/README.md#L1-L7)
- In fact: loading `.claude/brand-voice-guidelines.md`, a `strictness` setting. [code](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/partner-built/brand-voice/skills/brand-voice-enforcement/SKILL.md#L18-L38) Checking: a QA agent on haiku, called for important content. [code](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/partner-built/brand-voice/agents/quality-assurance.md#L26-L34) There are no tests, hooks, or evals. [code]
- The strong part: a confidence score for each section of the guidelines by the number of sources and conflicts. [code](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/partner-built/brand-voice/skills/guideline-generation/references/confidence-scoring.md#L1-L30) For ambiguities, open questions are kept with the agent's recommendation. [README] Alongside is `marketing/skills/brand-review`. [code](https://github.com/anthropics/knowledge-work-plugins/blob/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d/marketing/skills/brand-review/SKILL.md#L1-L5)

**Closed platforms.**
- Markup AI (a spin-off of Acrolinx): MCP `markupai_review`, `markupai_run_agents`, `markupai_capabilities_and_configs`; agents `style_agent`, `brand_voice`, `terminology`, and others; guides are configured in the console; the response contains a list of the agents run and a confidence for each finding. [README](https://docs.markup.ai/mcp) "Deterministic scoring" appears only in marketing, and the MCP documentation does not claim it. [README](https://gilbane.com/2025/09/introducing-markup-ai-your-enterprise-content-guardian-agent/) The service closest to a checking loop.
- Jasper: 13 tools, including `get-jasper-brand-voices`, `get-jasper-style-guides`, `generate-content`; there is no check tool. [README](https://developers.jasper.ai/docs/jasper-mcp-server)
- Writer: only `writer-sdk-mcp` as API orchestration is officially confirmed. [README](https://dev.writer.com/home/mcp-server) A `writer.governance.check` call appears only on a dubious third-party page; do not use it. [external, unreliable](https://ai-tools-devpro-com.pages.dev/ai-tools/writer-guide)
- Typeface: the MCP applies a Brand Kit during generation; checking after generation is not described on the page. [README](https://www.typeface.ai/mcp)
- Grammarly (now part of Superhuman): style guides, brand tones with on-brand and off-brand marking; I did not confirm a public API. [README](https://www.grammarly.com/business/styleguide-cs) [README](https://support.grammarly.com/hc/en-us/articles/4403544890253)

### Inferences
- [inference] A workable split: vocabulary, terms, prohibitions, and formatting can be checked deterministically; register and tone only by a judge. Current LLM checks publish neither precision nor recall.
- [inference] For Russian text, word-boundary rules and replacements without morphology will miss on cases. This needs to be tested by experiment before choosing Vale as a base.

### Gaps
- The accuracy of voice judges (Markup AI, the brand-voice QA agent) was not found anywhere.
- There are no Russian-language Vale packages in the catalog; I did not search deeply outside the catalog.
- I did not read the code of `tenfoldmarc/brand-voice-skill`, `alekhomenok/brand-voice-skill`, `mcltyl/brand-voice-skills`, `brandvoice-mcp`, `samber/cc-skills`.

## F. Guardrails: linters, hooks, CI

### Takeaway
Almost all deterministic checking is concentrated here, but it knows tokens and components, not the brand. Agent hooks as an enforcement mechanism are documented, yet I found no ready link "brand rules -> hook".

### Cited Findings

**Linters.**
- `stylelint-declaration-strict-value`: forces the use of variables, functions, or allowed values for the given properties. [README](https://github.com/AndyOGo/stylelint-declaration-strict-value/blob/ba7401895ae82c904b6e5d0418237e1fa3fc12ee/README.md#L11-L13)
- `eslint-plugin-better-tailwindcss`: `no-unknown-classes`, `no-restricted-classes`. [README](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/481c5a32737daf3bfe498d593cb1ab6bbdbb5658/README.md#L147-L149)
- Vendor linters as a sample: Primer `primer/colors` ([code](https://github.com/primer/stylelint-config/blob/0dab605c559de7a49a3357af6de9b4cf8bbfa39e/plugins/colors.js#L10-L22)), Polaris `polaris/coverage` ([code](https://github.com/Shopify/polaris/blob/3f7954ae42fabf26d63cee68c23ceebfd7ef0972/stylelint-polaris/plugins/coverage/index.js#L1-L5)), Salesforce SLDS Linter on ESLint ([README](https://github.com/salesforce-ux/slds-linter/blob/7904c5e0c18d567681d7e511e4768af480dbd8f8/README.md#L1-L12)), Atlassian `ensure-design-token-usage` ([README](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage)), MetaMask ([README](https://github.com/MetaMask/eslint-plugin-design-tokens/blob/daf6e7cd9bab3e9a47551c4cbb808c4e10695354/README.md#L1-L8)).
- `LasaleFamine/stylelint-design-tokens-plugin`: the last commit in the clone is 2023-10-05, abandoned. [code](https://github.com/LasaleFamine/stylelint-design-tokens-plugin/blob/df4657db14497b1317fa324faca73c27257986bb/README.md#L1-L5)
- [inference] Vendor linters are tied to their own system. I found no general generator of a linter config from brand tokens.

**Drift scanners aimed at AI code.**
- **lyse-labs/lyse** (AGPLv3 or commercial): a 0–100 score on 6 axes; a value is compared with the repository's own scale and classified as exact, near, novel, unresolved. [README](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/README.md#L60-L64) A baseline and a diff-first gate in CI. [code](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/packages/core/src/commands/add-ci-gate.ts#L1-L10) The git hook intentionally only advises and does not block. [code](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/packages/core/src/commands/add-git-hook.ts#L1-L10)
  - Calibration is honestly published: 8 repositories, LOO MAE 10.36 against a goal of no more than 8; Mantine is underrated by 32, Twenty by 24, shadcn by 20. [test, behavior](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/docs/architecture/calibration.md#L24-L38) [code](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/docs/architecture/calibration.md#L84-L88) Gold set: about 8k preliminary labels seeded by Claude. [README](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/docs/architecture/reliability.md#L21-L27) The recall gate blocks the build if the lower Wilson bound on a stable sub-axis falls below 0.90. [README](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/docs/architecture/reliability.md#L27)
  - Brand: in `packages/core/src/rules` there are no matches for `brand voice|brandbook|brand guideline|tone of voice`; `DESIGN.md` appears only in the benchmark module. [code, grep]
  - Risk: `lyse handoff` by default launches an agent with permission prompts bypassed. [README](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/README.md#L52)
- **dembrandt/dembrandt:** `--compare` works as a drift gate with exit 1; `--tokens` checks rendered colors, radii, and font sizes against a W3C tokens file; `--max-off-token` sets the allowed number of off-token values. [README](https://github.com/dembrandt/dembrandt/blob/90e2691af47176c600c09a956cddd2f2e82a0003/README.md#L84-L87) I did not analyze the code here; the only tool found that checks exactly the rendered values in an ordinary gate. [inference]
- **JDebDesign/ds-drift** (3 stars, a Claude Code skill): static checks without a model; API fidelity 25, token discipline 15, imports 10, a11y 10; plus an adoption metric; an honest list of what it does not check (documentation, Figma, handwritten lookalikes of components). React only with TS types. [README](https://github.com/JDebDesign/ds-drift/blob/fc6177c310724de190b75bc24538bbfc633b0e30/README.md#L35-L65) The rules are adapted from open-design-system-bench. [code](https://github.com/JDebDesign/ds-drift/blob/fc6177c310724de190b75bc24538bbfc633b0e30/NOTICE.md#L1-L10)
- **Hwani-Net/drift-guard**: a token snapshot, comparison key file + selector + property, default threshold 10. [code](https://github.com/Hwani-Net/drift-guard/blob/cd0e5a482ba8d0dde62d4276cea973ffa119dc0a/src/core/drift.ts#L13-L27) It generates rules into `CLAUDE.md`, `.cursorrules`, and other files; pre-commit. [code](https://github.com/Hwani-Net/drift-guard/blob/cd0e5a482ba8d0dde62d4276cea973ffa119dc0a/src/core/rules-generator.ts#L110) The author reports 130 tests. [README](https://dev.to/hwaninet/how-i-built-drift-guard-a-cli-to-stop-ai-agents-from-destroying-your-design-3egc) [inference] It freezes the current state and does not check conformance to intent.
- **DriftSense (Thoughtworks):** a hackathon prototype; no metrics, the split between rules and LLM is not disclosed. [external](https://www.thoughtworks.com/insights/blog/digital-innovation/how-built-driftsense-solve-ai-era-design-drift)
- **catchdrift.ai, DesignDiff:** claim gates in PRs; direct access to catchdrift returned 403, and the data come only from search fragments. [README](https://designdiff.netlify.app/)
- **sylwaninn/ds-drift:** search showed it, but the clone returned "repository not found"; treat it as unavailable.
- **atezer/FMCP:** an MCP for Figma with screen-checking tools and `figma_scan_ds_compliance` (read-only); not analyzed in full. [code](https://github.com/atezer/FMCP/blob/364c0ce6a07405f63ee34d66d1fc0003261ccae7/src/local-plugin-only.ts#L1378-L1392)

**Agent hooks.**
- Claude Code: `Stop` with exit code 2 or `decision: block` does not let the agent finish; `PostToolUse` cannot prevent the action, stderr is shown to Claude as feedback; exit code 1 does not block. [README](https://code.claude.com/docs/en/hooks)
- Cursor: `preToolUse` and other blocking hooks; `postToolUse` returns `additional_context`; `afterFileEdit` has no output fields and gives no feedback. [README](https://cursor.com/docs/agent/hooks)
- The "stylelint + PostToolUse + CI" pattern is described in an article, but I found no ready, verified package with tokens. [external](https://techarion.com/blog/design-tokens-claude-md-rules-stop-generic-ai-ui)

### Inferences
- [inference] Portability: hook semantics differ between agents, so a reliable loop is this: one CLI check command, thin adapters for each agent's hooks, and CI as the mandatory last line.
- [inference] Lyse's AGPL license limits embedding; it probably should be called as an external tool, or part of the ideas implemented independently. A legal check is needed.

### Gaps
- Visual regression tools (Chromatic, Percy, Applitools, and others) were not checked in this iteration.
- The hooks of Codex and other agents were not checked.

## G. Skills that create a brand book or identity

### Takeaway
The best architecture was found in a project with 4 stars, not in the popular sets. Almost all the other skills are document templates, and none compiles the result into checks for future changes.

### Cited Findings

**echowang97/brandbook-skill** (4 stars; the best architecture found).
- What: URL, name, screenshots, code, or description -> `design-model.yaml` as a single source -> a deterministic `brandbook.html` through a script + a handwritten landing page as proof. [code](https://github.com/echowang97/brandbook-skill/blob/ce653285d0ee167626ede5576273c8d7a1d013b6/SKILL.md#L12-L21)
- Valuable ideas: components with provenance `observed` or `derived` with a rationale; 6–10 falsifiable prohibitions; a field `ownership: own | third-party`. [code](https://github.com/echowang97/brandbook-skill/blob/ce653285d0ee167626ede5576273c8d7a1d013b6/SKILL.md#L62-L70) A split of facts and expression: colors and scales can be extracted, logos and texts cannot. [code](https://github.com/echowang97/brandbook-skill/blob/ce653285d0ee167626ede5576273c8d7a1d013b6/SKILL.md#L119-L127)
- Checking: a mandatory gate `validate.mjs`: schema fields, resolution of token references, contrast, orphan selectors, undefined variables, lorem, a notice for another party's brand. [code](https://github.com/echowang97/brandbook-skill/blob/ce653285d0ee167626ede5576273c8d7a1d013b6/scripts/validate.mjs#L25-L108)
- Gap: the gate checks the artifact itself. After delivery the agent gets only a folder of files; there is no lint, hook, or CI. No evals. [code]

**cofoundy/brand-skills.**
- What: 16 skills; the brand as a package `brand.yaml` + files, plus a registry and a package lookup contract. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/references/brand-package-spec.md#L14-L34)
- A strong idea: `brand-audit` treats documents as the declared and prod as the real, and distinguishes outdated documentation from real drift. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/skills/brand-audit/SKILL.md#L15-L21) Only one visible router skill, the rest with `disable-model-invocation` to save context. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/scripts/validate-skills.sh#L18-L30)
- Checking: `evals.json` files contain prompts and assertions; I found no runner. [test, behavior described, not executed in the repository](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/skills/brand-audit/evals/evals.json#L31-L40) `validate-skills.sh` checks only frontmatter and the manifest. [test, structure](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/scripts/validate-skills.sh#L1-L3)
- Gaps: the visual part remains a brief with proposed hex codes. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/skills/brand-identity/SKILL.md#L62-L64) Logo automation is moved to a closed layer. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/docs/adr/0001-public-private-split-and-positioning.md#L11-L18) `brand-mod` brands the Claude Code interface itself (the spinner) and does not check code. [code](https://github.com/cofoundy/brand-skills/blob/810e69db8971a3df75acf51261bd1b49a433e943/skills/brand-mod/template/hooks/hooks.json)

**arnabbagxd/Brand-building-skills.** 29 skills (brand and marketing), Markdown only, a structure validator. [test, structure](https://github.com/arnabbagxd/Brand-building-skills/blob/4a0a8b5b7a0f64bf0fc551978a18a591670a5223/validate-skills.sh#L1-L30) The names and structure resemble cofoundy; I did not check the link between them.

**pbc-os/agent-skills-public: brand-identity.** 18 documents, 19 raster assets through Gemini, 14 SVGs, DTCG tokens, Style Dictionary, Figma Tokens; it claims an agency-level result worth $100k+, which is marketing. [code](https://github.com/pbc-os/agent-skills-public/blob/725c888d668e374a107b744c855ed526ecc9e719/skills/tier-4-growth/brand-identity/SKILL.md#L5-L14) Checking comes down to the presence of files and parsing. [code](https://github.com/pbc-os/agent-skills-public/blob/725c888d668e374a107b744c855ed526ecc9e719/skills/tier-4-growth/brand-identity/SKILL.md#L259-L275) The documents are 25–100 KB each. [code](https://github.com/pbc-os/agent-skills-public/blob/725c888d668e374a107b744c855ed526ecc9e719/skills/tier-4-growth/brand-identity/SKILL.md#L281-L300) Designed for creation from scratch. [inference]

**diegoivo/brandbookfy.** Interview -> `brandbook.html`, `design-tokens.json`, `BRAND.md`. [code](https://github.com/diegoivo/brandbookfy/blob/01bade6475fbd2a1049ca5635bda99648fb9d5de/SKILL.md#L10-L28) The audit is a checklist that the model itself executes. [code](https://github.com/diegoivo/brandbookfy/blob/01bade6475fbd2a1049ca5635bda99648fb9d5de/SKILL.md#L232-L250) The global prohibitions (Inter, Roboto, a pure white background) impose taste on any brand. [code](https://github.com/diegoivo/brandbookfy/blob/01bade6475fbd2a1049ca5635bda99648fb9d5de/references/audit-checklist.md#L1-L40)

**zvorky/brandbooker.** 9 Markdown skills, including `brandbook-review` with a critical audit of an existing brand book. [code](https://github.com/zvorky/brandbooker/blob/085b7e6734ad7ba65293732d021c455bd767766e/skills/brandbook-review/SKILL.md#L1-L30) It states that the system must block violations at creation and gives a map from brand rules to tokens; there is no implementation. [code](https://github.com/zvorky/brandbooker/blob/085b7e6734ad7ba65293732d021c455bd767766e/skills/brand-governance/SKILL.md#L49-L60)

**rampstackco/claude-skills: brand-style-guide.** A template of 8 sections, it provides for documenting an existing brand and auditing the guide; Markdown only. [code](https://github.com/rampstackco/claude-skills/blob/9b90db257f7395fab76ff9bfcb808456709f6af3/skills/brand-style-guide/SKILL.md#L20-L30)

**A company's brand as a static skill.**
- `anthropics/skills/brand-guidelines`: the colors and fonts of one brand. [code](https://github.com/anthropics/skills/blob/ca45fc496a3436251f191354091d557da31c15b5/skills/brand-guidelines/SKILL.md#L1-L30) 116,406 installs on skills.sh, counted as popularity. [external](https://skills.sh/anthropics/skills/brand-guidelines)
- `resend/design-skills`: contains a ban on the Domaine font in product UI. [code](https://github.com/resend/design-skills/blob/1dd54fb1883e43ede83c5718712904bb7cb93d0e/resend-brand/SKILL.md#L32) `tests/TESTS.md` describes a manual RED and GREEN protocol: running a subagent with the skill and without; the scenarios are mostly about knowledge of facts. [test, behavior, manual](https://github.com/resend/design-skills/blob/1dd54fb1883e43ede83c5718712904bb7cb93d0e/tests/TESTS.md#L1-L40)
- `getsentry/skills/brand-guidelines` and `forcedotcom/sf-skills/experience-cms-brand-apply`: only the skills.sh listing, code not read.

**Registries only, code not read.** `claude-office-skills/skills` Brand Guidelines Generator, `travisjneuman/.claude` brand-identity, `higgsfield-ai/skills` higgsfield-brandkit, `affaan-m/ecc` brand-discovery and brand-voice, `ordinarynerds/brand-book`, `nulightjens/jensai-skills` brand-kit, `julianoczkowski/designer-skills` design-tokens. Source: the skills.sh search API on the snapshot date.

**Could not confirm.**
- `warpdotdev/common-skills/brandalf`: skills.sh showed 28,269 installs, but the current clone has no mentions of brandalf. [code, grep]
- `thefilatovigor/filatov-brandbook-skill`: the clone failed with an index-pack error; only the description is known (interview -> a personal brand PDF).

### Inferences
- [inference] The brand book skill market produces a lot of text and few verifiable rules. Format rules like "no radius larger than 12px except pill" at echowang97 can already be compiled, but the project does not do it.
- [inference] Creating a brand and auditing an existing one live in different skills and different formats: a new brand gets YAML, while a live product gets only a report.

### Gaps
- How these skills work on real tasks, nobody has published; I did not run them, under the conditions of the research.

## H. Measuring the effect

### Takeaway
I found no controlled comparison "with a brand book and without it". The methodology for it already exists, but for component libraries, not for a brand.

### Cited Findings
- **christophhdesign/open-design-system-bench.** Tasks at the intent level do not name the expected component; a matrix of system × context level × model. [code](https://github.com/christophhdesign/open-design-system-bench/blob/e88f11a697cf53ca9a31c191989ddaa63a67a05d/README.md#L9-L19) Measures: imports 0.10, apiFidelity 0.25, tokenDiscipline 0.15, a11yStatic 0.10, compile 0.10, judgment 0.30; the judge's claims are checked against the diff. [code](https://github.com/christophhdesign/open-design-system-bench/blob/e88f11a697cf53ca9a31c191989ddaa63a67a05d/README.md#L53-L70) The Lift metric: the difference "with context minus without" on matched pairs. [code](https://github.com/christophhdesign/open-design-system-bench/blob/e88f11a697cf53ca9a31c191989ddaa63a67a05d/README.md#L238-L244) An example report in the repository is on a fictional system. I found no published results on real systems. [code](https://github.com/christophhdesign/open-design-system-bench/blob/e88f11a697cf53ca9a31c191989ddaa63a67a05d/docs/reports/report-example.md#L1-L30) The word brand does not appear in the README even once. [code, grep] MIT license. [code](https://github.com/christophhdesign/open-design-system-bench/blob/e88f11a697cf53ca9a31c191989ddaa63a67a05d/LICENSE)
- **Design Systems Need Evals (Murphy Trueman).** It argues for mechanical checks plus a judge and repeated runs; there are no measurements of its own. [external](https://blog.murphytrueman.com/design-systems-need-evals/)
- **Design Theater** (arXiv 2607.22928, accepted to AAAI/AIES). 24 tasks, 120 interfaces, 5 tools; more than 25% of the stated rationales are absent from the result, 34% for functional requirements; the interfaces converge in appearance. [external](https://arxiv.org/abs/2607.22928) It does not test DESIGN.md and tokens, but shows that an agent's explanations of rule compliance cannot be trusted without a check. [inference]
- A search for controlled comparisons of DESIGN.md and tokens found only anecdotes, for example a personal experience over 30 days. [external](https://medium.com/design-bootcamp/i-used-design-md-for-30-days-with-claude-code-heres-what-actually-changed-9bf9d659ace8)
- Vendor figures: Storybook and Atlassian (see section A) are self-reports.

### Inferences
- [inference] Publishing a reproducible brand benchmark is cheaper than building one more skill, and it would immediately set the product apart: there is none now.

### Gaps
- There are no data on the accuracy of an LLM judge for assessing conformity to a brand.

## Empty spots: what nobody does well

1. **Compiling a brand book into enforcement.** Generators (section G) do not output linter configs, hooks, and CI; scanners (section F) do not read the brand book. Confirmation: a grep with zero matches over 13 repositories. [code, inference]
2. **A single verdict on visuals and voice.** Lyse and ds-drift look at code, Vale and Markup AI at text; a common report on an artifact that covers both was not found. [inference]
3. **Checking the meaning of a rule, not only the token.** "Accent only on CTA" can be checked only by a heuristic like `accent-overuse` in Open Design; the right token in the wrong place passes all scanners. [code, inference]
4. **A brand book for a live product.** Declared against live exists only as an instruction for the model at cofoundy; a baseline exists only at Lyse and is not tied to the brand. Nobody builds a brand book from code with an automatic divergence map and a migration plan. [inference]
5. **Carrying confidence over into the strictness of a check.** Provenance (`observed`, `derived` at echowang97) and confidence (brand-voice) exist, but they do not determine what to block and what to advise. [inference]
6. **Public proof of the effect for a brand.** The methodology exists (bench), but a brand application does not. [inference]
7. **Surfaces outside code.** Of what was found, checking of marketing materials is offered only by the closed GenStudio. Open Design checks HTML; for slides, emails, and PDFs I found no open brand check. [inference; the search is limited]
8. **Voice not in English.** The Vale catalog has no Russian-language package, and morphology is unsolved. [code, inference]
9. **Voice -> rules.** No tool was found that turns `voice.md` into a Vale package with tests. StyleMCP defines the format of packs, but by hand. [inference; the search is limited]
10. **Brand version and exceptions.** Lovable and v0 version inside the product; in open skills the most is a `version` field. There is no formal exception mechanism with a rationale, except WARN with a written rationale at echowang97. [code, inference]
11. **Checking the rendered result against the brand.** dembrandt checks rendered values against tokens, but only values, without composition and hierarchy. Lyse's render checks are experimental and do not affect the score ([README](https://github.com/lyse-labs/lyse/blob/1558ef27f22d07369bab6c0c8e462890a290b80b/README.md#L64)). A visual assessment "does this look like our brand" with published accuracy was not found. [inference]

## What to take

- **A single model -> deterministic compilation.** YAML as the source, a script for derived files, handwritten only where it cannot be avoided (echowang97).
- **Provenance and falsifiable prohibitions.** `observed`, `derived`, a rationale; a prohibition in a form that can be checked (echowang97). Add compilation of these prohibitions into rules.
- **Declared against live** as the first finding of an audit, and the distinction between documentation debt and drift (cofoundy).
- **Comparison with the repository's own scale**, the classes exact, near, novel, baseline, and a diff-first gate (Lyse). The idea can be taken; check the license.
- **An adoption metric and an honest list of what is not checked** (ds-drift). A file without a system passes all the rules, so adoption is mandatory.
- **Separating setup verification and adherence** plus a retry on violation (Lovable).
- **Import with a preview and approval** before saving (v0); the best inputs are code and packages (Bolt).
- **A finding with a `fix` field for the agent and a ready block for the next turn** (Open Design).
- **A tool miss returns "no such thing, the nearest is X"** (mcp-starter); a mandatory validation tool (Shopify).
- **The rule on the first line, the rest in tool descriptions and results**, because instructions get truncated (Storybook).
- **A Stop hook with exit code 2 in Claude Code, `postToolUse` with `additional_context` in Cursor, CI as the last line.**
- **Vale `existence` and `substitution` for vocabulary and terms**; a judge only for register (Vale, Markup AI as a reference point).
- **A confidence score for sections and open questions for the team** (brand-voice).
- **A benchmark:** tasks at the intent level, Lift on pairs, checking the judge's claims against the diff, reading transcripts (bench, Atlassian).
- **One visible router skill, the rest hidden** to save context (cofoundy).

## What to avoid

- **Calling a prompt enforcement.** The wording "enforceable guardrails" with a check by a haiku model on request (brand-voice) gives no guarantee.
- **Free strings instead of values in a schema** (TypeUI): they cannot be checked.
- **Freezing instead of conformance:** a key of file + selector + property blocks legitimate edits and does not know the intent (drift-guard).
- **Global taste prohibitions on top of a real brand** (brandbookfy). If they are needed, apply them only to derived decisions, as at echowang97.
- **Copying someone else's brand as a product:** legal risk and zero value for your own brand (collections).
- **Soft thresholds that let violations through:** more than 12 raw hex values before it fires (Open Design), an advisory hook with `|| true` if the goal is exactly enforcement (Lyse).
- **A single score without calibration.** Even at Lyse the error is 10.36 and mature systems are underrated by 20–32 points; the maturity level label is stronger than the data allow.
- **A multi-document output of 25–100 KB each** (pbc-os): [inference] the agent will not hold this in context; a compressed layer for the agent is needed.
- **Bypassing permissions by default when handing fixes to an agent** (`lyse handoff`).
- **Stars, installs, customer testimonials, and vendor figures as evidence.**
- **A provenance chain without verification:** Open Design syncs its directories from `getdesign`, whose way of production is not disclosed.

## Open questions

- What share of a typical brand book really compiles into deterministic checks? There are no data; a measurement on 3–5 real brand books is needed.
- How much does brand context change the result? Our own Lift measurement is needed: without context, DESIGN.md, DESIGN.md + checks.
- What is the accuracy of an LLM judge on voice rules, and how should it be computed for Russian?
- Will Vale withstand Russian morphology, or is another engine needed?
- What does token checking at zeroheight really do, and how accurate are Lovable's adherence checks? Both are closed or unavailable.
- Is Markup AI deterministic: marketing says yes, the MCP documentation is silent.
- How do hooks behave at Codex, Copilot, Windsurf? Not checked.
- Can Lyse under AGPL be used as an external dependency without obligations for the product? A lawyer is needed.
- Which plan restrictions are current for Figma Code Connect, Canva Brand Templates, and Lovable? The sources diverge.
- The status of Claude Design, Paper, and Stitch as of November 2026 is only partly confirmed; the primary documents of Paper and Stitch were not read.
- Security: the SKILL.md and AGENTS.md files in the clones were treated as data. Their instructions were not executed, nothing from the clones was run, and I met no attempts to steer me deliberately. If the team installs such skills, it is worth separately taking into account that some of them run `npx` on the latest version (for example, the Superdesign and extract-design-system CLIs).
