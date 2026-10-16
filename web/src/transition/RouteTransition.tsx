import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { useLearningSlice } from '@/state/progress'
import { playCampTick, playTransitionCue, primeTransitionAudio, setTransitionAudio, transitionAudioEnabled } from './audio.ts'
import { beginJump, completeJump, JUMP_BUDGET_MS, markSceneReady } from './jumpBudget.ts'
import { currentTier, type Tier } from './quality.ts'
import { ChallengeFx, RosterFx } from './ChallengeFx.tsx'
import { LITE_MS, TRANSITION_MS, pageScene, transitionKind, type TransitionKind } from './scenes.ts'
import { preloadWarp, runWarp } from './warp.ts'

type Fx = { kind: TransitionKind; tier: Tier; ms: number }

/** 总图进课文是闯关，总图开课表是纸页展开。回总图和课表进总图不遮罩。其它路径用正文占位。 */
export function RouteTransition() {
  const location = useLocation()
  const flush = useLearningSlice((state) => state.flushPersist)
  const prev = useRef(location.pathname)
  const prevSearch = useRef(location.search)
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
    const search = location.search
    if (from === to) {
      // 营地内只改 query（进关、Boss 档）时仍要有轻响，否则开了音效也像没声。
      if (pageScene(to) === 'levels' && prevSearch.current !== search) {
        prevSearch.current = search
        playCampTick()
      }
      return
    }
    prev.current = to
    prevSearch.current = search
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
  }, [flush, location.pathname, location.search])

  if (!fx) return null
  return (
    <div
      className={`route-fx is-${fx.kind} is-${fx.tier}`}
      style={{ '--fx-ms': `${fx.ms}ms` } as CSSProperties}
      data-transition={fx.kind}
      data-tier={fx.tier}
      aria-hidden="true"
    >
      {fx.kind === 'warp' ? <WarpView ms={fx.ms} tier={fx.tier} /> : null}
      {fx.kind === 'splice' ? <ChallengeFx /> : null}
      {fx.kind === 'catalog' ? <RosterFx /> : null}
      {fx.kind === 'pullback' ? <div className="route-fx-camera" /> : null}
      {fx.kind === 'pullback' ? <span className="route-fx-scan" /> : null}
      {fx.kind === 'pullback' ? <span className="route-fx-neon" /> : null}
    </div>
  )
}

function WarpView({ ms, tier }: { ms: number; tier: Tier }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [useGl, setUseGl] = useState(tier === 'full')
  useLayoutEffect(() => {
    if (tier !== 'full') {
      setUseGl(false)
      return
    }
    const canvas = ref.current
    if (!canvas) {
      setUseGl(false)
      return
    }
    const stop = runWarp(canvas, ms)
    if (!stop) {
      setUseGl(false)
      return
    }
    setUseGl(true)
    return stop
  }, [ms, tier])
  if (!useGl) return <div className="route-fx-fallback" />
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
      title={on ? '关闭转场音效' : '打开转场音效'}
      onClick={() => {
        const next = !on
        setTransitionAudio(next)
        setOn(next)
      }}
    >
      {on ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
    </button>
  )
}
