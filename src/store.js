import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({key: 'app'});

export default createStore({

  state: {
    fractal: 'HFractal',
    color: '#fff',
    bg: null
  },

  mutations: {
    setFractal: (state, fractal) => state.fractal = fractal,
    setColor: (state, color) => state.color = color,
    setBg: (state, bg = null) => state.bg = bg
  },

  actions: {
  },

  modules: {
  },

  plugins: [vuexLocal.plugin]
})
