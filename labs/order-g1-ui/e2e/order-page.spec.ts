import { expect, test } from '@playwright/test'

test('react keeps the form after sold-out, and vue keeps its own note', async ({ page }) => {
  await page.route('**/orders', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ type: 'sold-out' }),
      })
      return
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ orderId: 7, sku: 'pen' }]),
    })
  })

  await page.goto('/')
  await expect(page.getByText('7 pen')).toBeVisible()
  await page.getByLabel('商品', { exact: true }).fill('pen')
  await page.getByLabel('幂等键', { exact: true }).fill('same-key')
  await page.getByRole('button', { name: '提交' }).click()
  await expect(page.getByText('sold-out')).toBeVisible()
  await expect(page.getByLabel('商品', { exact: true })).toHaveValue('pen')
  await expect(page.getByLabel('幂等键', { exact: true })).toHaveValue('same-key')

  await page.getByRole('link', { name: '查看已提交' }).click()
  await expect(page.getByText('路由订单 4')).toBeVisible()
  await page.getByRole('button', { name: '标成已看到' }).click()
  await expect(page.getByRole('button', { name: '已看到' })).toBeVisible()

  await page.getByRole('link', { name: '补记' }).click()
  await expect(page.getByText('还没写备注。')).toBeVisible()
  await page.getByLabel('商品标识', { exact: true }).fill('pen')
  await page.getByLabel('备注', { exact: true }).fill('补一笔')
  await page.getByRole('button', { name: '记下' }).click()
  await expect(page.getByText('已记下。')).toBeVisible()
  await expect(page.getByLabel('商品标识', { exact: true })).toHaveValue('pen')
  await expect(page.getByLabel('备注', { exact: true })).toHaveValue('补一笔')
})
