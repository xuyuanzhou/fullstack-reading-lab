import { useState } from 'react'
import { SIDE_TRACKS } from '@/data/sideTracks'
import {
  bossQuest,
  faceLabel,
  mainFace,
  mainLanes,
  mainStars,
  newlyAvailable,
  QUEST_STAR_NOTE,
  questDifficulty,
  questFace,
  questStars,
  questStatus,
  sideQuests,
  type QuestAction,
  type QuestDef,
  type QuestDifficulty,
  type QuestFace,
  type QuestReward,
} from '@/data/questBoard'
import { useProgress } from '@/state/progress'
import { SideTrackLinks } from '@/components/SideTracks'
import { CurrentTask } from '@/components/learning/CurrentTask'
import {
  QuestChevron,
  QuestKindIcon,
  QuestLockIcon,
  QuestMeter,
  QuestMotionRoot,
  QuestStars,
  QuestSurface,
} from '@/components/learning/questMotion'

type Filter = 'all' | 'main' | 'side' | 'boss'

function jump(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const el = document.getElementById(id)
  if (el instanceof HTMLDetailsElement) el.open = true
  el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function QuestBoard({ gateId, handIn = false, sideId, bossPage = false }: { gateId?: string; handIn?: boolean; sideId?: string; bossPage?: boolean }) {
  const progress = useProgress()
  const records = progress.learning.quests ?? []
  const lanes = mainLanes()
  const sides = sideQuests()
  const boss = bossQuest()
  const [filter, setFilter] = useState<Filter>('all')
  const [laneId, setLaneId] = useState(lanes[0]?.id ?? '')
  const [marks, setMarks] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')
  const [seal, setSeal] = useState<QuestReward | null>(null)
  const [pulseId, setPulseId] = useState<string | null>(null)
  const [openLanes, setOpenLanes] = useState<Record<string, boolean>>({})
  const [focusId, setFocusId] = useState(boss.milestones[0]?.taskId)
  const [stepId, setStepId] = useState('')
  const lane = lanes.find((item) => item.id === laneId) ?? lanes[0]
  const bossRow = records.find((item) => item.id === boss.id)
  const bossStep = bossRow?.step ?? 0
  const sideDef = sides.find((item) => item.id === sideId || item.id === `side:${sideId}`)
  const sideRow = sideDef ? records.find((item) => item.id === sideDef.id) : undefined
  const sideStep = sideRow?.step ?? 0
  const showMain = filter === 'all' || filter === 'main'
  const showSide = filter === 'all' || filter === 'side'
  const showBoss = filter === 'all' || filter === 'boss'
  const bossGrade = boss.milestones[Math.min(bossStep, boss.milestones.length - 1)]

  const reveal = (id: string, next: Filter) => {
    setFilter(next)
    requestAnimationFrame(() => jump(id))
  }

  const act = (action: QuestAction) => {
    const saved = progress.applyQuest(action)
    if (!saved.ok) {
      setNotice(saved.issue)
      return
    }
    const finale = saved.granted.find((item) => item.tier === 'boss')
    if (finale) setSeal(finale)
    if (action.type === 'advance') setPulseId(newlyAvailable(action.id, saved.envelope.quests))
    setNotice(saved.granted.length
      ? `已发放：${saved.granted.map((item) => item.title).join('、')}。`
      : '这一关的进度没有新变化。')
  }

  if (bossPage) {
    return (
      <QuestMotionRoot>
        <div className="quest-board is-place">
          <section className="quest-lane quest-boss" aria-label="核心挑战">
            <ol className="quest-stages" aria-label="三档">
              {boss.milestones.map((item, index) => {
                const done = bossStep > index || bossRow?.status === 'cleared'
                const here = !done && bossStep === index
                return (
                  <li key={item.id} aria-current={here ? 'step' : undefined}>
                    <button
                      type="button"
                      className="quest-node is-boss"
                      aria-pressed={focusId === item.taskId}
                      onClick={() => setFocusId(item.taskId)}
                    >
                      <span className="quest-node-title">{item.title}</span>
                      <span className="quest-node-state">{done ? '已记下' : here ? '当前' : '后面'}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <CurrentTask focusId={focusId} />
            <div className="path-fold-mark">
              <label className="quest-mark">
                这一档做到哪
                <input
                  value={marks[boss.id] ?? ''}
                  maxLength={80}
                  disabled={bossRow?.status === 'cleared'}
                  onChange={(event) => setMarks((prev) => ({ ...prev, [boss.id]: event.target.value }))}
                />
              </label>
              <button
                type="button"
                onClick={() => act({ type: 'advance', id: boss.id, mark: marks[boss.id] ?? '' })}
                disabled={bossRow?.status === 'cleared'}
              >
                {bossRow?.status === 'cleared' ? '三档都已收口' : `记下：${bossGrade?.title ?? '这一档'}`}
              </button>
            </div>
          </section>
          {notice ? <p className="quest-notice" role="status">{notice}</p> : null}
          {seal ? (
            <div className="quest-seal" role="status">
              <p className="quest-seal-kicker">成就解开</p>
              <p className="quest-seal-title">{seal.title}</p>
              <p>{seal.detail}</p>
            </div>
          ) : null}
        </div>
      </QuestMotionRoot>
    )
  }

  if (sideDef) {
    const sideFace = questFace(sideDef, records)
    const sideDone = sideFace === 'cleared' || sideFace === 'starred'
    const track = SIDE_TRACKS.find((item) => item.id === sideDef.id.replace(/^side:/, ''))
    return (
      <QuestMotionRoot>
        <div className="quest-board is-place">
          <section className="quest-lane" aria-label="这条支线">
            {track ? <p className="path-side-when">{track.when}</p> : null}
            <SideTrackLinks id={sideDef.id} />
            <div className="path-fold-mark">
              <label className="quest-mark">
                这一步做到哪
                <input
                  value={marks[sideDef.id] ?? ''}
                  maxLength={80}
                  disabled={sideDone}
                  onChange={(event) => setMarks((prev) => ({ ...prev, [sideDef.id]: event.target.value }))}
                />
              </label>
              <button
                type="button"
                onClick={() => act({ type: 'advance', id: sideDef.id, mark: marks[sideDef.id] ?? '' })}
                disabled={sideDone}
              >
                {sideDone ? '这条已走完' : `记下：${sideDef.milestones[Math.min(sideStep, sideDef.milestones.length - 1)]?.title ?? '这一步'}`}
              </button>
            </div>
          </section>
          {notice ? <p className="quest-notice" role="status">{notice}</p> : null}
        </div>
      </QuestMotionRoot>
    )
  }

  const place = gateId ? lanes.find((item) => item.gateId === gateId) : undefined
  if (place) {
    const done = place.subs.filter((sub) => questStatus(sub, records) === 'cleared').length
    const openSub = place.subs.find((sub) => {
      const face = questFace(sub, records)
      return face !== 'cleared' && face !== 'starred'
    }) ?? place.subs[place.subs.length - 1]
    const sub = place.subs.find((item) => item.id === stepId) ?? openSub
    const subIndex = Math.max(0, place.subs.findIndex((item) => item.id === sub?.id))
    return (
      <QuestMotionRoot>
        <div className="quest-board is-place">
          <section className="quest-lane" aria-label="这一站的子关">
            <p className="quest-note">
              {handIn
                ? `${done}/${place.subs.length} 项已记下。星是笔记写满，不是能力分。`
                : '这一场还在读。交付等课文记下再写。'}
            </p>
            <ol className="place-steps" aria-label="这一站的交付">
              {place.subs.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={item.id === sub?.id ? 'is-on' : ''}
                    aria-current={item.id === sub?.id ? 'step' : undefined}
                    onClick={() => setStepId(item.id)}
                  >
                    <span>{index + 1}</span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
            {!handIn && sub ? <p className="place-preview">{sub.objective}</p> : null}
            {handIn && sub ? (
              <QuestCard
                def={sub}
                face={questFace(sub, records)}
                stars={questStars(sub, records)}
                difficulty={questDifficulty(sub, subIndex, place.subs.length)}
                pulse={pulseId === sub.id}
                step={records.find((row) => row.id === sub.id)?.step ?? 0}
                rewardIds={records.find((row) => row.id === sub.id)?.rewardIds ?? []}
                mark={marks[sub.id] ?? ''}
                onMark={(value) => setMarks((prev) => ({ ...prev, [sub.id]: value }))}
                onAdvance={() => act({ type: 'advance', id: sub.id, mark: marks[sub.id] ?? '' })}
                brief
              />
            ) : null}
          </section>
          {notice ? <p className="quest-notice" role="status">{notice}</p> : null}
          {seal ? (
            <div className="quest-seal" role="status">
              <p className="quest-seal-kicker">成就解开</p>
              <p className="quest-seal-title">{seal.title}</p>
              <p>{seal.detail}</p>
            </div>
          ) : null}
        </div>
      </QuestMotionRoot>
    )
  }

  return (
    <QuestMotionRoot>
    <div className="quest-board">
      <nav className="quest-map" id="quest-map" aria-label="关卡地图">
        <p className="quest-map-lead">主线按子关推进。支线四条并行补强。核心挑战是同一笔下单的三道题，不跟九关勾选绑在一起。</p>
        <div className="quest-filters" role="group" aria-label="关卡类型">
          {([
            ['all', '全部'],
            ['main', '主线'],
            ['side', '支线'],
            ['boss', '核心挑战'],
          ] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
        </div>
        <ol className="quest-nodes">
          {showMain ? lanes.map((item) => {
            const face = mainFace(item, records)
            const done = item.subs.filter((sub) => questStatus(sub, records) === 'cleared').length
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`quest-node is-main is-${face}`}
                  aria-current={item.id === lane?.id ? 'true' : undefined}
                  onClick={() => {
                    setLaneId(item.id)
                    setOpenLanes((prev) => ({ ...prev, [item.id]: true }))
                    reveal(`fold-${item.id}`, 'main')
                  }}
                >
                  <span className="quest-node-kind"><QuestKindIcon kind="main" />主线</span>
                  <span className="quest-node-title">{item.learnTitle}</span>
                  <QuestStars count={mainStars(item, records)} />
                  <span className="quest-node-state">{faceLabel(face)} · {done}/{item.subs.length}</span>
                </button>
              </li>
            )
          }) : null}
          {showSide ? sides.map((item) => (
            <li key={item.id}>
              <QuestNodeButton
                def={item}
                face={questFace(item, records)}
                kind="支线"
                stars={questStars(item, records)}
                step={records.find((row) => row.id === item.id)?.step ?? 0}
                onClick={() => {
                  reveal(item.id, 'side')
                }}
              />
            </li>
          )) : null}
          {showBoss ? (
            <li>
              <QuestNodeButton
                def={boss}
                face={questFace(boss, records)}
                kind="核心挑战"
                stars={questStars(boss, records)}
                step={bossStep}
                onClick={() => {
                  reveal('quest-boss', 'boss')
                }}
              />
            </li>
          ) : null}
        </ol>
      </nav>

      <section className="quest-lane" id="quest-main" aria-label="主线子关" hidden={!showMain}>
        <h2>主线子关</h2>
        <p className="quest-note">点开一关看里面的子关。子关可以收起。未解锁的课仍可从九关地图打开。</p>
        {lanes.map((item) => {
          const open = openLanes[item.id] ?? item.id === laneId
          const done = item.subs.filter((sub) => questStatus(sub, records) === 'cleared').length
          return (
            <details
              key={item.id}
              id={`fold-${item.id}`}
              className="quest-fold"
              open={open}
              onToggle={(event) => {
                const next = event.currentTarget.open
                setOpenLanes((prev) => prev[item.id] === next ? prev : { ...prev, [item.id]: next })
              }}
            >
              <summary>
                <QuestChevron />
                <span>{item.learnTitle}</span>
                <QuestStars count={mainStars(item, records)} />
                <span>{faceLabel(mainFace(item, records))} · {done}/{item.subs.length}</span>
              </summary>
              <QuestMeter step={done} total={item.subs.length} />
              <ol className="quest-cards">
                {item.subs.map((sub, index) => (
                  <li key={sub.id}>
                    <QuestCard
                      def={sub}
                      face={questFace(sub, records)}
                      stars={questStars(sub, records)}
                      difficulty={questDifficulty(sub, index, item.subs.length)}
                      pulse={pulseId === sub.id}
                      step={records.find((row) => row.id === sub.id)?.step ?? 0}
                      rewardIds={records.find((row) => row.id === sub.id)?.rewardIds ?? []}
                      mark={marks[sub.id] ?? ''}
                      onMark={(value) => setMarks((prev) => ({ ...prev, [sub.id]: value }))}
                      onAdvance={() => act({ type: 'advance', id: sub.id, mark: marks[sub.id] ?? '' })}
                    />
                  </li>
                ))}
              </ol>
            </details>
          )
        })}
      </section>

      <section className="quest-lane" id="quest-side" aria-label="支线任务" hidden={!showSide}>
          <h2>支线</h2>
          <p className="quest-note">前端、云、安全、协作四条。互不挡，也不看九关走到哪。</p>
          <ol className="quest-cards">
            {sides.map((side) => {
              const track = SIDE_TRACKS.find((item) => item.id === side.id.replace(/^side:/, ''))
              const row = records.find((item) => item.id === side.id)
              return (
                <li key={side.id} id={side.id}>
                  <QuestCard
                    def={side}
                    face={questFace(side, records)}
                    stars={questStars(side, records)}
                    difficulty="选修"
                    pulse={pulseId === side.id}
                    step={row?.step ?? 0}
                    rewardIds={row?.rewardIds ?? []}
                    mark={marks[side.id] ?? ''}
                    onMark={(value) => setMarks((prev) => ({ ...prev, [side.id]: value }))}
                    onAdvance={() => act({ type: 'advance', id: side.id, mark: marks[side.id] ?? '' })}
                  />
                  {track ? (
                    <>
                      <p className="quest-note">结束要交出：{track.evidence.join('；')}。</p>
                      <p className="quest-note">{track.hold}</p>
                      <SideTrackLinks id={side.id} />
                    </>
                  ) : null}
                </li>
              )
            })}
          </ol>
      </section>

      <section className="quest-lane quest-boss" id="quest-boss" aria-label="核心挑战" hidden={!showBoss}>
          <h2>核心挑战</h2>
          <p className="quest-note">
            {boss.objective} 按入门 → 加压 → 收口，先保存该题草稿再记下。本机标记不是认证。
          </p>
          <ol className="quest-stages" aria-label="挑战节点">
            {boss.milestones.map((item, index) => {
              const done = bossStep > index || bossRow?.status === 'cleared'
              const here = !done && bossStep === index
              return (
                <li key={item.id} aria-current={here ? 'step' : undefined}>
                  <button
                    type="button"
                    className="quest-node"
                    aria-pressed={focusId === item.taskId}
                    onClick={() => setFocusId(item.taskId)}
                  >
                    <span className="quest-node-title">{item.title}</span>
                    <span className="quest-node-state">{done ? '已记下' : here ? '当前这一档' : '还没到'}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          <QuestCard
            def={boss}
            face={questFace(boss, records)}
            stars={questStars(boss, records)}
            difficulty="挑战"
            pulse={pulseId === boss.id}
            step={bossStep}
            rewardIds={bossRow?.rewardIds ?? []}
            mark={marks[boss.id] ?? ''}
            onMark={(value) => setMarks((prev) => ({ ...prev, [boss.id]: value }))}
            onAdvance={() => act({ type: 'advance', id: boss.id, mark: marks[boss.id] ?? '' })}
            advanceLabel={bossRow?.status === 'cleared' ? '三档都已记下' : `记下：${boss.milestones[Math.min(bossStep, boss.milestones.length - 1)]?.title ?? '这一档'}`}
          />
          {seal ? (
            <div className="quest-seal" role="status">
              <p className="quest-seal-kicker">成就解开</p>
              <p className="quest-seal-title">{seal.title}</p>
              <p>{seal.detail}</p>
              <ul>
                {boss.rewards.filter((item) => item.tier === 'node').map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <CurrentTask focusId={focusId} />
        </section>
      {notice ? <p className="quest-notice" role="status">{notice}</p> : null}
    </div>
    </QuestMotionRoot>
  )
}

function QuestNodeButton({
  def,
  face,
  kind,
  stars,
  step = 0,
  onClick,
}: {
  def: QuestDef
  face: QuestFace
  kind: string
  stars: number
  step?: number
  onClick: () => void
}) {
  return (
    <button type="button" className={`quest-node is-${def.kind} is-${face}`} onClick={onClick}>
      <span className="quest-node-kind"><QuestKindIcon kind={def.kind} />{kind}</span>
      <span className="quest-node-title">{def.title}</span>
      {face === 'locked' ? <QuestLockIcon /> : null}
      <QuestStars count={stars} />
      <span className="quest-node-state">{faceLabel(face)} · {step}/{def.milestones.length}</span>
    </button>
  )
}

function QuestCard({
  def,
  face,
  stars,
  difficulty,
  pulse,
  step,
  rewardIds,
  mark,
  onMark,
  onAdvance,
  advanceLabel = '记下这一步',
  brief = false,
}: {
  def: QuestDef
  face: QuestFace
  stars: number
  difficulty: QuestDifficulty
  pulse?: boolean
  step: number
  rewardIds: readonly string[]
  mark: string
  onMark: (value: string) => void
  onAdvance: () => void
  advanceLabel?: string
  brief?: boolean
}) {
  const locked = face === 'locked'
  const done = face === 'cleared' || face === 'starred'
  return (
    <QuestSurface
      pulse={pulse}
      className={['quest-card', `is-${face}`, pulse ? 'is-unlocking' : ''].filter(Boolean).join(' ')}
    >
      <header className="quest-card-head">
        <h3>{locked ? <QuestLockIcon /> : null}{def.title}</h3>
        <span className={`quest-diff is-${difficulty}`}>{difficulty}</span>
        <QuestStars count={stars} />
      </header>
      <p>{def.objective}</p>
      <QuestMeter step={step} total={def.milestones.length} />
      {brief ? null : (
        <dl className="quest-facts">
          <dt>状态</dt>
          <dd>{faceLabel(face)}。{locked ? '现在不能记进度。' : done ? '奖励已经发放。' : '现在可以记进度。'}</dd>
          <dt>触发</dt>
          <dd>{def.trigger}</dd>
          <dt>进度</dt>
          <dd>{step}/{def.milestones.length}</dd>
          <dt>当前节点</dt>
          <dd>{def.milestones[Math.min(step, def.milestones.length - 1)]?.title}</dd>
        </dl>
      )}
      <label className="quest-mark">
        这一步做到哪
        <input value={mark} maxLength={80} disabled={locked || done} onChange={(event) => onMark(event.target.value)} />
      </label>
      {brief ? null : <p className="quest-note">写满 {QUEST_STAR_NOTE} 个字，这一关显示三星。星表示笔记写完整，不是能力分。</p>}
      <button type="button" onClick={onAdvance} disabled={locked || done}>
        {advanceLabel}
      </button>
      {brief ? null : <ul className="quest-rewards" aria-label="奖励预览">
        {def.rewards.map((item) => {
          const earned = rewardIds.includes(item.id)
          return <li key={item.id} className={earned ? 'is-earned' : 'is-preview'}>{earned ? item.title : `通关后：${item.title}`}</li>
        })}
      </ul>}
    </QuestSurface>
  )
}
