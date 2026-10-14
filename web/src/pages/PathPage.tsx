import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { QuestBoard } from '@/components/learning/QuestBoard'
import { findLesson, prefetchLessonBody } from '@/data/curriculum'
import { PATHS, campScene, deliverableKey, encounterAction, encounterPhase, encounterPhaseLabel, gateCleared, gateMark, missingOutput, nextInGate, requiredSlotsOf, sceneSentence, settleLine, type PathGate } from '@/data/learningPaths'
import { bossQuest, questFace, sideQuests } from '@/data/questBoard'
import { SIDE_TRACKS } from '@/data/sideTracks'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
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
  const navigate = useNavigate()
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

  function selectGate(index: number) {
    const id = stages[index].id
    const query = new URLSearchParams()
    query.set('gate', id)
    setParams(query, { replace: true })
  }

  function openSide(id: string) {
    const query = new URLSearchParams()
    query.set('side', id)
    setParams(query, { replace: true })
  }

  function openBoss() {
    const query = new URLSearchParams()
    query.set('boss', 'core')
    setParams(query, { replace: true })
  }

  function leaveDetail() {
    setParams(new URLSearchParams(), { replace: true })
  }

  const camp = stages[currentIndex] ?? stages[sequenceIndex]
  const campIndex = stages.indexOf(camp)
  const done = new Set(progress.done)
  const checks = new Set(progress.pathChecks ?? [])
  const slots = requiredSlotsOf(camp.lessons)
  const readSlots = slots.filter((slot) => slot.some((id) => done.has(id))).length
  const delivered = camp.outputs.filter((_, index) => checks.has(deliverableKey(camp.id, index))).length
  const cleared = gateCleared(camp, progress.done, progress.pathChecks ?? [])
  const phase = encounterPhase(campIndex, sequenceIndex, cleared, readSlots, slots.length)
  const allDone = openIndex < 0
  const scene = campScene(camp, progress.done)
  const nextId = scene.lessonId || ''
  useEffect(() => {
    if (nextId && nextId !== upcomingId) prefetchLessonBody(nextId)
  }, [nextId, upcomingId])
  const nextItem = camp.lessons.find((lesson) => lesson.id === nextId)
  const nextLesson = nextId ? findLesson(nextId) : undefined
  const nextName = nextLesson ? shortTitle(nextLesson.title) : undefined
  const settledRaw = location.state
  const settledId = settledRaw && typeof settledRaw === 'object' && 'settled' in settledRaw
    ? String((settledRaw as { settled?: string }).settled || '')
    : ''
  const settle = settleLine(settledId, camp.lessons.map((lesson) => lesson.id), progress.done, nextName)
  const missing = missingOutput(camp, progress.pathChecks ?? [])
  const handIn = missing ? sceneSentence(missing) : ''
  const heading = phase === 'deliver'
    ? (handIn || camp.learnTitle)
    : phase === 'cleared' || !nextName
      ? camp.learnTitle
      : nextName
  const goal = phase === 'deliver'
    ? (missing && missing !== handIn ? missing : camp.pass)
    : phase === 'cleared'
      ? (allDone ? '九关的阅读和交付都已记下。' : '这一关已记下。')
      : sceneSentence(nextItem?.job || camp.how[0] || camp.pass)
  const action = settle && nextName && phase !== 'deliver' && phase !== 'cleared'
    ? nextName
    : allDone && phase === 'cleared'
      ? '九关都已记下'
      : encounterAction(phase)
  const pause = progress.learning.pause
  const pauseLabel = pause ? (pause.choice === 'day' ? '一天' : pause.choice === 'week' ? '一周' : '一个月') : ''

  function depart() {
    if (allDone && phase === 'cleared') return
    if (phase === 'cleared') {
      selectGate(sequenceIndex)
      return
    }
    if (phase === 'deliver' || !nextId) {
      const query = new URLSearchParams()
      query.set('gate', camp.id)
      query.set('focus', 'deliver')
      setParams(query, { replace: true })
      window.dispatchEvent(new CustomEvent('lab-open-gate', { detail: camp.id }))
      return
    }
    const lesson = findLesson(nextId)
    if (!lesson) return
    progress.remember(nextId)
    navigate(lessonPath(lesson))
  }

  const quests = progress.learning.quests ?? []
  const sides = sideQuests()
  const boss = bossQuest()
  const sideTrack = SIDE_TRACKS.find((item) => item.id === params.get('side'))
  const bossPage = params.get('boss') === 'core'
  const inGate = Boolean(params.get('gate') && stages.some((stage) => stage.id === params.get('gate')))
  const sideFaces = sides.map((item) => questFace(item, quests))
  const sideLive = sideFaces.findIndex((face) => face !== 'cleared' && face !== 'starred')
  const bossFace = questFace(boss, quests)
  const bossDone = bossFace === 'cleared' || bossFace === 'starred'

  if (!inGate && !sideTrack && !bossPage) {
    return (
      <div className="path-stage path-world path-atlas">
        <section aria-label="主线">
          <p className="atlas-kicker">主线</p>
          <CampaignMap
            mapId="main"
            label={`${stages.length} 关`}
            hereIndex={sequenceIndex}
            liveIndex={openIndex >= 0 ? sequenceIndex : -1}
            onPick={selectGate}
            nodes={stages.map((stage, index) => {
              const finished = gateCleared(stage, progress.done, progress.pathChecks)
              return {
                id: stage.id,
                title: stage.learnTitle,
                status: gateStatus(stage, index, finished, sequenceIndex, openIndex),
                done: finished,
                boss: false,
              }
            })}
          />
        </section>
        <section aria-label="支线">
          <p className="atlas-kicker">支线</p>
          <CampaignMap
            mapId="side"
            label="四条支线"
            hereIndex={sideLive >= 0 ? sideLive : 0}
            liveIndex={sideLive}
            onPick={(index) => openSide(sides[index].id.replace(/^side:/, ''))}
            nodes={sides.map((item, index) => {
              const face = sideFaces[index]
              const done = face === 'cleared' || face === 'starred'
              return {
                id: item.id,
                title: item.title,
                status: done ? '已过' : index === sideLive ? '进行中' : '',
                done,
                boss: false,
              }
            })}
          />
        </section>
        <section aria-label="Boss">
          <p className="atlas-kicker">Boss</p>
          <CampaignMap
            mapId="boss"
            label="Boss"
            hereIndex={0}
            liveIndex={bossDone ? -1 : 0}
            onPick={openBoss}
            nodes={[{
              id: boss.id,
              title: '核心挑战',
              status: bossDone ? '已过' : 'Boss',
              done: bossDone,
              boss: true,
            }]}
          />
        </section>
      </div>
    )
  }

  return (
    <div className="path-stage path-world">
      <p className="atlas-back">
        <button type="button" onClick={leaveDetail}>回总图</button>
      </p>
      {inGate ? (
        <>
      <header className="encounter here">
          {settle ? <p className="encounter-settle">{settle}</p> : null}
          <div className="here-row">
            <div>
              <p className="encounter-kicker">
                <span>第 {campIndex + 1} 关</span>
                <span className="dot" />
                <span>{camp.learnTitle}</span>
                <span className="dot" />
                <span>{encounterPhaseLabel(phase)}</span>
              </p>
              <h1 className="hero-title">{heading}</h1>
            </div>
            <button type="button" className="encounter-go" onClick={depart} disabled={allDone && phase === 'cleared'}>
              {action}
            </button>
          </div>
          <p className="encounter-goal">{goal}</p>
          <div className="encounter-meters">
            {phase === 'deliver' || phase === 'cleared' ? (
              <Meter name="交付" value={delivered} total={camp.outputs.length} />
            ) : (
              <Meter name="阅读" value={Math.max(0, scene.step - 1)} total={scene.total} label={`第 ${scene.step} 场 / 本关 ${scene.total} 场`} />
            )}
          </div>
          {campIndex !== sequenceIndex ? (
            <p className="encounter-note">
              进度在第 {sequenceIndex + 1} 关。
              {phase === 'playing' ? '这一场已经开始。' : phase === 'resume' ? '这一场可以补。' : '这一场仍可开始。'}
            </p>
          ) : null}
          {pauseLabel ? <p className="encounter-note">已暂停{pauseLabel}。草稿和证据都还在。</p> : null}
          <div className="encounter-pause">
            {pause ? (
              <button type="button" onClick={() => progress.setLearningPause(null)}>继续</button>
            ) : (
              <details>
                <summary>暂停</summary>
                <button type="button" onClick={() => progress.setLearningPause('day')}>一天</button>
                <button type="button" onClick={() => progress.setLearningPause('week')}>一周</button>
                <button type="button" onClick={() => progress.setLearningPause('month')}>一个月</button>
              </details>
            )}
          </div>
        </header>
      <QuestBoard gateId={camp.id} handIn={phase === 'deliver' || phase === 'cleared'} />
        </>
      ) : null}
      {sideTrack ? (
        <>
          <header className="encounter here">
            <p className="encounter-kicker">支线</p>
            <h1 className="hero-title">{sideTrack.title}</h1>
            <p className="encounter-goal">{sideTrack.objective}</p>
          </header>
          <QuestBoard sideId={sideTrack.id} />
        </>
      ) : null}
      {bossPage ? (
        <>
          <header className="encounter here">
            <p className="encounter-kicker">Boss</p>
            <h1 className="hero-title">核心挑战</h1>
            <p className="encounter-goal">{boss.objective}</p>
          </header>
          <QuestBoard bossPage />
        </>
      ) : null}
    </div>
  )
}

