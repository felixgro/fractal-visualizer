<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="5" :min="0" />
			<slider label="Scale" v-model:current="settings.scale" :step="0.01" :max="2" :min="0" />
			<slider label="Angle" v-model:current="settings.angle" :step="1" :max="180" :min="1" />
			<slider label="Length Ratio" v-model:current="settings.lengthRatio" :step="0.01" :max=".5" :min="0" />

			<toggle-checkbox label="Koch Snowflake" v-model:state="settings.snowflake">
				<slider label="Angle" v-model:current="settings.angleSF" :max="180" :min="0" />
			</toggle-checkbox>
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
/* eslint-disable */
import ToggleCheckbox from '@/components/form/ToggleCheckbox'
import Checkbox from '@/components/form/Checkbox'
import Fractal from '@/mixins/Fractal'
import Maths from '@/mixins/Maths'

export default {
	name: 'KochCurve',
	components: {
		ToggleCheckbox,
		Checkbox
	},
	mixins: [Fractal, Maths],
	data() {
		return {
			settings: {
				step: 4,
				scale: 1,
				lengthRatio: 0.33,
				angle: 60,
				snowflake: false,
				angleSF: 68,
				height: 500
			}
		}
	},
	methods: {
		init() {
			const canvas = this.$refs.canvas
			canvas.width = this.width
			canvas.height = this.height

			if(this.settings.snowflake) {
				const height = 360 * this.settings.scale
				const angle = (this.settings.angleSF * Math.PI / 180)
				const dy = Math.cos(angle / 2) * height

				const pA = {
					x: 0,
					y: -dy / 2
				}

				const pB = {
					x: pA.x + Math.cos(-angle/2 + Math.PI/2) * height,
					y: pA.y + Math.sin(angle/2 + Math.PI/2) * height
				}

				const pC = {
					x: pA.x + Math.cos(angle/2 + Math.PI/2) * height,
					y: pA.y + Math.sin(angle/2 + Math.PI/2) * height
				}

				this.ctx.translate(this.width / 2, this.height / 2)

				this.koch(pA, pB, this.settings.step)
				this.koch(pB, pC, this.settings.step)
				this.koch(pC, pA, this.settings.step)

				return
			}

			const hspace = (window.innerWidth / 2) - (380 * (this.settings.scale))

			const p0 = {
				x: hspace,
				y: this.height * 0.67
			}

			const p1 = {
				x: this.width - hspace,
				y: this.height * 0.67
			}

			this.koch(p0, p1, this.settings.step)
		},

		// Koch Recursion Method
		koch(p0, p1, limit) {
			const dx = (p1.x - p0.x)
			const dy = (p1.y - p0.y)
			const dist = Math.sqrt(dx * dx + dy * dy)
			const unit = dist * this.settings.lengthRatio
			const angle = Math.atan2(dy, dx)
			const aLength   = (dist - 2 * unit) / 2

			const height = -Math.tan(this.degToRad((this.settings.angle / 2) - 90)) * aLength

			const angleB = -Math.atan2(height, aLength)
			const hypLength = Math.sqrt(height * height + aLength * aLength)

			const pA = {
				x: p0.x + dx * this.settings.lengthRatio,
				y: p0.y + dy * this.settings.lengthRatio
			}

			const pB = {
				x: pA.x + Math.cos(angle + angleB) * hypLength,
				y: pA.y + Math.sin(angle + angleB) * hypLength
			}

			const pC = {
				x: p1.x - dx * this.settings.lengthRatio,
				y: p1.y - dy * this.settings.lengthRatio
			}

			if(this.settings.showPoints) {
				this.label(p0, 'p0')
				this.label(pA, 'pA', true)
				this.label(pB, 'pB')
				this.label(pC, 'pC')
				this.label(p1, 'p1')
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
		},
		label(p, title, inverse = false) {
			this.ctx.font = "10px Arial";
			this.ctx.fillStyle = "#fff"
			this.ctx.fillText(title, (!inverse ? p.x + 10 : p.x - 10), p.y - 10)
		}
	}
}
</script>