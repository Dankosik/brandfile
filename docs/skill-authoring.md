# Skill Authoring

How skills here are written and changed, after `writing-for-agents` in
[mattpocock/skills](https://github.com/mattpocock/skills). `node --test test/` checks the mechanical part.

## Shape

- A skill is `skills/<name>/SKILL.md`, plus `references/` or `assets/` only for what some branches
  need. Link each file where the agent needs it: an unlinked file is never read.
- `name` matches the directory: lowercase letters, digits, and hyphens, at most 64 characters.
- `description` is `<leading word>. Use when <one trigger per branch>.`, in two sentences.
- The body opens with what the skill is for and its **completion criterion**, then the steps, in at
  most 750 words.

## Writing

- **Leading word.** Name the idea with a word the model already knows (*frontier*, *control*,
  *diff*), bold it once, and repeat the word, not the explanation.
- **No-ops go.** Delete any sentence the model would follow without being told, the whole sentence
  rather than a few words.
- **Say the target.** State what to do. A prohibition is only for a hard boundary, and it comes with
  what to do instead.
- **One source.** Each meaning lives in one place. Read state from `brand.mjs status` and the files in
  `brand/` instead of retelling it.
- **Reasons, not citations.** A short reason helps the agent with an unusual case. Evidence and
  sources live in `docs/research/` and `docs/decisions.md`.
- **The person owns taste.** Ask only about what they own: taste, positioning, money, legal
  commitments. Put each question as what it changes for them, and report to them by leading with
  what changed and what they must decide.
- **Brand rules live in the book.** Agents that use the brand read only `BRAND.md`, so anything they
  must always do goes in its `{#start}`.

## Changing a skill

Change one thing at a time and prefer removing text to adding it. Rewording a rule that works costs
a review and gains nothing.

For a change meant to alter what an agent does, write in the commit message what went wrong in a real
run, what should happen instead, one case that should now go differently, and one that must stay as it
was. Then read the skills that share its trigger, to check they can still be told apart.

Tests and a read-through prove shape, not behavior. A claim that a change helped needs the same task
run before and after it, with the same model. One run on one brand is an observation, not a result.
