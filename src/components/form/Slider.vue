<template>
	<div class="form-field">
		<div class="form-title">
			<label :for="uid">{{ label }}</label>
			<input type="number" v-model="inputVal">
		</div>
		<input type="range" v-model="inputVal" :id="uid" :min="min" :max="max" :step="step">
	</div>
</template>

<script>
export default {
	props: {
		current: {
			required: true
		},
		label: {
			type: String,
			required: true
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 10
		},
		step: {
			type: Number,
			default: 1
		},
	},
	data() {
		return {
			uid: null
		}
	},
	mounted() {
		this.uid = this._uid
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
	.form-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		label {
			color: hsl(235, 18%, 58%);
			display: block;
			flex: 1;
		}
		input[type="number"] {
			width: 50px;
			-moz-appearance: textfield;
			text-align: right;
			font-size: 9pt;
			background: none;
			font-family: inherit;
			font-weight: 400;
			border: none;
			color: inherit;
			&:focus {
				border: none;
				outline: none;
			}
			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	input[type="range"] {
		width: 100%;
		margin-top: 6px;
		background: hsl(235, 18%, 38%);
		-webkit-appearance: none;
		&:focus {
			outline: none;
		}
		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			width: 8px;
			height: 12px;
			background: hsl(235, 28%, 88%);
			outline: solid 2px hsl(235, 28%, 88%);
			cursor: pointer;
		}
		&::-moz-range-thumb {
			width: 25px;
			height: 25px;
			background: #4CAF50;
			cursor: pointer;
		}
	}
</style>