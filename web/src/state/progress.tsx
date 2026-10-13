import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { probeLocalLibrary } from '@/api/localLibrary'
import { courseGroups, groupKeyForLabel } from '@/data/routes'
import type { LearningState } from '@/state/learningState'
import { createLearningStore, type LearningStore } from '@/state/learningStore'
import type { ProgressState, Track } from '@/types/curriculum'
import type { Attempt, Evidence, PauseChoice, QuestSave } from '@/state/learningEvidence'
import type { QuestAction } from '@/data/questBoard'

export type ProgressApi = ProgressState & {
  storageIssue: string
  selectLesson: (track: Track, group: string) => void
  setTrack: (track: Track) => void
  setGroup: (group: string) => void
  toggleDone: (id: string) => void
  togglePathCheck: (id: string) => void
  toggleReview: (id: string) => void
  remember: (id: string) => void
  setNote: (id: string, note: string) => void
  setQuery: (query: string) => void
  toggleAiDone: (id: string) => void
  toggleAiReview: (id: string) => void
  rememberAi: (id: string) => void
  setAiNote: (id: string, note: string) => void
  setAiQuery: (query: string) => void
  skipAiPrereq: (noteKey: string) => void
  setAiDrillScore: (questionId: string, score: number) => void
  replaceAiProgress: (patch: Pick<
    ProgressState,
    'aiDone' | 'aiReview' | 'aiRecent' | 'aiNotes' | 'aiQuery' | 'aiSkippedPrereq' | 'aiDrillScores'
  >) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocalQuery: (query: string) => void
  setLocalTopic: (topic: string) => void
  setLocalCategory: (category: ProgressState['localCategory']) => void
  saveAudit: (key: string, note: string) => void
  saveLearningDraft: (attempt: Attempt, evidence?: Evidence) => void
  setLearningPause: (choice: PauseChoice | null) => void
  applyQuest: (action: QuestAction) => QuestSave
}

const LearningStoreContext = createContext<LearningStore | null>(null)

function routeGroup(track: Track, group: string) {
  if (!group) return ''
  const course = courseGroups(track)
  if (course.some((item) => item.key === group)) return group
  return groupKeyForLabel(track, group) || course[0]?.key || ''
}

let singleton: LearningStore | null = null

function learningStore() {
  if (!singleton) {
    singleton = createLearningStore({
      groups: (track) => courseGroups(track).flatMap((group) => [group.key, group.label]),
      routeGroup,
      firstGroup: (track) => courseGroups(track)[0]?.key || '',
      probe: probeLocalLibrary,
    })
  }
  return singleton
}

function selectApi(state: LearningState): ProgressApi {
  return {
    track: state.track,
    group: state.group,
    done: state.done,
    review: state.review,
    recent: state.recent,
    notes: state.notes,
    theme: state.theme,
    query: state.query,
    audit: state.audit,
    localQuery: state.localQuery,
    localTopic: state.localTopic,
    localCategory: state.localCategory,
    aiDone: state.aiDone,
    aiReview: state.aiReview,
    aiRecent: state.aiRecent,
    aiNotes: state.aiNotes,
    aiQuery: state.aiQuery,
    aiSkippedPrereq: state.aiSkippedPrereq,
    aiDrillScores: state.aiDrillScores,
    pathChecks: state.pathChecks,
    learning: state.learning,
    learningReadonly: state.learningReadonly,
    learningHeld: state.learningHeld,
    revision: state.revision,
    storageIssue: state.storageIssue,
    selectLesson: state.selectLesson,
    setTrack: state.setTrack,
    setGroup: state.setGroup,
    toggleDone: state.toggleDone,
    togglePathCheck: state.togglePathCheck,
    toggleReview: state.toggleReview,
    remember: state.remember,
    setNote: state.setNote,
    setQuery: state.setQuery,
    toggleAiDone: state.toggleAiDone,
    toggleAiReview: state.toggleAiReview,
    rememberAi: state.rememberAi,
    setAiNote: state.setAiNote,
    setAiQuery: state.setAiQuery,
    skipAiPrereq: state.skipAiPrereq,
    setAiDrillScore: state.setAiDrillScore,
    replaceAiProgress: state.replaceAiProgress,
    setTheme: state.setTheme,
    setLocalQuery: state.setLocalQuery,
    setLocalTopic: state.setLocalTopic,
    setLocalCategory: state.setLocalCategory,
    saveAudit: state.saveAudit,
    saveLearningDraft: state.saveLearningDraft,
    setLearningPause: state.setLearningPause,
    applyQuest: state.applyQuest,
  }
}

function useBoundStore() {
  const store = useContext(LearningStoreContext)
  if (!store) throw new Error('useProgress must be used inside ProgressProvider')
  return store
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [store] = useState(learningStore)
  useEffect(() => store.getState().startShell(), [store])
  return <LearningStoreContext.Provider value={store}>{children}</LearningStoreContext.Provider>
}

/** 整份学习记录。新界面如果只依赖一个字段，用 useLearningSlice。 */
export function useProgress() {
  return useStore(useBoundStore(), useShallow(selectApi))
}

export function useLearningSlice<T>(selector: (state: LearningState) => T) {
  return useStore(useBoundStore(), selector)
}

export function useReadingPlace() {
  return useStore(useBoundStore(), useShallow((state) => ({ track: state.track, group: state.group })))
}
