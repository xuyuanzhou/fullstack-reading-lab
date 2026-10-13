<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { OrderDenied, type ListedOrder } from '../orders'

const props = defineProps<{ load: () => Promise<ListedOrder[]> }>()
const orders = ref<ListedOrder[]>([])
const filter = ref('')
const phase = ref<'loading' | 'empty' | 'ready' | 'failure'>('loading')
const notice = ref('正在读取。')
const shown = computed(() => orders.value.filter((order) => order.sku.includes(filter.value)))

async function refresh() {
  phase.value = 'loading'
  notice.value = '正在读取。'
  try {
    const rows = await props.load()
    orders.value = rows
    phase.value = rows.length === 0 ? 'empty' : 'ready'
    notice.value = rows.length === 0 ? '还没有订单。' : `共 ${rows.length} 笔`
  } catch (error) {
    phase.value = 'failure'
    notice.value = error instanceof OrderDenied ? error.type : '读取失败。'
  }
}

onMounted(() => {
  void refresh()
})
</script>

<template>
  <section>
    <p>{{ notice }}</p>
    <label>
      筛选
      <input v-model="filter" />
    </label>
    <button type="button" @click="refresh">重试</button>
    <ul>
      <li v-for="order in shown" :key="order.orderId">{{ order.orderId }} {{ order.sku }}</li>
    </ul>
  </section>
</template>
