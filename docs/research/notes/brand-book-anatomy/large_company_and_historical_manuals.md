# Brand books of large organizations and historical graphic standards: audit of primary sources

How to read these notes.

- **Access date** for all sources: 2026-11-06. All sources are live, except the copies noted.
- **What "read" means.** The WebFetch tool returns a retelling of the page by a service model, not raw HTML. So for web pages, "read" means "read through this retelling". The Visa, Uber, Adobe, and NASA PDFs were read directly from the text layer: WebFetch saved the files itself, and the text was extracted locally with the pypdf library. No document was downloaded through the shell or a browser. For NASA, the text layer comes from optical character recognition (OCR) of a scan. I did not look at the illustrations.
- **Environment limits.** (1) The tool does not open web.archive.org, so **no archived state was read**. (2) The WebSearch limit ran out during the work (it is shared by all agents), so the queries about British Rail, Lufthansa, Russian public joint-stock companies, and the Red Hat changelog were not run. (3) Some sites returned 403, 429, 404, an empty JS shell, or a certificate error. I did not look for workarounds and did not use a proxy.
- **Labels.** Five labels from the assignment. A retelling of press, Wikipedia, and search summaries is marked `[EXPERT OPINION, secondary]`. This is not an opinion. It is a retelling of someone else's text that I have not verified, and the assignment has no separate label for this case. Treat it as weaker than a primary source.

## Which sections the documents of modern large organizations contain (inventory)

### Takeaway
A large organization's public "brand book" is rarely one document. The 19 sources actually opened fall into three genres: brand standards or a portal (7), external rules for partners and third parties (8), and a design system or style guide (4). Logo, legal, and contact appear almost everywhere. Mission, positioning, and audience appear almost nowhere.

### Cited Findings

#### Sample passport

Group A: brand standards. Group B: external rules. Group C: design system or style.

