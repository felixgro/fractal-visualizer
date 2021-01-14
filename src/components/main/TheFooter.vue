<template>
	<footer>
		<div class="wrapper">
			<small>{{ ver }}</small>
			<button class="current-color" @click.passive="open = true">
				<div ref="bc" class="color bg-color"></div>
				<div ref="fc" class="color fr-color"></div>
			</button>
			<transition name="fadeup">
			<div class="color-choice" v-show="open">
				<span class="title" @click.passive="open = false">
					Styles
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.82 17" ref="icon">
						<rect class="cls-1" x="9.49" y="6.32" width="19.67" height="4.37" transform="translate(-0.35 16.15) rotate(-45)"/>
						<rect class="cls-1" x="-1.34" y="6.32" width="19.67" height="4.37" transform="translate(8.5 20.52) rotate(-135)"/>
					</svg>
				</span>
				<color-input label="Fractal Color" v-model:current="fractalColor" />
				<toggle-checkbox label="Draw Background" v-model:state="background">
					<color-input label="Background Color" v-model:current="backgroundColor" />
				</toggle-checkbox>
			</div>
			</transition>
		</div>
	</footer>
</template>

<script>
import ColorInput from '@/components/form/ColorInput'
import ToggleCheckbox from '@/components/form/ToggleCheckbox'
import SessionStorage from '@/mixins/SessionStorage'

export default {
	name: 'TheFooter',
	components: {
		ColorInput,
		ToggleCheckbox
	},
	mixins: [SessionStorage],
	emits: ['colorChange', 'bgChange', 'colorChangeBG'],
	data() {
		return {
			ver: 'v0.0.0',
			open: false,
			fractalColor: '#ffffff',
			backgroundColor: '#0E0F19',
			background: false,
		}
	},
	created() {
		this.getCurrentVersion()
	},
	watch: {
		fractalColor(oldVal, newVal) {
			if(!this.$refs.fc)
				return
			this.$emit('colorChange', newVal)
			this.setSession('fractal-color', newVal)
			this.$refs.fc.style.background = newVal
		},
		background(oldVal, newVal) {
			this.$emit('bgChange', !newVal)
			this.setSession('draw-background', !newVal)
		},
		backgroundColor(oldVal, newVal) {
			this.$emit('colorChangeBG', newVal)
			this.setSession('background-color', newVal)
			this.$refs.bc.style.background = newVal
		}
	},
	methods: {
		getCurrentVersion() {
			const http = new XMLHttpRequest()
			http.open('GET', 'https://api.github.com/repos/felixgro/fractal-visualizer/releases')
			http.send()

			http.onreadystatechange = () => {
				if(http.readyState == 4 && http.status == 200) {
					const res = JSON.parse(http.response)[0]
					this.ver = res.tag_name
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .9em;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
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
					border: 2px solid $layer-1;
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
			.color-choice {
				position: fixed;
				bottom: 0;
				right: 0;
				background: $layer-1;
				width: 100%;
				height: auto;
				box-sizing: border-box;
				padding: 14px 24px;
				span.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $label-color;
					font-weight: 700;
					font-size: 12px;
					padding: 14px 24px;
					margin: -14px -24px;
					cursor: pointer;
					margin-bottom: 10px;
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
		}
	}
	@media screen and (min-width: 420px) {
		.color-choice {
			width: 240px !important;
		}
	}
</style>