type MapNode = {
  id: string
  title: string
  status: string
  done: boolean
  boss: boolean
}

function CampaignMap({
  mapId,
  label,
  nodes,
  hereIndex,
  liveIndex,
  onPick,
}: {
  mapId: string
  label: string
  nodes: MapNode[]
  hereIndex: number
  liveIndex: number
  onPick: (index: number) => void
}) {
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
  const layout = useMemo(() => buildLayout(nodes.length, boardWidth || MIN_SLOT + PAD_X * 2), [boardWidth, nodes.length])
  const walkIndex = liveIndex >= 0 ? liveIndex : Math.max(0, nodes.length - 1)
  const stand = hereIndex >= 0 ? hereIndex : walkIndex
  const arrow = liveIndex >= 0 ? layout.arrows[liveIndex] ?? null : null
  const maskId = `campaign-walked-${mapId}`
  return (
    <div className="path-map-scroll" id={mapId === 'main' ? 'path-map' : undefined} ref={scrollRef}>
      <div
        className={layout.rows === 1 ? 'path-map is-single' : 'path-map'}
        style={{ width: layout.width, height: layout.height, ['--slot' as string]: `${layout.slot}px` }}
      >
        <svg className="campaign" viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <path d={layout.d} pathLength="1" fill="none" stroke="#fff" strokeWidth="16" strokeDasharray={`${layout.fractions[walkIndex] ?? 0} 1`} />
            </mask>
          </defs>
          <path className="campaign-road" d={layout.d} />
          <path className="campaign-road-shadow" d={layout.d} pathLength="1" strokeDasharray={`${layout.fractions[walkIndex] ?? 0} 1`} transform="translate(0 5)" />
          <path className="campaign-walk" d={layout.d} pathLength="1" strokeDasharray={`${layout.fractions[walkIndex] ?? 0} 1`} />
          <path className="campaign-gleam" d={layout.d} pathLength="1" mask={`url(#${maskId})`} />
          {arrow ? (
            <path className="campaign-arrow" d="M-5 -3.5 L4 0 L-5 3.5 Z" transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.deg})`} />
          ) : null}
          {layout.stops.map((stop, index) => (
            <Plinth
              key={nodes[index].id}
              stop={stop}
              index={index}
              done={nodes[index].done}
              here={index === stand}
              live={index === liveIndex}
              boss={nodes[index].boss}
            />
          ))}
          <CampaignTraveler d={layout.d} index={stand} fractions={layout.fractions} stops={layout.stops} />
        </svg>
        <ol className="path-stops" aria-label={label}>
          {nodes.map((node, index) => {
            const stop = layout.stops[index]
            const live = index === liveIndex
            return (
              <li key={node.id}>
                <button
                  type="button"
                  className={['path-stop', live ? 'is-live' : '', node.done ? 'is-done' : '', node.boss ? 'is-boss' : ''].filter(Boolean).join(' ')}
                  style={{ left: stop.x, top: stop.y }}
                  aria-current={index === stand ? 'page' : undefined}
                  onClick={() => onPick(index)}
                >
                  <span className="stop-hit" aria-hidden="true" />
                  <span className="route-name">{node.title}</span>
                  {node.status ? <span className="route-state">{node.status}</span> : null}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function Meter({ name, value, total, label }: { name: string; value: number; total: number; label?: string }) {
  const ratio = total ? Math.min(1, value / total) : 0
  return (
    <div className="encounter-meter">
      <span>{name}</span>
      <span>{label || `${value}/${total}`}</span>
      <span className="encounter-track" aria-hidden="true">
        <span style={{ width: `${Math.round(ratio * 100)}%` }} />
      </span>
    </div>
  )
}

function Plinth({
  stop,
  index,
  done,
  here,
  live,
  boss,
}: {
  stop: { x: number; y: number }
  index: number
  done: boolean
  here: boolean
  live: boolean
  boss?: boolean
}) {
  const lift = here ? -8 : 0
  return (
    <g className={['plinth', done ? 'is-done' : '', here ? 'is-here' : '', live ? 'is-live' : '', boss ? 'is-boss' : ''].filter(Boolean).join(' ')} transform={`translate(${stop.x} ${stop.y})`}>
      <ellipse className="plinth-shadow" cx="0" cy="16" rx="20" ry="5.5" />
      <g className="plinth-stone" transform={`translate(0 ${lift})`}>
        <polygon className="plinth-side-l" points="-22,1 0,11 0,20 -22,10" />
        <polygon className="plinth-side-r" points="0,11 22,1 22,10 0,20" />
        <polygon className="plinth-top" points="0,-9 22,1 0,11 -22,1" />
        {boss ? (
          <polygon className="plinth-gem" points="0,-18 6,-12 0,-6 -6,-12" />
        ) : (
          <text className="plinth-num" x="0" y="4" textAnchor="middle">
            {String(index + 1).padStart(2, '0')}
          </text>
        )}
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
