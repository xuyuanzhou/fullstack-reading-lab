import type { TransitionKind } from './scenes.ts'

const KEY = 'fs-transition-audio'

let ctx: AudioContext | null = null
let noise: AudioBuffer | null = null

export function transitionAudioEnabled() {
  try {
    return localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

export function setTransitionAudio(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* 记不住就只在这一页生效 */
  }
  if (on) primeTransitionAudio()
}

/** 在点击里调用，浏览器才允许出声。默认关闭，不自动播。 */
export function primeTransitionAudio() {
  const Ctx = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return
  if (!ctx) ctx = new Ctx()
  if (ctx.state === 'suspended') void ctx.resume()
  if (!noise) {
    const length = Math.floor(ctx.sampleRate * 0.35)
    noise = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = noise.getChannelData(0)
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length)
  }
}

export function playTransitionCue(kind: TransitionKind) {
  if (!transitionAudioEnabled()) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  primeTransitionAudio()
  if (!ctx) return
  const start = () => { if (ctx) cue(ctx, kind) }
  if (ctx.state === 'running') start()
  else void ctx.resume().then(start)
}

function cue(context: AudioContext, kind: TransitionKind) {
  const t = context.currentTime
  const gain = context.createGain()
  gain.connect(context.destination)
  gain.gain.setValueAtTime(0.0001, t)
  if (kind === 'warp' && noise) {
    const src = context.createBufferSource()
    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, t)
    filter.frequency.exponentialRampToValueAtTime(2200, t + 0.35)
    src.buffer = noise
    src.connect(filter)
    filter.connect(gain)
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
    src.start(t)
    src.stop(t + 0.4)
    return
  }
  const osc = context.createOscillator()
  osc.connect(gain)
  if (kind === 'splice') {
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(660, t)
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
    osc.start(t)
    osc.stop(t + 0.18)
    return
  }
  osc.type = 'sine'
  osc.frequency.setValueAtTime(392, t)
  osc.frequency.exponentialRampToValueAtTime(148, t + 0.34)
  gain.gain.exponentialRampToValueAtTime(0.06, t + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36)
  osc.start(t)
  osc.stop(t + 0.38)
}
