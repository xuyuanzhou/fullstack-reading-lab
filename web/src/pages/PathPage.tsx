import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { QuestBoard } from '@/components/learning/QuestBoard'
import { prefetchLessonBody } from '@/data/curriculum'
import { LEARNING_TASKS } from '@/data/learningTasks'
import { PATHS, gateCleared, gateMark, nextInGate, type PathGate } from '@/data/learningPaths'
import { useProgress } from '@/state/progress'
import { markSceneReady } from '@/transition/jumpBudget'

const path = PATHS.architect
const stages = path.gates

const MIN_SLOT = 136
const PAD_X = 48
const PAD_TOP = 64
const ROW_GAP = 136
const WAVE = 18
const TURN_R = 28
const LABEL_BELOW = 108

function gateStatus(stage: PathGate, index: number, finished: boolean, sequenceIndex: number, openIndex: number) {
  if (finished) return '已过'
  if (index === sequenceIndex && openIndex >= 0) return '进行中'
  return gateMark(stage)
}

export function PathPage() {
  const progress = useProgress()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const openIndex = stages.findIndex((stage) => !gateCleared(stage, progress.done, progress.pathChecks))
  const sequenceIndex = openIndex === -1 ? stages.length - 1 : openIndex
  const upcomingId = nextInGate(stages[sequenceIndex], progress.done) || ''
  useEffect(() => {
    if (upcomingId) prefetchLessonBody(upcomingId)
    markSceneReady(location.pathname)
  }, [location.pathname, upcomingId])
  const requested = stages.findIndex((stage) => stage.id === params.get('gate'))
  const currentIndex = requested >= 0 ? requested : sequenceIndex

  const scrollRef = useRef<HTMLDivElement>(null)
  const [boardWidth, setBoardWidth] = useState(0)
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const apply = () => setBoardWidth(el.clientWidth)
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const layout = useMemo(() => buildLayout(stages.length, boardWidth || MIN_SLOT + PAD_X * 2), [boardWidth])
  const seen = useRef(false)

  useLayoutEffect(() => {
    const scroller = scrollRef.current
    const stop = scroller?.querySelector<HTMLElement>('.path-stop[aria-current="page"]')
    if (!scroller || !stop || !boardWidth) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = Math.max(0, stop.offsetTop - scroller.clientHeight / 2)
    scroller.scrollTo({ top, behavior: seen.current && !reduce ? 'smooth' : 'auto' })
    seen.current = true
  }, [boardWidth, currentIndex, layout])

  function selectGate(index: number) {
    const id = stages[index].id
    const query = new URLSearchParams()
    query.set('gate', id)
    setParams(query, { replace: true })
    window.dispatchEvent(new CustomEvent('lab-open-gate', { detail: id }))
  }

  const arrow = openIndex >= 0 ? layout.arrows[sequenceIndex] : null
  const openAttempt = [...progress.learning.attempts].reverse().find((item) => !item.deleted)
  const openTask = LEARNING_TASKS.find((item) => item.id === openAttempt?.taskId)
    ?? LEARNING_TASKS.find((item) => item.id === 'g1.write-path')
    ?? LEARNING_TASKS[0]
  const pauseLabel = progress.learning.pause
    ? progress.learning.pause.choice === 'day' ? '一天' : progress.learning.pause.choice === 'week' ? '一周' : '一个月'
    : ''

  function jump(id: string) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="path-stage">
      <header className="path-stage-head">
        <div className="page-kicker">
          <span>{stages.length} 关</span>
          <span className="dot" />
          <span>过关看交付</span>
        </div>
        <h1 className="hero-title">{path.title}</h1>
        <p className="hero-lead">{path.lead}</p>
      </header>
      <nav className="path-jumps" aria-label="这一页的位置">
        <button type="button" onClick={() => jump('path-map')}>九关地图</button>
        <button type="button" onClick={() => jump('quest-map')}>关卡地图</button>
        <button type="button" onClick={() => jump('quest-main')}>主线子关</button>
        <button type="button" onClick={() => jump('quest-side')}>支线任务</button>
        <button type="button" onClick={() => jump('quest-boss')}>核心挑战</button>
      </nav>
      <div className="path-map-scroll" id="path-map" ref={scrollRef}>
        <div
          className={layout.rows === 1 ? 'path-map is-single' : 'path-map'}
          style={{ width: layout.width, height: layout.height, ['--slot' as string]: `${layout.slot}px` }}
        >
          <svg className="campaign" viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
            <defs>
              <mask id="campaign-walked" maskUnits="userSpaceOnUse">
                <path
                  d={layout.d}
                  pathLength="1"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="16"
                  strokeDasharray={`${layout.fractions[sequenceIndex]} 1`}
                />
              </mask>
            </defs>
            <path className="campaign-road" d={layout.d} />
            <path className="campaign-road-shadow" d={layout.d} pathLength="1" strokeDasharray={`${layout.fractions[sequenceIndex]} 1`} transform="translate(0 5)" />
            <path className="campaign-walk" d={layout.d} pathLength="1" strokeDasharray={`${layout.fractions[sequenceIndex]} 1`} />
            <path className="campaign-gleam" d={layout.d} pathLength="1" mask="url(#campaign-walked)" />
            {arrow ? (
              <path className="campaign-arrow" d="M-5 -3.5 L4 0 L-5 3.5 Z" transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.deg})`} />
            ) : null}
            {layout.stops.map((stop, index) => (
              <Plinth
                key={stages[index].id}
                stop={stop}
                index={index}
                done={gateCleared(stages[index], progress.done, progress.pathChecks)}
                here={index === currentIndex}
                live={index === sequenceIndex && openIndex >= 0}
              />
            ))}
            <CampaignTraveler d={layout.d} index={currentIndex} fractions={layout.fractions} stops={layout.stops} />
          </svg>
          <ol className="path-stops" aria-label={`${stages.length} 关`}>
            {stages.map((stage, index) => {
              const finished = gateCleared(stage, progress.done, progress.pathChecks)
              const status = gateStatus(stage, index, finished, sequenceIndex, openIndex)
              const live = index === sequenceIndex && openIndex >= 0
              const stop = layout.stops[index]
              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    className={['path-stop', live ? 'is-live' : '', finished ? 'is-done' : ''].filter(Boolean).join(' ')}
                    style={{ left: stop.x, top: stop.y }}
                    aria-current={index === currentIndex ? 'page' : undefined}
                    onClick={() => selectGate(index)}
                  >
                    <span className="stop-hit" aria-hidden="true" />
                    <span className="route-name">{stage.learnTitle}</span>
                    <span className="route-state">{status}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      <p className="path-continue">
        九关仍可点开。下面的地图把子关、支线和核心挑战分开。
        {pauseLabel ? `已暂停${pauseLabel}。` : ''}最近一题：{openTask.title}。
      </p>
      <QuestBoard />
    </div>
  )
}

function Plinth({
  stop,
  index,
  done,
  here,
  live,
}: {
  stop: { x: number; y: number }
  index: number
  done: boolean
  here: boolean
  live: boolean
}) {
  const lift = here ? -8 : 0
  return (
    <g className={['plinth', done ? 'is-done' : '', here ? 'is-here' : '', live ? 'is-live' : ''].filter(Boolean).join(' ')} transform={`translate(${stop.x} ${stop.y})`}>
      <ellipse className="plinth-shadow" cx="0" cy="16" rx="20" ry="5.5" />
      <g className="plinth-stone" transform={`translate(0 ${lift})`}>
        <polygon className="plinth-side-l" points="-22,1 0,11 0,20 -22,10" />
        <polygon className="plinth-side-r" points="0,11 22,1 22,10 0,20" />
        <polygon className="plinth-top" points="0,-9 22,1 0,11 -22,1" />
        <text className="plinth-num" x="0" y="4" textAnchor="middle">
          {String(index + 1).padStart(2, '0')}
        </text>
      </g>
    </g>
  )
}

function CampaignTraveler({
  d,
  index,
  fractions,
  stops,
}: {
  d: string
  index: number
  fractions: readonly number[]
  stops: readonly { x: number; y: number }[]
}) {
  const measure = useRef<SVGPathElement>(null)
  const along = useRef(0)
  const placed = useRef(false)
  const routeKey = useRef(d)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    const path = measure.current
    if (!path) return
    const total = path.getTotalLength()
    const end = fractions[index] * total
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const plant = (length: number, lift: number, settled: boolean) => {
      const at = path.getPointAtLength(length)
      const stop = stops[index]
      setPos({
        x: settled ? stop.x : at.x,
        y: (settled ? stop.y : at.y) - 4 - lift,
      })
    }
    const turned = routeKey.current !== d
    routeKey.current = d
    if (!placed.current || reduce || turned) {
      placed.current = true
      along.current = end
      plant(end, 8, true)
      return
    }
    const start = along.current
    const t0 = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 920)
      const eased = 1 - (1 - t) ** 3
      const at = start + (end - start) * eased
      along.current = at
      const lift = t > 0.74 ? ((t - 0.74) / 0.26) * 8 : 0
      plant(at, lift, t === 1)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [d, fractions, index, stops])

  return (
    <>
      <path ref={measure} d={d} fill="none" stroke="none" />
      {pos ? (
        <g className="campaign-traveler" transform={`translate(${pos.x} ${pos.y})`}>
          <ellipse className="traveler-shadow" cx="0" cy="3" rx="10" ry="3" />
          <g className="traveler-body">
            <path className="traveler-scarf" d="M-2 -12 C-8 -10 -12 -15 -11 -8" />
            <path className="traveler-cloak" d="M0 -18 L8 0 L-6 0 Z" />
            <circle className="traveler-head" cx="0.6" cy="-22" r="3.6" />
          </g>
        </g>
      ) : null}
    </>
  )
}

type Point = { x: number; y: number }
type Stop = Point & { row: number; col: number }
type Arrow = { x: number; y: number; deg: number }

function buildLayout(count: number, width: number) {
  const compact = width < 520
  const padX = compact ? 24 : PAD_X
  const minSlot = compact ? 132 : MIN_SLOT
  const padTop = compact ? 46 : PAD_TOP
  const rowGap = compact ? 108 : ROW_GAP
  const labelBelow = compact ? 88 : LABEL_BELOW
  const turnR = compact ? 18 : TURN_R
  const columns = Math.max(1, Math.min(count, Math.floor((width - padX * 2) / minSlot)))
  const slot = (width - padX * 2) / columns
  const rows = Math.ceil(count / columns)
  const single = rows === 1 && count > 1
  const stops: Stop[] = Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns)
    const place = index % columns
    const col = row % 2 === 0 ? place : columns - 1 - place
    const x = padX + slot * col + slot / 2
    const y = padTop + row * rowGap + (single && index % 2 === 1 ? -WAVE : 0)
    return { x, y, row, col }
  })
  const route = buildRoute(stops, columns, slot, turnR)
  const height = (stops[stops.length - 1]?.y ?? padTop) + (single ? WAVE : 0) + labelBelow
  return { stops, columns, rows, slot, width, height, single, ...route }
}

function buildRoute(stops: readonly Stop[], columns: number, slot: number, turnR: number) {
  const samples: Point[][] = []
  let d = stops.length ? `M ${n(stops[0].x)} ${n(stops[0].y)}` : ''
  for (let index = 1; index < stops.length; index++) {
    const from = stops[index - 1]
    const to = stops[index]
    const piece = from.row === to.row ? linkPiece(from, to) : turnPiece(from, to, columns, slot, turnR)
    d += piece.d
    samples.push(piece.samples)
  }
  const lengths = samples.map(pieceLength)
  const total = lengths.reduce((sum, len) => sum + len, 0) || 1
  const fractions = [0]
  let walked = 0
  for (const len of lengths) {
    walked += len
    fractions.push(walked / total)
  }
  const arrows: (Arrow | null)[] = samples.map((points) => arrowOn(points))
  return { d, fractions, arrows }
}

function linkPiece(from: Point, to: Point) {
  const dx = to.x - from.x
  const c1 = { x: from.x + dx * 0.45, y: from.y }
  const c2 = { x: from.x + dx * 0.55, y: to.y }
  return {
    d: ` C ${n(c1.x)} ${n(c1.y)}, ${n(c2.x)} ${n(c2.y)}, ${n(to.x)} ${n(to.y)}`,
    samples: cubicSamples(from, c1, c2, to),
  }
}

function turnPiece(from: Stop, to: Stop, columns: number, slot: number, turnR: number) {
  const side = from.row % 2 === 0 ? 1 : -1
  const outward = columns === 1 ? 72 : slot / 2 + 8
  const rail = from.x + side * outward
  const dir = to.y >= from.y ? 1 : -1
  const r = Math.min(turnR, Math.abs(to.y - from.y) / 2 - 4)
  const knee = { x: rail - side * r, y: from.y }
  const drop = { x: rail, y: from.y + dir * r }
  const rise = { x: rail, y: to.y - dir * r }
  const back = { x: rail - side * r, y: to.y }
  const samples = [from]
  appendLine(samples, from, knee)
  appendQuad(samples, knee, { x: rail, y: from.y }, drop)
  appendLine(samples, drop, rise)
  appendQuad(samples, rise, { x: rail, y: to.y }, back)
  appendLine(samples, back, to)
  const d = [
    ` L ${n(knee.x)} ${n(knee.y)}`,
    ` Q ${n(rail)} ${n(from.y)}, ${n(drop.x)} ${n(drop.y)}`,
    ` L ${n(rise.x)} ${n(rise.y)}`,
    ` Q ${n(rail)} ${n(to.y)}, ${n(back.x)} ${n(back.y)}`,
    ` L ${n(to.x)} ${n(to.y)}`,
  ].join('')
  return { d, samples }
}

function arrowOn(points: readonly Point[]): Arrow | null {
  const total = pieceLength(points)
  if (total < 8) return null
  const at = pointAlong(points, total * 0.42)
  const ahead = pointAlong(points, Math.min(total, total * 0.42 + 12))
  const deg = Math.atan2(ahead.y - at.y, ahead.x - at.x) * (180 / Math.PI)
  return { x: at.x, y: at.y, deg }
}

function pointAlong(points: readonly Point[], distance: number) {
  let left = distance
  for (let index = 1; index < points.length; index++) {
    const step = Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y)
    if (left <= step || index === points.length - 1) {
      const t = step === 0 ? 0 : left / step
      return {
        x: points[index - 1].x + (points[index].x - points[index - 1].x) * t,
        y: points[index - 1].y + (points[index].y - points[index - 1].y) * t,
      }
    }
    left -= step
  }
  return points[points.length - 1]
}

function pieceLength(points: readonly Point[]) {
  let length = 0
  for (let index = 1; index < points.length; index++) {
    length += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y)
  }
  return length
}

function appendLine(samples: Point[], from: Point, to: Point) {
  for (let step = 1; step <= 6; step++) {
    const t = step / 6
    samples.push({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t })
  }
}

function appendQuad(samples: Point[], from: Point, control: Point, to: Point) {
  for (let step = 1; step <= 8; step++) {
    const t = step / 8
    const u = 1 - t
    samples.push({
      x: u * u * from.x + 2 * u * t * control.x + t * t * to.x,
      y: u * u * from.y + 2 * u * t * control.y + t * t * to.y,
    })
  }
}

function cubicSamples(from: Point, c1: Point, c2: Point, to: Point) {
  const samples = [from]
  for (let step = 1; step <= 12; step++) {
    const t = step / 12
    const u = 1 - t
    samples.push({
      x: u ** 3 * from.x + 3 * u ** 2 * t * c1.x + 3 * u * t ** 2 * c2.x + t ** 3 * to.x,
      y: u ** 3 * from.y + 3 * u ** 2 * t * c1.y + 3 * u * t ** 2 * c2.y + t ** 3 * to.y,
    })
  }
  return samples
}

function n(value: number) {
  return Math.round(value * 10) / 10
}
