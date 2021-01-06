<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="12" :min="0" />
			<slider label="Angle (a)" v-model:current="settings.angleDeg" :max="90" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'
import Maths from '@/mixins/Maths'

export default {
	name: 'PythagorasTree',
	components: {
	},
	mixins: [Fractal, Maths],
	data() {
		return {
			settings: {
				angleDeg: 45,
				angleA: 0,
				step: 7,
			}
		}
	},
	methods: {
		init() {
			this.settings.angleA = this.degToRad(-this.settings.angleDeg)

			this.tree(this.width / 2 - 150 / 2, this.height, 150, 0, this.settings.step)
		},

		// Recursive Tree Method
		tree(x, y, size, angle, limit) {

			// Base Branch
			this.ctx.save()
			this.ctx.fillStyle = "#FFF";
			this.ctx.translate(x, y)
			this.ctx.rotate(angle)
			this.ctx.fillRect(0, 0, size, -size)

			// Left Branch
			const b0 = {
				x: 0,
				y: -size,
				size: Math.abs(Math.cos(this.settings.angleA) * size),
				angle: this.settings.angleA
			}

			// Right Branch
			const b1 = {
				x: b0.x + Math.cos(b0.angle) * b0.size,
				y: b0.y + Math.sin(b0.angle) * b0.size,
				size: Math.abs(Math.sin(this.settings.angleA) * size),
				angle: b0.angle + Math.PI / 2
			}

			// Recursion Logic
			if(limit > 0) {
				this.tree(b0.x, b0.y, b0.size, b0.angle, limit - 1)
				this.tree(b1.x, b1.y, b1.size, b1.angle, limit - 1)
			} else {
				this.drawBranch(b0)
				this.drawBranch(b1)
			}

			this.ctx.restore()
		},

		// Draw Branch Object to Canvas (Object props: x, y, size, angle)
		drawBranch(branch) {
			this.ctx.save()
			this.ctx.translate(branch.x, branch.y)
			this.ctx.rotate(branch.angle)
			this.ctx.fillRect(0, 0, branch.size, -branch.size)
			this.ctx.restore()
		}
	}
}
</script>