import type { LocalCategory, ProgressState, Track } from '../types/curriculum'

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const text = (value: unknown) => typeof value === 'string' ? value : ''
const strings = (value: unknown) => Array.isArray(value)
  ? [...new Set(value.filter((item): item is string => typeof item === 'string' && !!item))]
  : []

export type ProgressGroups = (track: Track) => string[]

function resolveGroup(track: Track, saved: unknown, groups: ProgressGroups) {
  const allowed = groups(track)
  if (typeof saved !== 'string') return allowed[0] || ''
  if (!saved || allowed.includes(saved)) return saved
  return allowed[0] || ''
}

// Data read from storage is untrusted; TS casts cannot validate old or corrupt records.
export function normalizeProgress(value: unknown, groups: ProgressGroups): ProgressState {
  const saved = object(value) ? value : {}
  const track: Track = saved.track === 'java' ? 'java' : 'frontend'
  const localCategory: LocalCategory = saved.localCategory === 'ai' || saved.localCategory === 'java' || saved.localCategory === 'frontend'
    ? saved.localCategory
    : track
  const notes = object(saved.notes)
    ? Object.fromEntries(Object.entries(saved.notes).filter(([, note]) => typeof note === 'string')) as Record<string, string>
    : {}
  const audit = object(saved.audit)
    ? Object.fromEntries(Object.entries(saved.audit).filter(([, item]) => object(item) && typeof item.note === 'string' && typeof item.status === 'string')) as ProgressState['audit']
    : {}
  return {
    track, group: resolveGroup(track, saved.group, groups), notes, audit,
    done: strings(saved.done), review: strings(saved.review), recent: strings(saved.recent).slice(0, 12),
    theme: saved.theme === 'dark' ? 'dark' : 'light',
    query: text(saved.query), localQuery: text(saved.localQuery), localTopic: text(saved.localTopic),
    localCategory,
  }
}

export function readProgress(key: string, groups: ProgressGroups) {
  try {
    const raw = localStorage.getItem(key)
    try {
      return { state: normalizeProgress(raw ? JSON.parse(raw) : {}, groups), issue: '' }
    } catch {
      // A quota or privacy error while copying the raw record must not blank the page.
      try { if (raw) localStorage.setItem(`${key}.recovery`, raw) } catch { /* keep reading */ }
      return { state: normalizeProgress({}, groups), issue: '学习记录格式异常，已保留原始副本并恢复可用界面。' }
    }
  } catch {
    return { state: normalizeProgress({}, groups), issue: '浏览器暂时无法保存记录；本次仍可继续阅读。' }
  }
}

export function writeProgress(key: string, state: ProgressState): string {
  try {
    localStorage.setItem(key, JSON.stringify({ version: 1, ...state }))
    return ''
  } catch {
    return '记录未能保存到浏览器，请先复制重要笔记。当前页面仍可使用。'
  }
}
