<template>
	<div class="form-field">
		<input :id="uid" type="color" v-model="inputVal">
		<label :for="uid">{{ label }}</label>
	</div>
</template>

<script>
export default {
	props: {
		current: {
			type: String,
			required: true
		},
		label: {
			type: String
		}
	},
	data() {
		return {
			uid: null
		}
	},
	created() {
		this.uid = this.$.uid
	},
	computed: {
		inputVal: {
			get() {
				return this.current
			},
			set(val) {
				this.$emit('update:current', val);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.form-field {
	margin: 6px 0;
	display: flex;
	align-items: center;
	cursor: pointer;
	input {
		background: none;
		outline: none;
		border: none;
		position: relative;
		height: 28px;
		width: 32px;
	}
	label {
		color: $label-color;
		padding-left: 10px;
		font-size: 12px;
		font-weight: 600;
	}
}
</style>