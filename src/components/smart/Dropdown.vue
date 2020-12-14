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
	},
	props: {
		options: Array,
		current: String
	}
}
</script>

<style lang="scss" scoped>
	select {
		-webkit-appearance:none;
		border: none;
		color: inherit;
		text-align: right;
		background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='hsl(235, 18%, 58%)'><polygon points='0,0 10,0 5,5'/></svg>") no-repeat;
		background-position: right center;
		padding-right: 18px;
		padding-bottom: 4px;
		&:focus {
			outline: none;
		}
	}
</style>