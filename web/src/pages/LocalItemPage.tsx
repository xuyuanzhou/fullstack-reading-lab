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
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { localApi, type ItemPayload } from '@/api/localLibrary'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean }

export function LocalItemPage() {
  const { itemId = '' } = useParams()
  const id = decodeURIComponent(itemId)
  const { localReady } = useOutletContext<OutletCtx>()
  const progress = useProgress()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [item, setItem] = useState<ItemPayload | null>(null)
  const [text, setText] = useState('')
  const [ocrStatus, setOcrStatus] = useState('')
  const [error, setError] = useState('')
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!localReady || !id) return
    let cancelled = false
    void localApi
      .item(id, page)
      .then((data) => {
        if (cancelled) return
        setItem(data)
        setText(data.text || data.candidateText || '')
        setOcrStatus(data.ocrError || '')
        setError('')
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [id, page, localReady])

  if (!localReady) return <Navigate to="/knowledge" replace />
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

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
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
        <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 4 }}>
          {item.title}
        </Typography.Title>
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
        <Space>
          <Button disabled={item.page === 1} onClick={() => setPage((value) => value - 1)}>
            ← 上一页
          </Button>
          <InputNumber
            min={1}
            max={item.pages}
            value={page}
            onChange={(value) => setPage(Number(value) || 1)}
          />
          <Button onClick={() => setPage(page)}>跳转</Button>
          <Button
            disabled={item.page === item.pages}
            onClick={() => setPage((value) => value + 1)}
          >
            下一页 →
          </Button>
        </Space>
      ) : null}

      <Tabs
        items={[
          ...(visual
            ? [
                {
                  key: 'visual',
                  label: '原版页面 / 图片',
                  children: (
                    <div>
                      <img
                        src={localApi.mediaUrl(item.id, item.page)}
                        alt={`${item.title} 第 ${item.page} 页`}
                        style={{
                          maxWidth: zoomed ? 'none' : '100%',
                          width: zoomed ? 'auto' : '100%',
                          border: '1px solid var(--lab-line)',
                        }}
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
                      onClick={async () => {
                        setOcrStatus('正在本机识别页面文字…')
                        try {
                          const result = await localApi.ocr(item.id, item.page)
                          setText(result.text)
                          setOcrStatus('识别完成。请对照原版页面校对文字。')
                        } catch (err) {
                          setOcrStatus((err as Error).message)
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
          defaultValue={progress.audit[auditKey]?.note || ''}
          key={auditKey}
          placeholder="记录具体说法、你的判断和依据链接。"
          id="audit-note"
        />
        <Button
          type="primary"
          style={{ marginTop: 12 }}
          onClick={() => {
            const el = document.getElementById('audit-note') as HTMLTextAreaElement | null
            progress.saveAudit(auditKey, el?.value || '')
            message.success('已保存在本浏览器')
          }}
        >
          保存本页笔记
        </Button>
      </div>
    </Space>
  )
}
