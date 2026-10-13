/** 关卡跳转从离开上一页到下一页可阅读，含转场遮罩。 */
export const JUMP_BUDGET_MS = 2000

/**
 * 慢速 3G 大约 50KB/s，往返再加约 400ms。
 * 单课正文低于这个大小时，下载本身低于 2 秒，转场可以和下载并行。
 */
export const LESSON_BODY_BUDGET_BYTES = 40_000

export type JumpSample = {
  path: string
  overlayMs: number
  readyMs: number
  totalMs: number
  over: boolean
}

export function jumpTotal(readyMs: number, overlayMs: number) {
  return Math.max(0, readyMs, overlayMs)
}

export function jumpIsOver(totalMs: number) {
  return totalMs > JUMP_BUDGET_MS
}

const samples: JumpSample[] = []
let open: { path: string; at: number; overlayMs: number } | null = null
let pendingReady: string | null = null

export function jumpSamples() {
  return samples.slice()
}

export function beginJump(path: string, overlayMs: number) {
  open = { path, at: performance.now(), overlayMs }
  if (pendingReady === path) {
    pendingReady = null
    return completeJump(path)
  }
  pendingReady = null
  return null
}

export function markSceneReady(path: string) {
  if (open?.path === path) return completeJump(path)
  pendingReady = path
  return null
}

export function completeJump(path: string) {
  if (!open || open.path !== path) return null
  const readyMs = performance.now() - open.at
  const totalMs = jumpTotal(readyMs, open.overlayMs)
  const sample: JumpSample = {
    path,
    overlayMs: open.overlayMs,
    readyMs: Math.round(readyMs),
    totalMs: Math.round(totalMs),
    over: jumpIsOver(totalMs),
  }
  open = null
  samples.push(sample)
  if (samples.length > 20) samples.shift()
  if (sample.over) console.warn(`关卡跳转 ${sample.totalMs}ms 超过 ${JUMP_BUDGET_MS}ms`, sample)
  return sample
}

if (typeof window !== 'undefined') {
  ;(window as unknown as { __labJumps?: () => JumpSample[] }).__labJumps = jumpSamples
}
