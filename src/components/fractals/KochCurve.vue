<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="5" :min="0" />
			<slider label="Length Ratio" v-model:current="settings.lengthRatio" :step="0.01" :max="0.5" :min="0" />
			<checkbox label="Koch Snowflake (SF)" v-model:current="settings.snowflake" :checked="settings.snowflake" />
			<div v-if="settings.snowflake">
				<slider label="SF Height" v-model:current="settings.height" :max="height / 2" :min="0" />
				<slider label="SF Width" v-model:current="settings.width" :max="width" :min="0" />
			</div>
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Fractal from '@/mixins/Fractal'
import Numbers from '@/mixins/Numbers'

export default {
	name: 'KochCurve',
	components: {
		FractalLayout
	},
	mixins: [Fractal, Numbers],
	data() {
		return {
			settings: {
				step: 3,
				lengthRatio: 0.33,
				snowflake: false,
				height: 245,
				width: 480
			}
		}
	},
	methods: {
		init() {
			const canvas = this.$refs.canvas
			canvas.width = this.width
			canvas.height = this.height

			if(this.settings.snowflake) {
				const pA = {
					x: 0,
					y: -this.settings.height
				}
				const pB = {
					x: this.settings.width / 2,
					y: this.settings.height / 2
				}
				const pC = {
					x: -this.settings.width / 2,
					y: this.settings.height / 2
				}

				this.ctx.translate(this.width / 2, this.height / 2)

				this.koch(pA, pB, this.settings.step)
				this.koch(pB, pC, this.settings.step)
				this.koch(pC, pA, this.settings.step)

				return
			}

			const p0 = {
				x: 100,
				y: this.height * 0.75
			}

			const p1 = {
				x: this.width - 100,
				y: this.height * 0.75
			}

			this.koch(p0, p1, this.settings.step)
		},

		// Koch Recursion Method
		koch(p0, p1, limit) {
			const dx = p1.x - p0.x
			const dy = p1.y - p0.y
			const dist = Math.sqrt(dx * dx + dy * dy)
			const unit = dist * this.settings.lengthRatio
			const angle = Math.atan2(dy, dx)

			const pA = {
				x: p0.x + dx * this.settings.lengthRatio,
				y: p0.y + dy * this.settings.lengthRatio
			}

			const pC = {
				x: p1.x - dx * this.settings.lengthRatio,
				y: p1.y - dy * this.settings.lengthRatio
			}

			const pB = {
				x: pA.x + Math.cos(angle - Math.PI * this.settings.lengthRatio) * unit,
				y: pA.y + Math.sin(angle - Math.PI * this.settings.lengthRatio) * unit
			}

			// Recursion Logic
			if(limit > 0) {
				this.koch(p0, pA, limit - 1)
				this.koch(pA, pB, limit - 1)
				this.koch(pB, pC, limit - 1)
				this.koch(pC, p1, limit - 1)
			} else {
				this.ctx.beginPath()
				this.ctx.strokeStyle = "#FFF"
				this.ctx.moveTo(p0.x, p0.y)
				this.ctx.lineTo(pA.x, pA.y)
				this.ctx.lineTo(pB.x, pB.y)
				this.ctx.lineTo(pC.x, pC.y)
				this.ctx.lineTo(p1.x, p1.y)
				this.ctx.stroke()
			}
		}
	}
}
</script>