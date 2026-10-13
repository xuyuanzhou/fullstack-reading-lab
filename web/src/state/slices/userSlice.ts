import type { LearningState } from '../learningState.ts'
import type { Track } from '../../types/curriculum.ts'

type SetState = (partial: Partial<LearningState> | ((state: LearningState) => Partial<LearningState>)) => void

/** 读者自己的位置、主题和笔记。不写完成勾选，也不写证据。 */
export function userActions(set: SetState, firstGroup: (track: Track) => string) {
  return {
    setTrack(track: Track) {
      set({
        track,
        group: firstGroup(track),
        localTopic: '',
      })
    },
    setGroup(group: string) {
      set({ group })
    },
    selectLesson(track: Track, group: string) {
      set((prev) => prev.track === track && prev.group === group ? {} : { track, group })
    },
    setTheme(theme: 'light' | 'dark') {
      set({ theme })
    },
    setQuery(query: string) {
      set({ query })
    },
    setNote(id: string, note: string) {
      set((prev) => ({ notes: { ...prev.notes, [id]: note } }))
    },
    remember(id: string) {
      set((prev) => {
        if (prev.recent[0] === id) return {}
        return { recent: [id, ...prev.recent.filter((item) => item !== id)].slice(0, 12) }
      })
    },
    setLocalQuery(localQuery: string) {
      set({ localQuery })
    },
    setLocalTopic(localTopic: string) {
      set({ localTopic })
    },
    setLocalCategory(localCategory: LearningState['localCategory']) {
      set((prev) => ({
        localCategory,
        localTopic: prev.localCategory === localCategory ? prev.localTopic : '',
      }))
    },
  }
}
