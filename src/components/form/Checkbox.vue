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
	color: $label-color;
	input {
		display: none;
		&:checked ~ span {
			&::after {
				transform: translate(-50%, -50%) scaleY(1);
			}
		}
	}
	span {
		width: $cb-size;
		height: $cb-size;
		display: inline-block;
		background: $slider-track;
		margin-right: 12px;
		position: relative;
		&::after {
			content: "";
			position: absolute;
			width: $cb-fill-size;
			height: $cb-fill-size;
			top: 50%;
			left: 50%;
			transition: all 60ms ease-out;
			transform-origin: top center;
			transform: translate(-50%, -50%) scaleY(0);
			background: $slider-thumb;
		}
	}
}
</style>