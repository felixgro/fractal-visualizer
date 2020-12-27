<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="5" :min="0" />
			<slider label="Height" v-model:current="settings.height" :max="height" :min="0" />
			<slider label="Width" v-model:current="settings.width" :max="width" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'

export default {
	name: 'SierpinskiTriangle',
	components: {
	},
	mixins: [Fractal],
	data() {
		return {
			settings: {
				step: 3,
				height: 421,
				width: 556
			}
		}
	},
	methods: {
		init() {
			const p0 = {
				x: this.width / 2,
				y: this.height - this.settings.height
			}

			const p1 = {
				x: (this.width / 2) + this.settings.width / 2,
				y: this.height
			}

			const p2 = {
				x: (this.width / 2) - this.settings.width / 2,
				y: this.height
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
			this.ctx.fillStyle = '#fff'
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