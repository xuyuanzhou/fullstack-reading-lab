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
  if (on) {
    primeTransitionAudio()
    // 必须在这次点击里出声，用户才知道开关有效；也顺便解浏览器自动播放限制。
    playToggleCue()
  }
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

/** 打开音效时的确认声。不看 reduced-motion，因为这是用户主动点的反馈。 */
export function playToggleCue() {
  primeTransitionAudio()
  if (!ctx) return
  const run = () => {
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, t)
    osc.frequency.exponentialRampToValueAtTime(784, t + 0.12)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.14, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.24)
  }
  if (ctx.state === 'running') run()
  else void ctx.resume().then(run)
}

/** 营地内换站的轻响，不铺遮罩。 */
export function playCampTick() {
  if (!transitionAudioEnabled()) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  primeTransitionAudio()
  if (!ctx) return
  const run = () => {
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(880, t)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.09, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.12)
  }
  if (ctx.state === 'running') run()
  else void ctx.resume().then(run)
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
    filter.frequency.setValueAtTime(240, t)
    filter.frequency.exponentialRampToValueAtTime(720, t + 0.36)
    src.buffer = noise
    src.connect(filter)
    filter.connect(gain)
    gain.gain.exponentialRampToValueAtTime(0.16, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)
    src.start(t)
    src.stop(t + 0.45)
    return
  }
  const osc = context.createOscillator()
  osc.connect(gain)
  if (kind === 'splice') {
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(196, t)
    osc.frequency.exponentialRampToValueAtTime(523, t + 0.16)
    gain.gain.exponentialRampToValueAtTime(0.1, t + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)
    osc.start(t)
    osc.stop(t + 0.3)
    return
  }
  if (kind === 'catalog') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(247, t)
    osc.frequency.exponentialRampToValueAtTime(392, t + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26)
    osc.start(t)
    osc.stop(t + 0.28)
    return
  }
  osc.type = 'sine'
  osc.frequency.setValueAtTime(392, t)
  osc.frequency.exponentialRampToValueAtTime(148, t + 0.34)
  gain.gain.exponentialRampToValueAtTime(0.13, t + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
  osc.start(t)
  osc.stop(t + 0.42)
}
