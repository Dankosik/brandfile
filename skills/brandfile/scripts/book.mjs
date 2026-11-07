// Reads a brand book and checks the book itself. It never looks at work agents
// produce from the book. The format is described in
// skills/brand-book/references/book-format.md.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fontCodepoints, requiredCharacters } from './fontcheck.mjs';

export const SECTIONS = ['start', 'name', 'meaning', 'decisions', 'logo', 'color', 'type', 'layout', 'voice', 'samples', 'open', 'change'];

/** WCAG 2.2 minimums. `decor` has no minimum: logos and decoration only, never text people must read. */
export const MINIMUMS = { text: 4.5, large: 3, ui: 3, decor: 0 };
const NEAR = 0.1; // our own margin around a minimum, not a standard

const NONE = /^(-|—|–|none|нет)?$/i;
const UNKNOWN = /^(unknown|неизвестно)$/i;
const isNone = (cell) => NONE.test(cell.trim());
const stripCode = (cell) => cell.trim().replace(/^`(.*)`$/, '$1');

export function readText(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
}

/** Splits a leading `---` block of flat `key: value` lines from the text. This is not YAML. */
export function splitFrontMatter(text) {
  if (!text.startsWith('---\n')) return { meta: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end < 0) return { meta: {}, body: text };
  const meta = {};
  for (const line of text.slice(4, end).split('\n')) {
    const at = line.indexOf(':');
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return { meta, body: text.slice(end + 4).replace(/^\n+/, '') };
}

const HEADING = /^(#{1,6})\s+(.*?)(?:\s*\{#([A-Za-z0-9_-]+)\})?\s*$/;

export function parseHeading(line) {
  const m = HEADING.exec(line);
  return m && { level: m[1].length, title: m[2], id: m[3] || null };
}

export const isFence = (line) => /^\s*```/.test(line);

/** Cuts text into level-2 sections. Lines before the first one are the `intro`. */
export function parseSections(body) {
  const sections = [{ id: 'intro', title: '', lines: [] }];
  let inFence = false;
  for (const line of body.split('\n')) {
    if (isFence(line)) inFence = !inFence;
    const heading = !inFence && parseHeading(line);
    if (heading && heading.level === 2) sections.push({ id: heading.id, title: heading.title, lines: [] });
    else sections.at(-1).lines.push(line);
  }
  return sections;
}

export function splitRow(line) {
  const text = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let cell = '';
  let inCode = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '\\' && text[i + 1] === '|') {
      cell += '|';
      i++;
    } else if (c === '`') {
      inCode = !inCode;
      cell += c;
    } else if (c === '|' && !inCode) {
      cells.push(cell.trim());
      cell = '';
    } else cell += c;
  }
  cells.push(cell.trim());
  return cells;
}

export const isTableStart = (line, next) =>
  /^\s*\|/.test(line) && next !== undefined && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(next) && next.includes('-');

/** Returns every pipe table in these lines as an array of rows, without header and rule. */
export function parseTables(lines) {
  const tables = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (isFence(lines[i])) inFence = !inFence;
    if (inFence || !isTableStart(lines[i], lines[i + 1])) continue;
    const rows = [];
    let j = i + 2;
    for (; j < lines.length && /^\s*\|/.test(lines[j]); j++) rows.push(splitRow(lines[j]));
    tables.push(rows);
    i = j - 1;
  }
  return tables;
}

