# Second pass: reading brand books in the browser, archive comparisons, and reconciling digests

Access date for all pages: 2026-11-06. Each link is marked with its state: `live` or `archive, snapshot YYYY-MM-DD`. A snapshot date means only "no later than".

How it was read. Built-in browser. Texts were obtained from the DOM (`get_page_text`, `read_page`, reading `textContent` with a script) and through requests to pages on the same domain with HTML parsing. Such data is marked `text`. The label `image` appears only where I saw nothing but a screenshot, and `digest` where the data came from a search summary. The word counts are rough: I counted the text of a node, and navigation often ends up in it, so they can be compared only within one site and one counting method.

I did not sign in to accounts, did not create any, did not download files, did not submit forms, and did not accept cookie banners (IBM, Mailchimp, Mastercard, Kontur: I did not touch the banner). I met no addresses to AI agents in the fragments I read. The Zapier page about AI is addressed to people and is ordinary content.

Budget: 2 WebSearch requests out of 15, about 80 tool calls, some of them batched.

## 1. Large portals that returned only a title or an error in the first pass

### Takeaway
Of nine portals, four have rich content without sign-in: Mozilla (a real brand book), IBM Design Language, NHS, Mastercard (very long external rules). The old Uber guide of 6486 words can be read in the archive. Netflix, IBM Brand Center, and most of the current Uber are closed or do not open. The Slack Brand Center does not work. Deutsche Telekom could not be read.

### Cited Findings

**Why the first pass did not read them** (the causes now separate):

| Site | First pass | What it really was |
|---|---|---|
| brand.uber.com | Title only | Redirect to assets.uber.com, the Frontify platform. On first load the app crashed with a script error, and after choosing a tab it opened. The public part is small |
| brand.netflix.com | Title only | A login wall: one logo page is public, the rest through sign-in or an account request |
| ibm.com/design/language | 38 characters | Client-side rendering, everything open. Brand Center is behind a login |
| mozilla.design | Title only | Frontify, everything I read is open. Until the tab was active, the content blocks did not appear. I read the text from `textContent` after bringing the tab to the foreground |
| creative.starbucks.com | Expired certificate | Still `ERR_CERT_DATE_INVALID`. Readable in the archive |
| england.nhs.uk/nhsidentity | Empty response | Bot protection: a script request returned 202 and an empty body, several ordinary navigations went through, then the page "Max challenge attempts exceeded". I stopped and did not bypass the protection |
| mastercard.com/brandcenter | 403 | Opens in the browser without sign-in, at `/brandcenter/us/en/home.html` |
| brand-design.telekom.com | Connection refused | Browser: "denied or failed". I did not retry and did not go to the archive |
| brand.slackhq.com | Not opened | `live` 404, in the archive an "under construction" placeholder |

**Inventory.** Codes: R a section or a paragraph of content was read; m a mention, a short paragraph (the analog of P in the first audit); H only a heading or a navigation item is visible; L the item is visible, the content is behind a login; – not found in what was read, which does not prove absence; 0 deliberately absent. The coding is mine, one coder. Netflix is the public part only. Uber 2020, Starbucks, Slack, Selectel, and Shift were read in the archive. Small and Russian documents are included here too, so that there is one table.

| Field | IBM | Mozilla | NHS | Mastercard | Netflix | Uber 2020 | Starbucks | Slack | Zapier | Notion | Selectel | Shift | Kontur | Seen in any form | Read as text (R, m) | Behind login |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mission, values | R | R | m | – | – | – | m | H | – | – | R | – | L | 7 | 5 | 1 |
| Positioning, strategy | – | R | – | – | – | – | – | – | – | – | R | – | L | 3 | 2 | 1 |
| Audience | – | m | H | H | – | – | – | – | – | – | R | m | L | 6 | 3 | 1 |
| Personality | – | R | – | – | – | m | – | – | m | – | H | R | L | 6 | 4 | 1 |
| Voice and tone | – | R | R | – | – | R | R | H | – | – | – | R | L | 7 | 5 | 1 |
| Name and grammar | – | – | R | R | – | H | – | H | – | R | – | R | – | 6 | 4 | 0 |
| Logo | R | R | H | R | R | R | R | H | R | H | H | R | R | 13 | 9 | 0 |
| Color | R | R | H | H | R | H | H | H | R | – | H | H | R | 12 | 5 | 0 |
| Typography | R | H | H | – | – | H | H | H | H | – | m | H | R | 10 | 3 | 0 |
| Imagery | R | H | H | – | – | H | H | H | R | H | H | R | H | 11 | 3 | 0 |
| Grid, layout | R | – | – | – | – | H | – | – | R | – | – | R | – | 4 | 3 | 0 |
| Motion | R | R | – | m | m | H | – | H | – | – | – | H | – | 7 | 4 | 0 |
| Sound | – | – | – | m | m | – | – | H | – | – | – | – | – | 3 | 2 | 0 |
| Application examples | H | H | H | R | m | H | R | H | – | – | H | R | H | 11 | 4 | 0 |
| Do/don't | H | m | H | R | R | – | – | – | H | R | 0 | H | m | 9 | 5 | 0 |
| Legal | H | – | m | R | H | m | – | R | – | R | – | R | – | 8 | 6 | 0 |
| Files | R | R | H | R | R | R | – | R | R | H | R | R | R | 12 | 10 | 0 |
| Contact, owner | R | R | R | R | R | R | – | R | m | – | R | m | H | 11 | 10 | 0 |
| Version, changelog | R | R | – | R | – | R | – | – | m | – | R | m | – | 7 | 7 | 0 |
| Brand architecture | – | H | H | R | – | H | – | H | – | – | – | H | R | 7 | 2 | 0 |
| Co-branding | – | – | H | H | R | H | – | H | – | m | – | – | – | 6 | 2 | 0 |
| Approval | R | – | R | – | m | H | – | – | m | – | – | m | – | 6 | 5 | 0 |
| Localization | H | m | – | – | – | H | – | H | – | – | – | R | m | 6 | 3 | 0 |
| Accessibility | H | R | – | – | m | – | – | – | H | – | – | – | – | 4 | 2 | 0 |
| Environment | – | – | H | H | – | m | – | – | – | – | – | m | m | 5 | 3 | 0 |
| AI rules | – | – | – | – | – | – | – | – | R | – | – | – | – | 1 | 1 | 0 |

