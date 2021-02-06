<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="5" :min="0" />
			<slider label="Scale" v-model:current="settings.scale" :max="2" :min="0" :step="0.01" />
			<slider label="Angle" v-model:current="settings.angle" :max="180" :min="0" :step="0.01" />
			<checkbox label="Mirror" v-model:state="settings.mirror"/>
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'

export default {
	name: 'SierpinskiTriangle',

	mixins: [Fractal],

	data() {
		return {
			settings: {
				step: 3,
				scale: 1,
				angle: 69,
				mirror: false
			},
			radAngle: 0
		}
	},

	methods: {
		init() {
			const height = 421 * this.settings.scale

			this.radAngle = (this.settings.angle * Math.PI / 180) / 2
			const dy = Math.cos(this.radAngle) * height
			let p0, p1, p2

			if (!this.settings.mirror) {
				p0 = {
					x: this.width / 2,
					y: this.height / 2 - dy / 2
				}

				p1 = {
					x: p0.x + Math.cos(this.radAngle + Math.PI/2) * height,
					y: p0.y + Math.sin(this.radAngle + Math.PI/2) * height
				}

				p2 = {
					x: p0.x + Math.cos(-this.radAngle + Math.PI/2) * height,
					y: p0.y + Math.sin(-this.radAngle + Math.PI/2) * height,
				}
			} else {
				p0 = {
					x: this.width / 2,
					y: this.height / 2 + dy / 2
				}

				p1 = {
					x: p0.x - Math.cos(this.radAngle + Math.PI/2) * height,
					y: p0.y - Math.sin(this.radAngle + Math.PI/2) * height
				}

				p2 = {
					x: p0.x - Math.cos(-this.radAngle + Math.PI/2) * height,
					y: p0.y - Math.sin(-this.radAngle + Math.PI/2) * height,
				}
			}

			// Start Recursion
			this.sierpinski(p0, p1, p2, this.settings.step)
		},

		// Sierpinski Recursion Method
		sierpinski(p0, p1, p2, limit) {
			const pA = {
				x: (p0.x + p1.x) / 2,
				y: (p0.y + p1.y) / 2
			}

			const pB = {
				x: (p1.x + p2.x) / 2,
				y: (p1.y + p2.y) / 2
			}

			const pC = {
				x: (p0.x + p2.x) / 2,
				y: (p0.y + p2.y) / 2
			}

			// Recursion Logic
			if(limit > 0) {
				this.sierpinski(p0, pA, pC, limit - 1)
				this.sierpinski(pA, p1, pB, limit - 1)
				this.sierpinski(pC, p2, pB, limit - 1)
			} else {
				this.drawTriangle(p0, pA, pC)
				this.drawTriangle(pA, p1, pB)
				this.drawTriangle(pC, p2, pB)
			}
		},

		// Draws Triangle with 3 given Points
		drawTriangle(p0, p1, p2) {
			this.ctx.fillStyle = this.color
			this.ctx.beginPath()
			this.ctx.moveTo(p0.x, p0.y)
			this.ctx.lineTo(p1.x, p1.y)
			this.ctx.lineTo(p2.x, p2.y)
			this.ctx.closePath();
			this.ctx.fill()
		}
	}
}
</script>