import { useState, type FormEvent } from 'react'

export type PlaceResult =
  | { ok: true; orderId: number; replay: boolean }
  | { ok: false; type: string }

export type PlaceOrder = (input: { sku: string; idempotencyKey: string }) => Promise<PlaceResult>

export function OrderForm({ place }: { place: PlaceOrder }) {
  const [sku, setSku] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState('')
  const [phase, setPhase] = useState<'idle' | 'loading' | 'success' | 'failure'>('idle')
  const [notice, setNotice] = useState('还没有订单。')

  async function submit(event: FormEvent) {
    event.preventDefault()
    setPhase('loading')
    setNotice('正在提交。')
    const result = await place({ sku, idempotencyKey })
    if (result.ok) {
      setPhase('success')
      setNotice(result.replay ? `已有订单 ${result.orderId}` : `新订单 ${result.orderId}`)
      return
    }
    setPhase('failure')
    setNotice(result.type)
    setSku('')
    setIdempotencyKey('')
  }

  return (
    <form onSubmit={submit}>
      <p>{notice}</p>
      <p>按钮在提交过程中不能再点。这不能保证库存只减一次。</p>
      <label>
        商品
        <input value={sku} onChange={(event) => setSku(event.target.value)} />
      </label>
      <label>
        幂等键
        <input value={idempotencyKey} onChange={(event) => setIdempotencyKey(event.target.value)} />
      </label>
      <button type="submit" disabled={phase === 'loading'}>提交</button>
    </form>
  )
}
