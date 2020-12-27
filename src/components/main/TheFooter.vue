<template>
	<footer>
		<div class="wrapper">
			<small>Fractal Visualizer [v 0.4.7]</small>
			<a id="downloadLink" class="download-button" ref="dlfrac" href="#" @click="$emit('download')">
				<span>Download Fractal</span>
			</a>

		</div>
	</footer>
</template>

<script>
export default {
	name: 'TheFooter',
}
</script>

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .8em;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			a {
				position: relative;
				//text-decoration: none;
				color: #b84961;
				display: flex;
				align-items: center;
				svg {
					height: 15px;
					path {
						fill:  hsl(235, 28%, 38%)
					}
				}
			}
		}
	}
</style>