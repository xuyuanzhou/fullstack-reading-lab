import type { DrillAttemptInput } from '../data/drillRules.ts'
import type { QuestAction } from '../data/questBoard.ts'
import type { Attempt, Evidence, PauseChoice, QuestSave } from './learningEvidence.ts'
import type { ProgressState, Track } from '../types/curriculum.ts'

type SkillScene = ProgressState['skillScene']

export type LearningState = ProgressState & {
  storageIssue: string
  /** null：还在问本机资料服务；true / false：已经有结果。 */
  localReady: boolean | null
  probeSeq: number
  setTrack: (track: Track) => void
  setGroup: (group: string) => void
  selectLesson: (track: Track, group: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setSkillScene: (scene: SkillScene) => void
  setQuery: (query: string) => void
  setNote: (id: string, note: string) => void
  remember: (id: string) => void
  setLocalQuery: (query: string) => void
  setLocalTopic: (topic: string) => void
  setLocalCategory: (category: ProgressState['localCategory']) => void
  toggleDone: (id: string) => void
  toggleReview: (id: string) => void
  togglePathCheck: (id: string) => void
  skipGateVerify: (gateId: string) => void
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
  saveAudit: (key: string, note: string) => void
  saveLearningDraft: (attempt: Attempt, evidence?: Evidence) => void
  setLearningPause: (choice: PauseChoice | null) => void
  applyQuest: (action: QuestAction) => QuestSave
  answerDrill: (input: DrillAttemptInput) => { ok: boolean; issue: string; questionId: string }
  reconnectLocal: () => Promise<boolean>
  /** 立刻按 revision 合并写回。测试和离开页时用。 */
  flushPersist: () => void
  startShell: () => () => void
}
