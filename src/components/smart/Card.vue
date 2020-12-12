<template>
	<div class="card" :id="idd" @mouseover="$emit('mouseover')">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		idd: {
			required: false
		}
	}
}
</script>

<style lang="scss" scoped>
	.card {
		width: 250px;
		box-sizing: border-box;
		padding: 18px 24px;
		padding: 10px 15px;
		background: hsla(235, 28%, 18%, 1);
		transition: all 120ms ease-out;
	}
</style>