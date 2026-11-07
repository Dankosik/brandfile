---
name: brand-book
description: "Write the brand book. Use when the brief and style choices are settled, or an accepted brand book needs a new section or a rework."
---

# Brand Book

Write `BRAND.md`, the file agents follow, and take it to acceptance. Done when the person has accepted the page, `accept` has run, and the pointer is added or declined.

Run `node brand/tools/brand.mjs status` (if `brand/tools/` is missing or `next` is `none`, hand off to `brandfile`); if `next` names another skill, hand off to it. Read `brand/work/brief.md`, `brand/work/selection.md` if it exists, and the [format](references/book-format.md); for a book in Russian, also the [Russian notes](references/russian.md).

Write to `brand/work/candidate/BRAND.md`. For a rework, start from a copy of `brand/BRAND.md` and `brand/assets/`, and change only what the brief's `scope` covers. Send a gap back to its owner:

- a choice you cannot write as a rule: blank its Choice in `brand/work/selection.md`, put the question in its Why, and hand off to `brand-directions`;
- a missing fact: add it under "Open questions" in the brief, set `confirmed: no`, and hand off to `brand-interview`.

## Write a diff

The book is a **diff** against what a capable agent does anyway. Every line traces to something the person said or chose, or a file you found. Mark anything else as an assumption where it stands and list it in `{#open}`. Keep the book under about 3,000 words.

- **Testable rules.** Write each rule so an outsider or a script can say "violated" without asking a designer: a number or ratio tied to something measurable, such as the height of the mark. What cannot be formalized gets a pair of examples and the name of whoever decides.
- **Use first.** Open with what to use: "Use `var(--primary)` for the one action". Give a prohibition only for this brand, with its reason: a generic list of what looks machine-made only shifts the fashion and can ban the brand's own traits.
- **Structure, not just values.** Fill `{#layout}`. An axis nobody decided reads "not decided, ask the owner".
- **Constant and variable.** For each element, say what never changes, what may, and who allows an exception. Keep a quirk that is theirs, with a line saying so.
- **Turned down.** Write what was rejected beside what was chosen, with the reason.
- **No claims.** Write `unknown` for what is unknown. Promise nothing about revenue and quote no brand-consistency statistics.

## Fonts and files

Put the full file of each font the book names in `brand/work/candidate/assets/fonts/` and the logo files in `brand/work/candidate/assets/`, so `build` can check coverage and the book works away from the project. Take an open font whole from its source, such as google/fonts, with its license file beside it. For a commercial font, ask for the file they are licensed to use; with no file, write `—`.

## Build and probe

Run `node brand/tools/brand.mjs build` and fix every error. Leave the values behind warnings as they are and put each warning to the person at the stop. Write `brand/work/candidate/CHANGELOG-entry.md`: what this version decides, why, and what people using the brand must do. Then hand off to `next`; the person sees the page only once probes are on it.

Treat a stray in a probe report as a defect in the book until shown otherwise. Fix the rule, not the output, rebuild, and probe again if the fix touches what the tasks depend on.

## Stop: they accept

Give the path `brand/work/candidate/index.html`, opening it if you can. Point to the "To check" box, the assumptions in `{#open}`, and the runs side by side. Ask whether this is their brand: **fit**, not liking.

They often answer by the page's labels: "`color.accent` is too loud". Edit the candidate and rebuild, since `index.html` is generated. Send a rejected style back to `brand-directions` as above. The book is accepted when they say so; a reaction to a detail is not acceptance.

Then run `node brand/tools/brand.mjs accept` and offer the pointer. With their yes, add it in that file's language to `AGENTS.md` or `CLAUDE.md`, whichever exists, or ask which to create. If they decline, tell them agents here will not know the book exists.

```markdown
## Brand
Before work people will see (interface, copy, emails, images), read brand/BRAND.md. It also says how to change the brand.
```

Committing is their call. Tell them `brand/work/` stays out of git because the brief can hold competitors and prices, and fonts and logos in `brand/assets/` keep their own licenses.
