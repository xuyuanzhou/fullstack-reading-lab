import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { expect, test } from 'vitest'
import AdminApp from './AdminApp.vue'
import { createAdminRouter } from './router'

test('the draft route is a form, not the order list', async () => {
  const router = createAdminRouter(async () => [], createMemoryHistory())
  const app = mount(AdminApp, { global: { plugins: [router] } })
  await router.isReady()
  await flushPromises()
  expect(app.text()).toContain('还没有订单。')
  await app.get('a[href="/draft"]').trigger('click')
  await flushPromises()
  expect(app.text()).toContain('还没写备注。')
  expect(app.text()).not.toContain('还没有订单。')
})
