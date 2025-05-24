import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const init = async () => {
  const auth = useAuthStore()
  await auth.loadToken()
  app.use(router)
  app.mount('#app')
}

init()
