<template>
	<div class="form-field">
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

<style lang="scss" scoped>
p {
	color: $label-color;
	font-size: 12px;
	font-weight: 600;
	margin-bottom: 7px;
}

.colors {
	display: flex;
	justify-content: space-between;
}

.color {
	height: 25px;
	min-width: 15px;
	width: 100%;
	margin: 0 5px;
	cursor: pointer;
	&:first-of-type {
		margin-left: 0;
	}
	&:last-of-type {
		margin-right: 0;
	}
}

.color.current {
	outline: 2px solid #4f5272;
}
</style>