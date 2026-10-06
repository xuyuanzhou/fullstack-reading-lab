import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom'
import { AiDiagram } from '@/components/AiDiagrams'
import { aiNote, aiSection, noteNeighbors, notesInSection, type AiNote } from '@/data/aiCatalog'

type OutletCtx = { localReady: boolean | null }

const LAB_LINK: Record<string, { to: string; label: string }> = {
  'prompt-once': { to: '/ai/lab/prompt', label: '到练习台改这一次的提示词' },
  'find-then-answer': { to: '/ai/lab/prompt', label: '到练习台把材料写进这一次' },
  'one-success': { to: '/ai/lab/prompt', label: '到练习台写下没有答案时的出口' },
  'model-proposes': { to: '/ai/lab/agent', label: '到练习台声明工具并走一遍' },
  permissions: { to: '/ai/lab/agent', label: '到练习台把确认写进循环' },
  'you-own': { to: '/ai/lab/agent', label: '到练习台写下停点并导出' },
  'skill-place': { to: '/ai/lab/agent', label: '到练习台给这条命令标权限' },
}

export function AiPage() {
  const { sectionKey } = useParams()
  const section = aiSection(sectionKey)
  const notes = notesInSection(section.key)
  return (
    <div className="article-shell">
      <div className="page-kicker">
        <span>公开学习路线</span>
        <span className="dot" />
        <span>AI</span>
      </div>
      <h1 className="hero-title">{section.pageTitle || 'AI，从结构走到能运行的应用'}</h1>
      <p className="hero-lead">
        {section.pageLead ||
          '每篇都可以在公开站读完。文末链接开放许可的材料和官方文档。已购手册的全文和配图只在本机阅读器连上时打开。'}
      </p>
      {!section.pageLead && <p className="muted">{section.lead}</p>}
      <div className="lesson-list">
        {notes.map((note, index) => (
          <Link key={note.key} className="lesson-row" to={`/ai/${section.key}/${note.key}`}>
            <span className="lesson-row-mark" aria-hidden>{index + 1}</span>
            <span>
              <strong>{note.title}</strong>
              <p>{note.scope}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AiNotePage() {
  const { sectionKey, noteKey } = useParams()
  const section = aiSection(sectionKey)
  const note = aiNote(section.key, noteKey)
  const { localReady } = useOutletContext<OutletCtx>()
  if (!note || note.section !== section.key) return <Navigate to={`/ai/${section.key}`} replace />

  return (
    <div className="article-shell">
      <div className="page-kicker">
        <Link to={`/ai/${section.key}`}>{section.label}</Link>
        <span className="dot" />
        <span>公开阅读</span>
      </div>
      <h1 className="hero-title">{note.title}</h1>
      <p className="hero-lead">{note.scope}</p>
      <AiDiagram name={note.key} />
      <div className="reading-copy">
        {note.reading.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {note.sources.length > 0 && (
        <section>
          <h2 className="page-title">对照阅读</h2>
          <div className="source-list">
            {note.sources.map((source) => (
              <a key={source.href} className="source-row" href={source.href} target="_blank" rel="noreferrer">
                <strong>{source.title}</strong>
                <small>{source.terms}</small>
              </a>
            ))}
          </div>
        </section>
      )}
      {note.practice && (
        <section>
          <h2 className="page-title">自己做一次</h2>
          <div className="reading-copy">
            <p>{note.practice}</p>
            {LAB_LINK[note.key] && (
              <p>
                <Link to={LAB_LINK[note.key].to}>{LAB_LINK[note.key].label}</Link>
              </p>
            )}
          </div>
        </section>
      )}
      <LocalCopy note={note} localReady={localReady} />
      <NoteNav note={note} />
    </div>
  )
}

function NoteNav({ note }: { note: AiNote }) {
  const { prev, next } = noteNeighbors(note)
  return (
    <nav className="note-nav" aria-label="前后文">
      {prev ? <Link to={`/ai/${prev.section}/${prev.key}`}>上一节 · {prev.title}</Link> : <span />}
      {next ? <Link to={`/ai/${next.section}/${next.key}`}>下一节 · {next.title}</Link> : <span />}
    </nav>
  )
}

function LocalCopy({ note, localReady }: { note: AiNote; localReady: boolean | null }) {
  if (!note.localId) return null
  if (localReady) {
    return (
      <p className="muted">
        <Link to={`/local/item/${encodeURIComponent(note.localId)}`}>打开本机保存的全文和配图</Link>
      </p>
    )
  }
  if (localReady === false) {
    return <p className="muted">已购全文在本机资料里。当前没有连上阅读器，所以这里不打开原文。</p>
  }
  return null
}
