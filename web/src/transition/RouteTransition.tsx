import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { useLearningSlice } from '@/state/progress'
import { playTransitionCue, primeTransitionAudio, setTransitionAudio, transitionAudioEnabled } from './audio.ts'
import { beginJump, completeJump, JUMP_BUDGET_MS, markSceneReady } from './jumpBudget.ts'
import { currentTier, type Tier } from './quality.ts'
import { LITE_MS, TRANSITION_MS, pageScene, transitionKind, type TransitionKind } from './scenes.ts'
import { preloadWarp, runWarp } from './warp.ts'

type Fx = { kind: TransitionKind; tier: Tier; ms: number }

export function RouteTransition() {
  const location = useLocation()
  const flush = useLearningSlice((state) => state.flushPersist)
  const prev = useRef(location.pathname)
  const [fx, setFx] = useState<Fx | null>(null)

  useEffect(() => {
    const warm = window.setTimeout(() => {
      if (currentTier() === 'full') preloadWarp()
      void import('@/pages/HomePage')
      void import('@/pages/PathPage')
      void import('@/pages/LessonPage')
    }, 240)
    const prime = () => {
      if (transitionAudioEnabled()) primeTransitionAudio()
    }
    window.addEventListener('pointerdown', prime)
    return () => {
      window.clearTimeout(warm)
      window.removeEventListener('pointerdown', prime)
    }
  }, [])

  useEffect(() => {
    const from = prev.current
    const to = location.pathname
    if (from === to) return
    prev.current = to
    flush()
    const kind = transitionKind(from, to)
    const tier = currentTier()
    const overlayMs = !kind || tier === 'off' ? 0 : tier === 'lite' ? LITE_MS : TRANSITION_MS[kind]
    beginJump(to, overlayMs)
    if (pageScene(to) === 'other') markSceneReady(to)
    let timer = 0
    if (overlayMs > 0 && kind) {
      setFx({ kind, tier, ms: overlayMs })
      playTransitionCue(kind)
      timer = window.setTimeout(() => setFx(null), overlayMs)
    } else {
      setFx(null)
    }
    const cap = window.setTimeout(() => completeJump(to), JUMP_BUDGET_MS + 400)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(cap)
    }
  }, [flush, location.pathname])

  if (!fx) return null
  return (
    <div
      className={`route-fx is-${fx.kind} is-${fx.tier}`}
      style={{ '--fx-ms': `${fx.ms}ms` } as CSSProperties}
      data-transition={fx.kind}
      data-tier={fx.tier}
      aria-hidden="true"
    >
      {fx.kind === 'warp' && fx.tier === 'full' ? <WarpView ms={fx.ms} /> : <div className="route-fx-fallback" />}
      {fx.kind === 'splice' ? (
        <>
          <span className="route-fx-pane is-left" />
          <span className="route-fx-pane is-right" />
          <span className="route-fx-seam" />
          {fx.tier === 'full' ? <BurstView ms={fx.ms} /> : null}
        </>
      ) : null}
      {fx.kind === 'pullback' ? <div className="route-fx-camera" /> : null}
      <span className="route-fx-scan" />
      <span className="route-fx-neon" />
    </div>
  )
}

function WarpView({ ms }: { ms: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    return runWarp(canvas, ms)
  }, [ms])
  return <canvas ref={ref} className="route-fx-gl" />
}

function BurstView({ ms }: { ms: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dots = Array.from({ length: 36 }, () => ({
      a: Math.random() * Math.PI * 2,
      v: 0.25 + Math.random() * 0.75,
      r: 1 + Math.random() * 1.6,
    }))
    let frame = 0
    const started = performance.now()
    const draw = (now: number) => {
      const t = Math.min(1, (now - started) / ms)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2
      for (const dot of dots) {
        const dist = t * dot.v * Math.min(width, height) * 0.55
        ctx.globalAlpha = 1 - t
        ctx.fillStyle = '#d7ebe0'
        ctx.beginPath()
        ctx.arc(cx + Math.cos(dot.a) * dist, cy + Math.sin(dot.a) * dist, dot.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      if (t < 1) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [ms])
  return <canvas ref={ref} className="route-fx-gl" />
}

export function TransitionAudioButton() {
  const [on, setOn] = useState(transitionAudioEnabled)
  return (
    <button
      type="button"
      className={`fx-audio${on ? ' is-on' : ''}`}
      aria-pressed={on}
      aria-label={on ? '关闭转场音效' : '打开转场音效'}
      onClick={() => {
        const next = !on
        setTransitionAudio(next)
        setOn(next)
      }}
    >
      {on ? '音效开' : '音效关'}
    </button>
  )
}