export function normalizeHex(value) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1];
  return `#${hex.toLowerCase()}`;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((at) => {
    const v = parseInt(hex.slice(at, at + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio between two #rrggbb colors. Never rounded before comparing: 4.499 fails 4.5. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function cssName(id) {
  return `--${id.replace(/\./g, '-')}`;
}

/** Parses the file cell of a type row: `path`, `path 400`, `path 100-900`, `path 400 italic`, comma-separated. */
function parseFontFiles(cell) {
  return cell.replace(/`/g, '').split(',').map((part) => part.trim()).filter(Boolean).map((part) => {
    const [file, ...rest] = part.split(/\s+/);
    return {
      file,
      weight: rest.find((token) => /^\d+(-\d+)?$/.test(token)) || null,
      italic: rest.includes('italic'),
    };
  });
}

export function readBook(dir) {
  const text = readText(join(dir, 'BRAND.md'));
  const { meta, body } = splitFrontMatter(text);
  const sections = parseSections(body);
  const errors = [];
  // Warnings reach the person on the page, so they come in the page's languages.
  const warnings = [];
  const warn = (en, ru) => warnings.push({ en, ru });
  const tablesOf = (id) => parseTables(sections.find((s) => s.id === id)?.lines ?? []);
  const seen = new Set();

  for (const key of ['name', 'language', 'version', 'date']) {
    if (!meta[key]) errors.push(`The header at the top of BRAND.md needs \`${key}:\`.`);
  }
  if (!meta.owner) warn('No owner yet: name the role that decides when the brand changes. It is required at acceptance.', 'Владелец не назван: запишите роль, которая решает, когда бренд меняется. При приёмке это обязательно.');
  for (const id of SECTIONS) {
    if (!sections.some((s) => s.id === id)) errors.push(`Missing section with the label {#${id}}.`);
  }

  const readId = (cell, prefix, where) => {
    const id = stripCode(cell);
    if (!new RegExp(`^${prefix}\\.[a-z0-9][a-z0-9.-]*$`).test(id)) {
      errors.push(`${where}: "${id}" is not a valid id. Use lowercase like ${prefix}.accent.`);
      return null;
    }
    if (seen.has(id)) errors.push(`${where}: the id ${id} is used twice.`);
    seen.add(id);
    return id;
  };

  const [colorRows = [], pairRows = []] = tablesOf('color');
  const colors = [];
  for (const row of colorRows) {
    const id = readId(row[0] ?? '', 'color', 'Color table');
    const value = normalizeHex(stripCode(row[1] ?? ''));
    if (!value) errors.push(`Color table: ${id ?? row[0]} needs a value like #1a2b3c, got "${row[1] ?? ''}".`);
    if (id && value) colors.push({ id, value, role: row[2] ?? '', code: row[3] ?? '' });
  }
  const resolve = (cell) => colors.find((c) => c.id === stripCode(cell))?.value ?? normalizeHex(stripCode(cell));

  const pairs = [];
  for (const row of pairRows) {
    if (row.length < 5) {
      errors.push(`Pairs table: every row needs five columns (id, text, background, use, contrast), got: ${row.join(' | ')}.`);
      continue;
    }
    const id = readId(row[0], 'pair', 'Pairs table');
    const fg = resolve(row[1]);
    const bg = resolve(row[2]);
    const use = stripCode(row[3]).toLowerCase();
    const written = Number(row[4].replace(',', '.').replace(/:1\s*$/, ''));
    if (!fg || !bg) {
      errors.push(`Pairs table: ${id}: "${row[1]}" and "${row[2]}" must be color ids from the table above, or hex values.`);
      continue;
    }
    if (!(use in MINIMUMS)) {
      errors.push(`Pairs table: ${id}: the use must be one of ${Object.keys(MINIMUMS).join(', ')}, got "${row[3]}".`);
      continue;
    }
    const ratio = contrast(fg, bg);
    const min = MINIMUMS[use];
    if (!Number.isFinite(written) || Math.abs(written - ratio) > 0.011) {
      errors.push(`Pairs table: ${id}: contrast is ${ratio.toFixed(2)}, the book says "${row[4]}". Write ${ratio.toFixed(2)}.`);
    }
    if (ratio < min) {
      errors.push(`Pairs table: ${id}: ${ratio.toFixed(2)}:1 is below the ${min}:1 minimum for ${use}. Change the pair, or give it a use it can pass (a brand color that fails for text can stay as decor; that is the person's call).`);
    } else if (min > 0 && ratio - min < NEAR) {
      warn(`${id}: ${ratio.toFixed(2)}:1 barely passes the ${min}:1 minimum. Thin or small text in this pair can read worse than the number says: look at it on the page.`, `${id}: контраст ${ratio.toFixed(2)}:1 едва проходит минимум ${min}:1. Тонкий или мелкий текст в этой паре может читаться хуже, чем говорит число: посмотрите на неё на странице.`);
    }
    pairs.push({ id, fg, bg, use, ratio, min, label: `${stripCode(row[1])} / ${stripCode(row[2])}` });
  }

  const [typeRows = []] = tablesOf('type');
  const type = [];
  const required = requiredCharacters(meta.language ?? '', meta.name ?? '');
  for (const row of typeRows) {
    if (row.length < 6) {
      errors.push(`Type table: every row needs six columns (id, family, role, license, fallback, file), got: ${row.join(' | ')}.`);
      continue;
    }
    const id = readId(row[0], 'type', 'Type table');
    const family = stripCode(row[1]);
    const license = row[3].trim();
    const fallback = isNone(row[4]) ? '' : stripCode(row[4]);
    const files = isNone(row[5]) ? [] : parseFontFiles(row[5]);
    if (!family) errors.push(`Type table: ${id} has no family.`);
    if (isNone(license)) warn(`${id}: no license recorded. Write it, or write "unknown" and ask the person.`, `${id}: лицензия не записана. Укажите её или напишите «неизвестно» и решите, использовать ли шрифт.`);
    else if (UNKNOWN.test(license)) warn(`${id}: the license of ${family} is unknown. The person decides whether to use it.`, `${id}: лицензия шрифта ${family} неизвестна. Решите, использовать ли его.`);
    if (!fallback) warn(`${id}: no fallback font recorded.`, `${id}: не записан запасной шрифт.`);
    if (files.length === 0) {
      warn(`${id}: no font file, so character coverage could not be checked and the page shows a fallback unless ${family} is installed.`, `${id}: нет файла шрифта, поэтому покрытие знаков не проверено, а на странице показан запасной шрифт, если ${family} не установлен.`);
    }
    for (const { file } of files) {
      const path = join(dir, file);
      if (!existsSync(path)) {
        errors.push(`Type table: ${id}: file not found: ${file}.`);
        continue;
      }
      try {
        const have = fontCodepoints(path);
        const missing = required.filter((c) => !have.has(c.codePointAt(0)));
        if (missing.length > 0) {
          const shown = missing.slice(0, 40).join(' ') + (missing.length > 40 ? ` and ${missing.length - 40} more` : '');
          warn(`${id}: ${file} has no glyph for: ${shown}. Text with these falls back to another font. Ask the person whether this font is meant for such text.`, `${id}: в файле ${file} нет знаков: ${shown}. Текст с ними покажется другим шрифтом. Решите, подходит ли шрифт для такого текста.`);
        }
      } catch (error) {
        warn(`${id}: could not read characters from ${file} (${error.message}), so coverage is unchecked.`, `${id}: не удалось прочитать знаки из ${file}, покрытие не проверено.`);
      }
    }
    type.push({ id, family, role: row[2], license, fallback, files });
  }

  const [logoRows = []] = tablesOf('logo');
  const logos = [];
  for (const row of logoRows) {
    if (row.length < 5) {
      errors.push(`Logo table: every row needs five columns (id, file, background, min size, clear space), got: ${row.join(' | ')}.`);
      continue;
    }
    const id = readId(row[0], 'logo', 'Logo table');
    const file = isNone(row[1]) ? null : stripCode(row[1]);
    if (file && !existsSync(join(dir, file))) errors.push(`Logo table: ${id}: file not found: ${file}.`);
    const background = isNone(row[2]) ? null : resolve(row[2]);
    if (!isNone(row[2]) && !background) errors.push(`Logo table: ${id}: background "${row[2]}" must be a color id or hex value.`);
    logos.push({ id, file, background, min: row[3], clear: row[4] });
  }

  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
    if (!/^[a-z]+:/i.test(m[1]) && !existsSync(join(dir, m[1]))) errors.push(`Image not found: ${m[1]}.`);
  }

  const samplesLines = sections.find((s) => s.id === 'samples')?.lines ?? [];
  if (samplesLines.filter(isFence).length < 4) warn('Fewer than two working samples; the format asks for two or three.', 'Меньше двух рабочих образцов, а формат просит два или три.');
  for (const id of ['color', 'type', 'logo']) {
    if (sections.some((s) => s.id === id) && tablesOf(id).length === 0) {
      warn(`Section {#${id}} has no table. That is fine only if the section says the element is deferred and names the event.`, `В разделе {#${id}} нет таблицы. Это нормально, только если там написано, что элемент отложен и до какого события.`);
    }
  }

  const hash = createHash('sha256').update(body).digest('hex').slice(0, 12);
  return { dir, meta, body, sections, colors, pairs, type, logos, errors, warnings, hash };
}

function findOutput(dir, stem) {
  for (const ext of ['html', 'md', 'txt']) {
    const path = join(dir, `${stem}.${ext}`);
    if (existsSync(path)) return { ext, text: readText(path) };
  }
  return null;
}

/** A probe counts once its report exists: a run without a report has not been read by anyone. */
export function readProbes(dir) {
  const root = join(dir, 'probes');
  if (!existsSync(root)) return [];
  const probes = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(root, entry.name);
    if (!existsSync(join(path, 'report.md'))) continue;
    const { meta, body } = splitFrontMatter(readText(join(path, 'report.md')));
    probes.push({
      id: entry.name,
      task: existsSync(join(path, 'task.md')) ? readText(join(path, 'task.md')) : '',
      report: body,
      bookHash: meta.book ?? null,
      date: meta.date ?? null,
      with: findOutput(path, 'with'),
      without: findOutput(path, 'without'),
    });
  }
  return probes.sort((a, b) => a.id.localeCompare(b.id));
}
