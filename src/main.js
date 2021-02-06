import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App).use(store)

// add PWA support
import './registerServiceWorker'


// Main components
import TheMenu from '@/components/main/TheMenu'
import TheHeader from '@/components/main/TheHeader'
import TheFooter from '@/components/main/TheFooter'

app.component('TheMenu', TheMenu)
app.component('TheHeader', TheHeader)
app.component('TheFooter', TheFooter)


// Form Components
import Slider from '@/components/form/Slider'
import Checkbox from '@/components/form/Checkbox'
import ToggleCheckbox from '@/components/form/ToggleCheckbox'

app.component('Slider', Slider)
app.component('Checkbox', Checkbox)
app.component('ToggleCheckbox', ToggleCheckbox)


// Fractal Components
import FractalLayout from '@/components/layouts/FractalLayout'
import { FractalComponents } from '@/config/FractalList'

app.component('FractalLayout', FractalLayout)
FractalComponents.forEach(component => app.component(component.name, component))


app.mount('#app')