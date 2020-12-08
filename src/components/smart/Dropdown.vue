<template>
	<div>
		<select v-model="key" @change="$emit('selected', key)">
			<option v-for="opt in options" :key="opt.component" :value="opt.component">{{ opt.title }}</option>
		</select>
	</div>
</template>

<script>
export default {
	data() {
		return {
			key: 'FractalTree'
		}
	},
	props: {
		options: Array,
	}
}
</script>

<style lang="scss" scoped>
	select {
		background: hsl(235, 28%, 14%);
		border: none;
		color: inherit;
		padding: 7px 9px;
		&:focus {
			outline: none;
		}
	}
</style>