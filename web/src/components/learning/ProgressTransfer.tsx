import { useRef, useState } from 'react'
import { aiNoteById } from '@/data/aiCatalog'
import { findLesson } from '@/data/curriculum'
import { useProgress } from '@/state/progress'
import {
  applyProgress,
  buildProgressFile,
  previewProgress,
  type ProgressBackupMode,
  type ProgressCatalog,
} from '@/state/progressTransfer'

const catalog: ProgressCatalog = {
  lesson: (id) => Boolean(findLesson(id)),
  aiLesson: (id) => Boolean(aiNoteById(id)),
}

function listed(ids: string[]) {
  const head = ids.slice(0, 6)
  const rest = ids.length - head.length
  return head.join('、') + (rest > 0 ? `，还有 ${rest} 条` : '')
}

export function ProgressTransfer() {
  const progress = useProgress()
  const input = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<ProgressBackupMode>('merge')
  const [raw, setRaw] = useState<unknown>(null)
  const [fileName, setFileName] = useState('')
  const [notice, setNotice] = useState('')
  const preview = raw == null ? null : previewProgress(raw, progress, mode, catalog)

  const download = () => {
    const file = buildProgressFile(progress, catalog)
    if (!file.ok) {
      setNotice(file.issue)
      return
    }
    const url = URL.createObjectURL(new Blob([file.json], { type: 'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `learning-progress-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('已开始下载。文件里是已读、笔记、勾选和选择题作答。技能树会在导入后重新点亮。')
  }

  const readFile = (file: File | undefined) => {
    if (!file) return
    setFileName(file.name)
    file.text().then((text) => {
      try {
        setRaw(JSON.parse(text))
        setNotice('')
      } catch {
        setRaw(null)
        setNotice('文件不是 JSON。')
      }
    }).catch(() => {
      setRaw(null)
      setNotice('文件没有读出来。')
    })
  }

  const commit = () => {
    if (raw == null) return
    const applied = applyProgress(progress, raw, mode, catalog)
    if (!applied.ok) {
      setNotice(applied.issue)
      return
    }
    const result = progress.importProgress(applied.state)
    if (!result.ok) {
      setNotice(result.issue)
      return
    }
    setRaw(null)
    setFileName('')
    setNotice(mode === 'merge' ? '已合并到本机记录。' : '已按文件替换本机进度。')
  }

  return (
    <details className="skill-transfer">
      <summary>带走进度</summary>
      <p className="skill-transfer-note">
        导出一份文件。亮着的印章不放进文件，导入后再按已读的课点亮。
        合并留下本机已有的非空笔记。任务进度保留更高的一步。替换会改掉已读、笔记、勾选和选择题作答。
      </p>
      {progress.learningReadonly ? <p className="skill-transfer-note" role="status">记录版本比本页新，不能改写。</p> : null}
      <div className="skill-transfer-actions">
        <button type="button" className="skill-scene" disabled={progress.learningReadonly} onClick={download}>导出</button>
        <button type="button" className="skill-scene" disabled={progress.learningReadonly} onClick={() => input.current?.click()}>选择文件</button>
        <input
          ref={input}
          type="file"
          accept="application/json,.json"
          hidden
          aria-label="选择进度文件"
          onChange={(event) => readFile(event.target.files?.[0])}
        />
      </div>
      {fileName ? <p className="skill-transfer-note">{fileName}</p> : null}
      <div className="skill-transfer-actions" role="group" aria-label="导入方式">
        <button type="button" className="skill-scene" aria-pressed={mode === 'merge'} onClick={() => setMode('merge')}>合并</button>
        <button type="button" className="skill-scene" aria-pressed={mode === 'replace'} onClick={() => setMode('replace')}>替换</button>
      </div>
      {preview?.ok ? (
        <div className="skill-transfer-preview">
          <p>
            写入后已读 {preview.done} 课，笔记 {preview.notes} 条，技能树点亮 {preview.lit} 项，选择题作答 {preview.drillAnswers} 条。
          </p>
          {preview.noteConflicts.length ? (
            <p>
              {mode === 'merge' ? '这些笔记留下本机：' : '替换会改掉这些笔记：'}
              {listed(preview.noteConflicts)}
            </p>
          ) : null}
          {preview.unknownLessons.length ? <p>不认识的课号不会写入：{listed(preview.unknownLessons)}</p> : null}
          {preview.unknownQuestions > 0 ? <p>有 {preview.unknownQuestions} 条选择题不在当前题库，不会写入。</p> : null}
          {preview.unknownChecks.length ? <p>不认识的勾选不会写入：{listed(preview.unknownChecks)}</p> : null}
        </div>
      ) : preview ? <p className="skill-transfer-note" role="status">{preview.issue}</p> : null}
      <div className="skill-transfer-actions">
        <button type="button" className="skill-scene" disabled={!preview?.ok || progress.learningReadonly} onClick={commit}>
          {mode === 'merge' ? '确认合并' : '确认替换'}
        </button>
      </div>
      {notice ? <p className="skill-transfer-note" role="status">{notice}</p> : null}
    </details>
  )
}
