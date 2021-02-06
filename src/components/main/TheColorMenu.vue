<template>
	<div class="color-menu">
		<div class="auto-close" v-if="open" @click.passive="open = false" />

		<button ref="btn" class="current-color" @click.passive="open = true">
			<div ref="bc" class="color bg-color" />
			<div ref="fc" class="color fr-color" />
		</button>
		<transition name="fadeup">
			<div class="color-choice" ref="colorChoice" v-show="open">
				<h3 class="title" @click.passive="open = false">
					Change Colors
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.82 17" ref="icon">
						<rect class="cls-1" x="9.49" y="6.32" width="19.67" height="4.37" transform="translate(-0.35 16.15) rotate(-45)"/>
						<rect class="cls-1" x="-1.34" y="6.32" width="19.67" height="4.37" transform="translate(8.5 20.52) rotate(-135)"/>
					</svg>
				</h3>

				<color-input label="Fractal Color" :colors="frColors" storeKey="color" />
				<color-input label="Background Color" :colors="bgColors" storeKey="bg" />
			</div>
		</transition>
	</div>
</template>

<script>
import ColorInput from '@/components/form/ColorInput'
import { fractalColors, bgColors } from '@/config/Colors'

export default {
	components: {
		ColorInput
	},

	data () {
		return {
			open: false,
			frColors: fractalColors,
			bgColors: bgColors
		}
	},

	computed: {
		color() {
			return this.$store.state.color
		},

		bg() {
			return this.$store.state.bg
		}
	},

	watch: {
		open(val) {
			if(!val || window.innerWidth < 420)
				return;

			const btnPos = this.$refs.btn.getBoundingClientRect();
			this.$refs.colorChoice.style.left = (btnPos.x + btnPos.width - 240) + "px";
		},

		color() {
			this.$refs.fc.style.background = this.color
		},

		bg() {
			this.$refs.bc.style.background = this.bg
		}
	},

	mounted() {
		this.$refs.fc.style.background = this.color
		this.$refs.bc.style.background = this.bg
	}
}
</script>

<style lang="scss" scoped>
.color-menu {
	z-index: 2000;
	display: flex;
	align-items: center;
	.auto-close {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.current-color {
		background: none;
		border: none;
		position: relative;
		height: 18px;
		width: 18px;
		padding: 5px;
		cursor: pointer;
		.color {
			display: block;
			position: absolute;
			height: 12px;
			width: 12px;
			box-sizing: border-box;
			border: 1px solid $layer-2;
			&.bg-color {
				bottom: 0;
				left: 0;
				background: $bg;
			}
			&.fr-color {
				top: 0;
				right: 0;
				background: #fff;
			}
		}
		&:focus {
			outline: none;
		}
	}
}
.color-choice {
	position: fixed;
	bottom: 0;
	right: 0;
	background: $layer-1;
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding: 14px 24px;
	.form-field {
		margin-bottom: 15px;
	}
	h3.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: $label-color;
		font-weight: 700;
		font-size: 12px;
		padding: 14px 24px;
		margin: -14px -24px;
		cursor: pointer;
		margin-bottom: 2px;
		svg {
			height: 7px;
			transform: rotate(0deg);
			transition: transform 90ms ease-out;
			rect {
				fill: $plus-icon;
				transition: fill 120ms ease-out;
			}
		}
		&:hover {
			svg rect {
				fill: #fff;
			}
		}
	}
}
@media screen and (min-width: 420px) {
	.color-choice {
		width: 240px !important;
	}
}
</style>