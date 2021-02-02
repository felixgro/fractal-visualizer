<template>
	<div class="form-field">
		<h4>{{ label }}</h4>
		<div class="color-choice">
			<button v-if="none" />
			<button :class="'color-button-' + _.uid" v-for="c in colors" :key="c" :data-color="c" />
		</div>
	</div>
</template>

<script>
import colors from '@/config/Colors'

export default {
	props: {
		label: String,
		none: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			colors,
		}
	},

	mounted() {
		const btns = document.querySelectorAll('.color-button-' + this._.uid)
		btns.forEach(b => {
			b.style.backgroundColor = b.dataset.color
			b.onclick = this.selectColor
		})
	},

	methods: {
		selectColor(e) {
			const color = e.target.style.backgroundColor
			this.$emit('update:current', color)
		}
	}
}
</script>

<style lang="scss" scoped>
button {
	height: 20px;
	width: 20px;
}

.form-field {
	margin-bottom: 10px;
	.color-choice {
		display: flex;
		justify-content: space-between;
		margin-top: 4px;
	}
}
</style>