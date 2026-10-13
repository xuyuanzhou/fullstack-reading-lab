export type Order = {
  id: number
  sku: string
  amount: string
}

export type Draft = {
  sku: string
  amount: string
}

/** 页面上的金额检查。服务端仍要再查一次，类型声明不能代替这次检查。 */
export function amountProblem(amount: string): string | null {
  const text = amount.trim()
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return 'invalid-amount'
  if (Number(text) <= 0) return 'invalid-amount'
  return null
}

export function renderOrders(orders: readonly Order[]): string {
  if (orders.length === 0) return '还没有订单。'
  return orders.map((order) => `${order.id} ${order.sku} ${order.amount}`).join('\n')
}

export function nextDraft(draft: Draft, accepted: boolean): Draft {
  if (!accepted) return { sku: draft.sku, amount: draft.amount }
  return { sku: '', amount: '' }
}
