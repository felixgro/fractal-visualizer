<template>
	<div class="form-field slider">
		<div class="form-title">
			<label :for="uid">{{ label }}</label>
			<label :for="uid2" class="accessable">{{ label }}</label>
			<input type="number" pattern="\d*" inputmode="decimal" v-model="inputVal" :id="uid2">
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
			uid: null,
			uid2: null
		}
	},
	mounted() {
		this.uid = this.$.uid;
		this.uid2 = this.uid + '-i'
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