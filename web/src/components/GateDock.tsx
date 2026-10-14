import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { findLesson, prefetchLessonBodies, prefetchLessonBody } from '@/data/curriculum'
import { PATHS, deliverableKey, gateCleared, gateFace, gateFaceLabel, gateMark, nextInGate, slotsOf, spinePlace, type PathGate } from '@/data/learningPaths'
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
    if (nextId) prefetchLessonBody(nextId)
  }, [nextId])

  useEffect(() => {
    const stage = stages.find((item) => item.id === expandedId)
    if (!stage) return
    prefetchLessonBodies(stage.lessons.map((lesson) => lesson.id))
  }, [expandedId])

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
              const face = gateFace(index, progressIndex, finished)
              const expanded = expandedId === stage.id
              const rowFill = gateFill(stage, done, checkSet)
              const mark = gateMark(stage)
              const total = rowFill.slots + stage.outputs.length
              const ratio = total ? (rowFill.read + rowFill.delivered) / total : 0
              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    data-gate={stage.id}
                    data-face={face}
                    className={['gate-dock-row', `is-${face}`, expanded ? 'is-open' : ''].filter(Boolean).join(' ')}
                    aria-expanded={expanded}
                    aria-current={expanded ? 'true' : undefined}
                    onClick={() => toggleGate(stage.id)}
                  >
                    <span className="gate-dock-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="gate-dock-name">{stage.learnTitle}{mark ? <em>{mark}</em> : null}</span>
                    <span className="gate-dock-status">{gateFaceLabel(face)}</span>
                    <span className="gate-dock-count is-read">{rowFill.slots ? `阅读 ${rowFill.read}/${rowFill.slots}` : '阅读 0'}</span>
                    <span className="gate-dock-count is-deliver">交付 {rowFill.delivered}/{stage.outputs.length}</span>
                    <span className="gate-dock-bar" aria-hidden="true"><span style={{ width: `${Math.round(ratio * 100)}%` }} /></span>
                  </button>
                </li>
              )
            })}
          </ol>
          {selected && selectedIndex >= 0 ? (
            <div className="gate-dock-detail" ref={detailRef}>
              <DockStep
                stage={selected}
                done={done}
                checks={checkSet}
                handIn={onPath && params.get('focus') === 'deliver' && params.get('gate') === selected.id}
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
            <span className="gate-dock-bar" aria-hidden="true">
              <span style={{ width: `${Math.round(((fill.slots ? fill.read : 0) + fill.delivered) / Math.max(1, fill.slots + progressGate.outputs.length) * 100)}%` }} />
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

function DockStep({
  stage,
  done,
  checks,
  handIn,
  onToggleCheck,
  onOpenNext,
  onCollapse,
  sheet,
}: {
  stage: PathGate
  done: Set<string>
  checks: Set<string>
  handIn: boolean
  onToggleCheck: (key: string) => void
  onOpenNext: (id: string) => void
  onCollapse: () => void
  sheet?: boolean
}) {
  const fill = gateFill(stage, done, checks)
  const nextId = nextInGate(stage, [...done])
  const nextTitle = shortTitle(findLesson(nextId || '')?.title || '')
  const nextJob = stage.lessons.find((lesson) => lesson.id === nextId)?.job
  const showHandIn = handIn || !nextId
  return (
    <section className="gate-dock-step">
      {sheet ? (
        <button type="button" className="gate-dock-back" onClick={onCollapse}>
          返回关卡
        </button>
      ) : null}
      {nextId ? (
        <button type="button" className="path-enter" onClick={() => onOpenNext(nextId)}>
          <small>下一节</small>
          <strong>{nextTitle}</strong>
          <span className="path-enter-go" aria-hidden="true">→</span>
          {nextJob ? <span className="path-enter-job">{nextJob}</span> : null}
        </button>
      ) : null}
      {showHandIn ? (
        <>
          <h3 id="path-deliver">交付</h3>
          <p className="path-note">这些勾选是自评，没有测试记录不算验证通过。</p>
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
          {!nextId && fill.delivered < stage.outputs.length ? <p className="path-note">阅读已完成。交付记全，这一关才过。</p> : null}
        </>
      ) : null}
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



