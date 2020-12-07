<template>
	<div class="wrapper">
		<transition name="fade">
			<card v-if="open">
				<slot />

					<!-- <slider label="Split Count" v-model:current="val" />
					<slider label="Split Variety" v-model:current="val2" />
					<slider label="Fractions" v-model:current="val3" /> -->

			</card>
		</transition>
	</div>
</template>

<script>
import Card from '../smart/Card'

export default {
	name: 'TheMenu',
	components: {
		Card,
	},
	data() {
		return {
			open: true,
		}
	},
	methods: {
		toggleMenu() {
			this.open = !this.open

			if(this.open) {
				this.$refs.icon.classList.add('active')
			} else {
				this.$refs.icon.classList.remove('active')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.form-field {
		margin-bottom: 12px;
		&:last-of-type {
			margin-bottom: 0;
		}
	}
	div {
		font-size: 9pt;
		font-weight: 600;
		.card {
			position: absolute;
			right: 25px;
			top: 70px;
		}
	}
</style>