import { createStore, type StoreApi } from 'zustand/vanilla'
import { STORAGE_KEY } from '../data/meta.ts'
import type { LearningState } from './learningState.ts'
import { adoptLearningDraft, readProgress, writeProgress, type ProgressGroups } from './progressStorage.ts'
import { attachRevisionPersist } from './revisionPersist.ts'
import { businessActions } from './slices/businessSlice.ts'
import { globalActions } from './slices/globalSlice.ts'
import { userActions } from './slices/userSlice.ts'
import type { ProgressState, Track } from '../types/curriculum.ts'

const DRAFT_KEY = 'fs-learning-v2'

export type LearningStore = StoreApi<LearningState>

export type LearningStoreOptions = {
  storageKey?: string
  groups?: ProgressGroups
  read?: typeof readProgress
  write?: typeof writeProgress
  readDraft?: () => string | null
  probe?: () => Promise<boolean>
  routeGroup?: (track: Track, group: string) => string
  firstGroup?: (track: Track) => string
  /** auto：变更后合并写回。manual：只在 flushPersist 时写，测试用。 */
  persist?: 'auto' | 'manual'
  delay?: number
}

function defaultReadDraft() {
  try {
    return localStorage.getItem(DRAFT_KEY)
  } catch {
    return null
  }
}

export function createLearningStore(options: LearningStoreOptions = {}): LearningStore {
  const key = options.storageKey ?? STORAGE_KEY
  const groups = options.groups ?? (() => [])
  const read = options.read ?? readProgress
  const write = options.write ?? writeProgress
  const readDraft = options.readDraft ?? defaultReadDraft
  const probe = options.probe ?? (async () => false)
  const routeGroup = options.routeGroup ?? ((_track, group: string) => group)
  const firstGroup = options.firstGroup ?? (() => '')
  const loaded = read(key, groups)
  const routed = { ...loaded.state, group: routeGroup(loaded.state.track, loaded.state.group) }
  const progress: ProgressState = adoptLearningDraft(routed, readDraft())

  const store = createStore<LearningState>()((set, get) => ({
    ...progress,
    storageIssue: loaded.issue,
    localReady: null,
    probeSeq: 0,
    flushPersist: () => {},
    startShell: () => () => {},
    ...userActions(set, firstGroup),
    ...businessActions(set, get),
    ...globalActions(set, get, probe),
  }))

  const persist = attachRevisionPersist(store, {
    key,
    groups,
    read,
    write,
    routeGroup,
    delay: options.delay ?? 350,
    mode: options.persist ?? 'auto',
  })

  let shellStop: (() => void) | null = null
  store.setState({
    flushPersist: persist.flush,
    startShell: () => {
      if (shellStop) return shellStop
      const stopListen = persist.listen()
      const applyTheme = () => {
        if (typeof document === 'undefined') return
        document.documentElement.dataset.theme = store.getState().theme
      }
      applyTheme()
      const unsubTheme = store.subscribe((state, prev) => {
        if (state.theme !== prev.theme) applyTheme()
      })
      void store.getState().reconnectLocal()
      shellStop = () => {
        shellStop = null
        stopListen()
        unsubTheme()
      }
      return shellStop
    },
  })

  return store
}
