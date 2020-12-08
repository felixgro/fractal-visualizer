<template>
	<header>
		<div class="wrapper">
			<div>
				Fractal Visualizer
				<small>v 0.2.1</small>
			</div>
			<div>
				<dropdown :options="fractals" @selected="$emit('fractalchange', $event)" />
			</div>
		</div>
	</header>
</template>

<script>
import Dropdown from '@/components/smart/Dropdown'

export default {
	name: 'TheHeader',
	components: {
		Dropdown
	},
	data() {
		return {
			fractals: [
				{
					component: 'FractalTree',
					title: 'Fractal Tree'
				},
				{
					component: 'PythagorasTree',
					title: 'Pythagoras Tree'
				},
			]
		}
	},
	methods: {
		setFractal(e) {
			console.dir(e)
		}
	}
}
</script>

<style lang="scss" scoped>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		border-bottom: 1px solid hsl(235, 28%, 18%);
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>