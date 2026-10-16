import type { CSSProperties } from 'react'
import { useLayoutEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CountUp from '@/components/bits/CountUp'
import { SkillSigil } from '@/components/learning/SkillSigil'
import { aiNoteRef } from '@/data/aiNoteIndex'
import { findLesson } from '@/data/curriculum'
import { MASTERY_GATES } from '@/data/masteryGates'
import {
  SKILL_LANES,
  SKILL_SCENES,
  SKILL_VIEWS,
  skillBoardState,
  skillFocusId,
  skillGroupFold,
  skillGroupsInLane,
  learningSkill,
  skillHasLocalCheck,
  skillLaneFolds,
  skillTitleHit,
  skillLessonIds,
  skillOpenIds,
  skillProgress,
  type SkillGlow,
  type SkillView,
} from '@/data/learningSkills'
import { lessonPath } from '@/data/routes'
import {
  SKILL_MILESTONES,
  SKILL_RANK_LABEL,
  clearedGateIds,
  fillPercent,
  practicedIds,
  readyChildTitles,
  skillPathAdvice,
  skillRank,
  trunkFills,
  type SkillRank,
} from '@/data/skillCycle'
import { useLearningSlice } from '@/state/progress'
import { useShallow } from 'zustand/react/shallow'

const titles = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, item.title]))

function SkillKnot() {
  return (
    <span className="skill-knot" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <polygon points="24,3 43,13.5 43,34.5 24,45 5,34.5 5,13.5" />
      </svg>
    </span>
  )
}
const gates = Object.fromEntries(MASTERY_GATES.map((gate) => [gate.id, gate.learnTitle]))

