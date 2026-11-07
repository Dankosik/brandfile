---
name: brand-directions
description: "Style directions. Use when a confirmed brand brief has elements marked open or evolve, and the person must choose how the brand looks."
---

# Brand Directions

Show a few whole **directions** that differ in how the page is built, on the brand's real material, and let the person choose by seeing. Done when `brand/work/selection.md` records a settled choice for every `open` and `evolve` element.

Run `node brand/tools/brand.mjs status` (if `brand/tools/` is missing, hand off to `brandfile`); if `next` names another skill, hand off to it. Read `brand/work/brief.md`, `brand/work/selection.md` if it exists, and `brand/BRAND.md` if a brand is accepted, since its values are what `keep` means. Read the [craft notes](references/craft.md) before choosing color and type, and the [Cyrillic font notes](references/cyrillic-fonts.md) for a brand that writes in Cyrillic.

A missing fact goes back: add the question under "Open questions" in the brief, set `confirmed: no`, and hand off to `brand-interview`.

## Ideas in words first

Your first idea is the category's **average**. Get past it in words, before any HTML:

1. Write the average in one line and set it aside.
2. Name the **category codes** from the brief's competitors and references: lead colors, type, layout, tone.
3. Write at least six one-line ideas, each starting from a different fact: a founder's decision, the tension, the non-obvious trait, a customer's phrase, a reference.
4. Run the **swap test**: with the name removed, would it fit a direct competitor? Drop those.
5. Give each survivor a **structure**: what the first screen shows, how dense it is, what leads the hierarchy, which section patterns appear, and what changes with the task. Anchor each choice to a fact in the brief; banning today's fashion only moves it.
6. Keep the ones whose structures differ most: three by default, two when little is open.

## Build each

Write one standalone HTML file per direction, `brand/work/directions/A.html` and so on. Copy [the sheet](assets/index.html) there as `index.html` and list them; it opens from disk.

- **Same real material** in every direction: their name and copy, their first screen, and the screens behind the brief's tasks, so the person compares directions, not content. Numbers, reviews, and quotes are their own; mark a missing one as a gap.
- **Repaint test:** swap the colors and fonts of two directions. If the pages would then match, rebuild one with another structure.
- `keep` elements are identical everywhere; `evolve` ones start from the current value.
- **The logo** is their file; you never draw one, even when asked. Without a file, set the name in type and label it "not a logo".
- **Voice** comes from their own good texts. If voice is `open` and they have none, show one message in each direction's voice.
- **Rationale** closes each direction: the facts and references behind it, the category code it keeps and the one it breaks, what it gives up, and which part is taste. It claims nothing about sales or recognition.

Check every text pair with `node brand/tools/brand.mjs contrast "#a" "#b"` and every font file with `node brand/tools/brand.mjs glyphs <file> <language> "<name>"`. Fonts load from `brand/work/directions/fonts/`, or from a hosted link when there is a network. Open the sheet in a browser and look at it; if you cannot, say so when you hand it over.

## Stop: they choose

Give the path `brand/work/directions/index.html`, opening it if you can. Ask which **fits** the brand, not which is nicest. They answer in words, often mixed: "B, but the type from C". Build the next sheet from that. Give your own view only when asked, with its reason, marked as yours. When their taste and the brief conflict, say so and let them settle it. On "you decide", choose, give the reason, and record it as an assumption.

After each round, write `brand/work/selection.md`, one row per element, named exactly as in the brief. Fill Choice only for what they have settled, since a filled Choice is final. In Why, keep their reason and what they turned down, with its reason. Include the values, font sources, and file paths the book will need: the next stage reads this file, not the sheet.

```markdown
| Element | Choice | Why |
|---|---|---|
| Color | B: #0B5FFF on white, with #14171F text | "Looks like a working tool". Turned down A's orange: "too much like a shop" |
| Type | C: Golos Text | Assumption: the person said "you decide" |
```

When `status` moves on, hand off to `next`.
