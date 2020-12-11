<template>
	<header>
		<div class="wrapper">
			<div>
				Fractal Visualizer
				<small>v 0.3.1</small>
			</div>
			<div>
				<dropdown :options="fractals" :current="currentFractal" @selected="$emit('fractalchange', $event)" />
			</div>
		</div>
	</header>
</template>

<script>
import Dropdown from '@/components/smart/Dropdown'
import FractalList from '@/_config/FractalList'

export default {
	name: 'TheHeader',
	components: {
		Dropdown
	},
	props: {
		currentFractal: String
	},
	data() {
		return {
			fractals: []
		}
	},
	created() {
		this.fractals = FractalList
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