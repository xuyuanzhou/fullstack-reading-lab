import { Button, Select, Table, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { L1_DOCS, L1_EVAL, L1_LICENSE } from '@/data/l1Corpus'
import { compareRetrieveModes, runL1Eval, type RetrieveMode } from '@/labs/l1EvalRunner'

export function L1Workbench({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<RetrieveMode>('hybrid')
  const [report, setReport] = useState(() => runL1Eval('hybrid'))
  const compare = useMemo(() => compareRetrieveModes(), [])

  return (
    <section className="ai-experiment">
      <h2 className="page-title">L1 工作台（mock，无密钥）</h2>
      <p className="muted">{L1_LICENSE}</p>
      <p>
        语料 {L1_DOCS.length} 篇 · 冻结题 {L1_EVAL.length} 道 · 生成器{' '}
        <code>mock-rules</code>（不是现场大模型）
      </p>
      <Table
        size="small"
        pagination={false}
        rowKey="mode"
        dataSource={compare}
        columns={[
          { title: '模式', dataIndex: 'mode' },
          {
            title: 'Mean Recall@5',
            dataIndex: 'meanRecallAt5',
            render: (value: number) => value.toFixed(3),
          },
          {
            title: '答案通过率',
            dataIndex: 'answerOkRate',
            render: (value: number) => value.toFixed(3),
          },
          { title: '权限失败', dataIndex: 'aclFailures' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {!compact ? (
        <>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <Select
              value={mode}
              style={{ width: 160 }}
              onChange={(value) => setMode(value)}
              options={[
                { value: 'keyword', label: '关键词' },
                { value: 'overlap', label: '重叠替身' },
                { value: 'hybrid', label: '混合' },
              ]}
            />
            <Button
              type="primary"
              onClick={() => setReport(runL1Eval(mode))}
            >
              跑评测
            </Button>
            <Button
              onClick={() => {
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const anchor = document.createElement('a')
                anchor.href = url
                anchor.download = `l1-eval-${mode}.json`
                anchor.click()
                URL.revokeObjectURL(url)
              }}
            >
              导出 JSON
            </Button>
          </div>
          <Typography.Paragraph>
            当前：{report.mode} · Recall@5 {report.meanRecallAt5.toFixed(3)} · 答案{' '}
            {report.answerOkRate.toFixed(3)} · 权限失败 {report.aclFailures}
            {report.unverifiedLiveModel ? ' · 未接真实 LLM' : ''}
          </Typography.Paragraph>
          <Table
            size="small"
            rowKey="id"
            dataSource={report.cases.filter((item) => !item.answerOk).slice(0, 8)}
            locale={{ emptyText: '当前模式无答案失败题（或已全部通过）' }}
            columns={[
              { title: '题号', dataIndex: 'id', width: 70 },
              { title: '类型', dataIndex: 'kind', width: 90 },
              { title: '问题', dataIndex: 'question' },
              {
                title: 'R@5',
                dataIndex: 'recallAt5',
                width: 70,
                render: (value: number) => value.toFixed(2),
              },
            ]}
          />
        </>
      ) : null}
    </section>
  )
}
