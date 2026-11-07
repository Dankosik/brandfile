// Exercises brand.mjs the way skills do: as a command run from a project root.
// Run with: node --test test/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, deflateSync } from 'node:zlib';

const SKILL_SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'brandfile', 'scripts', 'brand.mjs');
const CANDIDATE = 'brand/work/candidate';

let project;
beforeEach(() => {
  project = mkdtempSync(join(tmpdir(), 'brandfile-test-'));
});
afterEach(() => rmSync(project, { recursive: true, force: true }));

function brand(...args) {
  const r = spawnSync(process.execPath, [SKILL_SCRIPT, ...args], { cwd: project, encoding: 'utf8' });
  return { code: r.status, out: r.stdout + r.stderr };
}

function write(path, content) {
  const full = join(project, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

const read = (path) => readFileSync(join(project, path), 'utf8');
const field = (out, key) => new RegExp(`^${key}: (.*)$`, 'm').exec(out)?.[1];

const SECTIONS = {
  start: '## С чего начать {#start}\n\nКнопка действия всегда `color.accent`.',
  name: '## Название {#name}\n\nПишем «Корт», без кавычек в тексте.',
  meaning: '## Смысл {#meaning}\n\nБронирование кортов для любителей.',
  decisions: '## Решения {#decisions}\n\n- Цены видны до регистрации.',
  logo: '## Логотип {#logo}\n\n| Метка | Файл | Фон | Минимум | Поле |\n|---|---|---|---|---|\n| `logo.none` | — | — | — | — |',
  color: '## Цвет {#color}\n\n| Метка | Значение | Роль | В коде |\n|---|---|---|---|\n| `color.ink` | #767676 | Текст | `--ink` |\n| `color.paper` | #ffffff | Фон | `--paper` |\n\nПары:\n\n| Метка | Текст | Фон | Назначение | Контраст |\n|---|---|---|---|---|\n| `pair.body` | `color.ink` | `color.paper` | text | 4.54 |',
  type: '## Шрифт {#type}\n\n| Метка | Семейство | Роль | Лицензия | Запасной | Файл |\n|---|---|---|---|---|---|\n| `type.body` | Golos Text | Текст | OFL-1.1 | sans-serif | — |',
  layout: '## Композиция {#layout}\n\nНа первом экране цена и свободное время.',
  voice: '## Голос {#voice}\n\nОбращаемся на «вы».',
  samples: '## Образцы {#samples}\n\n```html\n<button style="color:var(--color-ink)">Забронировать</button>\n```\n\n```html\n<p>Корт №3 свободен</p>\n```',
  open: '## Не решено {#open}\n\nЛоготипа пока нет, вернёмся при первом подрядчике.',
  change: '## Как менять {#change}\n\nРешает владелец.',
};

function book(overrides = {}, header = {}) {
  const meta = { name: 'Корт', language: 'ru', version: 'draft', date: '2026-11-07', owner: 'Основатель', ...header };
  const front = Object.entries(meta).map(([k, v]) => `${k}: ${v}`).join('\n');
  const body = Object.entries({ ...SECTIONS, ...overrides }).map(([, v]) => v).filter(Boolean).join('\n\n');
  return `---\n${front}\n---\n\n# Корт: брендбук\n\n${body}\n`;
}

function candidate(overrides, header) {
  write(`${CANDIDATE}/BRAND.md`, book(overrides, header));
}

function probe(hash, id = 'landing') {
  write(`${CANDIDATE}/probes/${id}/task.md`, 'Сделай первый экран.');
  write(`${CANDIDATE}/probes/${id}/with.html`, '<h1>С брендбуком</h1>');
  write(`${CANDIDATE}/probes/${id}/without.md`, 'Без брендбука');
  write(`${CANDIDATE}/probes/${id}/report.md`, `---\nbook: ${hash}\ndate: 2026-11-07\n---\n\nРасхождений нет.\n`);
}

const confirmedBrief = (elements = '| Логотип | later | | | Вернуться при подрядчике |') =>
  `---\nconfirmed: yes\nupdated: 2026-11-07\n---\n\n# Brief\n\n## Elements\n| Element | Status | Value | License | Note |\n|---|---|---|---|---|\n${elements}\n`;

test('status names the stage and next skill from the files alone', async (t) => {
  const cases = [
    ['nothing yet', () => {}, 'interview', 'brand-interview'],
    ['unconfirmed brief', () => write('brand/work/brief.md', '---\nconfirmed: no\n---\n'), 'interview', 'brand-interview'],
    ['all elements settled', () => write('brand/work/brief.md', confirmedBrief()), 'book', 'brand-book'],
    ['open element with no choice', () => write('brand/work/brief.md', confirmedBrief('| Цвет | open | | | |')), 'directions', 'brand-directions'],
    ['evolve element with a blank choice', () => {
      write('brand/work/brief.md', confirmedBrief('| Цвет | `evolve` | | | |'));
      write('brand/work/selection.md', '| Element | Choice | Why |\n|---|---|---|\n| Цвет |  | |\n');
    }, 'directions', 'brand-directions'],
    ['every open element chosen', () => {
      write('brand/work/brief.md', confirmedBrief('| Цвет | open | | | |'));
      write('brand/work/selection.md', '| Element | Choice | Why |\n|---|---|---|\n| цвет | B | Спокойнее |\n');
    }, 'book', 'brand-book'],
    ['confirmed brief with no Elements table', () => write('brand/work/brief.md', '---\nconfirmed: yes\n---\n\n## Элементы\n| Элемент | Статус |\n|---|---|\n| Цвет | open |\n'), 'interview', 'brand-interview'],
    ['element with a status outside the four words', () => write('brand/work/brief.md', confirmedBrief('| Цвет | открыт | | | |')), 'interview', 'brand-interview'],
    ['element left without a status', () => write('brand/work/brief.md', confirmedBrief('| Цвет |  | | | |')), 'interview', 'brand-interview'],
    ['broken candidate', () => {
      write('brand/work/brief.md', confirmedBrief());
      candidate({ voice: null });
    }, 'book', 'brand-book'],
    ['candidate without probes', () => {
      write('brand/work/brief.md', confirmedBrief());
      candidate();
    }, 'probe', 'brand-probe'],
    ['candidate with probes', () => {
      write('brand/work/brief.md', confirmedBrief());
      candidate();
      probe('anything');
    }, 'accept', 'brand-book'],
    ['one probe still without its report', () => {
      write('brand/work/brief.md', confirmedBrief());
      candidate();
      probe('anything');
      write(`${CANDIDATE}/probes/second/task.md`, 'Письмо об отмене.');
    }, 'probe', 'brand-probe'],
    ['accepted book and no rework', () => write('brand/BRAND.md', book({}, { version: '1.0' })), 'accepted', 'none'],
  ];
  for (const [name, arrange, stage, next] of cases) {
    await t.test(name, () => {
      rmSync(join(project, 'brand'), { recursive: true, force: true });
      arrange();
      const { out } = brand('status');
      assert.equal(field(out, 'stage'), stage, out);
      assert.equal(field(out, 'next'), next, out);
    });
  }
});

test('only a new brand gets "no brief yet", the reason brandfile introduces the stops by', () => {
  assert.equal(field(brand('status').out, 'why'), 'no brief yet');
  write('brand/BRAND.md', book({}, { version: '1.0' }));
  assert.notEqual(field(brand('status').out, 'why'), 'no brief yet');
  rmSync(join(project, 'brand'), { recursive: true, force: true });
  write('brand/work/brief.md', '---\nconfirmed: no\n---\n');
  assert.notEqual(field(brand('status').out, 'why'), 'no brief yet');
});

test('contrast matches published WCAG values without rounding up to a pass', () => {
  assert.match(brand('contrast', '#767676', '#ffffff').out, /^4\.54\d*\s+text: pass/);
  assert.match(brand('contrast', '#777777', '#fff').out, /^4\.47\d*\s+text: fail\s+large: pass/);
  assert.match(brand('contrast', '#FF0000', '#FFFFFF').out, /^3\.99\d*\s+text: fail/);
  assert.equal(brand('contrast', 'red', '#fff').code, 1);
});

test('glyphs names what a font file lacks for the brand, before anyone writes the book', () => {
  write('fonts/noruble.ttf', ttf(cmapFormat4(RU)));
  assert.match(brand('glyphs', 'fonts/noruble.ttf', 'ru', 'Корт').out, /^missing: ₽$/m);
  write('fonts/full.woff2', woff2(cmapFormat4(`${RU}₽`)));
  assert.match(brand('glyphs', 'fonts/full.woff2', 'ru').out, /^covers:/m);
  write('fonts/junk.ttf', 'not a font');
  assert.equal(brand('glyphs', 'fonts/junk.ttf').code, 1);
});

test('build refuses a broken book, says what to fix, and writes no page', async (t) => {
  const colorWith = (hex, use, written) =>
    `## Цвет {#color}\n\n| М | З | Р |\n|---|---|---|\n| \`color.ink\` | ${hex} | Т |\n| \`color.paper\` | #ffffff | Ф |\n\n| М | Т | Ф | Н | К |\n|---|---|---|---|---|\n| \`pair.body\` | \`color.ink\` | \`color.paper\` | ${use} | ${written} |`;
  const cases = [
    ['a required section is missing', { voice: null }, {}, /\{#voice\}/],
    ['the written contrast is wrong', { color: colorWith('#767676', 'text', '7.00') }, {}, /contrast is 4\.54.*Write 4\.54/],
    ['a text pair is below 4.5, even when it rounds to it', { color: colorWith('#777777', 'text', '4.48') }, {}, /below the 4\.5:1 minimum/],
    ['a pair names an unknown color', { color: colorWith('#767676', 'text', '4.54').replace('`color.ink` | `color.paper` | text', '`color.nope` | `color.paper` | text') }, {}, /must be color ids/],
    ['a use is not a known word', { color: colorWith('#767676', 'body', '4.54') }, {}, /use must be one of/],
    ['a color value is not hex', { color: '## Цвет {#color}\n\n| М | З | Р |\n|---|---|---|\n| `color.ink` | oklch(50% 0.1 200) | Т |' }, {}, /needs a value like/],
    ['an id is used twice', { color: '## Цвет {#color}\n\n| М | З | Р |\n|---|---|---|\n| `color.ink` | #111111 | Т |\n| `color.ink` | #222222 | Т |' }, {}, /used twice/],
    ['a logo file does not exist', { logo: SECTIONS.logo.replace('| — | — | — | — |', '| assets/logo.svg | — | 24 px | 1/2 |') }, {}, /file not found: assets\/logo\.svg/],
    ['a font file does not exist', { type: SECTIONS.type.replace('| sans-serif | — |', '| sans-serif | assets/fonts/x.woff2 |') }, {}, /file not found: assets\/fonts\/x\.woff2/],
    ['the header lacks a language', {}, { language: '' }, /`language:`/],
  ];
  for (const [name, overrides, header, message] of cases) {
    await t.test(name, () => {
      rmSync(join(project, 'brand'), { recursive: true, force: true });
      candidate(overrides, header);
      const { code, out } = brand('build');
      assert.equal(code, 1, out);
      assert.match(out, message);
      assert.equal(existsSync(join(project, CANDIDATE, 'index.html')), false);
    });
  }
});

test('the page shows a Russian book as written and renders samples only in a sandbox', () => {
  candidate({
    meaning: '## Смысл {#meaning}\n\nПишем <script>alert(1)</script> как текст и ставим [ссылку](javascript:alert(2)).',
  });
  probe('stale-hash');
  write(`${CANDIDATE}/CHANGELOG-entry.md`, 'Первая версия.');
  const { code, out } = brand('build');
  assert.equal(code, 0, out);
  const page = read(`${CANDIDATE}/index.html`);

  assert.match(page, /<html lang="ru">/);
  assert.match(page, /<section id="color"><h2>Цвет<\/h2>/);
  assert.match(page, /id="color\.accent"|id="color\.ink"/);
  assert.match(page, /4\.54:1/);
  assert.match(page, /Черновик, ещё не принят/);

  assert.doesNotMatch(page, /<script>alert/);
  assert.doesNotMatch(page, /href="javascript:/);

  assert.match(page, /<iframe class="preview" sandbox="allow-same-origin"[^>]*srcdoc="[^"]*Забронировать/);
  assert.equal((page.match(/sandbox="/g) ?? []).length, 3, 'two samples and one probe output');
  assert.doesNotMatch(page, /<button style/);

  assert.match(page, /С брендбуком/);
  assert.match(page, /Брендбук изменился после этого запуска/);
  assert.match(page, /Первая версия\./);
});

test('values written in code spans read the same as bare ones', () => {
  candidate({ color: SECTIONS.color.replace('| #767676 |', '| `#767676` |').replace('| text | 4.54 |', '| `text` | 4.54 |') });
  const { code, out } = brand('build');
  assert.equal(code, 0, out);
});

test('warnings reach the page for what only a person can settle', () => {
  candidate({
    type: '## Шрифт {#type}\n\n| М | С | Р | Л | З | Ф |\n|---|---|---|---|---|---|\n| `type.body` | Странный | Текст | неизвестно | — | — |',
  }, { owner: '' });
  const { code, out } = brand('build');
  assert.equal(code, 0, out);
  const page = read(`${CANDIDATE}/index.html`);
  const expected = [
    ['license of Странный is unknown', 'лицензия шрифта Странный неизвестна'],
    ['no fallback font', 'не записан запасной шрифт'],
    ['no font file', 'нет файла шрифта'],
    ['No owner yet', 'Владелец не назван'],
  ];
  for (const [agent, person] of expected) {
    assert.match(out, new RegExp(agent));
    assert.match(page, new RegExp(person));
  }
});

// Minimal fonts: only what a cmap reader needs. Built here so the expectation
// does not come from the code under test.
function cmapFormat4(chars) {
  const cps = [...chars].map((c) => c.codePointAt(0)).sort((a, b) => a - b);
  const seg = cps.length + 1;
  const table = Buffer.alloc(14 + seg * 8 + 2);
  table.writeUInt16BE(4, 0);
  table.writeUInt16BE(table.length, 2);
  table.writeUInt16BE(seg * 2, 6);
  const ends = 14;
  const starts = ends + seg * 2 + 2;
  const deltas = starts + seg * 2;
  [...cps, 0xffff].forEach((cp, i) => {
    table.writeUInt16BE(cp, ends + i * 2);
    table.writeUInt16BE(cp, starts + i * 2);
    table.writeUInt16BE((i + 1 - cp) & 0xffff, deltas + i * 2);
  });
  return wrapCmap(table, 3, 1);
}

function cmapFormat12(chars) {
  const cps = [...chars].map((c) => c.codePointAt(0)).sort((a, b) => a - b);
  const table = Buffer.alloc(16 + cps.length * 12);
  table.writeUInt16BE(12, 0);
  table.writeUInt32BE(table.length, 4);
  table.writeUInt32BE(cps.length, 12);
  cps.forEach((cp, i) => {
    table.writeUInt32BE(cp, 16 + i * 12);
    table.writeUInt32BE(cp, 20 + i * 12);
    table.writeUInt32BE(i + 1, 24 + i * 12);
  });
  return wrapCmap(table, 3, 10);
}

function wrapCmap(table, platform, encoding) {
  const head = Buffer.alloc(12);
  head.writeUInt16BE(1, 2);
  head.writeUInt16BE(platform, 4);
  head.writeUInt16BE(encoding, 6);
  head.writeUInt32BE(12, 8);
  return Buffer.concat([head, table]);
}

function ttf(cmap) {
  const head = Buffer.alloc(12 + 16);
  head.write('\x00\x01\x00\x00', 0, 'latin1');
  head.writeUInt16BE(1, 4);
  head.write('cmap', 12, 'latin1');
  head.writeUInt32BE(28, 20);
  head.writeUInt32BE(cmap.length, 24);
  return Buffer.concat([head, cmap]);
}

function woff(cmap) {
  const packed = deflateSync(cmap);
  const head = Buffer.alloc(44 + 20);
  head.write('wOFF', 0, 'latin1');
  head.writeUInt16BE(1, 12);
  head.write('cmap', 44, 'latin1');
  head.writeUInt32BE(64, 48);
  head.writeUInt32BE(packed.length, 52);
  head.writeUInt32BE(cmap.length, 56);
  return Buffer.concat([head, packed]);
}

function woff2(cmap) {
  // A 54-byte `head` table comes first, so the reader has to find where cmap starts in the stream.
  const other = Buffer.alloc(54, 7);
  const packed = brotliCompressSync(Buffer.concat([other, cmap]));
  const base128 = (n) => (n < 128 ? [n] : [0x80 | (n >> 7), n & 0x7f]);
  const directory = Buffer.from([0x01, ...base128(other.length), 0x00, ...base128(cmap.length)]);
  const head = Buffer.alloc(48);
  head.write('wOF2', 0, 'latin1');
  head.write('\x00\x01\x00\x00', 4, 'latin1');
  head.writeUInt16BE(2, 12);
  head.writeUInt32BE(packed.length, 20);
  return Buffer.concat([head, directory, packed]);
}

const RU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя«»—№';

test('font coverage reports the characters a file lacks, in every container', async (t) => {
  const cases = [
    ['ttf with format 4', 'a.ttf', ttf(cmapFormat4(`${RU}₽Корт`))],
    ['ttf with format 12', 'b.ttf', ttf(cmapFormat12(`${RU}₽Корт`))],
    ['woff', 'c.woff', woff(cmapFormat4(`${RU}₽Корт`))],
    ['woff2', 'd.woff2', woff2(cmapFormat4(`${RU}₽Корт`))],
  ];
  const typeWith = (file) => SECTIONS.type.replace('| sans-serif | — |', `| sans-serif | ${file} |`);
  for (const [name, file, data] of cases) {
    await t.test(`${name}: full coverage passes`, () => {
      rmSync(join(project, 'brand'), { recursive: true, force: true });
      candidate({ type: typeWith(`assets/${file}`) });
      write(`${CANDIDATE}/assets/${file}`, data);
      const { code, out } = brand('build');
      assert.equal(code, 0, out);
      assert.doesNotMatch(out, /has no glyph|could not read/);
    });
  }
  await t.test('a missing ruble sign and missing Cyrillic are named', () => {
    rmSync(join(project, 'brand'), { recursive: true, force: true });
    candidate({ type: typeWith('assets/noruble.woff2') });
    write(`${CANDIDATE}/assets/noruble.woff2`, woff2(cmapFormat4(RU)));
    assert.match(brand('build').out, /noruble\.woff2 has no glyph for: ₽\./);

    candidate({ type: typeWith('assets/latin.ttf') });
    write(`${CANDIDATE}/assets/latin.ttf`, ttf(cmapFormat4('abcdefgh')));
    assert.match(brand('build').out, /latin\.ttf has no glyph for: А Б В/);
  });
  await t.test('a file that is not a font is a warning, not a pass or a crash', () => {
    rmSync(join(project, 'brand'), { recursive: true, force: true });
    candidate({ type: typeWith('assets/junk.ttf') });
    write(`${CANDIDATE}/assets/junk.ttf`, 'not a font');
    const { code, out } = brand('build');
    assert.equal(code, 0, out);
    assert.match(out, /could not read characters from assets\/junk\.ttf/);
  });
});

test('accept publishes the candidate, numbers it, and clears the way for rework', () => {
  write('brand/work/brief.md', confirmedBrief());
  write('brand/work/refs/note.txt', 'чужое');
  candidate({ logo: SECTIONS.logo.replace('`logo.none` | — | —', '`logo.main` | assets/logo.svg | `color.paper`') });
  write(`${CANDIDATE}/assets/logo.svg`, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const hash = field(brand('status').out, 'book-hash');
  probe(hash);
  write(`${CANDIDATE}/CHANGELOG-entry.md`, 'Первая версия. Потребителям ничего делать не нужно.');

  const first = brand('accept');
  assert.equal(first.code, 0, first.out);
  assert.match(read('brand/BRAND.md'), /^version: 1\.0$/m);
  assert.doesNotMatch(read('brand/BRAND.md'), /version: draft/);
  assert.equal(existsSync(join(project, 'brand/assets/logo.svg')), true);
  assert.equal(existsSync(join(project, 'brand/probes/landing/report.md')), true);
  assert.match(read('brand/CHANGELOG.md'), /## 1\.0 \(\d{4}-\d{2}-\d{2}\)\n\nПервая версия/);
  assert.equal(existsSync(join(project, CANDIDATE)), false);
  assert.equal(existsSync(join(project, 'brand/work/brief.md')), false);
  assert.equal(existsSync(join(project, 'brand/work/archive/1.0/brief.md')), true);
  assert.equal(existsSync(join(project, 'brand/work/archive/1.0/refs/note.txt')), true);

  const page = read('brand/index.html');
  assert.match(page, /Принято/);
  assert.doesNotMatch(page, /Брендбук изменился после этого запуска/, 'stamping the version must not make probes look stale');
  assert.equal(field(brand('status').out, 'stage'), 'accepted');

  candidate({ meaning: '## Смысл {#meaning}\n\nТеперь и для клубов.' });
  probe('x');
  write(`${CANDIDATE}/CHANGELOG-entry.md`, 'Добавили клубы.');
  assert.equal(brand('accept').code, 0);
  assert.match(read('brand/BRAND.md'), /^version: 2\.0$/m);
  const log = read('brand/CHANGELOG.md');
  assert.ok(log.indexOf('## 2.0') < log.indexOf('## 1.0'), 'newest first');
  assert.equal((log.match(/^# Changelog$/gm) ?? []).length, 1);
});

test('accept refuses until the book has an owner, probes and a changelog entry', async (t) => {
  const cases = [
    ['no owner', { owner: '' }, true, true, /no owner/],
    ['no probes', {}, false, true, /run brand-probe/],
    ['no changelog entry', {}, true, false, /CHANGELOG-entry\.md/],
  ];
  for (const [name, header, withProbe, withEntry, message] of cases) {
    await t.test(name, () => {
      rmSync(join(project, 'brand'), { recursive: true, force: true });
      candidate({}, header);
      if (withProbe) probe('x');
      if (withEntry) write(`${CANDIDATE}/CHANGELOG-entry.md`, 'Запись.');
      const { code, out } = brand('accept');
      assert.equal(code, 1, out);
      assert.match(out, message);
      assert.equal(existsSync(join(project, 'brand/BRAND.md')), false);
    });
  }
});

test('status gives the hash of the book under test: the candidate if there is one, otherwise the accepted book', () => {
  write('brand/BRAND.md', book({}, { version: '1.0' }));
  const acceptedHash = field(brand('status').out, 'book-hash');
  assert.match(acceptedHash, /^[0-9a-f]{12}$/);

  candidate({ voice: '## Голос {#voice}\n\nОбращаемся на «ты».' });
  const candidateHash = field(brand('status').out, 'book-hash');
  assert.match(candidateHash, /^[0-9a-f]{12}$/);
  assert.notEqual(candidateHash, acceptedHash);
});

test('editing the book marks its probes as stale; changing only the header does not', () => {
  write('brand/work/brief.md', confirmedBrief());
  candidate();
  const hash = field(brand('status').out, 'book-hash');
  probe(hash);
  assert.equal(field(brand('status').out, 'stale-probes'), undefined);

  candidate({}, { owner: 'Другой владелец' });
  assert.equal(field(brand('status').out, 'stale-probes'), undefined);

  candidate({ voice: '## Голос {#voice}\n\nОбращаемся на «ты».' });
  assert.equal(field(brand('status').out, 'stale-probes'), 'landing');
});

test('setup makes brand/ work with the skills gone, and keeps working files out of git', () => {
  assert.equal(brand('setup').code, 0);
  assert.match(read('brand/.gitignore'), /^work\/$/m);
  write('brand/BRAND.md', book({}, { version: '1.0' }));

  const standalone = spawnSync(process.execPath, ['brand/tools/brand.mjs', 'build'], { cwd: project, encoding: 'utf8' });
  assert.equal(standalone.status, 0, standalone.stdout + standalone.stderr);
  assert.equal(existsSync(join(project, 'brand/index.html')), true);

  const tool = join(project, 'brand/tools/book.mjs');
  writeFileSync(tool, '// stale copy');
  assert.match(brand('setup').out, /1 files written/);
  assert.notEqual(readFileSync(tool, 'utf8'), '// stale copy');
});
