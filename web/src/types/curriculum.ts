import type { DrillState } from '../data/drillRules'
import type { LearningEnvelope } from '../state/learningEvidence'

export type Track = 'frontend' | 'java'
export type LocalCategory = Track | 'ai'

export type DeepPart = {
  title: string
  body: string
}

export type Lesson = {
  track: Track
  group: string
  id: string
  title: string
  prompt: string
  promptAnswer?: string
  core: string
  why: string
  example: string
  task: string
  answer: string
  keywords: string
  points: string[]
  references: [string, string][]
  deep?: DeepPart[]
  map?: DeepPart[]
  diagram?: string
  origin?: string
  react?: string
  vue?: string
  /** Introduced-in baseline for teaching (e.g. JDK 8, ES2015). */
  since?: string
}

export type OutlineSection = {
  title: string
  ids: string[]
}

export type Curriculum = {
  schemaVersion: number
  groupOrder: Record<Track, string[]>
  groupLabels?: Record<Track, Record<string, string>>
  pathLead: Record<Track, Record<string, string[]>>
  outline?: Record<Track, Record<string, OutlineSection[]>>
  lessons: Lesson[]
}

export type ProgressState = {
  track: Track
  group: string
  done: string[]
  review: string[]
  recent: string[]
  notes: Record<string, string>
  theme: 'light' | 'dark'
  query: string
  audit: Record<string, { note: string; status: string }>
  localQuery: string
  localTopic: string
  localCategory: LocalCategory
  /** AI 路线独立进度，不与 frontend/java 的 done/review/notes 混写 */
  aiDone: string[]
  aiReview: string[]
  aiRecent: string[]
  aiNotes: Record<string, string>
  aiQuery: string
  /** 用户主动跳过先修门槛的课 key（不是进度 id） */
  aiSkippedPrereq: string[]
  /** 面试题训练自评 0–4 */
  aiDrillScores: Record<string, number>
  /** 主线交付勾选，形如 g1:0。这是自评，不是测试通过。 */
  pathChecks: string[]
  /** 学员选择跳过某关的先修建议。只记选择，不改勾选，也不算通过。 */
  skipVerify: string[]
  /** 任务草稿和证据。schemaVersion 在这份信封里，和下面的 revision 不是同一件事。 */
  learning: LearningEnvelope
  /** 记录比本页新时为真，写回时必须保留原文。 */
  learningReadonly: boolean
  /** 只在 learningReadonly 时保留的原文。 */
  learningHeld: unknown
  /** Monotonic write counter so a stale tab cannot blank a newer tab's notes. */
  revision: number
  /** 技能树「正在点亮」从哪条路里挑。不改变印章明暗。 */
  skillScene: 'all' | 'browser' | 'java' | 'ai'
  /** 选择题闯关的答题记录。积分、通关和徽章从这里推导。 */
  drill: DrillState
}
