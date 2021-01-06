<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="10" :min="0" />
			<slider label="Angle" v-model:current="settings.angleDeg" :max="180" :min="1" />
			<slider label="Trunk Ratio" v-model:current="settings.trunkRatio" :max="1" :min="0" :step="0.001" />

			<toggle-checkbox label="Random" v-model:state="settings.random">
				<slider label="Angle Range" v-model:current="settings.angleRange" :max="90" :min="0" />
				<slider label="Length Range" v-model:current="settings.lengthRange" :max="250" :min="0" />
			</toggle-checkbox>
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import ToggleCheckbox from '@/components/form/ToggleCheckbox'
import Fractal from '@/mixins/Fractal'
import Maths from '@/mixins/Maths'

export default {
	name: 'HFractal',
	components: {
		ToggleCheckbox
	},
	mixins: [Fractal, Maths],
	data() {
		return {
			settings: {
				angleDeg: 90,
				angle: 0,
				trunkRatio: 0.5,
				step: 7,
				random: false,
				angleRange: 0,
				lengthRange: 0,
			}
		}
	},
	methods: {
		init() {
			const p0 = {
				x: this.width / 2,
				y: this.height
			}

			const p1 = {
				x: this.width / 2,
				y: 0
			}

			this.settings.angle = this.degToRad(this.settings.angleDeg)

			this.tree(p0, p1, this.settings.step)
		},

		// Recursive Tree Method
		tree(p0, p1, limit) {
			const dx = p1.x - p0.x
			const dy = p1.y - p0.y
			const dist = Math.sqrt(dx * dx + dy * dy)

			let angle = Math.atan2(dy, dx)
			let branchLength = dist * (1 - this.settings.trunkRatio)

			// Angle Variety
			if(this.settings.random)
				angle += this.randomRange(-this.degToRad(this.settings.angleRange), this.degToRad(this.settings.angleRange))

			// Length Variety
			if(this.settings.random)
				branchLength += this.randomRange(-this.settings.lengthRange, this.settings.lengthRange)

			const pA = {
				x: p0.x + dx * this.settings.trunkRatio,
				y: p0.y + dy * this.settings.trunkRatio
			}

			const pB = {
				x: pA.x + Math.cos(angle + this.settings.angle) * branchLength,
				y: pA.y + Math.sin(angle + this.settings.angle) * branchLength
			}

			const pC = {
				x: pA.x + Math.cos(angle - this.settings.angle) * branchLength,
				y: pA.y + Math.sin(angle - this.settings.angle) * branchLength
			}

			// Base Branch
			this.ctx.beginPath()
			this.ctx.strokeStyle = "#FFF";
			this.ctx.moveTo(p0.x, p0.y)
			this.ctx.lineTo(pA.x, pA.y)
			this.ctx.stroke()

			// Recursion Logic
			if(limit > 0) {
				this.tree(pA, pC, limit - 1)
				this.tree(pA, pB, limit - 1)
			} else {
				this.drawSplittedBranches(pA, pB, pC)
			}
		},

		// Draws two Strokes (pB->pA, pB->pC)
		drawSplittedBranches(pA, pB, pC) {
			this.ctx.beginPath();
			this.ctx.moveTo(pB.x, pB.y);
			this.ctx.lineTo(pA.x, pA.y);
			this.ctx.lineTo(pC.x, pC.y);
			this.ctx.stroke();
		}
	}
}
</script>