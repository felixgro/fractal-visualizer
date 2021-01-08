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
				transform: translate(-50%, -50%) scaleY(1);
			}
		}
	}
	span {
		width: 18px;
		height: 18px;
		display: inline-block;
		background: hsl(235, 18%, 38%);
		margin-right: 12px;
		position: relative;
		&::after {
			content: "";
			position: absolute;
			width: 10px;
			height: 10px;
			top: 50%;
			left: 50%;
			transition: all 60ms ease-out;
			transform-origin: top center;
			transform: translate(-50%, -50%) scaleY(0);
			background: #fff;
		}
	}
}
</style>