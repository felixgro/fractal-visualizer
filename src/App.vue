<template>
  <div>
    <the-header @fractalchange="setFractal" :currentFractal="currentFractal" />
    <component :is="currentFractal" />

    <the-footer @download="downloadFractal" />
  </div>
</template>

<script>
import SessionStorage from '@/mixins/SessionStorage'

export default {
  name: 'App',
  data() {
    return {
      currentFractal: 'HFractal',
    }
  },
  mixins: [SessionStorage],
  created() {
    //if(window.innerWidth < 600)
      //alert('This Site is currently not optimized for Mobile - Please try on Desktop for a better experience')

    if(this.getCurrentFractal())
      this.setFractal(this.getCurrentFractal())

    // window.onresize = this.windowResize
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
    windowResize() {
      location.reload()
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  background: #0E0F19;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 0 25px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

#app {
  //font-family: Roboto, Avenir, Helvetica, sans-serif;
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #F1EDEE;
  font-size: 12pt;
}

.download-button {
  z-index: 100;
  position: fixed;
}

.fade-enter-active,
.fade-leave-active {
  transform-origin: top center;
  transition: all 120ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: ScaleY(.5);
}

.fade-enter-to,
.fade-leave-from {
  transform: ScaleY(1);
  opacity: 1
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
