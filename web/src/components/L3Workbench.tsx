import { Button, Checkbox, Input, Typography } from 'antd'
import { useState } from 'react'

const FIELDS = [
  { id: 'task', label: '公开小任务与数据来源' },
  { id: 'split', label: '训练/验证/留出划分（先划分）' },
  { id: 'model', label: '底座模型 id / revision' },
  { id: 'deps', label: '依赖与版本（torch 等）' },
  { id: 'seed', label: '随机种子' },
  { id: 'config', label: '训练配置（步数、lr、LoRA rank…）' },
  { id: 'ops', label: '三种对照：base / 提示 / LoRA' },
  { id: 'eval', label: '评测步骤与指标（含退化检查）' },
  { id: 'hardware', label: '硬件声明（CPU/GPU/未跑）' },
  { id: 'honest', label: '未跑项已标未验证，无编造涨点' },
] as const

export function L3Workbench() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [note, setNote] = useState('')

  const card = {
    format: 'reading-lab.l3-experiment-card',
    version: 1,
    generator: 'checklist',
    unverifiedLiveTraining: true,
    fields: FIELDS.map((field) => ({
      id: field.id,
      label: field.label,
      done: Boolean(checked[field.id]),
    })),
    note,
    completed: FIELDS.filter((field) => checked[field.id]).length,
    total: FIELDS.length,
  }

  return (
    <section className="ai-experiment">
      <h2 className="page-title">L3 实验卡（清单，非训练器）</h2>
      <p className="muted">
        不产生假准确率。勾选你已写明的字段；本机未训练时保持 unverifiedLiveTraining=true。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {FIELDS.map((field) => (
          <Checkbox
            key={field.id}
            checked={Boolean(checked[field.id])}
            onChange={(event) =>
              setChecked((prev) => ({ ...prev, [field.id]: event.target.checked }))
            }
          >
            {field.label}
          </Checkbox>
        ))}
      </div>
      <Input.TextArea
        rows={3}
        placeholder="可选：本机实际命令或“仅 CPU 流程演练”说明"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Typography.Paragraph>
        已勾选 {card.completed}/{card.total} · 未代跑真实训练
      </Typography.Paragraph>
      <Button
        type="primary"
        onClick={() => {
          const blob = new Blob([JSON.stringify(card, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const anchor = document.createElement('a')
          anchor.href = url
          anchor.download = 'l3-experiment-card.json'
          anchor.click()
          URL.revokeObjectURL(url)
        }}
      >
        导出实验卡 JSON
      </Button>
    </section>
  )
}
