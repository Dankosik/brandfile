# Public brand books of startups, small companies, and young scale-ups: an audit from primary sources

Access date for all documents: 2026-11-06. Unless stated otherwise, a document is live, not archived.

Labels: [PRIMARY-SOURCE FACT] — visible in the document itself or on the company's site; [EMPIRICAL] — a study; [EXPERT OPINION]; [VENDOR] — a party that sells something; [RESEARCHER INFERENCE] — my inference. I used no studies with a sample in this pass, so there is no [EMPIRICAL] label in the notes. The counts below are my manual coding of a nonrandom sample, not an empirical study.

## 1. Which sections the documents contain (inventory across 24 companies)

### Takeaway
I read 24 sets of documents, 11 of them from small and young companies. Of these, 2 are real brand books (PostHog, GitLab) and one is a hybrid (Dodo Pizza). 15 of the 24 are logo and trademark pages or press kits, and among small companies it is 10 of 11.

### Cited Findings

#### Method and limits of access
- [RESEARCHER INFERENCE] The unit of analysis is the set of documents I managed to read, not the company. N in the matrix means "not in what I read", not "the company does not have it".
- [RESEARCHER INFERENCE] Almost all pages were read through the WebFetch tool: it returns a digest of the page text, assembled by an auxiliary model, without images. I read raw text only in two PDFs (Zapier and Figma), extracted with a local script from the files that WebFetch itself saved. Consequences: visual do/don't and logos in images may have been undercounted, and the volume in words is the tool's estimate, not a count. The exception is the Zapier and Figma PDFs, where words and pages were counted from the file.
- [RESEARCHER INFERENCE] Sites that run on client-side JavaScript return only a title: brand.zapier.com, brand.mailchimp.com, wise.design, notion.notion.site. This biases the sample against rich interactive brand books.
- [RESEARCHER INFERENCE] Group A — small and young: up to about 350 people or an early stage. Group B — those that are larger now (500 people or more), or companies with unconfirmed size that I placed here on indirect signs (Sentry, Kontur, Litres). Vercel (550), Discord (501), and Zapier (about 730) are young scale-ups on the boundary, and they are in B. Group B is in the sample because most of these companies were in the client's original list; for some of them the documents appeared when the companies were much smaller.
- [RESEARCHER INFERENCE] The sample is nonrandom: it is the original list from the assignment plus finds along the way. I searched for the voice documents (Monzo, Mailchimp, T—Zh, Sentry) on purpose, so in group B the share of voice sections is overstated.

#### Table A. Document cards
All data in the table are [PRIMARY-SOURCE FACT], except the size marked (WP): that is Wikipedia, a secondary source, used as a pointer. The "First capture" column is the earliest snapshot returned by the Internet Archive API; I could not open the snapshot itself (see section 5). It is an upper bound on the date, not the publication date. Access: Full — the full page text through WebFetch, Part — a part, Desc — only a description in other sources.

Classes: BB — brand book; HYB — hybrid; VERB — verbal guide only; DS — product design system; LOGO — logo and trademark page; KIT — press kit or asset set; PARTNER — rules for partners.

