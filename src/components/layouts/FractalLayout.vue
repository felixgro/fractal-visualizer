<template>
	<div>
		<the-menu>
			<slot name="settings" />
		</the-menu>

		<slot />
	</div>
</template>

<script>
export default {
	name: 'FractalLayout'
}
</script>

<style lang="scss">
	canvas {
		position: fixed;
		width: 100vw;
		height: 100%;
		z-index: -1;
	}
</style>