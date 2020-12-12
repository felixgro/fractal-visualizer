<template>
	<div class="wrapper">
			<card ref="card" @mouseover="autoOpen">
				<div class="top-bar" @click="toggleMenu">
					<svg ref="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hsl(235, 18%, 58%)" width="24px" height="24px">
						<path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/>
					</svg>
					<span>{{ headerTitle }}</span>
				</div>
				<transition name="fade">
					<div v-if="open">
						<slot />
					</div>
				</transition>
			</card>
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
	computed: {
		headerTitle() {
			return this.open ? 'Hide Settings' : 'Show Settings'
		}
	},
	mounted() {
		if(this.open) {
			this.$refs.card.$el.style.opacity = 1
			this.$refs.icon.classList.add('open')
		} else {
			this.$refs.card.$el.style.opacity = .6
			this.$refs.icon.classList.remove('open')
		}
	},
	methods: {
		toggleMenu() {
			this.open = !this.open

			if(this.open) {
				this.$refs.card.$el.style.opacity = 1
				this.$refs.icon.classList.add('open')
			} else {
				this.$refs.card.$el.style.opacity = .6
				this.$refs.icon.classList.remove('open')
			}
		},
		autoOpen() {
			if(this.open)
				return

			//console.log('opening auto')
		}
	}
}
</script>

<style lang="scss" scoped>
	.top-bar {
		display: flex;
		align-items: center;
		cursor: pointer;
		svg {
			opacity: .6;
			margin-right: 5px;
			transition: transform 120ms ease-out;
			&.open {
				transform: rotate(180deg);
			}
		}
		span {
			color: hsl(235, 18%, 58%)
		}

	}
	.form-field {
		margin-bottom: 12px;
		&:first-of-type {
			margin-top: 8px;
		}
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