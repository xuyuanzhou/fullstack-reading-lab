import { Button, Select, Table, Typography } from 'antd'
import { useMemo, useState } from 'react'
import {
  compareAgentVsWorkflow,
  L2_FAULT_CASES,
  resetL2Ledger,
  runL2,
  runL2FaultSuite,
  type L2Fault,
  type L2RunMode,
} from '@/labs/l2Agent'

export function L2Workbench({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<L2RunMode>('agent')
  const [fault, setFault] = useState<L2Fault>('none')
  const [result, setResult] = useState(() => {
    resetL2Ledger()
    return runL2({
      goal: '去杭州出差',
      user: { id: 'u1', role: 'employee', budgetCents: 200_000 },
      mode: 'agent',
    })
  })
  const suite = useMemo(() => runL2FaultSuite(), [])
  const compare = useMemo(() => compareAgentVsWorkflow(), [])

  return (
    <section className="ai-experiment">
      <h2 className="page-title">L2 工作台（mock 写操作，无密钥）</h2>
      <p className="muted">
        2 读工具 + 1 模拟预订；生成器 <code>mock-rules</code>；不是现场大模型，也不是真实下单。
      </p>
      <Table
        size="small"
        pagination={false}
        rowKey="fault"
        dataSource={suite}
        columns={[
          { title: '故障', dataIndex: 'fault', width: 160 },
          { title: '说明', dataIndex: 'note' },
          { title: '停机', dataIndex: 'stop', width: 120 },
          {
            title: '通过',
            dataIndex: 'ok',
            width: 70,
            render: (ok: boolean) => (ok ? '是' : '否'),
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      {!compact ? (
        <>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <Select
              value={mode}
              style={{ width: 140 }}
              onChange={setMode}
              options={[
                { value: 'agent', label: 'Agent' },
                { value: 'workflow', label: 'Workflow' },
              ]}
            />
            <Select
              value={fault}
              style={{ width: 220 }}
              onChange={setFault}
              options={L2_FAULT_CASES.map((item) => ({
                value: item.fault,
                label: `${item.fault} · ${item.note}`,
              }))}
            />
            <Button
              type="primary"
              onClick={() => {
                resetL2Ledger()
                setResult(
                  runL2({
                    goal: '去杭州出差',
                    user: { id: 'u1', role: 'employee', budgetCents: 200_000 },
                    mode,
                    fault,
                  }),
                )
              }}
            >
              跑轨迹
            </Button>
            <Button
              onClick={() => {
                const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const anchor = document.createElement('a')
                anchor.href = url
                anchor.download = `l2-${mode}-${fault}.json`
                anchor.click()
                URL.revokeObjectURL(url)
              }}
            >
              导出 JSON
            </Button>
          </div>
          <Typography.Paragraph>
            停机 <code>{result.stop}</code> · 预订 {result.bookedTripId || '无'} · 花费{' '}
            {result.spentCents} 分 · 审批 {result.approvalsIssued} 次
            {result.unverifiedLiveModel ? ' · 未接真实 LLM' : ''}
          </Typography.Paragraph>
          <Table
            size="small"
            rowKey={(_, index) => String(index)}
            dataSource={result.trace}
            columns={[
              { title: '步', dataIndex: 'step', width: 50 },
              { title: '类型', dataIndex: 'kind', width: 110 },
              { title: '说明', dataIndex: 'text' },
            ]}
            pagination={{ pageSize: 8 }}
            style={{ marginBottom: 16 }}
          />
          <Typography.Paragraph className="muted">
            Agent vs Workflow：同目标预订 {compare.sameBooking ? '一致' : '不一致'}（
            {compare.agent.bookedTripId} / {compare.workflow.bookedTripId}）。
            {compare.agentExtraValue}
          </Typography.Paragraph>
        </>
      ) : null}
    </section>
  )
}
