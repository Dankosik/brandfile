#!/usr/bin/env node
// The one script behind the brandfile skills. Node 20+ and nothing else.
//
//   node <skill>/scripts/brand.mjs setup   copy these scripts into brand/tools/
//   node brand/tools/brand.mjs status      where the work stands and which skill is next
//   node brand/tools/brand.mjs build [dir] check the book and write its page
//   node brand/tools/brand.mjs accept      turn the candidate into the accepted book
//   node brand/tools/brand.mjs contrast <a> <b>   WCAG contrast of two hex colors
//   node brand/tools/brand.mjs glyphs <font> [language] [name]   characters the font file lacks
//
// Run from the project root: every path is relative to brand/ under the current directory.

import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MINIMUMS, contrast, normalizeHex, parseSections, parseTables, readBook, readProbes, readText, splitFrontMatter } from './book.mjs';
import { fontCodepoints, requiredCharacters } from './fontcheck.mjs';
import { renderPage } from './page.mjs';

const BRAND = 'brand';
const WORK = join(BRAND, 'work');
const CANDIDATE = join(WORK, 'candidate');
const BRIEF = join(WORK, 'brief.md');
const SELECTION = join(WORK, 'selection.md');
const SCRIPTS = ['brand.mjs', 'book.mjs', 'page.mjs', 'fontcheck.mjs'];

const hasBook = (dir) => existsSync(join(dir, 'BRAND.md'));
const today = () => new Date().toISOString().slice(0, 10);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function setup() {
  const here = dirname(fileURLToPath(import.meta.url));
  const target = join(BRAND, 'tools');
  mkdirSync(target, { recursive: true });
  let changed = 0;
  if (relative(here, target) !== '') {
    for (const file of SCRIPTS) {
      const source = readFileSync(join(here, file));
      const path = join(target, file);
      if (!existsSync(path) || !readFileSync(path).equals(source)) {
        writeFileSync(path, source);
        changed++;
      }
    }
  }
  const ignore = join(BRAND, '.gitignore');
  if (!existsSync(ignore)) writeFileSync(ignore, '# Working files can hold private facts and other people\'s material.\nwork/\n');
  console.log(`tools: ${changed ? `${changed} files written to` : 'up to date in'} ${target}`);
}

const STATUSES = ['keep', 'evolve', 'open', 'later'];

/**
 * Reads the Elements table of a confirmed brief. A missing table or an unknown status
 * sends the work back to the interview rather than silently skipping directions.
 */
