// Checks what a script can check about the skills: the frontmatter an agent uses
// to find them, links that resolve, and commands brand.mjs accepts. It proves
// shape, not that a skill makes an agent work better.
// Run with: node --test test/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = join(ROOT, 'skills');
const SCRIPT = join(SKILLS, 'brandfile', 'scripts', 'brand.mjs');
const skills = readdirSync(SKILLS).filter((d) => existsSync(join(SKILLS, d, 'SKILL.md')));

const filesUnder = (dir) =>
  readdirSync(dir, { recursive: true })
    .filter((f) => !f.split(/[\\/]/).some((part) => part === '.git' || part === 'node_modules'))
    .map((f) => join(dir, f))
    .filter((f) => statSync(f).isFile());

const markdown = (dir) => filesUnder(dir).filter((f) => f.endsWith('.md'));
const prose = (text) => text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');

// Targets of relative Markdown links, without fragments, resolved from the file.
function linkTargets(file) {
  return [...prose(readFileSync(file, 'utf8')).matchAll(/\]\(([^)\s]+)\)/g)]
    .map((m) => m[1])
    .filter((href) => !/^[a-z][a-z+.-]*:/i.test(href) && !href.startsWith('#'))
    .map((href) => ({ href, path: join(dirname(file), decodeURI(href.split('#')[0])) }));
}

function frontMatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!m) return null;
  return Object.fromEntries(
    m[1].split('\n').map((line) => {
      const i = line.indexOf(':');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')];
    }),
  );
}

test('every skill has frontmatter an agent can find it by', () => {
  // Limits from the Agent Skills specification; the key set from docs/skill-authoring.md.
  const allowed = new Set(['name', 'description', 'disable-model-invocation']);
  const problems = [];
  for (const dir of skills) {
    const fm = frontMatter(readFileSync(join(SKILLS, dir, 'SKILL.md'), 'utf8'));
    if (!fm) {
      problems.push(`${dir}: no frontmatter`);
      continue;
    }
    for (const key of Object.keys(fm)) if (!allowed.has(key)) problems.push(`${dir}: unexpected key ${key}`);
    if (fm.name !== dir) problems.push(`${dir}: name is ${fm.name}, not the directory name`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(dir) || dir.length > 64) problems.push(`${dir}: not a valid skill name`);
    const description = fm.description ?? '';
    if (!/^[^.]+\. Use when \S/.test(description)) problems.push(`${dir}: description is not "<leading word>. Use when ..."`);
    if (description.length > 1024) problems.push(`${dir}: description over 1024 characters`);
  }
  assert.deepEqual(problems, []);
});

test('every skill body stays within the word ceiling', () => {
  // The ceiling from docs/skill-authoring.md, so growth past it is a decision rather than sediment.
  const long = skills
    .map((dir) => {
      const body = readFileSync(join(SKILLS, dir, 'SKILL.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
      return [dir, body.split(/\s+/).filter(Boolean).length];
    })
    .filter(([, words]) => words > 750)
    .map(([dir, words]) => `${dir}: ${words} words`);
  assert.deepEqual(long, []);
});

test('every relative link in the repository resolves', () => {
  const broken = markdown(ROOT).flatMap((file) =>
    linkTargets(file)
      .filter(({ path }) => !existsSync(path))
      .map(({ href }) => `${relative(ROOT, file)} -> ${href}`),
  );
  assert.deepEqual(broken, []);
});

test('every reference and asset of a skill is linked from that skill', () => {
  const unlinked = [];
  for (const dir of skills) {
    const linked = new Set(markdown(join(SKILLS, dir)).flatMap((file) => linkTargets(file).map(({ path }) => path)));
    for (const part of ['references', 'assets']) {
      const folder = join(SKILLS, dir, part);
      if (!existsSync(folder)) continue;
      for (const file of filesUnder(folder)) if (!linked.has(file)) unlinked.push(relative(ROOT, file));
    }
  }
  assert.deepEqual(unlinked, []);
});

test('every brand.mjs command the skills name is one it accepts', () => {
  const named = new Set(
    markdown(SKILLS).flatMap((file) => [...readFileSync(file, 'utf8').matchAll(/brand\.mjs ([a-z]+)/g)].map((m) => m[1])),
  );
  assert.ok(named.size > 0);
  const rejected = [];
  for (const command of named) {
    const project = mkdtempSync(join(tmpdir(), 'brandfile-skills-'));
    try {
      const r = spawnSync(process.execPath, [SCRIPT, command], { cwd: project, encoding: 'utf8' });
      if (/Usage: brand\.mjs setup \|/.test(r.stdout + r.stderr)) rejected.push(command);
    } finally {
      rmSync(project, { recursive: true, force: true });
    }
  }
  assert.deepEqual(rejected, []);
});
