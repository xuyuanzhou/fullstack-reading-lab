import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DraftForm from './DraftForm.vue'

test('an incomplete note stays, and a complete note is kept after save', async () => {
  const form = mount(DraftForm)
  expect(form.text()).toContain('还没写备注。')
  await form.get('form').trigger('submit')
  expect(form.text()).toContain('还没写全。')
  expect((form.get('[aria-label="商品标识"]').element as HTMLInputElement).value).toBe('')

  await form.get('[aria-label="商品标识"]').setValue('pen')
  await form.get('[aria-label="备注"]').setValue('补一笔')
  await form.get('form').trigger('submit')
  expect(form.text()).toContain('已记下。')
  expect((form.get('[aria-label="商品标识"]').element as HTMLInputElement).value).toBe('pen')
  expect((form.get('[aria-label="备注"]').element as HTMLInputElement).value).toBe('补一笔')
})
