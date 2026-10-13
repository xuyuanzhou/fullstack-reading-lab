import { mount, flushPromises } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { OrderDenied, type ListedOrder } from '../orders'
import OrderBoard from './OrderBoard.vue'

test('an empty list, a loaded list, and a failed reload keep the filter', async () => {
  const empty = mount(OrderBoard, { props: { load: async () => [] } })
  expect(empty.text()).toContain('正在读取。')
  await flushPromises()
  expect(empty.text()).toContain('还没有订单。')

  const loaded = mount(OrderBoard, {
    props: { load: async () => [{ orderId: 7, sku: 'pen' }] satisfies ListedOrder[] },
  })
  await flushPromises()
  expect(loaded.text()).toContain('7 pen')

  let calls = 0
  const flaky = mount(OrderBoard, {
    props: {
      load: async () => {
        calls += 1
        if (calls === 1) return [{ orderId: 7, sku: 'pen' }]
        throw new Error('down')
      },
    },
  })
  await flushPromises()
  await flaky.get('input').setValue('pen')
  await flaky.get('button').trigger('click')
  await flushPromises()
  expect(flaky.text()).toContain('读取失败。')
  expect((flaky.get('input').element as HTMLInputElement).value).toBe('pen')
  expect(flaky.text()).toContain('7 pen')
})

test('a denied reload names not-owner and keeps the filter', async () => {
  let calls = 0
  const board = mount(OrderBoard, {
    props: {
      load: async () => {
        calls += 1
        if (calls === 1) return [{ orderId: 7, sku: 'pen' }]
        throw new OrderDenied('not-owner')
      },
    },
  })
  await flushPromises()
  await board.get('input').setValue('pen')
  await board.get('button').trigger('click')
  await flushPromises()
  expect(board.text()).toContain('not-owner')
  expect((board.get('input').element as HTMLInputElement).value).toBe('pen')
  expect(board.text()).toContain('7 pen')
})
