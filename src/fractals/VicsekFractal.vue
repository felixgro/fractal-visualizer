<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="6" :min="0" />
			<slider label="Scale" v-model:current="settings.scale" :max="2" :min="0" :step="0.01" />
			<checkbox label="Saltire Form" v-model:state="settings.saltire" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'
import Checkbox from '@/components/form/Checkbox'
export default {
	name: 'VicsekFractal',
	mixins: [Fractal],
	components: {
		Checkbox
	},
	data() {
		return {
			settings: {
				step: 4,
				scale: 1,
				saltire: false
			}
		}
	},
	methods: {
		init() {
			const centerX = this.width / 2
			const centerY = this.height / 2

			if(!this.settings.saltire) {
				this.vicsek(centerX, centerY, this.settings.scale * 150, this.settings.step)
			} else {
				this.saltire(centerX, centerY, this.settings.scale * 150, this.settings.step)
			}
		},
		vicsek(x, y, size, limit) {
			if(limit > 0) {
				this.vicsek(x, y, size / 3, limit - 1)
				this.vicsek(x + size, y, size / 3, limit - 1)
				this.vicsek(x - size, y, size / 3, limit - 1)
				this.vicsek(x, y + size, size / 3, limit - 1)
				this.vicsek(x, y - size, size / 3, limit - 1)
			} else {
				this.drawRect(x, y, size)
				this.drawRect(x + size, y, size)
				this.drawRect(x - size, y, size)
				this.drawRect(x, y + size, size)
				this.drawRect(x, y - size, size)
			}
		},
		saltire(x, y, size, limit) {
			if(limit > 0) {
				this.saltire(x, y, size / 3, limit - 1)
				this.saltire(x + size, y - size, size / 3, limit - 1)
				this.saltire(x - size, y - size, size / 3, limit - 1)
				this.saltire(x + size, y + size, size / 3, limit - 1)
				this.saltire(x - size, y + size, size / 3, limit - 1)
			} else {
				this.drawRect(x, y, size)
				this.drawRect(x + size, y - size, size)
				this.drawRect(x - size, y - size, size)
				this.drawRect(x + size, y + size, size)
				this.drawRect(x - size, y + size, size)
			}
		},
		drawRect(x, y, size) {
			this.ctx.beginPath()
			this.ctx.rect(x - (size / 2), y - (size / 2), size, size);
			this.ctx.fillStyle = '#fff'
			this.ctx.fill()
		}
	}
}
</script>