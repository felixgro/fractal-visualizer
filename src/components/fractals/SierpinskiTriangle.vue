<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="data.step" :max="5" :min="0" />
			<slider label="Height" v-model:current="data.height" :max="height" :min="0" />
			<slider label="Width" v-model:current="data.width" :max="width" :min="0" />
		</template>

		<canvas ref="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Numbers from '@/mixins/Numbers'
import Slider from '@/components/smart/Slider'

export default {
	components: {
		FractalLayout,
		Slider
	},
	mixins: [Numbers],
	data() {
		return {
			ctx: null,
			width: null,
			height: null,
			data: {
				step: 2,
				height: 421,
				width: 556
			}
		}
	},
	watch: {
		data: {
			deep: true,
			handler: function() {
				this.init()
			}
		}
	},
	mounted() {
		this.width = window.innerWidth
		this.height = window.innerHeight

		this.init()
	},
	methods: {
		init() {
			const canvas = this.$refs.canvas

			canvas.height = this.height
			canvas.width = this.width

			this.ctx = canvas.getContext('2d')
			this.ctx.fillStyle = '#fff'

			const p0 = { x: this.width / 2, y: this.height - this.data.height }
			const p1 = { x: (this.width / 2) + this.data.width / 2, y: this.height }
			const p2 = { x: (this.width / 2) - this.data.width / 2, y: this.height }

			this.sierpinski(p0, p1, p2, this.data.step)
		},
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
		drawTriangle(p0, p1, p2) {
			this.ctx.moveTo(p0.x, p0.y)
			this.ctx.lineTo(p1.x, p1.y)
			this.ctx.lineTo(p2.x, p2.y)
			this.ctx.fill()
		}
	}
}
</script>

<style>

</style>