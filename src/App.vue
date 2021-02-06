<template>
  <div>

    <the-header />

    <h1 class="accessable">Fractal Visualizer</h1>

    <component :is="currentFractal" />

    <the-footer />

  </div>
</template>

<script>
export default {
  computed: {
    currentFractal() {
      return this.$store.state.fractal
    }
  },

  methods: {
    downloadFractal() {
      const link = document.querySelector('#downloadLink')
      const canvas = document.querySelector('#canvas')

      link.href = canvas.toDataURL("image/png")
      link.download = `${this.currentFractal}.png`
    }
  }
}
</script>
