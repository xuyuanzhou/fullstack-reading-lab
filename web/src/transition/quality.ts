export type Tier = 'full' | 'lite' | 'off'

export type TierInput = {
  reduce: boolean
  cores: number
  memory?: number
  saveData: boolean
  webgl: boolean
  forcedLite?: boolean
}

let forcedLite = false

export function chooseTier(input: TierInput): Tier {
  if (input.reduce) return 'off'
  if (
    input.forcedLite
    || input.saveData
    || input.cores <= 2
    || (input.memory != null && input.memory <= 2)
    || !input.webgl
  ) return 'lite'
  return 'full'
}

export function noteSlowFrames(deltas: readonly number[]) {
  const slow = deltas.filter((delta) => delta > 34).length
  if (slow >= 3) forcedLite = true
}

export function resetTransitionTier() {
  forcedLite = false
}

export function tierIsForcedLite() {
  return forcedLite
}

export function currentTier(): Tier {
  if (forcedLite) {
    return chooseTier({ reduce: motionReduced(), cores: 8, saveData: false, webgl: true, forcedLite: true })
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  return chooseTier({
    reduce: motionReduced(),
    cores: navigator.hardwareConcurrency || 8,
    memory: nav.deviceMemory,
    saveData: Boolean(nav.connection?.saveData),
    webgl: webglAvailable(),
  })
}

function motionReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let webgl: boolean | null = null

export function webglAvailable() {
  if (webgl != null) return webgl
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    webgl = Boolean(gl)
    if (gl && 'getExtension' in gl) gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webgl = false
  }
  return webgl
}
