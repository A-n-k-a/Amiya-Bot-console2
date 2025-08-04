import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/lib/i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'element-plus/dist/index.css'
import '@/assets/css/github-markdown-light.css'
import '@/components/table/customTableStyle.scss'

// === 尽早注册 Service Worker ===
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('[SW] Registration successful.'))
        .catch(err => console.error('[SW] Registration failed:', err))
}
// === 注册结束 ===

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})
app.use(i18n)
app.use(store)
app.use(router)
app.mount('#app')
