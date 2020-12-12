<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="data.step" :max="12" :min="0" />
			<slider label="Angle (a)" v-model:current="data.angleDeg" :max="90" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Numbers from '@/mixins/Numbers'
import Slider from '@/components/smart/Slider'

export default {
	name: 'PythagorasTee',
	components: {
		FractalLayout,
		Slider
	},
	mixins: [Numbers],
	data() {
		return {
			height: null,
			width: null,
			data: {
				angleDeg: 45,
				angleA: 0,
				step: 7,
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

			this.data.angleA = this.degToRad(-this.data.angleDeg)

			this.tree(ctx, this.width / 2 - 150 / 2, this.height, 150, 0, this.data.step)
		},

		tree(ctx, x, y, size, angle, limit) {
			ctx.save()
			ctx.fillStyle = "#FFF";
			ctx.translate(x, y)
			ctx.rotate(angle)
			ctx.fillRect(0, 0, size, -size)

			// Left Branch
			const b0 = {
				x: 0,
				y: -size,
				size: Math.abs(Math.cos(this.data.angleA) * size),
				angle: this.data.angleA
			}

			if(limit > 0) {
				this.tree(ctx, b0.x, b0.y, b0.size, b0.angle, limit - 1)
			} else {
				ctx.save()
				ctx.translate(b0.x, b0.y)
				ctx.rotate(b0.angle)
				ctx.fillRect(0, 0, b0.size, -b0.size)
				ctx.restore()
			}

			// Right Branch
			const b1 = {
				x: b0.x + Math.cos(b0.angle) * b0.size,
				y: b0.y + Math.sin(b0.angle) * b0.size,
				size: Math.abs(Math.sin(this.data.angleA) * size),
				angle: b0.angle + Math.PI / 2
			}

			if(limit > 0) {
				this.tree(ctx, b1.x, b1.y, b1.size, b1.angle, limit - 1)
			} else {
				ctx.save()
				ctx.translate(b1.x, b1.y)
				ctx.rotate(b1.angle)
				ctx.fillRect(0, 0, b1.size, -b1.size)
				ctx.restore()
			}

			ctx.restore()
		}
	}

}
</script>

<style>

</style>