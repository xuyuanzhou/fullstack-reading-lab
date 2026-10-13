import assert from 'node:assert/strict'
import test from 'node:test'
import { amountProblem, nextDraft, renderOrders } from './orders.ts'

test('three synthetic orders keep submit order, and an empty list says so', () => {
  assert.equal(renderOrders([]), '还没有订单。')
  const text = renderOrders([
    { id: 1, sku: 'pen', amount: '1.50' },
    { id: 2, sku: 'book', amount: '12.00' },
    { id: 3, sku: 'cup', amount: '3.25' },
  ])
  assert.match(text, /pen[\s\S]*book[\s\S]*cup/)
})

test('illegal amounts are rejected and a failed submit keeps the draft', () => {
  assert.equal(amountProblem('-1.00'), 'invalid-amount')
  assert.equal(amountProblem('1.234'), 'invalid-amount')
  assert.equal(amountProblem('1.50'), null)
  const draft = { sku: 'pen', amount: '-1.00' }
  assert.deepEqual(nextDraft(draft, false), draft)
  assert.deepEqual(nextDraft(draft, true), { sku: '', amount: '' })
})
