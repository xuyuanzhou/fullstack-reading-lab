import type { LearningState } from './learningState.ts'
import type { ProgressState } from '../types/curriculum.ts'

/** 从仓库里取出要写入浏览器的那一份。运行时字段（保存失败、本机是否连上）不进这份快照。 */
export function progressSnapshot(state: LearningState): ProgressState {
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
  }
}
