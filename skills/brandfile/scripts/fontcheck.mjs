// Reads which characters a font file covers, using only Node built-ins.
// Handles TTF, OTF, TTC, WOFF and WOFF2. It answers "is the glyph mapped",
// never "is the glyph any good": drawing quality stays with a person.

import { readFileSync } from 'node:fs';
import { brotliDecompressSync, inflateSync } from 'node:zlib';

const tag = (buf, at) => buf.toString('latin1', at, at + 4);

function cmapFromSfnt(buf, start = 0) {
  if (tag(buf, start) === 'ttcf') return cmapFromSfnt(buf, buf.readUInt32BE(start + 12));
  const count = buf.readUInt16BE(start + 4);
  for (let i = 0; i < count; i++) {
    const entry = start + 12 + i * 16;
    if (tag(buf, entry) === 'cmap') {
      const offset = buf.readUInt32BE(entry + 8);
      return buf.subarray(offset, offset + buf.readUInt32BE(entry + 12));
    }
  }
  return null;
}

function cmapFromWoff(buf) {
  const count = buf.readUInt16BE(12);
  for (let i = 0; i < count; i++) {
    const entry = 44 + i * 20;
    if (tag(buf, entry) !== 'cmap') continue;
    const offset = buf.readUInt32BE(entry + 4);
    const compressed = buf.readUInt32BE(entry + 8);
    const original = buf.readUInt32BE(entry + 12);
    const data = buf.subarray(offset, offset + compressed);
    return compressed < original ? inflateSync(data) : data;
  }
  return null;
}

function readBase128(buf, at) {
  let value = 0;
  for (let i = 0; i < 5; i++) {
    const byte = buf[at + i];
    value = value * 128 + (byte & 0x7f);
    if (!(byte & 0x80)) return [value, at + i + 1];
  }
  throw new Error('bad UIntBase128');
}

function cmapFromWoff2(buf) {
  const count = buf.readUInt16BE(12);
  const compressedSize = buf.readUInt32BE(20);
  let at = 48;
  let target = null;
  let streamAt = 0;
  for (let i = 0; i < count; i++) {
    const flags = buf[at++];
    const known = flags & 0x3f;
    const version = flags >> 6;
    let name = known === 0 ? 'cmap' : null;
    if (known === 63) {
      name = tag(buf, at);
      at += 4;
    }
    let length;
    [length, at] = readBase128(buf, at);
    // glyf and loca (10, 11) are transformed unless version 3; others unless version 0.
    const transformed = known === 10 || known === 11 ? version !== 3 : version !== 0;
    if (transformed) [length, at] = readBase128(buf, at);
    if (name === 'cmap') target = [streamAt, length];
    streamAt += length;
  }
  if (!target) return null;
  if (tag(buf, 4) === 'ttcf') throw new Error('WOFF2 collections are not supported');
  const stream = brotliDecompressSync(buf.subarray(at, at + compressedSize));
  return stream.subarray(target[0], target[0] + target[1]);
}

function addFormat4(cmap, at, out) {
  const segX2 = cmap.readUInt16BE(at + 6);
  const ends = at + 14;
  const starts = ends + segX2 + 2;
  const deltas = starts + segX2;
  const ranges = deltas + segX2;
  for (let i = 0; i < segX2; i += 2) {
    const end = cmap.readUInt16BE(ends + i);
    const begin = cmap.readUInt16BE(starts + i);
    const delta = cmap.readUInt16BE(deltas + i);
    const range = cmap.readUInt16BE(ranges + i);
    for (let cp = begin; cp <= end && cp !== 0xffff; cp++) {
      let glyph;
      if (range === 0) glyph = (cp + delta) & 0xffff;
      else {
        const slot = ranges + i + range + (cp - begin) * 2;
        if (slot + 2 > cmap.length) continue;
        glyph = cmap.readUInt16BE(slot);
        if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
      }
      if (glyph !== 0) out.add(cp);
    }
  }
}

function addFormat12(cmap, at, out) {
  const groups = cmap.readUInt32BE(at + 12);
  for (let i = 0; i < groups; i++) {
    const group = at + 16 + i * 12;
    const begin = cmap.readUInt32BE(group);
    const end = cmap.readUInt32BE(group + 4);
    const glyph = cmap.readUInt32BE(group + 8);
    for (let cp = begin; cp <= end; cp++) if (glyph + (cp - begin) !== 0) out.add(cp);
  }
}

/** Returns the set of code points a font file maps to a real glyph. */
export function fontCodepoints(file) {
  const buf = readFileSync(file);
  const signature = tag(buf, 0);
  const cmap =
    signature === 'wOFF' ? cmapFromWoff(buf)
    : signature === 'wOF2' ? cmapFromWoff2(buf)
    : cmapFromSfnt(buf);
  if (!cmap) throw new Error('no cmap table');
  const out = new Set();
  const records = cmap.readUInt16BE(2);
  for (let i = 0; i < records; i++) {
    const record = 4 + i * 8;
    const platform = cmap.readUInt16BE(record);
    const encoding = cmap.readUInt16BE(record + 2);
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    if (!unicode) continue;
    const at = cmap.readUInt32BE(record + 4);
    const format = cmap.readUInt16BE(at);
    if (format === 4) addFormat4(cmap, at, out);
    else if (format === 12) addFormat12(cmap, at, out);
  }
  return out;
}

const RU_LETTERS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const RU_SIGNS = '«»—№₽';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Characters a font must cover for this brand. Only Russian has its own set so far,
 * because that is the language the first users write in. Other languages get Latin
 * and the name; the page still shows a specimen for a person to look at.
 */
export function requiredCharacters(language, name = '') {
  const lang = String(language).toLowerCase().split(/[-_]/)[0];
  const base = lang === 'ru' ? RU_LETTERS + RU_SIGNS : LATIN;
  return [...new Set([...base, ...name.replace(/\s/g, '')])];
}
