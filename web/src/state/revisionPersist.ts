import type { StoreApi } from 'zustand/vanilla'
import type { LearningState } from './learningState.ts'
import { progressSnapshot } from './progressSnapshot.ts'
import { mergeForWrite, normalizeProgress, sameProgress, type ProgressGroups } from './progressStorage.ts'
import type { ProgressState, Track } from '../types/curriculum.ts'

type Read = (key: string, groups: ProgressGroups) => { state: ProgressState; issue: string }
type Write = (key: string, state: ProgressState) => string

/**
 * 写回前先和另一页已经落盘的记录合并。
 * 不用 Zustand 自带的 persist：那个中间件会整份替换本地记录，绕过 revision。
 */
export function attachRevisionPersist(
  store: StoreApi<LearningState>,
  options: {
    key: string
    groups: ProgressGroups
    read: Read
    write: Write
    routeGroup: (track: Track, group: string) => string
    delay: number
    mode: 'auto' | 'manual'
  },
) {
  let synced = progressSnapshot(store.getState())
  let skip = false
  let timer = 0

  const flush = () => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    const local = progressSnapshot(store.getState())
    const remote = options.read(options.key, options.groups).state
    const next = mergeForWrite(local, remote, synced)
    if (sameProgress(next, remote) && next.revision === remote.revision) {
      synced = remote
      return
    }
    const issue = options.write(options.key, next)
    synced = next
    skip = true
    store.setState({ ...next, storageIssue: issue })
  }

  const schedule = () => {
    if (options.mode !== 'auto') return
    if (timer) clearTimeout(timer)
    timer = window.setTimeout(flush, options.delay)
  }

  store.subscribe((state, prev) => {
    if (skip) {
      skip = false
      return
    }
    if (sameProgress(progressSnapshot(state), progressSnapshot(prev))) return
    schedule()
  })

  const adoptRemote = (remote: ProgressState) => {
    const routed = { ...remote, group: options.routeGroup(remote.track, remote.group) }
    synced = routed
    skip = true
    store.setState(routed)
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key !== options.key || event.newValue == null) return
    try {
      const remote = normalizeProgress(JSON.parse(event.newValue), options.groups)
      if (remote.revision <= store.getState().revision) return
      adoptRemote(remote)
    } catch {
      /* 另一页的坏记录不覆盖当前页 */
    }
  }

  const onHide = () => flush()

  return {
    flush,
    listen() {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('storage', onStorage)
      window.addEventListener('pagehide', onHide)
      return () => {
        window.removeEventListener('storage', onStorage)
        window.removeEventListener('pagehide', onHide)
        flush()
      }
    },
  }
}
