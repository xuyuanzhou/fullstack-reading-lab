import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadCurriculum, validateLessons } from './curriculum.mjs';
import { normalizeProgress, writeProgress, readProgress } from '../web/src/state/progressStorage.ts';
import { probeLocalLibrary } from '../web/src/api/localLibrary.ts';

const groups = track => track === 'java' ? ['Java 基础'] : ['全栈主线'];

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