| No. | Company, group | Document | Size and stage now | First capture and size then | Format | Volume | Access | Class |
|---|---|---|---|---|---|---|---|---|
| 1 | Obsidian, A | [obsidian.md/brand](https://obsidian.md/brand) | 7 people on the page, founded in 2020, no venture money ([about](https://obsidian.md/about)) | [no snapshots](https://archive.org/wayback/available?url=obsidian.md/brand&timestamp=19960101) | web page | ~150 words | Full | LOGO |
| 2 | Ghost, A | [docs.ghost.org/logos](https://docs.ghost.org/logos/) (301 from ghost.org/design) | 42 employees, founded in 2013, ARR about $11.1 million, nonprofit ([about](https://ghost.org/about/)) | [2017-03-18](https://archive.org/wayback/available?url=ghost.org/design&timestamp=19960101) for the old address; size then not found | documentation page | ~200–250 words | Full | LOGO |
| 3 | Cal.com, A | [cal.com/brand](https://cal.com/brand) | founded in 2021, headcount not stated ([about](https://cal.com/about)) | [2026-06-18](https://archive.org/wayback/available?url=cal.com/brand&timestamp=19960101) | web page | ~80 words | Full | KIT |
| 4 | Resend, A | [resend.com/brand](https://resend.com/brand) | founded in 2022, Series A $18 million in December 2024, headcount not stated ([about](https://resend.com/about)) | [2023-06-05](https://archive.org/wayback/available?url=resend.com/brand&timestamp=19960101), that is, before Series A | web page | ~200 words | Full | LOGO |
| 5 | Linear, A | [linear.app/brand](https://linear.app/brand) | founded in 2019, headcount not stated ([about](https://linear.app/about)) | [2022-09-10](https://archive.org/wayback/available?url=linear.app/brand&timestamp=19960101); size then not found | web page | ~450 words | Full | LOGO |
| 6 | Supabase, A | [supabase.com/brand-assets](https://supabase.com/brand-assets) | 350+ people, $1 billion raised ([careers](https://supabase.com/careers)) | [2021-11-27](https://archive.org/wayback/available?url=supabase.com/brand-assets&timestamp=19960101); size then not found | web page | ~800–1000 words | Full | LOGO |
| 7 | Tailwind Labs, A | [tailwindcss.com/brand](https://tailwindcss.com/brand) | first release of the framework in 2019, headcount not stated ([WP](https://en.wikipedia.org/wiki/Tailwind_CSS)) | [no snapshots](https://archive.org/wayback/available?url=tailwindcss.com/brand&timestamp=19960101) | documentation page | ~350–400 words | Full | LOGO |
| 8 | Mastodon, A | [joinmastodon.org/branding](https://joinmastodon.org/branding) | 18 people on the team, including advisers; legal entity since 2021 ([about](https://joinmastodon.org/about)) | [2022-09-18](https://archive.org/wayback/available?url=joinmastodon.org/branding&timestamp=19960101) | web page | ~400 words | Full | KIT |
| 9 | Hugging Face, A | [huggingface.co/brand](https://huggingface.co/brand) | 250 people in 2025 (WP); the same page mentions an announced Nvidia acquisition in September 2026, which I did not check ([WP](https://en.wikipedia.org/wiki/Hugging_Face)) | [2023-02-03](https://archive.org/wayback/available?url=huggingface.co/brand&timestamp=19960101) | web page | ~400–500 words | Full | KIT |
| 10 | Buffer, A | [buffer.com/press](https://buffer.com/press) | headcount not confirmed | not checked | web page | ~250 words | Full; [resources/brand-assets](https://buffer.com/resources/brand-assets/) returned HTTP 500 | KIT |
| 11 | PostHog, A | [philosophy](https://posthog.com/handbook/brand/philosophy), [foundations](https://posthog.com/handbook/brand/foundations), [visual-identity](https://posthog.com/handbook/brand/visual-identity), [brand-assets](https://posthog.com/handbook/company/brand-assets), [style guide](https://posthog.com/handbook/content/posthog-style-guide), [writing](https://posthog.com/handbook/content/writing-for-posthog) | about 200 people in early 2026, Series E ([story](https://posthog.com/handbook/company/story)) | first commit of the brand guide [2021-12-07](https://github.com/PostHog/posthog.com/commits/master/contents/handbook/company/brand-assets.md), then 30–38 people ([story](https://posthog.com/handbook/company/story)); [snapshot 2022-01-24](https://archive.org/wayback/available?url=posthog.com/handbook/company/brand-assets&timestamp=19960101) | handbook section, sources on GitHub | from ~7100 words (1700 + 2500 + 1800 + 1100 across four pages; I did not count philosophy and brand-assets) | Full for six pages; [brand.posthog.com](https://brand.posthog.com/) — title only | BB |
| 12 | Vercel, B | [vercel.com/design/brands](https://vercel.com/design/brands), [Geist](https://vercel.com/geist/introduction) | 550 people in 2025, Series F ([WP](https://en.wikipedia.org/wiki/Vercel)) | [2021-05-11](https://archive.org/wayback/available?url=vercel.com/design/brands&timestamp=19960101) | web page and design system site | ~1000–1300 words + Geist overview ~400 | Full for the brand page, Part for Geist (overview only) | LOGO |
| 13 | Discord, B | [discord.com/branding](https://discord.com/branding) | 501 people in 2025 ([WP](https://en.wikipedia.org/wiki/Discord)) | [2020-05-04](https://archive.org/wayback/available?url=discord.com/branding&timestamp=19960101) | web page | ~500 words | Full | LOGO |
| 14 | Zapier, B | [Solution Partner Brand Guidelines](https://partnerportal.zapier.com/sys/document/open/7Ot00000000003a00hE) | about 730 people in 2025 ([WP](https://en.wikipedia.org/wiki/Zapier)) | the document itself: version 2, July 2025 | PDF | 17 pages, 2697 words | Full; [brand.zapier.com](https://brand.zapier.com/) — title only | PARTNER |
| 15 | Sentry, B | [SKILL.md](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md), [Content & Voice](https://develop.sentry.dev/frontend/sentry-voice/) | headcount not confirmed | not checked | GitHub (a skill for an agent) and the developer site | ~900 and ~950 words | Full; [sentry.io/branding](https://sentry.io/branding/) returned 403 | VERB |
| 16 | Stripe, B | [Newsroom, Media assets](https://stripe.com/newsroom/brand-assets) | 8500 people in 2025 ([WP](https://en.wikipedia.org/wiki/Stripe,_Inc.)) | not checked | newsroom section | ~1000 words of content | Full | KIT |
| 17 | Figma, B | [trademark guidelines](https://www.figma.com/using-the-figma-brand/), [Brand Book PDF](https://static.figma.com/uploads/6645755656177435f83e10b48d9947645b55a033) | 1886 people in 2025, IPO in July 2025 ([WP](https://en.wikipedia.org/wiki/Figma)) | not checked | web page and PDF | ~600–800 words; PDF: 11 slides, 686 words | Full | LOGO |
| 18 | Mailchimp, B | [brand-assets](https://mailchimp.com/about/brand-assets/), [Content Style Guide](https://styleguide.mailchimp.com/), [Voice and Tone](https://styleguide.mailchimp.com/voice-and-tone/) | bought by Intuit for $12 billion in 2021; 800+ people, undated ([WP](https://en.wikipedia.org/wiki/Mailchimp)) | voiceandtone.com — [2012-09-13](https://archive.org/wayback/available?url=voiceandtone.com&timestamp=20110101), styleguide — [2015-08-19](https://archive.org/wayback/available?url=styleguide.mailchimp.com&timestamp=19960101); size then not found | web page and multipage site | ~800–900 words + 17 sections of the guide (full volume not counted); voice ~650 words | Full for brand-assets and voice, Part for the guide (table of contents); [brand.mailchimp.com](https://brand.mailchimp.com/) — title only | VERB, plus a logo page |
| 19 | GitLab, B | [Brand on design.gitlab.com](https://design.gitlab.com/brand-introduction), [press kit](https://about.gitlab.com/press/press-kit/) | 2500+ people as of June 2026, public since 2021 ([company](https://about.gitlab.com/company/)) | not checked | multipage site | large; intro ~230, core logo ~450 words per page | Part: 4 pages read ([intro](https://design.gitlab.com/brand-introduction), [voice](https://design.gitlab.com/brand-messaging/brand-voice), [core logo](https://design.gitlab.com/brand-logo/core-logo), [resources](https://design.gitlab.com/resources)), the rest from navigation | BB |
| 20 | Monzo, B | [monzo.com/tone-of-voice](https://monzo.com/tone-of-voice/) | 5275 people in 2026 ([WP](https://en.wikipedia.org/wiki/Monzo)) | [2018-03-27](https://archive.org/wayback/available?url=monzo.com/tone-of-voice&timestamp=19960101); headcount then not found, a million customers in October 2018 (WP) | web page | ~3000 words | Full | VERB |
| 21 | Dodo Pizza (Додо Пицца), B | [brandbook.dodopizza.info](https://brandbook.dodopizza.info/) | founded in 2011; 1502 or 1700 outlets, the article disagrees with itself ([WP](https://en.wikipedia.org/wiki/Dodo_Pizza)) | [2018-08-04](https://archive.org/wayback/available?url=brandbook.dodopizza.info&timestamp=19960101); total headcount then not found | one long web page | ~3000–3500 words | Full; [Shift](https://shift.dodobrands.io/en/) unavailable (ECONNREFUSED) | HYB |
| 22 | T—Zh (Т—Ж), B | [Редполитика [Editorial policy]](https://docs.google.com/document/d/14XdGIjVJLM_FsjHzyh5ca8PkffngykzXd2bLPHzA2ME/pub) | brand media of T-Bank, 15 million readers a month ([about](https://t-j.ru/about/)); newsroom headcount not found | the document states the period 2014–2019 | Google Docs | ~9000 words | Full | VERB |
| 23 | Kontur (Контур), B | [guides.kontur.ru](https://guides.kontur.ru/), [text in the interface](https://guides.kontur.ru/principles/text/styleguide/), [how to write guides](https://guides.kontur.ru/principles/uidesigner/guides/) | headcount not confirmed | [2017-04-13](https://archive.org/wayback/available?url=guides.kontur.ru&timestamp=19960101) | multipage site | large; ~2000 and ~1300 words on the pages read | Part; [kontur.ru/brandbook](https://kontur.ru/brandbook) returned 403, [sub-brands](https://guides.kontur.ru/principles/other/sub-brands/) returned 401 | DS |
| 24 | Litres (Литрес), B | [litres.ru/cms/11127](https://www.litres.ru/cms/11127/) | headcount not confirmed | folders with the years 2022 and 2025 in file paths | page + ZIP + PDF | ~200 words; the [PDF](https://www.litres.ru/static/pr/brandbook/brandbook_litres.pdf) is over the 10 MB limit | Part: PDF not read | KIT |

#### Table B. Section matrix
Marking rules. Y — a separate section or an explicit block. P — partial: a heading without text, a paragraph, an indirect mention, details in a footer. N — not in what I read. ? — the company has a separate document that I did not read. Do/don't: Y — an explicit block or wrong/right pairs, in text or as a picture; P — separate prohibitions in prose. Clear space counts as logo, not as grid. Audience means customers, not the readers of the document. The source of each row is the links in Table A.

| Company | Mission | Posit. | Audience | Pers. | Voice | Name/gramm. | Logo | Color | Font | Imagery | Grid | Motion | Sound | Applic. | Do/don't | Legal | Files | Contact | Version |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Obsidian | N | N | N | N | N | N | Y | P | N | N | N | N | N | N | P | Y | Y | Y | N |
| Ghost | N | N | N | N | N | N | Y | Y | N | N | N | N | N | N | N | Y | Y | N | N |
| Cal.com | N | N | N | N | N | N | P | P | P | P | N | N | N | N | N | N | Y | N | N |
| Resend | N | N | N | N | N | Y | Y | N | N | P | N | N | N | N | P | P | Y | P | N |
| Linear | N | N | N | N | N | Y | Y | P | N | N | N | N | N | N | P | P | Y | Y | N |
| Supabase | N | N | N | N | N | Y | Y | Y | N | N | N | N | N | N | Y | Y | Y | N | N |
| Tailwind | N | N | N | N | N | P | P | N | N | N | N | N | N | N | Y | Y | Y | P | N |
| Mastodon | N | N | N | N | N | N | Y | Y | N | P | N | N | N | P | P | N | Y | P | N |
| Hugging Face | P | P | P | N | N | N | Y | Y | N | P | N | N | N | N | N | N | Y | P | N |
| Buffer | P | N | N | N | N | N | N | N | N | N | N | N | N | N | N | N | P | Y | N |
| PostHog | P | Y | Y | Y | P | Y | Y | Y | Y | Y | N | Y | N | P | Y | Y | Y | Y | P |
| Vercel | N | N | N | N | N | Y | Y | Y | Y | N | Y | N | N | N | Y | Y | Y | Y | N |
| Discord | N | N | N | N | N | P | Y | Y | N | P | N | N | N | N | Y | Y | Y | P | N |
| Zapier | N | N | N | N | P | Y | Y | P | P | N | N | N | N | Y | Y | Y | Y | Y | Y |
| Sentry | N | N | N | Y | Y | Y | ? | ? | ? | ? | ? | ? | ? | P | Y | ? | ? | P | N |
| Stripe | P | P | P | N | N | N | Y | P | N | P | N | N | N | P | P | Y | Y | Y | N |
| Figma | N | N | N | N | N | Y | Y | P | N | N | N | N | N | P | Y | Y | Y | Y | N |
| Mailchimp | ? | ? | ? | Y | Y | Y | Y | Y | ? | P | ? | ? | ? | ? | Y | Y | Y | P | N |
| GitLab | P | P | N | Y | Y | P | Y | Y | Y | Y | P | Y | N | P | Y | P | Y | Y | P |
| Monzo | N | N | N | Y | Y | Y | N | N | N | N | N | N | N | P | Y | N | N | N | N |
| Dodo | Y | P | Y | ? | ? | ? | Y | Y | Y | P | ? | ? | ? | Y | ? | ? | Y | ? | ? |
| T—Zh | Y | N | Y | P | Y | Y | N | N | N | P | N | N | N | P | Y | N | N | P | P |
| Kontur | P | ? | P | ? | P | Y | P | Y | Y | P | Y | P | ? | P | Y | P | Y | Y | N |
| Litres | ? | P | ? | ? | ? | ? | Y | Y | Y | P | ? | ? | ? | P | ? | ? | Y | P | P |

#### Exact sections by document [PRIMARY-SOURCE FACT]
- Obsidian: Brand, Guidelines, Icon, Logo lockup — [obsidian.md/brand](https://obsidian.md/brand).
- Ghost: Logos, Ghost colours, a legal card without a heading — [docs.ghost.org/logos](https://docs.ghost.org/logos/).
- Cal.com: Logo, Colors, Typography, Iconography, coss.com UI — [cal.com/brand](https://cal.com/brand).
- Resend: Naming, Logo, Screenshots, Questions — [resend.com/brand](https://resend.com/brand).
- Linear: Naming, Usage, Linear wordmark, Linear logo, Linear icon, Colors, a paragraph with a link to Design at Linear — [linear.app/brand](https://linear.app/brand).
- Supabase: Which file to use, Files, Colors, Downloads, Name, Usage — [supabase.com/brand-assets](https://supabase.com/brand-assets).
- Tailwind: Trademark usage agreement, Assets (Mark, Logotype) — [tailwindcss.com/brand](https://tailwindcss.com/brand).
- Mastodon: Wordmark, Mark only, Clear space, Our colors, Posters and flyers, Product screenshots — [joinmastodon.org/branding](https://joinmastodon.org/branding).
- Hugging Face: HF Logos, HF Colors, HF Bio, Hugging Face Universe — [huggingface.co/brand](https://huggingface.co/brand).
- Buffer: About Buffer, PR contact, Buffer metrics, transparency dashboard, press fact sheet — [buffer.com/press](https://buffer.com/press).
- PostHog, philosophy: The harsh truth of cat videos, Brand first, Pavlovian merch response, Breaking bad news, Karma — [philosophy](https://posthog.com/handbook/brand/philosophy).
- PostHog, foundations: Taste, Brand personality, Who we're talking to (The Hacker News test), How we describe PostHog, What we want people to know, Why people pick PostHog, What we are not — [foundations](https://posthog.com/handbook/brand/foundations).
- PostHog, visual identity: Overview, Logo, Color system, Typography, Illustration & hedgehogs, Icons, Interaction, Animation, Photography, Product screenshots, Data visualization — [visual-identity](https://posthog.com/handbook/brand/visual-identity).
- PostHog, assets: Logo and brand usage for third-parties, Briefing external vendors, Logo, Colors, Presentations, Illustration guide, Hedgehog library — [brand-assets](https://posthog.com/handbook/company/brand-assets).
- PostHog, text: General principles, Style rules, Adding media, Technical and docs writing — [style guide](https://posthog.com/handbook/content/posthog-style-guide); Who is our audience, content types, How we work, Content distribution — [writing](https://posthog.com/handbook/content/writing-for-posthog).
- Vercel: asset choice, sections by product (Vercel, Next.js, Turbo, Turborepo, Turbopack, v0, eve, AI SDK), Naming and spacing, General information, Usage, Misuse — [design/brands](https://vercel.com/design/brands). Geist: Foundations (Colors, Typography, Materials, Grid), Assets (logos, Icons, Typeface), Components, Markdown for agents — [geist](https://vercel.com/geist/introduction).
- Discord: Our Logo, Symbol, Clearspace, Colors, Banners, Legal Brand Guidelines (Do's, Don'ts), Need More — [discord.com/branding](https://discord.com/branding).
- Zapier, 13 sections: Introduction, Protected Brand Assets, Partner Program Overview, Transitioning from Zapier Expert, Approved Partner Assets, Logo Usage, Badge Usage, Naming Conventions and Messaging, Website and Digital Asset, Event and Webinar Naming, Marketing Communications, Co-Marketing, Compliance and Approval — [PDF](https://partnerportal.zapier.com/sys/document/open/7Ot00000000003a00hE).
- Sentry, skill: Tone Selection, Plain Speech, Sentry Voice, General Rules, Dash Usage, UI Element Guidelines, Anti-Patterns, References — [SKILL.md](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md). Site: Examples, When to Use, Writing in Sentry Voice, General Copywriting Guidelines, Title Case — [Content & Voice](https://develop.sentry.dev/frontend/sentry-voice/).
- Stripe: About Stripe, Fast facts, Leadership, Board members, Media assets (logo, badge, gallery, photos of the leadership) — [newsroom](https://stripe.com/newsroom/brand-assets).
- Figma, page: Brand together, Logos to-go, Guidelines, Figma Marks, Dos & Don'ts (six subsections), Questions — [using-the-figma-brand](https://www.figma.com/using-the-figma-brand/). PDF: Wordmark, Icon, Clear space and positioning, Lockup, App icons, Partnerships, Pairing identity marks, Usage on three slides — [Brand Book](https://static.figma.com/uploads/6645755656177435f83e10b48d9947645b55a033).
- Mailchimp, brand page: Our name, Our logo, Our colors, The fine print (Please do, Please don't), Download, FAQ — [brand-assets](https://mailchimp.com/about/brand-assets/). Guide, 17 sections: Writing Goals and Principles, Voice and Tone, Writing about Mailchimp, Writing About People, Grammar and Mechanics, Web Elements, Educational Content, Legal Content, Email Newsletters, Social Media, Accessibility, Translation, Structured Content, Copyright and Trademarks, Word List, Further Reading, TL;DR — [styleguide](https://styleguide.mailchimp.com/). Voice: Voice, Tone, Style tips, A note about Freddie — [voice-and-tone](https://styleguide.mailchimp.com/voice-and-tone/).
- GitLab: Introduction; Messaging (Brand voice, Style and formatting); GitLab Logo (Core logo, Logomark, Branded lockups); Design (Color, Typography, Visual design with Core elements, Icons and Patterns, Illustrations, Promptlings, Diagrams; Motion, Photography); Style guides; Resources — [navigation](https://design.gitlab.com/brand-messaging/brand-voice).
- Monzo: Straightforward kindness, Everyday magic, Warm wit, How we sound across channels — [tone-of-voice](https://monzo.com/tone-of-voice/).
- Dodo: За что нас любят [What people love us for] (chronology, pizza, delivery, pizzeria, app, support), Ценности [Values] (five), Платформа бренда [Brand platform] (manifesto, vision, mission, memes), Дизайн [Design] (style, packaging, app and site, architecture, menu) — [brandbook.dodopizza.info](https://brandbook.dodopizza.info/).
- T—Zh, 11 chapters: Идея журнала [The magazine's idea], Рубрики [Sections], Темы статей [Article topics], Структура статьи [Article structure], Абзац [Paragraph], Предложение [Sentence], Слово [Word], Буква [Letter], Оформление текста [Text layout], Обвес [Extras], Общение внутри редакции [Communication inside the newsroom] — [Редполитика [Editorial policy]](https://docs.google.com/document/d/14XdGIjVJLM_FsjHzyh5ca8PkffngykzXd2bLPHzA2ME/pub).
- Kontur: Principles (basic, text, training, accessibility, interactivity, data, AI, user interaction, tables, 1C modules, other, product designer, research), Components, Resources — [guides.kontur.ru](https://guides.kontur.ru/).
- Litres: introductory paragraphs, logos, logos of sub-brands, font, subscription pass, subscription, app icons, co-branding, colors, illustrations, buttons, PDF guideline — [litres.ru/cms/11127](https://www.litres.ru/cms/11127/).

#### Not counted: the structure is declared, the content was not read
- Selectel, [brand.selectel.ru](https://brand.selectel.ru/): the site returned ECONNREFUSED. [PRIMARY-SOURCE FACT] According to the company's own article, it is one page of three blocks: an introduction, about the company (what it does, values, audience), guidelines (logo, favicons, icons, four main colors and an extended palette, dark theme, download) — [Habr, 2024-12-17](https://habr.com/ru/articles/867256). On the same Habr page the company is placed in the 1001–5000 people range. The site's first capture is [2024-03-29](https://archive.org/wayback/available?url=brand.selectel.ru&timestamp=19960101).
- Help Scout, [helpscout.com/brand](https://www.helpscout.com/brand/): the landing page was read, the guide itself sits in a Figma prototype and is unavailable through WebFetch. [PRIMARY-SOURCE FACT] The blocks Brand Foundation, Brand Messaging, Brand Identity, Brand System are declared. The company itself gives the volume as about 80 pages — [article, 2025-07-29](https://articles.helpscout.com/blog/evolving-brand-design/). Headcount not stated, founded in 2011 — [about](https://www.helpscout.com/about/).
- Wise, [wise.design](https://wise.design/): only navigation labels are visible: Flags, Cards, Icons, Illustration, Logo, Motion, Photography, Product Demos, Tapestries, Tone of Voice, Typography, Colour — [home](https://wise.design/direction). The content is rendered on the client. 5499 employees in 2024 — [WP](https://en.wikipedia.org/wiki/Wise_(company)).
- Notion: the official pages on [notion.site](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-689045e1761348f887a3c5c80295e00f) return only a title. I know about the sections on the badge, the name, and attribution only from a digest of search results.
- Zapier, [brand.zapier.com](https://brand.zapier.com/): only the title Zapier Brand Guidelines 1.0 can be read. Separately I read the [guide for integrations](https://docs.zapier.com/platform/publish/branding-guidelines): App name, App logo, App description copy, Category, Colors, FAQ; these are rules for other people's apps in the directory.
- Intourist (Интурист), [design.intourist.ru/llms.txt](https://design.intourist.ru/llms.txt): an index of 18 items and the logos page were read. The company is old, its logos are dated from 1929, so it is outside the scope of my assignment. I mention it because of the llms.txt file (see section 5).

#### Searched for but not found or could not open
- Aviasales: [aviasales.ru/brand](https://www.aviasales.ru/brand) returned 404, search gave nothing. Tochka: [tochka.com/brand](https://tochka.com/brand/) and allo.tochka.com fail with a certificate error from my environment. Skyeng: search gave only blog articles on what a brand book is, with no document of its own among them. T-Bank: I did not find a separate text guide, only T—Zh.
- Basecamp and 37signals: [basecamp.com/about/press](https://basecamp.com/about/press) opens the marketing home page without brand materials. The [handbook](https://basecamp.com/handbook) has 16 chapters, none of which by its title is about brand, voice, or logo; I did not open the chapters themselves.

### Inferences
- [RESEARCHER INFERENCE] At small companies, a public "brand book" usually serves an outside reader: a journalist, a partner, a plugin author. Such pages hardly serve an internal author who creates new materials.
- [RESEARCHER INFERENCE] The only complete document in group A (PostHog) lives in the company's open handbook. Perhaps completeness here has more to do with the habit of publishing internal material than with size, but a single case does not prove this.

### Gaps
- Size at the time of first publication could be pinned down only for PostHog (30–38 people). For the others there is only the date of the snapshot and sometimes the stage: Resend — before Series A, Vercel — a month before Series C.
- The headcount of Linear, Resend, Cal.com, Tailwind Labs, Buffer, Sentry, Kontur, and Litres is not confirmed by a primary source.
- I did not read the content of Shift, brand.selectel.ru, the Help Scout Figma guide, wise.design, brand.zapier.com, brand.mailchimp.com, the Litres PDF. After reading them, the classes and the count may shift in favor of real brand books.

## 2. Which sections appear almost always, sometimes, and almost never

### Takeaway
Almost everywhere there are files, logo, color, contact, and do/don't. Voice, personality, positioning, and audience appear for small companies in only one or two documents out of 11. Sound appears nowhere, and grid appears only in product design systems and in GitLab.

### Cited Findings
The count was made by a script from Table B, and the sources of the rows are in Table A. The whole count is [RESEARCHER INFERENCE]: the coding is mine and the sample is nonrandom. P is generous (for example, a contact in a footer), so a strict count of Y only is given next to it. Cells with "?" are not counted as presence; their number is given separately.

| Section | All: Y+P of 24 | All: Y only | Group A: Y+P of 11 | Group A: Y only | Group B: Y+P of 13 | "?" |
|---|---:|---:|---:|---:|---:|---:|
| Files to download | 21 | 20 | 11 | 10 | 10 | 1 |
| Logo | 20 | 17 | 10 | 8 | 10 | 1 |
| Contact or owner | 19 | 10 | 8 | 4 | 11 | 1 |
| Color | 18 | 12 | 8 | 5 | 10 | 1 |
| Do/don't | 18 | 13 | 7 | 3 | 11 | 2 |
| Name and grammar | 15 | 12 | 5 | 4 | 10 | 2 |
| Legal and trademark | 15 | 11 | 7 | 5 | 8 | 3 |
| Imagery and illustration | 13 | 2 | 5 | 1 | 8 | 1 |
| Application examples | 12 | 2 | 2 | 0 | 10 | 1 |
| Mission and values | 8 | 2 | 3 | 0 | 5 | 2 |
| Voice and tone | 8 | 5 | 1 | 0 | 7 | 2 |
| Typography | 8 | 6 | 2 | 1 | 6 | 2 |
| Positioning | 6 | 1 | 2 | 1 | 4 | 2 |
| Audience | 6 | 3 | 2 | 1 | 4 | 2 |
| Brand personality | 6 | 5 | 1 | 1 | 5 | 3 |
| Version or changelog | 5 | 1 | 1 | 0 | 4 | 1 |
| Grid and layout | 3 | 2 | 0 | 0 | 3 | 4 |
| Motion | 3 | 2 | 1 | 1 | 2 | 4 |
| Sound | 0 | 0 | 0 | 0 | 0 | 5 |

- Almost everywhere (18 of 24 or more): files, logo, contact, color, do/don't.
- Sometimes (6 to 15): name and grammar, legal, imagery, application, mission, voice, typography, positioning, audience, personality.
- Almost never (no more than 5): version, grid, motion, sound.

Individual observations:
- [PRIMARY-SOURCE FACT] The only document with an explicit version, date, and date of the next review is Zapier's partner PDF: version 2, July 2025, next review December 2025. On the access date the July version is still at this link — [PDF](https://partnerportal.zapier.com/sys/document/open/7Ot00000000003a00hE).
- [PRIMARY-SOURCE FACT] Indirect traces of a version: a "last updated" label on GitLab pages ([intro](https://design.gitlab.com/brand-introduction)), PostHog's public commit history ([GitHub](https://github.com/PostHog/posthog.com/commits/master/contents/handbook/brand/visual-identity.md)), the years in Litres's file paths ([page](https://www.litres.ru/cms/11127/)), the period 2014–2019 at T—Zh ([Редполитика [Editorial policy]](https://docs.google.com/document/d/14XdGIjVJLM_FsjHzyh5ca8PkffngykzXd2bLPHzA2ME/pub)).
- [PRIMARY-SOURCE FACT] A grid with a separate page exists at [Geist](https://vercel.com/geist/introduction) and at [Kontur](https://guides.kontur.ru/) (Лейаут, Модуль, Отступы [Layout, Module, Spacing]), both product design systems. GitLab has a Core elements page that I did not open — [navigation](https://design.gitlab.com/brand-messaging/brand-voice).
- [PRIMARY-SOURCE FACT] Motion as a section with content is confirmed at [PostHog](https://posthog.com/handbook/brand/visual-identity) (Animation, about 120 words). [GitLab](https://design.gitlab.com/brand-messaging/brand-voice) and [Wise](https://wise.design/direction) have a Motion section label; I did not read the content.
- [PRIMARY-SOURCE FACT] A counterexample on do/don't: Selectel deliberately did not include them. The authors explain: there are too many cases of wrong use, a full list would bloat the document, a partial one would be a formality, and design review screens out bad layouts anyway — [Habr comments](https://habr.com/ru/companies/selectel/articles/867256/comments).
- [EXPERT OPINION] In the same place, readers ask for exactly do/don't and concrete examples (heading sizes, colors for charts). These are Habr commenters, and their expertise is not verified — [Habr comments](https://habr.com/ru/companies/selectel/articles/867256/comments).

### Inferences
- [RESEARCHER INFERENCE] The frequency of a section in public documents shows what an outside reader needs, not what matters to the brand. Files and the trademark are needed by a journalist and a partner, so they are at the top. A checklist for the skill cannot be built directly from this frequency.
- [RESEARCHER INFERENCE] The gap of 1 of 11 versus 7 of 13 on voice cannot be read as "large companies write about voice more often". I deliberately sought out voice documents, and Monzo and T—Zh also came out as separate documents rather than as sections of a brand book.
- [RESEARCHER INFERENCE] Typography appears at small companies less often than color: 2 of 11 versus 8 of 11. A likely reason: color is needed by outside authors, while the font matters only to someone who lays things out on the company's behalf.

### Gaps
- I did not see the images, so I cannot say how many do/don't are shown visually. Only GitLab (a picture of wrong use, [core logo](https://design.gitlab.com/brand-logo/core-logo)) and Kontur (46 illustrations on the page, including wrong/right pairs, [styleguide](https://guides.kontur.ru/principles/text/styleguide/)) are confirmed.
- I did not search separately for an independent study with a sample on the makeup of small companies' brand books: the search limit ran out earlier.

## 3. How a real brand book differs from a press kit and a logo page

### Takeaway
The title of a document says nothing: at Figma, the "Brand Book" is 11 slides about the logo only. The difference lies elsewhere: a real brand book answers who we are and who we are for, and gives rules by which something new can be created. A press kit and a logo page say what you may take and what you must not do with someone else's mark.

### Cited Findings

Result of the classification, [RESEARCHER INFERENCE]:

| Class | All, of 24 | Group A, of 11 | Who |
|---|---:|---:|---|
| Brand book | 2 | 1 | PostHog, GitLab |
| Hybrid | 1 | 0 | Dodo: it has why and for whom, the rules are moved to another site |
| Verbal guide only | 4 | 0 | Monzo, Mailchimp, T—Zh, Sentry |
| Product design system | 1 | 0 | Kontur |
| Logo and trademark | 9 | 6 | Linear, Supabase, Tailwind, Obsidian, Resend, Ghost, Vercel, Discord, Figma |
| Press kit or asset set | 6 | 4 | Hugging Face, Mastodon, Cal.com, Buffer, Stripe, Litres |
| Rules for partners | 1 | 0 | Zapier |

Working criteria, [RESEARCHER INFERENCE]. I count a document as a brand book if it has all four of these features:
1. Meaning: at least two sections out of mission, positioning, audience, personality.
2. System: the logo and at least two more elements out of color, font, imagery.
3. Rules for creating something new: how to write or make, not only what is forbidden.
4. An internal addressee: the company's own team or a contractor who makes material on the company's behalf.

Support for the criteria:
- [PRIMARY-SOURCE FACT] Figma itself describes its Brand Book as instructions on its marks: "Learn how to properly use our marks" — [Figma](https://www.figma.com/using-the-figma-brand/). The [PDF](https://static.figma.com/uploads/6645755656177435f83e10b48d9947645b55a033) has 11 slides and 686 words: wordmark, icon, spacing, lockup, app icons, partnerships, usage rules. There is no mission, voice, or typography.
- [PRIMARY-SOURCE FACT] The same mismatch between name and content: [Linear Brand Guidelines](https://linear.app/brand) and [Supabase Brand Guidelines](https://supabase.com/brand-assets) are about the logo, the name, and usage; [Discord's Brand Guidelines](https://discord.com/branding) is about the logo and legal rules; the «Брендбук» [Brand book] on the [Litres page](https://www.litres.ru/cms/11127/) is a set of archives and PDFs.
- [PRIMARY-SOURCE FACT] GitLab names its addressees directly: agencies, partners and customers, employees who run events or make materials themselves in Canva, fans of the brand — [intro](https://design.gitlab.com/brand-introduction). PostHog keeps a six-item checklist for briefing external contractors — [brand-assets](https://posthog.com/handbook/company/brand-assets).
- [PRIMARY-SOURCE FACT] Rules for creating something new at PostHog: the "remove the logo" test, to check whether a material is recognizable without it ([visual identity](https://posthog.com/handbook/brand/visual-identity)), and the Hacker News test for tone ([foundations](https://posthog.com/handbook/brand/foundations)). At Monzo — the intensity of three principles across six channels ([tone-of-voice](https://monzo.com/tone-of-voice/)). At Sentry — a choice between Plain Speech and Sentry Voice by context ([SKILL.md](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md)).
- [PRIMARY-SOURCE FACT] A press kit in pure form: at Stripe it is the mission, figures, leadership, and board next to the logo and photos ([newsroom](https://stripe.com/newsroom/brand-assets)). At Hugging Face — logos, colors, bio ([brand](https://huggingface.co/brand)). At Buffer — a description, metrics, and a PR contact, with no rules and no logo ([press](https://buffer.com/press)). GitLab keeps the [press kit](https://about.gitlab.com/press/press-kit/) separate from the brand book and links from there to design.gitlab.com.
- [PRIMARY-SOURCE FACT] A trademark page in pure form: Tailwind forbids names and domains that look like the official ones and allows the assets only for articles and videos ([brand](https://tailwindcss.com/brand)). Figma forbids companies with Fig in the name and the possessive form of the name ([trademark](https://www.figma.com/using-the-figma-brand/)).

Counterexamples that do not fit the scheme:
- [PRIMARY-SOURCE FACT] Dodo: mission, four audience segments in an activity-and-demand matrix, a manifesto, memes, logo, color, font, but there are no detailed usage rules on the page, and it says they are gradually moving to the design team's site — [brandbook.dodopizza.info](https://brandbook.dodopizza.info/). The page itself calls itself a book that can be read in an evening. It is more a showcase and a story than a tool.
- [PRIMARY-SOURCE FACT] The Monzo and T—Zh documents have neither a logo nor color. At T—Zh almost every rule comes with a "no/yes" example, about 9000 words in all — [Редполитика [Editorial policy]](https://docs.google.com/document/d/14XdGIjVJLM_FsjHzyh5ca8PkffngykzXd2bLPHzA2ME/pub); at Monzo the principles and channels are worked out — [tone-of-voice](https://monzo.com/tone-of-voice/). [RESEARCHER INFERENCE] For a text author they are more concrete than most documents in the sample that are called a brand book.
- [EXPERT OPINION] The label itself is disputed: Selectel's commenters think a brand book without templates and source files cannot honestly be called open. The authors reply that the document's task is basic needs, not all the rules. Habr commenters, expertise not verified — [Habr comments](https://habr.com/ru/companies/selectel/articles/867256/comments).
- [PRIMARY-SOURCE FACT] Kontur keeps two tracks apart: product guides and a brand book, and the guides state directly that the use of the brand and logo is described in the brand book — [guides.kontur.ru](https://guides.kontur.ru/). The brand book did not open for me ([403](https://kontur.ru/brandbook)).

### Inferences
- [RESEARCHER INFERENCE] The fastest test: can an unfamiliar contractor, using this document, make a new layout and write a new text that are recognizable as yours? A logo page passes only the "do not violate" test. A press kit passes neither.
- [RESEARCHER INFERENCE] A logo page protects against other people's mistakes, a brand book teaches your own people. That is why they live well side by side: GitLab and PostHog put them on separate pages.
- [RESEARCHER INFERENCE] For the skill: it is worth starting with the question "who will read the document and what must they create", not with a list of sections.

### Gaps
- The classes were assigned from the text, without internal documents. Mailchimp may turn out to be a full brand book if brand.mailchimp.com is counted, and Litres if the PDF is read.

## 4. What the smallest document that looks like a real brand book is

### Takeaway
The smallest set I read that passes all four criteria is PostHog's foundations and visual identity, about 4200 words, a company of about 200 people. PostHog's first version of the guide appeared at 30–38 people, but I did not see its content. If only voice is needed, a compact model is Sentry, about 950 words.

### Cited Findings

The volumes are the tool's estimate, except for Figma and Zapier. "Passes" is by the criteria of section 3, [RESEARCHER INFERENCE]; the content is [PRIMARY-SOURCE FACT].

| Document | Volume | What is inside | What is missing | Passes |
|---|---|---|---|---|
| [PostHog foundations](https://posthog.com/handbook/brand/foundations) + [visual identity](https://posthog.com/handbook/brand/visual-identity) | ~1700 + ~2500 words | taste, personality with a yes/no table, audience, how to describe the product, what we are not; logo, color, font, illustrations, animation, photos, screenshots, charts | grid, a contact in these two pages, a version | yes |
| [Dodo](https://brandbook.dodopizza.info/) | ~3000–3500 words, one page | values, platform, audience, logo, color, font, applications | usage rules, voice in the document itself | partly |
| [Selectel](https://habr.com/ru/articles/867256) | one page, volume unknown | introduction, about the company, guidelines | do/don't on purpose; templates are closed | yes by description, not read |
| [Monzo](https://monzo.com/tone-of-voice/) | ~3000 words | three principles, detailed rules, a channel matrix | everything visual | voice only |
| [Sentry Content & Voice](https://develop.sentry.dev/frontend/sentry-voice/) | ~950 words | two speech modes, when to use which, principles, copywriting rules, a contact through Slack | everything else | voice only |
| [Supabase](https://supabase.com/brand-assets) | ~800–1000 words | files, colors, name, usage rules | meaning, font, voice | no |
| [Figma Brand Book](https://static.figma.com/uploads/6645755656177435f83e10b48d9947645b55a033) | 11 slides, 686 words | only marks | everything else | no |
| [Obsidian](https://obsidian.md/brand) | ~150 words | icon, lockup, trademark, contact | everything else | no |

- [PRIMARY-SOURCE FACT] PostHog's frame: the company writes directly that the brand is one of the four main reasons for recommendations, and that the competitor is not another B2B company but entertainment fighting for attention — [philosophy](https://posthog.com/handbook/brand/philosophy). This is a page of reasoning, not of rules, but it sets out why everything else exists.
- [PRIMARY-SOURCE FACT] The voice minimum at Sentry: the default mode is neutral, the voice with character is kept for particular places such as 404 pages and announcements, and it is forbidden in error messages — [SKILL.md](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md), [Content & Voice](https://develop.sentry.dev/frontend/sentry-voice/).
- [PRIMARY-SOURCE FACT] The voice minimum at Mailchimp: about 650 words, a separation of voice and tone, five qualities — [voice-and-tone](https://styleguide.mailchimp.com/voice-and-tone/).
- [PRIMARY-SOURCE FACT] Signals of use that I found. In its first year Monzo trained more than 700 employees in writing, put it into onboarding, embedded writers in product teams, and started a jargon tracker — [Monzo blog, 2019](https://monzo.com/blog/2019/03/27/tone-of-voice-birthday). At Sentry the rules are set up as a skill for an agent ([SKILL.md](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md)). At Selectel the document is read by contractors and managers, and design review screens out mistakes ([comments](https://habr.com/ru/companies/selectel/articles/867256/comments)).
- [PRIMARY-SOURCE FACT] For comparison, a large document: Help Scout gives the volume as about 80 pages, and a team of five worked on it for about a year — [article](https://articles.helpscout.com/blog/evolving-brand-design/), [refresh](https://articles.helpscout.com/blog/help-scout-brand-refresh-2023/). The guide itself was not read.

### Inferences
- [RESEARCHER INFERENCE] The lower bound of a working brand book, judging by these samples, is a few thousand words, not 80 pages. A composite minimum could look like this: 500–1000 words of meaning (who we are, who for, what we are like, what we are not, how to describe ourselves), about 1000 words of voice with a rule for choosing the tone and pairs of examples, a system sheet (logo, color, font, image), files and an owner. There is no such document in the sample; this is my own assembly.
- [RESEARCHER INFERENCE] The most valuable part at PostHog takes up little space: the "what we are not" section and the yes/no table of traits. They give the author a criterion, whereas files only remove friction.
- [RESEARCHER INFERENCE] The word "works" is not tested in the sample. There are signals of use at three companies, and no link between the document and the result is visible at any of them.

### Gaps
- I did not see the content of PostHog's first version (December 2021, at 30–38 people): the commit history shows only the fact and a title. It would have been the best model for the question of the minimum.
- There is no way to assess the quality of a brand independently of the document, so I do not claim a link "short document — strong brand".

## 5. How the documents changed

### Takeaway
The typical trajectory: a short page or PDF turns into a living site or handbook, while the story about the brand and the working rules drift apart into different places. A direct comparison of versions through the Internet Archive could not be made: the tool refused to open web.archive.org, so I got only the snapshot dates and relied on the companies' own traces.

### Cited Findings

#### Limit on the archive
- [RESEARCHER INFERENCE] WebFetch does not open the web.archive.org domain. Only the availability API archive.org/wayback/available works; it gives the date and address of a snapshot but not the content. A Wayback mirror on another domain turned up in the results; I did not use it, because that would have been a workaround of a tool restriction. I did not read the content of the snapshots, so there are no "before and after" comparisons from the archive in the notes.
- [RESEARCHER INFERENCE] The snapshot dates match the companies' own data where they can be checked: Monzo — snapshot 2018-03-27 and the stated March 2018; PostHog — snapshot 2022-01-24 and commit 2021-12-07. This slightly raises trust in the dates as an upper bound.

Snapshot addresses for manual checking (open in a browser):
- Mailchimp Voice and Tone: http://web.archive.org/web/20120913182202/http://voiceandtone.com/
- Mailchimp Content Style Guide: http://web.archive.org/web/20150819150132/http://styleguide.mailchimp.com/
- Monzo: http://web.archive.org/web/20180327221823/https://monzo.com/tone-of-voice/
- Dodo: http://web.archive.org/web/20180804100138/http://brandbook.dodopizza.info:80/
- Help Scout: http://web.archive.org/web/20161128140159/http://style.helpscout.com:80/
- Selectel: http://web.archive.org/web/20240329120242/https://brand.selectel.ru/
- Linear: http://web.archive.org/web/20220910090214/https://linear.app/brand
- Supabase: http://web.archive.org/web/20211127133535/https://supabase.com/brand-assets
- Ghost: http://web.archive.org/web/20170318044250/https://ghost.org/design/
- PostHog: http://web.archive.org/web/20220124143349/https://posthog.com/handbook/company/brand-assets

#### What is visible without the archive
- **PostHog, a simple guide becomes a section.** [PRIMARY-SOURCE FACT] In December 2021 a simple brand guide appeared in the handbook ([commits](https://github.com/PostHog/posthog.com/commits/master/contents/handbook/company/brand-assets.md)), when the company had 30–38 people ([story](https://posthog.com/handbook/company/story)). In May 2026, at about 200 people, a separate brand handbook was created ([commits](https://github.com/PostHog/posthog.com/commits/master/contents/handbook/brand/visual-identity.md)). In July 2026 the assets were centralized, and in October 2026 a commit appeared about internal links and private wrappers (the same links).
- **Mailchimp, from a site organized by content type to a large guide.** [EXPERT OPINION] According to a report on a seminar by Kate Kiefer Lee, the site voiceandtone.com was organized by content type: for each it said what the reader probably feels, which tone to choose, and which example worked. This is a retelling by Sarah Maddox from March 2013, not a primary source — [report](https://www.goodreads.com/author_blog_posts/3875264-report-from-voice-and-tone-seminar-by-kate-kiefer-lee?tab=author). [PRIMARY-SOURCE FACT] Today voiceandtone.com returns a 301 to [styleguide.mailchimp.com/voice-and-tone](https://styleguide.mailchimp.com/voice-and-tone/). That page has no content-type table, the reader's emotions are mentioned in prose, and the channels are moved into separate sections of the large [guide](https://styleguide.mailchimp.com/) under a CC BY-NC license.
- **Monzo, from four principles to three and to a channel matrix.** [RESEARCHER INFERENCE] An undated third-party copy shows four principles and sections on this not being a rulebook and on reporting gaps — [Slab](https://slab.com/library/examples/monzo-tone-of-voice). A third-party diff of two saved versions shows added sections on verbs and nouns, sentence length, and inclusivity with the same principles — [Diffchecker](https://www.diffchecker.com/aCQPPVjg). [PRIMARY-SOURCE FACT] Today the page is called Monzo Writing Principles; it has three principles and intensity by channel, and the address stayed the same — [tone-of-voice](https://monzo.com/tone-of-voice/). Monzo separately published a naming system — [blog, 2019](https://monzo.com/blog/2019/03/27/tone-of-voice-birthday). The launch in March 2018 is confirmed there; the [original post on Medium](https://medium.com/monzo-bank/introducing-the-monzo-tone-of-voice-23d89ee20433) returned 403.
- **Selectel, from an agency PDF to a site.** [PRIMARY-SOURCE FACT] The old version was a PDF from an agency; it had become outdated and inconvenient for a large team. They considered Figma but chose a site so that contractors and managers could use it. They added sections on values, figures, and history, and now call the document living — [Habr](https://habr.com/ru/articles/867256).
- **Dodo, separating the story from the rules.** [PRIMARY-SOURCE FACT] The book says that detailed guidelines are gradually moving to the design team's site Shift — [brandbook.dodopizza.info](https://brandbook.dodopizza.info/). The book's first capture is [2018-08-04](https://archive.org/wayback/available?url=brandbook.dodopizza.info&timestamp=19960101), Shift's is [2024-03-24](https://archive.org/wayback/available?url=shift.dodobrands.io&timestamp=19960101). [VENDOR] Pointer: a digest of search results mentions a roundup article where the same move is described as the brand book turning into a showcase for the franchise. The digest did not say which article it is, probably [allo.tochka.com](https://allo.tochka.com/brandbook); it did not open for me, so I cannot confirm this conclusion.
- **Help Scout, from a style site to Figma and a single document.** [PRIMARY-SOURCE FACT] style.helpscout.com returns a 308 to [helpscout.com/brand](https://www.helpscout.com/brand/), and the guide is now in Figma. The writing principles and product messages were merged into one document, and the work took a little over a year — [article](https://articles.helpscout.com/blog/evolving-brand-design/). At the same time they wrote a first vision and rewrote the values — [refresh](https://articles.helpscout.com/blog/help-scout-brand-refresh-2023/). The article's address has 2023, and the date on the page is July 2025; I did not resolve the discrepancy.
- **GitLab, replacing the voice.** [PRIMARY-SOURCE FACT] A merge request of May 22, 2024 replaced the old voice with new personality traits and added a link to the Content Style Guide — [MR 3863](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/merge_requests/3863). Today these are Visionary, Empathetic, Intentional — [brand voice](https://design.gitlab.com/brand-messaging/brand-voice). The addresses changed: the [old brand-guidelines address in the handbook](https://handbook.gitlab.com/handbook/marketing/brand-and-product-marketing/brand/brand-guidelines/) redirects and then leads to a login form, as does the [old path on design.gitlab.com](https://design.gitlab.com/brand-overview/introduction). I did not go through the login. This may be a quirk of a request without a browser.
- **T—Zh, the document froze.** [PRIMARY-SOURCE FACT] The Редполитика [Editorial policy] is marked as no longer updated, period 2014–2019 — [Редполитика](https://docs.google.com/document/d/14XdGIjVJLM_FsjHzyh5ca8PkffngykzXd2bLPHzA2ME/pub). According to a search digest, it says there that since January 2019 the decentralized newsrooms decide questions such as how to spell brands and feminitives (feminine forms of job titles) themselves. The magazine's general rules for authors are now described at [t-j.ru/about](https://t-j.ru/about/) and [t-j.ru/manual](https://t-j.ru/manual/).
- **Ghost, Litres, Zapier.** [PRIMARY-SOURCE FACT] ghost.org/design now redirects to a [short logos page](https://docs.ghost.org/logos/) in the documentation. In the [Litres files](https://www.litres.ru/cms/11127/) the folders brandbook2022 and brandbook2025 sit side by side: the kit is updated in parts. The [Zapier](https://partnerportal.zapier.com/sys/document/open/7Ot00000000003a00hE) partner guide is also used for the transition from the name Zapier Expert to Zapier Solution Partner with a deadline of August 1, 2025.
- **The machine-readable layer.** [PRIMARY-SOURCE FACT] Three independent signs: a brand guidelines skill at [Sentry](https://raw.githubusercontent.com/getsentry/skills/main/skills/brand-guidelines/SKILL.md), a Markdown for agents section at [Geist](https://vercel.com/geist/introduction), an [llms.txt](https://design.intourist.ru/llms.txt) file on the Intourist portal. Separately, [Kontur](https://guides.kontur.ru/) added a section on labeling AI in the interface.

### Inferences
- [RESEARCHER INFERENCE] A PDF loses to a site as the company grows, because there are more readers and they differ. Selectel names this as the direct reason for the changes. Help Scout, meanwhile, keeps its guide in Figma, so a site is not the only answer.
- [RESEARCHER INFERENCE] As the company grows, two functions separate: a story for an outside reader (Dodo, the about-the-company section at Selectel) and a working tool for authors (Shift). Selectel's readers demand this directly: one commenter thinks that the about-the-company part and the guidelines should not be on one page ([comments](https://habr.com/ru/companies/selectel/articles/867256/comments), [EXPERT OPINION], expertise not verified).
- [RESEARCHER INFERENCE] A document dies when the organization changes: at T—Zh, decentralization canceled the single rulebook. That is why a brand book needs an owner and a review date, although in the sample an explicit review date exists in only one document of 24.
- [RESEARCHER INFERENCE] The form of the brand book is already changing for agents: voice rules are written as instructions for a model. This bears directly on the skills project.

### Gaps
- I did not read the early version of Mailchimp Voice and Tone or any archive snapshots. I could not establish the launch date of voiceandtone.com: the earliest snapshot the API returned dates from September 2012, and the [seminar and report](https://aycl.uie.com/virtual_seminars/vs100_human_content) are dated 2013. The year 2011, which is often mentioned, is not confirmed.
- For an exact comparison you need a person with a browser or permission for the web.archive.org domain for the tool. The snapshot addresses are given above.

## 6. What public disclosure hides

### Takeaway
The sample shows only what companies decided to show, and that is mostly material for outside readers. Internal strategy, templates, and source files are closed even at the most open companies, so this sample cannot tell which sections small companies actually have and which of them work.

### Cited Findings
- [PRIMARY-SOURCE FACT] GitLab, one of the most open companies in the sample, marks many materials on the resources page as internal, and some templates require a corporate Canva account — [resources](https://design.gitlab.com/resources).
- [PRIMARY-SOURCE FACT] Selectel: internal templates and Figma files are closed and are given to contractors on request — [Habr comments](https://habr.com/ru/companies/selectel/articles/867256/comments).
- [PRIMARY-SOURCE FACT] PostHog: there is a separate path to files for employees through Figma ([brand-assets](https://posthog.com/handbook/company/brand-assets)); a recent commit concerns private wrappers ([commits](https://github.com/PostHog/posthog.com/commits/master/contents/handbook/brand/visual-identity.md)). Detailed positioning is moved to a separate marketing page, which I did not open ([foundations](https://posthog.com/handbook/brand/foundations)).
- [PRIMARY-SOURCE FACT] Kontur: the site has a login, and the sub-brands page returns 401 — [guides.kontur.ru](https://guides.kontur.ru/), [sub-brands](https://guides.kontur.ru/principles/other/sub-brands/). Wise: the Docs link on the site is marked with a lock icon — [wise.design](https://wise.design/). Help Scout: the content is moved to a Figma prototype — [brand](https://www.helpscout.com/brand/).
- [PRIMARY-SOURCE FACT] The Zapier partner portal keeps badges and assets separately — [PDF](https://partnerportal.zapier.com/sys/document/open/7Ot00000000003a00hE). So "files" in the matrix do not mean that everything is available without logging in.
- [VENDOR] Pointer: a digest of search results mentions blog claims about brand books, that the ideological part is usually considered a trade secret and only the guidelines go into open access. The digest did not name the exact articles; probably they are [allo.tochka.com](https://allo.tochka.com/brandbook) (fails with a certificate error) and one of the [Sostav](https://www.sostav.ru/blogs/280921/58381) blogs (I did not read it). The claim is not verified.
- [PRIMARY-SOURCE FACT] A counterexample to this claim: Dodo publishes its mission and a matrix of audience segments — [brandbook.dodopizza.info](https://brandbook.dodopizza.info/). PostHog publishes its audience, a description of the product, and a list of what it is not — [foundations](https://posthog.com/handbook/brand/foundations). Monzo publishes detailed writing rules — [tone-of-voice](https://monzo.com/tone-of-voice/).

#### Biases of this sample, [RESEARCHER INFERENCE]
- Survivors: I looked at companies that are already known and have something to show. Startups that made a brand book and closed, and those that have none, are not visible here.
- Publication: a page for journalists and partners appears for different reasons than an internal guide. The absence of a section on a public page does not mean it is absent inside.
- Instrumental: client-side JavaScript, 403s, unavailability from my environment, and the 10 MB PDF limit cut off the richest documents (Wise, Zapier, Mailchimp, Shift, Selectel, Litres). The Russian-language part suffered especially: two sites were unreachable over the network, and Aviasales, Tochka, and Skyeng were not found.
- Search: the shared web search limit ran out while I was looking for Russian-language sources, so the last queries on Shift and Kontur were not run, and there may be more open Russian-language brand books. I did not work around the limit.
- Mixing of stages: many documents are today's, and the companies have already grown. They cannot say what was in the brand book when the company had 20 people, except for the fact that PostHog had a guide.
- Absence of outcome: no document has data on whether it affected recognition, speed of work, or the quality of materials. The only usage figures are the training at Monzo.

### Inferences
- [RESEARCHER INFERENCE] The sample lets us say what companies show outwardly, but not what they need inside. The report should be worded exactly this way: "public documents of small companies have almost no voice", not "small companies have no voice".
- [RESEARCHER INFERENCE] If Linear and Basecamp are counted as strong brands, then a strong brand is possible with a short public page or none at all. This is only a plausible assumption: I did not see internal documents, and I did not measure brand strength.
- [RESEARCHER INFERENCE] For the skill this means that the template cannot be derived from frequencies. The set of sections should come from the reader's task, and the public samples should be used as examples of individual techniques: "what we are not" at PostHog, the channel matrix at Monzo, the choice of tone at Sentry, the no/yes pairs at T—Zh and Kontur.

### Gaps
- Internal brand books of small companies: interviews or closed documents are needed, they are not in open sources.
- Open data on which companies have no brand book at all: I found no way to count this.
- The Russian-language sample is incomplete: to extend it, new search queries and access to Shift, brand.selectel.ru, and kontur.ru/brandbook from a Russian network or a browser are needed.
