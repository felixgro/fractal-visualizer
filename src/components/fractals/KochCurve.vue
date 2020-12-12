<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="data.step" :max="5" :min="0" />
			<slider label="Length Ratio" v-model:current="data.lengthRatio" :step="0.01" :max="0.5" :min="0" />
			<checkbox label="Koch Snowflake (SF)" v-model:current="data.snowflake" :checked="data.snowflake" />
			<div v-if="data.snowflake">
				<slider label="SF Height" v-model:current="data.height" :max="height / 2" :min="0" />
				<slider label="SF Width" v-model:current="data.width" :max="width" :min="0" />
			</div>
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Numbers from '@/mixins/Numbers'
import Slider from '@/components/smart/Slider'
import Checkbox from '@/components/smart/Checkbox'

export default {
	components: {
		FractalLayout,
		Slider,
		Checkbox
	},
	mixins: [Numbers],
	data() {
		return {
			ctx: null,
			width: null,
			height: null,
			data: {
				step: 3,
				lengthRatio: 0.33,
				snowflake: false,
				height: 245,
				width: 480
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
			canvas.width = this.width
			canvas.height = this.height

			this.ctx = canvas.getContext('2d')

			if(this.data.snowflake) {
				const pA = {
					x: 0,
					y: -this.data.height
				}
				const pB = {
					x: this.data.width / 2,
					y: this.data.height / 2
				}
				const pC = {
					x: -this.data.width / 2,
					y: this.data.height / 2
				}

				this.ctx.translate(this.width / 2, this.height / 2)

				this.koch(pA, pB, this.data.step)
				this.koch(pB, pC, this.data.step)
				this.koch(pC, pA, this.data.step)

			} else {
				const p0 = {
					x: 100,
					y: this.height * 0.75
				}

				const p1 = {
					x: this.width - 100,
					y: this.height * 0.75
				}

				this.koch(p0, p1, this.data.step)
			}
		},
		koch(p0, p1, limit) {
			const dx = p1.x - p0.x
			const dy = p1.y - p0.y
			const dist = Math.sqrt(dx * dx + dy * dy)
			const unit = dist * this.data.lengthRatio
			const angle = Math.atan2(dy, dx)

			const pA = {
				x: p0.x + dx * this.data.lengthRatio,
				y: p0.y + dy * this.data.lengthRatio
			}

			const pC = {
				x: p1.x - dx * this.data.lengthRatio,
				y: p1.y - dy * this.data.lengthRatio
			}

			const pB = {
				x: pA.x + Math.cos(angle - Math.PI * this.data.lengthRatio) * unit,
				y: pA.y + Math.sin(angle - Math.PI * this.data.lengthRatio) * unit
			}

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

<style>

</style>