export function SkillsPage() {
  const progress = useLearningSlice(useShallow((state) => ({
    done: state.done,
    aiDone: state.aiDone,
    skillScene: state.skillScene,
    pathChecks: state.pathChecks,
    evidence: state.learning.evidence,
    remember: state.remember,
    rememberAi: state.rememberAi,
    setSkillScene: state.setSkillScene,
  })))
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const focusId = skillFocusId(params.get('skill'))
  const done = new Set([...progress.done, ...progress.aiDone])
  const exists = (id: string) => (id.startsWith('ai:') ? Boolean(aiNoteRef(id)) : Boolean(findLesson(id)))
  const bridge = SKILL_VIEWS.find((item) => item.bridge)
  const { glow, activeId } = skillBoardState(done, exists, progress.skillScene)
  const lit = SKILL_VIEWS.filter((item) => glow[item.id] === 'lit').length
  const total = SKILL_VIEWS.length
  const activeTitle = SKILL_VIEWS.find((item) => item.id === activeId)?.title
  const cleared = clearedGateIds(progress.done, progress.pathChecks)
  const practiced = practicedIds(glow, (id) => skillHasLocalCheck(id, progress.evidence), cleared)
  const trunks = trunkFills(glow, practiced)
  const advice = skillPathAdvice(progress.skillScene, glow)
  const adviceTitle = SKILL_SCENES.find((item) => item.id === advice.scene)?.title ?? ''
  const [query, setQuery] = useState('')
  const [forced, setForced] = useState<Record<string, boolean>>({})
  const searching = query.trim().length > 0
  const hitCount = searching ? SKILL_VIEWS.filter((item) => skillTitleHit(item.title, query)).length : 0

  useLayoutEffect(() => {
    const target = focusId || activeId
    if (!target) return
    const node = document.querySelector(`[data-skill="${CSS.escape(target)}"]`)
    if (!(node instanceof HTMLElement)) return
    const board = node.closest('.skill-board')
    const lane = node.closest('.skill-lane')
    if (board instanceof HTMLElement && lane instanceof HTMLElement && board.scrollWidth > board.clientWidth + 8) {
      const boardRect = board.getBoundingClientRect()
      const laneRect = lane.getBoundingClientRect()
      const clipped = laneRect.left < boardRect.left + 8 || laneRect.right > boardRect.right - 8
      if (focusId || clipped) {
        const shift = laneRect.left - boardRect.left - 12
        board.scrollLeft = Math.max(0, board.scrollLeft + shift)
      }
    }
    if (lane instanceof HTMLElement && lane.scrollHeight > lane.clientHeight + 8) {
      const laneRect = lane.getBoundingClientRect()
      const nodeRect = node.getBoundingClientRect()
      const clipped = nodeRect.top < laneRect.top + 28 || nodeRect.bottom > laneRect.bottom - 8
      if (focusId || clipped) {
        const shift = nodeRect.top - laneRect.top - 36
        lane.scrollTop = Math.max(0, lane.scrollTop + shift)
      }
    }
    if (!focusId) return
    const rect = node.getBoundingClientRect()
    if (rect.top < 64 || rect.bottom > window.innerHeight - 8) {
      node.scrollIntoView({ block: 'center', inline: 'nearest' })
    }
  }, [focusId, activeId])

  const leaveFor = (to: string, skillId: string) => {
    const hash = `#/skills?skill=${encodeURIComponent(skillId)}`
    if (window.location.hash !== hash) window.history.replaceState(window.history.state, '', hash)
    navigate(to, { state: { skillReturn: skillId } })
  }

  const openLesson = (skillId: string, lessonId: string) => {
    const note = aiNoteRef(lessonId)
    if (note) {
      progress.rememberAi(lessonId)
      leaveFor(`/ai/${note.section}/${note.key}`, skillId)
      return
    }
    const lesson = findLesson(lessonId)
    if (!lesson) return
    progress.remember(lessonId)
    leaveFor(lessonPath(lesson), skillId)
  }

  const renderCard = (card: SkillView, index: number, linked = false) => {
    const skill = learningSkill(card.id)
    const own = skillProgress(skillLessonIds(card.id), done, exists)
    const open = skillProgress(skillOpenIds(card.id), done, exists)
    const nextId = open.nextId
    const canOpen = Boolean(nextId && (aiNoteRef(nextId) || findLesson(nextId)))
    const parents = (skill?.allOf ?? []).map((id) => titles[id] || id)
    const gateTitle = card.gateId ? gates[card.gateId] : ''
    const local = skillHasLocalCheck(card.id, progress.evidence)
    const light = glow[card.id] ?? 'dim'
    const practicedMark = light === 'lit' && (local || Boolean(card.gateId && cleared.has(card.gateId)))
    const rank = skillRank(light, practicedMark)
    const nextNames = light === 'lit' ? readyChildTitles(card.id, glow) : []
    const status = glowLine(light, own.read, own.total, parents, nextNames, practicedMark)
    const nodeFill = own.total > 0 ? fillPercent(own.read, own.total) : light === 'lit' ? 100 : 0
    const body = (
      <>
        <SkillSigil id={card.id} />
        <span className="skill-copy">
          <h3>{card.title}</h3>
          <p>{status}</p>
        </span>
      </>
    )
    return (
      <li
        key={card.id}
        className="skill-relic"
        data-skill={card.id}
        data-focus={focusId === card.id ? '' : undefined}
        data-light={light}
        data-rank={rank}
        data-boost={local ? '' : undefined}
        data-linked={linked ? '' : undefined}
        style={{ '--i': String(index) } as CSSProperties}
      >
        {canOpen && nextId ? (
          <button type="button" className="skill-open" onClick={() => openLesson(card.id, nextId)}>
            {body}
            <span className="skill-meter" aria-hidden="true"><i style={{ width: `${nodeFill}%` }} /></span>
            <span className="skill-rank" aria-hidden="true">{rankLine(rank, light, own.read, own.total)}</span>
          </button>
        ) : (
          <div className="skill-open">
            {body}
            <span className="skill-meter" aria-hidden="true"><i style={{ width: `${nodeFill}%` }} /></span>
            <span className="skill-rank" aria-hidden="true">{rankLine(rank, light, own.read, own.total)}</span>
          </div>
        )}
        {local ? <p className="skill-note">本地检查让印章中心多一颗石。读完才点亮。这不是认证。</p> : null}
        {card.gateId && gateTitle ? (
          <button type="button" className="skill-gate" onClick={() => leaveFor(`/paths?gate=${card.gateId}`, card.id)}>
            在第 {MASTERY_GATES.findIndex((gate) => gate.id === card.gateId) + 1} 关练到 · {gateTitle}
          </button>
        ) : null}
      </li>
    )
  }

  return (
    <div className="path-stage path-world skill-page">
      <header className="atlas-lead skill-lead">
        <p className="atlas-back">
          <button type="button" onClick={() => navigate('/paths')}>回闯关</button>
        </p>
        <p className="skill-lead-kicker">能力星图</p>
        <h1 className="atlas-title">点亮技能树</h1>
        <p className="atlas-blurb skill-lead-blurb">
          未燃时全是暗星。读完一课，亮一枚印章。
          <br />
          先亮根，再燃枝。暗的是还没走到，不是被锁死。
        </p>
        <p className="skill-lead-meter">
          <span className="skill-lead-fire" aria-hidden="true" />
          <span className="skill-lead-bar" aria-hidden="true"><i style={{ width: `${fillPercent(lit, total)}%` }} /></span>
          <span>
            <CountUp to={lit} duration={0.7} trigger="load" />
            /{total} 已点亮
            {activeTitle ? ` · 正在点亮「${activeTitle}」` : progress.skillScene === 'all' ? '' : ' · 这条路上能开始的都点亮了'}
          </span>
        </p>
        <div className="skill-controls">
          <div className="skill-scenes" role="group" aria-label="正在点亮从哪条路里挑">
            {SKILL_SCENES.map((scene) => (
              <button
                key={scene.id}
                type="button"
                className="skill-scene"
                aria-pressed={progress.skillScene === scene.id}
                onClick={() => progress.setSkillScene(scene.id)}
              >
                {scene.title}
              </button>
            ))}
          </div>
          {progress.skillScene === 'all' ? null : (
            <p className="skill-scene-note">这条路只决定正在点亮哪一项。其余印章仍按前置显示。</p>
          )}
          <input
            className="skill-find"
            type="search"
            value={query}
            aria-label="按名称找一项"
            placeholder="按名称找一项"
            onChange={(event) => setQuery(event.target.value)}
          />
          {searching ? (
            <p className="skill-find-note" aria-live="polite">{hitCount ? `找到 ${hitCount} 项` : '没有这一项'}</p>
          ) : null}
        </div>
        <div className="skill-follow">
        <ol className="skill-crests" aria-label="阶段称号">
          {SKILL_MILESTONES.map((item) => {
            const on = cleared.has(item.gateId)
            return (
              <li key={item.id} className="skill-crest" data-lit={on ? '' : undefined}>
                <span className="skill-crest-mark">{item.mark}</span>
                <span className="skill-crest-title">{on ? item.title : '这一关还没交付'}</span>
              </li>
            )
          })}
        </ol>
        <p className="skill-cycle-note">称号跟着这一关的课和交付勾选走，不是岗位认证。</p>
        <ol className="skill-trunks" aria-label="主干完成度">
          {trunks.map((trunk) => (
            <li key={trunk.id}>
              <span className="skill-trunk-name" title={trunk.hint}>{trunk.title}</span>
              <span className="skill-trunk-meter" aria-hidden="true">
                <i style={{ width: `${fillPercent(trunk.lit, trunk.total)}%` }} />
              </span>
              <span className="skill-trunk-count">
                {trunk.lit}/{trunk.total}
                {trunk.practiced > 0 ? ` · 练过 ${trunk.practiced}` : ''}
              </span>
            </li>
          ))}
        </ol>
        {advice.line ? <p className="skill-advice" aria-live="polite">{advice.line}</p> : null}
        {advice.scene !== progress.skillScene ? (
          <button type="button" className="skill-scene" onClick={() => progress.setSkillScene(advice.scene)}>
            改走{adviceTitle}
          </button>
        ) : null}
        </div>
      </header>
      <div className="skill-board" aria-label="技能赛道，窄屏可左右滑动">
        {SKILL_LANES.map((lane) => {
          const groups = skillGroupsInLane(lane)
          const laneCards = SKILL_VIEWS.filter((item) => item.lane === lane && !item.bridge)
          const laneLit = laneCards.filter((item) => glow[item.id] === 'lit').length
          const blocks = groups.map((group) => {
            const cards = SKILL_VIEWS.filter((item) => item.lane === lane && item.group === group && !item.bridge)
            const fold = skillGroupFold(
              lane,
              cards.map((item) => item.id),
              activeId,
              focusId,
              query,
              forced[`${lane}\0${group}`],
              cards.map((item) => item.title),
            )
            return { group, cards, fold }
          })
          if (searching && blocks.every((block) => block.fold === 'hide')) return null
          return (
            <section
              key={lane}
              className="skill-lane"
              aria-label={`${lane} ${laneLit}/${laneCards.length}`}
              data-warm={laneLit > 0 ? '' : undefined}
              data-lane-lit={laneCards.length > 0 && laneLit === laneCards.length ? '' : undefined}
            >
              <header className="skill-lane-head">
                <h2>{lane}</h2>
                <p className="skill-lane-meter">
                  <span className="skill-lane-track" aria-hidden="true">
                    <i style={{ width: `${fillPercent(laneLit, laneCards.length)}%` }} />
                  </span>
                  <span>{laneLit}/{laneCards.length}</span>
                </p>
              </header>
              {blocks.length ? (
                blocks.map(({ group, cards, fold }) => {
                  if (fold === 'hide') return null
                  const shown = searching ? cards.filter((item) => skillTitleHit(item.title, query)) : cards
                  const groupLit = cards.filter((item) => glow[item.id] === 'lit').length
                  const live = cards.some((item) => glow[item.id] === 'research')
                  const canFold = skillLaneFolds(lane) && !searching
                  return (
                    <div key={group} className="skill-group" data-shut={fold === 'shut' ? '' : undefined}>
                      {canFold ? (
                        <button
                          type="button"
                          className="skill-group-toggle"
                          aria-expanded={fold === 'open'}
                          data-lit={groupLit > 0 ? '' : undefined}
                          data-live={live ? '' : undefined}
                          onClick={() => setForced((prev) => ({ ...prev, [`${lane}\0${group}`]: fold !== 'open' }))}
                        >
                          <SkillKnot />
                          <span className="skill-group-name">{group}</span>
                          <span className="skill-group-count">{groupLit}/{cards.length}</span>
                        </button>
                      ) : (
                        <div
                          className="skill-group-toggle skill-group-head"
                          data-lit={groupLit > 0 ? '' : undefined}
                          data-live={live ? '' : undefined}
                        >
                          <SkillKnot />
                          <h3 className="skill-group-name">{group}</h3>
                          <span className="skill-group-count">{groupLit}/{cards.length}</span>
                        </div>
                      )}
                      {fold === 'open' ? (
                        <ol>
                          {shown.map((card, index) => {
                            const prev = cards[cards.indexOf(card) - 1]
                            const parents = learningSkill(card.id)?.allOf ?? []
                            return renderCard(card, index, Boolean(prev && shown.includes(prev) && parents.includes(prev.id)))
                          })}
                        </ol>
                      ) : null}
                    </div>
                  )
                })
              ) : (
                <p className="skill-empty">这一列还没有挂上印章。</p>
              )}
            </section>
          )
        })}
        {bridge && skillTitleHit(bridge.title, query) ? (
          <section
            className="skill-lane is-bridge"
            aria-label={bridge.title}
            data-warm={glow[bridge.id] === 'lit' ? '' : undefined}
            data-lane-lit={glow[bridge.id] === 'lit' ? '' : undefined}
          >
            <header className="skill-lane-head">
              <h2>双框架</h2>
              <p className="skill-lane-meter">
                <span className="skill-lane-track" aria-hidden="true">
                  <i style={{ width: glow[bridge.id] === 'lit' ? '100%' : '0%' }} />
                </span>
                <span>{glow[bridge.id] === 'lit' ? '1/1' : '0/1'}</span>
              </p>
            </header>
            <ol>{renderCard(bridge, 0)}</ol>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function glowLine(light: SkillGlow, read: number, total: number, parents: string[], nextNames: string[], practiced: boolean) {
  const names = parents.map((name) => `「${name}」`).join('、')
  const next = nextNames.length
    ? `下一项可以开始：${nextNames.slice(0, 2).map((name) => `「${name}」`).join('、')}。`
    : ''
  if (light === 'lit') {
    const head = practiced ? '练过。' : '已点亮。'
    return total > 0
      ? `${head}${next}这几篇都读过，不是岗位认证。`
      : `${head}${next}${names}都点亮了，不是岗位认证。`
  }
  if (light === 'dim') {
    const ahead = total > 0 && read > 0 ? `已读 ${read}/${total}。` : ''
    return parents.length
      ? `前置${names}还没点亮。${ahead}课仍可打开。`
      : '课库还没有这一课。'
  }
  const count = total > 0 ? `相关课 ${read}/${total} 已读。` : ''
  return light === 'research' ? `正在点亮。${count}` : `可以开始。${count}`
}

function rankLine(rank: SkillRank, light: SkillGlow, read: number, total: number) {
  const label = SKILL_RANK_LABEL[rank]
  if (light === 'research' && total > 0) return `${label} ${read}/${total}`
  return label
}
