<template>
	<div class="toggle-checkbox">
		<checkbox :label="label" v-model:state="value" />
		<transition name="fade">
			<div v-if="state">
				<slot />
			</div>
		</transition>
	</div>
</template>

<script>
import Checkbox from './Checkbox'

export default {
	components: {
		Checkbox
	},
	props: {
		label: {
			type: String,
			required: true
		},
		state: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			value: false
		}
	},
	watch: {
		value(newState) {
			this.$emit('update:state', newState)
		}
	},
	updated() {
		this.value = this.state
	},
	created() {
		this.value = this.state
	}
}
</script>

<style lang="scss">
	.toggle-checkbox {
		padding: 0 24px;
		.form-field {
			margin-bottom: 12px;
		}
		padding-bottom: 5px;
	}
</style>