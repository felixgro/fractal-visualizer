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