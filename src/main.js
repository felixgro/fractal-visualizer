import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)


// Main Components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)


// Settings Components
import Slider from '@/components/smart/Slider'
import Checkbox from '@/components/smart/Checkbox'

app.component('Slider', Slider)
app.component('Checkbox', Checkbox)


// Fractal Components
import { FractalComponents } from '@/config/FractalList'

FractalComponents.forEach(component => app.component(component.name, component))


app.mount('#app')