<template>
  <div>
    <the-header @fractalchange="setFractal" />
    <component :is="currentFractal" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentFractal: 'FractalTree'
    }
  },
  mounted() {
    if(window.innerWidth < 600) {
      alert('This Site is currently not optimized for Mobile - Please try on Desktop for a better experience')
    }
  },
  methods: {
    setFractal(e) {
      this.currentFractal = e
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
}

.wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 0 25px;
  width: 100%;
  max-width: 800px;
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
</style>
