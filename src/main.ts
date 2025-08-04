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

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})
app.use(i18n)
app.use(store)
app.use(router)
app.mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.error('SW registration failed:', err));
    });
}
