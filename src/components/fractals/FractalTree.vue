<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="data.step" :max="10" :min="0" />
			<slider label="Angle" v-model:current="data.angleDeg" :max="180" :min="1" />
			<slider label="Trunk Ratio" v-model:current="data.trunkRatio" :max="1" :min="0" :step="0.001" />
			<checkbox label="Random" v-model:current="data.random" :checked="data.random" />
			<div v-if="data.random">
				<slider label="Angle Range" v-model:current="data.angleVariety" :max="180" :min="1" />
				<slider label="Length Range" v-model:current="data.lengthRange" :max="250" :min="1" />
			</div>
		</template>

		<canvas ref="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Numbers from '@/mixins/Numbers'
import Slider from '@/components/smart/Slider'
import Checkbox from '@/components/smart/Checkbox'

export default {
	name: 'PythagorasTee',
	components: {
		FractalLayout,
		Slider,
		Checkbox
	},
	mixins: [Numbers],
	data() {
		return {
			height: null,
			width: null,
			data: {
				angleDeg: 10,
				angle: 0,
				trunkRatio: 0.35,
				step: 5,
				random: false,
				angleVariety: 35,
				lengthRange: 90,
			}
		}
	},
	mounted() {
		this.height = window.innerHeight
		this.width = window.innerWidth

		this.init()
	},
	watch: {
		data: {
			deep: true,
			handler: function() {
				this.init()
			}
		}
	},
	methods: {
		init() {
			const canvas = this.$refs.canvas
			const ctx = canvas.getContext('2d')

			canvas.height = this.height
			canvas.width = this.width

			const p0 = {
				x: this.width / 2,
				y: this.height
			}

			const p1 = {
				x: this.width / 2,
				y: 0
			}

			this.data.angle = this.degToRad(this.data.angleDeg)

			this.tree(ctx, p0, p1, this.data.step)
		},

		tree(ctx, p0, p1, limit) {
			const dx = p1.x - p0.x
			const dy = p1.y - p0.y
			const dist = Math.sqrt(dx * dx + dy * dy)

			const angle = Math.atan2(dy, dx)

			const angleA = this.randomRange(-this.degToRad(this.data.angleVariety), this.degToRad(this.data.angleVariety))
			const angleB = this.randomRange(-this.degToRad(this.data.angleVariety), this.degToRad(this.data.angleVariety))

			const branchLength = !this.data.random ? dist * (1 - this.data.trunkRatio) : this.randomRange(1, this.data.lengthRange)

			const pA = {
				x: p0.x + dx * this.data.trunkRatio,
				y: p0.y + dy * this.data.trunkRatio
			}

			const pB = !this.data.random ? {
				x: pA.x + Math.cos(angle + this.data.angle) * branchLength,
				y: pA.y + Math.sin(angle + this.data.angle) * branchLength
			} : {
				x: pA.x + Math.cos(angle + angleA) * branchLength,
				y: pA.y + Math.sin(angle + angleA) * branchLength
			}

			const pC = !this.data.random ? {
				x: pA.x + Math.cos(angle - this.data.angle) * branchLength,
				y: pA.y + Math.sin(angle - this.data.angle) * branchLength
			} : {
				x: pA.x + Math.cos(angle + angleB) * branchLength,
				y: pA.y + Math.sin(angle + angleB) * branchLength
			}

			ctx.beginPath()
			ctx.strokeStyle = "#FFF";
			ctx.moveTo(p0.x, p0.y)
			ctx.lineTo(pA.x, pA.y)
			ctx.stroke()

			if(limit > 0) {
				this.tree(ctx, pA, pC, limit - 1)
				this.tree(ctx, pA, pB, limit - 1)
			} else {
				ctx.beginPath();
				ctx.moveTo(pB.x, pB.y);
				ctx.lineTo(pA.x, pA.y);
				ctx.lineTo(pC.x, pC.y);
				ctx.stroke();
			}
		}
	}

}
</script>