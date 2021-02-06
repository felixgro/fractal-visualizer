<template>
	<label class="form-field checkbox">
		<input type="checkbox" :checked="state" @change="onChange" />
		<span></span>
		{{ label }}
	</label>
</template>

<script>
export default {
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
	methods: {
		onChange(e) {
			this.$emit('update:state', e.target.checked)
		}
	}
}
</script>