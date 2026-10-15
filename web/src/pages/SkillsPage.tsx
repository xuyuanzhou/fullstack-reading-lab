import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkillSigil } from '@/components/learning/SkillSigil'
import { aiNoteById } from '@/data/aiCatalog'
import { findLesson } from '@/data/curriculum'
import { MASTERY_GATES } from '@/data/masteryGates'
import {
  LEARNING_SKILLS,
  SKILL_LANES,
  SKILL_VIEWS,
  skillGlows,
  skillGroupsInLane,
  skillHasLocalCheck,
  skillLessonIds,
  skillOpenIds,
  skillProgress,
  type SkillGlow,
  type SkillView,
} from '@/data/learningSkills'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

const titles = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, item.title]))
const gates = Object.fromEntries(MASTERY_GATES.map((gate) => [gate.id, gate.learnTitle]))

export function SkillsPage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const done = new Set([...progress.done, ...progress.aiDone])
  const exists = (id: string) => (id.startsWith('ai:') ? Boolean(aiNoteById(id)) : Boolean(findLesson(id)))
  const bridge = SKILL_VIEWS.find((item) => item.bridge)
  const { glow, activeId } = skillGlows(
    SKILL_VIEWS.map((item) => item.id),
    (id) => LEARNING_SKILLS.find((item) => item.id === id)?.allOf ?? [],
    (id) => skillProgress(skillLessonIds(id), done, exists),
  )
  const lit = SKILL_VIEWS.filter((item) => glow[item.id] === 'lit').length
  const total = SKILL_VIEWS.length
  const activeTitle = SKILL_VIEWS.find((item) => item.id === activeId)?.title

  const openLesson = (id: string) => {
    const note = aiNoteById(id)
    if (note) {
      progress.rememberAi(id)
      navigate(`/ai/${note.section}/${note.key}`)
      return
    }
    const lesson = findLesson(id)
    if (!lesson) return
    progress.remember(id)
    navigate(lessonPath(lesson))
  }

  const renderCard = (card: SkillView, index: number, linked = false) => {
    const skill = LEARNING_SKILLS.find((item) => item.id === card.id)
    const own = skillProgress(skillLessonIds(card.id), done, exists)
    const open = skillProgress(skillOpenIds(card.id), done, exists)
    const nextId = open.nextId
    const canOpen = Boolean(nextId && (aiNoteById(nextId) || findLesson(nextId)))
    const parents = (skill?.allOf ?? []).map((id) => titles[id] || id)
    const gateTitle = card.gateId ? gates[card.gateId] : ''
    const local = skillHasLocalCheck(card.id, progress.learning.evidence)
    const light = glow[card.id] ?? 'dim'
    const status = glowLine(light, own.read, own.total, parents)
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
        data-light={light}
        data-boost={local ? '' : undefined}
        data-linked={linked ? '' : undefined}
        style={{ '--i': String(index) } as CSSProperties}
      >
        {canOpen && nextId ? (
          <button type="button" className="skill-open" onClick={() => openLesson(nextId)}>
            {body}
          </button>
        ) : (
          <div className="skill-open">{body}</div>
        )}
        {local ? <p className="skill-note">本地检查让印章中心多一颗石。读完才点亮。这不是认证。</p> : null}
        {card.gateId && gateTitle ? (
          <button type="button" className="skill-gate" onClick={() => navigate(`/paths?gate=${card.gateId}`)}>
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
          {lit}/{total} 已点亮
          {activeTitle ? ` · 正在点亮「${activeTitle}」` : ''}
        </p>
      </header>
      <div className="skill-board" aria-label="技能赛道，窄屏可左右滑动">
        {SKILL_LANES.map((lane) => {
          const groups = skillGroupsInLane(lane)
          return (
            <section key={lane} className="skill-lane" aria-label={lane}>
              <h2>{lane}</h2>
              {groups.length ? (
                groups.map((group) => {
                  const cards = SKILL_VIEWS.filter(
                    (item) => item.lane === lane && item.group === group && !item.bridge,
                  )
                  return (
                    <div key={group} className="skill-group">
                      <h3>{group}</h3>
                      <ol>
                        {cards.map((card, index) => {
                          const prev = cards[index - 1]
                          const parents = LEARNING_SKILLS.find((item) => item.id === card.id)?.allOf ?? []
                          return renderCard(card, index, Boolean(prev && parents.includes(prev.id)))
                        })}
                      </ol>
                    </div>
                  )
                })
              ) : (
                <p className="skill-empty">这一列还没有挂上印章。</p>
              )}
            </section>
          )
        })}
        {bridge ? (
          <section className="skill-lane is-bridge" aria-label={bridge.title}>
            <h2>双框架</h2>
            <ol>{renderCard(bridge, 0)}</ol>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function glowLine(light: SkillGlow, read: number, total: number, parents: string[]) {
  const names = parents.map((name) => `「${name}」`).join('、')
  if (light === 'lit') {
    return total > 0
      ? '已点亮。这几篇都读过，不是岗位认证。'
      : `已点亮。${names}都点亮了，不是岗位认证。`
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
