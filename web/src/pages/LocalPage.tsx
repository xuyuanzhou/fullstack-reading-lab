import { Alert, Breadcrumb, Button, Empty, Input, Space, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { localApi, type CatalogItem, type SubjectRow } from '@/api/localLibrary'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean }

export function LocalPage() {
  const { localReady } = useOutletContext<OutletCtx>()
  const progress = useProgress()
  const navigate = useNavigate()
  const [status, setStatus] = useState('正在读取导入状态…')
  const [subjects, setSubjects] = useState<SubjectRow[]>([])
  const [items, setItems] = useState<CatalogItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localReady) return
    void localApi
      .stats()
      .then((data) =>
        setStatus(
          `已导入 ${data.imported} / ${data.count} 份；${data.emptyText} 份未识别出文字，可查看原图继续核验。`,
        ),
      )
      .catch((error: Error) => setStatus(error.message))
  }, [localReady])

  useEffect(() => {
    if (!localReady) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        if (progress.localQuery || progress.localTopic) {
          const data = await localApi.catalog({
            category: progress.track,
            q: progress.localQuery,
            topic: progress.localTopic,
            offset: 0,
            limit: 100,
          })
          if (!cancelled) {
            setItems(data.items)
            setTotal(data.total)
            setSubjects([])
          }
        } else {
          const data = await localApi.subjects(progress.track)
          if (!cancelled) {
            setSubjects(data.subjects)
            setTotal(data.total)
            setItems([])
          }
        }
      } catch (error) {
        if (!cancelled) message.error((error as Error).message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [localReady, progress.track, progress.localQuery, progress.localTopic])

  if (!localReady) return <Navigate to="/knowledge" replace />

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title" style={{ fontSize: '2rem' }}>
          我的资料
        </h1>
        <p className="hero-lead">
          购买资料仅在本机打开，原文默认待核验；密码说明只在本机读取。每次批量处理最多 200 份资料。
        </p>
        <Typography.Text type="secondary">{status}</Typography.Text>
      </div>

      <Space wrap>
        <Input.Search
          allowClear
          placeholder="搜索文件名或正文…"
          value={progress.localQuery}
          onChange={(event) => progress.setLocalQuery(event.target.value)}
          onSearch={(value) => progress.setLocalQuery(value)}
          style={{ width: 320 }}
        />
        <Button
          onClick={async () => {
            setLoading(true)
            try {
              const data = await localApi.search({
                category: progress.track,
                q: progress.localQuery,
              })
              setItems(data.items)
              setSubjects([])
              setTotal(data.items.length)
            } catch (error) {
              message.error((error as Error).message)
            } finally {
              setLoading(false)
            }
          }}
        >
          搜索正文
        </Button>
        <Button
          onClick={async () => {
            try {
              await localApi.reindex()
              message.success('已开始处理下一批')
            } catch (error) {
              message.error((error as Error).message)
            }
          }}
        >
          处理下一批
        </Button>
      </Space>

      {progress.localTopic ? (
        <Breadcrumb
          items={[
            {
              title: (
                <a
                  onClick={() => {
                    progress.setLocalTopic('')
                  }}
                >
                  全部科目
                </a>
              ),
            },
            { title: progress.localTopic },
          ]}
        />
      ) : null}

      {subjects.length ? (
        <>
          <Typography.Text type="secondary">
            按科目浏览 {total} 份本机资料。原件目录不变，这里只是阅读分类。
          </Typography.Text>
          <div className="subject-grid">
            {subjects.map((item) => (
              <button
                key={item.subject}
                type="button"
                className="subject-tile"
                onClick={() => progress.setLocalTopic(item.subject)}
              >
                <strong>{item.subject}</strong>
                <span>{item.count} 份</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {items.length ? (
        <div>
          <Typography.Text type="secondary">
            {progress.localTopic || '搜索结果'} · {total} 份。原件不会离开本机。
          </Typography.Text>
          <div className="lesson-list" style={{ marginTop: 8 }}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="file-row"
                disabled={loading}
                onClick={() => navigate(`/local/item/${encodeURIComponent(item.id)}`)}
              >
                <span className="file-format">
                  {item.format || item.id.split('.').pop()?.toUpperCase()}
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>
                    {item.snippet || `${item.subject || ''} · ${item.path}`}
                  </p>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!loading && !subjects.length && !items.length ? <Empty description="没有匹配资料" /> : null}

      <Alert
        type="info"
        showIcon
        message="公开课由 React 应用承载。本机资料仍由 Python 阅读器提供 API；开发时运行 npm run dev，并保持 server.py 在 4180 端口。"
      />
    </div>
  )
}
