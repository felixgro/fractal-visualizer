import { createApp } from 'vue'
import App from './App.vue'

// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'
// import TheFooter from '@/components/main/TheFooter'
import FractalTree from '@/components/fractals/FractalTree'
import PythagorasTree from '@/components/fractals/PythagorasTree'
import SierpinskiTriangle from '@/components/fractals/SierpinskiTriangle'
import KochCurve from '@/components/fractals/KochCurve'

const app = createApp(App)

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)
// app.component('TheFooter', TheFooter)
app.component('FractalTree', FractalTree)
app.component('PythagorasTree', PythagorasTree)
app.component('SierpinskiTriangle', SierpinskiTriangle)
app.component('KochCurve', KochCurve)

app.mount('#app')