import { Alert, Breadcrumb, Button, Empty, Input, Space, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { localApi, type CatalogItem, type IndexJob, type SubjectRow } from '@/api/localLibrary'
import { LOCAL_CATEGORY_LABEL } from '@/data/meta'
import { useProgress } from '@/state/progress'
import type { LocalCategory } from '@/types/curriculum'

const PAGE_SIZE = 100

type OutletCtx = {
  localReady: boolean | null
  reconnectLocal?: () => Promise<boolean>
  localHost?: boolean
}

function statusLine(imported: number, count: number, emptyText: number, job?: IndexJob | null, failed?: number) {
  const base = `已导入 ${imported} / ${count} 份；${emptyText} 份尚无可靠文字。`
  if (job?.running) return `${base} 正在导入第 ${job.done}/${job.total || count} 批。`
  if (job?.error) return `${base} ${job.error}`
  if (failed) return `${base} ${failed} 份上次导入失败。`
  return base
}

export function LocalPage() {
  const { localReady, reconnectLocal, localHost } = useOutletContext<OutletCtx>()
  const progress = useProgress()
  const navigate = useNavigate()
  const [status, setStatus] = useState('正在读取导入状态…')
  const [job, setJob] = useState<IndexJob | null>(null)
  const [subjects, setSubjects] = useState<SubjectRow[]>([])
  const [items, setItems] = useState<CatalogItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [mode, setMode] = useState<'catalog' | 'fulltext'>('catalog')
  const [retry, setRetry] = useState(0)
  const [catalogEpoch, setCatalogEpoch] = useState(0)
  const wasRunning = useRef(false)

  useEffect(() => { setOffset(0) }, [progress.localCategory, progress.localQuery, progress.localTopic, mode])

  useEffect(() => {
    if (!localReady) return
    let active = true
    const load = () => {
      void localApi.stats().then((data) => {
        if (!active) return
        setJob(data.index ?? null)
        setStatus(statusLine(data.imported, data.count, data.emptyText, data.index, data.failed))
        if (wasRunning.current && !data.index?.running) setCatalogEpoch((value) => value + 1)
        wasRunning.current = !!data.index?.running
      }).catch((err: Error) => { if (active) setStatus(err.message) })
    }
    load()
    const running = job?.running
    const timer = running ? window.setInterval(load, 1500) : undefined
    return () => {
      active = false
      if (timer) window.clearInterval(timer)
    }
  }, [localReady, job?.running, catalogEpoch])

  useEffect(() => {
    if (!localReady) return
    let cancelled = false
    const timer = window.setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        if (mode === 'fulltext') {
          const data = await localApi.search({ category: progress.localCategory, q: progress.localQuery, offset, limit: PAGE_SIZE })
          if (!cancelled) { setItems(data.items); setSubjects([]); setTotal(0); setHasMore(!!data.hasMore) }
        } else if (progress.localQuery || progress.localTopic) {
          const data = await localApi.catalog({ category: progress.localCategory, q: progress.localQuery, topic: progress.localTopic, offset, limit: PAGE_SIZE })
          if (!cancelled) { setItems(data.items); setSubjects([]); setTotal(data.total); setHasMore(data.hasMore ?? offset + data.items.length < data.total) }
        } else {
          const data = await localApi.subjects(progress.localCategory)
          if (!cancelled) { setSubjects(data.subjects); setTotal(data.total); setItems([]); setHasMore(false) }
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message)
      } finally { if (!cancelled) setLoading(false) }
    }, 200)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [localReady, progress.localCategory, progress.localQuery, progress.localTopic, offset, mode, retry, catalogEpoch])

  if (localReady === null) return <div role="status">正在连接本机资料…</div>
  if (!localReady) {
    if (localHost) {
      return (
        <div className="article-shell">
          <Alert
            type="warning"
            showIcon
            title="还没有连上本机资料服务。"
            action={<Button onClick={() => void reconnectLocal?.()}>重新连接</Button>}
          />
        </div>
      )
    }
    return <Navigate to="/knowledge" replace />
  }

  return <div className="article-shell">
    <header>
      <h1 className="hero-title">我的资料</h1>
      <p className="hero-lead">按一级目录和科目阅读原件。AI 路线里的框架笔记带有配图，原始说法仍需逐项核验。</p>
      <div className="track-switch is-triple local-category" style={{ maxWidth: 360, marginBottom: 16 }}>
        {(Object.keys(LOCAL_CATEGORY_LABEL) as LocalCategory[]).map((category) => (
          <Button key={category} type={progress.localCategory === category ? 'primary' : 'default'} onClick={() => progress.setLocalCategory(category)}>
            {LOCAL_CATEGORY_LABEL[category]}
          </Button>
        ))}
      </div>
      <Typography.Text type="secondary">{status}</Typography.Text>
    </header>
    <div className="toolbar">
      <Input.Search className="toolbar-search" allowClear aria-label="搜索本机资料" placeholder="搜索文件名，或输入至少两个字搜索正文…" value={progress.localQuery} onChange={event => { setOffset(0); setMode('catalog'); progress.setLocalQuery(event.target.value) }} />
      <Button disabled={progress.localQuery.trim().length < 2} onClick={() => { setOffset(0); setMode('fulltext'); setRetry(value => value + 1) }}>搜索正文</Button>
      <Button
        loading={!!job?.running}
        disabled={!!job?.running}
        onClick={async () => {
          if (job?.running) {
            message.info('导入仍在进行，完成后会更新目录。')
            return
          }
          try {
            setJob((current) => current ? { ...current, running: true, error: null } : { running: true, done: 0, total: 0, error: null })
            await localApi.reindex()
            message.info('已开始处理下一批，完成后会更新目录。')
            setCatalogEpoch((value) => value + 1)
          } catch (err) {
            setJob((current) => ({ running: false, done: current?.done || 0, total: current?.total || 0, error: (err as Error).message }))
            message.error((err as Error).message)
          }
        }}
      >
        {job?.running ? '正在导入…' : '处理下一批'}
      </Button>
    </div>
    {job?.error && <Alert type="error" showIcon title={job.error} action={<Button onClick={() => setCatalogEpoch((value) => value + 1)}>刷新状态</Button>} />}
    {(progress.localTopic || mode === 'fulltext') && <Breadcrumb items={[
      { title: <Button type="link" onClick={() => { setMode('catalog'); setOffset(0); progress.setLocalTopic(''); progress.setLocalQuery('') }}>全部科目</Button> },
      { title: mode === 'fulltext' ? '正文搜索' : progress.localTopic },
    ]} />}
    {error && <Alert type="error" showIcon title={error} action={<Button onClick={() => setRetry(value => value + 1)}>重试</Button>} />}
    <div aria-busy={loading}>
      {loading && <p role="status">正在读取资料…</p>}
      {!!subjects.length && <><p className="muted">按科目浏览 {total} 份资料</p><div className="subject-grid">{subjects.map(item => <button key={item.subject} type="button" className="subject-tile" onClick={() => { setOffset(0); progress.setLocalTopic(item.subject) }}><strong>{item.subject}</strong><span>{item.count} 份</span></button>)}</div></>}
      {!!items.length && <><p className="muted">第 {offset + 1}–{offset + items.length} 份{mode === 'catalog' ? ` · 共 ${total} 份` : ' · 正文匹配结果'}</p><div className="lesson-list">{items.map(item => <button key={item.id} type="button" className="file-row" disabled={loading} onClick={() => navigate(`/local/item/${encodeURIComponent(item.id)}`)}><span className="file-format">{item.format || item.id.split('.').pop()?.toUpperCase()}</span><span><strong>{item.title}</strong><p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>{item.snippet || `${item.subject || ''} · ${item.path}`}</p></span></button>)}</div></>}
      {!loading && !error && !subjects.length && !items.length && <Empty description="没有匹配资料" />}
      {(offset > 0 || hasMore) && <Space className="source-pagination"><Button disabled={loading || offset === 0} onClick={() => setOffset(value => Math.max(0, value - PAGE_SIZE))}>上一页</Button><span>第 {Math.floor(offset / PAGE_SIZE) + 1} 页</span><Button disabled={loading || !hasMore} onClick={() => setOffset(value => value + PAGE_SIZE)}>下一页</Button></Space>}
    </div>
  </div>
}
