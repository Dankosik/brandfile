# AGENTS.md

Agent skills for creating an AI-native brand book.

- **Agents are the primary reader.** The brand book exists so agents can follow it. People need only
  a view that shows how it looks.
- **Decisions rest on an interview.** Before proposing anything, learn what the brand and product are
  and collect references the person likes. Base style choices on those answers, not on defaults.

The first version is written and has not been run on a real brand yet.
[docs/decisions.md](docs/decisions.md) records the product decisions and overrides older documents. Reports in `docs/research/` hold the reasoning and evidence
behind the skills. When another document and the skills or scripts disagree, the skills and scripts
describe the current system: follow them, and point out each mismatch in your reply. A skill that
contradicts `docs/decisions.md` is a defect to report.

In replies, commit messages, and pull request descriptions, lead with what changed for a person making
a brand book, then what the reader must decide or check. Leave out how it was done unless asked, and
never present an untested effect as tested.

## Where things go

- A skill lives in `skills/<name>/`. Read [docs/skill-authoring.md](docs/skill-authoring.md) before
  adding or editing one.
- The scripts live in `skills/brandfile/scripts/`, with Node 20+ and no dependencies. Run
  `node --test test/` after changing them or a skill.
- A research report is one Markdown file in `docs/research/`, with a source for every claim. Keep
  verified facts, practitioner opinion, and your own inference visibly separate.

## Using other projects

Ideas from other repositories are welcome. Before copying files or text, check the source's license
and credit it in the README. Fonts, logos, and other brand assets keep their own licenses, so do not
commit them without confirming the terms.
