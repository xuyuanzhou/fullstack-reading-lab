import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { groupsFor } from '@/data/curriculum'
import { STORAGE_KEY } from '@/data/meta'
import type { ProgressState, Track } from '@/types/curriculum'

const defaults: ProgressState = {
  track: 'frontend',
  group: '语言基础',
  done: [],
  review: [],
  recent: [],
  notes: {},
  theme: 'light',
  query: '',
  audit: {},
  localQuery: '',
  localTopic: '',
}

function load(): ProgressState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<ProgressState>
    const next = { ...defaults, ...saved }
    for (const key of ['done', 'review', 'recent'] as const) {
      if (!Array.isArray(next[key])) next[key] = []
    }
    if (!next.notes || typeof next.notes !== 'object') next.notes = {}
    if (!next.audit || typeof next.audit !== 'object') next.audit = {}
    if (!groupsFor(next.track).includes(next.group)) {
      next.group = groupsFor(next.track)[0] || ''
    }
    return next
  } catch {
    return { ...defaults }
  }
}

type ProgressApi = ProgressState & {
  setTrack: (track: Track) => void
  setGroup: (group: string) => void
  toggleDone: (id: string) => void
  toggleReview: (id: string) => void
  remember: (id: string) => void
  setNote: (id: string, note: string) => void
  setQuery: (query: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocalQuery: (query: string) => void
  setLocalTopic: (topic: string) => void
  saveAudit: (key: string, note: string) => void
}

const ProgressContext = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme
  }, [state.theme])

  const setTrack = useCallback((track: Track) => {
    setState((prev) => ({
      ...prev,
      track,
      group: groupsFor(track)[0] || '',
      localTopic: '',
    }))
  }, [])

  const setGroup = useCallback((group: string) => {
    setState((prev) => ({ ...prev, group }))
  }, [])

  const toggleList = useCallback((key: 'done' | 'review', id: string) => {
    setState((prev) => {
      const list = prev[key]
      return {
        ...prev,
        [key]: list.includes(id) ? list.filter((item) => item !== id) : [id, ...list],
      }
    })
  }, [])

  const remember = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      recent: [id, ...prev.recent.filter((item) => item !== id)].slice(0, 12),
    }))
  }, [])

  const value = useMemo<ProgressApi>(
    () => ({
      ...state,
      setTrack,
      setGroup,
      toggleDone: (id) => toggleList('done', id),
      toggleReview: (id) => toggleList('review', id),
      remember,
      setNote: (id, note) =>
        setState((prev) => ({ ...prev, notes: { ...prev.notes, [id]: note } })),
      setQuery: (query) => setState((prev) => ({ ...prev, query })),
      setTheme: (theme) => setState((prev) => ({ ...prev, theme })),
      setLocalQuery: (localQuery) => setState((prev) => ({ ...prev, localQuery })),
      setLocalTopic: (localTopic) => setState((prev) => ({ ...prev, localTopic })),
      saveAudit: (key, note) =>
        setState((prev) => ({
          ...prev,
          audit: { ...prev.audit, [key]: { note, status: '待核验' } },
        })),
    }),
    [state, setTrack, setGroup, toggleList, remember],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const value = useContext(ProgressContext)
  if (!value) throw new Error('useProgress must be used inside ProgressProvider')
  return value
}
