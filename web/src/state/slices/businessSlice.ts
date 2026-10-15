import type { QuestAction } from '../../data/questBoard.ts'
import type { LearningState } from '../learningState.ts'
import {
  applyQuestAction,
  rememberAttempt,
  rememberEvidence,
  rememberPause,
  resumeLearning,
  type Attempt,
  type Evidence,
  type PauseChoice,
  type QuestSave,
} from '../learningEvidence.ts'

type SetState = (partial: Partial<LearningState> | ((state: LearningState) => Partial<LearningState>)) => void
type GetState = () => LearningState

function readonlyQuest(state: LearningState): QuestSave {
  return {
    ok: false,
    issue: '记录版本比本页新，不能改写。',
    envelope: state.learning,
    granted: [],
  }
}

/** 完成、证据、关卡和核验。记录比本页新时这些写入直接放弃。 */
export function businessActions(set: SetState, get: GetState) {
  const toggleList = (key: 'done' | 'review' | 'aiDone' | 'aiReview' | 'pathChecks', id: string) => {
    set((prev) => {
      const list = prev[key] ?? []
      return {
        [key]: list.includes(id) ? list.filter((item) => item !== id) : [id, ...list],
      }
    })
  }

  return {
    toggleDone: (id: string) => toggleList('done', id),
    toggleReview: (id: string) => toggleList('review', id),
    togglePathCheck: (id: string) => toggleList('pathChecks', id),
    skipGateVerify(gateId: string) {
      set((prev) => ({
        skipVerify: prev.skipVerify.includes(gateId) ? prev.skipVerify : [...prev.skipVerify, gateId],
      }))
    },
    toggleAiDone: (id: string) => toggleList('aiDone', id),
    toggleAiReview: (id: string) => toggleList('aiReview', id),
    rememberAi(id: string) {
      set((prev) => ({
        aiRecent: [id, ...prev.aiRecent.filter((item) => item !== id)].slice(0, 12),
      }))
    },
    setAiNote(id: string, note: string) {
      set((prev) => ({ aiNotes: { ...prev.aiNotes, [id]: note } }))
    },
    setAiQuery(aiQuery: string) {
      set({ aiQuery })
    },
    skipAiPrereq(noteKey: string) {
      set((prev) => ({
        aiSkippedPrereq: prev.aiSkippedPrereq.includes(noteKey)
          ? prev.aiSkippedPrereq
          : [...prev.aiSkippedPrereq, noteKey],
      }))
    },
    setAiDrillScore(questionId: string, score: number) {
      set((prev) => ({
        aiDrillScores: { ...prev.aiDrillScores, [questionId]: score },
      }))
    },
    replaceAiProgress(patch: Pick<
      LearningState,
      'aiDone' | 'aiReview' | 'aiRecent' | 'aiNotes' | 'aiQuery' | 'aiSkippedPrereq' | 'aiDrillScores'
    >) {
      set(patch)
    },
    saveAudit(key: string, note: string) {
      set((prev) => ({
        audit: { ...prev.audit, [key]: { note, status: '待核验' } },
      }))
    },
    saveLearningDraft(attempt: Attempt, evidence?: Evidence) {
      set((prev) => {
        if (prev.learningReadonly) return {}
        const drafted = rememberAttempt(prev.learning, attempt)
        if (!evidence) return { learning: drafted.envelope }
        const recorded = rememberEvidence(drafted.envelope, evidence)
        return { learning: recorded.ok ? recorded.envelope : drafted.envelope }
      })
    },
    setLearningPause(choice: PauseChoice | null) {
      set((prev) => {
        if (prev.learningReadonly) return {}
        const next = choice ? rememberPause(prev.learning, choice) : resumeLearning(prev.learning)
        return { learning: next.envelope }
      })
    },
    applyQuest(action: QuestAction) {
      const state = get()
      if (state.learningReadonly) return readonlyQuest(state)
      const saved = applyQuestAction(state.learning, action)
      if (saved.envelope !== state.learning) set({ learning: saved.envelope })
      return saved
    },
  }
}
