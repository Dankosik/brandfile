# brandfile

Agent skills for creating an AI-native brand book: one written first for agents to read and follow.
You and your agent make it together. The skills start by interviewing you about your brand and product
and asking for references you like, and you get a page that shows how the brand book looks.

Status: the first version is written, but no skill has been run on a real brand yet. Nothing here is
evidence that it works.

## Install

You need [Node 20+](https://nodejs.org) and nothing else. Install all five skills: they hand the work
to each other, and a missing one stops it at that stage.

```bash
npx skills add Dankosik/brandfile --skill '*' -g
```

This uses the [skills](https://skills.sh) installer and puts the skills into Claude Code, Codex, Cursor,
and the other agents it finds; `-a claude-code`, `-a codex`, and so on limit it to the ones you name.
Without `-g`, they go into the current project only.

To update, run `npx skills update -g`, or `npx skills update` in the project. Releases are tagged
`vX.Y.Z`. To stay on one, install from `Dankosik/brandfile@v0.1.0`: updates then keep that release, and
you move to the next by installing its tag the same way.

To work on brandfile itself, link the skills from a clone into Claude Code, so edits apply at once:

```bash
mkdir -p ~/.claude/skills && for d in "$PWD"/skills/*; do ln -sfn "$d" ~/.claude/skills/; done
```

## Run

Open a new session in your product's repository and type `/brandfile`, or just ask for a brand book.
Everything is saved in `brand/`, so you can stop anywhere and come back in another session.

You stop three times:

1. Confirm that the agent understood your brand and what to keep or change.
2. Choose a style in words, from a sheet of directions shown on your real material. Skipped if you are
   keeping what you have.
3. Accept a page that shows the brand and how an agent did real tasks with it and without it.

You get `brand/BRAND.md`, which agents read; `brand/index.html`, which you look at; and a line in
`AGENTS.md` or `CLAUDE.md` so agents find it. The book works without these skills installed, and
`node brand/tools/brand.mjs build` rebuilds the page.

The system does not draw logos, check work agents produce, or add hooks or CI. See
[docs/decisions.md](docs/decisions.md).

## Layout

- `skills/` holds the skills: the entry `brandfile`, then `brand-interview`, `brand-directions`,
  `brand-book`, and `brand-probe`.
- `skills/brandfile/scripts/` holds the one program behind them. Test it with `node --test test/`.
- `docs/decisions.md` records the product decisions.
- `docs/research/` holds the research reports and architecture behind the skills.
- `docs/skill-authoring.md` describes the skill format.

## Prior art

The idea of a skill that makes a brand kit for agents to use comes from
[GoldLegendW80/brand](https://github.com/GoldLegendW80/brand) (MIT), though brandfile has no separate
skill for using the kit. `brand-directions` and `brand-interview` rework several of its ideas in their
own words: tracing each choice to a fact, breaking category codes, the non-obvious true trait. The
interview draws on `grilling` from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). The
skill format draws on that repository and on
[Dankosik/rust-service-template-rest](https://github.com/Dankosik/rust-service-template-rest) and
[Dankosik/go-service-template-rest](https://github.com/Dankosik/go-service-template-rest) (both MIT).
Their `AGENTS.md` and instruction rules also shaped how a book's agents report where code contradicts
it, how recorded decisions are reopened, how skills are changed, and the skill shape test.

## License

[MIT](LICENSE)
