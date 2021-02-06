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
import Fractal from '@/mixins/Fractal'
import Maths from '@/mixins/Maths'

export default {
	name: 'KochCurve',

	mixins: [Fractal, Maths],

	data() {
		return {
			settings: {
				step: 4,
				scale: 1,
				lengthRatio: 0.33,
				angle: 60,
				snowflake: false,
				angleSF: 90,
			}
		}
	},

	methods: {
		init() {
			if(this.settings.snowflake) {
				const height = 360 * this.settings.scale
				const angle = this.degToRad(180 - this.settings.angleSF) / 2;

				const p1 = {
					x: this.width / 2,
					y: this.height / 2 - 75
				}

				const p2 = {
					x: p1.x - Math.cos(angle) * height,
					y: p1.y + Math.sin(angle) * height
				}

				const p3 = {
					x: p1.x + Math.cos(angle) * height,
					y: p1.y + Math.sin(angle) * height
				}

				const katLength = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y))
				const dy = (Math.cos(this.degToRad(180 - 90) - angle) * katLength) / 2

				p1.y -= dy

				this.koch(p2, p1, this.settings.step)
				this.koch(p1, p3, this.settings.step)
				this.koch(p3, p2, this.settings.step)

			} else {
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
			}
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

			// Recursion Logic
			if(limit > 0) {
				this.koch(p0, pA, limit - 1)
				this.koch(pA, pB, limit - 1)
				this.koch(pB, pC, limit - 1)
				this.koch(pC, p1, limit - 1)
			} else {
				this.ctx.beginPath()
				this.ctx.strokeStyle = this.color
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