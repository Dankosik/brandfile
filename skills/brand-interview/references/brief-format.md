# Brief Format

The brief is `brand/work/brief.md`. `status` reads its `confirmed:` line and the Elements table, so keep the header, headings, and status words in English as shown, and write the rest in the brand's language.

```markdown
---
confirmed: no
updated: 2026-11-07
---

# Brief: <brand name>

## Readers and work
## Name
## Meaning
## Founder's decisions
## Voice
## Elements
| Element | Status | Current value and where it was found | License | Note |
|---|---|---|---|---|
| Logo | keep | public/logo.svg | Own work | |
| Color | evolve | #123456, 41 uses in src/ | | The guide says #654321 |
| Motion | later | | | Return when: regular video starts |

## References
| Source | Take | Avoid | Reason |
|---|---|---|---|
| https://example.com | Dense tables | Purple accent | "Feels like a working tool" |

## Assumptions
## Open questions
## Owner
```

A change to an accepted brand adds `scope: <what this round covers>` to the header.

## Sections

- **Readers and work.** Who uses the book, and the two or three real tasks agents will do most, concrete enough to run: "the error message when a payment fails". They become the probe tasks.
- **Name.** Exact spelling, forbidden forms, and the form in each other alphabet the brand uses. A working name is recorded as one, with an open question. A new name, or one the person asks about, gets a [name check](name-check.md).
- **Meaning.** The category. What buyers compare it with, including doing nothing. One concrete person it is for. Why they choose it, in a customer's words where you have them, with category requirements kept apart from real differences. What it is not. One sentence and one paragraph about it. In B2B, the people on the company's side who will work with the client.
- **Founder's decisions.** Three to five choices not up for discussion, each with what it rules out and what, if anything, would reopen it. Where the company came from. The tension the brand lives with, and one true trait that is not obvious. Compare what the founder says with support letters, reviews, or sales notes when they exist, and name the gaps.
- **Voice.** Who speaks: system, support, or company. How the reader is addressed, including the language's own choices, such as "ты" or "вы" and capitalization by channel in Russian. Three principles of the form "X, not Y". What is forbidden when the company erred, or when money or a complaint is involved. Three to five before and after pairs from their own texts.
- **Elements.** One row each for Name, Logo, Color, Type, Layout, Voice, and anything else that came up. Each font's and logo's license, or `unknown`.
- **References.** The table, then any conflict between their taste and what suits the brand.
- **Assumptions.** Each one, its facts, and whether they confirmed it.
- **Open questions.** Each one and what it affects; your recommendation only when it is mechanical.
- **Owner.** Who decides when the brand changes.

Every section holds decisions an agent can act on, so archetypes, personality scales, and purpose manifestos stay out.

## Statuses

| Status | Meaning | What follows |
|---|---|---|
| `keep` | Exists and stays | Goes into the book as is |
| `evolve` | Exists and needs work | Directions start from the current value |
| `open` | Missing or being replaced | Directions start from nothing |
| `later` | Not needed yet | Names the event that brings it back |
| blank | Not ruled on yet; `open` would mean replace it | `status` sends the work back to the interview |

Name is always `keep`, because nothing here proposes names. Logo is `keep` or `later`, because nothing here draws one.

For `later`, ask what is coming, not how big they are:

| Event | What it switches on |
|---|---|
| Someone else or a model writes for the company without the founder's review | Full voice page |
| First contractor or partner makes materials | Full visual system and templates |
| First journalist, partner, or integration author | External page: files, name, do and don't, contact |
| Second product with another audience or risk | Brand architecture |
| New market or language | Localization |
| Regular video, sound, or physical locations | Motion, sound, environment |
