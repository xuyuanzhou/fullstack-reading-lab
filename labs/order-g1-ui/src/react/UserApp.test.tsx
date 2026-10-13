import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { UserApp } from './UserApp'

afterEach(() => {
  window.location.hash = ''
  cleanup()
})

test('the sent route reads the order id and keeps its own seen state', async () => {
  render(<UserApp place={async () => ({ ok: false, type: 'sold-out' })} />)
  fireEvent.click(screen.getByRole('link', { name: '查看已提交' }))
  expect(await screen.findByText('路由订单 4')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '标成已看到' }))
  expect(screen.getByRole('button', { name: '已看到' })).toBeTruthy()
})
