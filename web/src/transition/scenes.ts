export type PageScene = 'home' | 'levels' | 'sub' | 'other'
export type TransitionKind = 'warp' | 'splice' | 'pullback'

/** 游戏相关遮罩时长。单位毫秒，都落在 0.8–1.5 秒。 */
export const TRANSITION_MS: Record<TransitionKind, number> = {
  warp: 1500,
  splice: 1000,
  pullback: 900,
}

export const LITE_MS = 800

const TRACKS = new Set(['frontend', 'java'])

export function pageScene(pathname: string): PageScene {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] === 'paths') return 'levels'
  if (!TRACKS.has(parts[0] ?? '')) return 'other'
  if (parts.length === 2) return 'home'
  if (parts.length === 3) return 'sub'
  return 'other'
}

/**
 * 只有架构师主线营地（`/paths`）相关跳转播特效：
 * 进营地穿梭、从营地进课文拼接、回营地拉远。
 * 章节首页与课文之间不播，交给 Ant Design Spin。
 */
export function transitionKind(from: string, to: string): TransitionKind | null {
  if (from === to) return null
  const start = pageScene(from)
  const end = pageScene(to)
  if (start === 'other' || end === 'other') return null
  if (start !== 'levels' && end !== 'levels') return null
  if (start === 'home' && end === 'levels') return 'warp'
  if (start === 'levels' && end === 'sub') return 'splice'
  if (start === 'sub' && end === 'levels') return 'pullback'
  if (start === 'levels' && end === 'home') return 'pullback'
  return null
}
