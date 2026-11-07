---
name: brandfile
description: "Brand book entry point. Use when someone asks to create, continue, or change a brand book, or runs /brandfile."
---

# Brandfile

**Route** brand work to the skill that owns its stage. Done when you have called the skill `next` names, or, for an accepted brand, routed the change the person asked for.

1. From the project root, run `node <this skill's directory>/scripts/brand.mjs setup`. In a monorepo with no obvious root, ask where `brand/` belongs.
2. Run `node brand/tools/brand.mjs status`.
3. Tell the person in a line or two where things stand, then call the skill that `next` names.

For a new brand (`why: no brief yet`), first name the three stops ahead: confirming the brief, choosing a style if anything is open, and accepting the page. Say they can stop anywhere, since everything is saved in `brand/`, and that the logo is their own file or noted as missing, never drawn.

When `next` is `none`, the brand is accepted: ask what should change, unless they already said. An exact value or wording that nothing else depends on follows `{#change}` in `brand/BRAND.md`. Everything else goes to `brand-interview`.

If the skill `next` names is not installed, say the set is incomplete, ask them to install `brand-interview`, `brand-directions`, `brand-book`, and `brand-probe`, and stop there: each stage's rules live only in its skill.
