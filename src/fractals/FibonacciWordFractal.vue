<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="1593" :min="0" />
			<slider label="Line Length" v-model:current="settings.lineLength" :max="50" :min="0" />
			<slider label="Padding Left" v-model:current="settings.paddingLeft" :max="width" :min="0" />
			<slider label="Padding Top" v-model:current="settings.paddingTop" :max="height" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import Fractal from '@/mixins/Fractal'

export default {
	name: 'FibonacciWordFractal',
	mixins: [Fractal],
	data() {
		return {
			word: [],
			dir: '',
			settings: {
				step: 985,
				lineLength: 8,
				paddingLeft: 120,
				paddingTop: 300,
			}
		}
	},
	created() {
		this.word = this.fibonacciWord(20).split('')
	},
	methods: {
		init() {
			const center = {
				x: this.settings.paddingLeft,
				y: this.settings.paddingTop
			}

			this.dir = 'bottom'
			this.fibonacci(center, 0, this.settings.step)
		},
		fibonacci(pos, index, limit) {
			const digit = this.word[index]
			let newPos = {}

			if (digit == 0) {
				if(index == 0 || index % 2 != 0) {
					this.dir = this.relativeDir('left')
					newPos = this.drawLine(pos, this.dir)
				} else  {
					this.dir = this.relativeDir('right')
					newPos = this.drawLine(pos, this.dir)
				}
			} else {
				this.dir = this.relativeDir('straight')
				newPos = this.drawLine(pos, this.dir)
			}

			if(limit > 0) {
				this.fibonacci(newPos, index + 1, limit - 1)
			}

		},
		fibonacciWord(n) {
			let n1 = "0"
			let n2 = "01"
			let tmp = ""

			if(n == 0)
				return n1

			if(n == 1)
				return n2

			for(let i = 2; i <= n; i++) {
				tmp = n2
				n2 += n1
				n1 = tmp
			}

			return n2;
		},
		relativeDir(dir) {
			switch(dir) {
				case 'left':
					switch(this.dir) {
						case 'top':    return 'left'
						case 'bottom': return 'right'
						case 'left':   return 'bottom'
						case 'right':  return 'top'
					}
					break
				case 'right':
					switch(this.dir) {
						case 'top':    return 'right'
						case 'bottom': return 'left'
						case 'left':   return 'top'
						case 'right':  return 'bottom'
					}
					break
				default:
					return this.dir
			}
		},
		drawLine(p, direction) {
			this.ctx.beginPath()
			this.ctx.moveTo(p.x, p.y)
			let pos = {}

			switch(direction) {
				case 'top':
					pos = {
						x: p.x,
						y: p.y - this.settings.lineLength
					}
					break;
				case 'bottom':
					pos = {
						x: p.x,
						y: p.y - (-1 * this.settings.lineLength)
					}
					break;
				case 'left':
					pos = {
						x: p.x - this.settings.lineLength,
						y: p.y
					}
					break;
				case 'right':
					pos = {
						x: p.x - (-1 * this.settings.lineLength),
						y: p.y
					}
					break;
			}

			this.ctx.lineTo(pos.x, pos.y)

			this.ctx.strokeStyle = '#fff'
			this.ctx.stroke()

			return pos;
		}
	}
}
</script>