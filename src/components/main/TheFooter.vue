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

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .9em;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		z-index: 200;
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			small a {
				color: $main;
				text-decoration: none;
			}
			.actions {
				display: flex;
				align-items: center;
				small a {
					margin-right: 15px;
				}
			}
		}
	}

</style>