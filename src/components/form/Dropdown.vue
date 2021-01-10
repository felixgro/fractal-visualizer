<template>
	<div class="dropdown" @click.prevent="toggle">
		<div class="current">
			{{ value }}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.82 17" ref="icon">
				<rect class="cls-1" x="9.49" y="6.32" width="19.67" height="4.37" transform="translate(-0.35 16.15) rotate(-45)"/>
				<rect class="cls-1" x="-1.34" y="6.32" width="19.67" height="4.37" transform="translate(8.5 20.52) rotate(-135)"/>
			</svg>
		</div>
		<transition name="fade">
			<div class="options" v-if="open">
				<div class="option-wrapper" v-for="opt in options" :key="opt.component" :data-val="opt.component" @click.passive="optionSelected">
					<div class="option" v-if="opt.component != key">
						{{ opt.title }}
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			key: '',
			open: false
		}
	},
	mounted() {
		if(this.current) {
			this.key = this.current
			this.getTitle(this.key)
		}
	},
	props: {
		options: Array,
		current: String
	},
	methods: {
		toggle() {
			this.open = !this.open

			if(this.open) {
				this.$refs.icon.classList.add('open')
			} else {
				this.$refs.icon.classList.remove('open')
			}
		},
		optionSelected(e) {
			if(e.target.parentElement) {
				this.keyUpdate(e.target.parentElement.dataset.val)
				this.getTitle(e.target.parentElement.dataset.val)
			}
		},
		getTitle(key) {
			const item = this.options.filter((val) => {
				return val.component == key
			})[0]
			if(item) {
				this.value = item.title
			}
		},
		keyUpdate(key) {
			this.key = key
			this.$emit('selected', key)
		}
	}
}
</script>

<style lang="scss" scoped>
	.dropdown {
		position: relative;
		color: inherit;
		font-size: .9em;
		padding: 10px 20px;
		width: 230px;
		box-sizing: border-box;
		font-family: inherit;
		background: $layer-1;
		cursor: pointer;
		.current {
			font-weight: 700;
			color: $dd-current;
			display: flex;
			justify-content: space-between;
			align-items: center;
			svg {
				height: 7px;
				transform: rotate(0deg);
				transition: transform 90ms ease-out;
				rect {
					fill: $plus-icon;
				}
				&.open {
					transform: rotate(180deg);
				}
			}
		}
		.options {
			position: absolute;
			padding-top: 12px;
			width: inherit;
			left: 0;
			z-index: -1;
			background: $layer-1;
			box-shadow: $shadow-1;
			.option-wrapper {
				.option {
					font-weight: 700;
					padding: 6px 20px;
					color: $label-color;
					cursor: pointer;
					transition: all 90ms ease-out;
					&:hover {
						color: $dd-current;
						background: $dd-hover-bg;
					}
				}
			}
		}
	}
</style>