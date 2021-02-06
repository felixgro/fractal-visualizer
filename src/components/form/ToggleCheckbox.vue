<template>
	<div class="toggle-checkbox">
		<hr>
		<checkbox :label="label" v-model:state="value" />
		<transition name="fade">
			<div v-if="state">
				<slot />
			</div>
		</transition>
		<!--hr-->
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