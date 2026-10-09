import type { LocalCategory, ProgressState, Track } from '../types/curriculum'

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const text = (value: unknown) => typeof value === 'string' ? value : ''
const strings = (value: unknown) => Array.isArray(value)
  ? [...new Set(value.filter((item): item is string => typeof item === 'string' && !!item))]
  : []
const revisionOf = (value: unknown) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0
  return Math.floor(value)
}

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
  const aiNotes = object(saved.aiNotes)
    ? Object.fromEntries(Object.entries(saved.aiNotes).filter(([, note]) => typeof note === 'string')) as Record<string, string>
    : {}
  const aiDrillScores = object(saved.aiDrillScores)
    ? Object.fromEntries(
        Object.entries(saved.aiDrillScores).filter(
          ([, score]) => typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 4,
        ),
      ) as Record<string, number>
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
    aiDone: strings(saved.aiDone),
    aiReview: strings(saved.aiReview),
    aiRecent: strings(saved.aiRecent).slice(0, 12),
    aiNotes,
    aiQuery: text(saved.aiQuery),
    aiSkippedPrereq: strings(saved.aiSkippedPrereq),
    aiDrillScores,
    pathChecks: strings(saved.pathChecks),
    revision: revisionOf(saved.revision),
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

function listChanged(local: string[], base: string[]) {
  if (local.length !== base.length) return true
  const prior = new Set(base)
  return local.some((id) => !prior.has(id)) || base.some((id) => !local.includes(id))
}

export function sameProgress(a: ProgressState, b: ProgressState) {
  const { revision: _a, ...left } = a
  const { revision: _b, ...right } = b
  return JSON.stringify(left) === JSON.stringify(right)
}

/** Apply only the local edits that differ from the snapshot this tab last synced. */
export function mergeForWrite(local: ProgressState, remote: ProgressState, base: ProgressState): ProgressState {
  if (remote.revision <= local.revision) {
    if (sameProgress(local, remote)) return remote
    return { ...local, revision: Math.max(local.revision, remote.revision) + 1 }
  }
  const notes = { ...remote.notes }
  let touched = false
  for (const [id, note] of Object.entries(local.notes)) {
    if (note !== (base.notes[id] ?? '')) {
      notes[id] = note
      touched = true
    }
  }
  for (const id of Object.keys(base.notes)) {
    if (!(id in local.notes) && (base.notes[id] ?? '') !== '') {
      delete notes[id]
      touched = true
    }
  }
  const aiNotes = { ...remote.aiNotes }
  for (const [id, note] of Object.entries(local.aiNotes)) {
    if (note !== (base.aiNotes[id] ?? '')) {
      aiNotes[id] = note
      touched = true
    }
  }
  for (const id of Object.keys(base.aiNotes)) {
    if (!(id in local.aiNotes) && (base.aiNotes[id] ?? '') !== '') {
      delete aiNotes[id]
      touched = true
    }
  }
  const aiDrillScores = { ...remote.aiDrillScores }
  for (const [id, score] of Object.entries(local.aiDrillScores)) {
    if (score !== base.aiDrillScores[id]) {
      aiDrillScores[id] = score
      touched = true
    }
  }
  for (const id of Object.keys(base.aiDrillScores)) {
    if (!(id in local.aiDrillScores) && base.aiDrillScores[id] != null) {
      delete aiDrillScores[id]
      touched = true
    }
  }
  const audit = { ...remote.audit }
  for (const [id, item] of Object.entries(local.audit)) {
    const prior = base.audit[id]
    if (!prior || prior.note !== item.note || prior.status !== item.status) {
      audit[id] = item
      touched = true
    }
  }
  const done = listChanged(local.done, base.done)
    ? [...new Set([...remote.done, ...local.done])]
    : remote.done
  const review = listChanged(local.review, base.review)
    ? [...new Set([...remote.review, ...local.review])]
    : remote.review
  const aiDone = listChanged(local.aiDone, base.aiDone)
    ? [...new Set([...remote.aiDone, ...local.aiDone])]
    : remote.aiDone
  const aiReview = listChanged(local.aiReview, base.aiReview)
    ? [...new Set([...remote.aiReview, ...local.aiReview])]
    : remote.aiReview
  const aiSkippedPrereq = listChanged(local.aiSkippedPrereq, base.aiSkippedPrereq)
    ? [...new Set([...remote.aiSkippedPrereq, ...local.aiSkippedPrereq])]
    : remote.aiSkippedPrereq
  const pathChecks = listChanged(local.pathChecks, base.pathChecks)
    ? [...new Set([...remote.pathChecks, ...local.pathChecks])]
    : remote.pathChecks
  if (
    listChanged(local.done, base.done) ||
    listChanged(local.review, base.review) ||
    listChanged(local.aiDone, base.aiDone) ||
    listChanged(local.aiReview, base.aiReview) ||
    listChanged(local.aiSkippedPrereq, base.aiSkippedPrereq) ||
    listChanged(local.pathChecks, base.pathChecks)
  ) {
    touched = true
  }
  const next: ProgressState = {
    ...remote,
    notes,
    aiNotes,
    aiDrillScores,
    audit,
    done,
    review,
    aiDone,
    aiReview,
    aiSkippedPrereq,
    pathChecks,
    revision: remote.revision + (touched ? 1 : 0),
  }
  // Prefer this tab's UI prefs only when it actually changed them since last sync.
  if (local.track !== base.track) next.track = local.track
  if (local.group !== base.group) next.group = local.group
  if (local.theme !== base.theme) next.theme = local.theme
  if (local.query !== base.query) next.query = local.query
  if (local.aiQuery !== base.aiQuery) next.aiQuery = local.aiQuery
  if (local.localQuery !== base.localQuery) next.localQuery = local.localQuery
  if (local.localTopic !== base.localTopic) next.localTopic = local.localTopic
  if (local.localCategory !== base.localCategory) next.localCategory = local.localCategory
  if (JSON.stringify(local.recent) !== JSON.stringify(base.recent)) next.recent = local.recent
  if (JSON.stringify(local.aiRecent) !== JSON.stringify(base.aiRecent)) next.aiRecent = local.aiRecent
  return next
}

export function writeProgress(key: string, state: ProgressState): string {
  try {
    localStorage.setItem(key, JSON.stringify({ version: 1, ...state }))
    return ''
  } catch {
    return '记录未能保存到浏览器，请先复制重要笔记。当前页面仍可使用。'
  }
}
