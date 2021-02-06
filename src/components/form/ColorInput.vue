<template>
	<div class="form-field color-input">
		<p>{{ label }}</p>
		<div class="colors">
			<div class="color" v-for="c in colors" :key="c" :style="'background:' + c" @click="selectColor" :class="proxyCurrent == c ? 'current' : ''" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
		colors: Array,
		storeKey: String
	},

	computed: {
		proxyCurrent: {
			get() {
				return this.$store.state[this.storeKey]
			},
			set(val) {
				const mutationMethod = 'set' + this.storeKey.charAt(0).toUpperCase() + this.storeKey.slice(1)
				this.$store.commit(mutationMethod, val)
			}
		}
	},

	methods: {
		selectColor(e) {
			this.proxyCurrent = e.target.style.background
		}
	}
}
</script>