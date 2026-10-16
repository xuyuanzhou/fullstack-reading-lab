export type PageScene = 'home' | 'levels' | 'sub' | 'other'
export type TransitionKind = 'warp' | 'splice' | 'pullback' | 'catalog'

/** 游戏相关遮罩时长。单位毫秒，都落在 0.8–1.5 秒。 */
export const TRANSITION_MS: Record<TransitionKind, number> = {
  warp: 1500,
  splice: 1200,
  pullback: 900,
  catalog: 900,
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
 * 从总图进课文是剑客闯关。
 * 课文回总图不再铺近黑遮罩：浏览器返回和页内回营地都直接看见总图。
 * 总图打开课表用课表展开，落在正文栏里。课表点进总图不铺雾面。
 * 章节首页与课文之间不播，交给正文占位。
 */
export function transitionKind(from: string, to: string): TransitionKind | null {
  if (from === to) return null
  const start = pageScene(from)
  const end = pageScene(to)
  if (start === 'other' || end === 'other') return null
  if (start !== 'levels' && end !== 'levels') return null
  if (start === 'home' && end === 'levels') return null
  if (start === 'sub' && end === 'levels') return null
  if (start === 'levels' && end === 'sub') return 'splice'
  if (start === 'levels' && end === 'home') return 'catalog'
  return null
}
