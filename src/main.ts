import { createApp } from 'vue'
import { pinia } from './stores'
import { router } from './router'
import { setUnauthorizedHandler } from './services/api-client'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Configurar handler para cuando el token expira
setUnauthorizedHandler(() => {
  router.push('/login')
})

app.use(pinia)
app.use(router)

app.mount('#app')
