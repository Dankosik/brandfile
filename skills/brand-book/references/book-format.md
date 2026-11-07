# Book Format

`BRAND.md` is one Markdown file that agents read directly. Write headings and text in the brand's language. Keep labels, ids, and the words in the `use` column as shown, in Latin: `node brand/tools/brand.mjs build` finds things by them.

The script reads the header, the section labels, and four tables by column position, so column titles can be in any language. Raw HTML in prose shows as text; put live markup in `{#samples}`.

## Skeleton

The header is flat `key: value` lines, not YAML: no nesting, no quotes.

```markdown
---
name: Exact brand name
language: ru
version: draft
date: 2026-11-07
owner: Who decides when the brand changes, and how to reach them
---

# <Name>: brand book

One line: read "<start heading>" before work people will see.

## <Start here> {#start}
## <Name> {#name}
## <Meaning> {#meaning}
## <Decisions> {#decisions}
## <Logo> {#logo}
## <Color> {#color}
## <Type> {#type}
## <Layout> {#layout}
## <Voice> {#voice}
## <Samples> {#samples}
## <Not decided> {#open}
## <Changing the brand> {#change}
```

## Sections

All twelve are required, in this order. For a deferred element, keep its section with one line: what is deferred and the event that brings it back.

| Label | What it holds |
|---|---|
| `{#start}` | A table of the two or three real tasks: task, what to read, which sample. The words of obligation and what they mean: must, must not, should, should not, may. The five to ten rules that apply to everything. In existing code: new files follow the book; edits to old files keep the local structure with a minimal diff and no unasked redesign; when no value fits, say so instead of taking the nearest. Where existing code contradicts the book, leave it unless asked and list each place in the final reply with the file and the book's id, so the owner sees the gap. When the book has no answer: decide by the nearest rule, say so, and suggest adding it. When rules conflict: law and accessibility first, and they reach a person; then what must not be improved; then the book; then local code. |
| `{#name}` | The brief's Name: exact spelling, forbidden forms, the form in another alphabet, and the dated record of any check. |
| `{#meaning}` | The brief's Meaning, one screen at most. |
| `{#decisions}` | The brief's Founder's decisions, each with what it rules out and when it may be reopened ("only by the owner" is an answer). The style options the person turned down, with their reason, so agents do not drift back to them. Gaps between what the founder says and what customers say go to `{#open}`. |
| `{#logo}` | The logo table. Five to nine wrong uses, each with its reason. With no logo, one row with `—` as the file and a line on what to do meanwhile. |
| `{#color}` | The color table, then the pairs table. Values no longer in use, as old and new. |
| `{#type}` | The type table, then sizes and line heights as a short list or a later table. Why a second family exists, if there is one. |
| `{#layout}` | The first screen, spacing and grid in numbers, density, which section patterns belong and which do not, what changes with the task, images. |
| `{#voice}` | The brief's Voice, with a check for each principle. |
| `{#samples}` | Two or three working samples. See below. |
| `{#open}` | Assumptions with the facts behind them. Open questions with your recommendation and what they affect. Deferred elements with their events. It must survive losing the brief. |
| `{#change}` | Only the owner decides brand changes; agents propose. An exact value or wording that nothing else depends on: edit `BRAND.md`, raise the minor version and the date in the header, add a line to `CHANGELOG.md` (what, why, what people using the brand must do), run `node brand/tools/brand.mjs build`. When a person corrects a result ("we don't write like that"), propose turning it into a rule. A change that reverses something in `{#decisions}` or brings back what it turned down goes ahead only when its reopen condition is met or the owner asks, and updates `{#decisions}` in the same edit. Anything else: `/brandfile`. |

## Tables

The script reads the first table of a section; in `{#color}`, the first two. Give every value a lowercase id with the prefix shown: people name things on the page by these ids.

**`{#color}`, first table: colors**

| Column | Content |
|---|---|
| id | `color.accent`. A second theme is just more ids: `color.dark.paper` |
| value | `#rrggbb` |
| role | What it is for, not what it looks like |
| in code (optional) | The name in this project: `--primary`, `bg-brand-500` |

**`{#color}`, second table: pairs.** List every pair agents may use; a pair not listed is not allowed.

| Column | Content |
|---|---|
| id | `pair.body` |
| text | Color id or hex |
| background | Color id or hex |
| use | `text` (4.5:1), `large` (3:1, from 24 px, or about 18.5 px bold), `ui` (3:1, components and meaningful graphics), `decor` (no minimum; logos and decoration, never text people must read) |
| contrast | Two decimals, from `node brand/tools/brand.mjs contrast "#111111" "#ffffff"` |

Only solid colors can be measured. Text over a gradient, photo, or transparency is not a pair: describe it in prose and have the person look.

**`{#type}`: type**

| Column | Content |
|---|---|
| id | `type.display`. The first row also sets the page's title |
| family | Family name |
| role | What it sets |
| license | `OFL-1.1`, the seller and license type, or `unknown` |
| fallback | CSS fallback, such as `Arial` |
| file | Path under `assets/`, or `—`. Several allowed: `assets/a.woff2 400, assets/b.woff2 700, assets/c.woff2 400 italic`. A variable font: `assets/v.woff2 100-900` |

**`{#logo}`: logo**

| Column | Content |
|---|---|
| id | `logo.main`, `logo.mono` |
| file | Path under `assets/`, or `—` |
| background | Color id, hex, or `—` |
| min size | With units: `24 px`. In px, the page also shows it at that size |
| clear space | Tied to the mark: `1/2 of the mark's height`, never "generous" |

## Samples

Agents copy samples, so use real words from the brief and their own texts, with no invented numbers, reviews, or quotes. A fenced block marked `html` in `{#samples}` is what agents read and also renders live on the page, sandboxed with no scripts. Open it with a comment naming it, so `{#start}` can point to it. Put other samples, such as an email, in a block marked `text`.

On the page, ids become CSS variables inside samples: `color.accent` is `var(--color-accent)`, `type.body` is `var(--type-body)`. At the top of the section, say how these map to the project, usually through the "in code" column.

```html
<!-- sample.booking -->
<button style="background:var(--color-accent);color:var(--color-paper)">Book</button>
```
