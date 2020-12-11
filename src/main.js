import { createApp } from 'vue'
import App from './App.vue'

// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'
import FractalTree from '@/components/fractals/FractalTree'
import PythagorasTree from '@/components/fractals/PythagorasTree'
import SierpinskiTriangle from '@/components/fractals/SierpinskiTriangle'

const app = createApp(App)

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)
app.component('FractalTree', FractalTree)
app.component('PythagorasTree', PythagorasTree)
app.component('SierpinskiTriangle', SierpinskiTriangle)

app.mount('#app')