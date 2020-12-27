<template>
	<label class="form-field">
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

<style lang="scss" scoped>
label {
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;
	color: hsl(235, 18%, 58%);
	input {
		display: none;
		&:checked ~ span {
			&::after {
				transform: translate(-50%, -50%) scale(1);
			}
		}
	}
	span {
		width: 15px;
		height: 15px;
		display: inline-block;
		background: hsl(235, 28%, 28%);
		margin-right: 8px;
		position: relative;
		&::after {
			content: "";
			position: absolute;
			width: 9px;
			height: 9px;
			top: 50%;
			left: 50%;
			transition: all 60ms ease-out;
			transform: translate(-50%, -50%) scale(0);
			background: #fff;
		}
	}
}
</style>