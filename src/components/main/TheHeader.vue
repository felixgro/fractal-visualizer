<template>
	<header>
		<div class="wrapper">
			<div>Fractal Visualizer</div>
			<small>v 0.0.1</small>
		</div>
	</header>
</template>

<script>
export default {
	name: 'TheHeader',
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