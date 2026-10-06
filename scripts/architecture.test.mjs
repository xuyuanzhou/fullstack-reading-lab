import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCurriculum, validateLessons, publishedSources } from './curriculum.mjs';
import { mergeForWrite, normalizeProgress, writeProgress, readProgress } from '../web/src/state/progressStorage.ts';
import { probeLocalLibrary } from '../web/src/api/localLibrary.ts';
import { parseReading } from '../web/src/components/parseReading.ts';

const groups = track => track === 'java' ? ['Java 基础'] : ['全栈主线'];

function blank(partial = {}) {
  return normalizeProgress(partial, groups);
}

test('publication export is deterministic and rejects broken or private payloads', () => {
  const data = loadCurriculum();
  assert.equal(JSON.stringify(loadCurriculum()), JSON.stringify(data));
  const lesson = data.lessons[0];
  assert.throws(() => validateLessons([lesson, lesson]), /Duplicate/);
  assert.throws(() => validateLessons([{ ...lesson, group: 'missing' }]), /unknown/);
  assert.throws(() => validateLessons([{ ...lesson, privatePath: '/some/private/file.pdf' }]), /unexpected/);
  assert.throws(() => validateLessons([{ ...lesson, references: [['bad', 'javascript:alert(1)']] }]), /unsafe/);
  assert.throws(() => validateLessons([{ ...lesson, diagram: '../private-data/file.svg' }]), /diagram/);
});

test('corrupt legacy progress is normalized without rendering invalid objects', () => {
  const state = normalizeProgress({ track: 'missing', group: {}, theme: [], notes: { valid: '保留笔记', broken: {} }, done: ['one', 'one', null, 3], audit: { bad: null }, query: {} }, groups);
  assert.equal(state.track, 'frontend');
  assert.equal(state.group, '全栈主线');
  assert.deepEqual(state.done, ['one']);
  assert.deepEqual(state.notes, { valid: '保留笔记' });
  assert.equal(state.query, '');
  assert.deepEqual(state.audit, {});
  assert.equal(normalizeProgress({ track: 'java', group: '' }, groups).group, '');
  assert.equal(state.revision, 0);
});

test('idle tab with the same snapshot does not bump revision', () => {
  const state = blank({ revision: 4, notes: { a: '同一份' } });
  assert.equal(mergeForWrite(state, state, state).revision, 4);
});

test('stale tab cannot wipe notes written by a newer revision', () => {
  const base = blank({ revision: 1, notes: { a: '旧笔记' }, theme: 'dark' });
  const remote = blank({ revision: 2, notes: { a: '新笔记', b: '另一页' }, theme: 'light' });
  const stale = blank({ revision: 1, notes: { a: '旧笔记' }, theme: 'dark' });
  const merged = mergeForWrite(stale, remote, base);
  assert.equal(merged.notes.a, '新笔记');
  assert.equal(merged.notes.b, '另一页');
  assert.equal(merged.revision, 2);
  assert.equal(merged.theme, 'light');
});

test('ocr results are rejected after the viewed page changes', () => {
  const accept = (requestId, currentRequest, view, asked) =>
    requestId === currentRequest && view.id === asked.id && view.page === asked.page;
  assert.equal(accept(1, 1, { id: 'doc', page: 1 }, { id: 'doc', page: 1 }), true);
  assert.equal(accept(1, 2, { id: 'doc', page: 2 }, { id: 'doc', page: 1 }), false);
  assert.equal(accept(3, 3, { id: 'doc', page: 2 }, { id: 'other', page: 2 }), false);
});

test('concurrent note edits on different lessons are preserved', () => {
  const base = blank({ revision: 3, notes: {} });
  const remote = blank({ revision: 4, notes: { lessonA: 'A 页写的' } });
  const local = blank({ revision: 3, notes: { lessonB: 'B 页写的' } });
  const merged = mergeForWrite(local, remote, base);
  assert.equal(merged.notes.lessonA, 'A 页写的');
  assert.equal(merged.notes.lessonB, 'B 页写的');
  assert.equal(merged.revision, 5);
});

test('storage failures remain recoverable and corrupted JSON retains a backup', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const data = new Map([['progress', '{broken']]);
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) } });
    assert.ok(readProgress('progress', groups).issue);
    assert.equal(data.get('progress.recovery'), '{broken');
    globalThis.localStorage.setItem = () => { throw new Error('Quota exceeded') };
    assert.doesNotThrow(() => readProgress('progress', groups));
    assert.match(readProgress('progress', groups).issue, /格式异常|无法保存/);
    globalThis.localStorage.setItem = () => { throw new Error('Quota exceeded') };
    assert.match(writeProgress('progress', normalizeProgress({}, groups)), /未能保存/);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  }
});

test('public host never probes private API and HTML fallback is not a healthy reader', async () => {
  const originalWindow = globalThis.window;
  const originalFetch = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.window = { location: { hostname: 'xuyuanzhou.github.io' } };
    globalThis.fetch = async () => { calls++; return new Response('<html/>', { headers: { 'content-type': 'text/html' } }) };
    assert.equal(await probeLocalLibrary(), false);
    assert.equal(calls, 0);
    window.location.hostname = 'localhost';
    assert.equal(await probeLocalLibrary(), false);
    globalThis.fetch = async () => Response.json({ count: 3210, imported: 3210 });
    assert.equal(await probeLocalLibrary(), true);
  } finally { globalThis.window = originalWindow; globalThis.fetch = originalFetch; }
});

test('markdown image paths with a bare percent stay readable', () => {
  const blocks = parseReading('AI-demo/note.md', '正文\n![x](images/100%.png)\n还在');
  assert.equal(blocks.some((block) => block.kind === 'text' && block.text === '正文'), true);
  assert.equal(blocks.some((block) => block.kind === 'text' && block.text === '还在'), true);
  const image = blocks.find((block) => block.kind === 'image' || (block.kind === 'text' && String(block.text).includes('图片未显示')));
  assert.ok(image);
});

test('readme publication scope matches publishedSources including 07 files', () => {
  const readme = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'README.md'), 'utf8');
  assert.equal(publishedSources.includes('coverage-frontend-07.js'), true);
  assert.equal(publishedSources.includes('coverage-java-07.js'), true);
  assert.equal(readme.includes('未接入的 `curriculum/coverage-*-07.js`'), false);
  assert.match(readme, /publishedSources/);
  const data = loadCurriculum();
  const cache = data.lessons.find((lesson) => lesson.id === 'cache');
  const review = data.lessons.find((lesson) => lesson.id === 'design-review');
  assert.ok(cache.references.length >= 1);
  assert.equal(review.references.length, 0);
  assert.match(readme, /design-review/);
});
