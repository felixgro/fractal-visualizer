import { createApp } from 'vue'
import App from './App.vue'

// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'

// Fractals
import FractalTemplate from '@/components/fractals/_template'
import FractalTree from '@/components/fractals/FractalTree'
import PythagorasTree from '@/components/fractals/PythagorasTree'
import SierpinskiTriangle from '@/components/fractals/SierpinskiTriangle'
import KochCurve from '@/components/fractals/KochCurve'

const app = createApp(App)

app.config.devtools = true;

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)

app.component('FractalTemplate', FractalTemplate)
app.component('FractalTree', FractalTree)
app.component('PythagorasTree', PythagorasTree)
app.component('SierpinskiTriangle', SierpinskiTriangle)
app.component('KochCurve', KochCurve)

app.mount('#app')