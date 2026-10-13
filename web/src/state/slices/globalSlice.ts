import type { LearningState } from '../learningState.ts'

type SetState = (partial: Partial<LearningState> | ((state: LearningState) => Partial<LearningState>)) => void
type GetState = () => LearningState

/** 不进学习记录的运行时状态：本机资料服务有没有连上。后发起的探测覆盖先返回的结果。 */
export function globalActions(set: SetState, get: GetState, probe: () => Promise<boolean>) {
  return {
    async reconnectLocal() {
      const seq = get().probeSeq + 1
      set({ localReady: null, probeSeq: seq })
      let ready = false
      try {
        ready = await probe()
      } catch {
        ready = false
      }
      if (get().probeSeq !== seq) return ready
      set({ localReady: ready })
      return ready
    },
  }
}
