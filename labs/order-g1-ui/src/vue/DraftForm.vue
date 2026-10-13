<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const draft = reactive({ sku: '', memo: '' })
const notice = ref('还没写备注。')
const canSave = computed(() => draft.sku.trim() !== '' && draft.memo.trim() !== '')

function save() {
  if (!canSave.value) {
    notice.value = '还没写全。'
    return
  }
  notice.value = '已记下。'
}
</script>

<template>
  <form @submit.prevent="save">
    <p>{{ notice }}</p>
    <label>
      商品标识
      <input v-model="draft.sku" aria-label="商品标识" />
    </label>
    <label>
      备注
      <input v-model="draft.memo" aria-label="备注" />
    </label>
    <button type="submit">记下</button>
  </form>
</template>