**Mozilla.**
- [PRIMARY-SOURCE FACT] `text`, `live`. mozilla.design leads to a portal with three brands: Mozilla, Mozilla Foundation, Firefox ([landing](https://brand.mozilla.com/all-brands)). Sections: Start Here (About Mozilla's Brand, Accessibility, Brand Starter Pack), Voice & Message (Who We Are, Voice & Tone), Visual Elements (Brand in Action, Logos, Mascot, Typography, Brand Lockups, Color, Icons, Illustration, Photography, Motion, New Products Toolkit), six file libraries ([home](https://brand.mozilla.com/)). There is a login link, but everything listed opened without signing in.
- [PRIMARY-SOURCE FACT] `text`, `live`. Who We Are contains the brand promise, the positioning in one phrase, the mission, and the manifesto of 2007 ([Who We Are](https://brand.mozilla.com/document/240#/-/who-we-are)).
- [PRIMARY-SOURCE FACT] `text`, `live`. Voice & Tone: three voice traits (Passionate, Welcoming, No Bullsh*t), three personality traits (Fearless, Optimistic, Insightful), two writing manners for different addressees (Governments and Grassroots), rules for humor, inclusive language, language preferences, a short style guide, a voice checklist and an accessibility checklist with example phrases ([Voice & Tone](https://brand.mozilla.com/document/240#/-/voice-tone)).
- [PRIMARY-SOURCE FACT] `text`, `live`. The system is built on the Governments ↔ Grassroots scale, from strict and minimal to bright ([About](https://brand.mozilla.com/document/241)). Logo: minimum 20 px and 3.8 mm, the clear space equals the height of a lowercase z ([Logos](https://brand.mozilla.com/document/231#/-/logos)). Color: a proportion of about 45% black, 45% white, 10% green, palette files in ASE, LESS, SCSS ([Color](https://brand.mozilla.com/document/231#/-/color)). Motion is built on the idea of reclaim ([Motion](https://brand.mozilla.com/document/231#/-/motion)).
- The pages Typography, Brand in Action, Accessibility, Brand Starter Pack did not load in the allotted time: a title and a date are visible.

**IBM Design Language.**
- [PRIMARY-SOURCE FACT] `text`, `live`, without sign-in. Sections: Philosophy (Point of view, Principles), Gallery, Typography, Color, 2x Grid, IBM logos (8-bar, Rebus), Iconography, Illustration, Photography, Data visualization, Infographics, Layout, Animation, Resources, What's new, Help ([home](https://www.ibm.com/design/language/)). The pages have the blocks Things to avoid and Legal requirements for the logo ([8-bar](https://www.ibm.com/design/language/ibm-logos/8-bar)), Combinations to avoid and Accessibility for color ([Color](https://www.ibm.com/design/language/color)), Language support and Non-Latin scripts for the typeface ([Typeface](https://www.ibm.com/design/language/typography/typeface)).
- [PRIMARY-SOURCE FACT] `text`, `live`. Approval is described directly: bring the team in early, a Slack channel, and an email address for external agencies ([Support](https://www.ibm.com/design/language/help/support)). The What's new log is dated, the last entry is December 5, 2024 ([What's new](https://www.ibm.com/design/language/whats-new)), although the footer of the home page says "Last updated 05 November 2026" ([home](https://www.ibm.com/design/language/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. The principles are addressed not only to designers but to everyone who creates or approves design on behalf of IBM ([Principles](https://www.ibm.com/design/language/philosophy/principles)).
- [PRIMARY-SOURCE FACT] Did not open without sign-in: [ibm.com/brand](https://www.ibm.com/brand) redirects to login.ibm.com. By the "Foundations" menu, that is where Brand Center lives. IBM Experience Standards and IBM Design lead to the internal w3.ibm.com ([home](https://www.ibm.com/design/language/)).

**NHS Identity Guidelines.**
- [PRIMARY-SOURCE FACT] `text`, `live`. Navigation: 15 guideline pages (Colours, Fonts, Imagery, Naming principles, NHS logo, Organisational logos, Partnership branding, Partnership logo, Primary care logo, Service branding, Suppliers, Tone of voice, Visual styles, Who can use, Who cannot use). 16 example categories, among them apps, reports, signage, social media, stationery, uniforms, vehicles, websites. Separately Why it's important, FAQs, Downloads, Contact. Owner: NHS England on behalf of the Department of Health, licence Open Government Licence v3.0 ([home](https://www.england.nhs.uk/nhsidentity/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. At the base are six principles tied to the NHS Constitution and NHS values, and the rules themselves rest on research with patients, the public, and stakeholders ([Principles](https://www.england.nhs.uk/nhsidentity/why-its-important/identity-policy-and-principles/)). A report on this research is published (an item in the [navigation](https://www.england.nhs.uk/nhsidentity/), I did not read the report).
- [PRIMARY-SOURCE FACT] `text`, `live`. The tone page is short, seven paragraphs: qualities of writing, a personal manner when addressing patients, difficult topics, plain words. The examples are moved to the Identity examples section ([Tone of voice](https://www.england.nhs.uk/nhsidentity/identity-guidelines/tone-of-voice/)). The naming page is long, about 11.9 thousand characters: Legal requirements, Naming principles, structures, renaming, digital applications ([Naming](https://www.england.nhs.uk/nhsidentity/identity-guidelines/naming-principles/)).

**Mastercard.**
- [PRIMARY-SOURCE FACT] `text`, `live`, without sign-in. The brand requirements take about 88.5 thousand characters on one page: general rules, Configurations, Color specifications, Minimum size, Minimum clear space, Background contrast, the name in text, coexistence with other payment marks, co-branding, cards, physical points, digital payments, Click to Pay, contactless payments, Checkout Sound and Animation, ATMs, QR, Common mistakes to avoid ([requirements](https://www.mastercard.com/brandcenter/us/en/brand-requirements/mastercard.html)). The change log is marked "Updated December 2023" ([home](https://www.mastercard.com/brandcenter/us/en/home.html)).
- [PRIMARY-SOURCE FACT] `text`, `live`. Only part is closed: the design standards and card files for banks and manufacturers ([Card Artwork](https://www.mastercard.com/brandcenter/us/en/card-artwork.html)). The logo files are open, and downloading comes with an agreement ([Download](https://www.mastercard.com/brandcenter/us/en/download-artwork.html)). There is a history of the mark 1967–2019 ([Brand History](https://www.mastercard.com/brandcenter/us/en/brand-history.html)) and the address ask.brand.manager@mastercard.com ([home](https://www.mastercard.com/brandcenter/us/en/home.html)). There is no voice or mission in the headings, and a search for the words AI, artificial intelligence, and generative found nothing.

**Netflix.**
- [PRIMARY-SOURCE FACT] `text`, `live`. The home page has only Brand Logos, Sign In, Account Request ([home](https://brand.netflix.com/en/)). The public Logos page: the symbol and the logo with an explanation of when to choose which by recognition in the market, color in RGB, HEX, CMYK, PMS, clear space, a contrast threshold of 2.25:1 with a ready scale, special versions only with the brand team's consent, co-branding principles, a Things To Avoid list, the address brand@netflix.com ([Logos](https://brand.netflix.com/en/assets/logos/)). A Motion + Sonic Toolkit is mentioned there, but it is not itself visible. What is behind the login is unknown.

**Uber.**
- [PRIMARY-SOURCE FACT] `text`, `live`. The public menu of assets.uber.com: Home, Identity system, End Cards, Creative assets (Fonts, Logos), Co-marketing (assets and guides for merchants and partners), Support (Brand Desk), Sign-in ([home](https://assets.uber.com/)). The DOM of the home page still holds the Frontify placeholder text "Welcome to your cover page". The Our guidelines button opens the co-branding guide for Uber Eats ([document 468](https://assets.uber.com/document/468#/co-marketing-guidelines/uber-eats-co-marketing-guidelines)). I did not find a link to a document at the Identity system item in the DOM, and did not establish the cause.
- For the full 2020 guide see section 4.

**Starbucks.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2023-01-21. Menu: Theory, Case Studies, Core Elements, Logos, Color, Voice, Typography, Illustration, Photography. The page itself calls itself a high-level overview ([home](https://web.archive.org/web/20230121003133/https://creative.starbucks.com/)). Voice: a functional and an expressive voice with examples of signs, Rewards, Instagram, the website, print ads ([Voice](https://web.archive.org/web/20221207094238/https://creative.starbucks.com/voice/)). Logos: the siren, the logo, a timeline of 1971, 1987, 1992 ([Logos](https://web.archive.org/web/20221206195048/https://creative.starbucks.com/logos/)). The pages are short: home 213 words, Voice 228, Logos 109, counting the menu.

**Slack.**
- [PRIMARY-SOURCE FACT] `text`, `live`. The Media Kit gives logos and screenshots in four languages through Salesforce storage and sends users to Brand Center for the full rules ([media kit](https://slack.com/media-kit)). [brand.slackhq.com](https://brand.slackhq.com/) itself returned 404 in the browser.
- [PRIMARY-SOURCE FACT] `text`, archive, snapshots 2025-01-14 and 2026-08-29. The heading "The Slack brand center is under construction", with a suggestion to go to the Media Kit, and a sign-in. The markup still holds the navigation: Identity (About Slack, Brand values, Slack name), Elements (Logo, Brand architecture, Cobranding, Colors, Typography, Writing, Brand shapes, Emoji), Expression (Illustration, Photography, Motion, Video, Sound, Icons, UI, Swag), Experiences (events, CMS, Email, Spacesuit), Resources ([2025](https://web.archive.org/web/20250114171136/https://brand.slackhq.com/), [2026](https://web.archive.org/web/20260829022318/https://brand.slackhq.com/)). These are only labels, I did not see the content.

**Genres by the report's four criteria** (meaning, system, rules for creating something new, internal addressee):
- [RESEARCHER INFERENCE] Mozilla: a real brand book, all four criteria, in open access.
- [RESEARCHER INFERENCE] NHS: a brand standard, close to a brand book, but I did not see personality and positioning. I read only a part.
- [RESEARCHER INFERENCE] IBM: a visual system with a design philosophy. Little sense as a brand book, perhaps it is in the closed Brand Center, which cannot be checked.
- [RESEARCHER INFERENCE] Mastercard: external rules. Netflix: publicly a logo page with co-branding. Uber 2020: a brand standard. Uber today, publicly: partner rules and files. Starbucks: a showcase overview. Slack: publicly a logo page.

### Inferences
- [RESEARCHER INFERENCE] The sample bias was real: some of the richest public documents were simply not read by the tool. But it does not cancel the conclusion about logins: Netflix, IBM Brand Center, and the Mailchimp portal are closed for real.
- [RESEARCHER INFERENCE] The causes need to be separated. Client-side rendering, a login, bot protection, and an expired certificate give the same "empty result" from outside, but mean different things.
- [RESEARCHER INFERENCE] The update label really is misleading. At Mozilla, seven Visual Elements sections are marked with one minute, January 23, 2026 at 4:16 ([Logos](https://brand.mozilla.com/document/231#/-/logos), [Color](https://brand.mozilla.com/document/231#/-/color)), which looks more like a mass edit than an editorial revision of the content. At IBM the footer shows yesterday's date while the last log entry is from December 2024.

### Gaps
- Deutsche Telekom was not read: the browser did not open the site, and I did not try a live retry or the archive.
- NHS: colours, fonts, nhs-logo, downloads were not read, bot protection closed them. It must not be bypassed.
- What is behind the logins of Netflix, IBM Brand Center, and Uber is unknown. The content of the closed parts cannot be argued about.
- Uber Identity system: I could not tell whether the section is closed or whether I simply failed to find it in the DOM.

## 2. Small and young companies

### Takeaway
None of the five documents belongs to the small subgroup of the first audit (11 companies of group A), so the report's conclusion about small ones does not shift. Zapier: a visual guideline with a rare section on AI. Notion: a partner guide. The Mailchimp portal is closed by a login, not by "client-side rendering". Wise and Sentry could not be read.

### Cited Findings
- [PRIMARY-SOURCE FACT] `text`, `live`. **Zapier**, "Zapier Brand Guidelines 1.0": Principles, Logo, Platform, Color, Typography, Imagery, AI guidelines ([principles](https://brand.zapier.com/principles)). Six principles of the visual system, with no mission, audience, positioning, or voice. Logo: variants, clear space, Don'ts ([logo](https://brand.zapier.com/logo)). Grids are folded into the idea of Platform ([platform](https://brand.zapier.com/platform)). Color: CMYK, RGB, HEX, PMS, a separate Accessibility block ([color](https://brand.zapier.com/color)). Illustration and abstract images ([imagery](https://brand.zapier.com/imagery)). The Browse Assets button leads to the media.zapier.com login ([home](https://brand.zapier.com/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. Zapier's page about AI covers four principles: when to apply AI (briefs, scaling up, tight deadlines), when to be careful (a template exists, wide reach), how to evaluate the result, and which tools and prompts to use, about 6.7 thousand characters in all ([AI guidelines](https://brand.zapier.com/ai-guidelines)).
- [PRIMARY-SOURCE FACT] `text`, `live`. **Notion**: Trademark usage guidelines, rules for those who promote their own product (the name, the "Made for Notion" badge, how not to brand), for authors and communities, illustrations. The format is ✅ and 🚫, with examples of forbidden names ([Notion](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-689045e1761348f887a3c5c80295e00f)). Genre: a partner guide.
- [PRIMARY-SOURCE FACT] `text`, `live`. **brand.mailchimp.com** sends users to a sign-in form "Welcome to the Mailchimp Brand Portal", with the title "Log in - Intuit" and sign-in through SSO ([portal](https://brand.mailchimp.com/)). The genre cannot be determined.
- [PRIMARY-SOURCE FACT] `text`, `live`. **wise.design**: a site on Figma Sites, with the sections Inspiration, Direction, and a link to Docs. The labels Flags, Cards, Icons, Illustration, Logo, Motion, Photography, Product Demos, Tapestries, Tone of Voice, Typography, Colour are in the DOM but are not links ([direction](https://wise.design/direction)). The guessed address `/foundations/tone-of-voice` gave 404. The page code has a build date of 2026-11-02, and the site is live.
- [PRIMARY-SOURCE FACT] **sentry.io/branding** returned 403 in a real browser too ([page](https://sentry.io/branding/)). By the rule of the assignment I did not retry and did not go to the archive.
- [PRIMARY-SOURCE FACT] `text`, `live`. **Help Scout**: the landing page (276 words) promises Brand Foundation, Brand Messaging, Brand Identity, Brand System and gives two file archives, and the guide itself is in a Figma prototype ([brand](https://www.helpscout.com/brand/)). I did not open the prototype. In the first pass WebFetch did not read it, and I did not check whether the browser can extract the text. The comparison with 2016 is in section 4.

### Inferences
- [RESEARCHER INFERENCE] Zapier does not fit the report's genres. It is no longer a logo page (six principles, a system, AI rules for its own people and contractors), but it is not a brand book by the criterion of meaning either. A "visual guideline" genre is missing. IBM Design Language fits there too.
- [RESEARCHER INFERENCE] Zapier now has to be counted as two documents: the partner PDF from the first audit and this site.

### Gaps
- Wise: I did not click by coordinates and did not read docs.wise.design, so the genre and the voice of Wise remain unknown.
- Sentry: the site was not read. What remains is a skill on GitHub and the Content & Voice page from the first pass.
- Help Scout's Figma guide (claimed to be about 80 pages) was not read.

## 3. Russian-language documents

### Takeaway
Selectel fits the definition of a real brand book and confirms the rejection of do/don't. Kontur shows the most direct example of closed meaning: the brand platform, segments, and voice are visible in the menu but require sign-in. Shift turned out to be not a brand book but a large working knowledge base. Tochka was never read.

### Cited Findings

An important point about how this was read. The browser did not open the live addresses of Shift and brand.selectel.ru ("denied or failed"). I read archive copies: the Selectel address was in the list of snapshots in the notes, and I found the Shift copy by an address from the notes. I did not see the live state of these two sites.

- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2024-03-29. **Selectel**: a «живой документ» (living document) of two sections. About the company: who we are, what we do, figures, a timeline from 2007, five values, three audience groups, channels. Guideline: logo (clear space, size, a short version, favicon), colors (main, extended palette, proportion), fonts (system Arial as a replacement for Manrope), pictograms (library, construction), graphics (style principles, examples), mascot (character, history, allowed styles, stickers). Contact design@selectel.com, «Последние обновления: январь 2024» (Last updated: January 2024), 2512 words ([snapshot](https://web.archive.org/web/20240329120242/https://brand.selectel.ru/)). I read the headings, the first 3500 characters, the end of the page, and a word search.
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2026-01-22. The same contents, 2589 words, «Последние обновления: ноябрь 2024» (Last updated: November 2024), the channels renamed «Каналы и площадки» (Channels and venues) ([snapshot](https://web.archive.org/web/20260122071546/https://brand.selectel.ru/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. The author of the article lists the readers: an event and PR manager, a product manager, a designer. The reasons for leaving PDF: it became outdated and inconvenient for a large team. Figma was rejected because contractors and managers would find it complicated ([Habr](https://habr.com/ru/companies/selectel/articles/867256/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. **Kontur**: kontur.ru/brandbook opens and leads to in.kontur.ru/brandbook, a «Руководство по фирменному стилю» (Brand identity guide) for employees and partners. Sections: Brand (Brand platform, Architecture, Product colors, Client segments, Protoproduct), guides for nine products, Resources (logos, palette, icons, font, presentations, promotions), HR brand (brand platform, design constants, voice and character, IT brand communications), Events, Expert photo shoots, QR code ([brand book](https://in.kontur.ru/brandbook)).
- [PRIMARY-SOURCE FACT] `text`, `live`. The pages [Brand platform](https://in.kontur.ru/brandbook/platform), [Client segments](https://in.kontur.ru/brandbook/51775-customer_segments), [Voice and character](https://in.kontur.ru/brandbook/53263-golos_i_xarakter) show «Войдите, чтобы получить доступ к этому разделу» (Sign in to access this section). Without sign-in these opened: [Architecture](https://in.kontur.ru/brandbook/architecture), [Logo](https://in.kontur.ru/brandbook/logo-kontur) with an office sign and a name board named as carriers, [Palette](https://in.kontur.ru/brandbook/palette), [Font](https://in.kontur.ru/brandbook/font), [HR design constants](https://in.kontur.ru/brandbook/53189-dizajn_konstanty). I did not check the other pages.
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2025-12-09. **Shift**: materials for creative teams. At the top Logo, Colour palettes, Elements library, Layout templates, Principles of care, Tone of voice, Editorial politics, Glossary, Channels and media, below about 30 topical sections: design basics, catalog photography, launching social media in a new country, menus, key visuals, stories, video, packaging, adapting layouts by partners, info planning, retouching, team management ([en](https://web.archive.org/web/20251209162934/https://shift.dodobrands.io/en/)).
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2026-02-12. Shift's tone guide: 3277 words with navigation, the author is named. Scales such as open/without detail, witty/caustic, a description of a conversation about a customer, sections by channel and medium (product names and descriptions, interface, kiosks, promotions, SMS) ([ToV](https://web.archive.org/web/20260212010230/https://shift.dodobrands.io/en/tov-dodo-pizza)).
- [PRIMARY-SOURCE FACT] `text`, archive. The logo in six languages in all color models, downloadable without registration ([logo, 2025-09-13](https://web.archive.org/web/20250913164322/https://shift.dodobrands.io/en/logo)). Ten principles of customer care for the support service, 2000 words, with a note 1.0 in the text, probably the version ([care, 2026-03-14](https://web.archive.org/web/20260314085423/https://shift.dodobrands.io/en/principles-of-care)). Legal requirements for advertising, only for Eurasia ([legal, 2026-05-14](https://web.archive.org/web/20260514172412/https://shift.dodobrands.io/topic/legal-aspects)). The English editorial policy is not translated ([editorial, 2025-12-09](https://web.archive.org/web/20251209173754/https://shift.dodobrands.io/en/editorial-policy)).
- [PRIMARY-SOURCE FACT] **Tochka**: the live address gave `ERR_CERT_AUTHORITY_INVALID` ([tochka.com/brand](https://tochka.com/brand/)). The only snapshot I checked, from 2018, is empty, with one non-whitespace token ([snapshot](https://web.archive.org/web/20180828055845/https://tochka.com/brand/)).
- [PRIMARY-SOURCE FACT] `digest`. A search for new open Russian brand books gave nothing. A Sostav overview mentions Rostelecom, Yandex, and Pyaterochka, but this is a secondary description ([Sostav](https://www.sostav.ru/blogs/269942/49265)). I did not check.

### Inferences
- [RESEARCHER INFERENCE] Selectel passes the report's four criteria: meaning (who we are, values, audience), system, rules of construction, an addressee inside and contractors. Caveat: there is no voice, although the page promises to help with text communications, and the templates are closed.
- [RESEARCHER INFERENCE] By its contents Kontur is a brand book, but only the system is publicly visible. This is the cleanest confirmation of the report's thesis: the meaning exists and lies behind a login, rather than being absent.
- [RESEARCHER INFERENCE] Shift is not a brand book but the author's working tool. Together with the Dodo book they form a pair, "story and working base", and the report rightly describes their division.

### Gaps
- The live Shift and brand.selectel.ru were not read. The archive lacks some of Shift's topical pages in English.
- I did not open Kontur's text guide `/brandbook/text` or most pages of the brand book.
- In this pass I did not touch the PDFs of Litres, Rosseti, VDNKh, SurSU, and GASU.

## 4. Dated comparisons from the archive

### Takeaway
There is no single trajectory "from PDF to a live site". Mailchimp simplified from an interactive map to prose without examples, Monzo cut the number of principles and added a channel matrix, Help Scout added a strategy and moved to opaque Figma, Uber grew and then cut its public part, and Starbucks looks frozen.

### Cited Findings

| Document | Before | After | What changed |
|---|---|---|---|
| Mailchimp | `archive` 2012-12-18: a separate site, 24 screens of content types | `live`: one page of a large guide, © 2023 | The map by situations and the examples are gone |
| Monzo | `archive` 2018-03-27: 4 principles, 3379 words | `live`: 3 principles, a matrix of 6 channels, 2878 words | The principles, the name, and the structure changed |
| Help Scout | `archive` 2016-11-28: visual, text, code | `live`: foundation, messaging, identity, a system in Figma | A strategy is claimed, code is no longer part of it, the HTML site gave way to a Figma prototype |
| Uber | `archive` 2015-06-03: logo, system, font, video | `archive` 2020-12-31: 9 elements, 6486 words; `live`: co-branding and files | Growth, then a cut in the public part |
| IBM | `archive` 2014-12-24: product language | `live`: brand language, a log | From product-level to brand-wide |
| Spotify | `archive` 2016-06-02: files and restrictions on the name | `live`: integration rules, 2320 words | From a page of files to a partner guide |
| Starbucks | `archive` 2021-01-08 | `archive` 2026-10-11 | The same 213 words on the home page |
| Selectel | `archive` 2024-03-29: 2512 words | `archive` 2026-01-22: 2589 words | Barely changed |

**Mailchimp.**
- [PRIMARY-SOURCE FACT] `text`, archive. The 2012 snapshot: 24 content types, from mascot jokes to a violation warning ([home, 2012-12-18](https://web.archive.org/web/20121218151543/http://voiceandtone.com/)). The structure of a screen: what the user thinks, their feelings, advice, an example of Mailchimp text. On the [error screen](https://web.archive.org/web/2012/http://voiceandtone.com/failure-message) the feelings are named as confusion, stress, anger, and the advice is not to joke. On the [success screen](https://web.archive.org/web/2012/http://voiceandtone.com/success-message) one can be funny. The About page explains that the site "isn't meant to be used as a lookup tool" ([about](https://web.archive.org/web/2012/http://voiceandtone.com/about)). The inner screens were read in snapshots with © 2013. These data confirm the retelling on which the first note rested.
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2015-08-19. The Style Guide already exists, the voice is described with seven "X, but not Y" pairs (Fun but not silly and others), and there is a link to a separate Voice and Tone site ([voice-and-tone](https://web.archive.org/web/20150819150132/http://styleguide.mailchimp.com/voice-and-tone/)). There is a Content Types section and templates in Resources ([home](https://web.archive.org/web/20150819150132/http://styleguide.mailchimp.com/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. Today there are four traits instead of seven pairs: plainspoken, genuine, translators, dry humor. The reader's feelings are mentioned in one paragraph, there are no examples, three style tips, a note about the mascot ([voice-and-tone](https://styleguide.mailchimp.com/voice-and-tone/)). The footer says © Mailchimp 2023.

**Monzo.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2018-03-27. Four principles, the title Tone of Voice, a note 17 minutes, 3379 words with a table of contents, two Real life example blocks, a section saying this is not a rulebook, a responsible person is named, a section on emoji, no channels ([snapshot](https://web.archive.org/web/20180327221823/https://monzo.com/tone-of-voice/)).
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2022-12-31. The same four principles, 3763 words with service lines, with Use more verbs and fewer nouns, Try to keep your sentences under 20 words, We explain ideas as clearly as we can added ([snapshot](https://web.archive.org/web/20221231231214/https://monzo.com/tone-of-voice/)). This confirms the third-party diff from the first pass against the direct source.
- [PRIMARY-SOURCE FACT] `text`, `live`. Today the title is Monzo Writing Principles, three principles, 2878 words, a matrix of six channels. There are no headings about emoji, subheadings, and lists ([tone-of-voice](https://monzo.com/tone-of-voice/)).

**Help Scout.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2016-11-28. Brand Style Guide: three facets, visual, text, code. Sections: Brand (Color, Illustration, Logo, Typography), Copy (Ads, App, Email, Posts, Support), Icons, Marketing site, Mobile, Seed (an open CSS framework) ([intro](https://web.archive.org/web/20161128140159/http://style.helpscout.com:80/)). There is no mission, vision, or positioning in the navigation.
- [PRIMARY-SOURCE FACT] `text`, archive 2016. The level of specificity is high: colors in HEX by scale ([Color](https://web.archive.org/web/2016/http://style.helpscout.com/brand/color/)), do and don't for illustration ([Illustration](https://web.archive.org/web/2016/http://style.helpscout.com/brand/illustration/)), sizes and character limits in ads ([Ads](https://web.archive.org/web/2016/http://style.helpscout.com/copy/ads/)), tone and words for support, 1082 words with navigation ([Support](https://web.archive.org/web/2016/http://style.helpscout.com/copy/support/)).
- Today's state: [brand](https://www.helpscout.com/brand/), see section 2.

**Uber.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2015-06-03. "Uber Brand Guide": Logotype, Design System, Typography, Video, with the sub-items Tagline, Product Lockups, Partnerships ([snapshot](https://web.archive.org/web/20150603224529/https://brand.uber.com/)).
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2020-12-30. The home page names nine elements. On the site: Brand story, Guide, Showcase, Downloads, FAQ, Terms. Some files are on the internal domain brand-private.uberinternal.com, and among the materials is Agency Onboarding ([home](https://web.archive.org/web/20201230102356/https://brand.uber.com/)).
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2020-12-31. The guide itself on one page, 6486 words: Logo (with Localization and Partnerships), Brand Architecture (sub-brands, programs, products, features, names in text), Color, Composition (U-frame, grid), Iconography, Illustration, Motion, Photography, Tone of voice (Core: Considerate, Simple & Direct, Consistent; Supporting: Optimistic, Inviting, Bold), Typography. The sections have dates, for example Updated 12/05/2018 and 02/12/2019 ([guide](https://web.archive.org/web/20201231131204/https://brand.uber.com/guide)). Requests go through JIRA ([faq](https://web.archive.org/web/20210122200234/https://brand.uber.com/faq)).

**IBM.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2014-12-24. Framework: Experience, Visual (Layout, Typography, Iconography, Color), Interaction (Info Arch, Touch, Motion), Front End, a shared vocabulary for products ([snapshot](https://web.archive.org/web/20141224190224/https://www.ibm.com/design/language/)). For today's contents see section 1. Philosophy, logos, photography, infographics, and a log appeared, and Front End disappeared.

**Spotify.**
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2016-06-02. Design Resources: downloads and restrictions on the app's name and logo ([snapshot](https://web.archive.org/web/20160602192707/https://developer.spotify.com/design/)).
- [PRIMARY-SOURCE FACT] `text`, archive, snapshot 2023-03-27: Design Guidelines, 2356 words ([snapshot](https://web.archive.org/web/20230327102836/https://developer.spotify.com/documentation/design)). `live`: Design & Branding Guidelines, 2320 words, rules for attribution, content display, browsing, players, logo ([live](https://developer.spotify.com/documentation/design)). This is a guide for developers, not for the brand as a whole. I did not look for broader public Spotify materials.

**Starbucks.**
- [PRIMARY-SOURCE FACT] `text`, archive. The 2019-07-20 snapshot contains only "Hello World" ([snapshot](https://web.archive.org/web/20190720044227/http://creative.starbucks.com/)). The earliest substantive snapshot I viewed is 2021-01-08 ([snapshot](https://web.archive.org/web/20210108165639/https://creative.starbucks.com/)). The title and word count of the home page match in the snapshots of 2021-12-24, 2023-01-21, and 2026-10-11 ([2026](https://web.archive.org/web/20261011225634/https://creative.starbucks.com/)), and for Voice in the snapshots of 2022-12-07 and 2026-02-21 ([2026](https://web.archive.org/web/20260221174554/https://creative.starbucks.com/voice/)). I did not compare the text letter by letter.

### Inferences
- [RESEARCHER INFERENCE] The most useful format for a small company was Mailchimp's in 2012, and the company abandoned it. The pages do not give the reasons, so I do not claim any. It is reasonable not to count today's form as the best just because it is newer.
- [RESEARCHER INFERENCE] Monzo's change did not go toward growth. There are fewer principles, and by the rough counters less text, but a rule of application appeared: which trait in which channel.
- [RESEARCHER INFERENCE] Help Scout and Selectel chose opposite carriers: Selectel gave up Figma for the sake of contractors and managers, while Help Scout publishes a Figma prototype. I did not read Help Scout's reasons. For machine reading the prototype is probably worse than HTML, but I did not check this.
- [RESEARCHER INFERENCE] The expired certificate and the unchanging text of Starbucks are compatible with abandonment, but do not prove it: the document may be working inside the company.

### Gaps
- I did not go through the Uber snapshots between 2015 and 2020, so the moment of the rebuild is not determined. The exact moment the guide was closed is also unknown.
- A request to the archive's CDX index from a snapshot page returned an HTML page of the archive, so there is no full list of snapshots. "Earliest" means the archive's answer to a request with the date 1996.
- The comparison of the Monzo and Help Scout texts was made by headings and first paragraphs, not by a full diff.

## 5. Historical sources

### Takeaway
For British Rail there is now a manual structure from the archive copy of a specialized site. The pages of the NYCTA and EPA publisher opened, but they describe the books, not the contents. RIT did not open. The manuals themselves, apart from NASA, are still unread.

### Cited Findings

The site doublearrow.co.uk gave the certificate error `ERR_CERT_AUTHORITY_INVALID` at the live address. I read a copy in the archive, which does not fix or check the site's certificate.

**British Rail** (a collector's site, not a British Rail publication; I see the site's description and the list of sheets, I did not open the scans):
- [EXPERT OPINION] `text`, archive, snapshot 2023-12-09. The page says: four volumes in ring binders, issued in three batches. Volume 1, July 1965: symbol, logo, font, color. Volume 2, November 1966: print advertising and additional sheets. Volumes 3 and 4, April 1970: architecture and signs, rolling stock, track equipment, road vehicles, ships, container trains, uniforms, stationery, other, appendices with an index. Two sections stayed empty ([manual](https://web.archive.org/web/20231209155303/https://www.doublearrow.co.uk/manual.htm)).
- [PRIMARY-SOURCE FACT] `text`, archive, the same snapshot. The list of sheets shows how the document lived: each sheet has a date, outdated ones are marked Obsolete, there is a List of Sheets from July 1969 and October 1976, and forewords by successive heads ([manual](https://web.archive.org/web/20231209155303/https://www.doublearrow.co.uk/manual.htm)). Separate information sheets were issued in volumes by topic: announcements in cabs and carriages, catering service, data panels and others ([covers](https://web.archive.org/web/20231208051836/https://www.doublearrow.co.uk/covers_contents.htm)).
- [EXPERT OPINION] `text`, archive. The author of the site writes that the archive of British Rail originals survived poorly and some documents were thrown away ([home](https://web.archive.org/web/20230117141400/https://www.doublearrow.co.uk/home.htm)).

**NYCTA:**
- [VENDOR] `text`, `live`. Publisher: a scan of the Vignelli and Noorda manual, describes the design and making of subway signs, a reissue of 356 pages, 10 × 10 inches ([full-size](https://standardsmanual.com/products/nycta-graphics-standards-manual-full-size-edition)). On the [compact edition](https://standardsmanual.com/products/nyctacompactedition) there is an essay by Bonanos and a gallery. The address from the notes `/products/nycta-graphics-standards-manual` gives 404, and the old thestandardsmanual.com in a 2022 snapshot already shows a store ([snapshot](https://web.archive.org/web/20221224204052/https://thestandardsmanual.com/)).
- [PRIMARY-SOURCE FACT] `digest`. The search summary cites a library record of the 2014 edition: [8] p., 174 sheets. Among the results are the catalogs [ECU](https://lib.ecu.edu/catalog-preview/catalog/4590371) and [CTU](https://libwebpac.ctu.edu.tw/toread/opac/bibliographic_view/385732), and the summary did not say which one. I did not open the records themselves. I found a table of contents nowhere. I did not look at the gallery.

**EPA:**
- [VENDOR] `text`, `live`. The publisher's page: the system was developed by Steff Geissbühler of Chermayeff & Geismar, there is his introduction about the agency's history and the project's context, and a story about the end of the program under a new head of the agency around 1980 is claimed ([epa](https://standardsmanual.com/products/epa)). In the part I read, the page does not give the contents of the manual itself.

**RIT, Vignelli Center:**
- [PRIMARY-SOURCE FACT] The browser did not open [rit.edu/vignellicenter](https://www.rit.edu/vignellicenter/) ("denied or failed"). I did not retry.

### Inferences
- [RESEARCHER INFERENCE] British Rail supports the report's idea: an index of valid sheets with obsolescence marks worked as a change log. This is stronger than what the NASA report had, because here there are dated sheets and a formal cancellation.
- [RESEARCHER INFERENCE] British Rail's list of sections matches the answer to the question "how to produce": there is no strategy in the headings, but the conclusion is drawn from the headings.

### Gaps
- The NYCTA, EPA, and British Rail scans were not opened, so sections about the document itself are known only for NASA.
- Vignelli Center was not read.

## 6. Reconciling claims based on digests

### Takeaway
Of eight checks, one did not match (the voice coding for PostHog: it has a full section), one is resolved (Mailchimp), and the rest are confirmed with small refinements. Along the way one more overstatement was found in the report: Monzo does not require the active voice always.

### Cited Findings

| Claim | Result | What is on the page |
|---|---|---|
| Monzo: three principles and a channel matrix | **Matches** | Straightforward kindness, Everyday magic, Warm wit. Six channels with levels (see below) ([live](https://monzo.com/tone-of-voice/)) |
| Mailchimp: no examples on the voice page | **Matches** | Only prose and three style tips ([live](https://styleguide.mailchimp.com/voice-and-tone/)) |
| Mailchimp: four principles or five qualities | **Resolved** | The voice page: four traits ([live](https://styleguide.mailchimp.com/voice-and-tone/)). The neighboring page: five goals (Empower, Respect, Educate, Guide, Speak truth) and four qualities of text (Clear, Useful, Friendly, Appropriate) ([writing-principles](https://styleguide.mailchimp.com/writing-principles/)). "Five qualities" for the voice is wrong |
| PostHog: voice coded as "partial" | **Does not match** | A separate Voice & tone page: core principle, what to avoid, dos and don'ts for headlines, text, errors, emails, social media ([tone](https://posthog.com/handbook/brand/tone)). The audit should say Y |
| GOV.UK: 44 pages on the brand site | **Almost matches** | The site map has 45 links: 44 substantive ones and the accessibility statement ([sitemap](https://brand.design-system.service.gov.uk/sitemap/)) |
| Spotify: clear space and minimum | **Matches** | Half the height of the icon; logo 70 px and 20 mm, icon 21 px and 6 mm ([live](https://developer.spotify.com/documentation/design)) |
| Supabase: color spaces | **Matches, address changed** | HEX, RGB, HSL, OKLCH. No CMYK or Pantone. /brand-assets redirects to /brand, and the headings are now Icon, Wordmark, One-color wordmark, Colors, Integrations, Which file to use, Name, Usage, not as in the notes ([live](https://supabase.com/brand)) |
| Selectel: rejection of do/don't | **Matches, source refined** | It is written not in the article but in the author's comment ([Habr](https://habr.com/ru/companies/selectel/articles/867256/comments/)). Two reasons: there are too many cases, a full list would bloat the document, an incomplete one looks like a formality. All layouts pass design department review anyway. In the snapshots [2024](https://web.archive.org/web/20240329120242/https://brand.selectel.ru/) and [2026](https://web.archive.org/web/20260122071546/https://brand.selectel.ru/) a word search found no such block |

Label: [PRIMARY-SOURCE FACT], `text` for all rows of the table, the state is in the link.

- [PRIMARY-SOURCE FACT] `text`, `live`. The Monzo matrix, in the order Straightforward kindness / Everyday magic / Warm wit: Operational comms Maxed out / Low / None; Customer service High / Low / None; Marketing comms High / Medium / Medium; Campaigns High / High / High; Paid social High / High / High; Organic social High / High / Maxed out ([live](https://monzo.com/tone-of-voice/)).
- [PRIMARY-SOURCE FACT] `text`, `live`. In customer support Monzo explicitly rules out jokes, because the cost of a mistake is higher than the gain. In operational emails it advises not to overcomplicate bad news ([live](https://monzo.com/tone-of-voice/)). The report (the line about "a ban in a situation") conveys this correctly.
- [PRIMARY-SOURCE FACT] `text`, `live`. On the active voice, Monzo allows rare cases where the responsible party is deliberately not named, for a good reason ([live](https://monzo.com/tone-of-voice/)). "Always" in section 6 of the report is overstated.

### Inferences
- [RESEARCHER INFERENCE] The quality of the digests turned out better than one could fear: the numbers mostly matched. The errors were in counting homogeneous items and in coding sections across neighboring pages.

### Gaps
- I checked only these claims. Other numbers from the digests remain unchecked.

## What changes in the report

The report's address: `docs/research/brand-book-anatomy.md`. The line number is given for searching as of the time of reading.

### Corrections: refuted or outdated

1. **Section 10, "Archive" (line 468).**
   - Now: "No archived state has been read, there are no 'before and after' comparisons from the archive."
   - New: the browser opens web.archive.org, snapshots of Mailchimp, Monzo, Help Scout, Uber, IBM, Spotify, Starbucks, Selectel, Shift, Slack, British Rail were read.
   - Replacement: "Web.archive.org did not open in the first pass. In the second pass the archive was read in the browser, and comparisons are given for eight documents. The snapshot date remains an upper bound. There is no full list of snapshots."

2. **Section 10, "Closedness and technique" (line 472).**
   - Now: Netflix and brand.mailchimp.com are named as sites with client-side rendering; Mastercard, kontur.ru/brandbook, and sentry together as 403.
   - New: Netflix and Mailchimp are closed by a login. Mastercard and Kontur are open in the browser. Sentry is still 403. NHS has bot protection, Slack has a dead link, Starbucks has an expired certificate.
   - Replacement: replace the paragraph with the table of causes from section 1 of these notes and add: "Closedness is confirmed only where there is a sign-in form or an access notice."

3. **Section 3, table, the row "Environment" (line 117).**
   - Now: for large ones, "Not once in modern documents".
   - New: NHS has the example categories signage, vehicles, uniforms ([NHS](https://www.england.nhs.uk/nhsidentity/)); Mastercard has sections on physical points and ATMs ([Mastercard](https://www.mastercard.com/brandcenter/us/en/brand-requirements/mastercard.html)); Kontur names an office sign and a name board ([Kontur](https://in.kontur.ru/brandbook/logo-kontur)); Shift has pizzeria interiors ([Shift](https://web.archive.org/web/20251209162934/https://shift.dodobrands.io/en/)).
   - Replacement: "Found in organizations with physical locations: NHS, Mastercard, Kontur, Shift; more often at the level of a heading." The original wording is refuted.

4. **Section 3, table, the row "Motion, sound" (line 113).**
   - Now: for large ones, "A few, sound in one".
   - New: Mastercard describes Checkout Sound and Animation ([Mastercard](https://www.mastercard.com/brandcenter/us/en/brand-requirements/mastercard.html)); Netflix mentions a Motion + Sonic Toolkit ([Netflix](https://brand.netflix.com/en/assets/logos/)); Slack has a Sound item ([Slack](https://web.archive.org/web/20250114171136/https://brand.slackhq.com/)). Motion is a section at IBM and Mozilla.
   - Replacement: "Motion is found noticeably more often in portals than in PDFs; sound is rare but not isolated: Visa, Mastercard, mentions at Netflix and Slack."

5. **Section 3, table, the row "AI rules" (line 116).**
   - Now: for small ones, "Field not counted", examples only of prohibitions.
   - New: Zapier has a separate page of 6.7 thousand characters, not only with prohibitions ([Zapier](https://brand.zapier.com/ai-guidelines)).
   - Replacement: add Zapier as an example of permissive rules: "when to apply AI and when to be careful".

6. **Section 3, table, the row "Grid" (line 112).**
   - Now: for large ones, "navigation only", for small ones, "None".
   - New: at IBM the content of 2x Grid was read ([IBM](https://www.ibm.com/design/language/2x-grid)); at Zapier grids are described as Platform ([Zapier](https://brand.zapier.com/platform)); at Uber, Composition with Grid setup ([Uber](https://web.archive.org/web/20201231131204/https://brand.uber.com/guide)).
   - Replacement: large ones, "Fewer than half, there are substantive examples (IBM, Uber)". For the small subgroup keep "None" with a note that Zapier is not part of it.

7. **Section 10, "Russian-language sample" (line 478).**
   - Now: "Shift, brand.selectel.ru, kontur.ru/brandbook, Tochka did not open"; for Selectel only the article on Habr was read.
   - New: Kontur was read `live` with login sections, Selectel and Shift were read in the archive, Tochka was not.
   - Replacement: "Selectel and Shift were read from archive snapshots, the live address does not open from our environment; Kontur opens, but the brand platform, segments, and voice require sign-in; Tochka is unavailable."

8. **Section 10, "Historical manuals" (line 476).**
   - Now: "British Rail is known only from Wikipedia, the site with the manual did not open."
   - New: the archive copy of doublearrow.co.uk shows the contents and dating of the four volumes.
   - Replacement: "British Rail is known from the description and the list of sheets on a collector's site in an archive copy, the scans were not viewed." Add that the NYCTA publisher's address changed.

9. **Section 6, "Active voice always (GOV.UK, Monzo)" (line 300).**
   - Now: "always".
   - New: Monzo allows rare deliberate exceptions.
   - Replacement: "almost always; Monzo leaves an exception for a good reason". Check whether this repeats for GOV.UK; I did not reconcile its wording.

10. **Section 6, "Tone map" (line 274).**
    - Now: 4–6 situations, based on Shopify, Monzo, Atlassian.
    - New: Monzo's map is by channel, not by situation. A direct model of a map by feelings: Mailchimp 2012, 24 screens ([archive](https://web.archive.org/web/20121218151543/http://voiceandtone.com/)). Mozilla has a map by addressee.
    - Replacement: "A map comes in three kinds: by situation (Shopify), by channel (Monzo, Shift), by addressee (Mozilla); a historical model by the reader's feelings, Mailchimp 2012."

11. **Section 7, the table of carriers, the row "Document or Notion" (line 317).**
    - Now: "There are no public examples in the sample."
    - New: Notion itself has a rules page on notion.site ([Notion](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-689045e1761348f887a3c5c80295e00f)), and the Editorial policy of Т—Ж (T—Zh) in the first audit is published as a Google Doc.
    - Replacement: "There are isolated examples (Notion about itself, Т—Ж), no comparisons." The Notion example is weak: the company writes in its own product.

12. **Section 1, the table of genres (line 52).**
    - Now: Zapier only among partner rules, there is no genre for a visual system without meaning.
    - New: brand.zapier.com and IBM Design Language do not fit into the six genres. Shift does not either.
    - Replacement: add a row "Visual guideline: how the brand looks and how to create new materials; the author of the materials; Zapier, IBM Design Language" and mark Shift as the team's working base.

13. **Section 4, the row "Carrier" (line 141).**
    - Now: Slack is the example for the row "Portal, DAM, login".
    - New: the file storage works, but the Media Kit leads to Brand Center, which `live` gives 404 and which shows a placeholder in snapshots from January 2025 to August 2026.
    - Replacement: "Slack: the DAM for files works, the full Brand Center is unavailable." For the login example take Netflix or IBM Brand Center.

### Refinements: correct, but need to be supplemented

14. **Section 3, the paragraph on closed strategy (line 94).**
    - Now: "There are counterexamples: Dodo and PostHog."
    - New: confirmation: Kontur shows the brand platform, segments, and voice in the menu, with the content behind a login; IBM Brand Center is behind a login. Counterexamples: Mozilla and Selectel publish the meaning in full.
    - Replacement: "Counterexamples: Dodo, PostHog, Mozilla, Selectel. Direct confirmation: at Kontur the meaning is visible in the menu and closed by sign-in."

15. **Section 3, the paragraph on genres (line 119).**
    - Now: only two real brand books and one hybrid; among small ones 10 documents out of 11 are logo pages.
    - New: by the four criteria Mozilla and Selectel also pass; Kontur passes with the caveat that the meaning is behind a login; Help Scout claims such contents but was not read.
    - Replacement: leave the figures of the first audit as they are and add: "In the second pass two confirmed brand books and one closed in part of its meaning were added to them. All three are outside the small subgroup, so the estimate of 10 out of 11 does not change. Probably, in the large group there are more real brand books than the first pass showed."

16. **Section 6, on Mailchimp (line 239).**
    - Now: no examples. This is correct.
    - New: in 2012 every screen had an example and advice, in 2015 seven "X, but not Y" pairs.
    - Replacement: add: "In the 2012 snapshot there was an example on each of the 24 screens; today it is a page of a large guide. We do not know why the map was abandoned."

17. **Section 10, "Digests" (line 470).**
    - Now: the disagreement about the voice of Mailchimp, GOV.UK, PostHog and the Uber PDF is not resolved.
    - New: Mailchimp is resolved (four traits; five refers to the goals of the neighboring page). PostHog: Y. GOV.UK: 44 plus the accessibility statement. Uber: the 2020 snapshot shows the official guide with section dates from late 2018 and early 2019. This is compatible with the PDF of October 2018, but I did not reconcile the file itself with the archive.
    - Replacement: move these items to "resolved", and for Uber write "indirectly supported".

18. **Section 5, "Fate" and forgetting.**
    - New: Starbucks has an expired certificate with an unchanged word count, Slack has a dead link, Mailchimp has © 2023, Mastercard's last entry about requirements is December 2023.
    - Replacement: can be added as an observation at the `[inference]` level: "Abandonment of public copies occurs at large companies too; this is not data about internal use."

19. **Section 7, the update label (line 362).**
    - New: Mozilla, one minute for seven sections; IBM, a footer of November 5, 2026 with a log whose last entry is December 5, 2024.
    - Replacement: add both examples as confirmation, next to Microsoft.

20. **Section 3, "What was in historical standards" (line 125).**
    - New: British Rail has dated sheets and an Obsolete mark.
    - Replacement: supplement the correspondence with modern forms: "An index of valid sheets with formal cancellation is visible at British Rail." The phrase "only NASA was read in the document itself" remains correct.

21. **Section 7, length (lines 327, 329).**
    - New: Uber 2020: one screen of 6486 words; Mastercard: about 88.5 thousand characters on a page; Starbucks: pages of about 100–230 words; NYCTA: 174 sheets in the library record and 356 pages in the reissue. GOV.UK has 44 plus the accessibility statement.
    - Replacement: add these examples to the spread. For NYCTA give both figures with sources, because they are different editions.

### Confirmed without changes

22. **Section 3.** Logo and files stay in the first places in the new documents too (logo 13 of 13, files 12 of 13).
23. **Section 1, line 58.** Monzo without logo and color, confirmed by headings. Dodo moves the rules to Shift, Shift exists and is large.
24. **Section 3, lines 99, 102.** Spotify: clear space and minimums. Supabase: four spaces. The label can be raised from `digest` to `text`, and the Supabase link updated to /brand.
25. **Section 4, line 141.** Selectel: the PDF was replaced by a site. The article confirms this.
26. **Section 6, line 255.** Monzo forbids jokes in support and simplifies bad news.
27. **Section 7, line 342.** Half the height of the icon at Spotify.

### How the picture of frequencies shifts

These 13 documents cannot be added to the 24 and 19 of the first audits or counted as a share: they were chosen because the first pass did not read them, and the suspicion of richness was there beforehand. Slack is visible only as navigation, and some documents were read in the archive.

| Section | In the report's table for large ones | Eight new large ones, any form | What this means |
|---|---|---|---|
| Logo, files | Almost all | 8 of 8 and 7 of 8 | No change |
| Voice and tone | About a quarter | 5 of 8 | Noticeably higher, probably portals publish voice more often than PDFs and external rules |
| Mission, values | A few | 5 of 8 | Higher, but twice a mention and once a menu label |
| Positioning, audience, personality | A few | Positioning 1 of 8, audience 3, personality 2 | Almost no change; the main thesis holds |
| Typography, color | About half, mostly navigation | 6 and 8 of 8, but the text was read in only 1 and 3 cases | Navigation remains most of the count |
| Motion | A few | 6 of 8 | Much higher |
| Sound | At one | 3 of 8, still few | More than one, but the content was read in part |
| Architecture, co-branding | About a third, more than half | 5 and 5 of 8 | Within the earlier estimates |
| Environment | Not once | 3 of 8 | The wording is refuted |
| AI rules | A few | 0 of 8 | The only new example, Zapier, is outside this group |

Small companies and scale-ups (Zapier, Notion, Selectel, Shift, Kontur) show the same stratification: Selectel and Kontur contain meaning, Zapier and Notion do not, and Shift covers voice and application while lacking a mission.

[RESEARCHER INFERENCE] The thesis of section 3, "public documents protect the mark and rarely explain the brand", needs to be softened only for rich portals: there mission and voice appear noticeably more often, while positioning remains rare. I recommend this wording: "Public documents most often protect the mark. Voice and values appear in brand standards portals, positioning and audience are rare everywhere, and part of the meaning exists but is hidden behind a login." There is no new data for the small subgroup of the first audit: none of the documents of this pass belongs to it.
