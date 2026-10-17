import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CurrentTask } from '@/components/learning/CurrentTask'
import { RichBlocks } from '@/components/RichBlocks'
import { aiNoteRef } from '@/data/aiNoteIndex'
import { findLesson, loadFullLesson, prefetchLessonBody } from '@/data/curriculum'
import { deliverableShort, FROZEN_DELIVERABLES } from '@/data/deliverableMap'
import { gateAdvise, gateEdition, gateVerifyFill, passFlashLine, verifyFace, verifyFaceLabel, verifyItemsForGate } from '@/data/gateVerify'
import { PATHS, campScene, deliverableKey, gateCleared, gateMark, nextInGate, requiredSlotsOf, settleLine, type PathGate } from '@/data/learningPaths'
import { bossQuest, questFace, sideQuests } from '@/data/questBoard'
import CountUp from '@/components/bits/CountUp'
import { SKILL_VIEWS, skillBoardState, skillLessonIds, skillProgress, skillSceneTitle, type SkillGlow } from '@/data/learningSkills'
import { SkillReturn } from '@/components/learning/SkillReturn'
import { bossGateFor } from '@/data/bossExam'
import { drillBlockFaces } from '@/data/drillOutline'
import { describeGate, pathExamCleared } from '@/data/drillRules'
import { ORDER_SCALE_GATE, ORDER_SCALE_RUBRIC } from '@/data/orderScaleGate'
import { SIDE_TRACKS } from '@/data/sideTracks'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useLearningSlice } from '@/state/progress'
import { useShallow } from 'zustand/react/shallow'
import { markSceneReady } from '@/transition/jumpBudget'
import type { Lesson } from '@/types/curriculum'

const path = PATHS.architect
const stages = path.gates

const MIN_SLOT = 136
const PAD_X = 48
const PAD_TOP = 80
const ROW_GAP = 136
const WAVE = 18
const TURN_R = 28
const LABEL_BELOW = 108

function pickedIndex(raw: string | null, length: number) {
  if (raw == null || raw === '') return -1
  const index = Number(raw)
  if (!Number.isInteger(index) || index < 0 || index >= length) return -1
  return index
}

function bossMeter(play: { cleared: boolean; open: { answered: number; total: number } | null; last: { correct: number; total: number } | null }, total: number) {
  if (play.cleared) return '已通过'
  if (play.open) return `${play.open.answered}/${total}`
  if (play.last) return `${play.last.correct}/${play.last.total}`
  return `0/${total}`
}

function gateStatus(stage: PathGate, index: number, finished: boolean, sequenceIndex: number, openIndex: number) {
  if (finished) return '已过'
  if (index === sequenceIndex && openIndex >= 0) return '进行中'
  return gateMark(stage)
}

const IGNITE_SLOTS: { x: number; y: number; focus?: boolean }[] = [
  { x: 28, y: 34 },
  { x: 88, y: 16 },
  { x: 156, y: 38 },
  { x: 112, y: 66, focus: true },
  { x: 214, y: 16 },
  { x: 262, y: 46 },
  { x: 304, y: 22 },
  { x: 46, y: 84 },
  { x: 188, y: 84 },
  { x: 246, y: 78 },
]

const IGNITE_LINKS: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [0, 7], [3, 7],
  [2, 3], [2, 4], [4, 5], [5, 6],
  [3, 8], [5, 9], [8, 9],
]

function igniteChart(glow: Record<string, SkillGlow>, activeId: string) {
  const rest = SKILL_VIEWS.filter((item) => item.id !== activeId)
  const ranked = [
    ...rest.filter((item) => glow[item.id] === 'lit'),
    ...rest.filter((item) => glow[item.id] === 'ready'),
    ...rest.filter((item) => glow[item.id] !== 'lit' && glow[item.id] !== 'ready'),
  ]
  let cursor = 0
  return IGNITE_SLOTS.map((slot) => {
    if (slot.focus && activeId) {
      return { ...slot, id: activeId, light: glow[activeId] ?? 'research' }
    }
    const item = ranked[cursor]
    cursor += 1
    const light = item ? glow[item.id] ?? 'dim' : 'dim'
    return { ...slot, id: item?.id ?? `empty-${slot.x}`, light }
  })
}

function sceneNodes(gate: PathGate, done: Set<string>, nextId: string) {
  return requiredSlotsOf(gate.lessons).map((slot) => {
    const readId = slot.find((id) => done.has(id))
    const id = readId || slot[0]
    const lesson = findLesson(id)
    const finished = Boolean(readId)
    const live = !finished && slot.includes(nextId)
    return {
      id,
      title: lesson ? shortTitle(lesson.title) : id,
      status: finished ? '已记下' : live ? '进行中' : '',
      done: finished,
      boss: false,
    }
  })
}

