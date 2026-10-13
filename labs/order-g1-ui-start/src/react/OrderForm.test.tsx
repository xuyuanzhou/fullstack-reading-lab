import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { OrderForm, type PlaceOrder } from './OrderForm'

afterEach(cleanup)

test('a failed submit keeps the sku and the idempotency key', async () => {
  let finish: (result: Awaited<ReturnType<PlaceOrder>>) => void = () => {}
  const place: PlaceOrder = () => new Promise((resolve) => {
    finish = resolve
  })
  render(<OrderForm place={place} />)
  expect(screen.getByText('还没有订单。')).toBeTruthy()
  fireEvent.change(screen.getByLabelText('商品'), { target: { value: 'pen' } })
  fireEvent.change(screen.getByLabelText('幂等键'), { target: { value: 'same-key' } })
  fireEvent.click(screen.getByRole('button', { name: '提交' }))
  expect(screen.getByText('正在提交。')).toBeTruthy()
  expect((screen.getByRole('button', { name: '提交' }) as HTMLButtonElement).disabled).toBe(true)
  finish({ ok: false, type: 'sold-out' })
  expect(await screen.findByText('sold-out')).toBeTruthy()
  expect((screen.getByLabelText('商品') as HTMLInputElement).value).toBe('pen')
  expect((screen.getByLabelText('幂等键') as HTMLInputElement).value).toBe('same-key')
  expect((screen.getByRole('button', { name: '提交' }) as HTMLButtonElement).disabled).toBe(false)
})

test('not-owner keeps the sku and the idempotency key', async () => {
  const place: PlaceOrder = async () => ({ ok: false, type: 'not-owner' })
  render(<OrderForm place={place} />)
  fireEvent.change(screen.getByLabelText('商品'), { target: { value: 'pen' } })
  fireEvent.change(screen.getByLabelText('幂等键'), { target: { value: 'same-key' } })
  fireEvent.click(screen.getByRole('button', { name: '提交' }))
  expect(await screen.findByText('not-owner')).toBeTruthy()
  expect((screen.getByLabelText('商品') as HTMLInputElement).value).toBe('pen')
  expect((screen.getByLabelText('幂等键') as HTMLInputElement).value).toBe('same-key')
})

test('a created order shows the id and keeps the key for a retry', async () => {
  const place: PlaceOrder = async () => ({ ok: true, orderId: 4, replay: false })
  render(<OrderForm place={place} />)
  fireEvent.change(screen.getByLabelText('幂等键'), { target: { value: 'same-key' } })
  fireEvent.click(screen.getByRole('button', { name: '提交' }))
  expect(await screen.findByText('新订单 4')).toBeTruthy()
  expect((screen.getByLabelText('幂等键') as HTMLInputElement).value).toBe('same-key')
})
