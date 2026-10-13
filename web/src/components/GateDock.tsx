import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { PATHS, deliverableKey, gateCleared, nextInGate, slotsOf, spinePlace, type PathGate, type PathLesson } from '@/data/learningPaths'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

const stages = PATHS.architect.gates
const PHONE = '(max-width: 720px)'

export function GateDock() {
  const progress = useProgress()
  const navigate = useNavigate()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const pathName = useRef(location.pathname)
  const [open, setOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [narrow, setNarrow] = useState(() => window.matchMedia(PHONE).matches)

  const onPath = location.pathname === '/paths' || location.pathname.startsWith('/paths/')
  const pathParts = location.pathname.split('/').filter(Boolean)
  const readingId = pathParts.length === 3 && (pathParts[0] === 'frontend' || pathParts[0] === 'java') ? pathParts[2] : ''
  const spine = readingId ? spinePlace(readingId) : undefined
  const checks = progress.pathChecks ?? []
  const done = new Set(progress.done)
  const checkSet = new Set(checks)
  const openIndex = stages.findIndex((stage) => !gateCleared(stage, progress.done, checks))
  const progressIndex = openIndex === -1 ? stages.length - 1 : openIndex
  const requested = stages.findIndex((stage) => stage.id === params.get('gate'))
  const viewingIndex = onPath ? (requested >= 0 ? requested : progressIndex) : spine ? spine.index : progressIndex
  const progressGate = stages[progressIndex]
  const fill = gateFill(progressGate, done, checkSet)
  const nextId = nextInGate(progressGate, progress.done)
  const nextLesson = findLesson(nextId || '')
  const waitingOnDelivery = !nextId && fill.delivered < progressGate.outputs.length && openIndex >= 0
  const finishedAll = openIndex < 0
  const entryTitle = finishedAll
    ? `${stages.length} 关都已交付`
    : waitingOnDelivery
      ? '去交这一关'
      : shortTitle(nextLesson?.title || progressGate.learnTitle)

  useEffect(() => {
    const media = window.matchMedia(PHONE)
    const apply = () => setNarrow(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail
      setOpen(true)
      setExpandedId(id)
    }
    window.addEventListener('lab-open-gate', onOpen)
    return () => window.removeEventListener('lab-open-gate', onOpen)
  }, [])

  useEffect(() => {
    if (pathName.current === location.pathname) return
    pathName.current = location.pathname
    if (readingId) {
      setOpen(false)
      setExpandedId(null)
    }
  }, [location.pathname, readingId])

  useEffect(() => {
    if (!onPath || params.get('focus') !== 'deliver') return
    setOpen(true)
    const id = params.get('gate')
    if (id) setExpandedId(id)
  }, [onPath, params])

  useLayoutEffect(() => {
    if (!open || !expandedId) return
    const list = listRef.current
    const align = () => {
      const row = list?.querySelector<HTMLElement>(`[data-gate="${expandedId}"]`)
      if (list && row) scrollRowInto(list, row)
    }
    align()
    const detail = detailRef.current
    if (detail) {
      detail.scrollTop = 0
      const deliver = detail.querySelector<HTMLElement>('#path-deliver')
      const focusDeliver = onPath && params.get('focus') === 'deliver' && params.get('gate') === expandedId
      if (focusDeliver && deliver) detail.scrollTop = deliver.getBoundingClientRect().top - detail.getBoundingClientRect().top
    }
    if (!list) return
    const observer = new ResizeObserver(align)
    observer.observe(list)
    return () => observer.disconnect()
  }, [open, expandedId, onPath, params])

  useEffect(() => {
    if (!open || (!narrow && !expandedId)) return
    const closeAll = () => {
      setOpen(false)
      setExpandedId(null)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (narrow && expandedId) setExpandedId(null)
      else if (narrow) closeAll()
      else setExpandedId(null)
    }
    const onPointer = (event: PointerEvent) => {
      const root = rootRef.current
      if (!root || root.contains(event.target as Node)) return
      if (narrow) closeAll()
      else setExpandedId(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open, expandedId, narrow])

  function togglePanel() {
    setOpen((value) => {
      const next = !value
      setExpandedId(next && !narrow ? stages[viewingIndex]?.id ?? null : null)
      return next
    })
  }

  function toggleGate(id: string) {
    setExpandedId((current) => (current === id ? null : id))
    if (!onPath) return
    const query = new URLSearchParams(params)
    query.set('gate', id)
    query.delete('focus')
    setParams(query, { replace: true })
  }

  function openLesson(id: string) {
    setOpen(false)
    setExpandedId(null)
    progress.remember(id)
    const lesson = findLesson(id)
    if (lesson) navigate(lessonPath(lesson))
  }

  const selected = stages.find((stage) => stage.id === expandedId)
  const selectedIndex = selected ? stages.indexOf(selected) : -1

  return (
    <div className={['gate-dock', open ? 'is-open' : '', narrow ? 'is-narrow' : ''].filter(Boolean).join(' ')} ref={rootRef}>
      {open ? (
        <div className="gate-dock-panel" role="region" aria-label="关卡">
          {viewingIndex !== progressIndex && openIndex >= 0 ? (
            <p className="gate-dock-visit">正在看第 {viewingIndex + 1} 关。进度在第 {progressIndex + 1} 关。</p>
          ) : null}
          <ol className="gate-dock-list" ref={listRef}>
            {stages.map((stage, index) => {
              const finished = gateCleared(stage, progress.done, checks)
              const live = index === progressIndex && openIndex >= 0
              const expanded = expandedId === stage.id
              const rowFill = gateFill(stage, done, checkSet)
              const status = finished ? '已过' : live ? '进行中' : stage.milestone?.includes('能交付的全栈') ? '全栈' : stage.milestone?.includes('架构师') ? '职责' : ''
              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    data-gate={stage.id}
                    className={['gate-dock-row', expanded ? 'is-open' : '', live ? 'is-live' : ''].filter(Boolean).join(' ')}
                    aria-expanded={expanded}
                    aria-current={expanded ? 'true' : undefined}
                    onClick={() => toggleGate(stage.id)}
                  >
                    <span className="gate-dock-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="gate-dock-name">{stage.learnTitle}</span>
                    <span className="gate-dock-status">{status}</span>
                    <span className="gate-dock-count is-read">{rowFill.slots ? `阅读 ${rowFill.read}/${rowFill.slots}` : '阅读 0'}</span>
                    <span className="gate-dock-count is-deliver">交付 {rowFill.delivered}/{stage.outputs.length}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          {selected && selectedIndex >= 0 ? (
            <div className="gate-dock-detail" ref={detailRef}>
              <Briefing
                stage={selected}
                index={selectedIndex}
                progressIndex={progressIndex}
                openIndex={openIndex}
                done={done}
                checks={checkSet}
                onToggleCheck={(key) => progress.togglePathCheck(key)}
                onOpenNext={openLesson}
                onCollapse={() => setExpandedId(null)}
                sheet={narrow}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      <button type="button" className="gate-dock-entry" aria-expanded={open} onClick={togglePanel}>
        {open ? (
          <span className="gate-dock-kicker">收起</span>
        ) : (
          <>
            <span className="gate-dock-kicker">第 {progressIndex + 1} 关</span>
            <strong>{entryTitle}</strong>
            <span className="gate-dock-meters">
              阅读 {fill.read}/{fill.slots} · 交付 {fill.delivered}/{progressGate.outputs.length}
            </span>
          </>
        )}
      </button>
    </div>
  )
}

function gateFill(stage: PathGate, done: Set<string>, checks: Set<string>) {
  const slots = slotsOf(stage.lessons)
  const read = slots.filter((slot) => slot.some((id) => done.has(id))).length
  const delivered = stage.outputs.filter((_, index) => checks.has(deliverableKey(stage.id, index))).length
  return { read, delivered, slots: slots.length }
}

function Meter({ name, value, total }: { name: string; value: number; total: number }) {
  const ratio = total ? Math.min(1, value / total) : 0
  return (
    <div className="quest-meter">
      <span>{name}</span>
      <span>{`${value}/${total}`}</span>
      <span className="quest-track" aria-hidden="true">
        <span style={{ width: `${ratio * 100}%` }} />
      </span>
    </div>
  )
}

function Briefing({
  stage,
  index,
  progressIndex,
  openIndex,
  done,
  checks,
  onToggleCheck,
  onOpenNext,
  onCollapse,
  sheet,
}: {
  stage: PathGate
  index: number
  progressIndex: number
  openIndex: number
  done: Set<string>
  checks: Set<string>
  onToggleCheck: (key: string) => void
  onOpenNext: (id: string) => void
  onCollapse: () => void
  sheet?: boolean
}) {
  const fill = gateFill(stage, done, checks)
  const slots = slotsOf(stage.lessons)
  const nextId = nextInGate(stage, [...done])
  const nextTitle = shortTitle(findLesson(nextId || '')?.title || '')
  const nextJob = stage.lessons.find((lesson) => lesson.id === nextId)?.job
  const waitingOnEvidence = !nextId && fill.delivered < stage.outputs.length
  const visiting = index !== progressIndex && openIndex >= 0
  const order = slots.length ? (
    <ol className="path-trail">
      {slots.map((slot) => {
        const rows = slot.flatMap((id) => {
          const item = stage.lessons.find((lesson) => lesson.id === id)
          const lesson = findLesson(id)
          return item && lesson ? [{ item, lesson }] : []
        })
        if (!rows.length) return null
        const read = slot.some((id) => done.has(id))
        const upcoming = !read && slot.includes(nextId || '')
        const side = rows.some(({ item }) => item.note?.includes('补读'))
        const fork = rows.length > 1
        return (
          <li key={slot.join('+')} className={[read ? 'is-read' : '', upcoming ? 'is-next' : '', side ? 'is-side' : '', fork ? 'is-fork' : ''].filter(Boolean).join(' ') || undefined}>
            <div className="trail-slot">
              {rows.map(({ item, lesson }, rowIndex) => (
                <TrailRow key={lesson.id} item={item} title={shortTitle(lesson.title)} to={lessonPath(lesson)} fork={fork && rowIndex > 0} showJob={upcoming && !sheet} onOpen={() => onOpenNext(lesson.id)} />
              ))}
            </div>
          </li>
        )
      })}
    </ol>
  ) : null
  const deliver = (
    <ul className="ink-list">
      {stage.outputs.map((item, outputIndex) => {
        const key = deliverableKey(stage.id, outputIndex)
        const pressed = checks.has(key)
        return (
          <li key={key}>
            <button type="button" className="ink-seal" aria-pressed={pressed} onClick={() => onToggleCheck(key)}>
              <span className="ink-dot" aria-hidden="true" />
              <span>{item}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
  const next = nextId ? (
    <button type="button" className="path-enter" onClick={() => onOpenNext(nextId)}>
      <small>下一节</small>
      <strong>{nextTitle}</strong>
      <span className="path-enter-go" aria-hidden="true">→</span>
      {nextJob ? <span className="path-enter-job">{nextJob}</span> : null}
    </button>
  ) : null

  if (sheet) {
    return (
      <section className={visiting ? 'path-quest is-visiting is-sheet' : 'path-quest is-sheet'}>
        <button type="button" className="gate-dock-back" onClick={onCollapse}>
          返回关卡
        </button>
        <h2>{stage.learnTitle}</h2>
        <p className="gate-dock-sheet-meta">
          {fill.slots ? `阅读 ${fill.read}/${fill.slots}` : '阅读 0'}
          {` · 交付 ${fill.delivered}/${stage.outputs.length}`}
          {stage.weeks ? ` · ${stage.weeks}` : ''}
        </p>
        {visiting ? <p className="path-live">进度在第 {progressIndex + 1} 关。</p> : null}
        {next}
        {waitingOnEvidence ? <p className="path-note">阅读已完成。交付记全，这一关才过。</p> : null}
        {order ? (
          <>
            <h3>顺序</h3>
            {order}
          </>
        ) : null}
        <h3>读法</h3>
        <ol className="path-how">
          {stage.how.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <h3 id="path-deliver">交付</h3>
        {deliver}
        <p className="path-pass">{stage.pass}</p>
        {stage.milestone ? <p className="path-milestone">{stage.milestone}</p> : null}
        {stage.extra ? <p className="path-note">{stage.extra}</p> : null}
      </section>
    )
  }

  return (
    <section className={visiting ? 'path-quest is-visiting' : 'path-quest'}>
      <p className="quest-index">{String(index + 1).padStart(2, '0')}</p>
      <h2>
        <button type="button" className="gate-dock-title" onClick={onCollapse}>
          {stage.learnTitle}
        </button>
      </h2>
      <p className="path-pass">{stage.pass}</p>
      {stage.milestone ? <p className="path-milestone">{stage.milestone}</p> : null}
      {visiting ? <p className="path-live">进度在第 {progressIndex + 1} 关。</p> : null}
      <p className="quest-when">{stage.weeks}</p>
      <div className="quest-meters">
        {fill.slots ? <Meter name="阅读" value={fill.read} total={fill.slots} /> : null}
        <Meter name="交付" value={fill.delivered} total={stage.outputs.length} />
      </div>
      {next}
      <h3>读法</h3>
      <ol className="path-how">
        {stage.how.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      {order ? (
        <>
          <h3>顺序</h3>
          {order}
        </>
      ) : null}
      <h3 id="path-deliver">交付</h3>
      {deliver}
      {stage.extra ? <p className="path-note">{stage.extra}</p> : null}
      {waitingOnEvidence ? <p className="path-note">阅读已完成。交付记全，这一关才过。</p> : null}
    </section>
  )
}

function scrollRowInto(list: HTMLElement, row: HTMLElement) {
  const viewTop = () => list.getBoundingClientRect().top
  const viewBottom = () => viewTop() + list.clientHeight
  const box = row.getBoundingClientRect()
  if (box.top < viewTop()) list.scrollTop -= viewTop() - box.top
  else if (box.bottom > viewBottom()) list.scrollTop += box.bottom - viewBottom()

  const cut = [...list.querySelectorAll<HTMLElement>('.gate-dock-row')].find((item) => {
    const itemBox = item.getBoundingClientRect()
    return itemBox.top < viewTop() - 1 && itemBox.bottom > viewTop() + 1
  })
  if (!cut || cut === row) return
  const cutBox = cut.getBoundingClientRect()
  const selected = row.getBoundingClientRect()
  const hide = cutBox.bottom - viewTop()
  if (selected.top - hide >= viewTop() - 1) {
    list.scrollTop += hide
    return
  }
  const reveal = viewTop() - cutBox.top
  if (selected.bottom + reveal <= viewBottom() + 1) list.scrollTop -= reveal
}

function TrailRow({
  item,
  title,
  to,
  fork,
  showJob,
  onOpen,
}: {
  item: PathLesson
  title: string
  to: string
  fork: boolean
  showJob: boolean
  onOpen: () => void
}) {
  return (
    <div className="trail-row">
      {fork ? <span className="trail-or">或</span> : null}
      <Link
        to={to}
        onClick={(event) => {
          event.preventDefault()
          onOpen()
        }}
      >
        {title}
      </Link>
      {item.note?.includes('补读') ? <em>补读</em> : null}
      {showJob && item.job ? <p>{item.job}</p> : null}
    </div>
  )
}