| Organization | Grp. | URL | Format | Size (verified only) | State | How read |
|---|---|---|---|---|---|---|
| Red Hat | A | [standards](https://www.redhat.com/en/about/brand/standards) (brand.redhat.com returns a 301 to it) | Web portal, partly behind a login | About 29 navigation items | live | Partly: root + 5 pages |
| Dropbox | A | [brand.dropbox.com](https://brand.dropbox.com/) + [branding](https://www.dropbox.com/branding) | Web portal + legal page | 8 sections | live | Partly: 3 sections + legal page |
| Wikimedia | A | [Brand](https://meta.wikimedia.org/wiki/Brand) + [Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy) | Wiki | Policy about 127k characters with surrounding material | live | Portal: root. Policy: first 100k characters |
| Ubuntu (Canonical) | A | [design.ubuntu.com/brand](https://design.ubuntu.com/brand) | Web page | Short | live, footer © 2023 | Root + logo page |
| Uber | A | [Brand system quick guide](https://cdn.shopify.com/s/files/1/0565/3423/7349/files/Uber_2018.pdf) | PDF for partners | 10 slides | Copy on a third-party host, October 2018 | In full, text layer |
| Visa | A | [Fundamental Brand Standards](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf) | PDF | 16 pages | live, September 2025 | Almost in full, text layer |
| NASA | A | [Brand Center](https://www.nasa.gov/nasa-brand-center/) | Web portal | Not determined | live, updated 2024-09-28 | Root only (a subpage returned 429) |
| Apple | B | [Guidelines](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html) | Web page | 7 sections | live | In full |
| Salesforce | B | [Usage guidelines](https://www.salesforce.com/company/legal/tmcusageguidelines/) | Web page | Not measured | live, 2023-06-12 | In full |
| Adobe | B | [Trademark Guidelines](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf) | PDF | 13 pages | live, 2021-03-24 | Table of contents and pp. 3, 4, 8, 12; headings only for the rest |
| Google | B | [Partner Marketing Hub](https://partnermarketinghub.withgoogle.com/brands/google/overview/) | Web portal, mostly behind a login | Not determined | live | Overview page only |
| Spotify | B | [Design & Branding](https://developer.spotify.com/documentation/design) | Web page | 11 sections | live | Full text, no images |
| Shopify | B | [Brand assets](https://www.shopify.com/brand-assets) | Web page | 10 do/don't examples | live | In full |
| Cisco | B | [Brand Center](https://www.cisco.com/c/en/us/about/brand-center.html) | Web portal | 5 sections | live | Root only |
| Yandex | B | [Правила логотипа](https://yandex.ru/company/rules/logotype) [Logo rules] | Web page | 7 items | live | In full |
| Microsoft | C | [Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) | Web guide | Not determined | live | 3 pages out of many |
| Atlassian | C | [atlassian.design](https://atlassian.design/foundations) | Design system | Not determined | live | Navigation only |
| GOV.UK | C | [Style guides](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/) + [Design System](https://design-system.service.gov.uk/) | Web guide + design system | Not determined | live | Roots + changelog |
| USWDS | C | [What's new](https://designsystem.digital.gov/about/whats-new/) | Design system | Not determined | live | One page only |

#### Section matrix

Codes: `Y` the section exists and its content was read. `P` partial: there is no section as such, or only a mention. `N` listed in navigation or table of contents, content not read. `L` link to a separate document. `–` not visible in what was read; **this is not proof of absence**.

Group A, brand standards:

| Field | Red Hat | Dropbox | Wikimedia | Ubuntu | Uber (2018) | Visa | NASA Brand Center |
|---|---|---|---|---|---|---|---|
| Mission/goals/values | P | – | – | Y | – | – | – |
| Positioning/strategy | P | P | – | – | – | – | – |
| Audience | P | – | – | – | – | – | – |
| Brand character | Y | P | – | – | – | – | – |
| Voice and tone | Y | Y | – | – | – | – | – |
| Naming/grammar | N | P | – | – | – | Y | – |
| Logo | N | Y | N | P | Y | Y | P |
| Color | N | N | N | P | Y | Y | – |
| Typography | N | N | N | N | Y | P | – |
| Images/illustration | N | N | N | – | P | – | L |
| Layout/grid | P | P | – | – | P | P | – |
| Motion | – | N | – | – | – | Y | – |
| Sound | – | – | – | – | – | Y | – |
| Application examples | N | – | N | – | – | Y | – |
| Do/don't | Y | Y | – | – | – | Y | P |
| Legal/trademarks | N | Y | Y | P | – | P | Y |
| Downloadable materials | N | L | N | N | Y | Y | – |
| Contact/owner | Y | Y | Y | P | P | P | P |
| Version/changelog | N | – | Y | – | P | P | P |
| Architecture/sub-brands | Y | – | N | – | P | Y | – |
| Co-branding/partners | Y | L | P | – | Y | Y | P |
| Governance/approval | P | P | Y | – | Y | Y | Y |
| Localization | – | – | P | – | – | Y | – |
| Accessibility | – | – | – | N | P | Y | – |
| Environment/navigation | – | – | – | – | – | – | – |
| AI rules | P | – | – | – | – | – | – |

Group B, external rules:

| Field | Apple | Salesforce | Adobe | Google | Spotify | Shopify | Cisco | Yandex |
|---|---|---|---|---|---|---|---|---|
| Mission/goals/values | – | – | – | – | – | – | – | – |
| Positioning/strategy | – | – | – | – | – | – | – | – |
| Audience | – | – | – | – | – | – | – | – |
| Brand character | – | – | – | – | – | – | – | – |
| Voice and tone | – | – | – | – | – | – | – | – |
| Naming/grammar | Y | Y | Y | Y | Y | – | – | – |
| Logo | Y | P | Y | – | Y | Y | P | Y |
| Color | – | – | – | – | Y | – | – | – |
| Typography | – | – | – | – | Y | – | – | – |
| Images/illustration | P | – | – | – | Y | – | N | – |
| Layout/grid | – | – | – | – | P | – | – | – |
| Motion | – | – | – | – | – | – | – | – |
| Sound | – | – | – | – | – | – | – | – |
| Application examples | – | – | – | – | Y | – | – | – |
| Do/don't | Y | Y | Y | – | Y | Y | – | Y |
| Legal/trademarks | Y | Y | Y | P | L | L | N | Y |
| Downloadable materials | – | – | – | – | N | Y | N | Y |
| Contact/owner | Y | Y | Y | Y | P | – | P | Y |
| Version/changelog | – | P | P | – | – | – | – | P |
| Architecture/sub-brands | – | – | – | N | – | – | – | – |
| Co-branding/partners | P | Y | P | P | Y | – | – | P |
| Governance/approval | P | Y | P | P | – | – | P | P |
| Localization | P | – | – | – | P | – | – | P |
| Accessibility | – | – | – | – | L | – | – | – |
| Environment/navigation | – | – | – | – | – | – | – | – |
| AI rules | – | P | – | – | – | – | – | – |

Group C, design system or style:

| Field | Microsoft (style) | Atlassian | GOV.UK | USWDS |
|---|---|---|---|---|
| Mission/goals/values | – | – | – | – |
| Positioning/strategy | – | – | – | – |
| Audience | P | – | – | – |
| Brand character | P | – | – | – |
| Voice and tone | Y | N | N | – |
| Naming/grammar | P | N | N | – |
| Logo | – | N | P | – |
| Color | – | N | N | N |
| Typography | – | N | N | N |
| Images/illustration | – | N | – | – |
| Layout/grid | – | N | N | N |
| Motion | – | P | – | – |
| Sound | – | – | – | – |
| Application examples | – | – | N | N |
| Do/don't | P | – | – | – |
| Legal/trademarks | – | – | P | – |
| Downloadable materials | – | – | N | Y |
| Contact/owner | Y | – | Y | P |
| Version/changelog | Y | – | Y | Y |
| Architecture/sub-brands | – | – | – | – |
| Co-branding/partners | – | – | – | – |
| Governance/approval | – | – | P | P |
| Localization | Y | – | – | – |
| Accessibility | – | N | – | – |
| Environment/navigation | – | – | – | – |
| AI rules | – | N | – | – |

#### Sections by organization

**Red Hat**
- [PRIMARY-SOURCE FACT] Navigation: core (platform, personality, history, the hat, architecture, naming and marks); 6 types of logos; visual language (color, fonts, photography, 3D illustration, three kinds of icons, digital badges); audiences and co-branding (employee groups, hybrid, partner-led, Red Hat-led); product and developer branding; merchandise, resources, What's new — [Red Hat](https://www.redhat.com/en/about/brand/standards)
- [PRIMARY-SOURCE FACT] The platform is built on a value proposition, a position and a promise, plus a mantra. There is no mission, vision, or values as such; instead there are three pillars — [Red Hat Platform](https://www.redhat.com/en/about/brand/standards/platform)
- [PRIMARY-SOURCE FACT] The most detailed block on voice of those read: 4 character traits, 3 voice traits with a "but not" qualifier, 4 tone dimensions (formality, urgency, empathy, authority), "better this than this" style pairs — [Red Hat Personality](https://www.redhat.com/en/about/brand/standards/personality)

**Dropbox**
- [PRIMARY-SOURCE FACT] 8 sections: Framework, Voice & Tone, Logo, Typography, Iconography, Color, Imagery, Motion. A separate link to the Brand Partner Toolkit and a legal page — [Dropbox](https://brand.dropbox.com/)
- [PRIMARY-SOURCE FACT] In Framework the mission is not named, and positioning is only implied by an opening phrase; instead there are 4 design pillars — [Dropbox Framework](https://brand.dropbox.com/framework)
- [PRIMARY-SOURCE FACT] Voice & Tone: 4 pillars with examples; there are no do/don't pairs or grammar rules — [Dropbox Voice](https://brand.dropbox.com/voice-and-tone)
- [PRIMARY-SOURCE FACT] A separate legal page: permissions, prohibitions, contact brand@dropbox.com, no date — [Dropbox Branding](https://www.dropbox.com/branding)

**Wikimedia**
- [PRIMARY-SOURCE FACT] Portal sections: logo, typography, colors, images, Create (templates), Attribution, overview and what's new; resources include the Wikipedia visual identity, Codex, localized logos, and practices for the logos of affiliated organizations — [Wikimedia Brand](https://meta.wikimedia.org/wiki/Brand)

**Ubuntu**
- [PRIMARY-SOURCE FACT] Four brand values, logos, and a palette in the assets block; Font, Vanilla, Accessibility, Resources, and Contribute appear only as navigation links; there are no logo rules or do/don't on the pages checked — [Ubuntu Brand](https://design.ubuntu.com/brand), [Ubuntu Logo](https://design.ubuntu.com/brand/ubuntu-logo)

**Uber**
- [PRIMARY-SOURCE FACT] brand.uber.com redirects (307) to assets.uber.com, where the tool got only a title and no content. So the current portal was not read — [Uber](https://assets.uber.com/)
- [PRIMARY-SOURCE FACT] The October 2018 guide is addressed to partners and sponsors; 4 parts: logo, color, typography, assets; colors are given in RGB, CMYK, HEX, and PMS, and assets are Google Drive links. I cannot verify that the copy on a third-party host is authentic — [Uber 2018](https://cdn.shopify.com/s/files/1/0565/3423/7349/files/Uber_2018.pdf)

**Visa**
- [PRIMARY-SOURCE FACT] Sections: Brand Mark, Product Identifiers, Endorsement Messaging, Sensory Branding, Credentials, Accessibility, Contact Us. The text gives hex and RGB only for the mark — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] Sensory Branding takes pages 6–13 of 16 and combines animation, sound, and haptic feedback. There is no haptic field in our inventory template — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] The document calls itself part of a larger set: additional standards at brand.visa.com and separate Visa Product Brand Standards. There is no mission, audience, or voice field in these 16 pages — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)

**NASA, modern portal**
- [PRIMARY-SOURCE FACT] Sections: Brand Guidelines, merchandise, use of images, advertising, links to sites; blocks on collaboration and restrictions, including NFTs, contractors, and partners. The marks rest on 14 CFR 1221 and the Space Act — [NASA Brand Center](https://www.nasa.gov/nasa-brand-center/)

**Apple, Salesforce, Adobe, Cisco, Yandex**
- [PRIMARY-SOURCE FACT] Apple: permitted and prohibited use, rules for Mac, grammar of marks, attribution, product images. No voice, colors, or typography. These are rules for third parties, not an Apple brand book — [Apple](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)
- [PRIMARY-SOURCE FACT] Salesforce: prohibitions, permissions, rules by category of relationship (partners, resellers, MVPs, certified professionals, vendors, publishers), grammar of marks — [Salesforce](https://www.salesforce.com/company/legal/tmcusageguidelines/)
- [PRIMARY-SOURCE FACT] Adobe: introduction, general rules, attribution, correct usage, company name, logos, publications and conferences, plug-ins, frequent marks, contact. A separate rule forbids copying the brand identity as a whole: visual language, characteristic color combinations, typography. Color and font appear here as an object of protection, not as an instruction — [Adobe](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf)
- [PRIMARY-SOURCE FACT] Cisco: Using the Cisco Brand, logo, copyright and marks, logos, a library of network topology icons — [Cisco](https://www.cisco.com/c/en/us/about/brand-center.html)
- [PRIMARY-SOURCE FACT] Yandex: 7 items on non-commercial placement of the logo with a link, a ban on distortions and on hints of cooperation, written permission via pr@yandex-team.ru, logos as PDF. No date or version — [Yandex](https://yandex.ru/company/rules/logotype)

**Google, Spotify, Shopify**
- [PRIMARY-SOURCE FACT] Google's public page explains how to name Google; navigation has basic rules, platforms, apps, Made by Google, and also Diversity and inclusion — [Google](https://partnermarketinghub.withgoogle.com/brands/google/overview/)
- [PRIMARY-SOURCE FACT] Spotify for developers: attribution, content, links, players, logo, colors, naming, fonts. The most substantive document in group B, but its scope is limited to integrations — [Spotify](https://developer.spotify.com/documentation/design)
- [PRIMARY-SOURCE FACT] Shopify: logos, the bag icon, clear space and minimum size, 10 do/don't examples, downloads, a link to the trademark rules. No colors or typography — [Shopify](https://www.shopify.com/brand-assets)
- [PRIMARY-SOURCE FACT] A counterexample to the assignment's hint: polaris-react.shopify.com redirects to a UI framework reference with no voice, no brand, and no changelog. Polaris is not a brand book now — [Polaris](https://shopify.dev/docs/api/polaris)

**Microsoft, Atlassian, GOV.UK, USWDS**
- [PRIMARY-SOURCE FACT] Microsoft: voice (3 principles) and style tips, and separate blocks on bias-free language and global communication. There is no logo or color in this document: it is only the written part — [Welcome](https://learn.microsoft.com/en-us/style-guide/welcome/), [Voice](https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human)
- [PRIMARY-SOURCE FACT] Atlassian: tokens, accessibility, content (inclusive language, style, voice and tone, date and time, messages), spacing, grid, color, typography, icons, illustrations, logos, and other styles — [Foundations](https://atlassian.design/foundations), [Content](https://atlassian.design/foundations/content)
- [PRIMARY-SOURCE FACT] GOV.UK: a writing guide and A–Z, plus a separate Design System (styles, components, patterns, principles, community, support, roadmap). There are no logo or typography rules on the pages checked — [Style guides](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/), [Design System](https://design-system.service.gov.uk/)
- [PRIMARY-SOURCE FACT] USWDS: instructions, principles, components, patterns, tokens, utilities, templates, an About section — [USWDS](https://designsystem.digital.gov/about/whats-new/)

#### Checked but not counted

| Organization | What happened on opening | What was learned otherwise |
|---|---|---|
| Starbucks | [creative.starbucks.com](https://creative.starbucks.com/): certificate error (expired), 2 attempts | Only the [headline of a Creative Bloq article](https://www.creativebloq.com/news/starbucks-style-guide) about a new guide. Content unknown |
| Netflix | [brand.netflix.com](https://brand.netflix.com/): page title only | Nothing |
| Mozilla | [mozilla.design](https://mozilla.design/) returns a 301 to [brand.mozilla.com](https://brand.mozilla.com/all-brands): only the title Mozilla Brand Portal | Nothing |
| IBM | [Design Language](https://www.ibm.com/design/language/): 38 characters of text; subpages returned 404 or nothing | [Carbon](https://carbondesignsystem.com/all-about-carbon/what-is-carbon/) says it is built on this language |
| Mastercard | [brand.mastercard.com](https://brand.mastercard.com/) and [brandcenter](https://www.mastercard.com/brandcenter): 403 | Search summary: a [PDF v8.1](https://brand.mastercard.com/content/dam/mccom/brandcenter/assets/mc_brandmark_guidelines_v8,1.pdf) from 2016 about the mark, a Brand Center update from December 2023 |
| NHS | [nhsidentity](https://www.england.nhs.uk/nhsidentity/): empty response, 3 addresses | Search summary with a list of sections, below |
| Deutsche Telekom | [brand-design.telekom.com](https://www.brand-design.telekom.com/): connection refused | [Press release 2020](https://www.telekom.com/en/newsroom/latest-updates/media-information/2020/9/deutsche-telekom-makes-the-brand-future-proof) |
| Ozon | [Брендбук для ПВЗ](https://docs.ozon.ru/pick-up-point/brandbook/) [Brand book for pick-up points]: page found by search, 2 read errors | Search summary only |
| VK | The tool does not open vk.com | The search did not find an official document |
| Rosseti North Caucasus | [PDF](https://www.rossetisk.ru/data/about/Брендбук_Россети%20Северный%20Кавказ%20(основной).pdf) over 10 MB, the tool refused | Public availability follows only from the search results; this is a subsidiary |
| Sber, Aeroflot, Moscow Metro | The search found no official documents | [Sber: news about the logo](https://www.sostav.ru/publication/rebrending-sberbanka-45300.html), [Metro: Sostav article](https://www.sostav.ru/publication/metropoliten-brending-19461.html) |

- [EXPERT OPINION, secondary: search summary] By its description, the NHS Identity Guidelines include "Applying the identity" (colors, fonts, images, naming, logos, partner and service branding, suppliers, tone, styles, who can use it) and "Identity examples" (applications, campaigns, signage, transport, websites, and more). If so, the NHS would be the most complete document in the sample — [NHS Identity](https://england.nhs.uk/nhsidentity/identity-guidelines), [NHS Examples](https://www.england.nhs.uk/nhsidentity/examples/)
- [EXPERT OPINION, secondary] Moscow Metro: according to Sostav, McKinsey won the 2013 tender for the brand and navigation with a contract of 227 million rubles, and the brand never appeared. The search summary also mentions a review about the Lebedev studio winning; this discrepancy is not verified — [Sostav](https://www.sostav.ru/publication/metropoliten-brending-19461.html)

### Inferences
- [RESEARCHER INFERENCE] Compare startups with group A, not with all 19. Group B answers a different question: how do we, a third party, avoid violating someone else's rights.
- [RESEARCHER INFERENCE] The sample is biased. The tool did not read JavaScript portals (Uber, Netflix, Mozilla, IBM), so simple pages, often legal ones, are over-represented among the open documents. Full brand books are under-represented.
- [RESEARCHER INFERENCE] Large organizations often split the written and visual parts into separate documents: at Microsoft and GOV.UK the style guide is separate from the visual rules. The "everything in one file" template is not the rule here.

### Gaps
- The Uber portal, Starbucks Creative Expression, Netflix, Mozilla, IBM Design Language, and Mastercard were not read. I did not fill the matrix for them from blog roundups.
- No genuine brand book of a large Russian organization is confirmed in open access. This is not proof of absence: little searching was done, the limit ran out, and vk.com is closed to the tool.
- I did not see the real brand books of Apple, Google, Microsoft (the visual part), Adobe, and Salesforce. I did not check spotify.design, dropbox.design, or the Apple identity guidelines.

## Which sections a large organization needs and a small company probably does not

### Takeaway
Co-branding and approval are the most frequent of the "large" set: 12 and 14 of 19. Architecture, localization, and accessibility are less frequent (5–6). AI rules appear in three places and are narrow in the part read. Environment and navigation did not appear once in modern public documents, yet they take up most of the historical standards.

### Cited Findings
- [PRIMARY-SOURCE FACT] **Architecture.** Red Hat: a parent brand, about 4 platform sub-brands, products, components; programs, events, and teams in parallel; communities shown with a dotted line. The page calls Red Hat an independent brand owned by IBM — [Red Hat Architecture](https://www.redhat.com/en/about/brand/standards/brand-architecture)
- [PRIMARY-SOURCE FACT] **Architecture.** Visa distinguishes the mark from product identifiers: Signature and Infinite require the mark with an identifier — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **Co-branding.** Red Hat: 3 placement templates, equal visual weight, rules for three or more brands, a ban on the partner's colors and on custom templates, and the partner's permission is needed each time — [Red Hat Co-branding](https://www.redhat.com/en/about/brand/standards/co-branding/red-hat-led)
- [PRIMARY-SOURCE FACT] **Co-branding.** Salesforce sets rules and an approval route by type of relationship. This is the logic of a contract, not of a brand — [Salesforce](https://www.salesforce.com/company/legal/tmcusageguidelines/)
- [PRIMARY-SOURCE FACT] **Governance.** Uber requires the brand team to approve all partner materials in advance — [Uber 2018](https://cdn.shopify.com/s/files/1/0565/3423/7349/files/Uber_2018.pdf)
- [PRIMARY-SOURCE FACT] **Governance.** Visa requires written approval from the brand team to use the endorsement phrase outside two permitted scenarios — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **Localization.** Visa: an asterisk next to the mark in Canada, a funding-source identifier required by law in some countries, replacing Visa Dialect with Noto Sans for unsupported languages — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **Localization.** Microsoft separates translation from localization and gives separate rules for machine translation — [Microsoft Global](https://learn.microsoft.com/en-us/style-guide/global-communications/)
- [PRIMARY-SOURCE FACT] **Localization.** Yandex chooses a Cyrillic or Latin logo by domain; Spotify requires a special label for explicit content in South Korea; Apple distinguishes attribution for the US and other countries — [Yandex](https://yandex.ru/company/rules/logotype), [Spotify](https://developer.spotify.com/documentation/design), [Apple](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)
- [PRIMARY-SOURCE FACT] **Accessibility.** Visa refers to WCAG 2.2 AA and its own Visa Global Accessibility Requirements, and sets a contrast of at least 3:1 for animation — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **AI.** Red Hat forbids generating co-branded logos with AI — [Red Hat Co-branding](https://www.redhat.com/en/about/brand/standards/co-branding/red-hat-led)
- [PRIMARY-SOURCE FACT] **AI.** Salesforce forbids using its materials to train AI without written permission — [Salesforce](https://www.salesforce.com/company/legal/tmcusageguidelines/)
- [PRIMARY-SOURCE FACT] **AI.** Atlassian has sections Design for AI and AI Patterns; they are about product design, not about generating branded content. I did not read their content — [Atlassian](https://atlassian.design/)
- [PRIMARY-SOURCE FACT] **A case similar in type.** NASA explicitly does not approve merchandise requests with NFTs — [NASA Brand Center](https://www.nasa.gov/nasa-brand-center/)
- [PRIMARY-SOURCE FACT] **Environment.** NASA 1976 gives signage a section with exterior and interior marks and construction materials, and transport a section with cars, aircraft, and spacecraft — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)

### Inferences
- [RESEARCHER INFERENCE] These sections appear not because of size as such but because of specific conditions: many legal entities (architecture), other people's logos alongside (co-branding), many languages (localization), public duties or regulation (accessibility), buildings and vehicles (environment), hundreds of authors (approval). A skill can ask about these conditions rather than about company headcount.
- [RESEARCHER INFERENCE] A small company can make do with one line instead of a section: who is responsible and where to write. Almost everyone in the sample has this line, while a full approval process is needed much less often.
- [RESEARCHER INFERENCE] AI rules are only emerging: what was read concerns logos and model training. I saw no general rule on generating branded content, so this sample has no ready model for a skill.

### Gaps
- I deliberately did not search for rules on AI content generation: the search limit ran out. They may be on unread pages and in internal documents.
- Accessibility sections at GOV.UK and USWDS almost certainly exist, but their content is not on the pages read, so the matrix shows a dash.

## Which sections are nearly universal, common, and rare

### Takeaway
Contact, logo, and legal are nearly universal. Approval, co-branding, downloadable materials, grammar of marks, do/don't, version date, color, and typography are common. Mission, positioning, audience, and sound are rare. The core of public documents protects the mark rather than explaining the brand.

### Cited Findings
The count is derived from the matrix above and the sources in the sample passport. "Present" includes `Y`, `P`, `N`, and `L`, so this is a soft count. "Read" is only `Y`. A dash does not prove absence, so this is a lower bound.

| Field | Present of 19 | Read (Y) | A (of 7) | B (of 8) | C (of 4) | Class |
|---|---|---|---|---|---|---|
| Contact/owner | 17 | 10 | 7 | 7 | 3 | Nearly universal |
| Logo | 16 | 8 | 7 | 7 | 2 | Nearly universal |
| Legal/trademarks | 15 | 7 | 6 | 8 | 1 | Nearly universal |
| Governance/approval | 14 | 5 | 6 | 6 | 2 | Common |
| Downloadable materials | 12 | 5 | 6 | 4 | 2 | Common |
| Co-branding/partners | 12 | 5 | 6 | 6 | 0 | Common |
| Naming/grammar | 11 | 6 | 3 | 5 | 3 | Common |
| Do/don't | 11 | 9 | 4 | 6 | 1 | Common |
| Version/changelog | 11 | 4 | 5 | 3 | 3 | Common |
| Color | 10 | 3 | 6 | 1 | 3 | Common |
| Typography | 10 | 2 | 6 | 1 | 3 | Common |
| Images/illustration | 9 | 1 | 5 | 3 | 1 | Common |
| Layout/grid | 8 | 0 | 4 | 1 | 3 | Common |
| Application examples | 6 | 2 | 3 | 1 | 2 | Uncommon |
| Localization | 6 | 2 | 2 | 3 | 1 | Uncommon |
| Voice and tone | 5 | 3 | 2 | 0 | 3 | Uncommon |
| Architecture/sub-brands | 5 | 2 | 4 | 1 | 0 | Uncommon |
| Accessibility | 5 | 1 | 3 | 1 | 1 | Uncommon |
| Brand character | 3 | 1 | 2 | 0 | 1 | Uncommon |
| Motion | 3 | 1 | 2 | 0 | 1 | Uncommon |
| AI rules | 3 | 0 | 1 | 1 | 1 | Uncommon |
| Mission/goals/values | 2 | 1 | 2 | 0 | 0 | Rare |
| Positioning/strategy | 2 | 0 | 2 | 0 | 0 | Rare |
| Audience | 2 | 0 | 1 | 0 | 1 | Rare |
| Sound | 1 | 1 | 1 | 0 | 0 | Rare |
| Environment/navigation | 0 | 0 | 0 | 0 | 0 | Not found |

The class thresholds are mine: 15+ nearly universal, 8–14 common, 3–7 uncommon, 0–2 rare.

- [PRIMARY-SOURCE FACT] The only document with sound in the sample: Visa, where sound is tied to payment confirmation, including on devices without a screen — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] Outside the count: Deutsche Telekom reports that it began its refresh with audio identity and names more than 40 sounds in apps and a smart speaker — [Telekom 2020](https://www.telekom.com/en/newsroom/latest-updates/media-information/2020/9/deutsche-telekom-makes-the-brand-future-proof)

### Inferences
- [RESEARCHER INFERENCE] This does not mean "large companies do not write about mission". It means "mission usually does not reach the public part or lives elsewhere". Red Hat keeps its position text behind a login, so the rarity is partly created by the closed access itself.
- [RESEARCHER INFERENCE] Even in group A the strategic fields are weakest: mission and positioning 2 of 7, voice 2 of 7, logo 7 of 7. So public examples are a poor template for the strategic part of a brand book. This material must be sought in another type of source.
- [RESEARCHER INFERENCE] The high contact count is inflated by group B: lawyers must have an address for requests. As a sign of mature governance, it is weak on its own.

### Gaps
- The count was made by one reader, without a second coder, and from retellings. The boundaries between `P` and `Y` are subjective. For the report, use orders of magnitude rather than exact shares.
- The sample gives no meaningful statistical conclusion: it is a convenience sample, not a random one.

## What the historical standards contained and what became of them

### Takeaway
Only NASA I read from the document itself. The manual turned out to be a production specification with almost no strategy, and the scan with the "January 1976" cover bears traces of edits from the late 1980s, so it was in fact updated. For NYCTA, EPA, British Rail, and Lufthansa there are only secondary descriptions, and for Lufthansa they are very weak. The common story: a manual does not guarantee compliance and does not survive a change of leadership, although some of its elements do.

### Cited Findings

#### NASA Graphics Standards Manual
Access: the NASA scan, 60 pages. For every page I read the heading, the index, and the letter in full, and about 20 more pages up to 1,500–1,600 characters. I did not look at the illustrations.

- [PRIMARY-SOURCE FACT] Cover: NHB 1430.2, January 1976. The assignment gave the year 1975, but the NASA document says 1976. The file metadata shows scanning on 2015-07-29 — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] Structure from the index: 1 logotype (9 pages, including incorrect uses, the grid for large forms, mission patches, the seal); 2 reproduction material; 3 stationery (letters, envelopes, typing style, press releases); 4 forms; 5 publications (20 pages: type, covers, and interior grids for five publication types, press kits, posters); 6 signage; 7 transport (cars, aircraft, and spacecraft); 8 awards; 9 additions (stickers, uniform patches) — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] The head's letter defines the document as "the official policy document regarding NASA identification" (a letter signed by Richard H. Truly, p. iii), addresses it to designers, and asks them to watch for compliance with the details. There are no other strategic sections — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] How it was applied physically: the logotype must not be redrawn, it is photographically reproduced from the ready-made material in part 2; color is matched against swatch samples; vehicle markings are applied from pre-typeset dry-transfer sheets; extra material is issued by the graphics coordinator at headquarters — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] Nine examples of incorrect use of the logotype; the seal and the logotype must not be placed side by side; the seal is for ceremonies only; mission patches must be kept separate from the official identification — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] The manual allows for transition: on existing forms the logotype is added as a temporary measure, and redesign of the forms is postponed. The publication rules are explicitly called general; only the typeface and the logotype are strict. Vehicle marking is subject to GSA rules — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] The index begins with a statement that the pages listed are in effect as of January 1, 1976. This looks like a list of effective pages — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] **Finding.** Although dated "January 1976", the letter is signed by Richard H. Truly as administrator, and the index contains a page for the John C. Stennis Space Center — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [EXPERT OPINION, secondary] Truly was NASA administrator from about 1989 to 1992 (the Wikipedia article itself disagrees on the exact dates), and the center was named for Stennis on May 20, 1988 — [Truly](https://en.wikipedia.org/wiki/Richard_H._Truly), [Stennis](https://en.wikipedia.org/wiki/Stennis_Space_Center)
- [PRIMARY-SOURCE FACT] The index lists 15 pages of part 2, but only 5 correspond to them in the PDF, and one of them gives telephone area code 407 for the Kennedy Space Center. So the NASA file is either incomplete or compiled — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] The same inventory fields for NASA 1976. Present: logo, color, typography, grid, application, do/don't, ready-made materials, contact, architecture (agency, centers, seal, patches), governance, environment. Partial: mission and character (the letter), grammar (typing style, naming of centers), legal (GSA), version (the index), partners (contractor signage). Not seen: audience, voice, motion, sound, accessibility, localization — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)

The fate of the "worm":

- [EXPERT OPINION, secondary] Danne and Blackburn were commissioned in 1974 through a federal program at the NEA, adopted in 1975, and officially retired on May 22, 1992, when Goldin brought back the meatball for the morale of employees who had not accepted the new mark. The nickname was originally a mockery by employees. Then limited use on approved merchandise — [Wikipedia](https://en.wikipedia.org/wiki/NASA_insignia)
- [PRIMARY-SOURCE FACT] On April 2, 2020, NASA announced the return of the logotype on the Falcon 9 for Demo-2 as a sign of the resumption of crewed flights from US soil. The meatball remains the main symbol — [NASA 2020](https://www.nasa.gov/image-feature/the-worm-is-back/)
- [PRIMARY-SOURCE FACT] Today the Brand Center names the NASA Logotype (Worm) alongside the Insignia and the Seal and states that they are not in the public domain — [NASA Brand Center](https://www.nasa.gov/nasa-brand-center/)
- [EXPERT OPINION, secondary] The mark is now permitted as supplementary graphics with management approval and for crewed programs, and a 2015 Kickstarter for the reissue raised almost 1 million dollars — [Wikipedia](https://en.wikipedia.org/wiki/NASA_insignia)

#### NYCTA Graphics Standards Manual
Access: I did not see the manual itself. I did not read Shaw's book, and the AIGA article returned 403. Only the publisher's page and reviews.

- [VENDOR] A 1970 manual by Vignelli and Noorda of Unimark. The original is 13 × 13 inches; the compact reissue is 10 × 10 inches, 356 pages, scans from the collection of Massimo and Lella Vignelli — [Standards Manual](https://standardsmanual.com/products/nyctacompactedition)
- [EXPERT OPINION, secondary] A modular system: three sign sizes (1×2, 1×4, and 1×8 feet) built from 1×1 panels; the manual specifies letter spacing and word spacing, leading, and number of lines in detail. The first contract with Unimark was in 1966, the repeat in 1968 — [Untapped New York](https://untappedcities.com/10-fun-facts-about-the-nyc-transit-authority-graphics-standard)
- [EXPERT OPINION, secondary] The manual specified Standard Medium, not Helvetica, which Vignelli wanted. According to Shaw, the reason was the labor and cost for the transit authority's own sign shop — [Urban Omnibus](https://urbanomnibus.net/2011/05/book-review-helvetica-and-the-new-york-city-subway-system/)
- [EXPERT OPINION, secondary] Execution: Vignelli spoke sharply of the shop's first attempts; the fiscal crisis of the 1970s prevented ordering the system; a 1979 NYT critique found the signs confusing; the coordinated system was widely implemented only from 1989 and in the 1990s, on the wave of capital programs — [Urban Omnibus](https://urbanomnibus.net/2011/05/book-review-helvetica-and-the-new-york-city-subway-system/)
- [EXPERT OPINION, secondary] The Eye review describes a twenty-year project with small budgets, poor management, and friction with sign makers. Reality shows in the succession of production manuals and old corrected signs, and Shaw's research is built on interviews and documents — [Eye](https://www.eyemagazine.com/review/article/the-font-now-arriving-at-platform-1)
- [EXPERT OPINION, secondary] Helvetica Medium became the official MTA typeface in December 1989, when Michael Hertz Associates updated the manual. A copy was found in 2012 in the Pentagram basement — [Untapped New York](https://untappedcities.com/10-fun-facts-about-the-nyc-transit-authority-graphics-standard); the 1989 date matches [Wikipedia](https://en.wikipedia.org/wiki/Helvetica), which cites Shaw

#### British Rail Corporate Identity Manual
Access: the tool could not open the doublearrow.co.uk site (expired certificate). Wikipedia only.

- [EXPERT OPINION, secondary] The manual was prepared by a working group led by Milner Gray of the Design Research Unit, commissioned by the BR design panel. It sets the rolling stock colors (Rail Blue, pearl grey), the Rail Alphabet typeface (Kinneir and Calvert), and the Double Arrow mark (Gerald Barney) — [Design Research Unit](https://en.wikipedia.org/wiki/Design_Research_Unit)
- [EXPERT OPINION, secondary] The visual identity was shown in London in early 1965, and the name was shortened to British Rail. The manual's section on basic elements is cited with the date April 1985, which indirectly points to revisions — [British Rail](https://en.wikipedia.org/wiki/British_Rail), [Rail Alphabet](https://en.wikipedia.org/wiki/Rail_Alphabet)
- [EXPERT OPINION, secondary] Breakup: from 1986 Network SouthEast, InterCity, and Regional Railways got their own brand variants; by privatization the single brand had almost disappeared, except for the Double Arrow, which still marks stations on street signs — [British Rail](https://en.wikipedia.org/wiki/British_Rail)
- [EXPERT OPINION, secondary] Rail Alphabet was displaced by Frutiger (Mark 4, 1989) and Brunel, and then brought back as Rail Alphabet 2 (Network Rail, 2020). In 2021 it was announced that Great British Railways would adopt it and restore the Double Arrow as the main mark — [Rail Alphabet](https://en.wikipedia.org/wiki/Rail_Alphabet)

#### EPA Graphic Standards System
Access: I did not see the manual itself. Publisher and 2017 press.

- [VENDOR] A 1977 system by Chermayeff, Geismar, Geissbuhler; the task was to unify the communications of a federal program across hundreds of offices. The reissue is a facsimile, with a foreword by Geismar, an essay by Bonanos, and Documerica photographs — [Standards Manual](https://standardsmanual.com/blogs/news/new-book-the-epa-graphic-standards-system-reissue)
- [EXPERT OPINION, secondary] Contents by description: standard formats and layouts; nine thematic categories (water, toxic waste, radiation, and others), each with its own color and pattern. The client: the NEA program, which according to CityLab ran from 1972 to 1981. The purpose is explicitly economic: not to lay out every document anew — [Eye on Design](https://eyeondesign.aiga.org/standards-manual-imprint-teams-up-with-aiga-to-reissue-1977-epa-graphic-standards-system/), [CityLab/GovExec](https://www.govexec.com/management/2017/05/epas-40-year-old-design-manual-being-reissued/137651/)
- [VENDOR] Jesse Reed, the publisher of the reissue, says the system was presented and soon rejected and never fully implemented. An interested testimony: he sells the book — [Eye on Design](https://eyeondesign.aiga.org/standards-manual-imprint-teams-up-with-aiga-to-reissue-1977-epa-graphic-standards-system/)
- [EXPERT OPINION, secondary] A contradiction: another piece from the same year confirms neither adoption nor rejection and says only that the system was presented to the agency — [CityLab/GovExec](https://www.govexec.com/management/2017/05/epas-40-year-old-design-manual-being-reissued/137651/)

#### Lufthansa, Otl Aicher
Access: no primary source. The weakest part of the notes: only Wikipedia, with many claims flagged as lacking sources.

- [EXPERT OPINION, secondary] The identity was created by Aicher during his work at the Ulm School and, according to German Wikipedia, is still used with small changes. It gives no year, no team, and no mention of a manual — [Otl Aicher, de](https://de.wikipedia.org/wiki/Otl_Aicher)
- [EXPERT OPINION, secondary] The English Lufthansa article dates Aicher's comprehensive design to 1967 and names Helvetica as the main typeface of the livery and publications; yet it also says that Helvetica was used for the name from the early 1960s. The 1988 design kept Aicher's concept, and the 2018 livery replaced the yellow background with dark blue. These claims are partly flagged as needing a source — [Lufthansa](https://en.wikipedia.org/wiki/Lufthansa)
- [EXPERT OPINION, secondary] The article on the Ulm School calls the Lufthansa identity one of the most successful projects of the development groups after Max Bill left in 1957, with no date and no source for this claim — [Ulm School of Design](https://en.wikipedia.org/wiki/Ulm_School_of_Design)

### Inferences
- [RESEARCHER INFERENCE] The NASA file dated 1976 looks like a state from no earlier than 1989: the Truly signature and the Stennis center show this. From memory, without checking, I add the 407 code (introduced around 1988) and the Solar Maximum and LDEF missions (flights of the 1980s). The cover and the index nevertheless kept the year 1976. This is careful evidence of how a page-by-page document lived: pages were replaced while the identity of the document remained. So the Truly letter cannot be cited as a 1976 text. From memory, the original letter is signed by James Fletcher, but I did not confirm this in this session.
- [RESEARCHER INFERENCE] The letter calls for support from every employee and control from above, and the mark was withdrawn with wording about employee morale. A manual that works as a directive depends on the leader: a change of one administrator canceled its central element.
- [RESEARCHER INFERENCE] Historical manuals answer the question "how to produce". The modern analog of ready-made reproduction material is downloadable files, of incorrect uses is do/don't, of the coordinator is a Slack channel, of the list of effective pages is What's new. New in 50 years: voice, motion, sound, accessibility. There was no strategy then and there is little in the public part now.
- [RESEARCHER INFERENCE] NYCTA, EPA, and BR show one limit: a document does not replace a budget, an implementer, and organizational stability. Individual elements (Double Arrow, Rail Alphabet, the worm) nevertheless outlive the document. For a skill, this is an argument to separate the core of the marks from the rules of application and not to promise that a brand book will by itself ensure compliance.
- [RESEARCHER INFERENCE] The historical significance of the manuals is amplified by reissues sold by an interested party. Ratings such as "iconic" should be treated as secondary to the document's real fate.

### Gaps
- I did not see the real sections of the NYCTA, EPA, BR, and Lufthansa manuals and I do not invent them. The NYCTA reissue page does not list sections.
- The page count of the NASA reissue and the Fletcher letter: the publisher's page twice returned 429 and a rate limit. Not confirmed.
- Binding and the BR update mechanism: from memory these are binders with replaceable sheets, but there is no confirmation; the only indirect trace is the 1985 date on a section. The update mechanism of NYCTA and EPA is also not confirmed.
- Unit Editions "Manuals 1", the Vignelli Center, and Vignelli's Canon were not read (429, 404). I did not read Shaw's book; the Guardian article on the DRU is unavailable.
- A version that Langley director Paul Holloway contributed to the removal of the worm appeared in a search summary with a reference to the Daily Press of May 23, 1992. Not verified.
- A search summary mentioned an Astronomy note about the return of the worm on November 6 with no verifiable context. The main date per NASA: April 2, 2020; Wikipedia gives April 3 in the lead. The discrepancy is not resolved.
- Two sources differ on where the scans come from and what counts as the NYCTA find: the Pentagram basement in 2012 or the Vignelli collection. These may be different editions.

## How modern documents changed

### Takeaway
The update mechanism has shifted from replaceable sheets to a release log and dates on the page. Best tracked are Wikimedia, GOV.UK, USWDS, and Microsoft. For Uber, Starbucks, Spotify, and IBM, versions could not be compared, as the archive is unavailable.

### Cited Findings
- [PRIMARY-SOURCE FACT] **GOV.UK.** A log with dates and versions. In May 2025, v4.10.0 and v5.10.0 are described as the first step of the brand refresh; in February 2026, v6.0.0 with breaking changes moved colors to the web palette from the GOV.UK brand rules — [What's new](https://design-system.service.gov.uk/community/whats-new/)
- [PRIMARY-SOURCE FACT] **GOV.UK contradiction.** The Design System home page dates the start of the refresh to June 2025, while the log already shows May — [Design System](https://design-system.service.gov.uk/), [What's new](https://design-system.service.gov.uk/community/whats-new/)
- [PRIMARY-SOURCE FACT] **USWDS.** Two layers of versions: code releases (currently v3.14.0, release v3.0 of 2022-04-28) and a table of site changes (last entry 2026-09-16) — [USWDS](https://designsystem.digital.gov/about/whats-new/)
- [PRIMARY-SOURCE FACT] **Microsoft.** The online guide replaced the Microsoft Manual of Style. The page metadata has different `ms.date` values (2025-01-08 and 2018-01-19), a shared `updated_at` of 2026-10-15, and a link to a git commit. The footer of the welcome page says 2024 — [Welcome](https://learn.microsoft.com/en-us/style-guide/welcome/), [Voice](https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human)
- [PRIMARY-SOURCE FACT] **Wikimedia.** Edit history at the wiki level, last portal edit 2026-05-10, a link to a permanent version — [Wikimedia Brand](https://meta.wikimedia.org/wiki/Brand)
- [PRIMARY-SOURCE FACT] **Wikimedia.** The trademark policy describes how to change itself: major changes are proposed to the community for at least 30 days in three languages, minor ones with 3 days' notice — [Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy)
- [PRIMARY-SOURCE FACT] **Red Hat.** Mark chronology: first logo after 1995, Shadowman 1996–1997, a cleanup in 1999, the current logo via the Open Brand Project from 2018. Navigation has What's new, but I did not find its address (several variants returned 404) — [Red Hat History](https://www.redhat.com/en/about/brand/standards/history)
- [PRIMARY-SOURCE FACT] **Visa.** A date on every page, asset files with the year in the name (`VBM_blu_2025.eps`), a 2021 variant left in the example of the name structure; no changelog. Metadata: created 2025-09-08, modified 2025-10-08 — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **Uber.** The October 2018 state: a narrow 10-slide partner guide on Google Drive. Now the domain redirects to assets.uber.com with the title Brand.uber. The modern content could not be compared — [Uber 2018](https://cdn.shopify.com/s/files/1/0565/3423/7349/files/Uber_2018.pdf), [Uber](https://assets.uber.com/)
- [PRIMARY-SOURCE FACT] **Adobe.** The PDF I opened is dated 2021-03-24 and itself refers to a web page for the latest version — [Adobe](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf)
- [EXPERT OPINION, secondary: search summary] A date of 2025-07-30 was named for the Adobe document. Which version is current is not verified — [Adobe Trademarks](https://www.adobe.com/legal/permissions/trademarks.html)
- [PRIMARY-SOURCE FACT] **Salesforce** shows the date 2023-06-12. **Yandex** shows no date and says outright that the edition at the address is in force. **Dropbox** shows no date and warns of periodic updates — [Salesforce](https://www.salesforce.com/company/legal/tmcusageguidelines/), [Yandex](https://yandex.ru/company/rules/logotype), [Dropbox](https://www.dropbox.com/branding)
- [EXPERT OPINION, secondary] **NHS.** A unified identity was introduced in England in 1999, and the rules were updated in January 2017 — [Community Pharmacy England](https://cpe.org.uk/quality-and-regulations/other-regulatory-and-terms-of-service-requirments/nhs-logo-use-by-pharmacies/)
- [PRIMARY-SOURCE FACT] **Deutsche Telekom.** Liquid Brand Design from June 2020: only magenta, the T, and the TeleNeo typeface are fixed, the rest is flexible. The brand is described as adapting to people and situations rather than demanding rigid compliance with rules — [Telekom 2020](https://www.telekom.com/en/newsroom/latest-updates/media-information/2020/9/deutsche-telekom-makes-the-brand-future-proof)

### Inferences
- [RESEARCHER INFERENCE] Design systems inherit the engineering practice of versions, while classic brand portals do not: GOV.UK and USWDS have a log, and Dropbox shows only a caveat about updates. An exception among portals: Red Hat with What's new in navigation. Good versioning practices for a brand book should be taken from the former.
- [RESEARCHER INFERENCE] The shared `updated_at` on different Microsoft pages probably reflects a build of the whole site, not an edit of the content. It must not be taken for a date of currency.
- [RESEARCHER INFERENCE] Telekom moves from rigid rules to a few constants. This is a response to many channels, but it contrasts with Visa and Uber, where rules and approval are rigid. The sample does not prove a single trend toward flexibility.

### Gaps
- The tool does not open archived states (Wayback), so I could not compare versions of Uber, Starbucks, Spotify, and IBM from snapshots. A 2015 Spotify copy on a third-party host returned 403.
- The content of the Red Hat What's new is not read. The real update frequency of the portals is unknown.
- The expired certificate at creative.starbucks.com may point to an abandoned site, but it may also be a quirk of the tool. Not verified.

## What signs of document governance are visible

### Takeaway
Publicly visible are owners and question channels, sometimes approval rules and changes. There are almost no traces of training and audits in what was read, so the main part of governance is probably internal. The clearest public examples: Wikimedia, NASA, and Visa.

### Cited Findings
- [PRIMARY-SOURCE FACT] **Named people.** NASA names the page editor and the responsible employee. Microsoft keeps the author in the metadata and a shared address for feedback — [NASA Brand Center](https://www.nasa.gov/nasa-brand-center/), [Welcome](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [PRIMARY-SOURCE FACT] **Teams.** The Wikimedia portal is run by the foundation's communications department; the trademark policy is approved by the board of trustees, and permission requests and violation reports go to separate addresses — [Wikimedia Brand](https://meta.wikimedia.org/wiki/Brand), [Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy)
- [PRIMARY-SOURCE FACT] **Teams.** The GOV.UK Design System is run by a team in the Government Digital Service, with a 12-month roadmap and a contacts page — [Design System](https://design-system.service.gov.uk/)
- [PRIMARY-SOURCE FACT] **GOV.UK counterexample.** The address of the working group that I expected to find returned 410 Gone. So the address was removed on purpose, but I do not know where the function moved — [Working group](https://design-system.service.gov.uk/community/design-system-working-group/)
- [PRIMARY-SOURCE FACT] **IBM Carbon.** Funded and developed by IBM, the main parts are run by teams, some packages by the community; contributions have named maintainers, and every issue is promised a response — [Carbon](https://carbondesignsystem.com/all-about-carbon/what-is-carbon/)
- [PRIMARY-SOURCE FACT] **Channels.** Red Hat: Slack `#help-brand` for employees, a feedback form on the standards, a logo request form — [Red Hat Co-branding](https://www.redhat.com/en/about/brand/standards/co-branding/red-hat-led)
- [PRIMARY-SOURCE FACT] **Review.** The Visa PDF metadata contains an `_ACCESSIBILITY` field with a value about a VGAR check dated 10.8.25, and the footer marks the document as Visa Public. This is the only direct trace of a formal internal review in the sample — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [PRIMARY-SOURCE FACT] **Control and sanctions.** Cisco gives a link for reporting violations; Wikimedia reserves the right to revoke permission; Yandex mentions law enforcement and the court — [Cisco](https://www.cisco.com/c/en/us/about/brand-center.html), [Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy), [Yandex](https://yandex.ru/company/rules/logotype)
- [PRIMARY-SOURCE FACT] **Legal basis.** NASA relies on a regulatory framework (14 CFR 1221, the Space Act). A separate process exists for brand partnerships — [NASA Brand Center](https://www.nasa.gov/nasa-brand-center/)
- [PRIMARY-SOURCE FACT] **Historically.** The NASA manual is registered as a directive (NHB 1430.2), and there is a graphics coordinator and a formula about management support — [NASA Manual](https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)
- [PRIMARY-SOURCE FACT] **Training and audit.** There are no direct mentions of training programs and regular audits in what was read. The tool reported traces of internal prompts for a content audit and edit buttons on the Google page, but these are service elements whose meaning I did not confirm — [Google](https://partnermarketinghub.withgoogle.com/brands/google/overview/)
- [EXPERT OPINION, secondary] Community Pharmacy England retells the NHS rules for pharmacies, but does not say who monitors compliance and what happens on violation — [Community Pharmacy England](https://cpe.org.uk/quality-and-regulations/other-regulatory-and-terms-of-service-requirments/nhs-logo-use-by-pharmacies/)

### Inferences
- [RESEARCHER INFERENCE] The minimal working governance set that can be carried over to a small company from these examples: one owner, one question channel, a version date, and a short change note. This is what is publicly visible even at the large ones.
- [RESEARCHER INFERENCE] The absence of traces of training and audit in the public part does not mean absence in the company. Such processes are internal by nature, so this source cannot answer whether they work.

### Gaps
- How reviews, training, and audits work inside large companies cannot be determined from public documents. Other sources are needed: interviews, case studies, conferences.
- The role of the GOV.UK working group after the 410 is not established.

## What a public release hides

### Takeaway
At large companies the public part is most often an outer layer, not a full brand book. There is direct evidence of closed access at Red Hat and Google and indirect evidence at Visa, Apple, Adobe, and Salesforce. Some other cases are indistinguishable from technical limits of the tool, and this must be told apart.

### Cited Findings

Entries that are definitely partial because of access:

- [PRIMARY-SOURCE FACT] **Google.** brand.google redirects to a Google account sign-in; I did not sign in. The public page says that partners with official co-branding need to sign in for the full version, and Google agencies for Brand Standards — [Google](https://partnermarketinghub.withgoogle.com/brands/google/overview/), [brand.google](https://brand.google/)
- [PRIMARY-SOURCE FACT] **Red Hat.** The content of the brand position is behind a login on The Source, the Corporate Style Guide is available only via VPN, and the Slack channel is for employees — [Red Hat Platform](https://www.redhat.com/en/about/brand/standards/platform), [Red Hat Co-branding](https://www.redhat.com/en/about/brand/standards/co-branding/red-hat-led)
- [PRIMARY-SOURCE FACT] **Visa.** The open PDF refers to the Visa Product Brand Standards and to a Visa representative — [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)
- [EXPERT OPINION, secondary: search summary] The same document says that card design standards are on a protected site for issuers, and that the rules must be read together with the Visa Core Rules. There are also separate PDFs [Marketing](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-marketing-brand-standards-sept2025.pdf), [Physical Card](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-physical-card-brand-standards-sept2025.pdf), [Ecommerce](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-ecommerce-brand-standards-sept2025.pdf), which I did not read
- [PRIMARY-SOURCE FACT] **Apple and Adobe.** Licensees are subject to additional terms in their contracts, which are not published — [Apple](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html), [Adobe](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf)
- [PRIMARY-SOURCE FACT] **Adobe.** Separate rules for the corporate logo are issued on request: through a company representative or by letter to brand@adobe.com — [Adobe](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf)
- [PRIMARY-SOURCE FACT] **Salesforce.** The community is directed to MVPortal and CGL Portal, partners to a manager; I did not see their materials — [Salesforce](https://www.salesforce.com/company/legal/tmcusageguidelines/)
- [PRIMARY-SOURCE FACT] **Uber.** The 2018 guide covers logo, color, typography, and assets and is explicitly addressed to partners. This is a cut for outsiders, not an internal brand book — [Uber 2018](https://cdn.shopify.com/s/files/1/0565/3423/7349/files/Uber_2018.pdf)
- [PRIMARY-SOURCE FACT] **A curious detail.** The Adobe PDF, which lies in open access, is marked Adobe Confidential on every page, and the Visa PDF is marked Visa Public. Companies do have document classification, but discipline varies — [Adobe](https://adobe.com/content/dam/cc/en/legal/documents/Adobe_Trademark_Guidelines.pdf), [Visa](https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf)

Entries where the cause is unclear and which cannot be counted as closed access: Uber (the current portal), Netflix, Mozilla, IBM, and brand.visa.com give an empty or almost empty response, most likely because of JavaScript. Mastercard gives 403. Telekom refuses the connection. All the links are in the table "Checked but not counted" above.

- [PRIMARY-SOURCE FACT] Fully open examples from the sample: Wikimedia (a wiki under the CC BY-SA license), GOV.UK (Open Government Licence v3.0, except where noted), USWDS (open source), and Carbon. I saw no direct traces of a login on them — [Wikimedia Brand](https://meta.wikimedia.org/wiki/Brand), [Design System](https://design-system.service.gov.uk/), [USWDS](https://designsystem.digital.gov/about/whats-new/), [Carbon](https://carbondesignsystem.com/all-about-carbon/what-is-carbon/)
- [PRIMARY-SOURCE FACT] **Russia.** Of the Russian organizations I could read only Yandex's outer layer: logo rules with written permission for all other cases — [Yandex](https://yandex.ru/company/rules/logotype)

### Inferences
- [RESEARCHER INFERENCE] The most useful conclusion for the report: large companies publish what outsiders need and hide the strategic and production core. So the phrase "look at Google's brand book" usually means "look at the rules for partners".
- [RESEARCHER INFERENCE] Openness correlates with the nature of the organization: government bodies and community projects publish more, commercial companies with licensing programs less. Red Hat is on the border: it has an open portal, but with closed inserts.
- [RESEARCHER INFERENCE] For an AI skill: do not calibrate the "completeness" of a brand book against public examples from large companies, because they are incomplete by design. The absence of a section in the public version is not a signal that it is not needed.

### Gaps
- A public and an internal version at the same company cannot be compared: there is no internal one. The volume of what is hidden is unknown.
- Roundups by agencies and blogs (madegooddesigns, brandkit, and others) appeared in the results but were left out of the notes: they are pointers, not primary sources. One such page's claim that Uber's full color rules sit behind a login at base.uber.com is not verified by me.
