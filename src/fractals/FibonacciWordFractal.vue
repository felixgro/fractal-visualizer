<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="1593" :min="0" />
			<slider label="Line Length" v-model:current="settings.lineLength" :max="50" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'

export default {
	name: 'FibonacciWordFractal',
	mixins: [Fractal],
	data() {
		return {
			word: [],
			dir: '',
			settings: {
				step: 580,
				lineLength: 8,
			}
		}
	},
	created() {
		this.word = this.fibonacciWord(20).split('')
	},
	methods: {
		init() {
			const sp = this.startPosition()
			this.dir = 'bottom'
			this.fibonacci(sp, 0, this.settings.step)
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
		startPosition() {
			let pos = {}, relh, relw

			relh = (this.settings.step <= 491) ? this.settings.step / (491 / 100) * 0.01 : 491 / (491 / 100) * 0.01

			if(this.settings.step <= 114) {
				relw = this.settings.step / (114 / 100) * 0.01
			} else {
				relw = 114 / (114 / 100) * 0.01
			}

			if(this.settings.step >= 600 && this.settings.step <= 984) {
				relw += (this.settings.step - 600) / ((984 - 600) / 100) * 0.02 * 1.15
			} else if (this.settings.step > 984) {
				relw += (984 - 600) / ((984 - 600) / 100) * 0.02 * 1.15
			}

			pos.x = this.width / 2 - relw * (15 * this.settings.lineLength)
			pos.y = this.height / 2 + relh * (33 * this.settings.lineLength)

			return pos;
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