export function PathPage() {
  const progress = useLearningSlice(useShallow((state) => ({
    done: state.done,
    pathChecks: state.pathChecks,
    aiDone: state.aiDone,
    skillScene: state.skillScene,
    skipVerify: state.skipVerify,
    learning: state.learning,
    remember: state.remember,
    togglePathCheck: state.togglePathCheck,
    skipGateVerify: state.skipGateVerify,
    setLearningPause: state.setLearningPause,
    applyQuest: state.applyQuest,
    drillLog: state.drill.log,
  })))
  const location = useLocation()
  const navigate = useNavigate()
  const stageCleared = (stage: PathGate) => gateCleared(
    stage,
    progress.done,
    progress.pathChecks,
    pathExamCleared(stage.id, progress.drillLog),
  )
  const [params, setParams] = useSearchParams()
  const openIndex = stages.findIndex((stage) => !stageCleared(stage))
  const sequenceIndex = openIndex === -1 ? stages.length - 1 : openIndex
  const upcomingId = nextInGate(stages[sequenceIndex], progress.done) || ''
  useEffect(() => {
    if (upcomingId) prefetchLessonBody(upcomingId)
    markSceneReady(location.pathname)
  }, [location.pathname, upcomingId])
  const requested = stages.findIndex((stage) => stage.id === params.get('gate'))
  const currentIndex = requested >= 0 ? requested : sequenceIndex
  const examCamp = params.get('gate') === ORDER_SCALE_GATE.id

  function activeGateId() {
    if (params.get('gate') === ORDER_SCALE_GATE.id) return ORDER_SCALE_GATE.id
    const index = stages.findIndex((stage) => stage.id === params.get('gate'))
    return stages[index >= 0 ? index : sequenceIndex].id
  }

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

  function openBoss(taskId?: string) {
    const query = new URLSearchParams()
    query.set('boss', 'core')
    if (taskId) query.set('scene', taskId)
    setParams(query, { replace: true })
  }

  function leaveDetail() {
    setParams(new URLSearchParams(), { replace: true })
  }

  function leaveBossScene() {
    const query = new URLSearchParams()
    query.set('boss', 'core')
    setParams(query, { replace: true })
  }

  function enterLesson(id: string) {
    const lesson = findLesson(id)
    if (!lesson) return
    progress.remember(id)
    navigate(lessonPath(lesson))
  }

  function openExam() {
    const query = new URLSearchParams()
    query.set('gate', ORDER_SCALE_GATE.id)
    setParams(query, { replace: true })
  }

  function openDeliver(index: number) {
    const query = new URLSearchParams()
    query.set('gate', activeGateId())
    query.set('deliver', String(index))
    setParams(query, { replace: true })
  }

  function openVerify(id: string) {
    const query = new URLSearchParams()
    query.set('gate', activeGateId())
    query.set('verify', id)
    setParams(query, { replace: true })
  }

  function leaveScene() {
    const query = new URLSearchParams()
    query.set('gate', activeGateId())
    setParams(query, { replace: true })
  }

  const camp = examCamp ? ORDER_SCALE_GATE : (stages[currentIndex] ?? stages[sequenceIndex])
  const campIndex = examCamp ? -1 : stages.indexOf(camp)
  const exam = examCamp ? undefined : bossGateFor(camp.id)
  const examPlay = exam ? describeGate({ log: progress.drillLog }, exam.id) : null
  const done = new Set(progress.done)
  const checks = new Set(progress.pathChecks ?? [])
  const slots = requiredSlotsOf(camp.lessons)
  const readSlots = slots.filter((slot) => slot.some((id) => done.has(id))).length
  const delivered = camp.outputs.filter((_, index) => checks.has(deliverableKey(camp.id, index))).length
  const scene = campScene(camp, progress.done)
  const nextId = scene.lessonId || ''
  useEffect(() => {
    if (nextId && nextId !== upcomingId) prefetchLessonBody(nextId)
  }, [nextId, upcomingId])
  const nextLesson = nextId ? findLesson(nextId) : undefined
  const nextName = nextLesson ? shortTitle(nextLesson.title) : undefined
  const settledRaw = location.state
  const settledId = settledRaw && typeof settledRaw === 'object' && 'settled' in settledRaw
    ? String((settledRaw as { settled?: string }).settled || '')
    : ''
  const settle = settleLine(settledId, camp.lessons.map((lesson) => lesson.id), progress.done, nextName)
  const pause = progress.learning.pause

  const quests = progress.learning.quests ?? []
  const sides = sideQuests()
  const boss = bossQuest()
  const sideTrack = SIDE_TRACKS.find((item) => item.id === params.get('side'))
  const bossPage = params.get('boss') === 'core'
  const bossSceneId = bossPage ? params.get('scene') || '' : ''
  const inGate = Boolean(params.get('gate') && (examCamp || stages.some((stage) => stage.id === params.get('gate'))))
  const drillBlocks = drillBlockFaces(progress.drillLog)
  const drillPlanted = (() => {
    const live = drillBlocks.findIndex((block) => block.faces.some((face) => face.status === 'live'))
    if (live >= 0) return live
    return drillBlocks.findIndex((block) => block.faces.some((face) => face.status !== 'cleared'))
  })()
  const sideFaces = sides.map((item) => questFace(item, quests))
  const sideLive = sideFaces.findIndex((face) => face !== 'cleared' && face !== 'starred')
  const bossFace = questFace(boss, quests)
  const bossDone = bossFace === 'cleared' || bossFace === 'starred'
  const bossStep = quests.find((row) => row.id === boss.id)?.step ?? 0
  const bossNodes = boss.milestones.map((item, index) => {
    const grade = item.title.split(' · ')[0] || item.title
    const finished = bossDone || bossStep > index
    const live = !bossDone && bossStep === index
    return {
      id: item.taskId || item.id,
      title: grade,
      status: finished ? '已过' : live ? '进行中' : '',
      done: finished,
      boss: true,
      detail: item.title.includes(' · ') ? item.title.split(' · ').slice(1).join(' · ') : item.title,
      index,
      taskId: item.taskId,
    }
  })
  const bossLive = bossNodes.findIndex((item) => item.status === '进行中')
  const bossPick = bossNodes.find((item) => item.id === bossSceneId || item.taskId === bossSceneId)
  const [bossMark, setBossMark] = useState('')
  const [bossNotice, setBossNotice] = useState('')
  const [stoneFlash, setStoneFlash] = useState<{ id: string; text: string } | null>(null)
  const [passFlash, setPassFlash] = useState('')
  const canMarkBoss = Boolean(bossPick && (bossDone || bossPick.index === bossStep))
  const scenes = sceneNodes(camp, done, nextId)
  const sceneLive = scenes.findIndex((item) => item.status === '进行中')
  const deliverRows = camp.outputs.map((text, index) => {
    const key = deliverableKey(camp.id, index)
    const row = FROZEN_DELIVERABLES.find((item) => item.legacyKey === key)
    const finished = checks.has(key)
    return {
      id: String(index),
      title: row ? deliverableShort(row.id, text.slice(0, 12)) : text.slice(0, 12),
      status: finished ? '已记下' : '',
      done: finished,
      boss: false,
      text,
      key,
    }
  })
  const deliverLive = deliverRows.findIndex((item) => !item.done)
  if (deliverLive >= 0) deliverRows[deliverLive] = { ...deliverRows[deliverLive], status: '进行中' }
  const deliverAt = pickedIndex(params.get('deliver'), deliverRows.length)
  const deliverPick = deliverAt >= 0 ? deliverRows[deliverAt] : undefined
  const verifyFill = gateVerifyFill(camp.id, progress.learning.attempts, progress.learning.evidence)
  const campEdition = gateEdition(stageCleared(camp), verifyFill)
  const titles = Object.fromEntries(stages.map((stage) => [stage.id, stage.learnTitle]))
  const satisfied = new Set(stages.flatMap((stage) => {
    const finished = stageCleared(stage)
    const edition = gateEdition(finished, gateVerifyFill(stage.id, progress.learning.attempts, progress.learning.evidence))
    return finished || edition.mark === '新版已通过' ? [stage.id] : []
  }))
  const advise = gateAdvise({
    requires: camp.requires,
    titles,
    satisfied,
    skipped: progress.skipVerify.includes(camp.id),
    hasVerify: verifyItemsForGate(camp.id).length > 0,
  })
  const verifyRows = verifyItemsForGate(camp.id).map((item) => {
    const face = verifyFace(item.id, progress.learning.attempts, progress.learning.evidence)
    // 石台下字宽有限：题目前缀压短；进阶题已有「进阶 ·」，不再叠「选 ·」。
    const bare = item.kind === 'exam'
      ? item.title.replace(/^笔试\s*/, '').trim()
      : shortTitle(item.title)
    const label = item.tier === 'advanced'
      ? `进阶 · ${bare}`
      : item.kind === 'exam'
        ? `${camp.id === 'g-order-scale' ? '笔' : '选'} · ${bare}`
        : `问 · ${bare}`
    const evidenceStatus = face === 'idle' ? '' : verifyFaceLabel(face)
    return {
      id: item.id,
      title: label,
      tier: item.tier,
      status: item.tier === 'advanced'
        ? (face === 'idle' ? (advise.stone === '建议先完成' ? '建议先完成' : '进阶') : '进阶记下')
        : (evidenceStatus || advise.stone),
      done: item.tier === 'advanced' ? face !== 'idle' : face === 'passed',
      boss: false,
    }
  })
  const verifyLive = verifyRows.findIndex((item) => !item.done)
  if (verifyLive >= 0 && !verifyRows[verifyLive].status) {
    verifyRows[verifyLive] = { ...verifyRows[verifyLive], status: '进行中' }
  }
  const verifyId = params.get('verify')
  const verifyPick = verifyRows.find((item) => item.id === verifyId)
  const verifySig = verifyRows.map((row) => `${row.id}=${row.status}`).join('|')
  const seenFaces = useRef<string | null>(null)
  useEffect(() => {
    if (seenFaces.current === null) {
      seenFaces.current = verifySig
      return
    }
    if (seenFaces.current === verifySig) return
    const prev = new Map(seenFaces.current.split('|').filter(Boolean).map((part) => {
      const cut = part.lastIndexOf('=')
      return [part.slice(0, cut), part.slice(cut + 1)] as const
    }))
    const remain = verifyFill.total - verifyFill.passed
    for (const row of verifyRows) {
      const prior = prev.get(row.id)
      if (!prev.has(row.id) || prior === row.status) continue
      if (row.status === '进阶记下') {
        setStoneFlash({ id: row.id, text: `${row.title}。这不是认证，也不计入这一关的通过。` })
        continue
      }
      if (prior === '本地检查通过' || row.status !== '本地检查通过') continue
      if (remain === 0) setPassFlash(passFlashLine(camp.pass))
      else setStoneFlash({ id: row.id, text: `${row.title}本地检查通过。还剩 ${remain} 项。这不是认证。` })
    }
    seenFaces.current = verifySig
  }, [verifySig, verifyRows, verifyFill.total, verifyFill.passed, camp.pass])
  useEffect(() => {
    if (!stoneFlash) return
    const timer = window.setTimeout(() => setStoneFlash(null), 2000)
    return () => window.clearTimeout(timer)
  }, [stoneFlash])
  useEffect(() => {
    if (!passFlash) return
    const timer = window.setTimeout(() => setPassFlash(''), 2000)
    return () => window.clearTimeout(timer)
  }, [passFlash])

  const sideLessons = (sideTrack?.items ?? []).flatMap((item) =>
    item.lessons.flatMap((id) => {
      const lesson = findLesson(id)
      if (!lesson) return []
      const finished = done.has(id)
      return [{ id, title: shortTitle(lesson.title), status: finished ? '已记下' : '', done: finished, boss: false }]
    }),
  )
  const sideNodes = sideLessons.map((node) => node)
  const sideSceneLive = sideNodes.findIndex((item) => !item.done)
  if (sideSceneLive >= 0) sideNodes[sideSceneLive] = { ...sideNodes[sideSceneLive], status: '进行中' }

  const skillDone = new Set([...progress.done, ...progress.aiDone])
  const skillExists = (id: string) => (id.startsWith('ai:') ? Boolean(aiNoteRef(id)) : Boolean(findLesson(id)))
  const { glow: skillGlow, activeId: skillActive } = skillBoardState(skillDone, skillExists, progress.skillScene)
  const skillLit = SKILL_VIEWS.filter((item) => skillGlow[item.id] === 'lit').length
  const skillTotal = SKILL_VIEWS.length
  const skillActiveView = SKILL_VIEWS.find((item) => item.id === skillActive)
  const skillActiveTitle = skillActiveView?.title
  const skillActiveFill = skillActiveView
    ? skillProgress(skillLessonIds(skillActiveView.id), skillDone, skillExists)
    : null
  const igniteStars = igniteChart(skillGlow, skillActive)

  if (!inGate && !sideTrack && !bossPage) {
    return (
      <div className="path-stage path-world path-atlas">
        <header className="atlas-lead">
          <h1 className="atlas-title">架构师主线</h1>
          <p className="atlas-blurb">
            九关主路，从下一笔订单走到能推动上线。
            <br />
            支线并排，不挡主路。Boss 按档立台，进一档只打一场。
          </p>
          <button
            type="button"
            className="skill-ignite"
            onClick={() => navigate('/skills')}
          >
            <svg className="skill-ignite-chart" viewBox="0 0 328 100" aria-hidden="true">
              <defs>
                <radialGradient id="skill-ignite-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e7d7a4" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#e7d7a4" stopOpacity="0" />
                </radialGradient>
              </defs>
              {igniteStars.some((star) => star.focus) ? (
                <circle
                  cx={igniteStars.find((star) => star.focus)?.x}
                  cy={igniteStars.find((star) => star.focus)?.y}
                  r="36"
                  fill="url(#skill-ignite-glow)"
                />
              ) : null}
              {IGNITE_LINKS.map(([from, to]) => {
                const a = igniteStars[from]
                const b = igniteStars[to]
                const hot = a.light === 'research' || b.light === 'research' || a.light === 'lit' || b.light === 'lit'
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={hot ? 'is-hot' : undefined}
                  />
                )
              })}
              {igniteStars.map((star) => (
                <g key={star.id} className={`skill-ignite-star is-${star.light}`}>
                  {star.light === 'research' ? (
                    <circle className="skill-ignite-orbit" cx={star.x} cy={star.y} r="12" />
                  ) : (
                    <circle className="skill-ignite-ring" cx={star.x} cy={star.y} r={star.light === 'lit' ? 6.2 : 5.4} />
                  )}
                  <circle
                    className="skill-ignite-core"
                    cx={star.x}
                    cy={star.y}
                    r={star.light === 'research' ? 4.2 : star.light === 'lit' ? 3.2 : 2.2}
                  />
                </g>
              ))}
            </svg>
            <span className="skill-ignite-copy">
              <span className="skill-ignite-kicker">能力星图</span>
              <span className="skill-ignite-title">点亮技能树</span>
              <span className="skill-ignite-meta">
                <b><CountUp to={skillLit} duration={0.7} trigger="load" />/{skillTotal}</b>
                {' '}已点亮
                {progress.skillScene === 'all' ? '' : ` · ${skillSceneTitle(progress.skillScene)}`}
                {skillActiveTitle ? (
                  <>
                    {' · 正在点亮「'}
                    <span className="skill-ignite-now">{skillActiveTitle}</span>
                    {'」'}
                    {skillActiveFill && skillActiveFill.total > 0 ? ` ${skillActiveFill.read}/${skillActiveFill.total}` : ''}
                  </>
                ) : ' · 一课一火'}
              </span>
            </span>
            <span className="skill-ignite-go">
              <svg className="skill-ignite-flame" viewBox="0 0 36 48" aria-hidden="true">
                <path className="skill-ignite-flame-outer" d="M18 1.2c.8 7.6-6.4 10.4-6.2 19.6-.4 4.2-2.6 6.6-2.2 11.2 1.6 6.4 5.4 11.2 8.4 13.6 3-2.4 6.8-7.2 8.4-13.6.4-4.6-1.8-7-2.2-11.2.2-9.2-7-12-6.2-19.6z" />
                <path className="skill-ignite-flame-core" d="M18 20.5c1.8 3.6 4.6 5.6 4.4 10.2-.2 3.6-2 6.6-4.4 8-2.4-1.4-4.2-4.4-4.4-8-.2-4.6 2.6-6.6 4.4-10.2z" />
              </svg>
              点燃
            </span>
          </button>
        </header>
        <section className="atlas-panel is-main campaign-night" aria-label="主线">
          <div className="atlas-head">
            <p className="atlas-kicker">主线</p>
            <p className="atlas-role">主路必走 · {stages.length} 站</p>
          </div>
          <CampaignMap
            mapId="main"
            label={`${stages.length} 关`}
            hereIndex={sequenceIndex}
            liveIndex={openIndex >= 0 ? sequenceIndex : -1}
            onPick={selectGate}
            nodes={stages.map((stage, index) => {
              const finished = stageCleared(stage)
              const edition = gateEdition(finished, gateVerifyFill(stage.id, progress.learning.attempts, progress.learning.evidence))
              return {
                id: stage.id,
                title: stage.learnTitle,
                status: edition.mark || gateStatus(stage, index, finished, sequenceIndex, openIndex),
                done: finished,
                boss: false,
              }
            })}
          />
        </section>
        <div className="atlas-secondary">
          <section className="atlas-panel is-side campaign-night" aria-label="支线">
            <div className="atlas-head">
              <p className="atlas-kicker">支线</p>
              <p className="atlas-role">四路并进 · 不挡主路</p>
            </div>
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
          <section className="atlas-panel is-boss campaign-night" aria-label="Boss">
            <div className="atlas-head">
              <p className="atlas-kicker">Boss</p>
              <p className="atlas-role">{boss.milestones.length} 档石台 · 一档一场</p>
            </div>
            <CampaignMap
              mapId="boss"
              label="核心挑战"
              hereIndex={bossLive >= 0 ? bossLive : Math.max(0, bossNodes.length - 1)}
              liveIndex={bossLive}
              onPick={(index) => openBoss(bossNodes[index].id)}
              nodes={bossNodes}
            />
          </section>
        </div>
        <section className="atlas-panel atlas-exam campaign-night" aria-label="笔试专关">
          <div className="atlas-head">
            <p className="atlas-kicker">笔试专关</p>
            <p className="atlas-role">不计入九关 · 人打 {ORDER_SCALE_RUBRIC.total} 分</p>
          </div>
          <CampaignMap
            mapId="exam"
            label="高并发下单笔试"
            hereIndex={0}
            liveIndex={0}
            onPick={() => openExam()}
            nodes={[{
              id: ORDER_SCALE_GATE.id,
              title: ORDER_SCALE_GATE.learnTitle,
              status: '可挑战',
              done: false,
              boss: false,
            }]}
          />
        </section>
        <section className="atlas-panel atlas-drill-panel campaign-night" aria-label="选择题">
          <div className="atlas-head">
            <p className="atlas-kicker">选择题</p>
            <p className="atlas-role">不计入九关 · 答对 80% 过关</p>
          </div>
          {drillBlocks.map((block, blockIndex) => {
            const localLive = block.faces.findIndex((face) => face.status === 'live')
            const localOpen = block.faces.findIndex((face) => face.status !== 'cleared')
            const planted = blockIndex === drillPlanted
            const hereIndex = planted ? (localLive >= 0 ? localLive : localOpen) : -1
            const liveIndex = planted ? hereIndex : localOpen < 0 ? block.faces.length - 1 : -1
            return (
              <div key={block.id} className="atlas-drill-block">
                <div className="atlas-drill-head">
                  <p className="atlas-kicker">{block.title}</p>
                  {block.faces.length > 1 ? <p className="atlas-role">{block.faces.length} 门</p> : null}
                </div>
                <CampaignMap
                  mapId={`drill-${block.id}`}
                  label={block.title}
                  hereIndex={hereIndex}
                  liveIndex={liveIndex}
                  resting={!planted}
                  row
                  walkCleared
                  onPick={(index) => {
                    const road = block.faces[index]
                    if (!road) return
                    navigate(`/drill/${road.id}`, { state: { drillReturn: 'paths' } })
                  }}
                  nodes={block.faces.map((road) => ({
                    id: road.id,
                    title: road.title,
                    status: road.state,
                    done: road.status === 'cleared',
                    boss: false,
                  }))}
                />
              </div>
            )
          })}
        </section>
      </div>
    )
  }

  return (
    <div className="path-stage path-world">
      <p className="atlas-back">
        <button type="button" onClick={leaveDetail}>回总图</button>
        {deliverPick || verifyPick ? (
          <button type="button" onClick={leaveScene}>回这一关</button>
        ) : null}
        {bossPick ? (
          <button type="button" onClick={leaveBossScene}>回 Boss</button>
        ) : null}
      </p>
      <SkillReturn />
      {inGate && deliverPick && !verifyPick ? (
        <section className="deliver-step" aria-label={deliverPick.title}>
          <p className="path-note">这些勾选是自评，没有测试记录不算验证通过。</p>
          <button
            type="button"
            className="ink-seal"
            aria-pressed={deliverPick.done}
            onClick={() => {
              if (!deliverPick.done) {
                setStoneFlash({ id: deliverPick.id, text: `${deliverPick.title}已记下。这是自评，待复核。` })
              }
              progress.togglePathCheck(deliverPick.key)
            }}
          >
            <span className="ink-dot" aria-hidden="true" />
            <span>{deliverPick.text}</span>
          </button>
          {stoneFlash?.id === deliverPick.id ? <p className="path-note" role="status">{stoneFlash.text}</p> : null}
          <GateAnswers lessonIds={camp.lessons.map((lesson) => lesson.id)} />
        </section>
      ) : null}
      {inGate && verifyPick ? (
        <section className="deliver-step" aria-label={verifyPick.title}>
          {verifyPick.tier === 'advanced' ? (
            <p className="path-note">这一道是进阶。记下之后不计入这一关的通过，也不是认证。</p>
          ) : null}
          <CurrentTask
            focusId={verifyPick.id}
            isolate
            onDraftSaved={() => setStoneFlash({
              id: verifyPick.id,
              text: verifyPick.tier === 'advanced'
                ? `${verifyPick.title}。这不是认证，也不计入这一关的通过。`
                : `${verifyPick.title}已记下。这是自评，待复核。`,
            })}
          />
          {stoneFlash?.id === verifyPick.id ? <p className="path-note" role="status">{stoneFlash.text}</p> : null}
        </section>
      ) : null}
      {inGate && !deliverPick && !verifyPick ? (
        <div className="path-scenes campaign-night">
          <p className="scene-banner">{examCamp ? '笔试专关' : `第 ${campIndex + 1} 关`} · {camp.learnTitle}</p>
          {examCamp ? (
            <div className="path-note">
              <p>{ORDER_SCALE_RUBRIC.passLine}</p>
              <ul className="path-rubric">
                {ORDER_SCALE_RUBRIC.dimensions.map((item) => (
                  <li key={item.id}>{item.title} {item.points} 分 · {item.exams}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {passFlash ? <p className="path-note" role="status">{passFlash}</p> : null}
          {campEdition.note ? <p className="path-note">{campEdition.note}</p> : null}
          {advise.skipNote ? <p className="path-note">{advise.skipNote}</p> : null}
          {advise.unmet.length > 0 && !advise.skipNote ? (
            <p className="path-note path-advise">
              建议先完成
              {advise.unmet.map((item, index) => (
                <span key={item.id}>
                  {index ? '、' : ''}
                  <button type="button" onClick={() => selectGate(stages.findIndex((stage) => stage.id === item.id))}>「{item.title}」</button>
                </span>
              ))}
            </p>
          ) : null}
          {advise.canSkip ? (
            <p className="path-note">
              <button type="button" className="path-skip" onClick={() => progress.skipGateVerify(camp.id)}>跳过建议，直接验证</button>
            </p>
          ) : null}
          {settle ? <p className="encounter-settle">{settle}</p> : null}
          <div className="encounter-meters" aria-label="阅读、交付、Boss 与验证">
            <Meter name="阅读" value={readSlots} total={slots.length} label={`${readSlots}/${slots.length} 场`} />
            <Meter name="交付" value={delivered} total={camp.outputs.length} label={`${delivered}/${camp.outputs.length} 项`} />
            {exam && examPlay ? (
              <Meter name="Boss" value={examPlay.cleared ? exam.questionIds.length : examPlay.open?.answered ?? 0} total={exam.questionIds.length} label={bossMeter(examPlay, exam.questionIds.length)} />
            ) : null}
            {verifyFill.total ? (
              <Meter name="验证" value={verifyFill.started} total={verifyFill.total} label={`${verifyFill.started}/${verifyFill.total} 项`} />
            ) : null}
          </div>
          <p className="atlas-kicker">阅读</p>
          <CampaignMap
            mapId="scenes"
            label={`${camp.learnTitle}的阅读`}
            hereIndex={sceneLive >= 0 ? sceneLive : Math.max(0, scenes.length - 1)}
            liveIndex={sceneLive}
            onPick={(index) => enterLesson(scenes[index].id)}
            nodes={scenes}
          />
          <p className="atlas-kicker">交付</p>
          <CampaignMap
            mapId="deliver"
            label={`${camp.learnTitle}的交付`}
            hereIndex={deliverLive >= 0 ? deliverLive : Math.max(0, deliverRows.length - 1)}
            liveIndex={deliverLive}
            onPick={(index) => openDeliver(index)}
            nodes={deliverRows}
          />
          {stoneFlash && deliverRows.some((row) => row.id === stoneFlash.id) ? <p className="path-note" role="status">{stoneFlash.text}</p> : null}
          {exam && examPlay ? (
            <>
              <p className="atlas-kicker">Boss</p>
              <p className="path-note">这一关每一课一题。答完这一场，正确率达到 80% 才算通过。当场判分，不是认证。</p>
              <CampaignMap
                mapId="gate-boss"
                label={`${camp.learnTitle}的考试`}
                hereIndex={0}
                liveIndex={examPlay.cleared ? -1 : 0}
                onPick={() => navigate(`/drill/boss/${exam.id}`, { state: { drillReturn: 'gate', gateId: camp.id } })}
                nodes={[{
                  id: exam.id,
                  title: '打 Boss',
                  status: examPlay.cleared ? '已通过' : examPlay.open ? `${examPlay.open.answered}/${exam.questionIds.length}` : '可以开始',
                  done: examPlay.cleared,
                  boss: true,
                }]}
              />
            </>
          ) : null}
          {verifyRows.length ? (
            <>
              <p className="atlas-kicker">验证</p>
              <CampaignMap
                mapId="verify"
                label={`${camp.learnTitle}的验证`}
                hereIndex={verifyLive >= 0 ? verifyLive : Math.max(0, verifyRows.length - 1)}
                liveIndex={verifyLive}
                onPick={(index) => openVerify(verifyRows[index].id)}
                nodes={verifyRows}
              />
              {stoneFlash && verifyRows.some((row) => row.id === stoneFlash.id) ? <p className="path-note" role="status">{stoneFlash.text}</p> : null}
              {verifyFill.passed > 0 && verifyFill.passed < verifyFill.total ? (
                <p className="path-note">还剩 {verifyFill.total - verifyFill.passed} 项。本地检查通过不是认证。</p>
              ) : null}
            </>
          ) : null}
          <p className="path-note">{verifyFill.note}</p>
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
        </div>
      ) : null}
      {sideTrack ? (
        <div className="path-scenes campaign-night">
          <p className="scene-banner">支线 · {sideTrack.title}</p>
          <CampaignMap
            mapId="side-scenes"
            label={`${sideTrack.title}的场次`}
            hereIndex={sideSceneLive >= 0 ? sideSceneLive : Math.max(0, sideNodes.length - 1)}
            liveIndex={sideSceneLive}
            onPick={(index) => enterLesson(sideNodes[index].id)}
            nodes={sideNodes}
          />
        </div>
      ) : null}
      {bossPage && !bossPick ? (
        <div className="path-scenes campaign-night">
          <p className="scene-banner">Boss · 核心挑战</p>
          <p className="path-note">{boss.objective}进一档，只打这一场。</p>
          <CampaignMap
            mapId="boss-scenes"
            label="核心挑战的档次"
            hereIndex={bossLive >= 0 ? bossLive : Math.max(0, bossNodes.length - 1)}
            liveIndex={bossLive}
            onPick={(index) => openBoss(bossNodes[index].id)}
            nodes={bossNodes}
          />
        </div>
      ) : null}
      {bossPage && bossPick ? (
        <section className="boss-stage" aria-label={bossPick.title}>
          <header className="boss-hero campaign-night">
            <p className="atlas-kicker">Boss · 第 {bossPick.index + 1} 档</p>
            <h1 className="boss-hero-title">{bossPick.title}</h1>
            <p className="boss-hero-goal">{bossPick.detail}</p>
            <p className="boss-hero-meter">
              {bossPick.done ? '这一档已记下' : canMarkBoss ? '当前这一档' : '可先看题；记下要按顺序'}
            </p>
          </header>
          {bossPick.taskId ? <CurrentTask focusId={bossPick.taskId} isolate /> : null}
          <div className="boss-mark">
            {canMarkBoss ? (
              <>
                <label className="quest-mark">
                  这一档做到哪
                  <input
                    value={bossMark}
                    maxLength={80}
                    disabled={bossDone && bossPick.done}
                    onChange={(event) => setBossMark(event.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className="encounter-go"
                  disabled={bossDone || bossPick.done}
                  onClick={() => {
                    const saved = progress.applyQuest({ type: 'advance', id: boss.id, mark: bossMark })
                    setBossNotice(saved.ok ? (saved.granted.length ? `已发放：${saved.granted.map((item) => item.title).join('、')}。` : '这一档已记下。') : saved.issue)
                    if (saved.ok) setBossMark('')
                  }}
                >
                  {bossPick.done || bossDone ? '这一档已记下' : `记下：${bossPick.title}`}
                </button>
              </>
            ) : (
              <p className="path-note">前面一档还没记下。可以先读这一档的题，进度仍按顺序走。</p>
            )}
            {bossNotice ? <p className="quest-notice" role="status">{bossNotice}</p> : null}
          </div>
        </section>
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
  resting = false,
  row = false,
  walkCleared = false,
  onPick,
}: {
  mapId: string
  label: string
  nodes: MapNode[]
  hereIndex: number
  liveIndex: number
  /** 这一路现在没人站着。已走完的路仍画满，不抬石台，也不放剑客。 */
  resting?: boolean
  /** 每一行都从左往右。排满换到下一行的最左边，不倒过来，也不横滑出屏幕。 */
  row?: boolean
  /** 绿路只画到最后一座已通过的石台。还没通过的路保持淡线。 */
  walkCleared?: boolean
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
  const layout = useMemo(() => buildLayout(nodes.length, boardWidth || MIN_SLOT + PAD_X * 2, row), [boardWidth, nodes.length, row])
  const lastDone = nodes.reduce((found, node, index) => (node.done ? index : found), -1)
  const walkIndex = walkCleared
    ? lastDone
    : liveIndex >= 0 ? liveIndex : resting ? -1 : Math.max(0, nodes.length - 1)
  const stand = hereIndex >= 0 ? hereIndex : resting ? -1 : walkIndex
  const showLive = !resting || hereIndex >= 0
  const arrow = showLive && liveIndex >= 0 ? layout.arrows[liveIndex] ?? null : null
  const maskId = `campaign-walked-${mapId}`
  return (
    <div className="path-map-scroll" id={mapId === 'main' ? 'path-map' : undefined} ref={scrollRef}>
      <div
        className={layout.rows === 1 ? 'path-map is-single' : 'path-map'}
        style={{ width: layout.width, height: layout.height, ['--slot' as string]: `${layout.slot}px` }}
      >
        <svg className={walkCleared ? 'campaign is-quiet-road' : 'campaign'} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
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
            const live = showLive && index === liveIndex
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

function GateAnswers({ lessonIds }: { lessonIds: readonly string[] }) {
  const [rows, setRows] = useState<Lesson[]>([])
  const key = lessonIds.join('|')
  useEffect(() => {
    let cancel = false
    const ids = key.split('|').filter(Boolean)
    Promise.all(ids.map((id) => loadFullLesson(id))).then((loaded) => {
      if (cancel) return
      setRows(loaded.filter((item): item is Lesson => Boolean(item && (item.answer || item.references.length))))
    })
    return () => {
      cancel = true
    }
  }, [key])
  if (!rows.length) return null
  return (
    <div className="deliver-reference">
      {rows.map((lesson) => (
        <div key={lesson.id}>
          {lesson.answer ? (
            <details className="current-task-answer">
              <summary>先自己写，再看参考答案 · {shortTitle(lesson.title)}</summary>
              <RichBlocks text={lesson.answer} className="body" />
            </details>
          ) : null}
          {lesson.references.length ? (
            <div className="ref-list">
              <p className="current-task-kicker">依据 · {shortTitle(lesson.title)}</p>
              {lesson.references.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
              ))}
            </div>
          ) : null}
        </div>
      ))}
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
    if (!Number.isFinite(total) || !Number.isFinite(end)) {
      const stop = stops[index]
      if (!stop) return
      placed.current = true
      setPos({ x: stop.x, y: stop.y - 12 })
      return
    }
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
          <ellipse className="traveler-shadow" cx="1" cy="5" rx="13" ry="3.2" />
          <g className="traveler-body">
            <g className="traveler-figure">
              <path className="traveler-cape" d="M-2 -26 C-14 -24 -16 -10 -9 3 C-12 -6 -10 -18 -2 -22 Z" />
              <path className="traveler-leg is-back" d="M-1.5 -9 L-9 1.2 L-5.6 2.2 L0.4 -7.2 Z" />
              <path className="traveler-leg is-front" d="M1.5 -9 L9 0.6 L5.8 1.8 L-0.2 -7.2 Z" />
              <path className="traveler-cloak" d="M-7.5 -27.5 C-2 -29.5 4 -29 8 -26 L5.2 -8.5 C1 -6.8 -1 -6.8 -4.2 -8.5 Z" />
              <path className="traveler-hood" d="M-4.6 -27 L-3.2 -38.5 L1.2 -41 L5.4 -32 L4.2 -26.2 Z" />
              <path className="traveler-visor" d="M-1.8 -33.2 L3.4 -32.2" />
              <path className="traveler-collar" d="M-5.2 -26.8 L6.2 -25.6" />
              <g transform="translate(6.6 -26)">
                <g className="traveler-swing">
                  <path className="traveler-blade" d="M2.6 -15 L8 -13.6 L5.4 -34 Z" />
                  <path className="traveler-edge" d="M5.1 -16.2 L5.3 -31" />
                  <path className="traveler-arm" d="M0 0 L3.8 -0.3 L5.4 -7.6 L1.6 -7 Z" />
                  <path className="traveler-hand" d="M2 -7.2 C0.9 -8.6 1.1 -12.2 3.5 -12.8 L4.2 -9.4 Z" />
                  <path className="traveler-fingers" d="M5 -7.4 C7.8 -8 8.2 -12.4 5.5 -13.2 L4.6 -9.6 Z" />
                  <path className="traveler-grip" d="M3.7 -6.4 L4.9 -15" />
                  <circle className="traveler-pommel" cx="3.4" cy="-6" r="1.9" />
                  <path className="traveler-guard" d="M2 -15.2 L10.2 -13.6" />
                </g>
              </g>
            </g>
          </g>
        </g>
      ) : null}
    </>
  )
}

type Point = { x: number; y: number }
type Stop = Point & { row: number; col: number }
type Arrow = { x: number; y: number; deg: number }

function buildLayout(count: number, width: number, row = false) {
  const compact = width < 520
  const narrow = width < 380
  const padX = narrow ? 16 : compact ? 24 : PAD_X
  const minSlot = row
    ? (narrow ? 118 : 112)
    : (narrow ? 118 : compact ? 132 : MIN_SLOT)
  const padTop = PAD_TOP
  const rowGap = narrow ? 100 : compact ? 108 : ROW_GAP
  const labelBelow = narrow ? 78 : compact ? 88 : LABEL_BELOW
  const turnR = narrow ? 14 : compact ? 18 : TURN_R
  const fit = Math.max(1, Math.floor((width - padX * 2) / minSlot))
  const columns = Math.max(1, Math.min(Math.max(count, 1), fit))
  const rows = Math.ceil(count / columns)
  const single = rows === 1 && count > 1
  const lineGap = row && rows > 1 ? rowGap + (narrow ? 28 : compact ? 16 : 8) : rowGap
  const slot = (width - padX * 2) / columns
  const stops: Stop[] = Array.from({ length: count }, (_, index) => {
    const line = Math.floor(index / columns)
    const place = index % columns
    const col = !row && line % 2 === 1 ? columns - 1 - place : place
    const x = padX + slot * col + slot / 2
    const y = padTop + line * lineGap + (single && index % 2 === 1 ? -WAVE : 0)
    return { x, y, row: line, col }
  })
  const route = buildRoute(stops, columns, slot, turnR, row, padX)
  const height = (stops[stops.length - 1]?.y ?? padTop) + (single ? WAVE : 0) + labelBelow
  return { stops, columns, rows, slot, width, height, single, ...route }
}

function buildRoute(stops: readonly Stop[], columns: number, slot: number, turnR: number, reading = false, padX = PAD_X) {
  const samples: Point[][] = []
  let d = stops.length ? `M ${n(stops[0].x)} ${n(stops[0].y)}` : ''
  const room = padX + slot / 2 - 6
  for (let index = 1; index < stops.length; index++) {
    const from = stops[index - 1]
    const to = stops[index]
    const piece = from.row === to.row
      ? linkPiece(from, to)
      : reading
        ? readTurn(from, to, slot, room)
        : turnPiece(from, to, columns, slot, turnR)
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
  const arrows: (Arrow | null)[] = samples.map((points, index) => {
    const wrapped = reading && stops[index].row !== stops[index + 1].row
    return arrowOn(points, wrapped ? 0.92 : 0.42)
  })
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

/** 一行排满后，从这一行末尾弯到下一行开头。竖线躲开课名，横线贴在课名下面。 */
function readTurn(from: Stop, to: Stop, slot: number, room: number) {
  const span = Math.max(48, to.y - from.y)
  const labelHalf = Math.min(132, Math.max(92, slot - 20)) / 2
  const out = Math.max(22, Math.min(room, labelHalf + 8))
  const railY = to.y - Math.min(40, span * 0.28)
  const r = Math.max(8, Math.min(14, out * 0.35, (railY - from.y) / 2 - 1, (to.y - railY) / 2 - 1))
  const knee = { x: from.x + out - r, y: from.y }
  const drop = { x: from.x + out, y: from.y + r }
  const railIn = { x: from.x + out, y: railY - r }
  const railStart = { x: from.x + out - r, y: railY }
  const railEnd = { x: to.x - out + r, y: railY }
  const fall = { x: to.x - out, y: railY + r }
  const approach = { x: to.x - out, y: to.y - r }
  const back = { x: to.x - out + r, y: to.y }
  const samples = [from]
  appendLine(samples, from, knee)
  appendQuad(samples, knee, { x: from.x + out, y: from.y }, drop)
  appendLine(samples, drop, railIn)
  appendQuad(samples, railIn, { x: from.x + out, y: railY }, railStart)
  appendLine(samples, railStart, railEnd)
  appendQuad(samples, railEnd, { x: to.x - out, y: railY }, fall)
  appendLine(samples, fall, approach)
  appendQuad(samples, approach, { x: to.x - out, y: to.y }, back)
  appendLine(samples, back, to)
  const d = [
    ` L ${n(knee.x)} ${n(knee.y)}`,
    ` Q ${n(from.x + out)} ${n(from.y)}, ${n(drop.x)} ${n(drop.y)}`,
    ` L ${n(railIn.x)} ${n(railIn.y)}`,
    ` Q ${n(from.x + out)} ${n(railY)}, ${n(railStart.x)} ${n(railStart.y)}`,
    ` L ${n(railEnd.x)} ${n(railEnd.y)}`,
    ` Q ${n(to.x - out)} ${n(railY)}, ${n(fall.x)} ${n(fall.y)}`,
    ` L ${n(approach.x)} ${n(approach.y)}`,
    ` Q ${n(to.x - out)} ${n(to.y)}, ${n(back.x)} ${n(back.y)}`,
    ` L ${n(to.x)} ${n(to.y)}`,
  ].join('')
  return { d, samples }
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

function arrowOn(points: readonly Point[], atFraction = 0.42): Arrow | null {
  const total = pieceLength(points)
  if (total < 8) return null
  const at = pointAlong(points, total * atFraction)
  const ahead = pointAlong(points, Math.min(total, total * atFraction + 12))
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
