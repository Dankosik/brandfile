// Renders a checked brand book as one HTML page for the person. Agents read
// BRAND.md; this page exists so a person can see how the brand looks and name
// what to change. Raw HTML in the book's prose is escaped; only ```html blocks
// in the samples section and probe outputs render, inside sandboxed iframes.

import { cssName, isFence, isTableStart, parseHeading, splitFrontMatter, splitRow } from './book.mjs';

const LABELS = {
  en: {
    draft: 'Draft, not accepted yet', accepted: 'Accepted', version: 'Version', owner: 'Owner', noOwner: 'not named yet',
    check: 'To check', checkHelp: 'A script cannot settle these. They need a person.',
    code: 'In code', pass: 'passes', decor: 'decoration only, no minimum', minimum: 'minimum',
    noLogo: 'No logo file', minSize: 'Minimum size', clear: 'Clear space', atMin: 'At minimum size',
    noFontFile: 'No font file here: this shows a fallback unless the font is installed on this computer.',
    license: 'License', fallback: 'Fallback', sampleCode: 'Code',
    probes: 'How an agent understood the brand', probesHelp: 'Each task ran in a clean context, with the book and without it. Judge whether the result fits the brand, not whether you like it.',
    task: 'Task', withBook: 'With the book', withoutBook: 'Without the book', findings: 'Findings',
    stale: 'The book has changed since this run.', changelog: 'Changelog', generated: 'Generated from BRAND.md. Edits to this file are lost at the next build.',
    specimen: 'The quick brown fox jumps over the lazy dog', specimenSigns: 'Il1O0 Rag Hamburg & 1234567890 “quotes” — $ €',
  },
  ru: {
    draft: 'Черновик, ещё не принят', accepted: 'Принято', version: 'Версия', owner: 'Владелец', noOwner: 'пока не назван',
    check: 'Что проверить', checkHelp: 'Скрипт этого не решит, нужен человек.',
    code: 'В коде', pass: 'проходит', decor: 'только декор, минимума нет', minimum: 'минимум',
    noLogo: 'Файла логотипа нет', minSize: 'Минимальный размер', clear: 'Охранное поле', atMin: 'В минимальном размере',
    noFontFile: 'Файла шрифта здесь нет: показан запасной, если шрифт не установлен на этом компьютере.',
    license: 'Лицензия', fallback: 'Запасной', sampleCode: 'Код',
    probes: 'Как агент понял бренд', probesHelp: 'Каждая задача шла в чистом контексте, с брендбуком и без него. Судите, подходит ли результат бренду, а не нравится ли он.',
    task: 'Задача', withBook: 'С брендбуком', withoutBook: 'Без брендбука', findings: 'Разбор',
    stale: 'Брендбук изменился после этого запуска.', changelog: 'Журнал', generated: 'Собрано из BRAND.md. Правки в этом файле пропадут при следующей сборке.',
    specimen: 'Съешь же ещё этих мягких французских булок, да выпей чаю', specimenSigns: 'Л П Д З 3 Ж К Ф Я Ч Ю Ы Щ ё № ₽ «цитата» — 1234567890',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const safeUrl = (url) => (/^(https?:|mailto:|#)/i.test(url) || !/^[a-z][a-z0-9+.-]*:/i.test(url) ? url : '#');

function inline(text) {
  return String(text).split(/(`[^`]+`)/).map((part) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return `<code>${esc(part.slice(1, -1))}</code>`;
    return esc(part)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img src="${safeUrl(src)}" alt="${alt}" loading="lazy">`)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${safeUrl(href)}">${label}</a>`)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  }).join('');
}

function renderList(lines) {
  const root = { items: [], ordered: /^\s*\d/.test(lines[0]) };
  const stack = [{ indent: lines[0].search(/\S/), list: root }];
  for (const line of lines) {
    const m = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(line);
    if (!m) {
      const items = stack.at(-1).list.items;
      if (items.length) items.at(-1).text += ` ${line.trim()}`;
      continue;
    }
    const indent = m[1].length;
    while (stack.length > 1 && indent < stack.at(-1).indent) stack.pop();
    if (indent > stack.at(-1).indent) {
      const parent = stack.at(-1).list.items.at(-1);
      if (parent) {
        parent.child = { items: [], ordered: /\d/.test(m[2]) };
        stack.push({ indent, list: parent.child });
      }
    }
    stack.at(-1).list.items.push({ text: m[3] });
  }
  const draw = (list) => {
    const tag = list.ordered ? 'ol' : 'ul';
    return `<${tag}>${list.items.map((i) => `<li>${inline(i.text)}${i.child ? draw(i.child) : ''}</li>`).join('')}</${tag}>`;
  };
  return draw(root);
}

function renderTable(header, rows) {
  const head = header.map((c) => `<th>${inline(c)}</th>`).join('');
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');
  return `<div class="scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

const fitFrame = "this.style.height=(this.contentDocument.documentElement.offsetHeight+2)+'px'";

function frame(html, head) {
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head}</head><body>${html}</body></html>`;
  return `<iframe class="preview" sandbox="allow-same-origin" loading="lazy" onload="${fitFrame}" srcdoc="${esc(doc)}"></iframe>`;
}

/** Turns Markdown lines into HTML. `hooks.table(rows, header, index)` may replace a table; `hooks.code` a code block. */
function renderBlocks(lines, hooks = {}) {
  const out = [];
  let tableIndex = 0;
  const startsBlock = (line, next) =>
    line.trim() === '' || isFence(line) || /^#{1,6}\s/.test(line) || /^\s*([-*]|\d+\.)\s/.test(line) || /^>/.test(line) || isTableStart(line, next);
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }
    if (isFence(line)) {
      const lang = line.trim().slice(3).trim().split(/\s+/)[0] ?? '';
      const code = [];
      for (i++; i < lines.length && !isFence(lines[i]); i++) code.push(lines[i]);
      i++;
      const text = code.join('\n');
      out.push(hooks.code?.(lang, text) ?? `<pre><code>${esc(text)}</code></pre>`);
      continue;
    }
    const heading = parseHeading(line);
    if (heading) {
      const level = Math.max(heading.level, 3);
      out.push(`<h${level}${heading.id ? ` id="${heading.id}"` : ''}>${inline(heading.title)}</h${level}>`);
      i++;
      continue;
    }
    if (isTableStart(line, lines[i + 1])) {
      const header = splitRow(line);
      const rows = [];
      for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(splitRow(lines[i]));
      out.push(hooks.table?.(rows, header, tableIndex) ?? renderTable(header, rows));
      tableIndex++;
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      const items = [];
      while (i < lines.length && lines[i].trim() !== '' && !isFence(lines[i])) items.push(lines[i++]);
      out.push(renderList(items));
      continue;
    }
    if (/^>/.test(line)) {
      const quote = [];
      for (; i < lines.length && /^>/.test(lines[i]); i++) quote.push(lines[i].replace(/^>\s?/, ''));
      out.push(`<blockquote>${renderBlocks(quote)}</blockquote>`);
      continue;
    }
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    const para = [line];
    for (i++; i < lines.length && !startsBlock(lines[i], lines[i + 1]); i++) para.push(lines[i]);
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

function fontFaces(type) {
  const faces = [];
  for (const t of type) {
    for (const f of t.files) {
      const weight = f.weight ? `font-weight:${f.weight.replace('-', ' ')};` : '';
      faces.push(`@font-face{font-family:"${t.family}";src:url("${encodeURI(f.file)}");${weight}font-style:${f.italic ? 'italic' : 'normal'};font-display:swap}`);
    }
  }
  return faces.join('\n');
}

const familyStack = (t) => `"${t.family}"${t.fallback ? `, ${t.fallback}` : ''}, sans-serif`;

function brandVariables(book) {
  const colors = book.colors.map((c) => `${cssName(c.id)}:${c.value}`);
  const fonts = book.type.map((t) => `${cssName(t.id)}:${familyStack(t)}`);
  return `:root{${[...colors, ...fonts].join(';')}}`;
}

function renderColors(book, L) {
  return `<div class="swatches">${book.colors.map((c) => `
    <figure class="swatch" id="${c.id}">
      <div class="chip" style="background:${c.value}"></div>
      <figcaption><code>${c.id}</code><strong>${c.value}</strong><span>${inline(c.role)}</span>${c.code ? `<span class="muted">${L.code}: ${inline(c.code)}</span>` : ''}</figcaption>
    </figure>`).join('')}</div>`;
}

function renderPairs(book, L) {
  return `<div class="pairs">${book.pairs.map((p) => `
    <figure class="pair" id="${p.id}">
      <div class="pair-sample" style="color:${p.fg};background:${p.bg}"><span class="big">Aa Яя</span> ${esc(book.meta.name ?? '')}</div>
      <figcaption><code>${p.id}</code> <strong>${p.ratio.toFixed(2)}:1</strong> <span class="muted">${esc(p.use)}: ${p.min ? `${L.minimum} ${p.min}:1, ${L.pass}` : L.decor}</span><br><span class="muted">${inline(p.label)}</span></figcaption>
    </figure>`).join('')}</div>`;
}

function renderType(book, L) {
  return `<div class="specimens">${book.type.map((t) => `
    <figure class="specimen" id="${t.id}" style="font-family:${esc(familyStack(t))}">
      <p class="spec-big">${esc(book.meta.name ?? t.family)}</p>
      <p>${L.specimen}</p>
      <p><strong>${L.specimen}</strong></p>
      <p><em>${L.specimen}</em></p>
      <p>${L.specimenSigns}</p>
      <figcaption><code>${t.id}</code> <strong>${esc(t.family)}</strong> ${inline(t.role)}<br>
        <span class="muted">${L.license}: ${inline(t.license || '—')}; ${L.fallback}: ${esc(t.fallback || '—')}</span>
        ${t.files.length ? '' : `<br><span class="flag">${L.noFontFile}</span>`}</figcaption>
    </figure>`).join('')}</div>`;
}

function renderLogos(book, L) {
  return `<div class="logos">${book.logos.map((l) => {
    const px = /(\d+(?:[.,]\d+)?)\s*px/i.exec(l.min)?.[1];
    const small = px && l.file ? `<div class="logo-box small" style="background:${l.background ?? '#fff'}"><img src="${encodeURI(l.file)}" alt="${L.atMin}" style="height:${px.replace(',', '.')}px"></div>` : '';
    return `<figure class="logo" id="${l.id}">
      ${l.file
        ? `<div class="logo-box" style="background:${l.background ?? '#fff'}"><img src="${encodeURI(l.file)}" alt="${l.id}"></div>${small}`
        : `<div class="logo-box none">${L.noLogo}</div>`}
      <figcaption><code>${l.id}</code><br><span class="muted">${L.minSize}: ${inline(l.min || '—')}; ${L.clear}: ${inline(l.clear || '—')}</span></figcaption>
    </figure>`;
  }).join('')}</div>`;
}

function renderOutput(output, head, L) {
  if (!output) return '';
  if (output.ext === 'html') return frame(output.text, head);
  return `<div class="output">${renderBlocks(splitFrontMatter(output.text).body.split('\n'))}</div>`;
}

function renderProbes(book, probes, head, L) {
  if (probes.length === 0) return '';
  const items = probes.map((p) => {
    const stale = p.bookHash !== book.hash ? `<p class="flag">${L.stale}</p>` : '';
    const task = splitFrontMatter(p.task).body;
    const both = p.without
      ? `<div class="side"><div><h4>${L.withBook}</h4>${renderOutput(p.with, head, L)}</div><div><h4>${L.withoutBook}</h4>${renderOutput(p.without, head, L)}</div></div>`
      : `<h4>${L.withBook}</h4>${renderOutput(p.with, head, L)}`;
    return `<article class="probe" id="probe-${esc(p.id)}">
      <h3>${L.task}: <code>${esc(p.id)}</code></h3>${stale}
      <div class="task">${renderBlocks(task.split('\n'))}</div>
      ${both}
      <h4>${L.findings}</h4>${renderBlocks(p.report.split('\n'))}
    </article>`;
  }).join('');
  return `<section id="probes"><h2>${L.probes}</h2><p class="muted">${L.probesHelp}</p>${items}</section>`;
}

const CSS = `
:root{--p-ink:#1d1d1f;--p-muted:#6a6a70;--p-line:#e2e2e6;--p-soft:#f6f6f8;--p-flag:#8a5a00;--p-flag-bg:#fff6dc;color-scheme:light}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:4rem}
body{margin:0;background:#fff;color:var(--p-ink);font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow-wrap:break-word}
header.top{padding:3rem 1.25rem 1.5rem;max-width:72rem;margin:auto}
header.top h1{font-size:clamp(2.2rem,6vw,3.6rem);line-height:1.05;margin:0 0 .75rem;letter-spacing:-.01em}
.meta{display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;color:var(--p-muted);font-size:.92rem}
.pill{display:inline-block;padding:.05rem .6rem;border-radius:99px;background:var(--p-soft);border:1px solid var(--p-line);color:var(--p-ink)}
.pill.draft{background:var(--p-flag-bg);border-color:#ecd9a0;color:var(--p-flag)}
nav.toc{position:sticky;top:0;z-index:5;background:rgba(255,255,255,.95);border-block:1px solid var(--p-line);padding:.5rem 1.25rem;overflow-x:auto;white-space:nowrap;font-size:.9rem}
nav.toc a{color:var(--p-ink);text-decoration:none;margin-right:1rem}
nav.toc a:hover{text-decoration:underline}
main{max-width:72rem;margin:auto;padding:0 1.25rem 4rem}
section{padding-top:2.5rem;border-bottom:1px solid var(--p-line);padding-bottom:1.5rem}
section:last-child{border-bottom:0}
h2{font-size:1.65rem;margin:0 0 1rem;line-height:1.2}
h3{font-size:1.2rem;margin:1.75rem 0 .6rem}
h4{font-size:1rem;margin:1.25rem 0 .5rem}
p,ul,ol{max-width:46rem}
li{margin:.2rem 0}
a{color:inherit}
code{font:.86em ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--p-soft);padding:.08em .32em;border-radius:4px}
pre{background:var(--p-soft);padding:.9rem 1rem;border-radius:8px;overflow:auto;font-size:.86rem;line-height:1.45}
pre code{background:none;padding:0}
blockquote{margin:1rem 0;padding:.1rem 1rem;border-left:3px solid var(--p-line);color:var(--p-muted)}
img{max-width:100%;height:auto}
.scroll{overflow-x:auto}
table{border-collapse:collapse;margin:1rem 0;font-size:.93rem;min-width:100%}
th,td{border-bottom:1px solid var(--p-line);padding:.45rem .75rem .45rem 0;text-align:left;vertical-align:top}
th{font-weight:600;color:var(--p-muted);font-size:.85rem}
figure{margin:0}
figcaption{font-size:.87rem;line-height:1.4}
.muted{color:var(--p-muted)}
.flag{color:var(--p-flag)}
.swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(11rem,1fr));gap:1rem;margin:1rem 0}
.swatch{border:1px solid var(--p-line);border-radius:10px;overflow:hidden}
.chip{height:6rem}
.swatch figcaption{padding:.6rem .7rem;display:grid;gap:.15rem}
.pairs{display:grid;grid-template-columns:repeat(auto-fill,minmax(17rem,1fr));gap:1rem;margin:1rem 0}
.pair-sample{padding:1.1rem 1rem;border-radius:10px;border:1px solid var(--p-line);margin-bottom:.4rem}
.big{font-size:1.7rem;font-weight:600;margin-right:.4rem}
.specimens{display:grid;gap:1.25rem;margin:1rem 0}
.specimen{border:1px solid var(--p-line);border-radius:10px;padding:1.25rem}
.specimen p{margin:.35rem 0;max-width:none}
.spec-big{font-size:2.6rem;line-height:1.1}
.specimen figcaption{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;margin-top:.9rem;padding-top:.7rem;border-top:1px solid var(--p-line)}
.logos{display:grid;grid-template-columns:repeat(auto-fill,minmax(17rem,1fr));gap:1rem;margin:1rem 0}
.logo-box{display:flex;align-items:center;justify-content:center;min-height:9rem;padding:2rem;border:1px solid var(--p-line);border-radius:10px;margin-bottom:.4rem}
.logo-box img{max-height:5rem}
.logo-box.small{min-height:0;padding:.75rem}
.logo-box.none{background:var(--p-soft);color:var(--p-muted)}
.preview{display:block;width:100%;height:14rem;border:1px solid var(--p-line);border-radius:10px;background:#fff;margin:.75rem 0}
details{margin:.5rem 0 1.5rem}
summary{cursor:pointer;color:var(--p-muted);font-size:.9rem}
.check{background:var(--p-flag-bg);border:1px solid #ecd9a0;border-radius:10px;padding:1rem 1.25rem;margin-top:1.5rem}
.check h2{font-size:1.1rem;margin:0 0 .25rem}
.check ul{max-width:none;margin:.5rem 0 0;padding-left:1.1rem}
.probe{border-top:1px solid var(--p-line);margin-top:1.5rem}
.task{background:var(--p-soft);border-radius:8px;padding:.25rem 1rem}
.side{display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1rem}
.output{border:1px solid var(--p-line);border-radius:10px;padding:.25rem 1rem}
footer{max-width:72rem;margin:auto;padding:1.5rem 1.25rem 3rem;color:var(--p-muted);font-size:.85rem}
@media print{nav.toc{display:none}.preview{break-inside:avoid}}
`;

export function renderPage(book, { probes = [], changelog = '', isCandidate = false } = {}) {
  const lang = String(book.meta.language ?? 'en').split(/[-_]/)[0].toLowerCase();
  const L = LABELS[lang] ?? LABELS.en;
  const vars = brandVariables(book);
  const faces = fontFaces(book.type);
  const frameHead = `<style>${vars}\n${faces}\nbody{margin:0;font-family:system-ui,sans-serif}</style>`;

  const hooksFor = (id) => {
    if (id === 'color') {
      return { table: (rows, header, i) => (i === 0 ? renderColors(book, L) : i === 1 ? renderPairs(book, L) : null) };
    }
    if (id === 'type') return { table: (rows, header, i) => (i === 0 ? renderType(book, L) : null) };
    if (id === 'logo') return { table: (rows, header, i) => (i === 0 ? renderLogos(book, L) : null) };
    if (id === 'samples') {
      return {
        code: (language, text) => (language === 'html'
          ? `${frame(text, frameHead)}<details><summary>${L.sampleCode}</summary><pre><code>${esc(text)}</code></pre></details>`
          : null),
      };
    }
    return {};
  };

  const body = book.sections.filter((s) => s.id !== 'intro');
  const intro = book.sections.find((s) => s.id === 'intro');
  const introLines = intro.lines.filter((line) => !/^#\s/.test(line));
  const toc = [
    ...body.filter((s) => s.title).map((s) => `<a href="#${s.id ?? ''}">${inline(s.title)}</a>`),
    probes.length ? `<a href="#probes">${L.probes}</a>` : '',
    changelog ? `<a href="#changelog">${L.changelog}</a>` : '',
  ].join('');

  const display = book.type[0];
  return `<!doctype html>
<!-- ${L.generated} -->
<html lang="${esc(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(book.meta.name ?? 'Brand')}</title>
<style>${CSS}
${vars}
${faces}
</style>
</head>
<body>
<header class="top">
  <h1${display ? ` style="font-family:${esc(familyStack(display))}"` : ''}>${esc(book.meta.name ?? '')}</h1>
  <div class="meta">
    <span class="pill${isCandidate ? ' draft' : ''}">${isCandidate ? L.draft : L.accepted}</span>
    <span>${L.version}: ${esc(book.meta.version ?? '')}, ${esc(book.meta.date ?? '')}</span>
    <span>${L.owner}: ${esc(book.meta.owner || L.noOwner)}</span>
  </div>
  ${book.warnings.length ? `<aside class="check"><h2>${L.check}</h2><span class="muted">${L.checkHelp}</span><ul>${book.warnings.map((w) => `<li>${inline(w[lang] ?? w.en)}</li>`).join('')}</ul></aside>` : ''}
  ${renderBlocks(introLines)}
</header>
<nav class="toc">${toc}</nav>
<main>
${body.map((s) => `<section${s.id ? ` id="${s.id}"` : ''}><h2>${inline(s.title)}</h2>\n${renderBlocks(s.lines, hooksFor(s.id))}</section>`).join('\n')}
${renderProbes(book, probes, frameHead, L)}
${changelog ? `<section id="changelog"><h2>${L.changelog}</h2>${renderBlocks(changelog.split('\n'))}</section>` : ''}
</main>
<footer>${L.generated}</footer>
</body>
</html>
`;
}
