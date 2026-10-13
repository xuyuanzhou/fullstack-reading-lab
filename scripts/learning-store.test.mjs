import assert from 'node:assert/strict'
import test from 'node:test'
import { sideQuests } from '../web/src/data/questBoard.ts'
import { createLearningStore } from '../web/src/state/learningStore.ts'
import { normalizeProgress } from '../web/src/state/progressStorage.ts'

const groups = () => ['全栈主线']

function bank(seed) {
  let current = normalizeProgress(seed, groups)
  return {
    read() {
      return { state: structuredClone(current), issue: '' }
    },
    write(_key, state) {
      current = structuredClone(state)
      return ''
    },
    get() {
      return current
    },
    set(state) {
      current = state
    },
  }
}

function openStore(seed = {}, extra = {}) {
  const memory = bank(seed)
  const store = createLearningStore({
    groups,
    read: memory.read,
    write: extra.write ?? memory.write,
    readDraft: () => null,
    probe: extra.probe ?? (async () => false),
    persist: 'manual',
  })
  return { store, memory }
}

test('user slice writes notes and theme, and ignores a repeated recent id', () => {
  const { store } = openStore({ revision: 1 })
  store.getState().setNote('lesson-a', '按钮只管这一次')
  store.getState().setTheme('dark')
  store.getState().remember('lesson-a')
  store.getState().remember('lesson-a')
  store.getState().setLocalTopic('网络')
  store.getState().setLocalCategory('ai')
  const state = store.getState()
  assert.equal(state.notes['lesson-a'], '按钮只管这一次')
  assert.equal(state.theme, 'dark')
  assert.deepEqual(state.recent, ['lesson-a'])
  assert.equal(state.localCategory, 'ai')
  assert.equal(state.localTopic, '')
  const track = state.track
  const group = state.group
  state.selectLesson(track, group)
  assert.equal(store.getState().track, track)
  assert.equal(store.getState().group, group)
})

test('business slice toggles completion and refuses an empty quest mark', () => {
  const { store } = openStore()
  const id = sideQuests()[0].id
  store.getState().toggleDone('lesson-a')
  store.getState().toggleDone('lesson-a')
  assert.deepEqual(store.getState().done, [])
  const before = store.getState().learning
  const empty = store.getState().applyQuest({ type: 'advance', id, mark: '   ' })
  assert.equal(empty.ok, false)
  assert.equal(empty.granted.length, 0)
  assert.equal(store.getState().learning, before)
})

test('a quest advance is stored, and a newer record blocks the write', () => {
  const { store } = openStore()
  const id = sideQuests()[0].id
  const saved = store.getState().applyQuest({ type: 'advance', id, mark: '按钮和契约已经分开' })
  assert.equal(saved.ok, true)
  assert.equal(store.getState().learning.quests.some((row) => row.id === id && row.step > 0), true)
  store.setState({ learningReadonly: true })
  const blocked = store.getState().applyQuest({ type: 'advance', id, mark: '再写一句' })
  assert.equal(blocked.ok, false)
  assert.equal(blocked.issue.includes('不能改写'), true)
  assert.equal(store.getState().learning.quests.filter((row) => row.id === id).length, 1)
})

test('a later local probe wins, and a thrown probe is not ready', async () => {
  let openFirst
  let openSecond
  const { store } = openStore({}, {
    probe() {
      return new Promise((resolve) => {
        if (!openFirst) openFirst = resolve
        else openSecond = resolve
      })
    },
  })
  const first = store.getState().reconnectLocal()
  const second = store.getState().reconnectLocal()
  openFirst(true)
  openSecond(false)
  assert.equal(await first, true)
  assert.equal(await second, false)
  assert.equal(store.getState().localReady, false)

  const failed = openStore({}, {
    probe: async () => { throw new Error('down') },
  })
  assert.equal(await failed.store.getState().reconnectLocal(), false)
  assert.equal(failed.store.getState().localReady, false)
})

test('persist merges a newer tab and keeps this tab\'s new note', () => {
  const { store, memory } = openStore({ revision: 1, notes: { 'lesson-a': '旧笔记' } })
  store.getState().setNote('lesson-a', '这一页改过')
  store.getState().flushPersist()
  assert.equal(memory.get().notes['lesson-a'], '这一页改过')
  assert.equal(memory.get().revision > 1, true)

  const remote = {
    ...memory.get(),
    revision: memory.get().revision + 3,
    notes: { ...memory.get().notes, 'lesson-b': '另一页写下的' },
  }
  memory.set(remote)
  store.getState().setNote('lesson-c', '这一页后写的')
  store.getState().flushPersist()
  const saved = memory.get()
  assert.equal(saved.notes['lesson-a'], '这一页改过')
  assert.equal(saved.notes['lesson-b'], '另一页写下的')
  assert.equal(saved.notes['lesson-c'], '这一页后写的')
  assert.equal(saved.revision > remote.revision, true)
})

test('a failed write is reported, and a bad record still opens', () => {
  const { store } = openStore({ revision: 1 }, {
    write: () => '记录未能保存到浏览器，请先复制重要笔记。当前页面仍可使用。',
  })
  store.getState().setNote('lesson-a', '还在页面上')
  store.getState().flushPersist()
  assert.equal(store.getState().storageIssue, '记录未能保存到浏览器，请先复制重要笔记。当前页面仍可使用。')
  assert.equal(store.getState().notes['lesson-a'], '还在页面上')

  const broken = createLearningStore({
    groups,
    read: () => ({
      state: normalizeProgress({}, groups),
      issue: '学习记录格式异常，已保留原始副本并恢复可用界面。',
    }),
    write: () => '',
    readDraft: () => null,
    probe: async () => false,
    persist: 'manual',
  })
  assert.equal(broken.getState().storageIssue, '学习记录格式异常，已保留原始副本并恢复可用界面。')
  assert.equal(Array.isArray(broken.getState().done), true)
})
