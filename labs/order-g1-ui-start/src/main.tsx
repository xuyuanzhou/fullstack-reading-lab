import { createRoot } from 'react-dom/client'
import { createApp } from 'vue'
import { httpApi } from './http'
import { OrderForm } from './react/OrderForm'
import OrderBoard from './vue/OrderBoard.vue'

const api = httpApi('')
createRoot(document.getElementById('user')!).render(<OrderForm place={api.place} />)
createApp(OrderBoard, { load: api.load }).mount('#admin')
