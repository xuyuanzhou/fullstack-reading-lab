import {
  Alert,
  Breadcrumb,
  Button,
  Input,
  InputNumber,
  Space,
  Tabs,
  Typography,
  message,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { localApi, type ItemPayload } from '@/api/localLibrary'
import { LocalReading } from '@/components/LocalReading'
import { useProgress } from '@/state/progress'

type OutletCtx = {
  localReady: boolean | null
  reconnectLocal?: () => Promise<boolean>
  localHost?: boolean
}

export function LocalItemPage() {
  const { itemId = '' } = useParams()
  const id = itemId
  const { localReady, reconnectLocal, localHost } = useOutletContext<OutletCtx>()
  const progress = useProgress()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageDraft, setPageDraft] = useState(1)
  const [item, setItem] = useState<ItemPayload | null>(null)
  const [text, setText] = useState('')
  const [ocrStatus, setOcrStatus] = useState('')
  const [error, setError] = useState('')
  const [zoomed, setZoomed] = useState(false)
  const [ocrBusy, setOcrBusy] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [auditDrafts, setAuditDrafts] = useState<Record<string, string>>({})
  const [auditHint, setAuditHint] = useState('')
  const ocrRequest = useRef(0)
  const viewRef = useRef({ id: '', page: 1 })

  useEffect(() => {
    setPage(1)
    setPageDraft(1)
  }, [id])

  useEffect(() => {
    viewRef.current = { id, page }
    ocrRequest.current += 1
  }, [id, page])

  useEffect(() => {
    if (!localReady || !id) return
    let cancelled = false
    setPageLoading(true)
    void localApi
      .item(id, page)
      .then((data) => {
        if (cancelled) return
        setItem(data)
        setText(data.text || data.candidateText || '')
        setOcrStatus(data.ocrError || '')
        setError('')
        if (data.page !== page) setPage(data.page)
        setPageDraft(data.page)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setPageLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, page, localReady])

  if (localReady === null) return <div role="status">正在连接本机资料…</div>
  if (!localReady) {
    if (localHost) {
      return (
        <Space direction="vertical">
          <Alert type="warning" message="还没有连上本机资料服务。" />
          <Button onClick={() => void reconnectLocal?.()}>重新连接</Button>
        </Space>
      )
    }
    return <Navigate to="/knowledge" replace />
  }
  if (error) {
    return (
      <Space direction="vertical">
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/local')}>返回资料库</Button>
      </Space>
    )
  }
  if (!item) return <Typography.Text type="secondary">正在本机读取资料…</Typography.Text>

  const visual = ['PDF', 'PNG', 'JPG', 'JPEG', 'WEBP'].includes(item.format)
  const auditKey = `${item.id}#p${item.page}`
  const savedNote = progress.audit[auditKey]?.note || ''
  const auditNote = Object.hasOwn(auditDrafts, auditKey) ? auditDrafts[auditKey] : savedNote
  const goPage = (next: number) => {
    const pages = item.pages || 1
    const clamped = Math.min(pages, Math.max(1, Math.round(next) || 1))
    setPage(clamped)
    setPageDraft(clamped)
  }

  return (
    <div className="article-shell">
      <Breadcrumb
        items={[
          { title: <Link to="/local">我的资料</Link> },
          { title: item.subject || item.format },
        ]}
      />
      <div>
        <Typography.Text type="secondary">
          ORIGINAL MATERIAL / 待核验 · 第 {item.page} / {item.pages} 页
        </Typography.Text>
        <h1 className="hero-title" style={{ marginTop: 8 }}>
          {item.title}
        </h1>
        <Typography.Paragraph type="secondary">{item.path}</Typography.Paragraph>
        {item.websites?.length ? (
          <Typography.Paragraph type="secondary">
            来源网站：
            {item.websites.map((site) => (
              <a key={site} href={site} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                {site}
              </a>
            ))}
          </Typography.Paragraph>
        ) : null}
      </div>

      <Alert
        type="warning"
        showIcon
        message="这是你本机题库的原文，可能过时或存在错误。请核对版本与官方依据。"
      />

      {item.pages > 1 ? (
        <div className="pager">
          <Button disabled={pageLoading || item.page === 1} onClick={() => goPage(item.page - 1)}>
            ← 上一页
          </Button>
          <InputNumber
            min={1}
            max={item.pages}
            value={pageDraft}
            disabled={pageLoading}
            onChange={(value) => setPageDraft(Number(value) || 1)}
            onPressEnter={() => goPage(pageDraft)}
          />
          <Button disabled={pageLoading || pageDraft === page} onClick={() => goPage(pageDraft)}>跳转</Button>
          <Button
            disabled={pageLoading || item.page === item.pages}
            onClick={() => goPage(item.page + 1)}
          >
            下一页 →
          </Button>
        </div>
      ) : null}

      <Tabs
        items={[
          ...(item.format === 'MD'
            ? [{
                key: 'reading',
                label: '阅读',
                children: <LocalReading docId={item.id} text={text} />,
              }]
            : []),
          ...(visual
            ? [
                {
                  key: 'visual',
                  label: '原版页面 / 图片',
                  children: (
                    <div className={`source-frame${zoomed ? ' is-zoomed' : ''}`}>
                      <img
                        src={localApi.mediaUrl(item.id, item.page)}
                        alt={`${item.title} 第 ${item.page} 页`}
                      />
                      <div style={{ marginTop: 8 }}>
                        <Button size="small" onClick={() => setZoomed((value) => !value)}>
                          {zoomed ? '缩小至适合页面' : '1:1 放大查看'}
                        </Button>
                      </div>
                    </div>
                  ),
                },
              ]
            : []),
          {
            key: 'text',
            label: '可复制文字',
            children: (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space wrap>
                  {visual ? (
                    <Button
                      loading={ocrBusy}
                      disabled={ocrBusy}
                      onClick={async () => {
                        const requestId = ++ocrRequest.current
                        const askedId = item.id
                        const askedPage = item.page
                        setOcrBusy(true)
                        setOcrStatus('正在本机识别页面文字…')
                        try {
                          const result = await localApi.ocr(askedId, askedPage)
                          if (requestId !== ocrRequest.current) return
                          if (viewRef.current.id !== askedId || viewRef.current.page !== askedPage) return
                          setText(result.text)
                          setOcrStatus('识别完成。请对照原版页面校对文字。')
                        } catch (err) {
                          if (requestId !== ocrRequest.current) return
                          if (viewRef.current.id !== askedId || viewRef.current.page !== askedPage) return
                          setOcrStatus((err as Error).message)
                        } finally {
                          if (requestId === ocrRequest.current) setOcrBusy(false)
                        }
                      }}
                    >
                      识别页面图片中的文字
                    </Button>
                  ) : null}
                  <Button
                    onClick={async () => {
                      if (!text.trim()) {
                        setOcrStatus('当前没有可复制文字，请先识别或查看原图。')
                        return
                      }
                      try {
                        await navigator.clipboard.writeText(text)
                        message.success('已复制')
                      } catch {
                        setOcrStatus('请手动选择文字后复制。')
                      }
                    }}
                  >
                    复制本页文字
                  </Button>
                  {item.hasFullText ? (
                    <Button
                      onClick={async () => {
                        try {
                          const result = await localApi.parsed(item.id)
                          await navigator.clipboard.writeText(result.text)
                          message.success('全文已复制')
                        } catch (err) {
                          setOcrStatus((err as Error).message)
                        }
                      }}
                    >
                      复制此文件全文
                    </Button>
                  ) : null}
                </Space>
                <Typography.Text type="secondary">
                  普通 PDF 优先显示原有文字层；图片文字由 OCR 识别，可能需要人工校对。
                </Typography.Text>
                <Input.TextArea rows={18} value={text} onChange={(event) => setText(event.target.value)} />
                {ocrStatus ? <Typography.Text type="secondary">{ocrStatus}</Typography.Text> : null}
              </Space>
            ),
          },
        ]}
      />

      <div>
        <Typography.Title level={4}>本页核验笔记</Typography.Title>
        <Input.TextArea
          rows={5}
          value={auditNote}
          placeholder="记录具体说法、你的判断和依据链接。"
          id="audit-note"
          onChange={(event) => {
            const value = event.target.value
            setAuditDrafts((current) => ({ ...current, [auditKey]: value }))
            setAuditHint(value === savedNote ? '' : '草稿已留在本页，翻页不会丢掉。尚未写入浏览器。')
          }}
        />
        <Button
          type="primary"
          style={{ marginTop: 12 }}
          onClick={() => {
            progress.saveAudit(auditKey, auditNote)
            if (progress.storageIssue) {
              setAuditHint(progress.storageIssue)
              message.error('笔记还在本页，但没能写入浏览器。')
              return
            }
            setAuditHint('已更新本页笔记。浏览器写入稍后完成；若上方出现存储警告，则尚未落盘。')
            message.success('已更新本页笔记')
          }}
        >
          保存本页笔记
        </Button>
        {auditHint ? <Typography.Text type="secondary" style={{ display: 'block', marginTop: 8 }}>{auditHint}</Typography.Text> : null}
      </div>
    </div>
  )
}
