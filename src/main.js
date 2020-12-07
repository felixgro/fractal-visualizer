import { createApp } from 'vue'
import App from './App.vue'

// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'
import PythagorasTree from '@/components/fractals/PythagorasTree'

const app = createApp(App)

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)
app.component('PythagorasTree', PythagorasTree)

app.mount('#app')