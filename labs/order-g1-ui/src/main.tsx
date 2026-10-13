import { createRoot } from 'react-dom/client'
import { createApp } from 'vue'
import { httpApi } from './http'
import { UserApp } from './react/UserApp'
import AdminApp from './vue/AdminApp.vue'
import { createAdminRouter } from './vue/router'

const api = httpApi('')
createRoot(document.getElementById('user')!).render(<UserApp place={api.place} />)
const admin = createApp(AdminApp)
admin.use(createAdminRouter(api.load))
admin.mount('#admin')
