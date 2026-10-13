import type { ListedOrder } from './orders'
import type { PlaceOrder } from './react/OrderForm'

export function httpApi(base = ''): { load: () => Promise<ListedOrder[]>; place: PlaceOrder } {
  return {
    async load() {
      const response = await fetch(`${base}/orders`)
      if (!response.ok) throw new Error(String(response.status))
      return response.json() as Promise<ListedOrder[]>
    },
    async place(input) {
      try {
        const response = await fetch(`${base}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': input.idempotencyKey,
          },
          body: JSON.stringify({ sku: input.sku }),
        })
        const body = await response.json() as { orderId?: number; replay?: boolean; type?: string }
        if (response.status === 201 || response.status === 200) {
          return { ok: true, orderId: Number(body.orderId), replay: Boolean(body.replay) }
        }
        return { ok: false, type: body.type ?? 'rejected' }
      } catch {
        return { ok: false, type: '网络未达' }
      }
    },
  }
}
