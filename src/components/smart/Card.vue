<template>
	<div class="card" :id="idd">
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
		background: hsl(235, 28%, 18%);
	}
</style>