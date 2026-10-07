import { Button, Radio, Typography, Upload, message } from 'antd'
import { useState } from 'react'
import {
  applyAiBackup,
  buildAiBackup,
  parseAiBackup,
  type ImportMode,
} from '@/labs/aiBackup'
import { useProgress } from '@/state/progress'

export function AiBackupPanel() {
  const progress = useProgress()
  const [mode, setMode] = useState<ImportMode>('merge')

  return (
    <div className="aside-block">
      <h5>成果备份（U06）</h5>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        只导出 AI 笔记/完成/自评。导入须选模式，合并时不覆盖已有非空笔记。
      </Typography.Text>
      <Button
        size="small"
        style={{ marginBottom: 8 }}
        onClick={() => {
          const file = buildAiBackup(progress)
          const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const anchor = document.createElement('a')
          anchor.href = url
          anchor.download = `ai-progress-${file.exportedAt.slice(0, 10)}.json`
          anchor.click()
          URL.revokeObjectURL(url)
        }}
      >
        导出 JSON
      </Button>
      <div style={{ marginBottom: 8 }}>
        <Radio.Group
          size="small"
          value={mode}
          onChange={(event) => setMode(event.target.value)}
          options={[
            { label: '合并', value: 'merge' },
            { label: '替换 AI 字段', value: 'replace' },
          ]}
        />
      </div>
      <Upload
        accept="application/json,.json"
        showUploadList={false}
        beforeUpload={(file) => {
          file
            .text()
            .then((text) => {
              let raw: unknown
              try {
                raw = JSON.parse(text)
              } catch {
                message.error('JSON 无法解析')
                return
              }
              const parsed = parseAiBackup(raw)
              if (!parsed.ok) {
                message.error(parsed.error)
                return
              }
              const applied = applyAiBackup(progress, parsed.next, mode)
              progress.replaceAiProgress({
                aiDone: applied.state.aiDone,
                aiReview: applied.state.aiReview,
                aiRecent: applied.state.aiRecent,
                aiNotes: applied.state.aiNotes,
                aiQuery: applied.state.aiQuery,
                aiSkippedPrereq: applied.state.aiSkippedPrereq,
                aiDrillScores: applied.state.aiDrillScores,
              })
              if (applied.warnings.length) {
                message.warning(applied.warnings.slice(0, 2).join('；'))
              } else {
                message.success(mode === 'merge' ? '已合并导入' : '已替换 AI 进度')
              }
            })
            .catch(() => message.error('读取文件失败'))
          return false
        }}
      >
        <Button size="small">导入 JSON</Button>
      </Upload>
    </div>
  )
}
