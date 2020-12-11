<template>
	<div>
		<select v-model="key" @change="$emit('selected', key)" :required="true">
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
	mounted() {
		if(this.current)
			this.key = this.current

		console.log(this.current)
	},
	props: {
		options: Array,
		current: String
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