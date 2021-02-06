<template>
	<footer>
		<div class="wrapper">
			<small><a href="https://github.com/felixgro/fractal-visualizer" target="_blank">Github</a></small>

			<div class="actions">
				<small><a ref="dl" href="" @click.passive="downloadFractal">Download Fractal</a></small>
				<the-color-menu />
			</div>
		</div>
	</footer>
</template>

<script>
import TheColorMenu from '@/components/main/TheColorMenu'

export default {
	components: {
		TheColorMenu
	},

	methods: {
		downloadFractal() {
			const link = this.$refs.dl
			const canvas = document.querySelector('#canvas')

			link.href = canvas.toDataURL("image/png")
			link.download = `${this.$store.state.fractal}.png`
		}
	}
}
</script>