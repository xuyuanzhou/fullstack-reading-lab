export type ListedOrder = {
  orderId: number
  sku: string
}

export class OrderDenied extends Error {
  readonly type: string

  constructor(type: string) {
    super(type)
    this.type = type
  }
}
