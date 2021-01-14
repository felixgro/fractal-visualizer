<template>
  <div>
    <h1 class="accessable">Fractal Visualizer</h1>

    <the-header
      @fractalchange="setFractal"
      :currentFractal="currentFractal"
    />

    <component
      :is="currentFractal"
      :fractalColor="color"
      :backgroundColor="colorBG"
      :drawBG="bg"
    />

    <the-footer
      @colorChange="colorChange"
      @bgChange="bgChange"
      @colorChangeBG="colorChangeBG"
    />

  </div>
</template>

<script>
import SessionStorage from '@/mixins/SessionStorage'

export default {
  name: 'App',
  data() {
    return {
      currentFractal: 'HFractal',
      color: '#ffffff',
      colorBG: '#0E0F19',
      bg: false
    }
  },
  mixins: [SessionStorage],
  created() {
    if(this.getCurrentFractal())
      this.setFractal(this.getCurrentFractal())
  },
  methods: {
    setFractal(e) {
      this.currentFractal = e

      this.setCurrentFractal(this.currentFractal)
    },
    getCurrentFractal() {
      return this.getSession('fractal')
    },
    setCurrentFractal(fractal) {
      this.setSession('fractal', fractal)
    },
    downloadFractal() {
      const link = document.querySelector('#downloadLink')
      const canvas = document.querySelector('#canvas')

      link.href = canvas.toDataURL("image/png")
      link.download = `${this.currentFractal}.png`
    },
    bgChange(e) {
      this.bg = e
    },
    colorChange(e) {
      this.color = e;
    },
    colorChangeBG(e) {
      this.colorBG = e;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
  font-size: $font-size;
}
</style>