function briefElements() {
  const { body } = splitFrontMatter(readText(BRIEF));
  const elements = parseSections(body).find((s) => /^elements$/i.test(s.title.trim()));
  const [rows = []] = parseTables(elements?.lines ?? []);
  if (rows.length === 0) return { problem: 'the confirmed brief has no table under "## Elements"' };
  const status = (r) => (r[1] ?? '').replace(/`/g, '').trim().toLowerCase();
  const bad = rows.filter((r) => !STATUSES.includes(status(r))).map((r) => `${r[0].trim()} ("${(r[1] ?? '').trim()}")`);
  if (bad.length > 0) return { problem: `elements without one of ${STATUSES.join(', ')}: ${bad.join(', ')}` };
  return { pending: rows.filter((r) => ['open', 'evolve'].includes(status(r))).map((r) => r[0].trim()) };
}

/** Elements the person left to choose (`open`, `evolve`) and have no recorded choice yet. */
function unchosenElements(pending) {
  if (pending.length === 0) return [];
  const chosen = new Set();
  if (existsSync(SELECTION)) {
    const [selected = []] = parseTables(splitFrontMatter(readText(SELECTION)).body.split('\n'));
    for (const r of selected) if ((r[1] ?? '').trim()) chosen.add(r[0].trim().toLowerCase());
  }
  return pending.filter((name) => !chosen.has(name.toLowerCase()));
}

/** Task folders that have a task but no report yet: the probe is still running or was cut off. */
function unfinishedProbes(dir) {
  const root = join(dir, 'probes');
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(root, e.name, 'task.md')) && !existsSync(join(root, e.name, 'report.md')))
    .map((e) => e.name);
}

/** Works out the stage from the files. Nothing stores the stage, so hand edits cannot desync it. */
function computeStatus() {
  const accepted = hasBook(BRAND) ? readBook(BRAND) : null;
  const base = {
    accepted: accepted ? `${accepted.meta.version} (${accepted.meta.date})` : 'none',
    ...(accepted ? { 'book-hash': accepted.hash } : {}),
  };
  const hasBrief = existsSync(BRIEF);
  if (hasBrief) {
    const { meta } = splitFrontMatter(readText(BRIEF));
    if (!/^yes$/i.test(meta.confirmed ?? '')) {
      return { ...base, stage: 'interview', next: 'brand-interview', why: 'the brief exists but the person has not confirmed it' };
    }
    const elements = briefElements();
    if (elements.problem) return { ...base, stage: 'interview', next: 'brand-interview', why: elements.problem };
    const pending = unchosenElements(elements.pending);
    if (pending.length > 0) {
      return { ...base, stage: 'directions', next: 'brand-directions', why: `no recorded choice for: ${pending.join(', ')}` };
    }
  }
  if (!hasBook(CANDIDATE)) {
    if (hasBrief) return { ...base, stage: 'book', next: 'brand-book', why: 'the brief is confirmed and there is no candidate yet' };
    if (accepted) return { ...base, stage: 'accepted', next: 'none', why: 'the book is accepted and no rework is under way; ask the person what should change' };
    return { ...base, stage: 'interview', next: 'brand-interview', why: 'no brief yet' };
  }
  const book = readBook(CANDIDATE);
  const report = { ...base, 'book-hash': book.hash, errors: book.errors, warnings: book.warnings };
  if (book.errors.length > 0) {
    return { ...report, stage: 'book', next: 'brand-book', why: `the candidate has ${book.errors.length} errors` };
  }
  const probes = readProbes(CANDIDATE);
  const unfinished = unfinishedProbes(CANDIDATE);
  if (probes.length === 0 || unfinished.length > 0) {
    const why = unfinished.length ? `probes without a report: ${unfinished.join(', ')}` : 'the candidate has no probes yet';
    return { ...report, stage: 'probe', next: 'brand-probe', why };
  }
  const stale = probes.filter((p) => p.bookHash !== book.hash).map((p) => p.id);
  return {
    ...report,
    stage: 'accept',
    next: 'brand-book',
    why: 'the candidate is waiting for the person to accept it',
    ...(stale.length ? { 'stale-probes': stale.join(', ') } : {}),
  };
}

function status() {
  const s = computeStatus();
  for (const key of ['stage', 'next', 'why', 'accepted', 'book-hash', 'stale-probes']) {
    if (s[key] !== undefined) console.log(`${key}: ${s[key]}`);
  }
  for (const key of ['errors', 'warnings']) {
    if (s[key]?.length) console.log(`${key}:\n${s[key].map((item) => `  - ${item.en ?? item}`).join('\n')}`);
  }
}

function writePage(dir) {
  const book = readBook(dir);
  const isCandidate = resolve(dir) === resolve(CANDIDATE);
  if (book.errors.length > 0) return { book, written: false };
  const changelogFile = join(dir, isCandidate ? 'CHANGELOG-entry.md' : 'CHANGELOG.md');
  const changelog = existsSync(changelogFile) ? readText(changelogFile) : '';
  writeFileSync(join(dir, 'index.html'), renderPage(book, { probes: readProbes(dir), changelog, isCandidate }));
  return { book, written: true };
}

function build(arg) {
  const dir = arg ?? (hasBook(CANDIDATE) ? CANDIDATE : BRAND);
  if (!hasBook(dir)) fail(`No BRAND.md in ${dir}.`);
  const { book, written } = writePage(dir);
  for (const warning of book.warnings) console.log(`warning: ${warning.en}`);
  for (const error of book.errors) console.log(`error: ${error}`);
  if (!written) fail(`Page not written: fix the ${book.errors.length} errors above and build again.`);
  console.log(`page: ${join(dir, 'index.html')}`);
}

function nextVersion() {
  if (!hasBook(BRAND)) return '1.0';
  const major = parseInt(splitFrontMatter(readText(join(BRAND, 'BRAND.md'))).meta.version, 10);
  return `${Number.isFinite(major) ? major + 1 : 1}.0`;
}

function moveOver(from, to) {
  rmSync(to, { recursive: true, force: true });
  if (existsSync(from)) renameSync(from, to);
}

function accept() {
  if (!hasBook(CANDIDATE)) fail(`No candidate to accept in ${CANDIDATE}.`);
  const book = readBook(CANDIDATE);
  const entryFile = join(CANDIDATE, 'CHANGELOG-entry.md');
  const problems = [...book.errors];
  if (!book.meta.owner) problems.push('The book has no owner: ask the person who decides when the brand changes, and write it in the header.');
  if (readProbes(CANDIDATE).length === 0 || unfinishedProbes(CANDIDATE).length > 0) problems.push('The candidate has no finished probes: run brand-probe first.');
  if (!existsSync(entryFile)) problems.push(`Write ${entryFile}: what this version decides, why, and what people using the brand must do.`);
  if (problems.length > 0) fail(`Not accepted:\n${problems.map((p) => `  - ${p}`).join('\n')}`);

  const version = nextVersion();
  const date = today();
  const stamped = readText(join(CANDIDATE, 'BRAND.md'))
    .replace(/^version:.*$/m, `version: ${version}`)
    .replace(/^date:.*$/m, `date: ${date}`);
  writeFileSync(join(BRAND, 'BRAND.md'), stamped);
  moveOver(join(CANDIDATE, 'assets'), join(BRAND, 'assets'));
  moveOver(join(CANDIDATE, 'probes'), join(BRAND, 'probes'));

  const changelogFile = join(BRAND, 'CHANGELOG.md');
  const earlier = existsSync(changelogFile) ? readText(changelogFile).replace(/^# .*\n+/, '') : '';
  writeFileSync(changelogFile, `# Changelog\n\n## ${version} (${date})\n\n${readText(entryFile).trim()}\n\n${earlier}`.trimEnd() + '\n');

  rmSync(CANDIDATE, { recursive: true, force: true });
  const archive = join(WORK, 'archive', version);
  mkdirSync(archive, { recursive: true });
  for (const name of readdirSync(WORK)) {
    if (name !== 'archive') renameSync(join(WORK, name), join(archive, name));
  }
  writePage(BRAND);
  console.log(`accepted: ${version} (${date})\nbook: ${join(BRAND, 'BRAND.md')}\npage: ${join(BRAND, 'index.html')}\nworking files: ${archive}`);
}

function contrastCommand(a, b) {
  const [x, y] = [normalizeHex(a ?? ''), normalizeHex(b ?? '')];
  if (!x || !y) fail('Usage: brand.mjs contrast "#111111" "#ffffff"');
  const ratio = contrast(x, y);
  const verdicts = Object.entries(MINIMUMS).filter(([, min]) => min > 0).map(([use, min]) => `${use}: ${ratio >= min ? 'pass' : 'fail'}`);
  console.log(`${ratio.toFixed(4)}  ${verdicts.join('  ')}`);
}

function glyphsCommand(file, language = 'ru', name = '') {
  if (!file || !existsSync(file)) fail('Usage: brand.mjs glyphs <font file> [language] [brand name]');
  let have;
  try {
    have = fontCodepoints(file);
  } catch (error) {
    fail(`Could not read characters from ${file}: ${error.message}`);
  }
  const missing = requiredCharacters(language, name).filter((c) => !have.has(c.codePointAt(0)));
  console.log(missing.length ? `missing: ${missing.join(' ')}` : `covers: every letter and sign checked for ${language}${name ? ` and ${name}` : ''}`);
}

const major = parseInt(process.versions.node, 10);
if (major < 20) fail(`brandfile needs Node 20 or newer; this is ${process.versions.node}.`);

const [command, ...args] = process.argv.slice(2);
const commands = {
  setup,
  status,
  build: () => build(args[0]),
  accept,
  contrast: () => contrastCommand(args[0], args[1]),
  glyphs: () => glyphsCommand(args[0], args[1], args[2]),
};
if (!commands[command]) fail('Usage: brand.mjs setup | status | build [dir] | accept | contrast <a> <b> | glyphs <font> [language] [name]');
commands[command]();
