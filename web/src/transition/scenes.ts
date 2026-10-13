export type PageScene = 'home' | 'levels' | 'sub' | 'other'
export type TransitionKind = 'warp' | 'splice' | 'pullback'

/** 首页进关卡列表、关卡进子关、返回。单位毫秒，都落在 0.8–1.5 秒。 */
export const TRANSITION_MS: Record<TransitionKind, number> = {
  warp: 1200,
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

const depth: Record<PageScene, number> = { other: 0, home: 1, levels: 2, sub: 3 }

/** 首页 → 关卡列表是穿梭；进入子关是拼接；往上返回是拉远。知识库等其它页不播。 */
export function transitionKind(from: string, to: string): TransitionKind | null {
  if (from === to) return null
  const start = pageScene(from)
  const end = pageScene(to)
  if (start === 'other' || end === 'other' || start === end) return null
  if (start === 'home' && end === 'levels') return 'warp'
  if (end === 'sub') return 'splice'
  if (depth[end] < depth[start]) return 'pullback'
  return null
}
