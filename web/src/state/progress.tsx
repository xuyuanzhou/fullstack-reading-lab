import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { courseGroups, groupKeyForLabel } from '@/data/routes'
import { STORAGE_KEY } from '@/data/meta'
import type { ProgressState, Track } from '@/types/curriculum'
import { mergeForWrite, normalizeProgress, readProgress, sameProgress, writeProgress, type ProgressGroups } from './progressStorage'

type ProgressApi = ProgressState & {
  storageIssue: string
  selectLesson: (track: Track, group: string) => void
  setTrack: (track: Track) => void
  setGroup: (group: string) => void
  toggleDone: (id: string) => void
  toggleReview: (id: string) => void
  remember: (id: string) => void
  setNote: (id: string, note: string) => void
  setQuery: (query: string) => void
  toggleAiDone: (id: string) => void
  toggleAiReview: (id: string) => void
  rememberAi: (id: string) => void
  setAiNote: (id: string, note: string) => void
  setAiQuery: (query: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocalQuery: (query: string) => void
  setLocalTopic: (topic: string) => void
  setLocalCategory: (category: ProgressState['localCategory']) => void
  saveAudit: (key: string, note: string) => void
}

const ProgressContext = createContext<ProgressApi | null>(null)

const storageGroups: ProgressGroups = (track) =>
  courseGroups(track).flatMap((group) => [group.key, group.label])

function routeGroup(track: Track, group: string) {
  if (!group) return ''
  const course = courseGroups(track)
  if (course.some((item) => item.key === group)) return group
  return groupKeyForLabel(track, group) || course[0]?.key || ''
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    const loaded = readProgress(STORAGE_KEY, storageGroups)
    return { ...loaded, state: { ...loaded.state, group: routeGroup(loaded.state.track, loaded.state.group) } }
  })
  const [state, setState] = useState<ProgressState>(initial.state)
  const [storageIssue, setStorageIssue] = useState(initial.issue)
  const latest = useRef(state)
  const synced = useRef(state)
  const skipPersist = useRef(false)

  useEffect(() => {
    latest.current = state
    if (skipPersist.current) {
      skipPersist.current = false
      return
    }
    const save = () => {
      const local = latest.current
      const remote = readProgress(STORAGE_KEY, storageGroups).state
      const next = mergeForWrite(local, remote, synced.current)
      if (sameProgress(next, remote) && next.revision === remote.revision) {
        synced.current = remote
        return
      }
      const issue = writeProgress(STORAGE_KEY, next)
      synced.current = next
      latest.current = next
      if (next.revision !== local.revision) {
        skipPersist.current = true
        setState(next)
      }
      setStorageIssue(issue)
    }
    const timer = window.setTimeout(save, 350)
    return () => window.clearTimeout(timer)
  }, [state])

  useEffect(() => {
    const flush = () => {
      const remote = readProgress(STORAGE_KEY, storageGroups).state
      const next = mergeForWrite(latest.current, remote, synced.current)
      // Idle tabs that are behind storage must not rewrite an unchanged remote snapshot.
      if (sameProgress(next, remote) && next.revision === remote.revision) {
        synced.current = remote
        return
      }
      writeProgress(STORAGE_KEY, next)
      synced.current = next
      latest.current = next
    }
    window.addEventListener('pagehide', flush)
    return () => {
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || event.newValue == null) return
      try {
        const remote = normalizeProgress(JSON.parse(event.newValue), storageGroups)
        if (remote.revision <= latest.current.revision) return
        const routed = { ...remote, group: routeGroup(remote.track, remote.group) }
        synced.current = routed
        latest.current = routed
        skipPersist.current = true
        setState(routed)
      } catch {
        /* ignore malformed cross-tab payloads */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme
  }, [state.theme])

  const setTrack = useCallback((track: Track) => {
    setState((prev) => ({
      ...prev,
      track,
      group: courseGroups(track)[0]?.key || '',
      localTopic: '',
    }))
  }, [])

  const setGroup = useCallback((group: string) => {
    setState((prev) => ({ ...prev, group }))
  }, [])

  const selectLesson = useCallback((track: Track, group: string) => {
    setState(prev => prev.track === track && prev.group === group ? prev : { ...prev, track, group })
  }, [])

  const toggleList = useCallback((key: 'done' | 'review' | 'aiDone' | 'aiReview', id: string) => {
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

  const rememberAi = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      aiRecent: [id, ...prev.aiRecent.filter((item) => item !== id)].slice(0, 12),
    }))
  }, [])

  const value = useMemo<ProgressApi>(
    () => ({
      ...state,
      storageIssue,
      selectLesson,
      setTrack,
      setGroup,
      toggleDone: (id) => toggleList('done', id),
      toggleReview: (id) => toggleList('review', id),
      remember,
      setNote: (id, note) =>
        setState((prev) => ({ ...prev, notes: { ...prev.notes, [id]: note } })),
      setQuery: (query) => setState((prev) => ({ ...prev, query })),
      toggleAiDone: (id) => toggleList('aiDone', id),
      toggleAiReview: (id) => toggleList('aiReview', id),
      rememberAi,
      setAiNote: (id, note) =>
        setState((prev) => ({ ...prev, aiNotes: { ...prev.aiNotes, [id]: note } })),
      setAiQuery: (aiQuery) => setState((prev) => ({ ...prev, aiQuery })),
      setTheme: (theme) => setState((prev) => ({ ...prev, theme })),
      setLocalQuery: (localQuery) => setState((prev) => ({ ...prev, localQuery })),
      setLocalTopic: (localTopic) => setState((prev) => ({ ...prev, localTopic })),
      setLocalCategory: (localCategory) => setState((prev) => ({
        ...prev,
        localCategory,
        localTopic: prev.localCategory === localCategory ? prev.localTopic : '',
      })),
      saveAudit: (key, note) =>
        setState((prev) => ({
          ...prev,
          audit: { ...prev.audit, [key]: { note, status: '待核验' } },
        })),
    }),
    [state, storageIssue, selectLesson, setTrack, setGroup, toggleList, remember, rememberAi],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const value = useContext(ProgressContext)
  if (!value) throw new Error('useProgress must be used inside ProgressProvider')
  return value
}
