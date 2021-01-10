import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)


// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'
import TheFooter from '@/components/main/TheFooter'

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)
app.component('TheFooter', TheFooter)


// Settings Components
import Slider from '@/components/form/Slider'

app.component('Slider', Slider)


// Fractal Components
import { FractalComponents } from '@/config/FractalList'
import FractalLayout from '@/components/layouts/FractalLayout'
import './registerServiceWorker'

FractalComponents.forEach(component => app.component(component.name, component))
app.component('FractalLayout', FractalLayout)


app.mount('#app')