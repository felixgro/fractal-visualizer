<template>
	<div class="toggle-checkbox">
		<hr>
		<checkbox :label="label" v-model:state="value" />
		<transition name="fade">
			<div v-if="state">
				<slot />
			</div>
		</transition>
		<hr>
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
		hr {
			border: 1px solid hsl(235, 18%, 38%);
			opacity: .1;
			&:last-of-type {
				margin-bottom: 12px;
			}
		}
		.form-field {
			margin-bottom: 12px;
			&.checkbox {
				margin-top: 12px;
			}
		}
	}
</style>