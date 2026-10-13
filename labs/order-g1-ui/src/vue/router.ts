import { createRouter, createWebHistory, type RouterHistory } from 'vue-router'
import type { ListedOrder } from '../orders'
import DraftForm from './DraftForm.vue'
import OrderBoard from './OrderBoard.vue'

export function createAdminRouter(load: () => Promise<ListedOrder[]>, history: RouterHistory = createWebHistory()) {
  return createRouter({
    history,
    routes: [
      { path: '/', component: OrderBoard, props: { load } },
      { path: '/draft', component: DraftForm },
    ],
  })
}
